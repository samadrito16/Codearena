import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Eye,
  Flame,
  HelpCircle,
  Layers,
  Lightbulb,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  XCircle,
  Zap,
} from 'lucide-react';
import { CodeLine, MasteryProblem, RecallResult } from '../../types/mastery';

export interface DrillScore {
  recalled: number;
  total: number;
  timeSeconds: number;
}

export interface ActiveFillInDrillProps {
  problem: MasteryProblem;
  recallResults?: Record<number, RecallResult>;
  typedDrafts?: Record<number, string>;
  bestScore?: DrillScore;
  onRecordRecall?: (lineNumber: number, result: RecallResult) => void;
  onSaveTypedDraft?: (lineNumber: number, draft: string) => void;
  onRecordDrillScore?: (score: DrillScore) => void;
  onSaveScore?: (score: DrillScore) => void;
  onLaunchCodeRunner?: () => void;
}

function normalizeCode(str: string): string {
  let s = str.trim().replace(/['"]/g, '"').toLowerCase();
  // Forgiving check for while (cond): vs while cond: or if (cond): vs if cond:
  s = s.replace(/\b(while|if|elif)\s*\((.*)\)\s*:/g, '$1 $2:');
  // Strip non-essential spacing around common operators and punctuation
  return s.replace(/\s*([=+\-*/%<>&|^!]=?|:=|==|!=|<=|>=|,|:|\(|\)|\[|\]|\{|\})\s*/g, '$1');
}

const DRILL_DURATION_SECONDS = 180; // 3-minute timed speed drill

export default function ActiveFillInDrill({
  problem,
  recallResults = {},
  typedDrafts = {},
  bestScore,
  onRecordRecall = () => {},
  onSaveTypedDraft = () => {},
  onRecordDrillScore,
  onSaveScore,
  onLaunchCodeRunner,
}: ActiveFillInDrillProps) {
  const codeLines = problem.optimal_solution.code_lines;
  const criticalLines = useMemo(() => codeLines.filter((l) => l.is_high_risk), [codeLines]);
  const totalCritical = criticalLines.length;

  // Local state for user answers and status per line
  const [userInputs, setUserInputs] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    for (const line of criticalLines) {
      initial[line.line_number] = typedDrafts[line.line_number] || '';
    }
    return initial;
  });

  const [lineStatus, setLineStatus] = useState<Record<number, 'unattempted' | 'correct' | 'revealed'>>(() => {
    const initial: Record<number, 'unattempted' | 'correct' | 'revealed'> = {};
    for (const line of criticalLines) {
      if (recallResults[line.line_number] === 'got_it') {
        initial[line.line_number] = 'correct';
      } else if (recallResults[line.line_number] === 'missed') {
        initial[line.line_number] = 'revealed';
      } else {
        initial[line.line_number] = 'unattempted';
      }
    }
    return initial;
  });

  const [hintLevel, setHintLevel] = useState<Record<number, number>>({});
  const [streak, setStreak] = useState<number>(0);
  const [activeBlankIdx, setActiveBlankIdx] = useState<number>(0);

  // Timer states
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isUntimedMode, setIsUntimedMode] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(DRILL_DURATION_SECONDS);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isDrillCompleted, setIsDrillCompleted] = useState<boolean>(false);

  // Input refs for auto-focusing next blank
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // Countdown timer effect
  useEffect(() => {
    if (!isTimerRunning || isDrillCompleted || isUntimedMode) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsDrillCompleted(true);
          return 0;
        }
        return prev - 1;
      });
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, isDrillCompleted, isUntimedMode]);

  // Compute stats
  const correctCount = useMemo(() => {
    return Object.values(lineStatus).filter((s) => s === 'correct').length;
  }, [lineStatus]);

  const revealedCount = useMemo(() => {
    return Object.values(lineStatus).filter((s) => s === 'revealed').length;
  }, [lineStatus]);

  const attemptedCount = correctCount + revealedCount;
  const isAllFilled = attemptedCount === totalCritical;

  // Complete drill when all are filled
  useEffect(() => {
    if (isAllFilled && !isDrillCompleted) {
      setIsDrillCompleted(true);
      setIsTimerRunning(false);
      const saveScore = onSaveScore || onRecordDrillScore;
      if (saveScore) {
        saveScore({
          recalled: correctCount,
          total: totalCritical,
          timeSeconds: elapsedSeconds || 1,
        });
      }
    }
  }, [isAllFilled, isDrillCompleted, correctCount, totalCritical, elapsedSeconds, onRecordDrillScore, onSaveScore]);

  // Handle checking a blank
  function handleCheckLine(line: CodeLine) {
    const val = userInputs[line.line_number] || '';
    if (!val.trim()) return;

    const normUser = normalizeCode(val);
    const normTarget = normalizeCode(line.code);

    if (normUser === normTarget) {
      setLineStatus((prev) => ({ ...prev, [line.line_number]: 'correct' }));
      setStreak((prev) => prev + 1);
      onRecordRecall(line.line_number, 'got_it');

      // Auto-focus next unattempted blank
      const currentIdx = criticalLines.findIndex((l) => l.line_number === line.line_number);
      const nextBlank = criticalLines.slice(currentIdx + 1).find((l) => lineStatus[l.line_number] !== 'correct');
      if (nextBlank && inputRefs.current[nextBlank.line_number]) {
        setTimeout(() => {
          inputRefs.current[nextBlank.line_number]?.focus();
        }, 80);
      }
    } else {
      setStreak(0);
      // Highlight error temporarily
      const inputEl = inputRefs.current[line.line_number];
      if (inputEl) {
        inputEl.classList.add('ring-2', 'ring-rose-500');
        setTimeout(() => {
          inputEl.classList.remove('ring-2', 'ring-rose-500');
        }, 1200);
      }
    }
  }

  // Handle revealing a line
  function handleRevealLine(line: CodeLine) {
    setLineStatus((prev) => ({ ...prev, [line.line_number]: 'revealed' }));
    setStreak(0);
    onRecordRecall(line.line_number, 'missed');
  }

  // Handle progressive hints (Level 1: Clue, Level 2: Prefix, Level 3: Reveal)
  function handleNextHint(line: CodeLine) {
    const current = hintLevel[line.line_number] || 0;
    if (current < 2) {
      setHintLevel((prev) => ({ ...prev, [line.line_number]: current + 1 }));
    } else {
      handleRevealLine(line);
    }
  }

  // Handle Re-Drill
  function handleResetDrill() {
    setUserInputs({});
    setLineStatus({});
    setHintLevel({});
    setStreak(0);
    setTimeLeft(DRILL_DURATION_SECONDS);
    setElapsedSeconds(0);
    setIsDrillCompleted(false);
    setIsTimerRunning(true);

    // Focus first blank
    if (criticalLines[0] && inputRefs.current[criticalLines[0].line_number]) {
      setTimeout(() => {
        inputRefs.current[criticalLines[0].line_number]?.focus();
      }, 100);
    }
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* 1. DRILL HUD & CONTROL BAR */}
      <div
        className="p-4 sm:p-5 rounded-2xl border flex flex-wrap items-center justify-between gap-4 shadow-sm"
        style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
            <Zap size={22} className="fill-indigo-500/20" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-primary">
                Active Fill-in Recall Drill
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500 border border-indigo-500/30">
                {totalCritical} Critical Boundaries
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Fill in the critical 20–25% boundary lines from active memory.
            </p>
          </div>
        </div>

        {/* HUD Counters & Actions */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Streak Badge */}
          {streak > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold animate-in zoom-in-95">
              <Flame size={14} className="fill-amber-500 animate-bounce" />
              <span>{streak}x Streak</span>
            </div>
          )}

          {/* Completion Progress */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-muted">Recalled:</span>
            <span className="font-bold text-primary">
              <span className="text-emerald-500">{correctCount}</span> / {totalCritical}
            </span>
          </div>

          {/* Timer Display */}
          {!isUntimedMode ? (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition ${
                timeLeft <= 30
                  ? 'bg-rose-500/15 text-rose-500 border-rose-500/30 animate-pulse'
                  : 'bg-black/5 dark:bg-white/5 text-primary border-black/10 dark:border-white/10'
              }`}
            >
              <Clock size={13} className={isTimerRunning ? 'animate-spin' : ''} />
              <span>{timeFormatted}</span>
              <button
                type="button"
                onClick={() => setIsTimerRunning((prev) => !prev)}
                className="ml-1 text-muted hover:text-primary transition"
                title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
              >
                {isTimerRunning ? <Pause size={12} /> : <Play size={12} />}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/5 dark:bg-white/5 text-muted text-xs font-mono">
              <span>Untimed Practice</span>
            </div>
          )}

          {/* Untimed Toggle */}
          <button
            type="button"
            onClick={() => setIsUntimedMode((prev) => !prev)}
            className="text-[11px] text-muted hover:text-primary underline transition"
          >
            {isUntimedMode ? 'Enable Timer' : 'Untimed'}
          </button>

          {/* Re-drill Button */}
          <button
            type="button"
            onClick={handleResetDrill}
            className="btn-secondary h-8 px-2.5 text-xs text-muted hover:text-primary gap-1"
            title="Reset and start fresh drill"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* 2. IN-CONTEXT CODE CANVAS */}
      <div
        className="panel-card overflow-hidden border rounded-2xl shadow-sm"
        style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
      >
        <div
          className="p-3.5 sm:p-4 border-b flex items-center justify-between gap-3 text-xs"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
        >
          <div className="flex items-center gap-2 font-mono text-muted">
            <Code2 size={15} className="text-indigo-500" />
            <span>Optimal Blueprint Canvas &middot; Python 3</span>
          </div>
          <div className="text-[11px] text-muted flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-black/30 font-mono text-[10px]">Enter</kbd> to submit blank</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs leading-relaxed space-y-1">
          {codeLines.map((line) => {
            const isCritical = line.is_high_risk;
            const status = lineStatus[line.line_number] || 'unattempted';
            const value = userInputs[line.line_number] || '';
            const currentHint = hintLevel[line.line_number] || 0;

            const leadingSpaces = line.code.length - line.code.trimStart().length;
            const indentPadding = leadingSpaces * 8;

            if (!isCritical) {
              return (
                <div key={line.line_number} className="flex items-center gap-3 text-muted/80 hover:text-primary transition-colors py-0.5">
                  <span className="w-8 shrink-0 text-right select-none text-[11px] text-muted/50 font-mono">
                    {line.line_number}
                  </span>
                  <pre className="font-mono text-xs whitespace-pre">{line.code}</pre>
                </div>
              );
            }

            // CRITICAL ACTIVE FILL-IN LINE
            return (
              <div
                key={line.line_number}
                className={`group my-2 p-3 sm:p-4 rounded-xl border transition-all ${
                  status === 'correct'
                    ? 'border-emerald-500/40 bg-emerald-500/[0.06]'
                    : status === 'revealed'
                    ? 'border-indigo-500/30 bg-indigo-500/[0.04]'
                    : 'border-amber-500/40 bg-amber-500/[0.04] shadow-sm'
                }`}
              >
                {/* Header Clue / Boundary Prompt */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1.5 border-b border-black/5 dark:border-white/5 font-sans text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <AlertTriangle size={11} /> Line {line.line_number} &middot; Critical Boundary
                    </span>
                    <span className="text-muted text-[11px] hidden sm:inline">
                      <strong>Goal:</strong> {line.why_this_line}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {status === 'correct' && (
                      <span className="font-mono text-[11px] font-bold text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 size={13} /> Recalled Correctly
                      </span>
                    )}
                    {status === 'revealed' && (
                      <span className="font-mono text-[11px] font-bold text-indigo-400 flex items-center gap-1">
                        <Eye size={13} /> Blueprint Revealed
                      </span>
                    )}
                    {status === 'unattempted' && (
                      <button
                        type="button"
                        onClick={() => handleNextHint(line)}
                        className="text-[11px] text-amber-500 hover:text-amber-400 flex items-center gap-1 transition"
                        title="Unlock a progressive clue"
                      >
                        <Lightbulb size={12} />
                        <span>{currentHint === 0 ? 'Need Clue?' : currentHint === 1 ? 'Show Prefix' : 'Reveal'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Progressive Hint Callout */}
                {currentHint > 0 && status === 'unattempted' && (
                  <div className="mb-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 font-sans space-y-1">
                    {currentHint >= 1 && line.risk_note && (
                      <div>
                        <strong>Boundary Rule:</strong> {line.risk_note}
                      </div>
                    )}
                    {currentHint >= 2 && (
                      <div className="font-mono text-[11px]">
                        <strong>Prefix Hint:</strong> <code>{line.code.trim().slice(0, Math.max(8, Math.floor(line.code.trim().length * 0.4)))}…</code>
                      </div>
                    )}
                  </div>
                )}

                {/* Interactive Blank or Revealed Line */}
                {status === 'correct' || status === 'revealed' ? (
                  <div className="flex items-center justify-between gap-3 font-mono text-xs">
                    <pre className="font-mono whitespace-pre text-primary font-bold">{line.code}</pre>
                    <button
                      type="button"
                      onClick={() => {
                        setLineStatus((prev) => ({ ...prev, [line.line_number]: 'unattempted' }));
                        setUserInputs((prev) => ({ ...prev, [line.line_number]: '' }));
                      }}
                      className="text-[10px] text-muted hover:text-primary font-sans flex items-center gap-1"
                    >
                      <RotateCcw size={10} /> Re-try blank
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1" style={{ paddingLeft: `${Math.min(indentPadding, 60)}px` }}>
                      <input
                        ref={(el) => (inputRefs.current[line.line_number] = el)}
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const nextVal = e.target.value;
                          setUserInputs((prev) => ({ ...prev, [line.line_number]: nextVal }));
                          if (onSaveTypedDraft) onSaveTypedDraft(line.line_number, nextVal);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleCheckLine(line);
                          }
                        }}
                        placeholder={`Type boundary logic (e.g. ${line.code.trim().slice(0, 10)}…)`}
                        className="w-full font-mono text-xs px-3.5 py-2 rounded-xl border bg-slate-950/80 text-primary placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition"
                        autoCapitalize="off"
                        autoComplete="off"
                        spellCheck="false"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCheckLine(line)}
                      disabled={!value.trim()}
                      className="btn-primary h-8 px-3 text-xs font-semibold gap-1 shrink-0 disabled:opacity-40"
                    >
                      <Check size={13} /> Check
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRevealLine(line)}
                      className="btn-secondary h-8 px-2.5 text-xs text-muted hover:text-primary shrink-0"
                      title="Peek exact code line"
                    >
                      <Eye size={13} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. DRILL COMPLETION MODAL / SUMMARY CARD */}
      {isDrillCompleted && (
        <div className="p-6 sm:p-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-center space-y-4 animate-in zoom-in-95">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
            <Trophy size={32} />
          </div>

          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
              Pattern Drill Mastered!
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              You recalled {correctCount} of {totalCritical} critical boundary lines in {elapsedSeconds} seconds.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetDrill}
              className="btn-secondary h-9 px-4 text-xs font-semibold gap-1.5"
            >
              <RotateCcw size={14} /> Re-drill for Speed
            </button>

            {onLaunchCodeRunner && (
              <button
                type="button"
                onClick={onLaunchCodeRunner}
                className="btn-primary h-9 px-4 text-xs font-semibold gap-1.5"
              >
                <span>Launch In-Studio Code Runner</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
