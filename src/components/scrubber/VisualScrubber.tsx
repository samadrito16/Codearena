import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Terminal,
} from 'lucide-react';
import type { PlaybackSpeed } from '../../hooks/useVisualScrubber';
import type { TraceStep } from '../../types/scrubber';

interface VisualScrubberProps {
  currentIndex: number;
  totalSteps: number;
  currentStep: TraceStep | null;
  isPlaying: boolean;
  playbackSpeed: PlaybackSpeed;
  canStepForward: boolean;
  canStepBackward: boolean;
  onStepForward: () => void;
  onStepBackward: () => void;
  onGoToStart: () => void;
  onGoToEnd: () => void;
  onSeek: (index: number) => void;
  onTogglePlay: () => void;
  onSetPlaybackSpeed: (speed: PlaybackSpeed) => void;
}

export const VisualScrubber: React.FC<VisualScrubberProps> = ({
  currentIndex,
  totalSteps,
  currentStep,
  isPlaying,
  playbackSpeed,
  canStepForward,
  canStepBackward,
  onStepForward,
  onStepBackward,
  onGoToStart,
  onGoToEnd,
  onSeek,
  onTogglePlay,
  onSetPlaybackSpeed,
}) => {
  if (totalSteps === 0) {
    return (
      <div className="p-3 text-center text-xs text-muted border-t" style={{ borderColor: 'var(--ca-border)' }}>
        No execution trace loaded. Click <strong>Step-Through</strong> to record execution frames.
      </div>
    );
  }

  const eventBadgeColor = () => {
    switch (currentStep?.event) {
      case 'call':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'return':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'exception':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'line':
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    }
  };

  return (
    <div
      className="p-3 sm:p-4 rounded-xl border space-y-3"
      style={{
        backgroundColor: 'var(--ca-surface)',
        borderColor: 'var(--ca-border)',
      }}
    >
      {/* Top Row: Step Info & Event Badge & Speed Selector */}
      <div className="flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-primary">
            Step {currentIndex + 1} of {totalSteps}
          </span>
          {currentStep && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${eventBadgeColor()}`}
            >
              {currentStep.event === 'line' ? `Line ${currentStep.line}` : currentStep.event}
            </span>
          )}
          {currentStep?.funcName && (
            <span className="text-muted text-[11px] font-mono hidden sm:inline">
              in <span className="text-primary font-semibold">{currentStep.funcName}()</span>
            </span>
          )}
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1">
          <Gauge size={12} className="text-muted mr-1 hidden sm:inline" />
          {([0.5, 1, 2] as PlaybackSpeed[]).map((spd) => (
            <button
              key={spd}
              type="button"
              onClick={() => onSetPlaybackSpeed(spd)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition ${
                playbackSpeed === spd
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-muted hover:text-primary hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Middle Row: Scrubber Timeline Slider */}
      <div className="space-y-1">
        <div className="relative flex items-center">
          <input
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={currentIndex}
            onChange={(e) => onSeek(parseInt(e.target.value, 10))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-neutral-800 accent-indigo-500 focus:outline-none"
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-muted px-0.5">
          <span>Start (Line 1)</span>
          <span className="text-neutral-500 hidden sm:inline">← / → to step · Space to play</span>
          <span>End (Step {totalSteps})</span>
        </div>
      </div>

      {/* Bottom Row: Control Buttons */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t" style={{ borderColor: 'var(--ca-border)' }}>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onGoToStart}
            disabled={!canStepBackward}
            className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition"
            title="First step"
          >
            <SkipBack size={15} />
          </button>
          <button
            type="button"
            onClick={onStepBackward}
            disabled={!canStepBackward}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition border"
            style={{ borderColor: 'var(--ca-border)' }}
            title="Step backward (←)"
          >
            <ChevronLeft size={14} />
            <span className="hidden sm:inline">Prev</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onTogglePlay}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold text-white transition shadow-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          title={isPlaying ? 'Pause auto-play (Space)' : 'Play continuous execution (Space)'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onStepForward}
            disabled={!canStepForward}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition border"
            style={{ borderColor: 'var(--ca-border)' }}
            title="Step forward (→)"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={14} />
          </button>
          <button
            type="button"
            onClick={onGoToEnd}
            disabled={!canStepForward}
            className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition"
            title="Last step"
          >
            <SkipForward size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
