import vm from 'node:vm';
import { config } from '../config.js';
import { getCompilerId } from './languageRegistry.js';

export interface TestCaseInput {
  caseNumber: number;
  input: string;
  expected: string;
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

export interface BatchExecutionResult {
  success: boolean;
  verdict: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error';
  runtimeMs: number;
  memoryMb: number;
  totalPassed: number;
  totalTests: number;
  cases: TestCaseEvaluation[];
  stderr?: string;
}

interface OnlineCompilerResponse {
  output?: string;
  error?: string;
  status?: string;
  exit_code?: number;
  time?: number;
  memory?: number;
  signal?: string;
}

function normalizeOutput(str: string | undefined): string {
  if (!str) return '';
  return str.replace(/\r\n/g, '\n').trim();
}

/**
 * Builds execution source code. If user's code is a bare function (e.g. LeetCode style),
 * we append a small test driver for Python or JavaScript to invoke it with the input and output JSON.
 */
function buildExecutionSource(language: string, userCode: string, input: string): { code: string; stdin: string } {
  const trimmed = userCode.trim();

  // If user wrote Python solution
  if (language === 'python') {
    if (trimmed.includes('def two_sum(') && !trimmed.includes('sys.stdin')) {
      const harness = `
import sys, json

${trimmed}

try:
    raw = sys.stdin.read().strip()
    if raw:
        # Check if input has nums = [...], target = ...
        import re
        nums_m = re.search(r'nums\\s*=\\s*(\\[[^\\]]+\\])', raw)
        target_m = re.search(r'target\\s*=\\s*(-?\\d+)', raw)
        if nums_m and target_m:
            nums = json.loads(nums_m.group(1))
            target = int(target_m.group(1))
            res = two_sum(nums, target)
            print(json.dumps(res))
        else:
            print(raw)
except Exception as e:
    import traceback
    traceback.print_exc()
`;
      return { code: harness, stdin: input };
    }
  }

  // If user wrote JavaScript solution
  if (language === 'javascript' || language === 'typescript') {
    if (trimmed.includes('function twoSum(') && !trimmed.includes('process.stdin')) {
      const harness = `
${trimmed}

const fs = require('fs');
try {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const numsMatch = raw.match(/nums\\s*=\\s*(\\[[^\\]]+\\])/);
    const targetMatch = raw.match(/target\\s*=\\s*(-?\\d+)/);
    if (numsMatch && targetMatch) {
      const nums = JSON.parse(numsMatch[1]);
      const target = Number(targetMatch[1]);
      const res = twoSum(nums, target);
      console.log(JSON.stringify(res));
    } else {
      console.log(raw);
    }
  }
} catch (err) {
  console.error(err);
}
`;
      return { code: harness, stdin: input };
    }
  }

  return { code: userCode, stdin: input };
}

/**
 * Executes code using OnlineCompiler.io API.
 */
async function executeOnlineCompiler(
  compilerId: string,
  code: string,
  input: string,
): Promise<{ stdout: string; stderr: string; runtimeMs: number; memoryMb: number; exitCode: number }> {
  const url = config.onlineCompilerApiUrl || 'https://api.onlinecompiler.io/api/run-code-sync/';
  const apiKey = config.onlineCompilerApiKey;

  if (!apiKey) {
    // Zero-config offline developer sandbox fallback for JavaScript
    if (compilerId === 'nodejs-24' || compilerId === 'javascript') {
      const start = Date.now();
      let capturedOut = '';
      let capturedErr = '';

      try {
        const sandbox = {
          console: {
            log: (...args: unknown[]) => { capturedOut += args.map(String).join(' ') + '\n'; },
            error: (...args: unknown[]) => { capturedErr += args.map(String).join(' ') + '\n'; },
            warn: (...args: unknown[]) => { capturedOut += args.map(String).join(' ') + '\n'; },
          },
          require: (mod: string) => {
            if (mod === 'fs') {
              return {
                readFileSync: () => input,
              };
            }
            throw new Error(`Module ${mod} is not supported in offline sandbox`);
          },
        };
        const ctx = vm.createContext(sandbox);
        vm.runInContext(code, ctx, { timeout: 3000 });
        return {
          stdout: capturedOut.trim(),
          stderr: capturedErr.trim(),
          runtimeMs: Math.max(1, Date.now() - start),
          memoryMb: 14.5,
          exitCode: 0,
        };
      } catch (err: unknown) {
        return {
          stdout: capturedOut.trim(),
          stderr: err instanceof Error ? err.stack || err.message : String(err),
          runtimeMs: Math.max(1, Date.now() - start),
          memoryMb: 14.5,
          exitCode: 1,
        };
      }
    }

    throw new Error(
      'OnlineCompiler API key not configured. Add ONLINECOMPILER_API_KEY to backend/.env (Get free tier at https://onlinecompiler.io/)',
    );
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      compiler: compilerId,
      code,
      input,
      time_limit: 5,
      memory_limit: 256,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`OnlineCompiler API error (${response.status}): ${errorText || response.statusText}`);
  }

  const data = (await response.json()) as OnlineCompilerResponse;
  const runtimeMs = data.time ? Math.round(data.time * 1000) : 10;
  const memoryMb = data.memory ? Math.round((data.memory / (1024 * 1024)) * 10) / 10 : 15.2;

  return {
    stdout: normalizeOutput(data.output),
    stderr: normalizeOutput(data.error),
    runtimeMs,
    memoryMb,
    exitCode: data.exit_code ?? 0,
  };
}

/**
 * Runs a set of testcases against the specified language and user code.
 */
export async function runTestCases(
  languageId: string,
  userCode: string,
  testCases: TestCaseInput[],
): Promise<BatchExecutionResult> {
  const compilerId = getCompilerId(languageId);
  const evaluations: TestCaseEvaluation[] = [];

  let maxRuntime = 0;
  let maxMemory = 0;
  let overallStderr = '';
  let hasTle = false;
  let hasRuntimeError = false;

  for (const tc of testCases) {
    const { code, stdin } = buildExecutionSource(languageId, userCode, tc.input);

    try {
      const res = await executeOnlineCompiler(compilerId, code, stdin);
      maxRuntime = Math.max(maxRuntime, res.runtimeMs);
      maxMemory = Math.max(maxMemory, res.memoryMb);

      if (res.exitCode === 124) {
        hasTle = true;
      } else if (res.exitCode !== 0) {
        hasRuntimeError = true;
      }

      if (res.stderr) {
        overallStderr = res.stderr;
      }

      const normExpected = normalizeOutput(tc.expected);
      const normActual = normalizeOutput(res.stdout);
      const passed = normExpected.length > 0 ? normExpected === normActual : res.exitCode === 0;

      evaluations.push({
        caseNumber: tc.caseNumber,
        input: tc.input,
        expected: tc.expected,
        actual: res.stdout,
        passed,
        runtimeMs: res.runtimeMs,
        stdout: res.stdout,
        stderr: res.stderr,
      });
    } catch (err: unknown) {
      hasRuntimeError = true;
      const errMsg = err instanceof Error ? err.message : String(err);
      overallStderr = errMsg;

      evaluations.push({
        caseNumber: tc.caseNumber,
        input: tc.input,
        expected: tc.expected,
        actual: '',
        passed: false,
        runtimeMs: 0,
        stderr: errMsg,
      });
      break;
    }
  }

  const totalPassed = evaluations.filter((e) => e.passed).length;
  const totalTests = evaluations.length;

  let verdict: BatchExecutionResult['verdict'] = 'Accepted';
  if (hasTle) {
    verdict = 'Time Limit Exceeded';
  } else if (hasRuntimeError) {
    verdict = 'Runtime Error';
  } else if (totalPassed < totalTests) {
    verdict = 'Wrong Answer';
  }

  return {
    success: verdict === 'Accepted',
    verdict,
    runtimeMs: maxRuntime || 12,
    memoryMb: maxMemory || 14.8,
    totalPassed,
    totalTests,
    cases: evaluations,
    stderr: overallStderr || undefined,
  };
}
