import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Code2,
  Eye,
  EyeOff,
  Flame,
  HelpCircle,
  Info,
  Layers,
  RotateCcw,
  Sparkles,
  Target,
  XCircle,
  Zap,
} from 'lucide-react';
import { CodeLine, MasteryProblem, RecallResult } from '../../types/mastery';

type ViewerMode = 'blueprint' | 'hardest_25' | 'recall';

interface SubgoalBlueprintViewerProps {
  problem: MasteryProblem;
  recallResults: Record<number, RecallResult>;
  onRecordRecall: (lineNumber: number, result: RecallResult) => void;
  typedDrafts?: Record<number, string>;
  onSaveTypedDraft?: (lineNumber: number, draft: string) => void;
  onSwitchToDrill?: () => void;
}

function normalizeCode(str: string): string {
  let s = str.trim().replace(/['"]/g, '"').toLowerCase();
  // Forgiving check for while (cond): vs while cond:
  s = s.replace(/([a-z]+)\s*\((.*)\)\s*:/g, '$1 $2:');
  return s.replace(/\s*([=+\-*/%<>&|^!]=?|:=|==|!=|<=|>=|,|:|\(|\)|\[|\]|\{|\})\s*/g, '$1');
}

interface TypedRecallItemProps {
  line: CodeLine;
  recallStatus?: RecallResult;
  initialDraft?: string;
  onRecordRecall: (lineNumber: number, result: RecallResult) => void;
  onSaveDraft?: (lineNumber: number, draft: string) => void;
  onSelectLine: (lineNumber: number) => void;
}

function TypedRecallItem({
  line,
  recallStatus,
  initialDraft = '',
  onRecordRecall,
  onSaveDraft,
  onSelectLine,
}: TypedRecallItemProps) {
  const [typedValue, setTypedValue] = useState(initialDraft);
  const [isRevealed, setIsRevealed] = useState(Boolean(recallStatus));
  const [attemptFeedback, setAttemptFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const cleanExpected = line.code.trim();

  function handleCheck() {
    if (!typedValue.trim()) return;

    const normUser = normalizeCode(typedValue);
    const normExpected = normalizeCode(line.code);

    if (normUser === normExpected) {
      setAttemptFeedback('correct');
      setIsRevealed(true);
      onRecordRecall(line.line_number, 'got_it');
    } else {
      setAttemptFeedback('incorrect');
    }
  }

  function handleReveal() {
    setIsRevealed(true);
    setAttemptFeedback('idle');
    if (!recallStatus) {
      onRecordRecall(line.line_number, 'missed');
    }
  }

  function handleReset() {
    setIsRevealed(false);
    setAttemptFeedback('idle');
    setTypedValue('');
    if (onSaveDraft) onSaveDraft(line.line_number, '');
  }

  // Calculate indentation of actual line for visual alignment
  const leadingSpaces = line.code.length - line.code.trimStart().length;
  const indentPadding = Math.min(leadingSpaces * 8, 48);

  return (
    <div
      onClick={() => onSelectLine(line.line_number)}
      className="p-3.5 my-1.5 rounded-xl border border-indigo-500/25 bg-indigo-500/[0.04] space-y-2.5 transition-all"
    >
      {/* Header Prompt & Clue */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-amber-500 flex items-center gap-1 text-[11px] bg-amber-500/15 px-2 py-0.5 rounded-sm">
            <AlertTriangle size={11} /> Critical Line #{line.line_number}
          </span>
          <span className="text-muted text-[11px] font-sans">
            <strong>Clue:</strong> {line.why_this_line}
          </span>
        </div>

        {recallStatus && (
          <span
            className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-sm ${
              recallStatus === 'got_it'
                ? 'bg-emerald-500/20 text-emerald-500'
                : 'bg-rose-500/20 text-rose-500'
            }`}
          >
            {recallStatus === 'got_it' ? '✓ Recalled' : '✗ Missed'}
          </span>
        )}
      </div>

      {/* Main Interactive Stage */}
      {isRevealed ? (
        <div className="space-y-2">
          <div
            className={`p-3 rounded-lg font-mono text-xs overflow-x-auto border flex items-center justify-between gap-4 ${
              recallStatus === 'got_it'
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-900 border-indigo-500/30 text-slate-100'
            }`}
          >
            <code className="whitespace-pre">{line.code}</code>
            <div className="flex items-center gap-2 shrink-0 font-sans" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] text-muted hover:text-primary transition flex items-center gap-1"
                title="Practice typing again"
              >
                <RotateCcw size={12} /> Re-drill
              </button>
            </div>
          </div>

          {line.risk_note && (
            <p className="text-[11px] text-amber-700 dark:text-amber-300 font-sans leading-relaxed">
              <strong>Boundary Rule:</strong> {line.risk_note}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2">
            <div className="relative flex-1" style={{ paddingLeft: `${indentPadding}px` }}>
              <input
                type="text"
                value={typedValue}
                onChange={(e) => {
                  setTypedValue(e.target.value);
                  setAttemptFeedback('idle');
                  if (onSaveDraft) onSaveDraft(line.line_number, e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCheck();
                  }
                }}
                placeholder={`Type the boundary logic (e.g. ${cleanExpected.slice(0, 14)}…)`}
                className={`w-full font-mono text-xs px-3 py-2 rounded-lg border bg-slate-950/80 text-primary placeholder:text-muted/40 focus:outline-hidden focus:ring-2 transition ${
                  attemptFeedback === 'incorrect'
                    ? 'border-rose-500 focus:ring-rose-500/30'
                    : attemptFeedback === 'correct'
                    ? 'border-emerald-500 focus:ring-emerald-500/30'
                    : 'border-indigo-500/40 focus:ring-indigo-500/30'
                }`}
                autoCapitalize="off"
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            <button
              type="button"
              onClick={handleCheck}
              disabled={!typedValue.trim()}
              className="btn-primary py-2 px-3 text-xs font-semibold gap-1 shrink-0 disabled:opacity-40"
            >
              <Check size={13} /> Check
            </button>
            <button
              type="button"
              onClick={handleReveal}
              className="btn-secondary py-2 px-2.5 text-xs text-muted hover:text-primary shrink-0"
              title="Peek at the exact line"
            >
              <Eye size={13} /> Peek
            </button>
          </div>

          {attemptFeedback === 'incorrect' && (
            <div className="flex items-center justify-between text-[11px] text-rose-500 font-sans">
              <span>Not quite matching the exact boundary logic. Check variable names or bounds.</span>
              <button
                type="button"
                onClick={handleReveal}
                className="underline hover:text-rose-400 font-bold ml-2"
              >
                Reveal solution
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SubgoalBlueprintViewer({
  problem,
  recallResults,
  onRecordRecall,
  typedDrafts = {},
  onSaveTypedDraft,
  onSwitchToDrill,
}: SubgoalBlueprintViewerProps) {
  const [mode, setMode] = useState<ViewerMode>('blueprint');
  const [selectedLineNumber, setSelectedLineNumber] = useState<number>(1);

  const optimal = problem.optimal_solution;
  const selectedLine = optimal.code_lines.find((l) => l.line_number === selectedLineNumber) || optimal.code_lines[0];
  const highRiskLines = optimal.code_lines.filter((l) => l.is_high_risk);

  return (
    <div
      className="panel-card overflow-hidden border transition-all"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      {/* Top Header & Segmented Mode Switcher */}
      <div className="p-5 sm:p-6 border-b flex flex-wrap items-center justify-between gap-4" style={{ borderColor: 'var(--ca-border)' }}>
        <div>
          <h3 className="text-base font-semibold text-primary">
            Solution Blueprint
          </h3>
          <p className="text-xs text-muted mt-0.5">
            Subgoal logic blocks, line-by-line inspection, and critical boundary recall.
          </p>
        </div>

        {/* 3-Mode Segmented Control */}
        <div
          className="flex items-center p-1 rounded-xl border bg-black/[0.03] dark:bg-white/[0.03]"
          style={{ borderColor: 'var(--ca-border)' }}
          role="tablist"
          aria-label="Blueprint viewer view modes"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'blueprint'}
            onClick={() => setMode('blueprint')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              mode === 'blueprint'
                ? 'bg-white dark:bg-slate-800 text-primary shadow-xs font-semibold'
                : 'text-muted hover:text-primary'
            }`}
          >
            Blueprint
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'hardest_25'}
            onClick={() => setMode('hardest_25')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              mode === 'hardest_25'
                ? 'bg-white dark:bg-slate-800 text-amber-500 font-semibold shadow-xs'
                : 'text-muted hover:text-primary'
            }`}
          >
            Critical Lines
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'recall'}
            onClick={() => setMode('recall')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              mode === 'recall'
                ? 'bg-white dark:bg-slate-800 text-indigo-400 font-semibold shadow-xs'
                : 'text-muted hover:text-primary'
            }`}
          >
            <Sparkles size={13} />
            Typed Recall
          </button>
        </div>
      </div>

      {/* Mode 2 Banner: High Risk Overview */}
      {mode === 'hardest_25' && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 text-xs text-amber-700 dark:text-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} />
            <span>
              <strong>Hardest 25% Focus Mode:</strong> Highlighting {highRiskLines.length} of {optimal.code_lines.length} lines where candidates fail edge conditions.
            </span>
          </div>
          <span className="font-mono font-bold text-[11px] bg-amber-500/20 px-2 py-0.5 rounded-sm">
            {((highRiskLines.length / optimal.code_lines.length) * 100).toFixed(0)}% Line Coverage
          </span>
        </div>
      )}

      {/* Mode 3 Banner: Recall Instructions */}
      {mode === 'recall' && (
        <div className="bg-indigo-500/10 border-b border-indigo-500/20 px-6 py-3 text-xs text-indigo-700 dark:text-indigo-300 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Target size={15} />
            <span>
              <strong>Active Typed Recall Drill:</strong> Test your algorithmic memory! Type each critical boundary line from memory and press Check.
            </span>
          </div>
          <span className="font-mono text-[11px] font-bold bg-indigo-500/20 px-2 py-0.5 rounded-sm">
            {Object.values(recallResults).filter((r) => r === 'got_it').length} / {highRiskLines.length} Lines Mastered
          </span>
        </div>
      )}

      {/* Main Studio Viewport (Code blocks + Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x" style={{ borderColor: 'var(--ca-border)' }}>
        {/* Code Canvas (8 columns) */}
        <div className="lg:col-span-7 xl:col-span-8 p-4 sm:p-6 overflow-x-auto space-y-6">
          {mode === 'recall' && onSwitchToDrill && (
            <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <Zap size={16} className="text-indigo-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-primary block">
                    Timed Speed Drill Mode Available
                  </span>
                  <span className="text-[11px] text-muted">
                    Take the 3-minute timed recall test with in-context blanks and streak counters.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onSwitchToDrill}
                className="btn-primary h-8 px-3 text-xs font-semibold shrink-0 gap-1"
              >
                <span>Launch 3-Min Drill</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}
          {optimal.subgoals.map((subgoal, sIdx) => {
            const [startLine, endLine] = subgoal.line_range;
            const subgoalLines = optimal.code_lines.filter(
              (l) => l.line_number >= startLine && l.line_number <= endLine
            );

            return (
              <div
                key={sIdx}
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
              >
                {/* Subgoal Header Bar */}
                <div
                  className="px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2"
                  style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-indigo-500/15 text-indigo-500 font-mono text-[11px] font-bold flex items-center justify-center">
                      {sIdx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-primary">
                      {subgoal.title}
                    </h4>
                  </div>
                  <span className="text-[11px] text-muted font-sans italic">
                    {subgoal.explanation}
                  </span>
                </div>

                {/* Code Lines in Subgoal */}
                <div className="divide-y divide-black/5 dark:divide-white/5 font-mono text-xs">
                  {subgoalLines.map((line) => {
                    const isSelected = selectedLineNumber === line.line_number;
                    const isHighRisk = line.is_high_risk;

                    // If in recall mode and high-risk, render the interactive typed drill
                    if (mode === 'recall' && isHighRisk) {
                      return (
                        <TypedRecallItem
                          key={line.line_number}
                          line={line}
                          recallStatus={recallResults[line.line_number]}
                          initialDraft={typedDrafts[line.line_number]}
                          onRecordRecall={onRecordRecall}
                          onSaveDraft={onSaveTypedDraft}
                          onSelectLine={setSelectedLineNumber}
                        />
                      );
                    }

                    // Row styling based on active mode
                    let rowBg = 'hover:bg-indigo-500/[0.06]';
                    let textStyle = 'text-slate-800 dark:text-slate-200';

                    if (isSelected && mode === 'blueprint') {
                      rowBg = 'bg-indigo-500/10 text-indigo-500 font-semibold';
                    }

                    if (mode === 'hardest_25') {
                      if (isHighRisk) {
                        rowBg = 'bg-amber-500/10 border-l-4 border-amber-500 pl-2';
                        textStyle = 'text-amber-700 dark:text-amber-300 font-semibold';
                      } else {
                        textStyle = 'text-slate-400 dark:text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <div
                        key={line.line_number}
                        onClick={() => setSelectedLineNumber(line.line_number)}
                        className={`group cursor-pointer flex flex-col transition-all ${rowBg}`}
                      >
                        <div className="flex items-center py-2 px-3">
                          {/* Line Number */}
                          <span className="w-8 shrink-0 select-none text-[11px] text-muted/60 text-right pr-3 font-mono">
                            {line.line_number}
                          </span>

                          {/* Code line content */}
                          <div className="min-w-0 flex-1 pr-3">
                            <span className={`${textStyle} whitespace-pre`}>{line.code}</span>
                          </div>

                          {/* High risk badge indicator */}
                          {isHighRisk && (
                            <span className="shrink-0 flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                              <AlertTriangle size={10} />
                              Critical
                            </span>
                          )}
                        </div>

                        {/* Inline risk note for Hardest 25% mode */}
                        {mode === 'hardest_25' && isHighRisk && line.risk_note && (
                          <div className="ml-11 mr-4 mb-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-200 font-sans leading-relaxed">
                            <strong>Why this line is tricky:</strong> {line.risk_note}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right-Hand Inspector Panel (4 columns) */}
        <div className="lg:col-span-5 xl:col-span-4 p-5 sm:p-6 space-y-6">
          <div className="flex items-center gap-2 border-b pb-3" style={{ borderColor: 'var(--ca-border)' }}>
            <Info size={16} className="text-indigo-500" />
            <h4 className="text-sm font-bold text-primary">
              Line-by-Line Inspector
            </h4>
          </div>

          {/* Selected Line Card */}
          <div
            className="p-4 rounded-xl border space-y-3"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-indigo-500">
                Line #{selectedLine.line_number}
              </span>
              {selectedLine.is_high_risk ? (
                <span className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                  <AlertTriangle size={11} /> High Risk Line
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-muted">Standard Blueprint Line</span>
              )}
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
              <code>{selectedLine.code}</code>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1">
                Why this line exists:
              </p>
              <p className="text-xs text-primary leading-relaxed">
                {selectedLine.why_this_line}
              </p>
            </div>

            {selectedLine.risk_note && (
              <div className="pt-2 border-t border-black/5 dark:border-white/5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                  Risk & Boundary note:
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                  {selectedLine.risk_note}
                </p>
              </div>
            )}
          </div>

          {/* Mode 2: Recommended Edge Tests Checklist */}
          {mode === 'hardest_25' && (
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                Recommended Edge Tests Checklist
              </h5>
              <p className="text-[11px] text-muted">
                Always test your implementation against these critical scenarios to verify your high-risk boundaries:
              </p>
              <ul className="space-y-2 text-xs text-primary">
                {problem.hardest_lines_to_test[0]?.recommended_tests.map((testStr, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0">✓</span>
                    <span className="leading-relaxed">{testStr}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick tips panel */}
          <div className="p-3.5 rounded-xl border border-black/5 dark:border-white/5 text-[11px] text-muted space-y-1.5">
            <span className="font-bold text-primary block">Blueprint Navigation Tip</span>
            <p>
              Click any line in the code blocks on the left to inspect its explicit algorithmic responsibility and boundary considerations.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Architecture & Invariant Summary */}
      <div
        className="p-5 sm:p-6 border-t bg-black/[0.02] dark:bg-white/[0.02] flex flex-wrap items-center justify-between gap-4"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div className="max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 block mb-1">
            Why this blueprint is optimal
          </span>
          <p className="text-xs text-muted leading-relaxed">
            {optimal.why_this_works}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-xs text-center">
            <span className="text-[10px] text-muted uppercase tracking-wider block">Time</span>
            <span className="font-mono font-bold text-indigo-500">{optimal.time_complexity}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-center">
            <span className="text-[10px] text-muted uppercase tracking-wider block">Space</span>
            <span className="font-mono font-bold text-emerald-500">{optimal.space_complexity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
