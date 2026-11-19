import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  compact?: boolean;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  compact = false,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed text-center ${compact ? 'px-4 py-6' : 'px-6 py-10'} ${className}`}
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
    >
      <div
        className={`flex items-center justify-center rounded-2xl border ${compact ? 'h-10 w-10' : 'h-12 w-12'}`}
        style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)', color: 'var(--ca-accent-solid)' }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <p className={`mt-3 font-semibold text-primary ${compact ? 'text-xs' : 'text-sm'}`}>{title}</p>
      <p className={`mx-auto mt-1.5 max-w-md leading-5 text-muted ${compact ? 'text-[11px]' : 'text-xs'}`}>
        {description}
      </p>
      {(action || secondaryAction) && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
