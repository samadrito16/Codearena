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
  Eye,
  EyeOff,
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
import { useMasteryProgress } from '../lib/mastery/progress';
import { getAllMasteryProblems, PATTERN_CONFIG, type PatternId } from '../lib/mastery/catalog';
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
  color?: string;
  streakDays?: number;
  createdAt: string;
}

export interface QuarterGoal {
  text: string;
  status: 'done' | 'now' | 'pending';
}

export type PlanCategory = 'work' | 'learning' | 'health' | 'travel' | 'personal';

export interface YearPlan {
  id: string;
  title: string;
  dateKey: string; // YYYY-MM-DD
  category: PlanCategory;
  createdAt: string;
}

export const PLAN_CATEGORIES: { id: PlanCategory; label: string; color: string }[] = [
  { id: 'work', label: 'Work', color: '#3b82f6' },
  { id: 'learning', label: 'Learning', color: '#a855f7' },
  { id: 'health', label: 'Health', color: '#06b6d4' },
  { id: 'travel', label: 'Travel', color: '#f59e0b' },
  { id: 'personal', label: 'Personal', color: '#ec4899' },
];

export const HABIT_COLORS = [
  { id: 'emerald', label: 'Emerald', hex: '#10b981' },
  { id: 'amber', label: 'Amber', hex: '#f59e0b' },
  { id: 'rose', label: 'Rose', hex: '#f43f5e' },
  { id: 'cyan', label: 'Cyan', hex: '#06b6d4' },
  { id: 'violet', label: 'Violet', hex: '#8b5cf6' },
  { id: 'blue', label: 'Blue', hex: '#3b82f6' },
  { id: 'orange', label: 'Orange', hex: '#f97316' },
  { id: 'pink', label: 'Pink', hex: '#ec4899' },
];

const PATTERN_ACCENT_COLORS: Record<PatternId, string> = {
  two_pointers: '#3b82f6',
  sliding_window: '#06b6d4',
  hash_maps: '#8b5cf6',
  dynamic_programming: '#f59e0b',
  breadth_first_search: '#10b981',
};

const DEFAULT_HABITS: Habit[] = [
  { id: 'habit-1', name: 'Labs & Practice', targetMinutes: 20, color: '#10b981', streakDays: 0, createdAt: new Date().toISOString() },
  { id: 'habit-2', name: 'Daily Challenge solve', targetMinutes: 15, color: '#f59e0b', streakDays: 3, createdAt: new Date().toISOString() },
  { id: 'habit-3', name: 'Algorithmic pattern review', targetMinutes: 30, color: '#8b5cf6', streakDays: 0, createdAt: new Date().toISOString() },
];

const DEFAULT_GOALS: Record<'Q1' | 'Q2' | 'Q3' | 'Q4', QuarterGoal> = {
  Q1: { text: 'What would make this quarter count?', status: 'done' },
  Q2: { text: 'What would make this quarter count?', status: 'done' },
  Q3: { text: 'What would make this quarter count?', status: 'done' },
  Q4: { text: 'What would make this quarter count?', status: 'now' },
};

/** Formats date range e.g. "Feb 9-15, 2026" or "Dec 29, 2025 - Jan 4, 2026" */
export function formatWeekDateRange(startDate: Date, endDate: Date): string {
  const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startMonth} ${startDate.getDate()}-${endDate.getDate()}, ${startYear}`;
    }
    return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}, ${startYear}`;
  }
  return `${startMonth} ${startDate.getDate()}, ${startYear} - ${endMonth} ${endDate.getDate()}, ${endYear}`;
}

export default function YearPlanner() {
  const { activityLog, adaptiveMasteryPlan, updateAdaptiveMasteryPlan } = useApp();
  const { getProblemProgress, getOverallStats, toggleCompleted } = useMasteryProgress();
  const today = useMemo(() => new Date(), []);
  const [selectedYear, setSelectedYear] = useState<number>(() => today.getFullYear());

  // ── Mastery Catalog & Adaptive Calculations ──
  const allMasteryProblems = useMemo(() => getAllMasteryProblems(), []);
  const overallMasteryStats = useMemo(() => getOverallStats(), [getOverallStats]);

  const daysRemaining = useMemo(() => {
    if (!adaptiveMasteryPlan?.targetDate) return adaptiveMasteryPlan?.targetDays || 45;
    const target = new Date(adaptiveMasteryPlan.targetDate).getTime();
    const now = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff);
  }, [adaptiveMasteryPlan?.targetDate, adaptiveMasteryPlan?.targetDays, today]);

  // Solved vs Unsolved Blueprints
  const { completedProblems, unsolvedProblems, masteryPercent } = useMemo(() => {
    const completed = [];
    const unsolved = [];
    for (const problem of allMasteryProblems) {
      const prog = getProblemProgress(problem.id);
      if (prog.completed) {
        completed.push(problem);
      } else {
        unsolved.push(problem);
      }
    }
    const percent = allMasteryProblems.length > 0 
      ? Math.round((completed.length / allMasteryProblems.length) * 100) 
      : 0;
    return { completedProblems: completed, unsolvedProblems: unsolved, masteryPercent: percent };
  }, [allMasteryProblems, getProblemProgress]);

  // Dynamic daily pace required to finish by target deadline
  const dynamicDailyPace = useMemo(() => {
    if (unsolvedProblems.length === 0) return 0;
    return Math.max(1, Math.ceil(unsolvedProblems.length / daysRemaining));
  }, [unsolvedProblems.length, daysRemaining]);

  // Curated "Today's Set"
  const todaysMasterySet = useMemo(() => {
    if (unsolvedProblems.length === 0) return [];

    const targetCount = Math.min(4, Math.max(2, adaptiveMasteryPlan?.dailyPace || dynamicDailyPace || 3));

    if (adaptiveMasteryPlan?.prioritizeWeakPatterns && overallMasteryStats?.patternCompletion) {
      // Prioritize patterns with lowest completion percentages
      const sortedPatterns = (['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming', 'breadth_first_search'] as PatternId[])
        .map((pid) => {
          const data = overallMasteryStats.patternCompletion[pid] || { completed: 0, total: 20 };
          return {
            patternId: pid,
            completionRatio: data.total > 0 ? data.completed / data.total : 0,
          };
        })
        .sort((a, b) => a.completionRatio - b.completionRatio);

      const selected: typeof unsolvedProblems = [];
      for (const { patternId } of sortedPatterns) {
        if (selected.length >= targetCount) break;
        const matching = unsolvedProblems.filter((p) => p.pattern === patternId && !selected.some((s) => s.id === p.id));
        for (const item of matching) {
          if (selected.length >= targetCount) break;
          selected.push(item);
        }
      }

      for (const item of unsolvedProblems) {
        if (selected.length >= targetCount) break;
        if (!selected.some((s) => s.id === item.id)) {
          selected.push(item);
        }
      }
      return selected;
    }

    // Default sequential track curriculum
    return unsolvedProblems.slice(0, targetCount);
  }, [unsolvedProblems, adaptiveMasteryPlan?.dailyPace, adaptiveMasteryPlan?.prioritizeWeakPatterns, dynamicDailyPace, overallMasteryStats]);
  
  // Persistent viewMode state ('weeks' or 'days')
  const [viewMode, setViewMode] = useState<'weeks' | 'days'>(() => {
    return readStorage<'weeks' | 'days'>('prismcode-year-viewmode', 'weeks');
  });
  useEffect(() => {
    writeStorage('prismcode-year-viewmode', viewMode);
  }, [viewMode]);

  // ── Habits State (Fully editable & persistent) ──
  const [habits, setHabits] = useState<Habit[]>(() => {
    return readStorage<Habit[]>('prismcode-year-habits', DEFAULT_HABITS);
  });
  useEffect(() => {
    writeStorage('prismcode-year-habits', habits);
  }, [habits]);

  // Habit completion tracking by dateKey: Record<dateKey, Record<habitId, boolean>>
  const [habitCompletions, setHabitCompletions] = useState<Record<string, Record<string, boolean>>>(() => {
    return readStorage<Record<string, Record<string, boolean>>>('prismcode-habit-completions', {});
  });
  useEffect(() => {
    writeStorage('prismcode-habit-completions', habitCompletions);
  }, [habitCompletions]);

  // Habit visibility filter (turn on/off on calendar from bottom-left or top strip)
  const [enabledHabitFilter, setEnabledHabitFilter] = useState<Record<string, boolean>>(() => {
    return readStorage<Record<string, boolean>>('prismcode-habit-filter', {});
  });
  useEffect(() => {
    writeStorage('prismcode-habit-filter', enabledHabitFilter);
  }, [enabledHabitFilter]);

  const toggleHabitFilter = (id: string) => {
    setEnabledHabitFilter((prev) => ({
      ...prev,
      [id]: prev[id] === false ? true : false,
    }));
  };

  // ── Quarter Goals State (Fully editable & removable) ──
  const [quarterGoals, setQuarterGoals] = useState<Record<'Q1' | 'Q2' | 'Q3' | 'Q4', QuarterGoal>>(() => {
    return readStorage<Record<'Q1' | 'Q2' | 'Q3' | 'Q4', QuarterGoal>>('prismcode-quarter-goals', DEFAULT_GOALS);
  });
  useEffect(() => {
    writeStorage('prismcode-quarter-goals', quarterGoals);
  }, [quarterGoals]);

  // ── Week Focus Map (Persisted) ──
  const [weekFocusMap, setWeekFocusMap] = useState<Record<string, string>>(() => {
    return readStorage<Record<string, string>>('prismcode-week-focus', {});
  });
  useEffect(() => {
    writeStorage('prismcode-week-focus', weekFocusMap);
  }, [weekFocusMap]);

  // ── Year Plans (Persisted) ──
  const [plans, setPlans] = useState<YearPlan[]>(() => {
    return readStorage<YearPlan[]>('prismcode-year-plans', []);
  });
  useEffect(() => {
    writeStorage('prismcode-year-plans', plans);
  }, [plans]);

  // ── Selected Week & Date for Detail Drawer ──
  const [selectedWeek, setSelectedWeek] = useState<YearWeek | null>(null);
  const [selectedPlanDayKey, setSelectedPlanDayKey] = useState<string>(() => toDateKey(today));

  // Modals & Interactive State
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitMinutes, setNewHabitMinutes] = useState('20');
  const [newHabitColor, setNewHabitColor] = useState('#10b981');

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

  // Split quarters into left column (Q1, Q2) and right column (Q3, Q4)
  const leftQuarters = useMemo(() => quarters.filter((q) => q.id === 'Q1' || q.id === 'Q2'), [quarters]);
  const rightQuarters = useMemo(() => quarters.filter((q) => q.id === 'Q3' || q.id === 'Q4'), [quarters]);
  const allWeeks = useMemo(() => quarters.flatMap((q) => q.months.flatMap((m) => m.weeks)), [quarters]);

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
            const completedHabitCount = habits.filter(
              (h) => enabledHabitFilter[h.id] !== false && habitCompletions[d.dateKey]?.[h.id]
            ).length;

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
  }, [quarters, activityMap, habits, habitCompletions, enabledHabitFilter]);

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

  // Habit toggling for any date
  const toggleHabitForDate = (habitId: string, dateKey: string) => {
    setHabitCompletions((prev) => {
      const dayCompletions = { ...(prev[dateKey] || {}) };
      dayCompletions[habitId] = !dayCompletions[habitId];
      return { ...prev, [dateKey]: dayCompletions };
    });
  };

  // Add new habit
  const handleCreateHabit = () => {
    if (!newHabitName.trim()) return;
    const newHabit: Habit = {
      id: `habit-${Date.now()}`,
      name: newHabitName.trim(),
      targetMinutes: parseInt(newHabitMinutes) || 20,
      color: newHabitColor || '#10b981',
      streakDays: 0,
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => [...prev, newHabit]);
    setNewHabitName('');
    setIsAddingHabit(false);
  };

  // Save edited habit
  const handleUpdateHabit = () => {
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

  // Save edited quarter goal
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

  // Clear / remove quarter goal
  const handleClearQuarterGoal = () => {
    if (!editingQuarter) return;
    setQuarterGoals((prev) => ({
      ...prev,
      [editingQuarter]: {
        text: 'What would make this quarter count?',
        status: 'pending',
      },
    }));
    setEditingQuarter(null);
  };

  // Share handler
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  // Featured Habit in Left Sidebar
  const primaryHabit = habits[0] || null;
  const primaryHabitCompleted = primaryHabit ? Boolean(habitCompletions[activeDateKey]?.[primaryHabit.id]) : false;
  const primaryColor = primaryHabit?.color || '#10b981';

  // Common Milestone Banner Card Component (Adaptive Placement Hub or Blank Wall)
  const renderBanner = () => {
    if (adaptiveMasteryPlan?.enabled) {
      return (
        <div
          className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 border shadow-lg overflow-hidden w-full space-y-6"
          style={{
            backgroundColor: 'var(--ca-surface)',
            borderColor: 'color-mix(in srgb, var(--ca-border) 60%, #6366f1 40%)',
            boxShadow: '0 4px 24px -1px rgba(99, 102, 241, 0.08)',
          }}
        >
          {/* Top Row: Milestone Info & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Sparkles size={11} className="animate-pulse" />
                  Adaptive Placement Engine
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Flame size={10} />
                  {daysRemaining} days left
                </span>
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-extrabold text-primary tracking-tight flex items-center gap-2">
                <span>{adaptiveMasteryPlan.targetGoal || 'Campus Placements in 45 Days'}</span>
              </h1>
              <p className="text-xs sm:text-sm text-muted">
                Target Deadline: <strong className="text-primary">{adaptiveMasteryPlan.targetDate}</strong> · Pace: <strong className="text-primary">{dynamicDailyPace} blueprints/day</strong> to conquer all 25 patterns.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              <Link
                to="/mastery"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition text-primary hover:border-indigo-500/40"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--ca-surface) 90%, black 10%)',
                  borderColor: 'var(--ca-border)',
                }}
              >
                <Layers size={13} />
                All 25 Blueprints
              </Link>
              <Link
                to="/settings"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition text-primary hover:border-amber-500/40"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--ca-surface) 90%, black 10%)',
                  borderColor: 'var(--ca-border)',
                }}
                title="Adjust target days and pace in Settings"
              >
                <SlidersHorizontal size={13} />
                Tune Plan
              </Link>
              <button
                type="button"
                onClick={() => updateAdaptiveMasteryPlan({ enabled: false })}
                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-medium text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition"
                title="Pause adaptive plan"
              >
                Pause
              </button>
            </div>
          </div>

          {/* Overall Progress Bar & Track Badges */}
          <div className="space-y-2 pt-1 border-t" style={{ borderColor: 'var(--ca-border)' }}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-primary">
                Curriculum Progress: {completedProblems.length} / {allMasteryProblems.length} Blueprints Mastered
              </span>
              <span className="font-mono font-bold text-indigo-400">{masteryPercent}% Complete</span>
            </div>
            <div className="h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500"
                style={{ width: `${masteryPercent}%` }}
              />
            </div>

            {/* Pattern Breakdown Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              {(['two_pointers', 'sliding_window', 'hash_maps', 'dynamic_programming', 'breadth_first_search'] as PatternId[]).map((pid) => {
                const conf = PATTERN_CONFIG[pid];
                const stats = overallMasteryStats?.patternCompletion?.[pid] || { completed: 0, total: 20 };
                const dotColor = PATTERN_ACCENT_COLORS[pid] || '#6366f1';
                return (
                  <div
                    key={pid}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border text-muted"
                    style={{
                      borderColor: 'var(--ca-border)',
                      backgroundColor: 'color-mix(in srgb, var(--ca-surface) 92%, black 8%)',
                    }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: dotColor }} />
                    <span className="font-medium text-primary">{conf.name}</span>
                    <span className="font-mono text-[10px] text-muted">{stats.completed}/{stats.total}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 🎯 Today's Set Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-amber-500" />
                <h2 className="text-sm font-bold text-primary tracking-tight">Today&apos;s Set</h2>
                <span className="text-xs text-muted">
                  · Calibrated for today&apos;s {dynamicDailyPace} blueprint pace
                </span>
              </div>
              {unsolvedProblems.length > 0 && (
                <span className="text-[11px] text-muted font-mono">
                  {unsolvedProblems.length} remaining in catalog
                </span>
              )}
            </div>

            {todaysMasterySet.length === 0 ? (
              <div className="p-6 rounded-2xl border text-center space-y-2 bg-emerald-500/5 border-emerald-500/20">
                <Trophy size={28} className="mx-auto text-emerald-500" />
                <h3 className="text-sm font-bold text-primary">All 25 Blueprints Mastered!</h3>
                <p className="text-xs text-muted max-w-md mx-auto">
                  You have mastered every single algorithmic blueprint in the curriculum. Your placement algorithmic foundation is battle-ready!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {todaysMasterySet.map((problem) => {
                  const patternConf = PATTERN_CONFIG[problem.pattern];
                  const prog = getProblemProgress(problem.id);
                  const isDone = prog.completed;
                  const patternBadgeColor = PATTERN_ACCENT_COLORS[problem.pattern] || '#6366f1';

                  return (
                    <div
                      key={problem.id}
                      className="rounded-xl p-4 border flex flex-col justify-between gap-3 transition-all hover:border-indigo-500/40 hover:shadow-sm"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--ca-surface) 90%, black 10%)',
                        borderColor: isDone ? 'rgba(16, 185, 129, 0.4)' : 'var(--ca-border)',
                      }}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: patternBadgeColor }}
                          >
                            {patternConf?.name || problem.pattern}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                              problem.difficulty === 'Easy'
                                ? 'text-emerald-500 bg-emerald-500/10'
                                : problem.difficulty === 'Medium'
                                ? 'text-amber-500 bg-amber-500/10'
                                : 'text-rose-500 bg-rose-500/10'
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-primary line-clamp-1" title={problem.title}>
                          {problem.title}
                        </h3>

                        <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                          {problem.statement.description}
                        </p>

                        <div className="flex items-center gap-3 text-[11px] text-muted pt-1">
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {problem.estimated_minutes || 20} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap size={11} className="text-amber-500" />
                            {problem.hardest_lines_to_test.length} high-risk lines
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-3 border-t" style={{ borderColor: 'var(--ca-border)' }}>
                        <button
                          type="button"
                          onClick={() => toggleCompleted(problem.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                            isDone
                              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                              : 'border-neutral-700 text-muted hover:text-primary hover:border-neutral-500'
                          }`}
                          title={isDone ? 'Mark as uncompleted' : 'Mark as mastered'}
                        >
                          <CheckCircle2 size={13} className={isDone ? 'text-emerald-400' : 'text-neutral-500'} />
                          {isDone ? 'Mastered' : 'Mark Done'}
                        </button>

                        <Link
                          to={`/mastery/${problem.slug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-black hover:bg-neutral-200 transition shadow-sm"
                        >
                          Launch Studio
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Default Banner when Adaptive Plan is paused / not enabled
    return (
      <div className="space-y-4 w-full">
        <div
          className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 border shadow-sm overflow-hidden w-full"
          style={{
            backgroundColor: 'var(--ca-surface)',
            borderColor: 'var(--ca-border)',
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-primary tracking-tight">
                {selectedYear} is a blank wall. Fill it in.
              </h1>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Start with the big rocks: trips, launches, exams, birthdays. Click any week or date to add plans, then set habits to track each day.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const thisWeek = allWeeks.find((w) => w.isCurrentWeek) || allWeeks[0];
                  if (thisWeek) {
                    setSelectedWeek(thisWeek);
                    setSelectedPlanDayKey(thisWeek.days[0].dateKey);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-black hover:bg-neutral-200 transition shadow-sm"
              >
                Add your first plan <ArrowUpRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewHabitColor('#10b981');
                  setIsAddingHabit(true);
                }}
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

        {/* Adaptive Placement Engine Activation Prompt */}
        <div
          className="relative rounded-2xl p-4 sm:p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--ca-surface) 92%, #6366f1 8%)',
            borderColor: 'color-mix(in srgb, var(--ca-border) 70%, #6366f1 30%)',
          }}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-indigo-400" />
              <span className="text-xs font-bold text-primary">
                Adaptive Placement Engine Available
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 font-semibold">
                25 Blueprints
              </span>
            </div>
            <p className="text-xs text-muted max-w-2xl leading-relaxed">
              Connect YearPlanner to Mastery data to activate an adaptive roadmap (e.g. &ldquo;Campus Placements in 45 Days&rdquo;). Automatically schedules today&apos;s daily problem set calibrated to your target interview deadline.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                const targetDate = new Date();
                targetDate.setDate(targetDate.getDate() + 45);
                updateAdaptiveMasteryPlan({
                  enabled: true,
                  targetGoal: 'Campus Placements in 45 Days',
                  targetDays: 45,
                  targetDate: targetDate.toISOString().split('T')[0],
                  dailyPace: 3,
                });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-sm"
            >
              <Zap size={13} />
              Activate 45-Day Plan
            </button>
            <Link
              to="/settings"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border text-primary hover:border-indigo-500/40 transition"
              style={{
                backgroundColor: 'var(--ca-surface)',
                borderColor: 'var(--ca-border)',
              }}
            >
              <SlidersHorizontal size={13} />
              Configure in Settings
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-6 pb-20">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER BAR (YEAR SELECTOR, PROGRESS, VIEW MODE, ACTIONS)
      ────────────────────────────────────────────────────────────── */}
      <header
        className="w-full rounded-2xl p-4 sm:p-5 border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{
          backgroundColor: 'var(--ca-surface)',
          borderColor: 'var(--ca-border)',
        }}
      >
        {/* Left: Year Navigator & This Week button */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center rounded-xl p-1 border shadow-sm"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedYear((y) => y - 1)}
              className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition"
              title="Previous year"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-mono text-base font-bold text-primary px-3 tracking-tight">
              {selectedYear}
            </span>
            <button
              type="button"
              onClick={() => setSelectedYear((y) => y + 1)}
              className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition"
              title="Next year"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleScrollToThisWeek}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all text-primary hover:border-amber-500/40 shadow-sm"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <Target size={13} className="text-amber-500" /> This week
          </button>
        </div>

        {/* Center: Dynamic Year Progress Bar */}
        <div className="flex-1 max-w-xl flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-primary whitespace-nowrap">
            Week {progressStats.currentWeekNumber} of {progressStats.totalWeeks}
          </span>
          <div className="flex-1 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden relative">
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
          2. MAIN CONTENT (WEEKS VIEW vs DAYS VIEW)
      ────────────────────────────────────────────────────────────── */}
      {viewMode === 'weeks' ? (
        /* ── WEEKS VIEW: TWO-COLUMN (SIDEBAR + 4-QUADRANT GRID) ── */
        <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
          {/* ── LEFT SIDEBAR (~280px - 320px) ── */}
          <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0 space-y-3.5">
            {/* Habits Card with Date and Main Active Habit */}
            <div
              className="rounded-2xl p-3.5 sm:p-4 border space-y-3.5 shadow-sm"
              style={{
                backgroundColor: 'var(--ca-surface)',
                borderColor: 'var(--ca-border)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
                    Habits · today
                  </span>
                  <span className="text-sm font-bold text-primary tracking-tight">
                    {today.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNewHabitColor('#10b981');
                    setIsAddingHabit(true);
                  }}
                  className="p-1 rounded-lg text-amber-500 hover:bg-amber-500/10 transition"
                  title="Add custom habit"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Featured Active Habit Box */}
              {primaryHabit && (
                <div
                  className="relative rounded-xl p-2.5 sm:p-3 border space-y-2 transition-all"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--ca-surface) 90%, black 10%)',
                    borderColor: primaryHabitCompleted
                      ? `color-mix(in srgb, var(--ca-border) 60%, ${primaryColor} 40%)`
                      : 'var(--ca-border)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-lg text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Terminal size={12} />
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
                      className="h-5 w-5 rounded-md flex items-center justify-center border transition"
                      style={{
                        backgroundColor: primaryHabitCompleted ? primaryColor : 'transparent',
                        borderColor: primaryHabitCompleted ? primaryColor : '#666',
                        color: '#ffffff',
                      }}
                    >
                      {primaryHabitCompleted && <Check size={12} className="stroke-[3]" />}
                    </button>
                  </div>

                  {/* Progress bar inside card */}
                  <div>
                    <div className="flex justify-between text-[9px] text-muted font-mono mb-1">
                      <span>{primaryHabitCompleted ? `${primaryHabit.targetMinutes || 20} min` : '0 min'} today</span>
                      <span>Target: {primaryHabit.targetMinutes || 20}m</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-black/15 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          backgroundColor: primaryColor,
                          width: primaryHabitCompleted ? '100%' : '15%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* List of other user habits */}
              <div className="space-y-1.5 pt-1">
                {habits.slice(1).map((habit) => {
                  const isCompleted = Boolean(habitCompletions[activeDateKey]?.[habit.id]);
                  const habitColor = habit.color || '#10b981';
                  return (
                    <div
                      key={habit.id}
                      className="group flex items-center justify-between p-2 rounded-xl border transition"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--ca-surface) 93%, black 7%)',
                        borderColor: isCompleted
                          ? `color-mix(in srgb, var(--ca-border) 60%, ${habitColor} 40%)`
                          : 'var(--ca-border)',
                      }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="h-2 w-2 rounded-full shrink-0"
                          style={{ backgroundColor: habitColor }}
                        />
                        <span className="text-xs font-medium text-primary truncate">{habit.name}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingHabit(habit)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded text-muted hover:text-primary transition"
                          title="Edit habit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleHabitForDate(habit.id, activeDateKey)}
                          className="h-5 w-5 rounded-md flex items-center justify-center border transition"
                          style={{
                            backgroundColor: isCompleted ? habitColor : 'transparent',
                            borderColor: isCompleted ? habitColor : '#666',
                            color: '#ffffff',
                          }}
                        >
                          {isCompleted && <Check size={11} className="stroke-[3]" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Habit Button */}
              <button
                type="button"
                onClick={() => {
                  setNewHabitColor('#10b981');
                  setIsAddingHabit(true);
                }}
                className="w-full py-2 px-3 rounded-xl border border-dashed text-xs font-semibold text-muted hover:text-primary hover:border-amber-500/50 flex items-center justify-center gap-1.5 transition"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                <Plus size={13} /> Add a habit
              </button>
            </div>

            {/* Compact Perfect Weeks Counter */}
            <div
              className="rounded-2xl p-3 sm:p-3.5 border space-y-1.5 shadow-sm"
              style={{
                backgroundColor: 'var(--ca-surface)',
                borderColor: 'var(--ca-border)',
              }}
            >
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={11} />
                <span>Perfect weeks</span>
              </div>
              <div className="text-xl font-bold text-primary tracking-tight">
                {perfectWeeksStats.perfectCount} perfect weeks
              </div>
              <p className="text-[10px] text-muted leading-relaxed">
                {perfectWeeksStats.perfectCount} this year · best run {perfectWeeksStats.bestRun} weeks.
                Every active habit hit its target.
              </p>
            </div>

            {/* Compact Quarter Goals Section */}
            <div
              className="rounded-2xl p-3 sm:p-3.5 border space-y-2.5 shadow-sm"
              style={{
                backgroundColor: 'var(--ca-surface)',
                borderColor: 'var(--ca-border)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Quarter goals</span>
                <span className="text-[9px] text-muted">Click to edit</span>
              </div>

              <div className="space-y-1.5">
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
                      className={`group relative p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-neutral-300 dark:border-neutral-300 ring-1 ring-white/20'
                          : 'border-[color:var(--ca-border)] hover:border-amber-500/30'
                      }`}
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--ca-surface) 93%, black 7%)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-mono text-[11px] font-bold text-primary">{qKey} goals</span>
                        <span
                          className={`text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded-full ${
                            goal?.status === 'done'
                              ? 'bg-neutral-800 text-neutral-300 dark:bg-neutral-800 dark:text-neutral-300'
                              : goal?.status === 'now'
                              ? 'bg-white text-black font-extrabold'
                              : 'bg-black/5 dark:bg-white/5 text-muted'
                          }`}
                        >
                          {goal?.status === 'done' ? 'Done' : goal?.status === 'now' ? 'Now' : 'Upcoming'}
                        </span>
                      </div>
                      <div className="text-[11px] text-muted group-hover:text-primary transition line-clamp-1">
                        {goal?.text || 'What would make this quarter count?'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom-Left Habit Filter Section */}
            <div
              className="rounded-2xl p-3 sm:p-3.5 border space-y-2 shadow-sm"
              style={{
                backgroundColor: 'var(--ca-surface)',
                borderColor: 'var(--ca-border)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Show on calendar</span>
                <span className="text-[9px] text-muted">Click to toggle</span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {habits.map((habit) => {
                  const isEnabled = enabledHabitFilter[habit.id] !== false;
                  const habitColor = habit.color || '#10b981';
                  return (
                    <button
                      key={habit.id}
                      type="button"
                      onClick={() => toggleHabitFilter(habit.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                        isEnabled
                          ? 'border-neutral-700 bg-neutral-900/90 text-primary shadow-sm hover:scale-105'
                          : 'border-transparent bg-black/5 dark:bg-white/5 text-muted opacity-40 hover:opacity-75'
                      }`}
                    >
                      <span
                        className="h-2 w-2 rounded-full shrink-0 transition"
                        style={{ backgroundColor: habitColor }}
                      />
                      <span className="truncate max-w-[120px]">{habit.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ── RIGHT MAIN CONTENT (BANNER + ANNUAL 4-QUADRANT GRID) ── */}
          <main className="flex-1 min-w-0 space-y-6 w-full">
            {renderBanner()}

            {/* 4-Quadrant Annual Week Grid (NO vertical center divider line) */}
            <div
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-sm space-y-8 overflow-x-auto w-full"
              style={{
                backgroundColor: 'var(--ca-surface)',
                borderColor: 'var(--ca-border)',
              }}
            >
              {/* Clean 2-column grid without vertical dividing line */}
              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
                {/* Left Column: Q1 (Jan to Mar) and Q2 (Apr to Jun) */}
                <div className="space-y-10">
                  {leftQuarters.map((quarter) => (
                    <QuarterSection
                      key={quarter.id}
                      quarter={quarter}
                      habits={habits}
                      activityMap={activityMap}
                      habitCompletions={habitCompletions}
                      enabledHabitFilter={enabledHabitFilter}
                      currentWeekRef={currentWeekRef}
                      selectedWeekNumber={selectedWeek?.weekNumber}
                      plans={plans}
                      weekFocusMap={weekFocusMap}
                      selectedYear={selectedYear}
                      onSelectWeek={(w) => {
                        setSelectedWeek(w);
                        setSelectedPlanDayKey(w.days[0].dateKey);
                        setActiveDateKey(w.days[0].dateKey);
                      }}
                      onSelectDay={(w, dKey) => {
                        setSelectedWeek(w);
                        setSelectedPlanDayKey(dKey);
                        setActiveDateKey(dKey);
                      }}
                      onHoverDay={(day, eventCount) => setHoveredDay({ day, eventCount })}
                    />
                  ))}
                </div>

                {/* Right Column: Q3 (Jul to Sep) and Q4 (Oct to Dec) */}
                <div className="space-y-10">
                  {rightQuarters.map((quarter) => (
                    <QuarterSection
                      key={quarter.id}
                      quarter={quarter}
                      habits={habits}
                      activityMap={activityMap}
                      habitCompletions={habitCompletions}
                      enabledHabitFilter={enabledHabitFilter}
                      currentWeekRef={currentWeekRef}
                      selectedWeekNumber={selectedWeek?.weekNumber}
                      plans={plans}
                      weekFocusMap={weekFocusMap}
                      selectedYear={selectedYear}
                      onSelectWeek={(w) => {
                        setSelectedWeek(w);
                        setSelectedPlanDayKey(w.days[0].dateKey);
                        setActiveDateKey(w.days[0].dateKey);
                      }}
                      onSelectDay={(w, dKey) => {
                        setSelectedWeek(w);
                        setSelectedPlanDayKey(dKey);
                        setActiveDateKey(dKey);
                      }}
                      onHoverDay={(day, eventCount) => setHoveredDay({ day, eventCount })}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Footnote text matching reference */}
              <div className="pt-4 border-t border-[color:var(--ca-border)] flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
                <span className="text-[11px] leading-relaxed">
                  Weeks run Monday to Sunday, W1 is the week that holds the year's first Thursday, so it can start in late December. Click any week or date to add plans.
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
      ) : (
        /* ── DAYS VIEW: FULL-WIDTH 12-MONTH x 31-DAY MATRIX (MATCHING USER IMAGE) ── */
        <div className="w-full space-y-6">
          {renderBanner()}

          {/* Quick Habit Filters Strip in Days View */}
          <div className="flex flex-wrap items-center gap-2 px-1">
            <span className="text-[11px] font-mono font-bold text-muted uppercase tracking-wider">
              Filter habits:
            </span>
            {habits.map((habit) => {
              const isEnabled = enabledHabitFilter[habit.id] !== false;
              const habitColor = habit.color || '#10b981';
              return (
                <button
                  key={habit.id}
                  type="button"
                  onClick={() => toggleHabitFilter(habit.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                    isEnabled
                      ? 'border-neutral-700 bg-neutral-900/90 text-primary shadow-sm hover:scale-105'
                      : 'border-transparent bg-black/5 dark:bg-white/5 text-muted opacity-40 hover:opacity-75'
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full shrink-0 transition"
                    style={{ backgroundColor: habitColor }}
                  />
                  <span>{habit.name}</span>
                </button>
              );
            })}
          </div>

          {/* Full-Width 12-Month x 31-Day Grid */}
          <DaysGridView
            selectedYear={selectedYear}
            today={today}
            habits={habits}
            activityMap={activityMap}
            habitCompletions={habitCompletions}
            enabledHabitFilter={enabledHabitFilter}
            plans={plans}
            allWeeks={allWeeks}
            activeDateKey={activeDateKey}
            onSelectDay={(week, dKey) => {
              setSelectedWeek(week);
              setSelectedPlanDayKey(dKey);
              setActiveDateKey(dKey);
            }}
            onHoverDay={(day, eventCount) => setHoveredDay({ day, eventCount })}
            hoveredDay={hoveredDay}
          />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. RIGHT SLIDE-OVER WEEK & DATE DETAIL DRAWER
      ────────────────────────────────────────────────────────────── */}
      {selectedWeek && (
        <WeekDetailDrawer
          week={selectedWeek}
          allWeeks={allWeeks}
          habits={habits}
          habitCompletions={habitCompletions}
          weekFocusMap={weekFocusMap}
          plans={plans}
          selectedYear={selectedYear}
          selectedPlanDayKey={selectedPlanDayKey}
          onClose={() => setSelectedWeek(null)}
          onSelectWeek={(w) => {
            setSelectedWeek(w);
            setSelectedPlanDayKey(w.days[0].dateKey);
            setActiveDateKey(w.days[0].dateKey);
          }}
          onSelectPlanDayKey={(dKey) => {
            setSelectedPlanDayKey(dKey);
            setActiveDateKey(dKey);
          }}
          onToggleHabit={toggleHabitForDate}
          onUpdateWeekFocus={(text) => {
            const wKey = `${selectedYear}-W${String(selectedWeek.weekNumber).padStart(2, '0')}`;
            setWeekFocusMap((prev) => ({ ...prev, [wKey]: text }));
          }}
          onAddPlan={(title, dateKey, category) => {
            const newPlan: YearPlan = {
              id: `plan-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              title,
              dateKey,
              category,
              createdAt: new Date().toISOString(),
            };
            setPlans((prev) => [newPlan, ...prev]);
          }}
          onDeletePlan={(planId) => {
            setPlans((prev) => prev.filter((p) => p.id !== planId));
          }}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. EDIT & ADD MODALS (WITH COLOR PICKER)
      ────────────────────────────────────────────────────────────── */}

      {/* Add Habit Modal with Color Selection */}
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
              <h3 className="font-display text-lg font-bold text-primary">Create a New Habit</h3>
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
                <label className="text-xs font-semibold text-primary block mb-1">Habit Name</label>
                <input
                  type="text"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="e.g. Daily DP practice, Read 1 editorial"
                  className="input-field w-full text-xs"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Target Daily Minutes</label>
                <input
                  type="number"
                  value={newHabitMinutes}
                  onChange={(e) => setNewHabitMinutes(e.target.value)}
                  min="5"
                  max="180"
                  step="5"
                  className="input-field w-full text-xs"
                />
              </div>

              {/* Color Swatch Selector */}
              <div>
                <label className="text-xs font-semibold text-primary block mb-2">Habit Color</label>
                <div className="flex flex-wrap items-center gap-2.5">
                  {HABIT_COLORS.map((col) => {
                    const isSelected = (newHabitColor || '#10b981') === col.hex;
                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setNewHabitColor(col.hex)}
                        className={`h-7 w-7 rounded-full flex items-center justify-center transition-all ${
                          isSelected ? 'ring-2 ring-white scale-110 shadow-md' : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.label}
                      >
                        {isSelected && <Check size={14} className="text-white stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
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
                onClick={handleCreateHabit}
                disabled={!newHabitName.trim()}
                className="btn-primary px-5 py-2 text-xs font-semibold disabled:opacity-50"
              >
                Add Habit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Habit Modal with Color Selection */}
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
              <h3 className="font-display text-lg font-bold text-primary">Edit Habit</h3>
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
                <label className="text-xs font-semibold text-primary block mb-1">Habit Name</label>
                <input
                  type="text"
                  value={editingHabit.name}
                  onChange={(e) => setEditingHabit({ ...editingHabit, name: e.target.value })}
                  className="input-field w-full text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Target Daily Minutes</label>
                <input
                  type="number"
                  value={editingHabit.targetMinutes || 20}
                  onChange={(e) => setEditingHabit({ ...editingHabit, targetMinutes: parseInt(e.target.value) || 20 })}
                  min="5"
                  max="180"
                  step="5"
                  className="input-field w-full text-xs"
                />
              </div>

              {/* Color Swatch Selector */}
              <div>
                <label className="text-xs font-semibold text-primary block mb-2">Habit Color</label>
                <div className="flex flex-wrap items-center gap-2.5">
                  {HABIT_COLORS.map((col) => {
                    const isSelected = (editingHabit.color || '#10b981') === col.hex;
                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setEditingHabit({ ...editingHabit, color: col.hex })}
                        className={`h-7 w-7 rounded-full flex items-center justify-center transition-all ${
                          isSelected ? 'ring-2 ring-white scale-110 shadow-md' : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.label}
                      >
                        {isSelected && <Check size={14} className="text-white stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleDeleteHabit(editingHabit.id)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 flex items-center gap-1.5 transition"
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
                  onClick={handleUpdateHabit}
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
              <h3 className="font-display text-lg font-bold text-primary">
                Edit {editingQuarter} Goal
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
                <label className="text-xs font-semibold text-primary block mb-1">Goal Description</label>
                <textarea
                  value={quarterEditText}
                  onChange={(e) => setQuarterEditText(e.target.value)}
                  placeholder="What would make this quarter count? (e.g. Solve 50 DP problems, Win a contest badge)"
                  rows={3}
                  className="input-field w-full text-xs resize-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-primary block mb-1">Quarter Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['pending', 'now', 'done'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setQuarterEditStatus(st)}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        quarterEditStatus === st
                          ? 'bg-white text-black border-white shadow-sm font-extrabold'
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
                onClick={handleClearQuarterGoal}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 flex items-center gap-1.5 transition"
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
                The <strong className="text-primary">Year Planner</strong> maps your entire year into 52–53 ISO weeks across four quarterly quadrants or into an annual 12-month x 31-day matrix.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-primary">Weeks Mode:</strong> Displays 4 quarterly sections with weekly cards and vertical day slices.
                </li>
                <li>
                  <strong className="text-primary">Days Mode:</strong> Displays an annual 12-month x 31-day calendar matrix across the full width of the screen.
                </li>
                <li>
                  <strong className="text-primary">Interactive Drawer:</strong> Click any week or date in either mode to slide open the right detail drawer to write weekly focus notes, check off habits for Monday–Sunday, and schedule plans.
                </li>
                <li>
                  <strong className="text-primary">Habit Color Heatmap:</strong> Completed habits color-code your calendar slices and day cells with the custom color of each habit.
                </li>
                <li>
                  <strong className="text-primary">Show on Calendar Filter:</strong> Toggle any habit on or off to dynamically filter the calendar view.
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
 * ─────────────────────────────────────────────────────────────
 * DaysGridView Component (12-Month x 31-Day Annual Matrix)
 * Exactly matching user reference image
 * ──────────────────────────────────────────────────────────────
 */
function DaysGridView({
  selectedYear,
  today,
  habits,
  activityMap,
  habitCompletions,
  enabledHabitFilter,
  plans,
  allWeeks,
  activeDateKey,
  onSelectDay,
  onHoverDay,
  hoveredDay,
}: {
  selectedYear: number;
  today: Date;
  habits: Habit[];
  activityMap: Map<string, { count: number; solvedCount: number; durationSeconds: number }>;
  habitCompletions: Record<string, Record<string, boolean>>;
  enabledHabitFilter: Record<string, boolean>;
  plans: YearPlan[];
  allWeeks: YearWeek[];
  activeDateKey: string;
  onSelectDay: (week: YearWeek, dateKey: string) => void;
  onHoverDay: (day: DayInfo, count: number) => void;
  hoveredDay: { day: DayInfo; eventCount: number } | null;
}) {
  const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <div
      className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 border shadow-sm space-y-5 overflow-x-auto w-full"
      style={{
        backgroundColor: 'var(--ca-surface)',
        borderColor: 'var(--ca-border)',
      }}
    >
      <div className="min-w-[880px] space-y-1.5">
        {/* Top Header Row: 1 to 31 */}
        <div className="flex items-center gap-2">
          {/* Spacer corresponding to month name column */}
          <div className="w-10 sm:w-12 shrink-0 border-r border-transparent pr-2" />

          {/* 31 Day Number Headers */}
          <div
            className="grid gap-1 sm:gap-1.5 flex-1"
            style={{ gridTemplateColumns: 'repeat(31, minmax(0, 1fr))' }}
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((dayNum) => (
              <div
                key={dayNum}
                className="text-center font-mono text-[10px] sm:text-[11px] font-semibold text-neutral-400 select-none"
              >
                {dayNum}
              </div>
            ))}
          </div>
        </div>

        {/* 12 Month Rows */}
        {MONTH_NAMES.map((mName, mIdx) => {
          const daysInMonth = new Date(selectedYear, mIdx + 1, 0).getDate();

          return (
            <div key={mName} className="flex items-center gap-2">
              {/* Month Label with vertical right border divider */}
              <div className="w-10 sm:w-12 shrink-0 font-mono text-xs sm:text-sm font-bold text-primary border-r border-neutral-700/80 pr-2 flex items-center justify-between">
                <span>{mName}</span>
              </div>

              {/* 31 Day Cells */}
              <div
                className="grid gap-1 sm:gap-1.5 flex-1"
                style={{ gridTemplateColumns: 'repeat(31, minmax(0, 1fr))' }}
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((dayNum) => {
                  if (dayNum > daysInMonth) {
                    return <div key={dayNum} className="h-7 sm:h-8" />;
                  }

                  const dateObj = new Date(selectedYear, mIdx, dayNum);
                  const dKey = toDateKey(dateObj);
                  const isToday = dKey === toDateKey(today);
                  const isSelectedDate = dKey === activeDateKey;
                  const dayActivity = activityMap.get(dKey);
                  const eventCount = dayActivity?.count || 0;

                  const activeCompletedHabits = habits.filter(
                    (h) => enabledHabitFilter[h.id] !== false && habitCompletions[dKey]?.[h.id]
                  );
                  const totalScore = eventCount + activeCompletedHabits.length;
                  const primaryColor = activeCompletedHabits[0]?.color || '#10b981';

                  let cellStyle: React.CSSProperties = {};
                  let cellCls =
                    'bg-black/20 dark:bg-neutral-900/60 border border-neutral-800/80 hover:bg-neutral-800 hover:border-neutral-600 text-neutral-400';

                  if (totalScore >= 3) {
                    cellStyle = { backgroundColor: primaryColor, opacity: 1 };
                    cellCls = 'text-white border border-transparent';
                  } else if (totalScore === 2) {
                    cellStyle = { backgroundColor: primaryColor, opacity: 0.75 };
                    cellCls = 'text-white border border-transparent';
                  } else if (totalScore === 1) {
                    cellStyle = { backgroundColor: primaryColor, opacity: 0.45 };
                    cellCls = 'text-white border border-transparent';
                  }

                  const dayPlans = plans.filter((p) => p.dateKey === dKey);
                  const hasPlans = dayPlans.length > 0;
                  const planDotColor = hasPlans
                    ? PLAN_CATEGORIES.find((c) => c.id === dayPlans[0].category)?.color || '#3b82f6'
                    : undefined;

                  return (
                    <div key={dayNum} className="relative group h-7 sm:h-8 w-full">
                      <button
                        type="button"
                        onClick={() => {
                          const targetWeek =
                            allWeeks.find((w) => w.days.some((d) => d.dateKey === dKey)) || allWeeks[0];
                          onSelectDay(targetWeek, dKey);
                        }}
                        onMouseEnter={() =>
                          onHoverDay(
                            {
                              date: dateObj,
                              dateKey: dKey,
                              dayOfWeek: (dateObj.getDay() + 6) % 7,
                              dayOfMonth: dayNum,
                              monthIndex: mIdx,
                              isToday,
                              isPast: dateObj < today,
                              isFuture: dateObj > today,
                            },
                            totalScore
                          )
                        }
                        style={cellStyle}
                        className={`h-full w-full rounded-md sm:rounded-lg font-mono text-[10px] sm:text-xs font-semibold flex items-center justify-center transition cursor-pointer relative ${cellCls} ${
                          isToday
                            ? 'border-2 border-white ring-2 ring-white/40 text-white font-extrabold shadow-lg z-10 scale-105'
                            : isSelectedDate
                            ? 'ring-1 ring-amber-400 border-amber-400 text-primary'
                            : 'hover:scale-105'
                        }`}
                        aria-label={`${dKey}: ${totalScore} activities`}
                      >
                        {dayNum}
                      </button>

                      {/* Plan Dot Indicator */}
                      {hasPlans && (
                        <span
                          className="absolute -top-0.5 right-0.5 h-1.5 w-1.5 rounded-full ring-1 ring-black pointer-events-none"
                          style={{ backgroundColor: planDotColor }}
                        />
                      )}

                      {/* Floating '+' badge on hover as seen in user reference */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                        <div className="h-3.5 w-3.5 rounded-full bg-white text-black shadow-md flex items-center justify-center font-bold text-[9px] leading-none">
                          +
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
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
  );
}

/**
 * Quarter Section with Month Rows and Week Cards
 */
function QuarterSection({
  quarter,
  habits,
  activityMap,
  habitCompletions,
  enabledHabitFilter,
  currentWeekRef,
  selectedWeekNumber,
  plans,
  weekFocusMap,
  selectedYear,
  onSelectWeek,
  onSelectDay,
  onHoverDay,
}: {
  quarter: QuarterData;
  habits: Habit[];
  activityMap: Map<string, { count: number; solvedCount: number; durationSeconds: number }>;
  habitCompletions: Record<string, Record<string, boolean>>;
  enabledHabitFilter: Record<string, boolean>;
  currentWeekRef: React.RefObject<HTMLDivElement>;
  selectedWeekNumber?: number;
  plans: YearPlan[];
  weekFocusMap: Record<string, string>;
  selectedYear: number;
  onSelectWeek: (w: YearWeek) => void;
  onSelectDay: (w: YearWeek, dateKey: string) => void;
  onHoverDay: (day: DayInfo, count: number) => void;
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
                const isSelectedWeek = selectedWeekNumber === week.weekNumber;
                const weekKey = `${selectedYear}-W${String(week.weekNumber).padStart(2, '0')}`;
                const weekFocus = weekFocusMap[weekKey];

                return (
                  <div
                    key={`week-${week.weekNumber}`}
                    ref={isNowWeek ? currentWeekRef : undefined}
                    onClick={() => onSelectWeek(week)}
                    className={`relative rounded-xl p-2.5 sm:p-3 border transition-all cursor-pointer ${
                      isSelectedWeek
                        ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-xl bg-neutral-900/95 scale-[1.02]'
                        : isNowWeek
                        ? 'border-white dark:border-white shadow-xl ring-1 ring-white/30 bg-neutral-900/90'
                        : 'border-[color:var(--ca-border)] hover:border-amber-500/40 hover:bg-neutral-900/50'
                    }`}
                    style={{
                      backgroundColor: isSelectedWeek || isNowWeek
                        ? undefined
                        : 'color-mix(in srgb, var(--ca-surface) 92%, black 8%)',
                    }}
                    title={weekFocus ? `Focus: ${weekFocus}` : `Week ${week.weekNumber}`}
                  >
                    {/* Week Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-mono text-[11px] font-bold text-muted">
                          W{week.weekNumber}
                        </span>
                        {weekFocus && (
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0"
                            title={`Focus: ${weekFocus}`}
                          />
                        )}
                      </div>

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

                        // Only consider habits that are currently enabled in the "Show" filter
                        const activeCompletedHabits = habits.filter(
                          (h) => enabledHabitFilter[h.id] !== false && habitCompletions[day.dateKey]?.[h.id]
                        );

                        const totalScore = eventCount + activeCompletedHabits.length;

                        // Determine slice color: if custom habits are completed, use primary habit color
                        const primaryColor = activeCompletedHabits[0]?.color || '#10b981';

                        let cellStyle: React.CSSProperties = {};
                        let cellCls = 'bg-black/20 dark:bg-neutral-800/80';

                        if (totalScore >= 3) {
                          cellStyle = { backgroundColor: primaryColor, opacity: 1 };
                          cellCls = '';
                        } else if (totalScore === 2) {
                          cellStyle = { backgroundColor: primaryColor, opacity: 0.75 };
                          cellCls = '';
                        } else if (totalScore === 1) {
                          cellStyle = { backgroundColor: primaryColor, opacity: 0.45 };
                          cellCls = '';
                        }

                        // Current day indicator in active week
                        const isToday = day.isToday;

                        // Check if day has scheduled plans
                        const dayPlans = plans.filter((p) => p.dateKey === day.dateKey);
                        const hasPlans = dayPlans.length > 0;
                        const planDotColor = hasPlans
                          ? PLAN_CATEGORIES.find((c) => c.id === dayPlans[0].category)?.color || '#3b82f6'
                          : undefined;

                        return (
                          <div key={day.dateKey} className="relative group/day h-full w-full">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectDay(week, day.dateKey);
                              }}
                              onMouseEnter={() => onHoverDay(day, totalScore)}
                              style={cellStyle}
                              className={`h-full w-full rounded-[2.5px] transition-all cursor-pointer relative ${cellCls} ${
                                isToday
                                  ? 'border border-white ring-1 ring-white/60 scale-105'
                                  : 'hover:scale-105'
                              }`}
                              aria-label={`${day.dateKey}: ${totalScore} activities`}
                            />

                            {/* Plan Dot Indicator */}
                            {hasPlans && (
                              <span
                                className="absolute -top-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full ring-1 ring-black pointer-events-none"
                                style={{ backgroundColor: planDotColor }}
                              />
                            )}

                            {/* Floating '+' badge on hover as seen in user reference */}
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/day:opacity-100 pointer-events-none transition-opacity z-20">
                              <div className="h-3.5 w-3.5 rounded-full bg-white text-black shadow-md flex items-center justify-center font-bold text-[9px] leading-none">
                                +
                              </div>
                            </div>
                          </div>
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

/**
 * ─────────────────────────────────────────────────────────────
 * WeekDetailDrawer Component
 * Slides in from the right when a week or date is selected.
 * ──────────────────────────────────────────────────────────────
 */
function WeekDetailDrawer({
  week,
  allWeeks,
  habits,
  habitCompletions,
  weekFocusMap,
  plans,
  selectedYear,
  selectedPlanDayKey,
  onClose,
  onSelectWeek,
  onSelectPlanDayKey,
  onToggleHabit,
  onUpdateWeekFocus,
  onAddPlan,
  onDeletePlan,
}: {
  week: YearWeek;
  allWeeks: YearWeek[];
  habits: Habit[];
  habitCompletions: Record<string, Record<string, boolean>>;
  weekFocusMap: Record<string, string>;
  plans: YearPlan[];
  selectedYear: number;
  selectedPlanDayKey: string;
  onClose: () => void;
  onSelectWeek: (w: YearWeek) => void;
  onSelectPlanDayKey: (dKey: string) => void;
  onToggleHabit: (habitId: string, dateKey: string) => void;
  onUpdateWeekFocus: (text: string) => void;
  onAddPlan: (title: string, dateKey: string, category: PlanCategory) => void;
  onDeletePlan: (planId: string) => void;
}) {
  const weekKey = `${selectedYear}-W${String(week.weekNumber).padStart(2, '0')}`;
  const [focusText, setFocusText] = useState(() => weekFocusMap[weekKey] || '');
  const [planTitle, setPlanTitle] = useState('');
  const [planCategory, setPlanCategory] = useState<PlanCategory>('work');

  // Keep local focus in sync if week changes
  useEffect(() => {
    setFocusText(weekFocusMap[weekKey] || '');
  }, [weekKey, weekFocusMap]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Find index of current week in allWeeks for < and > navigation
  const currentIndex = allWeeks.findIndex((w) => w.weekNumber === week.weekNumber);

  const handlePrevWeek = () => {
    if (currentIndex > 0) {
      onSelectWeek(allWeeks[currentIndex - 1]);
    }
  };

  const handleNextWeek = () => {
    if (currentIndex >= 0 && currentIndex < allWeeks.length - 1) {
      onSelectWeek(allWeeks[currentIndex + 1]);
    }
  };

  const handleAddPlanSubmit = () => {
    if (!planTitle.trim()) return;
    onAddPlan(planTitle.trim(), selectedPlanDayKey, planCategory);
    setPlanTitle('');
  };

  // Formatted day for "When:" label
  const activeDayInfo = week.days.find((d) => d.dateKey === selectedPlanDayKey) || week.days[0];
  const activeDayLabel = activeDayInfo.date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <>
      {/* Backdrop for mobile devices */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Slide-over Right Panel */}
      <aside
        className="fixed top-0 right-0 h-screen w-full sm:w-[420px] 2xl:w-[460px] z-50 border-l shadow-2xl flex flex-col bg-[#121214] text-white animate-in slide-in-from-right duration-200"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between p-5 pb-3 border-b border-neutral-800 shrink-0">
          <div>
            <span className="text-xs font-mono font-semibold text-neutral-400">Week {week.weekNumber}</span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              {formatWeekDateRange(week.startDate, week.endDate)}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 pt-1">
            <button
              type="button"
              onClick={handlePrevWeek}
              disabled={currentIndex <= 0}
              className="h-8 w-8 rounded-lg border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition disabled:opacity-30 disabled:pointer-events-none"
              title="Previous week"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNextWeek}
              disabled={currentIndex >= allWeeks.length - 1}
              className="h-8 w-8 rounded-lg border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition disabled:opacity-30 disabled:pointer-events-none"
              title="Next week"
            >
              <ChevronRight size={16} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-lg border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition"
              title="Close panel"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* 1. Week focus */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-400 block">
              Week focus · shows on the board
            </label>
            <input
              type="text"
              value={focusText}
              onChange={(e) => {
                setFocusText(e.target.value);
                onUpdateWeekFocus(e.target.value);
              }}
              placeholder="What is this week about?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900/90 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition"
            />
          </div>

          {/* 2. Habits this week */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400">Habits this week</span>
            </div>

            {/* Grid Header: M T W T F S S */}
            <div className="grid grid-cols-[1fr_repeat(7,26px)_36px] gap-1.5 items-center px-1 text-[11px] font-mono font-bold text-neutral-500">
              <span />
              <span className="text-center">M</span>
              <span className="text-center">T</span>
              <span className="text-center">W</span>
              <span className="text-center">T</span>
              <span className="text-center">F</span>
              <span className="text-center">S</span>
              <span className="text-center">S</span>
              <span className="text-right" />
            </div>

            {/* Habit Rows */}
            <div className="space-y-2">
              {habits.map((habit) => {
                const habitColor = habit.color || '#10b981';
                const completedCount = week.days.filter((d) => habitCompletions[d.dateKey]?.[habit.id]).length;

                return (
                  <div
                    key={habit.id}
                    className="grid grid-cols-[1fr_repeat(7,26px)_36px] gap-1.5 items-center p-1.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700/80 transition"
                  >
                    {/* Habit Name with color dot */}
                    <div className="flex items-center gap-2 min-w-0 pr-1">
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: habitColor }}
                      />
                      <span className="text-xs font-medium text-neutral-200 truncate" title={habit.name}>
                        {habit.name}
                      </span>
                    </div>

                    {/* 7 Checkboxes for Mon-Sun */}
                    {week.days.map((day) => {
                      const isDone = Boolean(habitCompletions[day.dateKey]?.[habit.id]);
                      return (
                        <button
                          key={day.dateKey}
                          type="button"
                          onClick={() => onToggleHabit(habit.id, day.dateKey)}
                          className="h-6.5 w-6.5 rounded-md flex items-center justify-center border transition cursor-pointer"
                          style={{
                            backgroundColor: isDone ? habitColor : 'rgba(255, 255, 255, 0.03)',
                            borderColor: isDone ? habitColor : 'rgba(255, 255, 255, 0.15)',
                          }}
                          title={`${day.dateKey}: ${isDone ? 'Completed' : 'Click to complete'}`}
                        >
                          {isDone && <Check size={13} className="text-white stroke-[3]" />}
                        </button>
                      );
                    })}

                    {/* Score (e.g. 0/7) */}
                    <span className="text-right font-mono text-xs font-bold text-neutral-300">
                      {completedCount}/7
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Add a plan Card */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3.5">
            <span className="text-xs font-semibold text-neutral-400 block">Add a plan</span>

            <input
              type="text"
              value={planTitle}
              onChange={(e) => setPlanTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddPlanSubmit();
              }}
              placeholder="e.g. Dentist, Ship v2, Pune trip"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-700/80 bg-neutral-950/80 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition"
            />

            {/* When row */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <span className="text-neutral-400">
                When: <strong className="text-white font-semibold">{activeDayLabel}</strong>
              </span>
              <span className="text-[10px] text-neutral-500 italic">Drag on the board for a range</span>
            </div>

            {/* Mon to Sun Pill Buttons */}
            <div className="grid grid-cols-7 gap-1">
              {week.days.map((day, idx) => {
                const isSelected = day.dateKey === selectedPlanDayKey;
                const dayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx];
                return (
                  <button
                    key={day.dateKey}
                    type="button"
                    onClick={() => onSelectPlanDayKey(day.dateKey)}
                    className={`py-1.5 rounded-lg text-xs font-semibold border transition ${
                      isSelected
                        ? 'bg-white text-black border-white shadow-sm font-bold'
                        : 'border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {dayName}
                  </button>
                );
              })}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {PLAN_CATEGORIES.map((cat) => {
                const isSelected = planCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setPlanCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition ${
                      isSelected
                        ? 'border-neutral-500 bg-neutral-800 text-white shadow-sm ring-1 ring-white/10'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Submit button */}
            <button
              type="button"
              onClick={handleAddPlanSubmit}
              disabled={!planTitle.trim()}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-neutral-700 hover:bg-neutral-600 text-white transition disabled:opacity-40 disabled:pointer-events-none shadow-sm"
            >
              Add plan
            </button>
          </div>

          {/* 4. Daily Breakdown List (Monday to Sunday) */}
          <div className="space-y-3 pt-2">
            {week.days.map((day, idx) => {
              const dayPlans = plans.filter((p) => p.dateKey === day.dateKey);
              const dayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx];
              const isToday = day.isToday;
              const isSelectedDay = day.dateKey === selectedPlanDayKey;

              return (
                <div
                  key={day.dateKey}
                  onClick={() => onSelectPlanDayKey(day.dateKey)}
                  className={`flex items-start gap-3 p-2 rounded-xl transition cursor-pointer ${
                    isSelectedDay
                      ? 'bg-neutral-900/80 ring-1 ring-neutral-700'
                      : 'hover:bg-neutral-900/40'
                  }`}
                >
                  {/* Day Badge */}
                  <div
                    className={`w-11 h-12 rounded-xl flex flex-col items-center justify-center border font-mono shrink-0 transition ${
                      isToday
                        ? 'border-amber-400/80 bg-amber-500/10 text-amber-400 shadow-sm'
                        : 'border-neutral-800 bg-neutral-900/80 text-neutral-300'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-neutral-400">{dayName}</span>
                    <span className="text-sm font-extrabold">{day.dayOfMonth}</span>
                  </div>

                  {/* Right side content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    {dayPlans.length === 0 ? (
                      <div className="text-xs text-neutral-500 py-2.5">Nothing planned</div>
                    ) : (
                      <div className="space-y-1.5">
                        {dayPlans.map((p) => {
                          const catConfig = PLAN_CATEGORIES.find((c) => c.id === p.category);
                          const catColor = catConfig?.color || '#3b82f6';
                          return (
                            <div
                              key={p.id}
                              className="group flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/90 hover:border-neutral-700 transition"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: catColor }} />
                                <span className="text-xs font-medium text-white truncate">{p.title}</span>
                                <span
                                  className="text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold uppercase shrink-0"
                                  style={{ backgroundColor: `${catColor}20`, color: catColor }}
                                >
                                  {catConfig?.label}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeletePlan(p.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 text-neutral-500 hover:text-rose-400 transition"
                                title="Delete plan"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
