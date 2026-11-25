import { useMemo, useState } from 'react';
import { Crown, Flame, Medal, RefreshCw, Search, Trophy, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import ErrorAlert from '../components/ui/ErrorAlert';
import { CardSkeleton, SkeletonLine } from '../components/ui/LoadingSkeleton';
import { useLeaderboard } from '../hooks/useDataServices';
import { useAuth } from '../context/AuthContext';
import type { LeaderboardEntry } from '../services';

type TimeRange = 'all' | 'month' | 'week';

export default function Leaderboard() {
  const { data: entries, status, error, retry } = useLeaderboard();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Period multiplier to simulate dynamic score adjustments for Month/Week
  const processedEntries = useMemo(() => {
    let list = entries.map((entry) => {
      if (timeRange === 'month') {
        return {
          ...entry,
          score: Math.round(entry.score * 0.42),
          solved: Math.max(1, Math.round(entry.solved * 0.38)),
        };
      }
      if (timeRange === 'week') {
        return {
          ...entry,
          score: Math.round(entry.score * 0.16),
          solved: Math.max(1, Math.round(entry.solved * 0.14)),
        };
      }
      return entry;
    });

    // Sort by adjusted score descending
    list.sort((a, b) => b.score - a.score);

    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (e) => e.name.toLowerCase().includes(q) || e.handle.toLowerCase().includes(q)
      );
    }

    return list;
  }, [entries, timeRange, searchQuery]);

  const topThree = processedEntries.slice(0, 3);
  const remaining = processedEntries.slice(3);

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-9 space-y-8 animate-in fade-in">
      {/* Page Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
            Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
            Celebrate consistency, problem-solving velocity, and pattern mastery.
            {!user && (
              <span className="block mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Login to earn points.
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={retry}
            disabled={status === 'loading'}
            className="btn-secondary py-2 text-xs"
            aria-label="Refresh leaderboard"
          >
            <RefreshCw size={13} className={status === 'loading' ? 'animate-spin' : ''} />
            <span>{status === 'loading' ? 'Refreshing…' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Login to earn points prompt banner for guest visitors */}
      {!user && (
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border"
          style={{
            borderColor: 'color-mix(in srgb, var(--ca-accent-solid) 32%, var(--ca-border))',
            background: 'color-mix(in srgb, var(--ca-accent-solid) 8%, var(--ca-surface))',
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold"
              style={{
                background: 'color-mix(in srgb, var(--ca-accent-solid) 16%, var(--ca-surface))',
                color: 'var(--ca-accent-solid)',
              }}
            >
              <Trophy size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-primary">Login to earn points.</p>
              <p className="text-xs text-muted mt-0.5">Solve daily challenges and algorithm problems to climb the global rankings.</p>
            </div>
          </div>
          <Link
            to="/login"
            state={{ from: { pathname: '/leaderboard' }, backgroundLocation: { pathname: '/leaderboard' } }}
            className="btn-primary py-2 px-4 text-xs font-semibold shrink-0 sm:self-center"
          >
            Sign in
          </Link>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Time Filter Pills */}
        <div
          className="inline-flex items-center rounded-xl border p-1 bg-slate-500/5"
          style={{ borderColor: 'var(--ca-border)' }}
        >
          {(
            [
              { key: 'all', label: 'All Time' },
              { key: 'month', label: 'This Month' },
              { key: 'week', label: 'This Week' },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTimeRange(key)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                timeRange === key
                  ? 'bg-[var(--ca-accent-solid)] text-white shadow-xs'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coders…"
            className="w-full rounded-xl border py-1.5 pl-8 pr-8 text-xs text-primary placeholder:text-muted focus:outline-none transition"
            style={{
              borderColor: 'var(--ca-border)',
              background: 'var(--ca-surface)',
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-primary p-0.5 rounded-md"
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {status === 'error' && error && (
        <ErrorAlert
          title="Could not load leaderboard"
          message={error}
          onRetry={retry}
          retryLabel="Retry"
        />
      )}

      {status === 'loading' ? (
        <>
          <section className="grid gap-4 md:grid-cols-3" aria-label="Loading top rankings">
            <CardSkeleton rows={3} />
            <CardSkeleton rows={3} />
            <CardSkeleton rows={3} />
          </section>
          <section
            className="panel-card overflow-hidden p-5 sm:p-6"
            role="status"
            aria-label="Loading rankings table"
          >
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <SkeletonLine width="28px" height="14px" />
                  <SkeletonLine width="34px" height="34px" className="rounded-xl" />
                  <div className="flex-1 space-y-1.5">
                    <SkeletonLine width="38%" height="12px" />
                    <SkeletonLine width="24%" height="10px" />
                  </div>
                  <SkeletonLine width="56px" height="12px" />
                </div>
              ))}
            </div>
            <span className="sr-only">Loading leaderboard rankings…</span>
          </section>
        </>
      ) : status === 'ready' && entries.length === 0 ? (
        <EmptyState
          icon={<Trophy size={22} />}
          title="No leaderboard entries yet"
          description="Rankings will appear here once problem solutions are submitted."
          action={
            <Link to="/problems" className="btn-primary text-xs">
              Explore problems
            </Link>
          }
          secondaryAction={
            <button type="button" onClick={retry} className="btn-secondary text-xs">
              Refresh
            </button>
          }
        />
      ) : status === 'ready' && processedEntries.length === 0 ? (
        <div
          className="rounded-2xl border p-12 text-center"
          style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
        >
          <p className="text-sm font-semibold text-primary">No coders found</p>
          <p className="text-xs text-muted mt-1">
            No coder matches &ldquo;{searchQuery}&rdquo;. Try another name or handle.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="btn-secondary mt-4 py-1.5 text-xs"
          >
            Reset search
          </button>
        </div>
      ) : status === 'ready' ? (
        <div className="space-y-6">
          {/* Top 3 Podium Showcase */}
          {topThree.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {topThree.map((person, idx) => {
                const rankNum = idx + 1;
                const isGold = rankNum === 1;
                const isSilver = rankNum === 2;
                const isBronze = rankNum === 3;

                const badgeBg = isGold
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/25'
                  : isSilver
                  ? 'bg-slate-400/10 text-slate-400 border-slate-400/25'
                  : 'bg-orange-500/10 text-orange-500 border-orange-500/25';

                const icon = isGold ? (
                  <Crown size={15} className="text-amber-400" />
                ) : (
                  <Medal size={15} className={isSilver ? 'text-slate-300' : 'text-orange-400'} />
                );

                const isCurrentUser = person.handle === '@you';

                return (
                  <div
                    key={person.handle}
                    className={`relative rounded-2xl border p-5 transition duration-200 ${
                      isGold
                        ? 'border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.04] to-transparent shadow-xs'
                        : 'border-[var(--ca-border)] bg-[var(--ca-surface)]'
                    }`}
                  >
                    {/* Header: Rank + Icon + Points */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[11px] font-mono font-extrabold ${badgeBg}`}
                        >
                          {icon}
                          <span>0{rankNum}</span>
                        </span>
                        {isCurrentUser && (
                          <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-bold text-indigo-400">
                            You
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono font-bold text-primary tabular-nums">
                        {person.score.toLocaleString()} pts
                      </span>
                    </div>

                    {/* Middle: User Identity */}
                    <div className="mt-4 flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${person.color} text-sm font-extrabold text-white shadow-xs`}
                      >
                        {person.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-primary">{person.name}</p>
                        <p className="truncate text-xs text-muted">{person.handle}</p>
                      </div>
                    </div>

                    {/* Footer: Metrics */}
                    <div
                      className="mt-4 flex items-center justify-between border-t pt-3 text-xs"
                      style={{ borderColor: 'var(--ca-border)' }}
                    >
                      <div className="flex items-center gap-1.5 text-muted">
                        <span className="text-[11px]">Solved</span>
                        <span className="font-bold text-primary tabular-nums">
                          {person.solved}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted">
                        <Flame size={12} className="text-orange-500 shrink-0" />
                        <span className="font-bold text-primary tabular-nums">
                          {person.streak}d streak
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Remaining Rankings List (Rank 4+) */}
          {remaining.length > 0 && (
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
            >
              <div
                className="flex items-center justify-between px-5 py-3 border-b text-[10px] font-bold uppercase tracking-wider text-muted"
                style={{ borderColor: 'var(--ca-border)' }}
              >
                <div className="flex items-center gap-6">
                  <span className="w-8">Rank</span>
                  <span>Coder</span>
                </div>
                <div className="flex items-center gap-6 sm:gap-12">
                  <span className="hidden sm:inline">Solved</span>
                  <span className="hidden sm:inline">Streak</span>
                  <span className="w-16 text-right">Points</span>
                </div>
              </div>

              <div className="divide-y" style={{ borderColor: 'var(--ca-border)' }}>
                {remaining.map((person, idx) => {
                  const rank = idx + 4;
                  const isCurrentUser = person.handle === '@you';

                  return (
                    <div
                      key={person.handle}
                      className="group flex items-center justify-between px-5 py-3.5 hover:bg-slate-500/[0.03] transition"
                    >
                      {/* Left: Rank & Coder Identity */}
                      <div className="flex items-center gap-6 min-w-0">
                        <span className="w-8 font-mono text-xs font-bold text-muted tabular-nums">
                          {String(rank).padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${person.color} text-xs font-bold text-white`}
                          >
                            {person.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-xs font-bold text-primary">
                                {person.name}
                              </p>
                              {isCurrentUser && (
                                <span className="rounded-full bg-indigo-500/15 px-1.5 py-0.2 text-[9px] font-bold text-indigo-400">
                                  You
                                </span>
                              )}
                            </div>
                            <p className="truncate text-[10px] text-muted">{person.handle}</p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Metrics & Score Pill */}
                      <div className="flex items-center gap-6 sm:gap-12 shrink-0">
                        <span className="hidden sm:inline text-xs font-medium text-muted tabular-nums">
                          {person.solved}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-muted tabular-nums">
                          <Flame size={11} className="text-orange-500" />
                          <span>{person.streak}d</span>
                        </span>
                        <span
                          className="w-20 text-right font-mono text-xs font-extrabold text-primary tabular-nums px-2.5 py-1 rounded-lg"
                          style={{
                            background:
                              'color-mix(in srgb, var(--ca-accent-solid) 10%, var(--ca-surface-muted))',
                            color: 'var(--ca-accent-solid)',
                          }}
                        >
                          {person.score.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
