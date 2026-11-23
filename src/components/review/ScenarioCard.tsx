import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Cpu,
  FileCode2,
  Layers,
  Lock,
  Shield,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import { ReviewScenario } from '../../types/review';
import { CATEGORY_CONFIG } from '../../lib/review/catalog';
import { ScenarioAttempt } from '../../types/review';

interface ScenarioCardProps {
  scenario: ReviewScenario;
  attempt?: ScenarioAttempt;
  isLocked?: boolean;
}

export default function ScenarioCard({ scenario, attempt, isLocked }: ScenarioCardProps) {
  const cat = CATEGORY_CONFIG[scenario.category];
  const isCompleted = attempt?.score !== undefined;
  const hasStarted = Boolean(attempt && attempt.annotations.length > 0 && !isCompleted);

  const diffColors = {
    Easy: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Hard: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    Expert: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  }[scenario.difficulty];

  return (
    <Link
      to={`/review/${scenario.slug}`}
      className="group relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{
        background: 'var(--ca-surface)',
        borderColor: isCompleted ? 'rgba(16, 185, 129, 0.35)' : 'var(--ca-border)',
      }}
    >
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${cat.badgeBg}`}>
              {cat.name}
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${diffColors}`}>
              {scenario.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1 font-mono text-[11px]">
              <Clock size={12} />
              {scenario.estimated_minutes}m
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <CheckCircle2 size={12} />
                {attempt?.score} / {scenario.review_rubric.max_score} pts
              </span>
            )}
            {hasStarted && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                In Review ({attempt?.annotations.length} comments)
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-primary group-hover:text-indigo-500 transition-colors line-clamp-1">
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

      {/* Footer Info */}
      <div className="mt-5 pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--ca-border)' }}>
        <div className="flex items-center gap-3 text-muted">
          <span className="inline-flex items-center gap-1 font-mono text-[11px]">
            <FileCode2 size={13} />
            {scenario.files.length} {scenario.files.length === 1 ? 'file' : 'files'}
          </span>
          <span>&middot;</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-rose-500/80 font-medium">
            {scenario.planted_bugs.length} {scenario.planted_bugs.length === 1 ? 'planted flaw' : 'planted flaws'}
          </span>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-500 group-hover:translate-x-1 transition-transform">
          <span>{isCompleted ? 'Review Again' : 'Audit PR'}</span>
          <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}
