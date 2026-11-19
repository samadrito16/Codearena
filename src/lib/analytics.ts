import { countDailyCompletions, getLocalDateKey } from './progress';
import type { ActivityEvent, Difficulty, Problem, SubmissionOutcome, SubmissionRecord } from '../types';

export type ActivityPeriod = 'week' | 'month';

export interface PeriodSummaryData {
  period: ActivityPeriod;
  periodDays: number;
  periodLabel: string;
  solvedInPeriod: number;
  solvedInPrevPeriod: number;
  deltaSolved: number;
  activeDays: number;
  practiceSeconds: number;
  activityCount: number;
  strongestTopic: string | null;
  weakestTopic: string | null;
  focusProblem: Problem | null;
  summary: string;
}

export interface WeeklyReportData {
  solvedThisWeek: number;
  solvedLastWeek: number;
  deltaSolved: number;
  activeDaysThisWeek: number;
  practiceSecondsThisWeek: number;
  strongestTopic: string | null;
  weakestTopic: string | null;
  focusProblem: Problem | null;
  summary: string;
}

export interface HeatmapDay {
  dateKey: string;
  label: string;
  count: number;
  solvedCount: number;
  durationSeconds: number;
  level: 0 | 1 | 2 | 3 | 4;
  isToday: boolean;
  isFuture: boolean;
}

export interface ActivityHeatmapData {
  weeks: HeatmapDay[][];
  monthLabels: { weekIndex: number; label: string }[];
  activeDays: number;
  totalActivities: number;
  totalSolved: number;
}

export interface TopicMasteryItem {
  topic: string;
  solved: number;
  total: number;
  masteryPct: number;
  attempts: number;
  avgSolveSeconds: number | null;
  status: 'strong' | 'building' | 'needs_focus';
  nextProblemId: string | null;
  nextProblemTitle: string | null;
}

export interface DifficultyStatItem {
  difficulty: Difficulty;
  solved: number;
  total: number;
  completionPct: number;
  sharePct: number;
  points: number;
  avgSolveSeconds: number | null;
}

export interface DifficultyStatsData {
  items: DifficultyStatItem[];
  totalSolved: number;
  totalProblems: number;
  overallPct: number;
  totalPoints: number;
}

export interface SubmissionTrendDay {
  dateKey: string;
  label: string;
  accepted: number;
  wrongAnswer: number;
  other: number;
  total: number;
}

export interface SubmissionAnalyticsData {
  total: number;
  accepted: number;
  wrongAnswer: number;
  tle: number;
  runtimeError: number;
  nonAccepted: number;
  acceptanceRate: number | null;
  trend: SubmissionTrendDay[];
  recent: SubmissionRecord[];
}

export interface TimedSolveEntry {
  id: string;
  problemId: string;
  title: string;
  difficulty: Difficulty;
  durationSeconds: number;
  dateLabel: string;
}

export interface SolvingTimeStatsData {
  overallAvgSeconds: number | null;
  fastestSeconds: number | null;
  timedCount: number;
  byDifficulty: { difficulty: Difficulty; avgSeconds: number | null; count: number }[];
  recentTimed: TimedSolveEntry[];
}

export interface MilestoneAchievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress: number;
  target: number;
  progressLabel: string;
  category: 'solved' | 'streak' | 'difficulty' | 'breadth' | 'speed' | 'daily';
}

export const OUTCOME_META: Record<SubmissionOutcome, { label: string; shortLabel: string }> = {
  accepted: { label: 'Accepted', shortLabel: 'AC' },
  wrong_answer: { label: 'Wrong Answer', shortLabel: 'WA' },
  tle: { label: 'Time Limit', shortLabel: 'TLE' },
  runtime_error: { label: 'Runtime Error', shortLabel: 'RE' },
};

export function formatSolveTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  if (safe < 60) return `${safe}s`;
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  if (hours > 0) return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function getTimedSolves(activityLog: ActivityEvent[], submissions: SubmissionRecord[]): TimedSolveEntry[] {
  const seen = new Set<string>();
  const entries: TimedSolveEntry[] = [];

  for (const sub of submissions) {
    if (sub.outcome !== 'accepted' || !sub.durationSeconds || sub.durationSeconds <= 0) continue;
    const dedupeKey = `${sub.problemId}:${sub.timestamp}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);
    entries.push({
      id: sub.id,
      problemId: sub.problemId,
      title: sub.title,
      difficulty: sub.difficulty,
      durationSeconds: sub.durationSeconds,
      dateLabel: new Date(sub.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    });
  }

  for (const event of activityLog) {
    if (event.type !== 'solved' || !event.durationSeconds || event.durationSeconds <= 0) continue;
    const dedupeKey = `${event.problemId}:${event.timestamp}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);
    entries.push({
      id: event.id,
      problemId: event.problemId,
      title: event.title,
      difficulty: event.difficulty,
      durationSeconds: event.durationSeconds,
      dateLabel: new Date(event.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    });
  }

  return entries;
}

export function buildTopicMastery(
  problems: Problem[],
  solvedIds: string[],
  activityLog: ActivityEvent[],
  submissions: SubmissionRecord[],
): TopicMasteryItem[] {
  const solvedSet = new Set(solvedIds);
  const topicMap = new Map<string, Problem[]>();

  for (const problem of problems) {
    for (const topic of problem.topics) {
      const list = topicMap.get(topic);
      if (list) list.push(problem);
      else topicMap.set(topic, [problem]);
    }
  }

  const timedSolves = getTimedSolves(activityLog, submissions);
  const problemTopicLookup = new Map(problems.map((problem) => [problem.id, problem.topics]));

  const items: TopicMasteryItem[] = [];
  for (const [topic, topicProblems] of topicMap.entries()) {
    const solved = topicProblems.filter((problem) => solvedSet.has(problem.id)).length;
    const total = topicProblems.length;
    const masteryPct = total ? Math.round((solved / total) * 100) : 0;
    const nextUnsolved = topicProblems.find((problem) => !solvedSet.has(problem.id)) ?? null;

    const attempts = submissions.filter((sub) => sub.topics.includes(topic)).length
      || activityLog.filter((event) => {
        const topics = problemTopicLookup.get(event.problemId);
        return topics ? topics.includes(topic) : event.topic === topic;
      }).length;

    const matchingDurations = timedSolves
      .filter((entry) => (problemTopicLookup.get(entry.problemId) ?? []).includes(topic))
      .map((entry) => entry.durationSeconds);

    const avgSolveSeconds = matchingDurations.length
      ? Math.round(matchingDurations.reduce((sum, val) => sum + val, 0) / matchingDurations.length)
      : null;

    const status: TopicMasteryItem['status'] = solved > 0 && masteryPct >= 60
      ? 'strong'
      : solved > 0
        ? 'building'
        : 'needs_focus';

    items.push({
      topic,
      solved,
      total,
      masteryPct,
      attempts,
      avgSolveSeconds,
      status,
      nextProblemId: nextUnsolved?.id ?? null,
      nextProblemTitle: nextUnsolved?.title ?? null,
    });
  }

  return items.sort((a, b) => b.masteryPct - a.masteryPct || b.solved - a.solved || b.total - a.total || a.topic.localeCompare(b.topic));
}

export function buildPeriodSummary(
  problems: Problem[],
  solvedIds: string[],
  activityLog: ActivityEvent[],
  submissions: SubmissionRecord[],
  period: ActivityPeriod = 'week',
  now = new Date(),
): PeriodSummaryData {
  const periodDays = period === 'month' ? 30 : 7;
  const periodLabel = period === 'month' ? 'Last 30 days' : 'Last 7 days';
  const unitLabel = period === 'month' ? 'month' : 'week';

  const todayStart = startOfDay(now);
  const periodStart = addDays(todayStart, -(periodDays - 1));
  const prevPeriodStart = addDays(todayStart, -(periodDays * 2 - 1));

  const solvedInPeriodIds = new Set<string>();
  const solvedInPrevPeriodIds = new Set<string>();
  const activeDaysSet = new Set<string>();
  let practiceSeconds = 0;
  let activityCount = 0;

  const seenEventKeys = new Set<string>();

  for (const event of activityLog) {
    const date = new Date(event.timestamp);
    const day = startOfDay(date);
    seenEventKeys.add(`${event.problemId}:${event.timestamp}`);

    if (day >= periodStart && day <= todayStart) {
      activeDaysSet.add(getLocalDateKey(date));
      practiceSeconds += event.durationSeconds ?? 0;
      activityCount += 1;
      if (event.type === 'solved') solvedInPeriodIds.add(event.problemId);
    } else if (day >= prevPeriodStart && day < periodStart) {
      if (event.type === 'solved') solvedInPrevPeriodIds.add(event.problemId);
    }
  }

  for (const sub of submissions) {
    const dedupeKey = `${sub.problemId}:${sub.timestamp}`;
    if (seenEventKeys.has(dedupeKey)) continue;
    const date = new Date(sub.timestamp);
    const day = startOfDay(date);

    if (day >= periodStart && day <= todayStart) {
      activeDaysSet.add(getLocalDateKey(date));
      practiceSeconds += sub.durationSeconds ?? 0;
      activityCount += 1;
      if (sub.outcome === 'accepted') solvedInPeriodIds.add(sub.problemId);
    } else if (day >= prevPeriodStart && day < periodStart) {
      if (sub.outcome === 'accepted') solvedInPrevPeriodIds.add(sub.problemId);
    }
  }

  const solvedInPeriod = solvedInPeriodIds.size;
  const solvedInPrevPeriod = solvedInPrevPeriodIds.size;
  const deltaSolved = solvedInPeriod - solvedInPrevPeriod;

  const periodTopicCounts = new Map<string, number>();
  for (const id of solvedInPeriodIds) {
    const problem = problems.find((item) => item.id === id);
    if (!problem) continue;
    for (const topic of problem.topics) {
      periodTopicCounts.set(topic, (periodTopicCounts.get(topic) ?? 0) + 1);
    }
  }

  const mastery = buildTopicMastery(problems, solvedIds, activityLog, submissions);
  const strongestInPeriod = [...periodTopicCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] ?? null;
  const strongestOverall = mastery.find((item) => item.solved > 0)?.topic ?? null;
  const strongestTopic = strongestInPeriod ?? strongestOverall;

  const weakestCandidate = [...mastery]
    .filter((item) => item.solved < item.total && item.topic !== strongestTopic)
    .sort((a, b) => a.masteryPct - b.masteryPct || b.total - a.total || a.topic.localeCompare(b.topic))[0]
    ?? [...mastery]
      .filter((item) => item.solved < item.total)
      .sort((a, b) => a.masteryPct - b.masteryPct || b.total - a.total)[0]
    ?? null;

  const weakestTopic = weakestCandidate?.topic ?? null;
  const focusProblem = weakestCandidate?.nextProblemId
    ? problems.find((problem) => problem.id === weakestCandidate.nextProblemId) ?? null
    : null;

  let summary: string;
  if (solvedInPeriod > 0) {
    const countPhrase = `You marked ${solvedInPeriod} ${solvedInPeriod === 1 ? 'problem' : 'problems'} solved in the last ${periodDays} days.`;
    if (strongestTopic && weakestTopic) {
      summary = `${countPhrase} Your strongest topic was ${strongestTopic}, while ${weakestTopic} needs more practice.`;
    } else if (strongestTopic) {
      summary = `${countPhrase} Your strongest topic was ${strongestTopic}, and you've covered every topic in your library.`;
    } else {
      summary = `${countPhrase} Keep your momentum going with a new challenge.`;
    }
  } else if (strongestTopic && weakestTopic) {
    summary = `No problems marked solved in the last ${periodDays} days yet. Your strongest local topic is ${strongestTopic}, while ${weakestTopic} needs more practice.`;
  } else if (weakestTopic) {
    summary = `No solved problems logged this ${unitLabel} yet. Start with ${weakestTopic} to build your ${unitLabel === 'month' ? 'monthly' : 'weekly'} momentum.`;
  } else {
    summary = `Add problems or complete a workspace session to unlock your ${unitLabel === 'month' ? 'monthly' : 'weekly'} summary.`;
  }

  return {
    period,
    periodDays,
    periodLabel,
    solvedInPeriod,
    solvedInPrevPeriod,
    deltaSolved,
    activeDays: activeDaysSet.size,
    practiceSeconds,
    activityCount,
    strongestTopic,
    weakestTopic,
    focusProblem,
    summary,
  };
}

export function buildWeeklyReport(
  problems: Problem[],
  solvedIds: string[],
  activityLog: ActivityEvent[],
  submissions: SubmissionRecord[],
  now = new Date(),
): WeeklyReportData {
  const report = buildPeriodSummary(problems, solvedIds, activityLog, submissions, 'week', now);
  return {
    solvedThisWeek: report.solvedInPeriod,
    solvedLastWeek: report.solvedInPrevPeriod,
    deltaSolved: report.deltaSolved,
    activeDaysThisWeek: report.activeDays,
    practiceSecondsThisWeek: report.practiceSeconds,
    strongestTopic: report.strongestTopic,
    weakestTopic: report.weakestTopic,
    focusProblem: report.focusProblem,
    summary: report.summary,
  };
}

export function buildActivityHeatmap(
  activityLog: ActivityEvent[],
  submissions: SubmissionRecord[],
  weekCount = 52,
  now = new Date(),
): ActivityHeatmapData {
  const today = startOfDay(now);
  const todayKey = getLocalDateKey(today);

  // Align grid to Monday -> Sunday columns, ending at the Sunday of the current week
  const dayOfWeekMon0 = (today.getDay() + 6) % 7; // Mon=0 .. Sun=6
  const currentWeekMonday = addDays(today, -dayOfWeekMon0);
  const gridStart = addDays(currentWeekMonday, -(weekCount - 1) * 7);

  const dayCounts = new Map<string, { count: number; solvedCount: number; durationSeconds: number }>();
  const seenKeys = new Set<string>();

  const bump = (dateKey: string, isSolved: boolean, durationSeconds = 0) => {
    const existing = dayCounts.get(dateKey) ?? { count: 0, solvedCount: 0, durationSeconds: 0 };
    existing.count += 1;
    if (isSolved) existing.solvedCount += 1;
    existing.durationSeconds += durationSeconds;
    dayCounts.set(dateKey, existing);
  };

  for (const event of activityLog) {
    seenKeys.add(`${event.problemId}:${event.timestamp}`);
    const key = getLocalDateKey(new Date(event.timestamp));
    bump(key, event.type === 'solved', event.durationSeconds ?? 0);
  }

  for (const sub of submissions) {
    const dedupeKey = `${sub.problemId}:${sub.timestamp}`;
    if (seenKeys.has(dedupeKey)) continue;
    const key = getLocalDateKey(new Date(sub.timestamp));
    bump(key, sub.outcome === 'accepted', sub.durationSeconds ?? 0);
  }

  const weeks: HeatmapDay[][] = [];
  const monthLabels: { weekIndex: number; label: string }[] = [];
  let lastLabeledMonth = -1;
  let activeDays = 0;
  let totalActivities = 0;
  let totalSolved = 0;

  for (let weekIdx = 0; weekIdx < weekCount; weekIdx += 1) {
    const column: HeatmapDay[] = [];
    const weekStart = addDays(gridStart, weekIdx * 7);
    const month = weekStart.getMonth();
    if (month !== lastLabeledMonth) {
      monthLabels.push({
        weekIndex: weekIdx,
        label: weekStart.toLocaleDateString([], { month: 'short' }),
      });
      lastLabeledMonth = month;
    }

    for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
      const date = addDays(weekStart, dayOffset);
      const dateKey = getLocalDateKey(date);
      const isFuture = date > today;
      const stats = isFuture ? undefined : dayCounts.get(dateKey);
      const count = stats?.count ?? 0;
      const solvedCount = stats?.solvedCount ?? 0;
      const durationSeconds = stats?.durationSeconds ?? 0;
      const level: HeatmapDay['level'] = count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : count === 3 ? 3 : 4;

      if (!isFuture && count > 0) {
        activeDays += 1;
        totalActivities += count;
        totalSolved += solvedCount;
      }

      column.push({
        dateKey,
        label: date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
        count,
        solvedCount,
        durationSeconds,
        level,
        isToday: dateKey === todayKey,
        isFuture,
      });
    }

    weeks.push(column);
  }

  return {
    weeks,
    monthLabels,
    activeDays,
    totalActivities,
    totalSolved,
  };
}

export function buildDifficultyStats(
  problems: Problem[],
  solvedIds: string[],
  activityLog: ActivityEvent[],
  submissions: SubmissionRecord[],
): DifficultyStatsData {
  const solvedSet = new Set(solvedIds);
  const timedSolves = getTimedSolves(activityLog, submissions);
  const pointMap: Record<Difficulty, number> = { Easy: 10, Medium: 20, Hard: 30 };
  const tiers: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  const totalSolved = problems.filter((problem) => solvedSet.has(problem.id)).length;
  const totalProblems = problems.length;
  const overallPct = totalProblems ? Math.round((totalSolved / totalProblems) * 100) : 0;

  const items: DifficultyStatItem[] = tiers.map((difficulty) => {
    const bucket = problems.filter((problem) => problem.difficulty === difficulty);
    const solved = bucket.filter((problem) => solvedSet.has(problem.id)).length;
    const total = bucket.length;
    const completionPct = total ? Math.round((solved / total) * 100) : 0;
    const sharePct = totalSolved ? Math.round((solved / totalSolved) * 100) : 0;
    const points = solved * pointMap[difficulty];

    const durations = timedSolves
      .filter((entry) => entry.difficulty === difficulty)
      .map((entry) => entry.durationSeconds);
    const avgSolveSeconds = durations.length
      ? Math.round(durations.reduce((sum, val) => sum + val, 0) / durations.length)
      : null;

    return { difficulty, solved, total, completionPct, sharePct, points, avgSolveSeconds };
  });

  const totalPoints = items.reduce((sum, item) => sum + item.points, 0);
  return { items, totalSolved, totalProblems, overallPct, totalPoints };
}

export function buildSubmissionAnalytics(
  submissions: SubmissionRecord[],
  now = new Date(),
): SubmissionAnalyticsData {
  const total = submissions.length;
  const accepted = submissions.filter((sub) => sub.outcome === 'accepted').length;
  const wrongAnswer = submissions.filter((sub) => sub.outcome === 'wrong_answer').length;
  const tle = submissions.filter((sub) => sub.outcome === 'tle').length;
  const runtimeError = submissions.filter((sub) => sub.outcome === 'runtime_error').length;
  const nonAccepted = total - accepted;
  const acceptanceRate = total > 0 ? Math.round((accepted / total) * 100) : null;

  const today = startOfDay(now);
  const trend: SubmissionTrendDay[] = Array.from({ length: 7 }, (_, idx) => {
    const date = addDays(today, -(6 - idx));
    const dateKey = getLocalDateKey(date);
    const daySubs = submissions.filter((sub) => getLocalDateKey(new Date(sub.timestamp)) === dateKey);
    const dayAccepted = daySubs.filter((sub) => sub.outcome === 'accepted').length;
    const dayWrong = daySubs.filter((sub) => sub.outcome === 'wrong_answer').length;
    const dayOther = daySubs.length - dayAccepted - dayWrong;
    return {
      dateKey,
      label: date.toLocaleDateString([], { weekday: 'short' }),
      accepted: dayAccepted,
      wrongAnswer: dayWrong,
      other: dayOther,
      total: daySubs.length,
    };
  });

  return {
    total,
    accepted,
    wrongAnswer,
    tle,
    runtimeError,
    nonAccepted,
    acceptanceRate,
    trend,
    recent: submissions.slice(0, 6),
  };
}

export function buildSolvingTimeStats(
  activityLog: ActivityEvent[],
  submissions: SubmissionRecord[],
): SolvingTimeStatsData {
  const timed = getTimedSolves(activityLog, submissions);
  const timedCount = timed.length;
  const overallAvgSeconds = timedCount
    ? Math.round(timed.reduce((sum, item) => sum + item.durationSeconds, 0) / timedCount)
    : null;
  const fastestSeconds = timedCount
    ? Math.min(...timed.map((item) => item.durationSeconds))
    : null;

  const tiers: Difficulty[] = ['Easy', 'Medium', 'Hard'];
  const byDifficulty = tiers.map((difficulty) => {
    const list = timed.filter((item) => item.difficulty === difficulty);
    return {
      difficulty,
      count: list.length,
      avgSeconds: list.length
        ? Math.round(list.reduce((sum, item) => sum + item.durationSeconds, 0) / list.length)
        : null,
    };
  });

  return {
    overallAvgSeconds,
    fastestSeconds,
    timedCount,
    byDifficulty,
    recentTimed: timed.slice(0, 8).reverse(),
  };
}

export function buildMilestoneAchievements(params: {
  problems: Problem[];
  solvedIds: string[];
  activityLog: ActivityEvent[];
  submissions: SubmissionRecord[];
  dailyCompletions: Record<string, string>;
  dailyChallengeByDate?: Record<string, string>;
  currentStreak: number;
  bestStreak: number;
}): MilestoneAchievement[] {
  const { problems, solvedIds, activityLog, submissions, dailyCompletions, dailyChallengeByDate, currentStreak, bestStreak } = params;
  const solvedSet = new Set(solvedIds);
  const solvedProblems = problems.filter((problem) => solvedSet.has(problem.id));
  const solvedCount = solvedProblems.length;
  const hardSolved = solvedProblems.filter((problem) => problem.difficulty === 'Hard').length;
  const distinctTopicsSolved = new Set(solvedProblems.flatMap((problem) => problem.topics)).size;
  const dailyCount = countDailyCompletions(dailyCompletions, dailyChallengeByDate);
  const bestObservedStreak = Math.max(currentStreak, bestStreak);
  const totalPracticeMinutes = Math.floor(
    activityLog.reduce((sum, event) => sum + (event.durationSeconds ?? 0), 0) / 60,
  );
  const timedSolves = getTimedSolves(activityLog, submissions);
  const fastSolves = timedSolves.filter((entry) => entry.durationSeconds <= 600).length;
  const libraryTarget = Math.max(1, problems.length);

  return [
    {
      id: 'first-solve',
      title: 'First Breakthrough',
      description: 'Mark your first coding problem solved locally.',
      unlocked: solvedCount >= 1,
      progress: Math.min(1, solvedCount),
      target: 1,
      progressLabel: `${Math.min(1, solvedCount)} / 1`,
      category: 'solved',
    },
    {
      id: 'five-solved',
      title: 'Problem Solver (5)',
      description: 'Mark 5 problems solved in your local library.',
      unlocked: solvedCount >= 5,
      progress: Math.min(5, solvedCount),
      target: 5,
      progressLabel: `${Math.min(5, solvedCount)} / 5`,
      category: 'solved',
    },
    {
      id: 'library-master',
      title: 'Library Finisher',
      description: `Complete all ${libraryTarget} problems in your library.`,
      unlocked: solvedCount >= libraryTarget && problems.length > 0,
      progress: Math.min(libraryTarget, solvedCount),
      target: libraryTarget,
      progressLabel: `${Math.min(libraryTarget, solvedCount)} / ${libraryTarget}`,
      category: 'solved',
    },
    {
      id: 'streak-3',
      title: 'Streak Spark',
      description: 'Practice consistently for 3 consecutive days.',
      unlocked: bestObservedStreak >= 3,
      progress: Math.min(3, bestObservedStreak),
      target: 3,
      progressLabel: `${Math.min(3, bestObservedStreak)} / 3 days`,
      category: 'streak',
    },
    {
      id: 'streak-7',
      title: '7-Day Warrior',
      description: 'Reach a 7-day coding streak.',
      unlocked: bestObservedStreak >= 7,
      progress: Math.min(7, bestObservedStreak),
      target: 7,
      progressLabel: `${Math.min(7, bestObservedStreak)} / 7 days`,
      category: 'streak',
    },
    {
      id: 'hard-hitter',
      title: 'Hard Hitter',
      description: 'Conquer at least one Hard problem.',
      unlocked: hardSolved >= 1,
      progress: Math.min(1, hardSolved),
      target: 1,
      progressLabel: `${Math.min(1, hardSolved)} / 1 Hard`,
      category: 'difficulty',
    },
    {
      id: 'topic-explorer',
      title: 'Topic Explorer',
      description: 'Solve problems across 4 distinct DSA topics.',
      unlocked: distinctTopicsSolved >= 4,
      progress: Math.min(4, distinctTopicsSolved),
      target: 4,
      progressLabel: `${Math.min(4, distinctTopicsSolved)} / 4 topics`,
      category: 'breadth',
    },
    {
      id: 'daily-devotee',
      title: 'Daily Devotee',
      description: 'Complete 3 Daily Challenges.',
      unlocked: dailyCount >= 3,
      progress: Math.min(3, dailyCount),
      target: 3,
      progressLabel: `${Math.min(3, dailyCount)} / 3 dailies`,
      category: 'daily',
    },
    {
      id: 'speed-runner',
      title: 'Speed Runner',
      description: 'Solve a workspace problem in under 10 minutes.',
      unlocked: fastSolves >= 1,
      progress: Math.min(1, fastSolves),
      target: 1,
      progressLabel: `${Math.min(1, fastSolves)} / 1 fast solve`,
      category: 'speed',
    },
    {
      id: 'deep-focus',
      title: 'Deep Focus',
      description: 'Log 30 minutes of estimated workspace practice.',
      unlocked: totalPracticeMinutes >= 30,
      progress: Math.min(30, totalPracticeMinutes),
      target: 30,
      progressLabel: `${Math.min(30, totalPracticeMinutes)} / 30 min`,
      category: 'speed',
    },
  ];
}
