import React, { useMemo } from 'react';
import { useMasteryProgress } from '../lib/mastery/progress';
import { getProblemsGroupedByPattern, SUPPORTED_PATTERNS } from '../lib/mastery/catalog';
import PatternHubCard from '../components/mastery/PatternHubCard';

export default function MasteryHub() {
  const { store, getOverallStats } = useMasteryProgress();
  const groupedProblems = useMemo(() => getProblemsGroupedByPattern(), []);
  const stats = useMemo(() => getOverallStats(), [store]);

  const completionPercent = Math.round(
    (stats.completedBlueprints / stats.totalBlueprints) * 100
  );

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-9 space-y-12 animate-in fade-in">
      {/* Page Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
            Master Fundamental Blueprints
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-2 max-w-xl leading-relaxed">
            25 foundational patterns, subgoal architectures, and targeted boundary condition recall.
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 text-xs text-muted font-medium shrink-0 tabular-nums">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{stats.verifiedCodes} Verified</span>
          </div>
          <span className="text-muted/30 hidden sm:inline">&bull;</span>
          <span>{stats.completedBlueprints} of {stats.totalBlueprints} studied</span>
          <div className="w-24 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${completionPercent}%`,
                background: 'var(--ca-accent-solid, #6366f1)',
              }}
            />
          </div>
          <span className="w-8 text-right font-semibold text-primary">{completionPercent}%</span>
        </div>
      </div>

      {/* 5 Ordered Pattern Tracks */}
      <div className="space-y-12 sm:space-y-14">
        {SUPPORTED_PATTERNS.map((patternId, index) => (
          <PatternHubCard
            key={patternId}
            patternId={patternId}
            index={index}
            problems={groupedProblems[patternId] || []}
            progressMap={store.problems}
          />
        ))}
      </div>
    </div>
  );
}
