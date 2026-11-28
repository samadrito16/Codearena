import { learningPaths, type LearningModule, type LearningPath } from '../data/learningPaths';
import { ApiError, apiRequest } from '../lib/api';
import type { LearningPathsRepository } from './types';

export type { LearningModule, LearningPath };

async function list(signal?: AbortSignal): Promise<LearningPath[]> {
  try {
    return await apiRequest<LearningPath[]>('/learning-paths', { signal, silent: true });
  } catch (error) {
    signal?.throwIfAborted();
    if (error instanceof ApiError &&
      (error.code === 'CONTENT_UNCONFIGURED' || (import.meta.env.DEV && error.status === 0))) {
      return [...learningPaths];
    }
    throw error;
  }
}

export const learningPathsService: LearningPathsRepository = {
  list,

  async getById(id: string, signal?: AbortSignal): Promise<LearningPath | null> {
    return (await list(signal)).find(item => item.id === id) ?? null;
  },
};
