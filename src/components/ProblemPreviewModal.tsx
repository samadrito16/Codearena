import { useEffect } from 'react';
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Folder,
  StickyNote,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DifficultyBadge } from '../pages/Dashboard';
import type { Problem, ProblemCollection, ProblemNote } from '../types';

interface ProblemPreviewModalProps {
  problem: Problem;
  solved: boolean;
  bookmarked: boolean;
  note?: ProblemNote;
  collections: ProblemCollection[];
  currentIndex: number;
  totalCount: number;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
  onToggleSolved: () => void;
  onToggleBookmark: () => void;
  onClose: () => void;
}

export default function ProblemPreviewModal({
  problem,
  solved,
  bookmarked,
  note,
  collections,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
  onToggleSolved,
  onToggleBookmark,
  onClose,
}: ProblemPreviewModalProps) {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (event.key === 'ArrowRight' && onNext) {
        onNext();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="problem-preview-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${problem.title}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="problem-preview-drawer">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b px-5 py-4" style={{ borderColor: 'var(--ca-border)' }}>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <DifficultyBadge difficulty={problem.difficulty}/>
              {problem.acceptance && problem.acceptance !== '—' && problem.acceptance !== '0%' && (
                <span className="text-[11px] font-semibold text-muted tabular-nums">{problem.acceptance} acceptance</span>
              )}
              <span className="text-[10px] text-muted tabular-nums">· {currentIndex + 1} of {totalCount}</span>
            </div>
            <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-primary">{problem.title}</h3>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <div className="workspace-pager" aria-label="Browse filtered problems">
              <button
                type="button"
                onClick={() => onPrev?.()}
                disabled={!onPrev}
                className="workspace-pager-button"
                aria-label="Previous problem in list"
                title="Previous problem (←)"
              >
                <ChevronLeft size={14}/>
              </button>
              <button
                type="button"
                onClick={() => onNext?.()}
                disabled={!onNext}
                className="workspace-pager-button"
                aria-label="Next problem in list"
                title="Next problem (→)"
              >
                <ChevronRight size={14}/>
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="workspace-icon-button"
              aria-label="Close preview"
              title="Close (Esc)"
            >
              <X size={15}/>
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5">
          {/* Topics & Collections */}
          <div className="flex flex-wrap items-center gap-1.5">
            {problem.topics.map((topic) => (
              <span key={topic} className="tag-pill">{topic}</span>
            ))}
            {collections.map((col) => (
              <span
                key={col.id}
                className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-bold"
                style={{ background: 'color-mix(in srgb, var(--ca-accent-solid) 13%, var(--ca-surface))', color: 'var(--ca-accent-solid)' }}
              >
                <Folder size={9}/> {col.name}
              </span>
            ))}
          </div>

          {/* Description */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Problem statement</p>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-primary">{problem.description}</p>
          </div>

          {/* Saved Private Note */}
          {note?.content.trim() && (
            <div className="rounded-xl border p-3.5" style={{ borderColor: 'color-mix(in srgb, var(--ca-accent-solid) 28%, var(--ca-border))', background: 'color-mix(in srgb, var(--ca-accent-solid) 6%, var(--ca-surface))' }}>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary">
                <StickyNote size={13} className="themed-link"/> Your private note
              </div>
              <p className="mt-1.5 whitespace-pre-line text-xs leading-5 text-muted">{note.content}</p>
            </div>
          )}

          {/* Examples */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Examples</p>
            {problem.examples.map((item, idx) => (
              <div key={idx} className="workspace-example-card">
                <p className="mb-2 text-xs font-bold text-primary">Example {idx + 1}</p>
                <div className="space-y-2 font-mono text-[11px] leading-5">
                  <div>
                    <span className="font-sans text-[10px] font-bold text-muted">Input</span>
                    <span className="workspace-code-block">{item.input}</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] font-bold text-muted">Output</span>
                    <span className="workspace-code-block">{item.output}</span>
                  </div>
                  {item.explanation && (
                    <p className="font-sans text-xs text-muted">
                      <strong className="text-primary">Explanation: </strong>{item.explanation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Constraints</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-xs leading-5 text-muted">
              {problem.constraints.map((constraint) => (
                <li key={constraint}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t px-5 py-3.5" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleBookmark}
              aria-pressed={bookmarked}
              className={`study-action-btn h-9 px-3 ${bookmarked ? 'study-action-btn-bookmark' : ''}`}
            >
              <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'}/>
              <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
            <button
              type="button"
              onClick={onToggleSolved}
              className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-[11px] font-bold ${solved ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'border bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300'}`}
              style={!solved ? { borderColor: 'var(--ca-border)' } : undefined}
            >
              {solved ? <><Check size={13}/> Solved</> : 'Mark solved'}
            </button>
          </div>
          <Link to={`/workspace/${problem.id}`} onClick={onClose} className="btn-primary py-2 text-xs">
            Open in Workspace <ArrowRight size={14}/>
          </Link>
        </div>
      </div>
    </div>
  );
}
