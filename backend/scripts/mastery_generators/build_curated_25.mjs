import fs from 'node:fs';
import path from 'node:path';
import { getCuratedTwoPointers } from './data_two_pointers.mjs';
import { getCuratedSlidingWindow } from './data_sliding_window.mjs';
import { getCuratedHashMaps } from './data_hash_maps.mjs';
import { getCuratedDynamicProgramming } from './data_dynamic_programming.mjs';
import { getCuratedBreadthFirstSearch } from './data_breadth_first_search.mjs';

console.log('=== Building Curated 25 Foundational Mastery Blueprints ===\\n');

const tp = getCuratedTwoPointers();
const sw = getCuratedSlidingWindow();
const hm = getCuratedHashMaps();
const dp = getCuratedDynamicProgramming();
const bfs = getCuratedBreadthFirstSearch();

const allProblems = [...tp, ...sw, ...hm, ...dp, ...bfs];

console.log(`Loaded ${allProblems.length} curated blueprints:`);
console.log(`  - Two Pointers: ${tp.length}`);
console.log(`  - Sliding Window: ${sw.length}`);
console.log(`  - Hash Maps: ${hm.length}`);
console.log(`  - Dynamic Programming: ${dp.length}`);
console.log(`  - Breadth-First Search: ${bfs.length}`);

if (allProblems.length !== 25) {
  throw new Error(`Expected exactly 25 blueprints, got ${allProblems.length}`);
}

// Validation Checks
const idSet = new Set();
const slugSet = new Set();
const titleSet = new Set();

for (const p of allProblems) {
  if (idSet.has(p.id)) throw new Error(`Duplicate ID: ${p.id}`);
  if (slugSet.has(p.slug)) throw new Error(`Duplicate slug: ${p.slug}`);
  if (titleSet.has(p.title)) throw new Error(`Duplicate title: ${p.title}`);
  idSet.add(p.id);
  slugSet.add(p.slug);
  titleSet.add(p.title);

  // Check statement
  if (!p.statement.examples || p.statement.examples.length < 2) {
    throw new Error(`Problem ${p.id} must have at least 2 examples`);
  }
  for (const ex of p.statement.examples) {
    if (ex.input.includes('Edge case input with boundary conditions') || ex.output.includes('Expected minimal')) {
      throw new Error(`Problem ${p.id} contains placeholder example text!`);
    }
  }

  // Check brute force
  if (!p.brute_force.code || p.brute_force.code.trim() === 'pass' || p.brute_force.code.includes('# Nested iteration checking all pairs\npass')) {
    throw new Error(`Problem ${p.id} contains placeholder brute force code!`);
  }

  // Check subgoals
  for (const sg of p.optimal_solution.subgoals) {
    if (p.pattern !== 'two_pointers' && sg.title.toLowerCase().includes('initialize pointers and boundary invariants')) {
      throw new Error(`Problem ${p.id} (${p.pattern}) has copy-pasted pointer subgoals!`);
    }
  }

  // Check line annotations
  for (const line of p.optimal_solution.code_lines) {
    if (line.code.trim() && line.why_this_line === line.code.trim()) {
      throw new Error(`Problem ${p.id} line ${line.line_number} why_this_line just repeats the code!`);
    }
  }
}

console.log('\\n[PASS] All structural, non-placeholder, and quality checks passed for all 25 blueprints.');

// Construct Catalog
const catalog = {
  schema_version: '2.0.0',
  catalog_id: 'prism_code_mastery_25',
  platform: 'PrismCode',
  title: 'PrismCode 25 Foundational Mastery Blueprints',
  description: '25 rigorously constructed algorithmic blueprints with subgoals, line-by-line pedagogical breakdown, verified executable brute force and optimal solutions, and progressive hints.',
  reference_language: 'python',
  supported_pattern_order: [
    'two_pointers',
    'sliding_window',
    'hash_maps',
    'dynamic_programming',
    'breadth_first_search'
  ],
  problems: allProblems
};

const mainCatalogPath = path.resolve('data/mastery/prism_code_mastery_catalog.json');
fs.writeFileSync(mainCatalogPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Wrote catalog to ${mainCatalogPath}`);

const first25Path = path.resolve('data/mastery/prism_code_first_25_problems.json');
fs.writeFileSync(first25Path, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Wrote catalog to ${first25Path}`);

console.log('\\n======================================================');
console.log('Build Succeeded: 25 Master-Quality Blueprints Ready!');
console.log('======================================================\\n');
