import React from 'react';
import { AssessmentSection, QuestionStatus } from '../../types/placement';

interface QuestionPaletteProps {
  section: AssessmentSection;
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  getQuestionStatus: (questionId: string) => QuestionStatus;
}

export default function QuestionPalette({
  section,
  currentQuestionIndex,
  onSelectQuestion,
  getQuestionStatus,
}: QuestionPaletteProps) {
  // Aggregate counts
  let answeredCount = 0;
  let notAnsweredCount = 0;
  let markedCount = 0;
  let markedAnsweredCount = 0;
  let notVisitedCount = 0;

  section.questions.forEach((q) => {
    const status = getQuestionStatus(q.id);
    if (status === 'answered') answeredCount += 1;
    else if (status === 'not_answered') notAnsweredCount += 1;
    else if (status === 'marked_for_review') markedCount += 1;
    else if (status === 'answered_and_marked') markedAnsweredCount += 1;
    else notVisitedCount += 1;
  });

  return (
    <div
      className="flex flex-col h-full rounded-2xl border p-4 shadow-xs"
      style={{
        backgroundColor: 'var(--ca-surface)',
        borderColor: 'var(--ca-border)',
      }}
    >
      {/* Palette Title */}
      <div className="border-b pb-3" style={{ borderColor: 'var(--ca-border)' }}>
        <h4 className="font-display text-xs font-bold uppercase tracking-wider text-muted">
          Question Palette
        </h4>
        <div className="mt-1 text-xs font-semibold text-primary truncate">
          {section.title}
        </div>
      </div>

      {/* TCS iON Status Legend */}
      <div className="my-3 grid grid-cols-2 gap-2 text-[11px] font-medium text-muted">
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-[10px] font-bold text-white shadow-xs">
            {answeredCount}
          </span>
          <span className="truncate">Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-rose-500 text-[10px] font-bold text-white shadow-xs">
            {notAnsweredCount}
          </span>
          <span className="truncate">Not Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-purple-600 text-[10px] font-bold text-white shadow-xs">
            {markedCount}
          </span>
          <span className="truncate">Marked Review</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-purple-600 text-[10px] font-bold text-white ring-2 ring-emerald-400 shadow-xs">
            {markedAnsweredCount}
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-white" />
          </span>
          <span className="truncate">Ans & Marked</span>
        </div>
        <div className="col-span-2 flex items-center gap-1.5">
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold shadow-xs"
            style={{
              borderColor: 'var(--ca-border)',
              backgroundColor: 'var(--ca-surface-muted)',
              color: 'var(--ca-text)',
            }}
          >
            {notVisitedCount}
          </span>
          <span className="truncate">Not Visited</span>
        </div>
      </div>

      {/* Matrix of Questions */}
      <div className="mt-2 flex-1 overflow-y-auto pr-1">
        <div className="text-[11px] font-semibold text-primary mb-2">
          Choose a Question:
        </div>
        <div className="grid grid-cols-5 gap-2">
          {section.questions.map((q, idx) => {
            const status = getQuestionStatus(q.id);
            const isCurrent = idx === currentQuestionIndex;

            let statusClasses = 'border text-muted hover:text-primary';
            let inlineStyle: React.CSSProperties = {
              borderColor: 'var(--ca-border)',
              backgroundColor: 'var(--ca-surface-muted)',
              color: 'var(--ca-text)',
            };

            if (status === 'answered') {
              statusClasses = 'bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-xs border-emerald-500';
              inlineStyle = {};
            } else if (status === 'not_answered') {
              statusClasses = 'bg-rose-500 text-white font-bold hover:bg-rose-600 shadow-xs border-rose-500';
              inlineStyle = {};
            } else if (status === 'marked_for_review') {
              statusClasses = 'bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-xs border-purple-500';
              inlineStyle = {};
            } else if (status === 'answered_and_marked') {
              statusClasses = 'bg-purple-600 text-white font-bold hover:bg-purple-700 ring-2 ring-emerald-400 shadow-xs border-purple-500';
              inlineStyle = {};
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectQuestion(idx)}
                style={inlineStyle}
                className={`relative flex h-9 w-full items-center justify-center rounded-lg text-xs font-semibold transition-all ${statusClasses} ${
                  isCurrent ? 'ring-2 ring-offset-2 ring-indigo-500 scale-105 z-10' : ''
                }`}
                title={`Question ${idx + 1} (${status.replace(/_/g, ' ')})`}
              >
                {idx + 1}
                {status === 'answered_and_marked' && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-400 ring-1 ring-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
