import fs from 'fs';
import path from 'path';

const catalogPath = path.resolve('data/mastery/prism_code_first_25_problems.json');
const raw = fs.readFileSync(catalogPath, 'utf8');
const catalog = JSON.parse(raw);

let errors = 0;
const summary = [];

if (catalog.schema_version !== '1.1.0') {
  console.error(`Invalid schema_version: expected 1.1.0, got ${catalog.schema_version}`);
  errors++;
}

if (!Array.isArray(catalog.problems) || catalog.problems.length !== 25) {
  console.error(`Expected exactly 25 problems, got ${catalog.problems?.length}`);
  errors++;
}

for (const p of catalog.problems) {
  const lineCount = p.optimal_solution.code_lines.length;
  const highRiskLines = p.optimal_solution.code_lines.filter((l) => l.is_high_risk);
  const highRiskCount = highRiskLines.length;
  const ratio = (highRiskCount / lineCount) * 100;

  // Check 1: High risk coverage
  if (highRiskCount < 2 || ratio < 19 || ratio > 35) {
    console.error(`[${p.id}] High-risk coverage out of spec: ${highRiskCount}/${lineCount} (${ratio.toFixed(1)}%)`);
    errors++;
  }

  // Check 2: Subgoal range partition
  const subgoals = p.optimal_solution.subgoals;
  let currentExpectedStart = 1;
  for (let i = 0; i < subgoals.length; i++) {
    const [start, end] = subgoals[i].line_range;
    if (start !== currentExpectedStart) {
      console.error(`[${p.id}] Subgoal ${i} start mismatch: expected ${currentExpectedStart}, got ${start}`);
      errors++;
    }
    if (end < start || end > lineCount) {
      console.error(`[${p.id}] Subgoal ${i} end out of bounds: [${start}, ${end}] (max: ${lineCount})`);
      errors++;
    }
    currentExpectedStart = end + 1;
  }
  if (currentExpectedStart - 1 !== lineCount) {
    console.error(`[${p.id}] Subgoals do not cover all lines: covered up to ${currentExpectedStart - 1}, total lines: ${lineCount}`);
    errors++;
  }

  // Check 3: hardest_lines_to_test synced with high risk lines
  const hardestLineNums = p.hardest_lines_to_test.map((h) => h.line_number).sort((a, b) => a - b);
  const actualHighRiskNums = highRiskLines.map((h) => h.line_number).sort((a, b) => a - b);
  if (JSON.stringify(hardestLineNums) !== JSON.stringify(actualHighRiskNums)) {
    console.error(`[${p.id}] hardest_lines_to_test mismatch: ${JSON.stringify(hardestLineNums)} vs ${JSON.stringify(actualHighRiskNums)}`);
    errors++;
  }

  // Check 4: pattern_diagnosis_options
  if (!Array.isArray(p.pattern_diagnosis_options) || p.pattern_diagnosis_options.length !== 4) {
    console.error(`[${p.id}] pattern_diagnosis_options must have 4 options, got ${p.pattern_diagnosis_options?.length}`);
    errors++;
  } else if (!p.pattern_diagnosis_options.includes(p.pattern)) {
    console.error(`[${p.id}] pattern_diagnosis_options does not include correct pattern '${p.pattern}'`);
    errors++;
  }

  // Check 5: starter code and ai avoid keywords
  if (!p.starter_code || typeof p.starter_code !== 'string') {
    console.error(`[${p.id}] Missing starter_code`);
    errors++;
  }
  if (!Array.isArray(p.ai_avoid_keywords) || p.ai_avoid_keywords.length === 0) {
    console.error(`[${p.id}] Missing ai_avoid_keywords`);
    errors++;
  }

  // Check 6: No copy-paste sliding window test in non-sliding-window
  if (p.pattern !== 'sliding_window') {
    const hasCopyPaste = p.hardest_lines_to_test.some((h) =>
      h.recommended_tests?.some((t) => t.includes('A window that becomes valid'))
    );
    if (hasCopyPaste) {
      console.error(`[${p.id}] Contains copy-pasted sliding window test in ${p.pattern}`);
      errors++;
    }
  }

  summary.push({
    id: p.id,
    pattern: p.pattern,
    title: p.title,
    lines: lineCount,
    high_risk: `${highRiskCount} (${ratio.toFixed(1)}%)`,
    subgoals: subgoals.length,
    status: 'PASS',
  });
}

console.table(summary);
if (errors === 0) {
  console.log('\n✅ VALIDATION PASSED: All 25 problems pass 100% of schema and integrity checks with 0 errors.');
} else {
  console.error(`\n❌ VALIDATION FAILED: ${errors} errors detected.`);
  process.exit(1);
}
