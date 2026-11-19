import { Crown, Flame, Info, Medal, RefreshCw, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import ErrorAlert from '../components/ui/ErrorAlert';
import { CardSkeleton, SkeletonLine } from '../components/ui/LoadingSkeleton';
import { useLeaderboard } from '../hooks/useDataServices';

export default function Leaderboard() {
  const { data: entries, status, error, retry } = useLeaderboard();
  const topThree = entries.slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="page-heading-row">
        <div>
          <h2 className="page-title mt-0">Leaderboard</h2>
          <p className="page-subtitle">Celebrate consistency, creativity, and clean solutions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={retry}
            disabled={status === 'loading'}
            className="btn-secondary py-2 text-xs disabled:opacity-50"
            aria-label="Refresh leaderboard"
          >
            <RefreshCw size={14} className={status === 'loading' ? 'animate-spin' : ''}/>
            <span>{status === 'loading' ? 'Refreshing…' : 'Refresh'}</span>
          </button>
          <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-2.5 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            <Trophy size={18}/>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider">Season 01</p>
              <p className="text-xs font-semibold">Sample rankings</p>
            </div>
          </div>
        </div>
      </section>

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
            <CardSkeleton rows={3}/>
            <CardSkeleton rows={3}/>
            <CardSkeleton rows={3}/>
          </section>
          <section className="panel-card overflow-hidden p-5 sm:p-6" role="status" aria-label="Loading rankings table">
            <div className="flex items-center justify-between gap-3 pb-4">
              <SkeletonLine width="160px" height="16px"/>
              <SkeletonLine width="88px" height="22px" className="rounded-full"/>
            </div>
            <div className="space-y-3 border-t pt-4" style={{ borderColor: 'var(--ca-border)' }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <SkeletonLine width="28px" height="14px"/>
                  <SkeletonLine width="34px" height="34px" className="rounded-xl"/>
                  <div className="flex-1 space-y-1.5">
                    <SkeletonLine width="38%" height="12px"/>
                    <SkeletonLine width="24%" height="10px"/>
                  </div>
                  <SkeletonLine width="56px" height="12px"/>
                </div>
              ))}
            </div>
            <span className="sr-only">Loading leaderboard rankings…</span>
          </section>
        </>
      ) : status === 'ready' && entries.length === 0 ? (
        <EmptyState
          icon={<Trophy size={22}/>}
          title="No leaderboard entries yet"
          description="Rankings will appear here once sample entries or a live leaderboard API are connected."
          action={<Link to="/problems" className="btn-primary text-xs">Explore problems</Link>}
          secondaryAction={
            <button type="button" onClick={retry} className="btn-secondary text-xs">
              Refresh
            </button>
          }
        />
      ) : status === 'ready' ? (
        <>
          {topThree.length > 0 && (
            <section className="grid gap-4 md:grid-cols-3">
              {topThree.map((person, index) => (
                <div key={person.handle} className={`panel-card relative overflow-hidden p-5 ${index === 0 ? 'md:-translate-y-2 md:shadow-glow' : ''}`}>
                  <div className="absolute right-4 top-4 text-slate-200 dark:text-slate-700">
                    {index === 0 ? <Crown size={28}/> : <Medal size={25}/>}
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-3 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br ${person.color} text-lg font-bold text-white shadow-lg`}>
                      {person.initials}
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                      RANK #{index + 1}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold text-slate-900 dark:text-white">{person.name}</h3>
                    <p className="text-xs text-slate-400">{person.handle}</p>
                    <p className="mt-4 font-display text-2xl font-bold text-indigo-600 tabular-nums dark:text-indigo-300">
                      {person.score.toLocaleString()}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Arena points</p>
                    <div className="mt-4 flex w-full justify-center gap-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                      <div>
                        <p className="text-sm font-bold text-slate-800 tabular-nums dark:text-slate-100">{person.solved}</p>
                        <p className="text-[10px] text-slate-400">Solved</p>
                      </div>
                      <div>
                        <p className="flex items-center justify-center gap-1 text-sm font-bold text-slate-800 tabular-nums dark:text-slate-100">
                          <Flame size={13} className="text-orange-500"/>{person.streak}
                        </p>
                        <p className="text-[10px] text-slate-400">Day streak</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          <section className="panel-card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
              <div>
                <p className="section-kicker">TOP CODERS</p>
                <h3 className="section-title mt-1">Community rankings</h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                <Info size={12}/> Sample data
              </span>
            </div>
            <div className="grid grid-cols-[42px_minmax(0,1fr)_85px_80px] gap-3 bg-slate-50/70 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-800/40 sm:grid-cols-[55px_minmax(0,1fr)_110px_100px_100px]">
              <span>Rank</span>
              <span>Coder</span>
              <span className="text-right">Solved</span>
              <span className="text-right">Streak</span>
              <span className="hidden text-right sm:block">Points</span>
            </div>
            {entries.map((person, index) => (
              <div
                key={person.handle}
                className="grid grid-cols-[42px_minmax(0,1fr)_85px_80px] items-center gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-800 sm:grid-cols-[55px_minmax(0,1fr)_110px_100px_100px]"
              >
                <span className={`text-sm font-bold tabular-nums ${index < 3 ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-400'}`}>
                  #{index + 1}
                </span>
                <div className="flex min-w-0 items-center gap-3">
                  <div className={`avatar bg-gradient-to-br ${person.color}`}>{person.initials}</div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">{person.name}</p>
                    <p className="truncate text-[10px] text-slate-400">{person.handle}</p>
                  </div>
                </div>
                <span className="text-right text-xs font-semibold text-slate-600 tabular-nums dark:text-slate-300">{person.solved}</span>
                <span className="flex items-center justify-end gap-1 text-xs font-semibold text-slate-600 tabular-nums dark:text-slate-300">
                  <Flame size={12} className="text-orange-500"/>{person.streak}
                </span>
                <span className="hidden text-right text-xs font-bold text-slate-800 tabular-nums dark:text-slate-100 sm:block">
                  {person.score.toLocaleString()}
                </span>
              </div>
            ))}
          </section>
        </>
      ) : null}

      <p className="text-center text-[10px] text-slate-400">
        Sample leaderboard data. Connect your API to calculate real rankings and points.
      </p>
    </div>
  );
}
