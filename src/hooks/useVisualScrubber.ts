import { useState, useEffect, useRef, useCallback } from 'react';
import type { TraceStep } from '../types/scrubber';

export type PlaybackSpeed = 0.5 | 1 | 2;

export interface UseVisualScrubberOptions {
  steps: TraceStep[];
  initialIndex?: number;
  onStepChange?: (step: TraceStep | null, index: number) => void;
}

export function useVisualScrubber({
  steps,
  initialIndex = 0,
  onStepChange,
}: UseVisualScrubberOptions) {
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (!steps || steps.length === 0) return 0;
    return Math.min(Math.max(0, initialIndex), steps.length - 1);
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);

  // Keep ref to avoid stale interval closures
  const playTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync index if steps array changes
  useEffect(() => {
    if (!steps || steps.length === 0) {
      setCurrentIndex(0);
      setIsPlaying(false);
      return;
    }
    setCurrentIndex((prev) => Math.min(prev, steps.length - 1));
  }, [steps]);

  const currentStep: TraceStep | null =
    steps && steps.length > 0 && currentIndex >= 0 && currentIndex < steps.length
      ? steps[currentIndex]
      : null;

  useEffect(() => {
    onStepChange?.(currentStep, currentIndex);
  }, [currentStep, currentIndex, onStepChange]);

  const canStepForward = steps && steps.length > 0 && currentIndex < steps.length - 1;
  const canStepBackward = steps && steps.length > 0 && currentIndex > 0;

  const stepForward = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev < steps.length - 1) {
        return prev + 1;
      }
      setIsPlaying(false);
      return prev;
    });
  }, [steps.length]);

  const stepBackward = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const goToStart = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const goToEnd = useCallback(() => {
    if (steps.length > 0) {
      setCurrentIndex(steps.length - 1);
    }
  }, [steps.length]);

  const seek = useCallback((index: number) => {
    if (steps.length === 0) return;
    const clamped = Math.min(Math.max(0, index), steps.length - 1);
    setCurrentIndex(clamped);
  }, [steps.length]);

  const togglePlay = useCallback(() => {
    if (steps.length === 0) return;
    setIsPlaying((prev) => {
      // If at end, loop back to start on play
      if (!prev && currentIndex >= steps.length - 1) {
        setCurrentIndex(0);
      }
      return !prev;
    });
  }, [currentIndex, steps.length]);

  // Interval timer for auto-play
  useEffect(() => {
    if (!isPlaying) {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
      return;
    }

    const intervalMs = Math.round(750 / playbackSpeed);

    playTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
    };
  }, [isPlaying, playbackSpeed, steps.length]);

  return {
    currentIndex,
    currentStep,
    totalSteps: steps.length,
    isPlaying,
    playbackSpeed,
    canStepForward,
    canStepBackward,
    progressPercent: steps.length > 0 ? ((currentIndex + 1) / steps.length) * 100 : 0,
    stepForward,
    stepBackward,
    goToStart,
    goToEnd,
    seek,
    togglePlay,
    setPlaybackSpeed,
  };
}
