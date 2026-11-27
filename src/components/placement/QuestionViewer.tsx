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
    <div
      className="flex flex-col h-full rounded-2xl border shadow-xs overflow-hidden"
      style={{
        backgroundColor: 'var(--ca-surface)',
        borderColor: 'var(--ca-border)',
      }}
    >
      {/* Question Header */}
      <div
        className="flex items-center justify-between border-b px-5 py-3"
        style={{
          backgroundColor: 'var(--ca-surface-muted)',
          borderColor: 'var(--ca-border)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="font-display text-sm font-bold text-primary">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold border"
            style={{
              borderColor: 'var(--ca-border)',
              backgroundColor: 'var(--ca-surface)',
              color: 'var(--ca-text)',
            }}
          >
            {question.subtopic}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="text-emerald-500 font-semibold">
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
        <div className="text-sm font-medium leading-relaxed text-primary whitespace-pre-line">
          {question.question}
        </div>

        {/* Code Snippet (if any) */}
        {question.codeSnippet && (
          <div
            className="relative rounded-xl border overflow-hidden font-mono text-xs"
            style={{
              borderColor: 'var(--ca-border)',
              backgroundColor: '#0d1117',
            }}
          >
            <div
              className="flex items-center justify-between border-b px-4 py-1.5 text-xs text-muted"
              style={{
                borderColor: 'var(--ca-border)',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <span className="text-[11px] uppercase">{question.codeSnippet.language}</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs overflow-x-auto leading-relaxed text-slate-100">
              <code>{question.codeSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* MCQ Options */}
        <div className="mt-4 space-y-2.5">
          <div className="text-xs font-semibold text-muted uppercase tracking-wider">
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
                      ? 'border-indigo-500 shadow-xs'
                      : 'hover:border-indigo-500/40 text-primary'
                  }`}
                  style={{
                    backgroundColor: isSelected
                      ? 'color-mix(in srgb, var(--ca-accent-solid) 12%, var(--ca-surface))'
                      : 'var(--ca-surface)',
                    borderColor: isSelected ? undefined : 'var(--ca-border)',
                  }}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                      isSelected ? 'bg-indigo-600 text-white shadow-xs' : 'border'
                    }`}
                    style={
                      isSelected
                        ? undefined
                        : {
                            borderColor: 'var(--ca-border)',
                            backgroundColor: 'var(--ca-surface-muted)',
                            color: 'var(--ca-text)',
                          }
                    }
                  >
                    {option.id}
                  </span>
                  <span className="flex-1 pt-0.5 leading-relaxed whitespace-pre-line text-primary">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-t px-5 py-3"
        style={{
          backgroundColor: 'var(--ca-surface-muted)',
          borderColor: 'var(--ca-border)',
        }}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleMarkForReview}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
              isMarkedForReview
                ? 'border-purple-500 bg-purple-500/15 text-purple-400'
                : 'text-muted hover:text-primary'
            }`}
            style={{
              borderColor: isMarkedForReview ? undefined : 'var(--ca-border)',
              backgroundColor: isMarkedForReview ? undefined : 'var(--ca-surface)',
            }}
          >
            <Bookmark size={13} className={isMarkedForReview ? 'fill-current' : ''} />
            <span>{isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
          </button>

          {selectedOptionId && (
            <button
              type="button"
              onClick={onClearResponse}
              className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors"
              style={{
                borderColor: 'var(--ca-border)',
                backgroundColor: 'var(--ca-surface)',
              }}
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
            className="inline-flex items-center gap-1 rounded-xl border px-3.5 py-1.5 text-xs font-semibold text-muted hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
            style={{
              borderColor: 'var(--ca-border)',
              backgroundColor: 'var(--ca-surface)',
            }}
          >
            <ChevronLeft size={14} />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 text-xs font-bold text-white shadow-xs transition-colors"
          >
            <span>{isLast ? 'Save & Next Section' : 'Save & Next'}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
