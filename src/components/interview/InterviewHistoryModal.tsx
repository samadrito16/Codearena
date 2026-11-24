import React, { useEffect } from 'react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import { InterviewScorecard } from '../../types/interview';

interface InterviewHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: InterviewScorecard[];
}

export default function InterviewHistoryModal({
  isOpen,
  onClose,
  history,
}: InterviewHistoryModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalRounds = history.length;
  const avgPercentile =
    totalRounds > 0
      ? Math.round(history.reduce((acc, h) => acc + h.percentile, 0) / totalRounds)
      : 0;
  const passedRounds = history.filter(
    (h) => h.verdict === 'STRONG HIRE' || h.verdict === 'HIRE'
  ).length;
  const passRate = totalRounds > 0 ? Math.round((passedRounds / totalRounds) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Interview Attempt History"
    >
      {/* Background click overlay */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Card */}
      <div
        className="relative z-10 w-full max-w-4xl max-h-[85vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between p-5 sm:p-6 border-b shrink-0"
          style={{ borderColor: 'var(--ca-border)' }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              <Trophy size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary">Interview Attempt History</h2>
              <p className="text-xs text-muted">
                {totalRounds} recorded session{totalRounds === 1 ? '' : 's'} with comprehensive proctored telemetry
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted hover:text-white hover:bg-white/10 transition"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Telemetry Summary Strip inside modal */}
        {totalRounds > 0 && (
          <div
            className="grid grid-cols-3 gap-3 p-4 sm:px-6 bg-black/20 border-b text-xs font-mono shrink-0"
            style={{ borderColor: 'var(--ca-border)' }}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                <Trophy size={14} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-sans text-muted block">Completed</span>
                <span className="font-bold text-primary">{totalRounds}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Sparkles size={14} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-sans text-muted block">Hire Rate</span>
                <span className="font-bold text-emerald-500">{passRate}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                <Zap size={14} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-sans text-muted block">Avg Percentile</span>
                <span className="font-bold text-cyan-400">{avgPercentile}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Body: Scrollable Table or Empty State */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {totalRounds === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Trophy size={24} />
              </div>
              <h3 className="text-base font-bold text-primary">No Recorded Sessions Yet</h3>
              <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
                Launch any mock interview format to simulate a real-world FAANG technical round under proctored conditions.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'var(--ca-border)' }}>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr
                    className="border-b text-muted font-bold uppercase tracking-wider bg-black/10"
                    style={{ borderColor: 'var(--ca-border)' }}
                  >
                    <th className="p-3.5">Round</th>
                    <th className="p-3.5">Verdict</th>
                    <th className="p-3.5">Score</th>
                    <th className="p-3.5">Percentile</th>
                    <th className="p-3.5">Pacing</th>
                    <th className="p-3.5">Integrity & Notes</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--ca-border)' }}>
                  {history.map((item) => (
                    <tr key={item.roundId} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-primary max-w-[200px] truncate">
                        {item.title}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold inline-block ${
                            item.verdict === 'STRONG HIRE'
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                              : item.verdict === 'HIRE'
                              ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
                              : item.verdict === 'LEAN HIRE'
                              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                          }`}
                        >
                          {item.verdict}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-primary">{item.overallScore} / 100</td>
                      <td className="p-3.5 font-mono text-cyan-400 font-bold">{item.percentile}%</td>
                      <td className="p-3.5 text-muted">{item.timeAllocation.pacingRating}</td>
                      <td className="p-3.5 text-muted">
                        {item.autoSubmitReason ? (
                          <span className="text-rose-400 font-medium flex items-center gap-1">
                            <AlertTriangle size={12} className="shrink-0" />
                            <span className="truncate max-w-[160px]" title={item.autoSubmitReason}>
                              {item.autoSubmitReason}
                            </span>
                          </span>
                        ) : (
                          <span className="text-emerald-400/90">{item.integrity.rating}</span>
                        )}
                      </td>
                      <td className="p-3.5 text-muted font-mono whitespace-nowrap">
                        {new Date(item.completedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className="flex items-center justify-between p-4 sm:px-6 border-t bg-black/10 shrink-0 text-xs text-muted"
          style={{ borderColor: 'var(--ca-border)' }}
        >
          <span>Tip: Each round tests algorithmic correctness, pacing, and focus integrity.</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 font-semibold bg-white/10 hover:bg-white/15 text-primary transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
