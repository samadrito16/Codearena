import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Database } from '../src/db/database.js';

const temp = await mkdtemp(join(tmpdir(), 'prismcode-contest-test-'));
const db = new Database(join(temp, 'db.json'));
try {
  await db.init();
  const contest = db.getContests()[0];
  assert.ok(contest);
  assert.equal(contest.problems.length, 4);
  const [first, second] = contest.problems;
  assert.equal(db.getProblemForExecution(first.problemId)?.owner, 'contest');
  assert.equal(db.findProblemById(first.problemId), undefined);
  await assert.rejects(() => db.recordContestSubmission(contest.id, 'candidate', 'unknown', true, 1));
  const failed = await db.recordContestSubmission(contest.id, 'candidate', first.problemId, false, 5);
  assert.equal(failed.totalScore, 0);
  assert.equal(failed.totalTimeMinutes, 0);
  assert.equal(failed.problemResults[first.problemId].wrongAttempts, 1);

  const passed = await db.recordContestSubmission(contest.id, 'candidate', first.problemId, true, 12);
  assert.equal(passed.totalScore, first.points);
  await db.recordContestSubmission(contest.id, 'candidate', first.problemId, true, 14);
  assert.equal(passed.totalScore, first.points);
  await db.recordContestSubmission(contest.id, 'candidate', second.problemId, true, 18);
  assert.equal(passed.totalTimeMinutes, 18);
  assert.equal(passed.totalScore, first.points + second.points);
  console.log('Contest ownership, score accounting, and no-penalty rule verified.');
} finally {
  await rm(temp, { recursive: true, force: true });
}
