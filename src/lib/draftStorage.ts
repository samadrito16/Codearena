import { starterCodeByProblemId } from '../data/starterTemplates';
import { readStorage, writeStorage, writeStorageSafe, type StorageWriteResult } from './storage';
import type { CodeLanguage, Problem } from '../types';

export type { CodeLanguage };

export interface DraftEntry {
  code: string;
  updatedAt: string;
}

const DRAFTS_STORAGE_KEY = 'codearena-code-drafts';
const LANGUAGES_STORAGE_KEY = 'codearena-problem-languages';
const VALID_LANGUAGES: readonly CodeLanguage[] = ['javascript', 'python', 'java', 'cpp'];

export function isCodeLanguage(value: unknown): value is CodeLanguage {
  return typeof value === 'string' && (VALID_LANGUAGES as readonly string[]).includes(value);
}

export function getStarterCode(problem: Problem, language: CodeLanguage): string {
  const fromProblem = problem.starterCode?.[language];
  if (typeof fromProblem === 'string' && fromProblem.length > 0) return fromProblem;

  const fromFixture = starterCodeByProblemId[problem.id]?.[language];
  if (fromFixture) return fromFixture;

  const titleComment = problem.title.replace(/[\r\n]+/g, ' ').trim();
  switch (language) {
    case 'javascript':
      return `// ${titleComment}\nfunction solution(input) {\n  // Write your solution here\n  return null;\n}\n`;
    case 'python':
      return `# ${titleComment}\ndef solution(data):\n    # Write your solution here\n    return None\n`;
    case 'java':
      return `// ${titleComment}\nclass Solution {\n    public Object solution(Object input) {\n        // Write your solution here\n        return null;\n    }\n}\n`;
    case 'cpp':
      return `// ${titleComment}\n#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Write your solution here\n    }\n};\n`;
  }
}

export function makeDraftKey(problemId: string, language: CodeLanguage): string {
  return `${problemId}:${language}`;
}

function readAllDrafts(): Record<string, DraftEntry> {
  const stored = readStorage<unknown>(DRAFTS_STORAGE_KEY, {});
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {};
  const valid: Record<string, DraftEntry> = {};
  for (const [key, value] of Object.entries(stored)) {
    if (value && typeof value === 'object') {
      const candidate = value as Partial<DraftEntry>;
      if (typeof candidate.code === 'string' && typeof candidate.updatedAt === 'string') {
        valid[key] = { code: candidate.code, updatedAt: candidate.updatedAt };
      }
    }
  }
  return valid;
}

export function loadDraft(problemId: string, language: CodeLanguage): DraftEntry | null {
  const drafts = readAllDrafts();
  return drafts[makeDraftKey(problemId, language)] ?? null;
}

export type SaveDraftResult =
  | { ok: true; entry: DraftEntry }
  | { ok: false; error: string };

export function saveDraft(problemId: string, language: CodeLanguage, code: string): SaveDraftResult {
  const drafts = readAllDrafts();
  const entry: DraftEntry = { code, updatedAt: new Date().toISOString() };
  drafts[makeDraftKey(problemId, language)] = entry;
  const result = writeStorageSafe(DRAFTS_STORAGE_KEY, drafts);
  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  return { ok: true, entry };
}

export function clearDraft(problemId: string, language: CodeLanguage): StorageWriteResult {
  const drafts = readAllDrafts();
  const key = makeDraftKey(problemId, language);
  if (!(key in drafts)) return { ok: true };
  delete drafts[key];
  return writeStorageSafe(DRAFTS_STORAGE_KEY, drafts);
}

function readLanguageMap(): Record<string, CodeLanguage> {
  const stored = readStorage<unknown>(LANGUAGES_STORAGE_KEY, {});
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {};
  const valid: Record<string, CodeLanguage> = {};
  for (const [problemId, lang] of Object.entries(stored)) {
    if (isCodeLanguage(lang)) valid[problemId] = lang;
  }
  return valid;
}

export function loadProblemLanguage(problemId: string): CodeLanguage {
  return readLanguageMap()[problemId] ?? 'javascript';
}

export function saveProblemLanguage(problemId: string, language: CodeLanguage): void {
  const map = readLanguageMap();
  map[problemId] = language;
  writeStorage(LANGUAGES_STORAGE_KEY, map);
}
