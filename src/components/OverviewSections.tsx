import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Compass,
  Flame,
  Layers,
  Play,
  Send,
  Sparkles,
  Terminal,
  Trophy,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLearningPaths } from '../hooks/useDataServices';
import {
  formatActivityTime,
  formatDuration,
  getCurrentStreak,
  getLocalDateKey,
  isDailyChallengeCompleted,
  selectDailyChallenge,
} from '../lib/progress';
import { DifficultyBadge } from '../pages/Dashboard';
import type { ActivityEvent, Problem, SubmissionRecord } from '../types';

/**
 * Animated number counter component that counts smoothly from 0 to value.
 */
function AnimatedCounter({ value, duration = 650 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startVal = 0;
    const endVal = value;

    if (endVal === 0) {
      setDisplayValue(0);
      return;
    }

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(startVal + (endVal - startVal) * easedProgress);
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(endVal);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [value, duration]);

  return <span className="tabular-nums font-mono">{displayValue}</span>;
}

/**
 * ─────────────────────────────────────────────────────────────
 * SECTION A: Quick Stats Row
 * 4 responsive interactive cards displaying key overview metrics
 * ─────────────────────────────────────────────────────────────
 */
export function QuickStatsRow() {
  const { solvedIds, problems, activityLog, submissions } = useApp();
  const { data: learningPaths } = useLearningPaths();

  const currentStreak = useMemo(() => getCurrentStreak(activityLog), [activityLog]);
  const solvedCount = solvedIds.length;
  const totalProblems = problems.length || 1;
  const solvedPercentage = Math.round((solvedCount / totalProblems) * 100);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold tracking-wider uppercase text-muted">
          Your Performance Pulse
        </h3>
        <Link
          to="/progress"
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 hover:text-amber-600 dark:text-amber-400 hover:underline"
        >
          Detailed analytics <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Stat 1: Solved */}
        <div
          className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg border"
          style={{
            backgroundColor: 'var(--ca-surface)',
            borderColor: 'var(--ca-border)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20 group-hover:scale-105 transition-transform">
              <CheckCircle2 size={19} />
            </span>
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full">
              {solvedPercentage}% mastered
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
              <AnimatedCounter value={solvedCount} />
              <span className="text-sm font-normal text-muted ml-1.5">
                / {problems.length || 0}
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-muted">Problems Solved</p>
          </div>
        </div>

        {/* Stat 2: Day Streak */}
        <div
          className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg border"
          style={{
            backgroundColor: 'var(--ca-surface)',
            borderColor: 'var(--ca-border)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/20 group-hover:scale-105 transition-transform">
              <Flame size={19} className="fill-orange-500/20" />
            </span>
            <span className="text-[11px] font-medium text-orange-600 dark:text-orange-400 font-mono bg-orange-500/10 px-2 py-0.5 rounded-full">
              {currentStreak > 0 ? 'Active streak' : 'Build habit'}
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
              <AnimatedCounter value={currentStreak} />
              <span className="text-sm font-normal text-muted ml-1.5">days</span>
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-muted">Daily Practice Streak</p>
          </div>
        </div>

        {/* Stat 3: Total Submissions */}
        <div
          className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg border"
          style={{
            backgroundColor: 'var(--ca-surface)',
            borderColor: 'var(--ca-border)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 ring-1 ring-indigo-500/20 group-hover:scale-105 transition-transform">
              <Terminal size={19} />
            </span>
            <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded-full">
              Compiler runs
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
              <AnimatedCounter value={submissions.length} />
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-muted">Code Submissions</p>
          </div>
        </div>

        {/* Stat 4: Learning Paths */}
        <div
          className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg border"
          style={{
            backgroundColor: 'var(--ca-surface)',
            borderColor: 'var(--ca-border)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 ring-1 ring-violet-500/20 group-hover:scale-105 transition-transform">
              <Compass size={19} />
            </span>
            <span className="text-[11px] font-medium text-violet-600 dark:text-violet-400 font-mono bg-violet-500/10 px-2 py-0.5 rounded-full">
              Guided tracks
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
              <AnimatedCounter value={learningPaths.length} />
            </div>
            <p className="mt-1 text-xs sm:text-sm font-medium text-muted">Curated Tracks</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ─────────────────────────────────────────────────────────────
 * SECTION B: Daily Challenge Spotlight Card
 * Prominent card showcasing today's algorithmic puzzle
 * ─────────────────────────────────────────────────────────────
 */
export function DailyChallengeCard() {
  const { problems, solvedIds, dailyChallengeByDate, dailyCompletions } = useApp();

  const today = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => getLocalDateKey(today), [today]);

  const challengeProblem = useMemo(() => {
    if (!problems.length) return undefined;
    const assignedId = dailyChallengeByDate[todayKey];
    if (assignedId) {
      const match = problems.find((p) => p.id === assignedId);
      if (match) return match;
    }
    return selectDailyChallenge(problems, today, solvedIds);
  }, [problems, dailyChallengeByDate, todayKey, today, solvedIds]);

  const isCompleted = useMemo(() => {
    if (!challengeProblem) return false;
    return (
      isDailyChallengeCompleted(dailyCompletions, todayKey, challengeProblem.id) ||
      solvedIds.includes(challengeProblem.id)
    );
  }, [challengeProblem, dailyCompletions, todayKey, solvedIds]);

  if (!challengeProblem) return null;

  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border p-5 sm:p-7 transition-all duration-300"
      style={{
        backgroundColor: 'var(--ca-surface)',
        borderColor: isCompleted
          ? 'color-mix(in srgb, var(--ca-border) 80%, #10b981 20%)'
          : 'color-mix(in srgb, var(--ca-border) 75%, #f59e0b 25%)',
        boxShadow: isCompleted
          ? '0 10px 30px -10px rgba(16, 185, 129, 0.08)'
          : '0 10px 30px -10px rgba(245, 158, 11, 0.12)',
      }}
    >
      {/* Background ambient corner glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl"
        style={{
          background: isCompleted
            ? 'radial-gradient(circle, #10b981, transparent)'
            : 'radial-gradient(circle, #f59e0b, transparent)',
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left Column: Challenge Details */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
                isCompleted
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
              }`}
            >
              {isCompleted ? (
                <>
                  <Check size={13} className="stroke-[3]" />
                  <span>Challenge Completed</span>
                </>
              ) : (
                <>
                  <Flame size={13} className="fill-amber-500 animate-pulse" />
                  <span>Today's Spotlight Challenge</span>
                </>
              )}
            </span>

            <span className="text-xs text-muted font-mono">
              {today.toLocaleDateString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          <div>
            <Link
              to={`/workspace/${challengeProblem.id}`}
              className="group inline-flex items-center gap-2"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-primary group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                {challengeProblem.title}
              </h3>
              <ArrowUpRight
                size={18}
                className="text-muted group-hover:text-amber-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <p className="mt-1.5 text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed">
              {challengeProblem.description?.slice(0, 160) ||
                'Sharpen your problem-solving capabilities with today’s highlighted algorithm challenge.'}
              ...
            </p>
          </div>

          {/* Badges & Topics */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <DifficultyBadge difficulty={challengeProblem.difficulty} />
            {challengeProblem.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="rounded-lg bg-black/5 dark:bg-white/5 px-2.5 py-0.5 text-xs font-medium text-muted"
              >
                {topic}
              </span>
            ))}
            <span className="inline-flex items-center gap-1 text-xs text-muted/80 ml-1">
              <Clock size={12} /> ~15-20 min
            </span>
          </div>
        </div>

        {/* Right Column: CTA Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 sm:items-center md:items-end">
          <Link
            to={`/workspace/${challengeProblem.id}`}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs ${
              isCompleted
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/15'
                : 'btn-primary'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 size={16} /> Revisit Workspace
              </>
            ) : (
              <>
                Solve Today's Challenge <ArrowRight size={16} />
              </>
            )}
          </Link>
          <Link
            to="/daily-challenges"
            className="text-xs font-medium text-muted hover:text-primary transition-colors text-center"
          >
            Browse past challenges & streaks →
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * ─────────────────────────────────────────────────────────────
 * SECTION C: Recent Activity Feed
 * Horizontal or compact cards of the user's latest problem solving
 * ─────────────────────────────────────────────────────────────
 */
export function RecentActivityFeed() {
  const { activityLog } = useApp();
  const recentEvents = useMemo(() => activityLog.slice(0, 6), [activityLog]);

  return (
    <section className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-primary">
            Recent Practice & Solves
          </h3>
          <p className="text-xs text-muted">Your latest problem-solving activities and sessions</p>
        </div>
        <Link
          to="/progress"
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 hover:text-amber-600 dark:text-amber-400 hover:underline"
        >
          View full history <ArrowRight size={12} />
        </Link>
      </div>

      {recentEvents.length === 0 ? (
        <div
          className="rounded-2xl p-6 sm:p-8 text-center border space-y-3"
          style={{
            backgroundColor: 'var(--ca-surface)',
            borderColor: 'var(--ca-border)',
          }}
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-primary">
              No recent activity recorded yet
            </h4>
            <p className="mt-1 text-xs text-muted max-w-sm mx-auto">
              Jump into the Problem Arena, test your code, and your solves and practice sessions
              will automatically appear here.
            </p>
          </div>
          <Link to="/problems" className="btn-primary inline-flex text-xs px-4 py-2">
            Explore Problem Arena <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
          {recentEvents.map((event) => {
            const isSolved = event.type === 'solved';
            return (
              <Link
                key={event.id}
                to={`/workspace/${event.problemId}`}
                className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md border"
                style={{
                  backgroundColor: 'var(--ca-surface)',
                  borderColor: 'var(--ca-border)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        isSolved
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                      }`}
                    >
                      {isSolved ? (
                        <>
                          <CheckCircle2 size={12} /> Solved
                        </>
                      ) : (
                        <>
                          <Clock size={12} /> Practice
                        </>
                      )}
                    </span>
                    <span className="text-[11px] font-mono text-muted">
                      {formatActivityTime(event.timestamp)}
                    </span>
                  </div>

                  <h4 className="font-display text-sm font-semibold text-primary group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                    {event.title}
                  </h4>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-[color:var(--ca-border)] text-xs text-muted">
                  <DifficultyBadge difficulty={event.difficulty} />
                  <span className="text-[11px] truncate max-w-[120px]">{event.topic}</span>
                  {typeof event.durationSeconds === 'number' && event.durationSeconds > 0 && (
                    <span className="text-[10px] font-mono text-muted/80">
                      {formatDuration(event.durationSeconds)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

/**
 * ─────────────────────────────────────────────────────────────
 * SECTION D: Continue Where You Left Off
 * Quick resumption tiles for recently attempted problems
 * ─────────────────────────────────────────────────────────────
 */
export function ContinueWhereYouLeftOff() {
  const { submissions, problems, solvedIds } = useApp();

  const recentAttempted = useMemo(() => {
    const seen = new Set<string>();
    const list: { problem: Problem; lastSubmission: SubmissionRecord; isSolved: boolean }[] = [];

    for (const sub of submissions) {
      if (!seen.has(sub.problemId)) {
        seen.add(sub.problemId);
        const prob = problems.find((p) => p.id === sub.problemId);
        if (prob) {
          list.push({
            problem: prob,
            lastSubmission: sub,
            isSolved: solvedIds.includes(prob.id),
          });
        }
      }
      if (list.length >= 2) break;
    }
    return list;
  }, [submissions, problems, solvedIds]);

  if (recentAttempted.length === 0) return null;

  return (
    <section className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-primary">
            Pick Up Where You Left Off
          </h3>
          <p className="text-xs text-muted">Jump straight back into your code editor</p>
        </div>
        <Link
          to="/problems"
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 hover:text-amber-600 dark:text-amber-400 hover:underline"
        >
          All problems <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recentAttempted.map(({ problem, lastSubmission, isSolved }) => (
          <div
            key={problem.id}
            className="group relative overflow-hidden rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isSolved
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {isSolved ? (
                    <>
                      <CheckCircle2 size={13} /> Solved
                    </>
                  ) : (
                    <>
                      <Play size={11} className="fill-current" /> In Progress
                    </>
                  )}
                </span>
                <span className="text-[11px] font-mono text-muted">
                  Last run: {formatActivityTime(lastSubmission.timestamp)}
                </span>
              </div>

              <h4 className="font-display text-base sm:text-lg font-bold text-primary group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                {problem.title}
              </h4>

              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <DifficultyBadge difficulty={problem.difficulty} />
                <span className="rounded-md bg-black/5 dark:bg-white/5 px-2 py-0.5 text-xs font-medium text-muted">
                  {lastSubmission.language}
                </span>
                {problem.topics.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-black/5 dark:bg-white/5 px-2 py-0.5 text-xs font-medium text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-[color:var(--ca-border)] flex items-center justify-between">
              <span className="text-xs text-muted">
                Outcome:{' '}
                <span
                  className={`font-semibold capitalize ${
                    lastSubmission.outcome === 'accepted'
                      ? 'text-emerald-500'
                      : 'text-amber-500 dark:text-amber-400'
                  }`}
                >
                  {lastSubmission.outcome.replace('_', ' ')}
                </span>
              </span>
              <Link
                to={`/workspace/${problem.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline group-hover:translate-x-0.5 transition-transform"
              >
                Open Workspace <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
