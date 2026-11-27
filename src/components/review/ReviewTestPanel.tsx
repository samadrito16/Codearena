import React from 'react';
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Eye,
  Loader2,
  Play,
  Sparkles,
  Terminal,
  Trophy,
  Wrench,
  XCircle,
} from 'lucide-react';
import {
  ReviewScenario,
  ReviewTestResult,
  ScenarioAttempt,
} from '../../types/review';

interface ReviewTestPanelProps {
  scenario: ReviewScenario;
  attempt: ScenarioAttempt;
  testResults: ReviewTestResult[];
  isRunning: boolean;
  runError: string | null;
  onRunTests: () => void;
  onRevealReference: () => void;
  onApplyReferenceFix: () => void;
}

export default function ReviewTestPanel({
  scenario,
  attempt,
  testResults,
  isRunning,
  runError,
  onRunTests,
  onRevealReference,
  onApplyReferenceFix,
}: ReviewTestPanelProps) {
  const testCases = scenario.testSuite?.testCases || [];
  const totalCount = testCases.length;
  const hasRun = testResults.length > 0;
  const passedCount = testResults.filter((r) => r.passed).length;
  const allPassed = hasRun && passedCount === totalCount && totalCount > 0;
  const isReferenceRevealed = Boolean(attempt.referenceRevealed);
  const execModeLabel =
    scenario.testSuite?.executionMode === 'client_js'
      ? 'Instant Sandbox'
      : 'Isolated Container (Python 3)';

  return (
    <div
      className="panel-card p-5 border space-y-5 rounded-2xl"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      {/* Header + Run Button */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b pb-4"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
              allPassed
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
            }`}
          >
            {allPassed ? <Trophy size={16} /> : <Terminal size={16} />}
          </div>
          <div>
            <h4 className="text-sm font-bold text-primary">End-to-End Verification Suite</h4>
            <p className="text-[11px] text-muted">{execModeLabel} &middot; {totalCount} test cases</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRunTests}
          disabled={isRunning}
          className={`h-9 px-4 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-md transition disabled:opacity-60 ${
            allPassed
              ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
              : 'btn-primary'
          }`}
        >
          {isRunning ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              <span>Running Suite...</span>
            </>
          ) : (
            <>
              <Play size={13} className="fill-current" />
              <span>{hasRun ? 'Re-Run Tests' : 'Run Failing Tests'}</span>
            </>
          )}
        </button>
      </div>

      {/* Status Summary Banner */}
      {runError && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-400 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <AlertTriangle size={14} />
            <span>Execution Error</span>
          </div>
          <pre className="font-mono text-[11px] whitespace-pre-wrap break-words opacity-90">
            {runError}
          </pre>
        </div>
      )}

      {hasRun && (
        <div
          className={`rounded-2xl border p-4 flex flex-wrap items-center justify-between gap-3 ${
            allPassed
              ? 'border-emerald-500/30 bg-emerald-500/[0.06]'
              : 'border-rose-500/25 bg-rose-500/[0.04]'
          }`}
        >
          <div className="flex items-center gap-3">
            {allPassed ? (
              <CheckCircle2 size={22} className="text-emerald-500 shrink-0" />
            ) : (
              <XCircle size={22} className="text-rose-500 shrink-0" />
            )}
            <div>
              <div className="text-xs font-bold text-primary">
                {allPassed
                  ? `Bug Fixed Verified — ${scenario.review_rubric.max_score} pts Earned`
                  : `${totalCount - passedCount} of ${totalCount} Tests Failing`}
              </div>
              <div className="text-[11px] text-muted">
                {allPassed
                  ? 'All regression checks and bug assertions passed against your patched code.'
                  : 'Patch the repository files on the right and re-run until every test turns green.'}
              </div>
            </div>
          </div>

          <span
            className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${
              allPassed
                ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                : 'bg-rose-500/15 text-rose-500 border-rose-500/30'
            }`}
          >
            {passedCount} / {totalCount} Passing
          </span>
        </div>
      )}

      {/* Test Cases List */}
      <div className="space-y-2.5">
        {testCases.map((tc, idx) => {
          const res = testResults.find((r) => r.testId === tc.id);
          const status = !res ? 'pending' : res.passed ? 'passed' : 'failed';

          return (
            <div
              key={tc.id}
              className="rounded-xl border p-3.5 text-xs space-y-2 transition-colors"
              style={{
                borderColor:
                  status === 'passed'
                    ? 'rgba(16, 185, 129, 0.3)'
                    : status === 'failed'
                    ? 'rgba(244, 63, 94, 0.35)'
                    : 'var(--ca-border)',
                background:
                  status === 'passed'
                    ? 'rgba(16, 185, 129, 0.04)'
                    : status === 'failed'
                    ? 'rgba(244, 63, 94, 0.04)'
                    : 'var(--ca-surface-muted)',
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-muted">
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-primary leading-snug">{tc.title}</span>
                  </div>
                  <p className="text-[11px] text-muted leading-relaxed">{tc.description}</p>
                </div>

                <span
                  className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-sm border shrink-0 ${
                    status === 'passed'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      : status === 'failed'
                      ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                      : 'bg-black/5 dark:bg-white/5 text-muted border-black/10 dark:border-white/10'
                  }`}
                >
                  {status === 'passed' ? 'PASS' : status === 'failed' ? 'FAIL' : 'READY'}
                </span>
              </div>

              {res && !res.passed && (
                <div className="mt-2 pt-2 border-t border-rose-500/20 font-mono text-[11px] space-y-1">
                  {res.error && (
                    <div className="text-rose-400 break-words">
                      <span className="font-bold">Error:</span> {res.error}
                    </div>
                  )}
                  {res.expected && (
                    <div className="text-emerald-500/90 break-words">
                      <span className="font-bold">Expected:</span> {res.expected}
                    </div>
                  )}
                  {res.actual && (
                    <div className="text-rose-400 break-words">
                      <span className="font-bold">Actual:</span> {res.actual}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reference Fix Section */}
      {!isReferenceRevealed ? (
        <div className="p-4 rounded-xl border border-dashed border-indigo-500/30 bg-indigo-500/5 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs space-y-0.5">
            <div className="font-bold text-primary">Stuck or Done? Inspect Staff Reference Fix</div>
            <div className="text-[11px] text-muted">
              Reveal the root cause explanation and canonical multi-file patch.
            </div>
          </div>
          <button
            type="button"
            onClick={onRevealReference}
            className="btn-secondary h-8 px-3 text-xs font-semibold gap-1.5"
          >
            <Eye size={13} />
            <span>Reveal Reference Fix</span>
          </button>
        </div>
      ) : (
        <div
          className="space-y-4 pt-3 border-t animate-in fade-in"
          style={{ borderColor: 'var(--ca-border)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Award size={15} className="text-indigo-500" />
              <h5 className="text-xs font-bold uppercase tracking-wider text-primary">
                Staff Engineer Reference Fix
              </h5>
            </div>

            {scenario.testSuite?.solutionFiles && (
              <button
                type="button"
                onClick={onApplyReferenceFix}
                className="btn-secondary h-7 px-2.5 text-[11px] font-semibold gap-1 text-indigo-500 border-indigo-500/30"
              >
                <Wrench size={11} />
                <span>Apply Patch to Editor</span>
              </button>
            )}
          </div>

          <div
            className="p-4 rounded-xl border font-sans text-xs text-primary leading-relaxed whitespace-pre-wrap"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
          >
            {scenario.reference_review}
          </div>

          <div className="space-y-2">
            <h6 className="text-[11px] font-bold uppercase tracking-wider text-muted">
              Root Causes Addressed
            </h6>
            {scenario.planted_bugs.map((bug) => (
              <div
                key={bug.bug_id}
                className="rounded-xl border p-3 text-xs space-y-1"
                style={{
                  borderColor: 'var(--ca-border)',
                  background: 'var(--ca-surface-muted)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-primary">{bug.title}</span>
                  <span className="font-mono text-[10px] text-muted shrink-0">
                    {bug.file}:L{bug.line_range[0]}-L{bug.line_range[1]}
                  </span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">{bug.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
