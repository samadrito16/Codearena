import { readStorage, writeStorage } from './storage';
import type { ActivityEvent, Difficulty, Problem, SubmissionOutcome, SubmissionRecord } from '../types';
import type {
  SpacedRepetitionItem,
  SpacedRepetitionReason,
  SpacedRepetitionStage,
  SpacedRepetitionStatus,
  SpacedRepetitionSummary,
  SpacedReviewHistoryItem,
} from '../types/spacedRepetition';

export const SPACED_REPETITION_STORAGE_KEY = 'prismcode-spaced-repetition';

/**
 * Standard Spaced Repetition Intervals:
 * Stage 1: 3 Days (short-term recall after initial failure or slow solve)
 * Stage 2: 7 Days (medium-term consolidation)
 * Stage 3: 21 Days (long-term memory retention)
 * Beyond Stage 3: Graduated / Mastered
 */
export const SPACED_INTERVALS_DAYS = {
  1: 3,
  2: 7,
  3: 21,
} as const;

/**
 * Benchmark solving durations (in seconds).
 * Solves exceeding these thresholds are classified as "solved slowly" and
 * automatically scheduled for spaced reinforcement.
 */
export const SLOW_SOLVE_THRESHOLDS: Record<Difficulty, number> = {
  Easy: 15 * 60,   // 900 seconds (15 min)
  Medium: 25 * 60, // 1500 seconds (25 min)
  Hard: 40 * 60,   // 2400 seconds (40 min)
};

export function getSlowThreshold(difficulty: Difficulty = 'Medium'): number {
  return SLOW_SOLVE_THRESHOLDS[difficulty] ?? (25 * 60);
}

export function formatSolveTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  if (safe < 60) return `${safe}s`;
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  if (hours > 0) return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
}

/**
 * Determines whether a solve duration is considered "slow".
 */
export function isSlowSolve(
  durationSeconds: number | undefined,
  difficulty: Difficulty = 'Medium',
  averageForDifficulty?: number | null,
): boolean {
  if (!durationSeconds || durationSeconds <= 0) return false;
  const staticThreshold = getSlowThreshold(difficulty);
  if (durationSeconds > staticThreshold) return true;
  if (averageForDifficulty && averageForDifficulty > 0 && durationSeconds >= averageForDifficulty * 1.3) {
    return true;
  }
  return false;
}

/**
 * Determines whether a submission outcome is classified as a failure.
 */
export function isFailedOutcome(outcome: SubmissionOutcome): boolean {
  return outcome !== 'accepted';
}

/**
 * Formats a Date object to YYYY-MM-DD in local time.
 */
export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Adds integer days to a given date and returns a YYYY-MM-DD string.
 */
export function addDays(fromDate: Date, days: number): string {
  const copy = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + days);
  return formatDateKey(copy);
}

/**
 * Parses a YYYY-MM-DD string into a midnight local Date object.
 */
export function parseDateKey(dateKey: string): Date {
  const [yearStr, monthStr, dayStr] = dateKey.split('T')[0].split('-');
  const year = Number.parseInt(yearStr, 10);
  const month = Number.parseInt(monthStr, 10) - 1;
  const day = Number.parseInt(dayStr, 10);
  return new Date(year, month, day);
}

/**
 * Computes the relative day difference: targetDateKey - todayDateKey.
 * Positive means days remaining in future. Negative means overdue.
 */
export function getDaysDifference(targetDateKey: string, now: Date = new Date()): number {
  const targetDate = parseDateKey(targetDateKey);
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffMs = targetDate.getTime() - todayDate.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Computes the current status of an item.
 */
export function computeItemStatus(item: SpacedRepetitionItem, now: Date = new Date()): SpacedRepetitionStatus {
  if (item.isGraduated) return 'graduated';
  if (!item.nextReviewDate) return 'pending';

  const diffDays = getDaysDifference(item.nextReviewDate, now);
  if (diffDays < 0) return 'overdue';
  if (diffDays === 0) return 'due';
  return 'pending';
}

/**
 * Friendly label for days remaining / overdue status.
 */
export function formatReviewScheduleLabel(nextReviewDate: string, now: Date = new Date()): {
  label: string;
  days: number;
  isOverdue: boolean;
  isDueToday: boolean;
} {
  const diffDays = getDaysDifference(nextReviewDate, now);
  if (diffDays < 0) {
    const abs = Math.abs(diffDays);
    return {
      label: abs === 1 ? 'Overdue by 1 day' : `Overdue by ${abs} days`,
      days: diffDays,
      isOverdue: true,
      isDueToday: false,
    };
  }
  if (diffDays === 0) {
    return {
      label: 'Due today',
      days: 0,
      isOverdue: false,
      isDueToday: true,
    };
  }
  if (diffDays === 1) {
    return {
      label: 'Due tomorrow',
      days: 1,
      isOverdue: false,
      isDueToday: false,
    };
  }
  return {
    label: `Due in ${diffDays} days`,
    days: diffDays,
    isOverdue: false,
    isDueToday: false,
  };
}

/**
 * Creates a brand new SpacedRepetitionItem for a triggered problem.
 */
export function createSpacedRepetitionItem(params: {
  problemId: string;
  problemTitle?: string;
  reason: SpacedRepetitionReason;
  triggerTimestamp: string;
  triggerDifficulty: Difficulty;
  durationSeconds?: number;
}): SpacedRepetitionItem {
  const { problemId, problemTitle, reason, triggerTimestamp, triggerDifficulty, durationSeconds } = params;
  const triggerDate = new Date(triggerTimestamp);
  const nextReviewDate = addDays(triggerDate, SPACED_INTERVALS_DAYS[1]); // 3 days

  const item: SpacedRepetitionItem = {
    problemId,
    problemTitle,
    stage: 1,
    status: 'pending',
    reason,
    triggerTimestamp,
    triggerDifficulty,
    nextReviewDate,
    failedSubmissionsCount: reason === 'failed' || reason === 'both' ? 1 : 0,
    slowestDurationSeconds: durationSeconds,
    consecutiveSuccessfulReviews: 0,
    reviewHistory: [],
    isGraduated: false,
    dismissed: false,
  };

  item.status = computeItemStatus(item, new Date());
  return item;
}

/**
 * Records a review attempt on an existing SpacedRepetitionItem and updates its stage and schedule.
 * - 'passed': advances to next stage (Stage 1 -> 2, Stage 2 -> 3, Stage 3 -> Graduated).
 * - 'failed' | 'slow': regresses back to Stage 1 (resurfaces after 3 days).
 */
export function applyReviewOutcome(
  item: SpacedRepetitionItem,
  outcome: 'passed' | 'failed' | 'slow',
  durationSeconds?: number,
  notes?: string,
  now: Date = new Date(),
): SpacedRepetitionItem {
  const reviewedAt = now.toISOString();
  const historyEntry: SpacedReviewHistoryItem = {
    id: `review-${item.problemId}-${now.getTime()}`,
    reviewedAt,
    stage: item.stage,
    outcome,
    durationSeconds,
    notes,
  };

  const updatedHistory = [...item.reviewHistory, historyEntry];

  if (outcome === 'passed') {
    if (item.stage === 1) {
      const nextDate = addDays(now, SPACED_INTERVALS_DAYS[2]); // 7 days
      return {
        ...item,
        stage: 2,
        status: 'pending',
        lastReviewedDate: reviewedAt,
        nextReviewDate: nextDate,
        consecutiveSuccessfulReviews: item.consecutiveSuccessfulReviews + 1,
        reviewHistory: updatedHistory,
      };
    }
    if (item.stage === 2) {
      const nextDate = addDays(now, SPACED_INTERVALS_DAYS[3]); // 21 days
      return {
        ...item,
        stage: 3,
        status: 'pending',
        lastReviewedDate: reviewedAt,
        nextReviewDate: nextDate,
        consecutiveSuccessfulReviews: item.consecutiveSuccessfulReviews + 1,
        reviewHistory: updatedHistory,
      };
    }
    // Stage 3 passed -> Graduated!
    return {
      ...item,
      status: 'graduated',
      isGraduated: true,
      lastReviewedDate: reviewedAt,
      consecutiveSuccessfulReviews: item.consecutiveSuccessfulReviews + 1,
      reviewHistory: updatedHistory,
    };
  }

  // Outcome was 'failed' or 'slow' -> Reset to Stage 1 with +3 days interval
  const nextDate = addDays(now, SPACED_INTERVALS_DAYS[1]); // 3 days
  return {
    ...item,
    stage: 1,
    status: 'pending',
    lastReviewedDate: reviewedAt,
    nextReviewDate: nextDate,
    consecutiveSuccessfulReviews: 0,
    failedSubmissionsCount: outcome === 'failed' ? item.failedSubmissionsCount + 1 : item.failedSubmissionsCount,
    slowestDurationSeconds: durationSeconds && (!item.slowestDurationSeconds || durationSeconds > item.slowestDurationSeconds)
      ? durationSeconds
      : item.slowestDurationSeconds,
    reviewHistory: updatedHistory,
  };
}

/**
 * Snoozes a review by N days.
 */
export function snoozeReview(item: SpacedRepetitionItem, days = 2, now: Date = new Date()): SpacedRepetitionItem {
  const nextReviewDate = addDays(now, days);
  return {
    ...item,
    nextReviewDate,
    status: 'pending',
  };
}

/**
 * Dismisses an item from the active review queue.
 */
export function dismissReview(item: SpacedRepetitionItem): SpacedRepetitionItem {
  return {
    ...item,
    dismissed: true,
  };
}

/**
 * Computes high-level summary metrics across all tracked spaced repetition items.
 */
export function getSpacedRepetitionSummary(
  items: SpacedRepetitionItem[],
  now: Date = new Date(),
): SpacedRepetitionSummary {
  const activeItems = items.filter((item) => !item.dismissed);

  const byStage: Record<SpacedRepetitionStage, number> = { 1: 0, 2: 0, 3: 0 };
  const byReason: Record<SpacedRepetitionReason, number> = { failed: 0, solved_slowly: 0, both: 0 };

  let dueNowCount = 0;
  let overdueCount = 0;
  let upcomingCount = 0;
  let graduatedCount = 0;
  let totalReviewPasses = 0;
  let totalReviewAttempts = 0;

  for (const item of activeItems) {
    const status = computeItemStatus(item, now);

    if (item.isGraduated) {
      graduatedCount += 1;
    } else {
      byStage[item.stage] += 1;
      if (status === 'due') dueNowCount += 1;
      else if (status === 'overdue') {
        dueNowCount += 1;
        overdueCount += 1;
      } else if (status === 'pending') {
        upcomingCount += 1;
      }
    }

    byReason[item.reason] += 1;

    for (const h of item.reviewHistory) {
      totalReviewAttempts += 1;
      if (h.outcome === 'passed') totalReviewPasses += 1;
    }
  }

  const retentionRatePct = totalReviewAttempts > 0
    ? Math.round((totalReviewPasses / totalReviewAttempts) * 100)
    : 100;

  return {
    totalTracked: activeItems.length,
    dueNowCount,
    overdueCount,
    upcomingCount,
    graduatedCount,
    byStage,
    byReason,
    retentionRatePct,
  };
}

/**
 * Scans past submissions and activity logs to backfill spaced repetition tracking.
 * Ensures zero cold-start: any problem the user failed or solved slowly in their history
 * is automatically scheduled based on the timestamp of that attempt.
 */
export function scanAndBackfillSpacedRepetition(
  submissions: SubmissionRecord[],
  activityLog: ActivityEvent[],
  existingStore: Record<string, SpacedRepetitionItem> = {},
  problemsById?: Map<string, Problem>,
  now: Date = new Date(),
): Record<string, SpacedRepetitionItem> {
  const store: Record<string, SpacedRepetitionItem> = { ...existingStore };

  // 1. Group submissions by problemId
  const problemSubmissions = new Map<string, SubmissionRecord[]>();
  for (const sub of submissions) {
    const list = problemSubmissions.get(sub.problemId) ?? [];
    list.push(sub);
    problemSubmissions.set(sub.problemId, list);
  }

  // 2. Group activity log by problemId
  const problemActivities = new Map<string, ActivityEvent[]>();
  for (const act of activityLog) {
    const list = problemActivities.get(act.problemId) ?? [];
    list.push(act);
    problemActivities.set(act.problemId, list);
  }

  const allProblemIds = new Set<string>([
    ...problemSubmissions.keys(),
    ...problemActivities.keys(),
    ...Object.keys(existingStore),
  ]);

  for (const problemId of allProblemIds) {
    const subs = problemSubmissions.get(problemId) ?? [];
    const acts = problemActivities.get(problemId) ?? [];
    const problem = problemsById?.get(problemId);
    const difficulty: Difficulty = problem?.difficulty ?? subs[0]?.difficulty ?? acts[0]?.difficulty ?? 'Medium';
    const problemTitle: string = problem?.title ?? subs[0]?.title ?? acts[0]?.title ?? problemId;

    const failedSubs = subs.filter((s) => isFailedOutcome(s.outcome));
    const slowSolves = subs.filter((s) => s.outcome === 'accepted' && isSlowSolve(s.durationSeconds, difficulty));
    const slowActs = acts.filter((a) => a.type === 'solved' && isSlowSolve(a.durationSeconds, difficulty));

    const hasFailed = failedSubs.length > 0;
    const hasSlow = slowSolves.length > 0 || slowActs.length > 0;

    if (!hasFailed && !hasSlow) continue;

    const reason: SpacedRepetitionReason = hasFailed && hasSlow ? 'both' : hasFailed ? 'failed' : 'solved_slowly';

    // Find the most recent trigger timestamp
    const allTriggerTimestamps: number[] = [
      ...failedSubs.map((s) => new Date(s.timestamp).getTime()),
      ...slowSolves.map((s) => new Date(s.timestamp).getTime()),
      ...slowActs.map((a) => new Date(a.timestamp).getTime()),
    ].filter((t) => Number.isFinite(t));

    const latestTriggerTime = allTriggerTimestamps.length > 0 ? Math.max(...allTriggerTimestamps) : now.getTime();
    const latestTriggerIso = new Date(latestTriggerTime).toISOString();

    const maxDuration = Math.max(
      0,
      ...slowSolves.map((s) => s.durationSeconds ?? 0),
      ...slowActs.map((a) => a.durationSeconds ?? 0),
    );

    if (!store[problemId]) {
      // Create new scheduled item at Stage 1
      const item = createSpacedRepetitionItem({
        problemId,
        problemTitle,
        reason,
        triggerTimestamp: latestTriggerIso,
        triggerDifficulty: difficulty,
        durationSeconds: maxDuration > 0 ? maxDuration : undefined,
      });
      item.failedSubmissionsCount = failedSubs.length;
      store[problemId] = item;
    } else {
      // Update existing item with latest metadata if needed
      const current = store[problemId];
      current.status = computeItemStatus(current, now);
      current.problemTitle = current.problemTitle || problemTitle;
      current.failedSubmissionsCount = Math.max(current.failedSubmissionsCount, failedSubs.length);
      if (maxDuration > 0 && (!current.slowestDurationSeconds || maxDuration > current.slowestDurationSeconds)) {
        current.slowestDurationSeconds = maxDuration;
      }
      if (reason === 'both' && current.reason !== 'both') {
        current.reason = 'both';
      }
    }
  }

  return store;
}

/**
 * Loads the stored SpacedRepetitionStore from localStorage.
 */
export function loadSpacedRepetitionStore(): Record<string, SpacedRepetitionItem> {
  const raw = readStorage<Record<string, SpacedRepetitionItem>>(SPACED_REPETITION_STORAGE_KEY, {});
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  return raw;
}

/**
 * Persists the SpacedRepetitionStore to localStorage.
 */
export function saveSpacedRepetitionStore(store: Record<string, SpacedRepetitionItem>): void {
  writeStorage(SPACED_REPETITION_STORAGE_KEY, store);
}
