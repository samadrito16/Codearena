import { Router, type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';
import { db } from '../db/database.js';
import { requireRole } from '../middleware/auth.js';
import type { Problem } from '../types/index.js';

const router = Router();

// Require admin role for all admin routes
router.use(requireRole('admin'));

// GET /api/admin/stats
router.get('/stats', (req: Request, res: Response) => {
  const stats = db.getAdminStats();
  res.json(stats);
});

// GET /api/admin/users
router.get('/users', (req: Request, res: Response) => {
  const users = db.listUsers();
  res.json(users);
});

// GET /api/admin/audit-logs
router.get('/audit-logs', (req: Request, res: Response) => {
  const limit = req.query.limit ? Math.min(Math.max(parseInt(String(req.query.limit), 10) || 50, 1), 500) : 50;
  const logs = db.listAuditLogs(limit);
  res.json(logs);
});

const problemSchema = z.object({
  id: z.string().min(1, 'Problem ID is required'),
  title: z.string().min(1, 'Title is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  topics: z.array(z.string()).min(1, 'At least one topic is required'),
  acceptance: z.string().default('50.0%'),
  submissions: z.string().default('1K'),
  description: z.string().min(1, 'Description is required'),
  examples: z.array(
    z.object({
      input: z.string(),
      output: z.string(),
      explanation: z.string().optional(),
    })
  ).min(1, 'At least one example is required'),
  constraints: z.array(z.string()).default([]),
  starterCode: z.record(z.string()).optional(),
});

// Flexible item schema for batch import accepting common alias variations
const importItemSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).or(z.string()).default('Medium'),
  topics: z.array(z.string()).or(z.string()).optional(),
  tags: z.array(z.string()).or(z.string()).optional(),
  acceptance: z.string().optional().default('50.0%'),
  submissions: z.string().optional().default('1K'),
  description: z.string().optional(),
  statement: z.string().optional(),
  examples: z.array(
    z.object({
      input: z.string().or(z.any().transform(String)),
      output: z.string().or(z.any().transform(String)),
      explanation: z.string().optional(),
    })
  ).default([]),
  constraints: z.array(z.string()).default([]),
  starterCode: z.record(z.string()).optional(),
});

// POST /api/admin/problems
router.post('/problems', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = problemSchema.parse(req.body);
    const created = await db.createProblem(validated as Problem);

    // Record audit log for admin action
    await db.createAuditLog({
      userId: req.user?.id || 'unknown',
      userEmail: req.user?.email || 'unknown',
      action: 'create_problem',
      targetId: created.id,
      details: {
        title: created.title,
        difficulty: created.difficulty,
        topics: created.topics,
      },
      ipAddress: req.ip || req.socket.remoteAddress,
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/problems/import (Batch import problems)
router.post('/problems/import', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const rawItems: unknown[] = Array.isArray(body)
      ? body
      : (Array.isArray(body?.problems) ? body.problems : []);

    const fileName: string = typeof body?.fileName === 'string' ? body.fileName : 'import.json';

    if (!rawItems.length) {
      res.status(400).json({
        error: {
          code: 'EMPTY_IMPORT',
          message: 'No problems provided in the import payload. Send an array of problems or { problems: [...] }.',
        },
      });
      return;
    }

    const accepted: Problem[] = [];
    const rejected: { row: number; label: string; reasons: string[] }[] = [];

    rawItems.forEach((raw, idx) => {
      const row = idx + 1;
      try {
        const parsed = importItemSchema.parse(raw);
        const resolvedTitle = (parsed.title || parsed.name || '').trim();
        if (!resolvedTitle) {
          rejected.push({ row, label: `Row ${row}`, reasons: ['Missing title or name'] });
          return;
        }

        const resolvedId = (parsed.id || resolvedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')).trim();
        if (!resolvedId) {
          rejected.push({ row, label: resolvedTitle, reasons: ['Missing problem ID'] });
          return;
        }

        // Normalize difficulty
        let diff: 'Easy' | 'Medium' | 'Hard' = 'Medium';
        const rawDiff = String(parsed.difficulty).toLowerCase();
        if (rawDiff === 'easy') diff = 'Easy';
        else if (rawDiff === 'hard') diff = 'Hard';

        // Normalize topics
        let topics: string[] = ['Algorithms'];
        if (Array.isArray(parsed.topics) && parsed.topics.length) {
          topics = parsed.topics.map((t) => String(t).trim()).filter(Boolean);
        } else if (Array.isArray(parsed.tags) && parsed.tags.length) {
          topics = parsed.tags.map((t) => String(t).trim()).filter(Boolean);
        } else if (typeof parsed.topics === 'string' && parsed.topics.trim()) {
          topics = parsed.topics.split(',').map((t) => t.trim()).filter(Boolean);
        }

        const resolvedDescription = (parsed.description || parsed.statement || '').trim();
        if (!resolvedDescription) {
          rejected.push({ row, label: resolvedTitle, reasons: ['Missing description or statement'] });
          return;
        }

        const problem: Problem = {
          id: resolvedId,
          title: resolvedTitle,
          difficulty: diff,
          topics: topics.length ? topics : ['Algorithms'],
          acceptance: parsed.acceptance || '50.0%',
          submissions: parsed.submissions || '1K',
          description: resolvedDescription,
          examples: parsed.examples.length ? parsed.examples : [{ input: '', output: '', explanation: '' }],
          constraints: parsed.constraints || [],
          starterCode: parsed.starterCode,
        };

        accepted.push(problem);
      } catch (itemErr) {
        const message = itemErr instanceof z.ZodError
          ? itemErr.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ')
          : 'Invalid problem format';
        rejected.push({ row, label: `Row ${row}`, reasons: [message] });
      }
    });

    let importedCount = 0;
    let updatedCount = 0;

    if (accepted.length > 0) {
      const result = await db.importProblems(accepted);
      importedCount = result.importedCount;
      updatedCount = result.updatedCount;

      // Record audit log for import
      await db.createAuditLog({
        userId: req.user?.id || 'unknown',
        userEmail: req.user?.email || 'unknown',
        action: 'import_problems',
        targetId: 'bulk',
        details: {
          fileName,
          totalSubmitted: rawItems.length,
          acceptedCount: accepted.length,
          importedCount,
          updatedCount,
          rejectedCount: rejected.length,
        },
        ipAddress: req.ip || req.socket.remoteAddress,
      });
    }

    res.status(200).json({
      success: true,
      fileName,
      totalSubmitted: rawItems.length,
      acceptedCount: accepted.length,
      importedCount,
      updatedCount,
      rejectedCount: rejected.length,
      accepted,
      rejected,
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/problems/:id
router.put('/problems/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = problemSchema.parse(req.body);
    const updated = await db.updateProblem(req.params.id, validated as Problem);
    if (!updated) {
      res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Problem not found',
        },
      });
      return;
    }

    // Record audit log for update
    await db.createAuditLog({
      userId: req.user?.id || 'unknown',
      userEmail: req.user?.email || 'unknown',
      action: 'update_problem',
      targetId: updated.id,
      details: {
        title: updated.title,
        difficulty: updated.difficulty,
        previousId: req.params.id,
      },
      ipAddress: req.ip || req.socket.remoteAddress,
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/problems/:id
router.delete('/problems/:id', async (req: Request, res: Response) => {
  const success = await db.deleteProblem(req.params.id);
  if (!success) {
    res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: 'Problem not found',
      },
    });
    return;
  }

  // Record audit log for deletion
  await db.createAuditLog({
    userId: req.user?.id || 'unknown',
    userEmail: req.user?.email || 'unknown',
    action: 'delete_problem',
    targetId: req.params.id,
    ipAddress: req.ip || req.socket.remoteAddress,
  });

  res.status(204).send();
});

export default router;
