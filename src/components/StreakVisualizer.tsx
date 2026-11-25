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
      className="rounded-3xl border overflow-hidden p-6 sm:p-7 shadow-sm transition-all"
      style={{
        borderColor: 'var(--ca-border)',
        background: 'var(--ca-surface)',
      }}
    >
      {/* ── Top Header & Stats Summary ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-2xl border text-primary shadow-xs"
            style={{ backgroundColor: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
          >
            <Flame size={20} className="fill-current" />
          </span>
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-primary">
              14-Day Streak Visualizer
            </h3>
            <p className="text-xs text-muted">
              Daily completion status and practice consistency
            </p>
          </div>
        </div>

        {/* Quick Streak KPI Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            className="flex items-center gap-2 rounded-2xl border px-3.5 py-2 shadow-xs"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
          >
            <Flame size={15} className="text-primary" />
            <div className="leading-tight">
              <span className="font-display text-sm font-extrabold text-primary tabular-nums">
                {currentStreak}
              </span>
              <span className="ml-1.5 text-[11px] font-medium text-muted">
                {currentStreak === 1 ? 'day streak' : 'days streak'}
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-2 rounded-2xl border px-3.5 py-2 shadow-xs"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
          >
            <Trophy size={15} className="text-primary" />
            <div className="leading-tight">
              <span className="font-display text-sm font-extrabold text-primary tabular-nums">
                {bestStreak}
              </span>
              <span className="ml-1.5 text-[11px] font-medium text-muted">best</span>
            </div>
          </div>

          <div
            className="flex items-center gap-2 rounded-2xl border px-3.5 py-2 shadow-xs"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
          >
            <Zap size={15} className="text-primary" />
            <div className="leading-tight">
              <span className="font-display text-sm font-extrabold text-primary tabular-nums">
                {completedCount14}/14
              </span>
              <span className="ml-1.5 text-[11px] font-medium text-muted">({completionPercentage}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 14-Day Interactive Timeline ── */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-[11px] font-semibold text-muted mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-muted" />
            <span>{days[0]?.monthLabel} {days[0]?.dayNumber}</span>
          </span>
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ background: 'var(--ca-accent-solid)', color: 'var(--ca-accent-text)' }}
            >
              <CheckCircle2 size={11} /> Solved
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-semibold text-primary"
              style={{ borderColor: 'var(--ca-accent-solid)', background: 'var(--ca-surface-muted)' }}
            >
              <Target size={11} /> Today
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-medium text-muted"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-muted" /> Rest
            </span>
          </div>
          <span>Today ({days[13]?.monthLabel} {days[13]?.dayNumber})</span>
        </div>

        <div className="relative overflow-x-auto pb-2 pt-1">
          {/* Baseline track connector */}
          <div
            className="absolute left-6 right-6 top-[50px] h-0.5 -translate-y-1/2 z-0 hidden sm:block opacity-40"
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
                  className={`group relative flex flex-1 flex-col items-center rounded-2xl p-2.5 transition-all duration-200 focus:outline-none cursor-pointer ${
                    isSelected
                      ? 'border shadow-md -translate-y-0.5'
                      : 'hover:bg-[var(--ca-surface-muted)] hover:-translate-y-0.5'
                  }`}
                  style={{
                    borderColor: isSelected ? 'var(--ca-accent-solid)' : 'transparent',
                    backgroundColor: isSelected ? 'var(--ca-surface-muted)' : undefined,
                  }}
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
                      day.isToday ? 'font-extrabold text-primary' : 'text-primary'
                    }`}
                  >
                    {day.dayNumber}
                  </span>

                  {/* Completion Indicator Icon/Circle */}
                  <div
                    className="mt-2 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-105 shadow-xs"
                    style={{
                      background: day.isCompleted ? 'var(--ca-accent-solid)' : 'var(--ca-surface)',
                      color: day.isCompleted ? 'var(--ca-accent-text)' : 'var(--ca-text)',
                      border: day.isToday && !day.isCompleted ? '2px dashed var(--ca-accent-solid)' : '1px solid var(--ca-border)',
                    }}
                  >
                    {day.isCompleted ? (
                      <CheckCircle2 size={16} />
                    ) : day.isToday ? (
                      <Play size={13} className="ml-0.5 fill-current" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-muted opacity-40" />
                    )}
                  </div>

                  {/* Today Badge */}
                  {day.isToday ? (
                    <span
                      className="mt-1.5 rounded-full px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider"
                      style={{ background: 'var(--ca-accent-solid)', color: 'var(--ca-accent-text)' }}
                    >
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
        className="mt-5 rounded-2xl border p-4 sm:p-5 transition-all"
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
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold border"
              style={{
                background: selectedDay.isCompleted ? 'var(--ca-accent-solid)' : 'var(--ca-surface)',
                color: selectedDay.isCompleted ? 'var(--ca-accent-text)' : 'var(--ca-text)',
                borderColor: selectedDay.isToday ? 'var(--ca-accent-solid)' : 'var(--ca-border)',
              }}
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
              className="btn-primary py-2 px-4 text-xs font-bold inline-flex items-center gap-1.5 rounded-xl self-start sm:self-auto"
            >
              <span>Take Today's Daily Challenge</span>
              <ArrowRight size={13} />
            </Link>
          )}

          {selectedDay.isToday && selectedDay.isCompleted && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              <CheckCircle2 size={14} /> Streak maintained for today!
            </span>
          )}
        </div>

        {/* Selected Day Activity List */}
        {selectedDay.events.length > 0 ? (
          <div className="mt-3.5 space-y-2">
            {selectedDay.events.map((event) => {
              const isSolved = event.type === 'solved';
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-xl border text-xs transition-colors"
                  style={{ background: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-primary"
                      style={{ background: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
                    >
                      {isSolved ? <CheckCircle2 size={13} /> : <Play size={11} />}
                    </span>
                    <Link
                      to={`/workspace/${event.problemId}`}
                      className="truncate font-semibold text-primary hover:text-muted transition-colors"
                    >
                      {event.title}
                    </Link>
                    <span
                      className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border text-muted"
                      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
                    >
                      {event.difficulty}
                    </span>
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] text-muted border"
                      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
                    >
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
          <p className="mt-3 text-xs text-muted">
            {selectedDay.isToday
              ? 'No problems or daily challenges logged yet today. Practice now to keep your streak burning!'
              : 'No practice activity logged on this date.'}
          </p>
        )}
      </div>
    </div>
  );
}
