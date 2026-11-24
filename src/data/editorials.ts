import type { ProblemEditorial } from '../types';

export type { ProblemEditorial };

/**
 * Client-side static editorials bundle has been decoupled.
 * Editorials, hints, and reference solutions are served exclusively from the backend API:
 *   GET /api/problems/:id/editorial (gated by user plan)
 */
export const staticEditorials: Record<string, ProblemEditorial> = {};

export function getProblemEditorial(_problemId: string): ProblemEditorial | null {
  // Static lookup deprecated in favor of editorialsService.getByProblemId()
  return null;
}
