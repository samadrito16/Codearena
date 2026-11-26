import type { ClientExecutionResult, PyodideStatus } from './types';

let pyodideWorker: Worker | null = null;
let currentPyodideStatus: PyodideStatus = 'idle';
let statusListeners: Set<(status: PyodideStatus, message?: string) => void> = new Set();

function notifyStatus(status: PyodideStatus, message?: string) {
  currentPyodideStatus = status;
  statusListeners.forEach((listener) => {
    try {
      listener(status, message);
    } catch (e) {
      console.error('Error in status listener:', e);
    }
  });
}

/**
 * Creates the inline worker script for Pyodide WebAssembly
 */
function createPyodideWorkerScript(): string {
  return `
    var pyodide = null;
    var pyodideInitPromise = null;

    async function initPyodide() {
      if (pyodide) return pyodide;
      if (!pyodideInitPromise) {
        pyodideInitPromise = (async function() {
          self.postMessage({ type: 'STATUS', status: 'loading', message: 'Downloading Pyodide WebAssembly runtime (~6.5MB, cached thereafter)...' });
          try {
            if (typeof loadPyodide === 'undefined') {
              importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");
            }
            var instance = await loadPyodide({
              indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
            });
            self.postMessage({ type: 'STATUS', status: 'ready', message: 'Pyodide WebAssembly runtime ready.' });
            return instance;
          } catch (err) {
            self.postMessage({ type: 'STATUS', status: 'error', message: (err && err.message) || String(err) });
            throw err;
          }
        })();
      }
      return await pyodideInitPromise;
    }

    self.onmessage = async function(e) {
      var data = e.data || {};
      var type = data.type;
      var id = data.id;

      if (type === 'INIT') {
        try {
          await initPyodide();
          self.postMessage({ id: id, type: 'INIT_DONE' });
        } catch (err) {
          self.postMessage({ id: id, type: 'INIT_ERROR', error: (err && err.message) || String(err) });
        }
        return;
      }

      if (type === 'RUN') {
        var code = data.code || '';
        var stdin = data.stdin || '';
        var startTime = performance.now();
        var stdoutLines = [];
        var stderrLines = [];

        try {
          var py = await initPyodide();

          py.setStdout({
            batched: function(text) {
              stdoutLines.push(text);
            }
          });
          py.setStderr({
            batched: function(text) {
              stderrLines.push(text);
            }
          });

          // Set up sys.stdin using io.StringIO so input() and sys.stdin.read() work seamlessly
          var setupPython = 
            'import sys, io\\n' +
            'sys.stdin = io.StringIO(' + JSON.stringify(stdin) + ')\\n';

          await py.runPythonAsync(setupPython);

          var pyResult = await py.runPythonAsync(code);
          var elapsed = Math.round(performance.now() - startTime);

          var returnValue = undefined;
          if (pyResult !== undefined && pyResult !== null) {
            try {
              if (typeof pyResult.toJs === 'function') {
                returnValue = JSON.stringify(pyResult.toJs(), null, 2);
              } else {
                returnValue = String(pyResult);
              }
            } catch (e) {
              returnValue = String(pyResult);
            }
          }

          self.postMessage({
            id: id,
            type: 'SUCCESS',
            stdout: stdoutLines.join('\\n'),
            stderr: stderrLines.join('\\n'),
            returnValue: returnValue,
            runtimeMs: elapsed
          });
        } catch (err) {
          var elapsed = Math.round(performance.now() - startTime);
          self.postMessage({
            id: id,
            type: 'ERROR',
            stdout: stdoutLines.join('\\n'),
            stderr: stderrLines.join('\\n'),
            error: (err && (err.message || String(err))) || 'Python runtime error',
            runtimeMs: elapsed
          });
        }
      }
    };
  `;
}

/**
 * Ensures a healthy Pyodide worker instance is running
 */
function getOrCreatePyodideWorker(): Worker {
  if (pyodideWorker) return pyodideWorker;

  const blob = new Blob([createPyodideWorkerScript()], { type: 'application/javascript' });
  const workerUrl = URL.createObjectURL(blob);
  const worker = new Worker(workerUrl);

  worker.addEventListener('message', (event: MessageEvent) => {
    const data = event.data || {};
    if (data.type === 'STATUS') {
      notifyStatus(data.status, data.message);
    }
  });

  worker.addEventListener('error', (event: ErrorEvent) => {
    notifyStatus('error', event.message || 'Pyodide worker failed');
  });

  pyodideWorker = worker;
  return worker;
}

/**
 * Pre-warms Pyodide runtime in the background when Python language is selected
 */
export function prewarmPyodide(): void {
  try {
    if (currentPyodideStatus === 'ready' || currentPyodideStatus === 'loading') return;
    const worker = getOrCreatePyodideWorker();
    worker.postMessage({ id: 'prewarm', type: 'INIT' });
  } catch (err) {
    console.warn('Could not prewarm Pyodide:', err);
  }
}

/**
 * Subscribe to Pyodide status changes (loading, ready, error)
 */
export function subscribePyodideStatus(
  listener: (status: PyodideStatus, message?: string) => void
): () => void {
  statusListeners.add(listener);
  listener(currentPyodideStatus);
  return () => {
    statusListeners.delete(listener);
  };
}

/**
 * Runs Python code inside the Pyodide Web Worker with timeout and stdin feeding
 */
export async function runPythonInPyodide(
  code: string,
  stdin: string = '',
  timeoutMs: number = 10000,
  onStatusChange?: (status: PyodideStatus, message?: string) => void
): Promise<ClientExecutionResult> {
  const unsubscribe = onStatusChange ? subscribePyodideStatus(onStatusChange) : undefined;

  return new Promise<ClientExecutionResult>((resolve) => {
    let worker: Worker;
    try {
      worker = getOrCreatePyodideWorker();
    } catch (err: any) {
      if (unsubscribe) unsubscribe();
      resolve({
        success: false,
        verdict: 'Runtime Error',
        stdout: '',
        stderr: `Failed to spawn Pyodide WebAssembly worker: ${err?.message || err}`,
        runtimeMs: 0,
        engine: 'pyodide-wasm',
      });
      return;
    }

    const runId = 'py-' + Math.random().toString(36).substring(2, 9);
    let isSettled = false;
    let timeoutTimer: any = null;

    const cleanup = () => {
      if (timeoutTimer) {
        clearTimeout(timeoutTimer);
        timeoutTimer = null;
      }
      if (unsubscribe) {
        unsubscribe();
      }
    };

    timeoutTimer = setTimeout(() => {
      if (isSettled) return;
      isSettled = true;
      cleanup();

      // Terminate hanging worker to prevent browser lockup
      if (pyodideWorker) {
        pyodideWorker.terminate();
        pyodideWorker = null;
        currentPyodideStatus = 'idle';
      }

      resolve({
        success: false,
        verdict: 'Time Limit Exceeded',
        stdout: '',
        stderr: `Time Limit Exceeded (${timeoutMs}ms): Python execution timed out.\n\nThe background worker was terminated to preserve browser responsiveness. Check for infinite loops (e.g. while True:) or unbounded recursion.`,
        runtimeMs: timeoutMs,
        engine: 'pyodide-wasm',
        details: 'Execution timed out',
      });
    }, timeoutMs);

    const messageHandler = (event: MessageEvent) => {
      const data = event.data || {};
      if (data.id !== runId) return;

      if (data.type === 'SUCCESS' || data.type === 'ERROR') {
        if (isSettled) return;
        isSettled = true;
        cleanup();
        worker.removeEventListener('message', messageHandler);

        const stdout = data.stdout || '';
        const stderr = data.stderr || '';
        const runtimeMs = Math.max(1, Number(data.runtimeMs) || 1);

        if (data.type === 'SUCCESS') {
          resolve({
            success: true,
            verdict: 'Accepted',
            stdout,
            stderr: stderr || undefined,
            returnValue: data.returnValue,
            runtimeMs,
            engine: 'pyodide-wasm',
          });
        } else {
          const errorMsg = data.error || 'Python runtime error';
          resolve({
            success: false,
            verdict: 'Runtime Error',
            stdout,
            stderr: stderr ? `${stderr}\n${errorMsg}` : errorMsg,
            runtimeMs,
            engine: 'pyodide-wasm',
          });
        }
      }
    };

    worker.addEventListener('message', messageHandler);

    worker.postMessage({
      id: runId,
      type: 'RUN',
      code,
      stdin,
    });
  });
}
