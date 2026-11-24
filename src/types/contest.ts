import type { Difficulty } from '../types';

export interface ContestProblemSummary {
  id: string;
  problemId: string;
  title: string;
  difficulty: Difficulty;
  points: number;
  solvedCount: number;
}

export interface Contest {
  id: string;
  slug: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  status: 'upcoming' | 'active' | 'completed';
  problems: ContestProblemSummary[];
  participantsCount?: number;
}

export interface ContestParticipantStanding {
  rank: number;
  userId: string;
  displayName: string;
  handle: string;
  avatarColor: string;
  university?: string;
  totalScore: number;
  totalTimeMinutes: number; // Pure elapsed solve time (no penalty for rejected submissions)
  problemResults: Record<string, {
    status: 'accepted' | 'wrong_answer' | 'unattempted';
    solvedAtMinutes?: number;
    wrongAttempts: number;
  }>;
}

export interface CollegeLeaderboardEntry {
  rank: number;
  collegeName: string;
  totalPoints: number;
  totalSolved: number;
  studentCount: number;
  topStudent: {
    name: string;
    handle: string;
    points: number;
    avatarColor: string;
  };
}
