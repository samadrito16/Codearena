import { useEffect, useRef, useState } from 'react';
import { Minus, Plus, SlidersHorizontal } from 'lucide-react';
import Tooltip from './ui/Tooltip';
import {
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
  type EditorLineNumbers,
  type EditorPreferences,
  type EditorTabSize,
} from '../hooks/useEditorPreferences';

interface EditorSettingsPopoverProps {
  preferences: EditorPreferences;
  updatePreference: <K extends keyof EditorPreferences>(key: K, value: EditorPreferences[K]) => void;
  resetPreferences: () => void;
  isDefault: boolean;
}

export default function EditorSettingsPopover({
  preferences,
  updatePreference,
  resetPreferences,
  isDefault,
}: EditorSettingsPopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    function handleOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <Tooltip content="Editor settings" align="end" disabled={open}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label="Editor settings"
          className={`workspace-icon-button ${open ? 'workspace-icon-button-active' : ''}`}
        >
          <SlidersHorizontal size={13}/>
        </button>
      </Tooltip>

      {open && (
        <div className="workspace-settings-popover" role="dialog" aria-label="Editor settings">
          <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: 'var(--ca-border)' }}>
            <div>
              <p className="text-xs font-bold text-primary">Editor settings</p>
              <p className="text-[10px] text-muted">Saved automatically to this browser</p>
            </div>
            <button
              type="button"
              onClick={resetPreferences}
              disabled={isDefault}
              className="text-[10px] font-bold themed-link disabled:cursor-default disabled:opacity-40"
            >
              Reset
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {/* Font size */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-primary">Font size</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => updatePreference('fontSize', preferences.fontSize - 1)}
                  disabled={preferences.fontSize <= MIN_FONT_SIZE}
                  aria-label="Decrease font size"
                  className="workspace-stepper-button"
                >
                  <Minus size={12}/>
                </button>
                <span className="w-10 text-center font-mono text-[11px] font-bold text-primary tabular-nums">
                  {preferences.fontSize}px
                </span>
                <button
                  type="button"
                  onClick={() => updatePreference('fontSize', preferences.fontSize + 1)}
                  disabled={preferences.fontSize >= MAX_FONT_SIZE}
                  aria-label="Increase font size"
                  className="workspace-stepper-button"
                >
                  <Plus size={12}/>
                </button>
              </div>
            </div>

            {/* Tab size */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-primary">Tab size</span>
              <div className="workspace-segment-group" role="group" aria-label="Tab size">
                {([2, 4] as EditorTabSize[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => updatePreference('tabSize', size)}
                    aria-pressed={preferences.tabSize === size}
                    className={`workspace-segment ${preferences.tabSize === size ? 'workspace-segment-active' : ''}`}
                  >
                    {size} spaces
                  </button>
                ))}
              </div>
            </div>

            {/* Line numbers */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-primary">Line numbers</span>
              <div className="workspace-segment-group" role="group" aria-label="Line numbers">
                {([
                  ['on', 'On'],
                  ['relative', 'Rel'],
                  ['off', 'Off'],
                ] as [EditorLineNumbers, string][]).map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updatePreference('lineNumbers', mode)}
                    aria-pressed={preferences.lineNumbers === mode}
                    className={`workspace-segment ${preferences.lineNumbers === mode ? 'workspace-segment-active' : ''}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Word wrap */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-primary">Word wrap</span>
              <button
                type="button"
                role="switch"
                aria-checked={preferences.wordWrap === 'on'}
                aria-label="Toggle word wrap"
                onClick={() => updatePreference('wordWrap', preferences.wordWrap === 'on' ? 'off' : 'on')}
                className={`workspace-switch ${preferences.wordWrap === 'on' ? 'workspace-switch-on' : ''}`}
              >
                <span className="workspace-switch-thumb"/>
              </button>
            </div>

            {/* Minimap */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-primary">Minimap</span>
              <button
                type="button"
                role="switch"
                aria-checked={preferences.minimap}
                aria-label="Toggle minimap"
                onClick={() => updatePreference('minimap', !preferences.minimap)}
                className={`workspace-switch ${preferences.minimap ? 'workspace-switch-on' : ''}`}
              >
                <span className="workspace-switch-thumb"/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
