import React, { useState, useMemo } from 'react';
import {
  Brain,
  CheckCircle2,
  ChevronDown,
  Filter,
  Search,
  Sparkles,
  XCircle,
  Zap,
} from 'lucide-react';
import { APTITUDE_QUESTION_BANK } from '../../../data/placement/questions/aptitudeQuestions';
import { McqPlacementQuestion, SectionType } from '../../../types/placement';

export default function AptitudePracticeTab() {
  const [selectedSection, setSelectedSection] = useState<SectionType | 'all'>('all');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Unique subtopics
  const subtopics = useMemo(() => {
    const list = APTITUDE_QUESTION_BANK.filter(
      (q) => selectedSection === 'all' || q.section === selectedSection
    ).map((q) => q.subtopic);
    return ['all', ...Array.from(new Set(list)).sort()];
  }, [selectedSection]);

  const filteredQuestions = useMemo(() => {
    return APTITUDE_QUESTION_BANK.filter((q) => {
      if (selectedSection !== 'all' && q.section !== selectedSection) return false;
      if (selectedSubtopic !== 'all' && q.subtopic !== selectedSubtopic) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQ = q.question.toLowerCase().includes(query);
        const matchesSub = q.subtopic.toLowerCase().includes(query);
        return matchesQ || matchesSub;
      }
      return true;
    });
  }, [selectedSection, selectedSubtopic, searchQuery]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    // Auto-reveal solution on answer
    setRevealedSolutions((prev) => ({ ...prev, [questionId]: true }));
  };

  const toggleSolution = (questionId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info */}
      <div
        className="rounded-2xl border p-5 shadow-xs"
        style={{
          borderColor: 'var(--ca-border)',
          backgroundColor: 'var(--ca-surface)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-blue-500 border border-blue-500/20">
              <Brain size={12} />
              <span>Campus Aptitude Mastery</span>
            </div>
            <h2 className="mt-2 text-lg sm:text-xl font-bold text-primary">
              Quantitative, Logical Reasoning & Verbal Curriculum
            </h2>
            <p className="mt-1 text-xs text-muted max-w-2xl">
              Targeted practice questions with verified step-by-step mathematical derivations and formula shortcuts. Master time-saving LCM and ratio techniques used in TCS NQT, Wipro, and Infosys elimination rounds.
            </p>
          </div>

          <div
            className="flex items-center gap-4 rounded-xl border p-3 text-center self-start sm:self-auto"
            style={{
              borderColor: 'var(--ca-border)',
              backgroundColor: 'var(--ca-surface-muted)',
            }}
          >
            <div>
              <div className="text-[10px] text-muted uppercase font-bold">Total Bank</div>
              <div className="text-xl font-extrabold text-primary">
                {APTITUDE_QUESTION_BANK.length}
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-neutral-800" />
            <div>
              <div className="text-[10px] text-muted uppercase font-bold">Solved</div>
              <div className="text-xl font-extrabold text-emerald-500">
                {Object.keys(userAnswers).length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Section Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Aptitude' },
            { id: 'quantitative', label: 'Quantitative Acumen' },
            { id: 'reasoning', label: 'Logical & Analytical' },
            { id: 'verbal', label: 'Verbal Ability' },
          ].map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => {
                setSelectedSection(sec.id as any);
                setSelectedSubtopic('all');
              }}
              style={{
                backgroundColor: selectedSection === sec.id ? 'var(--ca-surface-muted)' : 'var(--ca-surface)',
                borderColor: selectedSection === sec.id ? 'var(--ca-accent, #3b82f6)' : 'var(--ca-border)',
              }}
              className={`rounded-xl border px-3.5 py-1.5 font-bold whitespace-nowrap transition-all ${
                selectedSection === sec.id ? 'text-primary shadow-xs' : 'text-muted hover:text-primary'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted opacity-60" />
          <input
            type="text"
            placeholder="Search subtopic or question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border pl-8 pr-3 py-1.5 text-xs text-primary placeholder:text-muted focus:outline-none focus:border-indigo-500 transition-colors"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          />
        </div>
      </div>

      {/* Subtopic Filter Chips */}
      {subtopics.length > 2 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
          <span className="text-muted flex items-center gap-1 font-semibold pr-1">
            <Filter size={11} /> Topic:
          </span>
          {subtopics.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedSubtopic(st)}
              className={`rounded-lg px-2.5 py-1 font-medium transition-colors border ${
                selectedSubtopic === st
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'text-muted hover:text-primary'
              }`}
              style={{
                backgroundColor: selectedSubtopic === st ? undefined : 'var(--ca-surface)',
                borderColor: selectedSubtopic === st ? undefined : 'var(--ca-border)',
              }}
            >
              {st === 'all' ? 'All Subtopics' : st}
            </button>
          ))}
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, qIdx) => {
          const userAnswer = userAnswers[q.id];
          const isRevealed = revealedSolutions[q.id];
          const isCorrect = userAnswer === q.correctOptionId;

          return (
            <div
              key={q.id}
              className="rounded-2xl border p-5 shadow-xs transition-all space-y-4"
              style={{
                backgroundColor: 'var(--ca-surface)',
                borderColor: 'var(--ca-border)',
              }}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--ca-border)' }}>
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold"
                    style={{
                      backgroundColor: 'var(--ca-surface-muted)',
                      color: 'var(--ca-text)',
                    }}
                  >
                    {qIdx + 1}
                  </span>
                  <span className="text-xs font-bold text-primary">
                    {q.subtopic}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.2 text-[10px] font-bold ${
                      q.difficulty === 'Easy'
                        ? 'text-emerald-500 bg-emerald-500/10'
                        : q.difficulty === 'Medium'
                        ? 'text-amber-500 bg-amber-500/10'
                        : 'text-rose-500 bg-rose-500/10'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-muted">
                  <span>+{q.marks} Marks</span>
                  {userAnswer && (
                    <span
                      className={`inline-flex items-center gap-1 font-bold ${
                        isCorrect ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {isCorrect ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  )}
                </div>
              </div>

              {/* Question Prompt */}
              <div className="text-xs sm:text-sm font-medium text-primary leading-relaxed whitespace-pre-line">
                {q.question}
              </div>

              {/* Options Grid */}
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt) => {
                  const isSelected = userAnswer === opt.id;
                  const isThisCorrect = opt.id === q.correctOptionId;
                  let borderStyle = 'var(--ca-border)';
                  let bgStyle = 'var(--ca-surface-muted)';

                  if (userAnswer) {
                    if (isThisCorrect) {
                      borderStyle = 'rgba(16, 185, 129, 0.6)';
                      bgStyle = 'rgba(16, 185, 129, 0.12)';
                    } else if (isSelected && !isThisCorrect) {
                      borderStyle = 'rgba(239, 68, 68, 0.6)';
                      bgStyle = 'rgba(239, 68, 68, 0.12)';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      className="flex items-start gap-2.5 rounded-xl border p-3 text-left text-xs transition-all hover:opacity-90"
                      style={{
                        borderColor: borderStyle,
                        backgroundColor: bgStyle,
                      }}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-bold text-[10px] ${
                          isThisCorrect && userAnswer
                            ? 'bg-emerald-600 text-white'
                            : isSelected && !isThisCorrect
                            ? 'bg-rose-600 text-white'
                            : 'bg-neutral-500/20 text-muted'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="flex-1 text-primary leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Toggle Solution & Formula Box */}
              <div className="border-t pt-3 flex items-center justify-between" style={{ borderColor: 'var(--ca-border)' }}>
                <button
                  type="button"
                  onClick={() => toggleSolution(q.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors"
                >
                  <Sparkles size={13} />
                  <span>{isRevealed ? 'Hide Derivation & Shortcut' : 'Show Step-by-Step Derivation & Shortcut'}</span>
                  <ChevronDown size={14} className={`transition-transform ${isRevealed ? 'rotate-180' : ''}`} />
                </button>

                {userAnswer && !isRevealed && (
                  <span className="text-[11px] text-muted">
                    Correct Option: <strong className="text-emerald-500">{q.correctOptionId}</strong>
                  </span>
                )}
              </div>

              {/* Expanded Derivation Box */}
              {isRevealed && (
                <div
                  className="rounded-xl border p-4 space-y-3 text-xs"
                  style={{
                    backgroundColor: 'var(--ca-surface-muted)',
                    borderColor: 'var(--ca-border)',
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold text-primary">
                    <Zap size={14} className="text-amber-500" />
                    <span>Explanation & Derivation Steps</span>
                  </div>
                  <p className="text-muted leading-relaxed">{q.explanation.summary}</p>
                  <ul className="list-disc pl-4 space-y-1 text-muted leading-relaxed">
                    {q.explanation.steps.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ul>

                  {q.explanation.formulaOrShortcut && (
                    <div
                      className="mt-2 rounded-lg p-2.5 font-mono text-[11px] text-primary border"
                      style={{
                        backgroundColor: 'var(--ca-surface)',
                        borderColor: 'var(--ca-border)',
                      }}
                    >
                      <span className="font-bold text-blue-500">Shortcut / Formula: </span>
                      {q.explanation.formulaOrShortcut}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
