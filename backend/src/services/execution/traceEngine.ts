import { getCompilerId } from '../languageRegistry.js';
import { executeCode } from './engine.js';
import { generatePythonTracerScript } from './tracer/pythonTracer.js';
import type { ExecutionTraceResult } from './tracer/types.js';

export interface TraceExecutionOptions {
  code: string;
  language?: string;
  input?: string;
  functionNameHint?: string;
  problemId?: string;
  maxSteps?: number;
}

const TRACE_START_DELIMITER = '__PRISMCODE_TRACE_START__';
const TRACE_END_DELIMITER = '__PRISMCODE_TRACE_END__';

/**
 * Executes user code with deterministic runtime tracing (Python Tutor style).
 * Captures discrete line-by-line frames, variables, call stacks, and heap memory.
 */
export async function executeTrace(
  options: TraceExecutionOptions
): Promise<ExecutionTraceResult> {
  const language = (options.language || 'python').toLowerCase().trim();

  if (language !== 'python' && language !== 'py' && language !== 'python3') {
    return {
      success: false,
      error: `Visual step-through scrubber currently supports Python 3. Selected language: ${language}`,
      steps: [],
      totalSteps: 0,
      truncated: false,
      code: options.code,
    };
  }

  const compilerId = getCompilerId('python');
  const tracerScript = generatePythonTracerScript(
    options.code,
    options.input || '',
    {
      maxSteps: options.maxSteps || 400,
      functionNameHint: options.functionNameHint,
      problemId: options.problemId,
    }
  );

  try {
    const runResult = await executeCode('python', compilerId, tracerScript, '');

    const stdout = runResult.stdout || '';
    const startIndex = stdout.indexOf(TRACE_START_DELIMITER);
    const endIndex = stdout.indexOf(TRACE_END_DELIMITER);

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      const rawJson = stdout
        .substring(startIndex + TRACE_START_DELIMITER.length, endIndex)
        .trim();
      const parsed = JSON.parse(rawJson) as ExecutionTraceResult;
      parsed.runtimeMs = runResult.runtimeMs;
      return parsed;
    }

    // If delimiters were missing, examine stderr or stdout for syntax/compilation issues
    const errText = runResult.stderr || stdout;
    return {
      success: false,
      error: errText.trim() || 'Trace execution did not produce valid step output.',
      steps: [],
      totalSteps: 0,
      truncated: false,
      code: options.code,
      runtimeMs: runResult.runtimeMs,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
      steps: [],
      totalSteps: 0,
      truncated: false,
      code: options.code,
    };
  }
}
