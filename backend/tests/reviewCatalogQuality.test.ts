import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { getAllReviewScenarios } from '../../src/lib/review/catalog';
import { runReviewScenarioTests } from '../../src/lib/review/testRunner';
import { buildPythonReviewProgram } from '../src/services/review/pythonHarnesses';

for (const scenario of getAllReviewScenarios()) {
  const suite = scenario.testSuite;
  assert.ok(suite, 'Missing tests for ' + scenario.id);
  const original = Object.fromEntries(scenario.files.map(file => [file.filename, file.content]));
  const fixed = { ...original, ...Object.fromEntries(suite.solutionFiles.map(file => [file.filename, file.content])) };
  async function run(files: Record<string, string>): Promise<boolean[]> {
    if (!suite || suite.executionMode === 'client_js') {
      return (await runReviewScenarioTests(scenario, files)).map(result => result.passed);
    }
    const code = buildPythonReviewProgram(scenario.id, Object.entries(files).map(([filename, content]) => ({ filename, content })));
    const result = spawnSync(process.env.PRISMCODE_PYTHON || 'python', ['-c', code], {
      encoding: 'utf8', timeout: 5000, windowsHide: true,
    });
    assert.equal(result.status, 0, result.error?.message || result.stderr);
    const report = result.stdout.split('___REVIEW_TEST_RESULTS___')[1]?.trim().split('\n')[0];
    assert.ok(report, 'Missing Python harness report for ' + scenario.id);
    return (JSON.parse(report) as { passed: boolean }[]).map(test => test.passed);
  }
  const before = await run(original);
  const after = await run(fixed);
  assert.equal(before.length, suite.testCases.length);
  assert.equal(after.length, suite.testCases.length);
  assert.ok(before.some(passed => !passed), 'Review starter unexpectedly passed: ' + scenario.id);
  assert.ok(after.every(Boolean), 'Review reference failed: ' + scenario.id);
  console.log('Verified review exercise', scenario.id);
}
