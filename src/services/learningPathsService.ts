import { learningPaths, type LearningModule, type LearningPath } from '../data/learningPaths';
import type { LearningPathsRepository } from './types';

export type { LearningModule, LearningPath };

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new DOMException('Request aborted', 'AbortError');
  }
}

/**
 * Static learning paths repository adapter.
 * Swap this implementation for a curriculum API without modifying page components.
 */
export const learningPathsService: LearningPathsRepository = {
  async list(signal?: AbortSignal): Promise<LearningPath[]> {
    throwIfAborted(signal);
    return Promise.resolve([...learningPaths]);
  },

  async getById(id: string, signal?: AbortSignal): Promise<LearningPath | null> {
    throwIfAborted(signal);
    return Promise.resolve(learningPaths.find((item) => item.id === id) ?? null);
  },
};
