import React, { useState, useEffect, useRef } from 'react';
import { Bookmark, Check, Edit3, Save } from 'lucide-react';

interface MistakeNoteBoxProps {
  initialNote: string;
  onSaveNote: (note: string) => void;
}

export default function MistakeNoteBox({
  initialNote,
  onSaveNote,
}: MistakeNoteBoxProps) {
  const [note, setNote] = useState(initialNote || '');
  const [isSaved, setIsSaved] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setNote(initialNote || '');
  }, [initialNote]);

  function handleChange(val: string) {
    setNote(val);
    setIsSaved(false);

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      onSaveNote(val);
      setIsSaved(true);
    }, 800);
  }

  function handleManualSave() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    onSaveNote(note);
    setIsSaved(true);
  }

  return (
    <div
      className="panel-card p-6 border transition-all"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 mb-4" style={{ borderColor: 'var(--ca-border)' }}>
        <div>
          <h3 className="text-sm font-semibold text-primary">
            Implementation Notes
          </h3>
          <p className="text-xs text-muted mt-0.5">
            Key invariants, edge condition notes, and personal observations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSaved ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
              <Check size={13} />
              Saved to local store
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted animate-pulse">
              Saving…
            </span>
          )}
          <button
            type="button"
            onClick={handleManualSave}
            className="btn-secondary h-7 px-2.5 text-xs font-semibold gap-1"
          >
            <Save size={12} />
            Save
          </button>
        </div>
      </div>

      <div>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="What tripped you up or what boundary condition should you remember 48 hours from now? (e.g. 'Watch out for left < right vs left <= right; remember to advance left past all duplicates')."
          className="w-full rounded-xl border p-3.5 text-xs leading-relaxed outline-none transition resize-y"
          style={{
            borderColor: 'var(--ca-border)',
            background: 'var(--ca-surface-muted)',
            color: 'var(--ca-text)',
          }}
        />
      </div>
    </div>
  );
}
