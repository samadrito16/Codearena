import sections from '../data/questionSections.json' with { type: 'json' };
import { Router, type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';
import { executionLimiter, dailyExecutionQuotaLimiter } from '../middleware/rateLimiter.js';
import { getCompilerId } from '../services/languageRegistry.js';
import { executeCode } from '../services/execution/engine.js';
import {
  buildPythonReviewProgram,
  isSupportedPythonReviewScenario,
} from '../services/review/pythonHarnesses.js';

const router = Router();

const runReviewSchema = z.object({
  scenarioId: z.string().min(1).max(64),
  files: z
    .array(
      z.object({
        filename: z.string().min(1).max(128),
        content: z.string().max(65536),
      }),
    )
    .min(1)
    .max(10),
});

interface ParsedReviewResult {
  testId: string;
  passed: boolean;
  error?: string;
  expected?: string;
  actual?: string;
}

const SENTINEL = '___REVIEW_TEST_RESULTS___';

// POST /api/review/run
router.post(
  '/run',
  executionLimiter,
  dailyExecutionQuotaLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { scenarioId, files } = runReviewSchema.parse(req.body);

      if (!sections.review.some(entry => entry.id === scenarioId) || !isSupportedPythonReviewScenario(scenarioId)) {
        res.status(404).json({
          error: {
            code: 'UNSUPPORTED_SCENARIO',
            message: `No container harness configured for scenario '${scenarioId}'.`,
          },
        });
        return;
      }

      const program = buildPythonReviewProgram(scenarioId, files);
      const compilerId = getCompilerId('python');
      const execResult = await executeCode('python', compilerId, program, '');

      const stdout = execResult.stdout || '';
      const stderr = execResult.stderr || '';

      const sentinelIdx = stdout.indexOf(SENTINEL);
      if (sentinelIdx !== -1) {
        const rawJson = stdout.slice(sentinelIdx + SENTINEL.length).trim().split('\n')[0];
        const parsed = JSON.parse(rawJson) as ParsedReviewResult[];
        res.json({
          success: true,
          runtimeMs: execResult.runtimeMs,
          results: parsed.map((r) => ({
            ...r,
            durationMs: execResult.runtimeMs,
          })),
        });
        return;
      }

      // Syntax error or global crash before sentinel was emitted
      const errMsg = (stderr || stdout || 'Python execution failed without test output.').trim();
      res.json({
        success: false,
        runtimeMs: execResult.runtimeMs,
        error: errMsg,
        results: [],
      });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
