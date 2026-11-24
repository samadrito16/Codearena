import assert from 'node:assert';
import { executeTrace } from '../src/services/execution/traceEngine.js';

async function runTests() {
  console.log('--- Testing PrismCode Deterministic Visual Tracer ---');

  // Test 1: Two Sum with Dict & List Pointers
  console.log('\n[Test 1] Tracing Two Sum (Iterative Hash Map & Pointers)...');
  const twoSumCode = `
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`.trim();

  const res1 = await executeTrace({
    code: twoSumCode,
    language: 'python',
    input: 'nums = [2, 7, 11, 15], target = 9',
  });

  assert.strictEqual(res1.success, true, `Two Sum trace failed: ${res1.error}`);
  assert(res1.steps.length >= 4, `Expected at least 4 steps, got ${res1.steps.length}`);
  
  // Verify step fields
  const firstStep = res1.steps[0];
  assert(typeof firstStep.line === 'number', 'Step line should be number');
  assert(['line', 'call'].includes(firstStep.event), 'Initial event should be call or line');
  assert(firstStep.callStack.length >= 1, 'Call stack should have active frame');
  
  // Verify heap and variables in later steps
  const laterStep = res1.steps.find((s) => s.variables.seen && s.variables.i !== undefined);
  assert(laterStep, 'Should find a step where "seen" and "i" are present in variables');
  assert.strictEqual(laterStep.variables.i.type, 'int');
  assert(laterStep.heap !== undefined, 'Heap dictionary should be populated');

  // Verify return value
  const returnStep = res1.steps.find((s) => s.event === 'return');
  assert(returnStep, 'Should have a return event');
  console.log(`✓ Test 1 passed: ${res1.steps.length} discrete steps captured with exact locals & heap.`);

  // Test 2: Recursive Call Stack (Factorial / DFS simulation)
  console.log('\n[Test 2] Tracing Recursive Call Stack Depth...');
  const recCode = `
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
`.trim();

  const res2 = await executeTrace({
    code: recCode,
    language: 'python',
    input: '3',
    functionNameHint: 'factorial',
  });

  assert.strictEqual(res2.success, true, `Factorial trace failed: ${res2.error}`);
  const maxStackDepth = Math.max(...res2.steps.map((s) => s.callStack.length));
  assert(maxStackDepth >= 3, `Expected call stack depth >= 3, got ${maxStackDepth}`);
  console.log(`✓ Test 2 passed: Call stack depth ${maxStackDepth} verified for recursive frames.`);

  // Test 3: Runtime Error Capturing (IndexError)
  console.log('\n[Test 3] Tracing Runtime Crash (IndexError on Out of Bounds)...');
  const crashCode = `
def out_of_bounds(arr):
    x = arr[0]
    y = arr[50] # crashes here
    return x + y
`.trim();

  const res3 = await executeTrace({
    code: crashCode,
    language: 'python',
    input: '[1, 2, 3]',
  });

  assert.strictEqual(res3.success, false, 'Expected execution to fail on IndexError');
  assert(res3.error && res3.error.includes('IndexError'), `Expected IndexError, got ${res3.error}`);
  assert(res3.steps.length > 0, 'Steps prior to exception should be captured');
  console.log(`✓ Test 3 passed: ${res3.steps.length} steps recorded before clean exception capture.`);

  // Test 4: Syntax Error
  console.log('\n[Test 4] Tracing Syntax Error Handling...');
  const badSyntaxCode = `
def broken_fn(:
    return 42
`.trim();

  const res4 = await executeTrace({
    code: badSyntaxCode,
    language: 'python',
  });

  assert.strictEqual(res4.success, false, 'Expected syntax error failure');
  assert(res4.error && res4.error.includes('SyntaxError'), `Expected SyntaxError, got ${res4.error}`);
  assert.strictEqual(res4.steps.length, 0, 'No steps for uncompilable code');
  console.log('✓ Test 4 passed: SyntaxError caught without crashing.');

  console.log('\n🎉 ALL DETERMINISTIC VISUAL TRACER TESTS PASSED SUCCESSFULLY!\n');
}

runTests().catch((err) => {
  console.error('Tracer test failed:', err);
  process.exit(1);
});
