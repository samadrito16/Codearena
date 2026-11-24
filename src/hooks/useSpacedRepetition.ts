import { useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  applyReviewOutcome,
  computeItemStatus,
  dismissReview,
  formatReviewScheduleLabel,
  getSpacedRepetitionSummary,
  snoozeReview,
} from '../lib/spacedRepetition';
import type { SpacedRepetitionItem, SpacedRepetitionSummary } from '../types/spacedRepetition';

export function useSpacedRepetition() {
  const {
    spacedRepetitionStore,
    recordSpacedReviewOutcome,
    snoozeSpacedReview,
    dismissSpacedReview,
  } = useApp();

  const now = useMemo(() => new Date(), []);

  // Compute live sorted array of active items
  const items = useMemo(() => {
    const list = Object.values(spacedRepetitionStore).map((item) => {
      const liveStatus = computeItemStatus(item, now);
      return liveStatus !== item.status ? { ...item, status: liveStatus } : item;
    });

    // Priority sorting: Overdue first, then Due today, then Pending (ascending date), then Graduated
    return list.sort((a, b) => {
      if (a.dismissed && !b.dismissed) return 1;
      if (!a.dismissed && b.dismissed) return -1;

      const priority: Record<string, number> = {
        overdue: 1,
        due: 2,
        pending: 3,
        graduated: 4,
      };

      const pA = priority[a.status] ?? 99;
      const pB = priority[b.status] ?? 99;
      if (pA !== pB) return pA - pB;

      // Same status: sort by nextReviewDate ascending
      return a.nextReviewDate.localeCompare(b.nextReviewDate);
    });
  }, [spacedRepetitionStore, now]);

  const activeItems = useMemo(() => items.filter((item) => !item.dismissed), [items]);

  const dueItems = useMemo(
    () => activeItems.filter((item) => item.status === 'due' || item.status === 'overdue'),
    [activeItems],
  );

  const upcomingItems = useMemo(
    () => activeItems.filter((item) => item.status === 'pending'),
    [activeItems],
  );

  const graduatedItems = useMemo(
    () => activeItems.filter((item) => item.isGraduated),
    [activeItems],
  );

  const summary: SpacedRepetitionSummary = useMemo(
    () => getSpacedRepetitionSummary(items, now),
    [items, now],
  );

  const isProblemDue = useCallback(
    (problemId: string): boolean => {
      const item = spacedRepetitionStore[problemId];
      if (!item || item.dismissed || item.isGraduated) return false;
      const status = computeItemStatus(item, now);
      return status === 'due' || status === 'overdue';
    },
    [spacedRepetitionStore, now],
  );

  const getItem = useCallback(
    (problemId: string): SpacedRepetitionItem | undefined => {
      return spacedRepetitionStore[problemId];
    },
    [spacedRepetitionStore],
  );

  return {
    items,
    activeItems,
    dueItems,
    upcomingItems,
    graduatedItems,
    summary,
    isProblemDue,
    getItem,
    recordReview: recordSpacedReviewOutcome,
    snooze: snoozeSpacedReview,
    dismiss: dismissSpacedReview,
    formatScheduleLabel: (nextReviewDate: string) => formatReviewScheduleLabel(nextReviewDate, now),
  };
}
