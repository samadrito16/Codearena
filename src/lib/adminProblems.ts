import type { Difficulty, Problem } from '../types';

export interface ExampleDraft {
  input: string;
  output: string;
  explanation: string;
}

export interface ProblemFormDraft {
  id: string;
  title: string;
  difficulty: Difficulty;
  topicsText: string;
  acceptance: string;
  description: string;
  examples: ExampleDraft[];
  constraints: string[];
}

export interface ProblemValidationResult {
  errors: string[];
  warnings: string[];
  duplicateIdMatch: Problem | null;
  duplicateTitleMatch: Problem | null;
  normalized: Problem;
}

export interface AcceptedImportRow {
  row: number;
  problem: Problem;
  warnings: string[];
}

export interface RejectedImportRow {
  row: number;
  label: string;
  reasons: string[];
}

export interface ImportReport {
  fileName: string;
  totalRows: number;
  accepted: AcceptedImportRow[];
  rejected: RejectedImportRow[];
}

const VALID_ID_PATTERN = /^[a-z0-9][a-z0-9-_]*$/;

export function slugifyProblemId(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseTopicsText(value: unknown): string[] {
  if (Array.isArray(value)) {
    return Array.from(new Set(value.map((item) => String(item).trim()).filter(Boolean)));
  }
  if (typeof value === 'string') {
    return Array.from(new Set(value.split(',').map((item) => item.trim()).filter(Boolean)));
  }
  return [];
}

export function createEmptyDraft(): ProblemFormDraft {
  return {
    id: '',
    title: '',
    difficulty: 'Easy',
    topicsText: 'Array, Hash Table',
    acceptance: '—',
    description: '',
    examples: [{ input: '', output: '', explanation: '' }],
    constraints: [''],
  };
}

export function draftFromProblem(problem: Problem): ProblemFormDraft {
  return {
    id: problem.id,
    title: problem.title,
    difficulty: problem.difficulty,
    topicsText: problem.topics.join(', '),
    acceptance: problem.acceptance || '—',
    description: problem.description,
    examples: problem.examples.length
      ? problem.examples.map((ex) => ({
          input: ex.input,
          output: ex.output,
          explanation: ex.explanation ?? '',
        }))
      : [{ input: '', output: '', explanation: '' }],
    constraints: problem.constraints.length ? [...problem.constraints] : [''],
  };
}

export function validateProblemDraft(
  draft: ProblemFormDraft,
  existingProblems: Problem[],
  editingId: string | null = null,
): ProblemValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const title = draft.title.trim();
  const id = (draft.id.trim() || slugifyProblemId(title)).toLowerCase();
  const topics = parseTopicsText(draft.topicsText);
  const description = draft.description.trim();
  const acceptance = draft.acceptance.trim() || '—';

  if (!title) {
    errors.push('Question title is required.');
  } else if (title.length < 2) {
    errors.push('Question title must be at least 2 characters.');
  }

  if (!id) {
    errors.push('Question ID is required (enter a title or custom slug ID).');
  } else if (!VALID_ID_PATTERN.test(id)) {
    errors.push('Question ID may only contain lowercase letters, numbers, hyphens, and underscores.');
  }

  if (topics.length === 0) {
    errors.push('Add at least one topic tag (comma-separated).');
  }

  if (!description) {
    errors.push('Problem statement is required.');
  } else if (description.length < 10) {
    errors.push('Problem statement should be at least 10 characters.');
  }

  // Validate examples: at least one valid example, and no half-filled/malformed rows
  const validExamples: Problem['examples'] = [];
  if (draft.examples.length === 0) {
    errors.push('Add at least one example with input and output.');
  } else {
    draft.examples.forEach((ex, index) => {
      const input = ex.input.trim();
      const output = ex.output.trim();
      const explanation = ex.explanation.trim();
      if (!input && !output) {
        errors.push(`Example ${index + 1} is empty — fill in input and output or remove the row.`);
      } else if (!input) {
        errors.push(`Example ${index + 1} is missing an input.`);
      } else if (!output) {
        errors.push(`Example ${index + 1} is missing an expected output.`);
      } else {
        validExamples.push({
          input,
          output,
          ...(explanation ? { explanation } : {}),
        });
      }
    });
  }

  // Validate constraints: allow deleting unused blank rows or flag empty rows if user added multiple
  const trimmedConstraints = draft.constraints.map((item) => item.trim());
  const nonEmptyConstraints = trimmedConstraints.filter(Boolean);
  if (draft.constraints.length > 1 && trimmedConstraints.some((item) => !item)) {
    errors.push('Remove or fill in empty constraint rows.');
  }
  if (nonEmptyConstraints.length === 0) {
    warnings.push('No constraints added yet — adding input bounds helps learners gauge complexity.');
  }

  // Duplicate ID & Duplicate Title checks (excluding the record currently being edited)
  const otherProblems = existingProblems.filter((item) => item.id !== editingId);
  const duplicateIdMatch = id
    ? otherProblems.find((item) => item.id.toLowerCase() === id) ?? null
    : null;
  const duplicateTitleMatch = title
    ? otherProblems.find((item) => item.title.trim().toLowerCase() === title.toLowerCase()) ?? null
    : null;

  if (duplicateIdMatch) {
    errors.push(`Duplicate ID “${id}” already belongs to “${duplicateIdMatch.title}”. Choose a unique ID.`);
  }
  if (duplicateTitleMatch) {
    warnings.push(`Duplicate title warning: “${duplicateTitleMatch.title}” (ID: ${duplicateTitleMatch.id}) already uses this title.`);
  }

  const normalized: Problem = {
    id,
    title,
    difficulty: draft.difficulty,
    topics,
    acceptance,
    submissions: editingId
      ? (existingProblems.find((item) => item.id === editingId)?.submissions ?? '0')
      : '0',
    description,
    examples: validExamples,
    constraints: nonEmptyConstraints,
  };

  return {
    errors,
    warnings,
    duplicateIdMatch,
    duplicateTitleMatch,
    normalized,
  };
}

function parseDifficultyStrict(value: unknown): Difficulty | null {
  if (typeof value !== 'string') return null;
  const lower = value.trim().toLowerCase();
  if (lower === 'easy') return 'Easy';
  if (lower === 'medium') return 'Medium';
  if (lower === 'hard') return 'Hard';
  return null;
}

export function parseAndValidateImport(
  text: string,
  fileName: string,
  existingProblems: Problem[],
): ImportReport {
  const accepted: AcceptedImportRow[] = [];
  const rejected: RejectedImportRow[] = [];

  const isLineDelimited = fileName.toLowerCase().endsWith('.jsonl') || fileName.toLowerCase().endsWith('.ndjson');
  const rawEntries: { row: number; parsed?: unknown; parseError?: string }[] = [];

  if (isLineDelimited) {
    const lines = text.split(/\r?\n/);
    lines.forEach((line, idx) => {
      if (!line.trim()) return;
      try {
        rawEntries.push({ row: idx + 1, parsed: JSON.parse(line) });
      } catch (err) {
        rawEntries.push({
          row: idx + 1,
          parseError: err instanceof Error ? `Invalid JSON syntax (${err.message})` : 'Invalid JSON line.',
        });
      }
    });
  } else {
    try {
      const parsed: unknown = JSON.parse(text);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      list.forEach((item, idx) => rawEntries.push({ row: idx + 1, parsed: item }));
    } catch (err) {
      return {
        fileName,
        totalRows: 1,
        accepted: [],
        rejected: [{
          row: 1,
          label: fileName,
          reasons: [err instanceof Error ? `Invalid JSON file: ${err.message}` : 'Could not parse JSON file.'],
        }],
      };
    }
  }

  const seenIds = new Set(existingProblems.map((item) => item.id.toLowerCase()));
  const seenTitles = new Map(existingProblems.map((item) => [item.title.trim().toLowerCase(), item.id]));

  for (const entry of rawEntries) {
    if (entry.parseError) {
      rejected.push({ row: entry.row, label: `Line ${entry.row}`, reasons: [entry.parseError] });
      continue;
    }
    if (!entry.parsed || typeof entry.parsed !== 'object' || Array.isArray(entry.parsed)) {
      rejected.push({ row: entry.row, label: `Row ${entry.row}`, reasons: ['Record must be a JSON object.'] });
      continue;
    }

    const raw = entry.parsed as Record<string, unknown>;
    const reasons: string[] = [];
    const warnings: string[] = [];

    const rawTitle = typeof raw.title === 'string' ? raw.title.trim() : (typeof raw.name === 'string' ? raw.name.trim() : '');
    const label = rawTitle || (typeof raw.id === 'string' && raw.id.trim() ? raw.id.trim() : `Row ${entry.row}`);

    if (!rawTitle) {
      reasons.push('Missing required field "title".');
    }

    const rawId = typeof raw.id === 'string' && raw.id.trim()
      ? raw.id.trim().toLowerCase()
      : slugifyProblemId(rawTitle);
    if (!rawId) {
      reasons.push('Missing valid "id" (and could not derive one from title).');
    } else if (!VALID_ID_PATTERN.test(rawId)) {
      reasons.push(`Invalid id "${rawId}" (use lowercase letters, numbers, hyphens, or underscores).`);
    } else if (seenIds.has(rawId)) {
      reasons.push(`Duplicate ID "${rawId}" already exists in the library or earlier in this file.`);
    }

    const difficulty = raw.difficulty === undefined ? 'Medium' : parseDifficultyStrict(raw.difficulty);
    if (!difficulty) {
      reasons.push(`Invalid difficulty "${String(raw.difficulty)}" (expected Easy, Medium, or Hard).`);
    }

    const statement = typeof raw.statement === 'string'
      ? raw.statement.trim()
      : (typeof raw.description === 'string' ? raw.description.trim() : '');
    if (!statement) {
      reasons.push('Missing required field "statement" / "description".');
    }

    const topics = parseTopicsText(raw.topics ?? raw.tags);
    if (topics.length === 0) {
      warnings.push('No topics/tags provided.');
    }

    const examples: Problem['examples'] = [];
    if (raw.examples !== undefined) {
      if (!Array.isArray(raw.examples)) {
        reasons.push('"examples" must be an array of { input, output } objects.');
      } else {
        raw.examples.forEach((ex, exIdx) => {
          if (!ex || typeof ex !== 'object' || Array.isArray(ex)) {
            reasons.push(`Example ${exIdx + 1} is not an object.`);
            return;
          }
          const rec = ex as Record<string, unknown>;
          const input = rec.input !== undefined && rec.input !== null ? String(rec.input).trim() : '';
          const output = rec.output !== undefined && rec.output !== null ? String(rec.output).trim() : '';
          const explanation = rec.explanation !== undefined && rec.explanation !== null ? String(rec.explanation).trim() : '';
          if (!input || !output) {
            reasons.push(`Example ${exIdx + 1} is malformed (requires both non-empty "input" and "output").`);
          } else {
            examples.push({ input, output, ...(explanation ? { explanation } : {}) });
          }
        });
      }
    } else {
      warnings.push('No examples provided.');
    }

    let constraints: string[] = [];
    if (raw.constraints !== undefined) {
      if (Array.isArray(raw.constraints)) {
        constraints = raw.constraints.map((c) => String(c).trim()).filter(Boolean);
      } else if (typeof raw.constraints === 'string') {
        constraints = raw.constraints.split(/\r?\n/).map((c) => c.trim()).filter(Boolean);
      } else {
        reasons.push('"constraints" must be an array of strings or newline-separated string.');
      }
    }

    if (reasons.length > 0) {
      rejected.push({ row: entry.row, label, reasons });
      continue;
    }

    const titleKey = rawTitle.toLowerCase();
    const existingTitleId = seenTitles.get(titleKey);
    if (existingTitleId) {
      warnings.push(`Duplicate title: matches existing problem "${existingTitleId}".`);
    }

    seenIds.add(rawId);
    seenTitles.set(titleKey, rawId);

    accepted.push({
      row: entry.row,
      warnings,
      problem: {
        id: rawId,
        title: rawTitle,
        difficulty: difficulty!,
        topics,
        acceptance: typeof raw.acceptance === 'string' && raw.acceptance.trim() ? raw.acceptance.trim() : '—',
        submissions: typeof raw.submissions === 'string' && raw.submissions.trim() ? raw.submissions.trim() : '0',
        description: statement,
        examples,
        constraints,
      },
    });
  }

  return {
    fileName,
    totalRows: rawEntries.length,
    accepted,
    rejected,
  };
}

export function exportProblemsJson(problems: Problem[]): string {
  const dateStamp = new Date().toISOString().slice(0, 10);
  const fileName = `codearena-question-bank-${dateStamp}.json`;
  const json = JSON.stringify(problems, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
  return fileName;
}
