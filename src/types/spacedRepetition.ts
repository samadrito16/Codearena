import type { Difficulty } from '../types';

export type SpacedRepetitionStage = 1 | 2 | 3;
export type SpacedRepetitionStatus = 'pending' | 'due' | 'overdue' | 'graduated';
export type SpacedRepetitionReason = 'failed' | 'solved_slowly' | 'both';

export interface SpacedReviewHistoryItem {
  id: string;
  reviewedAt: string; // ISO date string
  stage: SpacedRepetitionStage;
  outcome: 'passed' | 'failed' | 'slow';
  durationSeconds?: number;
  notes?: string;
}

export interface SpacedRepetitionItem {
  problemId: string;
  problemTitle?: string;
  stage: SpacedRepetitionStage;
  status: SpacedRepetitionStatus;
  reason: SpacedRepetitionReason;
  triggerTimestamp: string;
  triggerDifficulty: Difficulty;
  nextReviewDate: string; // ISO date string (YYYY-MM-DD or full ISO)
  lastReviewedDate?: string;
  failedSubmissionsCount: number;
  slowestDurationSeconds?: number;
  consecutiveSuccessfulReviews: number;
  reviewHistory: SpacedReviewHistoryItem[];
  isGraduated: boolean;
  dismissed?: boolean;
}

export interface SpacedRepetitionSummary {
  totalTracked: number;
  dueNowCount: number;
  overdueCount: number;
  upcomingCount: number;
  graduatedCount: number;
  byStage: Record<SpacedRepetitionStage, number>;
  byReason: Record<SpacedRepetitionReason, number>;
  retentionRatePct: number;
}
