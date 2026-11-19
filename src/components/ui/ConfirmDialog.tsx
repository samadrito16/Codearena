import { useEffect, useId, useRef, type ReactNode } from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';

export type ConfirmDialogTone = 'danger' | 'warning' | 'primary';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: ReactNode;
  tone?: ConfirmDialogTone;
  confirmLabel?: string;
  cancelLabel?: string;
  secondaryLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onSecondary?: () => void;
}

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export default function ConfirmDialog({
  open,
  title,
  description,
  tone = 'primary',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  secondaryLabel,
  onConfirm,
  onCancel,
  onSecondary,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return undefined;

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusTimer = window.setTimeout(() => {
      confirmButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, onCancel]);

  if (!open) return null;

  const iconStyle = tone === 'danger'
    ? 'bg-rose-500/12 text-rose-600 dark:text-rose-400'
    : tone === 'warning'
      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
      : 'bg-indigo-500/12 text-indigo-600 dark:text-indigo-300';

  const confirmClass = tone === 'danger'
    ? 'inline-flex min-h-[36px] items-center justify-center rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-rose-700'
    : tone === 'warning'
      ? 'inline-flex min-h-[36px] items-center justify-center rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-amber-700'
      : 'btn-primary py-2 text-xs';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px] ca-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="panel-card ca-modal-panel w-full max-w-md p-5 sm:p-6 shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyle}`} aria-hidden="true">
            {tone === 'primary' ? <Info size={18}/> : <AlertTriangle size={18}/>}
          </span>
          <div className="min-w-0 flex-1">
            <h3 id={titleId} className="font-display text-base font-bold text-primary">
              {title}
            </h3>
            <div id={descriptionId} className="mt-1.5 text-xs leading-5 text-muted">
              {description}
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-muted transition hover:bg-black/5 hover:text-primary dark:hover:bg-white/5"
          >
            <X size={16}/>
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
          <button type="button" onClick={onCancel} className="btn-secondary py-2 text-xs">
            {cancelLabel}
          </button>
          {secondaryLabel && onSecondary && (
            <button
              type="button"
              onClick={onSecondary}
              className="btn-secondary py-2 text-xs text-rose-600 dark:text-rose-400"
            >
              {secondaryLabel}
            </button>
          )}
          <button ref={confirmButtonRef} type="button" onClick={onConfirm} className={confirmClass}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
