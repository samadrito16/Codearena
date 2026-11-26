import { runCode } from '../executionService';
import { runJsInWorker } from './jsWorkerRunner';
import { runPythonInPyodide, prewarmPyodide, subscribePyodideStatus } from './pyodideRunner';
import type {
  ClientEngineType,
  ClientExecutionOptions,
  ClientExecutionResult,
  EngineDetails,
  PyodideStatus,
} from './types';

/**
 * Returns metadata and capabilities for the execution engine handling the given language.
 */
export function getEngineDetails(language: string): EngineDetails {
  switch (language) {
    case 'python':
      return {
        type: 'pyodide-wasm',
        badgeLabel: 'Pyodide Wasm',
        badgeColor: 'text-sky-400 border-sky-400/30 bg-sky-400/10',
        description: 'In-browser CPython WebAssembly runtime. Zero server latency, offline-capable, and unlimited daily runs.',
        isClientSide: true,
      };
    case 'javascript':
    case 'typescript':
      return {
        type: 'isolated-worker',
        badgeLabel: 'Web Worker',
        badgeColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
        description: 'Isolated browser Web Worker sandbox. Instant execution, freeze-proof infinite loop protection, and unlimited runs.',
        isClientSide: true,
      };
    case 'html':
      return {
        type: 'isolated-worker',
        badgeLabel: 'Live Preview',
        badgeColor: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
        description: 'Sandboxed browser iframe preview.',
        isClientSide: true,
      };
    case 'java':
    case 'cpp':
    case 'rust':
    case 'go':
    case 'sql':
    default:
      return {
        type: 'server',
        badgeLabel: 'Cloud Sandbox',
        badgeColor: 'text-violet-400 border-violet-400/30 bg-violet-400/10',
        description: 'Secure cloud compiler container reserved strictly for compiled and database languages.',
        isClientSide: false,
      };
  }
}

/**
 * Pre-warms the execution engine for the given language if applicable
 */
export function prewarmLanguage(language: string): void {
  if (language === 'python') {
    prewarmPyodide();
  }
}

/**
 * Subscribes to runtime engine status updates (e.g. Pyodide download progress)
 */
export function subscribeEngineStatus(
  listener: (status: PyodideStatus, message?: string) => void
): () => void {
  return subscribePyodideStatus(listener);
}

/**
 * Unified execution handler for the Standalone Code Editor.
 * Dispatches Python to Pyodide Wasm, JS/TS to isolated Web Workers,
 * and compiled languages (Java, C++, etc.) strictly to the cloud compiler.
 */
export async function executeEditorCode(
  options: ClientExecutionOptions
): Promise<ClientExecutionResult> {
  const { code, language, stdin = '', timeoutMs, onStatus } = options;

  // 1. Python In-Browser Execution via Pyodide WebAssembly
  if (language === 'python') {
    return runPythonInPyodide(code, stdin, timeoutMs || 10000, onStatus);
  }

  // 2. JavaScript In-Browser Execution via Isolated Web Worker
  if (language === 'javascript') {
    return runJsInWorker(code, stdin, false, timeoutMs || 5000);
  }

  // 3. TypeScript In-Browser Execution via Isolated Web Worker
  if (language === 'typescript') {
    return runJsInWorker(code, stdin, true, timeoutMs || 5000);
  }

  // 4. HTML Preview
  if (language === 'html') {
    return {
      success: true,
      verdict: 'Accepted',
      stdout: 'Rendered in HTML Live Preview iframe.',
      runtimeMs: 1,
      engine: 'isolated-worker',
    };
  }

  // 5. Server Execution (strictly reserved for Java, C++, Rust, Go, SQL)
  const startTime = performance.now();
  try {
    const res = await runCode({
      problemId: 'scratchpad',
      code,
      language,
      customInput: stdin.trim() ? stdin.trim() : undefined,
    });

    const runtimeMs = res.runtimeMs || Math.round(performance.now() - startTime);
    const stdout = res.stdout || '';
    const stderr = res.stderr || '';

    return {
      success: res.success && res.verdict === 'Accepted',
      verdict: res.verdict || (res.success ? 'Accepted' : 'Runtime Error'),
      stdout,
      stderr: stderr || undefined,
      runtimeMs,
      engine: 'server',
      details: res.verdict,
    };
  } catch (err: any) {
    const runtimeMs = Math.round(performance.now() - startTime);
    return {
      success: false,
      verdict: 'Runtime Error',
      stdout: '',
      stderr:
        `[Local Compiler Sandbox - Offline Mode]\n` +
        `Execution failed for ${language.toUpperCase()}.\n` +
        `Details: ${err?.message || 'Server connection refused or unreachable.'}\n` +
        `Note: Server execution is reserved for compiled languages (Java, C++, Rust, Go, SQL).`,
      runtimeMs,
      engine: 'server',
    };
  }
}
