import { AlertTriangle, CheckCircle2, Clock, Cpu, History, XCircle } from 'lucide-react';
import type { SubmissionRecord } from '../types';

export function SubmissionResultRow({ submission }: { submission: SubmissionRecord }) {
  const isAccepted = submission.outcome === 'accepted';
  const isTle = submission.outcome === 'tle';
  const isWa = submission.outcome === 'wrong_answer';

  return (
    <div
      className="flex flex-col gap-2 rounded-xl border p-3 text-xs transition"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isAccepted ? (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 size={13} />
              Accepted
            </span>
          ) : isTle ? (
            <span className="flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-300">
              <AlertTriangle size={13} />
              Time Limit Exceeded
            </span>
          ) : isWa ? (
            <span className="flex items-center gap-1 rounded-full bg-rose-500/15 px-2.5 py-0.5 text-[11px] font-bold text-rose-700 dark:text-rose-300">
              <XCircle size={13} />
              Wrong Answer
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-rose-500/15 px-2.5 py-0.5 text-[11px] font-bold text-rose-700 dark:text-rose-300">
              <XCircle size={13} />
              Runtime Error
            </span>
          )}

          <span
            className="rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-muted"
            style={{ borderColor: 'var(--ca-border)' }}
          >
            {submission.language}
          </span>
        </div>

        <time className="text-[10px] text-muted" dateTime={submission.timestamp}>
          {new Date(submission.timestamp).toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </time>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted">
        {submission.runtimeMs !== undefined && (
          <span className="flex items-center gap-1 font-mono">
            <Clock size={12} className="themed-link" />
            {submission.runtimeMs} ms
          </span>
        )}
        {submission.memoryMb !== undefined && (
          <span className="flex items-center gap-1 font-mono">
            <Cpu size={12} className="themed-link" />
            {submission.memoryMb} MB
          </span>
        )}
        {submission.source && (
          <span className="rounded-full bg-slate-500/10 px-2 py-0.5 text-[9px] font-semibold text-muted">
            {submission.source === 'onlinecompiler' ? 'OnlineCompiler Engine' : submission.source === 'judge' ? 'Judge Engine' : submission.source}
          </span>
        )}
      </div>
    </div>
  );
}

export function SubmissionsEmptyState({
  problemTitle,
  markedSolvedLocally,
}: {
  problemTitle: string;
  markedSolvedLocally: boolean;
}) {
  return (
    <div className="workspace-tab-empty-card">
      <div className="workspace-empty-icon"><History size={20}/></div>
      <h2 className="mt-3 text-sm font-bold text-primary">No verified submissions yet</h2>
      <p className="mt-1.5 max-w-sm text-xs leading-5 text-muted">
        Real submission records for <strong className="text-primary">{problemTitle}</strong> will appear here once submitted to the OnlineCompiler execution engine.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-1.5 text-[10px] font-semibold text-muted">
        {['Verdict', 'Language', 'Runtime (ms)', 'Memory (MB)', 'Submitted date'].map((field) => (
          <span key={field} className="rounded-full border px-2.5 py-1" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
            {field}
          </span>
        ))}
      </div>
      {markedSolvedLocally && (
        <p className="mt-4 rounded-xl border px-3 py-2 text-[11px] text-muted" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
          Local progress note: You manually marked this problem as solved in this browser (not execution-verified).
        </p>
      )}
    </div>
  );
}
