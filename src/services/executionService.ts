import { apiRequest } from '../lib/api';

export interface TestCaseResult {
  caseNumber: number;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  runtimeMs?: number;
  stdout?: string;
  stderr?: string;
}

export interface ExecutionResponse {
  gradeReceipt?: string;
  success: boolean;
  verdict: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error';
  runtimeMs: number;
  memoryMb: number;
  totalPassed: number;
  totalTests: number;
  cases: TestCaseResult[];
  stdout?: string;
  stderr?: string;
  rankingPercentile?: number;
  quota?: {
    limit: number;
    remaining: number;
    resetAt: string;
  };
  submission?: {
    id: string;
    outcome: string;
    runtimeMs: number;
    memoryMb: number;
  };
}

export async function runCode(options: {
  problemId: string;
  roundId?: string;
  contestId?: string;
  code: string;
  language: string;
  customInput?: string;
  cases?: { caseNumber?: number; input: string; expected?: string }[];
}): Promise<ExecutionResponse> {
  return apiRequest<ExecutionResponse>('/submissions/run', {
    method: 'POST',
    body: JSON.stringify(options),
  });
}

export async function submitCode(options: {
  problemId: string;
  roundId?: string;
  contestId?: string;
  code: string;
  language: string;
  durationSeconds?: number;
  dailyDate?: string;
}): Promise<ExecutionResponse> {
  return apiRequest<ExecutionResponse>('/submissions/submit', {
    method: 'POST',
    body: JSON.stringify(options),
  });
}

export interface QuotaResponse {
  limit: number;
  remaining: number;
  count: number;
  resetAt: string;
  tier: string;
}

export async function getExecutionQuota(): Promise<QuotaResponse> {
  return apiRequest<QuotaResponse>('/submissions/quota');
}
