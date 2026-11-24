import { sampleLeaderboard, sampleCollegeLeaderboard, type LeaderboardEntry } from '../data/leaderboard';
import type { CollegeLeaderboardEntry } from '../types/contest';
import type { LeaderboardRepository } from './types';

export type { LeaderboardEntry, CollegeLeaderboardEntry };

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new DOMException('Request aborted', 'AbortError');
  }
}

/**
 * Enhanced leaderboard repository with global, college campus, and intra-college queries.
 */
export const leaderboardService: LeaderboardRepository = {
  async list(signal?: AbortSignal): Promise<LeaderboardEntry[]> {
    throwIfAborted(signal);
    try {
      const res = await fetch('/api/leaderboard', { signal });
      if (res.ok) {
        const raw = await res.json();
        if (Array.isArray(raw) && raw.length > 0) {
          return raw.map((r: any) => ({
            name: r.displayName || r.name,
            handle: r.userId ? `@${r.displayName?.toLowerCase().replace(/\s+/g, '') || 'coder'}` : (r.handle || '@coder'),
            score: r.points ?? r.score ?? 0,
            solved: r.solvedCount ?? r.solved ?? 0,
            streak: r.streak ?? 0,
            initials: (r.displayName || r.name || 'PC').slice(0, 2).toUpperCase(),
            color: 'from-indigo-500 to-blue-500',
            university: r.university,
          }));
        }
      }
    } catch {
      // Fallback
    }
    return Promise.resolve([...sampleLeaderboard]);
  },

  async listColleges(signal?: AbortSignal): Promise<CollegeLeaderboardEntry[]> {
    throwIfAborted(signal);
    try {
      const res = await fetch('/api/leaderboard/colleges', { signal });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return Promise.resolve([...sampleCollegeLeaderboard]);
  },

  async listCollegeStudents(college: string, signal?: AbortSignal): Promise<LeaderboardEntry[]> {
    throwIfAborted(signal);
    try {
      const res = await fetch(`/api/leaderboard/college-students?college=${encodeURIComponent(college)}`, { signal });
      if (res.ok) {
        const raw = await res.json();
        if (Array.isArray(raw) && raw.length > 0) {
          return raw.map((r: any) => ({
            name: r.displayName || r.name,
            handle: r.userId ? `@${r.displayName?.toLowerCase().replace(/\s+/g, '') || 'coder'}` : (r.handle || '@coder'),
            score: r.points ?? r.score ?? 0,
            solved: r.solvedCount ?? r.solved ?? 0,
            streak: r.streak ?? 0,
            initials: (r.displayName || r.name || 'PC').slice(0, 2).toUpperCase(),
            color: 'from-indigo-500 to-blue-500',
            university: r.university || college,
          }));
        }
      }
    } catch {
      // Fallback
    }
    const filtered = sampleLeaderboard.filter((s) => s.university?.toLowerCase() === college.toLowerCase());
    return Promise.resolve(filtered.length > 0 ? filtered : [...sampleLeaderboard.slice(0, 3)]);
  },
};
