export interface VariableValue {
  type: string;
  value?: any;
  refId?: string;
  preview?: string;
}

export interface HeapObject {
  id: string;
  type: 'list' | 'tuple' | 'dict' | 'set' | 'object';
  items?: VariableValue[];
  entries?: Array<{ key: VariableValue; value: VariableValue }>;
  fields?: Record<string, VariableValue>;
  length?: number;
  size?: number;
  className?: string;
}

export interface PointerMarker {
  name: string;
  index: number;
  targetHeapId: string;
}

export interface StackFrame {
  frameId: string;
  funcName: string;
  line: number;
}

export interface TraceStep {
  stepNumber: number;
  line: number;
  event: 'line' | 'call' | 'return' | 'exception';
  funcName: string;
  callStack: StackFrame[];
  variables: Record<string, VariableValue>;
  heap: Record<string, HeapObject>;
  pointers: PointerMarker[];
  stdout: string;
  returnValue?: VariableValue;
  exception?: string;
}

export interface ExecutionTraceResult {
  success: boolean;
  error?: string | null;
  finalResult?: VariableValue | null;
  steps: TraceStep[];
  totalSteps: number;
  truncated: boolean;
  code: string;
  runtimeMs?: number;
}
