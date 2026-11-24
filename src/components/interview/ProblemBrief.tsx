import React from 'react';
import { Problem } from '../../types';
import { CheckCircle, PanelLeftClose } from 'lucide-react';

interface ProblemBriefProps {
  problem: Problem;
  isSolved: boolean;
  onCollapse?: () => void;
}

export default function ProblemBrief({
  problem,
  isSolved,
  onCollapse,
}: ProblemBriefProps) {
  return (
    <div className="h-full overflow-y-auto p-5 sm:p-6 space-y-6 text-sm">
      {/* Problem Header (Clean: No redundant Problem 1 Warmup, no difficulty tags) */}
      <div className="space-y-1.5 pb-4 border-b" style={{ borderColor: 'var(--ca-border)' }}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold tracking-tight text-primary">
            {problem.title}
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            {isSolved && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
                <CheckCircle size={13} />
                Passed
              </span>
            )}
            {onCollapse && (
              <button
                type="button"
                onClick={onCollapse}
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold text-muted hover:text-primary hover:bg-white/10 transition border border-transparent hover:border-white/10"
                title="Collapse problem statement for full-width code editor"
              >
                <PanelLeftClose size={14} />
                <span className="hidden sm:inline">Collapse</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Problem Description */}
      <div className="space-y-3 leading-relaxed text-muted whitespace-pre-line text-[13.5px]">
        {problem.description}
      </div>

      {/* Examples */}
      {problem.examples && problem.examples.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-xs uppercase font-bold tracking-wider text-muted">
            Examples
          </h3>
          <div className="space-y-3">
            {problem.examples.map((ex, idx) => (
              <div
                key={idx}
                className="rounded-xl p-3.5 space-y-2 border text-xs font-mono"
                style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
              >
                <div className="text-[11px] font-sans font-bold text-primary">
                  Example {idx + 1}:
                </div>
                <div>
                  <span className="text-muted">Input: </span>
                  <span className="text-primary">{ex.input}</span>
                </div>
                <div>
                  <span className="text-muted">Output: </span>
                  <span className="text-emerald-500 font-bold">{ex.output}</span>
                </div>
                {ex.explanation && (
                  <div
                    className="pt-1 text-[11px] font-sans text-muted border-t"
                    style={{ borderColor: 'var(--ca-border)' }}
                  >
                    <span className="font-semibold text-primary">Explanation: </span>
                    {ex.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Constraints: Essential for candidates to determine Big-O bounds */}
      {problem.constraints && problem.constraints.length > 0 && (
        <div className="space-y-2 pt-2">
          <h3 className="text-xs uppercase font-bold tracking-wider text-muted">
            Constraints
          </h3>
          <ul className="list-disc list-inside space-y-1 text-xs font-mono text-muted pl-1">
            {problem.constraints.map((c, idx) => (
              <li key={idx}>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
