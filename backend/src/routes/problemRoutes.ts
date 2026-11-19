import { Router, type Request, type Response } from 'express';
import { db } from '../db/database.js';

const router = Router();

// GET /api/problems
router.get('/', (req: Request, res: Response) => {
  const problems = db.listProblems();
  res.json(problems);
});

// GET /api/problems/:id
router.get('/:id', (req: Request, res: Response) => {
  const problem = db.findProblemById(req.params.id);
  if (!problem) {
    res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: `Problem with id '${req.params.id}' was not found.`,
      },
    });
    return;
  }
  res.json(problem);
});

export default router;
