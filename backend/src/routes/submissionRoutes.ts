import { Router, type Request, type Response, type NextFunction } from 'express';
import crypto from 'node:crypto';
import { z } from 'zod';
import { getEntryPoint } from '../data/questionCatalog.js';
import { db } from '../db/database.js';
import { requireAuth } from '../middleware/auth.js';
import { executionLimiter, dailyExecutionQuotaLimiter } from '../middleware/rateLimiter.js';
import type { SubmissionOutcome, SubmissionRecord } from '../types/index.js';
import { runTestCases, type TestCaseInput } from '../services/onlineCompilerService.js';
import { signPlacementGrade } from './placementRoutes.js';
import { canUseInterviewQuestion, getCatalogUser } from './catalogRoutes.js';
import { executeTrace } from '../services/execution/traceEngine.js';

const router = Router();

const runSchema = z.object({
  problemId: z.string().min(1).max(100),
  roundId: z.string().max(100).optional(),
  contestId: z.string().max(100).optional(),
  code: z.string().min(1, 'Code cannot be empty').max(65536, 'Code submission exceeds maximum allowed size (64KB)'),
  language: z.string().min(1).max(50).default('javascript'),
  customInput: z.string().max(524288, 'Custom input exceeds maximum allowed size (512KB)').optional(),
  cases: z
    .array(
      z.object({
        caseNumber: z.number().optional(),
        input: z.string().max(524288),
        expected: z.string().max(524288).optional(),
        expectedOutput: z.string().max(524288).optional(),
      })
    )
    .max(25, 'Maximum of 25 custom test cases allowed')
    .optional(),
});

const submitSchema = z.object({
  problemId: z.string().min(1).max(100),
  roundId: z.string().max(100).optional(),
  contestId: z.string().max(100).optional(),
  code: z.string().min(1, 'Code cannot be empty').max(65536, 'Code submission exceeds maximum allowed size (64KB)'),
  language: z.string().min(1).max(50).default('javascript'),
  durationSeconds: z.number().min(0).max(86400).optional(),
  dailyDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

const traceSchema = z.object({
  problemId: z.string().max(100).optional(),
  code: z.string().min(1, 'Code cannot be empty').max(65536, 'Code submission exceeds maximum allowed size (64KB)'),
  language: z.string().min(1).max(50).default('python'),
  input: z.string().max(524288, 'Input exceeds maximum allowed size (512KB)').optional(),
  customInput: z.string().max(524288).optional(),
  functionNameHint: z.string().max(100).optional(),
  maxSteps: z.number().min(10).max(500).optional(),
});

function canUseCatalogQuestion(
  problem: NonNullable<ReturnType<typeof db.getProblemForExecution>>,
  req: Request,
  res: Response,
  roundId?: string,
  contestId?: string,
  submit = false,
): boolean {
  if (problem.owner === 'interview') {
    return canUseInterviewQuestion(roundId, problem.id, getCatalogUser(req, res));
  }
  if (problem.owner === 'daily') {
    return Object.values(db.getDailyAssignments(getCatalogUser(req, res))).includes(problem.id);
  }
  if (problem.owner === 'contest') {
    const contest = contestId ? db.getContestById(contestId) : undefined;
    return Boolean(contest && (submit ? req.user && contest.status === 'active' : contest.status !== 'upcoming')
      && contest.problems.some(entry => entry.problemId === problem.id));
  }
  return true;
}

// GET /api/submissions (requires auth)
router.get('/', requireAuth, (req: Request, res: Response) => {
  const userId = req.user!.id;
  const submissions = db.listSubmissions(userId);
  res.json(submissions);
});

// GET /api/submissions/quota (public / guest supported)
router.get('/quota', (req: Request, res: Response) => {
  const userId = req.user ? req.user.id : null;
  const role = req.user ? req.user.role : undefined;
  const plan = req.user ? req.user.plan : undefined;
  const clientIp = (req.ip || req.socket.remoteAddress || '127.0.0.1').replace(/^::ffff:/, '');

  const quota = db.checkExecutionQuota(userId, clientIp, role, plan);
  res.json({
    limit: quota.limit,
    remaining: quota.remaining,
    count: quota.count,
    resetAt: quota.resetAt,
    tier: plan || (userId ? 'free' : 'guest'),
  });
});

// POST /api/submissions/run (public / guest supported, strictly rate-limited)
router.post('/run', executionLimiter, dailyExecutionQuotaLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { problemId, code, language, customInput, cases, roundId, contestId } = runSchema.parse(req.body);
    const problem = db.getProblemForExecution(problemId);
    if (problem && !canUseCatalogQuestion(problem, req, res, roundId, contestId)) {
      res.status(404).json({ error: { message: 'Question is unavailable in this session.' } });
      return;
    }
    if (!problem && (!cases || cases.length === 0) && !customInput) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Problem not found' } });
      return;
    }

    let testCases: TestCaseInput[] = [];
    if (customInput && customInput.trim()) {
      testCases = [{ caseNumber: 1, input: customInput.trim(), expected: '' }];
    } else if (cases && cases.length > 0) {
      testCases = cases.map((c, i) => ({
        caseNumber: c.caseNumber ?? (i + 1),
        input: c.input,
        expected: c.expected ?? c.expectedOutput ?? '',
      }));
    } else if (problem) {
      testCases = problem.examples.map((ex, idx) => ({
        caseNumber: idx + 1,
        input: ex.input,
        expected: ex.output,
      }));
    }

    const batchResult = await runTestCases(language, code, testCases, {
      earlyExit: false,
      orderInvariant: Boolean(problem?.orderInvariant),
      functionNameHint: problem ? getEntryPoint(problem, language) : undefined,
    });
    if (batchResult.executionUnavailable) {
      res.status(503).json({ error: { message: 'The judge is unavailable. Try again in a moment.' } });
      return;
    }

    const clientIp = (req.ip || req.socket.remoteAddress || '127.0.0.1').replace(/^::ffff:/, '');
    const userId = req.user ? req.user.id : null;
    await db.incrementExecutionUsage(userId, clientIp);
    const quota = db.checkExecutionQuota(userId, clientIp, req.user?.role, req.user?.plan);

    res.json({
      success: batchResult.success,
      verdict: batchResult.verdict,
      runtimeMs: batchResult.runtimeMs,
      memoryMb: batchResult.memoryMb,
      totalPassed: batchResult.totalPassed,
      totalTests: batchResult.totalTests,
      cases: batchResult.cases,
      stdout: batchResult.stdout,
      stderr: batchResult.stderr,
      customInput: customInput ?? null,
      quota: {
        limit: quota.limit,
        remaining: quota.remaining,
        resetAt: quota.resetAt,
      },
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/submissions/trace or /api/execution/trace (visual step-through scrubber)
router.post('/trace', executionLimiter, dailyExecutionQuotaLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { problemId, code, language, input, customInput, functionNameHint, maxSteps } = traceSchema.parse(req.body);

    let inputToUse = (input || customInput || '').trim();
    if (!inputToUse && problemId) {
      const problem = db.getProblemForExecution(problemId);
      if (problem && problem.examples && problem.examples.length > 0) {
        inputToUse = problem.examples[0].input;
      }
    }

    const traceResult = await executeTrace({
      code,
      language,
      input: inputToUse,
      functionNameHint,
      problemId,
      maxSteps,
    });

    const clientIp = (req.ip || req.socket.remoteAddress || '127.0.0.1').replace(/^::ffff:/, '');
    const userId = req.user ? req.user.id : null;
    await db.incrementExecutionUsage(userId, clientIp);
    const quota = db.checkExecutionQuota(userId, clientIp, req.user?.role, req.user?.plan);

    res.json({
      ...traceResult,
      quota: {
        limit: quota.limit,
        remaining: quota.remaining,
        resetAt: quota.resetAt,
      },
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/submissions/submit (supports both authenticated and guest submissions, strictly rate-limited)
router.post('/submit', executionLimiter, dailyExecutionQuotaLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { problemId, code, language, durationSeconds, roundId, contestId, dailyDate } = submitSchema.parse(req.body);
    const problem = db.getProblemForExecution(problemId);
    if (!problem?.testCases?.length || !canUseCatalogQuestion(problem, req, res, roundId, contestId, true)) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'No official test suite for this session.' } });
      return;
    }
    const testCases = problem.testCases;

    const batchResult = await runTestCases(language, code, testCases, {
      earlyExit: false,
      orderInvariant: Boolean(problem?.orderInvariant),
      functionNameHint: problem ? getEntryPoint(problem, language) : undefined,
    });

    if (batchResult.executionUnavailable) {
      res.status(503).json({ error: { message: 'The judge is unavailable. Your submission was not graded.' } });
      return;
    }

    let outcome: SubmissionOutcome = 'wrong_answer';
    if (batchResult.verdict === 'Accepted') {
      outcome = 'accepted';
    } else if (batchResult.verdict === 'Time Limit Exceeded') {
      outcome = 'tle';
    } else if (batchResult.verdict === 'Compilation Error') {
      outcome = 'compilation_error';
    } else if (batchResult.verdict === 'Runtime Error') {
      outcome = 'runtime_error';
    }

    const timestamp = new Date().toISOString();
    const userId = req.user ? req.user.id : 'guest';
    const problemTitle = problem.title;
    const problemDifficulty = problem.difficulty;
    const problemTopics = problem.topics;

    const submission: SubmissionRecord = {
      id: `sub_${crypto.randomUUID()}`,
      userId,
      problemId,
      title: problemTitle,
      difficulty: problemDifficulty,
      topics: problemTopics,
      outcome,
      language,
      code,
      timestamp,
      durationSeconds: durationSeconds ? Math.round(durationSeconds) : undefined,
      runtimeMs: batchResult.runtimeMs,
      memoryMb: batchResult.memoryMb,
      source: 'onlinecompiler',
    };

    if (contestId && problem.owner === 'contest' && req.user) {
      const contest = db.getContestById(contestId)!;
      const elapsedMinutes = Math.max(0, Math.ceil((Date.now() - Date.parse(contest.startTime)) / 60_000));
      await db.recordContestSubmission(contest.id, userId, problemId, outcome === 'accepted', elapsedMinutes);
    }

    if (req.user && (problem.owner === 'practice' || problem.owner === 'daily')) {
      await db.createSubmission(submission);
      if (outcome === 'accepted') {
        if (problem.owner === 'practice') await db.recordProblemSolved(userId, problemId);
        if (problem.owner === 'daily' && dailyDate && Math.abs(Date.now() - Date.parse(dailyDate)) < 2 * 86_400_000) {
          await db.recordDailyCompletion(userId, dailyDate, problemId);
        }
        await db.createActivity({
          id: `act_${crypto.randomUUID()}`,
          userId,
          problemId,
          title: problemTitle,
          difficulty: problemDifficulty,
          topic: problemTopics[0] || 'Problem Solving',
          type: 'solved',
          timestamp,
          durationSeconds: durationSeconds ? Math.round(durationSeconds) : undefined,
        });
      }
    }

    const rankingPercentile =
      outcome === 'accepted'
        ? db.calculatePercentile(problemId, batchResult.runtimeMs)
        : undefined;

    // Mask hidden test cases from response to prevent DevTools network inspection leaks
    const sanitizedCases = batchResult.cases.map((c, idx) => {
      const tc = testCases[idx];
      if (tc?.isHidden) {
        return {
          ...c,
          input: '[Hidden test case]',
          expected: '[Hidden]',
          actual: c.passed ? '[Passed]' : '[Hidden]',
          stdout: undefined,
          stderr: c.stderr ? 'Runtime Error in hidden test case' : undefined,
        };
      }
      return c;
    });
    if (batchResult.executionUnavailable) {
      res.status(503).json({ error: { message: 'The judge is unavailable. Try again in a moment.' } });
      return;
    }

    const clientIp = (req.ip || req.socket.remoteAddress || '127.0.0.1').replace(/^::ffff:/, '');
    await db.incrementExecutionUsage(req.user ? req.user.id : null, clientIp);
    const quota = db.checkExecutionQuota(
      req.user ? req.user.id : null,
      clientIp,
      req.user?.role,
      req.user?.plan
    );

    res.status(201).json({
      success: batchResult.success,
      submission,
      gradeReceipt: problem.owner === 'placement' ? signPlacementGrade({
        userId: getCatalogUser(req, res), problemId, version: problem.version,
        passedCases: batchResult.totalPassed, totalCases: batchResult.totalTests,
        verdict: batchResult.verdict, timestamp: Date.now(),
      }) : undefined,
      verdict: batchResult.verdict,
      runtimeMs: batchResult.runtimeMs,
      memoryMb: batchResult.memoryMb,
      rankingPercentile,
      totalPassed: batchResult.totalPassed,
      totalTests: batchResult.totalTests,
      cases: sanitizedCases,
      quota: {
        limit: quota.limit,
        remaining: quota.remaining,
        resetAt: quota.resetAt,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
