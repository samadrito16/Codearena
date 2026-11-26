import { PRACTICAL_CHALLENGES } from '../src/data/practical/canonicalChallenges.ts';
import { executeChallengeTests } from '../src/lib/practical/domTestRunner.ts';

console.log(`\n========================================`);
console.log(`TESTING PRACTICAL SOLUTIONS & TEST RUNNERS`);
console.log(`========================================\n`);

let totalTested = 0;
let totalPassed = 0;

for (const ch of PRACTICAL_CHALLENGES) {
  if (ch.track === 'backend_api' || ch.track === 'sql_pipeline') {
    totalTested++;
    console.log(`Testing solution for [${ch.track}] ${ch.id}...`);

    try {
      const results = await executeChallengeTests(ch, ch.solutionFiles, null);
      let chPassed = true;
      for (const r of results) {
        if (!r.passed) {
          console.error(`  ✕ Test "${r.title}" failed: ${r.error || 'Assertion failed'} (expected: ${r.expected}, actual: ${r.actual})`);
          chPassed = false;
        } else {
          console.log(`  ✓ Test "${r.title}" passed`);
        }
      }

      if (chPassed) {
        totalPassed++;
        console.log(`  => ALL TESTS PASSED FOR ${ch.id}\n`);
      } else {
        console.error(`  => TESTS FAILED FOR ${ch.id}\n`);
        process.exit(1);
      }
    } catch (err) {
      console.error(`  ✕ Exception executing tests for ${ch.id}:`, err);
      process.exit(1);
    }
  }
}

console.log(`========================================`);
console.log(`Summary: ${totalPassed} / ${totalTested} Backend & SQL Challenges passed 100% of test assertions!`);
console.log(`========================================\n`);
