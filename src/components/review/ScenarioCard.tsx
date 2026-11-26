import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  Wrench,
} from 'lucide-react';
import { ReviewScenario, ScenarioAttempt } from '../../types/review';

interface ScenarioCardProps {
  scenario: ReviewScenario;
  attempt?: ScenarioAttempt;
  isLocked?: boolean;
}

export default function ScenarioCard({ scenario, attempt }: ScenarioCardProps) {
  const isFixed = Boolean(attempt?.verifiedFixed);
  const totalTests = scenario.testSuite?.testCases.length || attempt?.totalTestsCount || 0;
  const passedTests = attempt?.testsPassedCount || 0;
  const hasStarted = Boolean(
    !isFixed &&
      attempt &&
      (Object.keys(attempt.editedFiles || {}).length > 0 || attempt.testResults !== undefined),
  );

  const diffColors = {
    Easy: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Hard: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    Expert: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  }[scenario.difficulty];

  const primaryLang = scenario.files[0]?.language || 'js';

  return (
    <Link
      to={`/review/${scenario.slug}`}
      className="group relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{
        background: 'var(--ca-surface)',
        borderColor: isFixed ? 'rgba(16, 185, 129, 0.35)' : 'var(--ca-border)',
      }}
    >
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${diffColors}`}>
              {scenario.difficulty}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase bg-black/5 dark:bg-white/5 text-muted">
              {primaryLang}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1 font-mono text-[11px]">
              <Clock size={12} />
              {scenario.estimated_minutes}m
            </span>
            {isFixed && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <CheckCircle2 size={12} />
                Fixed ({totalTests}/{totalTests})
              </span>
            )}
            {hasStarted && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                <Wrench size={11} />
                {attempt?.testResults ? `${passedTests}/${totalTests} passing` : 'Edited'}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-primary group-hover:text-indigo-500 transition-colors leading-snug line-clamp-2">
          {scenario.title}
        </h3>

        {/* Context Preview */}
        <p className="mt-2 text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed">
          {scenario.context}
        </p>

        {/* Company Tags */}
        {scenario.company_tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted/70 mr-1">
              Asked at:
            </span>
            {scenario.company_tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono bg-black/5 dark:bg-white/5 text-muted border border-black/5 dark:border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
