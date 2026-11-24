import fs from 'node:fs';
import path from 'node:path';
import { getTwoPointersProblems } from './two_pointers.mjs';
import { getSlidingWindowProblems } from './sliding_window.mjs';
import { getHashMapsProblems } from './hash_maps.mjs';
import { getDynamicProgrammingProblems } from './dynamic_programming.mjs';
import { getBreadthFirstSearchProblems } from './breadth_first_search.mjs';

console.log('=== Building 100+ Mastery Problem Catalog & Verifying Zero Collisions ===\n');

// 1. Collect all problems
const tp = getTwoPointersProblems();
const sw = getSlidingWindowProblems();
const hm = getHashMapsProblems();
const dp = getDynamicProgrammingProblems();
const bfs = getBreadthFirstSearchProblems();

const allMastery = [...tp, ...sw, ...hm, ...dp, ...bfs];
console.log(`Generated total of ${allMastery.length} Mastery problems:`);
console.log(`  - Two Pointers: ${tp.length}`);
console.log(`  - Sliding Window: ${sw.length}`);
console.log(`  - Hash Maps & Sets: ${hm.length}`);
console.log(`  - Dynamic Programming: ${dp.length}`);
console.log(`  - Breadth-First Search: ${bfs.length}`);

if (allMastery.length < 100) {
  throw new Error(`Catalog count must be 100 or more, got ${allMastery.length}`);
}

// 2. Validate internal uniqueness
const idSet = new Set();
const slugSet = new Set();
const titleSet = new Set();

for (const p of allMastery) {
  if (idSet.has(p.id)) throw new Error(`Duplicate mastery ID: ${p.id}`);
  if (slugSet.has(p.slug)) throw new Error(`Duplicate mastery slug: ${p.slug}`);
  if (titleSet.has(p.title.toLowerCase())) throw new Error(`Duplicate mastery title: ${p.title}`);

  idSet.add(p.id);
  slugSet.add(p.slug);
  titleSet.add(p.title.toLowerCase());

  // Validate problem structure
  if (!p.statement.description || !p.statement.examples.length || !p.statement.constraints.length) {
    throw new Error(`Incomplete statement in problem ${p.id} (${p.title})`);
  }
  if (!p.optimal_solution.code || !p.optimal_solution.code_lines.length) {
    throw new Error(`Incomplete optimal solution in problem ${p.id} (${p.title})`);
  }
  if (!p.hardest_lines_to_test.length) {
    throw new Error(`Missing hardest lines in problem ${p.id} (${p.title})`);
  }
}
console.log('\n[PASS] Internal uniqueness and structural integrity verified for all 100 problems.');

// 3. Collision check against 408 normal questions
const normalData = JSON.parse(fs.readFileSync('backend/data/all_normal_problems_list.json', 'utf8'));
console.log(`\nVerifying 0 collisions against all ${normalData.length} normal problems in Codearena...`);

const collisions = [];

const normalTitles = new Map();
for (const np of normalData) {
  const normTitle = np.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  normalTitles.set(normTitle, np);
}

for (const mp of allMastery) {
  const normMTitle = mp.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (normalTitles.has(normMTitle)) {
    const matched = normalTitles.get(normMTitle);
    collisions.push({
      masteryId: mp.id,
      masteryTitle: mp.title,
      normalId: matched.id,
      normalTitle: matched.title,
    });
  }
}

if (collisions.length > 0) {
  console.error(`FAILED: Found ${collisions.length} collisions with normal problems:`);
  for (const c of collisions) {
    console.error(`  Mastery "${c.masteryTitle}" (${c.masteryId}) collides with Normal "${c.normalTitle}" (${c.normalId})`);
  }
  process.exit(1);
}

console.log('[PASS] ZERO collisions! None of the 100 Mastery problems match any normal problem on the website.');

// 4. Construct Catalog Schema
const fullCatalog = {
  schema_version: '2.0.0',
  catalog_id: 'prism_code_mastery_100',
  platform: 'PrismCode',
  title: 'PrismCode 100 Foundational Mastery Blueprints',
  description: '100 rigorously constructed algorithmic blueprints with subgoals, line-by-line pedagogical breakdown, hardest lines to test, and progressive hint ladders.',
  reference_language: 'python',
  supported_pattern_order: [
    'two_pointers',
    'sliding_window',
    'hash_maps',
    'dynamic_programming',
    'breadth_first_search',
  ],
  problems: allMastery,
};

// 5. Save to disk
const catalogPath = path.resolve('data/mastery/prism_code_mastery_catalog.json');
fs.writeFileSync(catalogPath, JSON.stringify(fullCatalog, null, 2), 'utf8');
console.log(`\nSuccessfully wrote full 100-problem catalog to ${catalogPath}`);

// Also update prism_code_first_25_problems.json for backward compatibility
const compatPath = path.resolve('data/mastery/prism_code_first_25_problems.json');
fs.writeFileSync(compatPath, JSON.stringify(fullCatalog, null, 2), 'utf8');
console.log(`Updated ${compatPath} with the expanded catalog.`);

console.log('\n================================');
console.log(`Catalog Build Successful: 100 Unique Mastery Blueprints Ready!`);
console.log('================================\n');
