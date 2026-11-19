import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  editorialsService,
  leaderboardService,
  learningPathsService,
  type AsyncResource,
  type LeaderboardEntry,
  type LearningPath,
  type ProblemEditorial,
} from '../services';
import type { Problem } from '../types';
import { useAsyncResource } from './useAsyncResource';

const EMPTY_LEADERBOARD: LeaderboardEntry[] = [];
const EMPTY_PATHS: LearningPath[] = [];

/**
 * Returns the problem library through the standard AsyncResource shape while staying
 * live-synchronized with local Admin create/edit/delete mutations in AppContext.
 */
export function useProblems(): AsyncResource<Problem[]> {
  const { problems, problemsStatus, problemsError, retryProblems } = useApp();
  return useMemo(
    () => ({
      data: problems,
      status: problemsStatus,
      error: problemsError,
      retry: retryProblems,
    }),
    [problems, problemsStatus, problemsError, retryProblems],
  );
}

/**
 * Fetches leaderboard rankings via `leaderboardService`.
 */
export function useLeaderboard(): AsyncResource<LeaderboardEntry[]> {
  return useAsyncResource<LeaderboardEntry[]>(
    (signal) => leaderboardService.list(signal),
    EMPTY_LEADERBOARD,
    [],
  );
}

/**
 * Fetches curated DSA learning paths via `learningPathsService`.
 */
export function useLearningPaths(): AsyncResource<LearningPath[]> {
  return useAsyncResource<LearningPath[]>(
    (signal) => learningPathsService.list(signal),
    EMPTY_PATHS,
    [],
  );
}

/**
 * Fetches static/API editorial hints and walkthrough for a specific problem via `editorialsService`.
 */
export function useEditorial(problemId: string): AsyncResource<ProblemEditorial | null> {
  return useAsyncResource<ProblemEditorial | null>(
    (signal) => editorialsService.getByProblemId(problemId, signal),
    null,
    [problemId],
  );
}
