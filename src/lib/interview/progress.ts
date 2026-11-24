import { useState, useEffect, useCallback, useRef } from 'react';
import { ActiveInterviewRound, InterviewScorecard } from '../../types/interview';
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
  if (typeof document !== 'undefined' && document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

export function useInterviewSession(initialRound?: ActiveInterviewRound | null) {
  const [round, setRound] = useState<ActiveInterviewRound | null>(() => {
    return initialRound || getStoredActiveRound();
  });

  const [activeScorecard, setActiveScorecard] = useState<InterviewScorecard | null>(null);
  const [tabSwitchAlert, setTabSwitchAlert] = useState<number | null>(null);
  const [fullscreenExitAlert, setFullscreenExitAlert] = useState<number | null>(null);

  const roundRef = useRef<ActiveInterviewRound | null>(round);
  roundRef.current = round;

  // Sync to local storage
  useEffect(() => {
    saveStoredActiveRound(round);
  }, [round]);

  // Handle focus guard (tab switching / blur)
  useEffect(() => {
    if (!round || round.isCompleted) return;

    let blurTimestamp = 0;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        blurTimestamp = Date.now();
      } else {
        const current = roundRef.current;
        if (!current || current.isCompleted) return;

        const focusLossSec = blurTimestamp > 0 ? Math.round((Date.now() - blurTimestamp) / 1000) : 0;
        const newCount = current.tabSwitches + 1;

        // Auto-submit if user switches tabs 4 times
        if (newCount >= 4) {
          exitFullscreenSafe();
          const finishedRound: ActiveInterviewRound = {
            ...current,
            tabSwitches: newCount,
            focusLossSeconds: current.focusLossSeconds + focusLossSec,
            isCompleted: true,
            submittedAt: Date.now(),
            autoSubmitReason: 'Auto-submitted: Exceeded maximum allowed tab switches (4)',
          };
          const scorecard = computeInterviewScorecard(finishedRound);
          saveInterviewHistoryItem(scorecard);
          setActiveScorecard(scorecard);
          saveStoredActiveRound(null);
          setRound(finishedRound);
          return;
        }

        setRound((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            tabSwitches: newCount,
            focusLossSeconds: prev.focusLossSeconds + focusLossSec,
          };
        });

        setTabSwitchAlert(newCount);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [round?.id, round?.isCompleted]);

  // Handle fullscreen exit detection: Auto-submit immediately once out of full-screen
  useEffect(() => {
    if (!round || round.isCompleted) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        const current = roundRef.current;
        if (!current || current.isCompleted) return;

        // Auto-submit IMMEDIATELY once out of full-screen
        exitFullscreenSafe();
        const finishedRound: ActiveInterviewRound = {
          ...current,
          fullscreenExits: (current.fullscreenExits || 0) + 1,
          isCompleted: true,
          submittedAt: Date.now(),
          autoSubmitReason: 'Auto-submitted: Exited full-screen mode',
        };
        const scorecard = computeInterviewScorecard(finishedRound);
        saveInterviewHistoryItem(scorecard);
        setActiveScorecard(scorecard);
        saveStoredActiveRound(null);
        setRound(finishedRound);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [round?.id, round?.isCompleted]);

  // Handle going back (popstate): Auto-submit immediately so candidate cannot resume after leaving
  useEffect(() => {
    if (!round || round.isCompleted) return;

    const handlePopState = () => {
      const current = roundRef.current;
      if (current && !current.isCompleted) {
        exitFullscreenSafe();
        const finishedRound: ActiveInterviewRound = {
          ...current,
          isCompleted: true,
          submittedAt: Date.now(),
          autoSubmitReason: 'Auto-submitted: Candidate navigated back from the interview',
        };
        const scorecard = computeInterviewScorecard(finishedRound);
        saveInterviewHistoryItem(scorecard);
        saveStoredActiveRound(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [round?.id, round?.isCompleted]);

  // Timer interval: decrements remainingSeconds and increments timeSpentSeconds for current active problem
  useEffect(() => {
    if (!round || round.isCompleted) return;

    const interval = setInterval(() => {
      setRound((prev) => {
        if (!prev || prev.isCompleted) return prev;

        const nextRemaining = prev.remainingSeconds - 1;
        const currentIdx = prev.currentProblemIndex;

        let nextProblem1 = { ...prev.problem1State };
        let nextProblem2 = { ...prev.problem2State };

        if (currentIdx === 0) {
          nextProblem1.timeSpentSeconds += 1;
        } else {
          nextProblem2.timeSpentSeconds += 1;
        }

        // Time up: Auto-submit
        if (nextRemaining <= 0) {
          exitFullscreenSafe();
          const finishedRound: ActiveInterviewRound = {
            ...prev,
            remainingSeconds: 0,
            problem1State: nextProblem1,
            problem2State: nextProblem2,
            isCompleted: true,
            submittedAt: Date.now(),
            autoSubmitReason: 'Time expired (45-minute limit reached)',
          };
          const scorecard = computeInterviewScorecard(finishedRound);
          saveInterviewHistoryItem(scorecard);
          setActiveScorecard(scorecard);
          saveStoredActiveRound(null);
          return finishedRound;
        }

        return {
          ...prev,
          remainingSeconds: nextRemaining,
          problem1State: nextProblem1,
          problem2State: nextProblem2,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [round?.id, round?.isCompleted]);

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

  // Submit interview round
  const submitInterview = useCallback((reason?: string) => {
    exitFullscreenSafe();
    setRound((prev) => {
      if (!prev) return null;
      const finished: ActiveInterviewRound = {
        ...prev,
        isCompleted: true,
        submittedAt: Date.now(),
        autoSubmitReason: reason,
      };
      const scorecard = computeInterviewScorecard(finished);
      saveInterviewHistoryItem(scorecard);
      setActiveScorecard(scorecard);
      saveStoredActiveRound(null);
      return finished;
    });
  }, []);

  const dismissTabSwitchAlert = useCallback(() => {
    setTabSwitchAlert(null);
  }, []);

  const dismissFullscreenExitAlert = useCallback(() => {
    setFullscreenExitAlert(null);
  }, []);

  return {
    round,
    setRound,
    activeScorecard,
    setActiveScorecard,
    tabSwitchAlert,
    fullscreenExitAlert,
    dismissTabSwitchAlert,
    dismissFullscreenExitAlert,
    switchProblem,
    updateCode,
    recordSubmission,
    submitInterview,
  };
}
