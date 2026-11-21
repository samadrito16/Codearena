import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, Sparkles, HelpCircle, ArrowRight, Eye, ShieldCheck, Zap } from 'lucide-react';
import { MasteryProblem, PatternId } from '../../types/mastery';
import { PATTERN_CONFIG } from '../../lib/mastery/catalog';

interface PatternClueQuizProps {
  problem: MasteryProblem;
  isDiagnosed: boolean;
  selectedPattern: string | null;
  onDiagnose: (pattern: string) => void;
  onReveal: () => void;
}

export default function PatternClueQuiz({
  problem,
  isDiagnosed,
  selectedPattern,
  onDiagnose,
  onReveal,
}: PatternClueQuizProps) {
  const [selected, setSelected] = useState<PatternId | null>((selectedPattern as PatternId) || null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(
    isDiagnosed ? (selectedPattern === problem.pattern ? 'correct' : null) : null
  );

  const options = useMemo(() => {
    // Preserve deterministic order or problem's options
    return problem.pattern_diagnosis_options;
  }, [problem.id]);

  function handleSelect(option: PatternId) {
    if (isDiagnosed && feedback === 'correct') return;
    setSelected(option);

    if (option === problem.pattern) {
      setFeedback('correct');
      onDiagnose(option);
    } else {
      setFeedback('incorrect');
    }
  }

  const isUnlocked = isDiagnosed || feedback === 'correct';

  return (
    <div
      className="panel-card p-6 border transition-all"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--ca-border)' }}>
        <div>
          <h3 className="text-sm font-semibold text-primary">
            Pattern Diagnosis
          </h3>
          <p className="text-xs text-muted mt-0.5">
            Identify the underlying algorithmic pattern suggested by the problem invariants.
          </p>
        </div>

        {!isUnlocked && (
          <button
            type="button"
            onClick={onReveal}
            className="text-xs text-muted hover:text-primary transition underline underline-offset-4 flex items-center gap-1 font-medium"
          >
            <Eye size={13} />
            Reveal pattern
          </button>
        )}
      </div>

      {/* Interactive Multiple Choice Question */}
      <div className="mt-5">
        <p className="text-sm font-semibold text-primary mb-3">
          Which core pattern do the problem constraints & requirements point to?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt) => {
            const config = PATTERN_CONFIG[opt];
            const isChosen = selected === opt;
            const isCorrect = opt === problem.pattern;

            let btnStyle = 'border-slate-200 dark:border-slate-800 bg-black/[0.02] dark:bg-white/[0.02] text-primary hover:border-indigo-400';
            if (isUnlocked && isCorrect) {
              btnStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold ring-2 ring-emerald-500/20';
            } else if (isChosen && feedback === 'incorrect') {
              btnStyle = 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold';
            }

            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                disabled={isUnlocked}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-sm transition-all ${btnStyle}`}
              >
                <div>
                  <div className="font-semibold">{config.name}</div>
                  <div className="text-[11px] text-muted opacity-80 mt-0.5">{config.tagline}</div>
                </div>
                {isUnlocked && isCorrect ? (
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 ml-2" />
                ) : isChosen && feedback === 'incorrect' ? (
                  <XCircle size={18} className="text-rose-500 shrink-0 ml-2" />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Feedback Alert */}
        {feedback === 'incorrect' && !isUnlocked && (
          <div className="mt-3.5 p-3 rounded-xl border border-rose-500/20 bg-rose-500/10 text-xs text-rose-600 dark:text-rose-400 flex items-center justify-between">
            <span>
              Not quite. Review the problem constraints—look closely at whether the structure is contiguous, sorted, or requires optimal substructure. Try another pattern!
            </span>
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                setFeedback(null);
              }}
              className="font-bold underline ml-3 shrink-0"
            >
              Reset
            </button>
          </div>
        )}

        {isUnlocked && (
          <div className="mt-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs">
            <div className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
              Pattern: {PATTERN_CONFIG[problem.pattern].name}
            </div>
            <p className="text-muted leading-relaxed">
              {PATTERN_CONFIG[problem.pattern].description}
            </p>
          </div>
        )}
      </div>

      {/* Clues & Trigger Words Revealed */}
      {isUnlocked && (
        <div className="mt-6 pt-5 border-t space-y-4" style={{ borderColor: 'var(--ca-border)' }}>
          {/* Trigger Words */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
              Trigger Clues in Problem Statement
            </h4>
            <div className="flex flex-wrap gap-2">
              {problem.trigger_words.map((tw, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs text-primary px-2.5 py-1 rounded-md border"
                  style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
                >
                  &ldquo;{tw}&rdquo;
                </span>
              ))}
            </div>
          </div>

          {/* Pattern Clues */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
              Invariant Reasoning
            </h4>
            <ul className="space-y-1.5 text-xs text-muted">
              {problem.pattern_clues.map((clue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 shrink-0 select-none">&bull;</span>
                  <span className="leading-relaxed">{clue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
