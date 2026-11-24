import React from 'react';
import { Clock } from 'lucide-react';

interface TimeAllocationChartProps {
  p1Minutes: number;
  p2Minutes: number;
  totalDurationMinutes: number;
  pacingRating: string;
}

export default function TimeAllocationChart({
  p1Minutes,
  p2Minutes,
  totalDurationMinutes,
  pacingRating,
}: TimeAllocationChartProps) {
  const totalSpent = Math.max(1, p1Minutes + p2Minutes);
  const p1Percent = Math.min(100, Math.round((p1Minutes / totalSpent) * 100));
  const p2Percent = Math.max(0, 100 - p1Percent);

  // Ideal target is ~40% on P1 (Medium), ~60% on P2 (Medium/Hard)
  const idealP1Minutes = Math.round(totalDurationMinutes * 0.4);
  const idealP2Minutes = totalDurationMinutes - idealP1Minutes;

  return (
    <div className="rounded-2xl p-5 border space-y-4" style={{ backgroundColor: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-indigo-500" />
          <h4 className="text-sm font-bold text-primary">Time Allocation & Pacing</h4>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
            pacingRating === 'Optimal Pacing'
              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
              : pacingRating === 'Balanced'
              ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
              : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
          }`}
        >
          {pacingRating}
        </span>
      </div>

      {/* Progress Bar Visualization */}
      <div className="space-y-1.5">
        <div className="h-4 w-full rounded-full bg-black/20 overflow-hidden flex p-0.5 border" style={{ borderColor: 'var(--ca-border)' }}>
          <div
            style={{ width: `${p1Percent}%` }}
            className="h-full rounded-l-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
            title={`Problem 1: ${p1Minutes}m (${p1Percent}%)`}
          />
          <div
            style={{ width: `${p2Percent}%` }}
            className="h-full rounded-r-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500"
            title={`Problem 2: ${p2Minutes}m (${p2Percent}%)`}
          />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs text-muted pt-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span>Problem 1: <strong className="text-primary">{p1Minutes}m</strong> (Target ~{idealP1Minutes}m)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <span>Problem 2: <strong className="text-primary">{p2Minutes}m</strong> (Target ~{idealP2Minutes}m)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
