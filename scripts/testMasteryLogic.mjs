import {
  getAllMasteryProblems,
  getMasteryProblemBySlug,
  getProblemsGroupedByPattern,
  getNextAndPrevProblem,
  SUPPORTED_PATTERNS,
} from '../src/lib/mastery/catalog.ts';

console.log('Running Pattern Mastery automated logic tests...');

const all = getAllMasteryProblems();
if (all.length !== 25) {
  throw new Error(`Expected 25 problems, got ${all.length}`);
}
console.log('✓ Exactly 25 problems loaded');

const grouped = getProblemsGroupedByPattern();
for (const pat of SUPPORTED_PATTERNS) {
  const problems = grouped[pat];
  if (!problems || problems.length !== 5) {
    throw new Error(`Pattern ${pat} expected 5 problems, got ${problems?.length}`);
  }
}
console.log('✓ All 5 patterns have exactly 5 blueprints');

// Test slug lookup
for (const p of all) {
  const bySlug = getMasteryProblemBySlug(p.slug);
  if (!bySlug || bySlug.id !== p.id) {
    throw new Error(`Failed to resolve problem by slug: ${p.slug}`);
  }
  const byId = getMasteryProblemBySlug(p.id);
  if (!byId || byId.id !== p.id) {
    throw new Error(`Failed to resolve problem by id: ${p.id}`);
  }
}
console.log('✓ All 25 problems resolve by both slug and id');

// Test next and prev
const first = getNextAndPrevProblem('tp-001');
if (first.prev !== undefined || !first.next || first.next.id !== 'tp-002') {
  throw new Error('First problem next/prev link incorrect');
}

const last = getNextAndPrevProblem('bfs-005');
if (!last.prev || last.prev.id !== 'bfs-004' || last.next !== undefined) {
  throw new Error('Last problem next/prev link incorrect');
}
console.log('✓ Next and Previous navigation links verified');

console.log('🎉 All 4/4 automated tests passed cleanly!');
