import { getPool } from './questionCatalog.js';
import type { ProblemEditorial } from '../types/index.js';

export const staticEditorials = Object.fromEntries(
  [...getPool('practice'), ...getPool('daily')].flatMap(problem =>
    problem.editorial ? [[problem.id, problem.editorial]] : [],
  ),
) as Record<string, ProblemEditorial>;

export function getProblemEditorial(problemId: string): ProblemEditorial | null {
  return staticEditorials[problemId] ?? null;
}
