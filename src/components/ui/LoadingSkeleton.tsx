interface SkeletonLineProps {
  width?: string;
  height?: string;
  className?: string;
}

export function SkeletonLine({ width = '100%', height = '12px', className = '' }: SkeletonLineProps) {
  return (
    <span
      aria-hidden="true"
      className={`ca-skeleton block rounded-md ${className}`}
      style={{ width, height }}
    />
  );
}

export function CardSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="panel-card p-5 sm:p-6" role="status" aria-label="Loading content">
      <div className="flex items-center justify-between gap-3">
        <SkeletonLine width="42%" height="16px"/>
        <SkeletonLine width="72px" height="22px" className="rounded-full"/>
      </div>
      <div className="mt-4 space-y-2.5">
        {Array.from({ length: rows }).map((_, index) => (
          <SkeletonLine key={index} width={`${92 - index * 14}%`} height="11px"/>
        ))}
      </div>
      <span className="sr-only">Loading content…</span>
    </div>
  );
}

export function EditorLoadingSkeleton() {
  const widths = ['36%', '58%', '46%', '72%', '64%', '40%', '52%', '28%'];
  return (
    <div
      className="flex h-full w-full flex-col justify-start gap-3 p-5 font-mono"
      role="status"
      aria-label="Loading code editor"
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold text-muted">
        <span className="h-2 w-2 rounded-full bg-indigo-500/70"/>
        <span>Initializing code editor…</span>
      </div>
      <div className="space-y-2.5 pt-1">
        {widths.map((width, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="w-5 text-right text-[10px] text-muted/60 tabular-nums">{index + 1}</span>
            <SkeletonLine width={width} height="12px"/>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading code editor…</span>
    </div>
  );
}
