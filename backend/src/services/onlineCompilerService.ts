import { getCompilerId } from './languageRegistry.js';
import {
  buildExecutionSource,
  buildBatchExecutionSource,
} from './execution/harnessBuilder.js';
import {
  extractSentinelOutput,
  parseBatchCasesOutput,
  compareOutputs,
  cleanErrorMessage,
  normalizeOutput,
} from './execution/outputNormalizer.js';
import { executeCode } from './execution/engine.js';
import type {
  TestCaseInput,
  TestCaseEvaluation,
  BatchExecutionResult,
  ExecutionVerdict,
} from './execution/types.js';

export { normalizeOutput, buildExecutionSource, buildBatchExecutionSource };
export type { TestCaseInput, TestCaseEvaluation, BatchExecutionResult };

export interface RunOptions {
  earlyExit?: boolean;
  orderInvariant?: boolean;
  functionNameHint?: string;
}

/**
 * Runs test cases against the specified language and user code in a SINGLE container invocation.
 * All test cases are packaged into one batch execution payload, eliminating multiple remote API calls.
 */
export async function runTestCases(
  languageId: string,
  userCode: string,
  testCases: TestCaseInput[],
  options: RunOptions = {},
): Promise<BatchExecutionResult> {
  if (!testCases || testCases.length === 0) {
    return {
      success: false,
      verdict: 'Runtime Error',
      runtimeMs: 0,
      memoryMb: 0,
      totalPassed: 0,
      totalTests: 0,
      cases: [],
    };
  }

  const compilerId = getCompilerId(languageId);
  const { code, stdin } = buildBatchExecutionSource(
    languageId,
    userCode,
    testCases,
    {
      earlyExit: options.earlyExit,
      orderInvariant: options.orderInvariant,
      functionNameHint: options.functionNameHint,
    },
  );

  let maxRuntime = 0;
  let maxMemory = 0;
  let overallStderr = '';
  let overallStdout = '';
  let finalVerdict: ExecutionVerdict = 'Accepted';
  let hasFailed = false;
  let executionUnavailable = false;
  let failingCaseNumber: number | undefined = undefined;

  const evaluations: TestCaseEvaluation[] = [];

  try {
    // Single isolated container execution for all test cases
    const res = await executeCode(languageId, compilerId, code, stdin);
    maxRuntime = res.runtimeMs;
    maxMemory = res.memoryMb;

    const isTle = res.exitCode === 124;
    if (res.exitCode !== 0) {
      hasFailed = true;
      finalVerdict = isTle ? 'Time Limit Exceeded' : 'Runtime Error';
    }
    const cleanedErr = cleanErrorMessage(res.stderr);
    if (cleanedErr) {
      overallStderr = cleanedErr;
    }

    // Parse batch outputs for each case
    let parsedCases = parseBatchCasesOutput(res.stdout);

    // Fallback for single-case or legacy output without batch case wrappers
    if (parsedCases.size === 0 && res.stdout) {
      const single = extractSentinelOutput(res.stdout);
      if (single.resultValue || single.userStdout) {
        parsedCases = new Map([
          [
            testCases[0].caseNumber,
            {
              caseNumber: testCases[0].caseNumber,
              userStdout: single.userStdout,
              resultValue: single.resultValue,
            },
          ],
        ]);
      }
    }

    // Determine if execution failed globally due to compilation error
    let isCompilationError = false;
    if (cleanedErr) {
      if (
        cleanedErr.includes('SyntaxError') ||
        cleanedErr.includes('error: ') ||
        cleanedErr.includes('error[E') ||
        cleanedErr.includes('# command-line-arguments') ||
        cleanedErr.includes("The module's source code could not be parsed") ||
        cleanedErr.includes('compilation error') ||
        cleanedErr.includes('javac') ||
        (res.exitCode !== 0 && parsedCases.size === 0)
      ) {
        isCompilationError = true;
      }
    }

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const caseOut = parsedCases.get(tc.caseNumber);

      if (isCompilationError) {
        evaluations.push({
          caseNumber: tc.caseNumber,
          input: tc.input,
          expected: tc.expected,
          actual: '',
          passed: false,
          runtimeMs: 0,
          stderr: cleanedErr,
        });
        if (finalVerdict !== 'Compilation Error') {
          hasFailed = true;
          finalVerdict = 'Compilation Error';
          failingCaseNumber = tc.caseNumber;
        }
        continue;
      }

      if (!caseOut) {
        // Case was not executed (stopped due to early exit or killed by TLE)
        if (hasFailed && options.earlyExit) {
          evaluations.push({
            caseNumber: tc.caseNumber,
            input: tc.input,
            expected: tc.expected,
            actual: '',
            passed: false,
            notRun: true,
          });
          continue;
        }

        if (isTle && !hasFailed) {
          hasFailed = true;
          finalVerdict = 'Time Limit Exceeded';
          failingCaseNumber = tc.caseNumber;
          evaluations.push({
            caseNumber: tc.caseNumber,
            input: tc.input,
            expected: tc.expected,
            actual: '',
            passed: false,
            runtimeMs: res.runtimeMs,
            stderr: 'Time Limit Exceeded',
          });
          continue;
        }

        evaluations.push({
          caseNumber: tc.caseNumber,
          input: tc.input,
          expected: tc.expected,
          actual: '',
          passed: false,
          runtimeMs: 0,
          stderr: cleanedErr || 'Runtime Error: Test case did not produce output',
        });
        if (!hasFailed) {
          hasFailed = true;
          finalVerdict = isTle ? 'Time Limit Exceeded' : 'Runtime Error';
          failingCaseNumber = tc.caseNumber;
        }
        continue;
      }

      // Append user stdout if present
      if (caseOut.userStdout) {
        overallStdout += (overallStdout ? '\n' : '') + caseOut.userStdout;
      }

      // Check runtime error for this specific case
      if (caseOut.error) {
        hasFailed = true;
        if (finalVerdict === 'Accepted') {
          finalVerdict = 'Runtime Error';
          failingCaseNumber = tc.caseNumber;
        }
        evaluations.push({
          caseNumber: tc.caseNumber,
          input: tc.input,
          expected: tc.expected,
          actual: '',
          passed: false,
          runtimeMs: res.runtimeMs,
          stdout: caseOut.userStdout || undefined,
          stderr: caseOut.error,
        });
        continue;
      }

      const actualValue = caseOut.resultValue ?? '';
      const passed = compareOutputs(tc.expected, actualValue, options.orderInvariant);

      evaluations.push({
        caseNumber: tc.caseNumber,
        input: tc.input,
        expected: tc.expected,
        actual: actualValue,
        passed,
        runtimeMs: res.runtimeMs,
        stdout: caseOut.userStdout || undefined,
      });

      if (!passed && !hasFailed) {
        hasFailed = true;
        finalVerdict = 'Wrong Answer';
        failingCaseNumber = tc.caseNumber;
        if (options.earlyExit) {
          break;
        }
      }
    }
  } catch (err: unknown) {
    executionUnavailable = true;
    hasFailed = true;
    finalVerdict = 'Runtime Error';
    const errMsg = err instanceof Error ? err.message : String(err);
    overallStderr = errMsg;

    for (const tc of testCases) {
      evaluations.push({
        caseNumber: tc.caseNumber,
        input: tc.input,
        expected: tc.expected,
        actual: '',
        passed: false,
        runtimeMs: 0,
        stderr: errMsg,
      });
      if (options.earlyExit) {
        break;
      }
    }
  }

  const totalPassed = evaluations.filter((e) => e.passed).length;
  const totalTests = testCases.length;

  if (!hasFailed && totalPassed === totalTests) {
    finalVerdict = 'Accepted';
  }

  return {
    executionUnavailable,
    success: finalVerdict === 'Accepted',
    verdict: finalVerdict,
    runtimeMs: maxRuntime,
    memoryMb: maxMemory,
    totalPassed,
    totalTests,
    cases: evaluations,
    stdout: overallStdout || undefined,
    stderr: overallStderr || undefined,
    failingCaseNumber,
  };
}
