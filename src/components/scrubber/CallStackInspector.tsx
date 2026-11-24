import React from 'react';
import { GitCommit, ArrowRight, CornerDownRight } from 'lucide-react';
import type { StackFrame } from '../../types/scrubber';

interface CallStackInspectorProps {
  callStack: StackFrame[];
  currentLine: number;
}

export const CallStackInspector: React.FC<CallStackInspectorProps> = ({
  callStack,
  currentLine,
}) => {
  if (!callStack || callStack.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
          <GitCommit size={13} className="text-indigo-400" />
          <span>Call Stack (Depth: {callStack.length})</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 font-mono">
        {callStack.map((frame, idx) => {
          const isTopFrame = idx === callStack.length - 1;
          const lineToShow = isTopFrame ? currentLine : frame.line;

          return (
            <div
              key={`${frame.frameId}_${idx}`}
              className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition shadow-sm ${
                isTopFrame
                  ? 'bg-indigo-500/15 border-indigo-500/40 text-primary'
                  : 'text-muted border-neutral-800'
              }`}
              style={{
                backgroundColor: isTopFrame
                  ? 'color-mix(in srgb, #6366f1 15%, var(--ca-surface) 85%)'
                  : 'color-mix(in srgb, var(--ca-surface) 95%, black 5%)',
              }}
            >
              <div className="flex items-center gap-2">
                {isTopFrame ? (
                  <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                ) : (
                  <CornerDownRight size={13} className="text-muted ml-1" />
                )}
                <span className="font-bold">
                  {frame.funcName}()
                </span>
                {isTopFrame && (
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                    Active Frame
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-[11px]">
                <span className="text-muted">line:</span>
                <span className="font-bold text-primary">{lineToShow}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
