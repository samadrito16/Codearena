import { Router, type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';
import { db } from '../db/database.js';
import { requireAuth } from '../middleware/auth.js';
import type { SubmissionOutcome, SubmissionRecord } from '../types/index.js';
import { runTestCases, type TestCaseInput } from '../services/onlineCompilerService.js';

const router = Router();

const runSchema = z.object({
  problemId: z.string(),
  code: z.string(),
  language: z.string().default('javascript'),
  customInput: z.string().optional(),
  cases: z.array(z.object({
    caseNumber: z.number().optional(),
    input: z.string(),
    expected: z.string().optional(),
  })).optional(),
});

const submitSchema = z.object({
  problemId: z.string(),
  code: z.string(),
  language: z.string().default('javascript'),
  durationSeconds: z.number().optional(),
});

// GET /api/submissions (requires auth)
router.get('/', requireAuth, (req: Request, res: Response) => {
  const userId = req.user!.id;
  const submissions = db.listSubmissions(userId);
  res.json(submissions);
});

// POST /api/submissions/run (public / guest supported)
router.post('/run', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { problemId, code, language, customInput, cases } = runSchema.parse(req.body);
    const problem = db.getProblemForExecution(problemId);
    if (!problem) {
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
        expected: c.expected ?? '',
      }));
    } else {
      testCases = problem.examples.map((ex, idx) => ({
        caseNumber: idx + 1,
        input: ex.input,
        expected: ex.output,
      }));
    }

    const batchResult = await runTestCases(language, code, testCases, {
      earlyExit: false,
      orderInvariant: Boolean(problem.orderInvariant),
    });

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
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/submissions/submit (supports both authenticated and guest submissions)
router.post('/submit', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { problemId, code, language, durationSeconds } = submitSchema.parse(req.body);
    const problem = db.getProblemForExecution(problemId);
    if (!problem) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Problem not found' } });
      return;
    }

    // Use full testCases suite (including hidden edge cases) if available, otherwise fallback to examples
    let testCases: TestCaseInput[] = [];
    if (problem.testCases && problem.testCases.length > 0) {
      testCases = problem.testCases;
    } else {
      testCases = problem.examples.map((ex, idx) => ({
        caseNumber: idx + 1,
        input: ex.input,
        expected: ex.output,
      }));
    }

    // Sequential execution with Early Exit on first failure
    const batchResult = await runTestCases(language, code, testCases, {
      earlyExit: true,
      orderInvariant: Boolean(problem.orderInvariant),
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

    const submission: SubmissionRecord = {
      id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      userId,
      problemId,
      title: problem.title,
      difficulty: problem.difficulty,
      topics: problem.topics,
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
          id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          userId,
          problemId,
          title: problem.title,
          difficulty: problem.difficulty,
          topic: problem.topics[0] || 'Problem Solving',
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

    res.status(201).json({
      success: batchResult.success,
      submission,
      verdict: batchResult.verdict,
      runtimeMs: batchResult.runtimeMs,
      memoryMb: batchResult.memoryMb,
      rankingPercentile,
      totalPassed: batchResult.totalPassed,
      totalTests: batchResult.totalTests,
      cases: batchResult.cases,
      stdout: batchResult.stdout,
      stderr: batchResult.stderr,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
