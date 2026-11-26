import {
  ReviewFile,
  ReviewScenario,
  ReviewTestResult,
} from '../../types/review';

/**
 * Minimal browser-safe Buffer shim for Node utilities (e.g. cursorCodec.ts).
 */
const BrowserBuffer = {
  from(input: string, encoding: 'utf8' | 'base64' = 'utf8') {
    if (encoding === 'base64') {
      const bin = atob(input);
      return {
        toString(outEnc: 'utf8' | 'base64' = 'utf8') {
          if (outEnc === 'base64') return input;
          const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
          return new TextDecoder().decode(bytes);
        },
      };
    }
    const utf8Bytes = new TextEncoder().encode(input);
    return {
      toString(outEnc: 'utf8' | 'base64' = 'utf8') {
        if (outEnc === 'utf8') return input;
        let bin = '';
        utf8Bytes.forEach((b) => {
          bin += String.fromCharCode(b);
        });
        return btoa(bin);
      },
    };
  },
};

/**
 * Balanced-delimiter TypeScript type annotation stripper for browser sandbox evaluation.
 * Safely handles nested `{ ... }` parameter types (rev-008), generics `Array<{...}>`,
 * type predicates `(o): o is Foo =>`, and `RefObject<HTMLElement>` without corrupting objects.
 */
export function stripTypeScriptSyntax(tsCode: string): string {
  let code = tsCode;

  // 1. Strip ESM import lines
  code = code.replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');

  // 2. Strip top-level `export interface Foo { ... }` or `interface Foo { ... }`
  code = code.replace(/^\s*(export\s+)?interface\s+[A-Za-z0-9_<>,\s]+\{[\s\S]*?\n\}/gm, '');
  code = code.replace(/^\s*(export\s+)?type\s+[A-Za-z0-9_<>,\s]+=[\s\S]*?;/gm, '');

  // 3. Remove `: <Type>` inside function parameter lists and return types before `{` or `=>`
  // First normalize type predicates like `(o): o is PromiseRejectedResult =>` -> `(o) =>`
  code = code.replace(/\):\s*[A-Za-z0-9_]+\s+is\s+[A-Za-z0-9_<>|\[\]]+\s*=>/g, ') =>');

  // Strip parameter & return annotations using character scanning so nested {} and <> stay balanced
  let out = '';
  let i = 0;
  const n = code.length;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;
  let parenDepth = 0;
  let braceDepth = 0;

  while (i < n) {
    const ch = code[i];
    const next = code[i + 1];

    if (inLineComment) {
      out += ch;
      if (ch === '\n') inLineComment = false;
      i++;
      continue;
    }
    if (inBlockComment) {
      out += ch;
      if (ch === '*' && next === '/') {
        out += '/';
        inBlockComment = false;
        i += 2;
        continue;
      }
      i++;
      continue;
    }
    if (inSingle || inDouble || inTemplate) {
      out += ch;
      if (ch === '\\') {
        if (i + 1 < n) {
          out += code[i + 1];
          i += 2;
          continue;
        }
      } else if (inSingle && ch === "'") inSingle = false;
      else if (inDouble && ch === '"') inDouble = false;
      else if (inTemplate && ch === '`') inTemplate = false;
      i++;
      continue;
    }

    if (ch === '/' && next === '/') {
      inLineComment = true;
      out += '//';
      i += 2;
      continue;
    }
    if (ch === '/' && next === '*') {
      inBlockComment = true;
      out += '/*';
      i += 2;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      out += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      out += ch;
      i++;
      continue;
    }
    if (ch === '`') {
      inTemplate = true;
      out += ch;
      i++;
      continue;
    }

    if (ch === '(') parenDepth++;
    else if (ch === ')') {
      parenDepth = Math.max(0, parenDepth - 1);
      out += ch;
      i++;
      // Check for return type right after `)` like `): Promise<void> {` or `): number {`
      let j = i;
      while (j < n && /\s/.test(code[j])) j++;
      if (code[j] === ':') {
        let k = j + 1;
        let dBrace = 0;
        let dAngle = 0;
        let dParen = 0;
        while (k < n) {
          const c = code[k];
          if (c === '{' && dBrace === 0 && dAngle === 0 && dParen === 0) break;
          if (c === '=' && code[k + 1] === '>' && dBrace === 0 && dAngle === 0 && dParen === 0) break;
          if (c === '{') dBrace++;
          else if (c === '}') dBrace--;
          else if (c === '<') dAngle++;
          else if (c === '>' && code[k - 1] !== '=') dAngle = Math.max(0, dAngle - 1);
          else if (c === '(') dParen++;
          else if (c === ')') dParen--;
          k++;
        }
        i = k;
      }
      continue;
    } else if (ch === '{') braceDepth++;
    else if (ch === '}') braceDepth = Math.max(0, braceDepth - 1);

    // Strip parameter type annotation `param: Type` when inside top-level function parameter list `( ... )`
    // Detect `identifier?:` or `identifier:` inside `parenDepth > 0 && braceDepth === 0`
    // (Skip `condition ? a : b` ternary if preceded by `?`)
    if (ch === ':' && parenDepth > 0 && braceDepth === 0) {
      // Check if previous non-space char is identifier char (or `?` for optional param) and NOT ternary
      const sliceBefore = out.trimEnd();
      const prevChar = sliceBefore[sliceBefore.length - 1];
      if (/[A-Za-z0-9_$]/.test(prevChar || '') || prevChar === '?') {
        // Make sure it's not an object literal inside a function call like `useState({ width: 0 })`
        // Notice braceDepth === 0 guarantees we are NOT inside `{ ... }`!
        // Skip until `,` or `)` or `=` at depth 0 inside the type expression
        if (prevChar === '?') {
          out = out.slice(0, out.lastIndexOf('?'));
        }
        let k = i + 1;
        let dBrace = 0;
        let dAngle = 0;
        let dParen = 0;
        while (k < n) {
          const c = code[k];
          if (dBrace === 0 && dAngle === 0 && dParen === 0 && (c === ',' || c === ')' || (c === '=' && code[k + 1] !== '>'))) {
            break;
          }
          if (c === '{') dBrace++;
          else if (c === '}') dBrace--;
          else if (c === '<') dAngle++;
          else if (c === '>' && code[k - 1] !== '=') dAngle = Math.max(0, dAngle - 1);
          else if (c === '(') dParen++;
          else if (c === ')') dParen--;
          k++;
        }
        i = k;
        continue;
      }
    }

    out += ch;
    i++;
  }

  return out;
}

/**
 * Converts a JS/TS file (ESM or CJS) into evaluable CommonJS source.
 */
export function transpileModuleSource(filename: string, rawCode: string): string {
  let code = rawCode;
  const exportedNames: string[] = [];

  // Strip imports
  code = code.replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');

  // Track exported symbols
  code = code.replace(
    /export\s+(async\s+)?function\s+([A-Za-z0-9_]+)/g,
    (_, asyncKw, fnName) => {
      exportedNames.push(fnName);
      return `${asyncKw || ''}function ${fnName}`;
    },
  );
  code = code.replace(
    /export\s+(const|let|var)\s+([A-Za-z0-9_]+)/g,
    (_, declKw, varName) => {
      exportedNames.push(varName);
      return `${declKw} ${varName}`;
    },
  );

  if (filename.endsWith('.ts') || filename.endsWith('.tsx')) {
    code = stripTypeScriptSyntax(code);
  }

  if (exportedNames.length > 0) {
    const assigns = exportedNames
      .map((name) => `if (typeof ${name} !== 'undefined') exports.${name} = ${name};`)
      .join('\n');
    code = `${code}\n${assigns}\n`;
  }

  return code;
}

/**
 * Executes a JS/TS review scenario locally using a real CommonJS module cache
 * (preserving circular require semantics!) and injected shims.
 */
async function executeClientJsSuite(
  scenario: ReviewScenario,
  editedFiles: Record<string, string>,
): Promise<ReviewTestResult[]> {
  const suite = scenario.testSuite;
  if (!suite) {
    return [];
  }

  const startTime = performance.now();
  const fileMap: Record<string, string> = {};
  for (const f of scenario.files) {
    fileMap[f.filename] = editedFiles[f.filename] ?? f.content;
  }

  let moduleCache: Record<string, { exports: any }> = {};
  const externalModules: Record<string, any> = {};
  const sandboxGlobals: Record<string, any> = {
    Buffer: BrowserBuffer,
    process: { env: {} },
  };

  function resolveFilename(request: string): string {
    const clean = request.replace(/^\.\//, '');
    if (fileMap[clean] !== undefined) return clean;
    for (const ext of ['.js', '.ts']) {
      if (fileMap[clean + ext] !== undefined) return clean + ext;
    }
    return clean;
  }

  function customRequire(request: string): any {
    if (Object.prototype.hasOwnProperty.call(externalModules, request)) {
      return externalModules[request];
    }

    const resolved = resolveFilename(request);
    if (fileMap[resolved] === undefined) {
      throw new Error(`Cannot find module '${request}'`);
    }

    // Real CommonJS behavior: register empty exports object BEFORE evaluating module body
    if (moduleCache[resolved]) {
      return moduleCache[resolved].exports;
    }

    const mod = { exports: {} as any };
    moduleCache[resolved] = mod;

    const transpiled = transpileModuleSource(resolved, fileMap[resolved]);
    const globalNames = Object.keys(sandboxGlobals);
    const globalValues = globalNames.map((k) => sandboxGlobals[k]);

    const factory = new Function(
      'module',
      'exports',
      'require',
      ...globalNames,
      transpiled,
    );
    factory(mod, mod.exports, customRequire, ...globalValues);

    return mod.exports;
  }

  const ctx = {
    require: customRequire,
    resetModules() {
      moduleCache = {};
    },
    setExternalModule(name: string, impl: any) {
      externalModules[name] = impl;
    },
    setGlobal(name: string, val: any) {
      sandboxGlobals[name] = val;
    },
  };

  const runnerFactory = new Function(`return (${suite.harnessCode});`);
  const runTests = runnerFactory();
  const rawResults: Array<Partial<ReviewTestResult>> = await runTests(ctx);
  const elapsed = Math.max(1, Math.round(performance.now() - startTime));

  return suite.testCases.map((tc) => {
    const match = rawResults.find((r) => r.testId === tc.id);
    return {
      testId: tc.id,
      title: tc.title,
      passed: Boolean(match?.passed),
      error: match?.error,
      expected: match?.expected,
      actual: match?.actual,
      durationMs: elapsed,
    };
  });
}

interface BackendReviewRunResponse {
  success: boolean;
  runtimeMs: number;
  error?: string;
  results: Array<Partial<ReviewTestResult>>;
}

/**
 * Executes a Python scenario through the isolated backend container runner.
 */
async function executeBackendContainerSuite(
  scenario: ReviewScenario,
  editedFiles: Record<string, string>,
): Promise<ReviewTestResult[]> {
  const suite = scenario.testSuite;
  if (!suite) return [];

  const filesPayload = scenario.files.map((f: ReviewFile) => ({
    filename: f.filename,
    content: editedFiles[f.filename] ?? f.content,
  }));

  const { apiRequest } = await import('../api');
  const response = await apiRequest<BackendReviewRunResponse>('/review/run', {
    method: 'POST',
    body: JSON.stringify({
      scenarioId: scenario.id,
      files: filesPayload,
    }),
  });

  if (!response.success && response.results.length === 0) {
    return suite.testCases.map((tc) => ({
      testId: tc.id,
      title: tc.title,
      passed: false,
      error: response.error || 'Execution failed before tests could complete.',
      durationMs: response.runtimeMs,
    }));
  }

  return suite.testCases.map((tc) => {
    const match = response.results.find((r) => r.testId === tc.id);
    return {
      testId: tc.id,
      title: tc.title,
      passed: Boolean(match?.passed),
      error: match?.error,
      expected: match?.expected,
      actual: match?.actual,
      durationMs: match?.durationMs ?? response.runtimeMs,
    };
  });
}

export async function runReviewScenarioTests(
  scenario: ReviewScenario,
  editedFiles: Record<string, string>,
): Promise<ReviewTestResult[]> {
  if (!scenario.testSuite) {
    throw new Error(`No test suite configured for scenario ${scenario.id}`);
  }

  if (scenario.testSuite.executionMode === 'client_js') {
    return executeClientJsSuite(scenario, editedFiles);
  }

  return executeBackendContainerSuite(scenario, editedFiles);
}
