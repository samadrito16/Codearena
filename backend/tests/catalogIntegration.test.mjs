import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';

const temp = await mkdtemp(join(tmpdir(), 'prismcode-catalog-'));
process.env.DB_PATH = join(temp, 'db.json');
process.env.ONLINECOMPILER_API_KEY = '';
process.env.ALLOW_UNSAFE_LOCAL_EXECUTION = 'false';
const existing = {
  users: [{ id: 'legacy-user', name: 'Legacy User' }],
  progress: { 'legacy-user': { solvedIds: ['retired-question'], dailyCompletions: { old: 'retired-question' }, profile: { displayName: 'Kept' } } },
  problems: [{ id: 'retired-question' }],
  submissions: [{ problemId: 'retired-question' }],
  activity: [{ problemId: 'retired-question' }],
  contestStandings: { legacy: [{ totalScore: 300 }] },
};
await writeFile(process.env.DB_PATH, JSON.stringify(existing));

const [{ db }, { default: express }, { default: cookieParser }, { default: problemRoutes }, { catalogRouter }, { placementRouter }, { default: contestRoutes }, { default: submissions }, { errorHandler }] = await Promise.all([
  import('../dist/db/database.js'),
  import('express'),
  import('cookie-parser'),
  import('../dist/routes/problemRoutes.js'),
  import('../dist/routes/catalogRoutes.js'),
  import('../dist/routes/placementRoutes.js'),
  import('../dist/routes/contestRoutes.js'),
  import('../dist/routes/submissionRoutes.js'),
  import('../dist/middleware/errorHandler.js'),
]);

let server;
try {
  await db.init();
  const migrated = JSON.parse(await readFile(process.env.DB_PATH, 'utf8'));
  assert.equal(migrated.users[0].id, 'legacy-user');
  assert.deepEqual(migrated.progress['legacy-user'], { solvedIds: [], dailyCompletions: {}, profile: { displayName: 'Kept' } });
  assert.deepEqual(migrated.submissions, []);
  assert.deepEqual(migrated.activity, []);
  assert.deepEqual(migrated.contestStandings, {});
  assert.deepEqual(migrated.problems, []);

  const app = express();
  app.use(express.json(), cookieParser());
  app.use('/problems', problemRoutes);
  app.use('/catalog', catalogRouter);
  app.use('/placement', placementRouter);
  app.use('/contests', contestRoutes);
  app.use('/submissions', submissions);
  app.use(errorHandler);
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = 'http://127.0.0.1:' + server.address().port;
  let cookie = '';
  async function request(path, body) {
    const response = await fetch(base + path, {
      method: body === undefined ? 'GET' : 'POST',
      headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const nextCookie = response.headers.get('set-cookie');
    if (nextCookie) cookie = nextCookie.split(';')[0];
    return { status: response.status, data: await response.json().catch(() => null) };
  }

  const practice = (await request('/problems')).data;
  assert.ok(practice.length && practice.length <= 100);
  assert.ok(practice.every(p => p.owner === 'practice' && !p.editorial && p.testCases.every(t => !t.isHidden)));
  assert.equal((await request('/problems/retired-question')).status, 404);

  const day = new Date().toISOString().slice(0, 10);
  const body = { day, studiedIds: [practice.find(p => p.topics.includes('Array')).id] };
  const first = await request('/catalog/daily/assignment', body);
  const second = await request('/catalog/daily/assignment', { day });
  assert.equal(first.data.problem.id, second.data.problem.id);
  assert.equal(first.data.problem.owner, 'daily');
  assert.equal((await request('/problems/' + first.data.problem.id)).status, 404);
  assert.equal((await request('/catalog/daily/questions/' + first.data.problem.id)).status, 200);

  const round = await request('/catalog/interview/rounds', { preset: 'senior_technical' });
  const [medium, hard] = round.data.problems;
  assert.equal(round.status, 201);
  assert.equal(medium.difficulty, 'Medium');
  assert.equal(hard.difficulty, 'Hard');
  assert.ok([medium, hard].every(p => p.owner === 'interview' && !p.editorial && p.testCases.every(t => !t.isHidden)));
  assert.equal((await request('/submissions/submit', { problemId: medium.id, code: 'pass', language: 'python' })).status, 404);

  const mock = (await request('/placement')).data[0];
  const mcq = mock.sections.flatMap(section => section.questions).find(q => q.type === 'mcq');
  assert.equal(mcq.correctOptionId, '');
  assert.equal(mcq.explanation.summary, '');
  const grade = await request('/placement/' + mock.id + '/grade', {
    answers: { [mcq.id]: 'B' }, receipts: {}, startedAt: Date.now() - 1000, tabSwitchCount: 0,
  });
  assert.equal(grade.status, 200);
  assert.equal(grade.data.report.totalScore, mcq.marks);
  assert.equal((await request('/submissions/submit', {
    problemId: 'retired-question', code: 'pass', language: 'python', cases: [{ input: '0', expected: '0' }],
  })).status, 404);

  const coding = mock.sections.flatMap(section => section.questions).find(q => q.type === 'coding');
  const unavailable = await request('/submissions/submit', {
    problemId: coding.id, code: coding.starterCode.python, language: 'python',
  });
  assert.equal(unavailable.status, 503);
  assert.equal(unavailable.data.gradeReceipt, undefined);

  assert.equal((await request('/contests/weekly-contest-43/submit', { isAccepted: true })).status, 404);
  console.log('Catalog migration and HTTP checks passed.');
} finally {
  if (server) await new Promise(resolve => server.close(resolve));
  await rm(temp, { recursive: true, force: true });
}
