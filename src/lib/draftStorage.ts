import { starterCodeByProblemId } from '../data/starterTemplates';
import { isCodeLanguage } from './codeLanguages';
import { readStorage, writeStorage, writeStorageSafe, type StorageWriteResult } from './storage';
import type { CodeLanguage, Problem } from '../types';

export { isCodeLanguage, type CodeLanguage };

export interface DraftEntry {
  code: string;
  updatedAt: string;
}

const DRAFTS_STORAGE_KEY = 'prismcode-code-drafts';
const LANGUAGES_STORAGE_KEY = 'prismcode-problem-languages';

function extractJsSignature(problem: Problem): { name: string; params: string[] } {
  const jsCode = problem.starterCode?.javascript ?? starterCodeByProblemId[problem.id]?.javascript ?? '';
  const matches = [...jsCode.matchAll(/^function\s+([A-Za-z_$][\w$]*)\(([^)]*)\)/gm)];
  const match = matches.length > 0 ? matches[matches.length - 1] : undefined;
  if (!match) {
    return { name: 'solution', params: ['input'] };
  }
  const params = match[2]
    .split(',')
    .map((p: string) => p.trim())
    .filter(Boolean);
  return { name: match[1], params: params.length ? params : ['input'] };
}

export function getStarterCode(problem: Problem, language: CodeLanguage): string {
  const fromProblem = problem.starterCode?.[language];
  if (typeof fromProblem === 'string' && fromProblem.length > 0) return fromProblem;

  const fromFixture = starterCodeByProblemId[problem.id]?.[language];
  if (fromFixture) return fromFixture;

  const titleComment = problem.title.replace(/[\r\n]+/g, ' ').trim();
  const { name, params } = extractJsSignature(problem);

  switch (language) {
    case 'javascript':
      return `// ${titleComment}\nfunction ${name}(${params.join(', ')}) {\n  // Write your solution here\n  return null;\n}\n`;
    case 'python':
      return `# ${titleComment}\ndef ${name}(${params.join(', ')}):\n    # Write your solution here\n    return None\n`;
    case 'typescript':
      return `// ${titleComment}\nfunction ${name}(${params.map((p) => `${p}: unknown`).join(', ')}): unknown {\n  // Write your solution here\n  return null;\n}\n`;
    case 'java':
      return `// ${titleComment}\nclass Solution {\n    public Object ${name}(${params.map((p) => `Object ${p}`).join(', ')}) {\n        // Write your solution here\n        return null;\n    }\n}\n`;
    case 'cpp':
      return `// ${titleComment}\n#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    void ${name}() {\n        // Write your solution here\n    }\n};\n`;
    case 'c':
      return `// ${titleComment}\n#include <stdbool.h>\n#include <stdlib.h>\n\nint ${name}(${params.map((p) => `int ${p}`).join(', ')}) {\n    // Write your solution here\n    return 0;\n}\n`;
    case 'go':
      return `// ${titleComment}\npackage main\n\nfunc ${name}(${params.map((p) => `${p} int`).join(', ')}) int {\n\t// Write your solution here\n\treturn 0\n}\n`;
    case 'rust':
      return `// ${titleComment}\nfn ${name}(${params.map((p) => `${p}: i32`).join(', ')}) -> i32 {\n    // Write your solution here\n    0\n}\n`;
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
