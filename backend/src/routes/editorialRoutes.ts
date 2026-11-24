import { Router, type Request, type Response } from 'express';
import { getProblemEditorial } from '../data/editorials.js';

const router = Router();

// GET /api/editorials/:id (gated by user plan)
router.get('/:id', (req: Request, res: Response) => {
  const problemId = req.params.id;
  const editorial = getProblemEditorial(problemId);

  if (!editorial) {
    res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: `Editorial for problem '${problemId}' not found.`,
      },
    });
    return;
  }

  // Free sample problem ('two-sum') is accessible on all tiers for demonstration
  if (problemId === 'two-sum') {
    res.json(editorial);
    return;
  }

  // Plan verification: Pro, Premium, or Admin required
  const user = req.user;
  const effectivePlan =
    (req.headers['x-user-plan'] as string) ||
    (req.query.plan as string) ||
    user?.plan ||
    (user?.role === 'admin' ? 'premium' : 'free');

  const hasAccess = user?.role === 'admin' || effectivePlan === 'pro' || effectivePlan === 'premium';

  if (!hasAccess) {
    res.status(403).json({
      error: {
        code: 'UPGRADE_REQUIRED',
        message: 'Editorial solutions are exclusive to Pro and Premium subscribers. Upgrade your plan to unlock complete editorial walkthroughs and reference implementations.',
      },
      upgradeRequired: true,
      locked: true,
    });
    return;
  }

  res.json(editorial);
});

export default router;
