import { useState, useEffect, useCallback } from 'react';
import { ProblemProgress, MasteryProgressStore, OverallMasteryStats, PatternId, RecallResult } from '../../types/mastery';
import { masteryCatalog, SUPPORTED_PATTERNS } from './catalog';

const STORAGE_KEY = 'prism_mastery_progress_v1';
const EVENT_NAME = 'prism:mastery-progress-update';

const DEFAULT_PROBLEM_PROGRESS: ProblemProgress = {
  diagnosed: false,
  selectedPattern: null,
  hintsUnlocked: 0,
  recallResults: {},
  mistakeNote: '',
  completed: false,
  lastStudiedAt: null,
};

function readStore(): MasteryProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: '1.1.0', problems: {} };
    const parsed = JSON.parse(raw);
    return {
      version: parsed.version || '1.1.0',
      problems: parsed.problems || {},
    };
  } catch {
    return { version: '1.1.0', problems: {} };
  }
}

function writeStore(store: MasteryProgressStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    }
  } catch (err) {
    console.error('Failed to save mastery progress:', err);
  }
}

export function useMasteryProgress() {
  const [store, setStore] = useState<MasteryProgressStore>(readStore);

  useEffect(() => {
    const handler = () => {
      setStore(readStore());
    };
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(EVENT_NAME, handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const getProblemProgress = useCallback(
    (problemId: string): ProblemProgress => {
      return store.problems[problemId] || { ...DEFAULT_PROBLEM_PROGRESS };
    },
    [store]
  );

  const recordDiagnosis = useCallback(
    (problemId: string, selectedPattern: string) => {
      const current = readStore();
      const problem = current.problems[problemId] || { ...DEFAULT_PROBLEM_PROGRESS };
      current.problems[problemId] = {
        ...problem,
        diagnosed: true,
        selectedPattern,
        lastStudiedAt: new Date().toISOString(),
      };
      writeStore(current);
    },
    []
  );

  const unlockNextHint = useCallback(
    (problemId: string, maxHints: number) => {
      const current = readStore();
      const problem = current.problems[problemId] || { ...DEFAULT_PROBLEM_PROGRESS };
      const nextUnlocked = Math.min(problem.hintsUnlocked + 1, maxHints);
      current.problems[problemId] = {
        ...problem,
        hintsUnlocked: nextUnlocked,
        lastStudiedAt: new Date().toISOString(),
      };
      writeStore(current);
    },
    []
  );

  const recordRecall = useCallback(
    (problemId: string, lineNumber: number, result: RecallResult) => {
      const current = readStore();
      const problem = current.problems[problemId] || { ...DEFAULT_PROBLEM_PROGRESS };
      current.problems[problemId] = {
        ...problem,
        recallResults: {
          ...problem.recallResults,
          [lineNumber]: result,
        },
        lastStudiedAt: new Date().toISOString(),
      };
      writeStore(current);
    },
    []
  );

  const saveMistakeNote = useCallback(
    (problemId: string, note: string) => {
      const current = readStore();
      const problem = current.problems[problemId] || { ...DEFAULT_PROBLEM_PROGRESS };
      current.problems[problemId] = {
        ...problem,
        mistakeNote: note,
        lastStudiedAt: new Date().toISOString(),
      };
      writeStore(current);
    },
    []
  );

  const toggleCompleted = useCallback(
    (problemId: string) => {
      const current = readStore();
      const problem = current.problems[problemId] || { ...DEFAULT_PROBLEM_PROGRESS };
      const nextCompleted = !problem.completed;
      current.problems[problemId] = {
        ...problem,
        completed: nextCompleted,
        lastStudiedAt: new Date().toISOString(),
      };
      writeStore(current);
      return nextCompleted;
    },
    []
  );

  const getOverallStats = useCallback((): OverallMasteryStats => {
    const problems = masteryCatalog.problems;
    let completedCount = 0;
    let totalHighRisk = 0;
    let testedHighRisk = 0;
    let masteredHighRisk = 0;

    const patternMap: Record<PatternId, { total: number; completed: number }> = {
      two_pointers: { total: 0, completed: 0 },
      sliding_window: { total: 0, completed: 0 },
      hash_maps: { total: 0, completed: 0 },
      dynamic_programming: { total: 0, completed: 0 },
      breadth_first_search: { total: 0, completed: 0 },
    };

    for (const p of problems) {
      patternMap[p.pattern].total += 1;
      const prog = store.problems[p.id];
      if (prog?.completed) {
        completedCount += 1;
        patternMap[p.pattern].completed += 1;
      }

      const highRiskLines = p.optimal_solution.code_lines.filter((l) => l.is_high_risk);
      totalHighRisk += highRiskLines.length;

      if (prog?.recallResults) {
        for (const line of highRiskLines) {
          const res = prog.recallResults[line.line_number];
          if (res) {
            testedHighRisk += 1;
            if (res === 'got_it') {
              masteredHighRisk += 1;
            }
          }
        }
      }
    }

    return {
      totalBlueprints: problems.length,
      completedBlueprints: completedCount,
      totalHighRiskLines: totalHighRisk,
      testedHighRiskLines: testedHighRisk,
      masteredHighRiskLines: masteredHighRisk,
      patternCompletion: patternMap,
    };
  }, [store]);

  return {
    store,
    getProblemProgress,
    recordDiagnosis,
    unlockNextHint,
    recordRecall,
    saveMistakeNote,
    toggleCompleted,
    getOverallStats,
  };
}
