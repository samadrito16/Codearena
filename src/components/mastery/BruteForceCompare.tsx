import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Code2, Gauge, TrendingDown, Zap } from 'lucide-react';
import { BruteForceSolution, OptimalSolution } from '../../types/mastery';

interface BruteForceCompareProps {
  bruteForce: BruteForceSolution;
  optimalSolution: OptimalSolution;
}

export default function BruteForceCompare({
  bruteForce,
  optimalSolution,
}: BruteForceCompareProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div
      className="panel-card p-6 border transition-all"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      <div className="border-b pb-4 mb-5" style={{ borderColor: 'var(--ca-border)' }}>
        <h3 className="text-sm font-semibold text-primary">
          Complexity & Trade-offs
        </h3>
        <p className="text-xs text-muted mt-0.5">
          Algorithmic comparison between naive enumeration and the optimal blueprint.
        </p>
      </div>

      {/* Side-by-Side Complexity Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Brute Force Tile */}
        <div
          className="p-4 rounded-xl border"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Naive Brute Force
            </span>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded border border-rose-500/20 text-rose-500 bg-rose-500/5">
              {bruteForce.time_complexity} Time
            </span>
          </div>
          <p className="text-xs font-medium text-primary mb-1">{bruteForce.approach}</p>
          <p className="text-xs text-muted leading-relaxed">{bruteForce.why_it_is_too_slow}</p>
          <div className="mt-3 text-[11px] text-muted font-mono">
            Space: {bruteForce.space_complexity}
          </div>
        </div>

        {/* Optimal Solution Tile */}
        <div
          className="p-4 rounded-xl border"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Optimal Blueprint
            </span>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded border border-emerald-500/20 text-emerald-500 bg-emerald-500/5">
              {optimalSolution.time_complexity} Time
            </span>
          </div>
          <p className="text-xs font-medium text-primary mb-1">{optimalSolution.approach}</p>
          <p className="text-xs text-muted leading-relaxed">
            Eliminates redundant work by tracking invariants in a single pass.
          </p>
          <div className="mt-3 text-[11px] text-muted font-mono">
            Space: {optimalSolution.space_complexity}
          </div>
        </div>
      </div>

      {/* Collapsible Brute Force Code */}
      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--ca-border)' }}>
        <button
          type="button"
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-2 text-xs font-semibold text-muted hover:text-primary transition"
        >
          <Code2 size={14} />
          <span>{showCode ? 'Hide Naive Brute-Force Code' : 'View Naive Brute-Force Code'}</span>
          {showCode ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showCode && (
          <div className="mt-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto leading-relaxed">
            <pre>{bruteForce.code}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
