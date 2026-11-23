import { initialProblems } from '../data/problems';
import { writeStorageSafe, type StorageWriteResult } from '../lib/storage';
import type { Problem } from '../types';
import type { ProblemsRepository } from './types';

export const PROBLEMS_STORAGE_KEY = 'prismcode-problems-v3';

export function isProblemRecord(value: unknown): value is Problem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<Problem>;
  return typeof item.id === 'string'
    && typeof item.title === 'string'
    && (item.difficulty === 'Easy' || item.difficulty === 'Medium' || item.difficulty === 'Hard')
    && Array.isArray(item.topics)
    && typeof item.description === 'string'
    && Array.isArray(item.examples)
    && Array.isArray(item.constraints);
}

function readLocalProblems(): Problem[] {
  try {
    const raw = localStorage.getItem(PROBLEMS_STORAGE_KEY);
    if (raw === null) {
      writeStorageSafe(PROBLEMS_STORAGE_KEY, initialProblems);
      return initialProblems;
    }
    const stored: unknown = JSON.parse(raw);
    if (!Array.isArray(stored)) return initialProblems;
    const valid = stored.filter(isProblemRecord);
    if (valid.length === 0) {
      writeStorageSafe(PROBLEMS_STORAGE_KEY, initialProblems);
      return initialProblems;
    }
    return valid;
  } catch {
    return initialProblems;
  }
}

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new DOMException('Request aborted', 'AbortError');
  }
}

/**
 * Local problems repository adapter.
 * Swap this implementation for a REST/GraphQL client without touching page components.
 */
export const problemsService: ProblemsRepository = {
  listSync(): Problem[] {
    return readLocalProblems();
  },

  async list(signal?: AbortSignal): Promise<Problem[]> {
    throwIfAborted(signal);
    try {
      const response = await fetch('/api/problems', { signal });
      if (response.ok) {
        const fetched: unknown = await response.json();
        if (Array.isArray(fetched) && fetched.length > 0) {
          const valid = fetched.filter(isProblemRecord);
          writeStorageSafe(PROBLEMS_STORAGE_KEY, valid);
          return valid;
        }
      }
    } catch {
      // Fall through to local/offline cache
    }
    return Promise.resolve(readLocalProblems());
  },

  async getById(id: string, signal?: AbortSignal): Promise<Problem | null> {
    throwIfAborted(signal);
    const items = readLocalProblems();
    return Promise.resolve(items.find((item) => item.id === id) ?? null);
  },

  async saveAll(problems: Problem[]): Promise<StorageWriteResult> {
    return Promise.resolve(writeStorageSafe(PROBLEMS_STORAGE_KEY, problems));
  },
};
