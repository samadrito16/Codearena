import { SENTINEL_START, SENTINEL_END } from './types.js';

export interface HarnessResult {
  code: string;
  stdin: string;
}

/**
 * Escapes strings safely for interpolation inside string literals.
 */
function escapeString(str: string): string {
  return JSON.stringify(str).slice(1, -1);
}

/**
 * Builds execution source code with driver harnesses for Python, JavaScript/TypeScript,
 * Java, and C++.
 */
export function buildExecutionSource(
  language: string,
  userCode: string,
  input: string,
  functionNameHint?: string,
): HarnessResult {
  const lang = language.toLowerCase().trim();
  const trimmed = userCode.trim();

  // 1. Python Driver Harness
  if (lang === 'python') {
    // If the user already wrote their own stdin reader / main, don't re-wrap
    if (trimmed.includes('sys.stdin.read') && trimmed.includes('__main__')) {
      return { code: userCode, stdin: input };
    }

    const pythonHarness = `
# -*- coding: utf-8 -*-
import sys, json, re, inspect, io

${trimmed}

def _parse_py_input(raw):
    if not raw:
        return [], {}
    raw = raw.strip()

    # Try JSON array of positional args first e.g. [[2, 7, 11, 15], 9]
    try:
        data = json.loads(raw)
        if isinstance(data, list):
            return data, {}
        return [data], {}
    except Exception:
        pass

    # Try parsing named variables e.g. nums = [2, 7, 11, 15], target = 9
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
                    # Fallback for Python booleans or string literals without double quotes
                    if v_str == 'true': scope[k] = True
                    elif v_str == 'false': scope[k] = False
                    elif v_str == 'null': scope[k] = None
                    else:
                        scope[k] = v_str
        return [], scope

    # Fallback to single string or integer
    return [raw], {}

def _run_driver():
    user_stdout_buffer = io.StringIO()
    real_stdout = sys.stdout
    sys.stdout = user_stdout_buffer

    try:
        raw = sys.stdin.read().strip()
        args, kwargs = _parse_py_input(raw)

        fn = None
        # Check for Solution class
        if 'Solution' in globals() and isinstance(globals()['Solution'], type):
            try:
                sol = globals()['Solution']()
                # Find the primary public solution method
                methods = [m for m in dir(sol) if not m.startswith('_') and callable(getattr(sol, m))]
                hint = ${JSON.stringify(functionNameHint || '')}
                if hint and hasattr(sol, hint):
                    fn = getattr(sol, hint)
                elif methods:
                    fn = getattr(sol, methods[0])
            except Exception:
                pass

        # Standalone function fallback
        if fn is None:
            candidates = [
                'two_sum', 'twoSum', 'is_valid', 'isValid',
                'length_of_longest_substring', 'lengthOfLongestSubstring',
                'max_area', 'maxArea', 'find_median_sorted_arrays',
                'findMedianSortedArrays', 'solution', 'solve'
            ]
            hint_name = ${JSON.stringify(functionNameHint || '')}
            if hint_name:
                candidates.insert(0, hint_name)

            for cand in candidates:
                if cand in globals() and callable(globals()[cand]):
                    fn = globals()[cand]
                    break

        if fn is None:
            reserved = {'sys', 'json', 're', 'inspect', 'io', '_parse_py_input', '_run_driver', 'Solution'}
            for name, val in list(globals().items()):
                if callable(val) and not name.startswith('_') and name not in reserved:
                    fn = val
                    break

        if fn is None:
            raise RuntimeError("Could not find a valid solution method or function to execute.")

        # Match parameters
        sig = inspect.signature(fn)
        param_names = list(sig.parameters.keys())
        # Filter self
        if param_names and param_names[0] == 'self':
            param_names = param_names[1:]

        if kwargs:
            # Match kwargs by name
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

        # Restore real stdout and flush any debug user logs
        sys.stdout = real_stdout
        user_logs = user_stdout_buffer.getvalue()
        if user_logs:
            sys.stdout.write(user_logs)
            if not user_logs.endswith('\\n'):
                sys.stdout.write('\\n')

        # Output sentinel wrapped return value
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

    except Exception as e:
        sys.stdout = real_stdout
        user_logs = user_stdout_buffer.getvalue()
        if user_logs:
            sys.stdout.write(user_logs + '\\n')
        import traceback
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    _run_driver()
`;
    return { code: pythonHarness, stdin: input };
  }

  // 2. JavaScript / TypeScript Driver Harness
  if (lang === 'javascript' || lang === 'typescript') {
    if (trimmed.includes('process.stdin') && trimmed.includes('readFileSync(0')) {
      return { code: userCode, stdin: input };
    }

    const jsHarness = `
${trimmed}

(function() {
  const fs = require('fs');
  const userLogs = [];
  const origLog = console.log;
  const origWarn = console.warn;
  const origError = console.error;

  console.log = function(...args) {
    userLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
  };
  console.warn = console.log;
  console.error = console.log;

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

  try {
    let rawInput = '';
    try { rawInput = fs.readFileSync(0, 'utf-8').trim(); } catch (_) {}
    const { args, kwargs } = parseInput(rawInput);

    let fn = null;
    if (typeof Solution === 'function') {
      try {
        const inst = new Solution();
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(inst)).filter(m => m !== 'constructor');
        const hint = ${JSON.stringify(functionNameHint || '')};
        if (hint && typeof inst[hint] === 'function') {
          fn = inst[hint].bind(inst);
        } else if (methods.length > 0) {
          fn = inst[methods[0]].bind(inst);
        }
      } catch (_) {}
    }

    if (!fn) {
      const candidates = [
        ${JSON.stringify(functionNameHint || '')},
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

    let result;
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

    if (userLogs.length > 0) {
      process.stdout.write(userLogs.join('\\n') + '\\n');
    }

    process.stdout.write("${SENTINEL_START}\\n");
    if (result === undefined) {
      process.stdout.write("null");
    } else {
      process.stdout.write(JSON.stringify(result));
    }
    process.stdout.write("\\n${SENTINEL_END}\\n");
  } catch (err) {
    if (userLogs.length > 0) {
      process.stdout.write(userLogs.join('\\n') + '\\n');
    }
    process.stderr.write(err && err.stack ? err.stack : String(err));
    process.exit(1);
  }
})();
`;
    return { code: jsHarness, stdin: input };
  }

  // 3. Java Driver Harness
  if (lang === 'java') {
    if (trimmed.includes('public static void main(')) {
      return { code: userCode, stdin: input };
    }

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

    public static void main(String[] args) {
        ByteArrayOutputStream userLogStream = new ByteArrayOutputStream();
        PrintStream originalOut = System.out;
        System.setOut(new PrintStream(userLogStream));

        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append(" ");
            }
            String raw = sb.toString().trim();

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

            Class<?>[] paramTypes = target.getParameterTypes();
            Object[] callArgs = new Object[paramTypes.length];

            // Parse raw input e.g. nums = [2,7,11,15], target = 9 or [2,7,11,15] 9
            List<String> rawTokens = new ArrayList<>();
            if (raw.contains("=")) {
                String[] parts = raw.split(",\\\\s*(?=[a-zA-Z_]\\\\w*\\\\s*=)");
                for (String p : parts) {
                    int eq = p.indexOf('=');
                    if (eq != -1) rawTokens.add(p.substring(eq + 1).trim());
                    else rawTokens.add(p.trim());
                }
            } else {
                // Split by comma outside brackets
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
            Object res = target.invoke(sol, callArgs);

            System.setOut(originalOut);
            String userLogs = userLogStream.toString();
            if (!userLogs.isEmpty()) System.out.print(userLogs);

            System.out.println("${SENTINEL_START}");
            System.out.println(serializeResult(res));
            System.out.println("${SENTINEL_END}");
        } catch (InvocationTargetException ite) {
            System.setOut(originalOut);
            Throwable cause = ite.getCause() != null ? ite.getCause() : ite;
            System.err.println(cause.toString());
            System.exit(1);
        } catch (Exception ex) {
            System.setOut(originalOut);
            System.err.println(ex.toString());
            System.exit(1);
        }
    }
}
`;
    return { code: javaHarness, stdin: input };
  }

  // 4. C++ Driver Harness
  if (lang === 'cpp' || lang === 'c++') {
    if (trimmed.includes('int main(') || trimmed.includes('main()')) {
      return { code: userCode, stdin: input };
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
    std::string rawInput;
    {
        std::string line;
        while (std::getline(std::cin, line)) {
            rawInput += line + " ";
        }
    }
    rawInput = CodeArenaHelper::trim(rawInput);

    std::vector<std::string> tokens;
    if (rawInput.find('=') != std::string::npos) {
        // Parse named pairs
        size_t pos = 0;
        while (pos < rawInput.size()) {
            size_t eq = rawInput.find('=', pos);
            if (eq == std::string::npos) break;
            size_t comma = rawInput.find(',', eq);
            if (comma == std::string::npos) comma = rawInput.size();
            tokens.push_back(CodeArenaHelper::trim(rawInput.substr(eq + 1, comma - (eq + 1))));
            pos = comma + 1;
        }
    } else {
        tokens.push_back(rawInput);
    }

    try {
        Solution sol;
        std::cout << "${SENTINEL_START}\\n";
        // Attempt invocation
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
        } else if (tokens.size() == 1) {
            std::string s = CodeArenaHelper::parseString(tokens[0]);
            // If bool return e.g. isValid
            try {
                bool b = sol.isValid(s);
                std::cout << (b ? "true" : "false") << "\\n";
            } catch (...) {
                try {
                    int len = sol.lengthOfLongestSubstring(s);
                    std::cout << len << "\\n";
                } catch (...) {
                    std::cout << "null\\n";
                }
            }
        }
        std::cout << "${SENTINEL_END}\\n";
    } catch (const std::exception& e) {
        std::cerr << e.what() << "\\n";
        return 1;
    }
    return 0;
}
`;
    return { code: cppHarness, stdin: input };
  }

  // Fallback
  return { code: userCode, stdin: input };
}
