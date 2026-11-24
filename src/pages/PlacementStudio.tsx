import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Calculator,
  CheckCircle2,
  Lock,
  Play,
  Send,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { COMPANY_ASSESSMENTS } from '../data/placement/assessments';
import { PLACEMENT_COMPANIES } from '../data/placement/companies';
import { getStoredActiveSession, usePlacementSession } from '../lib/placement/progress';
import { computeAssessmentReport } from '../data/placement/scoring';
import QuestionViewer from '../components/placement/QuestionViewer';
import CodingRunnerSection from '../components/placement/CodingRunnerSection';
import QuestionPalette from '../components/placement/QuestionPalette';
import AssessmentTimer from '../components/placement/AssessmentTimer';
import VirtualCalculator from '../components/placement/VirtualCalculator';
import ScorecardView from '../components/placement/ScorecardView';
import { McqPlacementQuestion, CodingPlacementQuestion } from '../types/placement';

export default function PlacementStudio() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();

  const assessment = useMemo(() => {
    return (
      COMPANY_ASSESSMENTS.find((a) => a.id === assessmentId) ||
      COMPANY_ASSESSMENTS[0]
    );
  }, [assessmentId]);

  const company = PLACEMENT_COMPANIES[assessment.companyId];

  const {
    session,
    currentSection,
    currentQuestion,
    activeReport,
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
    restartAssessment,
    getQuestionStatus,
  } = usePlacementSession(assessment);

  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    const existing = getStoredActiveSession();
    if (existing && existing.assessmentId === assessment.id) {
      return (
        existing.isCompleted ||
        Object.keys(existing.answers).length > 0 ||
        Object.keys(existing.codingSubmissions).length > 0
      );
    }
    return false;
  });

  // Keep hasStarted synced when switching between mocks via URL parameter
  useEffect(() => {
    const existing = getStoredActiveSession();
    if (existing && existing.assessmentId === assessment.id) {
      setHasStarted(
        existing.isCompleted ||
        Object.keys(existing.answers).length > 0 ||
        Object.keys(existing.codingSubmissions).length > 0
      );
    } else {
      setHasStarted(false);
    }
  }, [assessment.id]);

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Compute question counts for submit modal
  const submitCounts = useMemo(() => {
    let answered = 0;
    let marked = 0;
    let notAnswered = 0;

    for (const sec of assessment.sections) {
      for (const q of sec.questions) {
        const status = getQuestionStatus(q.id);
        if (status === 'answered' || status === 'answered_and_marked') answered += 1;
        else if (status === 'marked_for_review') marked += 1;
        else notAnswered += 1;
      }
    }
    return { answered, marked, notAnswered };
  }, [assessment, getQuestionStatus]);

  // If assessment is completed, render scorecard directly
  if (session.isCompleted || activeReport) {
    const reportToRender =
      activeReport || computeAssessmentReport(assessment, session);

    return (
      <div
        className="min-h-screen px-3 sm:px-6 py-6"
        style={{ backgroundColor: 'var(--ca-canvas)' }}
      >
        <ScorecardView
          report={reportToRender}
          assessment={assessment}
          onRetake={() => {
            restartAssessment();
            setHasStarted(true);
          }}
          onBackToHub={() => navigate('/placement')}
        />
      </div>
    );
  }

  // Pre-test Briefing Screen
  if (!hasStarted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: 'var(--ca-canvas)' }}
      >
        <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-200">
          <button
            type="button"
            onClick={() => navigate('/placement')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Exit to Placement Hub</span>
          </button>

          {/* Briefing Card */}
          <div
            className="rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-sm shrink-0"
                style={{ backgroundColor: company?.brandColor || '#3b82f6' }}
              >
                {assessment.companyName.charAt(0)}
              </div>
              <div>
                <span className="text-xs font-semibold text-muted">
                  {company?.shortName || assessment.companyName} • Assessment Briefing
                </span>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-primary">
                  {assessment.title}
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {assessment.description}
            </p>

            {/* Section Blueprint Table */}
            <div className="space-y-2">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-muted">
                Assessment Structure & Timings
              </h3>
              <div
                className="overflow-hidden rounded-2xl border"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                <table className="w-full text-left text-xs">
                  <thead
                    className="font-semibold border-b"
                    style={{
                      backgroundColor: 'var(--ca-surface-muted)',
                      borderColor: 'var(--ca-border)',
                      color: 'var(--ca-text)',
                    }}
                  >
                    <tr>
                      <th className="p-3">Section</th>
                      <th className="p-3">Questions</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Calculator</th>
                    </tr>
                  </thead>
                  <tbody
                    className="divide-y divide-[var(--ca-border)] text-muted"
                    style={{
                      backgroundColor: 'var(--ca-surface)',
                    }}
                  >
                    {assessment.sections.map((sec) => (
                      <tr key={sec.id}>
                        <td className="p-3 font-medium text-primary">
                          {sec.title}
                        </td>
                        <td className="p-3">{sec.questions.length} Questions</td>
                        <td className="p-3">{sec.durationMinutes} Minutes</td>
                        <td className="p-3">
                          {sec.allowCalculator ? (
                            <span className="text-emerald-500 font-semibold">
                              Allowed (On-screen)
                            </span>
                          ) : (
                            <span className="text-muted opacity-60">Not Allowed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Guidelines & Rules */}
            <div
              className="rounded-2xl border p-4 text-xs space-y-2"
              style={{
                borderColor: 'color-mix(in srgb, var(--ca-accent-solid) 30%, var(--ca-border))',
                backgroundColor: 'color-mix(in srgb, var(--ca-accent-solid) 6%, var(--ca-surface))',
              }}
            >
              <div className="font-bold flex items-center gap-1.5 text-primary">
                <Sparkles size={14} className="text-indigo-400" />
                <span>Assessment Rules & Evaluation Protocol:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-muted">
                <li>
                  {assessment.enforceSectionLock ? (
                    <strong className="text-primary">
                      Section Navigation Lock: Once you advance past a section, you cannot return to modify answers in that section.
                    </strong>
                  ) : (
                    'You may switch freely between questions within sections.'
                  )}
                </li>
                <li>
                  Progress is saved automatically on every click. Refreshing or browser navigation will safely resume your test with remaining time.
                </li>
                <li>
                  Switching tabs or minimizing the browser triggers anti-cheat activity logs.
                </li>
              </ul>
            </div>

            {/* Start CTA */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setHasStarted(true)}
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02]"
              >
                <Play size={16} />
                <span>Start Mock Assessment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentSecTimeRemaining =
    session.sectionRemainingSeconds[currentSection.id] ?? (currentSection.durationMinutes * 60);

  return (
    <div
      className="flex flex-col h-screen w-full overflow-hidden"
      style={{ backgroundColor: 'var(--ca-canvas)' }}
    >
      {/* Tab Switch Anti-Cheat Warning */}
      {tabWarning && (
        <div className="bg-amber-500 px-4 py-1.5 text-center text-xs font-bold text-white flex items-center justify-center gap-2 shrink-0">
          <ShieldAlert size={14} />
          <span>
            Notice: Tab focus change detected ({session.tabSwitchCount} times). Please stay on the assessment window.
          </span>
          <button
            type="button"
            onClick={() => setTabWarning(false)}
            className="ml-2 rounded bg-black/20 px-1.5 py-0.5 text-[10px] hover:bg-black/30"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Studio Header */}
      <header
        className="flex h-14 shrink-0 items-center justify-between border-b px-4 sm:px-6 shadow-xs z-20"
        style={{
          backgroundColor: 'var(--ca-surface)',
          borderColor: 'var(--ca-border)',
        }}
      >
        {/* Left: Brand & Track with Back link */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/placement')}
            className="flex items-center gap-1 rounded-xl border px-2.5 py-1 text-xs font-semibold text-muted hover:text-primary transition-colors"
            style={{
              borderColor: 'var(--ca-border)',
              backgroundColor: 'var(--ca-surface-muted)',
            }}
            title="Return to Placement Hub (Progress is saved)"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Hub</span>
          </button>

          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white shadow-xs"
            style={{ backgroundColor: company?.brandColor || '#3b82f6' }}
          >
            {assessment.companyName.charAt(0)}
          </div>
          <div>
            <h2 className="font-display text-xs sm:text-sm font-bold text-primary truncate max-w-[180px] sm:max-w-md">
              {assessment.title}
            </h2>
            <div className="text-[10px] text-muted font-medium">
              {assessment.track}
            </div>
          </div>
        </div>

        {/* Middle: Section Switcher Pills */}
        <div className="hidden md:flex items-center gap-1.5">
          {assessment.sections.map((sec, idx) => {
            const isCurrent = idx === session.currentSectionIndex;
            const isLocked =
              assessment.enforceSectionLock && idx < session.currentSectionIndex;

            return (
              <button
                key={sec.id}
                type="button"
                disabled={isLocked}
                onClick={() => goToSection(idx)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isLocked
                    ? 'opacity-40 cursor-not-allowed text-muted'
                    : 'border text-muted hover:text-primary'
                }`}
                style={{
                  backgroundColor: isCurrent ? undefined : 'var(--ca-surface-muted)',
                  borderColor: isCurrent ? undefined : 'var(--ca-border)',
                }}
              >
                {isLocked && <Lock size={11} />}
                <span>{sec.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Timer, Calculator, Submit CTA */}
        <div className="flex items-center gap-2.5">
          {/* Virtual Calculator Toggle (if allowed in current section) */}
          {currentSection.allowCalculator && (
            <button
              type="button"
              onClick={() => setIsCalculatorOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                isCalculatorOpen
                  ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/40'
                  : 'text-muted hover:text-primary'
              }`}
              style={{
                borderColor: isCalculatorOpen ? undefined : 'var(--ca-border)',
                backgroundColor: isCalculatorOpen ? undefined : 'var(--ca-surface-muted)',
              }}
            >
              <Calculator size={13} className="text-indigo-400" />
              <span className="hidden sm:inline">Calculator</span>
            </button>
          )}

          {/* Section Timer */}
          <AssessmentTimer
            remainingSeconds={currentSecTimeRemaining}
            totalSeconds={currentSection.durationMinutes * 60}
            sectionTitle={currentSection.title}
          />

          {/* Finish Assessment Button */}
          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-colors"
          >
            <span>Finish</span>
            <Send size={12} />
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden p-3 sm:p-4 gap-3 sm:gap-4">
        {/* Left: Active Question Viewer or Coding Runner */}
        <div className="flex-1 h-full overflow-hidden">
          {currentQuestion.type === 'mcq' ? (
            <QuestionViewer
              question={currentQuestion as McqPlacementQuestion}
              questionNumber={session.currentQuestionIndex + 1}
              totalQuestions={currentSection.questions.length}
              selectedOptionId={session.answers[currentQuestion.id]}
              isMarkedForReview={Boolean(session.markedForReview[currentQuestion.id])}
              onSelectOption={(optId) => selectAnswer(currentQuestion.id, optId)}
              onClearResponse={() => clearAnswer(currentQuestion.id)}
              onToggleMarkForReview={() => toggleMarkForReview(currentQuestion.id)}
              onNext={nextQuestion}
              onPrev={prevQuestion}
              isFirst={session.currentQuestionIndex === 0}
              isLast={session.currentQuestionIndex === currentSection.questions.length - 1}
            />
          ) : (
            <CodingRunnerSection
              question={currentQuestion as CodingPlacementQuestion}
              questionNumber={session.currentQuestionIndex + 1}
              totalQuestions={currentSection.questions.length}
              savedSubmission={session.codingSubmissions[currentQuestion.id]}
              onSaveSubmission={(sub) => recordCodingSubmission(currentQuestion.id, sub)}
              onNext={nextQuestion}
              onPrev={prevQuestion}
              isFirst={session.currentQuestionIndex === 0}
              isLast={session.currentQuestionIndex === currentSection.questions.length - 1}
            />
          )}
        </div>

        {/* Right Sidebar: TCS iON Question Palette */}
        <aside className="hidden lg:block w-72 shrink-0 h-full">
          <QuestionPalette
            section={currentSection}
            currentQuestionIndex={session.currentQuestionIndex}
            onSelectQuestion={goToQuestion}
            getQuestionStatus={getQuestionStatus}
          />
        </aside>
      </div>

      {/* Floating On-Screen Calculator */}
      <VirtualCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Submit Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-md rounded-3xl border p-6 shadow-2xl space-y-5"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-primary">
                  Submit Assessment?
                </h3>
                <p className="text-xs text-muted">
                  Review your question status before concluding.
                </p>
              </div>
            </div>

            {/* Status Breakdown Grid */}
            <div
              className="grid grid-cols-3 gap-2 rounded-2xl border p-3 text-center"
              style={{
                borderColor: 'var(--ca-border)',
                backgroundColor: 'var(--ca-surface-muted)',
              }}
            >
              <div>
                <div className="text-[10px] text-muted">Answered</div>
                <div className="mt-0.5 font-bold text-emerald-500 text-base">
                  {submitCounts.answered}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-muted">Marked Review</div>
                <div className="mt-0.5 font-bold text-purple-400 text-base">
                  {submitCounts.marked}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-muted">Unanswered</div>
                <div className="mt-0.5 font-bold text-rose-500 text-base">
                  {submitCounts.notAnswered}
                </div>
              </div>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              Are you sure you want to finish this mock exam? You will immediately receive your sectional performance report and national percentile rank.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="rounded-xl border px-4 py-2 text-xs font-semibold text-muted hover:text-primary transition-colors"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                Continue Assessment
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  submitAssessment(false);
                }}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
