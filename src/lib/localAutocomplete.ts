import { matchLocalSnippets } from './editorSnippets';

export interface DisposableLike {
  dispose(): void;
}

export interface TextModelLike {
  getLanguageId?(): string;
  getLineContent(lineNumber: number): string;
  getWordUntilPosition?(position: { lineNumber: number; column: number }): {
    word: string;
    startColumn: number;
    endColumn: number;
  };
  isDisposed?(): boolean;
}

export interface EditorLike {
  getModel(): TextModelLike | null;
  onDidDispose?(listener: () => void): DisposableLike;
}

export interface CompletionItemLike {
  label: string;
  kind: number;
  detail?: string;
  documentation?: string | { value: string };
  insertText: string;
  insertTextRules?: number;
  filterText?: string;
  sortText?: string;
  range: {
    startLineNumber: number;
    endLineNumber: number;
    startColumn: number;
    endColumn: number;
  };
}

export interface CompletionProviderLike {
  provideCompletionItems(
    model: TextModelLike,
    position: { lineNumber: number; column: number },
  ): { suggestions: CompletionItemLike[] };
}

export interface MonacoLike {
  languages?: {
    CompletionItemKind?: { Snippet?: number };
    CompletionItemInsertTextRule?: { InsertAsSnippet?: number };
    registerCompletionItemProvider?(
      languageSelector: string,
      provider: CompletionProviderLike,
    ): DisposableLike;
  };
}

interface LanguageProviderEntry {
  refCount: number;
  disposable: DisposableLike;
}

interface MonacoRegistryState {
  activeEditors: Set<EditorLike>;
  providersByLanguage: Map<string, LanguageProviderEntry>;
  editorCleanups: WeakMap<object, () => void>;
}

/**
 * Shared Monaco editor options for Workspace and StandaloneEditor.
 * Keeps Monaco's built-in suggestions enabled and accepts highlighted items on Tab
 * when the completion list is open, while preserving normal Tab indentation when closed.
 */
export const LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS = {
  quickSuggestions: {
    other: 'on' as const,
    comments: 'off' as const,
    strings: 'off' as const,
  },
  quickSuggestionsDelay: 10,
  suggestOnTriggerCharacters: true,
  snippetSuggestions: 'inline' as const,
  suggestSelection: 'first' as const,
  tabCompletion: 'off' as const,
  wordBasedSuggestions: 'matchingDocuments' as const,
  inlineSuggest: { enabled: false },
  suggest: {
    selectionMode: 'always' as const,
    showIcons: true,
    showSnippets: true,
    showKeywords: true,
    showWords: true,
    filterGraceful: true,
  },
};

const registryByMonaco = new WeakMap<object, MonacoRegistryState>();

function getRegistryState(monaco: object): MonacoRegistryState {
  let state = registryByMonaco.get(monaco);
  if (!state) {
    state = {
      activeEditors: new Set<EditorLike>(),
      providersByLanguage: new Map<string, LanguageProviderEntry>(),
      editorCleanups: new WeakMap<object, () => void>(),
    };
    registryByMonaco.set(monaco, state);
  }
  return state;
}

function isModelOwnedByRegisteredEditor(
  model: TextModelLike | null | undefined,
  activeEditors: Set<EditorLike>,
): boolean {
  if (!model || model.isDisposed?.()) {
    return false;
  }
  for (const editor of activeEditors) {
    try {
      if (editor.getModel() === model) {
        return true;
      }
    } catch {
      // Ignore editor instances undergoing disposal.
    }
  }
  return false;
}

function createLanguageCompletionProvider(
  monaco: MonacoLike,
  language: string,
  activeEditors: Set<EditorLike>,
): CompletionProviderLike {
  const snippetKind = monaco.languages?.CompletionItemKind?.Snippet ?? 28;
  const insertAsSnippetRule = monaco.languages?.CompletionItemInsertTextRule?.InsertAsSnippet ?? 4;

  return {
    provideCompletionItems(model, position) {
      try {
        if (!isModelOwnedByRegisteredEditor(model, activeEditors)) {
          return { suggestions: [] };
        }

        const modelLanguage = model.getLanguageId?.() || language;
        if (modelLanguage !== language) {
          return { suggestions: [] };
        }

        const lineContent = model.getLineContent(position.lineNumber);
        const lineBeforeCursor = lineContent.slice(0, Math.max(0, position.column - 1));
        const wordInfo = model.getWordUntilPosition?.(position);

        const matches = matchLocalSnippets({
          language,
          lineBeforeCursor,
          word: wordInfo?.word,
          startColumn: wordInfo?.startColumn,
          endColumn: wordInfo?.endColumn,
        });

        return {
          suggestions: matches.map((match) => ({
            label: match.snippet.label,
            kind: snippetKind,
            detail: match.snippet.detail,
            documentation: { value: match.snippet.documentation },
            insertText: match.insertText,
            insertTextRules: insertAsSnippetRule,
            filterText: match.filterText,
            sortText: match.sortText,
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: match.replaceStartColumn,
              endColumn: match.replaceEndColumn,
            },
          })),
        };
      } catch {
        return { suggestions: [] };
      }
    },
  };
}

/**
 * Registers local snippet completion providers once per language on the given Monaco instance
 * and scopes suggestions strictly to the attached editor's active model.
 * Never throws if provider registration fails so normal editing continues safely.
 */
export function attachLocalAutocomplete(
  editor: EditorLike | null | undefined,
  monaco: MonacoLike | null | undefined,
  languages: readonly string[],
): () => void {
  if (!editor || !monaco || typeof monaco !== 'object') {
    return () => {};
  }

  const registerProvider = monaco.languages?.registerCompletionItemProvider;
  if (typeof registerProvider !== 'function') {
    return () => {};
  }

  const state = getRegistryState(monaco as object);
  state.editorCleanups.get(editor as object)?.();

  const uniqueLanguages = Array.from(new Set(languages));
  const attachedLanguages: string[] = [];

  state.activeEditors.add(editor);

  for (const language of uniqueLanguages) {
    const existing = state.providersByLanguage.get(language);
    if (existing) {
      existing.refCount += 1;
      attachedLanguages.push(language);
      continue;
    }

    try {
      const provider = createLanguageCompletionProvider(monaco, language, state.activeEditors);
      const disposable = registerProvider.call(monaco.languages, language, provider);
      state.providersByLanguage.set(language, {
        refCount: 1,
        disposable: disposable ?? { dispose() {} },
      });
      attachedLanguages.push(language);
    } catch {
      // Fail gracefully so Monaco's built-in suggestions and normal editing keep working.
    }
  }

  let disposed = false;
  let editorDisposeListener: DisposableLike | undefined;

  const cleanup = () => {
    if (disposed) return;
    disposed = true;

    try {
      editorDisposeListener?.dispose?.();
    } catch {
      // Ignore teardown errors.
    }
    editorDisposeListener = undefined;

    state.activeEditors.delete(editor);
    if (state.editorCleanups.get(editor as object) === cleanup) {
      state.editorCleanups.delete(editor as object);
    }

    for (const language of attachedLanguages) {
      const entry = state.providersByLanguage.get(language);
      if (!entry) continue;
      entry.refCount -= 1;
      if (entry.refCount <= 0) {
        state.providersByLanguage.delete(language);
        try {
          entry.disposable.dispose();
        } catch {
          // Ignore provider disposal errors.
        }
      }
    }
  };

  state.editorCleanups.set(editor as object, cleanup);

  try {
    editorDisposeListener = editor.onDidDispose?.(cleanup);
  } catch {
    // Ignore if editor does not support disposal events.
  }

  return cleanup;
}

/** Diagnostic helper for unit tests to inspect active provider count on a Monaco instance. */
export function getRegisteredAutocompleteLanguageCount(monaco: object | null | undefined): number {
  if (!monaco || typeof monaco !== 'object') return 0;
  return registryByMonaco.get(monaco)?.providersByLanguage.size ?? 0;
}
