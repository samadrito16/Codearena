import { buildExecutionSource, buildBatchExecutionSource } from '../src/services/execution/harnessBuilder.js';
import {
  extractSentinelOutput,
  compareOutputs,
  deepSortCanonical,
  normalizeOutput,
} from '../src/services/execution/outputNormalizer.js';
import { runTestCases } from '../src/services/onlineCompilerService.js';
import { BACKEND_LANGUAGES, isSupportedLanguage, getCompilerId } from '../src/services/languageRegistry.js';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, details?: unknown) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName}`, details ?? '');
  }
}

async function runTests() {
  console.log('=== [CodeArena] Production-Grade Execution Pipeline Tests ===\n');

  // Test 1: Order-Invariance & Canonical Sorting
  console.log('[Suite 1: Output Normalization & Order-Invariance]');
  {
    const res1 = compareOutputs('[0, 1]', '[1, 0]', true);
    assert(res1 === true, 'Automatic sorted comparison: [0, 1] matches [1, 0] when order-invariant');

    const res2 = compareOutputs('[0, 1]', '[1, 0]', false);
    assert(res2 === true, 'Array of primitives matches canonically even on default array comparisons');

    const res3 = compareOutputs(
      '[[1, 2], [3, 4]]',
      '[[3, 4], [1, 2]]',
      true,
    );
    assert(res3 === true, '2D array permutations match with order-invariance');

    const res4 = compareOutputs('true', 'True');
    assert(res4 === true, 'Boolean normalization: true matches True');

    const res5 = compareOutputs('0.1000001', '0.1000002');
    assert(res5 === true, 'Floating point epsilon tolerance matches within 1e-5');
  }

  // Test 2: Sentinel Output Separation (Stdout vs Return Value)
  console.log('\n[Suite 2: Sentinel Output Separation]');
  {
    const mockOutput = `DEBUG: examining index 0
DEBUG: target found
__CODEARENA_RESULT_START__
[0, 1]
__CODEARENA_RESULT_END__
Final note: completed`;

    const split = extractSentinelOutput(mockOutput);
    assert(
      split.resultValue === '[0, 1]',
      'Extracted result value correctly isolates [0, 1]',
      split.resultValue,
    );
    assert(
      split.userStdout.includes('DEBUG: examining index 0') &&
        split.userStdout.includes('Final note: completed'),
      'Captured user debug stdout cleanly without polluting result',
      split.userStdout,
    );
  }

  // Test 3: Python Execution with Debug Logs (Local Sandbox)
  console.log('\n[Suite 3: Python Execution with Debug Logging]');
  {
    const pythonCode = `
def two_sum(nums, target):
    print(f"DEBUG: solving for target={target}")
    lookup = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in lookup:
            return [lookup[diff], i]
        lookup[num] = i
    return []
`;
    const cases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { caseNumber: 2, input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
      { caseNumber: 3, input: 'nums = [3, 3], target = 6', expected: '[0, 1]' },
    ];

    const result = await runTestCases('python', pythonCode, cases, {
      earlyExit: false,
      orderInvariant: true,
      functionNameHint: 'two_sum',
    });

    assert(result.success === true, 'Python Two Sum with debug print passes all cases');
    assert(result.verdict === 'Accepted', 'Verdict is Accepted');
    assert(result.totalPassed === 3, 'All 3 test cases passed');
    assert(
      Boolean(result.stdout && result.stdout.includes('DEBUG: solving for target=9')),
      'User debug stdout captured in test case result',
      result.stdout,
    );
  }

  // Test 4: JavaScript Execution with console.log (Local Sandbox)
  console.log('\n[Suite 4: JavaScript Execution with console.log]');
  {
    const jsCode = `
function isValid(s) {
  console.log("Checking string:", s);
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if (c === '(' || c === '{' || c === '[') stack.push(c);
    else if (stack.pop() !== map[c]) return false;
  }
  return stack.length === 0;
}
`;
    const cases = [
      { caseNumber: 1, input: 's = "()[]{}"', expected: 'true' },
      { caseNumber: 2, input: 's = "(]"', expected: 'false' },
      { caseNumber: 3, input: 's = "{[]}"', expected: 'true' },
    ];

    const result = await runTestCases('javascript', jsCode, cases, {
      earlyExit: false,
      functionNameHint: 'isValid',
    });

    assert(result.success === true, 'JavaScript Valid Parentheses passes all cases');
    assert(result.verdict === 'Accepted', 'Verdict is Accepted');
    assert(result.totalPassed === 3, 'All 3 test cases passed');
    assert(
      Boolean(result.stdout && result.stdout.includes('Checking string: ()[]{}')),
      'Console.log captured cleanly into stdout',
    );
  }

  // Test 5: Sequential Early-Exit on Failure
  console.log('\n[Suite 5: Sequential Early-Exit for Submissions]');
  {
    // A solution that only solves the first case and fails on case 2
    const flawedCode = `
def two_sum(nums, target):
    if nums == [2, 7, 11, 15]:
        return [0, 1]
    return [99, 99] # wrong answer for all other cases
`;
    const cases = [
      { caseNumber: 1, input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { caseNumber: 2, input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
      { caseNumber: 3, input: 'nums = [3, 3], target = 6', expected: '[0, 1]' },
      { caseNumber: 4, input: 'nums = [1, 2], target = 3', expected: '[0, 1]' },
      { caseNumber: 5, input: 'nums = [4, 5], target = 9', expected: '[0, 1]' },
    ];

    const result = await runTestCases('python', flawedCode, cases, {
      earlyExit: true,
      orderInvariant: true,
      functionNameHint: 'two_sum',
    });

    assert(result.success === false, 'Flawed code fails');
    assert(result.verdict === 'Wrong Answer', 'Verdict is Wrong Answer');
    assert(
      result.cases.length === 2,
      'Early exit stopped execution after case 2 failed (evaluated 2 instead of 5)',
      `Evaluated count: ${result.cases.length}`,
    );
    assert(result.totalPassed === 1, 'Reported 1 test case passed before failure');
  }

  // Test 6: Java and C++ Driver Synthesis
  console.log('\n[Suite 6: Java and C++ Driver Synthesis]');
  {
    const javaCode = `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[]{0, 1};
    }
}
`;
    const javaHarness = buildExecutionSource('java', javaCode, 'nums = [2, 7, 11, 15], target = 9');
    assert(
      javaHarness.code.includes('public class Main') && javaHarness.code.includes('public static void main('),
      'Java driver synthesized public class Main with entrypoint',
    );
    assert(
      javaHarness.code.includes('SENTINEL_START') || javaHarness.code.includes('__CODEARENA_RESULT_START__'),
      'Java driver includes sentinel delimiters',
    );

    const cppCode = `
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        return {0, 1};
    }
};
`;
    const cppHarness = buildExecutionSource('cpp', cppCode, 'nums = [2, 7, 11, 15], target = 9');
    assert(
      cppHarness.code.includes('int main()'),
      'C++ driver synthesized int main() entrypoint',
    );
    assert(
      cppHarness.code.includes('__CODEARENA_RESULT_START__'),
      'C++ driver includes sentinel delimiters',
    );
  }

  // Test 7: SQL Driver Synthesis & Batch Isolation
  console.log('\n[Suite 7: SQL Driver Synthesis & Batch Isolation]');
  {
    const sqlCode = 'SELECT department, count(*) FROM employees GROUP BY department;';
    const sqlHarness = buildBatchExecutionSource('sql', sqlCode, [
      { caseNumber: 1, input: 'CREATE TABLE employees (id INT, department TEXT); INSERT INTO employees VALUES (1, "Eng");', expected: 'Eng|1' },
      { caseNumber: 2, input: 'CREATE TABLE employees (id INT, department TEXT); INSERT INTO employees VALUES (2, "Sales");', expected: 'Sales|1' },
    ]);
    assert(
      sqlHarness.code.includes('.mode list') && sqlHarness.code.includes('.separator |'),
      'SQL harness configures pipe-delimited SQLite list mode',
    );
    assert(
      sqlHarness.code.includes('DROP TABLE IF EXISTS employees;'),
      'SQL harness generates DROP TABLE statements for cross-case schema isolation',
    );
    assert(
      sqlHarness.code.includes('__CODEARENA_CASE_START__ 1') && sqlHarness.code.includes('__CODEARENA_CASE_START__ 2'),
      'SQL harness includes multi-case sentinel markers',
    );
  }

  // Test 8: Streamlined Core Language Registry
  console.log('\n[Suite 8: Streamlined Core Language Registry]');
  {
    assert(isSupportedLanguage('python'), 'Python is supported in core registry');
    assert(isSupportedLanguage('cpp'), 'C++ is supported in core registry');
    assert(isSupportedLanguage('java'), 'Java is supported in core registry');
    assert(isSupportedLanguage('javascript'), 'JavaScript is supported in core registry');
    assert(isSupportedLanguage('sql'), 'SQL is supported in core registry');

    assert(!isSupportedLanguage('cobol'), 'COBOL is removed from language registry');
    assert(!isSupportedLanguage('assembly'), 'Assembly is removed from language registry');
    assert(!isSupportedLanguage('pascal'), 'Pascal is removed from language registry');

    const totalLangs = Object.keys(BACKEND_LANGUAGES).length;
    assert(totalLangs <= 12, `Language registry is streamlined (${totalLangs} total entries, down from 47)`);
  }

  console.log(`\n=================================================`);
  console.log(`Summary: ${passedTests} / ${totalTests} tests passed.`);
  console.log(`=================================================`);

  if (passedTests < totalTests) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
