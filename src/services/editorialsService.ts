import { apiRequest, ApiError } from '../lib/api';
import type { ProblemEditorial } from '../types';
import type { EditorialsRepository } from './types';

export type { ProblemEditorial };

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new DOMException('Request aborted', 'AbortError');
  }
}

/**
 * Editorial repository that serves plan-gated solutions and walkthroughs from backend API.
 * Solutions are protected against client bundle inspection and plan-gated for monetization.
 */
export const editorialsService: EditorialsRepository = {
  async getByProblemId(problemId: string, signal?: AbortSignal): Promise<ProblemEditorial | null> {
    throwIfAborted(signal);
    if (!problemId) return null;

    try {
      return await apiRequest<ProblemEditorial>(`/problems/${encodeURIComponent(problemId)}/editorial`, {
        signal,
        silent: true,
      });
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.status === 404) return null;
        // For 401 Unauthorized or 403 Forbidden (upgrade required), rethrow so UI displays paywall
        if (err.status === 401 || err.status === 403) {
          throw err;
        }
      }
      return null;
    }
  },
};
