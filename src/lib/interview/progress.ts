import { useState, useEffect, useCallback, useRef } from 'react';
import { ActiveInterviewRound, InterviewScorecard } from '../../types/interview';
import { isAppFullscreen, onFullscreenChange, exitAppFullscreen } from '../fullscreen';
import { computeInterviewScorecard } from './scoring';

const ACTIVE_ROUND_STORAGE_KEY = 'prismcode-mock-interview-active-v1';
const HISTORY_STORAGE_KEY = 'prismcode-mock-interview-history-v1';

export function getStoredActiveRound(): ActiveInterviewRound | null {
  try {
    const raw = localStorage.getItem(ACTIVE_ROUND_STORAGE_KEY);
    if (!raw) return null;
    const parsed: ActiveInterviewRound = JSON.parse(raw);
    if (parsed && parsed.id && !parsed.isCompleted) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse stored active interview round:', e);
  }
  return null;
}

export function saveStoredActiveRound(round: ActiveInterviewRound | null) {
  try {
    if (!round || round.isCompleted) {
      localStorage.removeItem(ACTIVE_ROUND_STORAGE_KEY);
    } else {
      localStorage.setItem(ACTIVE_ROUND_STORAGE_KEY, JSON.stringify(round));
    }
  } catch (e) {
    console.error('Failed to save active interview round:', e);
  }
}

export function getInterviewHistory(): InterviewScorecard[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const list: InterviewScorecard[] = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    console.error('Failed to parse interview history:', e);
    return [];
  }
}

export function saveInterviewHistoryItem(scorecard: InterviewScorecard) {
  try {
    const current = getInterviewHistory();
    const updated = [scorecard, ...current.filter((s) => s.roundId !== scorecard.roundId)].slice(0, 50);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save interview history:', e);
  }
}

export function exitFullscreenSafe() {
  void exitAppFullscreen();
}

export function useInterviewSession(initialRound?: ActiveInterviewRound | null) {
  const [round, setRound] = useState<ActiveInterviewRound | null>(() => {
    return initialRound === undefined ? getStoredActiveRound() : initialRound;
  });

  const [activeScorecard, setActiveScorecard] = useState<InterviewScorecard | null>(null);
  const [tabSwitchAlert, setTabSwitchAlert] = useState<number | null>(null);
  const [isFullscreenActive, setIsFullscreenActive] = useState(isAppFullscreen);
  const wasFullscreen = useRef(isFullscreenActive);

  const roundRef = useRef<ActiveInterviewRound | null>(round);
  roundRef.current = round;

  useEffect(() => {
    if (round) saveStoredActiveRound(round);
  }, [round]);

  const finishRound = useCallback((reason?: string, changes: Partial<ActiveInterviewRound> = {}) => {
    const current = roundRef.current;
    if (!current?.hasStarted || current.isCompleted) return;
    const finished = { ...current, ...changes, isCompleted: true, submittedAt: Date.now(), autoSubmitReason: reason };
    roundRef.current = finished;
    setRound(finished);
    const scorecard = computeInterviewScorecard(finished);
    saveInterviewHistoryItem(scorecard);
    setActiveScorecard(scorecard);
    if (getStoredActiveRound()?.id === finished.id) saveStoredActiveRound(null);
    exitFullscreenSafe();
  }, []);

  const syncFullscreen = useCallback((fullscreen: boolean) => {
    const exitedFullscreen = wasFullscreen.current && !fullscreen;
    wasFullscreen.current = fullscreen;
    setIsFullscreenActive(fullscreen);
    const current = roundRef.current;
    if (!current || current.isCompleted) return;

    if (fullscreen && !current.hasStarted) {
      const started = { ...current, hasStarted: true };
      roundRef.current = started;
      setRound(started);
    } else if (exitedFullscreen && current.hasStarted) {
      finishRound('Auto-submitted: Exited full-screen mode', { fullscreenExits: current.fullscreenExits + 1 });
    }
  }, [finishRound]);

  useEffect(() => {
    if (!round || round.isCompleted) return;
    const unsubscribe = onFullscreenChange(syncFullscreen);
    if (isAppFullscreen()) syncFullscreen(true);
    return unsubscribe;
  }, [round?.id, round?.isCompleted, syncFullscreen]);

  useEffect(() => {
    if (!round?.hasStarted || round.isCompleted) return;
    let hiddenAt: number | null = document.hidden ? Date.now() : null;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        hiddenAt ??= Date.now();
        return;
      }
      if (hiddenAt === null) return;
      const current = roundRef.current;
      const focusLossSeconds = Math.round((Date.now() - hiddenAt) / 1000);
      hiddenAt = null;
      if (!current || current.isCompleted) return;
      const changes = {
        tabSwitches: current.tabSwitches + 1,
        focusLossSeconds: current.focusLossSeconds + focusLossSeconds,
      };
      if (changes.tabSwitches >= 4) {
        finishRound('Auto-submitted: Exceeded maximum allowed tab switches (4)', changes);
        return;
      }
      setRound(previous => previous && !previous.isCompleted ? { ...previous, ...changes } : previous);
      setTabSwitchAlert(changes.tabSwitches);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [round?.id, round?.hasStarted, round?.isCompleted, finishRound]);

  useEffect(() => {
    if (!round?.hasStarted || round.isCompleted) return;
    const interval = setInterval(() => {
      const current = roundRef.current;
      if (!current || current.isCompleted) return;
      const remainingSeconds = Math.max(0, current.remainingSeconds - 1);
      const activeKey = current.currentProblemIndex === 0 ? 'problem1State' : 'problem2State';
      const changes = {
        remainingSeconds,
        [activeKey]: { ...current[activeKey], timeSpentSeconds: current[activeKey].timeSpentSeconds + 1 },
      };
      if (remainingSeconds === 0) {
        finishRound(`Time expired (${current.durationMinutes}-minute limit reached)`, changes);
      } else {
        setRound(previous => previous && !previous.isCompleted ? {
          ...previous,
          remainingSeconds,
          [activeKey]: { ...previous[activeKey], timeSpentSeconds: previous[activeKey].timeSpentSeconds + 1 },
        } : previous);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [round?.id, round?.hasStarted, round?.isCompleted, finishRound]);

  // Switch between problem 0 and problem 1
  const switchProblem = useCallback((index: 0 | 1) => {
    setRound((prev) => {
      if (!prev || prev.isCompleted) return prev;
      return { ...prev, currentProblemIndex: index };
    });
  }, []);

  // Update current problem code
  const updateCode = useCallback((code: string, language?: string) => {
    setRound((prev) => {
      if (!prev || prev.isCompleted) return prev;
      const idx = prev.currentProblemIndex;
      if (idx === 0) {
        return {
          ...prev,
          problem1State: {
            ...prev.problem1State,
            code,
            language: language || prev.problem1State.language,
          },
        };
      } else {
        return {
          ...prev,
          problem2State: {
            ...prev.problem2State,
            code,
            language: language || prev.problem2State.language,
          },
        };
      }
    });
  }, []);

  // Record submission result for current problem
  const recordSubmission = useCallback(
    (results: {
      passed: boolean;
      passedCount: number;
      totalCount: number;
      runtimeMs?: number;
      memoryMb?: number;
    }) => {
      setRound((prev) => {
        if (!prev || prev.isCompleted) return prev;
        const idx = prev.currentProblemIndex;

        if (idx === 0) {
          const nextP1 = {
            ...prev.problem1State,
            isSolved: prev.problem1State.isSolved || results.passed,
            passedCount: Math.max(prev.problem1State.passedCount, results.passedCount),
            totalCount: results.totalCount,
            runtimeMs: results.runtimeMs ?? prev.problem1State.runtimeMs,
            memoryMb: results.memoryMb ?? prev.problem1State.memoryMb,
            attemptsCount: prev.problem1State.attemptsCount + 1,
          };
          return { ...prev, problem1State: nextP1 };
        } else {
          const nextP2 = {
            ...prev.problem2State,
            isSolved: prev.problem2State.isSolved || results.passed,
            passedCount: Math.max(prev.problem2State.passedCount, results.passedCount),
            totalCount: results.totalCount,
            runtimeMs: results.runtimeMs ?? prev.problem2State.runtimeMs,
            memoryMb: results.memoryMb ?? prev.problem2State.memoryMb,
            attemptsCount: prev.problem2State.attemptsCount + 1,
          };
          return { ...prev, problem2State: nextP2 };
        }
      });
    },
    []
  );

  const dismissTabSwitchAlert = useCallback(() => {
    setTabSwitchAlert(null);
  }, []);

  return {
    round,
    activeScorecard,
    tabSwitchAlert,
    isFullscreenActive,
    syncFullscreen,
    dismissTabSwitchAlert,
    switchProblem,
    updateCode,
    recordSubmission,
    submitInterview: finishRound,
  };
}
