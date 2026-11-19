import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { defaultPalette, themePalettes } from '../data/themes';
import { MIN_PRACTICE_SESSION_SECONDS } from '../lib/practiceTimer';
import {
  clearLocalProfile,
  createDefaultProfile,
  loadLocalProfile,
  loadPrivacySettings,
  sanitizeLocalProfile,
  saveLocalProfile,
  savePrivacySettings,
} from '../lib/profileStorage';
import { getLocalDateKey, selectDailyChallenge } from '../lib/progress';
import { readStorage, writeStorage } from '../lib/storage';
import { problemsService, type ResourceStatus } from '../services';
import type { ActivityEvent, LocalProfile, PaletteId, PrivacySettings, Problem, SubmissionOutcome, SubmissionRecord, ThemeMode } from '../types';

interface AppContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  palette: PaletteId;
  setPalette: (palette: PaletteId) => void;
  profile: LocalProfile;
  updateProfile: (patch: Partial<Omit<LocalProfile, 'updatedAt'>>) => void;
  resetProfile: () => void;
  privacySettings: PrivacySettings;
  updatePrivacySettings: (patch: Partial<PrivacySettings>) => void;
  problems: Problem[];
  problemsStatus: ResourceStatus;
  problemsError: string | null;
  retryProblems: () => void;
  addProblem: (problem: Problem) => void;
  updateProblem: (previousId: string, updated: Problem) => void;
  deleteProblem: (id: string) => void;
  solvedIds: string[];
  toggleSolved: (id: string, durationSeconds?: number, language?: string) => void;
  activityLog: ActivityEvent[];
  recordPracticeSession: (problemId: string, durationSeconds: number) => void;
  submissions: SubmissionRecord[];
  recordSubmission: (problemId: string, outcome: SubmissionOutcome, durationSeconds?: number, language?: string) => void;
  dailyChallengeByDate: Record<string, string>;
  ensureDailyChallenge: (dateKey: string, problemId: string) => void;
  dailyCompletions: Record<string, string>;
  completeDailyChallenge: (dateKey: string, problemId: string, durationSeconds?: number, language?: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function loadSolvedIds(): string[] {
  const stored = readStorage<unknown>('codearena-solved', ['two-sum', 'valid-parentheses']);
  return Array.isArray(stored) ? stored.filter((item): item is string => typeof item === 'string') : ['two-sum', 'valid-parentheses'];
}

function isActivityEvent(value: unknown): value is ActivityEvent {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<ActivityEvent>;
  return typeof item.id === 'string'
    && typeof item.problemId === 'string'
    && typeof item.title === 'string'
    && (item.difficulty === 'Easy' || item.difficulty === 'Medium' || item.difficulty === 'Hard')
    && typeof item.topic === 'string'
    && (item.type === 'solved' || item.type === 'practice')
    && typeof item.timestamp === 'string'
    && Number.isFinite(Date.parse(item.timestamp))
    && (item.durationSeconds === undefined || (typeof item.durationSeconds === 'number' && Number.isFinite(item.durationSeconds) && item.durationSeconds >= 0));
}

function loadActivityLog(): ActivityEvent[] {
  const stored = readStorage<unknown>('codearena-activity', []);
  return Array.isArray(stored) ? stored.filter(isActivityEvent).slice(0, 500) : [];
}

function isSubmissionRecord(value: unknown): value is SubmissionRecord {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<SubmissionRecord>;
  return typeof item.id === 'string'
    && typeof item.problemId === 'string'
    && typeof item.title === 'string'
    && (item.difficulty === 'Easy' || item.difficulty === 'Medium' || item.difficulty === 'Hard')
    && Array.isArray(item.topics)
    && (item.outcome === 'accepted' || item.outcome === 'wrong_answer' || item.outcome === 'tle' || item.outcome === 'runtime_error')
    && typeof item.language === 'string'
    && typeof item.timestamp === 'string'
    && Number.isFinite(Date.parse(item.timestamp))
    && (item.durationSeconds === undefined || (typeof item.durationSeconds === 'number' && Number.isFinite(item.durationSeconds) && item.durationSeconds >= 0))
    && (item.runtimeMs === undefined || (typeof item.runtimeMs === 'number' && Number.isFinite(item.runtimeMs) && item.runtimeMs >= 0))
    && (item.memoryMb === undefined || (typeof item.memoryMb === 'number' && Number.isFinite(item.memoryMb) && item.memoryMb >= 0))
    && (item.source === undefined || item.source === 'local' || item.source === 'judge');
}

function loadSubmissions(): SubmissionRecord[] {
  const stored = readStorage<unknown>('codearena-submissions', []);
  return Array.isArray(stored) ? stored.filter(isSubmissionRecord).slice(0, 500) : [];
}

function loadStringRecord(key: string): Record<string, string> {
  const stored = readStorage<unknown>(key, {});
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {};
  return Object.fromEntries(Object.entries(stored).filter((entry): entry is [string, string] => typeof entry[1] === 'string'));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => readStorage<unknown>('codearena-theme', 'dark') === 'light' ? 'light' : 'dark');
  const [palette, setPalette] = useState<PaletteId>(() => {
    const stored = readStorage<unknown>('codearena-palette', defaultPalette);
    // Migrate the previously selected rose theme to the refreshed CodeArena palette.
    if (stored === 'rose') return defaultPalette;
    return themePalettes.some((item) => item.id === stored) ? stored as PaletteId : defaultPalette;
  });
  const [profile, setProfile] = useState<LocalProfile>(() => loadLocalProfile());
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(() => loadPrivacySettings());
  const [problems, setProblems] = useState<Problem[]>(() => problemsService.listSync());
  const [problemsStatus, setProblemsStatus] = useState<ResourceStatus>('ready');
  const [problemsError, setProblemsError] = useState<string | null>(null);
  const problemsReloadRef = useRef<AbortController | null>(null);
  const [solvedIds, setSolvedIds] = useState<string[]>(loadSolvedIds);
  const [activityLog, setActivityLog] = useState<ActivityEvent[]>(loadActivityLog);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(loadSubmissions);
  const [dailyChallengeByDate, setDailyChallengeByDate] = useState<Record<string, string>>(() => loadStringRecord('codearena-daily-challenges'));
  const [dailyCompletions, setDailyCompletions] = useState<Record<string, string>>(() => loadStringRecord('codearena-daily-completions'));

  const retryProblems = useCallback(() => {
    problemsReloadRef.current?.abort();
    const controller = new AbortController();
    problemsReloadRef.current = controller;
    setProblemsStatus('loading');
    setProblemsError(null);
    problemsService.list(controller.signal)
      .then((nextProblems) => {
        if (controller.signal.aborted) return;
        setProblems(nextProblems);
        setProblemsStatus('ready');
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setProblemsError(error instanceof Error ? error.message : 'Unable to load problems.');
        setProblemsStatus('error');
      });
  }, []);

  useEffect(() => () => {
    problemsReloadRef.current?.abort();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    writeStorage('codearena-theme', theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    writeStorage('codearena-palette', palette);
  }, [palette]);
  useEffect(() => {
    if (profile.updatedAt === null) {
      clearLocalProfile();
    } else {
      saveLocalProfile(profile);
    }
  }, [profile]);
  useEffect(() => {
    savePrivacySettings(privacySettings);
  }, [privacySettings]);
  useEffect(() => {
    void problemsService.saveAll(problems);
  }, [problems]);
  useEffect(() => writeStorage('codearena-solved', solvedIds), [solvedIds]);
  useEffect(() => writeStorage('codearena-activity', activityLog), [activityLog]);
  useEffect(() => writeStorage('codearena-submissions', submissions), [submissions]);
  useEffect(() => writeStorage('codearena-daily-challenges', dailyChallengeByDate), [dailyChallengeByDate]);
  useEffect(() => writeStorage('codearena-daily-completions', dailyCompletions), [dailyCompletions]);

  const toggleSolved = useCallback((id: string, durationSeconds?: number, language = 'javascript') => {
    const isAlreadySolved = solvedIds.includes(id);
    setSolvedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

    if (isAlreadySolved) return;
    const problem = problems.find((item) => item.id === id);
    if (!problem) return;

    const validDuration = typeof durationSeconds === 'number' && Number.isFinite(durationSeconds) && durationSeconds > 0
      ? Math.round(durationSeconds)
      : undefined;
    const timestamp = new Date().toISOString();
    const event: ActivityEvent = {
      id: `solved-${id}-${Date.now()}`,
      problemId: id,
      title: problem.title,
      difficulty: problem.difficulty,
      topic: problem.topics[0] ?? 'Problem solving',
      type: 'solved',
      timestamp,
      ...(validDuration !== undefined ? { durationSeconds: validDuration } : {}),
    };
    setActivityLog((current) => [event, ...current].slice(0, 500));

    const submission: SubmissionRecord = {
      id: `sub-${id}-${Date.now()}`,
      problemId: id,
      title: problem.title,
      difficulty: problem.difficulty,
      topics: problem.topics,
      outcome: 'accepted',
      language,
      timestamp,
      source: 'local',
      ...(validDuration !== undefined ? { durationSeconds: validDuration } : {}),
    };
    setSubmissions((current) => [submission, ...current].slice(0, 500));

    const today = getLocalDateKey();
    const currentDailyId = dailyChallengeByDate[today] ?? selectDailyChallenge(problems, new Date(), solvedIds)?.id;
    if (currentDailyId === id) {
      setDailyChallengeByDate((current) => current[today] ? current : { ...current, [today]: id });
      setDailyCompletions((current) => ({ ...current, [today]: id }));
    }
  }, [dailyChallengeByDate, problems, solvedIds]);

  const recordPracticeSession = useCallback((problemId: string, durationSeconds: number) => {
    // Documented minimum threshold: ignore brief visits under 30s of active workspace time.
    if (!Number.isFinite(durationSeconds) || durationSeconds < MIN_PRACTICE_SESSION_SECONDS) return;
    const problem = problems.find((item) => item.id === problemId);
    if (!problem) return;

    const event: ActivityEvent = {
      id: `practice-${problemId}-${Date.now()}`,
      problemId,
      title: problem.title,
      difficulty: problem.difficulty,
      topic: problem.topics[0] ?? 'Problem solving',
      type: 'practice',
      timestamp: new Date().toISOString(),
      durationSeconds: Math.round(durationSeconds),
    };
    setActivityLog((current) => [event, ...current].slice(0, 500));
  }, [problems]);

  const recordSubmission = useCallback((
    problemId: string,
    outcome: SubmissionOutcome,
    durationSeconds?: number,
    language = 'javascript',
  ) => {
    const problem = problems.find((item) => item.id === problemId);
    if (!problem) return;

    const validDuration = typeof durationSeconds === 'number' && Number.isFinite(durationSeconds) && durationSeconds > 0
      ? Math.round(durationSeconds)
      : undefined;
    const timestamp = new Date().toISOString();
    const submission: SubmissionRecord = {
      id: `sub-${problemId}-${Date.now()}`,
      problemId,
      title: problem.title,
      difficulty: problem.difficulty,
      topics: problem.topics,
      outcome,
      language,
      timestamp,
      source: 'local',
      ...(validDuration !== undefined ? { durationSeconds: validDuration } : {}),
    };
    setSubmissions((current) => [submission, ...current].slice(0, 500));

    const event: ActivityEvent = {
      id: `${outcome === 'accepted' ? 'solved' : 'practice'}-${problemId}-${Date.now()}`,
      problemId,
      title: problem.title,
      difficulty: problem.difficulty,
      topic: problem.topics[0] ?? 'Problem solving',
      type: outcome === 'accepted' ? 'solved' : 'practice',
      timestamp,
      ...(validDuration !== undefined ? { durationSeconds: validDuration } : {}),
    };
    setActivityLog((current) => [event, ...current].slice(0, 500));

    if (outcome === 'accepted') {
      setSolvedIds((current) => current.includes(problemId) ? current : [...current, problemId]);
      const today = getLocalDateKey();
      const currentDailyId = dailyChallengeByDate[today] ?? selectDailyChallenge(problems, new Date(), solvedIds)?.id;
      if (currentDailyId === problemId) {
        setDailyChallengeByDate((current) => current[today] ? current : { ...current, [today]: problemId });
        setDailyCompletions((current) => ({ ...current, [today]: problemId }));
      }
    }
  }, [dailyChallengeByDate, problems, solvedIds]);

  const completeDailyChallenge = useCallback((
    dateKey: string,
    problemId: string,
    durationSeconds?: number,
    language = 'javascript',
  ) => {
    const today = getLocalDateKey();
    // Only today's assigned daily challenge can be completed for today's date key.
    if (dateKey !== today) return;
    const assignedDailyId = dailyChallengeByDate[today] ?? selectDailyChallenge(problems, new Date(), solvedIds)?.id;
    if (assignedDailyId !== problemId) return;

    const problem = problems.find((item) => item.id === problemId);
    if (!problem) return;

    setDailyChallengeByDate((current) => current[today] ? current : { ...current, [today]: problemId });
    setDailyCompletions((current) => ({ ...current, [today]: problemId }));
    setSolvedIds((current) => current.includes(problemId) ? current : [...current, problemId]);

    const validDuration = typeof durationSeconds === 'number' && Number.isFinite(durationSeconds) && durationSeconds > 0
      ? Math.round(durationSeconds)
      : undefined;
    const timestamp = new Date().toISOString();

    const event: ActivityEvent = {
      id: `solved-${problemId}-${Date.now()}`,
      problemId,
      title: problem.title,
      difficulty: problem.difficulty,
      topic: problem.topics[0] ?? 'Problem solving',
      type: 'solved',
      timestamp,
      ...(validDuration !== undefined ? { durationSeconds: validDuration } : {}),
    };
    setActivityLog((current) => [event, ...current].slice(0, 500));

    const submission: SubmissionRecord = {
      id: `sub-${problemId}-${Date.now()}`,
      problemId,
      title: problem.title,
      difficulty: problem.difficulty,
      topics: problem.topics,
      outcome: 'accepted',
      language,
      timestamp,
      source: 'local',
      ...(validDuration !== undefined ? { durationSeconds: validDuration } : {}),
    };
    setSubmissions((current) => [submission, ...current].slice(0, 500));
  }, [dailyChallengeByDate, problems, solvedIds]);

  const ensureDailyChallenge = useCallback((dateKey: string, problemId: string) => {
    setDailyChallengeByDate((current) => current[dateKey] ? current : { ...current, [dateKey]: problemId });
  }, []);

  const addProblem = useCallback((problem: Problem) => {
    setProblems((current) => [problem, ...current.filter((item) => item.id !== problem.id)]);
  }, []);

  const updateProblem = useCallback((previousId: string, updated: Problem) => {
    setProblems((current) => {
      const exists = current.some((item) => item.id === previousId);
      if (!exists) return [updated, ...current];
      return current
        .filter((item) => item.id === previousId || item.id !== updated.id)
        .map((item) => (item.id === previousId ? updated : item));
    });
    if (previousId !== updated.id) {
      setSolvedIds((current) => (
        current.includes(previousId)
          ? Array.from(new Set(current.map((id) => (id === previousId ? updated.id : id))))
          : current
      ));
    }
  }, []);

  const deleteProblem = useCallback((id: string) => {
    setProblems((current) => current.filter((item) => item.id !== id));
    setSolvedIds((current) => current.filter((item) => item !== id));
  }, []);

  const updateProfile = useCallback((patch: Partial<Omit<LocalProfile, 'updatedAt'>>) => {
    const timestamp = new Date().toISOString();
    setProfile((current) => sanitizeLocalProfile(
      {
        ...current,
        ...patch,
        updatedAt: timestamp,
      },
    ));
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(createDefaultProfile());
  }, []);

  const updatePrivacySettings = useCallback((patch: Partial<PrivacySettings>) => {
    setPrivacySettings((current) => ({
      ...current,
      ...patch,
    }));
  }, []);

  const value = useMemo<AppContextValue>(() => ({
    theme,
    setTheme,
    palette,
    setPalette,
    profile,
    updateProfile,
    resetProfile,
    privacySettings,
    updatePrivacySettings,
    problems,
    problemsStatus,
    problemsError,
    retryProblems,
    addProblem,
    updateProblem,
    deleteProblem,
    solvedIds,
    toggleSolved,
    activityLog,
    recordPracticeSession,
    submissions,
    recordSubmission,
    dailyChallengeByDate,
    ensureDailyChallenge,
    dailyCompletions,
    completeDailyChallenge,
  }), [theme, palette, profile, updateProfile, resetProfile, privacySettings, updatePrivacySettings, problems, problemsStatus, problemsError, retryProblems, addProblem, updateProblem, deleteProblem, solvedIds, toggleSolved, activityLog, recordPracticeSession, submissions, recordSubmission, dailyChallengeByDate, ensureDailyChallenge, dailyCompletions, completeDailyChallenge]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
