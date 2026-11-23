import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Eye,
  HelpCircle,
  Lightbulb,
  Lock,
  Sparkles,
} from 'lucide-react';
import { PlantedBug } from '../../types/review';

interface HintLadderProps {
  plantedBugs: PlantedBug[];
  hintsUsed: Record<string, number>;
  onUseHint: (bugId: string, level: number) => void;
}

export default function HintLadder({
  plantedBugs,
  hintsUsed,
  onUseHint,
}: HintLadderProps) {
  const [expandedBugId, setExpandedBugId] = useState<string | null>(null);

  return (
    <div
      className="panel-card p-5 border space-y-4 rounded-2xl"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Lightbulb size={14} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-primary">Progressive Investigation Hints</h4>
            <p className="text-[11px] text-muted">
              Stuck? Unlock hints step-by-step without spoiling the root cause.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {plantedBugs.map((bug, index) => {
          const currentLevel = hintsUsed[bug.bug_id] || 0;
          const isExpanded = expandedBugId === bug.bug_id;

          return (
            <div
              key={bug.bug_id}
              className="rounded-xl border p-3.5 space-y-3 transition-colors"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
            >
              <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setExpandedBugId(isExpanded ? null : bug.bug_id)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-muted border border-black/5 dark:border-white/5">
                    Flaw #{index + 1}
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    {bug.file} &middot; {bug.type}
                  </span>
                  {currentLevel > 0 && (
                    <span className="font-mono text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      Hint {currentLevel}/3
                    </span>
                  )}
                </div>

                <button type="button" className="text-muted hover:text-primary">
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {isExpanded && (
                <div className="pt-2 border-t space-y-2.5 animate-in fade-in" style={{ borderColor: 'var(--ca-border)' }}>
                  {/* Hint 1: Guiding Question */}
                  <div className="text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-muted">
                      <span>Level 1: Conceptual Scent</span>
                      {currentLevel >= 1 ? (
                        <span className="text-emerald-500">Unlocked</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onUseHint(bug.bug_id, 1)}
                          className="text-amber-500 hover:underline inline-flex items-center gap-1"
                        >
                          <Lock size={10} /> Unlock Hint 1
                        </button>
                      )}
                    </div>
                    {currentLevel >= 1 ? (
                      <p className="text-primary bg-black/5 dark:bg-white/5 p-2.5 rounded-lg leading-relaxed">
                        {bug.hint_level_1}
                      </p>
                    ) : (
                      <div className="h-8 rounded-lg bg-black/5 dark:bg-white/5 border border-dashed border-black/10 dark:border-white/10 flex items-center justify-center text-[11px] text-muted/60">
                        Locked hint
                      </div>
                    )}
                  </div>

                  {/* Hint 2: Location Pointer */}
                  <div className="text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-muted">
                      <span>Level 2: Scope & Boundary</span>
                      {currentLevel >= 2 ? (
                        <span className="text-emerald-500">Unlocked</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onUseHint(bug.bug_id, 2)}
                          className="text-amber-500 hover:underline inline-flex items-center gap-1"
                          disabled={currentLevel < 1}
                        >
                          <Lock size={10} /> Unlock Hint 2
                        </button>
                      )}
                    </div>
                    {currentLevel >= 2 ? (
                      <p className="text-primary bg-black/5 dark:bg-white/5 p-2.5 rounded-lg leading-relaxed">
                        {bug.hint_level_2}
                      </p>
                    ) : (
                      <div className="h-8 rounded-lg bg-black/5 dark:bg-white/5 border border-dashed border-black/10 dark:border-white/10 flex items-center justify-center text-[11px] text-muted/60">
                        {currentLevel < 1 ? 'Unlock Level 1 first' : 'Locked hint'}
                      </div>
                    )}
                  </div>

                  {/* Hint 3: Root Cause Invariant */}
                  <div className="text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-muted">
                      <span>Level 3: Root Cause Mechanism</span>
                      {currentLevel >= 3 ? (
                        <span className="text-emerald-500">Unlocked</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onUseHint(bug.bug_id, 3)}
                          className="text-rose-500 hover:underline inline-flex items-center gap-1"
                          disabled={currentLevel < 2}
                        >
                          <Lock size={10} /> Reveal Root Cause
                        </button>
                      )}
                    </div>
                    {currentLevel >= 3 ? (
                      <p className="text-primary bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg leading-relaxed">
                        {bug.hint_level_3}
                      </p>
                    ) : (
                      <div className="h-8 rounded-lg bg-black/5 dark:bg-white/5 border border-dashed border-black/10 dark:border-white/10 flex items-center justify-center text-[11px] text-muted/60">
                        {currentLevel < 2 ? 'Unlock Level 2 first' : 'Locked hint'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
