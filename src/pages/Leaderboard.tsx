import { useEffect, useMemo, useState } from 'react';
import {
  Crown,
  Flame,
  Globe2,
  GraduationCap,
  Medal,
  RefreshCw,
  Search,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import ErrorAlert from '../components/ui/ErrorAlert';
import { CardSkeleton, SkeletonLine } from '../components/ui/LoadingSkeleton';
import { useLeaderboard } from '../hooks/useDataServices';
import { useAuth } from '../context/AuthContext';
import { leaderboardService, type LeaderboardEntry, type CollegeLeaderboardEntry } from '../services';

type TimeRange = 'all' | 'month' | 'week';
type LeaderboardTab = 'global' | 'campus-cup' | 'college-students';

export default function Leaderboard() {
  const { data: entries, status, error, retry } = useLeaderboard();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<LeaderboardTab>('global');
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Campus Cup state
  const [colleges, setColleges] = useState<CollegeLeaderboardEntry[]>([]);
  const [collegesLoading, setCollegesLoading] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<string>('IIT Bombay');
  const [collegeStudents, setCollegeStudents] = useState<LeaderboardEntry[]>([]);

  const userCollege = (user as any)?.university || '';

  // Load colleges list
  useEffect(() => {
    let mounted = true;
    const loadColleges = async () => {
      try {
        setCollegesLoading(true);
        const data = await leaderboardService.listColleges();
        if (mounted) {
          setColleges(data);
          if (userCollege && data.some((c) => c.collegeName.toLowerCase() === userCollege.toLowerCase())) {
            setSelectedCollege(userCollege);
          } else if (data.length > 0) {
            setSelectedCollege(data[0].collegeName);
          }
        }
      } finally {
        if (mounted) setCollegesLoading(false);
      }
    };
    loadColleges();
    return () => {
      mounted = false;
    };
  }, [userCollege]);

  // Load college-specific students when selectedCollege changes
  useEffect(() => {
    let mounted = true;
    const loadStudents = async () => {
      if (!selectedCollege) return;
      const data = await leaderboardService.listCollegeStudents(selectedCollege);
      if (mounted) {
        setCollegeStudents(data);
      }
    };
    loadStudents();
    return () => {
      mounted = false;
    };
  }, [selectedCollege]);

  // Period multiplier to simulate dynamic score adjustments for Month/Week
  const processedEntries = useMemo(() => {
    let list = entries.map((entry) => {
      if (timeRange === 'month') {
        return {
          ...entry,
          score: Math.round(entry.score * 0.42),
          solved: Math.max(1, Math.round(entry.solved * 0.38)),
        };
      }
      if (timeRange === 'week') {
        return {
          ...entry,
          score: Math.round(entry.score * 0.16),
          solved: Math.max(1, Math.round(entry.solved * 0.14)),
        };
      }
      return entry;
    });

    // Sort by adjusted score descending
    list.sort((a, b) => b.score - a.score);

    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.handle.toLowerCase().includes(q) ||
          (e.university && e.university.toLowerCase().includes(q))
      );
    }

    return list;
  }, [entries, timeRange, searchQuery]);

  const topThree = processedEntries.slice(0, 3);
  const remaining = processedEntries.slice(3);

  const topThreeColleges = useMemo(() => colleges.slice(0, 3), [colleges]);
  const remainingColleges = useMemo(() => colleges.slice(3), [colleges]);

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-9 space-y-8 animate-in fade-in">
      {/* Page Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Trophy size={12} />
              Rankings & Benchmarks
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <GraduationCap size={12} />
              Campus Cup
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
            Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
            Celebrate algorithmic consistency, campus rivalry, and competitive problem-solving velocity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/contests"
            className="btn-primary py-2 px-3 text-xs font-semibold"
          >
            <Trophy size={13} />
            <span>Weekly Contests</span>
          </Link>

          <button
            type="button"
            onClick={retry}
            disabled={status === 'loading'}
            className="btn-secondary py-2 text-xs"
            aria-label="Refresh leaderboard"
          >
            <RefreshCw size={13} className={status === 'loading' ? 'animate-spin' : ''} />
            <span>{status === 'loading' ? 'Refreshing…' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Main 3-Way Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-4" style={{ borderColor: 'var(--ca-border)' }}>
        <button
          type="button"
          onClick={() => setActiveTab('global')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'global'
              ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80'
          }`}
        >
          <Globe2 size={14} />
          <span>Global Coders</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('campus-cup')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'campus-cup'
              ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80'
          }`}
        >
          <Trophy size={14} className="text-amber-400" />
          <span>Campus Cup (Colleges)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('college-students')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'college-students'
              ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80'
          }`}
        >
          <GraduationCap size={14} />
          <span>College Coders (Campus Standings)</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: GLOBAL CODERS                                      */}
      {/* ======================================================== */}
      {activeTab === 'global' && (
        <div className="space-y-6">
          {/* Controls: Time Range & Live Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div
              className="inline-flex items-center rounded-xl border p-1 bg-slate-500/5"
              style={{ borderColor: 'var(--ca-border)' }}
            >
              {(
                [
                  { key: 'all', label: 'All Time' },
                  { key: 'month', label: 'This Month' },
                  { key: 'week', label: 'This Week' },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTimeRange(key)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    timeRange === key
                      ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coders, college..."
                className="w-full rounded-xl border py-1.5 pl-8 pr-8 text-xs text-primary placeholder:text-muted focus:outline-none transition"
                style={{
                  borderColor: 'var(--ca-border)',
                  background: 'var(--ca-surface)',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-primary p-0.5 rounded-md"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {status === 'loading' ? (
            <CardSkeleton rows={3} />
          ) : (
            <div className="space-y-6">
              {/* Top 3 Podium */}
              {topThree.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {topThree.map((person, idx) => {
                    const rankNum = idx + 1;
                    const isGold = rankNum === 1;
                    const isSilver = rankNum === 2;
                    const isBronze = rankNum === 3;

                    const badgeBg = isGold
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/25'
                      : isSilver
                      ? 'bg-slate-400/10 text-slate-400 border-slate-400/25'
                      : 'bg-orange-500/10 text-orange-500 border-orange-500/25';

                    const icon = isGold ? (
                      <Crown size={15} className="text-amber-400" />
                    ) : (
                      <Medal size={15} className={isSilver ? 'text-slate-300' : 'text-orange-400'} />
                    );

                    const isCurrentUser = person.handle === '@you';

                    return (
                      <div
                        key={person.handle}
                        className={`relative rounded-2xl border p-5 transition duration-200 ${
                          isGold
                            ? 'border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.04] to-transparent shadow-xs'
                            : 'border-[var(--ca-border)] bg-[var(--ca-surface)]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[11px] font-mono font-extrabold ${badgeBg}`}
                            >
                              {icon}
                              <span>0{rankNum}</span>
                            </span>
                            {isCurrentUser && (
                              <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-bold text-indigo-400">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-mono font-bold text-primary tabular-nums">
                            {person.score.toLocaleString()} pts
                          </span>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${person.color} text-sm font-extrabold text-white shadow-xs`}
                          >
                            {person.initials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-primary">{person.name}</p>
                            <p className="truncate text-xs text-muted">{person.handle}</p>
                            {person.university && (
                              <p className="truncate text-[10px] text-indigo-400 font-medium flex items-center gap-1 mt-0.5">
                                <GraduationCap size={10} />
                                {person.university}
                              </p>
                            )}
                          </div>
                        </div>

                        <div
                          className="mt-4 flex items-center justify-between border-t pt-3 text-xs"
                          style={{ borderColor: 'var(--ca-border)' }}
                        >
                          <div className="flex items-center gap-1.5 text-muted">
                            <span className="text-[11px]">Solved</span>
                            <span className="font-bold text-primary tabular-nums">
                              {person.solved}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted">
                            <Flame size={12} className="text-orange-500 shrink-0" />
                            <span className="font-bold text-primary tabular-nums">
                              {person.streak}d streak
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Ranks 4+ Table */}
              {remaining.length > 0 && (
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
                >
                  <div
                    className="flex items-center justify-between px-5 py-3 border-b text-[10px] font-bold uppercase tracking-wider text-muted"
                    style={{ borderColor: 'var(--ca-border)' }}
                  >
                    <div className="flex items-center gap-6">
                      <span className="w-8">Rank</span>
                      <span>Coder & Campus</span>
                    </div>
                    <div className="flex items-center gap-6 sm:gap-12">
                      <span className="hidden sm:inline">Solved</span>
                      <span className="hidden sm:inline">Streak</span>
                      <span className="w-16 text-right">Points</span>
                    </div>
                  </div>

                  <div className="divide-y" style={{ borderColor: 'var(--ca-border)' }}>
                    {remaining.map((person, idx) => {
                      const rank = idx + 4;
                      const isCurrentUser = person.handle === '@you';

                      return (
                        <div
                          key={person.handle}
                          className="group flex items-center justify-between px-5 py-3.5 hover:bg-slate-500/[0.03] transition"
                        >
                          <div className="flex items-center gap-6 min-w-0">
                            <span className="w-8 font-mono text-xs font-bold text-muted tabular-nums">
                              {String(rank).padStart(2, '0')}
                            </span>
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${person.color} text-xs font-bold text-white`}
                              >
                                {person.initials}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="truncate text-xs font-bold text-primary">
                                    {person.name}
                                  </p>
                                  {isCurrentUser && (
                                    <span className="rounded-full bg-indigo-500/15 px-1.5 py-0.2 text-[9px] font-bold text-indigo-400">
                                      You
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="truncate text-[10px] text-muted">{person.handle}</span>
                                  {person.university && (
                                    <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-indigo-400 font-medium">
                                      &bull; <GraduationCap size={10} className="inline ml-0.5" /> {person.university}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 sm:gap-12 shrink-0">
                            <span className="hidden sm:inline text-xs font-medium text-muted tabular-nums">
                              {person.solved}
                            </span>
                            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-muted tabular-nums">
                              <Flame size={11} className="text-orange-500" />
                              <span>{person.streak}d</span>
                            </span>
                            <span
                              className="w-20 text-right font-mono text-xs font-extrabold text-primary tabular-nums px-2.5 py-1 rounded-lg"
                              style={{
                                background: 'color-mix(in srgb, var(--ca-accent-solid) 10%, var(--ca-surface-muted))',
                                color: 'var(--ca-accent-solid)',
                              }}
                            >
                              {person.score.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: CAMPUS CUP (COLLEGES)                             */}
      {/* ======================================================== */}
      {activeTab === 'campus-cup' && (
        <div className="space-y-8">
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border"
            style={{
              borderColor: 'color-mix(in srgb, var(--ca-accent-solid) 30%, var(--ca-border))',
              background: 'radial-gradient(ellipse at top left, color-mix(in srgb, var(--ca-accent-solid) 12%, transparent), var(--ca-surface))',
            }}
          >
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-black text-primary">National Campus Cup 2026</h2>
              <p className="text-xs text-muted max-w-xl leading-relaxed">
                Colleges ranked by collective algorithmic firepower. Every challenge solved and contest point earned by verified students boosts your campus on the leaderboard!
              </p>
            </div>
            <Link
              to="/profile"
              className="btn-primary py-2 px-4 text-xs font-bold shrink-0"
            >
              <GraduationCap size={14} />
              <span>Set Your College in Profile</span>
            </Link>
          </div>

          {/* Top 3 Colleges Podium */}
          {topThreeColleges.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {topThreeColleges.map((college, idx) => {
                const rankNum = idx + 1;
                const isGold = rankNum === 1;
                const isSilver = rankNum === 2;

                const badgeBg = isGold
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/25'
                  : isSilver
                  ? 'bg-slate-400/10 text-slate-400 border-slate-400/25'
                  : 'bg-orange-500/10 text-orange-500 border-orange-500/25';

                const icon = isGold ? (
                  <Crown size={15} className="text-amber-400" />
                ) : (
                  <Medal size={15} className={isSilver ? 'text-slate-300' : 'text-orange-400'} />
                );

                return (
                  <div
                    key={college.collegeName}
                    onClick={() => {
                      setSelectedCollege(college.collegeName);
                      setActiveTab('college-students');
                    }}
                    className={`cursor-pointer relative rounded-2xl border p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                      isGold
                        ? 'border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.04] to-transparent shadow-xs'
                        : 'border-[var(--ca-border)] bg-[var(--ca-surface)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[11px] font-mono font-extrabold ${badgeBg}`}>
                        {icon}
                        <span>Rank 0{rankNum}</span>
                      </span>

                      <span className="text-xs font-mono font-black text-primary tabular-nums">
                        {college.totalPoints.toLocaleString()} pts
                      </span>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm sm:text-base font-black text-primary truncate">
                        {college.collegeName}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-muted">
                        <span className="inline-flex items-center gap-1 font-mono">
                          <Users size={12} className="text-indigo-400" />
                          {college.studentCount} students
                        </span>
                        <span>&bull;</span>
                        <span className="font-mono">{college.totalSolved} solved</span>
                      </div>
                    </div>

                    <div
                      className="mt-4 border-t pt-3 flex items-center justify-between text-xs"
                      style={{ borderColor: 'var(--ca-border)' }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[10px] text-muted uppercase font-bold">Top Coder:</span>
                        <span className="text-xs font-bold text-primary truncate">{college.topStudent.name}</span>
                      </div>
                      <span className="text-indigo-400 text-xs font-semibold shrink-0">View Standings &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Remaining Colleges Table */}
          {remainingColleges.length > 0 && (
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div
                className="flex items-center justify-between px-5 py-3 border-b text-[10px] font-bold uppercase tracking-wider text-muted"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                <div className="flex items-center gap-6">
                  <span className="w-8">Rank</span>
                  <span>College / University</span>
                </div>
                <div className="flex items-center gap-8 sm:gap-14">
                  <span className="hidden sm:inline">Active Coders</span>
                  <span className="hidden sm:inline">Problems Solved</span>
                  <span className="w-20 text-right">Points</span>
                </div>
              </div>

              <div className="divide-y" style={{ borderColor: 'var(--ca-border)' }}>
                {remainingColleges.map((college, idx) => (
                  <div
                    key={college.collegeName}
                    onClick={() => {
                      setSelectedCollege(college.collegeName);
                      setActiveTab('college-students');
                    }}
                    className="cursor-pointer group flex items-center justify-between px-5 py-3.5 hover:bg-slate-500/[0.03] transition"
                  >
                    <div className="flex items-center gap-6 min-w-0">
                      <span className="w-8 font-mono text-xs font-bold text-muted tabular-nums">
                        {String(idx + 4).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-primary group-hover:text-indigo-400 transition-colors">
                          {college.collegeName}
                        </p>
                        <p className="text-[10px] text-muted">
                          Top: {college.topStudent.name} ({college.topStudent.points} pts)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 sm:gap-14 shrink-0">
                      <span className="hidden sm:inline text-xs font-medium text-muted tabular-nums">
                        {college.studentCount} students
                      </span>
                      <span className="hidden sm:inline text-xs font-medium text-muted tabular-nums">
                        {college.totalSolved} solved
                      </span>
                      <span
                        className="w-20 text-right font-mono text-xs font-extrabold text-primary tabular-nums px-2.5 py-1 rounded-lg"
                        style={{
                          background: 'color-mix(in srgb, var(--ca-accent-solid) 10%, var(--ca-surface-muted))',
                          color: 'var(--ca-accent-solid)',
                        }}
                      >
                        {college.totalPoints.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: COLLEGE CODERS (CAMPUS STANDINGS)                 */}
      {/* ======================================================== */}
      {activeTab === 'college-students' && (
        <div className="space-y-6">
          {/* College Selector Header */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <GraduationCap size={18} className="text-indigo-400" />
                <h2 className="text-base sm:text-lg font-black text-primary">
                  {selectedCollege} Campus Standings
                </h2>
              </div>
              <p className="text-xs text-muted">
                Individual rankings of students representing {selectedCollege}.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {userCollege && userCollege !== selectedCollege && (
                <button
                  type="button"
                  onClick={() => setSelectedCollege(userCollege)}
                  className="btn-secondary py-1.5 px-3 text-xs font-semibold"
                >
                  <GraduationCap size={13} />
                  <span>Switch to My College ({userCollege})</span>
                </button>
              )}

              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="h-9 px-3 rounded-xl border text-xs bg-transparent text-primary outline-none"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                {colleges.map((c) => (
                  <option key={c.collegeName} value={c.collegeName}>{c.collegeName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Students table */}
          {collegeStudents.length === 0 ? (
            <EmptyState
              icon={<GraduationCap size={22} />}
              title={`No coders registered for ${selectedCollege} yet`}
              description="Be the first to represent your campus by setting your college in your Profile."
              action={
                <Link to="/profile" className="btn-primary text-xs">
                  Set My College
                </Link>
              }
            />
          ) : (
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div
                className="flex items-center justify-between px-5 py-3 border-b text-[10px] font-bold uppercase tracking-wider text-muted"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                <div className="flex items-center gap-6">
                  <span className="w-8">Campus Rank</span>
                  <span>Student Coder</span>
                </div>
                <div className="flex items-center gap-6 sm:gap-12">
                  <span className="hidden sm:inline">Solved</span>
                  <span className="hidden sm:inline">Streak</span>
                  <span className="w-16 text-right">Points</span>
                </div>
              </div>

              <div className="divide-y" style={{ borderColor: 'var(--ca-border)' }}>
                {collegeStudents.map((person, idx) => {
                  const rank = idx + 1;
                  const isGold = rank === 1;
                  const isSilver = rank === 2;
                  const isBronze = rank === 3;

                  return (
                    <div
                      key={person.handle}
                      className="group flex items-center justify-between px-5 py-3.5 hover:bg-slate-500/[0.03] transition"
                    >
                      <div className="flex items-center gap-6 min-w-0">
                        <span className="w-8 font-mono text-xs font-bold text-muted tabular-nums flex items-center gap-1">
                          {isGold ? (
                            <Crown size={14} className="text-amber-400" />
                          ) : isSilver ? (
                            <Medal size={14} className="text-slate-300" />
                          ) : isBronze ? (
                            <Medal size={14} className="text-orange-400" />
                          ) : null}
                          <span>{String(rank).padStart(2, '0')}</span>
                        </span>
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${person.color} text-xs font-bold text-white`}
                          >
                            {person.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold text-primary">
                              {person.name}
                            </p>
                            <p className="truncate text-[10px] text-muted">{person.handle}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 sm:gap-12 shrink-0">
                        <span className="hidden sm:inline text-xs font-medium text-muted tabular-nums">
                          {person.solved}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-muted tabular-nums">
                          <Flame size={11} className="text-orange-500" />
                          <span>{person.streak}d</span>
                        </span>
                        <span
                          className="w-20 text-right font-mono text-xs font-extrabold text-primary tabular-nums px-2.5 py-1 rounded-lg"
                          style={{
                            background: 'color-mix(in srgb, var(--ca-accent-solid) 10%, var(--ca-surface-muted))',
                            color: 'var(--ca-accent-solid)',
                          }}
                        >
                          {person.score.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
