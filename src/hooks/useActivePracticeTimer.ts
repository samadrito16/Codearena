import { useCallback, useEffect, useRef, useState } from 'react';
import {
  PRACTICE_ACTIVITY_THROTTLE_MS,
  PRACTICE_IDLE_THRESHOLD_MS,
  checkTimerIdle,
  consumeTimerElapsedSeconds,
  createPracticeTimerState,
  getTimerElapsedMs,
  pausePracticeTimer,
  recordTimerActivity,
  type PracticeTimerState,
  type PracticeTimerStatus,
} from '../lib/practiceTimer';

interface UseActivePracticeTimerOptions {
  /** Identifies the current problem/session; changing this flushes the previous session and resets the timer. */
  sessionKey: string;
  /** Called with remaining unlogged active seconds when switching problems, unmounting, or hiding the page. */
  onSessionFlush?: (sessionKey: string, activeSeconds: number) => void;
  /** Inactivity timeout before automatically pausing (defaults to 2 minutes). */
  idleThresholdMs?: number;
}

export interface ActivePracticeTimerResult {
  /** Total estimated active seconds accumulated during the current session on this problem. */
  activeSeconds: number;
  /** Current timer status: running (`active`), paused due to inactivity (`idle`), or tab hidden (`hidden`). */
  status: PracticeTimerStatus;
  /**
   * Returns active seconds accumulated since the last flush (e.g. when marking a problem solved)
   * and resets the unlogged counter so unmount will not double-count the same time.
   */
  consumeUnloggedSeconds: () => number;
  /** Records explicit user interaction (e.g. Monaco editor code changes). */
  markActivity: () => void;
}

function isDocumentVisible(): boolean {
  return typeof document === 'undefined' ? true : document.visibilityState === 'visible';
}

export function useActivePracticeTimer({
  sessionKey,
  onSessionFlush,
  idleThresholdMs = PRACTICE_IDLE_THRESHOLD_MS,
}: UseActivePracticeTimerOptions): ActivePracticeTimerResult {
  const timerRef = useRef<PracticeTimerState>(createPracticeTimerState(Date.now(), isDocumentVisible()));
  const loggedOffsetSecondsRef = useRef(0);
  const lastActivityHandledRef = useRef(0);
  const onSessionFlushRef = useRef(onSessionFlush);
  onSessionFlushRef.current = onSessionFlush;

  const [activeSeconds, setActiveSeconds] = useState(0);
  const [status, setStatus] = useState<PracticeTimerStatus>(timerRef.current.status);

  const syncDisplay = useCallback((now: number) => {
    const nextState = checkTimerIdle(timerRef.current, now, idleThresholdMs);
    timerRef.current = nextState;
    const unloggedSeconds = Math.floor(getTimerElapsedMs(nextState, now, idleThresholdMs) / 1000);
    const totalSeconds = loggedOffsetSecondsRef.current + unloggedSeconds;
    setActiveSeconds((prev) => (prev === totalSeconds ? prev : totalSeconds));
    setStatus((prev) => (prev === nextState.status ? prev : nextState.status));
  }, [idleThresholdMs]);

  const markActivity = useCallback(() => {
    const now = Date.now();
    if (now - lastActivityHandledRef.current < PRACTICE_ACTIVITY_THROTTLE_MS && timerRef.current.status === 'active') {
      return;
    }
    lastActivityHandledRef.current = now;
    timerRef.current = recordTimerActivity(timerRef.current, now, isDocumentVisible(), idleThresholdMs);
    setStatus((prev) => (prev === timerRef.current.status ? prev : timerRef.current.status));
  }, [idleThresholdMs]);

  const consumeUnloggedSeconds = useCallback(() => {
    const now = Date.now();
    const { seconds, nextState } = consumeTimerElapsedSeconds(
      timerRef.current,
      now,
      isDocumentVisible(),
      idleThresholdMs,
    );
    timerRef.current = nextState;
    loggedOffsetSecondsRef.current += seconds;
    const totalSeconds = loggedOffsetSecondsRef.current;
    setActiveSeconds((prev) => (prev === totalSeconds ? prev : totalSeconds));
    setStatus((prev) => (prev === nextState.status ? prev : nextState.status));
    return seconds;
  }, [idleThresholdMs]);

  useEffect(() => {
    const startedAt = Date.now();
    const visible = isDocumentVisible();
    timerRef.current = createPracticeTimerState(startedAt, visible);
    loggedOffsetSecondsRef.current = 0;
    lastActivityHandledRef.current = startedAt;
    setActiveSeconds(0);
    setStatus(timerRef.current.status);

    const handleVisibilityChange = () => {
      const now = Date.now();
      if (isDocumentVisible()) {
        lastActivityHandledRef.current = now;
        timerRef.current = recordTimerActivity(timerRef.current, now, true, idleThresholdMs);
      } else {
        timerRef.current = pausePracticeTimer(timerRef.current, 'hidden', now, idleThresholdMs);
      }
      syncDisplay(now);
    };

    const handleInteraction = () => {
      markActivity();
    };

    const handlePageHide = () => {
      const now = Date.now();
      const { seconds, nextState } = consumeTimerElapsedSeconds(timerRef.current, now, false, idleThresholdMs);
      timerRef.current = nextState;
      loggedOffsetSecondsRef.current += seconds;
      if (seconds > 0) {
        onSessionFlushRef.current?.(sessionKey, seconds);
      }
    };

    const interactionEvents: Array<keyof WindowEventMap> = [
      'keydown',
      'pointerdown',
      'pointermove',
      'wheel',
      'touchstart',
      'focus',
    ];

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleInteraction, { passive: true });
    });

    const intervalId = window.setInterval(() => {
      syncDisplay(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleInteraction);
      });

      const now = Date.now();
      const { seconds, nextState } = consumeTimerElapsedSeconds(timerRef.current, now, false, idleThresholdMs);
      timerRef.current = nextState;
      if (seconds > 0) {
        onSessionFlushRef.current?.(sessionKey, seconds);
      }
    };
  }, [idleThresholdMs, markActivity, sessionKey, syncDisplay]);

  return {
    activeSeconds,
    status,
    consumeUnloggedSeconds,
    markActivity,
  };
}
