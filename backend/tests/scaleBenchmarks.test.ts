import assert from 'node:assert/strict';
import { findCatalogProblem, publicQuestion } from '../src/data/questionCatalog.js';

for (const id of ['reverse-linked-list', 'warehouse-temperature-excursions', 'spreadsheet-postfix-formula-engine']) {
  const question = findCatalogProblem(id);
  assert.ok(question, id);
  assert.ok(question.testCases?.some(test => test.isHidden && test.input.length > 10_000), 'Missing scale input for ' + id);
  assert.ok(publicQuestion(question).testCases?.every(test => test.input.length < 10_000), 'Hidden scale fixture exposed: ' + id);
}
console.log('Server scale fixtures are present and private.');
