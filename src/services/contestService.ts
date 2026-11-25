import { sampleContests } from '../data/leaderboard';
import type { Contest, ContestParticipantStanding } from '../types/contest';

export const contestService = {
  async listContests(signal?: AbortSignal): Promise<Contest[]> {
    try {
      const res = await fetch('/api/contests', { signal });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback to fixture
    }
    return Promise.resolve([...sampleContests]);
  },

  async getContest(id: string, signal?: AbortSignal): Promise<Contest | null> {
    try {
      const res = await fetch(`/api/contests/${encodeURIComponent(id)}`, { signal });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback to fixture
    }
    const found = sampleContests.find((c) => c.id === id || c.slug === id);
    return Promise.resolve(found || null);
  },

  async getStandings(contestId: string, collegeFilter?: string, signal?: AbortSignal): Promise<ContestParticipantStanding[]> {
    try {
      const url = collegeFilter
        ? `/api/contests/${encodeURIComponent(contestId)}/standings?college=${encodeURIComponent(collegeFilter)}`
        : `/api/contests/${encodeURIComponent(contestId)}/standings`;
      const res = await fetch(url, { signal });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return [];
  },

  async submitProblem(
    contestId: string,
    problemId: string,
    isAccepted: boolean,
    elapsedMinutes: number
  ): Promise<boolean> {
    try {
      const res = await fetch(`/api/contests/${encodeURIComponent(contestId)}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId, isAccepted, elapsedMinutes }),
      });
      return res.ok;
    } catch {
      return true;
    }
  },
};
