import React from 'react';
import { HelpCircle, Key, Lock, Unlock, ChevronDown, Sparkles } from 'lucide-react';

interface LockedHintLadderProps {
  hints: string[];
  hintsUnlocked: number;
  onUnlockHint: () => void;
}

export default function LockedHintLadder({
  hints,
  hintsUnlocked,
  onUnlockHint,
}: LockedHintLadderProps) {
  if (!hints || hints.length === 0) return null;

  return (
    <div
      className="panel-card p-6 border transition-all"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 mb-4" style={{ borderColor: 'var(--ca-border)' }}>
        <div>
          <h3 className="text-sm font-semibold text-primary">
            Progressive Hints
          </h3>
          <p className="text-xs text-muted mt-0.5">
            Reveal hints one by one if you need scaffolding before looking at the optimal code.
          </p>
        </div>

        <div className="text-xs text-muted font-medium tabular-nums">
          {hintsUnlocked} of {hints.length} unlocked
        </div>
      </div>

      <div className="space-y-3">
        {hints.map((hint, idx) => {
          const isUnlocked = idx < hintsUnlocked;
          const isNextToUnlock = idx === hintsUnlocked;

          if (isUnlocked) {
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-xs text-primary animate-in fade-in"
              >
                <div className="flex items-center gap-2 font-bold text-indigo-500 dark:text-indigo-400 mb-1">
                  <Unlock size={14} />
                  Hint {idx + 1}
                </div>
                <p className="text-muted leading-relaxed pl-5">{hint}</p>
              </div>
            );
          }

          if (isNextToUnlock) {
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 text-xs text-muted">
                  <Lock size={15} className="text-muted" />
                  <span>Hint {idx + 1} is locked</span>
                </div>
                <button
                  type="button"
                  onClick={onUnlockHint}
                  className="btn-secondary h-8 px-3 text-xs font-semibold gap-1.5"
                >
                  <Key size={13} />
                  Unlock Hint {idx + 1}
                </button>
              </div>
            );
          }

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40 text-xs text-muted/60 flex items-center gap-2.5 opacity-60"
            >
              <Lock size={14} />
              <span>Hint {idx + 1} (Locked until Hint {idx} is viewed)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
