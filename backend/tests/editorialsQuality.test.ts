import assert from 'node:assert/strict';
import { getPool } from '../src/data/questionCatalog.js';
import { getProblemEditorial } from '../src/data/editorials.js';

for (const question of [...getPool('practice'), ...getPool('daily')]) {
  const editorial = getProblemEditorial(question.id);
  assert.ok(editorial, question.id + ' is missing its editorial');
  assert.equal(editorial.problemId, question.id);
  assert.ok(editorial.approachSteps.length > 0 && editorial.hints.length > 0, question.id);
  assert.ok(editorial.timeComplexity && editorial.spaceComplexity && editorial.referenceCode?.code, question.id);
}

for (const question of [...getPool('interview'), ...getPool('placement'), ...getPool('contest')]) {
  assert.equal(getProblemEditorial(question.id), null, 'Assessment answers must stay out of the editorial API');
}
console.log('Published editorials verified.');
