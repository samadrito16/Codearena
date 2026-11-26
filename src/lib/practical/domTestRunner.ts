import { PracticalChallenge, PracticalFile, TestAssertionResult } from '../../types/practicalCoding';

/**
 * Strips basic TypeScript annotations for client-side JS evaluation
 */
export function cleanTypeScriptForEvaluation(tsCode: string): string {
  return tsCode
    .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1') // remove comments
    .replace(/export\s+(interface|type)\s+[\s\S]*?\{[\s\S]*?\}/g, '') // remove interfaces
    .replace(/export\s+(interface|type)\s+[\s\S]*?;/g, '') // remove type aliases
    .replace(/(interface|type)\s+[A-Za-z0-9_<>,\s]+\{[\s\S]*?\}/g, '') // remove interfaces
    .replace(/(interface|type)\s+[A-Za-z0-9_<>,\s]+=[\s\S]*?;/g, '') // remove type aliases
    .replace(/export\s+default\s+/g, '') // strip export default
    .replace(/export\s+/g, '') // strip export
    .replace(/(private|public|protected|readonly)\s+/g, '') // strip access modifiers
    .replace(/<[A-Za-z0-9_,\s=]+>/g, '') // strip generics
    .replace(/\?\s*:/g, ':') // strip optional parameter ? before :
    .replace(/:\s*Promise<[^>]+>/g, '') // strip Promise return types
    .replace(/:\s*(string|number|boolean|any|void|unknown|never|Promise|RateLimitResult|TokenPair|VerifyResult|JobStatus|WebhookJob|DispatcherConfig|Map|Set|\[\])(\[\])?/g, '') // strip type names
    .replace(/as\s+[A-Za-z0-9_<>]+/g, ''); // strip 'as Type'
}

/**
 * Executes challenge test runner script against either the live iframe DOM or JS/SQL sandbox.
 */
export async function executeChallengeTests(
  challenge: PracticalChallenge,
  files: PracticalFile[],
  iframeEl: HTMLIFrameElement | null
): Promise<TestAssertionResult[]> {
  const startTime = performance.now();

  try {
    if (challenge.track === 'frontend_ui') {
      if (!iframeEl || !iframeEl.contentDocument || !iframeEl.contentWindow) {
        return challenge.testCases.map((tc) => ({
          testId: tc.id,
          title: tc.title,
          passed: false,
          error: 'Preview iframe is not ready or failed to mount.',
          durationMs: 0,
        }));
      }

      const doc = iframeEl.contentDocument;
      const win = iframeEl.contentWindow;

      // Wrap in async evaluation
      const runnerFn = new Function('return ' + challenge.testRunnerScript)();
      const rawResults: Partial<TestAssertionResult>[] = await runnerFn(doc, win);

      const elapsed = Math.round(performance.now() - startTime);

      return challenge.testCases.map((tc) => {
        const found = rawResults.find((r) => r.testId === tc.id);
        if (found) {
          return {
            testId: tc.id,
            title: tc.title,
            passed: Boolean(found.passed),
            error: found.error,
            expected: found.expected,
            actual: found.actual,
            durationMs: elapsed,
          };
        }
        return {
          testId: tc.id,
          title: tc.title,
          passed: false,
          error: 'Test case did not produce an assertion report.',
          durationMs: elapsed,
        };
      });
    }

    if (challenge.track === 'backend_api') {
      const codeFile = files.find((f) => f.name.endsWith('.ts') || f.name.endsWith('.js')) || files[0];
      const cleanedCode = cleanTypeScriptForEvaluation(codeFile.content);

      // Create an evaluation context
      const evalWrapper = `
        ${cleanedCode}
        const __exports = {
          TokenBucketRateLimiter: typeof TokenBucketRateLimiter !== 'undefined' ? TokenBucketRateLimiter : null,
          JWTAuthService: typeof JWTAuthService !== 'undefined' ? JWTAuthService : null,
          LRUCache: typeof LRUCache !== 'undefined' ? LRUCache : null,
          WebhookDispatcher: typeof WebhookDispatcher !== 'undefined' ? WebhookDispatcher : null,
        };
        return (${challenge.testRunnerScript})(__exports);
      `;

      const runnerFn = new Function(evalWrapper);
      const rawResults: Partial<TestAssertionResult>[] = await runnerFn();
      const elapsed = Math.round(performance.now() - startTime);

      return challenge.testCases.map((tc) => {
        const found = rawResults.find((r) => r.testId === tc.id);
        return {
          testId: tc.id,
          title: tc.title,
          passed: Boolean(found?.passed),
          error: found?.error,
          expected: found?.expected,
          actual: found?.actual,
          durationMs: elapsed,
        };
      });
    }

    if (challenge.track === 'sql_pipeline') {
      const sqlFile = files.find((f) => f.name.endsWith('.sql')) || files[0];
      const runnerFn = new Function('return ' + challenge.testRunnerScript)();
      const rawResults: Partial<TestAssertionResult>[] = await runnerFn(sqlFile.content);
      const elapsed = Math.round(performance.now() - startTime);

      return challenge.testCases.map((tc) => {
        const found = rawResults.find((r) => r.testId === tc.id);
        return {
          testId: tc.id,
          title: tc.title,
          passed: Boolean(found?.passed),
          error: found?.error,
          expected: found?.expected,
          actual: found?.actual,
          durationMs: elapsed,
        };
      });
    }

    return [];
  } catch (err: unknown) {
    const elapsed = Math.round(performance.now() - startTime);
    const message = err instanceof Error ? err.message : String(err);
    return challenge.testCases.map((tc) => ({
      testId: tc.id,
      title: tc.title,
      passed: false,
      error: `Runtime execution error: ${message}`,
      durationMs: elapsed,
    }));
  }
}
