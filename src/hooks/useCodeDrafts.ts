import { useCallback, useEffect, useRef, useState } from 'react';
import {
  clearDraft,
  getStarterCode,
  loadDraft,
  loadProblemLanguage,
  saveDraft,
  saveProblemLanguage,
  type CodeLanguage,
} from '../lib/draftStorage';
import type { Problem } from '../types';

export type SaveStatus = 'saved' | 'unsaved' | 'saving' | 'error';

interface PendingSave {
  problemId: string;
  language: CodeLanguage;
  code: string;
  starter: string;
}

const SAVING_INDICATOR_MS = 280;
const AUTOSAVE_DEBOUNCE_MS = 550;

export function useCodeDrafts(problem: Problem) {
  const initialLang = loadProblemLanguage(problem.id);
  const initialDraft = loadDraft(problem.id, initialLang);

  const [language, setLanguage] = useState<CodeLanguage>(initialLang);
  const [code, setCodeState] = useState<string>(() => initialDraft?.code ?? getStarterCode(problem, initialLang));
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(() => initialDraft?.updatedAt ?? null);

  const pendingRef = useRef<PendingSave | null>(null);
  const savingTimerRef = useRef<number | null>(null);
  const debounceTimerRef = useRef<number | null>(null);
  const activeProblemIdRef = useRef<string>(problem.id);
  const codeRef = useRef<string>(code);
  const saveStatusRef = useRef<SaveStatus>(saveStatus);
  saveStatusRef.current = saveStatus;

  const clearTimers = useCallback(() => {
    if (savingTimerRef.current !== null) {
      window.clearTimeout(savingTimerRef.current);
      savingTimerRef.current = null;
    }
    if (debounceTimerRef.current !== null) {
      window.clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
  }, []);

  const persistPending = useCallback((updateUi: boolean): boolean => {
    clearTimers();
    const pending = pendingRef.current;
    if (!pending) {
      if (updateUi) {
        setSaveError(null);
        setSaveStatus('saved');
      }
      return true;
    }

    if (pending.code === pending.starter) {
      const clearResult = clearDraft(pending.problemId, pending.language);
      if (!clearResult.ok) {
        if (updateUi) {
          setSaveError(clearResult.error);
          setSaveStatus('error');
        }
        return false;
      }
      pendingRef.current = null;
      if (updateUi) {
        setSaveError(null);
        setLastSavedAt(null);
        setSaveStatus('saved');
      }
      return true;
    }

    const result = saveDraft(pending.problemId, pending.language, pending.code);
    if (!result.ok) {
      if (updateUi) {
        setSaveError(result.error);
        setSaveStatus('error');
      }
      return false;
    }

    pendingRef.current = null;
    if (updateUi) {
      setSaveError(null);
      setLastSavedAt(result.entry.updatedAt);
      setSaveStatus('saved');
    }
    return true;
  }, [clearTimers]);

  // Reload language + draft whenever the user navigates to a different problem.
  useEffect(() => {
    if (activeProblemIdRef.current === problem.id) return;
    persistPending(false);
    activeProblemIdRef.current = problem.id;

    const nextLang = loadProblemLanguage(problem.id);
    const saved = loadDraft(problem.id, nextLang);
    const nextCode = saved?.code ?? getStarterCode(problem, nextLang);
    codeRef.current = nextCode;
    setLanguage(nextLang);
    setCodeState(nextCode);
    setSaveError(null);
    setSaveStatus('saved');
    setLastSavedAt(saved?.updatedAt ?? null);
  }, [problem, persistPending]);

  // Warn before browser refresh/close if a draft is unsaved, currently saving, or failed to save.
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (pendingRef.current || saveStatusRef.current !== 'saved') {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearTimers();
    };
  }, [clearTimers]);

  const starterCode = getStarterCode(problem, language);
  const hasChanges = code !== starterCode;
  const isUnsaved = saveStatus !== 'saved';

  const updateCode = useCallback((nextCode: string) => {
    if (nextCode === codeRef.current) return;
    codeRef.current = nextCode;
    setCodeState(nextCode);
    setSaveError(null);
    setSaveStatus('unsaved');
    clearTimers();

    const currentStarter = getStarterCode(problem, language);
    pendingRef.current = {
      problemId: problem.id,
      language,
      code: nextCode,
      starter: currentStarter,
    };

    savingTimerRef.current = window.setTimeout(() => {
      setSaveStatus('saving');
    }, SAVING_INDICATOR_MS);

    debounceTimerRef.current = window.setTimeout(() => {
      persistPending(true);
    }, AUTOSAVE_DEBOUNCE_MS);
  }, [problem, language, clearTimers, persistPending]);

  const saveNow = useCallback((): boolean => {
    if (!pendingRef.current) {
      // Ensure current editor buffer is persisted when invoked manually (e.g. Ctrl+S or retry).
      pendingRef.current = {
        problemId: problem.id,
        language,
        code: codeRef.current,
        starter: getStarterCode(problem, language),
      };
    }
    return persistPending(true);
  }, [language, persistPending, problem]);

  const discardPending = useCallback(() => {
    clearTimers();
    pendingRef.current = null;
    setSaveError(null);
    setSaveStatus('saved');
  }, [clearTimers]);

  const changeLanguage = useCallback((nextLang: CodeLanguage) => {
    if (nextLang === language) return;
    persistPending(false);
    saveProblemLanguage(problem.id, nextLang);

    const saved = loadDraft(problem.id, nextLang);
    const nextCode = saved?.code ?? getStarterCode(problem, nextLang);
    codeRef.current = nextCode;
    setLanguage(nextLang);
    setCodeState(nextCode);
    setSaveError(null);
    setSaveStatus('saved');
    setLastSavedAt(saved?.updatedAt ?? null);
  }, [language, problem, persistPending]);

  const resetDraft = useCallback((): boolean => {
    clearTimers();
    pendingRef.current = null;
    const clearResult = clearDraft(problem.id, language);
    if (!clearResult.ok) {
      setSaveError(clearResult.error);
      setSaveStatus('error');
      return false;
    }
    const nextCode = getStarterCode(problem, language);
    codeRef.current = nextCode;
    setCodeState(nextCode);
    setSaveError(null);
    setSaveStatus('saved');
    setLastSavedAt(null);
    return true;
  }, [problem, language, clearTimers]);

  return {
    language,
    code,
    saveStatus,
    saveError,
    isUnsaved,
    lastSavedAt,
    hasChanges,
    updateCode,
    saveNow,
    discardPending,
    changeLanguage,
    resetDraft,
  };
}
