import assert from 'node:assert/strict';
import { getPool } from '../src/data/questionCatalog.js';

const aliases = new Set(['Arrays', 'Strings', 'Graphs', 'Trees', 'Hash Map', 'Hash Maps']);
for (const section of ['practice', 'daily', 'interview', 'placement', 'contest'] as const) {
  for (const problem of getPool(section)) {
    assert.ok(problem.topics.length > 0, problem.id);
    assert.equal(new Set(problem.topics).size, problem.topics.length, problem.id);
    assert.ok(problem.topics.every(topic => topic === topic.trim() && !aliases.has(topic)), problem.id);
  }
}

const topics = new Set(getPool('practice').flatMap(problem => problem.topics));
for (const topic of ['Array', 'String', 'Graph', 'Binary Tree', 'Dynamic Programming']) {
  assert.ok(topics.has(topic), 'Practice should cover ' + topic);
}
console.log('Published question topics verified.');
