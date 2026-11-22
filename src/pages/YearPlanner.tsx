import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Edit2,
  Flame,
  HelpCircle,
  Info,
  Layers,
  Plus,
  RotateCcw,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Target,
  Terminal,
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
  streakDays?: number;
  createdAt: string;
}

export interface QuarterGoal {
  text: string;
  status: 'done' | 'now' | 'pending';
}

const DEFAULT_HABITS: Habit[] = [
  { id: 'habit-1', name: 'Labs & Practice', targetMinutes: 20, streakDays: 0, createdAt: new Date().toISOString() },
  { id: 'habit-2', name: 'Daily Challenge solve', targetMinutes: 15, streakDays: 3, createdAt: new Date().toISOString() },
  { id: 'habit-3', name: 'Algorithmic pattern review', targetMinutes: 30, streakDays: 0, createdAt: new Date().toISOString() },
];

const DEFAULT_GOALS: Record<'Q1' | 'Q2' | 'Q3' | 'Q4', QuarterGoal> = {
  Q1: { text: 'What would make this quarter count?', status: 'done' },
  Q2: { text: 'What would make this quarter count?', status: 'done' },
  Q3: { text: 'What would make this quarter count?', status: 'done' },
  Q4: { text: 'What would make this quarter count?', status: 'now' },
};

export default function YearPlanner() {
  const { activityLog, solvedIds } = useApp();
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

  // Modals & Interactive State
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

  // Split quarters into left column (Q1, Q2) and right column (Q3, Q4) matching reference layout
  const leftQuarters = useMemo(() => quarters.filter((q) => q.id === 'Q1' || q.id === 'Q2'), [quarters]);
  const rightQuarters = useMemo(() => quarters.filter((q) => q.id === 'Q3' || q.id === 'Q4'), [quarters]);

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
      streakDays: 0,
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
        text: quarterEditText.trim() || 'What would make this quarter count?',
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
    const text = `PrismCode ${selectedYear} Planner: Week ${progressStats.currentWeekNumber} of ${progressStats.totalWeeks} · ${progressStats.percentGone}% gone · ${solvedIds.length} problems solved!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  // Active top habit (first habit)
  const primaryHabit = habits[0];
  const primaryHabitCompleted = primaryHabit ? Boolean(habitCompletions[activeDateKey]?.[primaryHabit.id]) : false;

  return (
    <div className="w-full space-y-5 pb-16 animate-in fade-in select-none">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVIGATION / FULL-WIDTH PROGRESS BAR
          Directly matches top header in reference screenshot
      ────────────────────────────────────────────────────────────── */}
      <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between w-full">
        {/* Left: Year Switcher & This Week Button (Aligned above sidebar) */}
        <div className="flex items-center gap-2 w-full lg:w-[280px] xl:w-[320px] shrink-0">
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
              className="p-1 rounded-lg text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition"
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
              className="p-1 rounded-lg text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition"
              aria-label="Next year"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleScrollToThisWeek}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all text-primary shadow-sm hover:border-amber-500/40"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            This week
          </button>
        </div>

        {/* Center: Long Wide Week Progress Bar */}
        <div className="flex flex-1 items-center gap-3 px-2 min-w-0">
          <span className="text-xs font-semibold text-primary whitespace-nowrap">
            Week {progressStats.currentWeekNumber} of {progressStats.totalWeeks}
          </span>
          <div className="relative h-2.5 flex-1 rounded-full bg-black/15 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 bg-white dark:bg-neutral-200"
              style={{
                width: `${progressStats.percentGone}%`,
              }}
            />
          </div>
          <span className="text-xs font-mono text-muted whitespace-nowrap">
            {progressStats.daysLeft} days left · {progressStats.percentGone}% gone
          </span>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-2 shrink-0 justify-end">
          <button
            type="button"
            onClick={() => setShowHowItWorks(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            <HelpCircle size={14} /> How it works
          </button>

          {/* Weeks / Days Toggle Pill */}
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
                  ? 'bg-neutral-800 text-white dark:bg-neutral-700 font-bold shadow-sm'
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
                  ? 'bg-neutral-800 text-white dark:bg-neutral-700 font-bold shadow-sm'
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
                <Check size={14} className="text-emerald-500" /> Copied
              </>
            ) : (
              <>
                <Share2 size={13} /> Share
              </>
            )}
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN FULL-WIDTH TWO-COLUMN WORKSPACE
          Left column: Sidebar (Habits, Perfect Weeks, Quarter Goals)
          Right column: Banner + 4-Quadrant Annual Week Grid
      ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
        {/* ── LEFT SIDEBAR (~280px - 320px) ── */}
        <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0 space-y-4">
          {/* Habits Card with Date and Main Active Habit */}
          <div
            className="rounded-2xl p-4 sm:p-5 border space-y-4 shadow-sm"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div>
              <span className="text-[11px] font-semibold text-muted tracking-wider block">
                Habits · today
              </span>
              <span className="text-base font-bold text-primary tracking-tight">
                {today.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            </div>

            {/* Featured Active Habit Box (Matching Reference Design) */}
            {primaryHabit && (
              <div
                className="relative rounded-xl p-3 border space-y-2.5 transition-all"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--ca-surface) 90%, black 10%)',
                  borderColor: primaryHabitCompleted
                    ? 'color-mix(in srgb, var(--ca-border) 70%, #10b981 30%)'
                    : 'var(--ca-border)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/10 dark:bg-white/10 text-primary">
                      <Terminal size={14} />
                    </span>
                    <div>
                      <div className="text-xs font-bold text-primary">{primaryHabit.name}</div>
                      <div className="text-[10px] text-muted flex items-center gap-1">
                        <Flame size={10} className="text-amber-500 fill-amber-500" />
                        <span>Start a streak</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleHabitForDate(primaryHabit.id, activeDateKey)}
                    className={`h-5 w-5 rounded-md flex items-center justify-center border transition ${
                      primaryHabitCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-neutral-500/50 bg-transparent'
                    }`}
                  >
                    {primaryHabitCompleted && <Check size={12} className="stroke-[3]" />}
                  </button>
                </div>

                {/* Progress bar inside card */}
                <div>
                  <div className="flex justify-between text-[10px] text-muted font-mono mb-1">
                    <span>{primaryHabitCompleted ? `${primaryHabit.targetMinutes || 20} min` : '0 min'} today</span>
                    <span>Target: {primaryHabit.targetMinutes || 20}m</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-black/15 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all bg-emerald-500"
                      style={{ width: primaryHabitCompleted ? '100%' : '15%' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* List of Other Editable Habits */}
            <div className="space-y-2 pt-1">
              {habits.slice(1).map((h) => {
                const isCompleted = Boolean(habitCompletions[activeDateKey]?.[h.id]);
                return (
                  <div
                    key={h.id}
                    className="group flex items-center justify-between gap-2 p-2 rounded-xl border border-[color:var(--ca-border)] hover:border-amber-500/30 transition text-xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleHabitForDate(h.id, activeDateKey)}
                      className="flex items-center gap-2 flex-1 text-left min-w-0"
                    >
                      <div
                        className={`h-4 w-4 rounded-md flex items-center justify-center shrink-0 border transition ${
                          isCompleted
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-neutral-500/50 bg-transparent'
                        }`}
                      >
                        {isCompleted && <Check size={10} className="stroke-[3]" />}
                      </div>
                      <span className={`truncate ${isCompleted ? 'line-through text-muted' : 'text-primary font-medium'}`}>
                        {h.name}
                      </span>
                    </button>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => setEditingHabit(h)}
                        className="p-1 text-muted hover:text-amber-500"
                        title="Edit habit"
                      >
                        <Edit2 size={11} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteHabit(h.id)}
                        className="p-1 text-muted hover:text-rose-500"
                        title="Delete habit"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Habit Button */}
            <button
              type="button"
              onClick={() => setIsAddingHabit(true)}
              className="w-full py-2.5 rounded-xl border border-dashed border-[color:var(--ca-border)] text-xs font-semibold text-muted hover:text-primary hover:border-amber-500/40 transition flex items-center justify-center gap-1.5"
            >
              <Plus size={14} /> Add a habit
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
              A perfect week means every habit hit its target.
            </p>
          </div>

          {/* Quarter Goals Section */}
          <div
            className="rounded-2xl p-4 sm:p-5 border space-y-3 shadow-sm"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary">Quarter goals</span>
              <span className="text-[10px] text-muted">Click to edit</span>
            </div>

            <div className="space-y-2">
              {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map((qKey) => {
                const goal = quarterGoals[qKey];
                const isCurrent = goal?.status === 'now';
                return (
                  <div
                    key={qKey}
                    onClick={() => {
                      setEditingQuarter(qKey);
                      setQuarterEditText(goal?.text || '');
                      setQuarterEditStatus(goal?.status || 'pending');
                    }}
                    className={`group relative p-3 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-neutral-300 dark:border-neutral-300 ring-1 ring-white/20'
                        : 'border-[color:var(--ca-border)] hover:border-amber-500/30'
                    }`}
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--ca-surface) 93%, black 7%)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-primary">{qKey} goals</span>
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                          goal?.status === 'done'
                            ? 'bg-neutral-800 text-neutral-300 dark:bg-neutral-800 dark:text-neutral-300'
                            : goal?.status === 'now'
                            ? 'bg-white text-black font-extrabold'
                            : 'bg-black/5 dark:bg-white/5 text-muted'
                        }`}
                      >
                        {goal?.status === 'done' ? 'Done' : goal?.status === 'now' ? 'Now' : 'Done'}
                      </span>
                    </div>

                    <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                      {goal?.text || 'What would make this quarter count?'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ── RIGHT MAIN GRID (Edge-to-Edge Full Width) ── */}
        <main className="flex-1 min-w-0 space-y-5">
          {/* Motivational Banner Matching Reference */}
          <div
            className="relative overflow-hidden rounded-2xl p-6 sm:p-7 border shadow-sm"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
                  {selectedYear} is a blank wall. Fill it in.
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-muted max-w-3xl leading-relaxed">
                  Start with the big rocks- trips, launches, exams, birthdays. Drag across any days on the board to add one, then add a habit or two to track each day.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Link
                  to="/daily-challenges"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-black hover:bg-neutral-200 transition shadow-sm"
                >
                  Add your first plan <ArrowUpRight size={14} />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsAddingHabit(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border text-primary hover:border-amber-500/40 transition shadow-sm"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--ca-surface) 90%, black 10%)',
                    borderColor: 'var(--ca-border)',
                  }}
                >
                  <Plus size={14} /> Add a habit
                </button>
              </div>
            </div>
          </div>

          {/* 4-Quadrant Annual Week Grid */}
          <div
            className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-sm space-y-8 overflow-x-auto w-full"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            {/* Split into Left Column (Q1 & Q2) and Right Column (Q3 & Q4) with clean vertical divider */}
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 2xl:divide-x divide-[color:var(--ca-border)]">
              {/* Left Column: Q1 (Jan to Mar) and Q2 (Apr to Jun) */}
              <div className="space-y-10 2xl:pr-8">
                {leftQuarters.map((quarter) => (
                  <QuarterSection
                    key={quarter.id}
                    quarter={quarter}
                    activityMap={activityMap}
                    habitCompletions={habitCompletions}
                    currentWeekRef={currentWeekRef}
                    onHoverDay={(day, eventCount) => setHoveredDay({ day, eventCount })}
                    onSelectDate={(dKey) => setActiveDateKey(dKey)}
                  />
                ))}
              </div>

              {/* Right Column: Q3 (Jul to Sep) and Q4 (Oct to Dec) */}
              <div className="space-y-10 2xl:pl-8">
                {rightQuarters.map((quarter) => (
                  <QuarterSection
                    key={quarter.id}
                    quarter={quarter}
                    activityMap={activityMap}
                    habitCompletions={habitCompletions}
                    currentWeekRef={currentWeekRef}
                    onHoverDay={(day, eventCount) => setHoveredDay({ day, eventCount })}
                    onSelectDate={(dKey) => setActiveDateKey(dKey)}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Footnote text matching reference */}
            <div className="pt-4 border-t border-[color:var(--ca-border)] flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
              <span className="text-[11px] leading-relaxed">
                Weeks run Monday to Sunday, W1 is the week that holds the year's first Thursday, so it can start in late December. Drag across days to add a plan.
              </span>

              {hoveredDay && (
                <span className="font-mono text-xs font-bold text-primary">
                  {hoveredDay.day.date.toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  : {hoveredDay.eventCount} activities & habits
                </span>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. EDIT & ADD MODALS
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
                <Sparkles size={18} className="text-amber-500" /> Add Custom Habit
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
                  placeholder="e.g. Solve 2 problems, Review Dynamic Programming"
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
                <Trash2 size={13} /> Delete
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
                <label className="block text-xs font-semibold text-muted mb-1">Quarter Goal</label>
                <textarea
                  rows={3}
                  value={quarterEditText}
                  onChange={(e) => setQuarterEditText(e.target.value)}
                  placeholder="What would make this quarter count?"
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
                      {st === 'pending' ? 'Upcoming' : st === 'now' ? 'Now' : 'Done'}
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
                  <strong className="text-primary">Heatmap Intensity:</strong> Slices fill as you solve problems or complete your daily habits.
                </li>
                <li>
                  <strong className="text-primary">Editable Habits:</strong> Customize your daily targets and check off your completed habits for today.
                </li>
                <li>
                  <strong className="text-primary">Quarter Goals:</strong> Write down and check off your quarterly targets.
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

/**
 * Quarter Section with Month Rows and Week Cards
 */
function QuarterSection({
  quarter,
  activityMap,
  habitCompletions,
  currentWeekRef,
  onHoverDay,
  onSelectDate,
}: {
  quarter: QuarterData;
  activityMap: Map<string, { count: number; solvedCount: number; durationSeconds: number }>;
  habitCompletions: Record<string, Record<string, boolean>>;
  currentWeekRef: React.RefObject<HTMLDivElement>;
  onHoverDay: (day: DayInfo, count: number) => void;
  onSelectDate: (dKey: string) => void;
}) {
  return (
    <div className="space-y-3">
      {/* Quarter Header */}
      <div className="text-[11px] font-mono font-bold text-muted uppercase tracking-wider">
        {quarter.label}
      </div>

      {/* 3 Month Rows */}
      <div className="space-y-2.5">
        {quarter.months.map((month) => (
          <div key={month.name} className="flex items-center gap-3">
            {/* Month Label (e.g. JAN, FEB, MAR) */}
            <span className="w-8 font-mono text-[11px] font-bold text-primary shrink-0">
              {month.name}
            </span>

            {/* Week Columns for this month (4 or 5 columns) */}
            <div className="flex-1 grid grid-cols-4 sm:grid-cols-5 gap-2">
              {month.weeks.map((week) => {
                const isNowWeek = week.isCurrentWeek;
                return (
                  <div
                    key={`week-${week.weekNumber}`}
                    ref={isNowWeek ? currentWeekRef : undefined}
                    className={`relative rounded-xl p-2.5 sm:p-3 border transition-all ${
                      isNowWeek
                        ? 'border-white dark:border-white shadow-xl ring-1 ring-white/30 bg-neutral-900/90'
                        : 'border-[color:var(--ca-border)] hover:border-amber-500/30'
                    }`}
                    style={{
                      backgroundColor: isNowWeek
                        ? undefined
                        : 'color-mix(in srgb, var(--ca-surface) 92%, black 8%)',
                    }}
                  >
                    {/* Week Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] font-bold text-muted">
                        W{week.weekNumber}
                      </span>
                      {isNowWeek && (
                        <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-extrabold uppercase bg-white text-black">
                          NOW
                        </span>
                      )}
                    </div>

                    {/* 7 Vertical Day Slices */}
                    <div className="grid grid-cols-7 gap-1 h-8 sm:h-9 items-end">
                      {week.days.map((day) => {
                        const dayActivity = activityMap.get(day.dateKey);
                        const eventCount = dayActivity?.count || 0;
                        const habitCount = Object.values(habitCompletions[day.dateKey] || {}).filter(Boolean).length;
                        const totalScore = eventCount + habitCount;

                        // Intensity styling matching reference
                        let cellBg = 'bg-black/20 dark:bg-neutral-800/80';
                        if (totalScore >= 3) {
                          cellBg = 'bg-emerald-500 dark:bg-emerald-400';
                        } else if (totalScore === 2) {
                          cellBg = 'bg-emerald-500/70 dark:bg-emerald-500/80';
                        } else if (totalScore === 1) {
                          cellBg = 'bg-emerald-500/40 dark:bg-emerald-600/50';
                        }

                        // Current day indicator in active week has distinct white ring matching reference
                        const isToday = day.isToday;

                        return (
                          <button
                            key={day.dateKey}
                            type="button"
                            onClick={() => onSelectDate(day.dateKey)}
                            onMouseEnter={() => onHoverDay(day, totalScore)}
                            className={`h-full w-full rounded-[2.5px] transition-all cursor-pointer relative ${cellBg} ${
                              isToday
                                ? 'border border-white ring-1 ring-white/60 scale-105'
                                : 'hover:scale-105'
                            }`}
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
  );
}
