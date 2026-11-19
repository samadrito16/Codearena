import { useCallback, useEffect, useRef, useState } from 'react';
import { HardDrive, StickyNote, Trash2 } from 'lucide-react';
import type { ProblemNote } from '../types';

interface ProblemNotesPanelProps {
  problemId: string;
  problemTitle: string;
  savedNote?: ProblemNote;
  onSaveNote: (problemId: string, content: string) => void;
  onClearNote: (problemId: string) => void;
  compact?: boolean;
}

export default function ProblemNotesPanel({
  problemId,
  problemTitle,
  savedNote,
  onSaveNote,
  onClearNote,
  compact = false,
}: ProblemNotesPanelProps) {
  const [draft, setDraft] = useState<string>(() => savedNote?.content ?? '');
  const [status, setStatus] = useState<'saved' | 'saving'>('saved');

  const timerRef = useRef<number | null>(null);
  const pendingRef = useRef<{ problemId: string; content: string } | null>(null);
  const activeProblemRef = useRef<string>(problemId);

  const flush = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const pending = pendingRef.current;
    if (!pending) return;
    pendingRef.current = null;
    onSaveNote(pending.problemId, pending.content);
    setStatus('saved');
  }, [onSaveNote]);

  // Sync draft when navigating to a different problem or when updated externally.
  useEffect(() => {
    if (activeProblemRef.current !== problemId) {
      flush();
      activeProblemRef.current = problemId;
      setDraft(savedNote?.content ?? '');
      setStatus('saved');
      return;
    }
    if (!pendingRef.current) {
      setDraft(savedNote?.content ?? '');
    }
  }, [problemId, savedNote?.content, flush]);

  useEffect(() => {
    return () => {
      flush();
    };
  }, [flush]);

  function handleChange(nextContent: string) {
    setDraft(nextContent);
    setStatus('saving');
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    pendingRef.current = { problemId, content: nextContent };
    timerRef.current = window.setTimeout(() => {
      flush();
    }, 350);
  }

  function handleClear() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    pendingRef.current = null;
    setDraft('');
    onClearNote(problemId);
    setStatus('saved');
  }

  const hasSavedText = Boolean(draft.trim());
  const updatedLabel = savedNote?.updatedAt
    ? new Date(savedNote.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    : null;

  return (
    <div className={compact ? 'space-y-2.5' : 'space-y-4'}>
      {!compact && (
        <div className="workspace-static-banner" role="note">
          <HardDrive size={14} className="mt-0.5 shrink-0 themed-link"/>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-primary">Private local note</p>
            <p className="mt-0.5 text-[11px] leading-5 text-muted">
              Notes, bookmarks, and collections are stored locally in this browser until account sync is added.
            </p>
          </div>
        </div>
      )}

      <div className="workspace-note-box">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <StickyNote size={14} className="themed-link"/>
            <span className="text-xs font-bold text-primary">
              {compact ? `Private note · ${problemTitle}` : 'Your private note'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-muted">
              {status === 'saving'
                ? 'Saving…'
                : hasSavedText
                  ? (updatedLabel ? `Saved locally · ${updatedLabel}` : 'Saved locally')
                  : 'Autosaves locally'}
            </span>
            {hasSavedText && (
              <button
                type="button"
                onClick={handleClear}
                className="workspace-tc-delete-btn py-0.5 text-[10px]"
                title="Clear note"
              >
                <Trash2 size={11}/> Clear
              </button>
            )}
          </div>
        </div>

        <textarea
          rows={compact ? 3 : 7}
          value={draft}
          onChange={(event) => handleChange(event.target.value)}
          onBlur={flush}
          placeholder="Write a private note for this problem (e.g., Review the two-pointer invariant, remember the empty-input edge case)..."
          aria-label={`Private note for ${problemTitle}`}
          className="workspace-note-textarea"
        />

        {compact && (
          <p className="mt-1.5 text-[10px] text-muted">
            Stored locally in this browser until account sync is added.
          </p>
        )}
      </div>
    </div>
  );
}
