import React, { useState, useEffect, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Eye,
  FileCode,
  Flame,
  HelpCircle,
  Layers,
  Lightbulb,
  Maximize2,
  Minimize2,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  X,
  XCircle,
  Zap,
} from 'lucide-react';
import { MasteryProblem } from '../../types/mastery';
import { useApp } from '../../context/AppContext';
import { runCode, submitCode, type ExecutionResponse } from '../../services/executionService';

interface MasteryCodeRunnerProps {
  problem: MasteryProblem;
  isAccepted?: boolean;
  onCodeAccepted?: () => void;
  savedDraft?: string;
  onSaveDraft?: (language: string, code: string) => void;
  isSplitView?: boolean;
  onToggleSplitView?: () => void;
}

type SupportedLanguage = 'python' | 'javascript' | 'typescript' | 'cpp' | 'java';

const LANGUAGE_LABELS: Record<SupportedLanguage, { label: string; monacoLang: string; compilerHint: string }> = {
  python: { label: 'Python 3', monacoLang: 'python', compilerHint: 'python-3.14' },
  javascript: { label: 'JavaScript (Node.js)', monacoLang: 'javascript', compilerHint: 'nodejs-24' },
  typescript: { label: 'TypeScript', monacoLang: 'typescript', compilerHint: 'typescript-deno' },
  cpp: { label: 'C++ (G++ 15)', monacoLang: 'cpp', compilerHint: 'g++-15' },
  java: { label: 'Java (OpenJDK 25)', monacoLang: 'java', compilerHint: 'openjdk-25' },
};

function getLanguageStarterTemplate(problem: MasteryProblem, lang: SupportedLanguage): string {
  if (lang === 'python') {
    return problem.starter_code || `def solution():\n    pass\n`;
  }
  if (lang === 'javascript') {
    // Derive JS function name from python starter_code e.g. def pair_sum_sorted(...)
    const match = problem.starter_code.match(/def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)/);
    if (match) {
      const fnName = match[1].replace(/_([a-z])/g, (_, g) => g.toUpperCase());
      const params = match[2];
      return `function ${fnName}(${params}) {\n  // Write your ${problem.title} solution here\n  \n}\n`;
    }
    return `function solution() {\n  // Write your solution here\n}\n`;
  }
  if (lang === 'typescript') {
    const match = problem.starter_code.match(/def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)/);
    const fnName = match ? match[1].replace(/_([a-z])/g, (_, g) => g.toUpperCase()) : 'solution';
    return `function ${fnName}(...args: any[]): any {\n  // Write your TypeScript solution here\n}\n`;
  }
  if (lang === 'cpp') {
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    // Write your solution here\n};\n`;
  }
  if (lang === 'java') {
    return `import java.util.*;\n\nclass Solution {\n    // Write your solution here\n}\n`;
  }
  return problem.starter_code;
}

export default function MasteryCodeRunner({
  problem,
  isAccepted = false,
  onCodeAccepted,
  savedDraft,
  onSaveDraft,
  isSplitView = false,
  onToggleSplitView,
}: MasteryCodeRunnerProps) {
  const { theme } = useApp();
  const [language, setLanguage] = useState<SupportedLanguage>('python');
  const [code, setCode] = useState<string>(() => {
    return savedDraft || getLanguageStarterTemplate(problem, 'python');
  });

  const [activeTab, setActiveTab] = useState<'tests' | 'console'>('tests');
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>('');
  const [isCustomActive, setIsCustomActive] = useState<boolean>(false);

  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [execResult, setExecResult] = useState<ExecutionResponse | null>(null);
  const [execError, setExecError] = useState<string | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [dockedReferenceTab, setDockedReferenceTab] = useState<'none' | 'subgoals' | 'hints' | 'clues' | 'solution'>('none');
  const [revealedHintsCount, setRevealedHintsCount] = useState<number>(1);

  // Sync draft when language changes
  function handleLanguageChange(nextLang: SupportedLanguage) {
    setLanguage(nextLang);
    const template = getLanguageStarterTemplate(problem, nextLang);
    setCode(template);
    if (onSaveDraft) onSaveDraft(nextLang, template);
  }

  function handleCodeChange(newVal?: string) {
    const updated = newVal ?? '';
    setCode(updated);
    if (onSaveDraft) onSaveDraft(language, updated);
  }

  function handleResetStarter() {
    const template = getLanguageStarterTemplate(problem, language);
    setCode(template);
    if (onSaveDraft) onSaveDraft(language, template);
  }

  // Build test cases from problem statement examples
  const testCases = useMemo(() => {
    return problem.statement.examples.map((ex, idx) => ({
      caseNumber: idx + 1,
      input: ex.input,
      expected: ex.output,
      explanation: ex.explanation,
    }));
  }, [problem]);

  async function handleRunCode() {
    setIsExecuting(true);
    setExecError(null);
    setActiveTab('console');

    try {
      const casesPayload = isCustomActive
        ? [{ caseNumber: 1, input: customInput.trim(), expected: '' }]
        : testCases.map((tc) => ({
            caseNumber: tc.caseNumber,
            input: tc.input,
            expected: tc.expected,
          }));

      const res = await runCode({
        problemId: problem.id,
        code,
        language,
        customInput: isCustomActive ? customInput.trim() : undefined,
        cases: casesPayload,
      });

      setExecResult(res);
    } catch (err: unknown) {
      setExecError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsExecuting(false);
    }
  }

  async function handleSubmitSolution() {
    setIsExecuting(true);
    setExecError(null);
    setActiveTab('console');

    try {
      const casesPayload = testCases.map((tc) => ({
        caseNumber: tc.caseNumber,
        input: tc.input,
        expected: tc.expected,
      }));

      const res = await submitCode({
        problemId: problem.id,
        code,
        language,
        cases: casesPayload,
        title: problem.title,
        difficulty: problem.difficulty,
      });

      setExecResult(res);

      if (res.verdict === 'Accepted') {
        if (onCodeAccepted) onCodeAccepted();
      }
    } catch (err: unknown) {
      setExecError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsExecuting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Verification Milestone Ribbon if already accepted */}
      {isAccepted && (
        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                Pattern Blueprint Code Verified
              </h4>
              <p className="text-xs text-muted">
                Your implementation passed all test fixtures in the isolated OnlineCompiler container.
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-500">
            ✓ Accepted
          </span>
        </div>
      )}

      {/* Main Code Runner Panel */}
      <div
        className="panel-card overflow-hidden border rounded-2xl shadow-sm"
        style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
      >
        {/* Editor Top Control Bar */}
        <div
          className="p-3.5 sm:p-4 border-b flex flex-wrap items-center justify-between gap-3"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
        >
          {/* Left: Language Selector & Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-indigo-500" />
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                className="font-sans text-xs font-bold px-2.5 py-1.5 rounded-lg border bg-white dark:bg-slate-900 text-primary border-black/10 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {Object.entries(LANGUAGE_LABELS).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <span className="text-[11px] text-muted hidden sm:inline font-mono">
              OnlineCompiler Sandbox Active
            </span>

            {/* In-Studio Docked Reference Pills */}
            <div className="hidden md:flex items-center gap-1 border-l pl-2.5 ml-1 border-black/10 dark:border-white/10">
              <button
                type="button"
                onClick={() => setDockedReferenceTab((prev) => (prev === 'subgoals' ? 'none' : 'subgoals'))}
                className={`h-7 px-2.5 text-[11px] rounded-lg font-medium transition ${
                  dockedReferenceTab === 'subgoals'
                    ? 'bg-indigo-500/20 text-indigo-500 font-bold'
                    : 'text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title="Toggle inline subgoals guide"
              >
                Subgoals
              </button>
              <button
                type="button"
                onClick={() => setDockedReferenceTab((prev) => (prev === 'hints' ? 'none' : 'hints'))}
                className={`h-7 px-2.5 text-[11px] rounded-lg font-medium transition ${
                  dockedReferenceTab === 'hints'
                    ? 'bg-amber-500/20 text-amber-500 font-bold'
                    : 'text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title="Toggle inline hint ladder"
              >
                Hints
              </button>
              <button
                type="button"
                onClick={() => setDockedReferenceTab((prev) => (prev === 'solution' ? 'none' : 'solution'))}
                className={`h-7 px-2.5 text-[11px] rounded-lg font-medium transition ${
                  dockedReferenceTab === 'solution'
                    ? 'bg-emerald-500/20 text-emerald-500 font-bold'
                    : 'text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title="Toggle reference solution"
              >
                Solution
              </button>
            </div>
          </div>

          {/* Right: Split view, Peek Drawer, Reset & Run Buttons */}
          <div className="flex items-center gap-2">
            {onToggleSplitView && (
              <button
                type="button"
                onClick={onToggleSplitView}
                className={`btn-secondary h-8 px-2.5 text-xs font-medium gap-1.5 ${
                  isSplitView ? 'bg-indigo-500/15 text-indigo-500 border-indigo-500/30' : 'text-muted hover:text-primary'
                }`}
                title={isSplitView ? 'Expand to Full View' : 'Split Screen with Problem Statement'}
              >
                {isSplitView ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                <span className="hidden sm:inline">{isSplitView ? 'Full' : 'Split'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="btn-secondary h-8 px-2.5 text-xs font-medium gap-1.5 text-indigo-500 hover:text-indigo-400"
              title="Peek at blueprint subgoals and hints while coding"
            >
              <BookOpen size={14} />
              <span className="hidden lg:inline">Blueprint Hints</span>
            </button>

            <button
              type="button"
              onClick={handleResetStarter}
              className="btn-secondary h-8 px-2.5 text-xs text-muted hover:text-primary"
              title="Reset to starter template"
            >
              <RotateCcw size={13} />
            </button>

            <button
              type="button"
              onClick={handleRunCode}
              disabled={isExecuting}
              className="btn-secondary h-8 px-3.5 text-xs font-bold gap-1.5 text-primary disabled:opacity-50"
            >
              <Play size={13} className={isExecuting ? 'animate-spin' : 'text-emerald-500 fill-emerald-500'} />
              <span>{isExecuting ? 'Running…' : 'Run Tests'}</span>
            </button>

            <button
              type="button"
              onClick={handleSubmitSolution}
              disabled={isExecuting}
              className="btn-primary h-8 px-4 text-xs font-bold gap-1.5 disabled:opacity-50"
            >
              <CheckCircle2 size={14} />
              <span>Submit</span>
            </button>
          </div>
        </div>

        {/* Monaco Editor Canvas */}
        <div className={`${isSplitView ? 'h-[380px] sm:h-[450px]' : 'h-[440px] sm:h-[500px]'} w-full border-b`} style={{ borderColor: 'var(--ca-border)' }}>
          <Editor
            language={LANGUAGE_LABELS[language].monacoLang}
            value={code}
            onChange={handleCodeChange}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={{
              fontSize: 13,
              fontFamily: "'JetBrains Mono', 'Geist Mono', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              tabSize: 4,
              automaticLayout: true,
              wordWrap: 'on',
              padding: { top: 12, bottom: 12 },
            }}
          />
        </div>

        {/* Docked Inline Blueprint Reference Tray */}
        {dockedReferenceTab !== 'none' && (
          <div
            className="p-4 border-b space-y-3 bg-black/[0.03] dark:bg-black/30 animate-in slide-in-from-top-2 duration-150"
            style={{ borderColor: 'var(--ca-border)' }}
          >
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--ca-border)' }}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <BookOpen size={14} className="text-indigo-500" />
                  {dockedReferenceTab === 'subgoals' && 'Subgoals Architecture Guide'}
                  {dockedReferenceTab === 'hints' && 'Progressive Hint Ladder'}
                  {dockedReferenceTab === 'clues' && 'Pattern Diagnosis Clues'}
                  {dockedReferenceTab === 'solution' && 'Optimal Solution Blueprint'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDockedReferenceTab('none')}
                className="text-xs text-muted hover:text-primary transition flex items-center gap-1"
              >
                <span>Close</span>
                <X size={13} />
              </button>
            </div>

            {dockedReferenceTab === 'subgoals' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto">
                {problem.optimal_solution.subgoals.map((sg, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border text-xs space-y-1"
                    style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
                  >
                    <div className="font-bold text-primary flex items-center justify-between">
                      <span>{idx + 1}. {sg.title}</span>
                      <span className="font-mono text-[10px] text-muted">Lines {sg.line_range[0]}–{sg.line_range[1]}</span>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">{sg.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {dockedReferenceTab === 'hints' && (
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {problem.hints.slice(0, revealedHintsCount).map((hint, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 text-xs text-primary leading-relaxed"
                  >
                    <strong className="text-amber-500">Hint {hIdx + 1}: </strong>
                    {hint}
                  </div>
                ))}
                {revealedHintsCount < problem.hints.length && (
                  <button
                    type="button"
                    onClick={() => setRevealedHintsCount((prev) => prev + 1)}
                    className="btn-secondary w-full py-1.5 text-xs font-semibold gap-1 text-amber-500"
                  >
                    <Lightbulb size={12} /> Unlock Hint {revealedHintsCount + 1}
                  </button>
                )}
              </div>
            )}

            {dockedReferenceTab === 'solution' && (
              <div className="max-h-56 overflow-y-auto">
                <pre className="p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-black/10 dark:border-white/10">
                  <code>{problem.optimal_solution.code}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Bottom Panel: Test Fixtures & Console Tabs */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Tab Headers */}
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--ca-border)' }}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('tests')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'tests'
                    ? 'bg-indigo-500/15 text-indigo-500'
                    : 'text-muted hover:text-primary'
                }`}
              >
                <Layers size={14} />
                <span>Test Cases ({testCases.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('console')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'console'
                    ? 'bg-indigo-500/15 text-indigo-500'
                    : 'text-muted hover:text-primary'
                }`}
              >
                <Terminal size={14} />
                <span>Execution Output</span>
                {execResult && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      execResult.verdict === 'Accepted'
                        ? 'bg-emerald-500/20 text-emerald-500'
                        : 'bg-rose-500/20 text-rose-500'
                    }`}
                  >
                    {execResult.verdict}
                  </span>
                )}
              </button>
            </div>

            {/* Quick Runtime / Memory Telemetry */}
            {execResult && activeTab === 'console' && (
              <div className="flex items-center gap-3 text-xs font-mono text-muted">
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-indigo-400" />
                  {execResult.runtimeMs}ms
                </span>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <Cpu size={12} className="text-indigo-400" />
                  {execResult.memoryMb}MB
                </span>
              </div>
            )}
          </div>

          {/* Tab 1: Test Cases Stage */}
          {activeTab === 'tests' && (
            <div className="space-y-4">
              {/* Case Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {testCases.map((tc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedCaseIdx(idx);
                      setIsCustomActive(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition ${
                      !isCustomActive && selectedCaseIdx === idx
                        ? 'bg-white dark:bg-slate-800 text-primary border border-black/15 dark:border-white/15 shadow-sm'
                        : 'bg-black/5 dark:bg-white/5 text-muted hover:text-primary'
                    }`}
                  >
                    Case {tc.caseNumber}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setIsCustomActive(true)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition ${
                    isCustomActive
                      ? 'bg-white dark:bg-slate-800 text-primary border border-black/15 dark:border-white/15 shadow-sm'
                      : 'bg-black/5 dark:bg-white/5 text-muted hover:text-primary'
                  }`}
                >
                  + Custom Test
                </button>
              </div>

              {/* Selected Test Case Card */}
              {!isCustomActive ? (
                <div
                  className="p-4 rounded-xl border space-y-3"
                  style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-1">
                      Input Arguments:
                    </span>
                    <pre className="font-mono text-xs p-2.5 rounded-lg bg-black/10 dark:bg-black/30 text-primary overflow-x-auto">
                      {testCases[selectedCaseIdx]?.input}
                    </pre>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-1">
                      Expected Output:
                    </span>
                    <pre className="font-mono text-xs p-2.5 rounded-lg bg-black/10 dark:bg-black/30 text-emerald-500 font-bold overflow-x-auto">
                      {testCases[selectedCaseIdx]?.expected}
                    </pre>
                  </div>

                  {testCases[selectedCaseIdx]?.explanation && (
                    <p className="text-xs text-muted italic">
                      Note: {testCases[selectedCaseIdx].explanation}
                    </p>
                  )}
                </div>
              ) : (
                <div
                  className="p-4 rounded-xl border space-y-3"
                  style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                    Custom Stdin / Argument Input:
                  </span>
                  <textarea
                    rows={3}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="e.g. nums = [1, 2, 4, 6, 10], target = 8"
                    className="w-full font-mono text-xs p-2.5 rounded-lg border bg-white dark:bg-slate-900 text-primary border-black/10 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <p className="text-[11px] text-muted">
                    Custom inputs will be evaluated when you click &ldquo;Run Tests&rdquo;.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Execution Console Output */}
          {activeTab === 'console' && (
            <div className="space-y-4">
              {isExecuting && (
                <div className="p-8 text-center space-y-3">
                  <div className="inline-block animate-spin text-indigo-500">
                    <Sparkles size={24} />
                  </div>
                  <p className="text-xs text-muted font-mono">
                    Compiling and evaluating in isolated OnlineCompiler container…
                  </p>
                </div>
              )}

              {execError && (
                <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-600 dark:text-rose-400 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle size={14} /> Execution Error
                  </div>
                  <p className="font-mono">{execError}</p>
                </div>
              )}

              {!isExecuting && !execError && !execResult && (
                <div className="p-8 text-center text-xs text-muted font-mono">
                  No execution output yet. Click &ldquo;Run Tests&rdquo; or &ldquo;Submit&rdquo; above.
                </div>
              )}

              {!isExecuting && execResult && (
                <div className="space-y-4">
                  {/* Verdict Banner */}
                  <div
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                      execResult.verdict === 'Accepted'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {execResult.verdict === 'Accepted' ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <XCircle size={18} />
                      )}
                      <div>
                        <span className="font-bold text-sm block">{execResult.verdict}</span>
                        <span className="text-xs opacity-80">
                          {execResult.totalPassed} of {execResult.totalTests} test cases passed
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-xs font-mono opacity-80">
                      <span>{execResult.runtimeMs}ms</span> &middot; <span>{execResult.memoryMb}MB</span>
                    </div>
                  </div>

                  {/* Per-Test Case Results List */}
                  {execResult.cases && execResult.cases.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                        Test Fixture Evaluations:
                      </span>
                      <div className="divide-y divide-black/5 dark:divide-white/5 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--ca-border)' }}>
                        {execResult.cases.map((c, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-3 bg-black/[0.02] dark:bg-white/[0.02] flex flex-wrap items-center justify-between gap-3 text-xs font-mono"
                          >
                            <div className="flex items-center gap-2.5">
                              {c.passed ? (
                                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-[11px]">
                                  ✓
                                </span>
                              ) : (
                                <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-[11px]">
                                  ✗
                                </span>
                              )}
                              <span className="font-bold">Case {c.caseNumber}</span>
                            </div>

                            <div className="flex items-center gap-4 text-muted text-[11px]">
                              {c.runtimeMs !== undefined && <span>{c.runtimeMs}ms</span>}
                              {c.passed ? (
                                <span className="text-emerald-500 font-bold font-sans">Passed</span>
                              ) : (
                                <span className="text-rose-500 font-bold font-sans">
                                  Expected {c.expected || 'valid'}, got {c.actual || 'none'}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Standard Output / Error Logs */}
                  {(execResult.stdout || execResult.stderr) && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                        Standard Output & Error Log:
                      </span>
                      {execResult.stdout && (
                        <pre className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto">
                          {execResult.stdout}
                        </pre>
                      )}
                      {execResult.stderr && (
                        <pre className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 font-mono text-xs overflow-x-auto">
                          {execResult.stderr}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Blueprint Quick-Peek Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="w-full max-w-xl h-full bg-white dark:bg-slate-900 border-l p-6 overflow-y-auto space-y-6 shadow-2xl"
            style={{ borderColor: 'var(--ca-border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--ca-border)' }}>
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-500" />
                <h3 className="text-base font-bold text-primary">
                  {problem.title} &mdash; Blueprint Guide
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="btn-secondary h-8 w-8 p-0 rounded-lg text-muted hover:text-primary flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            {/* Pattern Clues */}
            <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block">
                Pattern Diagnosis Clues
              </span>
              <ul className="space-y-1.5 text-xs text-primary list-disc list-inside">
                {problem.pattern_clues.map((clue, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {clue}
                  </li>
                ))}
              </ul>
            </div>

            {/* Subgoals Architecture */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted block">
                Subgoal Architecture Breakdown
              </span>
              <div className="space-y-2">
                {problem.optimal_solution.subgoals.map((sg, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border space-y-1"
                    style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-primary">
                      <span>{idx + 1}. {sg.title}</span>
                      <span className="font-mono text-[11px] text-muted">
                        Lines {sg.line_range[0]}–{sg.line_range[1]}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      {sg.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hint Ladder inside Drawer */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted block">
                Progressive Hint Ladder
              </span>
              <div className="space-y-2">
                {problem.hints.slice(0, revealedHintsCount).map((hint, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-primary leading-relaxed"
                  >
                    <strong className="text-amber-500">Hint {hIdx + 1}: </strong>
                    {hint}
                  </div>
                ))}

                {revealedHintsCount < problem.hints.length && (
                  <button
                    type="button"
                    onClick={() => setRevealedHintsCount((prev) => prev + 1)}
                    className="btn-secondary w-full py-2 text-xs font-semibold gap-1.5 text-amber-500"
                  >
                    <Lightbulb size={13} /> Unlock Hint {revealedHintsCount + 1}
                  </button>
                )}
              </div>
            </div>

            {/* Optimal Python Blueprint Reference */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted block">
                Reference Python Solution
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-black/10 dark:border-white/10">
                <code>{problem.optimal_solution.code}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
