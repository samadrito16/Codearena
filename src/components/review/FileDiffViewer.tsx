import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import {
  FileCode2,
  Maximize2,
  Minimize2,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { LineAnnotation, PlantedBug, ReviewFile } from '../../types/review';
import { useApp } from '../../context/AppContext';

interface FileDiffViewerProps {
  files: ReviewFile[];
  activeFilename: string;
  onSelectFile: (filename: string) => void;
  annotations: LineAnnotation[];
  selectedLine?: number;
  onSelectLine: (lineNumber: number) => void;
  plantedBugs?: PlantedBug[];
  showBugDecorations?: boolean;
}

export default function FileDiffViewer({
  files,
  activeFilename,
  onSelectFile,
  annotations,
  selectedLine,
  onSelectLine,
  plantedBugs = [],
  showBugDecorations = false,
}: FileDiffViewerProps) {
  const { theme } = useApp();
  const editorRef = useRef<any>(null);
  const decorationsRef = useRef<any[]>([]);

  const activeFile = files.find((f) => f.filename === activeFilename) || files[0];

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;

    // Listen for mouse clicks in the editor to select line
    editor.onMouseDown((e: any) => {
      if (e.target && e.target.position) {
        onSelectLine(e.target.position.lineNumber);
      }
    });

    updateDecorations(editor, monaco);
  }

  function updateDecorations(editor: any, monaco: any) {
    if (!editor || !monaco) return;

    const newDecorations: any[] = [];

    // 1. User Annotations on this file
    const fileAnnotations = annotations.filter((a) => a.filename === activeFile.filename);
    for (const ann of fileAnnotations) {
      newDecorations.push({
        range: new monaco.Range(ann.lineNumber, 1, ann.lineNumber, 1),
        options: {
          isWholeLine: true,
          className: 'bg-indigo-500/10 border-l-2 border-indigo-500',
          glyphMarginClassName: 'myGlyphMarginClass',
          hoverMessage: { value: `**[${ann.category.toUpperCase()}]** ${ann.comment}` },
        },
      });
    }

    // 2. Selected line highlight
    if (selectedLine) {
      newDecorations.push({
        range: new monaco.Range(selectedLine, 1, selectedLine, 1),
        options: {
          isWholeLine: true,
          className: 'bg-amber-500/10 border-l-2 border-amber-500',
        },
      });
    }

    // 3. Planted Bugs highlights (only when reference is revealed)
    if (showBugDecorations) {
      const fileBugs = plantedBugs.filter((b) => b.file === activeFile.filename);
      for (const bug of fileBugs) {
        newDecorations.push({
          range: new monaco.Range(bug.line_range[0], 1, bug.line_range[1], 1),
          options: {
            isWholeLine: true,
            className: 'bg-rose-500/15 border-l-2 border-rose-500',
            hoverMessage: { value: `**Planted Flaw: ${bug.title}**\n\n${bug.explanation}` },
          },
        });
      }
    }

    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, newDecorations);
  }

  // Update decorations on state changes
  useEffect(() => {
    if (editorRef.current && (window as any).monaco) {
      updateDecorations(editorRef.current, (window as any).monaco);
    }
  }, [annotations, selectedLine, activeFile, showBugDecorations]);

  const monacoLanguage = activeFile.language === 'javascript' ? 'javascript' : 'python';

  return (
    <div
      className="panel-card flex flex-col rounded-2xl border overflow-hidden shadow-sm"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      {/* File Tabs Top Bar */}
      <div
        className="flex items-center justify-between border-b px-3 sm:px-4 py-2 bg-black/[0.02] dark:bg-white/[0.02] overflow-x-auto"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div className="flex items-center gap-1.5 shrink-0">
          {files.map((file) => {
            const isActive = file.filename === activeFile.filename;
            const fileAnnCount = annotations.filter((a) => a.filename === file.filename).length;

            return (
              <button
                key={file.filename}
                type="button"
                onClick={() => onSelectFile(file.filename)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-indigo-500 shadow-sm border border-black/10 dark:border-white/10'
                    : 'text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <FileCode2 size={13} className={isActive ? 'text-indigo-500' : 'text-muted'} />
                <span>{file.filename}</span>
                {file.is_primary && (
                  <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-indigo-500/10 text-indigo-500 font-bold font-sans">
                    Primary
                  </span>
                )}
                {fileAnnCount > 0 && (
                  <span className="h-4 w-4 rounded-full bg-indigo-500/20 text-indigo-500 text-[10px] flex items-center justify-center font-bold">
                    {fileAnnCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted shrink-0 pl-3">
          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/5">
            {activeFile.language} (Read-only)
          </span>
          <span className="hidden sm:inline text-[11px]">Click any line to comment</span>
        </div>
      </div>

      {/* Monaco Code Editor Canvas */}
      <div className="relative h-[480px] sm:h-[540px] w-full">
        <Editor
          height="100%"
          language={monacoLanguage}
          value={activeFile.content}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            readOnly: true,
            domReadOnly: true,
            fontSize: 13,
            lineHeight: 22,
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            folding: true,
            renderLineHighlight: 'all',
            cursorStyle: 'line',
            lineNumbers: 'on',
            lineDecorationsWidth: 10,
            overviewRulerBorder: false,
          }}
          onMount={handleEditorDidMount}
        />
      </div>

      {/* Editor Bottom Status Bar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-t text-[11px] font-mono text-muted bg-black/[0.02] dark:bg-white/[0.02]"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div className="flex items-center gap-3">
          <span>Active: {activeFile.filename}</span>
          {selectedLine && (
            <span className="text-amber-500 font-bold">
              Selected: Line {selectedLine}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-primary font-sans">
          <MessageSquare size={12} className="text-indigo-500" />
          <span>{annotations.filter((a) => a.filename === activeFile.filename).length} file comments</span>
        </div>
      </div>
    </div>
  );
}
