export const SENTINEL_START = '__CODEARENA_RESULT_START__';
export const SENTINEL_END = '__CODEARENA_RESULT_END__';

export interface TestCaseInput {
  caseNumber: number;
  input: string;
  expected: string;
  isHidden?: boolean;
}

export interface TestCaseEvaluation {
  caseNumber: number;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  runtimeMs?: number;
  stdout?: string;
  stderr?: string;
}

export type ExecutionVerdict =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Time Limit Exceeded'
  | 'Runtime Error'
  | 'Compilation Error';

export interface BatchExecutionResult {
  success: boolean;
  verdict: ExecutionVerdict;
  runtimeMs: number;
  memoryMb: number;
  totalPassed: number;
  totalTests: number;
  cases: TestCaseEvaluation[];
  stdout?: string;
  stderr?: string;
  failingCaseNumber?: number;
}

export interface EngineRunResult {
  stdout: string;
  stderr: string;
  runtimeMs: number;
  memoryMb: number;
  exitCode: number;
}
