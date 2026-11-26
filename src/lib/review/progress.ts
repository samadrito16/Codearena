import { useState, useEffect, useCallback } from 'react';
import {
  OverallReviewStats,
  ReviewProgressStore,
  ReviewTestResult,
  ScenarioAttempt,
} from '../../types/review';
import { reviewCatalog } from './catalog';

const STORAGE_KEY = 'prism_review_progress_v2';
const EVENT_NAME = 'prism-review-progress-changed';

const DEFAULT_ATTEMPT = (scenarioId: string): ScenarioAttempt => ({
  scenarioId,
  editedFiles: {},
  hintsUsed: {},
  startedAt: new Date().toISOString(),
});

function readStore(): ReviewProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: '2.0.0', attempts: {} };
    const parsed = JSON.parse(raw);
    const attempts: Record<string, ScenarioAttempt> = {};
    for (const [id, att] of Object.entries(parsed.attempts || {})) {
      const a = att as Partial<ScenarioAttempt>;
      attempts[id] = {
        scenarioId: id,
        editedFiles: a.editedFiles || {},
        testResults: a.testResults,
        testsPassedCount: a.testsPassedCount,
        totalTestsCount: a.totalTestsCount,
        verifiedFixed: Boolean(a.verifiedFixed),
        score: a.score,
        maxScore: a.maxScore,
        referenceRevealed: Boolean(a.referenceRevealed),
        hintsUsed: a.hintsUsed || {},
        startedAt: a.startedAt || new Date().toISOString(),
        completedAt: a.completedAt,
        bestScore: a.bestScore,
      };
    }
    return {
      version: parsed.version || '2.0.0',
      attempts,
    };
  } catch {
    return { version: '2.0.0', attempts: {} };
  }
}

function writeStore(store: ReviewProgressStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    }
  } catch (err) {
    console.error('Failed to save review progress:', err);
  }
}

export function useReviewProgress() {
  const [store, setStore] = useState<ReviewProgressStore>(readStore);

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

  const getAttempt = useCallback(
    (scenarioId: string): ScenarioAttempt => {
      return store.attempts[scenarioId] || DEFAULT_ATTEMPT(scenarioId);
    },
    [store],
  );

  const saveEditedFile = useCallback(
    (scenarioId: string, filename: string, content: string) => {
      const current = readStore();
      const attempt = current.attempts[scenarioId] || DEFAULT_ATTEMPT(scenarioId);
      current.attempts[scenarioId] = {
        ...attempt,
        editedFiles: {
          ...attempt.editedFiles,
          [filename]: content,
        },
      };
      writeStore(current);
    },
    [],
  );

  const saveEditedFilesBatch = useCallback(
    (scenarioId: string, filesMap: Record<string, string>) => {
      const current = readStore();
      const attempt = current.attempts[scenarioId] || DEFAULT_ATTEMPT(scenarioId);
      current.attempts[scenarioId] = {
        ...attempt,
        editedFiles: filesMap,
      };
      writeStore(current);
    },
    [],
  );

  const resetEditedFiles = useCallback((scenarioId: string) => {
    const current = readStore();
    const attempt = current.attempts[scenarioId] || DEFAULT_ATTEMPT(scenarioId);
    current.attempts[scenarioId] = {
      ...attempt,
      editedFiles: {},
      testResults: undefined,
      testsPassedCount: undefined,
    };
    writeStore(current);
  }, []);

  const useHint = useCallback(
    (scenarioId: string, bugId: string, level: number) => {
      const current = readStore();
      const attempt = current.attempts[scenarioId] || DEFAULT_ATTEMPT(scenarioId);
      const currentLevel = attempt.hintsUsed[bugId] || 0;
      if (level > currentLevel) {
        current.attempts[scenarioId] = {
          ...attempt,
          hintsUsed: {
            ...attempt.hintsUsed,
            [bugId]: level,
          },
        };
        writeStore(current);
      }
    },
    [],
  );

  const recordTestRun = useCallback(
    (scenarioId: string, results: ReviewTestResult[], maxScore: number) => {
      const current = readStore();
      const attempt = current.attempts[scenarioId] || DEFAULT_ATTEMPT(scenarioId);
      const passedCount = results.filter((r) => r.passed).length;
      const totalCount = results.length;
      const allPassed = totalCount > 0 && passedCount === totalCount;
      const earnedScore = allPassed
        ? maxScore
        : totalCount > 0
        ? Math.round((passedCount / totalCount) * maxScore * 0.5)
        : 0;

      const prevBest = attempt.bestScore || 0;
      const wasFixed = Boolean(attempt.verifiedFixed);

      current.attempts[scenarioId] = {
        ...attempt,
        testResults: results,
        testsPassedCount: passedCount,
        totalTestsCount: totalCount,
        verifiedFixed: wasFixed || allPassed,
        score: allPassed ? maxScore : attempt.score ?? earnedScore,
        maxScore,
        bestScore: Math.max(prevBest, allPassed ? maxScore : earnedScore),
        completedAt: allPassed ? attempt.completedAt || new Date().toISOString() : attempt.completedAt,
      };
      writeStore(current);
    },
    [],
  );

  const revealReference = useCallback((scenarioId: string) => {
    const current = readStore();
    const attempt = current.attempts[scenarioId] || DEFAULT_ATTEMPT(scenarioId);
    current.attempts[scenarioId] = {
      ...attempt,
      referenceRevealed: true,
    };
    writeStore(current);
  }, []);

  const getOverallStats = useCallback((): OverallReviewStats => {
    const scenarios = reviewCatalog.scenarios;
    let attempted = 0;
    let fixed = 0;
    let totalTestsPassing = 0;
    let pointsEarned = 0;
    let maxPoints = 0;

    const catStats: Record<string, { total: number; completed: number }> = {
      async_concurrency: { total: 0, completed: 0 },
      ai_gen_audit: { total: 0, completed: 0 },
      multi_file_logic: { total: 0, completed: 0 },
      security_audit: { total: 0, completed: 0 },
      performance_regression: { total: 0, completed: 0 },
    };

    for (const sc of scenarios) {
      if (catStats[sc.category]) {
        catStats[sc.category].total += 1;
      }
      maxPoints += sc.review_rubric.max_score;

      const attempt = store.attempts[sc.id];
      if (attempt) {
        const hasEdits = Object.keys(attempt.editedFiles || {}).length > 0;
        if (hasEdits || attempt.testResults !== undefined) {
          attempted += 1;
        }
        totalTestsPassing += attempt.testsPassedCount || 0;
        if (attempt.verifiedFixed) {
          fixed += 1;
          pointsEarned += attempt.bestScore ?? sc.review_rubric.max_score;
          if (catStats[sc.category]) {
            catStats[sc.category].completed += 1;
          }
        } else if (attempt.bestScore) {
          pointsEarned += attempt.bestScore;
        }
      }
    }

    return {
      totalScenarios: scenarios.length,
      attemptedScenarios: attempted,
      fixedScenarios: fixed,
      totalTestsPassing,
      totalPointsEarned: pointsEarned,
      totalMaxPoints: maxPoints,
      categoryStats: catStats as OverallReviewStats['categoryStats'],
    };
  }, [store]);

  return {
    store,
    getAttempt,
    saveEditedFile,
    saveEditedFilesBatch,
    resetEditedFiles,
    useHint,
    recordTestRun,
    revealReference,
    getOverallStats,
  };
}
