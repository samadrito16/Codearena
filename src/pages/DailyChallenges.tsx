import { useEffect, useMemo } from 'react';
import { Activity, ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, Clock3, Flame, Sparkles, Target, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLearningPaths, useProblems } from '../hooks/useDataServices';
import {
  evaluateAllLearningPaths,
  formatDuration,
  getBestStreak,
  getCurrentStreak,
  getLocalDateKey,
  isDailyChallengeCompleted,
  selectDailyChallenge,
} from '../lib/progress';

export default function DailyChallenges() {
  const {
    solvedIds,
    activityLog,
    dailyChallengeByDate,
    ensureDailyChallenge,
    dailyCompletions,
  } = useApp();
  const { data: problems } = useProblems();
  const { data: learningPaths } = useLearningPaths();

  const today = new Date();
  const todayKey = getLocalDateKey(today);
  const suggestedDaily = selectDailyChallenge(problems, today, solvedIds);
  const dailyId = dailyChallengeByDate[todayKey] ?? suggestedDaily?.id;
  const daily = problems.find((problem) => problem.id === dailyId) ?? suggestedDaily;

  useEffect(() => {
    if (daily?.id) ensureDailyChallenge(todayKey, daily.id);
  }, [daily?.id, ensureDailyChallenge, todayKey]);

  // Daily completion is strictly tied to today's date key + today's assigned challenge ID,
  // independent of whether the problem was solved on an earlier day.
  const dailyDone = isDailyChallengeCompleted(dailyCompletions, todayKey, daily?.id);
  const solvedPreviously = Boolean(daily && !dailyDone && solvedIds.includes(daily.id));
  const dailyPath = useMemo(() => {
    if (!daily) return null;
    const evaluated = evaluateAllLearningPaths(learningPaths, problems, solvedIds);
    return evaluated.find((item) => item.modules.some((mod) => mod.problems.some((p) => p.id === daily.id))) ?? null;
  }, [daily, learningPaths, problems, solvedIds]);
  const currentStreak = getCurrentStreak(activityLog);
  const bestStreak = getBestStreak(activityLog);
  const practiceSeconds = activityLog.reduce((total, event) => total + (event.durationSeconds ?? 0), 0);
  const challengePoints = daily?.difficulty === 'Hard' ? 30 : daily?.difficulty === 'Medium' ? 20 : 10;

  const previousChallenges = useMemo(() => Object.entries(dailyChallengeByDate)
    .filter(([dateKey, problemId]) => dateKey < todayKey && problems.some((problem) => problem.id === problemId))
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 7)
    .map(([dateKey, problemId]) => {
      const problem = problems.find((item) => item.id === problemId)!;
      const completed = isDailyChallengeCompleted(dailyCompletions, dateKey, problemId);
      const solvedLifetime = solvedIds.includes(problemId);
      const date = new Date(`${dateKey}T00:00:00`);
      return {
        dateKey,
        problem,
        completed,
        solvedLifetime,
        dateLabel: date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
      };
    }), [dailyChallengeByDate, dailyCompletions, problems, solvedIds, todayKey]);

  return <div className="space-y-7">
    <section className="page-heading-row">
      <div>
        <p className="section-kicker">BUILD A DAILY HABIT</p>
        <h2 className="page-title">Daily Challenges</h2>
        <p className="page-subtitle">One focused problem every day. Practice consistently, collect points, and build your problem-solving streak.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-2xl bg-orange-50 px-4 py-3 dark:bg-orange-500/10">
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-300">Current streak</p>
          <p className="font-display text-xl font-bold text-orange-700 dark:text-orange-200 tabular-nums">{currentStreak} <span className="text-xs font-semibold">{currentStreak === 1 ? 'day' : 'days'}</span></p>
        </div>
        <div className="rounded-2xl border px-4 py-3" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Best streak</p>
          <p className="font-display text-xl font-bold text-primary tabular-nums">{bestStreak} <span className="text-xs font-semibold text-muted">{bestStreak === 1 ? 'day' : 'days'}</span></p>
        </div>
      </div>
    </section>

    <section className="hero-panel relative overflow-hidden rounded-[28px] px-6 py-7 sm:px-8 sm:py-9">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="relative z-10 grid gap-7 lg:grid-cols-[1.5fr_0.8fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-indigo-100"><Flame size={13} className="text-amber-300" /> TODAY'S CHALLENGE · {today.toLocaleDateString([], { month: 'long', day: 'numeric' }).toUpperCase()}</div>
          {daily ? <>
            <h3 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">{daily.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold text-white">{daily.difficulty}</span>
              {daily.topics.slice(0, 3).map((topic) => <span key={topic} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-indigo-100">{topic}</span>)}
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-indigo-100/85">{daily.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to={`/workspace/${daily.id}?daily=${todayKey}`} className="btn-primary">{dailyDone ? 'Review challenge' : 'Start today’s challenge'} <ArrowUpRight size={16}/></Link>
              {dailyPath && (
                <Link to={`/learning-paths/${dailyPath.path.id}`} className="btn-ghost hero-ghost-button text-xs">
                  Path: {dailyPath.path.title} <ArrowUpRight size={14}/>
                </Link>
              )}
              {dailyDone && <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200"><CheckCircle2 size={15}/> Completed today</span>}
              {solvedPreviously && <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90">Solved earlier · complete again today to log daily</span>}
            </div>
          </> : <>
            <h3 className="font-display text-2xl font-bold text-white">Your next challenge is waiting</h3>
            <p className="mt-2 max-w-lg text-sm leading-6 text-indigo-100/80">Add a problem to your library to start a daily challenge.</p>
            <Link to="/problems" className="btn-primary mt-5">Explore problems <ArrowRight size={15}/></Link>
          </>}
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-indigo-100"><Trophy size={15}/><span className="text-[11px] font-semibold">Challenge reward</span></div>
            <p className="mt-2 font-display text-3xl font-bold text-white">{challengePoints} <span className="text-xs font-semibold text-indigo-200">pts</span></p>
            <p className="mt-1 text-[10px] text-indigo-100/65">Awarded when this problem is solved</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-indigo-100"><Clock3 size={15}/><span className="text-[11px] font-semibold">Estimated practice time</span></div>
            <p className="mt-2 font-display text-3xl font-bold text-white">{formatDuration(practiceSeconds)}</p>
            <p className="mt-1 text-[10px] text-indigo-100/65">Active workspace time · pauses when idle or hidden</p>
          </div>
        </div>
      </div>
    </section>

    <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="panel-card p-5 sm:p-6">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><CalendarDays size={19}/></span><div><p className="section-kicker">YOUR CHALLENGE HISTORY</p><h3 className="section-title mt-1">Recent daily picks</h3></div></div>
        {previousChallenges.length ? <div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">
          {previousChallenges.map(({ dateKey, problem, completed, solvedLifetime, dateLabel }) => <div key={dateKey} className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${completed ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>{completed ? <CheckCircle2 size={17}/> : <Target size={17}/>}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{problem.title}</p>
              <p className="mt-0.5 text-[10px] text-slate-400">
                {dateLabel} · {problem.difficulty}{!completed && solvedLifetime ? ' · Solved on a different day' : ''}
              </p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${completed ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300'}`}>{completed ? 'COMPLETED ON DAY' : 'NOT COMPLETED'}</span>
            <Link to={`/workspace/${problem.id}?daily=${dateKey}`} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300">Review <ArrowUpRight size={12} className="inline"/></Link>
          </div>)}
        </div> : <div className="mt-5 rounded-xl bg-slate-50 px-4 py-6 text-center dark:bg-slate-800/50"><CalendarDays size={20} className="mx-auto text-slate-400"/><p className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">Your challenge history will appear here</p><p className="mt-1 text-[10px] text-slate-400">Complete today’s challenge and your daily picks will build up here.</p></div>}
      </div>

      <div className="panel-card p-5 sm:p-6">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300"><Sparkles size={19}/></span><div><p className="section-kicker">HOW IT WORKS</p><h3 className="section-title mt-1">Make every day count</h3></div></div>
        <div className="mt-5 space-y-4">
          <div className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">1</span><div><p className="text-xs font-bold text-slate-800 dark:text-slate-100">Take on one daily pick</p><p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">A new problem is selected automatically each day from your library.</p></div></div>
          <div className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">2</span><div><p className="text-xs font-bold text-slate-800 dark:text-slate-100">Solve it in the workspace</p><p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">Mark the problem solved when you finish to record your achievement.</p></div></div>
          <div className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">3</span><div><p className="text-xs font-bold text-slate-800 dark:text-slate-100">Build your streak</p><p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">Keep practicing on different days to grow your activity streak and arena points.</p></div></div>
        </div>
        <Link to="/progress" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-300">View your progress <ArrowRight size={14}/></Link>
      </div>
    </section>
    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400"><Activity size={13}/> Your challenge and completion history is saved in this browser.</div>
  </div>;
}
