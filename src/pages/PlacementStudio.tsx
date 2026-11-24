import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lock,
  Play,
  RotateCcw,
  Send,
  ShieldAlert,
  Sparkles,
  X,
} from 'lucide-react';
import { COMPANY_ASSESSMENTS } from '../data/placement/assessments';
import { PLACEMENT_COMPANIES } from '../data/placement/companies';
import { usePlacementSession } from '../lib/placement/progress';
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
    getQuestionStatus,
  } = usePlacementSession(assessment);

  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    // If user already answered questions or time is running, skip briefing
    return (
      session.isCompleted ||
      Object.keys(session.answers).length > 0 ||
      Object.keys(session.codingSubmissions).length > 0
    );
  });

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
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 px-3 sm:px-6 py-6">
        <ScorecardView
          report={reportToRender}
          assessment={assessment}
          onRetake={() => {
            // Restart
            window.location.reload();
          }}
          onBackToHub={() => navigate('/placement')}
        />
      </div>
    );
  }

  // Pre-test Briefing Screen
  if (!hasStarted) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-6 animate-in fade-in duration-200">
        <button
          type="button"
          onClick={() => navigate('/placement')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft size={14} />
          <span>Exit to Placement Hub</span>
        </button>

        {/* Briefing Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-sm"
              style={{ backgroundColor: company?.brandColor || '#3b82f6' }}
            >
              {assessment.companyName.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400">
                {company?.shortName || assessment.companyName} • Assessment Briefing
              </span>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {assessment.title}
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
            {assessment.description}
          </p>

          {/* Section Blueprint Table */}
          <div className="space-y-2">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
              Assessment Structure & Timings
            </h3>
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-neutral-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-neutral-800/60 text-slate-700 dark:text-neutral-300 font-semibold border-b border-slate-200 dark:border-neutral-800">
                  <tr>
                    <th className="p-3">Section</th>
                    <th className="p-3">Questions</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Calculator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-neutral-800 text-slate-600 dark:text-neutral-300">
                  {assessment.sections.map((sec) => (
                    <tr key={sec.id}>
                      <td className="p-3 font-medium text-slate-900 dark:text-white">
                        {sec.title}
                      </td>
                      <td className="p-3">{sec.questions.length} Questions</td>
                      <td className="p-3">{sec.durationMinutes} Minutes</td>
                      <td className="p-3">
                        {sec.allowCalculator ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            Allowed (On-screen)
                          </span>
                        ) : (
                          <span className="text-slate-400">Not Allowed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Guidelines & Rules */}
          <div className="rounded-2xl border border-blue-200/80 bg-blue-50/60 p-4 text-xs text-blue-950 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-200 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles size={14} className="text-blue-500" />
              <span>Assessment Rules & Evaluation Protocol:</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-neutral-300">
              <li>
                {assessment.enforceSectionLock ? (
                  <strong>
                    Section Navigation Lock: Once you advance past a section, you cannot return to modify answers in that section.
                  </strong>
                ) : (
                  'You may switch freely between questions within sections.'
                )}
              </li>
              <li>
                Progress is saved automatically on every click. Refreshing or accidental browser closure will safely resume your test with remaining time.
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
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-all hover:scale-[1.02]"
            >
              <Play size={16} />
              <span>Start Mock Assessment</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentSecTimeRemaining =
    session.sectionRemainingSeconds[currentSection.id] ?? (currentSection.durationMinutes * 60);

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-slate-100/60 dark:bg-neutral-950 overflow-hidden">
      {/* Tab Switch Anti-Cheat Warning */}
      {tabWarning && (
        <div className="bg-amber-500 px-4 py-1.5 text-center text-xs font-bold text-white flex items-center justify-center gap-2">
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
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 dark:border-neutral-800/80 dark:bg-neutral-900/95 shadow-xs z-20">
        {/* Left: Brand & Track */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white shadow-xs"
            style={{ backgroundColor: company?.brandColor || '#3b82f6' }}
          >
            {assessment.companyName.charAt(0)}
          </div>
          <div>
            <h2 className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
              {assessment.title}
            </h2>
            <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">
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
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isLocked
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-neutral-800/40 dark:text-neutral-600'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                }`}
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
                  ? 'border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-500/80 dark:bg-blue-950/40 dark:text-blue-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
              }`}
            >
              <Calculator size={13} className="text-blue-500" />
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
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-neutral-100 transition-colors"
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
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  Submit Assessment?
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Review your question status before concluding.
                </p>
              </div>
            </div>

            {/* Status Breakdown Grid */}
            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-3 dark:bg-neutral-800/60 text-center">
              <div>
                <div className="text-[10px] text-slate-500 dark:text-neutral-400">Answered</div>
                <div className="mt-0.5 font-bold text-emerald-600 dark:text-emerald-400 text-base">
                  {submitCounts.answered}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 dark:text-neutral-400">Marked Review</div>
                <div className="mt-0.5 font-bold text-purple-600 dark:text-purple-400 text-base">
                  {submitCounts.marked}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 dark:text-neutral-400">Unanswered</div>
                <div className="mt-0.5 font-bold text-rose-500 text-base">
                  {submitCounts.notAnswered}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-neutral-300">
              Are you sure you want to finish this mock exam? You will immediately receive your sectional performance report and national percentile rank.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              >
                Continue Assessment
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  submitAssessment(false);
                }}
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
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
