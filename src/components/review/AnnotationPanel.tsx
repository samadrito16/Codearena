import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  FileCode2,
  MessageSquare,
  Plus,
  Send,
  Trash2,
} from 'lucide-react';
import { AnnotationCategory, LineAnnotation, ReviewFile } from '../../types/review';

interface AnnotationPanelProps {
  files: ReviewFile[];
  activeFilename: string;
  annotations: LineAnnotation[];
  selectedLine?: number;
  onAddAnnotation: (annotation: LineAnnotation) => void;
  onRemoveAnnotation: (annotationId: string) => void;
  onSelectLine?: (filename: string, line: number) => void;
}

const CATEGORY_META: Record<
  AnnotationCategory,
  { label: string; icon: string; badgeClass: string }
> = {
  bug: {
    label: 'Bug / Flaw',
    icon: '🐛',
    badgeClass: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  },
  performance: {
    label: 'Performance',
    icon: '⚡',
    badgeClass: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  },
  security: {
    label: 'Security',
    icon: '🔒',
    badgeClass: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  style: {
    label: 'Style / Arch',
    icon: '🎨',
    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  question: {
    label: 'Inquiry',
    icon: '❓',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
};

export default function AnnotationPanel({
  files,
  activeFilename,
  annotations,
  selectedLine,
  onAddAnnotation,
  onRemoveAnnotation,
  onSelectLine,
}: AnnotationPanelProps) {
  const [commentText, setCommentText] = useState('');
  const [category, setCategory] = useState<AnnotationCategory>('bug');
  const [targetLine, setTargetLine] = useState<number>(selectedLine || 1);
  const [targetFile, setTargetFile] = useState<string>(activeFilename);

  // Sync target line / file if passed from parent editor
  React.useEffect(() => {
    if (selectedLine) {
      setTargetLine(selectedLine);
    }
  }, [selectedLine]);

  React.useEffect(() => {
    setTargetFile(activeFilename);
  }, [activeFilename]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newAnnotation: LineAnnotation = {
      id: `ann-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      filename: targetFile,
      lineNumber: targetLine,
      comment: commentText.trim(),
      category,
      timestamp: new Date().toISOString(),
    };

    onAddAnnotation(newAnnotation);
    setCommentText('');
  }

  return (
    <div
      className="panel-card p-5 border space-y-5 rounded-2xl"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--ca-border)' }}>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <MessageSquare size={14} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-primary">PR Review Annotations</h4>
            <p className="text-[11px] text-muted">
              {annotations.length} {annotations.length === 1 ? 'comment' : 'comments'} added
            </p>
          </div>
        </div>
      </div>

      {/* Inline Add Annotation Form */}
      <form onSubmit={handleSubmit} className="space-y-3 p-3.5 rounded-xl border bg-black/[0.02] dark:bg-white/[0.02]" style={{ borderColor: 'var(--ca-border)' }}>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[11px] font-bold text-muted font-mono">File:</span>
            <select
              value={targetFile}
              onChange={(e) => setTargetFile(e.target.value)}
              className="h-7 px-2 rounded-lg border text-xs font-mono bg-transparent text-primary outline-none"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              {files.map((f) => (
                <option key={f.filename} value={f.filename}>
                  {f.filename}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[11px] font-bold text-muted font-mono">Line:</span>
            <input
              type="number"
              min={1}
              value={targetLine}
              onChange={(e) => setTargetLine(parseInt(e.target.value, 10) || 1)}
              className="h-7 w-16 px-2 rounded-lg border text-xs font-mono bg-transparent text-primary outline-none"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1 ml-auto">
            {(Object.keys(CATEGORY_META) as AnnotationCategory[]).map((catKey) => {
              const meta = CATEGORY_META[catKey];
              const isSelected = category === catKey;
              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => setCategory(catKey)}
                  className={`h-7 px-2 rounded-lg text-[10px] font-bold border transition ${
                    isSelected
                      ? meta.badgeClass
                      : 'border-black/5 dark:border-white/5 text-muted hover:text-primary'
                  }`}
                  title={meta.label}
                >
                  <span>{meta.icon}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <textarea
            rows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Explain the flaw or critique (e.g. race condition, missing lock, unhandled error)..."
            className="w-full rounded-xl border p-2.5 text-xs bg-transparent text-primary placeholder:text-muted/60 outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-muted font-sans">
            Tag: <span className="font-semibold text-primary">{CATEGORY_META[category].label}</span>
          </span>
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="btn-primary h-7 px-3 text-xs font-semibold gap-1.5 disabled:opacity-50"
          >
            <span>Add Comment</span>
            <Send size={11} />
          </button>
        </div>
      </form>

      {/* List of Annotations */}
      {annotations.length > 0 ? (
        <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
          {annotations.map((ann) => {
            const meta = CATEGORY_META[ann.category] || CATEGORY_META.bug;
            return (
              <div
                key={ann.id}
                className="rounded-xl border p-3 text-xs space-y-1.5 transition hover:border-indigo-500/30"
                style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      onClick={() => onSelectLine && onSelectLine(ann.filename, ann.lineNumber)}
                      className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-primary border border-black/5 dark:border-white/5 cursor-pointer hover:border-indigo-500/40"
                      title="Click to jump to line"
                    >
                      {ann.filename}:L{ann.lineNumber}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${meta.badgeClass}`}>
                      {meta.icon} {meta.label}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveAnnotation(ann.id)}
                    className="text-muted hover:text-rose-500 transition p-1"
                    title="Remove comment"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <p className="text-primary text-xs leading-relaxed whitespace-pre-wrap pl-1 border-l-2 border-indigo-500/40">
                  {ann.comment}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-6 text-xs text-muted border border-dashed rounded-xl border-black/10 dark:border-white/10 space-y-1">
          <p className="font-semibold text-primary">No comments added yet</p>
          <p className="text-[11px] text-muted">
            Inspect the code files and add review comments highlighting bugs, concurrency hazards, or design regressions.
          </p>
        </div>
      )}
    </div>
  );
}
