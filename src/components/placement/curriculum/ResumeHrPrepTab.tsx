import React, { useState } from 'react';
import {
  AlertTriangle,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Copy,
  FileCheck2,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  UserCheck,
  XCircle,
} from 'lucide-react';
import {
  ATS_RESUME_GUIDELINES,
  HR_QUESTIONS_BANK,
} from '../../../data/placement/curriculum/hrQuestions';

export default function ResumeHrPrepTab() {
  const [activeSubTab, setActiveSubTab] = useState<'resume' | 'hr'>('resume');
  const [selectedHrCategory, setSelectedHrCategory] = useState<string>('all');
  const [expandedHrId, setExpandedHrId] = useState<string | null>(HR_QUESTIONS_BANK[0]?.id || null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const filteredHrQuestions = HR_QUESTIONS_BANK.filter((q) => {
    if (selectedHrCategory === 'all') return true;
    return q.category === selectedHrCategory;
  });

  const handleCopyResumeTemplate = () => {
    const template = ATS_RESUME_GUIDELINES[0]?.sampleTemplate || '';
    navigator.clipboard.writeText(template);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info */}
      <div
        className="rounded-2xl border p-5 shadow-xs"
        style={{
          borderColor: 'var(--ca-border)',
          backgroundColor: 'var(--ca-surface)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-bold text-purple-500 border border-purple-500/20">
              <UserCheck size={12} />
              <span>Placement Final-Round Readiness</span>
            </div>
            <h2 className="mt-2 text-lg sm:text-xl font-bold text-primary">
              ATS Resume Engineering & HR / Managerial Round Preparation
            </h2>
            <p className="mt-1 text-xs text-muted max-w-2xl">
              Master the final elimination hurdles for Tier-2 and Tier-3 campus hiring. Build an ATS-proof single-column resume that passes automated screening algorithms, and prepare structured STAR answers for tricky HR questions.
            </p>
          </div>

          {/* Sub-tab Pill Switcher */}
          <div
            className="flex items-center gap-1.5 rounded-xl border p-1 self-start sm:self-auto text-xs"
            style={{
              borderColor: 'var(--ca-border)',
              backgroundColor: 'var(--ca-surface-muted)',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveSubTab('resume')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                activeSubTab === 'resume'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-muted hover:text-primary'
              }`}
            >
              <FileCheck2 size={13} />
              <span>ATS Resume Blueprint</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('hr')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                activeSubTab === 'hr'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-muted hover:text-primary'
              }`}
            >
              <MessageSquare size={13} />
              <span>HR Interview Questions</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: ATS RESUME BLUEPRINT */}
      {activeSubTab === 'resume' && (
        <div className="space-y-6">
          {/* Guidelines Grid */}
          <div className="grid gap-5 md:grid-cols-2">
            {ATS_RESUME_GUIDELINES.map((sec) => (
              <div
                key={sec.id}
                className="rounded-2xl border p-5 shadow-xs space-y-4"
                style={{
                  borderColor: 'var(--ca-border)',
                  backgroundColor: 'var(--ca-surface)',
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                    <FileCheck2 size={15} className="text-indigo-400" />
                    <span>{sec.title}</span>
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      sec.importance === 'Critical'
                        ? 'text-rose-500 bg-rose-500/10 border border-rose-500/20'
                        : 'text-amber-500 bg-amber-500/10 border border-amber-500/20'
                    }`}
                  >
                    {sec.importance}
                  </span>
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  {sec.summary}
                </p>

                {/* Dos and Don'ts */}
                <div className="grid gap-3 pt-1">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      <span>Best Practices (Dos)</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-muted leading-relaxed">
                      {sec.dos.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t" style={{ borderColor: 'var(--ca-border)' }}>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1">
                      <XCircle size={12} />
                      <span>Avoid (Don'ts)</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-muted leading-relaxed">
                      {sec.donts.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Copyable Plain-Text ATS Template */}
          <div
            className="rounded-2xl border p-5 shadow-xs space-y-3"
            style={{
              borderColor: 'var(--ca-border)',
              backgroundColor: 'var(--ca-surface)',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                  <BookOpen size={15} className="text-blue-500" />
                  <span>Standard 1-Page ATS Fresher Resume Template</span>
                </h3>
                <p className="text-[11px] text-muted mt-0.5">
                  Pre-configured structure tested to score 90%+ on Workday, Taleo, and Greenhouse ATS screeners.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyResumeTemplate}
                className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold text-primary hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: 'var(--ca-surface-muted)',
                  borderColor: 'var(--ca-border)',
                }}
              >
                {copiedTemplate ? <CheckCircle2 size={13} className="text-emerald-500" /> : <Copy size={13} />}
                <span>{copiedTemplate ? 'Copied Template!' : 'Copy Template'}</span>
              </button>
            </div>

            <pre
              className="p-4 rounded-xl border font-mono text-xs overflow-x-auto text-primary leading-relaxed max-h-[340px]"
              style={{
                backgroundColor: 'var(--ca-canvas)',
                borderColor: 'var(--ca-border)',
              }}
            >
              <code>{ATS_RESUME_GUIDELINES[0]?.sampleTemplate}</code>
            </pre>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: HR & MANAGERIAL QUESTIONS BANK */}
      {activeSubTab === 'hr' && (
        <div className="space-y-5">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {['all', 'Introduction', 'Company Fit', 'Technical Transition', 'Behavioral'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedHrCategory(cat)}
                style={{
                  backgroundColor: selectedHrCategory === cat ? 'var(--ca-surface-muted)' : 'var(--ca-surface)',
                  borderColor: selectedHrCategory === cat ? 'var(--ca-accent, #3b82f6)' : 'var(--ca-border)',
                }}
                className={`rounded-xl border px-3.5 py-1.5 font-bold whitespace-nowrap transition-all ${
                  selectedHrCategory === cat ? 'text-primary shadow-xs' : 'text-muted hover:text-primary'
                }`}
              >
                {cat === 'all' ? 'All Questions' : cat}
              </button>
            ))}
          </div>

          {/* Question Flashcards */}
          <div className="space-y-4">
            {filteredHrQuestions.map((q) => {
              const isExpanded = expandedHrId === q.id;

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border shadow-xs overflow-hidden transition-all"
                  style={{
                    borderColor: 'var(--ca-border)',
                    backgroundColor: 'var(--ca-surface)',
                  }}
                >
                  {/* Header Bar (Clickable) */}
                  <div
                    onClick={() => setExpandedHrId(isExpanded ? null : q.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                          {q.category}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-muted">
                          <span>Asked at:</span>
                          {q.frequentlyAskedAt.map((comp) => (
                            <span key={comp} className="font-semibold text-primary">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-primary">
                        {q.question}
                      </h3>
                    </div>

                    <ChevronDown
                      size={18}
                      className={`text-muted transition-transform shrink-0 ml-4 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div
                      className="border-t p-5 space-y-5 text-xs"
                      style={{
                        borderColor: 'var(--ca-border)',
                        backgroundColor: 'var(--ca-surface-muted)',
                      }}
                    >
                      {/* Recruiter Psychology Box */}
                      <div
                        className="rounded-xl border p-3.5 space-y-1"
                        style={{
                          borderColor: 'color-mix(in srgb, var(--ca-accent-solid) 30%, var(--ca-border))',
                          backgroundColor: 'var(--ca-surface)',
                        }}
                      >
                        <div className="font-bold text-primary flex items-center gap-1.5 text-xs">
                          <Lightbulb size={13} className="text-amber-500" />
                          <span>Interviewer Psychology (Why They Ask This)</span>
                        </div>
                        <p className="text-muted leading-relaxed">
                          {q.whyInterviewersAsk}
                        </p>
                      </div>

                      {/* STAR Breakdown */}
                      <div className="space-y-2">
                        <div className="font-bold uppercase tracking-wider text-muted text-[11px] flex items-center gap-1">
                          <Award size={12} className="text-indigo-400" />
                          <span>STAR Method Framework Breakdown</span>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <div
                            className="rounded-xl border p-3"
                            style={{
                              borderColor: 'var(--ca-border)',
                              backgroundColor: 'var(--ca-surface)',
                            }}
                          >
                            <span className="font-bold text-indigo-400">Situation: </span>
                            <span className="text-muted">{q.starBreakdown.situation}</span>
                          </div>
                          <div
                            className="rounded-xl border p-3"
                            style={{
                              borderColor: 'var(--ca-border)',
                              backgroundColor: 'var(--ca-surface)',
                            }}
                          >
                            <span className="font-bold text-blue-400">Task: </span>
                            <span className="text-muted">{q.starBreakdown.task}</span>
                          </div>
                          <div
                            className="rounded-xl border p-3"
                            style={{
                              borderColor: 'var(--ca-border)',
                              backgroundColor: 'var(--ca-surface)',
                            }}
                          >
                            <span className="font-bold text-emerald-400">Action: </span>
                            <span className="text-muted">{q.starBreakdown.action}</span>
                          </div>
                          <div
                            className="rounded-xl border p-3"
                            style={{
                              borderColor: 'var(--ca-border)',
                              backgroundColor: 'var(--ca-surface)',
                            }}
                          >
                            <span className="font-bold text-amber-400">Result: </span>
                            <span className="text-muted">{q.starBreakdown.result}</span>
                          </div>
                        </div>
                      </div>

                      {/* Model High-Scoring Answer */}
                      <div className="space-y-2">
                        <div className="font-bold uppercase tracking-wider text-emerald-500 text-[11px] flex items-center gap-1">
                          <Sparkles size={12} />
                          <span>Model Campus Fresher Answer</span>
                        </div>
                        <div
                          className="rounded-xl border p-4 text-primary leading-relaxed whitespace-pre-line text-xs font-sans"
                          style={{
                            borderColor: 'rgba(16, 185, 129, 0.3)',
                            backgroundColor: 'var(--ca-surface)',
                          }}
                        >
                          {q.sampleAnswer}
                        </div>
                      </div>

                      {/* Pro Tips & Pitfalls */}
                      <div className="grid gap-3 sm:grid-cols-2 pt-2">
                        <div className="space-y-1.5">
                          <div className="font-bold text-emerald-500 flex items-center gap-1 text-[11px]">
                            <CheckCircle2 size={12} />
                            <span>Pro Tips</span>
                          </div>
                          <ul className="list-disc pl-4 space-y-1 text-muted">
                            {q.proTips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1.5">
                          <div className="font-bold text-rose-500 flex items-center gap-1 text-[11px]">
                            <AlertTriangle size={12} />
                            <span>Red Flags / Pitfalls to Avoid</span>
                          </div>
                          <ul className="list-disc pl-4 space-y-1 text-muted">
                            {q.pitfallsToAvoid.map((pit, idx) => (
                              <li key={idx}>{pit}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
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
