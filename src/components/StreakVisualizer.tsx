import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Play,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getBestStreak, getCurrentStreak, getLocalDateKey } from '../lib/progress';
import type { ActivityEvent, Problem } from '../types';

interface DayStreakInfo {
  dateKey: string;
  date: Date;
  dayLabel: string;
  dayNumber: number;
  monthLabel: string;
  isToday: boolean;
  isCompleted: boolean;
  events: ActivityEvent[];
  solvedCount: number;
  durationSeconds: number;
}

export default function StreakVisualizer({ problems = [] }: { problems?: Problem[] }) {
  const { activityLog, dailyCompletions, dailyChallengeByDate } = useApp();
  const today = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => getLocalDateKey(today), [today]);

  const currentStreak = useMemo(() => getCurrentStreak(activityLog, today), [activityLog, today]);
  const bestStreak = useMemo(() => getBestStreak(activityLog), [activityLog]);

  // Build the 14-day rolling window (13 days ago through today)
  const days: DayStreakInfo[] = useMemo(() => {
    return Array.from({ length: 14 }, (_, index) => {
      const offset = 13 - index;
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset);
      const dateKey = getLocalDateKey(date);
      const dayEvents = activityLog.filter(
        (event) => getLocalDateKey(new Date(event.timestamp)) === dateKey,
      );
      const solvedEvents = dayEvents.filter((event) => event.type === 'solved');
      const hasDailyCompleted = Boolean(dailyCompletions[dateKey]);
      const isCompleted = hasDailyCompleted || solvedEvents.length > 0;
      const durationSeconds = dayEvents.reduce((acc, ev) => acc + (ev.durationSeconds || 0), 0);

      return {
        dateKey,
        date,
        dayLabel: date.toLocaleDateString(undefined, { weekday: 'short' }),
        dayNumber: date.getDate(),
        monthLabel: date.toLocaleDateString(undefined, { month: 'short' }),
        isToday: dateKey === todayKey,
        isCompleted,
        events: dayEvents,
        solvedCount: solvedEvents.length,
        durationSeconds,
      };
    });
  }, [activityLog, dailyCompletions, today, todayKey]);

  const [selectedDateKey, setSelectedDateKey] = useState<string>(todayKey);

  const selectedDay = useMemo(
    () => days.find((d) => d.dateKey === selectedDateKey) ?? days[days.length - 1],
    [days, selectedDateKey],
  );

  const completedCount14 = useMemo(() => days.filter((d) => d.isCompleted).length, [days]);
  const completionPercentage = Math.round((completedCount14 / 14) * 100);
  const todayDone = days.find((d) => d.isToday)?.isCompleted ?? false;

  return (
    <div
      className="panel-card overflow-hidden p-5 sm:p-7 shadow-sm transition-all"
      style={{ borderColor: 'var(--ca-border)' }}
    >
      {/* ── Top Header & Stats Summary ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/20">
              <Flame size={19} className="fill-orange-500/20" />
            </span>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-primary">
                14-Day Streak Visualizer
              </h3>
              <p className="text-xs text-muted">
                Daily completion indicators & continuous practice habits
              </p>
            </div>
          </div>
        </div>

        {/* Quick Streak KPI Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            className="flex items-center gap-2 rounded-xl border px-3.5 py-2"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
          >
            <Flame size={16} className="text-orange-500 fill-orange-500" />
            <div className="leading-tight">
              <span className="font-display text-sm font-bold text-primary tabular-nums">
                {currentStreak}
              </span>
              <span className="ml-1 text-[11px] font-medium text-muted">
                {currentStreak === 1 ? 'day streak' : 'days streak'}
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-2 rounded-xl border px-3.5 py-2"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
          >
            <Trophy size={15} className="text-amber-500" />
            <div className="leading-tight">
              <span className="font-display text-sm font-bold text-primary tabular-nums">
                {bestStreak}
              </span>
              <span className="ml-1 text-[11px] font-medium text-muted">best</span>
            </div>
          </div>

          <div
            className="flex items-center gap-2 rounded-xl border px-3.5 py-2"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
          >
            <Zap size={15} className="text-emerald-500" />
            <div className="leading-tight">
              <span className="font-display text-sm font-bold text-primary tabular-nums">
                {completedCount14}/14
              </span>
              <span className="ml-1 text-[11px] font-medium text-muted">({completionPercentage}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 14-Day Interactive Timeline ── */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-[11px] font-semibold text-muted mb-2">
          <span>{days[0]?.monthLabel} {days[0]?.dayNumber}</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Completed
            <span className="ml-2 h-2 w-2 rounded-full bg-orange-400" /> Today
            <span className="ml-2 h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" /> Rest
          </span>
          <span>Today ({days[13]?.monthLabel} {days[13]?.dayNumber})</span>
        </div>

        <div className="relative overflow-x-auto pb-2 pt-1">
          {/* Subtle baseline track connector */}
          <div
            className="absolute left-6 right-6 top-[48px] h-0.5 -translate-y-1/2 z-0 hidden sm:block opacity-40"
            style={{ background: 'var(--ca-border)' }}
          />

          <div className="relative z-10 flex min-w-[620px] items-center justify-between gap-1.5 sm:gap-2">
            {days.map((day) => {
              const isSelected = day.dateKey === selectedDateKey;
              return (
                <button
                  key={day.dateKey}
                  type="button"
                  onClick={() => setSelectedDateKey(day.dateKey)}
                  className={`group relative flex flex-1 flex-col items-center rounded-2xl p-2.5 transition-all duration-200 focus:outline-none ${
                    isSelected
                      ? 'ring-2 ring-indigo-500 shadow-md bg-indigo-50/70 dark:bg-indigo-950/40'
                      : 'hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                  }`}
                  aria-label={`${day.monthLabel} ${day.dayNumber}: ${
                    day.isCompleted
                      ? `Completed, ${day.solvedCount} problems solved`
                      : day.isToday
                      ? 'Today, pending'
                      : 'Rest day'
                  }`}
                >
                  {/* Weekday abbreviation */}
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                    {day.dayLabel}
                  </span>

                  {/* Calendar day number */}
                  <span
                    className={`mt-0.5 text-xs font-bold tabular-nums ${
                      day.isToday ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' : 'text-primary'
                    }`}
                  >
                    {day.dayNumber}
                  </span>

                  {/* Completion Indicator Icon/Circle */}
                  <div
                    className={`mt-2 flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${
                      day.isCompleted
                        ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-md shadow-emerald-500/25 ring-2 ring-emerald-400/30'
                        : day.isToday
                        ? 'border-2 border-dashed border-orange-500 bg-orange-500/15 text-orange-500 animate-pulse'
                        : 'border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/60 text-slate-400'
                    }`}
                  >
                    {day.isCompleted ? (
                      <Flame size={16} className="fill-current" />
                    ) : day.isToday ? (
                      <Play size={13} className="ml-0.5 fill-current" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    )}
                  </div>

                  {/* Today Badge */}
                  {day.isToday ? (
                    <span className="mt-1.5 rounded-full bg-indigo-500/10 px-1.5 py-0.5 text-[8px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Today
                    </span>
                  ) : (
                    <span className="mt-1.5 h-3 text-[9px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                      {day.isCompleted ? 'Done' : 'Rest'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Interactive Selected Day Inspection Card ── */}
      <div
        className="mt-4 rounded-2xl border p-4 sm:p-5 transition-all"
        style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            <Calendar size={15} className="text-muted" />
            <h4 className="text-sm font-bold text-primary">
              {selectedDay.date.toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </h4>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                selectedDay.isCompleted
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : selectedDay.isToday
                  ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                  : 'bg-slate-200/70 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {selectedDay.isCompleted ? (
                <>
                  <CheckCircle2 size={12} />
                  <span>
                    {selectedDay.solvedCount} {selectedDay.solvedCount === 1 ? 'Problem' : 'Problems'} Solved
                  </span>
                </>
              ) : selectedDay.isToday ? (
                <>
                  <Target size={12} />
                  <span>Ready to Solve Today</span>
                </>
              ) : (
                <span>Rest Day</span>
              )}
            </span>
          </div>

          {selectedDay.isToday && !selectedDay.isCompleted && (
            <Link
              to="/daily-challenges"
              className="btn-primary text-xs py-1.5 px-3.5 self-start sm:self-auto inline-flex items-center gap-1.5"
            >
              Take Today's Daily Challenge <ArrowRight size={13} />
            </Link>
          )}

          {selectedDay.isToday && selectedDay.isCompleted && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={14} /> Streak maintained for today!
            </span>
          )}
        </div>

        {/* Selected Day Activity List */}
        {selectedDay.events.length > 0 ? (
          <div className="mt-3.5 divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {selectedDay.events.map((event) => {
              const isSolved = event.type === 'solved';
              return (
                <div key={event.id} className="flex items-center justify-between py-2.5 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                        isSolved
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
                      }`}
                    >
                      {isSolved ? <CheckCircle2 size={13} /> : <Play size={11} />}
                    </span>
                    <Link
                      to={`/workspace/${event.problemId}`}
                      className="truncate font-semibold text-primary hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {event.title}
                    </Link>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        event.difficulty === 'Easy'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : event.difficulty === 'Medium'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {event.difficulty}
                    </span>
                    <span className="rounded bg-slate-200/60 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] text-muted">
                      {event.topic}
                    </span>
                  </div>
                  {event.durationSeconds ? (
                    <span className="flex items-center gap-1 text-[11px] text-muted shrink-0 ml-3">
                      <Clock size={12} /> {Math.max(1, Math.round(event.durationSeconds / 60))}m
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-2.5 text-xs text-muted">
            {selectedDay.isToday
              ? 'No problems or daily challenges logged yet today. Practice now to keep your streak burning!'
              : 'No practice activity logged on this date.'}
          </p>
        )}
      </div>
    </div>
  );
}
