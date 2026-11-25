import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Code2,
  Copy,
  Database,
  ExternalLink,
  Eye,
  FileCode,
  FlaskConical,
  Laptop,
  Layers,
  LayoutTemplate,
  Loader2,
  Maximize2,
  Play,
  RefreshCw,
  RotateCcw,
  Server,
  Smartphone,
  Sparkles,
  Tablet,
  Terminal,
  Timer,
  XCircle,
} from 'lucide-react';
import { PRACTICAL_CHALLENGES } from '../data/practical/canonicalChallenges';
import { PracticalChallenge, PracticalFile, TestAssertionResult } from '../types/practicalCoding';
import { bundlePreviewHtml } from '../lib/practical/previewBundler';
import { executeChallengeTests } from '../lib/practical/domTestRunner';
import { useApp } from '../context/AppContext';

export default function RoleSpecificWorkspace() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { theme } = useApp();

  const challenge = useMemo(() => {
    return PRACTICAL_CHALLENGES.find(
      (c) => c.slug === challengeId || c.id === challengeId
    );
  }, [challengeId]);

  const [files, setFiles] = useState<PracticalFile[]>(() => {
    if (!challenge) return [];
    return challenge.files.map((f) => ({ ...f }));
  });

  const [activeFileName, setActiveFileName] = useState<string>(() => {
    return challenge?.files[0]?.name || '';
  });

  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeDeckTab, setActiveDeckTab] = useState<'preview' | 'tests' | 'editorial'>(() => {
    return challenge?.track === 'frontend_ui' ? 'preview' : 'tests';
  });

  const [testResults, setTestResults] = useState<TestAssertionResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Re-initialize state when challenge changes
  useEffect(() => {
    if (challenge) {
      setFiles(challenge.files.map((f) => ({ ...f })));
      setActiveFileName(challenge.files[0]?.name || '');
      setTestResults([]);
      setPreviewError(null);
      setActiveDeckTab(challenge.track === 'frontend_ui' ? 'preview' : 'tests');
      setIframeKey((k) => k + 1);
    }
  }, [challenge]);

  // Listen for iframe preview runtime errors
  useEffect(() => {
    const handleMessage = (evt: MessageEvent) => {
      if (evt.data?.type === 'PREVIEW_CONSOLE_ERROR') {
        setPreviewError(evt.data.message || 'Script execution error');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const activeFile = useMemo(() => {
    return files.find((f) => f.name === activeFileName) || files[0];
  }, [files, activeFileName]);

  const handleCodeChange = (newContent: string | undefined) => {
    if (newContent === undefined) return;
    setFiles((prev) =>
      prev.map((f) => (f.name === activeFileName ? { ...f, content: newContent } : f))
    );
    setPreviewError(null);
  };

  const handleResetCode = () => {
    if (!challenge) return;
    if (window.confirm('Reset all files to their initial template? Any unsaved edits will be discarded.')) {
      setFiles(challenge.files.map((f) => ({ ...f })));
      setTestResults([]);
      setPreviewError(null);
      setIframeKey((k) => k + 1);
    }
  };

  const handleApplySolution = () => {
    if (!challenge) return;
    if (window.confirm('Replace your current code with the canonical reference solution?')) {
      setFiles(challenge.solutionFiles.map((f) => ({ ...f })));
      setIframeKey((k) => k + 1);
      setActiveDeckTab('tests');
    }
  };

  const handleCopySolution = () => {
    if (!challenge) return;
    const combined = challenge.solutionFiles
      .map((f) => `/* ================= ${f.name} ================= */\n\n${f.content}`)
      .join('\n\n');
    navigator.clipboard.writeText(combined);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  const handleRunTests = useCallback(async () => {
    if (!challenge || isRunningTests) return;
    setIsRunningTests(true);
    setActiveDeckTab('tests');

    try {
      const results = await executeChallengeTests(challenge, files, iframeRef.current);
      setTestResults(results);
    } catch (err: unknown) {
      console.error('Test Execution Error:', err);
    } finally {
      setIsRunningTests(false);
    }
  }, [challenge, files, isRunningTests]);

  // Keyboard shortcut: Ctrl + Enter to run tests
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunTests();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunTests]);

  const bundledHtml = useMemo(() => {
    if (!challenge || challenge.track !== 'frontend_ui') return '';
    return bundlePreviewHtml(files, theme === 'dark' ? 'dark' : 'light');
  }, [files, challenge, theme]);

  if (!challenge) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary">Challenge Not Found</h2>
        <p className="text-sm text-muted">
          The requested practical challenge "{challengeId}" does not exist in our catalog.
        </p>
        <Link
          to="/role-specific"
          className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
        >
          <ArrowLeft size={14} />
          <span>Return to Role-Specific Hub</span>
        </Link>
      </div>
    );
  }

  const passedTestsCount = testResults.filter((r) => r.passed).length;
  const totalTestsCount = challenge.testCases.length;
  const allTestsPassed = testResults.length > 0 && passedTestsCount === totalTestsCount;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Top Action Bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b shrink-0 text-xs gap-3"
        style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/role-specific"
            className="flex items-center gap-1.5 font-medium text-muted hover:text-primary transition-colors shrink-0"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Role Specific</span>
          </Link>

          <span className="text-muted opacity-40">/</span>

          <h1 className="font-bold text-sm text-primary truncate min-w-0">
            {challenge.title}
          </h1>

          <span
            className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border"
            style={{
              borderColor: 'var(--ca-border)',
              background: 'rgba(255, 255, 255, 0.04)',
            }}
          >
            {challenge.track === 'frontend_ui' && <LayoutTemplate size={11} className="text-primary" />}
            {challenge.track === 'backend_api' && <Server size={11} className="text-emerald-400" />}
            {challenge.track === 'sql_pipeline' && <Database size={11} className="text-amber-400" />}
            <span className="text-muted">{challenge.roleTarget}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetCode}
            title="Reset code to starter template"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border text-muted hover:text-primary hover:border-slate-600 transition-colors flex items-center gap-1.5"
            style={{ borderColor: 'var(--ca-border)' }}
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={handleRunTests}
            disabled={isRunningTests}
            className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-md ${
              allTestsPassed
                ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
                : 'btn-primary'
            }`}
          >
            {isRunningTests ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Play size={13} className="fill-current" />
            )}
            <span>Run Tests</span>
            <span className="hidden md:inline text-[10px] opacity-75 font-mono">^↵</span>
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* Left Pane: Challenge Brief, Requirements & Specs */}
        <div
          className="w-full lg:w-[420px] shrink-0 border-r flex flex-col overflow-y-auto"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
        >
          <div className="p-5 space-y-6">
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="font-semibold text-primary">{challenge.roleTarget}</span>
                <span className="flex items-center gap-1">
                  <Timer size={13} />
                  <span>{challenge.estimatedMinutes} mins</span>
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-primary tracking-tight">
                {challenge.title}
              </h2>
              <p className="text-xs text-muted leading-relaxed">
                {challenge.description}
              </p>
            </div>

            {/* Requirements Checklist */}
            <div className="space-y-3 pt-2 border-t" style={{ borderColor: 'var(--ca-border)' }}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Code2 size={14} className="text-primary" />
                <span>Functional Requirements</span>
              </h3>
              <ul className="space-y-2.5">
                {challenge.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-muted leading-relaxed">
                    <span
                      className="h-4 w-4 rounded-full border flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5 text-primary"
                      style={{ backgroundColor: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
                    >
                      {idx + 1}
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Design Specs (if any) */}
            {challenge.designSpecs && challenge.designSpecs.length > 0 && (
              <div className="space-y-3 pt-3 border-t" style={{ borderColor: 'var(--ca-border)' }}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <LayoutTemplate size={14} className="text-purple-400" />
                  <span>Design & UX Specifications</span>
                </h3>
                <ul className="space-y-2">
                  {challenge.designSpecs.map((spec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                      <span className="text-purple-400 mt-0.5 font-bold">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Test Case Criteria */}
            <div className="space-y-3 pt-3 border-t" style={{ borderColor: 'var(--ca-border)' }}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <FlaskConical size={14} className="text-emerald-400" />
                <span>Test Rubric ({challenge.testCases.length} assertions)</span>
              </h3>
              <div className="space-y-2">
                {challenge.testCases.map((tc) => (
                  <div
                    key={tc.id}
                    className="p-2.5 rounded-xl border text-xs space-y-1 transition-all"
                    style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
                  >
                    <div className="font-semibold text-primary">{tc.title}</div>
                    <div className="text-[11px] text-muted">{tc.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Area: Top Editor + Bottom Deck */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* Top Half: Multi-File Monaco Editor */}
          <div className="flex-1 flex flex-col border-b overflow-hidden min-h-[300px]" style={{ borderColor: 'var(--ca-border)' }}>
            {/* File Tab Bar */}
            <div
              className="flex items-center justify-between px-3 py-1.5 border-b shrink-0 text-xs overflow-x-auto"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-1.5">
                {files.map((file) => (
                  <button
                    key={file.name}
                    type="button"
                    onClick={() => setActiveFileName(file.name)}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                      activeFileName === file.name
                        ? 'border font-semibold shadow-xs'
                        : 'text-muted hover:text-primary hover:bg-[var(--ca-surface-muted)]'
                    }`}
                    style={{
                      backgroundColor: activeFileName === file.name ? 'var(--ca-surface-muted)' : undefined,
                      borderColor: activeFileName === file.name ? 'var(--ca-border)' : 'transparent',
                      color: activeFileName === file.name ? 'var(--ca-text)' : undefined,
                    }}
                  >
                    <FileCode size={13} className={activeFileName === file.name ? 'text-primary' : 'text-muted'} />
                    <span>{file.name}</span>
                    {activeFileName === file.name && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full" style={{ background: 'var(--ca-accent-solid)' }} />
                    )}
                  </button>
                ))}
              </div>

              <span className="text-[11px] font-mono text-muted uppercase">
                {activeFile?.language}
              </span>
            </div>

            {/* Monaco Editor Container */}
            <div className="flex-1 overflow-hidden relative">
              <Editor
                height="100%"
                path={activeFile.name}
                language={activeFile.language}
                value={activeFile.content}
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                  fontSize: 13,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                  tabSize: 2,
                  fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
                  smoothScrolling: true,
                  cursorBlinking: 'smooth',
                }}
              />
            </div>
          </div>

          {/* Bottom Half: Interactive Deck (Preview / Test Results / Editorial) */}
          <div className="h-[340px] flex flex-col overflow-hidden shrink-0">
            {/* Segmented Deck Header */}
            <div
              className="flex items-center justify-between px-4 py-2 border-b shrink-0 text-xs"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div className="flex items-center gap-2">
                {challenge.track === 'frontend_ui' && (
                  <button
                    type="button"
                    onClick={() => setActiveDeckTab('preview')}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                      activeDeckTab === 'preview'
                        ? 'shadow-xs'
                        : 'text-muted hover:text-primary hover:bg-[var(--ca-surface-muted)]'
                    }`}
                    style={{
                      background: activeDeckTab === 'preview' ? 'var(--ca-accent-solid)' : undefined,
                      color: activeDeckTab === 'preview' ? 'var(--ca-accent-text)' : undefined,
                    }}
                  >
                    <Eye size={13} />
                    <span>Live Preview</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveDeckTab('tests')}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                    activeDeckTab === 'tests'
                      ? 'shadow-xs'
                      : 'text-muted hover:text-primary hover:bg-[var(--ca-surface-muted)]'
                  }`}
                  style={{
                    background: activeDeckTab === 'tests' ? 'var(--ca-accent-solid)' : undefined,
                    color: activeDeckTab === 'tests' ? 'var(--ca-accent-text)' : undefined,
                  }}
                >
                  <FlaskConical size={13} />
                  <span>Test Results</span>
                  {testResults.length > 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        allTestsPassed ? 'bg-emerald-400 text-slate-900' : 'bg-rose-400 text-slate-900'
                      }`}
                    >
                      {passedTestsCount}/{totalTestsCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveDeckTab('editorial')}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                    activeDeckTab === 'editorial'
                      ? 'shadow-xs'
                      : 'text-muted hover:text-primary hover:bg-[var(--ca-surface-muted)]'
                  }`}
                  style={{
                    background: activeDeckTab === 'editorial' ? 'var(--ca-accent-solid)' : undefined,
                    color: activeDeckTab === 'editorial' ? 'var(--ca-accent-text)' : undefined,
                  }}
                >
                  <Sparkles size={13} />
                  <span>Architectural Solution</span>
                </button>
              </div>

              {/* Viewport switchers when in Preview tab */}
              {activeDeckTab === 'preview' && challenge.track === 'frontend_ui' && (
                <div className="flex items-center gap-1 border rounded-xl p-1" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
                  <button
                    type="button"
                    onClick={() => setViewportMode('desktop')}
                    title="Desktop (100%)"
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      viewportMode === 'desktop' ? 'shadow-xs' : 'text-muted hover:text-primary'
                    }`}
                    style={{
                      background: viewportMode === 'desktop' ? 'var(--ca-accent-solid)' : undefined,
                      color: viewportMode === 'desktop' ? 'var(--ca-accent-text)' : undefined,
                    }}
                  >
                    <Laptop size={13} />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewportMode('tablet')}
                    title="Tablet (768px)"
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      viewportMode === 'tablet' ? 'shadow-xs' : 'text-muted hover:text-primary'
                    }`}
                    style={{
                      background: viewportMode === 'tablet' ? 'var(--ca-accent-solid)' : undefined,
                      color: viewportMode === 'tablet' ? 'var(--ca-accent-text)' : undefined,
                    }}
                  >
                    <Tablet size={13} />
                    <span className="hidden sm:inline">Tablet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewportMode('mobile')}
                    title="Mobile (375px)"
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      viewportMode === 'mobile' ? 'shadow-xs' : 'text-muted hover:text-primary'
                    }`}
                    style={{
                      background: viewportMode === 'mobile' ? 'var(--ca-accent-solid)' : undefined,
                      color: viewportMode === 'mobile' ? 'var(--ca-accent-text)' : undefined,
                    }}
                  >
                    <Smartphone size={13} />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIframeKey((k) => k + 1)}
                    title="Reload Preview"
                    className="p-1 rounded-lg text-muted hover:text-primary transition-colors ml-0.5"
                  >
                    <RefreshCw size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* Deck Content Panels with Theme Token Background */}
            <div
              className="flex-1 overflow-y-auto p-4 transition-colors"
              style={{ background: 'var(--ca-surface-muted)' }}
            >
              {/* SUBTAB 1: LIVE PREVIEW IFRAME */}
              {activeDeckTab === 'preview' && challenge.track === 'frontend_ui' && (
                <div className="h-full flex flex-col items-center justify-center">
                  {previewError && (
                    <div className="w-full mb-2 p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                      <XCircle size={14} className="shrink-0" />
                      <span className="truncate">{previewError}</span>
                    </div>
                  )}

                  <div
                    className="h-full border rounded-xl overflow-hidden shadow-2xl transition-all duration-300"
                    style={{
                      borderColor: 'var(--ca-border)',
                      background: 'var(--ca-surface)',
                      width:
                        viewportMode === 'desktop'
                          ? '100%'
                          : viewportMode === 'tablet'
                          ? '768px'
                          : '375px',
                    }}
                  >
                    <iframe
                      key={iframeKey}
                      ref={iframeRef}
                      title="Component Live Preview"
                      sandbox="allow-scripts allow-modals allow-same-origin"
                      srcDoc={bundledHtml}
                      className="w-full h-full border-none"
                    />
                  </div>
                </div>
              )}

              {/* SUBTAB 2: TEST RUNNER ASSERTIONS */}
              {activeDeckTab === 'tests' && (
                <div className="h-full overflow-y-auto space-y-3">
                  {testResults.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <FlaskConical size={28} className="text-muted opacity-50" />
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-primary">No Tests Executed Yet</h4>
                        <p className="text-xs text-muted max-w-sm">
                          Click "Run Tests" or press <kbd className="px-1.5 py-0.5 rounded border text-muted font-mono text-[11px]" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>Ctrl+Enter</kbd> to evaluate your implementation against the automated test suite.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleRunTests}
                        disabled={isRunningTests}
                        className="btn-primary px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                      >
                        <Play size={12} className="fill-current" />
                        <span>Run Test Suite</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--ca-border)' }}>
                        <div className="flex items-center gap-2">
                          {allTestsPassed ? (
                            <CheckCircle2 size={16} className="text-emerald-400" />
                          ) : (
                            <XCircle size={16} className="text-rose-400" />
                          )}
                          <span className="font-bold text-sm text-primary">
                            {allTestsPassed
                              ? 'All assertions passed! Exceptional work.'
                              : `${totalTestsCount - passedTestsCount} assertion(s) need attention`}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-muted">
                          {passedTestsCount} / {totalTestsCount} passed
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {testResults.map((result) => (
                          <div
                            key={result.testId}
                            className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all ${
                              result.passed
                                ? 'bg-emerald-500/10 border-emerald-500/30'
                                : 'bg-rose-500/10 border-rose-500/30'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 font-semibold">
                                {result.passed ? (
                                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                                ) : (
                                  <XCircle size={14} className="text-rose-400 shrink-0" />
                                )}
                                <span className={result.passed ? 'text-emerald-400 dark:text-emerald-300 font-bold' : 'text-rose-400 dark:text-rose-300 font-bold'}>
                                  {result.title}
                                </span>
                              </div>
                              {result.durationMs !== undefined && (
                                <span className="text-[10px] text-muted font-mono">
                                  {result.durationMs}ms
                                </span>
                              )}
                            </div>

                            {result.error && (
                              <div className="mt-1 p-2 rounded bg-rose-500/10 border border-rose-500/20 text-[11px] font-mono text-rose-400">
                                {result.error}
                              </div>
                            )}

                            {(result.expected || result.actual) && (
                              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1">
                                {result.expected && (
                                  <div className="p-2 rounded-lg border" style={{ background: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}>
                                    <span className="text-muted block font-sans text-[10px]">Expected:</span>
                                    <span className="text-emerald-400 font-semibold">{result.expected}</span>
                                  </div>
                                )}
                                {result.actual && (
                                  <div className="p-2 rounded-lg border" style={{ background: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}>
                                    <span className="text-muted block font-sans text-[10px]">Actual:</span>
                                    <span className="text-rose-400 font-semibold">{result.actual}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB 3: EDITORIAL & REFERENCE SOLUTION */}
              {activeDeckTab === 'editorial' && (
                <div className="h-full overflow-y-auto space-y-5 text-xs text-muted leading-relaxed">
                  <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--ca-border)' }}>
                    <div>
                      <h4 className="font-bold text-sm text-primary">Architectural Guide & Reference Implementation</h4>
                      <p className="text-[11px] text-muted">Examine the canonical approach and industry patterns used in senior engineering interviews.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopySolution}
                        className="px-2.5 py-1 rounded-lg border text-muted hover:text-primary flex items-center gap-1.5 transition-colors"
                        style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
                      >
                        <Copy size={12} />
                        <span>{copiedSolution ? 'Copied!' : 'Copy Code'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleApplySolution}
                        className="btn-primary px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <span>Apply to Editor</span>
                      </button>
                    </div>
                  </div>

                  <div className="max-w-none text-xs space-y-4">
                    <div className="whitespace-pre-line font-sans leading-relaxed text-primary">
                      {challenge.editorialMarkdown}
                    </div>

                    <div className="space-y-3 pt-3 border-t" style={{ borderColor: 'var(--ca-border)' }}>
                      <h5 className="font-bold text-xs text-primary">Canonical Solution:</h5>
                      {challenge.solutionFiles.map((sf) => (
                        <div key={sf.name} className="rounded-xl border overflow-hidden shadow-xs" style={{ borderColor: 'var(--ca-border)' }}>
                          <div className="px-3.5 py-1.5 border-b font-mono text-[11px] font-semibold text-primary flex items-center justify-between" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
                            <span className="flex items-center gap-1.5">
                              <FileCode size={13} className="text-primary" />
                              {sf.name}
                            </span>
                            <span className="text-[10px] text-muted uppercase">{sf.language}</span>
                          </div>
                          <pre className="p-3.5 font-mono text-[11px] overflow-x-auto m-0" style={{ background: 'var(--ca-surface-muted)', color: 'var(--ca-text)' }}>
                            <code>{sf.content}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
