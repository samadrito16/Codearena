import assert from 'node:assert';
import { db } from '../src/db/database.js';

async function runContestsAndCollegeTests() {
  console.log('=== [PrismCode] Weekly Contests & College Leaderboards Unit Tests ===\n');

  await db.init();

  // Test Suite 1: Contests Catalog & Status Resolution
  console.log('[Suite 1: Contests Catalog & Dynamic Status Resolution]');
  const contests = db.getContests();
  assert(Array.isArray(contests), 'db.getContests() should return an array');
  assert(contests.length >= 3, 'Should have at least 3 seeded weekly contests');

  const wc42 = contests.find((c) => c.id === 'weekly-contest-42');
  assert(wc42, 'Weekly Contest 42 should exist');
  assert.strictEqual(wc42.problems.length, 4, 'Each weekly contest must have exactly 4 graded problems');
  assert.strictEqual(wc42.durationMinutes, 2880, 'Weekly contest duration must be 2 days / 48 hours for Saturday & Sunday');
  assert.strictEqual(wc42.participantsCount, undefined, 'Must not show fake participant numbers before entering');

  console.log(`  ✓ Loaded ${contests.length} weekly contests (WC-40, WC-41, WC-42)`);
  console.log(`  ✓ WC-42 weekend window verified: 48 hours / 2 days (Saturday & Sunday)`);
  console.log(`  ✓ Confirmed 0 fake data: no mock participant numbers before entering`);

  // Test Suite 2: Contest Standings & Scoring (No Time Penalty for Wrong Answers)
  console.log('\n[Suite 2: Contest Standings & Student-Friendly Scoring (Zero Penalty Rule)]');
  const standings = db.getContestStandings('weekly-contest-41');
  assert(standings.length >= 5, 'Should have participants in contest standings');

  // Verify rank ordering: score desc, solve time asc
  for (let i = 0; i < standings.length - 1; i++) {
    const current = standings[i];
    const next = standings[i + 1];
    assert(
      current.totalScore > next.totalScore ||
      (current.totalScore === next.totalScore && current.totalTimeMinutes <= next.totalTimeMinutes),
      `Standings must be sorted by score desc, then pure elapsed solve time asc (Rank ${i + 1} vs ${i + 2})`
    );
    assert.strictEqual(current.rank, i + 1, `Rank index should be contiguous 1-based`);
  }

  // Verify Zero Time Penalty Rule:
  // Contestant 1 (Aarav) had 4 wrong attempts across problems, but totalTimeMinutes is exactly 44 (the pure solve time of Q4)
  const topContestant = standings[0];
  assert.strictEqual(topContestant.totalTimeMinutes, 44, 'Total time must reflect pure elapsed solve time, without penalty additions');
  console.log(`  ✓ Scoreboard verified: Ranked by totalScore DESC, totalTimeMinutes ASC`);
  console.log(`  ✓ Confirmed student-friendly rule: 0 penalty time added for rejected submissions`);

  // Test Suite 3: Campus Standings & College Filtering
  console.log('\n[Suite 3: Campus Standings & College-Specific Contest Filters]');
  const bitsStandings = db.getContestStandings('weekly-contest-41', 'BITS Pilani');
  assert(bitsStandings.length > 0, 'Should find BITS Pilani contestants');
  assert(bitsStandings.every((s) => s.university === 'BITS Pilani'), 'All filtered entries must match BITS Pilani');
  assert.strictEqual(bitsStandings[0].rank, 1, 'College-specific standings must re-index ranks starting at 1');
  console.log(`  ✓ Filtered to BITS Pilani: ${bitsStandings.length} participant(s), re-indexed to Rank 1`);

  // Test Suite 4: College Leaderboard & Campus Cup Aggregation
  console.log('\n[Suite 4: Campus Cup (College Leaderboard) Aggregation]');
  const collegeLeaderboard = db.getCollegeLeaderboard();
  assert(Array.isArray(collegeLeaderboard), 'College leaderboard must return an array');
  assert(collegeLeaderboard.length >= 5, 'Should have multiple colleges competing in Campus Cup');

  for (let i = 0; i < collegeLeaderboard.length - 1; i++) {
    const a = collegeLeaderboard[i];
    const b = collegeLeaderboard[i + 1];
    assert(a.totalPoints >= b.totalPoints, `Colleges must be sorted by total points descending (${a.collegeName} vs ${b.collegeName})`);
    assert.strictEqual(a.rank, i + 1, 'College ranks must be 1-based');
    assert(a.studentCount > 0, 'Each college must have active student count');
    assert(a.topStudent && a.topStudent.name, 'Each college must show its top representative student');
  }

  console.log(`  ✓ Campus Cup verified: ${collegeLeaderboard.length} colleges ranked by aggregate points`);
  console.log(`  ✓ #1 College: "${collegeLeaderboard[0].collegeName}" with ${collegeLeaderboard[0].totalPoints} pts (Top student: ${collegeLeaderboard[0].topStudent.name})`);

  // Test Suite 5: Intra-College Student Leaderboard
  console.log('\n[Suite 5: Intra-College Student Rankings]');
  const iitbStudents = db.getCollegeStudentsLeaderboard('IIT Bombay');
  assert(Array.isArray(iitbStudents), 'Should return students list for IIT Bombay');
  assert(iitbStudents.length > 0, 'Should have students listed for IIT Bombay');
  assert.strictEqual(iitbStudents[0].rank, 1, 'Top intra-college student must be rank 1');
  console.log(`  ✓ Intra-college leaderboard verified for "IIT Bombay"`);

  // Test Suite 6: Live Contest Submission Ledger & Zero Penalty Verification
  console.log('\n[Suite 6: Recording Live Contest Submissions]');
  const testUserId = 'test_contestant_campus_01';
  // 1. Submit wrong answer
  const sub1 = db.recordContestSubmission('weekly-contest-42', testUserId, 'wc42-q1', false, 5);
  assert.strictEqual(sub1.totalScore, 0, 'Score should be 0 before any accepted solution');
  assert.strictEqual(sub1.problemResults['wc42-q1'].wrongAttempts, 1, 'Wrong attempts should increment to 1');
  assert.strictEqual(sub1.totalTimeMinutes, 0, 'Total time should remain 0 minutes on wrong attempt (NO penalty applied)');

  // 2. Submit accepted answer at 12 minutes
  const sub2 = db.recordContestSubmission('weekly-contest-42', testUserId, 'wc42-q1', true, 12);
  assert.strictEqual(sub2.totalScore, 300, 'Score should increase by problem point value (300 pts)');
  assert.strictEqual(sub2.problemResults['wc42-q1'].status, 'accepted');
  assert.strictEqual(sub2.totalTimeMinutes, 12, 'Total time must equal pure elapsed solve time (12m), zero penalty added');
  console.log(`  ✓ Live submission flow verified: Accepted solution earns points with pure elapsed time (12m)`);

  console.log('\n================================================================');
  console.log('ALL WEEKLY CONTESTS & COLLEGE LEADERBOARDS TESTS PASSED (6/6)');
  console.log('================================================================\n');
}

runContestsAndCollegeTests().catch((err) => {
  console.error('Test failure:', err);
  process.exit(1);
});
