import type { ClientExecutionResult } from './types';

/**
 * Strips basic TypeScript syntax for browser JavaScript execution
 */
export function cleanTypeScriptForWorker(tsCode: string): string {
  return tsCode
    .replace(/export\s+(interface|type)\s+[\s\S]*?\{[\s\S]*?\}/g, '')
    .replace(/(interface|type)\s+[A-Za-z0-9_<>,\s]+\s*=\s*[\s\S]*?;/g, '')
    .replace(/(interface)\s+[A-Za-z0-9_<>,\s]+\s*\{[\s\S]*?\}/g, '')
    .replace(/export\s+default\s+/g, '')
    .replace(/export\s+/g, '')
    .replace(/(private|public|protected|readonly)\s+/g, '')
    .replace(/:\s*(string|number|boolean|any|void|unknown|never|Record<[^>]+>|Map<[^>]+>|Set<[^>]+>|Array<[^>]+>|\[\]|{[^}]+})(\[\])?(?=[=;,)\{])/g, '')
    .replace(/as\s+[A-Za-z0-9_<>]+/g, '')
    .replace(/<[A-Za-z0-9_,\s]+>(?=\()/g, '');
}

/**
 * Generates the worker script code
 */
function createWorkerScript(): string {
  return `
    self.onmessage = function(e) {
      var data = e.data || {};
      var code = data.code || '';
      var stdin = data.stdin || '';
      var id = data.id;

      var logs = [];
      function serialize(arg) {
        if (arg === undefined) return 'undefined';
        if (arg === null) return 'null';
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (err) {
            return String(arg);
          }
        }
        return String(arg);
      }

      var customConsole = {
        log: function() {
          var args = Array.prototype.slice.call(arguments);
          logs.push(args.map(serialize).join(' '));
        },
        info: function() {
          var args = Array.prototype.slice.call(arguments);
          logs.push('[INFO] ' + args.map(serialize).join(' '));
        },
        warn: function() {
          var args = Array.prototype.slice.call(arguments);
          logs.push('[WARN] ' + args.map(serialize).join(' '));
        },
        error: function() {
          var args = Array.prototype.slice.call(arguments);
          logs.push('[ERROR] ' + args.map(serialize).join(' '));
        },
        table: function(data) {
          try {
            logs.push('[TABLE]\\n' + JSON.stringify(data, null, 2));
          } catch (e) {
            logs.push('[TABLE] ' + String(data));
          }
        },
        dir: function() {
          var args = Array.prototype.slice.call(arguments);
          logs.push(args.map(serialize).join(' '));
        },
        debug: function() {
          var args = Array.prototype.slice.call(arguments);
          logs.push('[DEBUG] ' + args.map(serialize).join(' '));
        }
      };

      // Stdin reader helpers
      var stdinLines = stdin ? stdin.split(/\\r?\\n/) : [];
      var stdinIndex = 0;
      function readline() {
        if (stdinIndex < stdinLines.length) {
          return stdinLines[stdinIndex++];
        }
        return null;
      }
      function readAll() {
        return stdin;
      }
      function prompt(msg) {
        if (msg) logs.push(String(msg));
        return readline();
      }

      var startTime = performance.now();
      try {
        // Execute in isolated function scope
        var fn = new Function('console', 'readline', 'readAll', 'prompt', 'stdin', code);
        var result = fn(customConsole, readline, readAll, prompt, stdin);
        var elapsed = Math.round(performance.now() - startTime);

        var serializedReturn = undefined;
        if (result !== undefined) {
          serializedReturn = serialize(result);
        }

        self.postMessage({
          id: id,
          success: true,
          logs: logs,
          returnValue: serializedReturn,
          runtimeMs: elapsed
        });
      } catch (err) {
        var elapsed = Math.round(performance.now() - startTime);
        self.postMessage({
          id: id,
          success: false,
          logs: logs,
          error: (err && (err.message || String(err))) || 'Unknown runtime error',
          stack: err && err.stack,
          runtimeMs: elapsed
        });
      }
    };
  `;
}

/**
 * Runs JavaScript or TypeScript code inside a dedicated Web Worker sandbox
 * with console capture, stdin handling, and timeout termination.
 */
export async function runJsInWorker(
  code: string,
  stdin: string = '',
  isTypeScript: boolean = false,
  timeoutMs: number = 5000
): Promise<ClientExecutionResult> {
  const executableCode = isTypeScript ? cleanTypeScriptForWorker(code) : code;
  const workerBlob = new Blob([createWorkerScript()], { type: 'application/javascript' });
  const workerUrl = URL.createObjectURL(workerBlob);

  return new Promise<ClientExecutionResult>((resolve) => {
    let worker: Worker | null = null;
    let timeoutTimer: any = null;
    let isSettled = false;

    const cleanup = () => {
      if (timeoutTimer) {
        clearTimeout(timeoutTimer);
        timeoutTimer = null;
      }
      if (worker) {
        worker.terminate();
        worker = null;
      }
      URL.revokeObjectURL(workerUrl);
    };

    try {
      worker = new Worker(workerUrl);
    } catch (err: any) {
      cleanup();
      resolve({
        success: false,
        verdict: 'Runtime Error',
        stdout: '',
        stderr: `Failed to initialize isolated Web Worker: ${err?.message || err}`,
        runtimeMs: 0,
        engine: 'isolated-worker',
      });
      return;
    }

    const runId = 'js-' + Math.random().toString(36).substring(2, 9);

    timeoutTimer = setTimeout(() => {
      if (isSettled) return;
      isSettled = true;
      cleanup();
      resolve({
        success: false,
        verdict: 'Time Limit Exceeded',
        stdout: '',
        stderr: `Time Limit Exceeded (${timeoutMs}ms): Execution took too long and was terminated to protect browser responsiveness.\n\nTip: Check for infinite loops (e.g. while (true) {}) or heavy recursion.`,
        runtimeMs: timeoutMs,
        engine: 'isolated-worker',
        details: 'Execution timed out',
      });
    }, timeoutMs);

    worker.onmessage = (event: MessageEvent) => {
      if (isSettled) return;
      const data = event.data || {};
      if (data.id !== runId) return;

      isSettled = true;
      cleanup();

      const logs: string[] = data.logs || [];
      const stdout = logs.join('\n');
      const runtimeMs = Math.max(1, Number(data.runtimeMs) || 1);

      if (data.success) {
        resolve({
          success: true,
          verdict: 'Accepted',
          stdout,
          returnValue: data.returnValue,
          runtimeMs,
          engine: 'isolated-worker',
        });
      } else {
        const errorMsg = data.error || 'Execution encountered a runtime error';
        resolve({
          success: false,
          verdict: 'Runtime Error',
          stdout,
          stderr: errorMsg,
          runtimeMs,
          engine: 'isolated-worker',
        });
      }
    };

    worker.onerror = (errEvent: ErrorEvent) => {
      if (isSettled) return;
      isSettled = true;
      cleanup();

      resolve({
        success: false,
        verdict: 'Runtime Error',
        stdout: '',
        stderr: `Worker error: ${errEvent.message || 'Script compilation or execution failed'}`,
        runtimeMs: 0,
        engine: 'isolated-worker',
      });
    };

    worker.postMessage({
      id: runId,
      code: executableCode,
      stdin,
    });
  });
}
