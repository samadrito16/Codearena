import crypto from 'node:crypto';
import { Router } from 'express';
import { z } from 'zod';
import rawAssessments from '../data/placementCatalog.json' with { type: 'json' };
import { config } from '../config.js';
import { findCatalogProblem, publicQuestion } from '../data/questionCatalog.js';
import { computeAssessmentReport } from '../data/placementScoring.js';
import type { CompanyAssessment, ActiveAssessmentSession, CodingSubmissionResult } from '../types/placement.js';
import { getCatalogUser } from './catalogRoutes.js';

const assessments = rawAssessments as unknown as CompanyAssessment[];
const receiptSchema = z.object({
  userId: z.string(),
  problemId: z.string(),
  version: z.number(),
  passedCases: z.number().int().nonnegative(),
  totalCases: z.number().int().positive(),
  verdict: z.enum(['Accepted', 'Wrong Answer', 'Runtime Error', 'Compilation Error', 'Time Limit Exceeded']),
  timestamp: z.number(),
});
type Grade = z.infer<typeof receiptSchema>;

const receiptSignature = (payload: string) => crypto.createHmac('sha256', config.sessionSecret)
  .update('placement-grade:' + payload).digest('hex');

export function signPlacementGrade(grade: Grade): string {
  const payload = Buffer.from(JSON.stringify(grade)).toString('base64url');
  return payload + '.' + receiptSignature(payload);
}

function readGrade(receipt: string): Grade | undefined {
  const [payload, signature, extra] = receipt.split('.');
  if (!payload || !signature || extra || !/^[0-9a-f]{64}$/.test(signature)) return;
  if (!crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(receiptSignature(payload), 'hex'))) return;
  try {
    return receiptSchema.parse(JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')));
  } catch {
    return;
  }
}

function publicAssessment(assessment: CompanyAssessment): CompanyAssessment {
  return {
    ...assessment,
    sections: assessment.sections.map(section => ({
      ...section,
      questions: section.questions.map(question => {
        const explanation = { summary: '', steps: [] };
        if (question.type === 'mcq') return { ...question, explanation, correctOptionId: '' };
        const problem = findCatalogProblem(question.problemId);
        if (!problem || problem.owner !== 'placement') throw new Error('Invalid placement question');
        const { title, description, examples, constraints, starterCode, testCases } = publicQuestion(problem);
        return { ...question, title, description, examples, constraints, starterCode: starterCode ?? {},
          testCases: testCases ?? [], explanation, referenceCode: undefined };
      }),
    })),
  };
}

export const placementRouter = Router();

placementRouter.get('/', (_req, res) => {
  res.json(assessments.map(publicAssessment));
});

placementRouter.post('/:assessmentId/grade', (req, res) => {
  const assessment = assessments.find(item => item.id === req.params.assessmentId);
  if (!assessment) {
    res.status(404).json({ error: { message: 'Placement mock is unavailable.' } });
    return;
  }
  const { answers, receipts, startedAt, autoSubmitted, tabSwitchCount } = z.object({
    answers: z.record(z.string().max(20)),
    receipts: z.record(z.string().max(2048)),
    startedAt: z.number().nonnegative(),
    autoSubmitted: z.boolean().default(false),
    tabSwitchCount: z.number().int().nonnegative(),
  }).parse(req.body);
  const submittedAt = Date.now();
  const userId = getCatalogUser(req, res);
  const codingSubmissions: Record<string, CodingSubmissionResult> = {};
  for (const question of assessment.sections.flatMap(section => section.questions)) {
    if (question.type !== 'coding' || !receipts[question.id]) continue;
    const grade = readGrade(receipts[question.id]);
    const problem = findCatalogProblem(question.problemId);
    if (!grade || grade.userId !== userId || grade.problemId !== question.problemId
      || grade.version !== problem?.version || grade.timestamp < startedAt) {
      res.status(400).json({ error: { message: 'A coding result could not be verified. Run the coding question again.' } });
      return;
    }
    codingSubmissions[question.id] = { ...grade, code: '', language: '' };
  }
  const resultAssessment = { ...assessment, sections: assessment.sections.map(section => ({
    ...section, questions: section.questions.map(question => {
      if (question.type !== 'coding') return question;
      const problem = findCatalogProblem(question.problemId)!;
      return { ...question, ...publicQuestion(problem), type: 'coding' as const,
        starterCode: problem.starterCode ?? {}, testCases: [],
        explanation: { summary: problem.editorial?.summary ?? '', steps: problem.editorial?.approachSteps ?? [] },
      };
    }),
  })) };
  const session: ActiveAssessmentSession = {
    assessmentId: assessment.id, startedAt, submittedAt, answers, codingSubmissions, autoSubmitted,
    currentSectionIndex: 0, currentQuestionIndex: 0, sectionRemainingSeconds: {},
    markedForReview: {}, visitedQuestions: {}, isCompleted: true, tabSwitchCount,
  };
  res.json({ report: computeAssessmentReport(assessment, session), assessment: resultAssessment });
});
