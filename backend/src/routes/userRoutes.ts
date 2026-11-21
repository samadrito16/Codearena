import { Router, type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';
import { db } from '../db/database.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

const profilePatchSchema = z.object({
  displayName: z.string().min(1).max(50).optional(),
  bio: z.string().max(300).optional(),
  avatarMode: z.enum(['initials', 'image']).optional(),
  avatarColor: z.string().max(30).optional(),
  avatarImage: z
    .string()
    .max(2048, 'Avatar image URL must not exceed 2048 characters')
    .refine(
      (val) => !val || val.startsWith('https://') || val.startsWith('http://'),
      'Avatar image must be a valid HTTP or HTTPS URL'
    )
    .optional()
    .or(z.literal('')),
  visibility: z.enum(['public', 'private']).optional(),
});

// GET /api/user/profile
router.get('/profile', (req: Request, res: Response) => {
  const userId = req.user!.id;
  const progress = db.getUserProgress(userId);
  res.json(progress.profile);
});

// PUT /api/user/profile
router.put('/profile', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const patch = profilePatchSchema.parse(req.body);
    const updated = await db.updateUserProfile(userId, patch);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// GET /api/user/progress
router.get('/progress', (req: Request, res: Response) => {
  const userId = req.user!.id;
  const progress = db.getUserProgress(userId);
  const submissions = db.listSubmissions(userId);
  const activityLog = db.listActivity(userId);

  res.json({
    solvedIds: progress.solvedIds,
    dailyCompletions: progress.dailyCompletions,
    profile: progress.profile,
    submissions,
    activityLog,
  });
});

// POST /api/user/progress/solve
router.post('/progress/solve', async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { problemId } = req.body;
  if (!problemId || typeof problemId !== 'string') {
    res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'problemId is required' } });
    return;
  }

  const solvedIds = await db.recordProblemSolved(userId, problemId);
  res.json({ solvedIds });
});

export default router;
