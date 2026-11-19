import { getProblemEditorial, type ProblemEditorial } from '../data/editorials';
import type { EditorialsRepository } from './types';

export type { ProblemEditorial };

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new DOMException('Request aborted', 'AbortError');
  }
}

/**
 * Static editorials repository adapter.
 * Swap this implementation for an editorial API endpoint without modifying Workspace or SolutionsPanel.
 */
export const editorialsService: EditorialsRepository = {
  async getByProblemId(problemId: string, signal?: AbortSignal): Promise<ProblemEditorial | null> {
    throwIfAborted(signal);
    if (!problemId) return Promise.resolve(null);
    return Promise.resolve(getProblemEditorial(problemId));
  },
};
