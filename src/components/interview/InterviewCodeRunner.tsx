import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileCode2,
  PanelLeftOpen,
  Play,
  RotateCcw,
  Send,
  Terminal,
  X,
  XCircle,
} from 'lucide-react';
import { CodeLanguage, Problem } from '../../types';
import { useApp } from '../../context/AppContext';
import { themePalettes, type ThemePalette } from '../../data/themes';
import { useEditorPreferences } from '../../hooks/useEditorPreferences';
import EditorSettingsPopover from '../EditorSettingsPopover';
import { EditorLoadingSkeleton } from '../ui/LoadingSkeleton';
import { runCode, submitCode, type ExecutionResponse } from '../../services/executionService';

interface InterviewCodeRunnerProps {
  roundId: string;
  problem: Problem;
  code: string;
  language: string;
  isSolved: boolean;
  onCodeChange: (code: string, language?: string) => void;
  onSubmissionResult: (results: {
    passed: boolean;
    passedCount: number;
    totalCount: number;
    runtimeMs?: number;
    memoryMb?: number;
  }) => void;
  isBriefCollapsed?: boolean;
  onToggleBriefCollapse?: () => void;
}

const languageDots: Record<CodeLanguage, string> = {
  javascript: 'bg-amber-400',
  python: 'bg-blue-400',
  java: 'bg-orange-500',
  cpp: 'bg-sky-500',
};

const fileExtensions: Record<CodeLanguage, string> = {
  javascript: 'js',
  python: 'py',
  java: 'java',
  cpp: 'cpp',
};

export default function InterviewCodeRunner({
  roundId,
  problem,
  code,
  language,
  isSolved,
  onCodeChange,
  onSubmissionResult,
  isBriefCollapsed,
  onToggleBriefCollapse,
}: InterviewCodeRunnerProps) {
  const { theme, palette } = useApp();
  const {
    preferences: editorPrefs,
    updatePreference: updateEditorPref,
    resetPreferences: resetEditorPrefs,
    isDefault: isDefaultEditorPrefs,
  } = useEditorPreferences();

  const [currentLang, setCurrentLang] = useState<CodeLanguage>(
    (language as CodeLanguage) || 'python'
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Result drawer visibility: hidden upfront until user runs or submits code
  const [showDrawer, setShowDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState<'cases' | 'console'>('cases');
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [runResult, setRunResult] = useState<ExecutionResponse | null>(null);

  const editorThemeName = `prismcode-${palette}-${theme}`;

  // Register identical custom PrismCode Monaco themes
  const registerEditorTheme = (monaco: any) => {
    themePalettes.forEach((colors: ThemePalette) => {
      (['light', 'dark'] as const).forEach((mode) => {
        const isDark = mode === 'dark';
        const activeAccent = isDark && colors.darkPrimary ? colors.darkPrimary : colors.primary;
        monaco.editor.defineTheme(`prismcode-${colors.id}-${mode}`, {
          base: isDark ? 'vs-dark' : 'vs',
          inherit: true,
          rules: [
            { token: 'comment', foreground: isDark ? '91A39A' : '748579', fontStyle: 'italic' },
            { token: 'keyword', foreground: activeAccent.replace('#', '') },
            { token: 'string', foreground: isDark ? 'D6B889' : 'A45B32' },
            { token: 'number', foreground: isDark ? 'C3A5E8' : '7950A4' },
          ],
          colors: {
            'editor.background': isDark ? colors.editorDark : colors.editorLight,
            'editor.foreground': isDark ? '#E7EAF2' : '#263244',
            'editorCursor.foreground': activeAccent,
            'editor.selectionBackground': `${activeAccent}35`,
            'editor.inactiveSelectionBackground': `${activeAccent}1C`,
            'editorLineNumber.foreground': isDark ? '#596579' : '#A0A8B6',
            'editorLineNumber.activeForeground': activeAccent,
            'editor.lineHighlightBackground': isDark ? `${activeAccent}12` : `${activeAccent}0C`,
            'editorIndentGuide.background': isDark ? '#2B3445' : '#E5E9F0',
            'editorIndentGuide.activeBackground': `${activeAccent}70`,
            'editorWidget.background': isDark ? (colors.darkSurface ?? '#172033') : '#FFFFFF',
            'editorSuggestWidget.background': isDark ? (colors.darkSurface ?? '#172033') : '#FFFFFF',
            'editorGutter.background': isDark ? colors.editorDark : colors.editorLight,
          },
        });
      });
    });
  };

  const handleLanguageChange = (newLang: CodeLanguage) => {
    setCurrentLang(newLang);
    const starter = problem.starterCode?.[newLang] || '';
    onCodeChange(starter, newLang);
  };

  const handleResetCode = () => {
    const starter = problem.starterCode?.[currentLang] || '';
    onCodeChange(starter, currentLang);
  };

  // Run Code against sample test cases
  const handleRunCode = async () => {
    setIsRunning(true);
    setShowDrawer(true);
    setActiveTab('cases');
    try {
      const cases = (problem.testCases || []).filter(test => !test.isHidden).map((c, i) => ({
        caseNumber: i + 1,
        input: c.input,
        expected: c.expected,
      }));

      const res = await runCode({
        problemId: problem.id,
        roundId,
        code,
        language: currentLang,
        cases,
      });

      setRunResult(res);
    } catch (e: any) {
      setRunResult({
        success: false,
        verdict: 'Runtime Error',
        runtimeMs: 0,
        memoryMb: 0,
        totalPassed: 0,
        totalTests: (problem.testCases || []).filter(test => !test.isHidden).length,
        cases: [],
        stderr: e.message || 'Execution failed',
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit code against all official test cases
  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setShowDrawer(true);
    setActiveTab('cases');
    try {
      const res = await submitCode({
        problemId: problem.id,
        roundId,
        code,
        language: currentLang,
      });

      setRunResult(res);
      const passed = res.verdict === 'Accepted';
      onSubmissionResult({
        passed,
        passedCount: res.totalPassed,
        totalCount: res.totalTests,
        runtimeMs: res.runtimeMs,
        memoryMb: res.memoryMb,
      });
    } catch (e: any) {
      setRunResult({
        success: false,
        verdict: 'Runtime Error',
        runtimeMs: 0,
        memoryMb: 0,
        totalPassed: 0,
        totalTests: problem.testCount ?? 0,
        cases: [],
        stderr: e.message || 'Submission failed',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="workspace-editor-pane h-full w-full flex flex-col select-none overflow-hidden">
      {/* 1. Exact Workspace Editor Header */}
      <div className="workspace-editor-header">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="workspace-window-dots">
            <i /><i /><i />
          </div>
          <span className="workspace-file-icon">
            <FileCode2 size={14} />
          </span>
          <span className="truncate text-xs font-semibold text-primary">
            solution.{fileExtensions[currentLang]}
          </span>

          {/* Show Problem button when brief is collapsed */}
          {isBriefCollapsed && onToggleBriefCollapse && (
            <button
              type="button"
              onClick={onToggleBriefCollapse}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-0.5 text-xs font-bold text-indigo-400 hover:bg-indigo-500/20 active:scale-95 transition-all shadow-xs ml-1"
              title="Expand problem statement"
            >
              <PanelLeftOpen size={13} />
              <span>Show Problem</span>
            </button>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {/* Language Selector */}
          <label className="workspace-language-select" aria-label="Choose programming language">
            <span className={`h-2 w-2 shrink-0 rounded-full ${languageDots[currentLang]}`} />
            <select
              value={currentLang}
              onChange={(e) => handleLanguageChange(e.target.value as CodeLanguage)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python 3</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </label>

          {/* Reset Code Button */}
          <button
            type="button"
            onClick={handleResetCode}
            className="workspace-reset-button"
            title="Reset code to starter template"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>

          <span className="workspace-toolbar-divider" aria-hidden="true" />

          {/* Identical Editor Settings Popover */}
          <EditorSettingsPopover
            preferences={editorPrefs}
            updatePreference={updateEditorPref}
            resetPreferences={resetEditorPrefs}
            isDefault={isDefaultEditorPrefs}
          />

          {/* Run & Submit Execution Buttons */}
          <div className="flex items-center gap-1.5 ml-1">
            <button
              type="button"
              onClick={handleRunCode}
              disabled={isRunning || isSubmitting}
              className="flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold text-primary hover:bg-white/5 active:scale-95 disabled:opacity-50 transition-all"
              style={{ borderColor: 'var(--ca-border)' }}
            >
              <Play size={12} className={isRunning ? 'animate-spin' : ''} />
              <span>{isRunning ? 'Running...' : 'Run'}</span>
            </button>

            <button
              type="button"
              onClick={handleSubmitCode}
              disabled={isRunning || isSubmitting}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 active:scale-95 disabled:opacity-50 transition-all"
            >
              <Send size={12} className={isSubmitting ? 'animate-pulse' : ''} />
              <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Monaco Editor Canvas (Matches Workspace.tsx 1:1) */}
      <div className="workspace-editor-stage flex-1 relative min-h-0 overflow-hidden" data-lenis-prevent>
        <Editor
          height="100%"
          path={`interview/${problem.id}/${currentLang}`}
          language={currentLang}
          value={code}
          loading={<EditorLoadingSkeleton />}
          onChange={(val) => onCodeChange(val ?? '')}
          beforeMount={registerEditorTheme}
          theme={editorThemeName}
          options={{
            minimap: { enabled: editorPrefs.minimap },
            fontSize: editorPrefs.fontSize,
            fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, monospace",
            fontLigatures: true,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            scrollbar: { alwaysConsumeMouseWheel: false },
            roundedSelection: false,
            automaticLayout: true,
            tabSize: editorPrefs.tabSize,
            lineNumbers: editorPrefs.lineNumbers,
            lineNumbersMinChars: 3,
            wordWrap: editorPrefs.wordWrap,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderLineHighlight: 'all',
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>

      {/* 3. Bottom Drawer: Visible ONLY after running or submitting test cases */}
      {showDrawer && (
        <div
          className="h-60 shrink-0 border-t flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
          style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
        >
          {/* Drawer Top Strip */}
          <div
            className="flex items-center justify-between px-3 h-9 border-b shrink-0 text-xs"
            style={{ borderColor: 'var(--ca-border)' }}
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('cases')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  activeTab === 'cases'
                    ? 'bg-indigo-500/10 text-indigo-500'
                    : 'text-muted hover:text-primary'
                }`}
              >
                Test Cases
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('console')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  activeTab === 'console'
                    ? 'bg-indigo-500/10 text-indigo-500'
                    : 'text-muted hover:text-primary'
                }`}
              >
                <Terminal size={12} />
                <span>Console Output</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              {runResult && (
                <div className="text-[11px] font-mono flex items-center gap-2">
                  <span
                    className={`font-bold ${
                      runResult.verdict === 'Accepted' ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {runResult.verdict}
                  </span>
                  <span className="text-muted">
                    ({runResult.totalPassed} / {runResult.totalTests} passed)
                  </span>
                  {runResult.runtimeMs > 0 && (
                    <span className="text-muted">· {runResult.runtimeMs}ms</span>
                  )}
                </div>
              )}

              {/* Close/Collapse Drawer */}
              <button
                type="button"
                onClick={() => setShowDrawer(false)}
                className="p-1 rounded-lg text-muted hover:text-primary hover:bg-white/5 transition-colors"
                title="Collapse result console"
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Drawer Content: Test Cases (Revealed after execution) */}
          {activeTab === 'cases' && (
            <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
              {runResult?.cases && runResult.cases.length > 0 ? (
                <>
                  <div className="flex items-center gap-1.5 pb-1">
                    {runResult.cases.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedCaseIdx(i)}
                        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-semibold text-[11px] transition-all ${
                          selectedCaseIdx === i
                            ? 'bg-indigo-500/15 text-indigo-500 border border-indigo-500/30'
                            : 'text-muted hover:bg-white/5'
                        }`}
                      >
                        {c.passed ? (
                          <CheckCircle2 size={12} className="text-emerald-500" />
                        ) : (
                          <XCircle size={12} className="text-rose-500" />
                        )}
                        <span>Case {c.caseNumber || i + 1}</span>
                      </button>
                    ))}
                  </div>

                  {runResult.cases[selectedCaseIdx] && (
                    <div className="space-y-2 font-mono text-xs">
                      <div>
                        <div className="text-[10px] uppercase font-sans text-muted font-bold">Input:</div>
                        <div className="rounded-lg p-2 bg-black/20 text-primary border" style={{ borderColor: 'var(--ca-border)' }}>
                          {runResult.cases[selectedCaseIdx].input}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-[10px] uppercase font-sans text-muted font-bold">Expected:</div>
                          <div className="rounded-lg p-2 bg-black/20 text-emerald-500 font-semibold border" style={{ borderColor: 'var(--ca-border)' }}>
                            {runResult.cases[selectedCaseIdx].expected}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-sans text-muted font-bold">Actual Output:</div>
                          <div
                            className={`rounded-lg p-2 bg-black/20 font-semibold border ${
                              runResult.cases[selectedCaseIdx].passed
                                ? 'text-emerald-500'
                                : 'text-rose-400'
                            }`}
                            style={{ borderColor: 'var(--ca-border)' }}
                          >
                            {runResult.cases[selectedCaseIdx].actual || '(no output)'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-muted font-mono text-xs">
                  {isRunning || isSubmitting
                    ? 'Executing code against hidden test fixtures...'
                    : 'Run or submit code to inspect passed and failed test cases.'}
                </div>
              )}
            </div>
          )}

          {/* Drawer Content: Console Output */}
          {activeTab === 'console' && (
            <div className="flex-1 overflow-y-auto p-3 font-mono text-xs space-y-2">
              {runResult?.stderr && (
                <div className="rounded-lg p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 whitespace-pre-wrap">
                  {runResult.stderr}
                </div>
              )}

              {runResult?.stdout && (
                <div>
                  <div className="text-[10px] uppercase font-sans text-muted font-bold mb-1">Standard Output:</div>
                  <pre className="rounded-lg p-2 bg-black/20 text-muted border overflow-x-auto" style={{ borderColor: 'var(--ca-border)' }}>
                    {runResult.stdout}
                  </pre>
                </div>
              )}

              {!runResult?.stderr && !runResult?.stdout && (
                <div className="flex h-full items-center justify-center text-muted">
                  No standard output generated during execution.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
