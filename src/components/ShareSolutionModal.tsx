import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Code2,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Sparkles,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PeerSolution } from '../types';
import { savePeerSolution } from '../lib/peerSolutionStorage';

interface ShareSolutionModalProps {
  problemId: string;
  problemTitle: string;
  initialCode: string;
  initialLanguage: string;
  isOpen: boolean;
  onClose: () => void;
  onPublished: (newSolution: PeerSolution) => void;
}

const MIN_EXPLANATION_LENGTH = 60;

export default function ShareSolutionModal({
  problemId,
  problemTitle,
  initialCode,
  initialLanguage,
  isOpen,
  onClose,
  onPublished,
}: ShareSolutionModalProps) {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [intuition, setIntuition] = useState('');
  const [language, setLanguage] = useState(initialLanguage || 'python');
  const [code, setCode] = useState(initialCode || '');
  const [timeComplexity, setTimeComplexity] = useState('O(N)');
  const [spaceComplexity, setSpaceComplexity] = useState('O(1)');
  const [tagsInput, setTagsInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const userRealName = (user as any)?.displayName || user?.name || 'Anonymous Coder';
  const userRealCollege = (user as any)?.university || '';
  const explanationLength = intuition.trim().length;
  const isExplanationValid = explanationLength >= MIN_EXPLANATION_LENGTH;
  const isFormValid =
    title.trim().length >= 3 &&
    isExplanationValid &&
    code.trim().length >= 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const parsedTags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const saved = savePeerSolution(problemId, {
        authorName: userRealName,
        authorHandle: `@${userRealName.toLowerCase().replace(/\s+/g, '') || 'coder'}`,
        authorCollege: userRealCollege || undefined,
        authorAvatarColor: 'from-indigo-500 to-cyan-500',
        title: title.trim(),
        intuitionNote: intuition.trim(),
        timeComplexity: timeComplexity.trim() || 'O(N)',
        spaceComplexity: spaceComplexity.trim() || 'O(1)',
        language,
        code: code.trim(),
        tags: parsedTags.length > 0 ? parsedTags : ['Community Solution'],
      });

      onPublished(saved);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--ca-surface)',
          borderColor: 'var(--ca-border)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: 'var(--ca-border)' }}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Code2 size={18} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-primary">
                Share Solution with Peers
              </h2>
              <p className="text-xs text-muted">
                {problemTitle} &bull; Published to Community Solutions
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted hover:text-primary hover:bg-[var(--ca-surface-muted)] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {/* Quality Standard Notice Banner */}
          <div
            className="rounded-2xl border p-4 space-y-1.5"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--ca-accent-solid) 8%, var(--ca-surface))',
              borderColor: 'color-mix(in srgb, var(--ca-accent-solid) 25%, var(--ca-border))',
            }}
          >
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Sparkles size={14} />
              <span>Community Quality Standard: Explain It in Your Own Words</span>
            </div>
            <p className="text-[11px] text-muted leading-relaxed">
              To keep solutions educational and prevent blind code dumps, every published solution
              must include an original explanation of the core intuition, reasoning, or pattern.
            </p>
          </div>

          {/* Author Identity Badge */}
          <div className="flex items-center gap-2 text-muted">
            <span>Publishing as:</span>
            <span className="font-bold text-primary">{userRealName}</span>
            {userRealCollege && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-medium">
                <GraduationCap size={11} />
                <span>{userRealCollege}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="font-bold text-primary flex items-center justify-between">
              <span>Approach Title *</span>
              <span className="text-[10px] text-muted font-normal">e.g. Single-Pass Hash Map with Complement</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your approach a clear, descriptive title..."
              className="w-full rounded-xl border px-3.5 py-2 text-xs text-primary placeholder:text-muted focus:outline-none focus:border-indigo-500 transition-colors"
              style={{
                backgroundColor: 'var(--ca-surface-muted)',
                borderColor: 'var(--ca-border)',
              }}
            />
          </div>

          {/* Mandatory "Explain It in Your Own Words" Note */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-primary flex items-center gap-1.5">
                <Lightbulb size={13} className="text-amber-400" />
                <span>Explain It in Your Own Words *</span>
              </label>
              <span
                className={`font-mono text-[10px] font-bold ${
                  isExplanationValid ? 'text-emerald-500' : 'text-amber-500'
                }`}
              >
                {explanationLength} / {MIN_EXPLANATION_LENGTH} chars minimum
              </span>
            </div>

            <textarea
              required
              rows={4}
              value={intuition}
              onChange={(e) => setIntuition(e.target.value)}
              placeholder="Explain the intuition in plain words as if teaching a peer. What pattern did you notice? Why does this approach beat brute force? What edge cases did you handle?"
              className="w-full rounded-xl border p-3 text-xs text-primary placeholder:text-muted focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
              style={{
                backgroundColor: 'var(--ca-surface-muted)',
                borderColor: isExplanationValid
                  ? 'var(--ca-border)'
                  : 'color-mix(in srgb, #f59e0b 50%, var(--ca-border))',
              }}
            />

            {!isExplanationValid && (
              <p className="flex items-center gap-1.5 text-[11px] text-amber-500">
                <AlertCircle size={12} className="shrink-0" />
                <span>
                  Please write at least {MIN_EXPLANATION_LENGTH - explanationLength} more characters
                  explaining your thought process.
                </span>
              </p>
            )}
          </div>

          {/* Complexities & Language Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-primary">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-xl border px-3 py-1.5 text-xs text-primary bg-[var(--ca-surface-muted)] focus:outline-none focus:border-indigo-500"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="csharp">C#</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-primary">Time Complexity</label>
              <input
                type="text"
                value={timeComplexity}
                onChange={(e) => setTimeComplexity(e.target.value)}
                placeholder="O(N)"
                className="w-full rounded-xl border px-3 py-1.5 text-xs text-primary placeholder:text-muted focus:outline-none focus:border-indigo-500"
                style={{
                  backgroundColor: 'var(--ca-surface-muted)',
                  borderColor: 'var(--ca-border)',
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-primary">Space Complexity</label>
              <input
                type="text"
                value={spaceComplexity}
                onChange={(e) => setSpaceComplexity(e.target.value)}
                placeholder="O(1)"
                className="w-full rounded-xl border px-3 py-1.5 text-xs text-primary placeholder:text-muted focus:outline-none focus:border-indigo-500"
                style={{
                  backgroundColor: 'var(--ca-surface-muted)',
                  borderColor: 'var(--ca-border)',
                }}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <label className="font-bold text-primary flex items-center justify-between">
              <span>Tags (comma separated)</span>
              <span className="text-[10px] text-muted font-normal">e.g. Hash Table, Two Pointers, Beginner</span>
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Hash Table, Optimal, Clean Code"
              className="w-full rounded-xl border px-3.5 py-1.5 text-xs text-primary placeholder:text-muted focus:outline-none focus:border-indigo-500 transition-colors"
              style={{
                backgroundColor: 'var(--ca-surface-muted)',
                borderColor: 'var(--ca-border)',
              }}
            />
          </div>

          {/* Code Body */}
          <div className="space-y-1">
            <label className="font-bold text-primary flex items-center justify-between">
              <span>Solution Code *</span>
              <span className="text-[10px] text-muted font-normal">Pre-filled with your workspace code</span>
            </label>
            <textarea
              required
              rows={8}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full font-mono rounded-xl border p-3 text-xs text-primary placeholder:text-muted focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
              style={{
                backgroundColor: 'var(--ca-surface-muted)',
                borderColor: 'var(--ca-border)',
              }}
            />
          </div>

          {/* Footer Submit Actions */}
          <div
            className="flex items-center justify-between pt-3 border-t"
            style={{ borderColor: 'var(--ca-border)' }}
          >
            <span className="text-[11px] text-muted">
              {isFormValid ? (
                <span className="inline-flex items-center gap-1 text-emerald-500 font-semibold">
                  <CheckCircle2 size={13} />
                  <span>Quality criteria met</span>
                </span>
              ) : (
                <span className="text-amber-500 font-medium">
                  Complete title, code, and 60+ char explanation to publish
                </span>
              )}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border px-4 py-2 text-xs font-semibold text-muted hover:text-primary transition-colors"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2 text-xs font-bold text-white shadow-sm transition-all"
              >
                <Sparkles size={14} />
                <span>{isSubmitting ? 'Publishing...' : 'Publish Solution'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
