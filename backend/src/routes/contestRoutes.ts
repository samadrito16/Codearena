import { Router, type Request, type Response } from 'express';
import { db } from '../db/database.js';

const router = Router();

// GET /api/contests - List all weekly contests (upcoming, active, completed)
router.get('/', (req: Request, res: Response) => {
  const contests = db.getContests();
  res.json(contests);
});

// GET /api/contests/:id - Get contest details
router.get('/:id', (req: Request, res: Response) => {
  const contest = db.getContestById(req.params.id);
  if (!contest) {
    return res.status(404).json({ error: 'Contest not found' });
  }
  res.json(contest);
});

// GET /api/contests/:id/standings - Get contest scoreboard, optionally filtered by college
router.get('/:id/standings', (req: Request, res: Response) => {
  const contest = db.getContestById(req.params.id);
  if (!contest) {
    return res.status(404).json({ error: 'Contest not found' });
  }
  const college = typeof req.query.college === 'string' ? req.query.college : undefined;
  const standings = db.getContestStandings(req.params.id, college);
  res.json(standings);
});

// POST /api/contests/:id/submit - Record a contest problem submission
router.post('/:id/submit', (req: Request, res: Response) => {
  const contest = db.getContestById(req.params.id);
  if (!contest) {
    return res.status(404).json({ error: 'Contest not found' });
  }

  const { problemId, isAccepted, elapsedMinutes } = req.body;
  if (!problemId) {
    return res.status(400).json({ error: 'problemId is required' });
  }

  const userId = (req as any).session?.userId || (req as any).user?.id || 'guest_contestant';
  const standing = db.recordContestSubmission(
    req.params.id,
    userId,
    problemId,
    Boolean(isAccepted),
    typeof elapsedMinutes === 'number' ? elapsedMinutes : 15
  );

  res.json({
    success: true,
    standing,
  });
});

export default router;
