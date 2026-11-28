import { apiRequest } from '../lib/api';
import type { Problem } from '../types';
import type { ProblemsRepository } from './types';

export const problemsService: ProblemsRepository = {
  list: (signal) => apiRequest<Problem[]>('/problems', { signal }),
  getById: (id, signal) => apiRequest<Problem>(`/problems/${encodeURIComponent(id)}`, { signal }),
};
