import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Code2,
  Compass,
  Flame,
  Info,
  Lock,
  Plus,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  UserRound,
  X,
  Zap,
  Brain,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLearningPaths, useProblems } from '../hooks/useDataServices';
import { useSpacedRepetition } from '../hooks/useSpacedRepetition';
import {
  buildActivityHeatmap,
  buildDifficultyStats,
  buildMilestoneAchievements,
  buildPeriodSummary,
  buildSolvingTimeStats,
  buildSubmissionAnalytics,
  buildTopicMastery,
  formatSolveTime,
  OUTCOME_META,
  type ActivityPeriod,
  type HeatmapDay,
  type MilestoneAchievement,
} from '../lib/analytics';
import {
  countDailyCompletions,
  evaluateAllLearningPaths,
  findContinueLearningTarget,
  formatActivityTime,
  formatDuration,
  getBestStreak,
  getCurrentStreak,
} from '../lib/progress';
import type { ActivityEvent, Difficulty, SubmissionOutcome } from '../types';

type TopicFilter = 'all' | 'strong' | 'needs_focus';

export default function Progress() {
  const {
    solvedIds,
    activityLog,
    submissions,
    recordSubmission,
    dailyChallengeByDate,
    dailyCompletions,
  } = useApp();
  const { data: problems } = useProblems();
  const { data: learningPaths } = useLearningPaths();
  const spacedRepetition = useSpacedRepetition();

  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);
  const [summaryPeriod, setSummaryPeriod] = useState<ActivityPeriod>('week');
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('all');
  const [isTopicExpanded, setIsTopicExpanded] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [logProblemId, setLogProblemId] = useState(() => problems[0]?.id ?? '');
  const [logOutcome, setLogOutcome] = useState<SubmissionOutcome>('wrong_answer');
  const [logMinutes, setLogMinutes] = useState('');
  const [showMilestonesModal, setShowMilestonesModal] = useState(false);
  const [milestoneTab, setMilestoneTab] = useState<'all' | 'unlocked' | 'in_progress'>('all');

  const currentStreak = useMemo(() => getCurrentStreak(activityLog), [activityLog]);
  const bestStreak = useMemo(() => getBestStreak(activityLog), [activityLog]);
  const practiceSeconds = useMemo(
    () => activityLog.reduce((total, event) => total + (event.durationSeconds ?? 0), 0),
    [activityLog],
  );

  const periodSummary = useMemo(
    () => buildPeriodSummary(problems, solvedIds, activityLog, submissions, summaryPeriod),
    [problems, solvedIds, activityLog, submissions, summaryPeriod],
  );
  const heatmap = useMemo(
    () => buildActivityHeatmap(activityLog, submissions, 52),
    [activityLog, submissions],
  );
  const topicMastery = useMemo(
    () => buildTopicMastery(problems, solvedIds, activityLog, submissions),
    [problems, solvedIds, activityLog, submissions],
  );
  const difficultyStats = useMemo(
    () => buildDifficultyStats(problems, solvedIds, activityLog, submissions),
    [problems, solvedIds, activityLog, submissions],
  );
  const submissionAnalytics = useMemo(
    () => buildSubmissionAnalytics(submissions),
    [submissions],
  );
  const solvingTimeStats = useMemo(
    () => buildSolvingTimeStats(activityLog, submissions),
    [activityLog, submissions],
  );
  const achievements = useMemo(
    () => buildMilestoneAchievements({
      problems,
      solvedIds,
      activityLog,
      submissions,
      dailyCompletions,
      dailyChallengeByDate,
      currentStreak,
      bestStreak,
    }),
    [problems, solvedIds, activityLog, submissions, dailyCompletions, dailyChallengeByDate, currentStreak, bestStreak],
  );
  const completedDailyCount = useMemo(
    () => countDailyCompletions(dailyCompletions, dailyChallengeByDate),
    [dailyCompletions, dailyChallengeByDate],
  );
  const evaluatedPaths = useMemo(
    () => evaluateAllLearningPaths(learningPaths, problems, solvedIds),
    [learningPaths, problems, solvedIds],
  );
  const continueLearning = useMemo(
    () => findContinueLearningTarget(evaluatedPaths),
    [evaluatedPaths],
  );

  const unlockedCount = achievements.filter((item) => item.unlocked).length;
  const previewMilestones = useMemo(() => achievements.slice(0, 5), [achievements]);
  const filteredMilestones = useMemo(() => {
    if (milestoneTab === 'unlocked') return achievements.filter((a) => a.unlocked);
    if (milestoneTab === 'in_progress') return achievements.filter((a) => !a.unlocked);
    return achievements;
  }, [achievements, milestoneTab]);
  const strongTopics = topicMastery.filter((item) => item.status === 'strong');
  const weakTopics = topicMastery.filter((item) => item.status === 'needs_focus' || item.solved < item.total);
  const visibleTopics = topicFilter === 'all'
    ? topicMastery
    : topicFilter === 'strong'
      ? strongTopics
      : topicMastery.filter((item) => item.solved < item.total);
  const displayedTopics = isTopicExpanded ? visibleTopics : visibleTopics.slice(0, 4);

  function handleLogSubmit(event: FormEvent) {
    event.preventDefault();
    const targetId = logProblemId || problems[0]?.id;
    if (!targetId) return;
    const parsedMinutes = Number(logMinutes);
    const durationSeconds = Number.isFinite(parsedMinutes) && parsedMinutes > 0
      ? Math.round(parsedMinutes * 60)
      : undefined;
    recordSubmission(targetId, logOutcome, durationSeconds);
    setLogMinutes('');
    setLogOpen(false);
  }

  return <div className="space-y-6">
    <section className="page-heading-row">
      <div>
        <h2 className="page-title mt-0">Your Progress</h2>
        <p className="page-subtitle">See what you’ve marked solved locally, how consistently you practice, and where to focus next.</p>
      </div>
      <Link to="/profile" className="btn-secondary shrink-0">
        <UserRound size={15}/> View profile
      </Link>
    </section>

    <div
      className="flex items-start gap-2.5 rounded-2xl border px-4 py-3 text-xs leading-5 text-muted"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
      role="note"
    >
      <Info size={15} className="mt-0.5 shrink-0 themed-link"/>
      <p>
        <strong className="font-semibold text-primary">Local demo progress · not server-verified.</strong>{' '}
        Solved counts, activity streaks, logged attempts, and achievements are stored only in this browser and can be toggled manually until a backend judge is connected.
      </p>
    </div>

    {/* 1. Weekly / Monthly Activity Summary */}
    <section className="panel-card weekly-report-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="themed-icon themed-icon-primary h-8 w-8 rounded-xl"><Sparkles size={16}/></span>
            <h3 className="section-title">{summaryPeriod === 'week' ? 'Weekly Summary' : 'Monthly Summary'}</h3>
            <div className="inline-flex rounded-xl border p-0.5" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }} role="tablist" aria-label="Activity summary period">
              {([
                ['week', 'Weekly (7d)'],
                ['month', 'Monthly (30d)'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={summaryPeriod === key}
                  onClick={() => setSummaryPeriod(key)}
                  className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition ${summaryPeriod === key ? 'bg-indigo-600 text-white shadow-sm' : 'text-muted hover:text-primary'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-primary sm:text-[15px]">
            “{periodSummary.summary}”
          </p>
        </div>
        {periodSummary.focusProblem && (
          <Link to={`/workspace/${periodSummary.focusProblem.id}`} className="btn-primary shrink-0">
            Practice {periodSummary.weakestTopic ?? periodSummary.focusProblem.title} <ArrowRight size={14}/>
          </Link>
        )}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="weekly-stat-pill rounded-xl px-3.5 py-2.5">
          <p className="text-[10px] font-semibold text-muted">
            {summaryPeriod === 'week' ? 'Marked solved (7d)' : 'Marked solved (30d)'}
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-primary tabular-nums">{periodSummary.solvedInPeriod}</span>
            <span className={`text-[10px] font-bold ${periodSummary.deltaSolved >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
              {periodSummary.deltaSolved >= 0 ? `+${periodSummary.deltaSolved}` : periodSummary.deltaSolved} vs prior {summaryPeriod === 'week' ? '7d' : '30d'}
            </span>
          </div>
        </div>
        <div className="weekly-stat-pill rounded-xl px-3.5 py-2.5">
          <p className="text-[10px] font-semibold text-muted">Active days</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-primary tabular-nums">{periodSummary.activeDays} / {periodSummary.periodDays}</span>
            <span className="text-[10px] text-muted">{formatDuration(periodSummary.practiceSeconds)} est. practice</span>
          </div>
        </div>
        <div className="weekly-stat-pill rounded-xl px-3.5 py-2.5">
          <p className="text-[10px] font-semibold text-muted">Strongest topic</p>
          <p className="mt-1 truncate text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {periodSummary.strongestTopic ?? 'Mark a problem solved to identify'}
          </p>
        </div>
        <div className="weekly-stat-pill rounded-xl px-3.5 py-2.5">
          <p className="text-[10px] font-semibold text-muted">Needs more practice</p>
          <p className="mt-1 truncate text-xs font-bold text-amber-600 dark:text-amber-400">
            {periodSummary.weakestTopic ?? 'All topics covered'}
          </p>
        </div>
      </div>
    </section>

    {/* Top KPI Strip */}
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Marked solved (local)"
        value={String(difficultyStats.totalSolved)}
        note={`of ${difficultyStats.totalProblems} in local library · ${difficultyStats.totalPoints.toLocaleString()} demo pts`}
        icon={<CheckCircle2 size={18}/>}
        tint="indigo"
        detail={`${difficultyStats.overallPct}% local`}
      />
      <StatCard
        title="Current streak"
        value={`${currentStreak} ${currentStreak === 1 ? 'day' : 'days'}`}
        note={`Best streak: ${bestStreak} ${bestStreak === 1 ? 'day' : 'days'}`}
        icon={<Flame size={18}/>}
        tint="orange"
        detail={`${completedDailyCount} ${completedDailyCount === 1 ? 'daily' : 'dailies'} done`}
      />
      <StatCard
        title="Est. avg solve time"
        value={solvingTimeStats.overallAvgSeconds !== null ? formatSolveTime(solvingTimeStats.overallAvgSeconds) : '—'}
        note={solvingTimeStats.fastestSeconds !== null
          ? `Fastest: ${formatSolveTime(solvingTimeStats.fastestSeconds)} · ${formatDuration(practiceSeconds)} est. practice`
          : `Estimated practice time: ${formatDuration(practiceSeconds)}`}
        icon={<Timer size={18}/>}
        tint="cyan"
        detail={solvingTimeStats.timedCount ? `${solvingTimeStats.timedCount} timed` : 'Active workspace time'}
      />
      <StatCard
        title="Local attempt rate"
        value={submissionAnalytics.acceptanceRate !== null ? `${submissionAnalytics.acceptanceRate}%` : '—'}
        note={submissionAnalytics.total > 0
          ? `${submissionAnalytics.accepted} self-logged accepted of ${submissionAnalytics.total} local attempts`
          : 'Self-logged local attempts (not judge-verified)'}
        icon={<Award size={18}/>}
        tint="violet"
        detail={submissionAnalytics.wrongAnswer ? `${submissionAnalytics.wrongAnswer} WA` : 'Local log only'}
      />
    </section>

    {/* 2. Activity Heatmap (1 Full Year - GitHub Style) */}
    <section className="panel-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="themed-link"/>
            <h3 className="section-title">
              {heatmap.totalActivities} contribution{heatmap.totalActivities === 1 ? '' : 's'} in the last year
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted">Daily coding activity and practice consistency over the past 52 weeks.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="rounded-lg px-2.5 py-1 font-semibold text-primary" style={{ background: 'var(--ca-surface-muted)' }}>
            <strong className="tabular-nums">{heatmap.activeDays}</strong> active {heatmap.activeDays === 1 ? 'day' : 'days'}
          </span>
          <span className="rounded-lg px-2.5 py-1 font-semibold text-primary" style={{ background: 'var(--ca-surface-muted)' }}>
            <strong className="tabular-nums">{heatmap.totalActivities}</strong> {heatmap.totalActivities === 1 ? 'session' : 'sessions'}
          </span>
          <span className="rounded-lg px-2.5 py-1 font-semibold text-primary" style={{ background: 'var(--ca-surface-muted)' }}>
            <strong className="tabular-nums">{heatmap.totalSolved}</strong> solved
          </span>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto pb-1">
        <div className="inline-block min-w-max">
          {/* Month headers across 52 weeks */}
          <div className="mb-1.5 flex items-center pl-8 text-[10px] font-semibold text-muted">
            {heatmap.weeks.map((_, weekIdx) => {
              const label = heatmap.monthLabels.find((item) => item.weekIndex === weekIdx)?.label;
              return (
                <div key={weekIdx} className="mr-1.5 w-[14px] shrink-0 overflow-visible whitespace-nowrap">
                  {label ?? ''}
                </div>
              );
            })}
          </div>
          <div className="flex items-start gap-2">
            {/* Weekday labels matching GitHub style (Mon, Wed, Fri) */}
            <div className="grid w-6 grid-rows-7 gap-1.5 pt-0.5 text-[9px] font-semibold text-muted">
              <span className="leading-[14px]">Mon</span>
              <span className="leading-[14px]"/>
              <span className="leading-[14px]">Wed</span>
              <span className="leading-[14px]"/>
              <span className="leading-[14px]">Fri</span>
              <span className="leading-[14px]"/>
              <span className="leading-[14px]"/>
            </div>
            {/* 52-week Heatmap columns */}
            <div className="flex gap-1.5" role="grid" aria-label="1-year coding activity heatmap">
              {heatmap.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="grid grid-rows-7 gap-1.5" role="row">
                  {week.map((day) => (
                    <button
                      key={day.dateKey}
                      type="button"
                      disabled={day.isFuture}
                      onMouseEnter={() => setHoveredDay(day)}
                      onFocus={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`heatmap-cell heatmap-cell-${day.level} ${day.isToday ? 'heatmap-cell-today' : ''} ${day.isFuture ? 'heatmap-cell-future' : ''}`}
                      title={day.isFuture ? day.label : `${day.label}: ${day.count} ${day.count === 1 ? 'activity' : 'activities'}`}
                      aria-label={`${day.label}: ${day.count} activities`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-[11px]" style={{ borderColor: 'var(--ca-border)' }}>
        <div className="flex items-center gap-3">
          <p className="text-muted">
            {hoveredDay ? (
              <>
                <strong className="text-primary">{hoveredDay.label}</strong>
                {' · '}
                {hoveredDay.count === 0
                  ? 'No practice recorded'
                  : `${hoveredDay.count} ${hoveredDay.count === 1 ? 'activity' : 'activities'}${hoveredDay.solvedCount ? ` (${hoveredDay.solvedCount} solved)` : ''}${hoveredDay.durationSeconds ? ` · ${formatDuration(hoveredDay.durationSeconds)} est. practice` : ''}`}
              </>
            ) : (
              'Learn how we count contributions: accepted problem submissions and active workspace practice sessions.'
            )}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span key={lvl} className={`inline-block h-3 w-3 rounded-[3px] heatmap-cell-${lvl}`}/>
          ))}
          <span>More</span>
        </div>
      </div>
    </section>

    {/* 3. Difficulty Statistics + 4. Submission Analytics */}
    <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
      {/* Difficulty Statistics */}
      <div className="panel-card p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="section-title">Difficulty statistics</h3>
            <p className="mt-1 text-xs text-muted">Breakdown of locally marked-solved Easy, Medium, and Hard problems.</p>
          </div>
          <span className="rounded-xl px-3 py-1.5 font-display text-base font-bold tabular-nums" style={{ background: 'color-mix(in srgb, var(--ca-accent-solid) 12%, var(--ca-surface))', color: 'var(--ca-accent-solid)' }}>
            {difficultyStats.overallPct}%
          </span>
        </div>

        <div className="mt-6 grid items-center gap-6 sm:grid-cols-[152px_1fr]">
          <DifficultyDonut
            items={difficultyStats.items}
            totalSolved={difficultyStats.totalSolved}
            totalProblems={difficultyStats.totalProblems}
          />
          <div className="space-y-4">
            {difficultyStats.items.map((tier) => {
              const barColor = tier.difficulty === 'Easy'
                ? 'bg-emerald-500'
                : tier.difficulty === 'Medium'
                  ? 'bg-amber-500'
                  : 'bg-rose-500';
              const badgeClass = tier.difficulty === 'Easy'
                ? 'difficulty-easy'
                : tier.difficulty === 'Medium'
                  ? 'difficulty-medium'
                  : 'difficulty-hard';
              return (
                <div key={tier.difficulty}>
                  <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`difficulty-badge ${badgeClass}`}>{tier.difficulty}</span>
                      <span className="text-xs font-bold text-primary tabular-nums">{tier.solved}/{tier.total}</span>
                      <span className="text-[10px] text-muted tabular-nums">({tier.completionPct}%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted tabular-nums">
                      <span>{tier.points} pts</span>
                      <span>·</span>
                      <span>{tier.avgSolveSeconds !== null ? formatSolveTime(tier.avgSolveSeconds) : 'No timer'}</span>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${tier.completionPct}%` }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submission Analytics */}
      <div className="panel-card p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="section-title">Local attempt log</h3>
            <p className="mt-1 text-xs text-muted">Self-logged attempt outcomes stored in this browser (not judge-verified).</p>
          </div>
          <button
            type="button"
            onClick={() => setLogOpen((prev) => !prev)}
            className="btn-secondary px-2.5 py-1.5 text-[11px]"
          >
            {logOpen ? <><X size={13}/> Close</> : <><Plus size={13}/> Log attempt</>}
          </button>
        </div>

        {logOpen && (
          <form onSubmit={handleLogSubmit} className="mt-4 rounded-xl border p-3.5" style={{ background: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}>
            <div className="grid gap-2.5 sm:grid-cols-3">
              <label className="block">
                <span className="text-[10px] font-bold text-muted">Problem</span>
                <select
                  value={logProblemId}
                  onChange={(e) => setLogProblemId(e.target.value)}
                  className="form-input mt-1 py-2 text-[11px]"
                >
                  {problems.map((problem) => (
                    <option key={problem.id} value={problem.id}>{problem.title}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-[10px] font-bold text-muted">Verdict</span>
                <select
                  value={logOutcome}
                  onChange={(e) => setLogOutcome(e.target.value as SubmissionOutcome)}
                  className="form-input mt-1 py-2 text-[11px]"
                >
                  <option value="accepted">Accepted</option>
                  <option value="wrong_answer">Wrong Answer</option>
                  <option value="tle">Time Limit</option>
                  <option value="runtime_error">Runtime Error</option>
                </select>
              </label>
              <label className="block">
                <span className="text-[10px] font-bold text-muted">Minutes (opt.)</span>
                <input
                  type="number"
                  min="1"
                  max="240"
                  placeholder="e.g. 15"
                  value={logMinutes}
                  onChange={(e) => setLogMinutes(e.target.value)}
                  className="form-input mt-1 py-2 text-[11px]"
                />
              </label>
            </div>
            <div className="mt-3 flex justify-end">
              <button type="submit" className="btn-primary py-1.5 text-[11px]">Save attempt</button>
            </div>
          </form>
        )}

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <VerdictTile label="Accepted" count={submissionAnalytics.accepted} total={submissionAnalytics.total} tone="emerald"/>
          <VerdictTile label="Wrong Ans" count={submissionAnalytics.wrongAnswer} total={submissionAnalytics.total} tone="rose"/>
          <VerdictTile label="Time Limit" count={submissionAnalytics.tle} total={submissionAnalytics.total} tone="amber"/>
          <VerdictTile label="Runtime Err" count={submissionAnalytics.runtimeError} total={submissionAnalytics.total} tone="slate"/>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-primary">7-day verdict trend</span>
            <div className="flex items-center gap-3 text-[10px] text-muted">
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-emerald-500"/> Accepted</span>
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-rose-500"/> Wrong</span>
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-amber-500"/> TLE/RE</span>
            </div>
          </div>
          {submissionAnalytics.total > 0 ? (
            <SubmissionTrendChart trend={submissionAnalytics.trend}/>
          ) : (
            <div className="rounded-xl px-4 py-6 text-center" style={{ background: 'var(--ca-surface-muted)' }}>
              <p className="text-xs font-semibold text-primary">No submission attempts recorded yet</p>
              <p className="mt-1 text-[11px] text-muted">
                Mark a problem solved in the workspace or use <strong>Log attempt</strong> above to track acceptance and wrong-answer trends.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>

    {/* 5. Topic Mastery + 6. Average Solving Time */}
    <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      {/* Topic Mastery */}
      <div className="panel-card p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="section-title">Topic mastery</h3>
            <p className="mt-1 text-xs text-muted">Strengths and areas to reinforce across DSA topics.</p>
          </div>
          <div className="flex flex-wrap gap-1 rounded-xl p-1" style={{ background: 'var(--ca-surface-muted)' }}>
            {([
              ['all', `All (${topicMastery.length})`],
              ['strong', `Strengths (${strongTopics.length})`],
              ['needs_focus', `Needs practice (${weakTopics.length})`],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setTopicFilter(value)}
                className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition ${topicFilter === value ? 'bg-white text-primary shadow-sm dark:bg-slate-800' : 'text-muted hover:text-primary'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {visibleTopics.length ? (
            <>
              {displayedTopics.map((item) => {
            const barClass = item.status === 'strong'
              ? 'bg-emerald-500'
              : item.status === 'building'
                ? 'bg-amber-500'
                : 'bg-rose-400/75';
            const pillClass = item.status === 'strong'
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
              : item.status === 'building'
                ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300';
            const statusText = item.status === 'strong' ? 'Strong' : item.status === 'building' ? 'In progress' : 'Needs practice';
            return (
              <div key={item.topic} className="rounded-xl border p-3" style={{ borderColor: 'var(--ca-border)', background: 'color-mix(in srgb, var(--ca-surface-muted) 45%, var(--ca-surface))' }}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="truncate text-xs font-bold text-primary">{item.topic}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${pillClass}`}>{statusText}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[11px]">
                    {item.avgSolveSeconds !== null && (
                      <span className="text-[10px] text-muted tabular-nums">Avg {formatSolveTime(item.avgSolveSeconds)}</span>
                    )}
                    <span className="font-bold text-primary tabular-nums">{item.solved}/{item.total}</span>
                    {item.nextProblemId && (
                      <Link
                        to={`/workspace/${item.nextProblemId}`}
                        className="inline-flex items-center gap-0.5 text-[10px] font-bold themed-link"
                        title={`Practice ${item.nextProblemTitle}`}
                      >
                        Practice <ArrowUpRight size={11}/>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
                  <div className={`h-full rounded-full ${barClass} transition-all`} style={{ width: `${Math.max(item.solved > 0 ? 6 : 0, item.masteryPct)}%` }}/>
                </div>
              </div>
            );
          })}

          {visibleTopics.length > 4 && (
            <button
              type="button"
              onClick={() => setIsTopicExpanded((prev) => !prev)}
              className="btn-secondary mt-1 flex w-full items-center justify-center gap-1.5 py-1.5 text-xs font-semibold"
              aria-expanded={isTopicExpanded}
            >
              {isTopicExpanded ? (
                <>
                  <span>Show fewer topics</span>
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span>View all {visibleTopics.length} topics ({visibleTopics.length - 4} more)</span>
                  <ChevronDown size={14} />
                </>
              )}
            </button>
          )}
        </>
      ) : (
            <div className="rounded-xl px-4 py-8 text-center" style={{ background: 'var(--ca-surface-muted)' }}>
              <p className="text-xs font-semibold text-primary">No topics in this filter yet</p>
              <p className="mt-1 text-[11px] text-muted">Solve problems in the library to build mastery across DSA topics.</p>
            </div>
          )}
        </div>
      </div>

      {/* Average Solving Time */}
      <div className="panel-card flex flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="section-title">Estimated solving time</h3>
              <p className="mt-1 text-xs text-muted">Estimated active workspace time by difficulty tier (pauses when tab is hidden or idle for 2 min).</p>
            </div>
            <span className="themed-icon themed-icon-primary h-9 w-9 rounded-xl"><Clock3 size={17}/></span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3.5" style={{ background: 'var(--ca-surface-muted)' }}>
              <p className="text-[10px] font-semibold text-muted">Overall average</p>
              <p className="mt-1 font-display text-2xl font-bold text-primary tabular-nums">
                {solvingTimeStats.overallAvgSeconds !== null ? formatSolveTime(solvingTimeStats.overallAvgSeconds) : '—'}
              </p>
              <p className="mt-0.5 text-[10px] text-muted">
                {solvingTimeStats.timedCount} timed {solvingTimeStats.timedCount === 1 ? 'solve' : 'solves'}
              </p>
            </div>
            <div className="rounded-xl p-3.5" style={{ background: 'var(--ca-surface-muted)' }}>
              <p className="text-[10px] font-semibold text-muted">Fastest solve</p>
              <p className="mt-1 font-display text-2xl font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
                {solvingTimeStats.fastestSeconds !== null ? formatSolveTime(solvingTimeStats.fastestSeconds) : '—'}
              </p>
              <p className="mt-0.5 text-[10px] text-muted">Personal speed record</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <p className="text-[11px] font-semibold text-primary">By difficulty</p>
            {(() => {
              const maxAvg = Math.max(
                1,
                ...solvingTimeStats.byDifficulty.map((entry) => entry.avgSeconds ?? 0),
              );
              return solvingTimeStats.byDifficulty.map((entry) => {
                const widthPct = entry.avgSeconds !== null ? Math.max(12, Math.round((entry.avgSeconds / maxAvg) * 100)) : 0;
                const barColor = entry.difficulty === 'Easy'
                  ? 'bg-emerald-500'
                  : entry.difficulty === 'Medium'
                    ? 'bg-amber-500'
                    : 'bg-rose-500';
                return (
                  <div key={entry.difficulty}>
                    <div className="mb-1 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-primary">{entry.difficulty}</span>
                      <span className="font-mono text-[11px] text-muted tabular-nums">
                        {entry.avgSeconds !== null ? `${formatSolveTime(entry.avgSeconds)} (${entry.count})` : 'No timed solves'}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${widthPct}%` }}/>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>
    </section>

    {/* Spaced Repetition & Retention Engine */}
    <section className="panel-card p-5 sm:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Brain size={18} className="text-purple-400" />
            <h3 className="section-title">Spaced Repetition &amp; Memory Retention</h3>
          </div>
          <p className="mt-1 text-xs text-muted">
            Automated 3-day, 7-day, and 21-day review intervals for failed submissions and slow solves.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/problems?filter=review_due" className="btn-secondary py-1.5 px-3 text-xs font-semibold inline-flex items-center gap-1.5">
            <Clock size={13} />
            <span>View Due Problems ({spacedRepetition.dueItems.length})</span>
          </Link>
        </div>
      </div>

      {/* Leitner Box Stage Progression Meter */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Stage 1: 3 Days */}
        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Stage 1 · 3 Days</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 font-bold">Short-Term</span>
          </div>
          <p className="mt-2 text-2xl font-black text-primary font-mono">{spacedRepetition.summary.byStage[1]}</p>
          <p className="mt-0.5 text-[11px] text-muted">Initial recall review</p>
        </div>

        {/* Stage 2: 7 Days */}
        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Stage 2 · 7 Days</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 font-bold">Consolidation</span>
          </div>
          <p className="mt-2 text-2xl font-black text-primary font-mono">{spacedRepetition.summary.byStage[2]}</p>
          <p className="mt-0.5 text-[11px] text-muted">Medium-term retention</p>
        </div>

        {/* Stage 3: 21 Days */}
        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Stage 3 · 21 Days</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 font-bold">Long-Term</span>
          </div>
          <p className="mt-2 text-2xl font-black text-primary font-mono">{spacedRepetition.summary.byStage[3]}</p>
          <p className="mt-0.5 text-[11px] text-muted">Final mastery validation</p>
        </div>

        {/* Graduated */}
        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Mastered</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold">Graduated</span>
          </div>
          <p className="mt-2 text-2xl font-black text-emerald-400 font-mono">{spacedRepetition.summary.graduatedCount}</p>
          <p className="mt-0.5 text-[11px] text-muted">{spacedRepetition.summary.retentionRatePct}% retention success</p>
        </div>
      </div>
    </section>

    {/* 7. Milestone Achievements */}
    <section className="panel-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Trophy size={16} className="themed-link"/>
            <h3 className="section-title">Milestone achievements</h3>
          </div>
          <p className="mt-1 text-xs text-muted">Earn badges for consistency, difficulty breakthroughs, topic breadth, and speed.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-primary tabular-nums">{unlockedCount} / {achievements.length} unlocked</span>
          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="progress-fill" style={{ width: `${Math.round((unlockedCount / achievements.length) * 100)}%` }}/>
          </div>
          <button
            type="button"
            onClick={() => setShowMilestonesModal(true)}
            className="btn-secondary py-1 px-3 text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <span>View all ({achievements.length})</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {previewMilestones.map((badge) => (
          <AchievementCard key={badge.id} badge={badge}/>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t flex items-center justify-between gap-2" style={{ borderColor: 'var(--ca-border)' }}>
        <p className="text-xs text-muted">Showing 5 of {achievements.length} milestone challenges.</p>
        <button
          type="button"
          onClick={() => setShowMilestonesModal(true)}
          className="text-xs font-semibold themed-link hover:underline inline-flex items-center gap-1"
        >
          <span>Open all {achievements.length} milestones & badges</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Expandable Milestone Window / Modal */}
      {showMilestonesModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 sm:p-6 backdrop-blur-sm ca-modal-backdrop"
          onClick={() => setShowMilestonesModal(false)}
        >
          <div
            className="panel-card w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-5 sm:p-6" style={{ borderColor: 'var(--ca-border)' }}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl themed-icon-primary">
                  <Trophy size={20} />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary">All Milestone Achievements</h3>
                  <p className="text-xs text-muted mt-0.5">
                    {unlockedCount} of {achievements.length} badges unlocked across speed, streak, difficulty, and breadth.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMilestonesModal(false)}
                className="rounded-lg p-2 text-muted hover:text-primary hover:bg-slate-500/10 transition"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 border-b px-5 py-3 text-xs overflow-x-auto" style={{ borderColor: 'var(--ca-border)' }}>
              <button
                type="button"
                onClick={() => setMilestoneTab('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${milestoneTab === 'all' ? 'bg-indigo-600 text-white' : 'text-muted hover:text-primary hover:bg-slate-500/10'}`}
              >
                All ({achievements.length})
              </button>
              <button
                type="button"
                onClick={() => setMilestoneTab('unlocked')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${milestoneTab === 'unlocked' ? 'bg-indigo-600 text-white' : 'text-muted hover:text-primary hover:bg-slate-500/10'}`}
              >
                Unlocked ({unlockedCount})
              </button>
              <button
                type="button"
                onClick={() => setMilestoneTab('in_progress')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${milestoneTab === 'in_progress' ? 'bg-indigo-600 text-white' : 'text-muted hover:text-primary hover:bg-slate-500/10'}`}
              >
                Locked / In Progress ({achievements.length - unlockedCount})
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMilestones.map((badge) => (
                  <AchievementCard key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>

    {/* Learning Paths Roadmap Summary */}
    <section className="panel-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Compass size={16} className="themed-link"/>
            <h3 className="section-title">Learning paths roadmap</h3>
          </div>
          <p className="mt-1 text-xs text-muted">Static 8-path DSA sequence tracked against your local solved problems.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {continueLearning && (
            <Link to={`/workspace/${continueLearning.problem.id}`} className="btn-primary py-1.5 text-[11px]">
              Continue learning <ArrowRight size={13}/>
            </Link>
          )}
          <Link to="/learning-paths" className="btn-secondary py-1.5 text-[11px]">
            Explore all {learningPaths.length} paths <ArrowUpRight size={13}/>
          </Link>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {evaluatedPaths.map((item) => (
          <Link
            key={item.path.id}
            to={`/learning-paths/${item.path.id}`}
            className="rounded-xl border p-3.5 transition hover:-translate-y-0.5"
            style={{ borderColor: 'var(--ca-border)', background: 'color-mix(in srgb, var(--ca-surface-muted) 45%, var(--ca-surface))' }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] font-bold text-muted">{String(item.path.order).padStart(2, '0')}</span>
              <span className="text-[10px] font-bold text-primary tabular-nums">
                {item.totalProblems > 0 ? `${item.solvedCount}/${item.totalProblems}` : 'Upcoming'}
              </span>
            </div>
            <p className="mt-1.5 truncate text-xs font-bold text-primary">{item.path.title}</p>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all ${item.status === 'completed' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                style={{ width: `${item.progressPct}%` }}
              />
            </div>
            <p className="mt-1.5 truncate text-[10px] text-muted">
              {item.status === 'completed'
                ? 'All modules complete'
                : item.nextProblem
                  ? `Next: ${item.nextProblem.title}`
                  : `${item.modules.length} curriculum modules`}
            </p>
          </Link>
        ))}
      </div>
    </section>

    {/* Recent Activity Feed */}
    <section className="panel-card p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="section-title">Recent activity</h3>
          <p className="mt-1 text-xs text-muted">Your latest problem-solving sessions and logged submissions.</p>
        </div>
        <span className="themed-icon themed-icon-primary h-9 w-9 rounded-xl"><TrendingUp size={17}/></span>
      </div>
      {activityLog.length ? (
        <div className="space-y-4">
          {activityLog.slice(0, 12).map((event) => <ActivityRow key={event.id} event={event}/>)}
        </div>
      ) : (
        <div className="rounded-xl px-4 py-8 text-center" style={{ background: 'var(--ca-surface-muted)' }}>
          <Activity size={22} className="mx-auto text-muted"/>
          <p className="mt-3 text-xs font-semibold text-primary">Your activity will show up here</p>
          <p className="mt-1 text-[11px] text-muted">Solve a problem or spend time in the workspace to start building your history.</p>
          <Link to="/problems" className="mt-4 inline-flex items-center gap-1 text-xs font-bold themed-link">Browse problems <ArrowRight size={13}/></Link>
        </div>
      )}
    </section>
  </div>;
}

function StatCard({
  title,
  value,
  note,
  icon,
  tint,
  detail,
}: {
  title: string;
  value: string;
  note: string;
  icon: ReactNode;
  tint: string;
  detail: string;
}) {
  const colors: Record<string, string> = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300',
    cyan: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300',
    violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300',
  };
  return (
    <div className="panel-card dashboard-stat-card p-5 transition duration-200">
      <div className="flex items-center justify-between">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${colors[tint]}`}>{icon}</span>
        <span className="text-right text-[10px] font-semibold text-muted">{detail}</span>
      </div>
      <p className="mt-4 font-display text-2xl font-bold tracking-tight text-primary tabular-nums">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-primary">{title}</p>
      <p className="mt-1 text-[10px] text-muted">{note}</p>
    </div>
  );
}

function DifficultyDonut({
  items,
  totalSolved,
  totalProblems,
}: {
  items: { difficulty: Difficulty; solved: number }[];
  totalSolved: number;
  totalProblems: number;
}) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const denom = Math.max(1, totalProblems);
  const colors: Record<Difficulty, string> = {
    Easy: '#10b981',
    Medium: '#f59e0b',
    Hard: '#f43f5e',
  };

  let offset = 0;
  return (
    <div className="relative mx-auto flex h-[148px] w-[148px] items-center justify-center">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90" role="img" aria-label={`${totalSolved} of ${totalProblems} problems solved`}>
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-800"
          strokeWidth="12"
        />
        {items.map((item) => {
          const segmentLength = (item.solved / denom) * circumference;
          const dashOffset = -offset;
          offset += segmentLength;
          if (segmentLength <= 0) return null;
          return (
            <circle
              key={item.difficulty}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={colors[item.difficulty]}
              strokeWidth="12"
              strokeLinecap="butt"
              strokeDasharray={`${segmentLength} ${circumference}`}
              strokeDashoffset={dashOffset}
            />
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-2xl font-bold text-primary tabular-nums">{totalSolved}</span>
        <span className="text-[10px] font-semibold text-muted">of {totalProblems} solved</span>
      </div>
    </div>
  );
}

function VerdictTile({
  label,
  count,
  total,
  tone,
}: {
  label: string;
  count: number;
  total: number;
  tone: 'emerald' | 'rose' | 'amber' | 'slate';
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  const colorMap = {
    emerald: 'text-emerald-600 dark:text-emerald-400',
    rose: 'text-rose-600 dark:text-rose-400',
    amber: 'text-amber-600 dark:text-amber-400',
    slate: 'text-slate-600 dark:text-slate-300',
  };
  return (
    <div className="rounded-xl p-3" style={{ background: 'var(--ca-surface-muted)' }}>
      <p className="text-[10px] font-semibold text-muted">{label}</p>
      <p className={`mt-1 font-display text-lg font-bold tabular-nums ${colorMap[tone]}`}>{count}</p>
      <p className="text-[9px] text-muted tabular-nums">{pct}%</p>
    </div>
  );
}

function SubmissionTrendChart({
  trend,
}: {
  trend: { dateKey: string; label: string; accepted: number; wrongAnswer: number; other: number; total: number }[];
}) {
  const maxTotal = Math.max(1, ...trend.map((day) => day.total));
  return (
    <div className="grid grid-cols-7 items-end gap-2 sm:gap-3" aria-label="7-day submission outcome trend">
      {trend.map((day) => {
        const heightPct = day.total > 0 ? Math.max(14, Math.round((day.total / maxTotal) * 100)) : 4;
        const acceptedShare = day.total > 0 ? (day.accepted / day.total) * 100 : 0;
        const wrongShare = day.total > 0 ? (day.wrongAnswer / day.total) * 100 : 0;
        const otherShare = day.total > 0 ? (day.other / day.total) * 100 : 0;
        return (
          <div
            key={day.dateKey}
            className="flex flex-col items-center gap-1.5"
            title={`${day.label}: ${day.accepted} ${OUTCOME_META.accepted.label}, ${day.wrongAnswer} ${OUTCOME_META.wrong_answer.label}, ${day.other} other`}
          >
            <span className="text-[10px] font-semibold text-muted tabular-nums">{day.total || ''}</span>
            <div className="flex h-24 w-full max-w-12 items-end rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              <div className="flex w-full flex-col-reverse overflow-hidden rounded-lg" style={{ height: `${heightPct}%` }}>
                {acceptedShare > 0 && <div className="w-full bg-emerald-500" style={{ height: `${acceptedShare}%` }}/>}
                {wrongShare > 0 && <div className="w-full bg-rose-500" style={{ height: `${wrongShare}%` }}/>}
                {otherShare > 0 && <div className="w-full bg-amber-500" style={{ height: `${otherShare}%` }}/>}
                {day.total === 0 && <div className="h-full w-full bg-slate-300/60 dark:bg-slate-700/60"/>}
              </div>
            </div>
            <span className="text-[10px] text-muted">{day.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function AchievementCard({ badge }: { badge: MilestoneAchievement }) {
  const iconMap: Record<MilestoneAchievement['category'], ReactNode> = {
    solved: <CheckCircle2 size={16}/>,
    streak: <Flame size={16}/>,
    difficulty: <Target size={16}/>,
    breadth: <Compass size={16}/>,
    speed: <Zap size={16}/>,
    daily: <Trophy size={16}/>,
  };
  const pct = badge.target > 0 ? Math.min(100, Math.round((badge.progress / badge.target) * 100)) : 0;
  return (
    <div className={`achievement-card flex flex-col justify-between rounded-2xl p-3.5 ${badge.unlocked ? 'achievement-card-unlocked' : 'opacity-80'}`}>
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${badge.unlocked ? 'themed-icon-primary' : 'bg-slate-200/70 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
            {badge.unlocked ? iconMap[badge.category] : <Lock size={14}/>}
          </span>
          {badge.unlocked && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              Unlocked
            </span>
          )}
        </div>
        <p className="mt-3 text-xs font-bold text-primary">{badge.title}</p>
        <p className="mt-1 text-[10px] leading-4 text-muted">{badge.description}</p>
      </div>
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-[9px] font-semibold text-muted tabular-nums">
          <span>{badge.unlocked ? 'Completed' : 'Progress'}</span>
          <span>{badge.progressLabel}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
          <div
            className={`h-full rounded-full transition-all ${badge.unlocked ? 'bg-emerald-500' : 'bg-indigo-500/70'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function ActivityRow({ event }: { event: ActivityEvent }) {
  const solved = event.type === 'solved';
  return (
    <div className="flex items-center gap-3">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${solved ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'}`}>
        {solved ? <CheckCircle2 size={15}/> : <Code2 size={15}/>}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-primary">
          {solved ? 'Solved' : 'Practiced'} {event.title}
        </p>
        <p className="mt-0.5 text-[11px] text-muted">
          {event.topic} · {event.difficulty}{event.durationSeconds ? ` · ${formatSolveTime(event.durationSeconds)} est.` : ''}
        </p>
      </div>
      <span className="shrink-0 text-[10px] text-muted">{formatActivityTime(event.timestamp)}</span>
    </div>
  );
}
