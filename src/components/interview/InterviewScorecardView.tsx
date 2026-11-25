import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Cpu,
  Lock,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trophy,
  XCircle,
  Zap,
} from 'lucide-react';
import { ActiveInterviewRound, InterviewScorecard } from '../../types/interview';
import { editorialsService } from '../../services/editorialsService';
import type { ProblemEditorial } from '../../types';
import TimeAllocationChart from './TimeAllocationChart';

interface InterviewScorecardViewProps {
  scorecard: InterviewScorecard;
  round: ActiveInterviewRound;
  onRetake: () => void;
  onBackToHub: () => void;
}

export default function InterviewScorecardView({
  scorecard,
  round,
  onRetake,
  onBackToHub,
}: InterviewScorecardViewProps) {
  const [activeEditorialTab, setActiveEditorialTab] = useState<1 | 2>(1);
  const [ed1, setEd1] = useState<ProblemEditorial | null>(null);
  const [ed2, setEd2] = useState<ProblemEditorial | null>(null);
  const [editorialLoading, setEditorialLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setEditorialLoading(true);
    Promise.all([
      editorialsService.getByProblemId(round.problem1.id).catch(() => null),
      editorialsService.getByProblemId(round.problem2.id).catch(() => null),
    ]).then(([res1, res2]) => {
      if (!cancelled) {
        setEd1(res1);
        setEd2(res2);
        setEditorialLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [round.problem1.id, round.problem2.id]);

  const verdictStyles: Record<string, { bg: string; text: string; border: string; label: string }> = {
    'STRONG HIRE': {
      bg: 'bg-emerald-500/15',
      text: 'text-emerald-500',
      border: 'border-emerald-500/30',
      label: 'Strong Hire · High Recommendation',
    },
    HIRE: {
      bg: 'bg-cyan-500/15',
      text: 'text-cyan-500',
      border: 'border-cyan-500/30',
      label: 'Hire · Meets Bar',
    },
    'LEAN HIRE': {
      bg: 'bg-amber-500/15',
      text: 'text-amber-500',
      border: 'border-amber-500/30',
      label: 'Lean Hire · Borderline Qualified',
    },
    'NO HIRE': {
      bg: 'bg-rose-500/15',
      text: 'text-rose-500',
      border: 'border-rose-500/30',
      label: 'No Hire · Further Practice Required',
    },
  };

  const currentVerdictStyle = verdictStyles[scorecard.verdict] || verdictStyles['NO HIRE'];

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-9 space-y-8 animate-in fade-in duration-300">
      {/* Hero Verdict Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden ${currentVerdictStyle.bg} ${currentVerdictStyle.border}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/20 text-primary border" style={{ borderColor: 'var(--ca-border)' }}>
              <Trophy size={13} className={currentVerdictStyle.text} />
              <span>Technical Interview Evaluation</span>
            </div>
            <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${currentVerdictStyle.text}`}>
              {scorecard.verdict}
            </h1>
            <p className="text-sm text-muted font-medium max-w-xl">
              {currentVerdictStyle.label}. Based on execution correctness, time allocation pacing, and interview integrity.
            </p>
            {scorecard.autoSubmitReason && (
              <div className="rounded-xl p-3 bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold text-xs flex items-center gap-2 mt-2">
                <AlertTriangle size={15} className="shrink-0" />
                <span>{scorecard.autoSubmitReason}</span>
              </div>
            )}
          </div>

          {/* Big Score / Percentile Badges */}
          <div className="flex items-center gap-4 shrink-0">
            {scorecard.percentile !== undefined && (
              <div className="rounded-2xl p-4 bg-black/25 border backdrop-blur-md text-center min-w-[110px]" style={{ borderColor: 'var(--ca-border)' }}>
                <div className="text-[10px] uppercase font-bold text-muted">Percentile</div>
                <div className="text-2xl font-black text-primary">{scorecard.percentile}%</div>
                <div className="text-[10px] text-muted">vs peers</div>
              </div>
            )}

            <div className="rounded-2xl p-4 bg-black/25 border backdrop-blur-md text-center min-w-[110px]" style={{ borderColor: 'var(--ca-border)' }}>
              <div className="text-[10px] uppercase font-bold text-muted">Composite Score</div>
              <div className="text-2xl font-black text-primary">{scorecard.overallScore}/100</div>
              <div className="text-[10px] text-muted">weighted grade</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Problem Correctness Cards & Time Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Problem Performance Cards */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
            Problems Evaluated
          </h3>

          {/* Problem 1 Card */}
          <div className="rounded-2xl p-4 border space-y-3" style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500/10 text-[11px] font-bold text-amber-500">
                  1
                </span>
                <span className="font-bold text-sm text-primary">{round.problem1.title}</span>
                <span className="rounded bg-amber-500/10 px-1.5 py-0.2 text-[10px] font-bold text-amber-500">
                  Medium
                </span>
              </div>
              <span className={`text-xs font-bold ${round.problem1State.isSolved ? 'text-emerald-500' : 'text-rose-500'}`}>
                {round.problem1State.isSolved ? '✓ Solved' : 'Incomplete'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl p-2 bg-black/10 border" style={{ borderColor: 'var(--ca-border)' }}>
                <div className="text-[10px] text-muted">Tests Passed</div>
                <div className="font-bold text-primary">{scorecard.correctness.problem1Passed} / {scorecard.correctness.problem1Total}</div>
              </div>
              <div className="rounded-xl p-2 bg-black/10 border" style={{ borderColor: 'var(--ca-border)' }}>
                <div className="text-[10px] text-muted">Time Spent</div>
                <div className="font-bold text-primary">{scorecard.timeAllocation.problem1Minutes}m</div>
              </div>
              <div className="rounded-xl p-2 bg-black/10 border" style={{ borderColor: 'var(--ca-border)' }}>
                <div className="text-[10px] text-muted">Submissions</div>
                <div className="font-bold text-primary">{round.problem1State.attemptsCount} attempts</div>
              </div>
            </div>
          </div>

          {/* Problem 2 Card */}
          <div className="rounded-2xl p-4 border space-y-3" style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-[11px] font-bold text-indigo-500">
                  2
                </span>
                <span className="font-bold text-sm text-primary">{round.problem2.title}</span>
                <span className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                  round.problem2.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {round.problem2.difficulty}
                </span>
              </div>
              <span className={`text-xs font-bold ${round.problem2State.isSolved ? 'text-emerald-500' : 'text-rose-500'}`}>
                {round.problem2State.isSolved ? '✓ Solved' : 'Incomplete'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl p-2 bg-black/10 border" style={{ borderColor: 'var(--ca-border)' }}>
                <div className="text-[10px] text-muted">Tests Passed</div>
                <div className="font-bold text-primary">{scorecard.correctness.problem2Passed} / {scorecard.correctness.problem2Total}</div>
              </div>
              <div className="rounded-xl p-2 bg-black/10 border" style={{ borderColor: 'var(--ca-border)' }}>
                <div className="text-[10px] text-muted">Time Spent</div>
                <div className="font-bold text-primary">{scorecard.timeAllocation.problem2Minutes}m</div>
              </div>
              <div className="rounded-xl p-2 bg-black/10 border" style={{ borderColor: 'var(--ca-border)' }}>
                <div className="text-[10px] text-muted">Submissions</div>
                <div className="font-bold text-primary">{round.problem2State.attemptsCount} attempts</div>
              </div>
            </div>
          </div>

          {/* Interview Integrity Badge */}
          <div className="rounded-2xl p-4 border flex items-center justify-between text-xs" style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}>
            <div className="flex items-center gap-2.5">
              {scorecard.integrity.tabSwitches === 0 ? (
                <ShieldCheck size={18} className="text-emerald-500" />
              ) : (
                <ShieldAlert size={18} className="text-amber-500" />
              )}
              <div>
                <div className="font-bold text-primary">Interview Integrity: {scorecard.integrity.rating}</div>
                <div className="text-muted text-[11px]">{scorecard.integrity.tabSwitches} tab-switching infractions recorded</div>
              </div>
            </div>
            <span className="font-mono text-muted text-[11px]">45m HUD Guard</span>
          </div>
        </div>

        {/* Right: Time Allocation Chart & Actionable Recommendations */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
            Pacing & Diagnostics
          </h3>

          <TimeAllocationChart
            p1Minutes={scorecard.timeAllocation.problem1Minutes}
            p2Minutes={scorecard.timeAllocation.problem2Minutes}
            totalDurationMinutes={scorecard.durationMinutes}
            pacingRating={scorecard.timeAllocation.pacingRating}
          />

          {/* Actionable Feedback */}
          <div className="rounded-2xl p-5 border space-y-3" style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}>
            <div className="flex items-center gap-2 font-bold text-sm text-primary">
              <Sparkles size={15} className="text-indigo-500" />
              <span>Interviewer Diagnostic Notes</span>
            </div>
            <ul className="space-y-2 text-xs leading-relaxed text-muted">
              {scorecard.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold shrink-0">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Solutions & Editorial Unlocks */}
      <div className="rounded-3xl p-6 sm:p-8 border space-y-6" style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--ca-border)' }}>
          <div className="flex items-center gap-2.5">
            <BookOpen size={18} className="text-indigo-500" />
            <div>
              <h3 className="text-base font-bold text-primary">Official Solution & Editorial Unlocked</h3>
              <p className="text-xs text-muted">Review optimal Big-O approaches, progressive hints, and reference implementations.</p>
            </div>
          </div>

          {/* Toggle between P1 and P2 Editorial */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveEditorialTab(1)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeEditorialTab === 1
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white/5 text-muted hover:text-primary'
              }`}
            >
              P1: {round.problem1.title}
            </button>
            <button
              type="button"
              onClick={() => setActiveEditorialTab(2)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeEditorialTab === 2
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white/5 text-muted hover:text-primary'
              }`}
            >
              P2: {round.problem2.title}
            </button>
          </div>
        </div>

        {/* Selected Problem Solution Details */}
        {activeEditorialTab === 1 && ed1 && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <span>{ed1.approachTitle}</span>
              <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] text-indigo-500 font-mono">
                Time: {ed1.timeComplexity} | Space: {ed1.spaceComplexity}
              </span>
            </div>

            <p className="text-muted leading-relaxed">{ed1.summary}</p>

            <div className="space-y-2">
              <div className="font-bold text-primary uppercase text-[11px] tracking-wider">Approach Steps:</div>
              <ul className="list-disc list-inside space-y-1 text-muted pl-1">
                {ed1.approachSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>

            {ed1.referenceCode && (
              <div className="space-y-1 pt-2">
                <div className="font-bold text-primary uppercase text-[11px] tracking-wider">
                  Reference Code ({ed1.referenceCode.language}):
                </div>
                <pre className="rounded-xl p-4 bg-black/30 text-emerald-400 font-mono text-xs overflow-x-auto border" style={{ borderColor: 'var(--ca-border)' }}>
                  {ed1.referenceCode.code}
                </pre>
              </div>
            )}
          </div>
        )}

        {activeEditorialTab === 1 && !ed1 && (
          <div className="py-6 text-center space-y-2">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Lock size={18} />
            </div>
            <div className="text-xs font-bold text-primary">Editorial Gated by Plan</div>
            <p className="text-[11px] text-muted max-w-sm mx-auto">
              Complete reference solutions and progressive hints are available with a Pro or Premium plan.
            </p>
          </div>
        )}

        {activeEditorialTab === 2 && ed2 && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <span>{ed2.approachTitle}</span>
              <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] text-indigo-500 font-mono">
                Time: {ed2.timeComplexity} | Space: {ed2.spaceComplexity}
              </span>
            </div>

            <p className="text-muted leading-relaxed">{ed2.summary}</p>

            <div className="space-y-2">
              <div className="font-bold text-primary uppercase text-[11px] tracking-wider">Approach Steps:</div>
              <ul className="list-disc list-inside space-y-1 text-muted pl-1">
                {ed2.approachSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>

            {ed2.referenceCode && (
              <div className="space-y-1 pt-2">
                <div className="font-bold text-primary uppercase text-[11px] tracking-wider">
                  Reference Code ({ed2.referenceCode.language}):
                </div>
                <pre className="rounded-xl p-4 bg-black/30 text-emerald-400 font-mono text-xs overflow-x-auto border" style={{ borderColor: 'var(--ca-border)' }}>
                  {ed2.referenceCode.code}
                </pre>
              </div>
            )}
          </div>
        )}

        {activeEditorialTab === 2 && !ed2 && (
          <div className="py-6 text-center space-y-2">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Lock size={18} />
            </div>
            <div className="text-xs font-bold text-primary">Editorial Gated by Plan</div>
            <p className="text-[11px] text-muted max-w-sm mx-auto">
              Complete reference solutions and progressive hints are available with a Pro or Premium plan.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBackToHub}
          className="rounded-xl px-5 py-2.5 text-xs font-semibold text-muted hover:text-primary transition-colors border"
          style={{ borderColor: 'var(--ca-border)' }}
        >
          Back to Interview Hub
        </button>

        <button
          type="button"
          onClick={onRetake}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-500 active:scale-95 transition-all"
        >
          <RotateCcw size={14} />
          <span>Start New Interview Round</span>
        </button>
      </div>
    </div>
  );
}
