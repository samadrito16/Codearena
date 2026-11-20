import { db } from '../src/db/database.js';
import { runTestCases } from '../src/services/onlineCompilerService.js';

async function testRoutes() {
  console.log('[VerifyEndpoints] Initializing database...');
  await db.init();

  const problem = db.getProblemForExecution('two-sum');
  if (!problem) throw new Error('two-sum problem not found in db');

  console.log(`[VerifyEndpoints] Problem loaded: ${problem.title}`);
  console.log(`[VerifyEndpoints] Sample examples count: ${problem.examples.length}`);
  console.log(`[VerifyEndpoints] Total testCases (with hidden): ${problem.testCases?.length}`);

  // 1. Simulate POST /run
  console.log('\n--- Simulating POST /api/submissions/run ---');
  const runCases = problem.examples.map((ex, i) => ({
    caseNumber: i + 1,
    input: ex.input,
    expected: ex.output,
  }));

  const pythonCode = `
def two_sum(nums, target):
    print("Testing Two Sum solution with debug logs")
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i
    return []
`;

  const runResult = await runTestCases('python', pythonCode, runCases, {
    earlyExit: false,
    orderInvariant: Boolean(problem.orderInvariant),
    functionNameHint: 'two_sum',
  });

  console.log('Run verdict:', runResult.verdict);
  console.log('Run passed:', `${runResult.totalPassed} / ${runResult.totalTests}`);
  console.log('Run stdout:', runResult.stdout);
  console.log('Run cases passed:', runResult.cases.map(c => `Case ${c.caseNumber}: ${c.passed ? 'PASSED' : 'FAILED'}`));

  if (!runResult.success) {
    throw new Error('Run simulation failed!');
  }

  // 2. Simulate POST /submit (with full test suite + hidden edge cases)
  console.log('\n--- Simulating POST /api/submissions/submit ---');
  const submitCases = problem.testCases || runCases;
  const submitResult = await runTestCases('python', pythonCode, submitCases, {
    earlyExit: true,
    orderInvariant: Boolean(problem.orderInvariant),
    functionNameHint: 'two_sum',
  });

  console.log('Submit verdict:', submitResult.verdict);
  console.log('Submit passed:', `${submitResult.totalPassed} / ${submitResult.totalTests}`);
  const percentile = db.calculatePercentile(problem.id, submitResult.runtimeMs);
  console.log(`Dynamic percentile: Beats ${percentile}% of users`);

  if (!submitResult.success) {
    throw new Error('Submit simulation failed!');
  }

  console.log('\n✓ All submission route flows verified successfully!');
}

testRoutes().catch((err) => {
  console.error('Endpoint verification failed:', err);
  process.exit(1);
});
