import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Code2,
  Crown,
  Eye,
  GraduationCap,
  Maximize2,
  Medal,
  ShieldAlert,
  ShieldCheck,
  Trophy,
} from 'lucide-react';
import { contestService } from '../services/contestService';
import type { Contest, ContestParticipantStanding } from '../types/contest';
import { useAuth } from '../context/AuthContext';
import { CardSkeleton } from '../components/ui/LoadingSkeleton';
import FocusGuardBanner from '../components/interview/FocusGuardBanner';
import {
  isAppFullscreen,
  requestAppFullscreen,
  onFullscreenChange,
  exitAppFullscreen,
} from '../lib/fullscreen';

export default function ContestArena() {
  const { contestId } = useParams<{ contestId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [contest, setContest] = useState<Contest | null>(null);
  const [standings, setStandings] = useState<ContestParticipantStanding[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [activeTab, setActiveTab] = useState<'problems' | 'scoreboard'>('problems');
  const [collegeFilter, setCollegeFilter] = useState<string>('all');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isContestFinished, setIsContestFinished] = useState(() => {
    try {
      return localStorage.getItem(`prismcode_contest_finished_${contestId}`) === 'true';
    } catch {
      return false;
    }
  });
  const [finishReason, setFinishReason] = useState<string | null>(() => {
    try {
      return localStorage.getItem(`prismcode_contest_finish_reason_${contestId}`) || null;
    } catch {
      return null;
    }
  });
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);

  // Proctoring Telemetry State
  const [tabSwitches, setTabSwitches] = useState<number>(0);
  const [tabSwitchAlert, setTabSwitchAlert] = useState<number | null>(null);
  const [fullscreenExits, setFullscreenExits] = useState<number>(() => {
    try {
      const stored = sessionStorage.getItem(`prismcode_contest_fs_exits_${contestId}`);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [fullscreenExitAlert, setFullscreenExitAlert] = useState<boolean>(false);
  const [isFullscreenActive, setIsFullscreenActive] = useState<boolean>(() => isAppFullscreen());

  const [userSolves, setUserSolves] = useState<Record<string, { status: 'accepted' | 'wrong_answer'; elapsedMinutes: number }>>(() => {
    try {
      const stored = localStorage.getItem(`prismcode_contest_solves_${contestId}`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const userCollege = (user as any)?.university || '';
  const isFinishedRef = useRef(isContestFinished);
  isFinishedRef.current = isContestFinished;

  // Intercept keyboard shortcuts (Ctrl+K, Cmd+K, Alt+Left/Right) for proctored lockdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  // Monitor visibilitychange / Tab switching
  useEffect(() => {
    if (isContestFinished) return;

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        if (isFinishedRef.current) return;

        setTabSwitches((prev) => {
          const nextCount = prev + 1;

          // Auto-submit if candidate switches tabs 4 times
          if (nextCount >= 4) {
            setIsContestFinished(true);
            const reason = 'Auto-submitted: Exceeded maximum allowed tab switches (4)';
            setFinishReason(reason);
            try {
              localStorage.setItem(`prismcode_contest_finished_${contestId}`, 'true');
              localStorage.setItem(`prismcode_contest_finish_reason_${contestId}`, reason);
            } catch {}
            if (document.fullscreenElement) {
              document.exitFullscreen().catch(() => {});
            }
            return nextCount;
          }

          setTabSwitchAlert(nextCount);
          return nextCount;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isContestFinished, contestId]);

  // Monitor Fullscreen status & auto-submit on 3rd exit
  useEffect(() => {
    const unsubscribe = onFullscreenChange((isFs) => {
      setIsFullscreenActive(isFs);

      if (!isFs && !isFinishedRef.current) {
        setFullscreenExits((prev) => {
          const nextCount = prev + 1;
          try {
            sessionStorage.setItem(`prismcode_contest_fs_exits_${contestId}`, String(nextCount));
          } catch {}

          // Auto-submit if candidate exits fullscreen 3 times
          if (nextCount >= 3) {
            setIsContestFinished(true);
            const reason = 'Auto-submitted: Exceeded maximum allowed fullscreen exits (3)';
            setFinishReason(reason);
            setFullscreenExitAlert(false);
            try {
              localStorage.setItem(`prismcode_contest_finished_${contestId}`, 'true');
              localStorage.setItem(`prismcode_contest_finish_reason_${contestId}`, reason);
            } catch {}
            return nextCount;
          }

          setFullscreenExitAlert(true);
          return nextCount;
        });
      } else {
        setFullscreenExitAlert(false);
      }
    });

    return unsubscribe;
  }, [contestId]);

  const handleEnterFullscreen = async () => {
    const ok = await requestAppFullscreen();
    if (ok) {
      setIsFullscreenActive(true);
      setFullscreenExitAlert(false);
    }
  };

  const handleOpenProblem = async (e: React.MouseEvent, problemId: string) => {
    e.preventDefault();
    if (!isAppFullscreen()) {
      await requestAppFullscreen();
    }
    navigate(`/workspace/${problemId}?contestId=${contest?.id || contestId}`);
  };

  const handleFinishContest = () => {
    setIsContestFinished(true);
    setShowFinishConfirm(false);
    const reason = 'Contest session completed! Final scores and Campus Cup standings recorded.';
    setFinishReason(reason);
    try {
      localStorage.setItem(`prismcode_contest_finished_${contestId}`, 'true');
      localStorage.setItem(`prismcode_contest_finish_reason_${contestId}`, reason);
    } catch {}
    exitAppFullscreen().catch(() => {});
  };

  // Load contest metadata & scoreboard & refresh local solves
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!contestId) return;
      try {
        setStatus('loading');
        const [c, s] = await Promise.all([
          contestService.getContest(contestId),
          contestService.getStandings(contestId),
        ]);
        if (mounted) {
          setContest(c);
          setStandings(s);
          setStatus('ready');
        }
      } catch {
        if (mounted) setStatus('error');
      }
    };
    load();

    // Sync latest solves from localStorage
    try {
      const stored = localStorage.getItem(`prismcode_contest_solves_${contestId}`);
      if (stored) setUserSolves(JSON.parse(stored));
    } catch {}

    const timer = setInterval(() => {
      if (!isFinishedRef.current) {
        setElapsedSeconds((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [contestId]);

  const totalPossiblePoints = useMemo(() => {
    return contest?.problems.reduce((sum, p) => sum + p.points, 0) || 1800;
  }, [contest]);

  const myScore = useMemo(() => {
    let score = 0;
    if (!contest) return 0;
    contest.problems.forEach((p) => {
      if (userSolves[p.problemId]?.status === 'accepted') {
        score += p.points;
      }
    });
    return score;
  }, [contest, userSolves]);

  const formattedTimer = useMemo(() => {
    const standardSolveLimitSeconds = 90 * 60; // 90 minutes solve time
    const remaining = Math.max(0, standardSolveLimitSeconds - elapsedSeconds);
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, [elapsedSeconds]);

  const collegesList = useMemo(() => {
    const set = new Set<string>();
    standings.forEach((s) => {
      if (s.university) set.add(s.university);
    });
    return Array.from(set);
  }, [standings]);

  const filteredStandings = useMemo(() => {
    if (collegeFilter === 'all') return standings;
    const q = collegeFilter.toLowerCase();
    const list = standings.filter((s) => s.university && s.university.toLowerCase().includes(q));
    return list.map((s, idx) => ({ ...s, rank: idx + 1 }));
  }, [standings, collegeFilter]);

  if (status === 'loading') {
    return (
      <div className="mx-auto max-w-[1240px] px-4 py-8 space-y-6">
        <CardSkeleton rows={4} />
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="mx-auto max-w-[1240px] px-4 py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-primary">Contest Not Found</h2>
        <Link to="/contests" className="btn-primary text-xs py-2 px-4">
          Back to Contests
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col text-primary selection:bg-indigo-500/30"
      style={{ background: 'var(--ca-canvas)' }}
    >
      {/* 1. FocusGuard Proctoring Alert Banner */}
      {tabSwitchAlert && !isContestFinished && (
        <FocusGuardBanner
          tabSwitches={tabSwitchAlert}
          onDismiss={() => setTabSwitchAlert(null)}
        />
      )}

      {/* 2. Fullscreen Exit Alert Banner (Strike system: 3 exits = auto-submit) */}
      {fullscreenExitAlert && !isContestFinished && (
        <div className="w-full bg-rose-500/15 border-b border-rose-500/30 px-4 py-2.5 text-xs text-rose-600 dark:text-rose-400 flex items-center justify-between font-bold animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} className="text-rose-500 shrink-0 animate-pulse" />
            <span>
              <strong>Proctoring Alert: Fullscreen Exited ({fullscreenExits}/3 strikes).</strong> Live contests must remain in fullscreen mode. <strong>Exiting fullscreen mode 3 times will automatically submit your contest!</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleEnterFullscreen}
            className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition shrink-0 ml-3 shadow-xs"
          >
            Re-enter Fullscreen ({3 - fullscreenExits} strikes remaining)
          </button>
        </div>
      )}

      {/* 3. Auto-Submit / Finished Banner */}
      {isContestFinished && (
        <div className="w-full bg-indigo-600 text-white px-4 py-3 text-center text-xs font-bold shadow-md flex items-center justify-center gap-3">
          <CheckCircle2 size={16} />
          <span>
            {finishReason || 'Contest session completed! Final scores and Campus Cup standings recorded.'}
          </span>
          <Link
            to="/contests"
            className="ml-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-white font-bold transition text-[11px]"
          >
            Return to Contests Hub
          </Link>
        </div>
      )}

      <div className="mx-auto max-w-[1280px] w-full px-4 py-5 sm:px-6 lg:px-8 space-y-6 flex-1">
        {/* Sticky Top Proctored Header Bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border shadow-xs backdrop-blur-md"
          style={{ background: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
        >
          <div className="flex items-center gap-3">
            <Link
              to="/contests"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-muted hover:text-primary transition"
              style={{ background: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
              title="Back to Contests"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-primary tracking-tight">
                  {contest.title}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 animate-pulse">
                  PROCTORED ARENA
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted mt-0.5">
                <span className="font-mono">Saturday & Sunday Window</span>
                {userCollege && (
                  <>
                    <span>&bull;</span>
                    <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                      <GraduationCap size={12} />
                      {userCollege}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Proctoring Status & Timer */}
          <div className="flex flex-wrap items-center gap-3 self-end sm:self-center">
            {/* Proctoring Live Telemetry Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              <ShieldCheck size={14} className="text-indigo-500 shrink-0" />
              <span>Tabs: <strong>{tabSwitches}/4</strong></span>
              <span className="text-muted/40">&bull;</span>
              <span>FS Exits: <strong>{fullscreenExits}/3</strong></span>
              <span className="text-muted/40">&bull;</span>
              <span>{isFullscreenActive ? 'Fullscreen ✓' : 'Windowed'}</span>
            </div>

            {/* Score Display */}
            <div className="text-right pr-2">
              <span className="text-[10px] uppercase font-bold text-muted block">Score</span>
              <span className="font-mono text-sm sm:text-base font-black text-primary tabular-nums">
                {myScore} <span className="text-muted text-xs font-normal">/ {totalPossiblePoints} pts</span>
              </span>
            </div>

            {/* Live Solve Countdown */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock size={15} className="animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-mono text-sm sm:text-base font-extrabold tracking-wider tabular-nums">
                {formattedTimer}
              </span>
            </div>

            {/* Fullscreen Button */}
            {!isFullscreenActive && (
              <button
                type="button"
                onClick={handleEnterFullscreen}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition text-primary hover:bg-black/5 dark:hover:bg-white/5"
                style={{ background: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
                title="Enter Fullscreen"
              >
                <Maximize2 size={13} />
                <span className="hidden sm:inline">Fullscreen</span>
              </button>
            )}

            {/* Finish Contest Button */}
            {!isContestFinished && (
              <button
                type="button"
                onClick={() => setShowFinishConfirm(true)}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition"
              >
                Finish Contest
              </button>
            )}
          </div>
        </div>

        {/* Fullscreen Mandatory Lockdown Gate: strictly prohibits using contest while windowed */}
        {!isFullscreenActive && !isContestFinished && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in select-none">
            <div
              className="max-w-md w-full rounded-2xl border p-6 sm:p-7 space-y-5 text-center shadow-2xl"
              style={{ background: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
            >
              <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-500 shadow-inner">
                <ShieldAlert size={30} className="animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-primary tracking-tight">
                  Fullscreen Lockdown Required
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Contest arena requires <strong>Exclusive Fullscreen Mode</strong>. External screen switching and windowed solving are strictly prohibited.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border bg-amber-500/10 border-amber-500/25 text-left text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-amber-700 dark:text-amber-400">
                  <span>Proctoring Strike Counter</span>
                  <span className="font-mono">{fullscreenExits} / 3 Strikes</span>
                </div>
                <p className="text-[11px] text-muted">
                  Exiting fullscreen mode 3 times automatically submits and seals your contest score.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleEnterFullscreen}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Maximize2 size={15} />
                  <span>Enter Fullscreen Mode</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinishContest}
                  className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-500/10 transition"
                >
                  Abandon & Auto-Submit Contest
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Arena Navigation Tabs */}
        <div className="flex items-center gap-2 border-b pb-4" style={{ borderColor: 'var(--ca-border)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('problems')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'problems'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-muted hover:text-primary border'
            }`}
            style={activeTab === 'problems' ? {} : { background: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
          >
            <Code2 size={14} />
            <span>Contest Problems ({contest.problems.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scoreboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'scoreboard'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-muted hover:text-primary border'
            }`}
            style={activeTab === 'scoreboard' ? {} : { background: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
          >
            <Trophy size={14} />
            <span>Live Scoreboard</span>
          </button>
        </div>

        {/* PROBLEMS TAB */}
        {activeTab === 'problems' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {contest.problems.map((prob, idx) => {
                const diffColors = {
                  Easy: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
                  Medium: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
                  Hard: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
                }[prob.difficulty];

                const userSolve = userSolves[prob.problemId];
                const isAccepted = userSolve?.status === 'accepted';

                return (
                  <div
                    key={prob.id}
                    className="rounded-2xl border p-5 sm:p-6 transition flex flex-col justify-between shadow-xs"
                    style={{
                      background: 'var(--ca-surface)',
                      borderColor: isAccepted ? 'rgba(16, 185, 129, 0.4)' : 'var(--ca-border)',
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-muted">
                          Problem 0{idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-sm text-[11px] font-bold border ${diffColors}`}>
                            {prob.difficulty}
                          </span>
                          <span
                            className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded-sm border"
                            style={{ background: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
                          >
                            {prob.points} pts
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-primary">
                        {prob.title}
                      </h3>

                      {isAccepted ? (
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          <CheckCircle2 size={13} />
                          <span>Solved (+{userSolve.elapsedMinutes}m)</span>
                        </div>
                      ) : (
                        <p className="text-xs text-muted">
                          Solve challenge and submit to unlock {prob.points} points.
                        </p>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--ca-border)' }}>
                      <span className="text-[11px] text-muted font-mono">
                        {prob.solvedCount > 0 ? `${prob.solvedCount} solves` : 'Open challenge'}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleOpenProblem(e, prob.problemId)}
                        className={`inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold transition ${
                          isAccepted
                            ? 'border text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                        }`}
                        style={isAccepted ? { background: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' } : {}}
                      >
                        {isAccepted ? 'Review Solution' : 'Solve Challenge'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SCOREBOARD TAB */}
        {activeTab === 'scoreboard' && (
          <div className="space-y-5">
            {/* College Filter Toolbar */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border shadow-xs"
              style={{ background: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
            >
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="text-xs font-bold text-primary">Filter Campus Standings:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCollegeFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    collegeFilter === 'all'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-muted hover:text-primary border'
                  }`}
                  style={collegeFilter === 'all' ? {} : { background: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
                >
                  All Universities
                </button>

                {userCollege && (
                  <button
                    type="button"
                    onClick={() => setCollegeFilter(userCollege)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      collegeFilter.toLowerCase() === userCollege.toLowerCase()
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20'
                    }`}
                  >
                    <GraduationCap size={13} />
                    <span>My College ({userCollege})</span>
                  </button>
                )}

                <select
                  value={collegeFilter}
                  onChange={(e) => setCollegeFilter(e.target.value)}
                  className="h-8 px-2.5 rounded-lg border text-xs text-primary outline-hidden focus:border-indigo-500"
                  style={{ background: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
                >
                  <option value="all">Select Specific Campus...</option>
                  {collegesList.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Standings Table */}
            <div
              className="rounded-2xl border overflow-hidden shadow-xs"
              style={{ background: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
            >
              <div
                className="flex items-center justify-between px-5 py-3 border-b text-[10px] font-bold uppercase tracking-wider text-muted"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                <div className="flex items-center gap-6">
                  <span className="w-8">Rank</span>
                  <span>Contestant & Campus</span>
                </div>
                <div className="flex items-center gap-8 sm:gap-14">
                  <span className="hidden sm:inline">Problems (Q1-Q4)</span>
                  <span className="hidden sm:inline">Solve Time</span>
                  <span className="w-16 text-right">Score</span>
                </div>
              </div>

              {filteredStandings.length === 0 ? (
                <div className="p-8 text-center text-muted text-xs">
                  <Trophy size={28} className="mx-auto mb-2 text-muted opacity-50" />
                  <p className="font-semibold text-primary">No submissions recorded yet for this contest.</p>
                  <p className="mt-1">Solve the contest challenges to see your name on the live scoreboard!</p>
                </div>
              ) : (
                <div className="divide-y" style={{ borderColor: 'var(--ca-border)' }}>
                {filteredStandings.map((participant) => {
                  const isGold = participant.rank === 1;
                  const isSilver = participant.rank === 2;
                  const isBronze = participant.rank === 3;

                  return (
                    <div
                      key={participant.userId}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-black/5 dark:hover:bg-white/5 transition"
                    >
                      {/* Rank & Identity */}
                      <div className="flex items-center gap-5 min-w-0">
                        <span className="w-8 font-mono text-xs font-black tabular-nums flex items-center gap-1">
                          {isGold ? (
                            <Crown size={14} className="text-amber-500" />
                          ) : isSilver ? (
                            <Medal size={14} className="text-slate-400" />
                          ) : isBronze ? (
                            <Medal size={14} className="text-amber-700" />
                          ) : null}
                          <span className="text-primary">{String(participant.rank).padStart(2, '0')}</span>
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-xs font-bold text-primary">
                              {participant.displayName}
                            </p>
                            <span className="text-[10px] text-muted">@{participant.handle}</span>
                          </div>
                          {participant.university && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                              <GraduationCap size={10} />
                              {participant.university}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Problem breakdown & Score */}
                      <div className="flex items-center gap-8 sm:gap-14 shrink-0">
                        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px]">
                          {Object.entries(participant.problemResults).map(([qid, res]) => (
                            <span
                              key={qid}
                              className={`px-1.5 py-0.5 rounded-sm text-[10px] font-bold ${
                                res.status === 'accepted'
                                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                  : res.status === 'wrong_answer'
                                  ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                                  : 'text-muted border'
                              }`}
                              style={res.status === 'unattempted' ? { background: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' } : {}}
                              title={res.status === 'accepted' ? `Solved at ${res.solvedAtMinutes}m` : res.status}
                            >
                              {res.status === 'accepted' ? '✓' : res.status === 'wrong_answer' ? '✗' : '-'}
                            </span>
                          ))}
                        </div>

                        <span className="hidden sm:inline font-mono text-xs text-muted tabular-nums">
                          {participant.totalTimeMinutes}m
                        </span>

                        <span className="w-20 text-right font-mono text-xs font-black text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 tabular-nums px-2.5 py-1 rounded-lg">
                          {participant.totalScore}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        )}
      </div>

      {/* Finish Contest Confirmation Modal */}
      {showFinishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="max-w-md w-full rounded-2xl border p-6 space-y-4 shadow-2xl"
            style={{ background: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
          >
            <h3 className="text-base font-bold text-primary">Finish and Submit Contest?</h3>
            <p className="text-xs text-muted leading-relaxed">
              Are you ready to submit your contest attempt? Your score of <strong>{myScore} pts</strong> will be locked in and added to your campus total for the National Campus Cup.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowFinishConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-muted hover:text-primary transition"
              >
                Continue Solving
              </button>
              <button
                type="button"
                onClick={handleFinishContest}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition shadow-md"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
