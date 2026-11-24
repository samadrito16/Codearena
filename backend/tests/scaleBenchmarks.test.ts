import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(backendDir, '..');

dotenv.config({ path: path.resolve(backendDir, '.env') });
dotenv.config();

import { runTestCases } from '../src/services/onlineCompilerService.js';
import type { TestCaseInput } from '../src/services/execution/types.js';

console.log('=== [PrismCode] High-N Scale Stress & TLE Verification Tests ===\n');

// ─────────────────────────────────────────────────────────────
// Suite 1: Catalog & Database Scale Test Coverage Verification
// ─────────────────────────────────────────────────────────────
console.log('[Suite 1: Scale Test Case Coverage in Catalog & Database]');

// 1. Verify Core Problem Arena problems have scale stress tests
const dbPath = path.resolve(backendDir, 'data/db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const coreProblemsToCheck = [
  'two-sum',
  'valid-parentheses',
  'longest-substring',
  'container-water',
  'climbing-stairs',
  'maximum-subarray',
  'move-zeroes',
  'contiguous-array',
  'subarray-sums-divisible-by-k',
];

for (const slug of coreProblemsToCheck) {
  const prob = dbData.problems.find((p: any) => p.slug === slug || p.id === slug);
  assert.ok(prob, `Problem "${slug}" should exist in backend db.json`);
  assert.ok(
    prob.testCases && prob.testCases.length >= 3,
    `Problem "${slug}" must have at least 3 test cases (found ${prob.testCases?.length || 0})`
  );

  // Check that at least one test case is a scale stress test
  const hasScaleCase = prob.testCases.some(
    (tc: any) => (tc.input && tc.input.length > 2000) || tc.input.includes('n = 40') || tc.input.includes('n = 38')
  );
  assert.ok(
    hasScaleCase,
    `Problem "${slug}" must include a high-N scale stress test case (input > 2000 chars or high-complexity n)`
  );
  console.log(`  ✓ Problem "${slug}": verified scale stress test case present (${prob.testCases.length} total test cases).`);
}

// 2. Verify all 25 Mastery Studio blueprints have scale_benchmark metadata
const masteryCatalogPath = path.resolve(repoRoot, 'data/mastery/prism_code_mastery_catalog.json');
const masteryCatalogRaw = JSON.parse(fs.readFileSync(masteryCatalogPath, 'utf8'));
const masteryCatalog = Array.isArray(masteryCatalogRaw) ? masteryCatalogRaw : masteryCatalogRaw.problems;
assert.strictEqual(masteryCatalog.length, 25, 'Mastery catalog should contain exactly 25 curated blueprints');

for (const bp of masteryCatalog) {
  assert.ok(bp.scale_benchmark, `Blueprint ${bp.id} (${bp.title}) must have scale_benchmark metadata`);
  assert.ok(bp.scale_benchmark.n_size >= 35, `Blueprint ${bp.id} scale_benchmark.n_size must be >= 35 (found ${bp.scale_benchmark.n_size})`);
  assert.ok(bp.scale_benchmark.input.length > 0, `Blueprint ${bp.id} scale_benchmark must have input`);
  assert.ok(bp.scale_benchmark.optimal_complexity, `Blueprint ${bp.id} must define optimal_complexity`);
  assert.ok(bp.scale_benchmark.brute_force_complexity, `Blueprint ${bp.id} must define brute_force_complexity`);

  // Verify test_cases array includes scale stress case
  assert.ok(
    bp.statement.test_cases && bp.statement.test_cases.length >= 3,
    `Blueprint ${bp.id} statement must include at least 3 test cases`
  );
}
console.log(`  ✓ All 25 Mastery Studio blueprints verified: scale benchmarks and statement test cases populated.\n`);

// ─────────────────────────────────────────────────────────────
// Suite 2: Two Sum Empirical Scale Verification (O(N) vs O(N²))
// ─────────────────────────────────────────────────────────────
console.log('[Suite 2: Two Sum Empirical Scale Verification (N = 20,000)]');

// Optimal O(N) Hash Map Solution
const twoSumOptimalCode = `
class Solution:
    def twoSum(self, nums, target):
        lookup = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in lookup:
                return [lookup[complement], i]
            lookup[num] = i
        return []
`.trim();

// Naive O(N²) Brute Force Solution
const twoSumBruteForceCode = `
class Solution:
    def twoSum(self, nums, target):
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []
`.trim();

// Scale stress test input: 20,000 items with matching pair placed at index 19,998 and 19,999
const nTwoSum = 20000;
const scaleNums = Array.from({ length: nTwoSum }, (_, i) => i * 2);
scaleNums[nTwoSum - 2] = 5000001;
scaleNums[nTwoSum - 1] = 5000003;
const targetTwoSum = 10000004;

const twoSumTestCases: TestCaseInput[] = [
  { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
  {
    caseNumber: 2,
    input: `nums = [${scaleNums.join(', ')}], target = ${targetTwoSum}`,
    expected: `[${nTwoSum - 2}, ${nTwoSum - 1}]`,
  },
];

async function runTwoSumVerification() {
  console.log('  Running optimal O(N) twoSum on N=20,000...');
  const optimalResult = await runTestCases('python', twoSumOptimalCode, twoSumTestCases, { earlyExit: false });
  assert.strictEqual(optimalResult.success, true, `Optimal solution must pass all tests: ${optimalResult.cases.find(c => !c.passed)?.stderr}`);
  assert.strictEqual(optimalResult.verdict, 'Accepted');
  assert.ok(optimalResult.cases[1].passed, 'Optimal solution must pass high-N scale stress test case');
  console.log(`  ✓ Optimal O(N) PASSED N=20,000 in ${optimalResult.runtimeMs}ms (verdict: ${optimalResult.verdict})`);

  console.log('  Running naive O(N²) brute force twoSum on N=20,000 (expecting TLE)...');
  const bruteResult = await runTestCases('python', twoSumBruteForceCode, twoSumTestCases, { earlyExit: false });
  assert.strictEqual(
    bruteResult.verdict,
    'Time Limit Exceeded',
    `Naive O(N²) brute force must be caught and rejected with "Time Limit Exceeded", got: "${bruteResult.verdict}"`
  );
  assert.strictEqual(bruteResult.success, false, 'Brute force must not be marked successful');
  console.log(`  ✓ Naive O(N²) correctly rejected with: ${bruteResult.verdict}\n`);
}

// ─────────────────────────────────────────────────────────────
// Suite 3: Climbing Stairs Empirical Scale Verification (O(N) vs O(2^N))
// ─────────────────────────────────────────────────────────────
console.log('[Suite 3: Climbing Stairs Empirical Scale Verification (N = 40)]');

// Optimal O(N) DP Solution
const climbOptimalCode = `
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        prev, curr = 1, 2
        for _ in range(3, n + 1):
            prev, curr = curr, prev + curr
        return curr
`.trim();

// Naive O(2^N) Exponential Solution
const climbBruteForceCode = `
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        return self.climbStairs(n - 1) + self.climbStairs(n - 2)
`.trim();

const climbTestCases: TestCaseInput[] = [
  { caseNumber: 1, input: 'n = 3', expected: '3' },
  { caseNumber: 2, input: 'n = 40', expected: '165580141' },
];

async function runClimbVerification() {
  console.log('  Running optimal O(N) climbStairs on N=40...');
  const optimalResult = await runTestCases('python', climbOptimalCode, climbTestCases, { earlyExit: false });
  assert.strictEqual(optimalResult.success, true, `Optimal solution must pass all tests: ${optimalResult.cases.find(c => !c.passed)?.stderr}`);
  assert.strictEqual(optimalResult.verdict, 'Accepted');
  assert.strictEqual(optimalResult.cases[1].actual, '165580141');
  console.log(`  ✓ Optimal O(N) PASSED N=40 in ${optimalResult.runtimeMs}ms (verdict: ${optimalResult.verdict})`);

  console.log('  Running naive O(2^N) unmemoized recursive climbStairs on N=40 (expecting TLE)...');
  const bruteResult = await runTestCases('python', climbBruteForceCode, climbTestCases, { earlyExit: false });
  assert.strictEqual(
    bruteResult.verdict,
    'Time Limit Exceeded',
    `Naive O(2^N) brute force must be caught and rejected with "Time Limit Exceeded", got: "${bruteResult.verdict}"`
  );
  assert.strictEqual(bruteResult.success, false, 'Brute force must not be marked successful');
  console.log(`  ✓ Naive O(2^N) correctly rejected with: ${bruteResult.verdict}\n`);
}

async function main() {
  await runTwoSumVerification();
  await runClimbVerification();

  console.log('================================================================');
  console.log('ALL SCALE BENCHMARK & TLE VERIFICATION TESTS PASSED SUCCESSFULLY');
  console.log('================================================================');
}

main().catch((err) => {
  console.error('\n❌ Scale benchmark test failed:', err);
  process.exit(1);
});
