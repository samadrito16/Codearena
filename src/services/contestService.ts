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
    // Return sample standing
    const sample: ContestParticipantStanding[] = [
      {
        rank: 1,
        userId: 'usr_c_01',
        displayName: 'Aarav Sharma',
        handle: 'aarav_iitb',
        avatarColor: 'indigo',
        university: 'IIT Bombay',
        totalScore: 1800,
        totalTimeMinutes: 44, // pure elapsed solve time (no penalty for rejected submissions)
        problemResults: {
          'wc41-q1': { status: 'accepted', solvedAtMinutes: 6, wrongAttempts: 0 },
          'wc41-q2': { status: 'accepted', solvedAtMinutes: 14, wrongAttempts: 1 },
          'wc41-q3': { status: 'accepted', solvedAtMinutes: 26, wrongAttempts: 2 },
          'wc41-q4': { status: 'accepted', solvedAtMinutes: 44, wrongAttempts: 1 },
        },
      },
      {
        rank: 2,
        userId: 'usr_c_02',
        displayName: 'Rohan Deshmukh',
        handle: 'rohan_bits',
        avatarColor: 'emerald',
        university: 'BITS Pilani',
        totalScore: 1800,
        totalTimeMinutes: 52,
        problemResults: {
          'wc41-q1': { status: 'accepted', solvedAtMinutes: 8, wrongAttempts: 0 },
          'wc41-q2': { status: 'accepted', solvedAtMinutes: 17, wrongAttempts: 0 },
          'wc41-q3': { status: 'accepted', solvedAtMinutes: 31, wrongAttempts: 1 },
          'wc41-q4': { status: 'accepted', solvedAtMinutes: 52, wrongAttempts: 3 },
        },
      },
      {
        rank: 3,
        userId: 'usr_c_03',
        displayName: 'Priya Verma',
        handle: 'priya_dtu',
        avatarColor: 'cyan',
        university: 'Delhi Technological University (DTU)',
        totalScore: 1200,
        totalTimeMinutes: 38,
        problemResults: {
          'wc41-q1': { status: 'accepted', solvedAtMinutes: 9, wrongAttempts: 0 },
          'wc41-q2': { status: 'accepted', solvedAtMinutes: 21, wrongAttempts: 2 },
          'wc41-q3': { status: 'accepted', solvedAtMinutes: 38, wrongAttempts: 0 },
          'wc41-q4': { status: 'wrong_answer', wrongAttempts: 2 },
        },
      },
    ];

    if (collegeFilter) {
      const filtered = sample.filter((s) => s.university?.toLowerCase().includes(collegeFilter.toLowerCase()));
      filtered.forEach((s, i) => { s.rank = i + 1; });
      return Promise.resolve(filtered);
    }
    return Promise.resolve(sample);
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
