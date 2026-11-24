import assert from 'node:assert/strict';
import {
  addDays,
  applyReviewOutcome,
  computeItemStatus,
  createSpacedRepetitionItem,
  dismissReview,
  formatDateKey,
  formatReviewScheduleLabel,
  getDaysDifference,
  getSlowThreshold,
  getSpacedRepetitionSummary,
  isFailedOutcome,
  isSlowSolve,
  scanAndBackfillSpacedRepetition,
  snoozeReview,
  SPACED_INTERVALS_DAYS,
} from '../../src/lib/spacedRepetition';
import type { ActivityEvent, Problem, SubmissionRecord } from '../../src/types';
import type { SpacedRepetitionItem } from '../../src/types/spacedRepetition';

console.log('=== [PrismCode] Spaced Repetition (3, 7, 21 Days) Unit Tests ===\n');

// ─────────────────────────────────────────────────────────────
// Suite 1: Standard Spaced Intervals (3, 7, 21 Days) Progression
// ─────────────────────────────────────────────────────────────
console.log('[Suite 1: Standard Spaced Intervals (3, 7, 21 Days) Progression]');

const mockNow = new Date('2026-11-24T12:00:00.000Z');
const triggerTimestamp = '2026-11-20T12:00:00.000Z';

// 1. Initial creation (Stage 1 -> 3 days from trigger)
const item1 = createSpacedRepetitionItem({
  problemId: 'two-sum',
  problemTitle: 'Two Sum',
  reason: 'failed',
  triggerTimestamp,
  triggerDifficulty: 'Easy',
});

assert.equal(item1.stage, 1, 'Initial stage should be 1');
assert.equal(item1.nextReviewDate, addDays(new Date(triggerTimestamp), 3), 'Stage 1 nextReviewDate must be +3 days');
assert.equal(item1.isGraduated, false, 'Should not be graduated at start');
assert.equal(item1.failedSubmissionsCount, 1, 'Failed submissions count should be 1');
console.log('  ✓ Initial creation schedules Stage 1 (+3 days)');

// 2. Pass Stage 1 -> moves to Stage 2 (+7 days from review date)
const item2 = applyReviewOutcome(item1, 'passed', 300, 'Solved in 5 mins', mockNow);
assert.equal(item2.stage, 2, 'Stage should advance to 2');
assert.equal(item2.nextReviewDate, addDays(mockNow, 7), 'Stage 2 nextReviewDate must be +7 days from review');
assert.equal(item2.consecutiveSuccessfulReviews, 1, 'Consecutive successful reviews should be 1');
assert.equal(item2.reviewHistory.length, 1, 'Review history should contain 1 entry');
assert.equal(item2.reviewHistory[0].outcome, 'passed');
console.log('  ✓ Passing Stage 1 advances to Stage 2 (+7 days)');

// 3. Pass Stage 2 -> moves to Stage 3 (+21 days from review date)
const reviewDate2 = new Date('2026-12-01T12:00:00.000Z');
const item3 = applyReviewOutcome(item2, 'passed', 400, 'Solved smoothly', reviewDate2);
assert.equal(item3.stage, 3, 'Stage should advance to 3');
assert.equal(item3.nextReviewDate, addDays(reviewDate2, 21), 'Stage 3 nextReviewDate must be +21 days from review');
assert.equal(item3.consecutiveSuccessfulReviews, 2, 'Consecutive successful reviews should be 2');
console.log('  ✓ Passing Stage 2 advances to Stage 3 (+21 days)');

// 4. Pass Stage 3 -> Graduates (Mastered)
const reviewDate3 = new Date('2026-12-22T12:00:00.000Z');
const itemGraduated = applyReviewOutcome(item3, 'passed', 350, 'Mastered pattern', reviewDate3);
assert.equal(itemGraduated.isGraduated, true, 'Item should be graduated');
assert.equal(itemGraduated.status, 'graduated', 'Status should be graduated');
assert.equal(itemGraduated.consecutiveSuccessfulReviews, 3, 'Consecutive successful reviews should be 3');
console.log('  ✓ Passing Stage 3 graduates the problem to permanent mastery');

// ─────────────────────────────────────────────────────────────
// Suite 2: Regression on Review Failure or Slow Solve
// ─────────────────────────────────────────────────────────────
console.log('\n[Suite 2: Regression on Review Failure or Slow Solve]');

// Failing at Stage 2 resets to Stage 1 (+3 days)
const itemRegressedFailed = applyReviewOutcome(item2, 'failed', 1800, 'Failed test case 4', mockNow);
assert.equal(itemRegressedFailed.stage, 1, 'Failed review at Stage 2 should reset to Stage 1');
assert.equal(itemRegressedFailed.nextReviewDate, addDays(mockNow, 3), 'Regressed review must resurface in 3 days');
assert.equal(itemRegressedFailed.consecutiveSuccessfulReviews, 0, 'Consecutive reviews counter should reset to 0');
assert.equal(itemRegressedFailed.failedSubmissionsCount, 2, 'Failed count should increment');
console.log('  ✓ Failing review at Stage 2 resets to Stage 1 (+3 days)');

// Solving slowly at Stage 3 resets to Stage 1 (+3 days)
const itemRegressedSlow = applyReviewOutcome(item3, 'slow', 3600, 'Took 60m', mockNow);
assert.equal(itemRegressedSlow.stage, 1, 'Slow solve at Stage 3 should reset to Stage 1');
assert.equal(itemRegressedSlow.nextReviewDate, addDays(mockNow, 3), 'Slow solve must resurface in 3 days');
assert.equal(itemRegressedSlow.consecutiveSuccessfulReviews, 0, 'Consecutive reviews counter should reset to 0');
console.log('  ✓ Solving slowly at Stage 3 resets to Stage 1 (+3 days)');

// ─────────────────────────────────────────────────────────────
// Suite 3: Slow Solve Detection Benchmarks & Difficulty Thresholds
// ─────────────────────────────────────────────────────────────
console.log('\n[Suite 3: Slow Solve Detection Benchmarks]');

// Easy: 15 min (900s)
assert.equal(isSlowSolve(901, 'Easy'), true, 'Easy at 901s (>15m) is slow');
assert.equal(isSlowSolve(900, 'Easy'), false, 'Easy at 900s (15m) is not slow');
assert.equal(isSlowSolve(600, 'Easy'), false, 'Easy at 10m is not slow');

// Medium: 25 min (1500s)
assert.equal(isSlowSolve(1501, 'Medium'), true, 'Medium at 1501s (>25m) is slow');
assert.equal(isSlowSolve(1500, 'Medium'), false, 'Medium at 1500s (25m) is not slow');
assert.equal(isSlowSolve(1200, 'Medium'), false, 'Medium at 20m is not slow');

// Hard: 40 min (2400s)
assert.equal(isSlowSolve(2401, 'Hard'), true, 'Hard at 2401s (>40m) is slow');
assert.equal(isSlowSolve(2400, 'Hard'), false, 'Hard at 2400s (40m) is not slow');
assert.equal(isSlowSolve(1800, 'Hard'), false, 'Hard at 30m is not slow');

// Relative personal average threshold (>= 1.3x difficulty average)
assert.equal(isSlowSolve(1300, 'Medium', 1000), true, '1300s is slow when user average is 1000s (1.3x)');
assert.equal(isSlowSolve(1200, 'Medium', 1000), false, '1200s is not slow when user average is 1000s (<1.3x)');
console.log('  ✓ All difficulty-based and personal average slow solve thresholds accurately classified');

// ─────────────────────────────────────────────────────────────
// Suite 4: Failure Outcome Detection
// ─────────────────────────────────────────────────────────────
console.log('\n[Suite 4: Failure Outcome Detection]');

assert.equal(isFailedOutcome('wrong_answer'), true, 'wrong_answer is a failure');
assert.equal(isFailedOutcome('tle'), true, 'tle is a failure');
assert.equal(isFailedOutcome('runtime_error'), true, 'runtime_error is a failure');
assert.equal(isFailedOutcome('compilation_error'), true, 'compilation_error is a failure');
assert.equal(isFailedOutcome('accepted'), false, 'accepted is not a failure');
console.log('  ✓ All submission verdicts correctly classified for failure triggering');

// ─────────────────────────────────────────────────────────────
// Suite 5: Automated Historical Backfill from Progress Data
// ─────────────────────────────────────────────────────────────
console.log('\n[Suite 5: Automated Historical Backfill from Progress Data]');

const mockProblems: Problem[] = [
  { id: 'prob-fail', title: 'Problem Fail', difficulty: 'Medium', topics: ['Array'], acceptance: '50%', submissions: '100', description: '', examples: [], constraints: [] },
  { id: 'prob-slow', title: 'Problem Slow', difficulty: 'Hard', topics: ['DP'], acceptance: '40%', submissions: '50', description: '', examples: [], constraints: [] },
  { id: 'prob-fast', title: 'Problem Fast', difficulty: 'Easy', topics: ['Math'], acceptance: '80%', submissions: '200', description: '', examples: [], constraints: [] },
];
const problemsMap = new Map(mockProblems.map((p) => [p.id, p]));

const mockSubmissions: SubmissionRecord[] = [
  // 1. Failed 5 days ago (Nov 19)
  {
    id: 'sub-1',
    problemId: 'prob-fail',
    title: 'Problem Fail',
    difficulty: 'Medium',
    topics: ['Array'],
    outcome: 'wrong_answer',
    language: 'python',
    timestamp: '2026-11-19T10:00:00.000Z',
  },
  // 2. Solved slowly (50 min on Hard) 2 days ago (Nov 22)
  {
    id: 'sub-2',
    problemId: 'prob-slow',
    title: 'Problem Slow',
    difficulty: 'Hard',
    topics: ['DP'],
    outcome: 'accepted',
    durationSeconds: 3000, // 50m > 40m Hard threshold
    language: 'python',
    timestamp: '2026-11-22T10:00:00.000Z',
  },
  // 3. Solved quickly (8 min on Easy) 3 days ago (Nov 21)
  {
    id: 'sub-3',
    problemId: 'prob-fast',
    title: 'Problem Fast',
    difficulty: 'Easy',
    topics: ['Math'],
    outcome: 'accepted',
    durationSeconds: 480, // 8m < 15m threshold
    language: 'python',
    timestamp: '2026-11-21T10:00:00.000Z',
  },
];

const mockActivity: ActivityEvent[] = [];

const backfilled = scanAndBackfillSpacedRepetition(mockSubmissions, mockActivity, {}, problemsMap, mockNow);

// Verify prob-fail was scheduled
assert.ok(backfilled['prob-fail'], 'prob-fail should be scheduled from past failed submission');
assert.equal(backfilled['prob-fail'].reason, 'failed');
assert.equal(backfilled['prob-fail'].stage, 1);
assert.equal(backfilled['prob-fail'].nextReviewDate, addDays(new Date('2026-11-19T10:00:00.000Z'), 3)); // Nov 22

// Verify prob-slow was scheduled
assert.ok(backfilled['prob-slow'], 'prob-slow should be scheduled from past slow solve');
assert.equal(backfilled['prob-slow'].reason, 'solved_slowly');
assert.equal(backfilled['prob-slow'].stage, 1);
assert.equal(backfilled['prob-slow'].nextReviewDate, addDays(new Date('2026-11-22T10:00:00.000Z'), 3)); // Nov 25

// Verify prob-fast was NOT scheduled
assert.equal(backfilled['prob-fast'], undefined, 'prob-fast (solved quickly) should NOT be in spaced review queue');
console.log('  ✓ Past progress data automatically backfilled failed and slow problems with zero cold start');

// ─────────────────────────────────────────────────────────────
// Suite 6: Date and Schedule Status Calculations
// ─────────────────────────────────────────────────────────────
console.log('\n[Suite 6: Date and Schedule Status Calculations]');

// Today: 2026-11-24
// prob-fail nextReviewDate: 2026-11-22 (2 days ago -> overdue)
const statusFail = computeItemStatus(backfilled['prob-fail'], mockNow);
assert.equal(statusFail, 'overdue', 'Nov 22 review evaluated on Nov 24 should be overdue');
const labelFail = formatReviewScheduleLabel(backfilled['prob-fail'].nextReviewDate, mockNow);
assert.equal(labelFail.isOverdue, true);
assert.equal(labelFail.days, -2);
assert.equal(labelFail.label, 'Overdue by 2 days');

// prob-slow nextReviewDate: 2026-11-25 (tomorrow -> pending, due in 1 day)
const statusSlow = computeItemStatus(backfilled['prob-slow'], mockNow);
assert.equal(statusSlow, 'pending', 'Nov 25 review evaluated on Nov 24 should be pending');
const labelSlow = formatReviewScheduleLabel(backfilled['prob-slow'].nextReviewDate, mockNow);
assert.equal(labelSlow.isDueToday, false);
assert.equal(labelSlow.days, 1);
assert.equal(labelSlow.label, 'Due tomorrow');

// Item due today
const itemDueToday: SpacedRepetitionItem = {
  ...item1,
  nextReviewDate: formatDateKey(mockNow),
};
const statusToday = computeItemStatus(itemDueToday, mockNow);
assert.equal(statusToday, 'due', 'Review scheduled for today must have status due');
const labelToday = formatReviewScheduleLabel(itemDueToday.nextReviewDate, mockNow);
assert.equal(labelToday.isDueToday, true);
assert.equal(labelToday.label, 'Due today');
console.log('  ✓ Statuses (due, overdue, pending) and countdown labels computed with calendar precision');

// ─────────────────────────────────────────────────────────────
// Suite 7: Snooze & Dismiss Operations
// ─────────────────────────────────────────────────────────────
console.log('\n[Suite 7: Snooze & Dismiss Operations]');

const snoozed = snoozeReview(itemDueToday, 2, mockNow);
assert.equal(snoozed.nextReviewDate, addDays(mockNow, 2), 'Snooze by 2 days should add 2 days');
assert.equal(snoozed.status, 'pending', 'Snoozed item should become pending');

const dismissed = dismissReview(itemDueToday);
assert.equal(dismissed.dismissed, true, 'Dismissed item should have dismissed = true');
console.log('  ✓ Snooze and Dismiss actions execute properly');

// ─────────────────────────────────────────────────────────────
// Suite 8: Summary Aggregation & Retention Rate
// ─────────────────────────────────────────────────────────────
console.log('\n[Suite 8: Summary Aggregation & Retention Rate]');

const allItems: SpacedRepetitionItem[] = [
  backfilled['prob-fail'],   // overdue
  itemDueToday,              // due
  backfilled['prob-slow'],   // pending (tomorrow)
  itemGraduated,             // graduated
];

const summary = getSpacedRepetitionSummary(allItems, mockNow);
assert.equal(summary.totalTracked, 4, 'Total tracked should be 4');
assert.equal(summary.overdueCount, 1, 'Overdue count should be 1');
assert.equal(summary.dueNowCount, 2, 'Due now count should be 2 (1 due + 1 overdue)');
assert.equal(summary.upcomingCount, 1, 'Upcoming count should be 1');
assert.equal(summary.graduatedCount, 1, 'Graduated count should be 1');
assert.ok(summary.retentionRatePct > 0, 'Retention rate should be computed');
console.log('  ✓ Summary correctly aggregated: 2 due/overdue, 1 upcoming, 1 graduated');

console.log('\n=================================================');
console.log('ALL SPACED REPETITION TESTS PASSED (8/8 Suites)');
console.log('=================================================');
