import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  Columns,
  ExternalLink,
  Flame,
  HelpCircle,
  Layers,
  Lock,
  RotateCcw,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { getMasteryProblemBySlug, getNextAndPrevProblem, PATTERN_CONFIG } from '../lib/mastery/catalog';
import { useMasteryProgress } from '../lib/mastery/progress';
import PatternClueQuiz from '../components/mastery/PatternClueQuiz';
import BruteForceCompare from '../components/mastery/BruteForceCompare';
import LockedHintLadder from '../components/mastery/LockedHintLadder';
import SubgoalBlueprintViewer from '../components/mastery/SubgoalBlueprintViewer';
import MistakeNoteBox from '../components/mastery/MistakeNoteBox';
import MasteryCodeRunner from '../components/mastery/MasteryCodeRunner';
import ActiveFillInDrill from '../components/mastery/ActiveFillInDrill';

type StudioViewTab = 'study' | 'drill' | 'code';

export default function MasteryStudio() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [studioTab, setStudioTab] = useState<StudioViewTab>('study');
  const [isSplitView, setIsSplitView] = useState<boolean>(false);

  const problem = useMemo(() => {
    return slug ? getMasteryProblemBySlug(slug) : undefined;
  }, [slug]);

  const navNeighbors = useMemo(() => {
    return slug ? getNextAndPrevProblem(slug) : {};
  }, [slug]);

  const {
    getProblemProgress,
    recordDiagnosis,
    unlockNextHint,
    recordRecall,
    saveTypedRecallDraft,
    recordDrillScore,
    recordCodeAccepted,
    saveCodeDraft,
    saveMistakeNote,
    toggleCompleted,
  } = useMasteryProgress();

  const progress = problem ? getProblemProgress(problem.id) : null;
  const isDiagnosed = Boolean(progress?.diagnosed);
  const isCompleted = Boolean(progress?.completed);
  const isCodeAccepted = Boolean(progress?.codeAccepted);

  const highRiskCount = useMemo(() => {
    return problem?.optimal_solution.code_lines.filter((l) => l.is_high_risk).length || 0;
  }, [problem]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!problem || !progress) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-primary">Blueprint Not Found</h2>
        <p className="text-sm text-muted">
          The requested pattern blueprint &ldquo;{slug}&rdquo; does not exist in the 25 Blueprints catalog.
        </p>
        <Link to="/mastery" className="btn-primary inline-flex items-center gap-2 mt-4">
          <ArrowLeft size={16} /> Return to Pattern Mastery Hub
        </Link>
      </div>
    );
  }

  const patternConfig = PATTERN_CONFIG[problem.pattern];
  const diffColors = {
    Easy: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Hard: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  }[problem.difficulty];

  const renderProblemCard = () => (
    <section
      className="panel-card p-6 sm:p-8 border space-y-6"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
      aria-labelledby="problem-statement-title"
    >
      {/* Header Metadata (Pattern is masked if not diagnosed) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-5" style={{ borderColor: 'var(--ca-border)' }}>
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 id="problem-statement-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
              {problem.title}
            </h1>
            <span className={`rounded-md px-2.5 py-0.5 text-xs font-bold border ${diffColors}`}>
              {problem.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Clock size={13} />
              {problem.estimated_minutes} min study target
            </span>
            <span>&middot;</span>
            <span>{problem.optimal_solution.code_lines.length} solution lines</span>
            <span>&middot;</span>
            <span className="font-medium text-amber-600 dark:text-amber-400">
              {highRiskCount} high-risk lines
            </span>
          </div>
        </div>

        {/* Pattern Badge (MASKED until diagnosed) */}
        <div className="shrink-0">
          {isDiagnosed ? (
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md border border-indigo-500/20 text-indigo-400 bg-indigo-500/5">
              Pattern: {patternConfig.name}
            </span>
          ) : (
            <span className="font-mono text-xs text-muted/60 px-2.5 py-1 rounded-md border border-black/10 dark:border-white/10 select-none">
              Pattern: Hidden until diagnosed
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4 text-sm text-primary leading-relaxed">
        <p className="whitespace-pre-line">{problem.statement.description}</p>
      </div>

      {/* Examples Section */}
      {problem.statement.examples.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted">Examples</h3>
          <div className="space-y-3">
            {problem.statement.examples.map((ex, idx) => (
              <div
                key={idx}
                className="rounded-xl border p-4 font-mono text-xs space-y-1.5"
                style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
              >
                <div>
                  <span className="text-muted font-bold font-sans">Input: </span>
                  <span className="text-primary">{ex.input}</span>
                </div>
                <div>
                  <span className="text-muted font-bold font-sans">Output: </span>
                  <span className="text-emerald-500 font-bold">{ex.output}</span>
                </div>
                {ex.explanation && (
                  <div className="pt-1 text-muted text-[11px] font-sans italic border-t border-black/5 dark:border-white/5">
                    <span>Explanation: </span>
                    <span>{ex.explanation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Constraints */}
      {problem.statement.constraints.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted">Constraints</h3>
          <ul className="list-disc list-inside space-y-1 text-xs text-muted font-mono">
            {problem.statement.constraints.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );

  const renderStudyModules = () => (
    <div className="space-y-8 animate-in fade-in">
      {/* Module 2: Interactive Pattern Clue Diagnosis Gate */}
      <PatternClueQuiz
        problem={problem}
        isDiagnosed={isDiagnosed}
        selectedPattern={progress.selectedPattern}
        onDiagnose={(patId) => recordDiagnosis(problem.id, patId)}
        onReveal={() => recordDiagnosis(problem.id, problem.pattern)}
      />

      {/* Conditional Modules 3, 4, 5 (Unlocked upon Diagnosis or Skip) */}
      {isDiagnosed ? (
        <div className="space-y-8 animate-in fade-in">
          {/* Module 3: Brute Force Bottleneck Analysis */}
          <BruteForceCompare
            bruteForce={problem.brute_force}
            optimalSolution={problem.optimal_solution}
            scaleBenchmark={problem.scale_benchmark}
          />

          {/* Module 3 Part 2: Progressive Locked Hint Ladder */}
          <LockedHintLadder
            hints={problem.hints}
            hintsUnlocked={progress.hintsUnlocked}
            onUnlockHint={() => unlockNextHint(problem.id, problem.hints.length)}
          />

          {/* Module 4: The Signature Subgoal Blueprint Viewer with Typed Recall Drills */}
          <SubgoalBlueprintViewer
            problem={problem}
            recallResults={progress.recallResults}
            typedDrafts={progress.typedRecallDrafts}
            onRecordRecall={(lineNum, res) => recordRecall(problem.id, lineNum, res)}
            onSaveTypedDraft={(lineNum, draft) => saveTypedRecallDraft(problem.id, lineNum, draft)}
            onSwitchToDrill={() => setStudioTab('drill')}
          />

          {/* Module 5: Personal Mistake Log & Spaced Recall Note */}
          <MistakeNoteBox
            initialNote={progress.mistakeNote}
            onSaveNote={(note) => saveMistakeNote(problem.id, note)}
          />

          {/* Bottom Track Navigation Bar */}
          <div
            className="panel-card p-6 border flex flex-wrap items-center justify-between gap-4"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted block mb-1">
                Curriculum Progression
              </span>
              <p className="text-xs text-primary font-semibold">
                {isCompleted ? '✓ Blueprint Mastered' : 'Complete this blueprint to advance your track'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {navNeighbors.prev && (
                <Link
                  to={`/mastery/${navNeighbors.prev.slug}`}
                  className="btn-secondary h-9 px-3.5 text-xs font-semibold gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>Previous ({navNeighbors.prev.title})</span>
                </Link>
              )}

              {navNeighbors.next ? (
                <Link
                  to={`/mastery/${navNeighbors.next.slug}`}
                  className="btn-primary h-9 px-4 text-xs font-semibold gap-1.5"
                >
                  <span>Next Blueprint ({navNeighbors.next.title})</span>
                  <ArrowRight size={14} />
                </Link>
              ) : (
                <Link
                  to="/mastery"
                  className="btn-primary h-9 px-4 text-xs font-semibold gap-1.5"
                >
                  <span>Track Finished &middot; Back to Hub</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="p-8 rounded-2xl border border-dashed text-center space-y-2"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
        >
          <h4 className="text-sm font-semibold text-primary">Solution Analysis Gated</h4>
          <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
            Select the algorithmic pattern above to unlock the complexity analysis and solution blueprint.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-9 space-y-8 animate-in fade-in">
      {/* Studio Top Navigation & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--ca-border)' }}>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/mastery"
            className="btn-secondary h-9 px-3 text-xs font-semibold gap-1.5"
            aria-label="Back to Pattern Mastery Hub"
          >
            <ArrowLeft size={14} />
            <span>Mastery Hub</span>
          </Link>
          <span className="text-muted text-sm">/</span>
          <span className="font-mono text-xs font-bold text-indigo-500 uppercase">
            {problem.id}
          </span>

          {/* 3-Stage Mastery Studio Switcher Tabs */}
          <div
            className="flex items-center p-1 rounded-xl border bg-black/[0.04] dark:bg-white/[0.04]"
            style={{ borderColor: 'var(--ca-border)' }}
          >
            <button
              type="button"
              onClick={() => setStudioTab('study')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                studioTab === 'study'
                  ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                  : 'text-muted hover:text-primary'
              }`}
            >
              <Layers size={13} />
              <span>Blueprint Study</span>
            </button>

            <button
              type="button"
              onClick={() => setStudioTab('drill')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                studioTab === 'drill'
                  ? 'bg-white dark:bg-slate-800 text-amber-500 shadow-sm'
                  : 'text-muted hover:text-primary'
              }`}
            >
              <Zap size={13} className={studioTab === 'drill' ? 'text-amber-500' : 'text-amber-500/70'} />
              <span>Active Drill</span>
              {progress.bestDrillScore ? (
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 font-bold">
                  {progress.bestDrillScore.recalled}/{progress.bestDrillScore.total}
                </span>
              ) : highRiskCount > 0 ? (
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-medium">
                  {highRiskCount} blanks
                </span>
              ) : null}
            </button>

            <button
              type="button"
              onClick={() => setStudioTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                studioTab === 'code'
                  ? 'bg-white dark:bg-slate-800 text-indigo-500 shadow-sm'
                  : 'text-muted hover:text-primary'
              }`}
            >
              <Code2 size={13} />
              <span>Code Runner</span>
              {isCodeAccepted && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Code verified accepted" />
              )}
            </button>
          </div>

          {/* Split View Toggle for large screens */}
          <button
            type="button"
            onClick={() => {
              const nextSplit = !isSplitView;
              setIsSplitView(nextSplit);
              if (nextSplit && studioTab === 'code') {
                setStudioTab('study');
              }
            }}
            className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
              isSplitView
                ? 'bg-indigo-500/15 text-indigo-500 border-indigo-500/30'
                : 'text-muted hover:text-primary border-black/10 dark:border-white/10'
            }`}
            title="Toggle Split Workspace (Side-by-Side Blueprint + Code Runner)"
          >
            <Columns size={13} />
            <span>{isSplitView ? 'Exit Split' : 'Split Workspace'}</span>
          </button>
        </div>

        {/* Verification Status & Pagination */}
        <div className="flex items-center gap-3">
          {isCodeAccepted && (
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 size={13} /> Code Verified
            </span>
          )}

          <button
            type="button"
            onClick={() => toggleCompleted(problem.id)}
            className={`btn-secondary h-9 px-3.5 text-xs font-bold gap-1.5 transition ${
              isCompleted
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : ''
            }`}
          >
            <CheckCircle2 size={15} className={isCompleted ? 'text-emerald-500' : 'text-muted'} />
            <span>{isCompleted ? 'Blueprint Studied' : 'Mark as Studied'}</span>
          </button>

          {navNeighbors.prev && (
            <Link
              to={`/mastery/${navNeighbors.prev.slug}`}
              className="btn-secondary h-9 px-2.5 text-xs"
              title={`Previous: ${navNeighbors.prev.title}`}
            >
              <ArrowLeft size={14} />
            </Link>
          )}

          {navNeighbors.next && (
            <Link
              to={`/mastery/${navNeighbors.next.slug}`}
              className="btn-secondary h-9 px-2.5 text-xs"
              title={`Next: ${navNeighbors.next.title}`}
            >
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* Main Workspace Layout: Split vs Fullwidth */}
      {isSplitView ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left Column: Problem + Selected Tab (Study or Drill) */}
          <div className="xl:col-span-5 space-y-6">
            {renderProblemCard()}

            {studioTab === 'drill' ? (
              <ActiveFillInDrill
                problem={problem}
                recallResults={progress.recallResults}
                typedDrafts={progress.typedRecallDrafts}
                bestScore={progress.bestDrillScore}
                onRecordRecall={(lineNum, res) => recordRecall(problem.id, lineNum, res)}
                onSaveTypedDraft={(lineNum, draft) => saveTypedRecallDraft(problem.id, lineNum, draft)}
                onSaveScore={(score) => recordDrillScore(problem.id, score)}
                onLaunchCodeRunner={() => {
                  // Code runner is already docked in split view
                }}
              />
            ) : (
              renderStudyModules()
            )}
          </div>

          {/* Right Column: Docked Monaco Code Runner */}
          <div className="xl:col-span-7 sticky top-4">
            <MasteryCodeRunner
              problem={problem}
              isAccepted={isCodeAccepted}
              onCodeAccepted={() => recordCodeAccepted(problem.id, true)}
              onSaveDraft={(lang, code) => saveCodeDraft(problem.id, lang, code)}
              isSplitView={true}
              onToggleSplitView={() => setIsSplitView(false)}
            />
          </div>
        </div>
      ) : (
        /* Fullwidth Single View */
        <div className="space-y-8">
          {renderProblemCard()}

          {studioTab === 'code' && (
            <section aria-label="Mastery live code runner">
              <MasteryCodeRunner
                problem={problem}
                isAccepted={isCodeAccepted}
                onCodeAccepted={() => recordCodeAccepted(problem.id, true)}
                onSaveDraft={(lang, code) => saveCodeDraft(problem.id, lang, code)}
                isSplitView={false}
                onToggleSplitView={() => setIsSplitView(true)}
              />
            </section>
          )}

          {studioTab === 'drill' && (
            <section aria-label="Mastery speed fill-in drill">
              <ActiveFillInDrill
                problem={problem}
                recallResults={progress.recallResults}
                typedDrafts={progress.typedRecallDrafts}
                bestScore={progress.bestDrillScore}
                onRecordRecall={(lineNum, res) => recordRecall(problem.id, lineNum, res)}
                onSaveTypedDraft={(lineNum, draft) => saveTypedRecallDraft(problem.id, lineNum, draft)}
                onSaveScore={(score) => recordDrillScore(problem.id, score)}
                onLaunchCodeRunner={() => setStudioTab('code')}
              />
            </section>
          )}

          {studioTab === 'study' && renderStudyModules()}
        </div>
      )}
    </div>
  );
}
