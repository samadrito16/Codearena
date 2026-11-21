import { useMemo } from 'react';
import { Activity, ArrowRight, ArrowUpRight, Award, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ErrorAlert from '../components/ui/ErrorAlert';
import { SkeletonLine } from '../components/ui/LoadingSkeleton';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useLeaderboard, useLearningPaths, useProblems } from '../hooks/useDataServices';
import { evaluateAllLearningPaths, findContinueLearningTarget, formatActivityTime, formatDuration } from '../lib/progress';
import type { ActivityEvent } from '../types';

export default function Dashboard() {
  const { solvedIds, activityLog } = useApp();
  const { user } = useAuth();
  const { data: problems } = useProblems();
  const { data: learningPaths, status: pathsStatus, error: pathsError, retry: retryPaths } = useLearningPaths();
  const { data: leaderboard, status: leaderboardStatus, error: leaderboardError, retry: retryLeaderboard } = useLeaderboard();

  const unsolvedProblems = problems.filter((problem) => !solvedIds.includes(problem.id));
  const latestTopic = activityLog[0]?.topic;
  const recommendedProblem = (latestTopic
    ? unsolvedProblems.find((problem) => problem.topics.includes(latestTopic))
    : undefined) ?? unsolvedProblems[0] ?? problems[0];
  const recommendationReason = recommendedProblem
    ? recommendedProblem.topics.find((topic) => activityLog.slice(0, 5).some((event) => event.topic === topic))
      ? `Build on your recent work in ${recommendedProblem.topics.find((topic) => activityLog.slice(0, 5).some((event) => event.topic === topic))}.`
      : `A practical next step to strengthen ${recommendedProblem.topics.slice(0, 2).join(' and ')}.`
    : 'Add problems to your library to get a tailored recommendation.';

  const evaluatedPaths = useMemo(
    () => evaluateAllLearningPaths(learningPaths, problems, solvedIds),
    [learningPaths, problems, solvedIds],
  );
  const continueTarget = useMemo(
    () => findContinueLearningTarget(evaluatedPaths),
    [evaluatedPaths],
  );
  const featuredPaths = useMemo(
    () => evaluatedPaths.filter((item) => item.totalProblems > 0).slice(0, 4),
    [evaluatedPaths],
  );

  return <div className="space-y-7 dashboard-page">
    <section className="hero-panel relative overflow-hidden rounded-[28px] px-6 py-7 sm:px-8 sm:py-9">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="relative z-10 max-w-2xl">
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-[38px]">Ready to sharpen<br className="hidden sm:block" /> your <span className="text-indigo-100">problem-solving</span> edge?</h2>
        <p className="mt-3 max-w-lg text-sm leading-6 text-white/90">Every problem is a new opportunity to think deeper, write cleaner code, and become a better engineer.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/problems" className="btn-primary">Explore problems <ArrowRight size={16} /></Link>
          <Link to="/daily-challenges" className="btn-ghost hero-ghost-button">Daily challenges <ArrowUpRight size={15}/></Link>
        </div>
        <div className="hero-quickfacts" aria-label="Prismcode practice library overview">
          <div className="hero-quickfact"><span className="hero-quickfact-value animate-count-in tabular-nums">{problems.length}</span><span className="hero-quickfact-label">problems in the library</span></div>
          <div className="hero-quickfact"><span className="hero-quickfact-value animate-count-in tabular-nums" style={{ animationDelay: '.08s' }}>{learningPaths.length}</span><span className="hero-quickfact-label">guided learning paths</span></div>
          <div className="hero-quickfact"><span className="hero-quickfact-value animate-count-in tabular-nums" style={{ animationDelay: '.16s' }}>04</span><span className="hero-quickfact-label">supported languages</span></div>
        </div>
      </div>
      <div className="hero-code-card hidden xl:block">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3"><i className="h-2 w-2 rounded-full bg-rose-400"/><i className="h-2 w-2 rounded-full bg-amber-300"/><i className="h-2 w-2 rounded-full bg-emerald-400"/><span className="ml-2 text-[10px] text-indigo-100/50">solution.ts</span></div>
        <pre className="px-5 py-4 text-xs leading-6 text-indigo-100"><span className="text-fuchsia-300">function</span> <span className="text-emerald-200">levelUp</span>() {'{'}{`\n`}  <span className="text-fuchsia-300">while</span> (curious) {'{'}{`\n`}    practice();{`\n`}    learn();{`\n`}    <span className="text-fuchsia-300">return</span> growth;{`\n`}  {'}'}{`\n`}{'}'}</pre>
        <div className="mx-5 mb-4 rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-[10px] text-emerald-200">✓ Small steps add up · Keep going!</div>
      </div>
    </section>

    <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="panel-card next-problem-panel overflow-hidden p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          {recommendedProblem ? <p className="text-[11px] font-semibold text-muted">{unsolvedProblems.length ? `${unsolvedProblems.length} problem${unsolvedProblems.length === 1 ? '' : 's'} left in your library` : 'You have completed every problem in this library'}</p> : <span/>}
          <span className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider" style={{ background: 'color-mix(in srgb, var(--ca-accent-solid) 12%, var(--ca-surface))', color: 'var(--ca-accent-solid)' }}>Recommended</span>
        </div>
        {recommendedProblem ? <>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-primary sm:text-[28px]">{recommendedProblem.title}</h3>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-muted">{recommendedProblem.description}</p>
          <p className="mt-3 flex items-center gap-2 text-[11px] font-medium text-muted"><Sparkles size={13} className="themed-link"/>{recommendationReason}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={recommendedProblem.difficulty}/>
            {recommendedProblem.topics.slice(0, 3).map((topic) => <span key={topic} className="tag-pill">{topic}</span>)}
            <span className="ml-auto text-[10px] text-muted">{recommendedProblem.acceptance} acceptance</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to={`/workspace/${recommendedProblem.id}`} className="btn-primary">{unsolvedProblems.length ? 'Start this problem' : 'Practice again'} <ArrowRight size={15}/></Link>
            <Link to="/problems" className="btn-secondary">Browse library</Link>
          </div>
        </> : <div className="mt-6 rounded-xl p-5 text-center" style={{ background: 'var(--ca-surface-muted)' }}><p className="text-sm font-semibold text-primary">Your next challenge is waiting</p><p className="mt-1 text-xs text-muted">Browse the problem library or ask an admin to add more practice problems.</p><Link to="/problems" className="btn-primary mt-4">Open problem library <ArrowRight size={14}/></Link></div>}
      </div>

      <div className="panel-card p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h3 className="section-title">Your latest sessions</h3><div className="flex items-center gap-4"><div className="activity-sparkline-wrap"><span className="text-[9px] font-semibold uppercase tracking-[.12em] text-muted">7 day signal</span><ActivitySparkline events={activityLog}/></div><Link to="/problems" className="whitespace-nowrap text-xs font-bold themed-link">View problems <ArrowUpRight size={12} className="inline"/></Link></div></div>
        {activityLog.length ? <div className="space-y-4">{activityLog.slice(0, 4).map((event) => <ActivityRow key={event.id} event={event}/>)}</div> : <div className="rounded-xl px-4 py-6 text-center" style={{ background: 'var(--ca-surface-muted)' }}><div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'var(--ca-surface)', color: 'var(--ca-accent-solid)' }}><Activity size={17}/></div><p className="mt-3 text-xs font-semibold text-primary">Your activity will show up here</p><p className="mt-1 text-[10px] text-muted">Solve a problem or spend time in the workspace to begin building your history.</p></div>}
      </div>
    </section>


    <section className="grid items-start gap-5 xl:grid-cols-[1.3fr_1fr]">
      <div className="panel-card p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="section-title">Choose a skill to sharpen</h3>
            <p className="mt-1 text-[11px] leading-5 text-muted">Static DSA learning paths tracked against your local solved problems.</p>
          </div>
          <Link to="/learning-paths" className="shrink-0 whitespace-nowrap text-xs font-bold themed-link">
            All {learningPaths.length} paths <ArrowUpRight size={12} className="inline"/>
          </Link>
        </div>
        <div className="space-y-2.5">
          {pathsStatus === 'error' && pathsError ? (
            <ErrorAlert title="Could not load learning paths" message={pathsError} onRetry={retryPaths}/>
          ) : pathsStatus === 'loading' ? (
            <div className="space-y-3 py-2" role="status" aria-label="Loading learning paths">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-xl border p-3" style={{ borderColor: 'var(--ca-border)' }}>
                  <SkeletonLine width="46%" height="12px"/>
                  <SkeletonLine width="100%" height="6px" className="mt-2.5 rounded-full"/>
                </div>
              ))}
              <span className="sr-only">Loading learning paths…</span>
            </div>
          ) : featuredPaths.map((item) => {
            const accentClass = item.path.accent === 'a' ? 'track-accent-a' : item.path.accent === 'b' ? 'track-accent-b' : 'track-accent-c';
            return (
              <Link
                key={item.path.id}
                to={`/learning-paths/${item.path.id}`}
                className="practice-track group flex items-center gap-3 rounded-xl border p-3 transition hover:-translate-y-0.5"
              >
                <span className={`track-icon ${accentClass} font-mono text-[11px] font-extrabold`}>
                  {String(item.path.order).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center justify-between gap-2">
                    <span className="block truncate text-xs font-bold text-primary">{item.path.title}</span>
                    <span className="text-[10px] font-bold text-muted tabular-nums">{item.solvedCount}/{item.totalProblems} solved</span>
                  </span>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-slate-200/75 dark:bg-slate-800">
                    <span className="block h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${item.progressPct}%` }}/>
                  </span>
                  <span className="mt-1 block truncate text-[10px] leading-4 text-muted">
                    {item.status === 'completed'
                      ? 'Path complete · click to review modules'
                      : item.nextProblem
                        ? `Next: ${item.nextProblem.title}`
                        : `${item.modules.length} guided modules`}
                  </span>
                </span>
                <ArrowUpRight size={16} className="shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 themed-link"/>
              </Link>
            );
          })}
          {continueTarget && (
            <div className="pt-1">
              <Link to={`/workspace/${continueTarget.problem.id}`} className="btn-secondary w-full justify-between px-3.5 py-2.5 text-xs">
                <span className="inline-flex items-center gap-2 truncate">
                  <Award size={14} className="shrink-0 themed-link"/>
                  <span className="truncate">Continue learning: <strong>{continueTarget.problem.title}</strong></span>
                </span>
                <ArrowRight size={14} className="shrink-0"/>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="panel-card p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="section-title">Top performers</h3>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">Sample</span>
          </div>
          <Link to="/leaderboard" className="text-xs font-bold themed-link">Leaderboard <ArrowUpRight size={12} className="inline"/></Link>
        </div>
        {leaderboardStatus === 'error' && leaderboardError ? (
          <ErrorAlert title="Could not load leaderboard" message={leaderboardError} onRetry={retryLeaderboard}/>
        ) : leaderboardStatus === 'loading' ? (
          <div className="space-y-3.5" role="status" aria-label="Loading top performers">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <SkeletonLine width="18px" height="12px"/>
                <SkeletonLine width="32px" height="32px" className="rounded-xl"/>
                <div className="flex-1 space-y-1.5">
                  <SkeletonLine width="55%" height="11px"/>
                  <SkeletonLine width="32%" height="9px"/>
                </div>
                <SkeletonLine width="48px" height="11px"/>
              </div>
            ))}
            <span className="sr-only">Loading leaderboard…</span>
          </div>
        ) : leaderboard.length ? (
          <div className="space-y-3.5">{leaderboard.slice(0, 5).map((person, index) => <div key={person.handle} className="flex items-center gap-3"><span className="w-4 text-xs font-bold text-muted tabular-nums">0{index + 1}</span><div className={`avatar bg-gradient-to-br ${person.color}`}>{person.initials}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-primary">{person.name}</p><p className="text-[10px] text-muted">{person.solved} solved</p></div><span className="text-xs font-bold text-primary tabular-nums">{person.score.toLocaleString()} <span className="text-[10px] font-medium text-muted">pts</span></span></div>)}</div>
        ) : (
          <p className="rounded-xl px-4 py-6 text-center text-xs text-muted" style={{ background: 'var(--ca-surface-muted)' }}>
            No sample leaderboard entries available.
          </p>
        )}
      </div>
    </section>
  </div>;
}

function ActivitySparkline({ events }: { events: ActivityEvent[] }) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() - (6 - index));
    const count = events.filter((event) => new Date(event.timestamp).toDateString() === day.toDateString()).length;
    return { count, label: day.toLocaleDateString(undefined, { weekday: 'short' }) };
  });
  const maxCount = Math.max(1, ...days.map((day) => day.count));
  const points = days.map((day, index) => `${7 + index * 19},${30 - (day.count / maxCount) * 22}`).join(' ');

  return <svg className="activity-sparkline" viewBox="0 0 130 36" role="img" aria-label={`Seven-day activity: ${days.map((day) => `${day.label} ${day.count}`).join(', ')}`}>
    <defs><linearGradient id="activitySparkFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--ca-accent-solid)" stopOpacity=".24"/><stop offset="100%" stopColor="var(--ca-accent-solid)" stopOpacity="0"/></linearGradient></defs>
    <polygon points={`0,36 ${points} 121,36`} fill="url(#activitySparkFill)"/>
    {days.map((day, index) => <rect key={day.label} x={2 + index * 19} y={34 - (day.count / maxCount) * 25} width="10" height={Math.max(2, (day.count / maxCount) * 25)} rx="3" fill="var(--ca-accent-solid)" opacity={day.count ? '.18' : '.06'}/>) }
    <polyline points={points} fill="none" stroke="var(--ca-accent-solid)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    {days.map((day, index) => <circle key={`${day.label}-dot`} cx={7 + index * 19} cy={30 - (day.count / maxCount) * 22} r="2" fill="var(--ca-accent-solid)"/>)}
  </svg>;
}

function ActivityRow({ event }: { event: ActivityEvent }) {
  const solved = event.type === 'solved';
  return <div className="flex items-center gap-3"><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${solved ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'}`}>{solved ? <CheckCircle2 size={15}/> : <Code2 size={15}/>}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-primary">{solved ? 'Solved' : 'Practiced'} {event.title}</p><p className="mt-0.5 text-[11px] text-muted">{event.topic} · {event.difficulty}{event.durationSeconds ? ` · ${formatDuration(event.durationSeconds)} est.` : ''}</p></div><span className="shrink-0 text-[10px] text-muted">{formatActivityTime(event.timestamp)}</span></div>;
}

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const cls = difficulty === 'Easy' ? 'difficulty-easy' : difficulty === 'Medium' ? 'difficulty-medium' : 'difficulty-hard';
  return <span className={`difficulty-badge ${cls}`}>{difficulty}</span>;
}
