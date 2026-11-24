import type { LeaderboardEntry } from '../data/leaderboard';
import type { CollegeLeaderboardEntry } from '../types/contest';
import type { LearningPath } from '../data/learningPaths';
import type { ProblemEditorial, Problem } from '../types';
import type { StorageWriteResult } from '../lib/storage';

export type ResourceStatus = 'loading' | 'ready' | 'error';

export interface AsyncResource<T> {
  data: T;
  status: ResourceStatus;
  error: string | null;
  retry: () => void;
}

export interface ProblemsRepository {
  list(signal?: AbortSignal): Promise<Problem[]>;
  getById(id: string, signal?: AbortSignal): Promise<Problem | null>;
  saveAll(problems: Problem[]): Promise<StorageWriteResult>;
  listSync(): Problem[];
}

export interface LeaderboardRepository {
  list(signal?: AbortSignal): Promise<LeaderboardEntry[]>;
  listColleges(signal?: AbortSignal): Promise<CollegeLeaderboardEntry[]>;
  listCollegeStudents(college: string, signal?: AbortSignal): Promise<LeaderboardEntry[]>;
}

export interface LearningPathsRepository {
  list(signal?: AbortSignal): Promise<LearningPath[]>;
  getById(id: string, signal?: AbortSignal): Promise<LearningPath | null>;
}

export interface EditorialsRepository {
  getByProblemId(problemId: string, signal?: AbortSignal): Promise<ProblemEditorial | null>;
}
