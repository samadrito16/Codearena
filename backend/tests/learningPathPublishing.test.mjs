import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { once } from 'node:events';
import express from 'express';

assert.ok(process.env.CONTENT_TEST_DATABASE_URL, 'Use an isolated PostgreSQL database for this test.');
process.env.DATABASE_URL = process.env.CONTENT_TEST_DATABASE_URL;
const { adminLearningPathRouter, learningPathRouter } = await import('../dist/routes/learningPathRoutes.js');
const { errorHandler } = await import('../dist/middleware/errorHandler.js');
const { contentDatabase } = await import('../dist/db/prisma.js');

const app = express();
app.use(express.json());
app.use((req, _res, next) => {
  const role = req.get('Test-Role');
  if (role) req.user = { id: 'publishing-test', role };
  next();
});
app.use('/admin', adminLearningPathRouter);
app.use('/public', learningPathRouter);
app.use(errorHandler);
const server = app.listen(0, '127.0.0.1');
await once(server, 'listening');
const base = `http://127.0.0.1:${server.address().port}`;
const id = `learning-path-test-${randomUUID()}`;
const path = {
  id, order: 1, title: 'Publishing test', subtitle: 'Subtitle', description: 'Description',
  topics: ['Arrays'], estimatedHours: '1 hr', accent: 'a',
  modules: [{ id: 'module-a', order: 1, title: 'Module A', summary: 'Summary', concepts: [], problemIds: ['move-zeroes'], topicTags: [] }],
};
const request = (route, role, body) => fetch(base + route, {
  headers: { ...(role && { 'Test-Role': role }), ...(body && { 'Content-Type': 'application/json' }) },
  ...(body && { method: 'POST', body: JSON.stringify(body) }),
});
const change = (action, expectedVersion, fields = {}) => request(`/admin/${id}`, 'admin', { action, expectedVersion, ...fields });
const published = async () => {
  const response = await request('/public');
  assert.equal(response.status, 200);
  return response.json();
};
const publicPath = async () => (await published()).find(item => item.id === id);

try {
  const initial = await published();
  assert.equal(initial.filter(item => item.id === 'arrays').length, 1, 'The seed should produce one published record per path.');
  assert.equal((await request('/admin')).status, 401);
  assert.equal((await request('/admin', 'user')).status, 403);
  assert.equal((await change('save', 0, { body: path })).status, 204);
  assert.equal(await publicPath(), undefined);
  assert.equal((await change('publish', 1)).status, 204);
  assert.equal((await publicPath()).title, path.title);

  const [first, second] = await Promise.all([
    change('save', 2, { body: { ...path, title: 'Updated title A' } }),
    change('save', 2, { body: { ...path, title: 'Updated title B' } }),
  ]);
  assert.deepEqual([first.status, second.status].sort(), [204, 409]);
  assert.equal((await publicPath()).title, path.title);
  assert.equal((await change('archive', 3)).status, 204);
  assert.equal(await publicPath(), undefined);
  assert.equal((await change('restore', 4, { revision: 1 })).status, 204);
  assert.equal((await change('publish', 5)).status, 204);
  assert.deepEqual(await publicPath(), path);

  const history = await (await request(`/admin/${id}/history`, 'admin')).json();
  assert.deepEqual(history.revisions.map(item => item.number), [3, 2, 1]);
  assert.equal(history.events.length, 6);
} finally {
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  await contentDatabase().$disconnect();
}
