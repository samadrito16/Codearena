import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Cpu,
  FileCode2,
  Filter,
  Layers,
  Search,
  Shield,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import {
  CATEGORY_CONFIG,
  getAllReviewScenarios,
  SUPPORTED_REVIEW_CATEGORIES,
} from '../lib/review/catalog';
import { useReviewProgress } from '../lib/review/progress';
import { ReviewCategory, ReviewDifficulty } from '../types/review';
import ScenarioCard from '../components/review/ScenarioCard';

export default function ReviewHub() {
  const { store, getOverallStats } = useReviewProgress();
  const allScenarios = useMemo(() => getAllReviewScenarios(), []);
  const stats = useMemo(() => getOverallStats(), [store]);

  const [selectedCategory, setSelectedCategory] = useState<ReviewCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<ReviewDifficulty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredScenarios = useMemo(() => {
    return allScenarios.filter((sc) => {
      if (selectedCategory !== 'all' && sc.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && sc.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = sc.title.toLowerCase().includes(q);
        const matchesContext = sc.context.toLowerCase().includes(q);
        const matchesTags = sc.learning_tags.some((t) => t.toLowerCase().includes(q));
        const matchesCompanies = sc.company_tags.some((c) => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesContext && !matchesTags && !matchesCompanies) return false;
      }
      return true;
    });
  }, [allScenarios, selectedCategory, selectedDifficulty, searchQuery]);

  const completionPercent = Math.round(
    stats.totalScenarios > 0 ? (stats.reviewedScenarios / stats.totalScenarios) * 100 : 0
  );

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 lg:px-9 space-y-10 animate-in fade-in">
      {/* Hero Header */}
      <div
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/20 bg-indigo-500/10 text-indigo-500">
            <Sparkles size={13} />
            <span>AI-Era Engineering Benchmark</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
            Code Review & Debugging Arena
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            The critical interview dimension missed by traditional competitive platforms. Audit multi-file broken repositories, detect subtle concurrency race conditions, and catch flawed AI-generated code before production.
          </p>
        </div>

        {/* Telemetry Badge Strip */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 text-xs font-mono shrink-0">
          <div className="flex items-center gap-2 rounded-2xl p-3 border" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              <Trophy size={16} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-sans font-bold text-muted">Audits Passed</div>
              <div className="text-sm font-bold text-primary">
                {stats.reviewedScenarios} / {stats.totalScenarios}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl p-3 border" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-sans font-bold text-muted">Flaws Caught</div>
              <div className="text-sm font-bold text-emerald-500">
                {stats.totalBugsCaught}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl p-3 border" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Zap size={16} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-sans font-bold text-muted">Score Earned</div>
              <div className="text-sm font-bold text-amber-500">
                {stats.totalPointsEarned} <span className="text-[10px] text-muted">pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl border bg-black/[0.03] dark:bg-white/[0.03]" style={{ borderColor: 'var(--ca-border)' }}>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                  : 'text-muted hover:text-primary'
              }`}
            >
              All Scenarios ({allScenarios.length})
            </button>
            {SUPPORTED_REVIEW_CATEGORIES.map((catKey) => {
              const cat = CATEGORY_CONFIG[catKey];
              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => setSelectedCategory(catKey)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedCategory === catKey
                      ? 'bg-white dark:bg-slate-800 text-indigo-500 shadow-sm'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  {catKey === 'async_concurrency' && <Zap size={13} className="text-amber-500" />}
                  {catKey === 'ai_gen_audit' && <Bot size={13} className="text-purple-400" />}
                  {catKey === 'multi_file_logic' && <Layers size={13} className="text-teal-400" />}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Difficulty and Search */}
          <div className="flex items-center gap-2.5">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="h-9 px-3 rounded-xl border text-xs font-semibold bg-transparent text-primary outline-none focus:ring-1 focus:ring-indigo-500"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search bugs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-8 pr-3 rounded-xl border text-xs bg-transparent text-primary placeholder:text-muted/60 outline-none focus:ring-1 focus:ring-indigo-500 w-44 sm:w-56"
                style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      {filteredScenarios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              attempt={store.attempts[scenario.id]}
            />
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl border border-dashed p-12 text-center space-y-3"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/5 text-muted">
            <Filter size={20} />
          </div>
          <h3 className="text-base font-bold text-primary">No review scenarios match your filter</h3>
          <p className="text-xs text-muted max-w-sm mx-auto">
            Try resetting the category or difficulty dropdowns to see all available broken PR scenarios.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setSearchQuery('');
            }}
            className="btn-secondary h-8 px-3 text-xs font-semibold mt-2"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
