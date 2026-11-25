import React, { useEffect, useState, useMemo } from 'react';
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Copy,
  GraduationCap,
  Heart,
  HelpCircle,
  Info,
  Lightbulb,
  Lock,
  Plus,
  ShieldAlert,
  Sparkles,
  Users,
} from 'lucide-react';
import type { ProblemEditorial, ResourceStatus } from '../services';
import type { PeerSolution, Problem } from '../types';
import {
  getStoredPeerSolutions,
  togglePeerSolutionUpvote,
} from '../lib/peerSolutionStorage';
import ShareSolutionModal from './ShareSolutionModal';
import ErrorAlert from './ui/ErrorAlert';
import { CardSkeleton } from './ui/LoadingSkeleton';

interface SolutionsPanelProps {
  problem: Problem;
  editorial: ProblemEditorial | null;
  status?: ResourceStatus;
  error?: string | null;
  onRetry?: () => void;
  onBackToDescription: () => void;
  currentCode?: string;
  currentLanguage?: string;
}

export default function SolutionsPanel({
  problem,
  editorial,
  status = 'ready',
  error = null,
  onRetry,
  onBackToDescription,
  currentCode = '',
  currentLanguage = 'python',
}: SolutionsPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<'editorial' | 'peer'>('peer');
  const [peerSolutions, setPeerSolutions] = useState<PeerSolution[]>(() =>
    getStoredPeerSolutions(problem.id)
  );
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<string>('all');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [showEditorialCode, setShowEditorialCode] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Sync peer solutions when problem changes
  useEffect(() => {
    setPeerSolutions(getStoredPeerSolutions(problem.id));
    setRevealedHints({});
    setShowEditorialCode(false);
  }, [problem.id]);

  const handleUpvote = (solutionId: string) => {
    const res = togglePeerSolutionUpvote(problem.id, solutionId);
    setPeerSolutions((prev) =>
      prev.map((sol) =>
        sol.id === solutionId
          ? { ...sol, upvotes: res.upvotes, hasUpvoted: res.hasUpvoted }
          : sol
      )
    );
  };

  const handleSolutionPublished = (newSol: PeerSolution) => {
    setPeerSolutions((prev) => [newSol, ...prev]);
  };

  const handleCopyCode = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const filteredPeerSolutions = useMemo(() => {
    if (selectedLanguageFilter === 'all') return peerSolutions;
    return peerSolutions.filter(
      (s) => s.language.toLowerCase() === selectedLanguageFilter.toLowerCase()
    );
  }, [peerSolutions, selectedLanguageFilter]);

  function toggleHint(index: number) {
    setRevealedHints((current) => ({ ...current, [index]: !current[index] }));
  }

  return (
    <div className="space-y-4">
      {/* Top Segmented SubTab Switcher: Peer Solutions vs Official Editorial */}
      <div
        className="flex items-center justify-between border-b pb-2"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--ca-surface-muted)] text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveSubTab('peer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'peer'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-muted hover:text-primary'
            }`}
          >
            <Users size={13} />
            <span>Peer Solutions</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                activeSubTab === 'peer' ? 'bg-white/20 text-white' : 'bg-slate-500/10 text-muted'
              }`}
            >
              {peerSolutions.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('editorial')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'editorial'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-muted hover:text-primary'
            }`}
          >
            <BookOpen size={13} />
            <span>Official Editorial</span>
          </button>
        </div>

        {activeSubTab === 'peer' && (
          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition-colors"
          >
            <Plus size={14} />
            <span>Share Solution</span>
          </button>
        )}
      </div>

      {/* ======================================================== */}
      {/* SUBTAB 1: PEER SOLUTIONS (EXPLAIN IN YOUR OWN WORDS)      */}
      {/* ======================================================== */}
      {activeSubTab === 'peer' && (
        <div className="space-y-4">
          {/* Quality Philosophy Banner */}
          <div
            className="flex items-center justify-between gap-3 p-3 rounded-2xl border text-xs"
            style={{
              borderColor: 'color-mix(in srgb, var(--ca-accent-solid) 20%, var(--ca-border))',
              backgroundColor: 'color-mix(in srgb, var(--ca-accent-solid) 6%, var(--ca-surface))',
            }}
          >
            <div className="flex items-center gap-2">
              <Lightbulb size={16} className="text-amber-400 shrink-0" />
              <p className="text-[11px] text-muted leading-relaxed">
                Every peer solution requires an <strong className="text-primary">"Explain It In Your Own Words"</strong> intuition note so you understand the logic, not just the code.
              </p>
            </div>

            {/* Language filter pills */}
            <div className="flex items-center gap-1 text-[11px] shrink-0">
              {['all', 'python', 'cpp', 'javascript'].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguageFilter(lang)}
                  className={`px-2 py-0.5 rounded-md font-medium capitalize transition-colors ${
                    selectedLanguageFilter === lang
                      ? 'bg-indigo-600 text-white'
                      : 'text-muted hover:text-primary bg-[var(--ca-surface-muted)]'
                  }`}
                >
                  {lang === 'all' ? 'All' : lang === 'cpp' ? 'C++' : lang}
                </button>
              ))}
            </div>
          </div>

          {/* Solutions Feed */}
          {filteredPeerSolutions.length === 0 ? (
            <div
              className="rounded-2xl border p-8 text-center space-y-3"
              style={{
                borderColor: 'var(--ca-border)',
                backgroundColor: 'var(--ca-surface)',
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mx-auto">
                <Users size={22} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-primary">No peer solutions yet</h3>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Be the first to share your solution with an intuition breakdown to help your classmates and fellow coders!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
              >
                <Plus size={14} />
                <span>Share My Solution</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPeerSolutions.map((sol) => (
                <div
                  key={sol.id}
                  className="rounded-2xl border p-4 sm:p-5 space-y-4 transition-all"
                  style={{
                    backgroundColor: 'var(--ca-surface)',
                    borderColor: 'var(--ca-border)',
                  }}
                >
                  {/* Author Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${
                          sol.authorAvatarColor || 'from-indigo-500 to-blue-500'
                        } text-xs font-bold text-white shadow-xs`}
                      >
                        {sol.authorName.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-primary truncate">
                            {sol.authorName}
                          </span>
                          {/* College badge ONLY if author explicitly set it in their profile */}
                          {sol.authorCollege && (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-medium">
                              <GraduationCap size={10} />
                              <span className="truncate">{sol.authorCollege}</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-muted">{sol.authorHandle}</span>
                      </div>
                    </div>

                    {/* Upvote Button */}
                    <button
                      type="button"
                      onClick={() => handleUpvote(sol.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                        sol.hasUpvoted
                          ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                          : 'text-muted hover:text-primary bg-[var(--ca-surface-muted)] border-[var(--ca-border)]'
                      }`}
                    >
                      <Heart
                        size={13}
                        className={sol.hasUpvoted ? 'fill-rose-500 text-rose-500' : ''}
                      />
                      <span>{sol.upvotes}</span>
                    </button>
                  </div>

                  {/* Title & Complexities */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-primary">{sol.title}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded-md bg-[var(--ca-surface-muted)] text-primary font-semibold">
                        Time: {sol.timeComplexity}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[var(--ca-surface-muted)] text-primary font-semibold">
                        Space: {sol.spaceComplexity}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-semibold uppercase">
                        {sol.language}
                      </span>
                    </div>
                  </div>

                  {/* MANDATORY: "Explain It In Your Own Words" Card */}
                  <div
                    className="rounded-xl border p-3.5 space-y-1.5"
                    style={{
                      backgroundColor: 'var(--ca-surface-muted)',
                      borderColor: 'var(--ca-border)',
                    }}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                      <Lightbulb size={13} className="text-amber-400" />
                      <span>In Author's Own Words (Intuition & Approach)</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed whitespace-pre-line">
                      {sol.intuitionNote}
                    </p>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="relative rounded-xl border overflow-hidden font-mono text-xs" style={{ borderColor: 'var(--ca-border)' }}>
                    <div
                      className="flex items-center justify-between px-3 py-1.5 border-b text-[10px] font-bold text-muted"
                      style={{
                        backgroundColor: 'var(--ca-surface-muted)',
                        borderColor: 'var(--ca-border)',
                      }}
                    >
                      <span className="uppercase">{sol.language} Implementation</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(sol.id, sol.code)}
                        className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        {copiedCodeId === sol.id ? (
                          <>
                            <Check size={11} className="text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre
                      className="p-3.5 overflow-x-auto text-xs leading-relaxed text-primary"
                      style={{ backgroundColor: 'var(--ca-surface)' }}
                    >
                      <code>{sol.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 2: OFFICIAL EDITORIAL                             */}
      {/* ======================================================== */}
      {activeSubTab === 'editorial' && (
        <div className="space-y-5">
          {status === 'loading' && <CardSkeleton rows={4} />}

          {status === 'error' && error && (
            error.toLowerCase().includes('plan') ||
            error.toLowerCase().includes('pro') ||
            error.toLowerCase().includes('premium') ||
            error.toLowerCase().includes('upgrade') ||
            error.toLowerCase().includes('unauthorized') ||
            error.toLowerCase().includes('exclusive') ? (
              <div
                className="workspace-tab-empty-card p-6 space-y-4 border rounded-2xl"
                style={{ borderColor: 'var(--ca-border)' }}
              >
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
            ) : (
              <ErrorAlert
                title="Could not load editorial"
                message={error}
                onRetry={onRetry}
                retryLabel="Retry"
              />
            )
          )}

          {!editorial && status !== 'loading' && !error && (
            <div className="workspace-tab-empty-card">
              <div className="workspace-empty-icon"><BookOpen size={20}/></div>
              <h2 className="mt-3 text-sm font-bold text-primary">Editorial not available yet</h2>
              <p className="mt-1.5 max-w-sm text-xs leading-5 text-muted">
                No static hints or walkthrough have been authored for <strong className="text-primary">{problem.title}</strong> yet. You can check the <button type="button" onClick={() => setActiveSubTab('peer')} className="text-indigo-400 font-bold underline">Peer Solutions</button> tab to see community approaches!
              </p>
              <button
                type="button"
                onClick={() => setActiveSubTab('peer')}
                className="btn-primary mt-4 py-1.5 px-3 text-xs"
              >
                View Peer Solutions ({peerSolutions.length})
              </button>
            </div>
          )}

          {editorial && (
            <>
              {/* Official Verified Editorial Notice */}
              <div className="workspace-static-banner" role="note">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-primary">Official Editorial</span>
                    <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                      Verified Walkthrough
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] leading-5 text-muted">
                    Includes the complete progressive hint ladder, algorithmic breakdown, and reference implementation.
                  </p>
                </div>
              </div>

              {/* Progressive Hints */}
              <section>
                <div className="mb-2.5 flex items-center gap-2">
                  <Lightbulb size={14} className="text-amber-500" />
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
                            {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                          </span>
                        </button>
                        {open && (
                          <p
                            className="mt-2 border-t pt-2 text-xs leading-5 text-muted"
                            style={{ borderColor: 'var(--ca-border)' }}
                          >
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
                    <ShieldAlert size={13} className="text-amber-500" />
                    <h3 className="text-xs font-bold text-primary">Common pitfalls</h3>
                  </div>
                  <ul className="list-disc space-y-1.5 pl-4 text-xs leading-5 text-muted">
                    {editorial.pitfalls.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Reference Implementation */}
              {editorial.referenceCode && (
                <section className="workspace-editorial-card">
                  <button
                    type="button"
                    onClick={() => setShowEditorialCode((prev) => !prev)}
                    aria-expanded={showEditorialCode}
                    className="flex w-full items-center justify-between gap-2 text-left"
                  >
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-primary">
                      <Code2 size={14} className="themed-link" />
                      <span>Reference implementation ({editorial.referenceCode.language})</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold themed-link">
                      {showEditorialCode ? 'Hide code' : 'Show code'}
                      {showEditorialCode ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                    </span>
                  </button>
                  {showEditorialCode && (
                    <pre className="workspace-editorial-code mt-3">
                      <code>{editorial.referenceCode.code}</code>
                    </pre>
                  )}
                </section>
              )}
            </>
          )}
        </div>
      )}

      {/* Share Solution Modal */}
      <ShareSolutionModal
        problemId={problem.id}
        problemTitle={problem.title}
        initialCode={currentCode}
        initialLanguage={currentLanguage}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onPublished={handleSolutionPublished}
      />
    </div>
  );
}
