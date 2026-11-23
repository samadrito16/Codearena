import { useState, useEffect, useCallback } from 'react';
import {
  LineAnnotation,
  OverallReviewStats,
  ReviewProgressStore,
  ScenarioAttempt,
} from '../../types/review';
import { reviewCatalog } from './catalog';

const STORAGE_KEY = 'prism_review_progress_v1';
const EVENT_NAME = 'prism-review-progress-changed';

const DEFAULT_ATTEMPT = (scenarioId: string): ScenarioAttempt => ({
  scenarioId,
  annotations: [],
  hintsUsed: {},
  startedAt: new Date().toISOString(),
});

function readStore(): ReviewProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: '1.0.0', attempts: {} };
    const parsed = JSON.parse(raw);
    return {
      version: parsed.version || '1.0.0',
      attempts: parsed.attempts || {},
    };
  } catch {
    return { version: '1.0.0', attempts: {} };
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
    [store]
  );

  const addAnnotation = useCallback(
    (scenarioId: string, annotation: LineAnnotation) => {
      const current = readStore();
      const attempt = current.attempts[scenarioId] || DEFAULT_ATTEMPT(scenarioId);
      current.attempts[scenarioId] = {
        ...attempt,
        annotations: [...attempt.annotations, annotation],
      };
      writeStore(current);
    },
    []
  );

  const removeAnnotation = useCallback(
    (scenarioId: string, annotationId: string) => {
      const current = readStore();
      const attempt = current.attempts[scenarioId] || DEFAULT_ATTEMPT(scenarioId);
      current.attempts[scenarioId] = {
        ...attempt,
        annotations: attempt.annotations.filter((a) => a.id !== annotationId),
      };
      writeStore(current);
    },
    []
  );

  const updateAnnotationComment = useCallback(
    (scenarioId: string, annotationId: string, newComment: string) => {
      const current = readStore();
      const attempt = current.attempts[scenarioId] || DEFAULT_ATTEMPT(scenarioId);
      current.attempts[scenarioId] = {
        ...attempt,
        annotations: attempt.annotations.map((a) =>
          a.id === annotationId ? { ...a, comment: newComment } : a
        ),
      };
      writeStore(current);
    },
    []
  );

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
    []
  );

  const recordGrade = useCallback(
    (scenarioId: string, score: number, maxScore: number, matchedBugIds: string[]) => {
      const current = readStore();
      const attempt = current.attempts[scenarioId] || DEFAULT_ATTEMPT(scenarioId);
      const prevBest = attempt.bestScore || 0;
      current.attempts[scenarioId] = {
        ...attempt,
        score,
        maxScore,
        matchedBugIds,
        bestScore: Math.max(prevBest, score),
        rubricRevealed: true,
        completedAt: new Date().toISOString(),
      };
      writeStore(current);
    },
    []
  );

  const revealReference = useCallback(
    (scenarioId: string) => {
      const current = readStore();
      const attempt = current.attempts[scenarioId] || DEFAULT_ATTEMPT(scenarioId);
      current.attempts[scenarioId] = {
        ...attempt,
        referenceRevealed: true,
      };
      writeStore(current);
    },
    []
  );

  const getOverallStats = useCallback((): OverallReviewStats => {
    const scenarios = reviewCatalog.scenarios;
    let attempted = 0;
    let reviewed = 0;
    let bugsCaught = 0;
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
        if (attempt.annotations.length > 0 || attempt.score !== undefined) {
          attempted += 1;
        }
        if (attempt.score !== undefined) {
          reviewed += 1;
          pointsEarned += attempt.score;
          bugsCaught += (attempt.matchedBugIds || []).length;
          if (catStats[sc.category]) {
            catStats[sc.category].completed += 1;
          }
        }
      }
    }

    return {
      totalScenarios: scenarios.length,
      attemptedScenarios: attempted,
      reviewedScenarios: reviewed,
      totalBugsCaught: bugsCaught,
      totalPointsEarned: pointsEarned,
      totalMaxPoints: maxPoints,
      categoryStats: catStats as OverallReviewStats['categoryStats'],
    };
  }, [store]);

  return {
    store,
    getAttempt,
    addAnnotation,
    removeAnnotation,
    updateAnnotationComment,
    useHint,
    recordGrade,
    revealReference,
    getOverallStats,
  };
}
