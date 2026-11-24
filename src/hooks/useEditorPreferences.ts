import { useCallback, useEffect, useState } from 'react';
import { readStorage, writeStorage } from '../lib/storage';

export type EditorWordWrap = 'on' | 'off';
export type EditorTabSize = 2 | 4;
export type EditorLineNumbers = 'on' | 'relative' | 'off';

export interface EditorPreferences {
  fontSize: number;
  minimap: boolean;
  wordWrap: EditorWordWrap;
  tabSize: EditorTabSize;
  lineNumbers: EditorLineNumbers;
}

const STORAGE_KEY = 'prismcode-editor-preferences';
export const MIN_FONT_SIZE = 11;
export const MAX_FONT_SIZE = 22;

export const DEFAULT_EDITOR_PREFERENCES: EditorPreferences = {
  fontSize: 13,
  minimap: false,
  wordWrap: 'on',
  tabSize: 4,
  lineNumbers: 'on',
};

function clampFontSize(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return DEFAULT_EDITOR_PREFERENCES.fontSize;
  return Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, Math.round(value)));
}

function loadEditorPreferences(): EditorPreferences {
  const stored = readStorage<unknown>(STORAGE_KEY, DEFAULT_EDITOR_PREFERENCES);
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) {
    return DEFAULT_EDITOR_PREFERENCES;
  }
  const candidate = stored as Partial<EditorPreferences>;
  return {
    fontSize: clampFontSize(candidate.fontSize),
    minimap: typeof candidate.minimap === 'boolean' ? candidate.minimap : DEFAULT_EDITOR_PREFERENCES.minimap,
    wordWrap: candidate.wordWrap === 'on' || candidate.wordWrap === 'off'
      ? candidate.wordWrap
      : DEFAULT_EDITOR_PREFERENCES.wordWrap,
    tabSize: candidate.tabSize === 2 || candidate.tabSize === 4
      ? candidate.tabSize
      : DEFAULT_EDITOR_PREFERENCES.tabSize,
    lineNumbers: candidate.lineNumbers === 'on' || candidate.lineNumbers === 'relative' || candidate.lineNumbers === 'off'
      ? candidate.lineNumbers
      : DEFAULT_EDITOR_PREFERENCES.lineNumbers,
  };
}

export function useEditorPreferences() {
  const [preferences, setPreferences] = useState<EditorPreferences>(loadEditorPreferences);

  useEffect(() => {
    writeStorage(STORAGE_KEY, preferences);
  }, [preferences]);

  const updatePreference = useCallback(<K extends keyof EditorPreferences>(
    key: K,
    value: EditorPreferences[K],
  ) => {
    setPreferences((current) => ({
      ...current,
      [key]: key === 'fontSize' ? clampFontSize(value) : value,
    }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_EDITOR_PREFERENCES);
  }, []);

  const isDefault = preferences.fontSize === DEFAULT_EDITOR_PREFERENCES.fontSize
    && preferences.minimap === DEFAULT_EDITOR_PREFERENCES.minimap
    && preferences.wordWrap === DEFAULT_EDITOR_PREFERENCES.wordWrap
    && preferences.tabSize === DEFAULT_EDITOR_PREFERENCES.tabSize
    && preferences.lineNumbers === DEFAULT_EDITOR_PREFERENCES.lineNumbers;

  return {
    preferences,
    updatePreference,
    resetPreferences,
    isDefault,
  };
}
