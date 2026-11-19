import { Router, type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';
import { db } from '../db/database.js';
import { requireRole } from '../middleware/auth.js';
import type { Problem } from '../types/index.js';

const router = Router();

// Require admin role for all admin routes
router.use(requireRole('admin'));

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

// POST /api/admin/problems
router.post('/problems', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = problemSchema.parse(req.body);
    const created = await db.createProblem(validated as Problem);
    res.status(201).json(created);
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
  res.status(204).send();
});

export default router;
