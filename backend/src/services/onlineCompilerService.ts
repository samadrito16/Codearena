import { getCompilerId } from './languageRegistry.js';
import { buildExecutionSource } from './execution/harnessBuilder.js';
import {
  extractSentinelOutput,
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

export { normalizeOutput, buildExecutionSource };
export type { TestCaseInput, TestCaseEvaluation, BatchExecutionResult };

export interface RunOptions {
  earlyExit?: boolean;
  orderInvariant?: boolean;
  functionNameHint?: string;
}

/**
 * Runs test cases against the specified language and user code.
 * - Supports concurrent evaluation for public samples (runCode).
 * - Supports sequential early-exit on the first failure for submission evaluation (submitCode).
 */
export async function runTestCases(
  languageId: string,
  userCode: string,
  testCases: TestCaseInput[],
  options: RunOptions = {},
): Promise<BatchExecutionResult> {
  const compilerId = getCompilerId(languageId);
  const evaluations: TestCaseEvaluation[] = [];

  let maxRuntime = 0;
  let maxMemory = 0;
  let overallStderr = '';
  let overallStdout = '';
  let finalVerdict: ExecutionVerdict = 'Accepted';
  let hasFailed = false;

  for (const tc of testCases) {
    const { code, stdin } = buildExecutionSource(
      languageId,
      userCode,
      tc.input,
      options.functionNameHint,
    );

    try {
      const res = await executeCode(languageId, compilerId, code, stdin);
      maxRuntime = Math.max(maxRuntime, res.runtimeMs);
      maxMemory = Math.max(maxMemory, res.memoryMb);

      const { userStdout, resultValue } = extractSentinelOutput(res.stdout);
      if (userStdout) {
        overallStdout += (overallStdout ? '\n' : '') + userStdout;
      }

      let isTle = res.exitCode === 124;
      let isRuntimeError = res.exitCode !== 0 && !isTle;
      let isCompilationError = false;

      // Classify compilation error vs runtime error
      const cleanedErr = cleanErrorMessage(res.stderr);
      if (cleanedErr) {
        overallStderr = cleanedErr;
        if (
          cleanedErr.includes('SyntaxError') ||
          cleanedErr.includes('error: ') ||
          cleanedErr.includes('compilation error')
        ) {
          isCompilationError = true;
          isRuntimeError = false;
        }
      }

      // Check correctness
      const passed =
        !isTle &&
        !isRuntimeError &&
        !isCompilationError &&
        compareOutputs(tc.expected, resultValue, options.orderInvariant);

      const evaluation: TestCaseEvaluation = {
        caseNumber: tc.caseNumber,
        input: tc.input,
        expected: tc.expected,
        actual: resultValue,
        passed,
        runtimeMs: res.runtimeMs,
        stdout: userStdout || undefined,
        stderr: cleanedErr || undefined,
      };

      evaluations.push(evaluation);

      if (!passed) {
        hasFailed = true;
        if (isTle) {
          finalVerdict = 'Time Limit Exceeded';
        } else if (isCompilationError) {
          finalVerdict = 'Compilation Error';
        } else if (isRuntimeError) {
          finalVerdict = 'Runtime Error';
        } else {
          finalVerdict = 'Wrong Answer';
        }

        // Sequential Early-Exit for submissions
        if (options.earlyExit) {
          break;
        }
      }
    } catch (err: unknown) {
      hasFailed = true;
      finalVerdict = 'Runtime Error';
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
    success: finalVerdict === 'Accepted',
    verdict: finalVerdict,
    runtimeMs: maxRuntime || 12,
    memoryMb: maxMemory || 14.5,
    totalPassed,
    totalTests,
    cases: evaluations,
    stdout: overallStdout || undefined,
    stderr: overallStderr || undefined,
  };
}
