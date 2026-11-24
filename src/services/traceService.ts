import { apiRequest } from '../lib/api';
import type { ExecutionTraceResult, TraceRequestOptions } from '../types/scrubber';

/**
 * Requests deterministic step-through execution trace from backend.
 */
export async function requestExecutionTrace(
  options: TraceRequestOptions
): Promise<ExecutionTraceResult> {
  const language = (options.language || 'python').toLowerCase();
  
  if (language !== 'python' && language !== 'py' && language !== 'python3') {
    return {
      success: false,
      error: `Visual step-through scrubber currently supports Python 3. Selected language: ${options.language}`,
      steps: [],
      totalSteps: 0,
      truncated: false,
      code: options.code,
    };
  }

  try {
    return await apiRequest<ExecutionTraceResult>('/submissions/trace', {
      method: 'POST',
      body: JSON.stringify({
        problemId: options.problemId,
        code: options.code,
        language: 'python',
        input: options.input || options.customInput,
        functionNameHint: options.functionNameHint,
        maxSteps: options.maxSteps || 400,
      }),
    });
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to reach execution trace service.',
      steps: [],
      totalSteps: 0,
      truncated: false,
      code: options.code,
    };
  }
}
