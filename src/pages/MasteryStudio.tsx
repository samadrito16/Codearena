import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  Flame,
  HelpCircle,
  Layers,
  Lock,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { getMasteryProblemBySlug, getNextAndPrevProblem, PATTERN_CONFIG } from '../lib/mastery/catalog';
import { useMasteryProgress } from '../lib/mastery/progress';
import PatternClueQuiz from '../components/mastery/PatternClueQuiz';
import BruteForceCompare from '../components/mastery/BruteForceCompare';
import LockedHintLadder from '../components/mastery/LockedHintLadder';
import SubgoalBlueprintViewer from '../components/mastery/SubgoalBlueprintViewer';
import MistakeNoteBox from '../components/mastery/MistakeNoteBox';

export default function MasteryStudio() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

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
    saveMistakeNote,
    toggleCompleted,
  } = useMasteryProgress();

  const progress = problem ? getProblemProgress(problem.id) : null;
  const isDiagnosed = Boolean(progress?.diagnosed);
  const isCompleted = Boolean(progress?.completed);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!problem || !progress) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-primary">Blueprint Not Found</h2>
        <p className="text-sm text-muted">
          The requested pattern blueprint &ldquo;{slug}&rdquo; does not exist in the Core 25 catalog.
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

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 lg:px-9 space-y-8 animate-in fade-in">
      {/* Studio Top Navigation & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--ca-border)' }}>
        <div className="flex items-center gap-3">
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
        </div>

        {/* Mark as Completed / Previous & Next */}
        <div className="flex items-center gap-3">
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

      {/* Module 1: Problem Statement Card */}
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
                {problem.optimal_solution.code_lines.filter((l) => l.is_high_risk).length} high-risk lines
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
                    <div className="pt-1 text-[11px] font-sans text-muted leading-relaxed">
                      <strong>Explanation:</strong> {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Constraints */}
        {problem.statement.constraints.length > 0 && (
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Constraints</h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-muted font-mono">
              {problem.statement.constraints.map((c, idx) => (
                <li key={idx}>
                  <code>{c}</code>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Module 2: Pattern Trigger Diagnosis (Active Gate) */}
      <PatternClueQuiz
        problem={problem}
        isDiagnosed={isDiagnosed}
        selectedPattern={progress.selectedPattern}
        onDiagnose={(pat) => recordDiagnosis(problem.id, pat)}
        onReveal={() => recordDiagnosis(problem.id, problem.pattern)}
      />

      {/* Modules 3, 4, 5 (Gated behind Module 2 diagnosis) */}
      {isDiagnosed ? (
        <div className="space-y-8 animate-in fade-in">
          {/* Module 3: Brute Force Bottleneck Analysis */}
          <BruteForceCompare
            bruteForce={problem.brute_force}
            optimalSolution={problem.optimal_solution}
          />

          {/* Module 3 Part 2: Progressive Locked Hint Ladder */}
          <LockedHintLadder
            hints={problem.hints}
            hintsUnlocked={progress.hintsUnlocked}
            onUnlockHint={() => unlockNextHint(problem.id, problem.hints.length)}
          />

          {/* Module 4: The Signature Subgoal Blueprint Viewer */}
          <SubgoalBlueprintViewer
            problem={problem}
            recallResults={progress.recallResults}
            onRecordRecall={(lineNum, res) => recordRecall(problem.id, lineNum, res)}
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
          <h4 className="text-sm font-semibold text-primary">
            Solution Analysis Gated
          </h4>
          <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
            Select the algorithmic pattern above to unlock the complexity analysis and solution blueprint.
          </p>
        </div>
      )}
    </div>
  );
}
