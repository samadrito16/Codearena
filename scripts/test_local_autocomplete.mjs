import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  ALL_AUTOCOMPLETE_LANGUAGES,
  CURATED_SNIPPETS,
  WORKSPACE_AUTOCOMPLETE_LANGUAGES,
  isInsideStringOrLineComment,
  matchLocalSnippets,
} from '../src/lib/editorSnippets.ts';
import {
  LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS,
  attachLocalAutocomplete,
  getRegisteredAutocompleteLanguageCount,
} from '../src/lib/localAutocomplete.ts';

function createMockModel(languageId, lines) {
  let disposed = false;
  return {
    getLanguageId: () => languageId,
    getLineContent: (lineNumber) => lines[lineNumber - 1] ?? '',
    getWordUntilPosition: ({ lineNumber, column }) => {
      const line = (lines[lineNumber - 1] ?? '').slice(0, column - 1);
      const match = line.match(/[A-Za-z_][A-Za-z0-9_-]*$/);
      if (!match) {
        return { word: '', startColumn: column, endColumn: column };
      }
      const word = match[0];
      return {
        word,
        startColumn: column - word.length,
        endColumn: column,
      };
    },
    isDisposed: () => disposed,
    dispose: () => {
      disposed = true;
    },
  };
}

function createMockEditor(initialModel) {
  let currentModel = initialModel;
  const disposeListeners = new Set();
  return {
    getModel: () => currentModel,
    setModel: (nextModel) => {
      currentModel = nextModel;
    },
    onDidDispose: (listener) => {
      disposeListeners.add(listener);
      return {
        dispose: () => disposeListeners.delete(listener),
      };
    },
    triggerDispose: () => {
      for (const listener of Array.from(disposeListeners)) {
        listener();
      }
    },
  };
}

function createMockMonaco({ failLanguages = [] } = {}) {
  const providersByLanguage = new Map();
  let registerCalls = 0;
  let disposeCalls = 0;

  return {
    get registerCalls() {
      return registerCalls;
    },
    get disposeCalls() {
      return disposeCalls;
    },
    providersByLanguage,
    languages: {
      CompletionItemKind: { Snippet: 28 },
      CompletionItemInsertTextRule: { InsertAsSnippet: 4 },
      registerCompletionItemProvider(language, provider) {
        if (failLanguages.includes(language) || failLanguages.includes('*')) {
          throw new Error(`Simulated registration failure for ${language}`);
        }
        registerCalls += 1;
        const list = providersByLanguage.get(language) ?? [];
        list.push(provider);
        providersByLanguage.set(language, list);

        let disposed = false;
        return {
          dispose() {
            if (disposed) return;
            disposed = true;
            disposeCalls += 1;
            const current = providersByLanguage.get(language) ?? [];
            providersByLanguage.set(
              language,
              current.filter((item) => item !== provider),
            );
          },
        };
      },
    },
  };
}

console.log('Running Local Tab Autocomplete unit & lifecycle tests...');

// 1. Curated snippet coverage and uniqueness
assert.deepEqual(
  [...WORKSPACE_AUTOCOMPLETE_LANGUAGES],
  ['javascript', 'python', 'typescript', 'java', 'cpp', 'c', 'go', 'rust'],
);
assert.equal(ALL_AUTOCOMPLETE_LANGUAGES.length, 10);

for (const lang of ALL_AUTOCOMPLETE_LANGUAGES) {
  const items = CURATED_SNIPPETS[lang];
  assert.ok(items.length >= 9, `Expected >= 9 curated snippets for ${lang}, got ${items.length}`);
  const labels = items.map((s) => s.label);
  assert.equal(new Set(labels).size, labels.length, `Duplicate snippet labels in ${lang}`);
  for (const item of items) {
    assert.ok(item.label.length > 0 && item.detail.length > 0 && item.insertText.length > 0);
    assert.ok(item.documentation.includes(item.detail), `Missing doc detail for ${lang}:${item.label}`);
  }
}
console.log('✓ All 10 supported languages have unique, documented local snippets');

// 2. Prefix matching, ranking, and context guards
const pyFor = matchLocalSnippets({ language: 'python', lineBeforeCursor: '    for' });
assert.deepEqual(
  pyFor.map((m) => m.snippet.label),
  ['for', 'forr', 'fore'],
);
assert.equal(pyFor[0].replaceStartColumn, 5);
assert.equal(pyFor[0].replaceEndColumn, 8);

const pyInput = matchLocalSnippets({ language: 'python', lineBeforeCursor: 'inp' });
assert.deepEqual(
  pyInput.map((m) => m.snippet.label),
  ['input', 'inputint', 'inputlist'],
);

const sqlSel = matchLocalSnippets({ language: 'sql', lineBeforeCursor: 'SEL' });
assert.deepEqual(
  sqlSel.map((m) => m.snippet.label),
  ['select', 'selectorder'],
);

assert.equal(matchLocalSnippets({ language: 'python', lineBeforeCursor: 'xyz' }).length, 0);
assert.equal(matchLocalSnippets({ language: 'python', lineBeforeCursor: '   ' }).length, 0);
assert.equal(matchLocalSnippets({ language: 'unknown', lineBeforeCursor: 'for' }).length, 0);

// Member/namespace access must not trigger statement snippets
assert.equal(matchLocalSnippets({ language: 'javascript', lineBeforeCursor: 'items.fo' }).length, 0);
assert.equal(matchLocalSnippets({ language: 'javascript', lineBeforeCursor: 'items?.fo' }).length, 0);
assert.equal(matchLocalSnippets({ language: 'cpp', lineBeforeCursor: 'ptr->fo' }).length, 0);
assert.equal(matchLocalSnippets({ language: 'cpp', lineBeforeCursor: 'std::co' }).length, 0);

// Comment/string guards
assert.equal(isInsideStringOrLineComment('python', '# '), true);
assert.equal(isInsideStringOrLineComment('python', '"'), true);
assert.equal(isInsideStringOrLineComment('python', '"ok" + '), false);
assert.equal(isInsideStringOrLineComment('javascript', '// '), true);
assert.equal(isInsideStringOrLineComment('javascript', '`hello ${'), false);
assert.equal(isInsideStringOrLineComment('cpp', 'if (c == \'"\' && '), false);
assert.equal(matchLocalSnippets({ language: 'python', lineBeforeCursor: '  # for' }).length, 0);
assert.equal(matchLocalSnippets({ language: 'javascript', lineBeforeCursor: '  const s = "for' }).length, 0);

// HTML < prefix handling strips leading < from insertText to prevent <<div
const htmlAngle = matchLocalSnippets({ language: 'html', lineBeforeCursor: '  <di' });
assert.equal(htmlAngle.length, 1);
assert.equal(htmlAngle[0].snippet.label, 'div');
assert.equal(htmlAngle[0].replaceStartColumn, 4);
assert.equal(htmlAngle[0].replaceEndColumn, 6);
assert.equal(htmlAngle[0].filterText, 'div');
assert.ok(htmlAngle[0].insertText.startsWith('div '), 'Leading < must be stripped when < already typed');
assert.equal(matchLocalSnippets({ language: 'html', lineBeforeCursor: '  <' }).length, 0);
console.log('✓ Prefix matching, member-access guard, comment/string guard, and HTML < handling verified');

// 3. Monaco options verify Tab accepts open list, indents when closed, built-ins kept
assert.equal(LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS.tabCompletion, 'off');
assert.equal(LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS.suggestOnTriggerCharacters, true);
assert.equal(LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS.wordBasedSuggestions, 'matchingDocuments');
assert.equal(LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS.suggest.selectionMode, 'always');
assert.equal(LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS.quickSuggestions.other, 'on');
assert.equal(LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS.quickSuggestions.comments, 'off');
assert.equal(LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS.quickSuggestions.strings, 'off');
assert.equal(LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS.inlineSuggest.enabled, false);
console.log('✓ Monaco options enforce built-ins + Tab-on-open-list + normal Tab indent when closed');

// 4. Provider lifecycle: single registration per language, ref counting, unmount disposal, no duplicates
const monaco = createMockMonaco();
const wsModelPy = createMockModel('python', ['fo']);
const wsModelJs = createMockModel('javascript', ['af']);
const wsEditor = createMockEditor(wsModelPy);

const saModelRust = createMockModel('rust', ['fn']);
const saEditor = createMockEditor(saModelRust);

const unrelatedModelPy = createMockModel('python', ['fo']);
const unrelatedEditor = createMockEditor(unrelatedModelPy);

const cleanupWs = attachLocalAutocomplete(wsEditor, monaco, WORKSPACE_AUTOCOMPLETE_LANGUAGES);
assert.equal(monaco.registerCalls, 8);
assert.equal(getRegisteredAutocompleteLanguageCount(monaco), 8);

// Attaching StandaloneEditor reuses shared languages without duplicating providers
const cleanupSa = attachLocalAutocomplete(saEditor, monaco, ALL_AUTOCOMPLETE_LANGUAGES);
assert.equal(monaco.registerCalls, 10, 'Shared languages must not register duplicate providers');
assert.equal(getRegisteredAutocompleteLanguageCount(monaco), 10);

for (const lang of ALL_AUTOCOMPLETE_LANGUAGES) {
  assert.equal(monaco.providersByLanguage.get(lang)?.length, 1, `Expected 1 provider for ${lang}`);
}

// Active Workspace Python model gets suggestions; unrelated Python model gets []
const pyProvider = monaco.providersByLanguage.get('python')[0];
const wsPySuggestions = pyProvider.provideCompletionItems(wsModelPy, { lineNumber: 1, column: 3 }).suggestions;
assert.ok(wsPySuggestions.some((s) => s.label === 'for'));

const unrelatedSuggestions = pyProvider.provideCompletionItems(unrelatedModelPy, { lineNumber: 1, column: 3 }).suggestions;
assert.deepEqual(unrelatedSuggestions, [], 'Unrelated editor model must receive zero snippet suggestions');

// Switching language/model in Workspace disables stale model and activates new language model
wsEditor.setModel(wsModelJs);
const stalePySuggestions = pyProvider.provideCompletionItems(wsModelPy, { lineNumber: 1, column: 3 }).suggestions;
assert.deepEqual(stalePySuggestions, [], 'Stale Workspace model must not receive completions after language switch');

const jsProvider = monaco.providersByLanguage.get('javascript')[0];
const wsJsSuggestions = jsProvider.provideCompletionItems(wsModelJs, { lineNumber: 1, column: 3 }).suggestions;
assert.ok(wsJsSuggestions.some((s) => s.label === 'afn'));

// Unmounting Workspace keeps StandaloneEditor's 10 languages alive
cleanupWs();
cleanupWs(); // Idempotent second call
assert.equal(monaco.disposeCalls, 0);
assert.equal(getRegisteredAutocompleteLanguageCount(monaco), 10);

// Unmounting StandaloneEditor disposes all 10 providers cleanly
cleanupSa();
assert.equal(monaco.disposeCalls, 10);
assert.equal(getRegisteredAutocompleteLanguageCount(monaco), 0);

// Reopening Workspace registers cleanly again without duplicates
const wsEditorReopened = createMockEditor(wsModelPy);
const cleanupReopened = attachLocalAutocomplete(wsEditorReopened, monaco, WORKSPACE_AUTOCOMPLETE_LANGUAGES);
assert.equal(monaco.registerCalls, 18);
assert.equal(getRegisteredAutocompleteLanguageCount(monaco), 8);
wsEditorReopened.triggerDispose(); // Editor disposal cleans up automatically
assert.equal(getRegisteredAutocompleteLanguageCount(monaco), 0);
cleanupReopened(); // Safe after triggerDispose
console.log('✓ Provider lifecycle, ref-counting, model isolation, language switching, and remounting verified');

// 5. Graceful fallback when provider registration fails
const brokenMonacoAll = createMockMonaco({ failLanguages: ['*'] });
const brokenCleanup = attachLocalAutocomplete(createMockEditor(wsModelPy), brokenMonacoAll, WORKSPACE_AUTOCOMPLETE_LANGUAGES);
assert.equal(getRegisteredAutocompleteLanguageCount(brokenMonacoAll), 0);
brokenCleanup();

const brokenMonacoPartial = createMockMonaco({ failLanguages: ['python'] });
const partialEditor = createMockEditor(wsModelJs);
const partialCleanup = attachLocalAutocomplete(partialEditor, brokenMonacoPartial, WORKSPACE_AUTOCOMPLETE_LANGUAGES);
assert.equal(getRegisteredAutocompleteLanguageCount(brokenMonacoPartial), 7);
partialCleanup();
assert.equal(getRegisteredAutocompleteLanguageCount(brokenMonacoPartial), 0);
console.log('✓ Graceful fallback when snippet-provider registration fails verified');

// 6. Editor coverage & scope isolation check across repo files
const workspaceSource = fs.readFileSync(path.resolve('src/pages/Workspace.tsx'), 'utf-8');
const standaloneSource = fs.readFileSync(path.resolve('src/pages/StandaloneEditor.tsx'), 'utf-8');
assert.ok(workspaceSource.includes('attachLocalAutocomplete'));
assert.ok(workspaceSource.includes('LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS'));
assert.ok(standaloneSource.includes('attachLocalAutocomplete'));
assert.ok(standaloneSource.includes('LOCAL_AUTOCOMPLETE_EDITOR_OPTIONS'));

const unrelatedEditors = [
  'src/components/interview/InterviewCodeRunner.tsx',
  'src/components/mastery/MasteryCodeRunner.tsx',
  'src/components/placement/CodingRunnerSection.tsx',
  'src/components/review/FileDiffViewer.tsx',
  'src/pages/RoleSpecificWorkspace.tsx',
];
for (const filePath of unrelatedEditors) {
  const source = fs.readFileSync(path.resolve(filePath), 'utf-8');
  assert.ok(!source.includes('localAutocomplete'), `${filePath} must remain unchanged`);
  assert.ok(!source.includes('editorSnippets'), `${filePath} must remain unchanged`);
}

const snippetsSource = fs.readFileSync(path.resolve('src/lib/editorSnippets.ts'), 'utf-8');
const autocompleteSource = fs.readFileSync(path.resolve('src/lib/localAutocomplete.ts'), 'utf-8');
for (const modSource of [snippetsSource, autocompleteSource]) {
  assert.ok(!/\bfetch\s*\(/.test(modSource), 'No network fetch calls allowed');
  assert.ok(!modSource.includes('apiRequest'), 'No backend API calls allowed');
}
console.log('✓ Editor coverage, unrelated-editor isolation, and zero network/AI scope verified');

console.log('\n🎉 ALL LOCAL TAB AUTOCOMPLETE TESTS PASSED!');
