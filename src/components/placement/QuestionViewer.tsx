import React from 'react';
import { Bookmark, Check, ChevronLeft, ChevronRight, Copy, RotateCcw } from 'lucide-react';
import { McqPlacementQuestion } from '../../types/placement';

interface QuestionViewerProps {
  question: McqPlacementQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId?: string;
  isMarkedForReview: boolean;
  onSelectOption: (optionId: string) => void;
  onClearResponse: () => void;
  onToggleMarkForReview: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function QuestionViewer({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionId,
  isMarkedForReview,
  onSelectOption,
  onClearResponse,
  onToggleMarkForReview,
  onNext,
  onPrev,
  isFirst,
  isLast,
}: QuestionViewerProps) {
  const [copiedCode, setCopiedCode] = React.useState(false);

  const handleCopyCode = () => {
    if (!question.codeSnippet?.code) return;
    navigator.clipboard.writeText(question.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/95 overflow-hidden">
      {/* Question Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3 dark:border-neutral-800 dark:bg-neutral-800/40">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-sm font-bold text-slate-900 dark:text-white">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-neutral-700 dark:text-neutral-300">
            {question.subtopic}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            +{question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}
          </span>
          {question.negativeMarks > 0 && (
            <span className="text-rose-500 font-semibold">
              -{question.negativeMarks} Negative
            </span>
          )}
        </div>
      </div>

      {/* Question Body */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
        {/* Question Statement */}
        <div className="text-sm font-medium leading-relaxed text-slate-800 dark:text-neutral-200 whitespace-pre-line">
          {question.question}
        </div>

        {/* Code Snippet (if any) */}
        {question.codeSnippet && (
          <div className="relative rounded-xl border border-slate-200 bg-slate-900 text-slate-100 dark:border-neutral-800 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-4 py-1.5 text-xs text-slate-400">
              <span className="font-mono text-[11px] uppercase">{question.codeSnippet.language}</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 font-mono text-xs overflow-x-auto leading-relaxed text-slate-200">
              <code>{question.codeSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* MCQ Options */}
        <div className="mt-4 space-y-2.5">
          <div className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
            Select an Option:
          </div>
          <div className="grid gap-2.5">
            {question.options.map((option) => {
              const isSelected = selectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSelectOption(option.id)}
                  className={`group flex items-start gap-3.5 rounded-xl border p-3.5 text-left text-xs transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 text-blue-900 font-medium dark:border-blue-500/80 dark:bg-blue-950/40 dark:text-blue-100 shadow-xs'
                      : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/80 text-slate-800 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-200 dark:hover:border-neutral-700'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'border border-slate-300 bg-slate-100 text-slate-600 group-hover:bg-slate-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {option.id}
                  </span>
                  <span className="flex-1 pt-0.5 leading-relaxed whitespace-pre-line">{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/80 px-5 py-3 dark:border-neutral-800 dark:bg-neutral-800/50">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleMarkForReview}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
              isMarkedForReview
                ? 'border-purple-500 bg-purple-50 text-purple-700 dark:border-purple-500/80 dark:bg-purple-950/40 dark:text-purple-300'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
            }`}
          >
            <Bookmark size={13} className={isMarkedForReview ? 'fill-current' : ''} />
            <span>{isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
          </button>

          {selectedOptionId && (
            <button
              type="button"
              onClick={onClearResponse}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-rose-400 dark:hover:bg-rose-950/30"
            >
              <RotateCcw size={12} />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isFirst}
            onClick={onPrev}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
          >
            <ChevronLeft size={14} />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <span>{isLast ? 'Save & Next Section' : 'Save & Next'}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
