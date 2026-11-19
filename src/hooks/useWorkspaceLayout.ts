import { useCallback, useEffect, useState } from 'react';
import { readStorage, writeStorage } from '../lib/storage';

export interface WorkspaceLayoutState {
  splitPercent: number;
  descriptionCollapsed: boolean;
}

const STORAGE_KEY = 'codearena-workspace-layout';
export const DEFAULT_SPLIT_PERCENT = 43;
export const MIN_SPLIT_PERCENT = 26;
export const MAX_SPLIT_PERCENT = 62;

const DEFAULT_LAYOUT: WorkspaceLayoutState = {
  splitPercent: DEFAULT_SPLIT_PERCENT,
  descriptionCollapsed: false,
};

export function clampSplitPercent(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return DEFAULT_SPLIT_PERCENT;
  return Math.min(MAX_SPLIT_PERCENT, Math.max(MIN_SPLIT_PERCENT, Math.round(value * 10) / 10));
}

function loadWorkspaceLayout(): WorkspaceLayoutState {
  const stored = readStorage<unknown>(STORAGE_KEY, DEFAULT_LAYOUT);
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return DEFAULT_LAYOUT;
  const candidate = stored as Partial<WorkspaceLayoutState>;
  return {
    splitPercent: clampSplitPercent(candidate.splitPercent),
    descriptionCollapsed: typeof candidate.descriptionCollapsed === 'boolean'
      ? candidate.descriptionCollapsed
      : DEFAULT_LAYOUT.descriptionCollapsed,
  };
}

export function useWorkspaceLayout() {
  const [layout, setLayout] = useState<WorkspaceLayoutState>(loadWorkspaceLayout);

  useEffect(() => {
    writeStorage(STORAGE_KEY, layout);
  }, [layout]);

  const setSplitPercent = useCallback((nextPercent: number) => {
    setLayout((current) => ({
      ...current,
      splitPercent: clampSplitPercent(nextPercent),
    }));
  }, []);

  const resetSplitPercent = useCallback(() => {
    setLayout((current) => ({
      ...current,
      splitPercent: DEFAULT_SPLIT_PERCENT,
    }));
  }, []);

  const toggleDescription = useCallback(() => {
    setLayout((current) => ({
      ...current,
      descriptionCollapsed: !current.descriptionCollapsed,
    }));
  }, []);

  const setDescriptionCollapsed = useCallback((collapsed: boolean) => {
    setLayout((current) => (
      current.descriptionCollapsed === collapsed
        ? current
        : { ...current, descriptionCollapsed: collapsed }
    ));
  }, []);

  return {
    splitPercent: layout.splitPercent,
    descriptionCollapsed: layout.descriptionCollapsed,
    setSplitPercent,
    resetSplitPercent,
    toggleDescription,
    setDescriptionCollapsed,
  };
}
