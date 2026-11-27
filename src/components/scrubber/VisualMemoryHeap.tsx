import React from 'react';
import { Layers, Database, ArrowDown, Hash, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { TraceStep, VariableValue, HeapObject } from '../../types/scrubber';

interface VisualMemoryHeapProps {
  currentStep: TraceStep | null;
}

const POINTER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  i: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/50' },
  j: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50' },
  left: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/50' },
  right: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/50' },
  low: { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/50' },
  high: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/50' },
  mid: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/50' },
  slow: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
  fast: { bg: 'bg-fuchsia-500/20', text: 'text-fuchsia-400', border: 'border-fuchsia-500/50' },
};

function getPointerStyle(name: string) {
  const lower = name.toLowerCase();
  return (
    POINTER_COLORS[lower] || {
      bg: 'bg-neutral-500/20',
      text: 'text-neutral-300',
      border: 'border-neutral-500/40',
    }
  );
}

function renderValueString(val: VariableValue | undefined): string {
  if (!val) return 'None';
  if (val.type === 'ref') return val.preview || 'Ref';
  if (val.type === 'str') return `"${val.value}"`;
  if (val.type === 'None') return 'None';
  return String(val.value);
}

export const VisualMemoryHeap: React.FC<VisualMemoryHeapProps> = ({ currentStep }) => {
  if (!currentStep) {
    return (
      <div className="p-4 text-center text-xs text-muted">
        No state available for the current execution step.
      </div>
    );
  }

  const { variables, heap, pointers, returnValue, exception } = currentStep;

  // Separate primitives from references
  const primitiveVars = Object.entries(variables).filter(
    ([_, val]) => val.type !== 'ref'
  );

  const heapObjects = Object.values(heap || {});

  // Group pointers by heap object and index
  const pointersByHeapIndex: Record<string, Record<number, string[]>> = {};
  for (const ptr of pointers || []) {
    if (!pointersByHeapIndex[ptr.targetHeapId]) {
      pointersByHeapIndex[ptr.targetHeapId] = {};
    }
    if (!pointersByHeapIndex[ptr.targetHeapId][ptr.index]) {
      pointersByHeapIndex[ptr.targetHeapId][ptr.index] = [];
    }
    pointersByHeapIndex[ptr.targetHeapId][ptr.index].push(ptr.name);
  }

  return (
    <div className="space-y-4 text-xs">
      {/* Return Value Callout */}
      {returnValue && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-emerald-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0" />
            <span className="font-semibold text-emerald-300">Return Value:</span>
          </div>
          <code className="font-mono text-sm px-2.5 py-1 rounded-sm bg-black/40 border border-emerald-500/20 text-emerald-300">
            {renderValueString(returnValue)}
          </code>
        </div>
      )}

      {/* Exception Banner */}
      {exception && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-rose-400">
          <AlertTriangle size={16} className="shrink-0" />
          <div className="font-mono text-xs">
            <strong className="text-rose-300">Runtime Exception:</strong> {exception}
          </div>
        </div>
      )}

      {/* Array / Heap Visualizer */}
      {heapObjects.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
            <Database size={13} className="text-indigo-400" />
            <span>Heap Objects & Data Structures ({heapObjects.length})</span>
          </div>

          <div className="space-y-3">
            {heapObjects.map((obj) => {
              // Find local variable name that references this heap object
              const refVarNames = Object.entries(variables)
                .filter(([_, v]) => v.refId === obj.id)
                .map(([name]) => name);
              const label = refVarNames.length > 0 ? refVarNames.join(', ') : obj.id;

              if (obj.type === 'list' || obj.type === 'tuple') {
                const items = obj.items || [];
                const objPointers = pointersByHeapIndex[obj.id] || {};

                return (
                  <div
                    key={obj.id}
                    className="p-3 rounded-xl border space-y-2.5"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--ca-surface) 92%, black 8%)',
                      borderColor: 'var(--ca-border)',
                    }}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-primary">{label}</span>
                        <span className="text-muted text-[10px] font-mono">
                          [{obj.type}, len={obj.length}]
                        </span>
                      </div>
                    </div>

                    {/* Array Cells Strip */}
                    <div className="overflow-x-auto pb-1 pt-4">
                      <div className="flex items-end gap-1.5 min-w-max">
                        {items.map((item, idx) => {
                          const activePtrs = objPointers[idx] || [];

                          return (
                            <div key={idx} className="flex flex-col items-center">
                              {/* Pointer Flag Flags */}
                              <div className="h-6 flex items-center justify-center gap-1 mb-1">
                                {activePtrs.map((ptrName) => {
                                  const style = getPointerStyle(ptrName);
                                  return (
                                    <span
                                      key={ptrName}
                                      className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-sm text-[10px] font-mono font-bold border uppercase shadow-xs ${style.bg} ${style.text} ${style.border}`}
                                    >
                                      {ptrName}
                                      <ArrowDown size={9} />
                                    </span>
                                  );
                                })}
                              </div>

                              {/* Array Cell */}
                              <div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono text-sm font-bold border transition ${
                                  activePtrs.length > 0
                                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-xs shadow-indigo-500/20'
                                    : 'border-neutral-700 bg-neutral-900/60 text-primary'
                                }`}
                              >
                                {renderValueString(item)}
                              </div>

                              {/* Index Marker */}
                              <span className="text-[10px] font-mono text-muted mt-1">
                                {idx}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              if (obj.type === 'dict') {
                const entries = obj.entries || [];
                return (
                  <div
                    key={obj.id}
                    className="p-3 rounded-xl border space-y-2"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--ca-surface) 92%, black 8%)',
                      borderColor: 'var(--ca-border)',
                    }}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-primary">{label}</span>
                        <span className="text-muted text-[10px] font-mono">
                          {'{dict}'} ({entries.length} keys)
                        </span>
                      </div>
                    </div>

                    {entries.length === 0 ? (
                      <div className="text-[11px] text-muted italic font-mono p-2">
                        {'{ }'} (empty dictionary)
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                        {entries.map((entry, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-lg border flex items-center justify-between gap-2 font-mono text-xs"
                            style={{
                              backgroundColor: 'var(--ca-surface)',
                              borderColor: 'var(--ca-border)',
                            }}
                          >
                            <span className="text-indigo-400 font-semibold truncate">
                              {renderValueString(entry.key)}:
                            </span>
                            <span className="text-emerald-400 font-bold truncate">
                              {renderValueString(entry.value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      )}

      {/* Scalar Primitive Variables */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
          <Layers size={13} className="text-indigo-400" />
          <span>Local Variables ({primitiveVars.length})</span>
        </div>

        {primitiveVars.length === 0 ? (
          <div className="text-[11px] text-muted italic font-mono p-2">
            No scalar variables in current frame.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {primitiveVars.map(([varName, val]) => (
              <div
                key={varName}
                className="p-2.5 rounded-xl border flex flex-col gap-0.5 font-mono shadow-xs"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--ca-surface) 92%, black 8%)',
                  borderColor: 'var(--ca-border)',
                }}
              >
                <span className="text-[10px] text-muted uppercase font-semibold">
                  {varName} ({val.type})
                </span>
                <span className="text-sm font-bold text-primary truncate">
                  {renderValueString(val)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
