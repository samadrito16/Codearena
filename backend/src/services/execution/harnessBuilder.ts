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
 * Serializes test cases into line-delimited format for languages without a built-in JSON parser (e.g. Java, C++).
 */
function formatDelimitedCasesStdin(testCases: TestCaseInput[]): string {
  return testCases
    .map((tc) => `${SENTINEL_CASE_DELIMITER} ${tc.caseNumber}\n${tc.input}`)
    .join('\n');
}

/**
 * Builds execution source code with driver harnesses for Python, JavaScript/TypeScript,
 * Java, and C++, supporting multi-testcase batch execution in a SINGLE container invocation.
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
    if (trimmed.includes('sys.stdin.read') && trimmed.includes('__main__')) {
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
        expected: c.expected,
      })),
    });

    const pythonHarness = `
# -*- coding: utf-8 -*-
import sys, json, re, inspect, io, time

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
                    if v_str == 'true': scope[k] = True
                    elif v_str == 'false': scope[k] = False
                    elif v_str == 'null': scope[k] = None
                    else: scope[k] = v_str
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

  // 2. JavaScript / TypeScript Batch Driver Harness
  if (lang === 'javascript' || lang === 'typescript' || lang === 'node') {
    if (trimmed.includes('process.stdin') && trimmed.includes('readFileSync(0')) {
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
        expected: c.expected,
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
    private static Object parseToken(String s, Class<?> targetType) {
        s = s.trim();
        if (targetType == int.class || targetType == Integer.class) {
            return Integer.parseInt(s);
        }
        if (targetType == long.class || targetType == Long.class) {
            return Long.parseLong(s);
        }
        if (targetType == double.class || targetType == Double.class) {
            return Double.parseDouble(s);
        }
        if (targetType == boolean.class || targetType == Boolean.class) {
            return Boolean.parseBoolean(s);
        }
        if (targetType == String.class) {
            if (s.startsWith("\\\"") && s.endsWith("\\\"") && s.length() >= 2) {
                return s.substring(1, s.length() - 1);
            }
            return s;
        }
        if (targetType == int[].class) {
            if (s.startsWith("[") && s.endsWith("]")) {
                s = s.substring(1, s.length() - 1).trim();
            }
            if (s.isEmpty()) return new int[0];
            String[] tokens = s.split(",");
            int[] arr = new int[tokens.length];
            for (int i = 0; i < tokens.length; i++) {
                arr[i] = Integer.parseInt(tokens[i].trim());
            }
            return arr;
        }
        if (targetType == String[].class) {
            if (s.startsWith("[") && s.endsWith("]")) {
                s = s.substring(1, s.length() - 1).trim();
            }
            if (s.isEmpty()) return new String[0];
            String[] tokens = s.split(",");
            String[] arr = new String[tokens.length];
            for (int i = 0; i < tokens.length; i++) {
                String t = tokens[i].trim();
                if (t.startsWith("\\\"") && t.endsWith("\\\"") && t.length() >= 2) {
                    t = t.substring(1, t.length() - 1);
                }
                arr[i] = t;
            }
            return arr;
        }
        return s;
    }

    private static String serializeResult(Object obj) {
        if (obj == null) return "null";
        if (obj instanceof int[]) {
            return Arrays.toString((int[]) obj);
        }
        if (obj instanceof boolean[]) {
            return Arrays.toString((boolean[]) obj);
        }
        if (obj instanceof Object[]) {
            return Arrays.deepToString((Object[]) obj);
        }
        if (obj instanceof Boolean) {
            return (Boolean) obj ? "true" : "false";
        }
        if (obj instanceof String) {
            return "\\\"" + obj.toString() + "\\\"";
        }
        return obj.toString();
    }

    private static boolean executeCase(Method target, int caseNum, String raw) {
        ByteArrayOutputStream userLogStream = new ByteArrayOutputStream();
        PrintStream originalOut = System.out;
        System.setOut(new PrintStream(userLogStream));

        boolean failed = false;
        String errMsg = "";
        Object res = null;

        try {
            Solution sol = new Solution();
            Class<?>[] paramTypes = target.getParameterTypes();
            Object[] callArgs = new Object[paramTypes.length];

            List<String> rawTokens = new ArrayList<>();
            if (raw.contains("=")) {
                String[] parts = raw.split(",\\\\s*(?=[a-zA-Z_]\\\\w*\\\\s*=)");
                for (String p : parts) {
                    int eq = p.indexOf('=');
                    if (eq != -1) rawTokens.add(p.substring(eq + 1).trim());
                    else rawTokens.add(p.trim());
                }
            } else {
                int depth = 0;
                StringBuilder cur = new StringBuilder();
                for (int i = 0; i < raw.length(); i++) {
                    char c = raw.charAt(i);
                    if (c == '[' || c == '{') depth++;
                    else if (c == ']' || c == '}') depth--;
                    else if (c == ',' && depth == 0) {
                        rawTokens.add(cur.toString().trim());
                        cur = new StringBuilder();
                        continue;
                    }
                    cur.append(c);
                }
                if (cur.length() > 0) rawTokens.add(cur.toString().trim());
            }

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
            for (Method m : methods) {
                if (Modifier.isPublic(m.getModifiers()) && !Modifier.isStatic(m.getModifiers())) {
                    target = m;
                    break;
                }
            }
            if (target == null && methods.length > 0) target = methods[0];
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
  if (lang === 'cpp' || lang === 'c++' || lang === 'c') {
    if (trimmed.includes('int main(') || trimmed.includes('main()')) {
      return { code: userCode, stdin: cases.map((c) => c.input).join('\n') };
    }

    const stdinPayload = formatDelimitedCasesStdin(cases);

    const hasTwoSum = trimmed.includes('twoSum') || options.functionNameHint === 'twoSum';
    const hasIsValid = trimmed.includes('isValid') || options.functionNameHint === 'isValid';
    const hasLengthOfLongestSubstring = trimmed.includes('lengthOfLongestSubstring') || options.functionNameHint === 'lengthOfLongestSubstring';

    let cppDispatchBody = '';
    if (hasTwoSum) {
      cppDispatchBody = `
            if (tokens.size() >= 2) {
                auto arr = CodeArenaHelper::parseIntArray(tokens[0]);
                int target = 0;
                try { target = std::stoi(tokens[1]); } catch (...) {}
                auto ans = sol.twoSum(arr, target);
                std::cout << "[";
                for (size_t i = 0; i < ans.size(); i++) {
                    if (i > 0) std::cout << ",";
                    std::cout << ans[i];
                }
                std::cout << "]\\n";
            } else {
                std::cout << "[]\\n";
            }
      `;
    } else if (hasIsValid) {
      cppDispatchBody = `
            std::string s = CodeArenaHelper::parseString(tokens[0]);
            bool b = sol.isValid(s);
            std::cout << (b ? "true" : "false") << "\\n";
      `;
    } else if (hasLengthOfLongestSubstring) {
      cppDispatchBody = `
            std::string s = CodeArenaHelper::parseString(tokens[0]);
            int len = sol.lengthOfLongestSubstring(s);
            std::cout << len << "\\n";
      `;
    } else {
      cppDispatchBody = `
            std::cout << "null\\n";
      `;
    }

    const cppHarness = `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
#include <map>
#include <set>
#include <cctype>

${trimmed}

namespace CodeArenaHelper {
    static std::string trim(const std::string& str) {
        size_t first = str.find_first_not_of(" \\t\\n\\r");
        if (first == std::string::npos) return "";
        size_t last = str.find_last_not_of(" \\t\\n\\r");
        return str.substr(first, (last - first + 1));
    }

    static std::vector<int> parseIntArray(std::string s) {
        s = trim(s);
        if (!s.empty() && s.front() == '[') s = s.substr(1);
        if (!s.empty() && s.back() == ']') s.pop_back();
        std::vector<int> res;
        std::stringstream ss(s);
        std::string token;
        while (std::getline(ss, token, ',')) {
            token = trim(token);
            if (!token.empty()) {
                try { res.push_back(std::stoi(token)); } catch (...) {}
            }
        }
        return res;
    }

    static std::string parseString(std::string s) {
        s = trim(s);
        if (s.size() >= 2 && s.front() == '"' && s.back() == '"') {
            return s.substr(1, s.size() - 2);
        }
        return s;
    }
}

int main() {
    std::string line;
    int currentCaseNum = 1;
    std::string currentCaseInput = "";
    bool hasCase = false;
    bool earlyExit = ${Boolean(options.earlyExit)};

    auto runCase = [](int caseNum, const std::string& raw) -> bool {
        std::string rawInput = CodeArenaHelper::trim(raw);
        std::vector<std::string> tokens;
        int depth = 0;
        std::string current = "";
        for (size_t i = 0; i < rawInput.size(); i++) {
            char c = rawInput[i];
            if (c == '[' || c == '{' || c == '(') depth++;
            else if (c == ']' || c == '}' || c == ')') depth--;

            if (depth == 0 && c == ',') {
                size_t eq = current.find('=');
                if (eq != std::string::npos) tokens.push_back(CodeArenaHelper::trim(current.substr(eq + 1)));
                else tokens.push_back(CodeArenaHelper::trim(current));
                current = "";
            } else {
                current += c;
            }
        }
        if (!current.empty()) {
            size_t eq = current.find('=');
            if (eq != std::string::npos) tokens.push_back(CodeArenaHelper::trim(current.substr(eq + 1)));
            else tokens.push_back(CodeArenaHelper::trim(current));
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
