import { Router, type Request, type Response } from 'express';
import { db } from '../db/database.js';

const router = Router();

// GET /api/leaderboard - Global individual leaderboard
router.get('/', (req: Request, res: Response) => {
  const leaderboard = db.getLeaderboard();
  res.json(leaderboard);
});

// GET /api/leaderboard/colleges - Campus Cup (Colleges aggregate leaderboard)
router.get('/colleges', (req: Request, res: Response) => {
  const colleges = db.getCollegeLeaderboard();
  res.json(colleges);
});

// GET /api/leaderboard/college-students?college=... - Intra-college student leaderboard
router.get('/college-students', (req: Request, res: Response) => {
  const college = typeof req.query.college === 'string' ? req.query.college : '';
  if (!college) {
    return res.status(400).json({ error: 'Query parameter "college" is required' });
  }
  const students = db.getCollegeStudentsLeaderboard(college);
  res.json(students);
});

export default router;
