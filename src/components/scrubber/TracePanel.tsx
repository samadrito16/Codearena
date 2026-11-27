import React, { useState } from 'react';
import { Play, Loader2, Sparkles, Terminal, Info, RefreshCw } from 'lucide-react';
import { VisualScrubber } from './VisualScrubber';
import { VisualMemoryHeap } from './VisualMemoryHeap';
import { CallStackInspector } from './CallStackInspector';
import { useVisualScrubber, type PlaybackSpeed } from '../../hooks/useVisualScrubber';
import type { ExecutionTraceResult, TraceStep } from '../../types/scrubber';

interface TracePanelProps {
  traceResult: ExecutionTraceResult | null;
  isLoading: boolean;
  onRunTrace: (customInput?: string) => void;
  defaultInput?: string;
  onActiveLineChange?: (line: number | null) => void;
}

export const TracePanel: React.FC<TracePanelProps> = ({
  traceResult,
  isLoading,
  onRunTrace,
  defaultInput = '',
  onActiveLineChange,
}) => {
  const [customInput, setCustomInput] = useState<string>(defaultInput);
  const [showInputConfig, setShowInputConfig] = useState<boolean>(false);

  const steps = traceResult?.steps || [];

  const handleStepChange = (step: TraceStep | null) => {
    if (step && typeof step.line === 'number') {
      onActiveLineChange?.(step.line);
    } else {
      onActiveLineChange?.(null);
    }
  };

  const scrubber = useVisualScrubber({
    steps,
    onStepChange: handleStepChange,
  });

  return (
    <div className="space-y-4">
      {/* Header Bar with Action & Input Toggle */}
      <div
        className="p-3 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
        style={{
          backgroundColor: 'var(--ca-surface)',
          borderColor: 'var(--ca-border)',
        }}
      >
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
              <Sparkles size={14} className="text-indigo-400" />
              Python Tutor Visual Scrubber
            </h3>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              Deterministic 0-AI
            </span>
          </div>
          <p className="text-xs text-muted">
            Step through code line-by-line with exact pointer positions, heap arrays, and call stacks.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowInputConfig((prev) => !prev)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border text-muted hover:text-primary transition"
            style={{ borderColor: 'var(--ca-border)' }}
          >
            {showInputConfig ? 'Hide Input' : 'Edit Input'}
          </button>
          <button
            type="button"
            onClick={() => onRunTrace(customInput)}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white text-black hover:bg-neutral-200 transition shadow-xs disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Tracing...
              </>
            ) : (
              <>
                <Play size={13} fill="currentColor" />
                Trace Execution
              </>
            )}
          </button>
        </div>
      </div>

      {/* Input Configuration Box */}
      {showInputConfig && (
        <div
          className="p-3 rounded-xl border space-y-2 text-xs"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--ca-surface) 92%, black 8%)',
            borderColor: 'var(--ca-border)',
          }}
        >
          <div className="flex items-center justify-between text-muted">
            <span className="font-semibold text-primary">Test Case Input (Parameters / JSON / Named):</span>
            <button
              type="button"
              onClick={() => setCustomInput(defaultInput)}
              className="inline-flex items-center gap-1 text-[11px] hover:text-primary"
            >
              <RefreshCw size={11} /> Reset to example
            </button>
          </div>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="e.g. nums = [2, 7, 11, 15], target = 9"
            className="w-full px-3 py-2 rounded-lg font-mono text-xs border bg-black/40 text-primary focus:outline-hidden focus:border-indigo-500"
            style={{ borderColor: 'var(--ca-border)' }}
          />
        </div>
      )}

      {/* Error Banner if Trace Failed */}
      {traceResult && !traceResult.success && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Info size={14} /> Trace Execution Encountered an Issue
          </div>
          <div className="font-mono text-[11px] whitespace-pre-wrap">{traceResult.error}</div>
        </div>
      )}

      {/* Scrubber Controls */}
      {steps.length > 0 && (
        <VisualScrubber
          currentIndex={scrubber.currentIndex}
          totalSteps={scrubber.totalSteps}
          currentStep={scrubber.currentStep}
          isPlaying={scrubber.isPlaying}
          playbackSpeed={scrubber.playbackSpeed}
          canStepForward={scrubber.canStepForward}
          canStepBackward={scrubber.canStepBackward}
          onStepForward={scrubber.stepForward}
          onStepBackward={scrubber.stepBackward}
          onGoToStart={scrubber.goToStart}
          onGoToEnd={scrubber.goToEnd}
          onSeek={scrubber.seek}
          onTogglePlay={scrubber.togglePlay}
          onSetPlaybackSpeed={scrubber.setPlaybackSpeed}
        />
      )}

      {/* Main Inspection Grid (Memory Heap + Call Stack) */}
      {scrubber.currentStep && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <VisualMemoryHeap currentStep={scrubber.currentStep} />
          </div>

          <div className="space-y-4">
            <CallStackInspector
              callStack={scrubber.currentStep.callStack}
              currentLine={scrubber.currentStep.line}
            />

            {/* Standard Output Console */}
            {scrubber.currentStep.stdout && (
              <div
                className="p-3 rounded-xl border space-y-1.5"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--ca-surface) 92%, black 8%)',
                  borderColor: 'var(--ca-border)',
                }}
              >
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
                  <Terminal size={12} className="text-indigo-400" />
                  <span>Program Output (stdout)</span>
                </div>
                <pre className="p-2 rounded-sm bg-black/60 font-mono text-[11px] text-emerald-400 whitespace-pre-wrap overflow-x-auto max-h-32">
                  {scrubber.currentStep.stdout}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State before Running */}
      {!traceResult && !isLoading && (
        <div
          className="p-8 rounded-2xl border text-center space-y-3"
          style={{
            backgroundColor: 'var(--ca-surface)',
            borderColor: 'var(--ca-border)',
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <Sparkles size={20} />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h4 className="text-sm font-bold text-primary">Interactive Line-by-Line Scrubber</h4>
            <p className="text-xs text-muted leading-relaxed">
              Click <strong>Trace Execution</strong> above to record step-by-step memory snapshots. Watch variables mutate, pointers glide over arrays, and recursive frames unpack in real time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
