import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ActiveAssessmentSession,
  AssessmentReport,
  CodingSubmissionResult,
  CompanyAssessment,
  QuestionStatus,
} from '../../types/placement';
import { apiRequest } from '../api';

const SESSION_STORAGE_KEY = 'prismcode-placement-session-v1';
const HISTORY_STORAGE_KEY = 'prismcode-placement-history-v1';

export function getStoredActiveSession(): ActiveAssessmentSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse active placement session', e);
    return null;
  }
}

export function saveStoredActiveSession(session: ActiveAssessmentSession | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (!session) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } else {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }
  } catch (e) {
    console.error('Failed to save active placement session', e);
  }
}

export function getPlacementHistory(): AssessmentReport[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse placement history', e);
    return [];
  }
}

export function savePlacementHistoryItem(report: AssessmentReport): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getPlacementHistory();
    const updated = [report, ...history.filter((h) => h.id !== report.id)].slice(0, 50);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save placement history item', e);
  }
}

export function clearActiveSession(): void {
  saveStoredActiveSession(null);
}

export function createNewSession(assessment: CompanyAssessment): ActiveAssessmentSession {
  const sectionRemainingSeconds: Record<string, number> = {};
  for (const sec of assessment.sections) {
    sectionRemainingSeconds[sec.id] = sec.durationMinutes * 60;
  }

  const initialVisited: Record<string, boolean> = {};
  if (assessment.sections[0]?.questions[0]) {
    initialVisited[assessment.sections[0].questions[0].id] = true;
  }

  return {
    assessmentId: assessment.id,
    startedAt: 0,
    currentSectionIndex: 0,
    currentQuestionIndex: 0,
    sectionRemainingSeconds,
    answers: {},
    markedForReview: {},
    visitedQuestions: initialVisited,
    codingSubmissions: {},
    isCompleted: false,
    tabSwitchCount: 0,
  };
}

export function usePlacementSession(assessment: CompanyAssessment) {
  const [session, setSession] = useState<ActiveAssessmentSession>(() => {
    const existing = getStoredActiveSession();
    if (existing && existing.assessmentId === assessment.id) {
      return existing;
    }
    const fresh = createNewSession(assessment);
    saveStoredActiveSession(fresh);
    return fresh;
  });

  const [activeReport, setActiveReport] = useState<AssessmentReport | null>(null);
  const [gradedAssessment, setGradedAssessment] = useState<CompanyAssessment | null>(null);
  const [gradeError, setGradeError] = useState('');
  const [gradeAttempt, setGradeAttempt] = useState(0);
  const [tabWarning, setTabWarning] = useState<boolean>(false);

  // Sync session state when assessment prop / URL route changes
  useEffect(() => {
    setSession((prev) => {
      if (prev.assessmentId === assessment.id) return prev;
      const existing = getStoredActiveSession();
      if (existing && existing.assessmentId === assessment.id) {
        return existing;
      }
      const fresh = createNewSession(assessment);
      saveStoredActiveSession(fresh);
      return fresh;
    });
    setActiveReport(null);
    setGradedAssessment(null);
    setGradeError('');
  }, [assessment.id]);

  const startAssessment = useCallback(() => {
    setSession(current => current.startedAt ? current : { ...current, startedAt: Date.now() });
  }, []);

  const restartAssessment = useCallback(() => {
    const fresh = { ...createNewSession(assessment), startedAt: Date.now() };
    saveStoredActiveSession(fresh);
    setSession(fresh);
    setActiveReport(null);
  }, [assessment]);

  // Sync to localStorage
  useEffect(() => {
    saveStoredActiveSession(session);
  }, [session]);

  const currentSection = assessment.sections[session.currentSectionIndex] || assessment.sections[0];
  const currentQuestion = currentSection.questions[session.currentQuestionIndex] || currentSection.questions[0];

  // Timer countdown hook (section countdown)
  useEffect(() => {
    if (!session.startedAt || session.isCompleted) return;

    const interval = setInterval(() => {
      setSession((prev) => {
        if (prev.isCompleted) return prev;
        const currentSecId = assessment.sections[prev.currentSectionIndex]?.id;
        if (!currentSecId) return prev;

        const currentSecRemaining = prev.sectionRemainingSeconds[currentSecId] ?? 0;
        if (currentSecRemaining <= 1) {
          // If section time has expired:
          if (prev.currentSectionIndex < assessment.sections.length - 1) {
            // Move to next section
            const nextSecIndex = prev.currentSectionIndex + 1;
            const nextSec = assessment.sections[nextSecIndex];
            const nextQ = nextSec?.questions[0];
            const visited = { ...prev.visitedQuestions };
            if (nextQ) visited[nextQ.id] = true;

            return {
              ...prev,
              currentSectionIndex: nextSecIndex,
              currentQuestionIndex: 0,
              sectionRemainingSeconds: {
                ...prev.sectionRemainingSeconds,
                [currentSecId]: 0,
              },
              visitedQuestions: visited,
            };
          } else {
            // Entire test completed
            return {
              ...prev,
              isCompleted: true,
              submittedAt: Date.now(),
              autoSubmitted: true,
              sectionRemainingSeconds: {
                ...prev.sectionRemainingSeconds,
                [currentSecId]: 0,
              },
            };
          }
        }

        return {
          ...prev,
          sectionRemainingSeconds: {
            ...prev.sectionRemainingSeconds,
            [currentSecId]: currentSecRemaining - 1,
          },
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [assessment, session.startedAt, session.isCompleted]);

  // Tab switch / anti-cheat listener
  useEffect(() => {
    if (!session.startedAt || session.isCompleted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSession((prev) => {
          const nextCount = prev.tabSwitchCount + 1;
          return {
            ...prev,
            tabSwitchCount: nextCount,
          };
        });
        setTabWarning(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [session.startedAt, session.isCompleted]);

  // Actions
  const selectAnswer = useCallback((questionId: string, optionId: string) => {
    setSession((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: optionId,
      },
    }));
  }, []);

  const clearAnswer = useCallback((questionId: string) => {
    setSession((prev) => {
      const nextAnswers = { ...prev.answers };
      delete nextAnswers[questionId];
      return {
        ...prev,
        answers: nextAnswers,
      };
    });
  }, []);

  const toggleMarkForReview = useCallback((questionId: string) => {
    setSession((prev) => ({
      ...prev,
      markedForReview: {
        ...prev.markedForReview,
        [questionId]: !prev.markedForReview[questionId],
      },
    }));
  }, []);

  const recordCodingSubmission = useCallback(
    (questionId: string, submission: CodingSubmissionResult) => {
      setSession((prev) => ({
        ...prev,
        codingSubmissions: {
          ...prev.codingSubmissions,
          [questionId]: submission,
        },
      }));
    },
    []
  );

  const goToSection = useCallback(
    (sectionIndex: number) => {
      setSession((prev) => {
        // If section locks enforced and trying to move backwards, prevent if past
        if (assessment.enforceSectionLock && sectionIndex < prev.currentSectionIndex) {
          return prev;
        }
        const targetSec = assessment.sections[sectionIndex];
        if (!targetSec) return prev;
        const targetQ = targetSec.questions[0];
        const visited = { ...prev.visitedQuestions };
        if (targetQ) visited[targetQ.id] = true;

        return {
          ...prev,
          currentSectionIndex: sectionIndex,
          currentQuestionIndex: 0,
          visitedQuestions: visited,
        };
      });
    },
    [assessment]
  );

  const goToQuestion = useCallback(
    (questionIndex: number) => {
      setSession((prev) => {
        const sec = assessment.sections[prev.currentSectionIndex];
        if (!sec || !sec.questions[questionIndex]) return prev;
        const qId = sec.questions[questionIndex].id;
        return {
          ...prev,
          currentQuestionIndex: questionIndex,
          visitedQuestions: {
            ...prev.visitedQuestions,
            [qId]: true,
          },
        };
      });
    },
    [assessment]
  );

  const nextQuestion = useCallback(() => {
    const sec = assessment.sections[session.currentSectionIndex];
    if (!sec) return;
    if (session.currentQuestionIndex < sec.questions.length - 1) {
      goToQuestion(session.currentQuestionIndex + 1);
    } else if (session.currentSectionIndex < assessment.sections.length - 1) {
      goToSection(session.currentSectionIndex + 1);
    }
  }, [assessment, session.currentQuestionIndex, session.currentSectionIndex, goToQuestion, goToSection]);

  const prevQuestion = useCallback(() => {
    if (session.currentQuestionIndex > 0) {
      goToQuestion(session.currentQuestionIndex - 1);
    } else if (session.currentSectionIndex > 0 && !assessment.enforceSectionLock) {
      const prevSecIndex = session.currentSectionIndex - 1;
      const prevSec = assessment.sections[prevSecIndex];
      if (prevSec) {
        setSession((prev) => ({
          ...prev,
          currentSectionIndex: prevSecIndex,
          currentQuestionIndex: prevSec.questions.length - 1,
        }));
      }
    }
  }, [assessment, session.currentQuestionIndex, session.currentSectionIndex, goToQuestion]);

  const submitAssessment = useCallback((autoSubmitted = false) => {
    setSession(previous => ({ ...previous, isCompleted: true, submittedAt: Date.now(), autoSubmitted }));
  }, []);

  useEffect(() => {
    if (!session.isCompleted || activeReport) return;
    const controller = new AbortController();
    const receipts = Object.fromEntries(Object.entries(session.codingSubmissions).flatMap(([id, submission]) =>
      submission.gradeReceipt ? [[id, submission.gradeReceipt]] : [],
    ));
    void apiRequest<{ report: AssessmentReport; assessment: CompanyAssessment }>(
      `/placement/${encodeURIComponent(assessment.id)}/grade`,
      {
        method: 'POST', signal: controller.signal,
        body: JSON.stringify({
          answers: session.answers, receipts, startedAt: session.startedAt,
          autoSubmitted: session.autoSubmitted, tabSwitchCount: session.tabSwitchCount,
        }),
      },
    ).then(result => {
      if (controller.signal.aborted) return;
      setActiveReport(result.report);
      setGradedAssessment(result.assessment);
      savePlacementHistoryItem(result.report);
      saveStoredActiveSession(null);
    }).catch(error => {
      if (!controller.signal.aborted) setGradeError(error instanceof Error ? error.message : 'Could not grade the assessment.');
    });
    return () => controller.abort();
  }, [assessment.id, session, activeReport, gradeAttempt]);

  const retryGrade = () => {
    setGradeError('');
    setGradeAttempt(attempt => attempt + 1);
  };

  // Status helper for question palette
  const getQuestionStatus = useCallback(
    (questionId: string): QuestionStatus => {
      const isVisited = Boolean(session.visitedQuestions[questionId]);
      const hasAnswer =
        Boolean(session.answers[questionId]) ||
        (session.codingSubmissions[questionId]?.passedCases ?? 0) > 0;
      const isMarked = Boolean(session.markedForReview[questionId]);

      if (!isVisited) return 'not_visited';
      if (isMarked && hasAnswer) return 'answered_and_marked';
      if (isMarked) return 'marked_for_review';
      if (hasAnswer) return 'answered';
      return 'not_answered';
    },
    [session.answers, session.codingSubmissions, session.markedForReview, session.visitedQuestions]
  );

  return {
    session,
    currentSection,
    currentQuestion,
    activeReport,
    gradedAssessment,
    gradeError,
    retryGrade,
    tabWarning,
    setTabWarning,
    selectAnswer,
    clearAnswer,
    toggleMarkForReview,
    recordCodingSubmission,
    goToSection,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitAssessment,
    startAssessment,
    restartAssessment,
    getQuestionStatus,
  };
}
