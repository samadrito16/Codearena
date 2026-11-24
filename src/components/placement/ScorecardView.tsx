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
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Placement Hub</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            <RotateCcw size={13} />
            <span>Retake Assessment</span>
          </button>
        </div>
      </div>

      {/* Hero Performance Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 p-6 sm:p-8 shadow-sm dark:border-neutral-800/80 dark:from-neutral-900 dark:via-neutral-900/90 dark:to-blue-950/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Company & Assessment Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl text-base font-bold text-white shadow-sm"
                style={{ backgroundColor: company?.brandColor || '#3b82f6' }}
              >
                {report.companyName.charAt(0)}
              </span>
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400">
                  {company?.shortName || report.companyName} • Placement Simulation
                </span>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
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
              <span className="text-xs text-slate-500 dark:text-neutral-400">
                {report.verdictTier.description}
              </span>
            </div>
          </div>

          {/* Right: Score & National Percentile */}
          <div className="flex items-center gap-4 sm:gap-6 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-850/80">
            {/* Score */}
            <div className="text-center px-2">
              <div className="text-[11px] font-medium text-slate-500 dark:text-neutral-400">Total Score</div>
              <div className="mt-0.5 font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {report.totalScore}
                <span className="text-sm font-semibold text-slate-400 dark:text-neutral-500">
                  /{report.maxScore}
                </span>
              </div>
              <div className="mt-0.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                {report.percentage}% Accuracy
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200 dark:bg-neutral-700" />

            {/* Percentile */}
            <div className="text-center px-2">
              <div className="text-[11px] font-medium text-slate-500 dark:text-neutral-400">Predicted Percentile</div>
              <div className="mt-0.5 font-display text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {report.projectedPercentile}%
              </div>
              <div className="mt-0.5 text-[10px] font-medium text-slate-500 dark:text-neutral-400">
                vs 50k+ Test Takers
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Bullet Points */}
        <div className="mt-6 border-t border-slate-100 pt-4 dark:border-neutral-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-2">
            Assessment Diagnostic Summary
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {report.summaryFeedback.map((fb, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300"
              >
                <Sparkles size={13} className="shrink-0 text-blue-500 mt-0.5" />
                <span>{fb}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Overview vs Question Review) */}
      <div className="flex border-b border-slate-200 dark:border-neutral-800">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200'
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
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200'
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
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-3">
              Sectional Scorecard
            </h3>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {report.sectionalReports.map((sec) => (
                <div
                  key={sec.sectionId}
                  className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xs dark:border-neutral-800/80 dark:bg-neutral-900/90"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-neutral-200 truncate">
                      {sec.sectionTitle}
                    </span>
                    {sec.clearedCutoff ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 size={11} />
                        Cleared
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400">
                        <XCircle size={11} />
                        Cutoff Missed
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-baseline justify-between">
                    <div className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      {sec.score}
                      <span className="text-xs font-normal text-slate-400 dark:text-neutral-500">
                        /{sec.maxScore}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 dark:text-neutral-400">
                      {sec.percentage}%
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        sec.clearedCutoff ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, sec.percentage)}%` }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400">
                    <span>Attempted: {sec.attemptedQuestions}/{sec.totalQuestions}</span>
                    <span>Correct: {sec.correctAnswers}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Diagnostic Matrix */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-3">
              Topic Strengths & Focus Areas
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {report.topicDiagnostics.map((topic) => (
                <div
                  key={topic.subject}
                  className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xs dark:border-neutral-800/80 dark:bg-neutral-900/90"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-neutral-200">
                      {topic.subjectTitle}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        topic.strength === 'Strong'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : topic.strength === 'Moderate'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {topic.strength}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs text-slate-600 dark:text-neutral-400">
                    <span>
                      Score: {topic.correct} / {topic.total}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-neutral-200">
                      {topic.percentage}%
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
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
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSectionIdx === idx
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
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
                  className="rounded-2xl border border-slate-200/90 bg-white/95 dark:border-neutral-800 dark:bg-neutral-900/95 overflow-hidden shadow-xs"
                >
                  {/* Question Summary Bar */}
                  <div
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50/70 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700 dark:bg-neutral-800 dark:text-neutral-300">
                        {qIdx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">
                          {q.type === 'mcq' ? q.question : q.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-neutral-400">
                          {q.subtopic} • {q.marks} Marks
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Expanded Solution & Breakdown */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 p-5 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-950/40 space-y-4 text-xs">
                      {q.type === 'mcq' ? (
                        <>
                          <div className="font-medium text-slate-800 dark:text-neutral-200 leading-relaxed whitespace-pre-line">
                            {q.question}
                          </div>

                          {q.codeSnippet && (
                            <pre className="rounded-xl border border-slate-200 bg-slate-900 p-3 text-slate-100 dark:border-neutral-800 font-mono text-xs overflow-x-auto">
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
                                  className={`flex items-start gap-2.5 rounded-xl border p-3 ${
                                    isCorrect
                                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 dark:border-emerald-500/80 dark:bg-emerald-950/40 dark:text-emerald-100'
                                      : 'border-slate-200 bg-white text-slate-700 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300'
                                  }`}
                                >
                                  <span
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-bold text-[10px] ${
                                      isCorrect
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-slate-100 text-slate-600 dark:bg-neutral-700 dark:text-neutral-300'
                                    }`}
                                  >
                                    {opt.id}
                                  </span>
                                  <span className="flex-1 whitespace-pre-line leading-relaxed">{opt.text}</span>
                                  {isCorrect && (
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[10px] uppercase tracking-wide">
                                      Correct Option
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation Accordion */}
                          <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 text-blue-950 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-100 space-y-2">
                            <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300 text-xs">
                              <Sparkles size={13} />
                              <span>Step-by-Step Derivation & Solution</span>
                            </div>
                            <p className="leading-relaxed">{q.explanation.summary}</p>
                            <ul className="list-disc pl-4 space-y-1">
                              {q.explanation.steps.map((st, i) => (
                                <li key={i}>{st}</li>
                              ))}
                            </ul>
                            {q.explanation.formulaOrShortcut && (
                              <div className="mt-2 rounded-lg bg-white/80 p-2 font-mono text-[11px] text-blue-800 dark:bg-neutral-900/80 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
                                <span className="font-bold">Shortcut / Formula: </span>
                                {q.explanation.formulaOrShortcut}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        // Coding Question Review
                        <div className="space-y-4">
                          <p className="text-slate-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                            {q.description}
                          </p>

                          {q.referenceCode && (
                            <div className="rounded-xl border border-slate-200 bg-slate-900 text-slate-100 dark:border-neutral-800 overflow-hidden">
                              <div className="border-b border-slate-800 bg-slate-950 px-4 py-1.5 text-[11px] font-mono text-slate-400">
                                Reference Solution ({q.referenceCode.language})
                              </div>
                              <pre className="p-4 font-mono text-xs overflow-x-auto text-slate-200">
                                <code>{q.referenceCode.code}</code>
                              </pre>
                            </div>
                          )}

                          <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-neutral-800 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300">
                            <span className="font-bold text-slate-900 dark:text-white">Explanation: </span>
                            {q.explanation.summary}
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
