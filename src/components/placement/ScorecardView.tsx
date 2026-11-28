import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Code2,
  Compass,
  GraduationCap,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  XCircle,
  Zap,
} from 'lucide-react';
import { AssessmentReport, CompanyAssessment } from '../../types/placement';
import { PLACEMENT_COMPANIES } from '../../data/placement/companies';

interface ScorecardViewProps {
  report: AssessmentReport;
  assessment: CompanyAssessment;
  onRetake: () => void;
  onBackToHub: () => void;
}

export default function ScorecardView({
  report,
  assessment,
  onRetake,
  onBackToHub,
}: ScorecardViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'review'>('overview');
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const company = PLACEMENT_COMPANIES[report.companyId];

  const durationMin = Math.round(report.durationSeconds / 60);

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12 pt-4 animate-in fade-in duration-300">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToHub}
          style={{
            backgroundColor: 'var(--ca-surface)',
            borderColor: 'var(--ca-border)',
          }}
          className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-semibold text-primary shadow-xs hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={14} />
          <span>Back to Placement Hub</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 rounded-xl btn-primary px-4 py-1.5 text-xs font-semibold shadow-xs transition-opacity hover:opacity-95"
          >
            <RotateCcw size={13} />
            <span>Retake Assessment</span>
          </button>
        </div>
      </div>

      {/* Hero Performance Banner */}
      <div
        style={{
          backgroundColor: 'var(--ca-surface)',
          borderColor: 'var(--ca-border)',
        }}
        className="relative overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-xs"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Company & Assessment Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl text-base font-bold text-white shadow-xs"
                style={{ backgroundColor: company?.brandColor || '#3b82f6' }}
              >
                {report.companyName.charAt(0)}
              </span>
              <div>
                <span className="text-xs font-semibold text-muted">
                  {company?.shortName || report.companyName} • Placement Simulation
                </span>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-primary">
                  {report.assessmentTitle}
                </h1>
              </div>
            </div>

            {/* Verdict Badge */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold border shadow-xs ${report.verdictTier.badgeColor}`}
              >
                <Award size={14} />
                <span>Verdict: {report.verdictTier.trackName}</span>
              </div>
              <span className="text-xs text-muted">
                {report.verdictTier.description}
              </span>
            </div>
          </div>

          {/* Right: Score & National Percentile */}
          <div
            style={{
              backgroundColor: 'var(--ca-surface-muted)',
              borderColor: 'var(--ca-border)',
            }}
            className="flex items-center gap-4 sm:gap-6 rounded-2xl border p-4 shadow-xs"
          >
            {/* Score */}
            <div className="text-center px-2">
              <div className="text-[11px] font-medium text-muted">Total Score</div>
              <div className="mt-0.5 font-display text-2xl sm:text-3xl font-extrabold text-primary">
                {report.totalScore}
                <span className="text-sm font-semibold text-muted opacity-70">
                  /{report.maxScore}
                </span>
              </div>
              <div className="mt-0.5 text-xs font-bold text-blue-500">
                {report.percentage}% Accuracy
              </div>
            </div>

            <div
              style={{ backgroundColor: 'var(--ca-border)' }}
              className="h-10 w-px"
            />


          </div>
        </div>

        {/* Feedback Bullet Points */}
        <div
          style={{ borderColor: 'var(--ca-border)' }}
          className="mt-6 border-t pt-4"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
            Assessment Diagnostic Summary
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {report.summaryFeedback.map((fb, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-primary"
              >
                <Sparkles size={13} className="shrink-0 text-blue-500 mt-0.5" />
                <span>{fb}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Overview vs Question Review) */}
      <div
        style={{ borderColor: 'var(--ca-border)' }}
        className="flex border-b"
      >
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-muted hover:text-primary'
          }`}
        >
          <TrendingUp size={14} />
          <span>Section & Topic Breakdown</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('review')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition-all ${
            activeTab === 'review'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-muted hover:text-primary'
          }`}
        >
          <BookOpen size={14} />
          <span>Detailed Solutions & Code Review</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Sectional Performance Grid */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted mb-3">
              Sectional Scorecard
            </h3>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {report.sectionalReports.map((sec) => (
                <div
                  key={sec.sectionId}
                  style={{
                    backgroundColor: 'var(--ca-surface)',
                    borderColor: 'var(--ca-border)',
                  }}
                  className="rounded-2xl border p-4 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary truncate">
                      {sec.sectionTitle}
                    </span>
                    {sec.clearedCutoff ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500 border border-emerald-500/20">
                        <CheckCircle2 size={11} />
                        Cleared
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-500 border border-rose-500/20">
                        <XCircle size={11} />
                        Cutoff Missed
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-baseline justify-between">
                    <div className="font-display text-xl font-bold text-primary">
                      {sec.score}
                      <span className="text-xs font-normal text-muted opacity-70">
                        /{sec.maxScore}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-muted">
                      {sec.percentage}%
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div
                    style={{ backgroundColor: 'var(--ca-surface-muted)' }}
                    className="mt-2.5 h-1.5 w-full rounded-full overflow-hidden"
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        sec.clearedCutoff ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, sec.percentage)}%` }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
                    <span>Attempted: {sec.attemptedQuestions}/{sec.totalQuestions}</span>
                    <span>Correct: {sec.correctAnswers}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Diagnostic Matrix */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted mb-3">
              Topic Strengths & Focus Areas
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {report.topicDiagnostics.map((topic) => (
                <div
                  key={topic.subject}
                  style={{
                    backgroundColor: 'var(--ca-surface)',
                    borderColor: 'var(--ca-border)',
                  }}
                  className="rounded-2xl border p-4 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary">
                      {topic.subjectTitle}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        topic.strength === 'Strong'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : topic.strength === 'Moderate'
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                      }`}
                    >
                      {topic.strength}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs text-muted">
                    <span>
                      Score: {topic.correct} / {topic.total}
                    </span>
                    <span className="font-bold text-primary">
                      {topic.percentage}%
                    </span>
                  </div>

                  <div
                    style={{ backgroundColor: 'var(--ca-surface-muted)' }}
                    className="mt-2 h-1.5 w-full rounded-full overflow-hidden"
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        topic.strength === 'Strong'
                          ? 'bg-emerald-500'
                          : topic.strength === 'Moderate'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, topic.percentage)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DETAILED QUESTION REVIEW */}
      {activeTab === 'review' && (
        <div className="space-y-4">
          {/* Section Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {assessment.sections.map((sec, idx) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setSelectedSectionIdx(idx)}
                style={{
                  backgroundColor:
                    selectedSectionIdx === idx
                      ? 'var(--ca-surface-muted)'
                      : 'var(--ca-surface)',
                  borderColor:
                    selectedSectionIdx === idx
                      ? 'var(--ca-accent, #3b82f6)'
                      : 'var(--ca-border)',
                }}
                className={`rounded-xl border px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSectionIdx === idx
                    ? 'text-primary shadow-xs font-bold'
                    : 'text-muted hover:text-primary'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>

          {/* Question Review List */}
          <div className="space-y-3">
            {assessment.sections[selectedSectionIdx]?.questions.map((q, qIdx) => {
              const isExpanded = expandedQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  style={{
                    backgroundColor: 'var(--ca-surface)',
                    borderColor: 'var(--ca-border)',
                  }}
                  className="rounded-2xl border overflow-hidden shadow-xs"
                >
                  {/* Question Summary Bar */}
                  <div
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="flex cursor-pointer items-center justify-between p-4 hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        style={{
                          backgroundColor: 'var(--ca-surface-muted)',
                          color: 'var(--ca-text)',
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold"
                      >
                        {qIdx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-primary line-clamp-1">
                          {q.type === 'mcq' ? q.question : q.title}
                        </div>
                        <div className="text-[11px] text-muted">
                          {q.subtopic} • {q.marks} Marks
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <ChevronDown
                        size={16}
                        className={`text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Expanded Solution & Breakdown */}
                  {isExpanded && (
                    <div
                      style={{
                        backgroundColor: 'var(--ca-surface-muted)',
                        borderColor: 'var(--ca-border)',
                      }}
                      className="border-t p-5 space-y-4 text-xs"
                    >
                      {q.type === 'mcq' ? (
                        <>
                          <div className="font-medium text-primary leading-relaxed whitespace-pre-line">
                            {q.question}
                          </div>

                          {q.codeSnippet && (
                            <pre
                              style={{
                                backgroundColor: 'var(--ca-canvas)',
                                borderColor: 'var(--ca-border)',
                              }}
                              className="rounded-xl border p-3 font-mono text-xs overflow-x-auto text-primary"
                            >
                              <code>{q.codeSnippet.code}</code>
                            </pre>
                          )}

                          {/* Options Review */}
                          <div className="grid gap-2">
                            {q.options.map((opt) => {
                              const isCorrect = opt.id === q.correctOptionId;
                              return (
                                <div
                                  key={opt.id}
                                  style={{
                                    backgroundColor: isCorrect
                                      ? 'rgba(16, 185, 129, 0.1)'
                                      : 'var(--ca-surface)',
                                    borderColor: isCorrect
                                      ? 'rgba(16, 185, 129, 0.4)'
                                      : 'var(--ca-border)',
                                  }}
                                  className="flex items-start gap-2.5 rounded-xl border p-3"
                                >
                                  <span
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-bold text-[10px] ${
                                      isCorrect
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-neutral-500/20 text-muted'
                                    }`}
                                  >
                                    {opt.id}
                                  </span>
                                  <span className="flex-1 whitespace-pre-line leading-relaxed text-primary">
                                    {opt.text}
                                  </span>
                                  {isCorrect && (
                                    <span className="font-bold text-emerald-500 text-[10px] uppercase tracking-wide">
                                      Correct Option
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation Accordion */}
                          <div
                            style={{
                              backgroundColor: 'var(--ca-surface)',
                              borderColor: 'var(--ca-border)',
                            }}
                            className="rounded-xl border p-4 space-y-2 text-primary"
                          >
                            <div className="flex items-center gap-1.5 font-bold text-blue-500 text-xs">
                              <Sparkles size={13} />
                              <span>Step-by-Step Derivation & Solution</span>
                            </div>
                            <p className="leading-relaxed text-muted">{q.explanation.summary}</p>
                            <ul className="list-disc pl-4 space-y-1 text-muted">
                              {q.explanation.steps.map((st, i) => (
                                <li key={i}>{st}</li>
                              ))}
                            </ul>
                            {q.explanation.formulaOrShortcut && (
                              <div
                                style={{
                                  backgroundColor: 'var(--ca-surface-muted)',
                                  borderColor: 'var(--ca-border)',
                                }}
                                className="mt-2 rounded-lg p-2 font-mono text-[11px] text-primary border"
                              >
                                <span className="font-bold text-blue-500">Shortcut / Formula: </span>
                                {q.explanation.formulaOrShortcut}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        // Coding Question Review
                        <div className="space-y-4">
                          <p className="text-primary leading-relaxed whitespace-pre-line">
                            {q.description}
                          </p>

                          {q.referenceCode && (
                            <div
                              style={{
                                backgroundColor: 'var(--ca-canvas)',
                                borderColor: 'var(--ca-border)',
                              }}
                              className="rounded-xl border overflow-hidden"
                            >
                              <div
                                style={{
                                  backgroundColor: 'var(--ca-surface-muted)',
                                  borderColor: 'var(--ca-border)',
                                }}
                                className="border-b px-4 py-1.5 text-[11px] font-mono text-muted"
                              >
                                Reference Solution ({q.referenceCode.language})
                              </div>
                              <pre className="p-4 font-mono text-xs overflow-x-auto text-primary">
                                <code>{q.referenceCode.code}</code>
                              </pre>
                            </div>
                          )}

                          <div
                            style={{
                              backgroundColor: 'var(--ca-surface)',
                              borderColor: 'var(--ca-border)',
                            }}
                            className="rounded-xl border p-3.5 text-primary"
                          >
                            <span className="font-bold text-primary">Explanation: </span>
                            <span className="text-muted">{q.explanation.summary}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
