import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  RotateCcw,
} from 'lucide-react';
import {
  CATEGORY_CONFIG,
  getNextAndPrevScenario,
  getReviewScenarioBySlug,
} from '../lib/review/catalog';
import { useReviewProgress } from '../lib/review/progress';
import { runReviewScenarioTests } from '../lib/review/testRunner';
import { ReviewTestResult } from '../types/review';
import FileDiffViewer from '../components/review/FileDiffViewer';
import ReviewTestPanel from '../components/review/ReviewTestPanel';
import HintLadder from '../components/review/HintLadder';

export default function ReviewStudio() {
  const { slug } = useParams<{ slug: string }>();

  const scenario = useMemo(() => {
    return slug ? getReviewScenarioBySlug(slug) : undefined;
  }, [slug]);

  const navNeighbors = useMemo(() => {
    return slug ? getNextAndPrevScenario(slug) : {};
  }, [slug]);

  const {
    getAttempt,
    saveEditedFile,
    saveEditedFilesBatch,
    resetEditedFiles,
    useHint,
    recordTestRun,
    revealReference,
  } = useReviewProgress();

  const attempt = scenario ? getAttempt(scenario.id) : undefined;

  const [activeFilename, setActiveFilename] = useState<string>(() => {
    if (!scenario) return '';
    const primary = scenario.files.find((f) => f.is_primary);
    return primary ? primary.filename : scenario.files[0]?.filename || '';
  });

  const [editedFiles, setEditedFiles] = useState<Record<string, string>>({});
  const [testResults, setTestResults] = useState<ReviewTestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);
  const autoRanSlugRef = useRef<string | null>(null);

  // Sync local editor buffers when navigating between scenarios
  useEffect(() => {
    if (!scenario) return;
    const primary = scenario.files.find((f) => f.is_primary);
    setActiveFilename(primary ? primary.filename : scenario.files[0]?.filename || '');

    const storedAttempt = getAttempt(scenario.id);
    const initialMap: Record<string, string> = {};
    for (const f of scenario.files) {
      initialMap[f.filename] = storedAttempt.editedFiles?.[f.filename] ?? f.content;
    }
    setEditedFiles(initialMap);
    setTestResults(storedAttempt.testResults || []);
    setRunError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [scenario?.id]);

  const handleRunTests = useCallback(
    async (overrideFiles?: Record<string, string>) => {
      if (!scenario || isRunning) return;
      const targetFiles = overrideFiles || editedFiles;
      setIsRunning(true);
      setRunError(null);

      try {
        const results = await runReviewScenarioTests(scenario, targetFiles);
        setTestResults(results);
        recordTestRun(scenario.id, results, scenario.review_rubric.max_score);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setRunError(msg);
      } finally {
        setIsRunning(false);
      }
    },
    [scenario, editedFiles, isRunning, recordTestRun],
  );

  // Auto-run fast in-browser JS/TS tests once on first open so failing tests appear immediately
  useEffect(() => {
    if (!scenario || !scenario.testSuite) return;
    if (scenario.testSuite.executionMode !== 'client_js') return;
    if (autoRanSlugRef.current === scenario.slug) return;
    if (Object.keys(editedFiles).length === 0) return;

    autoRanSlugRef.current = scenario.slug;
    const stored = getAttempt(scenario.id);
    if (!stored.testResults || stored.testResults.length === 0) {
      handleRunTests(editedFiles);
    }
  }, [scenario, editedFiles, getAttempt, handleRunTests]);

  // Global Ctrl+Enter / Cmd+Enter to run tests
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunTests();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleRunTests]);

  const handleUpdateFile = useCallback(
    (filename: string, nextContent: string) => {
      if (!scenario) return;
      setEditedFiles((prev) => ({ ...prev, [filename]: nextContent }));
      saveEditedFile(scenario.id, filename, nextContent);
    },
    [scenario, saveEditedFile],
  );

  const handleResetSingleFile = useCallback(
    (filename: string) => {
      if (!scenario) return;
      const starter = scenario.files.find((f) => f.filename === filename);
      if (!starter) return;
      setEditedFiles((prev) => ({ ...prev, [filename]: starter.content }));
      saveEditedFile(scenario.id, filename, starter.content);
    },
    [scenario, saveEditedFile],
  );

  const handleResetAll = useCallback(() => {
    if (!scenario) return;
    if (!window.confirm('Reset all files back to the original buggy code?')) return;
    const fresh: Record<string, string> = {};
    for (const f of scenario.files) {
      fresh[f.filename] = f.content;
    }
    setEditedFiles(fresh);
    setTestResults([]);
    setRunError(null);
    resetEditedFiles(scenario.id);
  }, [scenario, resetEditedFiles]);

  const handleApplyReferenceFix = useCallback(() => {
    if (!scenario?.testSuite?.solutionFiles) return;
    if (!window.confirm('Apply the Staff Engineer reference fix to your editor?')) return;

    const patched: Record<string, string> = { ...editedFiles };
    for (const sol of scenario.testSuite.solutionFiles) {
      patched[sol.filename] = sol.content;
    }
    setEditedFiles(patched);
    saveEditedFilesBatch(scenario.id, patched);
    handleRunTests(patched);
  }, [scenario, editedFiles, saveEditedFilesBatch, handleRunTests]);

  if (!scenario || !attempt) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-primary">Scenario Not Found</h2>
        <p className="text-sm text-muted">
          The requested debugging scenario &ldquo;{slug}&rdquo; does not exist in the active catalog.
        </p>
        <Link to="/review" className="btn-primary inline-flex items-center gap-2 mt-4">
          <ArrowLeft size={16} /> Return to Debugging Arena
        </Link>
      </div>
    );
  }

  const cat = CATEGORY_CONFIG[scenario.category];
  const isFixed = Boolean(attempt.verifiedFixed);

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
            aria-label="Back to Debugging Arena"
          >
            <ArrowLeft size={14} />
            <span>Debugging Arena</span>
          </Link>
          <span className="text-muted text-sm">/</span>
          <span className="font-mono text-xs font-bold text-indigo-500 uppercase">
            {scenario.id}
          </span>
          <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${cat.badgeBg}`}>
            {cat.name}
          </span>
        </div>

        {/* Status, Reset & Pagination */}
        <div className="flex items-center gap-2.5">
          {isFixed && (
            <span className="inline-flex items-center gap-1 font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
              <CheckCircle2 size={13} />
              Fixed &middot; {attempt.bestScore ?? scenario.review_rubric.max_score} pts
            </span>
          )}

          <button
            type="button"
            onClick={handleResetAll}
            className="btn-secondary h-9 px-3 text-xs font-semibold gap-1.5"
            title="Reset all files to buggy starter"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset Buggy Code</span>
          </button>

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
        {/* Left Column (5 cols): Incident Brief, Live Failing Tests, Hints */}
        <div className="lg:col-span-5 space-y-6">
          {/* Brief Card */}
          <section
            className="panel-card p-5 sm:p-6 border space-y-4 rounded-2xl"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
          >
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold border border-black/10 dark:border-white/10 font-mono text-muted">
                  {scenario.difficulty}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted font-mono">
                  <Clock size={12} />
                  {scenario.estimated_minutes} min fix
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
                  <span>AI Generation Context</span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  {scenario.ai_generation_context}
                </p>
              </div>
            )}

            {scenario.company_tags.length > 0 && (
              <div
                className="flex flex-wrap items-center gap-1.5 pt-2 border-t text-[11px]"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                <span className="text-[10px] uppercase font-bold text-muted mr-1">
                  Interview Context:
                </span>
                {scenario.company_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-sm font-mono text-[10px] font-semibold bg-black/5 dark:bg-white/5 text-muted border border-black/5 dark:border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* End-to-End Test Runner & Verification */}
          <ReviewTestPanel
            scenario={scenario}
            attempt={attempt}
            testResults={testResults}
            isRunning={isRunning}
            runError={runError}
            onRunTests={() => handleRunTests()}
            onRevealReference={() => revealReference(scenario.id)}
            onApplyReferenceFix={handleApplyReferenceFix}
          />

          {/* Progressive Hint Ladder */}
          <HintLadder
            plantedBugs={scenario.planted_bugs}
            hintsUsed={attempt.hintsUsed}
            onUseHint={(bugId, lvl) => useHint(scenario.id, bugId, lvl)}
          />
        </div>

        {/* Right Column (7 cols): Editable Multi-File Code & Diff Viewer */}
        <div className="lg:col-span-7 sticky top-4 space-y-4">
          <FileDiffViewer
            files={scenario.files}
            editedFiles={editedFiles}
            activeFilename={activeFilename}
            onSelectFile={(fn) => setActiveFilename(fn)}
            onUpdateFile={handleUpdateFile}
            onResetFile={handleResetSingleFile}
            plantedBugs={scenario.planted_bugs}
            showBugDecorations={Boolean(attempt.referenceRevealed)}
          />
        </div>
      </div>
    </div>
  );
}
