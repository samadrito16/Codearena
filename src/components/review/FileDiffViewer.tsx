import React, { useRef, useEffect, useState } from 'react';
import Editor, { DiffEditor } from '@monaco-editor/react';
import {
  FileCode2,
  GitCompare,
  Pencil,
  RotateCcw,
} from 'lucide-react';
import { PlantedBug, ReviewFile } from '../../types/review';
import { useApp } from '../../context/AppContext';

interface FileDiffViewerProps {
  files: ReviewFile[];
  editedFiles: Record<string, string>;
  activeFilename: string;
  onSelectFile: (filename: string) => void;
  onUpdateFile: (filename: string, nextContent: string) => void;
  onResetFile: (filename: string) => void;
  plantedBugs?: PlantedBug[];
  showBugDecorations?: boolean;
}

export default function FileDiffViewer({
  files,
  editedFiles,
  activeFilename,
  onSelectFile,
  onUpdateFile,
  onResetFile,
  plantedBugs = [],
  showBugDecorations = false,
}: FileDiffViewerProps) {
  const { theme } = useApp();
  const [viewMode, setViewMode] = useState<'edit' | 'diff'>('edit');
  const editorRef = useRef<any>(null);
  const decorationsRef = useRef<any[]>([]);

  const activeFile = files.find((f) => f.filename === activeFilename) || files[0];
  const currentContent = editedFiles[activeFile.filename] ?? activeFile.content;
  const isModified = currentContent !== activeFile.content;

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    updateDecorations(editor, monaco);
  }

  function updateDecorations(editor: any, monaco: any) {
    if (!editor || !monaco) return;

    const newDecorations: any[] = [];

    if (showBugDecorations) {
      const fileBugs = plantedBugs.filter((b) => b.file === activeFile.filename);
      for (const bug of fileBugs) {
        newDecorations.push({
          range: new monaco.Range(bug.line_range[0], 1, bug.line_range[1], 1),
          options: {
            isWholeLine: true,
            className: 'bg-rose-500/15 border-l-2 border-rose-500',
            hoverMessage: { value: `**Root Cause: ${bug.title}**\n\n${bug.explanation}` },
          },
        });
      }
    }

    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, newDecorations);
  }

  useEffect(() => {
    if (editorRef.current && (window as any).monaco) {
      updateDecorations(editorRef.current, (window as any).monaco);
    }
  }, [activeFile, showBugDecorations]);

  const monacoLanguage =
    activeFile.language === 'typescript'
      ? 'typescript'
      : activeFile.language === 'javascript'
      ? 'javascript'
      : 'python';

  return (
    <div
      className="panel-card flex flex-col rounded-2xl border overflow-hidden shadow-xs"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      {/* File Tabs & Mode Toolbar */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-3 sm:px-4 py-2 bg-black/[0.02] dark:bg-white/[0.02]"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {files.map((file) => {
            const isActive = file.filename === activeFile.filename;
            const fileModified = (editedFiles[file.filename] ?? file.content) !== file.content;

            return (
              <button
                key={file.filename}
                type="button"
                onClick={() => onSelectFile(file.filename)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition shrink-0 ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-indigo-500 shadow-xs border border-black/10 dark:border-white/10'
                    : 'text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <FileCode2 size={13} className={isActive ? 'text-indigo-500' : 'text-muted'} />
                <span>{file.filename}</span>
                {file.is_primary && (
                  <span className="text-[9px] uppercase px-1 py-0.2 rounded-sm bg-indigo-500/10 text-indigo-500 font-bold font-sans">
                    Primary
                  </span>
                )}
                {fileModified && (
                  <span
                    className="h-2 w-2 rounded-full bg-amber-500"
                    title="Modified from buggy starter"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Edit vs Diff vs Starter toggle */}
          <div
            className="flex items-center p-0.5 rounded-lg border bg-black/[0.03] dark:bg-white/[0.03]"
            style={{ borderColor: 'var(--ca-border)' }}
          >
            <button
              type="button"
              onClick={() => setViewMode('edit')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                viewMode === 'edit'
                  ? 'bg-white dark:bg-slate-800 text-primary shadow-xs'
                  : 'text-muted hover:text-primary'
              }`}
            >
              <Pencil size={11} />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('diff')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                viewMode === 'diff'
                  ? 'bg-white dark:bg-slate-800 text-indigo-500 shadow-xs'
                  : 'text-muted hover:text-primary'
              }`}
            >
              <GitCompare size={11} />
              <span>Diff vs Buggy</span>
            </button>
          </div>

          {isModified && (
            <button
              type="button"
              onClick={() => onResetFile(activeFile.filename)}
              title="Revert this file to original buggy code"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold text-muted hover:text-primary transition"
              style={{ borderColor: 'var(--ca-border)' }}
            >
              <RotateCcw size={11} />
              <span className="hidden sm:inline">Reset File</span>
            </button>
          )}
        </div>
      </div>

      {/* Editable Monaco Canvas or Diff View */}
      <div className="relative h-[500px] sm:h-[560px] w-full">
        {viewMode === 'edit' ? (
          <Editor
            key={activeFile.filename}
            height="100%"
            language={monacoLanguage}
            value={currentContent}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            onChange={(val) => onUpdateFile(activeFile.filename, val ?? '')}
            options={{
              readOnly: false,
              domReadOnly: false,
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
              tabSize: monacoLanguage === 'python' ? 4 : 2,
              automaticLayout: true,
            }}
            onMount={handleEditorDidMount}
          />
        ) : (
          <DiffEditor
            key={`diff-${activeFile.filename}`}
            height="100%"
            language={monacoLanguage}
            original={activeFile.content}
            modified={currentContent}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={{
              readOnly: true,
              renderSideBySide: true,
              fontSize: 12,
              lineHeight: 20,
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        )}
      </div>

      {/* Editor Bottom Status Bar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-t text-[11px] font-mono text-muted bg-black/[0.02] dark:bg-white/[0.02]"
        style={{ borderColor: 'var(--ca-border)' }}
      >
        <div className="flex items-center gap-3">
          <span>Active: {activeFile.filename}</span>
          <span className="px-1.5 py-0.5 rounded-sm bg-black/5 dark:bg-white/5 text-[10px]">
            {activeFile.language}
          </span>
          {isModified ? (
            <span className="text-amber-500 font-semibold">Modified</span>
          ) : (
            <span className="text-muted/70">Unmodified buggy starter</span>
          )}
        </div>
        <div className="text-[11px] font-sans text-muted">
          Press <kbd className="px-1.5 py-0.5 rounded-sm bg-black/10 dark:bg-white/10 font-mono text-[10px]">Ctrl+Enter</kbd> to verify fix
        </div>
      </div>
    </div>
  );
}
