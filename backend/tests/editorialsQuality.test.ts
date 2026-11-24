import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(backendDir, '..');

console.log('=== [PrismCode] Editorial Ladder & Reference Code Quality Tests ===\n');

// 1. Audit backend/data/db.json
const dbPath = path.resolve(backendDir, 'data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('[Suite 1: Validating backend/data/db.json Editorials]');
assert.strictEqual(db.problems.length, 408, 'db.json must contain 408 problems');

let countWithEd = 0;
for (const p of db.problems) {
  assert.ok(p.editorial, `Problem ${p.id} (${p.title}) must have an editorial`);
  countWithEd++;

  const ed = p.editorial;
  // Check isStaticDemo
  assert.strictEqual(
    ed.isStaticDemo,
    false,
    `Problem ${p.id} must have isStaticDemo: false, got ${ed.isStaticDemo}`
  );

  // Check 3-step hint ladder
  assert.ok(Array.isArray(ed.hints), `Problem ${p.id} hints must be an array`);
  assert.strictEqual(
    ed.hints.length,
    3,
    `Problem ${p.id} must have exactly 3 progressive hints in ladder, found ${ed.hints.length}`
  );
  for (let i = 0; i < 3; i++) {
    assert.ok(
      typeof ed.hints[i] === 'string' && ed.hints[i].length >= 15,
      `Problem ${p.id} hint ${i + 1} must be substantial (>15 chars), got: "${ed.hints[i]}"`
    );
  }

  // Check referenceCode
  assert.ok(ed.referenceCode, `Problem ${p.id} must include referenceCode`);
  assert.ok(
    typeof ed.referenceCode.language === 'string' && ed.referenceCode.language.length > 0,
    `Problem ${p.id} referenceCode language must be specified`
  );
  assert.ok(
    typeof ed.referenceCode.code === 'string' && ed.referenceCode.code.trim().length >= 15,
    `Problem ${p.id} referenceCode must contain substantial code, got: "${ed.referenceCode.code}"`
  );

  // Check walkthrough fields
  assert.ok(typeof ed.summary === 'string' && ed.summary.length > 0, `Problem ${p.id} summary missing`);
  assert.ok(typeof ed.approachTitle === 'string' && ed.approachTitle.length > 0, `Problem ${p.id} approachTitle missing`);
  assert.ok(Array.isArray(ed.approachSteps) && ed.approachSteps.length > 0, `Problem ${p.id} approachSteps missing`);
  assert.ok(typeof ed.timeComplexity === 'string' && ed.timeComplexity.length > 0, `Problem ${p.id} timeComplexity missing`);
  assert.ok(typeof ed.spaceComplexity === 'string' && ed.spaceComplexity.length > 0, `Problem ${p.id} spaceComplexity missing`);
  assert.ok(Array.isArray(ed.pitfalls) && ed.pitfalls.length > 0, `Problem ${p.id} pitfalls missing`);
}
console.log(`  ✓ All ${countWithEd}/408 problems in db.json have 3-step hint ladders, valid reference code, and isStaticDemo: false.\n`);

// 2. Audit backend/src/data/editorials.ts (via dynamic import)
console.log('[Suite 2: Validating backend/src/data/editorials.ts Catalog]');
const editorialsModule = await import('../dist/data/editorials.js');
const staticEditorials = editorialsModule.staticEditorials;
const edKeys = Object.keys(staticEditorials);

assert.strictEqual(edKeys.length, 408, 'staticEditorials must contain 408 entries');

for (const id of edKeys) {
  const ed = staticEditorials[id];
  assert.strictEqual(ed.isStaticDemo, false, `Editorial ${id} must have isStaticDemo: false`);
  assert.strictEqual(ed.hints.length, 3, `Editorial ${id} must have 3-step hint ladder`);
  assert.ok(ed.referenceCode && ed.referenceCode.code.length >= 15, `Editorial ${id} must have referenceCode`);
}
console.log(`  ✓ All ${edKeys.length}/408 static editorials in backend verified: 3-step ladder, reference code, isStaticDemo: false.\n`);

// 3. Audit src/data/problems.ts
console.log('[Suite 3: Validating src/data/problems.ts Frontend Synchronization]');
const frontendProblemsRaw = fs.readFileSync(path.resolve(repoRoot, 'src/data/problems.ts'), 'utf8');

// Verify no "isStaticDemo": true exists in file
const trueDemoMatches = frontendProblemsRaw.match(/"isStaticDemo"\s*:\s*true/g);
assert.strictEqual(
  trueDemoMatches,
  null,
  `src/data/problems.ts must not contain "isStaticDemo": true, found ${trueDemoMatches?.length || 0} occurrences`
);

// Verify 408 "isStaticDemo": false occurrences
const falseDemoMatches = frontendProblemsRaw.match(/"isStaticDemo"\s*:\s*false/g);
assert.strictEqual(
  falseDemoMatches?.length,
  408,
  `src/data/problems.ts must contain 408 "isStaticDemo": false, found ${falseDemoMatches?.length || 0}`
);
console.log(`  ✓ src/data/problems.ts synchronized: 408 problems verified with isStaticDemo: false.\n`);

// 4. Verify canonical free access problem ('two-sum') on editorial routes
console.log('[Suite 4: Verifying Free Problem Editorial Route Logic]');
import { getProblemEditorial } from '../dist/data/editorials.js';

const twoSumEd = getProblemEditorial('two-sum');
assert.ok(twoSumEd, 'two-sum editorial must exist');
assert.strictEqual(twoSumEd.problemId, 'two-sum');
assert.strictEqual(twoSumEd.hints.length, 3, 'two-sum must have 3-step hint ladder');
assert.strictEqual(twoSumEd.isStaticDemo, false, 'two-sum must have isStaticDemo: false');
console.log(`  ✓ two-sum verified as accessible free demo problem with complete editorial.\n`);

console.log('================================================================');
console.log('ALL EDITORIAL QUALITY & 3-STEP LADDER TESTS PASSED SUCCESSFULLY!');
console.log('================================================================');
