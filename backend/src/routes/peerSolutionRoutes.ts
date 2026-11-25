import { Router, type Request, type Response } from 'express';

const router = Router();

interface StoredPeerSolution {
  id: string;
  problemId: string;
  authorName: string;
  authorHandle: string;
  authorCollege?: string;
  authorAvatarColor?: string;
  title: string;
  intuitionNote: string;
  timeComplexity: string;
  spaceComplexity: string;
  language: string;
  code: string;
  upvotes: number;
  createdAt: string;
  tags?: string[];
}

// In-memory backing store for community peer solutions (populated by user submissions)
const peerSolutionsStore = new Map<string, StoredPeerSolution[]>();

// GET /api/problems/:id/peer-solutions
router.get('/problems/:id/peer-solutions', (req: Request, res: Response) => {
  const problemId = req.params.id;
  const solutions = peerSolutionsStore.get(problemId) || [];
  res.json(solutions);
});

// POST /api/problems/:id/peer-solutions
router.post('/problems/:id/peer-solutions', (req: Request, res: Response) => {
  const problemId = req.params.id;
  const {
    title,
    intuitionNote,
    timeComplexity,
    spaceComplexity,
    language,
    code,
    authorName,
    authorHandle,
    authorCollege,
    tags,
  } = req.body;

  // Strict quality validation: "Explain it in your own words" must be >= 60 characters
  if (!intuitionNote || typeof intuitionNote !== 'string' || intuitionNote.trim().length < 60) {
    return res.status(400).json({
      error: 'Explanation note must be at least 60 characters explaining your approach in your own words.',
    });
  }

  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return res.status(400).json({
      error: 'A descriptive approach title (minimum 3 characters) is required.',
    });
  }

  if (!code || typeof code !== 'string' || code.trim().length < 5) {
    return res.status(400).json({
      error: 'Valid source code is required.',
    });
  }

  const newSolution: StoredPeerSolution = {
    id: `sol_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    problemId,
    authorName: authorName || 'Anonymous Coder',
    authorHandle: authorHandle || '@coder',
    authorCollege: authorCollege || undefined,
    authorAvatarColor: 'from-indigo-500 to-cyan-500',
    title: title.trim(),
    intuitionNote: intuitionNote.trim(),
    timeComplexity: timeComplexity || 'O(N)',
    spaceComplexity: spaceComplexity || 'O(1)',
    language: language || 'python',
    code: code.trim(),
    upvotes: 1,
    createdAt: new Date().toISOString(),
    tags: Array.isArray(tags) ? tags : ['Community Solution'],
  };

  const list = peerSolutionsStore.get(problemId) || [];
  list.unshift(newSolution);
  peerSolutionsStore.set(problemId, list);

  res.status(201).json(newSolution);
});

// POST /api/peer-solutions/:id/upvote
router.post('/peer-solutions/:id/upvote', (req: Request, res: Response) => {
  const solutionId = req.params.id;
  for (const [, list] of peerSolutionsStore.entries()) {
    const found = list.find((s) => s.id === solutionId);
    if (found) {
      found.upvotes += 1;
      return res.json({ id: found.id, upvotes: found.upvotes });
    }
  }
  res.status(404).json({ error: 'Solution not found' });
});

export default router;
