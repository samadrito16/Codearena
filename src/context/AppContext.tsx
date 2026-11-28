import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { defaultFontId, fontOptions } from '../data/fonts';
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
import { getLocalDateKey } from '../lib/progress';
import { readStorage, writeStorage } from '../lib/storage';
import { problemsService, type ResourceStatus } from '../services';
import {
  applyReviewOutcome,
  createSpacedRepetitionItem,
  dismissReview,
  isFailedOutcome,
  isSlowSolve,
  loadSpacedRepetitionStore,
  saveSpacedRepetitionStore,
  scanAndBackfillSpacedRepetition,
  snoozeReview,
  SPACED_INTERVALS_DAYS,
  addDays,
} from '../lib/spacedRepetition';
import type { SpacedRepetitionItem } from '../types/spacedRepetition';
import type { ActivityEvent, AdaptiveMasteryPlan, FontSize, LocalProfile, PaletteId, PrivacySettings, Problem, SubmissionOutcome, SubmissionRecord, ThemeMode } from '../types';

export const DEFAULT_ADAPTIVE_MASTERY_PLAN: AdaptiveMasteryPlan = {
  enabled: false,
  targetGoal: 'Campus Placements in 45 Days',
  targetDays: 45,
  targetDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  dailyPace: 2,
  prioritizeWeakPatterns: true,
  selectedPatternOrder: [
    'two_pointers',
    'sliding_window',
    'hash_maps',
    'dynamic_programming',
    'breadth_first_search',
  ],
  startDate: new Date().toISOString().split('T')[0],
};

interface AppContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  palette: PaletteId;
  setPalette: (palette: PaletteId) => void;
  fontFamily: string;
  setFontFamily: (fontId: string) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  profile: LocalProfile;
  updateProfile: (patch: Partial<Omit<LocalProfile, 'updatedAt'>>) => void;
  resetProfile: () => void;
  privacySettings: PrivacySettings;
  updatePrivacySettings: (patch: Partial<PrivacySettings>) => void;
  adaptiveMasteryPlan: AdaptiveMasteryPlan;
  updateAdaptiveMasteryPlan: (patch: Partial<AdaptiveMasteryPlan>) => void;
  problems: Problem[];
  problemsStatus: ResourceStatus;
  problemsError: string | null;
  retryProblems: () => void;
  solvedIds: string[];
  activityLog: ActivityEvent[];
  recordPracticeSession: (problemId: string, durationSeconds: number) => void;
  submissions: SubmissionRecord[];
  recordSubmission: (
    problemId: string,
    outcome: SubmissionOutcome,
    durationSeconds?: number,
    language?: string,
    metadata?: { runtimeMs?: number; memoryMb?: number; source?: 'local' | 'onlinecompiler' | 'judge'; question?: Problem },
  ) => void;
  dailyChallengeByDate: Record<string, string>;
  ensureDailyChallenge: (dateKey: string, problemId: string) => void;
  dailyCompletions: Record<string, string>;
  spacedRepetitionStore: Record<string, SpacedRepetitionItem>;
  recordSpacedReviewOutcome: (
    problemId: string,
    outcome: 'passed' | 'failed' | 'slow',
    durationSeconds?: number,
    notes?: string,
  ) => void;
  snoozeSpacedReview: (problemId: string, days?: number) => void;
  dismissSpacedReview: (problemId: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function loadSolvedIds(): string[] {
  const stored = readStorage<unknown>('prismcode-solved', []);
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
  const stored = readStorage<unknown>('prismcode-activity', []);
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
  const stored = readStorage<unknown>('prismcode-submissions', []);
  return Array.isArray(stored) ? stored.filter(isSubmissionRecord).slice(0, 500) : [];
}

function loadStringRecord(key: string): Record<string, string> {
  const stored = readStorage<unknown>(key, {});
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {};
  return Object.fromEntries(Object.entries(stored).filter((entry): entry is [string, string] => typeof entry[1] === 'string'));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => readStorage<unknown>('prismcode-theme', 'dark') === 'light' ? 'light' : 'dark');
  const [palette, setPalette] = useState<PaletteId>(() => {
    const stored = readStorage<unknown>('prismcode-palette', defaultPalette);
    // Migrate legacy or retired palette selections to the refreshed atmospheric collection.
    if (stored === 'carbon' || stored === 'cobalt' || stored === 'rose' || stored === 'indigo' || stored === 'lagoon' || stored === 'coastal' || stored === 'lavender' || stored === 'amethyst' || stored === 'emerald' || stored === 'volt' || stored === 'fuchsia') return defaultPalette;
    if (stored === 'sage' || stored === 'aurora' || stored === 'oceanic') return 'frost';
    if (stored === 'vivid' || stored === 'cosmic' || stored === 'eclipse') return 'copper';
    return themePalettes.some((item) => item.id === stored) ? stored as PaletteId : defaultPalette;
  });
  const [fontFamily, setFontFamily] = useState<string>(() => {
    const stored = readStorage<unknown>('prismcode-font', defaultFontId);
    return typeof stored === 'string' && fontOptions.some((f) => f.id === stored)
      ? stored
      : defaultFontId;
  });
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const stored = readStorage<unknown>('prismcode-font-size', 'standard');
    return stored === 'compact' || stored === 'large' ? stored : 'standard';
  });
  const [profile, setProfile] = useState<LocalProfile>(() => loadLocalProfile());
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(() => loadPrivacySettings());
  const [adaptiveMasteryPlan, setAdaptiveMasteryPlan] = useState<AdaptiveMasteryPlan>(() => {
    return readStorage<AdaptiveMasteryPlan>('prismcode-adaptive-mastery-plan', DEFAULT_ADAPTIVE_MASTERY_PLAN);
  });
  const [problems, setProblems] = useState<Problem[]>([]);
  const [problemsStatus, setProblemsStatus] = useState<ResourceStatus>('loading');
  const [problemsError, setProblemsError] = useState<string | null>(null);
  const problemsReloadRef = useRef<AbortController | null>(null);
  const [solvedIds, setSolvedIds] = useState<string[]>(loadSolvedIds);
  const [activityLog, setActivityLog] = useState<ActivityEvent[]>(loadActivityLog);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(loadSubmissions);
  const [dailyChallengeByDate, setDailyChallengeByDate] = useState<Record<string, string>>(() => loadStringRecord('prismcode-daily-challenges'));
  const [dailyCompletions, setDailyCompletions] = useState<Record<string, string>>(() => loadStringRecord('prismcode-daily-completions'));
  const [spacedRepetitionStore, setSpacedRepetitionStore] = useState<Record<string, SpacedRepetitionItem>>(() => loadSpacedRepetitionStore());

  // Automatically scan and backfill from existing submissions and activity log on load or when problems change
  useEffect(() => {
    if (!problems.length) return;
    const problemsMap = new Map(problems.map((p) => [p.id, p]));
    setSpacedRepetitionStore((current) => {
      return scanAndBackfillSpacedRepetition(submissions, activityLog, current, problemsMap);
    });
  }, [problems, submissions, activityLog]);

  useEffect(() => {
    saveSpacedRepetitionStore(spacedRepetitionStore);
  }, [spacedRepetitionStore]);

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

  useEffect(() => {
    retryProblems();
    return () => problemsReloadRef.current?.abort();
  }, [retryProblems]);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    writeStorage('prismcode-theme', theme);
  }, [theme]);
  useLayoutEffect(() => {
    document.documentElement.dataset.palette = palette;
    writeStorage('prismcode-palette', palette);
  }, [palette]);
  useLayoutEffect(() => {
    const selected = fontOptions.find((item) => item.id === fontFamily) ?? fontOptions[0];
    document.documentElement.style.setProperty('--ca-font-sans', selected.fontFamily);
    document.documentElement.style.setProperty('--ca-font-display', selected.fontFamily);
    document.documentElement.dataset.font = selected.id;
    writeStorage('prismcode-font', selected.id);
  }, [fontFamily]);
  useLayoutEffect(() => {
    document.documentElement.dataset.fontSize = fontSize;
    writeStorage('prismcode-font-size', fontSize);
  }, [fontSize]);
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
  useEffect(() => writeStorage('prismcode-solved', solvedIds), [solvedIds]);
  useEffect(() => writeStorage('prismcode-activity', activityLog), [activityLog]);
  useEffect(() => writeStorage('prismcode-submissions', submissions), [submissions]);
  useEffect(() => writeStorage('prismcode-daily-challenges', dailyChallengeByDate), [dailyChallengeByDate]);
  useEffect(() => writeStorage('prismcode-daily-completions', dailyCompletions), [dailyCompletions]);

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
    metadata?: { runtimeMs?: number; memoryMb?: number; source?: 'local' | 'onlinecompiler' | 'judge'; question?: Problem },
  ) => {
    const problem = metadata?.question ?? problems.find((item) => item.id === problemId);
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
      source: metadata?.source ?? 'onlinecompiler',
      runtimeMs: metadata?.runtimeMs,
      memoryMb: metadata?.memoryMb,
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
      if (problem.owner !== 'daily') setSolvedIds((current) => current.includes(problemId) ? current : [...current, problemId]);
      const today = getLocalDateKey();
      const currentDailyId = dailyChallengeByDate[today];
      if (currentDailyId === problemId) {
        setDailyChallengeByDate((current) => current[today] ? current : { ...current, [today]: problemId });
        setDailyCompletions((current) => ({ ...current, [today]: problemId }));
      }
    }

    if (problem.owner === 'daily') return;

    // Update Spaced Repetition queue
    setSpacedRepetitionStore((current) => {
      const existing = current[problemId];
      const isFailed = isFailedOutcome(outcome);
      const isSlow = isSlowSolve(validDuration, problem.difficulty);

      if (isFailed || isSlow) {
        const reason = isFailed && isSlow ? 'both' : isFailed ? 'failed' : 'solved_slowly';
        if (!existing) {
          const newItem = createSpacedRepetitionItem({
            problemId,
            problemTitle: problem.title,
            reason,
            triggerTimestamp: timestamp,
            triggerDifficulty: problem.difficulty,
            durationSeconds: validDuration,
          });
          return { ...current, [problemId]: newItem };
        }
        // If already tracked, reset back to Stage 1 (resurface in 3 days)
        const nextDate = addDays(new Date(), SPACED_INTERVALS_DAYS[1]);
        return {
          ...current,
          [problemId]: {
            ...existing,
            stage: 1,
            status: 'pending',
            nextReviewDate: nextDate,
            failedSubmissionsCount: isFailed ? existing.failedSubmissionsCount + 1 : existing.failedSubmissionsCount,
            slowestDurationSeconds: validDuration && (!existing.slowestDurationSeconds || validDuration > existing.slowestDurationSeconds)
              ? validDuration
              : existing.slowestDurationSeconds,
            reason: (existing.reason === 'failed' && isSlow) || (existing.reason === 'solved_slowly' && isFailed) ? 'both' : existing.reason,
            consecutiveSuccessfulReviews: 0,
            dismissed: false,
          },
        };
      }

      // If accepted & quick on a problem currently in review queue, automatically advance stage
      if (outcome === 'accepted' && existing && !existing.isGraduated && !isSlow) {
        const updated = applyReviewOutcome(existing, 'passed', validDuration, undefined, new Date());
        return { ...current, [problemId]: updated };
      }

      return current;
    });
  }, [dailyChallengeByDate, problems, solvedIds]);

  const ensureDailyChallenge = useCallback((dateKey: string, problemId: string) => {
    setDailyChallengeByDate((current) => current[dateKey] ? current : { ...current, [dateKey]: problemId });
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

  const updateAdaptiveMasteryPlan = useCallback((patch: Partial<AdaptiveMasteryPlan>) => {
    setAdaptiveMasteryPlan((current) => {
      const updated = { ...current, ...patch };
      writeStorage('prismcode-adaptive-mastery-plan', updated);
      return updated;
    });
  }, []);

  const recordSpacedReviewOutcome = useCallback((
    problemId: string,
    outcome: 'passed' | 'failed' | 'slow',
    durationSeconds?: number,
    notes?: string,
  ) => {
    setSpacedRepetitionStore((current) => {
      const item = current[problemId];
      if (!item) return current;
      const updated = applyReviewOutcome(item, outcome, durationSeconds, notes, new Date());
      return { ...current, [problemId]: updated };
    });
  }, []);

  const snoozeSpacedReview = useCallback((problemId: string, days = 2) => {
    setSpacedRepetitionStore((current) => {
      const item = current[problemId];
      if (!item) return current;
      const updated = snoozeReview(item, days, new Date());
      return { ...current, [problemId]: updated };
    });
  }, []);

  const dismissSpacedReview = useCallback((problemId: string) => {
    setSpacedRepetitionStore((current) => {
      const item = current[problemId];
      if (!item) return current;
      const updated = dismissReview(item);
      return { ...current, [problemId]: updated };
    });
  }, []);

  const value = useMemo<AppContextValue>(() => ({
    theme,
    setTheme,
    palette,
    setPalette,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    profile,
    updateProfile,
    resetProfile,
    privacySettings,
    updatePrivacySettings,
    adaptiveMasteryPlan,
    updateAdaptiveMasteryPlan,
    problems,
    problemsStatus,
    problemsError,
    retryProblems,
    solvedIds,
    activityLog,
    recordPracticeSession,
    submissions,
    recordSubmission,
    dailyChallengeByDate,
    ensureDailyChallenge,
    dailyCompletions,
    spacedRepetitionStore,
    recordSpacedReviewOutcome,
    snoozeSpacedReview,
    dismissSpacedReview,
  }), [theme, palette, fontFamily, setFontFamily, fontSize, setFontSize, profile, updateProfile, resetProfile, privacySettings, updatePrivacySettings, adaptiveMasteryPlan, updateAdaptiveMasteryPlan, problems, problemsStatus, problemsError, retryProblems, solvedIds, activityLog, recordPracticeSession, submissions, recordSubmission, dailyChallengeByDate, ensureDailyChallenge, dailyCompletions, spacedRepetitionStore, recordSpacedReviewOutcome, snoozeSpacedReview, dismissSpacedReview]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
