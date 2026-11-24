import { useCallback, useEffect, useMemo, useState } from 'react';
import { readStorage, writeStorage } from '../lib/storage';
import type { Problem } from '../types';

export interface CustomTestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  updatedAt: string;
}

export interface WorkspaceTestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  source: 'sample' | 'custom';
  explanation?: string;
}

const STORAGE_KEY = 'prismcode-custom-testcases';

function isCustomTestCase(value: unknown): value is CustomTestCase {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<CustomTestCase>;
  return typeof item.id === 'string'
    && typeof item.name === 'string'
    && typeof item.input === 'string'
    && typeof item.expectedOutput === 'string'
    && typeof item.updatedAt === 'string';
}

function readAllCustomCases(): Record<string, CustomTestCase[]> {
  const stored = readStorage<unknown>(STORAGE_KEY, {});
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {};
  const valid: Record<string, CustomTestCase[]> = {};
  for (const [problemId, list] of Object.entries(stored)) {
    if (Array.isArray(list)) {
      valid[problemId] = list.filter(isCustomTestCase);
    }
  }
  return valid;
}

function loadCustomCasesForProblem(problemId: string): CustomTestCase[] {
  return readAllCustomCases()[problemId] ?? [];
}

function saveCustomCasesForProblem(problemId: string, cases: CustomTestCase[]): void {
  const all = readAllCustomCases();
  if (cases.length === 0) {
    delete all[problemId];
  } else {
    all[problemId] = cases;
  }
  writeStorage(STORAGE_KEY, all);
}

export function useProblemTestCases(problem: Problem) {
  const sampleCases = useMemo<WorkspaceTestCase[]>(
    () => problem.examples.map((example, index) => ({
      id: `sample-${index}`,
      name: `Sample ${index + 1}`,
      input: example.input,
      expectedOutput: example.output,
      source: 'sample',
      explanation: example.explanation,
    })),
    [problem],
  );

  const [customRecords, setCustomRecords] = useState<CustomTestCase[]>(() => loadCustomCasesForProblem(problem.id));
  const [selectedCaseId, setSelectedCaseId] = useState<string>(() => sampleCases[0]?.id ?? loadCustomCasesForProblem(problem.id)[0]?.id ?? '');

  // Reload per-problem personal cases whenever the active problem changes.
  useEffect(() => {
    const loaded = loadCustomCasesForProblem(problem.id);
    setCustomRecords(loaded);
    setSelectedCaseId(problem.examples.length > 0 ? 'sample-0' : loaded[0]?.id ?? '');
  }, [problem.id, problem.examples.length]);

  const customCases = useMemo<WorkspaceTestCase[]>(
    () => customRecords.map((item) => ({
      id: item.id,
      name: item.name,
      input: item.input,
      expectedOutput: item.expectedOutput,
      source: 'custom',
    })),
    [customRecords],
  );

  const allCases = useMemo<WorkspaceTestCase[]>(
    () => [...sampleCases, ...customCases],
    [sampleCases, customCases],
  );

  const selectedCase = useMemo<WorkspaceTestCase | null>(
    () => allCases.find((item) => item.id === selectedCaseId) ?? allCases[0] ?? null,
    [allCases, selectedCaseId],
  );

  const addCustomCase = useCallback((seed?: { name?: string; input?: string; expectedOutput?: string }) => {
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const updatedAt = new Date().toISOString();
    const fallbackInput = problem.examples[0]?.input ?? '';

    setCustomRecords((current) => {
      const created: CustomTestCase = {
        id,
        name: seed?.name?.trim() || `Custom ${current.length + 1}`,
        input: seed?.input ?? fallbackInput,
        expectedOutput: seed?.expectedOutput ?? '',
        updatedAt,
      };
      const next = [...current, created];
      saveCustomCasesForProblem(problem.id, next);
      return next;
    });
    setSelectedCaseId(id);
    return id;
  }, [problem.id, problem.examples]);

  const updateCustomCase = useCallback((
    id: string,
    patch: Partial<Pick<CustomTestCase, 'name' | 'input' | 'expectedOutput'>>,
  ) => {
    setCustomRecords((current) => {
      const next = current.map((item) => (
        item.id === id
          ? { ...item, ...patch, updatedAt: new Date().toISOString() }
          : item
      ));
      saveCustomCasesForProblem(problem.id, next);
      return next;
    });
  }, [problem.id]);

  const deleteCustomCase = useCallback((id: string) => {
    const idx = customRecords.findIndex((item) => item.id === id);
    const next = customRecords.filter((item) => item.id !== id);
    saveCustomCasesForProblem(problem.id, next);
    setCustomRecords(next);

    if (selectedCaseId === id) {
      const fallbackCustom = next[Math.max(0, idx - 1)] ?? next[0];
      setSelectedCaseId(fallbackCustom?.id ?? sampleCases[0]?.id ?? '');
    }
  }, [customRecords, problem.id, sampleCases, selectedCaseId]);

  const cloneSampleToCustom = useCallback((sample: WorkspaceTestCase) => {
    return addCustomCase({
      name: `${sample.name} (Copy)`,
      input: sample.input,
      expectedOutput: sample.expectedOutput,
    });
  }, [addCustomCase]);

  return {
    sampleCases,
    customCases,
    allCases,
    selectedCase,
    selectedCaseId: selectedCase?.id ?? '',
    selectCase: setSelectedCaseId,
    addCustomCase,
    updateCustomCase,
    deleteCustomCase,
    cloneSampleToCustom,
  };
}
