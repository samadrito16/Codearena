import { apiRequest } from '../lib/api';
import type { Contest, ContestParticipantStanding } from '../types/contest';

export const contestService = {
  listContests(signal?: AbortSignal): Promise<Contest[]> {
    return apiRequest('/contests', { signal });
  },
  getContest(id: string, signal?: AbortSignal): Promise<Contest | null> {
    return apiRequest(`/contests/${encodeURIComponent(id)}`, { signal });
  },
  getStandings(contestId: string, collegeFilter?: string, signal?: AbortSignal): Promise<ContestParticipantStanding[]> {
    const filter = collegeFilter ? '?college=' + encodeURIComponent(collegeFilter) : '';
    return apiRequest('/contests/' + encodeURIComponent(contestId) + '/standings' + filter, { signal });
  },
};
