export const SENTINEL_START = '__CODEARENA_RESULT_START__';
export const SENTINEL_END = '__CODEARENA_RESULT_END__';
export const SENTINEL_CASE_START = '__CODEARENA_CASE_START__';
export const SENTINEL_CASE_END = '__CODEARENA_CASE_END__';
export const SENTINEL_ERROR_START = '__CODEARENA_ERROR_START__';
export const SENTINEL_ERROR_END = '__CODEARENA_ERROR_END__';
export const SENTINEL_CASE_DELIMITER = '<<<__CODEARENA_CASE__>>>';

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
  notRun?: boolean;
}

export interface BatchCaseOutput {
  caseNumber: number;
  userStdout?: string;
  resultValue?: string;
  error?: string;
}

export interface ExecutionQuotaInfo {
  limit: number;
  remaining: number;
  resetAt: string;
}

export type ExecutionVerdict =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Time Limit Exceeded'
  | 'Runtime Error'
  | 'Compilation Error';

export interface BatchExecutionResult {
  executionUnavailable?: boolean;
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
  quota?: ExecutionQuotaInfo;
}

export interface EngineRunResult {
  stdout: string;
  stderr: string;
  runtimeMs: number;
  memoryMb: number;
  exitCode: number;
}
