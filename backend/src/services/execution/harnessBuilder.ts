import {
  cValueCodec,
  cppValueCodec,
  goValueCodec,
  javaValueCodec,
  rustValueCodec,
} from './valueCodecs.js';
import {
  SENTINEL_START,
  SENTINEL_END,
  SENTINEL_CASE_START,
  SENTINEL_CASE_END,
  SENTINEL_ERROR_START,
  SENTINEL_ERROR_END,
  SENTINEL_CASE_DELIMITER,
  type TestCaseInput,
} from './types.js';

export interface HarnessResult {
  code: string;
  stdin: string;
}

export interface BatchHarnessOptions {
  earlyExit?: boolean;
  orderInvariant?: boolean;
  functionNameHint?: string;
}

/**
 * Serializes test cases into line-delimited format for languages without a built-in JSON parser (e.g. Java, C++, C, Go, Rust).
 */
function formatDelimitedCasesStdin(testCases: TestCaseInput[]): string {
  return testCases
    .map((tc) => `${SENTINEL_CASE_DELIMITER} ${tc.caseNumber}\n${tc.input}`)
    .join('\n');
}

function splitTopLevelParams(rawParams: string): string[] {
  const parts: string[] = [];
  let angleDepth = 0;
  let parenDepth = 0;
  let bracketDepth = 0;
  let start = 0;

  for (let i = 0; i < rawParams.length; i += 1) {
    const ch = rawParams[i];
    if (ch === '<') angleDepth += 1;
    else if (ch === '>' && angleDepth > 0) angleDepth -= 1;
    else if (ch === '(') parenDepth += 1;
    else if (ch === ')' && parenDepth > 0) parenDepth -= 1;
    else if (ch === '[') bracketDepth += 1;
    else if (ch === ']' && bracketDepth > 0) bracketDepth -= 1;
    else if (ch === ',' && angleDepth === 0 && parenDepth === 0 && bracketDepth === 0) {
      const part = rawParams.slice(start, i).trim();
      if (part) parts.push(part);
      start = i + 1;
    }
  }
  const tail = rawParams.slice(start).trim();
  if (tail) parts.push(tail);
  return parts;
}

// --- C Signature Analysis ---

type CParamKind =
  | 'int'
  | 'long'
  | 'double'
  | 'bool'
  | 'char'
  | 'string'
  | 'int_array'
  | 'char_array'
  | 'string_array'
  | 'opt_int_array'
  | 'int_matrix'
  | 'char_matrix'
  | 'out_size'
  | 'out_col_sizes';

interface CLogicalParam {
  kind: CParamKind;
  name: string;
}

interface CSigInfo {
  fnName: string;
  returnType: string;
  hasReturnSize: boolean;
  hasReturnColSizes: boolean;
  params: CLogicalParam[];
}

function stripCCommentsAndDirectives(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/\/\/[^\n]*/g, ' ')
    .replace(/^\s*#[^\n]*/gm, ' ');
}

function normalizeCType(rawType: string): string {
  return rawType
    .replace(/\b(?:const|static|inline|unsigned|signed)\b/g, ' ')
    .replace(/\s*\*\s*/g, '*')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitCTypeAndName(paramDecl: string): { type: string; name: string } | null {
  const cleaned = paramDecl.trim();
  if (!cleaned || cleaned === 'void') return null;
  const match = cleaned.match(/^(.+?)([A-Za-z_]\w*)$/);
  if (!match) return null;
  return {
    type: normalizeCType(match[1]),
    name: match[2],
  };
}

function parseCEntrySignature(userCode: string, hint?: string): CSigInfo | null {
  const cleaned = stripCCommentsAndDirectives(userCode);
  const fnRegex = /(?:^|[;{}])\s*([A-Za-z_][\w\s\*]*?)\s+([A-Za-z_]\w*)\s*\(([^)]*)\)\s*\{/g;
  const ignoredNames = new Set(['main', 'if', 'for', 'while', 'switch', 'else', 'sizeof']);

  const matches: Array<{ returnType: string; fnName: string; rawParams: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = fnRegex.exec(cleaned)) !== null) {
    const fnName = match[2].trim();
    if (ignoredNames.has(fnName)) continue;
    matches.push({
      returnType: normalizeCType(match[1]),
      fnName,
      rawParams: match[3].trim(),
    });
  }

  if (matches.length === 0) return null;
  const chosen = (hint ? matches.find((m) => m.fnName === hint) : undefined) ?? matches[0];

  const rawList = splitTopLevelParams(chosen.rawParams)
    .map(splitCTypeAndName)
    .filter((item): item is { type: string; name: string } => item !== null);

  const logical: CLogicalParam[] = [];
  let hasReturnSize = false;
  let hasReturnColSizes = false;

  for (let i = 0; i < rawList.length; i += 1) {
    const cur = rawList[i];
    const next1 = rawList[i + 1];
    const next2 = rawList[i + 2];

    if (cur.type === 'int*' && /returnSize/i.test(cur.name)) {
      hasReturnSize = true;
      logical.push({ kind: 'out_size', name: cur.name });
      continue;
    }
    if (cur.type === 'int**' && /returnCol(?:umn)?Sizes?/i.test(cur.name)) {
      hasReturnColSizes = true;
      logical.push({ kind: 'out_col_sizes', name: cur.name });
      continue;
    }
    if (
      cur.type === 'int**' &&
      next1?.type === 'int' &&
      /Size$/i.test(next1.name) &&
      next2?.type === 'int*' &&
      /ColSize/i.test(next2.name)
    ) {
      logical.push({ kind: 'int_matrix', name: cur.name });
      i += 2;
      continue;
    }
    if (
      cur.type === 'char**' &&
      next1?.type === 'int' &&
      /Size$/i.test(next1.name) &&
      next2?.type === 'int*' &&
      /ColSize/i.test(next2.name)
    ) {
      logical.push({ kind: 'char_matrix', name: cur.name });
      i += 2;
      continue;
    }
    if (cur.type === 'char**' && next1?.type === 'int' && /Size$/i.test(next1.name)) {
      logical.push({ kind: 'string_array', name: cur.name });
      i += 1;
      continue;
    }
    if (cur.type === 'OptionalInt*' && next1?.type === 'int' && /Size$/i.test(next1.name)) {
      logical.push({ kind: 'opt_int_array', name: cur.name });
      i += 1;
      continue;
    }
    if (cur.type === 'int*' && next1?.type === 'int' && /Size$/i.test(next1.name)) {
      logical.push({ kind: 'int_array', name: cur.name });
      i += 1;
      continue;
    }
    if (cur.type === 'char*' && next1?.type === 'int' && /Size$/i.test(next1.name)) {
      logical.push({ kind: 'char_array', name: cur.name });
      i += 1;
      continue;
    }
    if (cur.type === 'char*') {
      logical.push({ kind: 'string', name: cur.name });
    } else if (cur.type === 'char') {
      logical.push({ kind: 'char', name: cur.name });
    } else if (cur.type === 'bool' || cur.type === '_Bool') {
      logical.push({ kind: 'bool', name: cur.name });
    } else if (cur.type === 'double' || cur.type === 'float') {
      logical.push({ kind: 'double', name: cur.name });
    } else if (cur.type.includes('long')) {
      logical.push({ kind: 'long', name: cur.name });
    } else {
      logical.push({ kind: 'int', name: cur.name });
    }
  }

  return {
    fnName: chosen.fnName,
    returnType: chosen.returnType,
    hasReturnSize,
    hasReturnColSizes,
    params: logical,
  };
}

function buildCInvocationBlock(sig: CSigInfo | null): string {
  if (!sig) {
    return `
        printf("${SENTINEL_ERROR_START}\\nCould not find a valid C solution function to execute.\\n${SENTINEL_ERROR_END}\\n");
        ca_free_tokens(tokens, tokenCount);
        return false;
    `;
  }

  const inputParams = sig.params.filter((p) => p.kind !== 'out_size' && p.kind !== 'out_col_sizes');
  const declarations: string[] = [];
  const callArgs: string[] = [];
  let tokenIdx = 0;

  for (let idx = 0; idx < sig.params.length; idx += 1) {
    const p = sig.params[idx];
    if (p.kind === 'out_size') {
      callArgs.push('&ca_retSize');
      continue;
    }
    if (p.kind === 'out_col_sizes') {
      callArgs.push('&ca_retColSizes');
      continue;
    }

    const tExpr = `tokens[${tokenIdx}]`;
    tokenIdx += 1;
    const varName = `ca_arg_${idx}`;

    switch (p.kind) {
      case 'int':
        declarations.push(`int ${varName} = ca_parse_int(${tExpr});`);
        callArgs.push(varName);
        break;
      case 'long':
        declarations.push(`long long ${varName} = ca_parse_long(${tExpr});`);
        callArgs.push(varName);
        break;
      case 'double':
        declarations.push(`double ${varName} = ca_parse_double(${tExpr});`);
        callArgs.push(varName);
        break;
      case 'bool':
        declarations.push(`bool ${varName} = ca_parse_bool(${tExpr});`);
        callArgs.push(varName);
        break;
      case 'char':
        declarations.push(`char ${varName} = ca_parse_char(${tExpr});`);
        callArgs.push(varName);
        break;
      case 'string':
        declarations.push(`char* ${varName} = ca_parse_string(${tExpr});`);
        callArgs.push(varName);
        break;
      case 'int_array':
        declarations.push(`int ${varName}_sz = 0; int* ${varName} = ca_parse_int_array(${tExpr}, &${varName}_sz);`);
        callArgs.push(varName, `${varName}_sz`);
        break;
      case 'char_array':
        declarations.push(`int ${varName}_sz = 0; char* ${varName} = ca_parse_char_array(${tExpr}, &${varName}_sz);`);
        callArgs.push(varName, `${varName}_sz`);
        break;
      case 'string_array':
        declarations.push(`int ${varName}_sz = 0; char** ${varName} = ca_parse_string_array(${tExpr}, &${varName}_sz);`);
        callArgs.push(varName, `${varName}_sz`);
        break;
      case 'opt_int_array':
        declarations.push(`int ${varName}_sz = 0; OptionalInt* ${varName} = ca_parse_opt_int_array(${tExpr}, &${varName}_sz);`);
        callArgs.push(varName, `${varName}_sz`);
        break;
      case 'int_matrix':
        declarations.push(
          `int ${varName}_rows = 0; int* ${varName}_cols = NULL; int** ${varName} = ca_parse_int_matrix(${tExpr}, &${varName}_rows, &${varName}_cols);`,
        );
        callArgs.push(varName, `${varName}_rows`, `${varName}_cols`);
        break;
      case 'char_matrix':
        declarations.push(
          `int ${varName}_rows = 0; int* ${varName}_cols = NULL; char** ${varName} = ca_parse_char_matrix(${tExpr}, &${varName}_rows, &${varName}_cols);`,
        );
        callArgs.push(varName, `${varName}_rows`, `${varName}_cols`);
        break;
    }
  }

  let printResultStmt = '';
  const ret = sig.returnType;
  if (ret === 'int**') {
    printResultStmt = `ca_print_int_matrix(ca_res, ca_retSize, ca_retColSizes);`;
  } else if (ret === 'int*') {
    printResultStmt = `ca_print_int_array(ca_res, ca_retSize);`;
  } else if (ret === 'char**') {
    printResultStmt = `ca_print_string_array(ca_res, ca_retSize);`;
  } else if (ret === 'OptionalInt*') {
    printResultStmt = `ca_print_opt_int_array(ca_res, ca_retSize);`;
  } else if (ret === 'char*' && sig.hasReturnSize) {
    printResultStmt = `ca_print_char_array(ca_res, ca_retSize);`;
  } else if (ret === 'char*') {
    printResultStmt = `ca_print_json_string(ca_res);`;
  } else if (ret === 'char') {
    printResultStmt = `char ca_cbuf[2] = { ca_res, '\\0' }; ca_print_json_string(ca_cbuf);`;
  } else if (ret === 'bool' || ret === '_Bool') {
    printResultStmt = `printf("%s", ca_res ? "true" : "false");`;
  } else if (ret === 'double' || ret === 'float') {
    printResultStmt = `if (ca_res == 0.0) printf("0"); else printf("%.10g", ca_res);`;
  } else if (ret.includes('long')) {
    printResultStmt = `printf("%lld", (long long)ca_res);`;
  } else {
    printResultStmt = `printf("%d", ca_res);`;
  }

  return `
        if (tokenCount != ${inputParams.length}) {
            printf("${SENTINEL_ERROR_START}\\nWrong number of arguments\\n${SENTINEL_ERROR_END}\\n");
            ca_free_tokens(tokens, tokenCount);
            return false;
        }
        int ca_retSize = 0;
        int* ca_retColSizes = NULL;
        ${declarations.join('\n        ')}
        ${ret} ca_res = ${sig.fnName}(${callArgs.join(', ')});
        fflush(stdout);
        printf("\\n${SENTINEL_START}\\n");
        ${printResultStmt}
        printf("\\n${SENTINEL_END}\\n");
        ca_free_tokens(tokens, tokenCount);
        return true;
  `;
}

// --- Go Source Preparation ---

function prepareGoUserSource(userCode: string, hint?: string): {
  userImports: string;
  userBody: string;
  entryFn: string | null;
} {
  let body = userCode.replace(/^\s*package\s+[A-Za-z_]\w*\s*;?\r?\n?/m, '');
  const importBlocks: string[] = [];

  // Extract grouped `import ( ... )` blocks
  body = body.replace(/^\s*import\s*\(([\s\S]*?)\)\s*;?\r?\n?/gm, (_m, inner: string) => {
    importBlocks.push(`import (\n${inner}\n)`);
    return '';
  });

  // Extract single-line `import ... "..."` declarations
  body = body.replace(/^\s*import\s+(?:[A-Za-z_.]\w*\s+)?"[^"]+"\s*;?\r?\n?/gm, (full) => {
    importBlocks.push(full.trim());
    return '';
  });

  const fnMatches = [...body.matchAll(/^\s*func\s+([A-Za-z_]\w*)\s*\(/gm)]
    .map((m) => m[1])
    .filter((name) => name !== 'main');
  const entryFn = (hint && fnMatches.includes(hint) ? hint : fnMatches[0]) ?? null;

  return {
    userImports: importBlocks.join('\n'),
    userBody: body.trim(),
    entryFn,
  };
}

// --- Rust Signature Analysis ---

interface RustParam {
  passMode: 'owned' | 'ref' | 'mut_ref' | 'str_ref' | 'slice_ref' | 'mut_slice_ref';
  parseType: string;
}

interface RustSigInfo {
  fnName: string;
  params: RustParam[];
}

function parseRustEntrySignature(userCode: string, hint?: string): RustSigInfo | null {
  const fnRegex = /^\s*(?:pub\s+)?fn\s+([A-Za-z_]\w*)\s*(?:<[^>]*>)?\s*\(([^)]*)\)/gm;
  const candidates: Array<{ fnName: string; rawParams: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = fnRegex.exec(userCode)) !== null) {
    const fnName = match[1];
    if (fnName === 'main') continue;
    candidates.push({ fnName, rawParams: match[2].trim() });
  }
  if (candidates.length === 0) return null;
  const chosen = (hint ? candidates.find((c) => c.fnName === hint) : undefined) ?? candidates[0];

  const params: RustParam[] = splitTopLevelParams(chosen.rawParams).map((decl) => {
    const colonIdx = decl.indexOf(':');
    const rawType = colonIdx >= 0 ? decl.slice(colonIdx + 1).trim() : 'i32';
    const compact = rawType.replace(/\s+/g, ' ').trim();
    if (compact === '&str') {
      return { passMode: 'str_ref', parseType: 'String' };
    }
    const mutSliceMatch = compact.match(/^&mut\s*\[(.+)\]$/);
    if (mutSliceMatch) {
      return { passMode: 'mut_slice_ref', parseType: `Vec<${mutSliceMatch[1].trim()}>` };
    }
    const sliceMatch = compact.match(/^&\s*\[(.+)\]$/);
    if (sliceMatch) {
      return { passMode: 'slice_ref', parseType: `Vec<${sliceMatch[1].trim()}>` };
    }
    if (compact.startsWith('&mut ')) {
      return { passMode: 'mut_ref', parseType: compact.slice(5).trim() };
    }
    if (compact.startsWith('&')) {
      return { passMode: 'ref', parseType: compact.slice(1).trim() };
    }
    return { passMode: 'owned', parseType: compact };
  });

  return { fnName: chosen.fnName, params };
}

function buildRustInvocationBlock(sig: RustSigInfo | null): string {
  if (!sig) {
    return `
        println!("${SENTINEL_ERROR_START}\\nCould not find a valid Rust solution function to execute.\\n${SENTINEL_ERROR_END}");
        return false;
    `;
  }

  const argBindings: string[] = [];
  const callArgs: string[] = [];

  for (let i = 0; i < sig.params.length; i += 1) {
    const p = sig.params[i];
    const varName = `__ca_arg_${i}`;
    argBindings.push(
      `let ${p.passMode === 'mut_ref' || p.passMode === 'mut_slice_ref' ? 'mut ' : ''}${varName} = match __ca_codec::parse::<${p.parseType}>(&tokens[${i}]) {
            Ok(v) => v,
            Err(e) => {
                println!("${SENTINEL_ERROR_START}\\n{}\\n${SENTINEL_ERROR_END}", e);
                return false;
            }
        };`,
    );
    if (p.passMode === 'mut_ref' || p.passMode === 'mut_slice_ref') {
      callArgs.push(`&mut ${varName}`);
    } else if (p.passMode === 'ref' || p.passMode === 'str_ref' || p.passMode === 'slice_ref') {
      callArgs.push(`&${varName}`);
    } else {
      callArgs.push(varName);
    }
  }

  return `
        if tokens.len() != ${sig.params.length} {
            println!("${SENTINEL_ERROR_START}\\nWrong number of arguments\\n${SENTINEL_ERROR_END}");
            return false;
        }
        ${argBindings.join('\n        ')}
        let __ca_panic_cell = std::sync::Arc::new(std::sync::Mutex::new(None::<String>));
        let __ca_panic_hook_cell = std::sync::Arc::clone(&__ca_panic_cell);
        let __ca_prev_hook = std::panic::take_hook();
        std::panic::set_hook(Box::new(move |info| {
            if let Ok(mut guard) = __ca_panic_hook_cell.lock() {
                *guard = Some(info.to_string());
            }
        }));
        let __ca_outcome = std::panic::catch_unwind(std::panic::AssertUnwindSafe(|| {
            ${sig.fnName}(${callArgs.join(', ')})
        }));
        std::panic::set_hook(__ca_prev_hook);

        match __ca_outcome {
            Ok(__ca_res) => {
                let _ = std::io::Write::flush(&mut std::io::stdout());
                println!("\\n${SENTINEL_START}\\n{}\\n${SENTINEL_END}", __ca_codec::write(&__ca_res));
                true
            }
            Err(_) => {
                let __ca_msg = __ca_panic_cell
                    .lock()
                    .ok()
                    .and_then(|g| g.clone())
                    .unwrap_or_else(|| "Runtime panic".to_string());
                println!("\\n${SENTINEL_ERROR_START}\\n{}\\n${SENTINEL_ERROR_END}", __ca_msg);
                false
            }
        }
  `;
}

/**
 * Builds execution source code with driver harnesses for Python, JavaScript, TypeScript,
 * Java, C++, C, Go, Rust, and SQL, supporting multi-testcase batch execution in a SINGLE container invocation.
 */
export function buildBatchExecutionSource(
  language: string,
  userCode: string,
  testCases: TestCaseInput[],
  options: BatchHarnessOptions = {},
): HarnessResult {
  const lang = language.toLowerCase().trim();
  const trimmed = userCode.trim();
  const cases = testCases.length > 0 ? testCases : [{ caseNumber: 1, input: '', expected: '' }];

  // 1. Python Batch Driver Harness
  if (lang === 'python' || lang === 'python_pandas') {
    if (
      (trimmed.includes('sys.stdin') || trimmed.includes('input(')) &&
      (trimmed.includes('__main__') || trimmed.includes('def main') || trimmed.includes('input('))
    ) {
      return {
        code: userCode,
        stdin: cases.map((c) => c.input).join('\n'),
      };
    }

    const stdinPayload = JSON.stringify({
      earlyExit: Boolean(options.earlyExit),
      cases: cases.map((c) => ({
        caseNumber: c.caseNumber,
        input: c.input,
        expected: options.earlyExit ? c.expected : undefined,
      })),
    });

    const pythonHarness = `
# -*- coding: utf-8 -*-
import sys, json, re, inspect, io, time, ast

${trimmed}

def _parse_py_input(raw):
    if not raw:
        return [], {}
    raw = raw.strip()

    try:
        data = json.loads(raw)
        if isinstance(data, list):
            return data, {}
        return [data], {}
    except Exception:
        pass

    parts = re.split(r',\\s*(?=[a-zA-Z_]\\w*\\s*=)', raw)
    is_named = any(re.match(r'^[a-zA-Z_]\\w*\\s*=', p) for p in parts)
    if is_named:
        scope = {}
        for p in parts:
            idx = p.find('=')
            if idx != -1:
                k = p[:idx].strip()
                v_str = p[idx+1:].strip()
                try:
                    scope[k] = json.loads(v_str)
                except Exception:
                    try:
                        scope[k] = ast.literal_eval(v_str)
                    except (ValueError, SyntaxError):
                        scope[k] = v_str
        return [], scope

    return [raw], {}

def _run_batch_driver():
    raw_all = sys.stdin.read().strip()
    try:
        batch_payload = json.loads(raw_all)
    except Exception:
        batch_payload = {"earlyExit": False, "cases": [{"caseNumber": 1, "input": raw_all}]}

    early_exit = bool(batch_payload.get("earlyExit", False))
    test_cases = batch_payload.get("cases", [])

    candidates = [
        ${JSON.stringify(options.functionNameHint || '')},
        'two_sum', 'twoSum', 'is_valid', 'isValid',
        'length_of_longest_substring', 'lengthOfLongestSubstring',
        'max_area', 'maxArea', 'find_median_sorted_arrays',
        'findMedianSortedArrays', 'solution', 'solve'
    ]
    candidates = [c for c in candidates if c]

    hint = ${JSON.stringify(options.functionNameHint || '')}
    has_solution_class = 'Solution' in globals() and isinstance(globals()['Solution'], type)

    for tc in test_cases:
        c_num = tc.get("caseNumber", 1)
        c_input = tc.get("input", "")

        user_stdout_buffer = io.StringIO()
        real_stdout = sys.stdout
        sys.stdout = user_stdout_buffer

        case_start = time.perf_counter()
        failed = False
        err_msg = ""
        res = None

        try:
            args, kwargs = _parse_py_input(c_input)

            fn = None
            if has_solution_class:
                try:
                    sol = globals()['Solution']()
                    methods = [m for m in dir(sol) if not m.startswith('_') and callable(getattr(sol, m))]
                    if hint and hasattr(sol, hint):
                        fn = getattr(sol, hint)
                    elif methods:
                        fn = getattr(sol, methods[0])
                except Exception:
                    pass

            if fn is None:
                for cand in candidates:
                    if cand in globals() and callable(globals()[cand]):
                        fn = globals()[cand]
                        break

            if fn is None:
                reserved = {'sys', 'json', 're', 'inspect', 'io', 'time', '_parse_py_input', '_run_batch_driver', 'Solution'}
                for name, val in list(globals().items()):
                    if callable(val) and not name.startswith('_') and name not in reserved:
                        fn = val
                        break

            if fn is None:
                raise RuntimeError("Could not find a valid solution method or function to execute.")

            sig = inspect.signature(fn)
            param_names = list(sig.parameters.keys())
            if param_names and param_names[0] == 'self':
                param_names = param_names[1:]

            if kwargs:
                call_args = []
                for p in param_names:
                    if p in kwargs:
                        call_args.append(kwargs[p])
                if len(call_args) == len(param_names):
                    res = fn(*call_args)
                else:
                    res = fn(*list(kwargs.values()))
            elif args:
                res = fn(*args)
            else:
                res = fn()

        except Exception as e:
            failed = True
            import traceback
            err_msg = traceback.format_exc()
        finally:
            sys.stdout = real_stdout
            user_logs = user_stdout_buffer.getvalue()

        sys.stdout.write(f"${SENTINEL_CASE_START} {c_num}\\n")
        if user_logs:
            sys.stdout.write(user_logs)
            if not user_logs.endswith('\\n'):
                sys.stdout.write('\\n')

        if failed:
            sys.stdout.write("${SENTINEL_ERROR_START}\\n")
            sys.stdout.write(err_msg.strip() if err_msg else "Runtime Error")
            sys.stdout.write("\\n${SENTINEL_ERROR_END}\\n")
        else:
            sys.stdout.write("${SENTINEL_START}\\n")
            if isinstance(res, bool):
                sys.stdout.write("true" if res else "false")
            elif res is None:
                sys.stdout.write("null")
            else:
                try:
                    sys.stdout.write(json.dumps(res, separators=(',', ':')))
                except Exception:
                    sys.stdout.write(str(res))
            sys.stdout.write("\\n${SENTINEL_END}\\n")

        sys.stdout.write(f"${SENTINEL_CASE_END} {c_num}\\n")

        if failed and early_exit:
            break

if __name__ == '__main__':
    _run_batch_driver()
`;
    return { code: pythonHarness, stdin: stdinPayload };
  }

  // 2. JavaScript Batch Driver Harness
  if (lang === 'javascript' || lang === 'node' || lang === 'js') {
    if (
      trimmed.includes('readFileSync(0') ||
      trimmed.includes('process.stdin') ||
      (trimmed.includes('fs') && trimmed.includes('readFileSync'))
    ) {
      return {
        code: userCode,
        stdin: cases.map((c) => c.input).join('\n'),
      };
    }

    const stdinPayload = JSON.stringify({
      earlyExit: Boolean(options.earlyExit),
      cases: cases.map((c) => ({
        caseNumber: c.caseNumber,
        input: c.input,
        expected: options.earlyExit ? c.expected : undefined,
      })),
    });

    const jsHarness = `
${trimmed}

(function() {
  const fs = require('fs');

  function parseInput(raw) {
    if (!raw) return { args: [], kwargs: {} };
    raw = raw.trim();

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return { args: parsed, kwargs: {} };
      return { args: [parsed], kwargs: {} };
    } catch (_) {}

    const parts = raw.split(/,\\s*(?=[a-zA-Z_$][\\w$]*\\s*=)/);
    const isNamed = parts.some(p => /^[a-zA-Z_$][\\w$]*\\s*=/.test(p));
    if (isNamed) {
      const kwargs = {};
      for (const p of parts) {
        const idx = p.indexOf('=');
        if (idx !== -1) {
          const k = p.slice(0, idx).trim();
          const v = p.slice(idx + 1).trim();
          try { kwargs[k] = JSON.parse(v); } catch { kwargs[k] = v; }
        }
      }
      return { args: [], kwargs };
    }
    return { args: [raw], kwargs: {} };
  }

  let rawAll = '';
  try { rawAll = fs.readFileSync(0, 'utf-8').trim(); } catch (_) {}

  let batchPayload;
  try {
    batchPayload = JSON.parse(rawAll);
  } catch (_) {
    batchPayload = { earlyExit: false, cases: [{ caseNumber: 1, input: rawAll }] };
  }

  const earlyExit = Boolean(batchPayload.earlyExit);
  const testCases = Array.isArray(batchPayload.cases) ? batchPayload.cases : [];

  for (const tc of testCases) {
    const cNum = tc.caseNumber ?? 1;
    const cInput = tc.input ?? '';
    const caseLogs = [];

    console.log = function(...args) {
      caseLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    };
    console.warn = console.log;
    console.error = console.log;

    let failed = false;
    let errMsg = '';
    let result = undefined;

    try {
      const { args, kwargs } = parseInput(cInput);

      let fn = null;
      if (typeof Solution === 'function') {
        try {
          const inst = new Solution();
          const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(inst)).filter(m => m !== 'constructor');
          const hint = ${JSON.stringify(options.functionNameHint || '')};
          if (hint && typeof inst[hint] === 'function') {
            fn = inst[hint].bind(inst);
          } else if (methods.length > 0) {
            fn = inst[methods[0]].bind(inst);
          }
        } catch (_) {}
      }

      if (!fn) {
        const candidates = [
          ${JSON.stringify(options.functionNameHint || '')},
          'twoSum', 'two_sum', 'isValid', 'is_valid',
          'lengthOfLongestSubstring', 'maxArea', 'findMedianSortedArrays',
          'solution', 'solve'
        ].filter(Boolean);

        for (const name of candidates) {
          try {
            const cand = eval('typeof ' + name + ' === "function" ? ' + name + ' : null');
            if (cand) { fn = cand; break; }
          } catch (_) {}
        }
      }

      if (!fn) {
        const fnRegex = /(?:function\\s+([a-zA-Z_$][\\w$]*)|(?:const|let|var)\\s+([a-zA-Z_$][\\w$]*)\\s*=\\s*(?:function|\\([^)]*\\)\\s*=>|[a-zA-Z_$][\\w$]*\\s*=>))/g;
        let match;
        while ((match = fnRegex.exec(${JSON.stringify(trimmed)})) !== null) {
          const declaredName = match[1] || match[2];
          if (declaredName && declaredName !== 'require' && declaredName !== 'parseInput') {
            try {
              const cand = eval('typeof ' + declaredName + ' === "function" ? ' + declaredName + ' : null');
              if (cand) { fn = cand; break; }
            } catch (_) {}
          }
        }
      }

      if (!fn) throw new Error("Could not find a valid solution function or class method.");

      if (kwargs && Object.keys(kwargs).length > 0) {
        const fnStr = fn.toString();
        const paramMatch = fnStr.match(/\\(([^)]*)\\)/);
        if (paramMatch && paramMatch[1].trim()) {
          const paramNames = paramMatch[1].split(',').map(s => s.trim().split(/[\\s:=]/)[0]);
          const callArgs = paramNames.map(p => kwargs[p]);
          result = fn(...callArgs);
        } else {
          result = fn(...Object.values(kwargs));
        }
      } else if (args && args.length > 0) {
        result = fn(...args);
      } else {
        result = fn();
      }
    } catch (err) {
      failed = true;
      errMsg = err && err.stack ? err.stack : String(err);
    }

    process.stdout.write("${SENTINEL_CASE_START} " + cNum + "\\n");
    if (caseLogs.length > 0) {
      process.stdout.write(caseLogs.join('\\n') + '\\n');
    }

    if (failed) {
      process.stdout.write("${SENTINEL_ERROR_START}\\n");
      process.stdout.write(errMsg + "\\n");
      process.stdout.write("${SENTINEL_ERROR_END}\\n");
    } else {
      process.stdout.write("${SENTINEL_START}\\n");
      if (result === undefined) {
        process.stdout.write("null");
      } else {
        process.stdout.write(JSON.stringify(result));
      }
      process.stdout.write("\\n${SENTINEL_END}\\n");
    }

    process.stdout.write("${SENTINEL_CASE_END} " + cNum + "\\n");

    if (failed && earlyExit) {
      break;
    }
  }
})();
`;
    return { code: jsHarness, stdin: stdinPayload };
  }

  // 2b. TypeScript (Deno 2.9.7 / TypeScript) Batch Driver Harness
  if (lang === 'typescript' || lang === 'ts') {
    if (
      trimmed.includes('Deno.stdin') ||
      trimmed.includes('readFileSync(0') ||
      trimmed.includes('process.stdin')
    ) {
      return {
        code: userCode,
        stdin: cases.map((c) => c.input).join('\n'),
      };
    }

    const stdinPayload = JSON.stringify({
      earlyExit: Boolean(options.earlyExit),
      cases: cases.map((c) => ({
        caseNumber: c.caseNumber,
        input: c.input,
        expected: options.earlyExit ? c.expected : undefined,
      })),
    });

    const tsHarness = `
${trimmed}

(() => {
  const __caReadStdin = (): string => {
    const denoApi = (globalThis as Record<string, any>).Deno;
    if (denoApi?.stdin?.readSync) {
      const chunks: Uint8Array[] = [];
      let total = 0;
      const buf = new Uint8Array(65536);
      while (true) {
        const n: number | null = denoApi.stdin.readSync(buf);
        if (n === null || n === 0) break;
        const copy = buf.slice(0, n);
        chunks.push(copy);
        total += n;
      }
      const merged = new Uint8Array(total);
      let offset = 0;
      for (const chunk of chunks) {
        merged.set(chunk, offset);
        offset += chunk.length;
      }
      return new TextDecoder().decode(merged);
    }
    const req = (globalThis as Record<string, any>).require;
    if (typeof req === 'function') {
      return String(req('fs').readFileSync(0, 'utf-8'));
    }
    return '';
  };

  const __caWriteStdout = (text: string): void => {
    const denoApi = (globalThis as Record<string, any>).Deno;
    if (denoApi?.stdout?.writeSync) {
      const bytes = new TextEncoder().encode(text);
      let written = 0;
      while (written < bytes.length) {
        written += denoApi.stdout.writeSync(bytes.subarray(written));
      }
      return;
    }
    const proc = (globalThis as Record<string, any>).process;
    if (proc?.stdout?.write) {
      proc.stdout.write(text);
    }
  };

  const __caSplitTopLevel = (raw: string): string[] => {
    const parts: string[] = [];
    let depth = 0;
    let quoted = false;
    let escaped = false;
    let start = 0;
    for (let i = 0; i < raw.length; i += 1) {
      const c = raw[i];
      if (quoted) {
        if (escaped) escaped = false;
        else if (c === '\\\\') escaped = true;
        else if (c === '"') quoted = false;
      } else if (c === '"') {
        quoted = true;
      } else if (c === '[' || c === '{') {
        depth += 1;
      } else if (c === ']' || c === '}') {
        depth -= 1;
      } else if (c === ',' && depth === 0) {
        parts.push(raw.slice(start, i).trim());
        start = i + 1;
      }
    }
    if (start < raw.length) parts.push(raw.slice(start).trim());
    return parts;
  };

  const __caToCamel = (key: string): string =>
    key.replace(/_([a-zA-Z0-9])/g, (_m, ch: string) => ch.toUpperCase());

  const __caParseInput = (rawInput: string): { args: unknown[]; kwargs: Record<string, unknown> } => {
    const raw = rawInput.trim();
    if (!raw) return { args: [], kwargs: {} };

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return { args: parsed, kwargs: {} };
      return { args: [parsed], kwargs: {} };
    } catch (_) {}

    const parts = __caSplitTopLevel(raw);
    const isNamed = parts.some((p) => /^[a-zA-Z_$][\\w$]*\\s*=/.test(p));
    if (isNamed) {
      const kwargs: Record<string, unknown> = {};
      for (const p of parts) {
        const eq = p.indexOf('=');
        if (eq !== -1) {
          const k = p.slice(0, eq).trim();
          const v = p.slice(eq + 1).trim();
          try {
            kwargs[k] = JSON.parse(v);
          } catch (_) {
            kwargs[k] = v;
          }
        }
      }
      return { args: [], kwargs };
    }
    return { args: [raw], kwargs: {} };
  };

  let rawAll = '';
  try {
    rawAll = __caReadStdin().trim();
  } catch (_) {}

  let batchPayload: { earlyExit?: boolean; cases?: Array<{ caseNumber?: number; input?: string }> };
  try {
    batchPayload = JSON.parse(rawAll);
  } catch (_) {
    batchPayload = { earlyExit: false, cases: [{ caseNumber: 1, input: rawAll }] };
  }

  const earlyExit = Boolean(batchPayload.earlyExit);
  const testCases = Array.isArray(batchPayload.cases) ? batchPayload.cases : [];

  for (const tc of testCases) {
    const cNum = tc.caseNumber ?? 1;
    const cInput = tc.input ?? '';
    const caseLogs: string[] = [];

    const origLog = console.log;
    const origWarn = console.warn;
    const origError = console.error;
    const captureLog = (...logArgs: unknown[]) => {
      caseLogs.push(
        logArgs
          .map((a) => (typeof a === 'object' && a !== null ? JSON.stringify(a) : String(a)))
          .join(' '),
      );
    };
    console.log = captureLog;
    console.warn = captureLog;
    console.error = captureLog;

    let failed = false;
    let errMsg = '';
    let result: unknown = undefined;

    try {
      const { args, kwargs } = __caParseInput(cInput);
      let fn: ((...fnArgs: unknown[]) => unknown) | null = null;
      const hint = ${JSON.stringify(options.functionNameHint || '')};

      const candidates = [
        hint,
        'twoSum', 'two_sum', 'isValid', 'is_valid',
        'lengthOfLongestSubstring', 'maxArea', 'findMedianSortedArrays',
        'solution', 'solve',
      ].filter(Boolean);

      for (const name of candidates) {
        try {
          const cand = eval('typeof ' + name + ' === "function" ? ' + name + ' : null');
          if (typeof cand === 'function') {
            fn = cand as (...fnArgs: unknown[]) => unknown;
            break;
          }
        } catch (_) {}
      }

      if (!fn) {
        try {
          const SolCtor = eval('typeof Solution === "function" ? Solution : null');
          if (typeof SolCtor === 'function') {
            const inst = new SolCtor();
            const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(inst)).filter((m) => m !== 'constructor');
            if (hint && typeof inst[hint] === 'function') {
              fn = inst[hint].bind(inst);
            } else if (methods.length > 0 && typeof inst[methods[0]] === 'function') {
              fn = inst[methods[0]].bind(inst);
            }
          }
        } catch (_) {}
      }

      if (!fn) {
        const fnRegex = /(?:function\\s+([a-zA-Z_$][\\w$]*)|(?:const|let|var)\\s+([a-zA-Z_$][\\w$]*)\\s*=\\s*(?:async\\s+)?(?:function|\\([^)]*\\)(?:\\s*:\\s*[^=]+)?\\s*=>|[a-zA-Z_$][\\w$]*\\s*=>))/g;
        let m: RegExpExecArray | null;
        while ((m = fnRegex.exec(${JSON.stringify(trimmed)})) !== null) {
          const declared = m[1] || m[2];
          if (declared && !declared.startsWith('__ca')) {
            try {
              const cand = eval('typeof ' + declared + ' === "function" ? ' + declared + ' : null');
              if (typeof cand === 'function') {
                fn = cand as (...fnArgs: unknown[]) => unknown;
                break;
              }
            } catch (_) {}
          }
        }
      }

      if (!fn) {
        throw new Error('Could not find a valid TypeScript solution function.');
      }

      const kwEntries = Object.entries(kwargs);
      if (kwEntries.length > 0) {
        const normalizedKwargs: Record<string, unknown> = {};
        for (const [k, v] of kwEntries) {
          normalizedKwargs[k] = v;
          normalizedKwargs[__caToCamel(k)] = v;
        }
        const fnStr = fn.toString();
        const paramMatch = fnStr.match(/\\(([^)]*)\\)/);
        const paramNames = paramMatch && paramMatch[1].trim()
          ? paramMatch[1].split(',').map((s) => s.trim().split(/[\\s:=?]/)[0]).filter(Boolean)
          : [];
        if (paramNames.length > 0 && paramNames.every((p) => Object.prototype.hasOwnProperty.call(normalizedKwargs, p))) {
          result = fn(...paramNames.map((p) => normalizedKwargs[p]));
        } else {
          result = fn(...Object.values(kwargs));
        }
      } else if (args.length > 0) {
        result = fn(...args);
      } else {
        result = fn();
      }
    } catch (err) {
      failed = true;
      errMsg = err instanceof Error ? (err.stack || err.message) : String(err);
    } finally {
      console.log = origLog;
      console.warn = origWarn;
      console.error = origError;
    }

    __caWriteStdout("${SENTINEL_CASE_START} " + cNum + "\\n");
    if (caseLogs.length > 0) {
      __caWriteStdout(caseLogs.join('\\n') + '\\n');
    }

    if (failed) {
      __caWriteStdout("${SENTINEL_ERROR_START}\\n" + errMsg + "\\n${SENTINEL_ERROR_END}\\n");
    } else {
      const serialized = result === undefined ? 'null' : JSON.stringify(result);
      __caWriteStdout("${SENTINEL_START}\\n" + serialized + "\\n${SENTINEL_END}\\n");
    }

    __caWriteStdout("${SENTINEL_CASE_END} " + cNum + "\\n");

    if (failed && earlyExit) {
      break;
    }
  }
})();
`;
    return { code: tsHarness, stdin: stdinPayload };
  }

  // 3. Java Batch Driver Harness
  if (lang === 'java') {
    if (trimmed.includes('public static void main(')) {
      return { code: userCode, stdin: cases.map((c) => c.input).join('\n') };
    }

    const stdinPayload = formatDelimitedCasesStdin(cases);

    const javaHarness = `
import java.io.*;
import java.util.*;
import java.lang.reflect.*;

${trimmed}

public class Main {
    ${javaValueCodec}

    private static boolean executeCase(Method target, int caseNum, String raw) {
        ByteArrayOutputStream userLogStream = new ByteArrayOutputStream();
        PrintStream originalOut = System.out;
        System.setOut(new PrintStream(userLogStream));

        boolean failed = false;
        String errMsg = "";
        Object res = null;

        try {
            Solution sol = new Solution();
            Type[] paramTypes = target.getGenericParameterTypes();
            Object[] callArgs = new Object[paramTypes.length];

            List<String> rawTokens = splitTokens(raw);
            for (int i = 0; i < rawTokens.size(); i++) {
                String token = rawTokens.get(i);
                int equals = token.indexOf('=');
                if (equals >= 0 && token.substring(0, equals).trim().matches("[a-zA-Z_][a-zA-Z_0-9]*")) {
                    rawTokens.set(i, token.substring(equals + 1).trim());
                }
            }
            if (rawTokens.size() != paramTypes.length) throw new IllegalArgumentException("Wrong number of arguments");
            for (int i = 0; i < paramTypes.length; i++) {
                String t = i < rawTokens.size() ? rawTokens.get(i) : "";
                callArgs[i] = parseToken(t, paramTypes[i]);
            }

            target.setAccessible(true);
            res = target.invoke(sol, callArgs);
        } catch (InvocationTargetException ite) {
            failed = true;
            Throwable cause = ite.getCause() != null ? ite.getCause() : ite;
            errMsg = cause.toString();
        } catch (Exception ex) {
            failed = true;
            errMsg = ex.toString();
        } finally {
            System.setOut(originalOut);
        }

        System.out.println("${SENTINEL_CASE_START} " + caseNum);
        String userLogs = userLogStream.toString();
        if (!userLogs.isEmpty()) {
            System.out.print(userLogs);
            if (!userLogs.endsWith("\\n")) System.out.println();
        }

        if (failed) {
            System.out.println("${SENTINEL_ERROR_START}");
            System.out.println(errMsg);
            System.out.println("${SENTINEL_ERROR_END}");
        } else {
            System.out.println("${SENTINEL_START}");
            System.out.println(serializeResult(res));
            System.out.println("${SENTINEL_END}");
        }
        System.out.println("${SENTINEL_CASE_END} " + caseNum);

        return !failed;
    }

    public static void main(String[] args) {
        try {
            Solution sol = new Solution();
            Method[] methods = Solution.class.getDeclaredMethods();
            Method target = null;
            String hint = ${JSON.stringify(options.functionNameHint || '')};
            for (Method m : methods) {
                if ((hint.isEmpty() || m.getName().equals(hint)) && Modifier.isPublic(m.getModifiers()) && !Modifier.isStatic(m.getModifiers())) {
                    target = m;
                    break;
                }
            }
            if (hint.isEmpty() && target == null && methods.length > 0) target = methods[0];
            if (target == null) throw new RuntimeException("No callable method found on class Solution.");

            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            String line;
            int currentCaseNum = 1;
            StringBuilder currentCaseInput = new StringBuilder();
            boolean hasCase = false;
            boolean earlyExit = ${Boolean(options.earlyExit)};

            while ((line = reader.readLine()) != null) {
                if (line.startsWith("${SENTINEL_CASE_DELIMITER}")) {
                    if (hasCase) {
                        boolean ok = executeCase(target, currentCaseNum, currentCaseInput.toString().trim());
                        if (!ok && earlyExit) return;
                        currentCaseInput = new StringBuilder();
                    }
                    String numStr = line.substring(${SENTINEL_CASE_DELIMITER.length}).trim();
                    try { currentCaseNum = Integer.parseInt(numStr); } catch (Exception e) { currentCaseNum = 1; }
                    hasCase = true;
                } else {
                    currentCaseInput.append(line).append(" ");
                }
            }

            if (hasCase) {
                executeCase(target, currentCaseNum, currentCaseInput.toString().trim());
            } else if (currentCaseInput.length() > 0) {
                executeCase(target, 1, currentCaseInput.toString().trim());
            }
        } catch (Exception ex) {
            System.err.println(ex.toString());
            System.exit(1);
        }
    }
}
`;
    return { code: javaHarness, stdin: stdinPayload };
  }

  // 4. C++ Batch Driver Harness
  if (lang === 'cpp' || lang === 'c++') {
    if (trimmed.includes('int main(') || trimmed.includes('main()')) {
      return { code: userCode, stdin: cases.map((c) => c.input).join('\n') };
    }

    const stdinPayload = formatDelimitedCasesStdin(cases);

    const method = options.functionNameHint || trimmed.match(/^\s*[\w:<>&* ]+\s+(\w+)\([^\n]*\)\s*\{/m)?.[1];
    const cppDispatchBody = method && /^[a-zA-Z_]\w*$/.test(method)
      ? 'CodeArenaHelper::invoke(sol, &Solution::' + method + ', tokens);'
      : 'throw std::invalid_argument("No Solution entry point found");';

    const cppHarness = `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
#include <map>
#include <set>
#include <cctype>
#include <iomanip>
#include <optional>
#include <tuple>
#include <type_traits>

${trimmed}

namespace CodeArenaHelper {
    static std::string trim(const std::string& str) {
        size_t first = str.find_first_not_of(" \\t\\n\\r");
        if (first == std::string::npos) return "";
        size_t last = str.find_last_not_of(" \\t\\n\\r");
        return str.substr(first, (last - first + 1));
    }

    ${cppValueCodec}
}

int main() {
    std::string line;
    int currentCaseNum = 1;
    std::string currentCaseInput = "";
    bool hasCase = false;
    bool earlyExit = ${Boolean(options.earlyExit)};

    auto runCase = [](int caseNum, const std::string& raw) -> bool {
        std::string rawInput = CodeArenaHelper::trim(raw);
        auto tokens = CodeArenaHelper::split(rawInput);
        for (auto& token : tokens) {
            size_t eq = token.find('=');
            if (eq != std::string::npos && token.find('"') > eq && token.find('[') > eq) {
                token = CodeArenaHelper::trim(token.substr(eq + 1));
            }
        }

        std::cout << "${SENTINEL_CASE_START} " << caseNum << "\\n";
        bool passed = true;
        try {
            Solution sol;
            std::cout << "${SENTINEL_START}\\n";
            ${cppDispatchBody}
            std::cout << "${SENTINEL_END}\\n";
        } catch (const std::exception& e) {
            passed = false;
            std::cout << "${SENTINEL_ERROR_START}\\n" << e.what() << "\\n${SENTINEL_ERROR_END}\\n";
        }
        std::cout << "${SENTINEL_CASE_END} " << caseNum << "\\n";
        return passed;
    };

    while (std::getline(std::cin, line)) {
        if (line.rfind("${SENTINEL_CASE_DELIMITER}", 0) == 0) {
            if (hasCase) {
                bool ok = runCase(currentCaseNum, currentCaseInput);
                if (!ok && earlyExit) return 0;
                currentCaseInput = "";
            }
            try {
                currentCaseNum = std::stoi(line.substr(${SENTINEL_CASE_DELIMITER.length}));
            } catch (...) {
                currentCaseNum = 1;
            }
            hasCase = true;
        } else {
            currentCaseInput += line + " ";
        }
    }

    if (hasCase) {
        runCase(currentCaseNum, currentCaseInput);
    } else if (!currentCaseInput.empty()) {
        runCase(1, currentCaseInput);
    }

    return 0;
}
`;
    return { code: cppHarness, stdin: stdinPayload };
  }

  // 4b. C (GCC 15) Batch Driver Harness
  if (lang === 'c' || lang === 'gcc') {
    if (/\b(?:int|void)\s+main\s*\(/.test(trimmed)) {
      return { code: userCode, stdin: cases.map((c) => c.input).join('\n') };
    }

    const stdinPayload = formatDelimitedCasesStdin(cases);
    const sig = parseCEntrySignature(trimmed, options.functionNameHint);
    const invocationBody = buildCInvocationBlock(sig);

    const cHarness = `
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <stdint.h>
#include <limits.h>
#include <ctype.h>
#include <math.h>

#ifndef OPTIONAL_INT_DEFINED
#define OPTIONAL_INT_DEFINED
typedef struct {
    bool hasValue;
    int value;
} OptionalInt;
#endif

${trimmed}

${cValueCodec}

static char* ca_read_all_stdin(void) {
    size_t cap = 4096;
    size_t len = 0;
    char* buf = (char*)malloc(cap);
    if (!buf) return NULL;
    size_t n;
    while ((n = fread(buf + len, 1, cap - len - 1, stdin)) > 0) {
        len += n;
        if (cap - len - 1 < 1024) {
            cap *= 2;
            buf = (char*)realloc(buf, cap);
            if (!buf) return NULL;
        }
    }
    buf[len] = '\\0';
    return buf;
}

static bool ca_run_case(int caseNum, const char* raw) {
    printf("${SENTINEL_CASE_START} %d\\n", caseNum);
    fflush(stdout);

    int tokenCount = 0;
    char** tokens = ca_split_top_level(raw, &tokenCount);
    bool ok = false;
    {
        ${invocationBody}
    }
}

int main(void) {
    char* all = ca_read_all_stdin();
    if (!all) return 1;

    const char* delim = "${SENTINEL_CASE_DELIMITER}";
    size_t delimLen = strlen(delim);
    bool earlyExit = ${Boolean(options.earlyExit)};

    int currentCaseNum = 1;
    bool hasCase = false;
    size_t caseCap = 1024;
    size_t caseLen = 0;
    char* caseBuf = (char*)malloc(caseCap);
    caseBuf[0] = '\\0';

    char* cursor = all;
    while (*cursor) {
        char* nl = strchr(cursor, '\\n');
        size_t lineLen = nl ? (size_t)(nl - cursor) : strlen(cursor);
        if (lineLen > 0 && cursor[lineLen - 1] == '\\r') lineLen--;

        if (lineLen >= delimLen && strncmp(cursor, delim, delimLen) == 0) {
            if (hasCase) {
                bool ok = ca_run_case(currentCaseNum, caseBuf);
                printf("${SENTINEL_CASE_END} %d\\n", currentCaseNum);
                fflush(stdout);
                if (!ok && earlyExit) {
                    free(caseBuf);
                    free(all);
                    return 0;
                }
            }
            char* numBuf = ca_strdup_slice(cursor + delimLen, lineLen - delimLen);
            currentCaseNum = atoi(numBuf);
            if (currentCaseNum <= 0) currentCaseNum = 1;
            free(numBuf);
            hasCase = true;
            caseLen = 0;
            caseBuf[0] = '\\0';
        } else {
            if (caseLen + lineLen + 2 >= caseCap) {
                while (caseLen + lineLen + 2 >= caseCap) caseCap *= 2;
                caseBuf = (char*)realloc(caseBuf, caseCap);
            }
            if (lineLen > 0) {
                memcpy(caseBuf + caseLen, cursor, lineLen);
                caseLen += lineLen;
            }
            caseBuf[caseLen++] = ' ';
            caseBuf[caseLen] = '\\0';
        }

        if (!nl) break;
        cursor = nl + 1;
    }

    if (hasCase) {
        ca_run_case(currentCaseNum, caseBuf);
        printf("${SENTINEL_CASE_END} %d\\n", currentCaseNum);
        fflush(stdout);
    } else if (caseLen > 0) {
        ca_run_case(1, caseBuf);
        printf("${SENTINEL_CASE_END} 1\\n");
        fflush(stdout);
    }

    free(caseBuf);
    free(all);
    return 0;
}
`;
    return { code: cHarness, stdin: stdinPayload };
  }

  // 4c. Go (Go 1.26) Batch Driver Harness
  if (lang === 'go' || lang === 'golang') {
    if (/\bfunc\s+main\s*\(/.test(trimmed)) {
      return { code: userCode, stdin: cases.map((c) => c.input).join('\n') };
    }

    const stdinPayload = formatDelimitedCasesStdin(cases);
    const prepared = prepareGoUserSource(trimmed, options.functionNameHint);

    const goInvokeBody = prepared.entryFn
      ? `
	fnVal := __caReflect.ValueOf(${prepared.entryFn})
	fnType := fnVal.Type()
	if len(tokens) != fnType.NumIn() {
		__caFmt.Printf("${SENTINEL_ERROR_START}\\nWrong number of arguments: expected %d, got %d\\n${SENTINEL_ERROR_END}\\n", fnType.NumIn(), len(tokens))
		__caFmt.Printf("${SENTINEL_CASE_END} %d\\n", caseNum)
		return false
	}
	callArgs := make([]__caReflect.Value, fnType.NumIn())
	for i := 0; i < fnType.NumIn(); i++ {
		parsed, err := caParseValue(tokens[i], fnType.In(i))
		if err != nil {
			__caFmt.Printf("${SENTINEL_ERROR_START}\\n%s\\n${SENTINEL_ERROR_END}\\n", err.Error())
			__caFmt.Printf("${SENTINEL_CASE_END} %d\\n", caseNum)
			return false
		}
		callArgs[i] = parsed
	}
	var outs []__caReflect.Value
	var panicErr string
	func() {
		defer func() {
			if r := recover(); r != nil {
				panicErr = __caFmt.Sprintf("Runtime panic: %v", r)
			}
		}()
		outs = fnVal.Call(callArgs)
	}()
	if panicErr != "" {
		__caFmt.Printf("\\n${SENTINEL_ERROR_START}\\n%s\\n${SENTINEL_ERROR_END}\\n", panicErr)
		__caFmt.Printf("${SENTINEL_CASE_END} %d\\n", caseNum)
		return false
	}
	serialized := "null"
	if len(outs) > 0 {
		serialized = caSerializeValue(outs[0])
	}
	__caFmt.Printf("\\n${SENTINEL_START}\\n%s\\n${SENTINEL_END}\\n", serialized)
	__caFmt.Printf("${SENTINEL_CASE_END} %d\\n", caseNum)
	return true
`
      : `
	__caFmt.Printf("${SENTINEL_ERROR_START}\\nCould not find a valid Go solution function to execute.\\n${SENTINEL_ERROR_END}\\n")
	__caFmt.Printf("${SENTINEL_CASE_END} %d\\n", caseNum)
	return false
`;

    const goHarness = `
package main

${prepared.userImports}

import (
	__caBufio "bufio"
	__caBytes "bytes"
	__caJson "encoding/json"
	__caFmt "fmt"
	__caOs "os"
	__caReflect "reflect"
	__caStrconv "strconv"
	__caStrings "strings"
)

${prepared.userBody}

${goValueCodec}

func caRunCase(caseNum int, raw string) bool {
	__caFmt.Printf("${SENTINEL_CASE_START} %d\\n", caseNum)
	tokens := caSplitTokens(raw)
	${goInvokeBody}
}

func main() {
	reader := __caBufio.NewReaderSize(__caOs.Stdin, 65536)
	currentCaseNum := 1
	var currentInput __caStrings.Builder
	hasCase := false
	earlyExit := ${Boolean(options.earlyExit)}

	for {
		line, err := reader.ReadString('\\n')
		if len(line) > 0 {
			clean := __caStrings.TrimRight(line, "\\r\\n")
			if __caStrings.HasPrefix(clean, "${SENTINEL_CASE_DELIMITER}") {
				if hasCase {
					ok := caRunCase(currentCaseNum, currentInput.String())
					if !ok && earlyExit {
						return
					}
					currentInput.Reset()
				}
				numPart := __caStrings.TrimSpace(clean[${SENTINEL_CASE_DELIMITER.length}:])
				if parsedNum, convErr := __caStrconv.Atoi(numPart); convErr == nil {
					currentCaseNum = parsedNum
				} else {
					currentCaseNum = 1
				}
				hasCase = true
			} else {
				currentInput.WriteString(clean)
				currentInput.WriteByte(' ')
			}
		}
		if err != nil {
			break
		}
	}

	if hasCase {
		caRunCase(currentCaseNum, currentInput.String())
	} else if currentInput.Len() > 0 {
		caRunCase(1, currentInput.String())
	}
}
`;
    return { code: goHarness, stdin: stdinPayload };
  }

  // 4d. Rust (Rust 1.93) Batch Driver Harness
  if (lang === 'rust' || lang === 'rs') {
    if (/\bfn\s+main\s*\(/.test(trimmed)) {
      return { code: userCode, stdin: cases.map((c) => c.input).join('\n') };
    }

    const stdinPayload = formatDelimitedCasesStdin(cases);
    const sig = parseRustEntrySignature(trimmed, options.functionNameHint);
    const invocationBody = buildRustInvocationBlock(sig);

    const rustHarness = `
#![allow(non_snake_case, unused_imports, dead_code, unused_variables, unused_mut)]

${trimmed}

${rustValueCodec}

fn ca_run_case(case_num: i64, raw: &str) -> bool {
    println!("${SENTINEL_CASE_START} {}", case_num);
    let _ = std::io::Write::flush(&mut std::io::stdout());
    let tokens = __ca_codec::split_tokens(raw);
    let ok = {
        ${invocationBody}
    };
    println!("${SENTINEL_CASE_END} {}", case_num);
    let _ = std::io::Write::flush(&mut std::io::stdout());
    ok
}

fn main() {
    use std::io::Read;
    let mut raw_all = String::new();
    let _ = std::io::stdin().read_to_string(&mut raw_all);

    let delim = "${SENTINEL_CASE_DELIMITER}";
    let early_exit = ${Boolean(options.earlyExit)};
    let mut current_case_num: i64 = 1;
    let mut current_input = String::new();
    let mut has_case = false;

    for line in raw_all.lines() {
        if let Some(rest) = line.strip_prefix(delim) {
            if has_case {
                let ok = ca_run_case(current_case_num, &current_input);
                if !ok && early_exit {
                    return;
                }
                current_input.clear();
            }
            current_case_num = rest.trim().parse::<i64>().unwrap_or(1);
            has_case = true;
        } else {
            current_input.push_str(line);
            current_input.push(' ');
        }
    }

    if has_case {
        ca_run_case(current_case_num, &current_input);
    } else if !current_input.trim().is_empty() {
        ca_run_case(1, &current_input);
    }
}
`;
    return { code: rustHarness, stdin: stdinPayload };
  }

  // 5. SQL Batch Driver Harness (SQLite 3 / DuckDB)
  if (lang === 'sql' || lang === 'sqlite' || lang === 'duckdb') {
    let script = `.mode list\n.separator |\n.nullvalue null\n`;
    for (const c of cases) {
      if (c.input && c.input.trim()) {
        const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)/gi;
        let m: RegExpExecArray | null;
        while ((m = tableRegex.exec(c.input)) !== null) {
          script += `DROP TABLE IF EXISTS ${m[1]};\n`;
        }
      }
      script += `\n.print ${SENTINEL_CASE_START} ${c.caseNumber}\n.print ${SENTINEL_START}\n`;
      if (c.input && c.input.trim()) {
        script += `${c.input.trim()}\n`;
      }
      script += `${trimmed}${trimmed.endsWith(';') ? '' : ';'}\n`;
      script += `.print ${SENTINEL_END}\n.print ${SENTINEL_CASE_END} ${c.caseNumber}\n`;
    }
    return { code: script, stdin: '' };
  }

  // Fallback for other languages
  return {
    code: userCode,
    stdin: cases.map((c) => c.input).join('\n'),
  };
}

/**
 * Backward-compatible single-input execution source builder.
 */
export function buildExecutionSource(
  language: string,
  userCode: string,
  input: string,
  functionNameHint?: string,
): HarnessResult {
  return buildBatchExecutionSource(
    language,
    userCode,
    [{ caseNumber: 1, input, expected: '' }],
    { functionNameHint }
  );
}
