import { AlertCircle, RotateCcw, X } from 'lucide-react';

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  onDismiss?: () => void;
  className?: string;
}

export default function ErrorAlert({
  title = 'Action could not be completed',
  message,
  onRetry,
  retryLabel = 'Retry',
  onDismiss,
  className = '',
}: ErrorAlertProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`flex flex-wrap items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-700 dark:text-rose-200 ${className}`}
    >
      <AlertCircle size={15} className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-400" aria-hidden="true"/>
      <div className="min-w-0 flex-1">
        <p className="font-bold text-rose-800 dark:text-rose-100">{title}</p>
        <p className="mt-0.5 leading-5 opacity-90">{message}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex min-h-[28px] items-center gap-1 rounded-lg border border-rose-500/35 bg-rose-500/15 px-2.5 py-1 text-[11px] font-bold text-rose-700 transition hover:bg-rose-500/25 dark:text-rose-100"
          >
            <RotateCcw size={12}/> {retryLabel}
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss error"
            className="rounded-lg p-1 text-rose-700/80 transition hover:bg-rose-500/15 hover:text-rose-800 dark:text-rose-200"
          >
            <X size={14}/>
          </button>
        )}
      </div>
    </div>
  );
}
