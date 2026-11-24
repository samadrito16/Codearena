import assert from 'node:assert';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve('backend', '.env') });
dotenv.config();

import { runTestCases } from '../dist/services/onlineCompilerService.js';
import { parseBatchCasesOutput, compareOutputs, extractSentinelOutput } from '../dist/services/execution/outputNormalizer.js';
import { buildBatchExecutionSource } from '../dist/services/execution/harnessBuilder.js';
import { BACKEND_LANGUAGES, isSupportedLanguage, getCompilerId } from '../dist/services/languageRegistry.js';
import { db } from '../dist/db/database.js';

let passedTests = 0;
let totalTests = 0;

function it(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}:`, err.message);
  }
}

async function itAsync(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}:`, err.message);
  }
}

async function runAllTests() {
  console.log('\n--- 1. Testing outputNormalizer parseBatchCasesOutput ---');

  it('correctly parses multi-case batch output with results and user logs', () => {
    const rawStdout = `
__CODEARENA_CASE_START__ 1
user log line 1
user log line 2
__CODEARENA_RESULT_START__
[0, 1]
__CODEARENA_RESULT_END__
__CODEARENA_CASE_END__ 1
__CODEARENA_CASE_START__ 2
debug: computing case 2
__CODEARENA_RESULT_START__
[1, 2]
__CODEARENA_RESULT_END__
__CODEARENA_CASE_END__ 2
`;
    const cases = parseBatchCasesOutput(rawStdout);
    assert.strictEqual(cases.size, 2);

    const c1 = cases.get(1);
    assert.ok(c1);
    assert.strictEqual(c1.caseNumber, 1);
    assert.strictEqual(c1.resultValue, '[0, 1]');
    assert.strictEqual(c1.userStdout, 'user log line 1\nuser log line 2');
    assert.strictEqual(c1.error, undefined);

    const c2 = cases.get(2);
    assert.ok(c2);
    assert.strictEqual(c2.caseNumber, 2);
    assert.strictEqual(c2.resultValue, '[1, 2]');
    assert.strictEqual(c2.userStdout, 'debug: computing case 2');
  });

  it('correctly parses test case runtime errors with __CODEARENA_ERROR_START__', () => {
    const rawStdout = `
__CODEARENA_CASE_START__ 1
__CODEARENA_RESULT_START__
true
__CODEARENA_RESULT_END__
__CODEARENA_CASE_END__ 1
__CODEARENA_CASE_START__ 2
__CODEARENA_ERROR_START__
IndexError: list index out of range
__CODEARENA_ERROR_END__
__CODEARENA_CASE_END__ 2
`;
    const cases = parseBatchCasesOutput(rawStdout);
    assert.strictEqual(cases.size, 2);

    const c1 = cases.get(1);
    assert.strictEqual(c1.resultValue, 'true');

    const c2 = cases.get(2);
    assert.ok(c2);
    assert.strictEqual(c2.caseNumber, 2);
    assert.ok(c2.error.includes('IndexError'));
  });

  console.log('\n--- 2. Testing harnessBuilder buildBatchExecutionSource ---');

  it('builds Python batch harness with JSON-serialized test cases in stdin', () => {
    const code = 'def two_sum(nums, target): return [0, 1]';
    const testCases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { caseNumber: 2, input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
    ];
    const { code: builtCode, stdin } = buildBatchExecutionSource('python', code, testCases, { earlyExit: true });

    assert.ok(builtCode.includes('_run_batch_driver'));
    assert.ok(builtCode.includes('__CODEARENA_CASE_START__'));

    const parsedStdin = JSON.parse(stdin);
    assert.strictEqual(parsedStdin.earlyExit, true);
    assert.strictEqual(parsedStdin.cases.length, 2);
    assert.strictEqual(parsedStdin.cases[0].caseNumber, 1);
  });

  it('builds JavaScript batch harness with JSON-serialized test cases in stdin', () => {
    const code = 'function twoSum(nums, target) { return [0, 1]; }';
    const testCases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
    ];
    const { code: builtCode, stdin } = buildBatchExecutionSource('javascript', code, testCases, { earlyExit: false });

    assert.ok(builtCode.includes('__CODEARENA_CASE_START__'));
    const parsedStdin = JSON.parse(stdin);
    assert.strictEqual(parsedStdin.earlyExit, false);
    assert.strictEqual(parsedStdin.cases.length, 1);
  });

  it('builds Java batch harness with line delimiters in stdin', () => {
    const code = 'class Solution { public int[] twoSum(int[] nums, int target) { return new int[]{0, 1}; } }';
    const testCases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { caseNumber: 2, input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
    ];
    const { code: builtCode, stdin } = buildBatchExecutionSource('java', code, testCases);

    assert.ok(builtCode.includes('class Main'));
    assert.ok(stdin.includes('<<<__CODEARENA_CASE__>>> 1'));
    assert.ok(stdin.includes('<<<__CODEARENA_CASE__>>> 2'));
  });

  console.log('\n--- 3. Testing Database Daily Execution Quotas ---');

  await itAsync('tracks and enforces daily execution limits per user and per IP', async () => {
    await db.init();
    const testUserId = 'test_user_' + Date.now();
    const testIp = '198.51.100.42';

    // 1. Initial check for user (free tier = 50 limit)
    const initialQuota = db.checkExecutionQuota(testUserId, testIp, 'user', 'free');
    assert.strictEqual(initialQuota.allowed, true);
    assert.strictEqual(initialQuota.count, 0);
    assert.strictEqual(initialQuota.limit, 50);
    assert.strictEqual(initialQuota.remaining, 50);

    // 2. Increment usage
    await db.incrementExecutionUsage(testUserId, testIp);
    const afterOne = db.checkExecutionQuota(testUserId, testIp, 'user', 'free');
    assert.strictEqual(afterOne.count, 1);
    assert.strictEqual(afterOne.remaining, 49);

    // 3. Guest check (limit = 20)
    const guestQuota = db.checkExecutionQuota(null, testIp);
    assert.strictEqual(guestQuota.limit, 20);
    assert.strictEqual(guestQuota.allowed, true);

    // 4. Pro tier check (limit = 250)
    const proQuota = db.checkExecutionQuota(testUserId, testIp, 'user', 'pro');
    assert.strictEqual(proQuota.limit, 250);

    // 5. Quota exceeded test
    // Artificially simulate reaching limit
    const key = db.getExecutionQuotaKey(testUserId, testIp);
    const today = new Date().toISOString().slice(0, 10);
    db['data'].dailyExecutions[key] = { count: 50, date: today };

    const exhaustedQuota = db.checkExecutionQuota(testUserId, testIp, 'user', 'free');
    assert.strictEqual(exhaustedQuota.allowed, false);
    assert.strictEqual(exhaustedQuota.remaining, 0);
  });

  console.log('\n--- 4. Testing End-to-End Batch Execution with OnlineCompiler API ---');

  await itAsync('runs multiple Python test cases in ONE single remote call', async () => {
    const userCode = `
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []
`;
    const testCases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { caseNumber: 2, input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
      { caseNumber: 3, input: 'nums = [3, 3], target = 6', expected: '[0, 1]' },
    ];

    const result = await runTestCases('python', userCode, testCases);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.verdict, 'Accepted');
    assert.strictEqual(result.totalPassed, 3);
    assert.strictEqual(result.totalTests, 3);
    assert.strictEqual(result.cases.length, 3);
    assert.strictEqual(result.cases[0].passed, true);
    assert.strictEqual(result.cases[1].passed, true);
    assert.strictEqual(result.cases[2].passed, true);
  });

  await itAsync('runs multiple JavaScript test cases in ONE single remote call', async () => {
    const userCode = `
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
`;
    const testCases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { caseNumber: 2, input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
      { caseNumber: 3, input: 'nums = [3, 3], target = 6', expected: '[0, 1]' },
    ];

    const result = await runTestCases('javascript', userCode, testCases);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.verdict, 'Accepted');
    assert.strictEqual(result.totalPassed, 3);
    assert.strictEqual(result.totalTests, 3);
  });

  await itAsync('reports Wrong Answer correctly when a case fails', async () => {
    const buggyCode = `
def two_sum(nums, target):
    return [0, 0] # Always wrong
`;
    const testCases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
    ];

    const result = await runTestCases('python', buggyCode, testCases);
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.verdict, 'Wrong Answer');
    assert.strictEqual(result.totalPassed, 0);
    assert.strictEqual(result.cases[0].passed, false);
  });

  await itAsync('reports Compilation Error on syntax failure', async () => {
    const syntaxErrorCode = `
def two_sum(nums, target
    this is invalid syntax {{{
`;
    const testCases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { caseNumber: 2, input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
    ];

    const result = await runTestCases('python', syntaxErrorCode, testCases);
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.verdict, 'Compilation Error');
  });

  await itAsync('runs multiple C++ test cases in ONE single remote call', async () => {
    const cppCode = `
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < (int)nums.size(); i++) {
            int diff = target - nums[i];
            if (seen.count(diff)) return {seen[diff], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};
`;
    const testCases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { caseNumber: 2, input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
      { caseNumber: 3, input: 'nums = [3, 3], target = 6', expected: '[0, 1]' },
    ];

    const result = await runTestCases('cpp', cppCode, testCases);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.verdict, 'Accepted');
    assert.strictEqual(result.totalPassed, 3);
    assert.strictEqual(result.totalTests, 3);
  });

  await itAsync('runs multiple Java test cases via reflection in ONE single remote call', async () => {
    const javaCode = `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        java.util.Map<Integer, Integer> seen = new java.util.HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (seen.containsKey(diff)) {
                return new int[]{seen.get(diff), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}
`;
    const testCases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { caseNumber: 2, input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
      { caseNumber: 3, input: 'nums = [3, 3], target = 6', expected: '[0, 1]' },
    ];

    const result = await runTestCases('java', javaCode, testCases);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.verdict, 'Accepted');
    assert.strictEqual(result.totalPassed, 3);
    assert.strictEqual(result.totalTests, 3);
  });

  await itAsync('runs multiple SQL test cases with schema isolation and order invariance in ONE single call', async () => {
    const sqlCode = `
SELECT department, COUNT(*) as cnt FROM employees GROUP BY department ORDER BY department;
`;
    const sqlCases = [
      {
        caseNumber: 1,
        input: `
CREATE TABLE employees (id INT, department TEXT);
INSERT INTO employees VALUES (1, 'Engineering'), (2, 'Engineering'), (3, 'Sales');
`,
        expected: 'Engineering|2\nSales|1',
      },
      {
        caseNumber: 2,
        input: `
CREATE TABLE employees (id INT, department TEXT);
INSERT INTO employees VALUES (1, 'Design'), (2, 'Design'), (3, 'Design'), (4, 'Marketing');
`,
        expected: 'Marketing|1\nDesign|3',
      },
    ];

    const result = await runTestCases('sql', sqlCode, sqlCases, { orderInvariant: true });
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.verdict, 'Accepted');
    assert.strictEqual(result.totalPassed, 2);
    assert.strictEqual(result.totalTests, 2);
  });

  console.log('\n--- 5. Testing Streamlined Core Language Registry ---');

  it('validates core language support and removes obsolete novelty languages', () => {
    // 5 core deeply-tested languages are present
    assert.strictEqual(isSupportedLanguage('python'), true);
    assert.strictEqual(isSupportedLanguage('cpp'), true);
    assert.strictEqual(isSupportedLanguage('java'), true);
    assert.strictEqual(isSupportedLanguage('javascript'), true);
    assert.strictEqual(isSupportedLanguage('sql'), true);

    // Aliases resolve correctly
    assert.strictEqual(getCompilerId('python'), 'python-3.14');
    assert.strictEqual(getCompilerId('c++'), 'g++-15');
    assert.strictEqual(getCompilerId('java'), 'openjdk-25');
    assert.strictEqual(getCompilerId('js'), 'nodejs-24');
    assert.strictEqual(getCompilerId('sqlite'), 'sqlite-3');

    // Novelty/esoteric languages have been pruned
    assert.strictEqual(isSupportedLanguage('cobol'), false);
    assert.strictEqual(isSupportedLanguage('assembly'), false);
    assert.strictEqual(isSupportedLanguage('pascal'), false);
    assert.strictEqual(isSupportedLanguage('fortran'), false);
    assert.strictEqual(isSupportedLanguage('freebasic'), false);

    // Language count is streamlined (<= 12 core runtimes instead of 45+)
    const langCount = Object.keys(BACKEND_LANGUAGES).length;
    assert.ok(langCount <= 12, `Registry is streamlined to ${langCount} core runtimes`);
  });

  console.log(`\n================================`);
  console.log(`Tests finished: ${passedTests}/${totalTests} passed.`);
  console.log(`================================\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runAllTests().catch((e) => {
  console.error('Fatal test error:', e);
  process.exit(1);
});
