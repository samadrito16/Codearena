import type { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  shortcut?: string;
  align?: 'center' | 'start' | 'end';
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Lightweight hover and keyboard-focus tooltip rendered below the trigger
 * so toolbar controls near the top edge of the workspace are never clipped.
 */
export default function Tooltip({
  content,
  shortcut,
  align = 'center',
  disabled = false,
  className = '',
  children,
}: TooltipProps) {
  return (
    <span
      className={`ca-tooltip-wrap ${className}`.trim()}
      data-tooltip-disabled={disabled ? 'true' : undefined}
    >
      {children}
      <span
        aria-hidden="true"
        className={`ca-tooltip ca-tooltip-${align}`}
      >
        <span>{content}</span>
        {shortcut && <kbd className="ca-tooltip-kbd">{shortcut}</kbd>}
      </span>
    </span>
  );
}
