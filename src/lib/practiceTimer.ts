/**
 * Documented local practice-time tracking constants and pure state transitions.
 *
 * Practice time in CodeArena is an **estimate** based on active workspace engagement:
 * - Timing pauses immediately when the browser tab becomes hidden (`visibilitychange`).
 * - Timing pauses automatically after `PRACTICE_IDLE_THRESHOLD_MS` (2 minutes) without
 *   user interaction (typing, pointer input, scrolling, or editor changes).
 * - Practice sessions shorter than `MIN_PRACTICE_SESSION_SECONDS` (30 seconds) of active
 *   time are ignored so quick visits do not clutter practice history.
 */

export const MIN_PRACTICE_SESSION_SECONDS = 30;
export const PRACTICE_IDLE_THRESHOLD_MINUTES = 2;
export const PRACTICE_IDLE_THRESHOLD_MS = PRACTICE_IDLE_THRESHOLD_MINUTES * 60 * 1000;
export const PRACTICE_ACTIVITY_THROTTLE_MS = 1000;

export type PracticeTimerStatus = 'active' | 'idle' | 'hidden';

export interface PracticeTimerState {
  /** Active milliseconds accumulated before the current running segment. */
  accumulatedMs: number;
  /** Timestamp (ms) when the current active segment started, or null while paused. */
  activeSinceMs: number | null;
  /** Timestamp (ms) of the most recent user interaction. */
  lastActivityMs: number;
  /** Current running/paused state of the timer. */
  status: PracticeTimerStatus;
}

export function createPracticeTimerState(now: number, isVisible: boolean): PracticeTimerState {
  return {
    accumulatedMs: 0,
    activeSinceMs: isVisible ? now : null,
    lastActivityMs: now,
    status: isVisible ? 'active' : 'hidden',
  };
}

function getCurrentSegmentMs(
  state: PracticeTimerState,
  now: number,
  idleThresholdMs = PRACTICE_IDLE_THRESHOLD_MS,
): number {
  if (state.activeSinceMs === null) return 0;
  // Cap any single active segment at lastActivityMs + idleThresholdMs so OS sleep or
  // background timer throttling can never inflate estimated practice time.
  const effectiveEnd = Math.min(now, state.lastActivityMs + idleThresholdMs);
  return Math.max(0, effectiveEnd - state.activeSinceMs);
}

export function getTimerElapsedMs(
  state: PracticeTimerState,
  now: number,
  idleThresholdMs = PRACTICE_IDLE_THRESHOLD_MS,
): number {
  return state.accumulatedMs + getCurrentSegmentMs(state, now, idleThresholdMs);
}

export function pausePracticeTimer(
  state: PracticeTimerState,
  reason: 'idle' | 'hidden',
  now: number,
  idleThresholdMs = PRACTICE_IDLE_THRESHOLD_MS,
): PracticeTimerState {
  const accumulatedMs = getTimerElapsedMs(state, now, idleThresholdMs);
  if (state.activeSinceMs === null && state.status === reason && state.accumulatedMs === accumulatedMs) {
    return state;
  }
  return {
    ...state,
    accumulatedMs,
    activeSinceMs: null,
    status: reason,
  };
}

export function recordTimerActivity(
  state: PracticeTimerState,
  now: number,
  isVisible: boolean,
  idleThresholdMs = PRACTICE_IDLE_THRESHOLD_MS,
): PracticeTimerState {
  if (!isVisible) {
    return pausePracticeTimer(state, 'hidden', now, idleThresholdMs);
  }
  const accumulatedMs = getTimerElapsedMs(state, now, idleThresholdMs);
  return {
    accumulatedMs,
    activeSinceMs: now,
    lastActivityMs: now,
    status: 'active',
  };
}

export function checkTimerIdle(
  state: PracticeTimerState,
  now: number,
  idleThresholdMs = PRACTICE_IDLE_THRESHOLD_MS,
): PracticeTimerState {
  if (state.status !== 'active') return state;
  if (now - state.lastActivityMs >= idleThresholdMs) {
    return pausePracticeTimer(state, 'idle', now, idleThresholdMs);
  }
  return state;
}

export function consumeTimerElapsedSeconds(
  state: PracticeTimerState,
  now: number,
  isVisible: boolean,
  idleThresholdMs = PRACTICE_IDLE_THRESHOLD_MS,
): { seconds: number; nextState: PracticeTimerState } {
  const totalMs = getTimerElapsedMs(state, now, idleThresholdMs);
  const seconds = Math.round(totalMs / 1000);
  const keepRunning = state.status === 'active' && isVisible && now - state.lastActivityMs < idleThresholdMs;
  const nextStatus: PracticeTimerStatus = !isVisible
    ? 'hidden'
    : keepRunning
      ? 'active'
      : 'idle';

  return {
    seconds,
    nextState: {
      accumulatedMs: 0,
      activeSinceMs: keepRunning ? now : null,
      lastActivityMs: state.lastActivityMs,
      status: nextStatus,
    },
  };
}

export function formatPracticeClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m`;
  }
  return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
}
