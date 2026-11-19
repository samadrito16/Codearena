import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Compass,
  HardDrive,
  Lock,
  Play,
  Sparkles,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import ErrorAlert from '../components/ui/ErrorAlert';
import { CardSkeleton } from '../components/ui/LoadingSkeleton';
import { useApp } from '../context/AppContext';
import { useLearningPaths, useProblems } from '../hooks/useDataServices';
import {
  evaluateAllLearningPaths,
  findContinueLearningTarget,
  type EvaluatedLearningPath,
  type EvaluatedModule,
} from '../lib/progress';
import { DifficultyBadge } from './Dashboard';

export default function LearningPaths() {
  const { pathId } = useParams();
  const { solvedIds } = useApp();
  const { data: problems } = useProblems();
  const { data: learningPaths, status: pathsStatus, error: pathsError, retry: retryPaths } = useLearningPaths();
  const [guidedSequence, setGuidedSequence] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const evaluatedPaths = useMemo(
    () => evaluateAllLearningPaths(learningPaths, problems, solvedIds, guidedSequence),
    [learningPaths, problems, solvedIds, guidedSequence],
  );

  const continueTarget = useMemo(
    () => findContinueLearningTarget(evaluatedPaths),
    [evaluatedPaths],
  );

  const focusedPath = useMemo(
    () => (pathId ? evaluatedPaths.find((item) => item.path.id === pathId) ?? null : null),
    [evaluatedPaths, pathId],
  );

  // Auto-expand the first active/in-progress path on initial roadmap view.
  useEffect(() => {
    if (pathId) return;
    if (Object.keys(expandedIds).length > 0) return;
    const defaultOpen = continueTarget?.path.path.id ?? evaluatedPaths[0]?.path.id;
    if (defaultOpen) {
      setExpandedIds({ [defaultOpen]: true });
    }
  }, [pathId, continueTarget, evaluatedPaths, expandedIds]);

  const totalCompletedPaths = evaluatedPaths.filter((item) => item.status === 'completed').length;
  const totalAvailableModules = evaluatedPaths.reduce((sum, item) => sum + item.availableModules, 0);
  const totalCompletedModules = evaluatedPaths.reduce((sum, item) => sum + item.completedModules, 0);

  function toggleExpanded(id: string) {
    setExpandedIds((current) => ({ ...current, [id]: !current[id] }));
  }

  if (pathsStatus === 'loading') {
    return (
      <div className="space-y-4">
        <CardSkeleton rows={3}/>
        <div className="grid gap-4 md:grid-cols-2">
          <CardSkeleton rows={3}/>
          <CardSkeleton rows={3}/>
        </div>
      </div>
    );
  }

  if (pathsStatus === 'error' && pathsError) {
    return (
      <div className="mx-auto max-w-2xl py-8">
        <ErrorAlert
          title="Could not load learning paths"
          message={pathsError}
          onRetry={retryPaths}
          retryLabel="Retry"
        />
      </div>
    );
  }

  // Explicit Not Found state for invalid /learning-paths/:pathId URLs
  if (pathId && !focusedPath) {
    return (
      <div className="mx-auto max-w-xl py-10">
        <EmptyState
          icon={<Compass size={22}/>}
          title="Learning path not found"
          description={`No learning path matches "${pathId}". Choose one of the ${learningPaths.length} curated DSA paths or explore the problem library.`}
          action={
            <Link to="/learning-paths" className="btn-primary text-xs">
              <ArrowLeft size={14}/> View all learning paths
            </Link>
          }
          secondaryAction={
            <Link to="/problems" className="btn-secondary text-xs">
              Browse problems
            </Link>
          }
        />
      </div>
    );
  }

  // Dedicated Learning Path Detail View (/learning-paths/:pathId)
  if (focusedPath) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/learning-paths" className="btn-secondary py-1.5 text-xs">
            <ArrowLeft size={14}/> All learning paths
          </Link>
          <GuidedSequenceToggle enabled={guidedSequence} onToggle={() => setGuidedSequence((prev) => !prev)}/>
        </div>

        <section className="panel-card weekly-report-card p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg px-2 py-0.5 font-mono text-[10px] font-bold" style={{ background: 'var(--ca-surface)', color: 'var(--ca-accent-solid)' }}>
                  PATH {String(focusedPath.path.order).padStart(2, '0')}
                </span>
                <PathStatusBadge status={focusedPath.status}/>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                  <Clock3 size={12}/> {focusedPath.path.estimatedHours}
                </span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-primary sm:text-[28px]">
                {focusedPath.path.title}
              </h2>
              <p className="mt-1.5 max-w-2xl text-xs leading-6 text-muted">{focusedPath.path.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {focusedPath.path.topics.map((topic) => (
                  <span key={topic} className="tag-pill">{topic}</span>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
              {focusedPath.nextProblem ? (
                <Link to={`/workspace/${focusedPath.nextProblem.id}`} className="btn-primary">
                  Continue learning <ArrowRight size={15}/>
                </Link>
              ) : focusedPath.totalProblems > 0 ? (
                <Link to={`/workspace/${focusedPath.modules[0]?.problems[0]?.id ?? 'two-sum'}`} className="btn-secondary">
                  Review path <ArrowUpRight size={14}/>
                </Link>
              ) : (
                <Link to="/admin" className="btn-secondary">
                  Add problems in Admin <ArrowUpRight size={14}/>
                </Link>
              )}
              <span className="text-[11px] font-semibold text-muted tabular-nums">
                {focusedPath.solvedCount}/{focusedPath.totalProblems} local problems solved · {focusedPath.completedModules}/{focusedPath.availableModules} active modules complete
              </span>
            </div>
          </div>

          <div className="mt-5">
            <div className="h-2 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
              <div className="progress-fill" style={{ width: `${focusedPath.progressPct}%` }}/>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          {focusedPath.modules.map((mod) => (
            <ModuleCard key={mod.module.id} evaluated={mod} solvedIds={solvedIds}/>
          ))}
        </section>

        <RoadmapBoundaryNotice/>
      </div>
    );
  }

  // Main Roadmap Overview (/learning-paths)
  return (
    <div className="space-y-6">
      <section className="page-heading-row">
        <div>
          <h2 className="page-title mt-0">Learning paths</h2>
          <p className="page-subtitle">Follow a structured 8-path DSA curriculum tracked against your local solved problems.</p>
        </div>
        <GuidedSequenceToggle enabled={guidedSequence} onToggle={() => setGuidedSequence((prev) => !prev)}/>
      </section>

      {/* Continue Learning Banner */}
      <section className="panel-card weekly-report-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="themed-icon themed-icon-primary h-8 w-8 rounded-xl"><Compass size={16}/></span>
              <h3 className="section-title">
                {continueTarget ? 'Next up in your roadmap' : 'All available roadmap problems solved'}
              </h3>
            </div>
            {continueTarget ? (
              <p className="mt-2.5 text-sm leading-6 text-primary">
                <strong>{continueTarget.path.path.title}</strong> · Module {continueTarget.module.module.order}: {continueTarget.module.module.title} — next problem:{' '}
                <strong className="themed-link">{continueTarget.problem.title}</strong>
              </p>
            ) : (
              <p className="mt-2.5 text-xs leading-5 text-muted">
                You have completed every currently available roadmap problem in this browser. Add more questions in Admin to unlock upcoming modules.
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted tabular-nums">
              <span><strong className="text-primary">{totalCompletedPaths}</strong> / {evaluatedPaths.length} paths complete</span>
              <span>·</span>
              <span><strong className="text-primary">{totalCompletedModules}</strong> / {totalAvailableModules} active modules complete</span>
            </div>
          </div>

          {continueTarget ? (
            <Link to={`/workspace/${continueTarget.problem.id}`} className="btn-primary shrink-0">
              Continue learning <ArrowRight size={15}/>
            </Link>
          ) : (
            <Link to="/problems" className="btn-secondary shrink-0">
              Browse library <ArrowUpRight size={14}/>
            </Link>
          )}
        </div>
      </section>

      {/* 8 Expandable Pathway Cards */}
      <section className="space-y-4">
        {evaluatedPaths.map((item) => {
          const isExpanded = Boolean(expandedIds[item.path.id]);
          const accentClass = item.path.accent === 'a'
            ? 'track-accent-a'
            : item.path.accent === 'b'
              ? 'track-accent-b'
              : 'track-accent-c';

          return (
            <article key={item.path.id} className="panel-card overflow-hidden">
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-1 items-start gap-3.5">
                    <span className={`track-icon ${accentClass} font-mono text-xs font-extrabold`}>
                      {String(item.path.order).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to={`/learning-paths/${item.path.id}`}
                          className="font-display text-base font-bold text-primary hover:underline sm:text-lg"
                        >
                          {item.path.title}
                        </Link>
                        <PathStatusBadge status={item.status}/>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-muted">{item.path.description}</p>
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        {item.path.topics.map((topic) => (
                          <span key={topic} className="tag-pill">{topic}</span>
                        ))}
                        <span className="ml-1 inline-flex items-center gap-1 text-[10px] text-muted">
                          <Clock3 size={11}/> {item.path.estimatedHours}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {item.nextProblem && (
                      <Link to={`/workspace/${item.nextProblem.id}`} className="btn-primary py-2 text-[11px]">
                        <Play size={12}/> Continue learning
                      </Link>
                    )}
                    <Link to={`/learning-paths/${item.path.id}`} className="btn-secondary py-2 text-[11px]">
                      Details <ArrowUpRight size={13}/>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleExpanded(item.path.id)}
                      aria-expanded={isExpanded}
                      className="btn-secondary py-2 text-[11px]"
                    >
                      {isExpanded ? <><ChevronUp size={13}/> Hide modules</> : <><ChevronDown size={13}/> Modules ({item.modules.length})</>}
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="h-2 min-w-[160px] flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="progress-fill" style={{ width: `${item.progressPct}%` }}/>
                  </div>
                  <span className="text-[11px] font-bold text-primary tabular-nums">
                    {item.totalProblems > 0
                      ? `${item.solvedCount}/${item.totalProblems} solved (${item.progressPct}%)`
                      : 'Curriculum preview · 0 local problems'}
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="space-y-3 border-t p-4 sm:p-5" style={{ borderColor: 'var(--ca-border)', background: 'color-mix(in srgb, var(--ca-surface-muted) 42%, var(--ca-surface))' }}>
                  {item.modules.map((mod) => (
                    <ModuleCard key={mod.module.id} evaluated={mod} solvedIds={solvedIds}/>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </section>

      <RoadmapBoundaryNotice/>
    </div>
  );
}

function ModuleCard({
  evaluated,
  solvedIds,
}: {
  evaluated: EvaluatedModule;
  solvedIds: string[];
}) {
  const { module: mod, problems, solvedCount, totalCount, status } = evaluated;
  const isLocked = status === 'locked';
  const isUpcoming = status === 'upcoming';
  const isCompleted = status === 'completed';

  return (
    <div
      className={`rounded-2xl border p-4 transition ${isLocked || isUpcoming ? 'opacity-85' : ''}`}
      style={{
        borderColor: status === 'active'
          ? 'color-mix(in srgb, var(--ca-accent-solid) 38%, var(--ca-border))'
          : 'var(--ca-border)',
        background: 'var(--ca-surface)',
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-muted">MODULE {mod.order}</span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                <CheckCircle2 size={10}/> Completed
              </span>
            )}
            {status === 'active' && (
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: 'color-mix(in srgb, var(--ca-accent-solid) 14%, var(--ca-surface))', color: 'var(--ca-accent-solid)' }}>
                <Sparkles size={10}/> Active
              </span>
            )}
            {isLocked && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <Lock size={10}/> Locked · Complete previous module
              </span>
            )}
            {isUpcoming && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                <BookOpen size={10}/> Upcoming curriculum
              </span>
            )}
          </div>
          <h4 className="mt-1 text-sm font-bold text-primary">{mod.title}</h4>
          <p className="mt-1 text-xs leading-5 text-muted">{mod.summary}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {mod.concepts.map((concept) => (
              <span key={concept} className="tag-pill">{concept}</span>
            ))}
          </div>
        </div>

        <span className="shrink-0 text-[11px] font-bold text-muted tabular-nums">
          {totalCount > 0 ? `${solvedCount}/${totalCount} solved` : 'No local problems yet'}
        </span>
      </div>

      {problems.length > 0 ? (
        <div className="mt-3.5 space-y-2 border-t pt-3" style={{ borderColor: 'var(--ca-border)' }}>
          {problems.map((problem) => {
            const solved = solvedIds.includes(problem.id);
            return (
              <div
                key={problem.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2.5"
                style={{ borderColor: 'var(--ca-border)', background: 'color-mix(in srgb, var(--ca-surface-muted) 45%, var(--ca-surface))' }}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  {solved ? (
                    <CheckCircle2 size={15} className="shrink-0 text-emerald-500"/>
                  ) : isLocked ? (
                    <Lock size={14} className="shrink-0 text-muted"/>
                  ) : (
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2" style={{ borderColor: 'var(--ca-accent-solid)' }}/>
                  )}
                  <span className="truncate text-xs font-bold text-primary">{problem.title}</span>
                  <DifficultyBadge difficulty={problem.difficulty}/>
                </div>
                {isLocked ? (
                  <span className="text-[10px] font-semibold text-muted">Finish Module {mod.order - 1} to unlock</span>
                ) : (
                  <Link to={`/workspace/${problem.id}`} className="inline-flex items-center gap-1 text-[11px] font-bold themed-link">
                    {solved ? 'Review' : 'Start'} <ArrowUpRight size={12}/>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-dashed px-3 py-2.5 text-[11px] text-muted" style={{ borderColor: 'var(--ca-border)' }}>
          <span>No matching problems in your local library yet for {mod.topicTags.join(', ')}.</span>
          <Link to="/admin" className="font-bold themed-link">Add via Admin <ArrowUpRight size={11} className="inline"/></Link>
        </div>
      )}
    </div>
  );
}

function PathStatusBadge({ status }: { status: EvaluatedLearningPath['status'] }) {
  const styles: Record<EvaluatedLearningPath['status'], { label: string; cls: string }> = {
    completed: {
      label: 'Completed',
      cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    },
    in_progress: {
      label: 'In progress',
      cls: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
    },
    ready: {
      label: 'Ready',
      cls: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
    },
    upcoming: {
      label: 'Upcoming',
      cls: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    },
  };
  const meta = styles[status];
  return <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${meta.cls}`}>{meta.label}</span>;
}

function GuidedSequenceToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
      <Lock size={12} className="themed-link"/>
      <span className="text-[11px] font-semibold text-primary">Guided lock sequence</span>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="Toggle guided module locking"
        onClick={onToggle}
        className={`workspace-switch ${enabled ? 'workspace-switch-on' : ''}`}
      >
        <span className="workspace-switch-thumb"/>
      </button>
    </div>
  );
}

function RoadmapBoundaryNotice() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[11px] text-muted">
      <HardDrive size={13} className="themed-link"/>
      <span>
        This roadmap uses static curriculum definitions and your browser-local solved problems. Personalized recommendations based on judge wrong answers or peer histories require a backend.
      </span>
    </div>
  );
}
