import masteryTests from './masteryTests.json' with { type: 'json' };
import rawCatalog from './questionCatalog.json' with { type: 'json' };
import type { Problem } from '../types/index.js';

export type QuestionSection = 'practice' | 'daily' | 'interview' | 'placement' | 'contest' | 'mastery';
export interface CatalogProblem extends Omit<Problem, 'acceptance' | 'submissions'> {
  owner: QuestionSection;
  taskKey: string;
  version: number;
  status: 'published';
  references?: Partial<Record<'python' | 'javascript' | 'java' | 'cpp', string>>;
}

export const catalogVersion = rawCatalog.version;
const pools = rawCatalog.pools as unknown as Record<Exclude<QuestionSection, 'mastery'>, CatalogProblem[]>;
for (const [section, items] of Object.entries(pools)) {
  for (const problem of items) {
    if (problem.status !== 'published' || problem.owner !== section || !problem.testCases?.length) {
      throw new Error('Invalid published question: ' + problem.id);
    }
  }
}
const byId = new Map(Object.values(pools).flat().map(problem => [problem.id, problem]));
for (const [id, item] of Object.entries(masteryTests)) {
  byId.set(id, { ...item, id, owner: 'mastery', taskKey: id, version: 1,
    status: 'published', description: '', constraints: [] } as CatalogProblem);
}

export function getPool(section: Exclude<QuestionSection, 'mastery'>): readonly CatalogProblem[] {
  return pools[section];
}

export function findCatalogProblem(id: string): CatalogProblem | undefined {
  return byId.get(id);
}

export function publicQuestion(problem: CatalogProblem) {
  const { testCases, editorial, taskKey, references, ...content } = problem;
  return {
    ...content,
    acceptance: '—',
    submissions: '0',
    testCount: testCases?.length ?? 0,
    testCases: testCases?.filter(test => !test.isHidden),
  };
}

export function getEntryPoint(problem: CatalogProblem, language: string): string | undefined {
  const code = problem.starterCode?.[language as keyof NonNullable<Problem['starterCode']>];
  if (!code) return;
  if (language === 'python') return [...code.matchAll(/^def\s+(\w+)\(/gm)].at(-1)?.[1];
  if (language === 'javascript') return [...code.matchAll(/^function\s+(\w+)\(/gm)].at(-1)?.[1];
  return code.match(/^\s*(?:public\s+)?[\w<>[\]: ]+\s+(\w+)\([^\n]*\)\s*\{/m)?.[1];
}
