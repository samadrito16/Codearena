import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface FocusGuardBannerProps {
  tabSwitches: number;
  onDismiss: () => void;
}

export default function FocusGuardBanner({
  tabSwitches,
  onDismiss,
}: FocusGuardBannerProps) {
  if (tabSwitches <= 0) return null;

  const isLastWarning = tabSwitches === 3;

  return (
    <div
      className={`w-full border-b px-4 py-2.5 text-xs flex items-center justify-between animate-in slide-in-from-top duration-200 select-none ${
        isLastWarning
          ? 'bg-rose-500/15 border-rose-500/30 text-rose-400 font-bold'
          : 'bg-amber-500/10 border-amber-500/25 text-amber-500'
      }`}
    >
      <div className="flex items-center gap-2">
        <AlertTriangle size={15} className="shrink-0 animate-pulse" />
        <span>
          <strong>Proctoring Alert:</strong> Tab switch <strong>{tabSwitches} of 4</strong> detected. In live technical interviews, switching screens is strictly monitored. <strong>Switching tabs 4 times will automatically submit your interview!</strong>
        </span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0 ml-2"
        aria-label="Dismiss alert"
      >
        <X size={14} />
      </button>
    </div>
  );
}
