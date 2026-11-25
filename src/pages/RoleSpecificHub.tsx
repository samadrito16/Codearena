import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Database,
  ExternalLink,
  Flame,
  Globe,
  Layers,
  LayoutTemplate,
  Play,
  Search,
  Server,
  Sparkles,
  Timer,
  Wrench,
} from 'lucide-react';
import { PRACTICAL_CHALLENGES } from '../data/practical/canonicalChallenges';
import { PracticalDifficulty, PracticalTrack } from '../types/practicalCoding';

export default function RoleSpecificHub() {
  const [selectedTrack, setSelectedTrack] = useState<PracticalTrack | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<PracticalDifficulty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChallenges = useMemo(() => {
    return PRACTICAL_CHALLENGES.filter((ch) => {
      if (selectedTrack !== 'all' && ch.track !== selectedTrack) return false;
      if (selectedDifficulty !== 'all' && ch.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = ch.title.toLowerCase().includes(q);
        const matchDesc = ch.description.toLowerCase().includes(q);
        const matchRole = ch.roleTarget.toLowerCase().includes(q);
        const matchTags = ch.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchRole && !matchTags) return false;
      }
      return true;
    });
  }, [selectedTrack, selectedDifficulty, searchQuery]);

  const trackStats = useMemo(() => {
    return {
      all: PRACTICAL_CHALLENGES.length,
      frontend: PRACTICAL_CHALLENGES.filter((c) => c.track === 'frontend_ui').length,
      backend: PRACTICAL_CHALLENGES.filter((c) => c.track === 'backend_api').length,
      sql: PRACTICAL_CHALLENGES.filter((c) => c.track === 'sql_pipeline').length,
    };
  }, []);

  const getTrackIcon = (track: PracticalTrack) => {
    switch (track) {
      case 'frontend_ui':
        return <LayoutTemplate size={16} className="text-primary" />;
      case 'backend_api':
        return <Server size={16} className="text-primary" />;
      case 'sql_pipeline':
        return <Database size={16} className="text-primary" />;
    }
  };

  const getDifficultyBadge = (diff: PracticalDifficulty) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Advanced':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    }
  };

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
      {/* Header Banner with Radiant Theme Gradient */}
      <div
        className="relative overflow-hidden rounded-3xl border p-6 sm:p-8 md:p-10 shadow-sm transition-all"
        style={{
          borderColor: 'color-mix(in srgb, var(--ca-accent-solid) 25%, var(--ca-border))',
          background:
            'radial-gradient(ellipse at top left, color-mix(in srgb, var(--ca-accent-solid) 14%, transparent), var(--ca-surface))',
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-3.5">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border"
              style={{
                borderColor: 'color-mix(in srgb, var(--ca-accent-solid) 25%, var(--ca-border))',
                backgroundColor: 'color-mix(in srgb, var(--ca-accent-solid) 10%, var(--ca-surface))',
                color: 'var(--ca-text)',
              }}
            >
              <Sparkles size={13} style={{ color: 'var(--ca-accent-solid)' }} />
              <span>Practical Role Benchmark • GreatFrontEnd & Frontend Mentor Model</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
              Role-Specific Practical Coding
            </h1>
            <p className="text-sm text-muted leading-relaxed max-w-2xl">
              Move beyond pure DSA puzzles. Practice real job-simulation challenges: Frontend UI/DOM builds with live sandboxed previews, production Backend API middlewares, and complex SQL data pipelines assessed by automated test runners.
            </p>
          </div>

          {/* Quick Highlights Counter */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs shrink-0 w-full lg:w-auto">
            <div
              className="flex items-center gap-3 rounded-2xl p-3.5 border shadow-xs transition-all hover:border-[color-mix(in_srgb,var(--ca-accent-solid)_30%,var(--ca-border))]"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-xs text-primary"
                style={{ backgroundColor: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
              >
                <LayoutTemplate size={18} />
              </div>
              <div>
                <div className="text-muted text-[11px] font-medium">Frontend DOM</div>
                <div className="font-display text-lg font-bold text-primary">{trackStats.frontend} Challenges</div>
              </div>
            </div>

            <div
              className="flex items-center gap-3 rounded-2xl p-3.5 border shadow-xs transition-all hover:border-[color-mix(in_srgb,var(--ca-accent-solid)_30%,var(--ca-border))]"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-xs text-primary"
                style={{ backgroundColor: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
              >
                <Server size={18} />
              </div>
              <div>
                <div className="text-muted text-[11px] font-medium">Backend APIs</div>
                <div className="font-display text-lg font-bold text-primary">{trackStats.backend} Challenges</div>
              </div>
            </div>

            <div
              className="flex items-center gap-3 rounded-2xl p-3.5 border shadow-xs transition-all hover:border-[color-mix(in_srgb,var(--ca-accent-solid)_30%,var(--ca-border))]"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-xs text-primary"
                style={{ backgroundColor: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
              >
                <Database size={18} />
              </div>
              <div>
                <div className="text-muted text-[11px] font-medium">SQL Pipelines</div>
                <div className="font-display text-lg font-bold text-primary">{trackStats.sql} Challenges</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Pillar Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="rounded-2xl p-5 border flex items-start gap-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-[color-mix(in_srgb,var(--ca-accent-solid)_30%,var(--ca-border))]"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
        >
          <div
            className="h-10 w-10 shrink-0 rounded-xl border flex items-center justify-center shadow-xs text-primary"
            style={{ backgroundColor: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
          >
            <Globe size={18} />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-primary">Live Sandboxed Previews</h3>
            <p className="text-xs text-muted leading-relaxed">
              Multi-file HTML, CSS, and JS editor with real-time responsive viewport simulation (Desktop, Tablet, Mobile).
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-5 border flex items-start gap-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-[color-mix(in_srgb,var(--ca-accent-solid)_30%,var(--ca-border))]"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
        >
          <div
            className="h-10 w-10 shrink-0 rounded-xl border flex items-center justify-center shadow-xs text-primary"
            style={{ backgroundColor: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
          >
            <Wrench size={18} />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-primary">Automated DOM & API Assertions</h3>
            <p className="text-xs text-muted leading-relaxed">
              Synthesizes real user events, keyboard navigations, WAI-ARIA states, and HTTP rate limiter assertions.
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-5 border flex items-start gap-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-[color-mix(in_srgb,var(--ca-accent-solid)_30%,var(--ca-border))]"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
        >
          <div
            className="h-10 w-10 shrink-0 rounded-xl border flex items-center justify-center shadow-xs text-primary"
            style={{ backgroundColor: 'var(--ca-surface-muted)', borderColor: 'var(--ca-border)' }}
          >
            <Layers size={18} />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-primary">Architectural Editorials</h3>
            <p className="text-xs text-muted leading-relaxed">
              Includes production best practices: debouncing closures, memory leak cleanups, and SQL window partitioning.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Track Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedTrack('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border whitespace-nowrap transition-all ${
              selectedTrack === 'all'
                ? 'shadow-xs'
                : 'text-muted hover:text-primary'
            }`}
            style={{
              background: selectedTrack === 'all' ? 'var(--ca-accent-solid)' : 'var(--ca-surface)',
              color: selectedTrack === 'all' ? 'var(--ca-accent-text)' : undefined,
              borderColor: selectedTrack === 'all' ? 'var(--ca-accent-solid)' : 'var(--ca-border)',
            }}
          >
            All Tracks ({trackStats.all})
          </button>

          <button
            type="button"
            onClick={() => setSelectedTrack('frontend_ui')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 whitespace-nowrap transition-all ${
              selectedTrack === 'frontend_ui'
                ? 'shadow-xs'
                : 'text-muted hover:text-primary'
            }`}
            style={{
              background: selectedTrack === 'frontend_ui' ? 'var(--ca-accent-solid)' : 'var(--ca-surface)',
              color: selectedTrack === 'frontend_ui' ? 'var(--ca-accent-text)' : undefined,
              borderColor: selectedTrack === 'frontend_ui' ? 'var(--ca-accent-solid)' : 'var(--ca-border)',
            }}
          >
            <LayoutTemplate size={14} />
            <span>Frontend UI / DOM</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTrack('backend_api')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 whitespace-nowrap transition-all ${
              selectedTrack === 'backend_api'
                ? 'shadow-xs'
                : 'text-muted hover:text-primary'
            }`}
            style={{
              background: selectedTrack === 'backend_api' ? 'var(--ca-accent-solid)' : 'var(--ca-surface)',
              color: selectedTrack === 'backend_api' ? 'var(--ca-accent-text)' : undefined,
              borderColor: selectedTrack === 'backend_api' ? 'var(--ca-accent-solid)' : 'var(--ca-border)',
            }}
          >
            <Server size={14} />
            <span>Backend APIs</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTrack('sql_pipeline')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 whitespace-nowrap transition-all ${
              selectedTrack === 'sql_pipeline'
                ? 'shadow-xs'
                : 'text-muted hover:text-primary'
            }`}
            style={{
              background: selectedTrack === 'sql_pipeline' ? 'var(--ca-accent-solid)' : 'var(--ca-surface)',
              color: selectedTrack === 'sql_pipeline' ? 'var(--ca-accent-text)' : undefined,
              borderColor: selectedTrack === 'sql_pipeline' ? 'var(--ca-accent-solid)' : 'var(--ca-border)',
            }}
          >
            <Database size={14} />
            <span>SQL & Data Pipelines</span>
          </button>
        </div>

        {/* Difficulty and Search */}
        <div className="flex items-center gap-3 shrink-0">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as PracticalDifficulty | 'all')}
            className="px-3.5 py-2 text-xs font-medium rounded-xl border text-primary outline-none focus:ring-2 focus:ring-[var(--ca-accent-solid)] transition-all cursor-pointer"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <div className="relative min-w-[220px] sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted opacity-70" />
            <input
              type="text"
              placeholder="Search challenges or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border text-primary placeholder:text-muted outline-none focus:ring-2 focus:ring-[var(--ca-accent-solid)] transition-all"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            />
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="group rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-[color-mix(in_srgb,var(--ca-accent-solid)_35%,var(--ca-border))]"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
          >
            <div className="space-y-4">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border"
                  style={{
                    borderColor: 'var(--ca-border)',
                    background: 'var(--ca-surface-muted)',
                  }}
                >
                  {getTrackIcon(challenge.track)}
                  <span className="text-primary">{challenge.roleTarget}</span>
                </span>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getDifficultyBadge(
                    challenge.difficulty
                  )}`}
                >
                  {challenge.difficulty}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-bold text-base text-primary group-hover:text-primary transition-colors">
                  {challenge.title}
                </h3>
                <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-3">
                  {challenge.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {challenge.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-md border font-mono text-muted transition-colors hover:text-primary"
                    style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Meta & CTA */}
            <div
              className="mt-6 pt-4 border-t flex items-center justify-between gap-2"
              style={{ borderColor: 'var(--ca-border)' }}
            >
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1 font-medium">
                  <Timer size={13} className="text-muted" />
                  <span>{challenge.estimatedMinutes}m</span>
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-md border font-medium"
                  style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
                >
                  {challenge.testCases.length} tests
                </span>
              </div>

              <Link
                to={`/role-specific/${challenge.slug}`}
                className="btn-primary py-2 px-3.5 text-xs font-bold inline-flex items-center gap-1.5 rounded-xl shadow-sm"
              >
                <span>Open Challenge</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div
          className="rounded-2xl border p-12 text-center space-y-3"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
        >
          <Code2 size={32} className="mx-auto text-muted opacity-40" />
          <h3 className="font-bold text-base text-primary">No matching role challenges found</h3>
          <p className="text-xs text-muted max-w-md mx-auto">
            Try adjusting your track filter, difficulty level, or search keyword to find available practical exercises.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTrack('all');
              setSelectedDifficulty('all');
              setSearchQuery('');
            }}
            className="btn-primary px-4 py-2 rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
