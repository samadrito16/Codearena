import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';
import { MasteryProblem, PatternId, ProblemProgress } from '../../types/mastery';
import { PATTERN_CONFIG } from '../../lib/mastery/catalog';

interface PatternHubCardProps {
  patternId: PatternId;
  index: number;
  problems: MasteryProblem[];
  progressMap: Record<string, ProblemProgress>;
}

export default function PatternHubCard({
  patternId,
  index,
  problems,
  progressMap,
}: PatternHubCardProps) {
  const config = PATTERN_CONFIG[patternId];
  const completedCount = problems.filter((p) => progressMap[p.id]?.completed).length;
  const isComplete = completedCount === problems.length && problems.length > 0;
  const percent = Math.round((completedCount / problems.length) * 100);

  return (
    <section aria-labelledby={`pattern-title-${patternId}`} className="group/track">
      {/* Refined Track Header - Clean, open, modern typography */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 px-1">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-muted/60 select-none tracking-wider tabular-nums">
            0{index + 1}
          </span>
          <div className="flex items-center gap-2.5">
            <h2
              id={`pattern-title-${patternId}`}
              className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight"
            >
              {config.name}
            </h2>
            {isComplete && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-500">
                <Check size={11} strokeWidth={2.5} />
                Mastered
              </span>
            )}
          </div>
        </div>

        {/* Minimal Progress Indicator */}
        <div className="flex items-center gap-3 sm:self-center self-start shrink-0 pl-7 sm:pl-0">
          <span className="text-xs font-medium text-muted tabular-nums">
            {completedCount} of {problems.length}
          </span>
          <div className="w-20 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800/80 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${percent}%`,
                background: isComplete
                  ? 'var(--ca-accent-solid, #10b981)'
                  : 'var(--ca-accent-solid, #6366f1)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Clean Problems Directory - No horizontal lines, unified font, smooth hover highlights */}
      <div className="space-y-0.5 pt-1">
        {problems.map((problem, pIdx) => {
          const prog = progressMap[problem.id];
          const isDone = prog?.completed;
          const isStarted = prog?.diagnosed;
          const highRiskCount = problem.optimal_solution.code_lines.filter((l) => l.is_high_risk).length;

          const diffColors = {
            Easy: 'text-emerald-600 dark:text-emerald-400',
            Medium: 'text-amber-600 dark:text-amber-400',
            Hard: 'text-rose-600 dark:text-rose-400',
          }[problem.difficulty];

          return (
            <Link
              key={problem.id}
              to={`/mastery/${problem.slug}`}
              className="group/row flex items-center justify-between gap-4 px-3.5 py-3 sm:px-4 sm:py-3 rounded-xl transition-all duration-150 hover:bg-slate-500/[0.05] dark:hover:bg-white/[0.04]"
            >
              {/* Left: Index + Title */}
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                <span className="text-xs font-medium text-muted/40 w-5 shrink-0 text-right select-none tabular-nums">
                  {pIdx + 1}
                </span>
                <span className="font-semibold text-sm text-primary group-hover/row:text-indigo-500 dark:group-hover/row:text-indigo-400 transition-colors truncate">
                  {problem.title}
                </span>
              </div>

              {/* Right: Metadata + Status */}
              <div className="flex items-center gap-5 sm:gap-6 shrink-0 text-xs">
                {/* Difficulty */}
                <span className={`text-xs font-semibold ${diffColors} w-16 text-right`}>
                  {problem.difficulty}
                </span>

                {/* Key Metric: High risk lines */}
                <span className="text-muted text-xs font-normal tabular-nums hidden md:inline w-28 text-right">
                  {highRiskCount} critical {highRiskCount === 1 ? 'line' : 'lines'}
                </span>

                {/* Estimated time */}
                <span className="text-muted text-xs font-normal tabular-nums hidden sm:inline w-14 text-right">
                  {problem.estimated_minutes}m
                </span>

                {/* Status Column */}
                <div className="w-24 text-right">
                  {isDone ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                      <Check size={12} strokeWidth={2.5} />
                      Done
                    </span>
                  ) : isStarted ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-500 dark:text-indigo-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                      In progress
                    </span>
                  ) : (
                    <span className="text-muted/40 text-xs font-normal select-none">
                      &mdash;
                    </span>
                  )}
                </div>

                {/* Subtle right chevron */}
                <ChevronRight
                  size={15}
                  className="text-muted/30 group-hover/row:text-primary group-hover/row:translate-x-0.5 transition-all shrink-0"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
