import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { buildBatchExecutionSource } from '../dist/services/execution/harnessBuilder.js';
import { getEntryPoint } from '../dist/data/questionCatalog.js';
import { compareOutputs, parseBatchCasesOutput } from '../dist/services/execution/outputNormalizer.js';

const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'));
const { pools } = read('../src/data/questionCatalog.json');
const tracks = read('../src/data/questionSections.json');
const placements = read('../src/data/placementCatalog.json');
const contests = read('../src/data/contests.json');
const mastery = read('../../data/mastery/prism_code_mastery_catalog.json');
const review = read('../../src/data/review/prism_review_scenarios.json');
const masteryTests = read('../src/data/masteryTests.json');
const learningPaths = readFileSync(new URL('../../src/data/learningPaths.ts', import.meta.url), 'utf8');
assert.deepEqual(new Set(mastery.problems.map(p => p.id)), new Set(tracks.mastery.map(p => p.id)));
assert.deepEqual(new Set(Object.keys(masteryTests)), new Set(tracks.mastery.map(p => p.id)));
assert.deepEqual(new Set(review.scenarios.map(p => p.id)), new Set(tracks.review.map(p => p.id)));
const practiceIds = new Set(pools.practice.map(p => p.id));
for (const [, refs] of learningPaths.matchAll(/problemIds: \[([^\]]*)\],/g)) {
  const ids = [...refs.matchAll(/'([^']+)'/g)].map(match => match[1]);
  assert.ok(ids.length && ids.every(id => practiceIds.has(id)), 'A learning module must reference published Practice questions');
}
const IDs = new Set();
const tasks = new Set();
const titles = new Set();
const prompts = new Set();
const fingerprint = value => value.normalize('NFKC').toLowerCase().replace(/[^a-z0-9]/g, '');
const languages = ['python', 'javascript', 'typescript', 'java', 'cpp', 'c', 'go', 'rust'];

function claim(id, taskKey) {
  assert.ok(id && !IDs.has(id), `Repeated question ID: ${id}`);
  assert.ok(taskKey && !tasks.has(taskKey), `Repeated underlying task: ${taskKey}`);
  IDs.add(id);
  tasks.add(taskKey);
}

assert.ok(pools.practice.length > 0 && pools.practice.length <= 100, 'Practice must have 1–100 questions');
assert.ok(pools.daily.some(p => p.difficulty === 'Easy'), 'Daily needs a beginner pool');
assert.ok(pools.interview.filter(p => p.difficulty === 'Medium').length >= 2);
assert.ok(pools.interview.some(p => p.difficulty === 'Hard'));

const questions = Object.values(pools).flat();
for (const [section, pool] of Object.entries(pools)) {
  for (const question of pool) {
    const { id, taskKey, owner, status, version, examples, testCases, starterCode, editorial } = question;
    claim(id, taskKey);
    const titleFingerprint = fingerprint(question.title);
    const promptFingerprint = fingerprint(question.description);
    assert.ok(!titles.has(titleFingerprint), 'Repeated title: ' + question.title);
    assert.ok(!prompts.has(promptFingerprint), 'Repeated prompt: ' + id);
    titles.add(titleFingerprint);
    prompts.add(promptFingerprint);
    assert.equal(owner, section, id);
    assert.equal(status, 'published', id);
    assert.ok(Number.isInteger(version) && version >= 1, id);
    assert.ok(question.description.trim() && question.constraints.length && question.topics.length, id);
    assert.ok(examples.length >= 2 && examples.every(e => e.input.trim() && e.output.trim() && e.explanation.trim()), id);
    assert.ok(languages.every(language => starterCode[language]?.trim()), id);
    assert.ok(editorial?.referenceCode?.code?.trim(), id);
    const samples = new Set(examples.map(example => example.input));
    assert.ok(testCases.some(test => test.isHidden && !samples.has(test.input)), 'Missing novel hidden case: ' + id);
    assert.ok(testCases.some(test => !test.isHidden), id);
    assert.ok(new Set(testCases.map(test => test.caseNumber)).size === testCases.length, id);
    assert.equal(new Set(testCases.map(test => test.input)).size, testCases.length, 'Duplicate fixture for ' + id);
    assert.ok(new Set(testCases.map(test => test.expected)).size > 1, `Constant output suite: ${id}`);
  }
}
for (const track of Object.values(tracks)) {
  for (const { id, taskKey } of track) claim(id, taskKey);
}

const assigned = new Set();
for (const assessment of placements) {
  const list = assessment.sections.flatMap(section => section.questions);
  assert.ok(list.length > 0);
  assert.equal(assessment.totalMarks, list.reduce((sum, q) => sum + q.marks, 0));
  assert.equal(assessment.totalDurationMinutes, assessment.sections.reduce((sum, s) => sum + s.durationMinutes, 0));
  for (const question of list) {
    assert.ok(!assigned.has(question.id), `Question used in multiple mock slots: ${question.id}`);
    assigned.add(question.id);
    if (question.type === 'coding') {
      assert.ok(pools.placement.some(p => p.id === question.problemId), question.id);
    } else {
      claim(question.id, question.id);
      assert.equal(question.options.filter(option => option.id === question.correctOptionId).length, 1);
      assert.ok(question.explanation.summary.trim());
    }
  }
}
for (const contest of contests) {
  assert.equal(contest.problems.length, 4, contest.id);
  for (const slot of contest.problems) {
    assert.ok(!assigned.has(slot.problemId), slot.problemId);
    assigned.add(slot.problemId);
    assert.ok(pools.contest.some(p => p.id === slot.problemId), slot.problemId);
  }
}
assert.ok([...pools.placement, ...pools.contest].every(p => assigned.has(p.id)), 'Unassigned assessment question');

if (process.argv.includes('--references')) {
  const failed = [];
  const references = questions.flatMap(p => [
    { p, ...p.editorial.referenceCode },
    ...(p.references?.javascript ? [{ p, language: 'javascript', code: p.references.javascript }] : []),
  ]);
  for (const blueprint of mastery.problems) {
    references.push({
      p: { id: blueprint.id, ...masteryTests[blueprint.id] },
      language: 'python',
      code: blueprint.optimal_solution.code,
    });
  }
  for (const { p, language, code } of references) {
    const lang = language.toLowerCase();
    assert.ok(lang === 'python' || lang === 'javascript', `Unsupported reference runtime: ${language}`);
    const cases = [...p.testCases, ...p.examples.map((ex, i) => ({
      caseNumber: 1000 + i, input: ex.input, expected: ex.output,
    }))];
    const wrapped = buildBatchExecutionSource(lang, code, cases, { functionNameHint: getEntryPoint(p, lang) });
    const program = lang === 'python' ? process.env.PRISMCODE_PYTHON || 'python' : process.execPath;
    const result = spawnSync(program, lang === 'python' ? ['-c', wrapped.code] : ['--input-type=commonjs', '-e', wrapped.code], {
      input: wrapped.stdin, encoding: 'utf8', timeout: 5000, windowsHide: true,
    });
    const results = parseBatchCasesOutput(result.stdout || '');
    const wrong = cases.filter(test => {
      const actual = results.get(test.caseNumber);
      return actual?.error || !actual || !compareOutputs(test.expected, actual.resultValue ?? '', Boolean(p.orderInvariant));
    });
    if (result.status !== 0 || wrong.length) failed.push({
      id: p.id, error: (result.error?.message || result.stderr || '').slice(0, 120),
      cases: wrong.map(test => ({
        number: test.caseNumber,
        actual: (results.get(test.caseNumber)?.error?.split('\n').at(-1) || results.get(test.caseNumber)?.resultValue || '').slice(0, 120),
        expected: test.expected.slice(0, 80),
      })),
    });
  }
  for (const item of failed) console.error(item.id, item.error, JSON.stringify(item.cases.slice(0, 2)));
  assert.equal(failed.length, 0, 'One or more reference solutions failed.');
}
console.log(`Verified ${questions.length} coding questions, ${mastery.problems.length} Mastery blueprints, ${placements.length} placement mocks, and ${contests.length} contest sets.`);
