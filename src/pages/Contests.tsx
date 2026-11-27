import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Crown,
  Flame,
  GraduationCap,
  Medal,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Swords,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { contestService } from '../services/contestService';
import { leaderboardService, type CollegeLeaderboardEntry, type LeaderboardEntry } from '../services';
import type { Contest } from '../types/contest';
import { useAuth } from '../context/AuthContext';
import { requestAppFullscreen } from '../lib/fullscreen';
import EmptyState from '../components/ui/EmptyState';
import Leaderboard from './Leaderboard';

type MainContestTab = 'college-contest' | 'campus-arena' | 'leaderboard';
type CampusArenaSubTab = 'campus-cup' | 'college-students' | 'campus-clash' | 'study-groups';

function resolveMainTab(tabParam: string | null): MainContestTab {
  if (tabParam === 'campus-arena') return 'campus-arena';
  if (tabParam === 'leaderboard') return 'leaderboard';
  return 'college-contest';
}

export default function Contests() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  // Tab State
  const [activeMainTab, setActiveMainTab] = useState<MainContestTab>(() =>
    resolveMainTab(searchParams.get('tab'))
  );
  const [arenaSubTab, setArenaSubTab] = useState<CampusArenaSubTab>('campus-cup');

  useEffect(() => {
    setActiveMainTab(resolveMainTab(searchParams.get('tab')));
  }, [searchParams]);

  // Weekly Contest State
  const [contests, setContests] = useState<Contest[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [now, setNow] = useState<number>(Date.now());
  const [registeredMap, setRegisteredMap] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('prismcode_registered_contests');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Campus Arena State
  const [colleges, setColleges] = useState<CollegeLeaderboardEntry[]>([]);
  const [collegesLoading, setCollegesLoading] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<string>('');
  const [collegeStudents, setCollegeStudents] = useState<LeaderboardEntry[]>([]);

  // Coming Soon Waitlist State
  const [clashEmail, setClashEmail] = useState('');
  const [clashSubscribed, setClashSubscribed] = useState(false);
  const [groupEmail, setGroupEmail] = useState('');
  const [groupSubscribed, setGroupSubscribed] = useState(false);

  const userCollege = (user as any)?.university || '';

  // Synchronize URL search params
  const handleTabChange = (tab: MainContestTab) => {
    setActiveMainTab(tab);
    setSearchParams({ tab });
  };

  useEffect(() => {
    let mounted = true;
    const fetchContests = async () => {
      try {
        setStatus('loading');
        const list = await contestService.listContests();
        if (mounted) {
          setContests(list);
          setStatus('ready');
        }
      } catch {
        if (mounted) setStatus('error');
      }
    };
    fetchContests();

    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  // Fetch Colleges for Campus Arena
  useEffect(() => {
    let mounted = true;
    setCollegesLoading(true);
    leaderboardService
      .listColleges()
      .then((data) => {
        if (!mounted) return;
        setColleges(data);
        if (data.length > 0) {
          const matchUser = userCollege && data.find((c) => c.collegeName.toLowerCase() === userCollege.toLowerCase());
          setSelectedCollege(matchUser ? matchUser.collegeName : data[0].collegeName);
        } else if (userCollege) {
          setSelectedCollege(userCollege);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setCollegesLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [userCollege]);

  // Fetch College Students when selectedCollege changes
  useEffect(() => {
    if (!selectedCollege) {
      setCollegeStudents([]);
      return;
    }
    let mounted = true;
    leaderboardService
      .listCollegeStudents(selectedCollege)
      .then((data) => {
        if (mounted) setCollegeStudents(data);
      })
      .catch(() => {
        if (mounted) setCollegeStudents([]);
      });

    return () => {
      mounted = false;
    };
  }, [selectedCollege]);

  const handleRegister = (contestId: string) => {
    setRegisteredMap((prev) => {
      const next = { ...prev, [contestId]: !prev[contestId] };
      try {
        localStorage.setItem('prismcode_registered_contests', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleEnterContest = async (e: React.MouseEvent, contestId: string) => {
    e.preventDefault();
    await requestAppFullscreen();
    navigate(`/contests/${contestId}`);
  };

  const nextUpcoming = useMemo(() => {
    return contests.find((c) => c.status === 'upcoming' || c.status === 'active') || contests[0];
  }, [contests]);

  const timeRemaining = useMemo(() => {
    if (!nextUpcoming) return null;
    const target = new Date(nextUpcoming.startTime).getTime();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isLive: diff === 0 && nextUpcoming.status === 'active' };
  }, [nextUpcoming, now]);

  const filteredContests = useMemo(() => {
    return contests.filter((c) => {
      if (filter === 'upcoming') return c.status === 'upcoming' || c.status === 'active';
      if (filter === 'completed') return c.status === 'completed';
      return true;
    });
  }, [contests, filter]);

  const topThreeColleges = colleges.slice(0, 3);
  const remainingColleges = colleges.slice(3);

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-9 space-y-8 animate-in fade-in">
      {/* Top Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Trophy size={12} />
              Weekly Weekend Arena
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ShieldCheck size={12} />
              Live Proctored
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <GraduationCap size={12} />
              Campus Cup
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
            College Contests & Campus Arena
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
            Conduct weekly proctored rounds for your campus, represent your college, and climb the national leaderboards.
          </p>
        </div>
      </div>

      {/* Primary Switcher: College Contest vs Campus Arena vs Leaderboard */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-4" style={{ borderColor: 'var(--ca-border)' }}>
        <button
          type="button"
          onClick={() => handleTabChange('college-contest')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
            activeMainTab === 'college-contest'
              ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80'
          }`}
        >
          <GraduationCap size={15} />
          <span>College Contest</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('campus-arena')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
            activeMainTab === 'campus-arena'
              ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80'
          }`}
        >
          <Trophy size={15} className="text-amber-400" />
          <span>Campus Arena</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('leaderboard')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
            activeMainTab === 'leaderboard'
              ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80'
          }`}
        >
          <Crown size={15} className={activeMainTab === 'leaderboard' ? 'text-amber-200' : 'text-amber-500'} />
          <span>Leaderboard</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SECTION 1: COLLEGE CONTEST (CONDUCT WEEKLY ROUNDS)      */}
      {/* ======================================================== */}
      {activeMainTab === 'college-contest' && (
        <div className="space-y-8">
          {/* Featured Next / Live Contest Hero Banner */}
          {nextUpcoming && (
            <div
              className="relative overflow-hidden rounded-3xl border p-6 sm:p-8"
              style={{
                borderColor: 'color-mix(in srgb, var(--ca-accent-solid) 35%, var(--ca-border))',
                background: 'radial-gradient(ellipse at top left, color-mix(in srgb, var(--ca-accent-solid) 12%, transparent), var(--ca-surface))',
              }}
            >
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center gap-2">
                    {nextUpcoming.status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-500 border border-rose-500/30 animate-pulse">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        LIVE NOW
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                        <Calendar size={13} />
                        COLLEGE WEEKLY ROUND
                      </span>
                    )}
                    <span className="text-xs text-muted font-mono">
                      Every Saturday & Sunday &bull; 48-Hour Weekend Window
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-primary tracking-tight">
                    {nextUpcoming.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {nextUpcoming.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-indigo-400 font-semibold">
                      <ShieldCheck size={14} />
                      <span>Proctored Weekend Window (Fullscreen & Tab Monitor)</span>
                    </span>
                    <span className="text-muted/50">&bull;</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-500 font-semibold">
                      <GraduationCap size={14} />
                      <span>Points Accumulate for Your Campus</span>
                    </span>
                    <span className="text-muted/50">&bull;</span>
                    <span className="inline-flex items-center gap-1.5 text-muted">
                      <Clock size={14} />
                      <span>90m Solve Time &bull; Zero Penalty</span>
                    </span>
                  </div>
                </div>

                {/* Live Countdown Clock */}
                <div className="w-full lg:w-auto flex flex-col items-center sm:items-end gap-4 shrink-0">
                  {timeRemaining && (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border bg-black/5 dark:bg-white/5 min-w-[64px] sm:min-w-[72px]" style={{ borderColor: 'var(--ca-border)' }}>
                        <span className="font-mono text-xl sm:text-3xl font-black text-primary tabular-nums">
                          {String(timeRemaining.days).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] font-bold text-muted uppercase mt-0.5">Days</span>
                      </div>
                      <span className="font-mono text-xl font-bold text-muted">:</span>
                      <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border bg-black/5 dark:bg-white/5 min-w-[64px] sm:min-w-[72px]" style={{ borderColor: 'var(--ca-border)' }}>
                        <span className="font-mono text-xl sm:text-3xl font-black text-primary tabular-nums">
                          {String(timeRemaining.hours).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] font-bold text-muted uppercase mt-0.5">Hours</span>
                      </div>
                      <span className="font-mono text-xl font-bold text-muted">:</span>
                      <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border bg-black/5 dark:bg-white/5 min-w-[64px] sm:min-w-[72px]" style={{ borderColor: 'var(--ca-border)' }}>
                        <span className="font-mono text-xl sm:text-3xl font-black text-primary tabular-nums">
                          {String(timeRemaining.minutes).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] font-bold text-muted uppercase mt-0.5">Mins</span>
                      </div>
                      <span className="font-mono text-xl font-bold text-muted">:</span>
                      <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border bg-black/5 dark:bg-white/5 min-w-[64px] sm:min-w-[72px]" style={{ borderColor: 'var(--ca-border)' }}>
                        <span className="font-mono text-xl sm:text-3xl font-black text-amber-500 tabular-nums">
                          {String(timeRemaining.seconds).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] font-bold text-muted uppercase mt-0.5">Secs</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {nextUpcoming.status === 'active' ? (
                      <button
                        type="button"
                        onClick={(e) => handleEnterContest(e, nextUpcoming.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 text-xs shadow-lg transition"
                      >
                        <Zap size={14} />
                        <span>Enter Proctored Arena</span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleRegister(nextUpcoming.id)}
                          className={`inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-5 text-xs font-bold transition shadow-md ${
                            registeredMap[nextUpcoming.id]
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600'
                          }`}
                        >
                          {registeredMap[nextUpcoming.id] ? (
                            <>
                              <ShieldCheck size={14} />
                              <span>Registered ✓</span>
                            </>
                          ) : (
                            <>
                              <Calendar size={14} />
                              <span>Register with College</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleEnterContest(e, nextUpcoming.id)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                        >
                          <span>Preview Arena</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contests Schedule & Archive */}
          <div className="space-y-5 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {(
                  [
                    { key: 'all', label: 'All Rounds' },
                    { key: 'upcoming', label: 'Upcoming' },
                    { key: 'completed', label: 'Completed Archive' },
                  ] as const
                ).map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                      filter === key
                        ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {filteredContests.length === 0 ? (
              <EmptyState
                icon={<Trophy size={22} />}
                title="No contests match your filter"
                description="Switch filter tab to see upcoming or completed contest rounds."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContests.map((contest) => {
                  const isPast = contest.status === 'completed';
                  const isLive = contest.status === 'active';

                  return (
                    <div
                      key={contest.id}
                      className="group relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                      style={{
                        background: 'var(--ca-surface)',
                        borderColor: isLive ? 'rgba(239, 68, 68, 0.4)' : 'var(--ca-border)',
                      }}
                    >
                      <div className="space-y-3">
                        {/* Status badge & timing */}
                        <div className="flex items-center justify-between gap-2">
                          {isLive ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20 animate-pulse">
                              LIVE NOW
                            </span>
                          ) : isPast ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-500/10 text-muted border border-slate-500/20">
                              COMPLETED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                              UPCOMING
                            </span>
                          )}

                          <span className="font-mono text-xs text-muted">
                            Sat & Sun Window
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-primary group-hover:text-indigo-400 transition-colors">
                          {contest.title}
                        </h3>

                        {/* Context / Description */}
                        <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                          {contest.description}
                        </p>

                        {/* Problem breakdown pills */}
                        <div className="flex items-center gap-1.5 pt-1">
                          {contest.problems.map((p, idx) => (
                            <span
                              key={p.id}
                              className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-black/5 dark:bg-white/5 text-muted border border-black/5 dark:border-white/5"
                              title={`${p.title} (${p.difficulty} - ${p.points} pts)`}
                            >
                              Q{idx + 1}
                            </span>
                          ))}
                          <span className="text-[10px] text-muted ml-1">
                            &bull; 90m proctored window
                          </span>
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div
                        className="mt-5 pt-4 border-t flex items-center justify-between text-xs"
                        style={{ borderColor: 'var(--ca-border)' }}
                      >
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-indigo-400 font-semibold">
                          <ShieldCheck size={13} />
                          <span>Campus Cup Graded</span>
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleEnterContest(e, contest.id)}
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-3.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 transition shadow-xs"
                        >
                          {isPast ? 'Scoreboard & Review' : isLive ? 'Enter Arena' : 'Enter Contest'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 2: CAMPUS ARENA (LEADERBOARDS & COMMUNITY)       */}
      {/* ======================================================== */}
      {activeMainTab === 'campus-arena' && (
        <div className="space-y-6">
          {/* Sub-tab Navigation */}
          <div className="flex flex-wrap items-center gap-2 border-b pb-4" style={{ borderColor: 'var(--ca-border)' }}>
            <button
              type="button"
              onClick={() => setArenaSubTab('campus-cup')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                arenaSubTab === 'campus-cup'
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80'
              }`}
            >
              <Trophy size={13} className="text-amber-400" />
              <span>Campus Cup (Colleges Leaderboard)</span>
            </button>

            <button
              type="button"
              onClick={() => setArenaSubTab('college-students')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                arenaSubTab === 'college-students'
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80'
              }`}
            >
              <GraduationCap size={13} />
              <span>College Coders (Campus Standings)</span>
            </button>

            <button
              type="button"
              onClick={() => setArenaSubTab('campus-clash')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                arenaSubTab === 'campus-clash'
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80'
              }`}
            >
              <Swords size={13} className="text-rose-400" />
              <span>Campus Rivalry Clash</span>
              <span className="rounded-full px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/20">
                Soon
              </span>
            </button>

            <button
              type="button"
              onClick={() => setArenaSubTab('study-groups')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                arenaSubTab === 'study-groups'
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80'
              }`}
            >
              <Users size={13} className="text-cyan-400" />
              <span>College Study Groups</span>
              <span className="rounded-full px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/20">
                Soon
              </span>
            </button>
          </div>

          {/* SUBTAB A: CAMPUS CUP (COLLEGES LEADERBOARD) */}
          {arenaSubTab === 'campus-cup' && (
            <div className="space-y-6">
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

              {collegesLoading ? (
                <div className="p-8 text-center text-xs text-muted">
                  <RefreshCw size={16} className="animate-spin mx-auto mb-2 text-indigo-500" />
                  <span>Loading campus standings…</span>
                </div>
              ) : topThreeColleges.length === 0 && remainingColleges.length === 0 ? (
                <EmptyState
                  icon={<GraduationCap size={22} />}
                  title="No colleges on the leaderboard yet"
                  description="Set your college in your profile and solve challenges to represent your campus in the Campus Cup."
                  action={
                    <Link to="/profile" className="btn-primary text-xs">
                      Set My College
                    </Link>
                  }
                />
              ) : (
                <div className="space-y-6">
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
                              setArenaSubTab('college-students');
                            }}
                            className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all hover:scale-[1.01] cursor-pointer ${
                              isGold ? 'shadow-lg shadow-amber-500/5' : ''
                            }`}
                            style={{
                              background: isGold
                                ? 'radial-gradient(ellipse at top left, color-mix(in srgb, #f59e0b 8%, transparent), var(--ca-surface))'
                                : 'var(--ca-surface)',
                              borderColor: isGold
                                ? 'color-mix(in srgb, #f59e0b 35%, var(--ca-border))'
                                : 'var(--ca-border)',
                            }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <span
                                  className={`flex h-8 w-8 items-center justify-center rounded-xl border text-xs font-black shadow-xs ${badgeBg}`}
                                >
                                  {icon}
                                </span>
                                <div>
                                  <p className="font-extrabold text-sm text-primary group-hover:text-indigo-400 transition-colors">
                                    {college.collegeName}
                                  </p>
                                  <span className="text-[10px] text-muted">
                                    Top: {college.topStudent.name} ({college.topStudent.points} pts)
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-5 flex items-end justify-between border-t pt-3.5" style={{ borderColor: 'var(--ca-border)' }}>
                              <div className="space-y-0.5">
                                <span className="text-[10px] uppercase font-bold text-muted">Campus Solved</span>
                                <p className="text-xs font-semibold text-primary">
                                  {college.totalSolved} problems ({college.studentCount} students)
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] uppercase font-bold text-muted">Campus Points</span>
                                <p className="font-mono text-base font-extrabold text-primary">
                                  {college.totalPoints.toLocaleString()}
                                </p>
                              </div>
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
                              setArenaSubTab('college-students');
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
            </div>
          )}

          {/* SUBTAB B: COLLEGE CODERS (CAMPUS STANDINGS) */}
          {arenaSubTab === 'college-students' && (
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
                      {selectedCollege ? `${selectedCollege} Campus Standings` : 'Campus Coders'}
                    </h2>
                  </div>
                  <p className="text-xs text-muted">
                    Individual rankings of students representing {selectedCollege || 'their campus'}.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {userCollege && selectedCollege !== userCollege && (
                    <button
                      type="button"
                      onClick={() => setSelectedCollege(userCollege)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition"
                    >
                      <GraduationCap size={13} />
                      <span>Switch to My College ({userCollege})</span>
                    </button>
                  )}

                  <select
                    value={selectedCollege}
                    onChange={(e) => setSelectedCollege(e.target.value)}
                    className="h-9 px-3 rounded-xl border text-xs bg-transparent text-primary outline-hidden"
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
                  title={selectedCollege ? `No coders registered for ${selectedCollege} yet` : 'No campus coders registered yet'}
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
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${person.color} text-xs font-bold text-white`}
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
                              className="w-16 text-right font-mono text-xs font-extrabold text-primary tabular-nums px-2 py-0.5 rounded-lg"
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

          {/* SUBTAB C: CAMPUS RIVALRY CLASH (COMING SOON) */}
          {arenaSubTab === 'campus-clash' && (
            <div className="relative min-h-[50vh] w-full max-w-4xl mx-auto px-4 py-8 flex flex-col justify-center items-center space-y-8 animate-in fade-in duration-300">
              <div className="text-center space-y-3 max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-xs backdrop-blur-md">
                  <Sparkles size={13} className="animate-pulse" />
                  <span>Coming Soon · In Active Development</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-primary leading-tight">
                  Campus <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-500 via-amber-500 to-indigo-500">Rivalry Clash</span>
                </h2>

                <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-lg mx-auto">
                  Challenge your rival campus to an intense head-to-head algorithm sprint. Match up against top coders from other engineering colleges, track live team momentum, and claim campus bragging rights.
                </p>
              </div>

              <div
                className="w-full max-w-xl rounded-3xl p-6 sm:p-8 border shadow-xl text-center space-y-6"
                style={{
                  backgroundColor: 'var(--ca-surface)',
                  borderColor: 'var(--ca-border)',
                }}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-500 border border-rose-500/20 shadow-inner mx-auto">
                  <Swords size={28} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-primary">Head-to-Head College Showdowns are Launching Soon!</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Pick your rival university, trigger real-time duel notifications, rally batchmates on WhatsApp, and earn campus cup multipliers.
                  </p>
                </div>

                {clashSubscribed ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold shadow-xs">
                    <CheckCircle2 size={16} />
                    <span>You're on the early access list! We'll notify you as soon as Campus Clash goes live.</span>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (clashEmail.trim().includes('@')) setClashSubscribed(true);
                    }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      required
                      value={clashEmail}
                      onChange={(e) => setClashEmail(e.target.value)}
                      placeholder="Enter your college email for early access..."
                      className="w-full px-4 py-2.5 rounded-xl border text-xs text-primary placeholder:text-muted focus:outline-hidden focus:border-indigo-500 transition"
                      style={{
                        backgroundColor: 'var(--ca-surface-muted)',
                        borderColor: 'var(--ca-border)',
                      }}
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition"
                    >
                      <Bell size={13} />
                      <span>Notify Me</span>
                    </button>
                  </form>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
                  <Link
                    to="/problems"
                    className="inline-flex items-center gap-1.5 font-semibold text-muted hover:text-primary transition"
                  >
                    <span>Browse Problems</span>
                    <ArrowRight size={12} />
                  </Link>
                  <span className="text-muted">&bull;</span>
                  <Link
                    to="/placement"
                    className="inline-flex items-center gap-1.5 font-semibold text-muted hover:text-primary transition"
                  >
                    <span>Placement Hub</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB D: COLLEGE STUDY GROUPS (COMING SOON) */}
          {arenaSubTab === 'study-groups' && (
            <div className="relative min-h-[50vh] w-full max-w-4xl mx-auto px-4 py-8 flex flex-col justify-center items-center space-y-8 animate-in fade-in duration-300">
              <div className="text-center space-y-3 max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-xs backdrop-blur-md">
                  <Sparkles size={13} className="animate-pulse" />
                  <span>Coming Soon · In Active Development</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-primary leading-tight">
                  College <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 via-indigo-500 to-emerald-400">Study Groups & Squads</span>
                </h2>

                <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-lg mx-auto">
                  Form dedicated algorithmic study circles with your college batchmates. Set weekly problem-solving goals, tackle shared problem-of-the-day challenges, and track peer velocity.
                </p>
              </div>

              <div
                className="w-full max-w-xl rounded-3xl p-6 sm:p-8 border shadow-xl text-center space-y-6"
                style={{
                  backgroundColor: 'var(--ca-surface)',
                  borderColor: 'var(--ca-border)',
                }}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-500 border border-cyan-500/20 shadow-inner mx-auto">
                  <Users size={28} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-primary">Campus Study Circles are Coming Soon!</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Features include weekly collective sprint targets (e.g. 50 DP problems), pinned daily challenge threads, member leaderboards, and instant batchmate invitation links.
                  </p>
                </div>

                {groupSubscribed ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold shadow-xs">
                    <CheckCircle2 size={16} />
                    <span>You're on the early access list! We'll notify you as soon as Study Groups launch.</span>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (groupEmail.trim().includes('@')) setGroupSubscribed(true);
                    }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      required
                      value={groupEmail}
                      onChange={(e) => setGroupEmail(e.target.value)}
                      placeholder="Enter your email for early group access..."
                      className="w-full px-4 py-2.5 rounded-xl border text-xs text-primary placeholder:text-muted focus:outline-hidden focus:border-indigo-500 transition"
                      style={{
                        backgroundColor: 'var(--ca-surface-muted)',
                        borderColor: 'var(--ca-border)',
                      }}
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition"
                    >
                      <Bell size={13} />
                      <span>Notify Me</span>
                    </button>
                  </form>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
                  <Link
                    to="/problems"
                    className="inline-flex items-center gap-1.5 font-semibold text-muted hover:text-primary transition"
                  >
                    <span>Browse Problems</span>
                    <ArrowRight size={12} />
                  </Link>
                  <span className="text-muted">&bull;</span>
                  <Link
                    to="/placement"
                    className="inline-flex items-center gap-1.5 font-semibold text-muted hover:text-primary transition"
                  >
                    <span>Placement Hub</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 3: GLOBAL CODERS LEADERBOARD                     */}
      {/* ======================================================== */}
      {activeMainTab === 'leaderboard' && <Leaderboard embedded />}
    </div>
  );
}
