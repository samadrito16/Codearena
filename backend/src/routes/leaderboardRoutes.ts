import { Router, type Request, type Response } from 'express';
import { db } from '../db/database.js';

const router = Router();

// GET /api/leaderboard
router.get('/', (req: Request, res: Response) => {
  const leaderboard = db.getLeaderboard();
  res.json(leaderboard);
});

export default router;
