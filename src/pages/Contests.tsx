import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Code2,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
  Trophy,
  Zap,
} from 'lucide-react';
import { contestService } from '../services/contestService';
import type { Contest } from '../types/contest';
import { useAuth } from '../context/AuthContext';
import { requestAppFullscreen } from '../lib/fullscreen';
import EmptyState from '../components/ui/EmptyState';

export default function Contests() {
  const navigate = useNavigate();
  const { user } = useAuth();
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
            Weekly Contests
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
            Every Saturday and Sunday. 4 graded challenges with strict focus and fullscreen proctoring.
          </p>
        </div>

        <Link
          to="/leaderboard"
          className="btn-secondary py-2 px-3 text-xs font-semibold shrink-0"
        >
          <Trophy size={13} className="text-amber-500" />
          <span>View Campus Cup Standings</span>
        </Link>
      </div>

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
                    UPCOMING ROUND
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
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <Calendar size={14} />
                  <span>Saturday & Sunday Weekly</span>
                </span>
                <span className="text-muted/50">&bull;</span>
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <Clock size={14} />
                  <span>90m Solve Time &bull; Zero Wrong Answer Penalty</span>
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
                          <span>Register for Weekend Round</span>
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
          {/* Robust Dark Mode Filter Pill Navigation */}
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
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/5 dark:bg-white/5 text-muted border border-black/5 dark:border-white/5"
                          title={`${p.title} (${p.difficulty} - ${p.points} pts)`}
                        >
                          Q{idx + 1}
                        </span>
                      ))}
                      <span className="text-[10px] text-muted ml-1">
                        &bull; Sat & Sun (90m solve time)
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
                      <span>Proctored Round</span>
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
  );
}
