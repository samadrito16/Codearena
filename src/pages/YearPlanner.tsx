import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Edit2,
  Flame,
  Info,
  Layers,
  Plus,
  RotateCcw,
  Share2,
  Sparkles,
  Target,
  Trash2,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { readStorage, writeStorage } from '../lib/storage';
import {
  generateQuarters,
  getYearProgressStats,
  toDateKey,
  type DayInfo,
  type QuarterData,
  type YearWeek,
} from '../lib/yearWeeks';

export interface Habit {
  id: string;
  name: string;
  targetMinutes?: number;
  createdAt: string;
}

export interface QuarterGoal {
  text: string;
  status: 'done' | 'now' | 'pending';
}

const DEFAULT_HABITS: Habit[] = [
  { id: 'habit-1', name: 'Solve 1 algorithmic problem', targetMinutes: 30, createdAt: new Date().toISOString() },
  { id: 'habit-2', name: 'Complete Daily Challenge', createdAt: new Date().toISOString() },
  { id: 'habit-3', name: 'Review or write clean solutions', targetMinutes: 15, createdAt: new Date().toISOString() },
];

const DEFAULT_GOALS: Record<'Q1' | 'Q2' | 'Q3' | 'Q4', QuarterGoal> = {
  Q1: { text: 'Master Two-Pointers, Sliding Window & Hash Maps', status: 'done' },
  Q2: { text: 'Tackle Dynamic Programming & Recursion Trees', status: 'done' },
  Q3: { text: 'Crush Graph algorithms: BFS, DFS & Topo Sort', status: 'done' },
  Q4: { text: 'Interview readiness & speed-run 50+ Hard problems', status: 'now' },
};

export default function YearPlanner() {
  const { activityLog, solvedIds, submissions } = useApp();
  const today = useMemo(() => new Date(), []);
  const [selectedYear, setSelectedYear] = useState<number>(() => today.getFullYear());
  const [viewMode, setViewMode] = useState<'weeks' | 'days'>('weeks');

  // ── Habits State (Fully editable & persistent) ──
  const [habits, setHabits] = useState<Habit[]>(() => {
    return readStorage<Habit[]>('codearena-year-habits', DEFAULT_HABITS);
  });
  useEffect(() => {
    writeStorage('codearena-year-habits', habits);
  }, [habits]);

  // Habit completion tracking by dateKey: Record<dateKey, Record<habitId, boolean>>
  const [habitCompletions, setHabitCompletions] = useState<Record<string, Record<string, boolean>>>(() => {
    return readStorage<Record<string, Record<string, boolean>>>('codearena-habit-completions', {});
  });
  useEffect(() => {
    writeStorage('codearena-habit-completions', habitCompletions);
  }, [habitCompletions]);

  // ── Quarter Goals State (Fully editable & removable) ──
  const [quarterGoals, setQuarterGoals] = useState<Record<'Q1' | 'Q2' | 'Q3' | 'Q4', QuarterGoal>>(() => {
    return readStorage<Record<'Q1' | 'Q2' | 'Q3' | 'Q4', QuarterGoal>>('codearena-quarter-goals', DEFAULT_GOALS);
  });
  useEffect(() => {
    writeStorage('codearena-quarter-goals', quarterGoals);
  }, [quarterGoals]);

  // Editing state modals
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitMinutes, setNewHabitMinutes] = useState('20');

  const [editingQuarter, setEditingQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4' | null>(null);
  const [quarterEditText, setQuarterEditText] = useState('');
  const [quarterEditStatus, setQuarterEditStatus] = useState<'done' | 'now' | 'pending'>('pending');

  const [hoveredDay, setHoveredDay] = useState<{ day: DayInfo; eventCount: number } | null>(null);
  const [activeDateKey, setActiveDateKey] = useState<string>(() => toDateKey(today));
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const currentWeekRef = useRef<HTMLDivElement>(null);

  // ── Generate Quarters and Week Structure ──
  const quarters = useMemo(() => generateQuarters(selectedYear, today), [selectedYear, today]);
  const progressStats = useMemo(() => getYearProgressStats(selectedYear, today), [selectedYear, today]);

  // ── Activity Map from Context ──
  const activityMap = useMemo(() => {
    const map = new Map<string, { count: number; solvedCount: number; durationSeconds: number }>();
    for (const ev of activityLog) {
      const dKey = toDateKey(new Date(ev.timestamp));
      const curr = map.get(dKey) || { count: 0, solvedCount: 0, durationSeconds: 0 };
      curr.count += 1;
      if (ev.type === 'solved') curr.solvedCount += 1;
      curr.durationSeconds += ev.durationSeconds || 0;
      map.set(dKey, curr);
    }
    return map;
  }, [activityLog]);

  // ── Perfect Weeks Calculation ──
  const perfectWeeksStats = useMemo(() => {
    let perfectCount = 0;
    let currentRun = 0;
    let bestRun = 0;

    for (const q of quarters) {
      for (const m of q.months) {
        for (const w of m.weeks) {
          if (!w.isPastWeek && !w.isCurrentWeek) continue;

          // A week is considered active/perfect if at least 4 days had habit completion or code activity
          let activeDays = 0;
          for (const d of w.days) {
            const hasActivity = (activityMap.get(d.dateKey)?.count || 0) > 0;
            const completedHabitCount = Object.values(habitCompletions[d.dateKey] || {}).filter(Boolean).length;
            if (hasActivity || completedHabitCount > 0) {
              activeDays += 1;
            }
          }

          if (activeDays >= 5) {
            perfectCount += 1;
            currentRun += 1;
            if (currentRun > bestRun) bestRun = currentRun;
          } else {
            currentRun = 0;
          }
        }
      }
    }

    return { perfectCount, bestRun };
  }, [quarters, activityMap, habitCompletions]);

  // Scroll to this week
  const handleScrollToThisWeek = () => {
    if (selectedYear !== today.getFullYear()) {
      setSelectedYear(today.getFullYear());
      setTimeout(() => {
        currentWeekRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      currentWeekRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Habit toggling for the active date
  const toggleHabitForDate = (habitId: string, dateKey: string) => {
    setHabitCompletions((prev) => {
      const dayCompletions = { ...(prev[dateKey] || {}) };
      dayCompletions[habitId] = !dayCompletions[habitId];
      return { ...prev, [dateKey]: dayCompletions };
    });
  };

  // Add new habit
  const handleSaveNewHabit = () => {
    if (!newHabitName.trim()) return;
    const newH: Habit = {
      id: `habit-${Date.now()}`,
      name: newHabitName.trim(),
      targetMinutes: parseInt(newHabitMinutes, 10) || undefined,
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => [...prev, newH]);
    setNewHabitName('');
    setIsAddingHabit(false);
  };

  // Save edited habit
  const handleSaveEditHabit = () => {
    if (!editingHabit || !editingHabit.name.trim()) return;
    setHabits((prev) =>
      prev.map((h) => (h.id === editingHabit.id ? editingHabit : h))
    );
    setEditingHabit(null);
  };

  // Delete habit
  const handleDeleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    if (editingHabit?.id === id) setEditingHabit(null);
  };

  // Save quarter goal
  const handleSaveQuarterGoal = () => {
    if (!editingQuarter) return;
    setQuarterGoals((prev) => ({
      ...prev,
      [editingQuarter]: {
        text: quarterEditText.trim() || 'No goal set for this quarter',
        status: quarterEditStatus,
      },
    }));
    setEditingQuarter(null);
  };

  // Remove quarter goal
  const handleRemoveQuarterGoal = (quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4') => {
    setQuarterGoals((prev) => ({
      ...prev,
      [quarter]: {
        text: '',
        status: 'pending',
      },
    }));
    setEditingQuarter(null);
  };

  // Copy share summary
  const handleShare = () => {
    const text = `PrismCode ${selectedYear} Progress: Week ${progressStats.currentWeekNumber} of ${progressStats.totalWeeks} · ${progressStats.percentGone}% gone · ${solvedIds.length} problems solved!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in select-none">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVIGATION / PROGRESS HEADER
      ────────────────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between pt-1">
        {/* Left: Year Switcher & This Week */}
        <div className="flex items-center gap-2.5">
          <div
            className="inline-flex items-center rounded-xl p-1 border shadow-sm"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedYear((y) => y - 1)}
              className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition"
              aria-label="Previous year"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 font-mono text-sm font-bold tracking-wider text-primary">
              {selectedYear}
            </span>
            <button
              type="button"
              onClick={() => setSelectedYear((y) => y + 1)}
              className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition"
              aria-label="Next year"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleScrollToThisWeek}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:border-amber-500/40 text-primary shadow-sm"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            This week
          </button>
        </div>

        {/* Center: Week Progress Bar */}
        <div className="flex flex-1 max-w-xl items-center gap-3 px-2">
          <span className="text-xs font-semibold text-muted whitespace-nowrap">
            Week {progressStats.currentWeekNumber} of {progressStats.totalWeeks}
          </span>
          <div className="relative h-2 flex-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progressStats.percentGone}%`,
                background: 'linear-gradient(90deg, #f59e0b, #ea580c)',
              }}
            />
          </div>
          <span className="text-xs font-mono text-muted whitespace-nowrap">
            {progressStats.daysLeft} days left · {progressStats.percentGone}% gone
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHowItWorks(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            <Info size={14} /> How it works
          </button>

          {/* Weeks / Days Toggle */}
          <div
            className="inline-flex rounded-xl p-1 border shadow-sm"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('weeks')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                viewMode === 'weeks'
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold'
                  : 'text-muted hover:text-primary'
              }`}
            >
              Weeks
            </button>
            <button
              type="button"
              onClick={() => setViewMode('days')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                viewMode === 'days'
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold'
                  : 'text-muted hover:text-primary'
              }`}
            >
              Days
            </button>
          </div>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all text-primary shadow-sm hover:border-amber-500/40"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            {copiedShare ? (
              <>
                <Check size={14} className="text-emerald-500" /> Copied!
              </>
            ) : (
              <>
                <Share2 size={14} /> Share
              </>
            )}
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. MOTIVATIONAL BANNER
      ────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-2xl p-5 sm:p-6 border transition-all"
        style={{
          backgroundColor: 'var(--ca-surface)',
          borderColor: 'var(--ca-border)',
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-primary">
              {selectedYear} is a blank wall. Fill it in.
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
              Start with the big goals — algorithmic milestones, mock interview sprints, daily habits.
              Every column is a week, every cell is a day. Drag across or click to track your growth.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              to="/daily-challenges"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold btn-primary"
            >
              Solve Today's Problem <ArrowRight size={14} />
            </Link>
            <button
              type="button"
              onClick={() => setIsAddingHabit(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border text-primary hover:border-amber-500/40 transition shadow-sm"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--ca-surface) 90%, black 10%)',
                borderColor: 'var(--ca-border)',
              }}
            >
              <Plus size={14} /> Add a habit
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN LAYOUT: SIDEBAR + 4-QUADRANT ANNUAL WEEK GRID
      ────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-start">
        {/* ── LEFT SIDEBAR: HABITS & QUARTER GOALS ── */}
        <aside className="space-y-4">
          {/* Habits Card */}
          <div
            className="rounded-2xl p-4 sm:p-5 border space-y-4 shadow-sm"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
                  Habits · Today
                </span>
                <span className="text-xs font-bold text-primary font-mono">
                  {today.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingHabit(true)}
                className="p-1 rounded-lg text-amber-500 hover:bg-amber-500/10 transition"
                title="Add custom habit"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Habit Items List */}
            <div className="space-y-2">
              {habits.map((h) => {
                const isCompletedToday = Boolean(habitCompletions[activeDateKey]?.[h.id]);
                return (
                  <div
                    key={h.id}
                    className={`group flex items-center justify-between gap-2 p-2.5 rounded-xl border transition-all ${
                      isCompletedToday
                        ? 'border-emerald-500/30 bg-emerald-500/5'
                        : 'border-[color:var(--ca-border)] hover:border-amber-500/20'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleHabitForDate(h.id, activeDateKey)}
                      className="flex items-center gap-2.5 flex-1 text-left min-w-0"
                    >
                      <div
                        className={`h-5 w-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                          isCompletedToday
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-slate-300 dark:border-neutral-700 bg-transparent'
                        }`}
                      >
                        {isCompletedToday && <Check size={13} className="stroke-[3]" />}
                      </div>
                      <div className="truncate">
                        <div
                          className={`text-xs font-semibold truncate ${
                            isCompletedToday ? 'text-primary line-through opacity-70' : 'text-primary'
                          }`}
                        >
                          {h.name}
                        </div>
                        {h.targetMinutes && (
                          <div className="text-[10px] text-muted font-mono">
                            {h.targetMinutes} min target
                          </div>
                        )}
                      </div>
                    </button>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingHabit(h);
                        }}
                        className="p-1 rounded text-muted hover:text-amber-500"
                        title="Edit habit"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteHabit(h.id)}
                        className="p-1 rounded text-muted hover:text-rose-500"
                        title="Delete habit"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {habits.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-xs text-muted">No habits added yet.</p>
                  <button
                    type="button"
                    onClick={() => setIsAddingHabit(true)}
                    className="mt-2 text-xs font-bold text-amber-500 hover:underline inline-flex items-center gap-1"
                  >
                    <Plus size={12} /> Create your first habit
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsAddingHabit(true)}
              className="w-full py-2 rounded-xl border border-dashed border-[color:var(--ca-border)] text-xs font-semibold text-muted hover:text-primary hover:border-amber-500/40 transition flex items-center justify-center gap-1.5"
            >
              <Plus size={14} /> Add custom habit
            </button>
          </div>

          {/* Perfect Weeks Counter */}
          <div
            className="rounded-2xl p-4 sm:p-5 border space-y-2 shadow-sm"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={13} />
              <span>Perfect weeks</span>
            </div>
            <div className="text-2xl font-extrabold text-primary tracking-tight">
              {perfectWeeksStats.perfectCount} perfect weeks
            </div>
            <p className="text-[11px] text-muted leading-relaxed">
              {perfectWeeksStats.perfectCount} this year · best run {perfectWeeksStats.bestRun} weeks.
              A perfect week means you completed coding practice or habits on 5+ days.
            </p>
          </div>

          {/* Quarter Goals Card */}
          <div
            className="rounded-2xl p-4 sm:p-5 border space-y-3.5 shadow-sm"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                Quarter Goals
              </span>
              <span className="text-[10px] text-muted">Click to edit</span>
            </div>

            <div className="space-y-2.5">
              {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map((qKey) => {
                const goal = quarterGoals[qKey];
                const hasGoal = Boolean(goal?.text?.trim());
                return (
                  <div
                    key={qKey}
                    onClick={() => {
                      setEditingQuarter(qKey);
                      setQuarterEditText(goal?.text || '');
                      setQuarterEditStatus(goal?.status || 'pending');
                    }}
                    className="group relative p-3 rounded-xl border border-[color:var(--ca-border)] hover:border-amber-500/30 transition-all cursor-pointer"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--ca-surface) 93%, black 7%)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-primary">{qKey} goals</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          goal?.status === 'done'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : goal?.status === 'now'
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            : 'bg-black/5 dark:bg-white/5 text-muted'
                        }`}
                      >
                        {goal?.status === 'done' ? 'Done' : goal?.status === 'now' ? 'Now' : 'Upcoming'}
                      </span>
                    </div>

                    <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                      {hasGoal ? goal.text : 'What would make this quarter count?'}
                    </p>

                    <div className="mt-2 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold text-amber-500 inline-flex items-center gap-1">
                        <Edit2 size={10} /> Edit
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ── RIGHT MAIN GRID: 4-QUADRANT ANNUAL WEEK PLANNER ── */}
        <main
          className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-sm space-y-8 overflow-x-auto"
          style={{
            backgroundColor: 'var(--ca-surface)',
            borderColor: 'var(--ca-border)',
          }}
        >
          {/* 4 Quadrants arranged in a 2x2 grid on large screens */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {quarters.map((quarter) => (
              <div key={quarter.id} className="space-y-4">
                {/* Quarter Header */}
                <div className="flex items-center justify-between border-b pb-2 border-[color:var(--ca-border)]">
                  <h3 className="font-display text-sm sm:text-base font-bold text-primary flex items-center gap-2">
                    <span>{quarter.label}</span>
                    {quarter.isCurrentQuarter && (
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                        Current Quarter
                      </span>
                    )}
                  </h3>
                </div>

                {/* 3 Month Rows */}
                <div className="space-y-3.5">
                  {quarter.months.map((month) => (
                    <div key={month.name} className="flex items-start gap-3">
                      {/* Month Label */}
                      <span className="w-9 font-mono text-[11px] font-bold text-muted pt-2 shrink-0">
                        {month.name}
                      </span>

                      {/* Week Columns for this month */}
                      <div className="flex-1 grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {month.weeks.map((week) => {
                          const isNowWeek = week.isCurrentWeek;
                          return (
                            <div
                              key={`week-${week.weekNumber}`}
                              ref={isNowWeek ? currentWeekRef : undefined}
                              className={`relative rounded-xl p-2 border transition-all ${
                                isNowWeek
                                  ? 'border-amber-500 shadow-md ring-1 ring-amber-500/40 bg-amber-500/[0.04]'
                                  : 'border-[color:var(--ca-border)] hover:border-amber-500/30'
                              }`}
                              style={{
                                backgroundColor: isNowWeek
                                  ? undefined
                                  : 'color-mix(in srgb, var(--ca-surface) 92%, black 8%)',
                              }}
                            >
                              {/* Week Header */}
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="font-mono text-[10px] font-bold text-muted">
                                  W{week.weekNumber}
                                </span>
                                {isNowWeek && (
                                  <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-extrabold uppercase bg-amber-500 text-black">
                                    NOW
                                  </span>
                                )}
                              </div>

                              {/* 7 Vertical Day Slices */}
                              <div className="grid grid-cols-7 gap-1 h-9 items-end">
                                {week.days.map((day) => {
                                  const dayActivity = activityMap.get(day.dateKey);
                                  const eventCount = dayActivity?.count || 0;
                                  const habitCount = Object.values(habitCompletions[day.dateKey] || {}).filter(Boolean).length;
                                  const totalScore = eventCount + habitCount;

                                  // Intensity styling matching reference
                                  let cellBg = 'bg-black/10 dark:bg-white/5';
                                  if (totalScore >= 3) {
                                    cellBg = 'bg-emerald-500 dark:bg-emerald-400';
                                  } else if (totalScore === 2) {
                                    cellBg = 'bg-emerald-500/70 dark:bg-emerald-500/80';
                                  } else if (totalScore === 1) {
                                    cellBg = 'bg-emerald-500/40 dark:bg-emerald-600/50';
                                  }

                                  return (
                                    <button
                                      key={day.dateKey}
                                      type="button"
                                      onClick={() => setActiveDateKey(day.dateKey)}
                                      onMouseEnter={() => setHoveredDay({ day, eventCount: totalScore })}
                                      onMouseLeave={() => setHoveredDay(null)}
                                      className={`h-full w-full rounded-[3px] transition-all cursor-pointer relative ${cellBg} ${
                                        day.isToday ? 'ring-1 ring-amber-500 ring-offset-1' : ''
                                      } hover:scale-110`}
                                      aria-label={`${day.dateKey}: ${totalScore} activities`}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Hover Tooltip / Status Strip */}
          <div className="pt-4 border-t border-[color:var(--ca-border)] flex flex-wrap items-center justify-between text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary">Legend:</span>
              <span className="inline-flex items-center gap-1">
                <span className="h-3 w-3 rounded-[2px] bg-black/10 dark:bg-white/5" /> None
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-3 w-3 rounded-[2px] bg-emerald-500/40" /> 1 activity
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-3 w-3 rounded-[2px] bg-emerald-500/70" /> 2 activities
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-3 w-3 rounded-[2px] bg-emerald-500" /> 3+ activities
              </span>
            </div>

            {hoveredDay ? (
              <span className="font-mono text-xs text-primary font-semibold">
                {hoveredDay.day.date.toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
                : {hoveredDay.eventCount} activities / habits completed
              </span>
            ) : (
              <span className="text-[11px] text-muted">
                Weeks run Monday to Sunday. W1 is the week that holds the year's first Thursday.
              </span>
            )}
          </div>
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. MODALS & INLINE EDITORS
      ────────────────────────────────────────────────────────────── */}

      {/* Add Habit Modal */}
      {isAddingHabit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-md rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" /> Add New Habit
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingHabit(false)}
                className="p-1 rounded-lg text-muted hover:text-primary"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Habit Name</label>
                <input
                  type="text"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="e.g. Solve 2 problems, Review dynamic programming"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[color:var(--ca-border)] bg-transparent text-sm text-primary focus:outline-none focus:border-amber-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Target Minutes (Optional)</label>
                <input
                  type="number"
                  value={newHabitMinutes}
                  onChange={(e) => setNewHabitMinutes(e.target.value)}
                  placeholder="20"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[color:var(--ca-border)] bg-transparent text-sm text-primary focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingHabit(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-muted hover:text-primary transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNewHabit}
                className="btn-primary px-5 py-2 text-xs font-semibold"
              >
                Create Habit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Habit Modal */}
      {editingHabit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-md rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                <Edit2 size={18} className="text-amber-500" /> Edit Habit
              </h3>
              <button
                type="button"
                onClick={() => setEditingHabit(null)}
                className="p-1 rounded-lg text-muted hover:text-primary"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Habit Name</label>
                <input
                  type="text"
                  value={editingHabit.name}
                  onChange={(e) => setEditingHabit({ ...editingHabit, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[color:var(--ca-border)] bg-transparent text-sm text-primary focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Target Minutes</label>
                <input
                  type="number"
                  value={editingHabit.targetMinutes || ''}
                  onChange={(e) =>
                    setEditingHabit({
                      ...editingHabit,
                      targetMinutes: parseInt(e.target.value, 10) || undefined,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[color:var(--ca-border)] bg-transparent text-sm text-primary focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleDeleteHabit(editingHabit.id)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition"
              >
                <Trash2 size={13} /> Delete Habit
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingHabit(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-muted hover:text-primary transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditHabit}
                  className="btn-primary px-5 py-2 text-xs font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Quarter Goal Modal */}
      {editingQuarter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-md rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                <Target size={18} className="text-amber-500" /> Edit {editingQuarter} Goal
              </h3>
              <button
                type="button"
                onClick={() => setEditingQuarter(null)}
                className="p-1 rounded-lg text-muted hover:text-primary"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted mb-1">
                  Quarterly Milestone / Goal
                </label>
                <textarea
                  rows={3}
                  value={quarterEditText}
                  onChange={(e) => setQuarterEditText(e.target.value)}
                  placeholder="e.g. Complete 50 DP problems, Learn Red-Black Trees..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[color:var(--ca-border)] bg-transparent text-sm text-primary focus:outline-none focus:border-amber-500 resize-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1">Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['pending', 'now', 'done'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setQuarterEditStatus(st)}
                      className={`py-2 rounded-xl text-xs font-semibold capitalize border transition ${
                        quarterEditStatus === st
                          ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                          : 'border-[color:var(--ca-border)] text-muted hover:text-primary'
                      }`}
                    >
                      {st === 'pending' ? 'Upcoming' : st === 'now' ? 'In Progress' : 'Done'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleRemoveQuarterGoal(editingQuarter)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition"
              >
                <Trash2 size={13} /> Clear Goal
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingQuarter(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-muted hover:text-primary transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveQuarterGoal}
                  className="btn-primary px-5 py-2 text-xs font-semibold"
                >
                  Save Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How it Works Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-lg rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                <Info size={18} className="text-amber-500" /> How the Year Planner Works
              </h3>
              <button
                type="button"
                onClick={() => setShowHowItWorks(false)}
                className="p-1 rounded-lg text-muted hover:text-primary"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-muted leading-relaxed">
              <p>
                The <strong className="text-primary">Year Planner</strong> maps your entire year into 52–53 ISO weeks across four quarterly quadrants.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-primary">Weeks and Days:</strong> Each week card contains 7 vertical columns representing Monday to Sunday.
                </li>
                <li>
                  <strong className="text-primary">Heatmap Intensity:</strong> Slices turn green as you solve problems or complete your daily habits.
                </li>
                <li>
                  <strong className="text-primary">Editable Habits:</strong> Customize your daily targets and check off your completed habits for today.
                </li>
                <li>
                  <strong className="text-primary">Quarter Goals:</strong> Write down and check off your quarterly engineering targets.
                </li>
                <li>
                  <strong className="text-primary">Perfect Weeks:</strong> Hitting 5+ active days in a week earns you a perfect week badge.
                </li>
              </ul>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowHowItWorks(false)}
                className="btn-primary px-5 py-2 text-xs font-semibold"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
