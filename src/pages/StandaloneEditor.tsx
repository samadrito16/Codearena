import React, { useCallback, useEffect, useRef, useState } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Columns,
  Copy,
  Download,
  Eye,
  FileCode2,
  Keyboard,
  LoaderCircle,
  Play,
  RotateCcw,
  Rows,
  Server,
  Terminal,
  Trash2,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { themePalettes } from '../data/themes';
import { readStorage, writeStorage } from '../lib/storage';
import { runCode } from '../services/executionService';
import {
  executeEditorCode,
  getEngineDetails,
  prewarmLanguage,
  subscribeEngineStatus,
  type ClientEngineType,
} from '../services/clientExecution';
import EditorSettingsPopover from '../components/EditorSettingsPopover';
import Tooltip from '../components/ui/Tooltip';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { EditorLoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { useEditorPreferences } from '../hooks/useEditorPreferences';

export type EditorLanguage =
  | 'python'
  | 'javascript'
  | 'typescript'
  | 'cpp'
  | 'java'
  | 'rust'
  | 'go'
  | 'sql'
  | 'html';

interface LanguageConfig {
  id: EditorLanguage;
  name: string;
  extension: string;
  defaultFile: string;
  monacoLang: string;
  defaultCode: string;
}

const languageDots: Record<EditorLanguage, string> = {
  python: 'bg-sky-400',
  javascript: 'bg-amber-400',
  typescript: 'bg-blue-400',
  cpp: 'bg-violet-400',
  java: 'bg-orange-400',
  rust: 'bg-orange-500',
  go: 'bg-cyan-400',
  sql: 'bg-emerald-400',
  html: 'bg-rose-400',
};

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    id: 'python',
    name: 'Python 3',
    extension: '.py',
    defaultFile: 'main.py',
    monacoLang: 'python',
    defaultCode: `# Python 3 Personal Workspace
def main():
    print("Welcome to PrismCode Editor!")
    
    # Example: List comprehension & dictionary demo
    squares = {x: x**2 for x in range(1, 6)}
    print("Squares 1..5:", squares)
    
    # Process sample data
    languages = ["Python", "TypeScript", "Rust", "Go", "C++"]
    print("Available languages in PrismCode:", ", ".join(languages))

if __name__ == "__main__":
    main()
`,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    extension: '.js',
    defaultFile: 'index.js',
    monacoLang: 'javascript',
    defaultCode: `// JavaScript (Node.js) Personal Workspace
function main() {
  console.log("Welcome to PrismCode Editor!");

  const users = [
    { id: 1, name: "Ada Lovelace", role: "Pioneer" },
    { id: 2, name: "Alan Turing", role: "Father of CS" },
    { id: 3, name: "Grace Hopper", role: "Innovator" },
  ];

  console.log("Team Roster:");
  console.table(users);

  const total = [10, 25, 45, 80].reduce((sum, n) => sum + n, 0);
  console.log("Computed Total:", total);
}

main();
`,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    extension: '.ts',
    defaultFile: 'index.ts',
    monacoLang: 'typescript',
    defaultCode: `// TypeScript Personal Workspace
interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

function processTasks(tasks: Task[]): void {
  console.log(\`Processing \${tasks.length} task(s):\`);
  
  tasks.forEach((t) => {
    const status = t.completed ? "✓" : "○";
    console.log(\`[\${status}] \${t.title} (\${t.priority} priority)\`);
  });
}

const sampleTasks: Task[] = [
  { id: 1, title: "Design distributed queue", completed: true, priority: "high" },
  { id: 2, title: "Benchmark cache latencies", completed: false, priority: "medium" },
  { id: 3, title: "Deploy canary release", completed: false, priority: "high" },
];

processTasks(sampleTasks);
`,
  },
  {
    id: 'cpp',
    name: 'C++',
    extension: '.cpp',
    defaultFile: 'main.cpp',
    monacoLang: 'cpp',
    defaultCode: `#include <iostream>
#include <vector>
#include <numeric>
#include <string>

int main() {
    std::cout << "Welcome to PrismCode C++ Workspace!" << std::endl;

    std::vector<int> numbers = {10, 20, 30, 40, 50};
    int total = std::accumulate(numbers.begin(), numbers.end(), 0);

    std::cout << "Computed Vector Sum: " << total << std::endl;
    std::cout << "Elements count: " << numbers.size() << std::endl;

    return 0;
}
`,
  },
  {
    id: 'java',
    name: 'Java',
    extension: '.java',
    defaultFile: 'Main.java',
    monacoLang: 'java',
    defaultCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to PrismCode Java Workspace!");

        List<String> topics = Arrays.asList("Algorithms", "Data Structures", "System Design");
        System.out.println("Core Topics:");
        for (int i = 0; i < topics.size(); i++) {
            System.out.println((i + 1) + ". " + topics.get(i));
        }

        int sum = IntStream.rangeClosed(1, 10).sum();
        System.out.println("Sum of numbers 1..10: " + sum);
    }
}
`,
  },
  {
    id: 'rust',
    name: 'Rust',
    extension: '.rs',
    defaultFile: 'main.rs',
    monacoLang: 'rust',
    defaultCode: `// Rust Personal Workspace
fn main() {
    println!("Welcome to PrismCode Rust Workspace!");

    let primes = vec![2, 3, 5, 7, 11, 13, 17, 19];
    let sum: i32 = primes.iter().sum();

    println!("First 8 primes: {:?}", primes);
    println!("Sum of primes: {}", sum);
}
`,
  },
  {
    id: 'go',
    name: 'Go',
    extension: '.go',
    defaultFile: 'main.go',
    monacoLang: 'go',
    defaultCode: `package main

import "fmt"

func main() {
    fmt.Println("Welcome to PrismCode Go Workspace!")

    benchmarks := map[string]int{
        "L1 Cache": 1,
        "RAM":      100,
        "NVMe SSD": 10000,
        "Network":  500000,
    }

    fmt.Println("Latency Benchmarks (nanoseconds):")
    for resource, latency := range benchmarks {
        fmt.Printf("- %-10s : %d ns\\n", resource, latency)
    }
}
`,
  },
  {
    id: 'sql',
    name: 'SQL',
    extension: '.sql',
    defaultFile: 'query.sql',
    monacoLang: 'sql',
    defaultCode: `-- SQL Query Workspace
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    solved_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, solved_count) VALUES
('alex', 142),
('sam', 98),
('priya', 210);

-- Query top performers
SELECT 
    username, 
    solved_count, 
    RANK() OVER (ORDER BY solved_count DESC) as rank
FROM users
ORDER BY solved_count DESC;
`,
  },
  {
    id: 'html',
    name: 'HTML / Web',
    extension: '.html',
    defaultFile: 'index.html',
    monacoLang: 'html',
    defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PrismCode Web Playground</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #090a0f;
      color: #f1f5f9;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      margin: 0;
    }
    .card {
      background: #13151f;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2.5rem;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      text-align: center;
      max-width: 420px;
    }
    h1 { margin-top: 0; color: #38bdf8; font-size: 1.8rem; }
    p { color: #94a3b8; font-size: 0.95rem; line-height: 1.6; }
    button {
      background: #38bdf8;
      color: #000;
      border: none;
      padding: 10px 22px;
      font-weight: bold;
      border-radius: 10px;
      cursor: pointer;
      margin-top: 1rem;
      transition: all 0.2s;
    }
    button:hover { background: #7dd3fc; transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello, PrismCode!</h1>
    <p>This is your personal full-page code playground. Edit HTML, CSS, and JS with instant live preview.</p>
    <button onclick="alert('Workspace is fully operational!')">Click Me</button>
  </div>
</body>
</html>
`,
  },
];

export default function StandaloneEditor() {
  const { palette, theme } = useApp();
  const {
    preferences: editorPrefs,
    updatePreference: updateEditorPref,
    resetPreferences: resetEditorPrefs,
    isDefault: isDefaultEditorPrefs,
  } = useEditorPreferences();

  // Selected language state
  const [language, setLanguage] = useState<EditorLanguage>(() => {
    return readStorage<EditorLanguage>('prismcode-editor-lang', 'python');
  });

  const currentLangConfig =
    SUPPORTED_LANGUAGES.find((l) => l.id === language) || SUPPORTED_LANGUAGES[0];

  // Code state per language
  const [code, setCode] = useState<string>(() => {
    return (
      readStorage<string>(`prismcode-editor-code-${language}`, '') ||
      currentLangConfig.defaultCode
    );
  });

  // Stdin (input) state
  const [stdin, setStdin] = useState<string>(() => {
    return readStorage<string>('prismcode-editor-stdin', '');
  });

  // Output console state
  const [output, setOutput] = useState<string>('');
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'output' | 'input' | 'preview'>('output');

  // Client execution engine state
  const [engineStatus, setEngineStatus] = useState<string>('');
  const [activeEngine, setActiveEngine] = useState<ClientEngineType>(() => getEngineDetails(language).type);
  const currentEngineDetails = getEngineDetails(language);

  // Pre-warm Pyodide when Python is active and listen to runtime status
  useEffect(() => {
    if (language === 'python') {
      prewarmLanguage('python');
    }
    const unsubscribe = subscribeEngineStatus((status) => {
      if (status === 'loading') {
        setEngineStatus('Downloading Wasm…');
      } else if (status === 'ready') {
        setEngineStatus('Ready');
        setTimeout(() => setEngineStatus(''), 2500);
      } else if (status === 'error') {
        setEngineStatus('Error');
      }
    });
    return unsubscribe;
  }, [language]);

  // Layout preference: 'bottom' (docked drawer like Workspace) vs 'side' (side-by-side)
  const [splitLayout, setSplitLayout] = useState<'bottom' | 'side'>(() => {
    return readStorage<'bottom' | 'side'>('prismcode-editor-layout-dock', 'bottom');
  });
  const [consoleCollapsed, setConsoleCollapsed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [confirmResetOpen, setConfirmResetOpen] = useState<boolean>(false);
  const [shortcutsOpen, setShortcutsOpen] = useState<boolean>(false);

  // File naming
  const [fileName, setFileName] = useState<string>(currentLangConfig.defaultFile);

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  // Monaco theme registration matching Workspace.tsx
  const editorThemeName = `prismcode-${palette}-${theme}`;

  const registerEditorTheme = (monaco: any) => {
    monacoRef.current = monaco;
    themePalettes.forEach((colors) => {
      (['light', 'dark'] as const).forEach((mode) => {
        const isDark = mode === 'dark';
        const activeAccent = isDark && colors.darkPrimary ? colors.darkPrimary : colors.primary;
        monaco.editor.defineTheme(`prismcode-${colors.id}-${mode}`, {
          base: isDark ? 'vs-dark' : 'vs',
          inherit: true,
          rules: [
            { token: 'comment', foreground: isDark ? '91A39A' : '748579', fontStyle: 'italic' },
            { token: 'keyword', foreground: activeAccent.replace('#', '') },
            { token: 'string', foreground: isDark ? 'D6B889' : 'A45B32' },
            { token: 'number', foreground: isDark ? 'C3A5E8' : '7950A4' },
          ],
          colors: {
            'editor.background': isDark ? colors.editorDark : colors.editorLight,
            'editor.foreground': isDark ? '#E7EAF2' : '#263244',
            'editorCursor.foreground': activeAccent,
            'editor.selectionBackground': `${activeAccent}35`,
            'editor.inactiveSelectionBackground': `${activeAccent}1C`,
            'editorLineNumber.foreground': isDark ? '#596579' : '#A0A8B6',
            'editorLineNumber.activeForeground': activeAccent,
            'editor.lineHighlightBackground': isDark ? `${activeAccent}12` : `${activeAccent}0C`,
            'editorIndentGuide.background': isDark ? '#2B3445' : '#E5E9F0',
            'editorIndentGuide.activeBackground': `${activeAccent}70`,
            'editorWidget.background': isDark ? (colors.darkSurface ?? '#172033') : '#FFFFFF',
            'editorSuggestWidget.background': isDark ? (colors.darkSurface ?? '#172033') : '#FFFFFF',
            'editorGutter.background': isDark ? colors.editorDark : colors.editorLight,
          },
        });
      });
    });
  };

  // Synchronize theme dynamically if monaco is already mounted
  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(editorThemeName);
    }
  }, [editorThemeName]);

  // Persist language selection
  useEffect(() => {
    writeStorage('prismcode-editor-lang', language);
  }, [language]);

  // Debounced auto-save code to storage
  useEffect(() => {
    setSaveStatus('saving');
    const timer = setTimeout(() => {
      writeStorage(`prismcode-editor-code-${language}`, code);
      setSaveStatus('saved');
    }, 450);
    return () => clearTimeout(timer);
  }, [code, language]);

  // Persist stdin
  useEffect(() => {
    writeStorage('prismcode-editor-stdin', stdin);
  }, [stdin]);

  // Persist layout
  useEffect(() => {
    writeStorage('prismcode-editor-layout-dock', splitLayout);
  }, [splitLayout]);

  // Handle language change
  const handleSelectLanguage = (newLang: EditorLanguage) => {
    const config = SUPPORTED_LANGUAGES.find((l) => l.id === newLang) || SUPPORTED_LANGUAGES[0];
    setLanguage(newLang);
    setFileName(config.defaultFile);
    prewarmLanguage(newLang);
    setActiveEngine(getEngineDetails(newLang).type);

    const savedCode = readStorage<string>(`prismcode-editor-code-${newLang}`, '');
    setCode(savedCode || config.defaultCode);

    if (newLang === 'html') {
      setActiveConsoleTab('preview');
    } else {
      setActiveConsoleTab('output');
    }
    setSaveStatus('saved');
  };

  // Reset to default starter template
  const handleResetClick = () => {
    setConfirmResetOpen(true);
  };

  const confirmResetCode = () => {
    setCode(currentLangConfig.defaultCode);
    setConfirmResetOpen(false);
    setSaveStatus('saved');
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Download code as file
  const handleDownloadFile = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || currentLangConfig.defaultFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Main code runner handler
  const handleRunCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setConsoleCollapsed(false);

    if (language === 'html') {
      setActiveConsoleTab('preview');
      setIsRunning(false);
      return;
    }

    setActiveConsoleTab('output');

    try {
      const res = await executeEditorCode({
        code,
        language,
        stdin,
        onStatus: (_status, msg) => {
          if (msg) setEngineStatus(msg);
        },
      });

      setExecutionTime(res.runtimeMs);
      setActiveEngine(res.engine);

      const logs: string[] = [];
      if (res.stdout) logs.push(res.stdout);
      if (res.returnValue !== undefined) {
        logs.push(`↳ Return Value: ${res.returnValue}`);
      }
      if (res.stderr) {
        logs.push(res.stderr.startsWith('[') ? res.stderr : `[STDERR / ERROR]\n${res.stderr}`);
      }
      if (!res.stdout && !res.stderr && res.returnValue === undefined) {
        if (res.verdict === 'Accepted') {
          logs.push(`Execution Verdict: ${res.verdict}\nProcess completed successfully.`);
        } else {
          logs.push(`Execution Verdict: ${res.verdict}`);
        }
      }

      setOutput(logs.join('\n'));
    } catch (err: any) {
      setOutput(`[Execution Exception]\n${err?.message || err}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
        return;
      }
      if (mod && e.key.toLowerCase() === 's') {
        e.preventDefault();
        writeStorage(`prismcode-editor-code-${language}`, code);
        setSaveStatus('saved');
        return;
      }
      if (e.altKey && !mod && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setConsoleCollapsed((prev) => !prev);
        return;
      }
      if (e.key === 'Escape' && shortcutsOpen) {
        e.preventDefault();
        setShortcutsOpen(false);
        return;
      }
      const target = e.target as HTMLElement | null;
      const isEditable = Boolean(
        target &&
          (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT' ||
            target.isContentEditable)
      );
      if (!isEditable && !mod && !e.altKey && e.key === '?') {
        e.preventDefault();
        setShortcutsOpen((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [code, language, stdin, isRunning, shortcutsOpen]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const saveStatusTitle =
    saveStatus === 'saved'
      ? 'Code draft is saved in your local browser'
      : saveStatus === 'saving'
      ? 'Saving draft locally…'
      : 'Unsaved changes';

  const saveStatusLabel =
    saveStatus === 'saved' ? 'Saved locally' : saveStatus === 'saving' ? 'Saving…' : 'Unsaved';

  return (
    <section className="workspace-editor-pane h-[calc(100vh-52px)] w-full overflow-hidden flex flex-col select-none">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP EDITOR HEADER (Identical 1:1 replica of problem solver header)
      ────────────────────────────────────────────────────────────── */}
      <div className="workspace-editor-header">
        {/* Left: Window Dots, File Icon, File Name, Save Status */}
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="workspace-window-dots">
            <i />
            <i />
            <i />
          </div>

          <span className="workspace-file-icon">
            <FileCode2 size={14} />
          </span>

          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="bg-transparent border-none outline-hidden text-xs font-semibold text-primary truncate hover:bg-black/5 dark:hover:bg-white/5 rounded-sm px-1 -mx-1 font-mono transition-colors"
            title="Click to rename active file"
          />

          <span
            className={`workspace-save-status workspace-save-status-${saveStatus}`}
            title={saveStatusTitle}
            role="status"
            aria-live="polite"
          >
            <i className="workspace-save-dot" />
            <span>{saveStatusLabel}</span>
          </span>
        </div>

        {/* Right: Language Selector, Reset, Copy, Download, Shortcuts, Settings */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Execution Engine Indicator Pill */}
          <div
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border transition-colors ${currentEngineDetails.badgeColor}`}
            title={currentEngineDetails.description}
          >
            {currentEngineDetails.isClientSide ? (
              <Zap size={11} className="fill-current text-amber-400 shrink-0" />
            ) : (
              <Server size={11} className="text-violet-400 shrink-0" />
            )}
            <span className="truncate max-w-[105px]">{currentEngineDetails.badgeLabel}</span>
            {engineStatus && language === 'python' && (
              <span className="text-[10px] text-sky-400 opacity-90 truncate max-w-[120px]">
                • {engineStatus}
              </span>
            )}
          </div>

          {/* Language Selector Dropdown matching workspace */}
          <label className="workspace-language-select" aria-label="Choose programming language">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                languageDots[language] || 'bg-sky-400'
              }`}
            />
            <select
              value={language}
              onChange={(e) => handleSelectLanguage(e.target.value as EditorLanguage)}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </label>

          {/* Reset Code to starter template */}
          <button
            type="button"
            onClick={handleResetClick}
            className="workspace-reset-button"
            title="Reset to starter template"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>

          <span className="workspace-toolbar-divider" aria-hidden="true" />

          {/* Copy Code */}
          <Tooltip content={copied ? 'Copied to clipboard!' : 'Copy code'}>
            <button
              type="button"
              onClick={handleCopyCode}
              className="workspace-icon-button"
              aria-label="Copy code"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          </Tooltip>

          {/* Download File */}
          <Tooltip content="Download file">
            <button
              type="button"
              onClick={handleDownloadFile}
              className="workspace-icon-button"
              aria-label="Download file"
            >
              <Download size={14} />
            </button>
          </Tooltip>

          {/* Keyboard Shortcuts */}
          <Tooltip content="Keyboard shortcuts" shortcut="?" align="end">
            <button
              type="button"
              onClick={() => setShortcutsOpen(true)}
              aria-label="View keyboard shortcuts (?)"
              className="workspace-icon-button"
            >
              <Keyboard size={14} />
            </button>
          </Tooltip>

          {/* Editor Settings Popover (font size, minimap, word wrap, tab size, line numbers) */}
          <EditorSettingsPopover
            preferences={editorPrefs}
            updatePreference={updateEditorPref}
            resetPreferences={resetEditorPrefs}
            isDefault={isDefaultEditorPrefs}
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. WORKSPACE BODY: MONACO EDITOR + INTEGRATED CONSOLE
      ────────────────────────────────────────────────────────────── */}
      <div
        className={`flex-1 flex overflow-hidden min-h-0 ${
          splitLayout === 'side' ? 'flex-row' : 'flex-col'
        }`}
      >
        {/* Monaco Editor Stage */}
        <div className="workspace-editor-stage flex-1 relative min-h-0 overflow-hidden" data-lenis-prevent>
          <Editor
            height="100%"
            path={`personal-workspace/${language}/${fileName}`}
            language={currentLangConfig.monacoLang}
            value={code}
            loading={<EditorLoadingSkeleton />}
            onChange={(val) => setCode(val ?? '')}
            onMount={handleEditorDidMount}
            beforeMount={registerEditorTheme}
            theme={editorThemeName}
            options={{
              minimap: { enabled: editorPrefs.minimap },
              fontSize: editorPrefs.fontSize,
              fontFamily: "'Geist Mono', ui-monospace, SFMono-Regular, monospace",
              fontLigatures: true,
              padding: { top: 22, bottom: 18 },
              scrollBeyondLastLine: false,
              scrollbar: { alwaysConsumeMouseWheel: false },
              roundedSelection: false,
              automaticLayout: true,
              tabSize: editorPrefs.tabSize,
              lineNumbers: editorPrefs.lineNumbers,
              lineNumbersMinChars: 3,
              wordWrap: editorPrefs.wordWrap,
              smoothScrolling: true,
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              renderLineHighlight: 'all',
              bracketPairColorization: { enabled: true },
            }}
          />
        </div>

        {/* ───────────────────────────────────────────────────────────
            3. CONSOLE SECTION (Output & Input tabs with light & dark theme)
        ──────────────────────────────────────────────────────────── */}
        <section
          className={`workspace-console ${
            consoleCollapsed ? 'workspace-console-collapsed' : ''
          } ${
            splitLayout === 'side'
              ? 'w-full md:w-[420px] lg:w-[480px] xl:w-[540px] border-t-0 border-l flex flex-col h-full'
              : 'border-t flex flex-col'
          }`}
          style={{ borderColor: 'var(--ca-border)' }}
        >
          {consoleCollapsed ? (
            /* Collapsed console bar with quick Run button */
            <div
              className="flex items-center justify-between px-4 py-2 text-xs text-muted transition"
              style={{ background: 'var(--ca-surface)' }}
            >
              <button
                type="button"
                onClick={() => setConsoleCollapsed(false)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-primary transition py-0.5 group"
                aria-expanded={false}
                title="Expand console (Alt+J)"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-muted group-hover:text-primary group-hover:border-indigo-500/40 transition">
                  <ChevronUp size={12} />
                </span>
                <span>Console & Terminal</span>
                {executionTime !== null && (
                  <span className="workspace-console-count tabular-nums inline-flex items-center gap-1">
                    {activeEngine !== 'server' ? (
                      <Zap size={10} className="text-amber-400 fill-current" />
                    ) : (
                      <Server size={10} className="text-violet-400" />
                    )}
                    {executionTime}ms
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="btn-primary h-7 px-3 text-[11px] font-semibold gap-1.5 flex items-center"
                  title="Run code (Ctrl+Enter)"
                >
                  {isRunning ? (
                    <>
                      <LoaderCircle size={11} className="animate-spin" />
                      <span>Running…</span>
                    </>
                  ) : (
                    <>
                      <Play size={11} className="fill-current" />
                      <span>Run</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Expanded console with tabs and action buttons */
            <>
              <div className="workspace-console-header">
                {/* Left: Console Tabs (Output, Input, Preview) & Layout Controls */}
                <div className="flex min-w-0 items-center gap-1.5">
                  <div className="workspace-console-tabs" role="tablist" aria-label="Console tabs">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeConsoleTab === 'output'}
                      onClick={() => setActiveConsoleTab('output')}
                      className={`workspace-console-tab ${
                        activeConsoleTab === 'output' ? 'workspace-console-tab-active' : ''
                      }`}
                    >
                      <Terminal size={13} />
                      <span>Output</span>
                      {executionTime !== null && (
                        <span className="workspace-console-count tabular-nums inline-flex items-center gap-1">
                          {activeEngine !== 'server' ? (
                            <Zap size={10} className="text-amber-400 fill-current" />
                          ) : (
                            <Server size={10} className="text-violet-400" />
                          )}
                          {executionTime}ms
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeConsoleTab === 'input'}
                      onClick={() => setActiveConsoleTab('input')}
                      className={`workspace-console-tab ${
                        activeConsoleTab === 'input' ? 'workspace-console-tab-active' : ''
                      }`}
                    >
                      <FileCode2 size={13} />
                      <span>Input (stdin)</span>
                      {stdin.trim() && (
                        <span className="workspace-console-alert-dot" title="Input provided" />
                      )}
                    </button>

                    {language === 'html' && (
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeConsoleTab === 'preview'}
                        onClick={() => setActiveConsoleTab('preview')}
                        className={`workspace-console-tab ${
                          activeConsoleTab === 'preview' ? 'workspace-console-tab-active' : ''
                        }`}
                      >
                        <Eye size={13} />
                        <span>Live Preview</span>
                      </button>
                    )}
                  </div>

                  {/* Collapse drawer button */}
                  <button
                    type="button"
                    onClick={() => setConsoleCollapsed(true)}
                    className="workspace-icon-button h-7 w-7"
                    aria-expanded={true}
                    title="Collapse console (Alt+J)"
                  >
                    <ChevronDown size={13} />
                  </button>

                  {/* Switch between Bottom Console and Side Console */}
                  <button
                    type="button"
                    onClick={() => setSplitLayout((p) => (p === 'bottom' ? 'side' : 'bottom'))}
                    className="workspace-icon-button h-7 w-7 hidden sm:inline-flex"
                    title={
                      splitLayout === 'bottom'
                        ? 'Switch to side console layout'
                        : 'Switch to bottom console layout'
                    }
                  >
                    {splitLayout === 'bottom' ? <Columns size={13} /> : <Rows size={13} />}
                  </button>
                </div>

                {/* Right: Clear Output & Themed Run Button */}
                <div className="flex items-center gap-2">
                  {output && activeConsoleTab === 'output' && (
                    <button
                      type="button"
                      onClick={() => {
                        setOutput('');
                        setExecutionTime(null);
                      }}
                      className="workspace-icon-button h-7 w-7"
                      title="Clear console output"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}

                  {/* Clean Theme-Styled RUN Button */}
                  <button
                    type="button"
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="btn-primary workspace-run-button flex items-center gap-1.5"
                    title="Run code (Ctrl+Enter)"
                  >
                    {isRunning ? (
                      <>
                        <LoaderCircle size={13} className="animate-spin" />
                        <span>Running…</span>
                      </>
                    ) : (
                      <>
                        <Play size={12} className="fill-current" />
                        <span>Run</span>
                      </>
                    )}
                    <kbd className="hidden sm:inline-block px-1 py-0.2 rounded-sm bg-white/20 text-[9px] font-mono font-semibold">
                      Ctrl+↵
                    </kbd>
                  </button>
                </div>
              </div>

              {/* Console Body: Fully styled with theme variables for light and dark modes */}
              <div
                className={`workspace-console-body ${
                  splitLayout === 'side' ? 'flex-1 max-h-none overflow-y-auto' : ''
                }`}
              >
                {/* 1. Output Tab */}
                {activeConsoleTab === 'output' &&
                  (output ? (
                    <pre
                      className="p-3.5 rounded-xl font-mono text-xs leading-relaxed whitespace-pre-wrap break-words border select-text transition-colors"
                      style={{
                        background: 'var(--ca-surface)',
                        borderColor: 'var(--ca-border)',
                        color: 'var(--ca-text)',
                      }}
                    >
                      {output}
                    </pre>
                  ) : (
                    <div className="workspace-console-idle">
                      <span className="workspace-console-prompt">$</span>
                      <span className="min-w-0 truncate">
                        Ready when you are. Click Run or press Ctrl+Enter to execute.
                      </span>
                      <span className="terminal-cursor" />
                    </div>
                  ))}

                {/* 2. Input (stdin) Tab */}
                {activeConsoleTab === 'input' && (
                  <div className="flex flex-col gap-2 py-1">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[11px] font-semibold"
                        style={{ color: 'color-mix(in srgb, var(--ca-text) 65%, transparent)' }}
                      >
                        Standard input (stdin) passed to your program:
                      </span>
                      {stdin && (
                        <button
                          type="button"
                          onClick={() => setStdin('')}
                          className="text-[10px] text-muted hover:text-rose-500 transition"
                        >
                          Clear stdin
                        </button>
                      )}
                    </div>
                    <textarea
                      value={stdin}
                      onChange={(e) => setStdin(e.target.value)}
                      placeholder="Enter standard input (stdin) to be read during execution (e.g. test numbers, lines of text)..."
                      rows={splitLayout === 'side' ? 12 : 5}
                      className="w-full p-3 rounded-xl text-xs font-mono outline-hidden transition border resize-y focus:ring-1 focus:ring-indigo-500"
                      style={{
                        background: 'var(--ca-surface)',
                        borderColor: 'var(--ca-border)',
                        color: 'var(--ca-text)',
                      }}
                    />
                  </div>
                )}

                {/* 3. Live Preview Tab (HTML) */}
                {activeConsoleTab === 'preview' && language === 'html' && (
                  <div
                    className="w-full h-80 rounded-xl overflow-hidden border shadow-xs"
                    style={{ borderColor: 'var(--ca-border)' }}
                  >
                    <iframe
                      srcDoc={code}
                      title="Live Preview"
                      sandbox="allow-scripts allow-modals"
                      className="w-full h-full border-none bg-white"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. CONFIRM RESET MODAL
      ────────────────────────────────────────────────────────────── */}
      <ConfirmDialog
        open={confirmResetOpen}
        title={`Reset ${currentLangConfig.name} code?`}
        description="This will replace your current code for this language with the clean default starter template. This action cannot be undone."
        confirmLabel="Reset code"
        cancelLabel="Keep editing"
        tone="danger"
        onConfirm={confirmResetCode}
        onCancel={() => setConfirmResetOpen(false)}
      />

      {/* ─────────────────────────────────────────────────────────────
          5. KEYBOARD SHORTCUTS REFERENCE MODAL
      ────────────────────────────────────────────────────────────── */}
      {shortcutsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px] ca-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShortcutsOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="editor-shortcuts-title"
            className="panel-card ca-modal-panel w-full max-w-md p-5 sm:p-6 shadow-2xl"
          >
            <div
              className="flex items-center justify-between gap-3 border-b pb-3"
              style={{ borderColor: 'var(--ca-border)' }}
            >
              <div className="flex items-center gap-2">
                <Keyboard size={16} className="themed-link" aria-hidden="true" />
                <h3 id="editor-shortcuts-title" className="font-display text-base font-bold text-primary">
                  Code Editor keyboard shortcuts
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShortcutsOpen(false)}
                aria-label="Close keyboard shortcuts"
                className="rounded-lg p-1.5 text-muted transition hover:bg-black/5 hover:text-primary dark:hover:bg-white/5"
              >
                <X size={16} />
              </button>
            </div>
            <dl className="mt-4 space-y-2.5 text-xs">
              {[
                ['Ctrl / Cmd + Enter', 'Run code or view live preview'],
                ['Ctrl / Cmd + S', 'Save draft locally right now'],
                ['Alt + J', 'Toggle terminal & console drawer'],
                ['?', 'Toggle this shortcuts reference'],
              ].map(([keys, desc]) => (
                <div key={keys} className="flex items-center justify-between gap-3">
                  <dt className="text-muted">{desc}</dt>
                  <dd className="shrink-0">
                    <kbd className="ca-kbd">{keys}</kbd>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShortcutsOpen(false)}
                className="btn-primary py-1.5 text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
