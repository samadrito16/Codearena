import vm from 'node:vm';
import { spawn } from 'node:child_process';
import { config } from '../config.js';
import { getCompilerId } from './languageRegistry.js';

function runProcessWithStdin(
  command: string,
  args: string[],
  stdin: string,
  timeoutMs: number,
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';

    try {
      const child = spawn(command, args, {
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      const timer = setTimeout(() => {
        child.kill('SIGKILL');
        resolve({ stdout, stderr: 'Time Limit Exceeded (5s)', exitCode: 124 });
      }, timeoutMs);

      child.stdout.on('data', (d) => { stdout += d.toString(); });
      child.stderr.on('data', (d) => { stderr += d.toString(); });

      child.on('error', (err) => {
        clearTimeout(timer);
        resolve({ stdout, stderr: err.message, exitCode: 1 });
      });

      child.on('close', (code) => {
        clearTimeout(timer);
        resolve({ stdout, stderr, exitCode: code ?? 0 });
      });

      if (stdin) {
        child.stdin.write(stdin);
      }
      child.stdin.end();
    } catch (err: unknown) {
      resolve({
        stdout: '',
        stderr: err instanceof Error ? err.message : String(err),
        exitCode: 1,
      });
    }
  });
}

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

export function normalizeOutput(str: string | undefined): string {
  if (!str) return '';
  const trimmed = str.replace(/\r\n/g, '\n').trim();
  try {
    const parsed = JSON.parse(trimmed);
    return JSON.stringify(parsed);
  } catch {
    return trimmed;
  }
}

/**
 * Builds execution source code. Wraps bare functions (LeetCode style) in a harness
 * that parses test case inputs, invokes the solution, and serializes the return value.
 */
export function buildExecutionSource(
  language: string,
  userCode: string,
  input: string,
): { code: string; stdin: string } {
  const trimmed = userCode.trim();

  // Python test harness
  if (language === 'python') {
    if (!trimmed.includes('sys.stdin') && !trimmed.includes('input(')) {
      const pythonHarness = `
${trimmed}

import sys, json, inspect, re

def _run_harness():
    raw = sys.stdin.read().strip()
    if not raw:
        return

    parts = re.split(r',\\s*(?=[a-zA-Z_]\\w*\\s*=)', raw)
    is_named = any(re.match(r'^[a-zA-Z_]\\w*\\s*=', p) for p in parts)

    scope = {}
    if is_named:
        for p in parts:
            try:
                exec(p, {}, scope)
            except Exception:
                pass
    else:
        try:
            scope = {'data': json.loads(raw)}
        except Exception:
            scope = {'data': raw}

    fn = None
    if 'Solution' in globals() and isinstance(globals()['Solution'], type):
        try:
            sol = globals()['Solution']()
            methods = [m for m in dir(sol) if not m.startswith('_')]
            if methods:
                fn = getattr(sol, methods[0])
        except Exception:
            pass

    if fn is None:
        candidates = [
            'two_sum', 'is_valid', 'length_of_longest_substring',
            'max_area', 'find_median_sorted_arrays', 'solution', 'solve'
        ]
        for cand in candidates:
            if cand in globals() and callable(globals()[cand]):
                fn = globals()[cand]
                break

    if fn is None:
        for name, val in list(globals().items()):
            if callable(val) and not name.startswith('_') and getattr(val, '__module__', None) == '__main__':
                fn = val
                break

    if fn is None:
        return

    try:
        sig = inspect.signature(fn)
        params = list(sig.parameters.keys())
        if is_named and all(p in scope for p in params):
            args = [scope[p] for p in params]
            res = fn(*args)
        elif len(params) == 1 and 'data' in scope:
            res = fn(scope['data'])
        else:
            res = fn(*list(scope.values()))
    except Exception:
        # Fallback to positional invocation
        res = fn(*list(scope.values()))

    if res is not None:
        if isinstance(res, bool):
            print("true" if res else "false")
        else:
            print(json.dumps(res, separators=(',', ':')))

if __name__ == '__main__':
    try:
        _run_harness()
    except Exception as e:
        import traceback
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)
`;
      return { code: pythonHarness, stdin: input };
    }
  }

  // JavaScript test harness
  if (language === 'javascript' || language === 'typescript') {
    if (!trimmed.includes('process.stdin') && !trimmed.includes('readFileSync(0')) {
      const jsHarness = `
${trimmed}

(function() {
  const fs = require('fs');
  let raw = '';
  try {
    raw = fs.readFileSync(0, 'utf-8').trim();
  } catch (_) {}

  if (!raw) return;

  function parseArgs(inputStr) {
    const parts = inputStr.split(/,\\s*(?=[a-zA-Z_$][\\w$]*\\s*=)/);
    const isNamed = parts.some(p => /^[a-zA-Z_$][\\w$]*\\s*=/.test(p));
    if (isNamed) {
      const obj = {};
      for (const p of parts) {
        const idx = p.indexOf('=');
        if (idx !== -1) {
          const k = p.slice(0, idx).trim();
          const v = p.slice(idx + 1).trim();
          try { obj[k] = JSON.parse(v); } catch { obj[k] = v; }
        }
      }
      return { isNamed: true, value: obj };
    }
    try {
      return { isNamed: false, value: JSON.parse(inputStr) };
    } catch {
      return { isNamed: false, value: inputStr };
    }
  }

  const parsedInfo = parseArgs(raw);

  let fn = null;
  if (typeof Solution === 'function') {
    try {
      const inst = new Solution();
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(inst)).filter(m => m !== 'constructor');
      if (methods.length > 0) fn = inst[methods[0]].bind(inst);
    } catch (_) {}
  }

  if (!fn) {
    const candidates = [
      'twoSum', 'isValid', 'lengthOfLongestSubstring',
      'maxArea', 'findMedianSortedArrays', 'solution', 'solve'
    ];
    for (const name of candidates) {
      try {
        const cand = eval('typeof ' + name + ' === "function" ? ' + name + ' : null');
        if (cand) { fn = cand; break; }
      } catch (_) {}
    }
  }

  if (!fn) return;

  let result;
  if (parsedInfo.isNamed && typeof parsedInfo.value === 'object') {
    const fnStr = fn.toString();
    const paramMatch = fnStr.match(/\\(([^)]*)\\)/);
    if (paramMatch && paramMatch[1].trim()) {
      const paramNames = paramMatch[1].split(',').map(s => s.trim().split(/[\\s:=]/)[0]);
      const args = paramNames.map(p => parsedInfo.value[p]);
      result = fn(...args);
    } else {
      result = fn(...Object.values(parsedInfo.value));
    }
  } else if (Array.isArray(parsedInfo.value)) {
    result = fn(parsedInfo.value);
  } else {
    result = fn(parsedInfo.value);
  }

  if (result !== undefined) {
    console.log(JSON.stringify(result));
  }
})();
`;
      return { code: jsHarness, stdin: input };
    }
  }

  return { code: userCode, stdin: input };
}

/**
 * Executes code using OnlineCompiler.io API, with an offline sandbox fallback
 * for local development and testing.
 */
async function executeOnlineCompiler(
  compilerId: string,
  code: string,
  input: string,
): Promise<{ stdout: string; stderr: string; runtimeMs: number; memoryMb: number; exitCode: number }> {
  const url = config.onlineCompilerApiUrl || 'https://api.onlinecompiler.io/api/run-code-sync/';
  const apiKey = config.onlineCompilerApiKey;

  // If API key is provided, execute against live OnlineCompiler.io endpoint
  if (apiKey) {
    try {
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

      if (response.ok) {
        const data = (await response.json()) as OnlineCompilerResponse;
        const runtimeMs = data.time ? Math.round(data.time * 1000) : 12;
        const memoryMb = data.memory ? Math.round((data.memory / (1024 * 1024)) * 10) / 10 : 15.2;

        return {
          stdout: (data.output || '').replace(/\r\n/g, '\n').trim(),
          stderr: (data.error || '').replace(/\r\n/g, '\n').trim(),
          runtimeMs,
          memoryMb,
          exitCode: data.exit_code ?? 0,
        };
      }
    } catch {
      // Fall through to local fallback if remote service encounters network failure
    }
  }

  // Offline / Developer Sandbox Fallback
  // JavaScript execution via Node.js vm sandbox
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
          throw new Error(`Module ${mod} is not supported in sandbox`);
        },
      };
      const ctx = vm.createContext(sandbox);
      vm.runInContext(code, ctx, { timeout: 3000 });
      return {
        stdout: capturedOut.replace(/\r\n/g, '\n').trim(),
        stderr: capturedErr.replace(/\r\n/g, '\n').trim(),
        runtimeMs: Math.max(1, Date.now() - start),
        memoryMb: 14.2,
        exitCode: 0,
      };
    } catch (err: unknown) {
      return {
        stdout: capturedOut.replace(/\r\n/g, '\n').trim(),
        stderr: err instanceof Error ? err.stack || err.message : String(err),
        runtimeMs: Math.max(1, Date.now() - start),
        memoryMb: 14.2,
        exitCode: 1,
      };
    }
  }

  // Python execution via local Python executable (py / python)
  if (compilerId === 'python-3.14' || compilerId === 'python') {
    const start = Date.now();
    const pythonCmd = process.platform === 'win32' ? 'py' : 'python3';
    const result = await runProcessWithStdin(pythonCmd, ['-c', code], input, 5000);

    return {
      stdout: result.stdout.replace(/\r\n/g, '\n').trim(),
      stderr: result.stderr.replace(/\r\n/g, '\n').trim(),
      runtimeMs: Math.max(1, Date.now() - start),
      memoryMb: 16.5,
      exitCode: result.exitCode,
    };
  }

  // For Java and C++ when API key is not yet set
  throw new Error(
    `OnlineCompiler API key required to execute ${compilerId}. Add ONLINECOMPILER_API_KEY to backend/.env (Get free API key at https://onlinecompiler.io/). JavaScript and Python can run via the local sandbox.`,
  );
}

/**
 * Runs a set of test cases against the specified language and user code.
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
  } else if (hasRuntimeError && totalPassed === 0) {
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
