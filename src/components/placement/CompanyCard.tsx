import React from 'react';
import { ArrowRight, Clock, Play } from 'lucide-react';
import { CompanyAssessment } from '../../types/placement';
import { PLACEMENT_COMPANIES } from '../../data/placement/companies';

interface CompanyCardProps {
  assessment: CompanyAssessment;
  onStart: (assessmentId: string) => void;
  bestAttemptPercentile?: number;
  isActiveSession?: boolean;
}

export default function CompanyCard({
  assessment,
  onStart,
  bestAttemptPercentile,
  isActiveSession,
}: CompanyCardProps) {
  const company = PLACEMENT_COMPANIES[assessment.companyId];

  return (
    <div
      className="group relative flex flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      style={{
        backgroundColor: 'var(--ca-surface)',
        borderColor: isActiveSession
          ? 'color-mix(in srgb, var(--ca-accent-solid) 65%, transparent)'
          : 'var(--ca-border)',
      }}
    >
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
              <h3 className="font-display text-base font-bold text-primary">
                {company?.shortName || assessment.companyName}
              </h3>
              <p className="text-xs text-muted font-medium">
                {assessment.track}
              </p>
            </div>
          </div>
        </div>

        {/* Assessment Title & Description */}
        <div className="mt-4">
          <h4 className="font-bold text-sm text-primary group-hover:text-primary transition-colors">
            {assessment.title}
          </h4>
          <p className="mt-1.5 text-xs text-muted line-clamp-2 leading-relaxed">
            {assessment.description}
          </p>
        </div>

        {/* Meta badges: Duration, Marks, Sections */}
        <div
          className="mt-4 grid grid-cols-3 gap-2 rounded-xl p-2.5 text-center border"
          style={{
            borderColor: 'var(--ca-border)',
            backgroundColor: 'var(--ca-surface-muted)',
          }}
        >
          <div>
            <div className="text-[10px] text-muted">Duration</div>
            <div className="mt-0.5 flex items-center justify-center gap-1 text-xs font-bold text-primary">
              <Clock size={12} className="text-muted" />
              {assessment.totalDurationMinutes}m
            </div>
          </div>
          <div>
            <div className="text-[10px] text-muted">Total Marks</div>
            <div className="mt-0.5 text-xs font-bold text-primary">
              {assessment.totalMarks} pts
            </div>
          </div>
          <div>
            <div className="text-[10px] text-muted">Sections</div>
            <div className="mt-0.5 text-xs font-bold text-primary">
              {assessment.sections.length} Rounds
            </div>
          </div>
        </div>
      </div>

      {/* Footer & CTA */}
      <div
        className="mt-5 pt-3.5 border-t flex items-center justify-between"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div>
          {bestAttemptPercentile !== undefined ? (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[11px] text-muted">Best:</span>
              <span className="font-bold text-emerald-500">
                {bestAttemptPercentile}%ile
              </span>
            </div>
          ) : isActiveSession ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500 animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              In Progress
            </span>
          ) : (
            <span className="text-[11px] text-muted opacity-70">Not Attempted</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onStart(assessment.id)}
          className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-sm ${
            isActiveSession
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'btn-primary'
          }`}
        >
          {isActiveSession ? (
            <>
              <Play size={13} />
              <span>Resume Mock</span>
            </>
          ) : (
            <>
              <span>Launch Mock</span>
              <ArrowRight size={13} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
