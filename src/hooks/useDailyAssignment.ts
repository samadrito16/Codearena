import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { apiRequest } from '../lib/api';
import { getLocalDateKey } from '../lib/progress';
import type { Problem } from '../types';
import { useAsyncResource } from './useAsyncResource';

const emptyAssignment = { problem: null };

export function useDailyAssignment() {
  const { solvedIds, submissions, ensureDailyChallenge } = useApp();
  const day = getLocalDateKey();
  const assignment = useAsyncResource<{ problem: Problem | null; primer?: string }>(signal => {
    const studiedIds = Array.from(new Set([...solvedIds, ...submissions.map(item => item.problemId)])).slice(0, 100);
    return apiRequest('/catalog/daily/assignment', {
      method: 'POST', body: JSON.stringify({ day, studiedIds }), signal,
    });
  }, emptyAssignment, [day]);

  const id = assignment.data.problem?.id;
  useEffect(() => {
    if (id) ensureDailyChallenge(day, id);
  }, [day, id, ensureDailyChallenge]);

  return assignment;
}
