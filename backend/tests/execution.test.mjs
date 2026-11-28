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

async function runCasesWithRetry(language, code, cases, options = {}) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const result = await runTestCases(language, code, cases, options);
    const errText = `${result.compilationError || ''} ${result.stderr || ''}`;
    const transient =
      !result.success &&
      (errText.includes('429') ||
        errText.includes('temporarily unavailable') ||
        errText.includes('fetch failed') ||
        errText.includes('rate limit'));
    if (transient && attempt < 3) {
      await new Promise((r) => setTimeout(r, 2500 * (attempt + 1)));
      continue;
    }
    return result;
  }
  return runTestCases(language, code, cases, options);
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

  it('builds TypeScript batch harness for Deno without requiring fs module', () => {
    const code = 'function twoSum(nums: number[], target: number): number[] { return [0, 1]; }';
    const testCases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
    ];
    const { code: builtCode, stdin } = buildBatchExecutionSource('typescript', code, testCases, {
      earlyExit: true,
      functionNameHint: 'twoSum',
    });

    assert.ok(builtCode.includes('__CODEARENA_CASE_START__'));
    assert.ok(!builtCode.includes("require('fs')"));
    assert.ok(builtCode.includes('Deno'));
    const parsedStdin = JSON.parse(stdin);
    assert.strictEqual(parsedStdin.earlyExit, true);
    assert.strictEqual(parsedStdin.cases.length, 1);
  });

  it('builds C batch harness with OptionalInt guard and delimited stdin', () => {
    const code = `
#ifndef OPTIONAL_INT_DEFINED
#define OPTIONAL_INT_DEFINED
typedef struct { bool hasValue; int value; } OptionalInt;
#endif
bool isSameTree(OptionalInt* p, int pSize, OptionalInt* q, int qSize) { return true; }`;
    const testCases = [
      { caseNumber: 1, input: 'p = [1,2,3], q = [1,2,3]', expected: 'true' },
    ];
    const { code: builtCode, stdin } = buildBatchExecutionSource('c', code, testCases, {
      functionNameHint: 'isSameTree',
    });

    assert.ok(builtCode.includes('ca_parse_opt_int_array'));
    assert.ok(builtCode.includes('isSameTree(ca_arg_0, ca_arg_0_sz, ca_arg_1, ca_arg_1_sz)'));
    assert.ok(stdin.includes('<<<__CODEARENA_CASE__>>> 1'));
  });

  it('builds Go batch harness stripping package main and aliasing internal imports', () => {
    const code = `package main
import "sort"
func twoSum(nums []int, target int) []int {
	sort.Ints(nums)
	return []int{0, 1}
}`;
    const testCases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
    ];
    const { code: builtCode, stdin } = buildBatchExecutionSource('go', code, testCases, {
      functionNameHint: 'twoSum',
    });

    assert.strictEqual((builtCode.match(/package main/g) || []).length, 1);
    assert.ok(builtCode.includes('__caReflect.ValueOf(twoSum)'));
    assert.ok(stdin.includes('<<<__CODEARENA_CASE__>>> 1'));
  });

  it('builds Rust batch harness allowing non_snake_case entrypoints and panic recovery', () => {
    const code = 'pub fn twoSum(nums: Vec<i32>, target: i32) -> Vec<i32> { vec![0, 1] }';
    const testCases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
    ];
    const { code: builtCode, stdin } = buildBatchExecutionSource('rust', code, testCases, {
      functionNameHint: 'twoSum',
    });

    assert.ok(builtCode.includes('#![allow(non_snake_case'));
    assert.ok(builtCode.includes('twoSum(__ca_arg_0, __ca_arg_1)'));
    assert.ok(builtCode.includes('catch_unwind'));
    assert.ok(stdin.includes('<<<__CODEARENA_CASE__>>> 1'));
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

    const result = await runCasesWithRetry('python', userCode, testCases);
    assert.strictEqual(result.success, true, result.compilationError || result.stderr);
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

    const result = await runCasesWithRetry('javascript', userCode, testCases);
    assert.strictEqual(result.success, true, result.compilationError || result.stderr);
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

    const result = await runCasesWithRetry('python', buggyCode, testCases);
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

    const result = await runCasesWithRetry('python', syntaxErrorCode, testCases);
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

    const result = await runCasesWithRetry('cpp', cppCode, testCases);
    assert.strictEqual(result.success, true, result.compilationError || result.stderr);
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

    const result = await runCasesWithRetry('java', javaCode, testCases);
    assert.strictEqual(result.success, true, result.compilationError || result.stderr);
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

    const result = await runCasesWithRetry('sql', sqlCode, sqlCases, { orderInvariant: true });
    assert.strictEqual(result.success, true, result.compilationError || result.stderr);
    assert.strictEqual(result.verdict, 'Accepted');
    assert.strictEqual(result.totalPassed, 2);
    assert.strictEqual(result.totalTests, 2);
  });

  const arrayCases = [
    { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
    { caseNumber: 2, input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
    { caseNumber: 3, input: 'nums = [3, 3], target = 6', expected: '[0, 1]' },
  ];
  const scalarTreeCases = [
    { caseNumber: 1, input: 'p = [1, 2, 3], q = [1, 2, 3]', expected: 'true' },
    { caseNumber: 2, input: 'p = [1, 2], q = [1, null, 2]', expected: 'false' },
    { caseNumber: 3, input: 'p = [], q = []', expected: 'true' },
  ];

  const newLanguageSuites = [
    {
      language: 'typescript',
      label: 'TypeScript',
      arrayFn: 'twoSum',
      arrayCode: `
function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (seen.has(diff)) return [seen.get(diff)!, i];
    seen.set(nums[i], i);
  }
  return [];
}
`,
      scalarFn: 'isSameTree',
      scalarCode: `
function isSameTree(p: (number | null)[], q: (number | null)[]): boolean {
  if (p.length !== q.length) return false;
  for (let i = 0; i < p.length; i++) {
    if (p[i] !== q[i]) return false;
  }
  return true;
}
`,
      wrongCode: `function twoSum(nums: number[], target: number): number[] { return [0, 0]; }`,
      compileErrorCode: `function twoSum(nums: number[] { return [0, 1]; }`,
    },
    {
      language: 'c',
      label: 'C',
      arrayFn: 'twoSum',
      arrayCode: `
#include <stdlib.h>
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* res = (int*)malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                res[0] = i;
                res[1] = j;
                *returnSize = 2;
                return res;
            }
        }
    }
    *returnSize = 0;
    return res;
}
`,
      scalarFn: 'isSameTree',
      scalarCode: `
#include <stdbool.h>
bool isSameTree(OptionalInt* p, int pSize, OptionalInt* q, int qSize) {
    if (pSize != qSize) return false;
    for (int i = 0; i < pSize; i++) {
        if (p[i].hasValue != q[i].hasValue) return false;
        if (p[i].hasValue && p[i].value != q[i].value) return false;
    }
    return true;
}
`,
      wrongCode: `
#include <stdlib.h>
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* res = (int*)calloc(2, sizeof(int));
    *returnSize = 2;
    return res;
}`,
      compileErrorCode: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) { missing_semicolon return NULL; }`,
    },
    {
      language: 'go',
      label: 'Go',
      arrayFn: 'twoSum',
      arrayCode: `
package main

func twoSum(nums []int, target int) []int {
	seen := make(map[int]int)
	for i, num := range nums {
		if j, ok := seen[target-num]; ok {
			return []int{j, i}
		}
		seen[num] = i
	}
	return []int{}
}
`,
      scalarFn: 'isSameTree',
      scalarCode: `
package main

func isSameTree(p []*int, q []*int) bool {
	if len(p) != len(q) {
		return false
	}
	for i := range p {
		if (p[i] == nil) != (q[i] == nil) {
			return false
		}
		if p[i] != nil && *p[i] != *q[i] {
			return false
		}
	}
	return true
}
`,
      wrongCode: `package main\nfunc twoSum(nums []int, target int) []int { return []int{0, 0} }`,
      compileErrorCode: `package main\nfunc twoSum(nums []int, target int) []int { return "broken" }`,
    },
    {
      language: 'rust',
      label: 'Rust',
      arrayFn: 'twoSum',
      arrayCode: `
use std::collections::HashMap;

fn twoSum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut seen = HashMap::new();
    for (i, &num) in nums.iter().enumerate() {
        if let Some(&j) = seen.get(&(target - num)) {
            return vec![j as i32, i as i32];
        }
        seen.insert(num, i);
    }
    vec![]
}
`,
      scalarFn: 'isSameTree',
      scalarCode: `
fn isSameTree(p: Vec<Option<i32>>, q: Vec<Option<i32>>) -> bool {
    p == q
}
`,
      wrongCode: `fn twoSum(_nums: Vec<i32>, _target: i32) -> Vec<i32> { vec![0, 0] }`,
      compileErrorCode: `fn twoSum(nums: Vec<i32>, target: i32) -> Vec<i32> { let x: i32 = "broken"; vec![] }`,
    },
  ];

  for (const suite of newLanguageSuites) {
    await itAsync(`runs multi-case ${suite.label} array solution via OnlineCompiler`, async () => {
      const result = await runCasesWithRetry(suite.language, suite.arrayCode, arrayCases, {
        functionNameHint: suite.arrayFn,
      });
      assert.strictEqual(result.success, true, `${suite.label} array error: ${result.compilationError || result.stderr}`);
      assert.strictEqual(result.verdict, 'Accepted');
      assert.strictEqual(result.totalPassed, 3);
      assert.strictEqual(result.totalTests, 3);
    });

    await itAsync(`runs multi-case ${suite.label} scalar/nullable-tree solution via OnlineCompiler`, async () => {
      const result = await runCasesWithRetry(suite.language, suite.scalarCode, scalarTreeCases, {
        functionNameHint: suite.scalarFn,
      });
      assert.strictEqual(result.success, true, `${suite.label} scalar error: ${result.compilationError || result.stderr}`);
      assert.strictEqual(result.verdict, 'Accepted');
      assert.strictEqual(result.totalPassed, 3);
      assert.strictEqual(result.totalTests, 3);
    });

    await itAsync(`reports Wrong Answer for ${suite.label}`, async () => {
      const result = await runCasesWithRetry(suite.language, suite.wrongCode, arrayCases.slice(0, 1), {
        functionNameHint: suite.arrayFn,
      });
      assert.strictEqual(result.success, false);
      assert.strictEqual(result.verdict, 'Wrong Answer');
      assert.strictEqual(result.totalPassed, 0);
    });

    await itAsync(`reports Compilation Error for ${suite.label}`, async () => {
      const result = await runCasesWithRetry(suite.language, suite.compileErrorCode, arrayCases.slice(0, 1), {
        functionNameHint: suite.arrayFn,
      });
      assert.strictEqual(result.success, false);
      assert.strictEqual(result.verdict, 'Compilation Error');
      assert.ok(result.compilationError || result.stderr);
    });
  }

  console.log('\n--- 5. Testing Streamlined Core Language Registry ---');

  it('validates core language support and removes obsolete novelty languages', () => {
    // 9 core deeply-tested languages are present
    assert.strictEqual(isSupportedLanguage('python'), true);
    assert.strictEqual(isSupportedLanguage('cpp'), true);
    assert.strictEqual(isSupportedLanguage('java'), true);
    assert.strictEqual(isSupportedLanguage('javascript'), true);
    assert.strictEqual(isSupportedLanguage('typescript'), true);
    assert.strictEqual(isSupportedLanguage('c'), true);
    assert.strictEqual(isSupportedLanguage('go'), true);
    assert.strictEqual(isSupportedLanguage('rust'), true);
    assert.strictEqual(isSupportedLanguage('sql'), true);

    // Aliases resolve correctly
    assert.strictEqual(getCompilerId('python'), 'python-3.14');
    assert.strictEqual(getCompilerId('c++'), 'g++-15');
    assert.strictEqual(getCompilerId('java'), 'openjdk-25');
    assert.strictEqual(getCompilerId('js'), 'nodejs-24');
    assert.strictEqual(getCompilerId('typescript'), 'typescript-deno');
    assert.strictEqual(getCompilerId('ts'), 'typescript-deno');
    assert.strictEqual(getCompilerId('c'), 'gcc-15');
    assert.strictEqual(getCompilerId('go'), 'go-1.26');
    assert.strictEqual(getCompilerId('golang'), 'go-1.26');
    assert.strictEqual(getCompilerId('rust'), 'rust-1.93');
    assert.strictEqual(getCompilerId('rs'), 'rust-1.93');
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
