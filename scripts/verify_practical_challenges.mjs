import { PRACTICAL_CHALLENGES } from '../src/data/practical/canonicalChallenges.ts';

console.log(`\n========================================`);
console.log(`PRISMCODE PRACTICAL CHALLENGES VERIFICATION`);
console.log(`========================================\n`);

console.log(`Total challenges loaded: ${PRACTICAL_CHALLENGES.length}`);
if (PRACTICAL_CHALLENGES.length === 0) throw new Error('No published practical challenges');

const seenIds = new Set();
const seenSlugs = new Set();
const trackCounts = { frontend_ui: 0, backend_api: 0, sql_pipeline: 0 };

for (const ch of PRACTICAL_CHALLENGES) {
  if (seenIds.has(ch.id)) {
    console.error(`FAIL: Duplicate challenge ID: ${ch.id}`);
    process.exit(1);
  }
  seenIds.add(ch.id);

  if (seenSlugs.has(ch.slug)) {
    console.error(`FAIL: Duplicate challenge slug: ${ch.slug}`);
    process.exit(1);
  }
  seenSlugs.add(ch.slug);

  if (!trackCounts[ch.track] && trackCounts[ch.track] !== 0) {
    console.error(`FAIL: Invalid track: ${ch.track} in ${ch.id}`);
    process.exit(1);
  }
  trackCounts[ch.track]++;

  if (!ch.files || ch.files.length === 0) {
    console.error(`FAIL: No starter files for ${ch.id}`);
    process.exit(1);
  }
  if (!ch.testCases || ch.testCases.length === 0) {
    console.error(`FAIL: No test cases for ${ch.id}`);
    process.exit(1);
  }
  if (!ch.testRunnerScript) {
    console.error(`FAIL: Missing testRunnerScript for ${ch.id}`);
    process.exit(1);
  }
  if (!ch.solutionFiles || ch.solutionFiles.length === 0) {
    console.error(`FAIL: No solution files for ${ch.id}`);
    process.exit(1);
  }
  if (!ch.editorialMarkdown || ch.editorialMarkdown.length < 50) {
    console.error(`FAIL: Insufficient editorial markdown for ${ch.id}`);
    process.exit(1);
  }

  console.log(`✓ [${ch.track}] ${ch.id} (${ch.difficulty}) - ${ch.testCases.length} tests`);
}

console.log('\nTrack Distribution:');
console.log(`- Frontend UI: ${trackCounts.frontend_ui}`);
console.log(`- Backend APIs: ${trackCounts.backend_api}`);
console.log(`- SQL & Pipelines: ${trackCounts.sql_pipeline}`);

if (Object.values(trackCounts).some(count => count < 1)) {
  console.error('FAIL: Track distribution mismatch');
  process.exit(1);
}

console.log('\nALL PUBLISHED PRACTICAL CHALLENGES VERIFIED SUCCESSFULLY!\n');
