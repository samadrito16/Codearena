import type { LearningModule, LearningPath } from '../data/learningPaths';
import type { ActivityEvent, Problem } from '../types';

export function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Daily completion must match both the specific calendar date key and assigned challenge ID. */
export function isDailyChallengeCompleted(
  dailyCompletions: Record<string, string>,
  dateKey: string,
  problemId: string | undefined,
): boolean {
  if (!dateKey || !problemId) return false;
  return dailyCompletions[dateKey] === problemId;
}

export function countDailyCompletions(
  dailyCompletions: Record<string, string>,
  dailyChallengeByDate?: Record<string, string>,
): number {
  return Object.entries(dailyCompletions).filter(([dateKey, completedProblemId]) => {
    if (!dateKey || !completedProblemId) return false;
    if (dailyChallengeByDate && dailyChallengeByDate[dateKey]) {
      return dailyChallengeByDate[dateKey] === completedProblemId;
    }
    return true;
  }).length;
}

/** Pick one deterministic challenge per local calendar day, preferring an unsolved problem. */
export function selectDailyChallenge(
  problems: Problem[],
  date = new Date(),
  solvedIds: string[] = [],
): Problem | undefined {
  if (!problems.length) return undefined;
  const dayNumber = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  const startIndex = ((dayNumber % problems.length) + problems.length) % problems.length;

  for (let offset = 0; offset < problems.length; offset += 1) {
    const candidate = problems[(startIndex + offset) % problems.length];
    if (!solvedIds.includes(candidate.id)) return candidate;
  }

  return problems[startIndex];
}

function getYesterdayKey(date = new Date()): string {
  const yesterday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  return getLocalDateKey(yesterday);
}

function dateOrdinal(dateKey: string): number {
  const [year, month, day] = dateKey.split('-').map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
}

function activityDates(events: ActivityEvent[]): Set<string> {
  return new Set(events.map((event) => getLocalDateKey(new Date(event.timestamp))));
}

export function getCurrentStreak(events: ActivityEvent[], now = new Date()): number {
  const dates = activityDates(events);
  const today = getLocalDateKey(now);
  const yesterday = getYesterdayKey(now);
  if (!dates.has(today) && !dates.has(yesterday)) return 0;

  let cursor = dates.has(today) ? now : new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  let streak = 0;
  while (dates.has(getLocalDateKey(cursor))) {
    streak += 1;
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - 1);
  }
  return streak;
}

export function getBestStreak(events: ActivityEvent[]): number {
  const sorted = [...activityDates(events)].sort((a, b) => a.localeCompare(b));
  if (!sorted.length) return 0;

  let best = 1;
  let current = 1;
  for (let index = 1; index < sorted.length; index += 1) {
    if (dateOrdinal(sorted[index]) - dateOrdinal(sorted[index - 1]) === 1) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 1;
    }
  }
  return best;
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(Math.max(0, totalSeconds) / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0) return `${hours}h ${remainingMinutes}m`;
  return `${minutes}m`;
}

export function formatActivityTime(timestamp: string, now = new Date()): string {
  const date = new Date(timestamp);
  const elapsedMs = Math.max(0, now.getTime() - date.getTime());
  const elapsedMinutes = Math.floor(elapsedMs / 60_000);
  if (elapsedMinutes < 1) return 'Just now';
  if (elapsedMinutes < 60) return `${elapsedMinutes}m ago`;
  if (getLocalDateKey(date) === getLocalDateKey(now)) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
  if (elapsedMinutes < 24 * 60) return 'Yesterday';
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export type ModuleStatus = 'completed' | 'active' | 'locked' | 'upcoming';

export interface EvaluatedModule {
  module: LearningModule;
  problems: Problem[];
  solvedCount: number;
  totalCount: number;
  status: ModuleStatus;
  nextProblem: Problem | null;
}

export interface EvaluatedLearningPath {
  path: LearningPath;
  modules: EvaluatedModule[];
  solvedCount: number;
  totalProblems: number;
  completedModules: number;
  availableModules: number;
  progressPct: number;
  status: 'completed' | 'in_progress' | 'ready' | 'upcoming';
  nextModule: EvaluatedModule | null;
  nextProblem: Problem | null;
}

export interface ContinueLearningTarget {
  path: EvaluatedLearningPath;
  module: EvaluatedModule;
  problem: Problem;
}

export function evaluateLearningPath(
  path: LearningPath,
  problems: Problem[],
  solvedIds: string[],
  guidedSequence = true,
): EvaluatedLearningPath {
  const solvedSet = new Set(solvedIds);
  const problemById = new Map(problems.map((problem) => [problem.id, problem]));

  let previousAvailableComplete = true;
  const evaluatedModules: EvaluatedModule[] = [];

  for (const mod of path.modules) {
    const matchedProblems: Problem[] = [];
    const seenInModule = new Set<string>();

    for (const id of mod.problemIds) {
      const found = problemById.get(id);
      if (found && !seenInModule.has(found.id)) {
        matchedProblems.push(found);
        seenInModule.add(found.id);
      }
    }


    const totalCount = matchedProblems.length;
    const solvedCount = matchedProblems.filter((problem) => solvedSet.has(problem.id)).length;
    const nextProblem = matchedProblems.find((problem) => !solvedSet.has(problem.id)) ?? null;

    let status: ModuleStatus;
    if (totalCount === 0) {
      status = 'upcoming';
    } else if (solvedCount === totalCount) {
      status = 'completed';
    } else if (guidedSequence && !previousAvailableComplete) {
      status = 'locked';
    } else {
      status = 'active';
    }

    if (totalCount > 0 && status !== 'completed') {
      previousAvailableComplete = false;
    }

    evaluatedModules.push({
      module: mod,
      problems: matchedProblems,
      solvedCount,
      totalCount,
      status,
      nextProblem,
    });
  }

  // Deduplicate problems across modules when computing path-level completion
  const uniqueProblems = new Map<string, Problem>();
  for (const mod of evaluatedModules) {
    for (const problem of mod.problems) uniqueProblems.set(problem.id, problem);
  }
  const totalProblems = uniqueProblems.size;
  const solvedCount = [...uniqueProblems.keys()].filter((id) => solvedSet.has(id)).length;
  const availableModules = evaluatedModules.filter((mod) => mod.totalCount > 0).length;
  const completedModules = evaluatedModules.filter((mod) => mod.status === 'completed').length;
  const progressPct = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  const nextModule = evaluatedModules.find((mod) => mod.status === 'active' && mod.nextProblem)
    ?? evaluatedModules.find((mod) => mod.nextProblem !== null)
    ?? null;
  const nextProblem = nextModule?.nextProblem ?? null;

  let status: EvaluatedLearningPath['status'];
  if (totalProblems === 0) {
    status = 'upcoming';
  } else if (solvedCount === totalProblems) {
    status = 'completed';
  } else if (solvedCount > 0) {
    status = 'in_progress';
  } else {
    status = 'ready';
  }

  return {
    path,
    modules: evaluatedModules,
    solvedCount,
    totalProblems,
    completedModules,
    availableModules,
    progressPct,
    status,
    nextModule,
    nextProblem,
  };
}

export function evaluateAllLearningPaths(
  paths: LearningPath[],
  problems: Problem[],
  solvedIds: string[],
  guidedSequence = true,
): EvaluatedLearningPath[] {
  return [...paths]
    .sort((a, b) => a.order - b.order)
    .map((path) => evaluateLearningPath(path, problems, solvedIds, guidedSequence));
}

export function findContinueLearningTarget(
  evaluatedPaths: EvaluatedLearningPath[],
): ContinueLearningTarget | null {
  // Prefer an already-started path first, then the earliest ready path with an incomplete problem.
  const inProgress = evaluatedPaths.find((item) => item.status === 'in_progress' && item.nextModule && item.nextProblem);
  if (inProgress && inProgress.nextModule && inProgress.nextProblem) {
    return { path: inProgress, module: inProgress.nextModule, problem: inProgress.nextProblem };
  }
  const nextReady = evaluatedPaths.find((item) => item.nextModule && item.nextProblem);
  if (nextReady && nextReady.nextModule && nextReady.nextProblem) {
    return { path: nextReady, module: nextReady.nextModule, problem: nextReady.nextProblem };
  }
  return null;
}
