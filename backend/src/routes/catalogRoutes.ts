import crypto from 'node:crypto';
import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { db } from '../db/database.js';
import { config } from '../config.js';
import { catalogVersion, findCatalogProblem, getPool, publicQuestion } from '../data/questionCatalog.js';

export const catalogRouter = Router();
const interviewPresets = { faang_standard: 'Medium', senior_technical: 'Hard', bar_raiser: 'Hard' } as const;
const roundDurations = { faang_standard: 45, senior_technical: 45, bar_raiser: 60 } as const;

export function getCatalogUser(req: Request, res: Response): string {
  if (req.user) return req.user.id;
  const existing: unknown = req.cookies?.prismcode_catalog_guest;
  if (typeof existing === 'string' && /^[a-f0-9]{48}$/.test(existing)) return `guest:${existing}`;
  const token = crypto.randomBytes(24).toString('hex');
  res.cookie('prismcode_catalog_guest', token, {
    httpOnly: true, sameSite: 'lax', secure: config.isProduction, maxAge: 30 * 86_400_000,
  });
  return `guest:${token}`;
}

catalogRouter.post('/interview/rounds', async (req, res, next) => {
  try {
    const { preset, recentIds } = z.object({
      preset: z.enum(['faang_standard', 'senior_technical', 'bar_raiser']),
      recentIds: z.array(z.string()).max(20).default([]),
    }).parse(req.body);
    const id = crypto.randomUUID();
    const startedAt = Date.now();
    const durationMinutes = roundDurations[preset];
    const pool = getPool('interview');
    const used = new Set(recentIds);
    const pick = (difficulty: 'Medium' | 'Hard', exclude?: string) => {
      const candidates = pool.filter(p => p.difficulty === difficulty && p.id !== exclude);
      const fresh = candidates.filter(p => !used.has(p.id));
      const available = fresh.length ? fresh : candidates;
      return available.length ? available[crypto.randomInt(available.length)] : undefined;
    };
    const first = pick('Medium');
    const second = pick(interviewPresets[preset], first?.id);
    if (!first || !second) {
      res.status(503).json({ error: { message: 'This interview format is currently unavailable.' } });
      return;
    }
    await db.saveInterviewRound(id, {
      userId: getCatalogUser(req, res),
      questions: [first, second].map(problem => ({ id: problem.id, version: problem.version })),
      expiresAt: startedAt + durationMinutes * 60_000,
    });
    res.status(201).json({ id, startedAt, version: catalogVersion, problems: [publicQuestion(first), publicQuestion(second)] });
  } catch (error) {
    next(error);
  }
});

export function canUseInterviewQuestion(roundId: string | undefined, problemId: string, userId: string): boolean {
  const round = roundId ? db.getInterviewRound(roundId) : undefined;
  return Boolean(round && round.userId === userId && round.expiresAt >= Date.now() && round.questions.some(question => question.id === problemId && question.version === findCatalogProblem(problemId)?.version));
}

const primers: Record<string, string> = {
  Array: 'Start by walking through a small list by hand. Track just the values you need as you go.',
  String: 'Trace the characters from left to right on a small example before writing code.',
  Graph: 'Sketch the items and their connections. Mark where you start and which items you have visited.',
  Math: 'Try a few small inputs by hand and write down what changes from one step to the next.',
  Stack: 'As you read each operation, write down the values that are still waiting to be processed.',
};

catalogRouter.post('/daily/assignment', async (req, res, next) => {
  try {
    const { day, studiedIds } = z.object({
      day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      studiedIds: z.array(z.string()).max(100).default([]),
    }).parse(req.body);
    const dayMs = Date.parse(`${day}T00:00:00Z`);
    if (!Number.isFinite(dayMs) || Math.abs(dayMs - Date.now()) > 2 * 86_400_000) {
      res.status(400).json({ error: { message: 'Choose the current local calendar day.' } });
      return;
    }
    const userId = getCatalogUser(req, res);
    const assignments = db.getDailyAssignments(userId);
    const previous = assignments[day];
    const verifiedIds = req.user ? db.listSubmissions(req.user.id).map(item => item.problemId) : [];
    const studied = [...new Set([...studiedIds, ...verifiedIds])].map(findCatalogProblem).filter(p => p?.owner === 'practice');
    const topics = new Set(studied.flatMap(p => p?.topics ?? []));
    const pool = getPool('daily');
    const seen = new Set(Object.values(assignments));
    const level = studied.length >= 5 ? ['Easy', 'Medium'] : ['Easy'];
    const unseen = pool.filter(p => !seen.has(p.id) && level.includes(p.difficulty));
    const matched = unseen.filter(p => p.topics.some(topic => topics.has(topic)));
    const beginner = unseen.filter(p => p.difficulty === 'Easy');
    const choices = topics.size ? matched : beginner;
    const choice = previous ?? choices[Math.floor(dayMs / 86_400_000) % (choices.length || 1)]?.id;
    const id = previous || (choice && await db.assignDailyProblem(userId, day, choice));
    const problem = id ? findCatalogProblem(id) : undefined;
    const primer = problem && !problem.topics.some(topic => topics.has(topic))
      ? primers[problem.topics[0]] ?? 'Work through the examples by hand and write down the rule connecting the input and output.'
      : undefined;
    res.json({ problem: problem ? publicQuestion(problem) : null, primer });
  } catch (error) {
    next(error);
  }
});

catalogRouter.get('/daily/history', (req, res) => {
  const userId = req.user?.id || (req.cookies?.prismcode_catalog_guest ? 'guest:' + req.cookies.prismcode_catalog_guest : '');
  const ids = new Set(Object.values(db.getDailyAssignments(userId)));
  res.json(getPool('daily').filter(problem => ids.has(problem.id)).map(publicQuestion));
});

catalogRouter.get('/daily/questions/:id', (req, res) => {
  const problem = findCatalogProblem(req.params.id);
  const assigned = Object.values(db.getDailyAssignments(getCatalogUser(req, res))).includes(req.params.id);
  if (problem?.owner !== 'daily' || !assigned) {
    res.status(404).json({ error: { message: 'Daily challenge not found.' } });
    return;
  }
  res.json(publicQuestion(problem));
});

catalogRouter.get('/contests/:contestId/questions/:id', (req, res) => {
  const contest = db.getContestById(req.params.contestId);
  const problem = findCatalogProblem(req.params.id);
  if (!contest || contest.status === 'upcoming' || problem?.owner !== 'contest'
    || !contest.problems.some(entry => entry.problemId === problem.id)) {
    res.status(404).json({ error: { message: 'Contest question is unavailable.' } });
    return;
  }
  res.json(publicQuestion(problem));
});
