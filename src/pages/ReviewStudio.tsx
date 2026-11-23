import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCode2,
  HelpCircle,
  Layers,
  RotateCcw,
  Shield,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import {
  CATEGORY_CONFIG,
  getNextAndPrevScenario,
  getReviewScenarioBySlug,
} from '../lib/review/catalog';
import { useReviewProgress } from '../lib/review/progress';
import FileDiffViewer from '../components/review/FileDiffViewer';
import AnnotationPanel from '../components/review/AnnotationPanel';
import RubricGrader from '../components/review/RubricGrader';
import HintLadder from '../components/review/HintLadder';

export default function ReviewStudio() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const scenario = useMemo(() => {
    return slug ? getReviewScenarioBySlug(slug) : undefined;
  }, [slug]);

  const navNeighbors = useMemo(() => {
    return slug ? getNextAndPrevScenario(slug) : {};
  }, [slug]);

  const {
    getAttempt,
    addAnnotation,
    removeAnnotation,
    useHint,
    recordGrade,
    revealReference,
  } = useReviewProgress();

  const attempt = scenario ? getAttempt(scenario.id) : undefined;

  const [activeFilename, setActiveFilename] = useState<string>(() => {
    if (!scenario) return '';
    const primary = scenario.files.find((f) => f.is_primary);
    return primary ? primary.filename : scenario.files[0]?.filename || '';
  });

  const [selectedLine, setSelectedLine] = useState<number | undefined>(undefined);

  // Sync active filename on slug change
  useEffect(() => {
    if (scenario) {
      const primary = scenario.files.find((f) => f.is_primary);
      setActiveFilename(primary ? primary.filename : scenario.files[0]?.filename || '');
      setSelectedLine(undefined);
    }
  }, [scenario]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!scenario || !attempt) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-primary">Review Scenario Not Found</h2>
        <p className="text-sm text-muted">
          The requested code review challenge &ldquo;{slug}&rdquo; does not exist in the active catalog.
        </p>
        <Link to="/review" className="btn-primary inline-flex items-center gap-2 mt-4">
          <ArrowLeft size={16} /> Return to Review Arena
        </Link>
      </div>
    );
  }

  const cat = CATEGORY_CONFIG[scenario.category];
  const isCompleted = attempt.score !== undefined;

  return (
    <div className="mx-auto max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8 space-y-6 animate-in fade-in">
      {/* Studio Top Navigation & Status */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/review"
            className="btn-secondary h-9 px-3 text-xs font-semibold gap-1.5"
            aria-label="Back to Review Arena"
          >
            <ArrowLeft size={14} />
            <span>Review Arena</span>
          </Link>
          <span className="text-muted text-sm">/</span>
          <span className="font-mono text-xs font-bold text-indigo-500 uppercase">
            {scenario.id}
          </span>
          <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${cat.badgeBg}`}>
            {cat.name}
          </span>
        </div>

        {/* Status and Pagination */}
        <div className="flex items-center gap-3">
          {isCompleted && (
            <span className="inline-flex items-center gap-1 font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
              <CheckCircle2 size={13} />
              Score: {attempt.score}/{scenario.review_rubric.max_score} pts
            </span>
          )}

          {navNeighbors.prev && (
            <Link
              to={`/review/${navNeighbors.prev.slug}`}
              className="btn-secondary h-9 px-2.5 text-xs"
              title={`Previous: ${navNeighbors.prev.title}`}
            >
              <ArrowLeft size={14} />
            </Link>
          )}

          {navNeighbors.next && (
            <Link
              to={`/review/${navNeighbors.next.slug}`}
              className="btn-secondary h-9 px-2.5 text-xs"
              title={`Next: ${navNeighbors.next.title}`}
            >
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* Main 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Scenario Brief, Annotations, Rubric & Hints */}
        <div className="lg:col-span-5 space-y-6">
          {/* Brief Card */}
          <section
            className="panel-card p-5 sm:p-6 border space-y-4 rounded-2xl"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
          >
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-black/10 dark:border-white/10 font-mono text-muted">
                  {scenario.difficulty}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted font-mono">
                  <Clock size={12} />
                  {scenario.estimated_minutes} min audit
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
                {scenario.title}
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-primary/90 leading-relaxed whitespace-pre-line">
              {scenario.context}
            </p>

            {scenario.ai_generation_context && (
              <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400">
                  <Bot size={13} />
                  <span>AI Generation Brief</span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  {scenario.ai_generation_context}
                </p>
              </div>
            )}

            {scenario.company_tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t text-[11px]" style={{ borderColor: 'var(--ca-border)' }}>
                <span className="text-[10px] uppercase font-bold text-muted mr-1">Interview Context:</span>
                {scenario.company_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-black/5 dark:bg-white/5 text-muted border border-black/5 dark:border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Annotations List & Add Form */}
          <AnnotationPanel
            files={scenario.files}
            activeFilename={activeFilename}
            annotations={attempt.annotations}
            selectedLine={selectedLine}
            onAddAnnotation={(ann) => addAnnotation(scenario.id, ann)}
            onRemoveAnnotation={(annId) => removeAnnotation(scenario.id, annId)}
            onSelectLine={(fn, line) => {
              setActiveFilename(fn);
              setSelectedLine(line);
            }}
          />

          {/* Rubric Grader & Scorecard */}
          <RubricGrader
            scenario={scenario}
            annotations={attempt.annotations}
            attempt={attempt}
            onGrade={(score, maxScore, matchedBugIds) =>
              recordGrade(scenario.id, score, maxScore, matchedBugIds)
            }
            onRevealReference={() => revealReference(scenario.id)}
          />

          {/* Progressive Hint Ladder */}
          <HintLadder
            plantedBugs={scenario.planted_bugs}
            hintsUsed={attempt.hintsUsed}
            onUseHint={(bugId, lvl) => useHint(scenario.id, bugId, lvl)}
          />
        </div>

        {/* Right Column (7 cols): Monaco Multi-File Code Diff Viewer */}
        <div className="lg:col-span-7 sticky top-4 space-y-4">
          <FileDiffViewer
            files={scenario.files}
            activeFilename={activeFilename}
            onSelectFile={(fn) => {
              setActiveFilename(fn);
              setSelectedLine(undefined);
            }}
            annotations={attempt.annotations}
            selectedLine={selectedLine}
            onSelectLine={(line) => setSelectedLine(line)}
            plantedBugs={scenario.planted_bugs}
            showBugDecorations={Boolean(attempt.referenceRevealed)}
          />
        </div>
      </div>
    </div>
  );
}
