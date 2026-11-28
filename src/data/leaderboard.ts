import type { CollegeLeaderboardEntry } from '../types/contest';

export interface LeaderboardEntry {
  name: string;
  handle: string;
  score: number;
  solved: number;
  streak: number;
  initials: string;
  color: string;
  university?: string;
}

/**
 * Global individual leaderboard fixtures with college affiliations.
 */
export const sampleLeaderboard: LeaderboardEntry[] = [];

/**
 * Campus Cup (Inter-College Rankings) fixture.
 */
export const sampleCollegeLeaderboard: CollegeLeaderboardEntry[] = [];
