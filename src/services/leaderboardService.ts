import { sampleLeaderboard, type LeaderboardEntry } from '../data/leaderboard';
import type { LeaderboardRepository } from './types';

export type { LeaderboardEntry };

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new DOMException('Request aborted', 'AbortError');
  }
}

/**
 * Sample leaderboard repository adapter.
 * Swap this implementation for a live leaderboard endpoint without changing page components.
 */
export const leaderboardService: LeaderboardRepository = {
  async list(signal?: AbortSignal): Promise<LeaderboardEntry[]> {
    throwIfAborted(signal);
    return Promise.resolve([...sampleLeaderboard]);
  },
};
