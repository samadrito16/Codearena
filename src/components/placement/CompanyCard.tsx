import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, Clock, Sparkles, Tag, Users } from 'lucide-react';
import { CompanyAssessment } from '../../types/placement';
import { PLACEMENT_COMPANIES } from '../../data/placement/companies';

interface CompanyCardProps {
  assessment: CompanyAssessment;
  onStart: (assessmentId: string) => void;
  bestAttemptPercentile?: number;
}

export default function CompanyCard({ assessment, onStart, bestAttemptPercentile }: CompanyCardProps) {
  const company = PLACEMENT_COMPANIES[assessment.companyId];

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-neutral-800/80 dark:bg-neutral-900/90 dark:hover:border-neutral-700">
      {/* Top Banner & Company Brand */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold text-white shadow-sm"
              style={{ backgroundColor: company?.brandColor || '#3b82f6' }}
            >
              {assessment.companyName.charAt(0)}
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                {company?.shortName || assessment.companyName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium">
                {assessment.track}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
              company?.badgeBg || 'bg-blue-500/10'
            } ${company?.badgeBorder || 'border-blue-500/20'} ${
              company?.badgeText || 'text-blue-600 dark:text-blue-400'
            }`}
          >
            <Sparkles size={11} />
            {assessment.tierLabel}
          </span>
        </div>

        {/* Assessment Title & Description */}
        <div className="mt-4">
          <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {assessment.title}
          </h4>
          <p className="mt-1.5 text-xs text-slate-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
            {assessment.description}
          </p>
        </div>

        {/* Meta badges: Duration, Marks, Sections */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50/80 p-2.5 dark:bg-neutral-800/50 text-center">
          <div>
            <div className="text-[10px] text-slate-500 dark:text-neutral-400">Duration</div>
            <div className="mt-0.5 flex items-center justify-center gap-1 text-xs font-bold text-slate-800 dark:text-neutral-200">
              <Clock size={12} className="text-primary-500" />
              {assessment.totalDurationMinutes}m
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 dark:text-neutral-400">Total Marks</div>
            <div className="mt-0.5 text-xs font-bold text-slate-800 dark:text-neutral-200">
              {assessment.totalMarks} pts
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 dark:text-neutral-400">Sections</div>
            <div className="mt-0.5 text-xs font-bold text-slate-800 dark:text-neutral-200">
              {assessment.sections.length} Rounds
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {assessment.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-neutral-800 dark:text-neutral-400"
            >
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer & CTA */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-neutral-800/80 flex items-center justify-between">
        <div>
          {bestAttemptPercentile !== undefined ? (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[11px] text-slate-500 dark:text-neutral-400">Best:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {bestAttemptPercentile}%ile
              </span>
            </div>
          ) : (
            <span className="text-[11px] text-slate-400 dark:text-neutral-500">Not Attempted</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onStart(assessment.id)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-neutral-100"
        >
          <span>Launch Mock</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
