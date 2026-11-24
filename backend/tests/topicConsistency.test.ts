import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(backendDir, '..');

console.log('=== [PrismCode] Topic Consistency & De-duplication Tests ===\n');

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${msg}`);
    process.exit(1);
  }
}

// 1. Validate backend/data/db.json
console.log('[Suite 1: Validating backend/data/db.json Problem Topics]');
const dbPath = path.resolve(backendDir, 'data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const problems = db.problems || [];
assert(problems.length === 408, `Expected 408 problems in db.json, got ${problems.length}`);

const FORBIDDEN_VARIANTS = [
  'Arrays',
  'Graphs',
  'Strings',
  'Trees',
  'Breadth-First Search',
  'Depth-First Search'
];

let forbiddenCount = 0;
const topicFrequencies: Record<string, number> = {};

for (const p of problems) {
  const topics: string[] = p.topics || [];
  // Check duplicates
  const uniqueTopics = new Set(topics);
  assert(uniqueTopics.size === topics.length, `Problem "${p.id}" contains duplicate topics: ${JSON.stringify(topics)}`);

  for (const t of topics) {
    topicFrequencies[t] = (topicFrequencies[t] || 0) + 1;
    if (FORBIDDEN_VARIANTS.includes(t)) {
      forbiddenCount++;
      console.error(`Problem "${p.id}" has forbidden topic variant: "${t}"`);
    }
  }
}

assert(forbiddenCount === 0, `Found ${forbiddenCount} forbidden topic variants in db.json`);
console.log(`  ✓ 0 forbidden variants found across all ${problems.length} problems.`);

// Check unified counts
assert(topicFrequencies['Graph'] === 53, `Expected 53 "Graph" problems, got ${topicFrequencies['Graph']}`);
assert(topicFrequencies['Array'] === 118, `Expected 118 "Array" problems, got ${topicFrequencies['Array']}`);
assert(topicFrequencies['String'] === 94, `Expected 94 "String" problems, got ${topicFrequencies['String']}`);
assert(topicFrequencies['Tree'] === 14, `Expected 14 "Tree" problems, got ${topicFrequencies['Tree']}`);
assert(topicFrequencies['BFS'] === 40, `Expected 40 "BFS" problems, got ${topicFrequencies['BFS']}`);
console.log(`  ✓ Verified unified counts: Graph (53), Array (118), String (94), Tree (14), BFS (40).`);


// 2. Validate backend/src/db/seeds.ts
console.log('\n[Suite 2: Validating backend/src/db/seeds.ts]');
const seedsPath = path.resolve(backendDir, 'src/db/seeds.ts');
const seedsContent = fs.readFileSync(seedsPath, 'utf8');
for (const variant of FORBIDDEN_VARIANTS) {
  assert(!seedsContent.includes(`"${variant}"`), `seeds.ts still contains forbidden variant "${variant}"`);
}
console.log('  ✓ seeds.ts verified free of duplicated/split topic labels.');


// 3. Validate src/data/problems.ts
console.log('\n[Suite 3: Validating src/data/problems.ts Frontend Synchronization]');
const frontendProblemsPath = path.resolve(repoRoot, 'src/data/problems.ts');
const frontendContent = fs.readFileSync(frontendProblemsPath, 'utf8');
for (const variant of FORBIDDEN_VARIANTS) {
  assert(!frontendContent.includes(`"${variant}"`), `src/data/problems.ts still contains forbidden variant "${variant}"`);
}
console.log('  ✓ src/data/problems.ts verified synchronized with canonical topics.');


// 4. Validate Filter & Analytics Unification Mechanics
console.log('\n[Suite 4: Verifying Filter & Search Invariant Matching]');
// Simulating the Problem Arena filter logic
function matchesTopic(problemTopics: string[], filterTopic: string): boolean {
  if (filterTopic === 'All topics') return true;
  return problemTopics.some((t) => {
    if (t === filterTopic) return true;
    const normP = t.toLowerCase().replace(/s$/, '');
    const normF = filterTopic.toLowerCase().replace(/s$/, '');
    return normP === normF;
  });
}

const graphFiltered = problems.filter((p: any) => matchesTopic(p.topics, 'Graph'));
assert(graphFiltered.length === 53, `Expected filter "Graph" to match all 53 graph problems, got ${graphFiltered.length}`);

const graphsAliasFiltered = problems.filter((p: any) => matchesTopic(p.topics, 'Graphs'));
assert(graphsAliasFiltered.length === 53, `Expected filter "Graphs" alias to match all 53 graph problems, got ${graphsAliasFiltered.length}`);

const arrayFiltered = problems.filter((p: any) => matchesTopic(p.topics, 'Array'));
assert(arrayFiltered.length === 118, `Expected filter "Array" to match all 118 array problems, got ${arrayFiltered.length}`);

const arraysAliasFiltered = problems.filter((p: any) => matchesTopic(p.topics, 'Arrays'));
assert(arraysAliasFiltered.length === 118, `Expected filter "Arrays" alias to match all 118 array problems, got ${arraysAliasFiltered.length}`);

console.log('  ✓ Verified filter resolution: "Graph" & "Graphs" both match 53 problems without splitting.');
console.log('  ✓ Verified filter resolution: "Array" & "Arrays" both match 118 problems without splitting.');

console.log('\n================================================================');
console.log('ALL TOPIC CONSISTENCY & UNIFICATION TESTS PASSED SUCCESSFULLY!');
console.log('================================================================\n');
