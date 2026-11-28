import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import Editor from '@monaco-editor/react';
import {
  AlertCircle,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Cpu,
  FileCode2,
  FlaskConical,
  Keyboard,
  LoaderCircle,
  Maximize2,
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  RotateCcw,
  Send,
  ShieldAlert,
  Sparkles,
  Terminal,
  ThumbsUp,
  X,
  XCircle,
} from 'lucide-react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useUi } from '../context/UiContext';
import { useSpacedRepetition } from '../hooks/useSpacedRepetition';
import { getSlowThreshold, SPACED_INTERVALS_DAYS } from '../lib/spacedRepetition';
import { themePalettes } from '../data/themes';
import { apiRequest } from '../lib/api';
import { useAsyncResource } from '../hooks/useAsyncResource';
import { runCode, submitCode, type ExecutionResponse } from '../services/executionService';
import { requestExecutionTrace } from '../services';
import type { ExecutionTraceResult } from '../types/scrubber';
import { TracePanel } from '../components/scrubber/TracePanel';
import CollectionPicker from '../components/CollectionPicker';
import EditorSettingsPopover from '../components/EditorSettingsPopover';
import ProblemExamples from '../components/ProblemExamples';
import ProblemNotesPanel from '../components/ProblemNotesPanel';
import SolutionsPanel from '../components/SolutionsPanel';
import { SubmissionResultRow, SubmissionsEmptyState } from '../components/SubmissionResultRow';
import TestCaseManager from '../components/TestCaseManager';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import EmptyState from '../components/ui/EmptyState';
import ErrorAlert from '../components/ui/ErrorAlert';
import Tooltip from '../components/ui/Tooltip';
import {
  isAppFullscreen,
  requestAppFullscreen,
  onFullscreenChange,
  exitAppFullscreen,
} from '../lib/fullscreen';
import { CardSkeleton, EditorLoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { useActivePracticeTimer } from '../hooks/useActivePracticeTimer';
import { useCodeDrafts } from '../hooks/useCodeDrafts';
import { useEditorial, useProblems } from '../hooks/useDataServices';
import { useEditorPreferences } from '../hooks/useEditorPreferences';
import { useProblemStudyData } from '../hooks/useProblemStudyData';
import { useProblemTestCases } from '../hooks/useProblemTestCases';
import { MAX_SPLIT_PERCENT, MIN_SPLIT_PERCENT, useWorkspaceLayout } from '../hooks/useWorkspaceLayout';
import { WORKSPACE_AUTOCOMPLETE_LANGUAGES } from '../lib/editorSnippets';
import { attachLocalAutocomplete, LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS } from '../lib/localAutocomplete';
import { isCodeLanguage, type CodeLanguage } from '../lib/draftStorage';
import {
  MIN_PRACTICE_SESSION_SECONDS,
  PRACTICE_IDLE_THRESHOLD_MINUTES,
  formatPracticeClock,
} from '../lib/practiceTimer';
import { getLocalDateKey, isDailyChallengeCompleted } from '../lib/progress';
import type { Problem } from '../types';

const languageDots: Record<CodeLanguage, string> = {
  javascript: 'bg-amber-400',
  python: 'bg-sky-400',
  java: 'bg-orange-400',
  cpp: 'bg-violet-400',
};

const languageLabels: Record<CodeLanguage, string> = {
  javascript: 'JavaScript',
  python: 'Python 3',
  java: 'Java',
  cpp: 'C++',
};

type RunnerAction = 'run' | 'submit';
type RunnerState = 'idle' | 'running' | 'completed' | 'error';
type ConsoleTab = 'testcases' | 'console' | 'scrubber';

export default function Workspace() {
  const { problemId } = useParams();
  const practice = useProblems();
  const [params] = useSearchParams();
  const contestId = params.get('contestId') || params.get('contest');
  const daily = params.has('daily');
  const sectionQuestion = useAsyncResource<Problem | null>(signal => {
    if (!problemId) return Promise.resolve(null);
    const id = encodeURIComponent(problemId);
    if (contestId) return apiRequest(`/catalog/contests/${encodeURIComponent(contestId)}/questions/${id}`, { signal });
    if (daily) return apiRequest(`/catalog/daily/questions/${id}`, { signal });
    return Promise.resolve(null);
  }, null, [problemId, contestId, daily]);
  const scoped = Boolean(contestId || daily);
  const { status: problemsStatus, error: problemsError, retry: retryProblems } = scoped ? sectionQuestion : practice;
  const problems = scoped ? sectionQuestion.data && sectionQuestion.data.id === problemId ? [sectionQuestion.data] : [] : practice.data;

  if (problemsStatus === 'loading') {
    return (
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-10">
        <CardSkeleton rows={4}/>
        <CardSkeleton rows={4}/>
      </div>
    );
  }

  if (problemsStatus === 'error' && problemsError) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-4 py-12">
        <ErrorAlert
          className="w-full"
          title="Could not load problem library"
          message={problemsError}
          onRetry={retryProblems}
          retryLabel="Retry"
        />
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-4 py-12">
        <EmptyState
          className="w-full"
          icon={<FileCode2 size={22}/>}
          title="No question available"
          description="This question could not be loaded. Browse Practice to find an available question."
          secondaryAction={<Link to="/problems" className="btn-secondary text-xs">View problem library</Link>}
        />
      </div>
    );
  }

  const currentIndex = problemId ? problems.findIndex((item) => item.id === problemId) : -1;
  const matchedProblem = currentIndex >= 0 ? problems[currentIndex] : null;

  if (!matchedProblem) {
    const firstProblem = problems[0];
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-4 py-12">
        <EmptyState
          className="w-full"
          icon={<AlertCircle size={22}/>}
          title="Problem not found"
          description={
            problemId
              ? `No problem with ID "${problemId}" exists in your local library. It may have been deleted or renamed.`
              : 'No problem was specified in the URL.'
          }
          action={<Link to="/problems" className="btn-primary text-xs">Browse problem library</Link>}
          secondaryAction={
            <Link to={`/workspace/${firstProblem.id}`} className="btn-secondary text-xs">
              Open {firstProblem.title}
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <WorkspaceSession
      key={matchedProblem.id}
      problem={matchedProblem}
      problemList={problems}
      currentIndex={currentIndex}
    />
  );
}

function WorkspaceSession({
  problem,
  problemList,
  currentIndex,
}: {
  problem: Problem;
  problemList: Problem[];
  currentIndex: number;
}) {
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get('contestId') || searchParams.get('contest');
  const isContestMode = Boolean(contestId);
  const [isFullscreenActive, setIsFullscreenActive] = useState<boolean>(() => isAppFullscreen());
  const [fullscreenExits, setFullscreenExits] = useState<number>(() => {
    try {
      const stored = sessionStorage.getItem(`prismcode_contest_fs_exits_${contestId}`);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });
  const navigate = useNavigate();
  const { announce, registerNavigationGuard, requestNavigate } = useUi();
  const {
    theme,
    palette,
    solvedIds,
    recordPracticeSession,
    submissions,
    recordSubmission,
    dailyChallengeByDate,
    dailyCompletions,
  } = useApp();
  const { getItem: getSpacedItem, formatScheduleLabel } = useSpacedRepetition();
  const spacedReviewItem = problem ? getSpacedItem(problem.id) : undefined;
  const editorThemeName = `prismcode-${palette}-${theme}`;
  const prevProblem = currentIndex > 0 ? problemList[currentIndex - 1] : null;
  const nextProblem = currentIndex < problemList.length - 1 ? problemList[currentIndex + 1] : null;
  const {
    language,
    code,
    saveStatus,
    saveError,
    isUnsaved,
    lastSavedAt,
    hasChanges,
    updateCode,
    saveNow,
    discardPending,
    changeLanguage: switchDraftLanguage,
    resetDraft,
  } = useCodeDrafts(problem);
  const {
    preferences: editorPrefs,
    updatePreference: updateEditorPref,
    resetPreferences: resetEditorPrefs,
    isDefault: isDefaultEditorPrefs,
  } = useEditorPreferences();
  const {
    splitPercent,
    descriptionCollapsed,
    setSplitPercent,
    resetSplitPercent,
    toggleDescription,
    setDescriptionCollapsed,
  } = useWorkspaceLayout();
  const {
    sampleCases,
    customCases,
    allCases,
    selectedCase,
    selectCase,
    addCustomCase,
    updateCustomCase,
    deleteCustomCase,
    cloneSampleToCustom,
  } = useProblemTestCases(problem);
  const {
    notes,
    collections,
    bookmarkedIds,
    saveNote,
    clearNote,
    toggleBookmark,
    createCollection,
    toggleProblemInCollection,
  } = useProblemStudyData();
  const [activeTab, setActiveTab] = useState('Description');
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>('testcases');
  const [consoleCollapsed, setConsoleCollapsed] = useState(true);
  const [runnerState, setRunnerState] = useState<RunnerState>('idle');
  const [runnerAction, setRunnerAction] = useState<RunnerAction>('run');
  const [executionResult, setExecutionResult] = useState<ExecutionResponse | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [activeResultCaseIndex, setActiveResultCaseIndex] = useState<number>(0);
  const [traceResult, setTraceResult] = useState<ExecutionTraceResult | null>(null);
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [activeTracedLine, setActiveTracedLine] = useState<number | null>(null);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const autocompleteCleanupRef = useRef<(() => void) | null>(null);
  const decorationsRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      autocompleteCleanupRef.current?.();
      autocompleteCleanupRef.current = null;
    };
  }, []);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [pendingLeavePath, setPendingLeavePath] = useState<string | null>(null);
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const {
    activeSeconds: estimatedPracticeSeconds,
    status: practiceTimerStatus,
    markActivity,
  } = useActivePracticeTimer({
    sessionKey: problem.id,
    onSessionFlush: recordPracticeSession,
  });
  const solved = solvedIds.includes(problem.id);
  const todayKey = getLocalDateKey();
  const dailyParam = searchParams.get('daily');
  const completedTodayDaily = isDailyChallengeCompleted(dailyCompletions, todayKey, problem.id);
  const isPastDailyView = Boolean(dailyParam && dailyParam < todayKey && dailyChallengeByDate[dailyParam] === problem.id);
  const completedPastDaily = isPastDailyView && dailyParam
    ? isDailyChallengeCompleted(dailyCompletions, dailyParam, problem.id)
    : false;
  const bookmarked = bookmarkedIds.includes(problem.id);
  const problemNote = notes[problem.id];
  const hasNote = Boolean(problemNote?.content.trim());
  const {
    data: editorial,
    status: editorialStatus,
    error: editorialError,
    retry: retryEditorial,
  } = useEditorial(problem.id);
  const problemSubmissions = submissions.filter((item) => item.problemId === problem.id);

  const registerEditorTheme = (monaco: any) => {
    // Register every palette/mode combination so theme changes update the mounted editor.
    themePalettes.forEach((colors) => {
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

  useEffect(() => {
    setConfirmResetOpen(false);
    setPendingLeavePath(null);
    setRunnerState('idle');
    setTraceResult(null);
    setActiveTracedLine(null);
  }, [problem.id]);

  // In contest mode: force console tab and enforce fullscreen exit proctoring (3 strikes auto-submits)
  useEffect(() => {
    if (isContestMode) {
      setConsoleTab('console');
      if (activeTab === 'Solutions') {
        setActiveTab('Description');
      }
    }
  }, [isContestMode, activeTab]);

  useEffect(() => {
    if (!isContestMode || !contestId) return;

    const unsubscribe = onFullscreenChange((isFs) => {
      setIsFullscreenActive(isFs);

      if (!isFs) {
        setFullscreenExits((prev) => {
          const nextCount = prev + 1;
          try {
            sessionStorage.setItem(`prismcode_contest_fs_exits_${contestId}`, String(nextCount));
          } catch {}

          if (nextCount >= 3) {
            try {
              localStorage.setItem(`prismcode_contest_finished_${contestId}`, 'true');
              localStorage.setItem(
                `prismcode_contest_finish_reason_${contestId}`,
                'Auto-submitted: Exceeded maximum allowed fullscreen exits (3)'
              );
            } catch {}
            announce('Auto-submitted: Exceeded maximum allowed fullscreen exits (3)');
            navigate(`/contests/${contestId}`);
            return nextCount;
          }

          return nextCount;
        });
      }
    });

    return unsubscribe;
  }, [isContestMode, contestId, navigate, announce]);

  const handleEnterContestFullscreen = async () => {
    const ok = await requestAppFullscreen();
    if (ok) {
      setIsFullscreenActive(true);
    }
  };

  const handleAbandonContest = () => {
    try {
      localStorage.setItem(`prismcode_contest_finished_${contestId}`, 'true');
      localStorage.setItem(
        `prismcode_contest_finish_reason_${contestId}`,
        'Contest session abandoned & auto-submitted by candidate'
      );
    } catch {}
    exitAppFullscreen().catch(() => {});
    navigate(`/contests/${contestId}`);
  };

  // Register an unsaved-changes guard whenever a draft is unsaved, still saving, or failed to save.
  useEffect(() => {
    if (!isUnsaved) {
      registerNavigationGuard(null);
      return undefined;
    }
    registerNavigationGuard((targetPath) => {
      setPendingLeavePath(targetPath);
      return false;
    });
    return () => registerNavigationGuard(null);
  }, [isUnsaved, registerNavigationGuard]);

  const requestExecution = useCallback(async (action: RunnerAction) => {
    setRunnerAction(action);
    setConsoleTab('console');
    setConsoleCollapsed(false);
    setRunnerState('running');
    setExecutionError(null);
    setActiveResultCaseIndex(0);

    if (action === 'run') {
      announce(`Running ${languageLabels[language]} solution…`);
      try {
        const customInput = selectedCase && selectedCase.source === 'custom' ? selectedCase.input : undefined;
        const res = await runCode({
          problemId: problem.id,
          contestId: contestId ?? undefined,
          code,
          language,
          customInput,
        });
        setExecutionResult(res);
        setRunnerState('completed');
        announce(`Run completed: ${res.verdict}. ${res.totalPassed} of ${res.totalTests} tests passed.`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setExecutionError(msg);
        setRunnerState('error');
        announce(`Execution error: ${msg}`);
      }
    } else {
      announce(`Submitting ${languageLabels[language]} solution…`);
      try {
        const res = await submitCode({
          problemId: problem.id,
          contestId: contestId ?? undefined,
          code,
          language,
          durationSeconds: estimatedPracticeSeconds,
          dailyDate: problem.owner === 'daily' && dailyParam === todayKey ? todayKey : undefined,
        });
        setExecutionResult(res);
        setRunnerState('completed');

        const outcome = res.verdict === 'Accepted' ? 'accepted'
          : res.verdict === 'Time Limit Exceeded' ? 'tle'
          : res.verdict === 'Runtime Error' ? 'runtime_error'
          : 'wrong_answer';

        const practiceSecs = estimatedPracticeSeconds > 0 ? estimatedPracticeSeconds : undefined;
        if (!isContestMode) recordSubmission(problem.id, outcome, practiceSecs, language, {
          runtimeMs: res.runtimeMs,
          memoryMb: res.memoryMb,
          source: 'onlinecompiler',
          question: problem,
        });


        if (isContestMode && contestId) {
          try {
            const elapsedMinutes = Math.max(1, Math.ceil(estimatedPracticeSeconds / 60));
            const storageKey = `prismcode_contest_solves_${contestId}`;
            const prev = JSON.parse(localStorage.getItem(storageKey) || '{}');
            if (outcome === 'accepted') {
              prev[problem.id] = { status: 'accepted', elapsedMinutes };
              localStorage.setItem(storageKey, JSON.stringify(prev));
            } else {
              if (!prev[problem.id] || prev[problem.id].status !== 'accepted') {
                prev[problem.id] = { status: 'wrong_answer', elapsedMinutes };
                localStorage.setItem(storageKey, JSON.stringify(prev));
              }
            }
          } catch {}
        }

        announce(`Submission graded: ${res.verdict}. ${res.totalPassed} of ${res.totalTests} tests passed.`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setExecutionError(msg);
        setRunnerState('error');
        announce(`Submission error: ${msg}`);
      }
    }
  }, [announce, code, contestId, estimatedPracticeSeconds, isContestMode, language, problem.id, recordSubmission, selectedCase, problem, dailyParam, todayKey]);

  // Synchronize Monaco Editor line highlight and execution gutter arrow
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const editor = editorRef.current;
    const monaco = monacoRef.current;

    if (activeTracedLine && activeTracedLine > 0 && consoleTab === 'scrubber') {
      const newDecorations = [
        {
          range: new monaco.Range(activeTracedLine, 1, activeTracedLine, 1),
          options: {
            isWholeLine: true,
            className: 'active-traced-line-highlight',
            glyphMarginClassName: 'active-traced-gutter-glyph',
            overviewRuler: {
              color: '#6366f1',
              position: monaco.editor.OverviewRulerLane.Full,
            },
          },
        },
      ];

      if (decorationsRef.current) {
        decorationsRef.current.set(newDecorations);
      } else {
        decorationsRef.current = editor.createDecorationsCollection(newDecorations);
      }

      editor.revealLineInCenter(activeTracedLine);
    } else {
      if (decorationsRef.current) {
        decorationsRef.current.clear();
      }
    }
  }, [activeTracedLine, consoleTab]);

  const handleRunTrace = useCallback(async (customInput?: string) => {
    setIsTracing(true);
    setConsoleTab('scrubber');
    setConsoleCollapsed(false);
    announce('Tracing Python execution step-by-step…');

    try {
      const inputToUse = (
        customInput ||
        (selectedCase ? selectedCase.input : problem.examples?.[0]?.input || '')
      ).trim();

      const res = await requestExecutionTrace({
        problemId: problem.id,
        code,
        language,
        input: inputToUse,
        functionNameHint: (problem as any).functionName || problem.id.replace(/-/g, '_'),
      });

      setTraceResult(res);
      if (res.steps && res.steps.length > 0) {
        setActiveTracedLine(res.steps[0].line);
        announce(`Trace recorded: ${res.steps.length} steps.`);
      } else if (!res.success) {
        announce(`Trace failed: ${res.error}`);
      }
    } catch (err: unknown) {
      console.error('Trace error:', err);
      announce('Failed to execute trace.');
    } finally {
      setIsTracing(false);
    }
  }, [announce, code, language, problem.examples, problem.id, selectedCase]);

  // Sensible workspace keyboard shortcuts (capture phase so Ctrl+S / Ctrl+Enter work inside Monaco).
  useEffect(() => {
    const handleWorkspaceKeyDown = (event: KeyboardEvent) => {
      const mod = event.ctrlKey || event.metaKey;
      const lowerKey = event.key.toLowerCase();

      if (mod && !event.altKey && lowerKey === 's') {
        event.preventDefault();
        event.stopPropagation();
        const ok = saveNow();
        announce(ok ? 'Draft saved locally' : 'Could not save draft locally');
        return;
      }

      if (mod && !event.altKey && event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        requestExecution(event.shiftKey ? 'submit' : 'run');
        return;
      }

      if (event.altKey && !mod) {
        if (lowerKey === 'b') {
          event.preventDefault();
          toggleDescription();
          announce(descriptionCollapsed ? 'Problem description expanded' : 'Problem description collapsed');
          return;
        }
        if (lowerKey === 'j') {
          event.preventDefault();
          setConsoleCollapsed((prev) => {
            announce(prev ? 'Test cases and console expanded' : 'Test cases and console collapsed');
            return !prev;
          });
          return;
        }
        if (event.key === '[' && prevProblem) {
          event.preventDefault();
          requestNavigate(`/workspace/${prevProblem.id}`);
          return;
        }
        if (event.key === ']' && nextProblem) {
          event.preventDefault();
          requestNavigate(`/workspace/${nextProblem.id}`);
          return;
        }
      }

      if (event.key === 'Escape' && shortcutsOpen) {
        event.preventDefault();
        setShortcutsOpen(false);
        return;
      }

      const target = event.target as HTMLElement | null;
      const isEditable = Boolean(
        target
        && (target.tagName === 'INPUT'
          || target.tagName === 'TEXTAREA'
          || target.tagName === 'SELECT'
          || target.isContentEditable),
      );
      if (!isEditable && !mod && !event.altKey && event.key === '?') {
        event.preventDefault();
        setShortcutsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleWorkspaceKeyDown, true);
    return () => window.removeEventListener('keydown', handleWorkspaceKeyDown, true);
  }, [
    announce,
    descriptionCollapsed,
    nextProblem,
    prevProblem,
    requestExecution,
    requestNavigate,
    saveNow,
    shortcutsOpen,
    toggleDescription,
  ]);



  function handleLanguageChange(next: string) {
    if (!isCodeLanguage(next)) return;
    switchDraftLanguage(next);
    setConfirmResetOpen(false);
    setRunnerState('idle');
    announce(`Switched editor language to ${languageLabels[next]}`);
  }

  function handleResetClick() {
    if (!hasChanges) {
      resetDraft();
      setRunnerState('idle');
      announce('Starter template restored');
      return;
    }
    setConfirmResetOpen(true);
  }

  function confirmReset() {
    const ok = resetDraft();
    setConfirmResetOpen(false);
    setRunnerState('idle');
    announce(ok ? `Reset ${languageLabels[language]} draft to starter code` : 'Could not reset draft');
  }

  function handleSaveAndLeave() {
    const target = pendingLeavePath;
    if (!target) return;
    const ok = saveNow();
    if (!ok) {
      setPendingLeavePath(null);
      announce('Save failed. Staying in workspace so you can retry.');
      return;
    }
    registerNavigationGuard(null);
    setPendingLeavePath(null);
    navigate(target);
  }

  function handleLeaveWithoutSaving() {
    const target = pendingLeavePath;
    if (!target) return;
    discardPending();
    registerNavigationGuard(null);
    setPendingLeavePath(null);
    navigate(target);
  }

  const saveStatusLabel = saveStatus === 'error'
    ? 'Save failed'
    : saveStatus === 'unsaved'
      ? 'Unsaved'
      : saveStatus === 'saving'
        ? 'Saving…'
        : 'Saved locally';

  const saveStatusTitle = saveStatus === 'error'
    ? (saveError ?? 'Could not save draft locally. Click Retry to try again.')
    : saveStatus === 'saved' && lastSavedAt
      ? `Saved locally at ${new Date(lastSavedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
      : saveStatus === 'saved'
        ? 'Starter template ready — edits save locally (Ctrl+S to save now)'
        : 'Autosaving your draft to this browser (Ctrl+S to save now)';

  function handleResizeStart(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || descriptionCollapsed) return;
    const container = splitContainerRef.current;
    if (!container) return;
    event.preventDefault();
    setIsDraggingSplit(true);
    const rect = container.getBoundingClientRect();
    const prevCursor = document.body.style.cursor;
    const prevSelect = document.body.style.userSelect;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const updateFromClientX = (clientX: number) => {
      if (rect.width <= 0) return;
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setSplitPercent(pct);
    };

    const handleMove = (moveEvent: PointerEvent) => {
      updateFromClientX(moveEvent.clientX);
    };

    const handleUp = () => {
      setIsDraggingSplit(false);
      document.body.style.cursor = prevCursor;
      document.body.style.userSelect = prevSelect;
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleUp);
  }

  function handleResizeKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setSplitPercent(splitPercent - 2);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setSplitPercent(splitPercent + 2);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setSplitPercent(MIN_SPLIT_PERCENT);
    } else if (event.key === 'End') {
      event.preventDefault();
      setSplitPercent(MAX_SPLIT_PERCENT);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      resetSplitPercent();
    }
  }

  function handleTabSelect(tab: string) {
    setActiveTab(tab);
    if (descriptionCollapsed) setDescriptionCollapsed(false);
  }

  const splitStyle = { '--ws-split': `${splitPercent}%` } as CSSProperties;

  const problemPager = (
    <div className="workspace-pager" aria-label="Problem navigation">
      <button
        type="button"
        onClick={() => prevProblem && requestNavigate(`/workspace/${prevProblem.id}`)}
        disabled={!prevProblem}
        className="workspace-pager-button"
        aria-label={prevProblem ? `Previous problem: ${prevProblem.title}` : 'No previous problem'}
        title={prevProblem ? `Previous: ${prevProblem.title} (Alt+[)` : 'First problem in library'}
      >
        <ChevronLeft size={14}/>
      </button>
      <span className="workspace-pager-count tabular-nums" title={`${problem.title} (${currentIndex + 1} of ${problemList.length})`}>
        {currentIndex + 1}/{problemList.length}
      </span>
      <button
        type="button"
        onClick={() => nextProblem && requestNavigate(`/workspace/${nextProblem.id}`)}
        disabled={!nextProblem}
        className="workspace-pager-button"
        aria-label={nextProblem ? `Next problem: ${nextProblem.title}` : 'No next problem'}
        title={nextProblem ? `Next: ${nextProblem.title} (Alt+])` : 'Last problem in library'}
      >
        <ChevronRight size={14}/>
      </button>
    </div>
  );

  return <div className="workspace-screen">
    {/* Contest Mode Fullscreen Mandatory Lockdown Gate */}
    {isContestMode && !isFullscreenActive && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in select-none">
        <div
          className="max-w-md w-full rounded-2xl border p-6 sm:p-7 space-y-5 text-center shadow-2xl"
          style={{ background: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
        >
          <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-500 shadow-inner">
            <ShieldAlert size={30} className="animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-black text-primary tracking-tight">
              Fullscreen Lockdown Required
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Contest challenges must be solved in <strong>Exclusive Fullscreen Mode</strong>. You cannot write code, test, or view problem details while windowed.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border bg-amber-500/10 border-amber-500/25 text-left text-xs space-y-1.5">
            <div className="flex items-center justify-between font-bold text-amber-700 dark:text-amber-400">
              <span>Fullscreen Exit Strike Counter</span>
              <span className="font-mono">{fullscreenExits} / 3 Strikes</span>
            </div>
            <p className="text-[11px] text-muted">
              Exiting fullscreen mode 3 times will permanently lock and auto-submit your contest attempt.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleEnterContestFullscreen}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition flex items-center justify-center gap-2"
            >
              <Maximize2 size={15} />
              <span>Enter Fullscreen & Continue Solving</span>
            </button>
            <button
              type="button"
              onClick={handleAbandonContest}
              className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-500/10 transition"
            >
              Abandon & Auto-Submit Contest
            </button>
          </div>
        </div>
      </div>
    )}
    {isContestMode && (
      <div
        className="flex items-center justify-between px-4 py-2 text-xs font-semibold border-b shrink-0 z-20"
        style={{
          background: 'var(--ca-surface)',
          borderColor: 'var(--ca-border)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 animate-pulse">
            CONTEST ARENA MODE
          </span>
          <span className="text-primary font-bold">
            Weekly Contest Session
          </span>
          <span className="text-muted text-[11px] hidden sm:inline">
            &bull; Proctoring active &bull; Test cases, trace & solutions disabled
          </span>
        </div>
        <Link
          to={`/contests/${contestId}`}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition"
        >
          <span>Return to Contest Arena</span>
        </Link>
      </div>
    )}
    <div
      ref={splitContainerRef}
      style={splitStyle}
      className={`workspace-split ${descriptionCollapsed ? 'workspace-split-collapsed' : ''} ${isDraggingSplit ? 'workspace-split-dragging' : ''}`}
    >
      <section className={`workspace-pane workspace-description-pane ${descriptionCollapsed ? 'workspace-description-pane-collapsed' : ''}`}>
        <div className="workspace-tabs">
          <div className="flex min-w-0 items-center gap-0.5 overflow-x-auto" role="tablist" aria-label="Problem information">
            {(isContestMode ? ['Description', 'Notes', 'Submissions'] : ['Description', 'Notes', 'Submissions', 'Solutions']).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => handleTabSelect(tab)}
                className={`workspace-tab ${activeTab === tab ? 'workspace-tab-active' : ''}`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span>{tab}</span>
                  {tab === 'Notes' && hasNote && <i className="workspace-tab-dot" aria-label="Has saved note"/>}
                </span>
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {problemPager}
            <button
              type="button"
              onClick={toggleDescription}
              className="workspace-collapse-button"
              aria-expanded={!descriptionCollapsed}
              aria-label={descriptionCollapsed ? 'Expand problem description' : 'Collapse problem description'}
              title={descriptionCollapsed ? 'Show problem description' : 'Collapse problem description'}
            >
              <span className="workspace-collapse-desktop">
                {descriptionCollapsed ? <PanelLeftOpen size={14}/> : <PanelLeftClose size={14}/>}
              </span>
              <span className="workspace-collapse-mobile">
                {descriptionCollapsed ? <ChevronDown size={14}/> : <ChevronUp size={14}/>}
                <span>{descriptionCollapsed ? 'Show' : 'Hide'}</span>
              </span>
            </button>
          </div>
        </div>
        {!descriptionCollapsed && (
          <div className="workspace-description-scroll" data-lenis-prevent>
            {activeTab === 'Description' ? <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">{problem.topics.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}</div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggleBookmark(problem.id)}
                    aria-pressed={bookmarked}
                    aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark problem'}
                    title={bookmarked ? 'Bookmarked locally' : 'Bookmark problem'}
                    className={`study-action-btn h-8 px-2.5 ${bookmarked ? 'study-action-btn-bookmark' : ''}`}
                  >
                    <Bookmark size={13} fill={bookmarked ? 'currentColor' : 'none'}/>
                    <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>
                  </button>
                  <CollectionPicker
                    problemId={problem.id}
                    problemTitle={problem.title}
                    collections={collections}
                    onToggleProblem={toggleProblemInCollection}
                    onCreateCollection={createCollection}
                  />
                </div>
              </div>
              {spacedReviewItem && !spacedReviewItem.isGraduated && !spacedReviewItem.dismissed && (
                <div className="mb-4 rounded-xl border border-purple-500/30 bg-purple-500/10 p-3 sm:p-4 flex items-start justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 font-bold text-[10px]">
                      S{spacedReviewItem.stage}
                    </span>
                    <div className="space-y-1">
                      <p className="font-bold text-primary flex items-center gap-2 flex-wrap">
                        <span>Spaced Repetition Review · Stage {spacedReviewItem.stage} of 3 ({SPACED_INTERVALS_DAYS[spacedReviewItem.stage]}-Day Recall)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold bg-purple-500/20 text-purple-300">
                          {formatScheduleLabel(spacedReviewItem.nextReviewDate).label}
                        </span>
                      </p>
                      <p className="text-muted text-[11px] leading-relaxed">
                        {spacedReviewItem.reason === 'both' ? 'Flagged from previous failed attempts and slow solve time.'
                          : spacedReviewItem.reason === 'failed' ? 'Flagged from previous unaccepted submissions.'
                          : 'Flagged from previous slow solve time.'} Aim to solve in under {Math.round(getSlowThreshold(problem.difficulty) / 60)} minutes to advance to the next interval.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <p className="workspace-eyebrow">PROBLEM STATEMENT</p>
              <h1 className="problem-title mt-1 text-2xl font-bold">{problem.title}</h1>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">{problem.description}</p>
              <ProblemExamples examples={problem.examples} className="mt-4"/>
              <div className="mt-5"><h3 className="mb-2.5 text-xs font-bold text-primary">Constraints</h3><ul className="list-disc space-y-1.5 pl-5 text-xs leading-6 text-muted">{problem.constraints.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="workspace-description-footer mt-8">
                <div className="flex flex-wrap items-start gap-x-5 gap-y-2">
                  {problem.acceptance && problem.acceptance !== '—' && problem.acceptance !== '0%' && (
                    <div>
                      <p className="text-[10px] text-muted">Acceptance rate</p>
                      <p className="mt-0.5 text-xs font-bold text-primary tabular-nums">{problem.acceptance}</p>
                    </div>
                  )}
                  <div
                    title={`Estimated active practice time for this session. Automatically pauses when the browser tab is hidden or after ${PRACTICE_IDLE_THRESHOLD_MINUTES} minutes without interaction. Sessions under ${MIN_PRACTICE_SESSION_SECONDS}s are not logged.`}
                  >
                    <p className="text-[10px] text-muted">Estimated practice time</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs font-bold text-primary tabular-nums">
                      <span
                        className={`workspace-practice-dot ${practiceTimerStatus === 'active' ? 'workspace-practice-dot-active' : 'workspace-practice-dot-paused'}`}
                        aria-hidden="true"
                      />
                      <span>{formatPracticeClock(estimatedPracticeSeconds)}</span>
                      {practiceTimerStatus !== 'active' && (
                        <span className="text-[10px] font-semibold text-muted">
                          ({practiceTimerStatus === 'idle' ? 'paused · idle' : 'paused'})
                        </span>
                      )}
                    </p>
                  </div>
                  {isPastDailyView && dailyParam && (
                    <p className="w-full text-[10px] text-muted">
                      {completedPastDaily ? `Completed for ${dailyParam} daily` : `Past daily (${dailyParam}) · not completed on that date`}
                    </p>
                  )}
                </div>
                {problem.owner === 'daily' ? (
                  <p className="text-xs text-muted">{completedTodayDaily ? 'Completed today' : 'Submit a passing solution to complete the challenge.'}</p>
                ) : isContestMode ? null : (
                  <p className="text-xs text-muted">{solved ? 'Solved' : 'Submit a passing solution to mark this problem solved.'}</p>
                )}
              </div>
            </> : activeTab === 'Notes' ? (
              <ProblemNotesPanel
                problemId={problem.id}
                problemTitle={problem.title}
                savedNote={problemNote}
                onSaveNote={saveNote}
                onClearNote={clearNote}
              />
            ) : activeTab === 'Submissions' ? (
              problemSubmissions.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-primary">Submission history</p>
                    <span className="text-[10px] font-semibold text-muted tabular-nums">
                      {problemSubmissions.length} {problemSubmissions.length === 1 ? 'record' : 'records'}
                    </span>
                  </div>
                  {problemSubmissions.map((item) => (
                    <SubmissionResultRow key={item.id} submission={item}/>
                  ))}
                </div>
              ) : (
                <SubmissionsEmptyState problemTitle={problem.title} markedSolvedLocally={solved}/>
              )
            ) : !isContestMode ? (
              <SolutionsPanel
                problem={problem}
                editorial={editorial}
                status={editorialStatus}
                error={editorialError}
                onRetry={retryEditorial}
                onBackToDescription={() => setActiveTab('Description')}
                currentCode={code}
                currentLanguage={language}
              />
            ) : null}
          </div>
        )}
      </section>

      {!descriptionCollapsed && (
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize problem description and editor panes"
          aria-valuemin={MIN_SPLIT_PERCENT}
          aria-valuemax={MAX_SPLIT_PERCENT}
          aria-valuenow={Math.round(splitPercent)}
          tabIndex={0}
          onPointerDown={handleResizeStart}
          onDoubleClick={resetSplitPercent}
          onKeyDown={handleResizeKeyDown}
          title="Drag to resize panes (double-click to reset)"
          className={`workspace-resizer ${isDraggingSplit ? 'workspace-resizer-active' : ''}`}
        >
          <span className="workspace-resizer-grip" aria-hidden="true"/>
        </div>
      )}

      <section className="workspace-editor-pane">
        <div className="workspace-editor-header">
          <div className="flex min-w-0 items-center gap-2.5">
            {descriptionCollapsed && (
              <button
                type="button"
                onClick={toggleDescription}
                className="workspace-icon-button workspace-expand-desktop-only"
                aria-label="Show problem description"
                title={`Show problem: ${problem.title}`}
              >
                <PanelLeftOpen size={13}/>
              </button>
            )}
            <div className="workspace-window-dots"><i/><i/><i/></div>
            <span className="workspace-file-icon"><FileCode2 size={14}/></span>
            <span className="truncate text-xs font-semibold text-primary">solution.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'java' ? 'java' : 'cpp'}</span>
            <span className={`workspace-save-status workspace-save-status-${saveStatus}`} title={saveStatusTitle} role="status" aria-live="polite">
              <i className="workspace-save-dot"/>
              <span>{saveStatusLabel}</span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {descriptionCollapsed && <div className="workspace-expand-desktop-only">{problemPager}</div>}
            <label className="workspace-language-select" aria-label="Choose programming language">
              <span className={`h-2 w-2 shrink-0 rounded-full ${languageDots[language]}`}/>
              <select value={language} onChange={(event) => handleLanguageChange(event.target.value)}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python 3</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </label>
            <button
              type="button"
              onClick={handleResetClick}
              aria-haspopup={hasChanges ? 'dialog' : undefined}
              className="workspace-reset-button"
              title={hasChanges ? 'Reset draft to starter code' : 'Reset starter code'}
            >
              <RotateCcw size={12}/><span>Reset</span>
            </button>
            <span className="workspace-toolbar-divider" aria-hidden="true"/>
            <Tooltip content="Keyboard shortcuts" shortcut="?" align="end">
              <button
                type="button"
                onClick={() => setShortcutsOpen(true)}
                aria-label="View keyboard shortcuts (?)"
                className="workspace-icon-button"
              >
                <Keyboard size={14}/>
              </button>
            </Tooltip>
            <EditorSettingsPopover
              preferences={editorPrefs}
              updatePreference={updateEditorPref}
              resetPreferences={resetEditorPrefs}
              isDefault={isDefaultEditorPrefs}
            />
          </div>
        </div>
        {saveStatus === 'error' && saveError && (
          <div className="border-b px-3 py-2" style={{ borderColor: 'var(--ca-border)' }}>
            <ErrorAlert
              title="Draft could not be saved locally"
              message={saveError}
              onRetry={() => {
                const ok = saveNow();
                announce(ok ? 'Draft saved locally' : 'Retry failed');
              }}
              retryLabel="Retry save"
            />
          </div>
        )}
        <div className="workspace-editor-stage" data-lenis-prevent>
          <Editor
            height="100%"
            path={`${problem.id}/${language}`}
            language={language}
            value={code}
            loading={<EditorLoadingSkeleton/>}
            onChange={(value) => {
              markActivity();
              updateCode(value ?? '');
            }}
            beforeMount={registerEditorTheme}
            onMount={(editor, monaco) => {
              editorRef.current = editor;
              monacoRef.current = monaco;
              autocompleteCleanupRef.current?.();
              autocompleteCleanupRef.current = attachLocalAutocomplete(
                editor,
                monaco,
                WORKSPACE_AUTOCOMPLETE_LANGUAGES,
              );
            }}
            theme={editorThemeName}
            options={{
              ...LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS,
              minimap: { enabled: editorPrefs.minimap },
              glyphMargin: true,
              fontSize: editorPrefs.fontSize,
              fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, monospace",
              fontLigatures: true,
              padding: { top: 22, bottom: 18 },
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
        <section className={`workspace-console ${consoleCollapsed ? 'workspace-console-collapsed' : ''}`}>
          {consoleCollapsed ? (
            <div
              className="flex items-center justify-between px-4 py-2 text-xs text-muted transition"
              style={{ background: 'var(--ca-surface)' }}
            >
              <button
                type="button"
                onClick={() => setConsoleCollapsed(false)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-primary transition py-0.5 group"
                aria-expanded={false}
                aria-label={isContestMode ? 'Expand console drawer' : 'Expand test cases and console drawer'}
                title={isContestMode ? 'Expand console (Alt+J)' : 'Expand test cases & console (Alt+J)'}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-muted group-hover:text-primary group-hover:border-indigo-500/40 transition">
                  <ChevronUp size={12} />
                </span>
                <span>{isContestMode ? 'Console Drawer' : 'Test Cases & Console'}</span>
                {!isContestMode && (
                  <span className="rounded-full px-1.5 py-0.5 text-[10px] font-bold bg-slate-500/10 text-muted tabular-nums">
                    {allCases.length}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2">
                {!isContestMode && language === 'python' && (
                  <button
                    type="button"
                    onClick={() => handleRunTrace()}
                    disabled={isTracing || runnerState === 'running'}
                    className="btn-secondary h-7 px-3 text-[11px] font-semibold gap-1 text-indigo-400 hover:text-indigo-300"
                    title="Step-through Python execution line-by-line"
                  >
                    <Sparkles size={11} className="text-indigo-400" /><span>Visual Trace</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => requestExecution('run')}
                  disabled={runnerState === 'running'}
                  className="btn-secondary h-7 px-3 text-[11px] font-semibold gap-1"
                  title={selectedCase ? `Run against ${selectedCase.name} (Ctrl+Enter)` : 'Run code (Ctrl+Enter)'}
                >
                  <Play size={11} /><span>Run</span>
                </button>
                <button
                  type="button"
                  onClick={() => requestExecution('submit')}
                  disabled={runnerState === 'running'}
                  className="btn-primary h-7 px-3 text-[11px] font-semibold gap-1"
                  title="Submit solution (Ctrl+Shift+Enter)"
                >
                  <Send size={11} /><span>Submit</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="workspace-console-header">
              <div className="flex min-w-0 items-center gap-1.5">
                <div className="workspace-console-tabs" role="tablist" aria-label="Console drawer">
                  {!isContestMode && (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={consoleTab === 'testcases'}
                      onClick={() => { setConsoleTab('testcases'); setConsoleCollapsed(false); }}
                      className={`workspace-console-tab ${consoleTab === 'testcases' ? 'workspace-console-tab-active' : ''}`}
                    >
                      <FlaskConical size={13}/>
                      <span>Testcases</span>
                      <span className="workspace-console-count tabular-nums">{allCases.length}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={consoleTab === 'console'}
                    onClick={() => { setConsoleTab('console'); setConsoleCollapsed(false); }}
                    className={`workspace-console-tab ${consoleTab === 'console' ? 'workspace-console-tab-active' : ''}`}
                  >
                    <Terminal size={13}/>
                    <span>Console</span>
                    {runnerState === 'error' && <span className="workspace-console-alert-dot" aria-hidden="true"/>}
                  </button>
                  {!isContestMode && (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={consoleTab === 'scrubber'}
                      onClick={() => { setConsoleTab('scrubber'); setConsoleCollapsed(false); }}
                      className={`workspace-console-tab ${consoleTab === 'scrubber' ? 'workspace-console-tab-active' : ''}`}
                    >
                      <Sparkles size={13} className="text-indigo-400" />
                      <span>Visual Scrubber</span>
                      {traceResult && traceResult.steps.length > 0 && (
                        <span className="workspace-console-count tabular-nums">{traceResult.steps.length}</span>
                      )}
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setConsoleCollapsed(true)}
                  className="workspace-icon-button h-7 w-7"
                  aria-expanded={true}
                  aria-label="Collapse console drawer"
                  title="Collapse drawer (Alt+J)"
                >
                  <ChevronDown size={13}/>
                </button>
              </div>
              <div className="flex items-center gap-2">
                {!isContestMode && language === 'python' && (
                  <button
                    type="button"
                    onClick={() => handleRunTrace()}
                    disabled={isTracing || runnerState === 'running'}
                    className="btn-secondary workspace-run-button gap-1.5 text-indigo-400 hover:text-indigo-300"
                    title="Step through Python code with exact runtime memory state"
                  >
                    <Sparkles size={13} className="text-indigo-400" />
                    <span>Visual Trace</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => requestExecution('run')}
                  disabled={runnerState === 'running'}
                  className="btn-secondary workspace-run-button"
                  title={selectedCase ? `Run against ${selectedCase.name}` : 'Run code'}
                >
                  <Play size={13}/><span>Run</span>
                </button>
                <button
                  type="button"
                  onClick={() => requestExecution('submit')}
                  disabled={runnerState === 'running'}
                  className="btn-primary workspace-submit-button"
                >
                  <Send size={13}/><span>Submit</span>
                </button>
              </div>
            </div>
          )}

          {!consoleCollapsed && (
            <div className="workspace-console-body" data-lenis-prevent aria-live="polite">
              {!isContestMode && consoleTab === 'testcases' ? (
                <TestCaseManager
                  sampleCases={sampleCases}
                  customCases={customCases}
                  selectedCase={selectedCase}
                  onSelectCase={selectCase}
                  onAddCustomCase={() => addCustomCase()}
                  onUpdateCustomCase={updateCustomCase}
                  onDeleteCustomCase={deleteCustomCase}
                  onCloneSample={cloneSampleToCustom}
                />
              ) : !isContestMode && consoleTab === 'scrubber' ? (
                <TracePanel
                  traceResult={traceResult}
                  isLoading={isTracing}
                  onRunTrace={handleRunTrace}
                  defaultInput={selectedCase?.input || problem.examples?.[0]?.input || ''}
                  onActiveLineChange={(line) => setActiveTracedLine(line)}
                />
              ) : (
                <>
                  {runnerState === 'idle' && (
                    <div className="workspace-console-idle">
                      <span className="workspace-console-prompt">$</span>
                      <span className="min-w-0 truncate">
                        {selectedCase
                          ? `Selected case: ${selectedCase.name}. Click Run to test solution or Submit to evaluate.`
                          : 'Ready when you are. Click Run to test solution or Submit to evaluate.'}
                      </span>
                      <span className="terminal-cursor"/>
                    </div>
                  )}

                  {runnerState === 'running' && (
                    <div className="workspace-run-state">
                      <LoaderCircle size={16} className="animate-spin themed-link"/>
                      <div>
                        <p className="text-xs font-semibold text-primary">
                          {runnerAction === 'run' ? 'Executing solution…' : 'Submitting solution to OnlineCompiler…'}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted">
                          Running with {languageLabels[language]} · OnlineCompiler.io
                        </p>
                      </div>
                    </div>
                  )}

                  {runnerState === 'error' && (
                    <div className="workspace-run-unavailable" role="status">
                      <div className="workspace-warning-icon"><AlertCircle size={16}/></div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-xs font-bold text-primary">Execution Error</p>
                          <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                            Failed
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] leading-5 text-muted font-mono whitespace-pre-wrap">
                          {executionError || 'An error occurred during code execution.'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRunnerState('idle')}
                        className="workspace-dismiss-button"
                        aria-label="Dismiss error message"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  {runnerState === 'completed' && executionResult && (
                    <div className="flex flex-col gap-3">
                      {/* Top Execution Summary Banner */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-2.5" style={{ borderColor: 'var(--ca-border)' }}>
                        <div className="flex flex-wrap items-center gap-2">
                          {executionResult.verdict === 'Accepted' ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                              <CheckCircle2 size={13}/>
                              Accepted
                            </span>
                          ) : executionResult.verdict === 'Wrong Answer' ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-2.5 py-1 text-xs font-bold text-rose-700 dark:text-rose-300 border border-rose-500/25">
                              <XCircle size={13}/>
                              Wrong Answer
                            </span>
                          ) : executionResult.verdict === 'Time Limit Exceeded' ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-300 border border-amber-500/25">
                              <Clock size={13}/>
                              Time Limit Exceeded
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-2.5 py-1 text-xs font-bold text-rose-700 dark:text-rose-300 border border-rose-500/25">
                              <AlertCircle size={13}/>
                              {executionResult.verdict}
                            </span>
                          )}

                          <span className="text-xs font-medium text-muted">
                            {executionResult.totalPassed} / {executionResult.totalTests} test cases passed
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted">
                          {executionResult.runtimeMs !== undefined && executionResult.runtimeMs > 0 && (
                            <span className="inline-flex items-center gap-1 font-mono">
                              <Clock size={12} className="themed-link"/>
                              {executionResult.runtimeMs} ms
                            </span>
                          )}
                          {executionResult.memoryMb !== undefined && executionResult.memoryMb > 0 && (
                            <span className="inline-flex items-center gap-1 font-mono">
                              <Cpu size={12} className="themed-link"/>
                              {executionResult.memoryMb} MB
                            </span>
                          )}
                          {executionResult.rankingPercentile !== undefined && (
                            <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                              Beats {executionResult.rankingPercentile}%
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Test Case Result Tabs */}
                      {executionResult.cases && executionResult.cases.length > 0 && (
                        <div className="flex flex-col gap-2.5">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {executionResult.cases.map((c, idx) => {
                              const isActive = idx === activeResultCaseIndex;
                              return (
                                <button
                                  key={c.caseNumber}
                                  type="button"
                                  onClick={() => setActiveResultCaseIndex(idx)}
                                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                                    isActive
                                      ? 'bg-primary/15 text-primary font-semibold ring-1 ring-primary/40'
                                      : 'bg-muted/10 text-muted hover:bg-muted/20'
                                  }`}
                                >
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${c.passed ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                    aria-hidden="true"
                                  />
                                  <span>Case {c.caseNumber}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Selected Case I/O */}
                          {(() => {
                            const curCase = executionResult.cases[activeResultCaseIndex] ?? executionResult.cases[0];
                            if (!curCase) return null;
                            return (
                              <div className="grid gap-2 sm:grid-cols-2">
                                <div className="space-y-1">
                                  <p className="workspace-tc-field-label">Input</p>
                                  <pre className="workspace-tc-readonly font-mono">{curCase.input}</pre>
                                </div>
                                <div className="space-y-1">
                                  <p className="workspace-tc-field-label">Expected Output</p>
                                  <pre className="workspace-tc-readonly font-mono">{curCase.expected || '(any output)'}</pre>
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <p className="workspace-tc-field-label">Actual Output</p>
                                    <span className={`text-[10px] font-bold ${curCase.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                      {curCase.passed ? '✓ Output matches expected' : '✗ Output mismatch'}
                                    </span>
                                  </div>
                                  <pre className={`workspace-tc-readonly font-mono ${curCase.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                    {curCase.actual || (curCase.passed ? '(no console output)' : '(empty output)')}
                                  </pre>
                                </div>
                                {curCase.stderr && (
                                  <div className="sm:col-span-2 space-y-1">
                                    <p className="workspace-tc-field-label text-rose-500">Error / Stderr</p>
                                    <pre className="workspace-tc-readonly font-mono text-rose-500 whitespace-pre-wrap">{curCase.stderr}</pre>
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {/* Top-level Stderr if any */}
                      {executionResult.stderr && (!executionResult.cases || executionResult.cases.every(c => !c.stderr)) && (
                        <div className="space-y-1">
                          <p className="workspace-tc-field-label text-rose-500">Stderr</p>
                          <pre className="workspace-tc-readonly font-mono text-rose-500 whitespace-pre-wrap">{executionResult.stderr}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </section>
      </section>
    </div>

    <ConfirmDialog
      open={confirmResetOpen}
      tone="danger"
      title={`Reset ${languageLabels[language]} draft?`}
      description={`This replaces your local ${languageLabels[language]} code for "${problem.title}" with the starter template. Drafts for other languages stay saved.`}
      confirmLabel="Reset code"
      cancelLabel="Keep draft"
      onConfirm={confirmReset}
      onCancel={() => setConfirmResetOpen(false)}
    />

    <ConfirmDialog
      open={Boolean(pendingLeavePath)}
      tone="warning"
      title="Unsaved draft changes"
      description={
        saveStatus === 'error'
          ? `Your latest edits for "${problem.title}" could not be saved locally (${saveError ?? 'storage error'}). Retry saving before leaving, or leave without saving your newest changes.`
          : `Your latest edits for "${problem.title}" have not finished saving to this browser yet. Save now before leaving, or leave without saving?`
      }
      confirmLabel="Save & leave"
      secondaryLabel="Leave without saving"
      cancelLabel="Stay in workspace"
      onConfirm={handleSaveAndLeave}
      onSecondary={handleLeaveWithoutSaving}
      onCancel={() => setPendingLeavePath(null)}
    />

    {shortcutsOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px] ca-modal-backdrop"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShortcutsOpen(false);
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ws-shortcuts-title"
          className="panel-card ca-modal-panel w-full max-w-md p-5 sm:p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3 border-b pb-3" style={{ borderColor: 'var(--ca-border)' }}>
            <div className="flex items-center gap-2">
              <Keyboard size={16} className="themed-link" aria-hidden="true"/>
              <h3 id="ws-shortcuts-title" className="font-display text-base font-bold text-primary">
                Workspace keyboard shortcuts
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShortcutsOpen(false)}
              aria-label="Close keyboard shortcuts"
              className="rounded-lg p-1.5 text-muted transition hover:bg-black/5 hover:text-primary dark:hover:bg-white/5"
            >
              <X size={16}/>
            </button>
          </div>
          <dl className="mt-4 space-y-2.5 text-xs">
            {[
              ['Ctrl / Cmd + K', 'Open global command palette'],
              ['Ctrl / Cmd + S', 'Save draft locally right now'],
              ['Ctrl / Cmd + Enter', 'Run selected test case'],
              ['Ctrl / Cmd + Shift + Enter', 'Submit solution'],
              ['Alt + B', 'Toggle problem description pane'],
              ['Alt + J', 'Toggle test cases & console drawer'],
              ['Alt + [  /  Alt + ]', 'Previous / next problem'],
              ['?', 'Toggle this shortcuts reference'],
            ].map(([keys, desc]) => (
              <div key={keys} className="flex items-center justify-between gap-3">
                <dt className="text-muted">{desc}</dt>
                <dd className="shrink-0"><kbd className="ca-kbd">{keys}</kbd></dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex justify-end">
            <button type="button" onClick={() => setShortcutsOpen(false)} className="btn-primary py-1.5 text-xs">
              Done
            </button>
          </div>
        </div>
      </div>
    )}
  </div>;
}
