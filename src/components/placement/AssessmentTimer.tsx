import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';

interface AssessmentTimerProps {
  remainingSeconds: number;
  totalSeconds: number;
  sectionTitle?: string;
}

export default function AssessmentTimer({
  remainingSeconds,
  totalSeconds,
  sectionTitle,
}: AssessmentTimerProps) {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLowTime = remainingSeconds <= 300; // Under 5 minutes
  const isCriticalTime = remainingSeconds <= 60; // Under 1 minute

  return (
    <div
      className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 font-mono text-xs font-bold border transition-colors shadow-xs ${
        isCriticalTime
          ? 'border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400 animate-pulse'
          : isLowTime
          ? 'border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400'
          : 'border-slate-200 bg-white text-slate-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200'
      }`}
      title={sectionTitle ? `Section Time Remaining (${sectionTitle})` : 'Time Remaining'}
    >
      <Clock size={14} className={isCriticalTime ? 'text-rose-500' : isLowTime ? 'text-amber-500' : 'text-blue-500'} />
      <span className="tracking-wider">{formattedTime}</span>
      {isLowTime && <AlertCircle size={12} className="shrink-0" />}
    </div>
  );
}
