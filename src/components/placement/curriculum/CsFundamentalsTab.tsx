import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  Filter,
  Globe,
  Layers,
  Search,
  Sparkles,
  Terminal,
  XCircle,
  Zap,
} from 'lucide-react';
import { CS_QUESTION_BANK } from '../../../data/placement/questions/csQuestions';
import { QuestionSubject } from '../../../types/placement';

export default function CsFundamentalsTab() {
  const [selectedSubject, setSelectedSubject] = useState<QuestionSubject | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const filteredQuestions = useMemo(() => {
    return CS_QUESTION_BANK.filter((q) => {
      if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQ = q.question.toLowerCase().includes(query);
        const matchesSub = q.subtopic.toLowerCase().includes(query);
        const matchesCode = q.codeSnippet?.code.toLowerCase().includes(query) ?? false;
        return matchesQ || matchesSub || matchesCode;
      }
      return true;
    });
  }, [selectedSubject, selectedDifficulty, searchQuery]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
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
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-500 border border-emerald-500/20">
              <Cpu size={12} />
              <span>Core CS Engineering Curriculum</span>
            </div>
            <h2 className="mt-2 text-lg sm:text-xl font-bold text-primary">
              Operating Systems, DBMS, Networks & OOPs
            </h2>
            <p className="mt-1 text-xs text-muted max-w-2xl">
              Master technical elimination questions asked across TCS Digital, Infosys InfyTQ, Cognizant GenC, and Persistent. Features virtual function vtable tracing, deadlock detection, subnet CIDR calculations, and ACID isolation levels.
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
              <div className="text-[10px] text-muted uppercase font-bold">Total Drills</div>
              <div className="text-xl font-extrabold text-primary">
                {CS_QUESTION_BANK.length}
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-neutral-800" />
            <div>
              <div className="text-[10px] text-muted uppercase font-bold">Answered</div>
              <div className="text-xl font-extrabold text-indigo-400">
                {Object.keys(userAnswers).length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Subjects', icon: Layers },
            { id: 'cs_oops', label: 'OOPs (C++ / Java)', icon: Code2 },
            { id: 'cs_os', label: 'Operating Systems', icon: Cpu },
            { id: 'cs_dbms', label: 'DBMS & ACID', icon: Database },
            { id: 'cs_networks', label: 'Computer Networks', icon: Globe },
            { id: 'cs_pseudocode', label: 'Pseudocode Tracing', icon: Terminal },
          ].map((subj) => {
            const Icon = subj.icon;
            const isSelected = selectedSubject === subj.id;
            return (
              <button
                key={subj.id}
                type="button"
                onClick={() => setSelectedSubject(subj.id as any)}
                style={{
                  backgroundColor: isSelected ? 'var(--ca-surface-muted)' : 'var(--ca-surface)',
                  borderColor: isSelected ? 'var(--ca-accent, #3b82f6)' : 'var(--ca-border)',
                }}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 font-bold whitespace-nowrap transition-all ${
                  isSelected ? 'text-primary shadow-xs' : 'text-muted hover:text-primary'
                }`}
              >
                <Icon size={12} />
                <span>{subj.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted opacity-60" />
          <input
            type="text"
            placeholder="Search topic or code snippet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border pl-8 pr-3 py-1.5 text-xs text-primary placeholder:text-muted focus:outline-hidden focus:border-indigo-500 transition-colors"
            style={{
              backgroundColor: 'var(--ca-surface)',
              borderColor: 'var(--ca-border)',
            }}
          />
        </div>
      </div>

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

              {/* Prompt */}
              <div className="text-xs sm:text-sm font-medium text-primary leading-relaxed whitespace-pre-line">
                {q.question}
              </div>

              {/* Code Snippet if present */}
              {q.codeSnippet && (
                <div
                  className="rounded-xl border overflow-hidden"
                  style={{
                    backgroundColor: 'var(--ca-canvas)',
                    borderColor: 'var(--ca-border)',
                  }}
                >
                  <div
                    className="border-b px-4 py-1.5 text-[11px] font-mono text-muted flex items-center justify-between"
                    style={{
                      backgroundColor: 'var(--ca-surface-muted)',
                      borderColor: 'var(--ca-border)',
                    }}
                  >
                    <span>{q.codeSnippet.language.toUpperCase()} Program</span>
                    <span>TCS / Infosys Elimination Format</span>
                  </div>
                  <pre className="p-4 font-mono text-xs overflow-x-auto text-primary leading-relaxed">
                    <code>{q.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

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
                      className="flex items-start gap-2.5 rounded-xl border p-3 text-left text-xs transition-all hover:opacity-90 font-mono"
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
                      <span className="flex-1 text-primary whitespace-pre-line leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Toggle Solution */}
              <div className="border-t pt-3 flex items-center justify-between" style={{ borderColor: 'var(--ca-border)' }}>
                <button
                  type="button"
                  onClick={() => toggleSolution(q.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors"
                >
                  <Sparkles size={13} />
                  <span>{isRevealed ? 'Hide Architectural Solution' : 'View Deep Architecture & Trace Solution'}</span>
                  <ChevronDown size={14} className={`transition-transform ${isRevealed ? 'rotate-180' : ''}`} />
                </button>

                {userAnswer && !isRevealed && (
                  <span className="text-[11px] text-muted">
                    Correct Option: <strong className="text-emerald-500">{q.correctOptionId}</strong>
                  </span>
                )}
              </div>

              {/* Solution Card */}
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
                    <span>Technical Principle & Step-by-Step Resolution</span>
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
                      <span className="font-bold text-emerald-500">Key Takeaway: </span>
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
