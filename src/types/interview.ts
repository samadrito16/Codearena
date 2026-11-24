import type { Problem } from '../types';

export type InterviewPresetId = 'faang_standard' | 'senior_technical' | 'bar_raiser';

export type InterviewVerdict = 'STRONG HIRE' | 'HIRE' | 'LEAN HIRE' | 'NO HIRE';

export interface InterviewPreset {
  id: InterviewPresetId;
  title: string;
  subtitle: string;
  durationMinutes: number;
  problem1Difficulty: 'Medium';
  problem2Difficulty: 'Medium' | 'Hard';
  description: string;
}

export interface InterviewProblemState {
  problemId: string;
  language: string;
  code: string;
  isSolved: boolean;
  passedCount: number;
  totalCount: number;
  runtimeMs?: number;
  memoryMb?: number;
  attemptsCount: number;
  timeSpentSeconds: number;
}

export interface ActiveInterviewRound {
  id: string;
  presetId: InterviewPresetId;
  title: string;
  patternTheme: string;
  durationMinutes: number;
  startedAt: number;
  problem1: Problem;
  problem2: Problem;
  currentProblemIndex: 0 | 1;
  problem1State: InterviewProblemState;
  problem2State: InterviewProblemState;
  remainingSeconds: number;
  tabSwitches: number;
  focusLossSeconds: number;
  fullscreenExits: number;
  isCompleted: boolean;
  submittedAt?: number;
  autoSubmitReason?: string;
}

export interface InterviewScorecard {
  roundId: string;
  title: string;
  verdict: InterviewVerdict;
  overallScore: number; // 0 - 100
  percentile?: number;  // Only defined when real cohort data exists
  durationMinutes: number;
  totalTimeSpentSeconds: number;
  timeAllocation: {
    problem1Minutes: number;
    problem2Minutes: number;
    idealProblem1Minutes: number;
    idealProblem2Minutes: number;
    pacingRating: 'Optimal Pacing' | 'Problem 1 Delayed' | 'Problem 2 Starved' | 'Balanced';
  };
  correctness: {
    problem1Passed: number;
    problem1Total: number;
    problem2Passed: number;
    problem2Total: number;
    totalPassedRatio: number;
  };
  efficiency: {
    problem1RuntimeMs?: number;
    problem2RuntimeMs?: number;
    runtimePercentile?: number;
    memoryPercentile?: number;
    efficiencyVerdict: string;
  };
  integrity: {
    tabSwitches: number;
    fullscreenExits: number;
    rating: string;
  };
  recommendations: string[];
  completedAt: number;
  autoSubmitReason?: string;
}
