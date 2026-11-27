import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  ClockAlert,
  Flame,
  GraduationCap,
  History,
  MoreVertical,
  Play,
  RotateCcw,
  Sparkles,
  X,
  XCircle,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSpacedRepetition } from '../../hooks/useSpacedRepetition';
import { useProblems } from '../../hooks/useDataServices';
import { SPACED_INTERVALS_DAYS, formatSolveTime } from '../../lib/spacedRepetition';
import type { SpacedRepetitionItem } from '../../types/spacedRepetition';
import { DifficultyBadge } from '../../pages/Dashboard';

export default function SpacedRepetitionWidget() {
  const {
    activeItems,
    dueItems,
    upcomingItems,
    graduatedItems,
    summary,
    recordReview,
    snooze,
    dismiss,
    formatScheduleLabel,
  } = useSpacedRepetition();

  const { data: problems } = useProblems();
  const problemsMap = useMemo(() => new Map(problems.map((p) => [p.id, p])), [problems]);

  const [activeTab, setActiveTab] = useState<'due' | 'upcoming' | 'graduated'>(() => {
    return dueItems.length > 0 ? 'due' : 'upcoming';
  });

  const [reviewModalItem, setReviewModalItem] = useState<SpacedRepetitionItem | null>(null);

  const displayedList = useMemo(() => {
    if (activeTab === 'due') return dueItems;
    if (activeTab === 'upcoming') return upcomingItems;
    return graduatedItems;
  }, [activeTab, dueItems, upcomingItems, graduatedItems]);

  return (
    <section
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl border p-5 sm:p-7 transition-all duration-300 space-y-6"
      style={{
        backgroundColor: 'var(--ca-surface)',
        borderColor: summary.dueNowCount > 0
          ? 'color-mix(in srgb, var(--ca-border) 80%, #8b5cf6 20%)'
          : 'var(--ca-border)',
        boxShadow: summary.dueNowCount > 0
          ? '0 10px 30px -10px rgba(139, 92, 246, 0.12)'
          : undefined,
      }}
    >
      {/* Background ambient corner glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-15 blur-3xl"
        style={{
          background: summary.dueNowCount > 0
            ? 'radial-gradient(circle, #8b5cf6, transparent)'
            : 'radial-gradient(circle, #3b82f6, transparent)',
        }}
      />

      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Brain size={12} className="text-purple-400" />
              Spaced Repetition
            </span>
            {summary.dueNowCount > 0 ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 animate-pulse">
                {summary.dueNowCount} Due for Review
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                All Caught Up
              </span>
            )}
            {summary.overdueCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                {summary.overdueCount} Overdue
              </span>
            )}
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
            <span>Adaptive Retention Queue</span>
          </h3>
          <p className="text-xs text-muted leading-relaxed">
            Resurfaces problems you failed or solved slowly at <strong className="text-primary font-semibold">3, 7, and 21 days</strong> to lock algorithmic intuitions into permanent memory.
          </p>
        </div>

        {/* Retention Pulse Pill */}
        <div className="flex items-center gap-4 shrink-0 bg-black/5 dark:bg-white/5 p-3 rounded-2xl border" style={{ borderColor: 'var(--ca-border)' }}>
          <div className="text-center px-1">
            <p className="text-[10px] uppercase font-bold text-muted">Retention</p>
            <p className="text-base sm:text-lg font-black text-purple-400 font-mono">
              {summary.retentionRatePct}%
            </p>
          </div>
          <div className="h-7 w-px bg-border/40" />
          <div className="text-center px-1">
            <p className="text-[10px] uppercase font-bold text-muted">Mastered</p>
            <p className="text-base sm:text-lg font-black text-emerald-400 font-mono">
              {summary.graduatedCount}
            </p>
          </div>
          <div className="h-7 w-px bg-border/40" />
          <div className="text-center px-1">
            <p className="text-[10px] uppercase font-bold text-muted">Total Tracked</p>
            <p className="text-base sm:text-lg font-black text-primary font-mono">
              {summary.totalTracked}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b pb-3 overflow-x-auto text-xs" style={{ borderColor: 'var(--ca-border)' }}>
        <button
          type="button"
          onClick={() => setActiveTab('due')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'due'
              ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
              : 'text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          <Clock size={13} />
          <span>Due for Review</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300">
            {dueItems.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'upcoming'
              ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
              : 'text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          <Calendar size={13} />
          <span>Upcoming Queue</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-500/20 text-muted">
            {upcomingItems.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('graduated')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'graduated'
              ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
              : 'text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          <GraduationCap size={13} />
          <span>Mastered / Graduated</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400">
            {graduatedItems.length}
          </span>
        </button>
      </div>

      {/* Cards List or Empty State */}
      {displayedList.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border space-y-3 bg-black/5 dark:bg-white/5" style={{ borderColor: 'var(--ca-border)' }}>
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20">
            {activeTab === 'due' ? <CheckCircle2 size={20} /> : <Sparkles size={20} />}
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-primary">
              {activeTab === 'due'
                ? 'No problems currently due for review!'
                : activeTab === 'upcoming'
                ? 'No upcoming problems in the review queue'
                : 'No graduated problems yet'}
            </h4>
            <p className="mt-1 text-xs text-muted max-w-md mx-auto leading-relaxed">
              {activeTab === 'due'
                ? 'Great job keeping up with your algorithmic maintenance. Solve problems in the Problem Arena; any failed attempts or slow solves will automatically be scheduled here at 3, 7, and 21 days.'
                : activeTab === 'upcoming'
                ? 'Solve problems at your own pace. Whenever a problem needs reinforcement, it will appear here with its scheduled intervals.'
                : 'Complete all 3 review cycles (Day 3, Day 7, Day 21) on a problem to graduate it into long-term mastery.'}
            </p>
          </div>
          <Link to="/problems" className="btn-primary inline-flex text-xs px-4 py-2 mt-2">
            Explore Problem Arena <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {displayedList.map((item) => {
            const problem = problemsMap.get(item.problemId);
            const title = problem?.title ?? item.problemTitle ?? item.problemId;
            const difficulty = problem?.difficulty ?? item.triggerDifficulty;
            const schedule = formatScheduleLabel(item.nextReviewDate);
            const intervalDays = SPACED_INTERVALS_DAYS[item.stage] ?? 3;

            return (
              <div
                key={item.problemId}
                className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl p-4.5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--ca-surface) 95%, black 5%)',
                  borderColor: schedule.isOverdue
                    ? 'color-mix(in srgb, var(--ca-border) 70%, #f43f5e 30%)'
                    : schedule.isDueToday
                    ? 'color-mix(in srgb, var(--ca-border) 70%, #8b5cf6 30%)'
                    : 'var(--ca-border)',
                }}
              >
                <div className="space-y-3">
                  {/* Top meta tags */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.isGraduated
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : schedule.isOverdue
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : schedule.isDueToday
                          ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                          : 'bg-slate-500/10 text-muted border border-border/30'
                      }`}
                    >
                      {item.isGraduated ? (
                        <>
                          <CheckCircle2 size={11} /> Mastered
                        </>
                      ) : schedule.isOverdue ? (
                        <>
                          <ClockAlert size={11} /> {schedule.label}
                        </>
                      ) : schedule.isDueToday ? (
                        <>
                          <Sparkles size={11} /> Due Today
                        </>
                      ) : (
                        <>
                          <Calendar size={11} /> {schedule.label}
                        </>
                      )}
                    </span>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-purple-500/10 text-purple-400 font-semibold border border-purple-500/20">
                      Stage {item.stage} ({intervalDays}d)
                    </span>
                  </div>

                  {/* Problem Title & Difficulty */}
                  <div>
                    <h4 className="font-display text-sm font-bold text-primary group-hover:text-purple-400 transition-colors line-clamp-1">
                      {title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <DifficultyBadge difficulty={difficulty} />
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          item.reason === 'both'
                            ? 'bg-rose-500/10 text-rose-400'
                            : item.reason === 'failed'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-sky-500/10 text-sky-400'
                        }`}
                      >
                        {item.reason === 'both'
                          ? 'Failed & Slow solve'
                          : item.reason === 'failed'
                          ? `Failed (${item.failedSubmissionsCount}x)`
                          : `Slow solve (${item.slowestDurationSeconds ? Math.round(item.slowestDurationSeconds / 60) : '>25'}m)`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-[color:var(--ca-border)] flex items-center justify-between gap-2">
                  <Link
                    to={`/workspace/${item.problemId}?mode=review`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition shadow-xs"
                  >
                    <Play size={11} className="fill-current" /> Review Now
                  </Link>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setReviewModalItem(item)}
                      title="Quick log review result"
                      className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition"
                    >
                      <CheckCircle2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => snooze(item.problemId, 2)}
                      title="Snooze 2 days"
                      className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition text-[11px]"
                    >
                      <RotateCcw size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => dismiss(item.problemId)}
                      title="Dismiss from review queue"
                      className="p-1.5 rounded-lg text-muted hover:text-rose-400 hover:bg-rose-500/10 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Review Modal */}
      {reviewModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="w-full max-w-md rounded-2xl border p-6 space-y-5 animate-in zoom-in-95"
            style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain size={18} className="text-purple-400" />
                <h3 className="font-display text-base font-bold text-primary">Log Spaced Review</h3>
              </div>
              <button
                type="button"
                onClick={() => setReviewModalItem(null)}
                className="p-1 rounded-lg text-muted hover:text-primary"
              >
                <X size={16} />
              </button>
            </div>

            <div>
              <p className="text-sm font-semibold text-primary">
                {problemsMap.get(reviewModalItem.problemId)?.title ?? reviewModalItem.problemTitle ?? reviewModalItem.problemId}
              </p>
              <p className="text-xs text-muted mt-0.5">
                Current: Stage {reviewModalItem.stage} of 3 ({SPACED_INTERVALS_DAYS[reviewModalItem.stage]}-Day interval)
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-primary">How did this review attempt go?</p>
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    recordReview(reviewModalItem.problemId, 'passed');
                    setReviewModalItem(null);
                  }}
                  className="w-full p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-left transition flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-emerald-400">Solved Cleanly &amp; Fast</p>
                    <p className="text-[11px] text-muted">Advance to Stage {Math.min(3, reviewModalItem.stage + 1)} ({reviewModalItem.stage === 1 ? '7 Days' : reviewModalItem.stage === 2 ? '21 Days' : 'Graduated!'})</p>
                  </div>
                  <CheckCircle2 size={18} className="text-emerald-400" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    recordReview(reviewModalItem.problemId, 'slow');
                    setReviewModalItem(null);
                  }}
                  className="w-full p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-left transition flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-amber-400">Solved, but Took Too Long / Struggled</p>
                    <p className="text-[11px] text-muted">Reinforce at Stage 1 (resurface in 3 days)</p>
                  </div>
                  <Clock size={18} className="text-amber-400" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    recordReview(reviewModalItem.problemId, 'failed');
                    setReviewModalItem(null);
                  }}
                  className="w-full p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-left transition flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-rose-400">Could Not Solve / Incorrect</p>
                    <p className="text-[11px] text-muted">Reset to Stage 1 (resurface in 3 days)</p>
                  </div>
                  <XCircle size={18} className="text-rose-400" />
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setReviewModalItem(null)}
                className="btn-ghost text-xs px-3 py-1.5"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
