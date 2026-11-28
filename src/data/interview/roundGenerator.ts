import { apiRequest } from '../../lib/api';
import type { Problem } from '../../types';
import type { ActiveInterviewRound, InterviewPresetId } from '../../types/interview';
import { getPresetById } from './presets';

const recentKey = 'prismcode-interview-recent-v1';

export async function generateInterviewRound(presetId: InterviewPresetId): Promise<ActiveInterviewRound> {
  const preset = getPresetById(presetId);
  let recentIds: string[] = [];
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(recentKey) || '[]');
    if (Array.isArray(stored)) recentIds = stored.filter((id): id is string => typeof id === 'string').slice(0, 12);
  } catch {
    // The round can start without browser history.
  }
  const { id, startedAt, problems: [problem1, problem2] } = await apiRequest<{
    id: string;
    startedAt: number;
    problems: [Problem, Problem];
  }>('/catalog/interview/rounds', { method: 'POST', body: JSON.stringify({ preset: presetId, recentIds }) });
  try {
    localStorage.setItem(recentKey, JSON.stringify([...new Set([problem1.id, problem2.id, ...recentIds])].slice(0, 12)));
  } catch {
    // Storage may be unavailable.
  }
  const initialState = (problem: Problem) => ({
    problemId: problem.id,
    language: 'python',
    code: problem.starterCode?.python ?? '',
    isSolved: false,
    passedCount: 0,
    totalCount: problem.testCount ?? 0,
    attemptsCount: 0,
    timeSpentSeconds: 0,
  });

  return {
    id, presetId, startedAt, problem1, problem2,
    title: preset.title,
    patternTheme: 'Technical case studies',
    durationMinutes: preset.durationMinutes,
    currentProblemIndex: 0,
    problem1State: initialState(problem1),
    problem2State: initialState(problem2),
    remainingSeconds: preset.durationMinutes * 60,
    tabSwitches: 0,
    focusLossSeconds: 0,
    fullscreenExits: 0,
    isCompleted: false,
  };
}
