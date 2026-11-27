import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  PanelLeftClose,
  PanelLeftOpen,
  Send,
  Sparkles,
} from 'lucide-react';
import { ActiveInterviewRound } from '../../types/interview';

interface InterviewHUDProps {
  round: ActiveInterviewRound;
  onSwitchProblem: (index: 0 | 1) => void;
  onSubmitInterview: () => void;
  isBriefCollapsed?: boolean;
  onToggleBriefCollapse?: () => void;
}

export default function InterviewHUD({
  round,
  onSwitchProblem,
  onSubmitInterview,
  isBriefCollapsed,
  onToggleBriefCollapse,
}: InterviewHUDProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const remaining = round.remainingSeconds;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLowTime = remaining <= 600; // <= 10 mins
  const isCriticalTime = remaining <= 180; // <= 3 mins

  const p1Solved = round.problem1State.isSolved;
  const p2Solved = round.problem2State.isSolved;

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-all duration-300 select-none"
        style={{
          backgroundColor: 'var(--ca-surface)',
          borderColor: isCriticalTime
            ? 'rgba(239, 68, 68, 0.4)'
            : isLowTime
            ? 'rgba(245, 158, 11, 0.4)'
            : 'var(--ca-border)',
          boxShadow: isCriticalTime ? '0 0 20px rgba(239, 68, 68, 0.15)' : 'none',
        }}
      >
        <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6">
          {/* Left: Clean Problem Switcher Tabs (No difficulty badges) */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Problem 1 Tab */}
            <button
              type="button"
              onClick={() => onSwitchProblem(0)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                round.currentProblemIndex === 0
                  ? 'bg-indigo-500/15 text-indigo-500 border border-indigo-500/30 shadow-xs'
                  : 'text-muted hover:bg-white/5 border border-transparent'
              }`}
            >
              {p1Solved ? (
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
              ) : (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-[10px] text-indigo-500 border border-indigo-500/20">
                  1
                </span>
              )}
              <span className="truncate max-w-[150px] sm:max-w-[240px]">
                Problem 1: {round.problem1.title}
              </span>
            </button>

            {/* Problem 2 Tab */}
            <button
              type="button"
              onClick={() => onSwitchProblem(1)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                round.currentProblemIndex === 1
                  ? 'bg-indigo-500/15 text-indigo-500 border border-indigo-500/30 shadow-xs'
                  : 'text-muted hover:bg-white/5 border border-transparent'
              }`}
            >
              {p2Solved ? (
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
              ) : (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-[10px] text-indigo-500 border border-indigo-500/20">
                  2
                </span>
              )}
              <span className="truncate max-w-[150px] sm:max-w-[240px]">
                Problem 2: {round.problem2.title}
              </span>
            </button>

            {/* Toggle Problem Statement Collapse / Full-Screen Coding */}
            {onToggleBriefCollapse && (
              <button
                type="button"
                onClick={onToggleBriefCollapse}
                className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all ml-1 ${
                  isBriefCollapsed
                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shadow-xs'
                    : 'text-muted hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
                title={isBriefCollapsed ? 'Show problem statement' : 'Collapse problem statement for full-width code editor'}
              >
                {isBriefCollapsed ? (
                  <>
                    <PanelLeftOpen size={14} />
                    <span className="hidden lg:inline">Show Problem</span>
                  </>
                ) : (
                  <>
                    <PanelLeftClose size={14} />
                    <span className="hidden lg:inline">Collapse Problem</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Center: Empty/Minimalist */}
          <div className="hidden md:flex items-center text-xs text-muted font-medium">
            <span className="text-[11px] uppercase tracking-wider text-muted font-bold">
              {round.title}
            </span>
          </div>

          {/* Right: Timer moved here + Finish Button (Focus option removed) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Top-Right Countdown Timer */}
            <div
              className={`flex items-center gap-2 rounded-2xl px-3.5 py-1.5 font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 ${
                isCriticalTime
                  ? 'bg-rose-500/15 text-rose-500 border border-rose-500/40 animate-pulse'
                  : isLowTime
                  ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                  : 'bg-white/5 text-primary border border-white/10'
              }`}
              title="Time remaining in this mock interview"
            >
              <Clock size={15} />
              <span>{formattedTime}</span>
            </div>

            {/* Finish & Grade Action */}
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 active:scale-95 transition-all"
            >
              <Send size={13} />
              <span className="hidden sm:inline">Finish & Grade</span>
              <span className="sm:hidden">Finish</span>
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-md rounded-2xl p-6 shadow-2xl border space-y-5"
            style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-primary">Submit Mock Interview?</h3>
                <p className="text-xs text-muted">You will exit full screen and be graded on correctness, pacing, and Big-O efficiency.</p>
              </div>
            </div>

            {/* Solved Summary Card */}
            <div
              className="rounded-xl p-3.5 space-y-2 border text-xs"
              style={{ backgroundColor: 'var(--ca-bg)', borderColor: 'var(--ca-border)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-muted">Problem 1: {round.problem1.title}</span>
                <span className={p1Solved ? 'font-bold text-emerald-500' : 'text-amber-500 font-semibold'}>
                  {p1Solved ? '✓ Solved' : 'Unsolved'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Problem 2: {round.problem2.title}</span>
                <span className={p2Solved ? 'font-bold text-emerald-500' : 'text-amber-500 font-semibold'}>
                  {p2Solved ? '✓ Solved' : 'Unsolved'}
                </span>
              </div>
              <div
                className="border-t pt-2 flex items-center justify-between text-muted"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                <span>Time Remaining:</span>
                <span className="font-mono font-bold text-primary">{formattedTime}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-muted hover:text-primary transition-colors"
              >
                Keep Coding
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  onSubmitInterview();
                }}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition-all"
              >
                Confirm & Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
