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
  submission?: {
    id: string;
    outcome: string;
    runtimeMs: number;
    memoryMb: number;
  };
}

export async function runCode(options: {
  problemId: string;
  code: string;
  language: string;
  customInput?: string;
  cases?: { caseNumber?: number; input: string; expected?: string }[];
}): Promise<ExecutionResponse> {
  const response = await fetch('/api/submissions/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody.error?.message || `Execution request failed with status ${response.status}`);
  }

  return response.json();
}

export async function submitCode(options: {
  problemId: string;
  code: string;
  language: string;
  durationSeconds?: number;
}): Promise<ExecutionResponse> {
  const response = await fetch('/api/submissions/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody.error?.message || `Submission request failed with status ${response.status}`);
  }

  return response.json();
}

