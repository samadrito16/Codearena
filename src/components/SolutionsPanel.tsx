import { useEffect, useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, ChevronRight, Code2, Info, Lightbulb, Lock, ShieldAlert } from 'lucide-react';
import type { ProblemEditorial, ResourceStatus } from '../services';
import type { Problem } from '../types';
import ErrorAlert from './ui/ErrorAlert';
import { CardSkeleton } from './ui/LoadingSkeleton';

interface SolutionsPanelProps {
  problem: Problem;
  editorial: ProblemEditorial | null;
  status?: ResourceStatus;
  error?: string | null;
  onRetry?: () => void;
  onBackToDescription: () => void;
}

export default function SolutionsPanel({
  problem,
  editorial,
  status = 'ready',
  error = null,
  onRetry,
  onBackToDescription,
}: SolutionsPanelProps) {
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [showCode, setShowCode] = useState(false);

  // Reset reveal toggles whenever the user switches to a different problem.
  useEffect(() => {
    setRevealedHints({});
    setShowCode(false);
  }, [problem.id]);

  if (status === 'loading') {
    return <CardSkeleton rows={4}/>;
  }

  if (status === 'error' && error) {
    const isPlanGated =
      error.toLowerCase().includes('plan') ||
      error.toLowerCase().includes('pro') ||
      error.toLowerCase().includes('premium') ||
      error.toLowerCase().includes('upgrade') ||
      error.toLowerCase().includes('unauthorized') ||
      error.toLowerCase().includes('exclusive');

    if (isPlanGated) {
      return (
        <div className="workspace-tab-empty-card p-6 space-y-4 border rounded-2xl" style={{ borderColor: 'var(--ca-border)' }}>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 mx-auto">
            <Lock size={22} />
          </div>
          <div className="space-y-1 text-center">
            <h3 className="text-sm font-bold text-primary">Pro & Premium Editorial</h3>
            <p className="text-xs text-muted leading-relaxed max-w-sm mx-auto">
              {error}
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              type="button"
              onClick={onRetry}
              className="btn-secondary py-1.5 px-4 text-xs font-semibold"
            >
              Check Again
            </button>
            <a
              href="/settings"
              className="btn-primary py-1.5 px-4 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      );
    }

    return (
      <ErrorAlert
        title="Could not load editorial"
        message={error}
        onRetry={onRetry}
        retryLabel="Retry"
      />
    );
  }

  if (!editorial) {
    return (
      <div className="workspace-tab-empty-card">
        <div className="workspace-empty-icon"><BookOpen size={20}/></div>
        <h2 className="mt-3 text-sm font-bold text-primary">Editorial not available yet</h2>
        <p className="mt-1.5 max-w-sm text-xs leading-5 text-muted">
          No static hints or walkthrough have been authored for <strong className="text-primary">{problem.title}</strong> yet. Use the problem statement, examples, and custom test cases to work through a solution.
        </p>
        {problem.topics.length > 0 && (
          <div className="mt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Related concepts to review</p>
            <div className="mt-2 flex flex-wrap justify-center gap-1.5">
              {problem.topics.map((topic) => (
                <span key={topic} className="tag-pill">{topic}</span>
              ))}
            </div>
          </div>
        )}
        <button type="button" onClick={onBackToDescription} className="btn-secondary mt-5 py-1.5 text-[11px]">
          Back to description
        </button>
      </div>
    );
  }

  function toggleHint(index: number) {
    setRevealedHints((current) => ({ ...current, [index]: !current[index] }));
  }

  return (
    <div className="space-y-5">
      {/* Official Verified Editorial Notice */}
      <div className="workspace-static-banner" role="note">
        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-400"/>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-primary">Official Editorial</span>
            <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              Verified Walkthrough
            </span>
          </div>
          <p className="mt-0.5 text-[11px] leading-5 text-muted">
            Includes the complete 3-step progressive hint ladder, algorithmic breakdown, and reference implementation. Hints stay hidden until you click to reveal them.
          </p>
        </div>
      </div>

      {/* Progressive Hints */}
      <section>
        <div className="mb-2.5 flex items-center gap-2">
          <Lightbulb size={14} className="text-amber-500"/>
          <h3 className="text-xs font-bold text-primary">Progressive hints</h3>
          <span className="text-[10px] text-muted">({editorial.hints.length})</span>
        </div>
        <div className="space-y-2">
          {editorial.hints.map((hint, index) => {
            const open = Boolean(revealedHints[index]);
            return (
              <div key={index} className="workspace-hint-card">
                <button
                  type="button"
                  onClick={() => toggleHint(index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-2 text-left text-xs font-semibold text-primary"
                >
                  <span>Hint {index + 1}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold themed-link">
                    {open ? 'Hide' : 'Reveal'}
                    {open ? <ChevronDown size={13}/> : <ChevronRight size={13}/>}
                  </span>
                </button>
                {open && (
                  <p className="mt-2 border-t pt-2 text-xs leading-5 text-muted" style={{ borderColor: 'var(--ca-border)' }}>
                    {hint}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Approach */}
      <section className="workspace-editorial-card">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xs font-bold text-primary">{editorial.approachTitle}</h3>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
            <span className="rounded-md px-2 py-0.5 font-semibold text-primary" style={{ background: 'var(--ca-surface)' }}>
              Time: {editorial.timeComplexity}
            </span>
            <span className="rounded-md px-2 py-0.5 font-semibold text-primary" style={{ background: 'var(--ca-surface)' }}>
              Space: {editorial.spaceComplexity}
            </span>
          </div>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted">{editorial.summary}</p>
        <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-xs leading-5 text-muted">
          {editorial.approachSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      {/* Common Pitfalls */}
      {editorial.pitfalls.length > 0 && (
        <section className="workspace-editorial-card">
          <div className="mb-2 flex items-center gap-1.5">
            <ShieldAlert size={13} className="text-amber-500"/>
            <h3 className="text-xs font-bold text-primary">Common pitfalls</h3>
          </div>
          <ul className="list-disc space-y-1.5 pl-4 text-xs leading-5 text-muted">
            {editorial.pitfalls.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Optional Reference Implementation (collapsed by default) */}
      {editorial.referenceCode && (
        <section className="workspace-editorial-card">
          <button
            type="button"
            onClick={() => setShowCode((prev) => !prev)}
            aria-expanded={showCode}
            className="flex w-full items-center justify-between gap-2 text-left"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold text-primary">
              <Code2 size={14} className="themed-link"/>
              <span>Reference implementation ({editorial.referenceCode.language})</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold themed-link">
              {showCode ? 'Hide code' : 'Show code'}
              {showCode ? <ChevronDown size={13}/> : <ChevronRight size={13}/>}
            </span>
          </button>
          {showCode && (
            <pre className="workspace-editorial-code mt-3">
              <code>{editorial.referenceCode.code}</code>
            </pre>
          )}
        </section>
      )}
    </div>
  );
}
