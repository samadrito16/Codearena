import React from 'react';

interface PrismMarkProps {
  size?: number | string;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export function PrismMark({ size = 32, className = '', alt = 'Prism Code logo' }: PrismMarkProps) {
  const sizePx = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none overflow-visible ${className}`}
      style={{ width: sizePx, height: sizePx }}
    >
      <img
        src="/brand/prismcode-mark.png"
        srcSet="/brand/prismcode-mark-32.png 32w, /brand/prismcode-mark-64.png 64w, /brand/prismcode-mark-128.png 128w, /brand/prismcode-mark-512.png 512w"
        sizes={`${sizePx}`}
        alt={alt}
        className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-200 hover:scale-105"
        draggable={false}
      />
    </div>
  );
}

interface PrismLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'mark-only' | 'vertical';
  className?: string;
  withTagline?: boolean;
}

export function PrismLogo({
  size = 'md',
  variant = 'horizontal',
  className = '',
  withTagline = false,
}: PrismLogoProps) {
  const sizeMap = {
    sm: { mark: 24, text: 'text-sm', title: 'text-base', gap: 'gap-2' },
    md: { mark: 32, text: 'text-xs', title: 'text-lg', gap: 'gap-2.5' },
    lg: { mark: 40, text: 'text-sm', title: 'text-xl', gap: 'gap-3' },
    xl: { mark: 56, text: 'text-base', title: 'text-2xl', gap: 'gap-3.5' },
  };

  const currentSize = sizeMap[size];

  if (variant === 'mark-only') {
    return <PrismMark size={currentSize.mark} className={className} />;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${currentSize.gap} ${className}`}>
        <PrismMark size={currentSize.mark * 1.5} className="brand-mark-pulse" />
        <div>
          <div className={`font-display font-bold tracking-tight text-primary ${currentSize.title}`}>
            Prism Code<span className="themed-link">.</span>
          </div>
          {withTagline && (
            <div className={`mt-0.5 font-semibold uppercase tracking-[0.2em] text-muted ${currentSize.text}`}>
              Level up your logic
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default 'horizontal'
  return (
    <div className={`inline-flex items-center ${currentSize.gap} ${className}`}>
      <PrismMark size={currentSize.mark} className="brand-mark-pulse shrink-0" />
      <div>
        <div className={`font-display font-bold tracking-tight text-primary flex items-center ${currentSize.title}`}>
          Prism Code<span className="themed-link">.</span>
        </div>
        {withTagline && (
          <div className={`font-semibold uppercase tracking-[0.2em] text-muted text-[10px]`}>
            Level up your logic
          </div>
        )}
      </div>
    </div>
  );
}

export default PrismLogo;
