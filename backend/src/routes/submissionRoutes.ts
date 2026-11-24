import { Router, type Request, type Response, type NextFunction } from 'express';
import crypto from 'node:crypto';
import { z } from 'zod';
import { db } from '../db/database.js';
import { requireAuth } from '../middleware/auth.js';
import { executionLimiter, dailyExecutionQuotaLimiter } from '../middleware/rateLimiter.js';
import type { SubmissionOutcome, SubmissionRecord } from '../types/index.js';
import { runTestCases, type TestCaseInput } from '../services/onlineCompilerService.js';

const router = Router();

const runSchema = z.object({
  problemId: z.string().min(1).max(100),
  code: z.string().min(1, 'Code cannot be empty').max(65536, 'Code submission exceeds maximum allowed size (64KB)'),
  language: z.string().min(1).max(50).default('javascript'),
  customInput: z.string().max(10240, 'Custom input exceeds maximum allowed size (10KB)').optional(),
  cases: z
    .array(
      z.object({
        caseNumber: z.number().optional(),
        input: z.string().max(10240),
        expected: z.string().max(10240).optional(),
        expectedOutput: z.string().max(10240).optional(),
      })
    )
    .max(25, 'Maximum of 25 custom test cases allowed')
    .optional(),
});

const submitSchema = z.object({
  problemId: z.string().min(1).max(100),
  code: z.string().min(1, 'Code cannot be empty').max(65536, 'Code submission exceeds maximum allowed size (64KB)'),
  language: z.string().min(1).max(50).default('javascript'),
  durationSeconds: z.number().min(0).max(86400).optional(),
  cases: z
    .array(
      z.object({
        caseNumber: z.number().optional(),
        input: z.string().max(10240),
        expected: z.string().max(10240).optional(),
        expectedOutput: z.string().max(10240).optional(),
      })
    )
    .max(50)
    .optional(),
  title: z.string().max(150).optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
});

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
    const { problemId, code, language, customInput, cases } = runSchema.parse(req.body);
    const problem = db.getProblemForExecution(problemId);
    if (!problem && (!cases || cases.length === 0)) {
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
    });

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

// POST /api/submissions/submit (supports both authenticated and guest submissions, strictly rate-limited)
router.post('/submit', executionLimiter, dailyExecutionQuotaLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { problemId, code, language, durationSeconds, cases, title, difficulty } = submitSchema.parse(req.body);
    const problem = db.getProblemForExecution(problemId);
    if (!problem && (!cases || cases.length === 0)) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Problem not found' } });
      return;
    }

    // Server-authoritative test suite execution: Always run against server's full test suite (including hidden cases)
    let testCases: TestCaseInput[] = [];
    if (problem?.testCases && problem.testCases.length > 0) {
      testCases = problem.testCases;
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

    // Sequential execution with Early Exit on first failure
    const batchResult = await runTestCases(language, code, testCases, {
      earlyExit: true,
      orderInvariant: Boolean(problem?.orderInvariant),
    });

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
    const problemTitle = problem?.title || title || problemId;
    const problemDifficulty = problem?.difficulty || difficulty || 'Medium';
    const problemTopics = problem?.topics || ['Pattern Mastery'];

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

    if (req.user) {
      await db.createSubmission(submission);
      if (outcome === 'accepted') {
        await db.recordProblemSolved(userId, problemId);
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
      verdict: batchResult.verdict,
      runtimeMs: batchResult.runtimeMs,
      memoryMb: batchResult.memoryMb,
      rankingPercentile,
      totalPassed: batchResult.totalPassed,
      totalTests: batchResult.totalTests,
      cases: sanitizedCases,
      stdout: batchResult.stdout,
      stderr: batchResult.stderr,
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
