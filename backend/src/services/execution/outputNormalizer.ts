import {
  SENTINEL_START,
  SENTINEL_END,
  SENTINEL_CASE_START,
  SENTINEL_CASE_END,
  SENTINEL_ERROR_START,
  SENTINEL_ERROR_END,
  type BatchCaseOutput,
} from './types.js';

export interface SplitOutput {
  userStdout: string;
  resultValue: string;
}

/**
 * Splits raw process stdout into user debug output and the sentinel-wrapped return value.
 */
export function extractSentinelOutput(rawStdout: string | undefined): SplitOutput {
  if (!rawStdout) {
    return { userStdout: '', resultValue: '' };
  }

  const str = rawStdout.replace(/\r\n/g, '\n');
  const startIdx = str.indexOf(SENTINEL_START);
  const endIdx = str.indexOf(SENTINEL_END);

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const beforeSentinel = str.slice(0, startIdx).trim();
    const afterSentinel = str.slice(endIdx + SENTINEL_END.length).trim();
    const resultValue = str.slice(startIdx + SENTINEL_START.length, endIdx).trim();

    const userParts: string[] = [];
    if (beforeSentinel) userParts.push(beforeSentinel);
    if (afterSentinel) userParts.push(afterSentinel);

    return {
      userStdout: userParts.join('\n'),
      resultValue,
    };
  }

  // No sentinel markers found: treat whole output as return value
  return {
    userStdout: '',
    resultValue: str.trim(),
  };
}

/**
 * Parses multi-case batch output produced by batch execution drivers.
 * Maps caseNumber to its user debug logs, returned value, or runtime error.
 */
export function parseBatchCasesOutput(rawStdout: string | undefined): Map<number, BatchCaseOutput> {
  const results = new Map<number, BatchCaseOutput>();
  if (!rawStdout) {
    return results;
  }

  const str = rawStdout.replace(/\r\n/g, '\n');
  const caseRegex = /__CODEARENA_CASE_START__\s+(\d+)\s*\n([\s\S]*?)__CODEARENA_CASE_END__\s+\1/g;
  let match: RegExpExecArray | null;

  while ((match = caseRegex.exec(str)) !== null) {
    const caseNum = parseInt(match[1], 10);
    const caseBody = match[2];

    let userStdout = '';
    let resultValue: string | undefined = undefined;
    let error: string | undefined = undefined;

    const resStartIdx = caseBody.indexOf(SENTINEL_START);
    const resEndIdx = caseBody.indexOf(SENTINEL_END);

    const errStartIdx = caseBody.indexOf(SENTINEL_ERROR_START);
    const errEndIdx = caseBody.indexOf(SENTINEL_ERROR_END);

    if (errStartIdx !== -1 && errEndIdx !== -1 && errEndIdx > errStartIdx) {
      const beforeErr = caseBody.slice(0, errStartIdx).trim();
      error = cleanErrorMessage(caseBody.slice(errStartIdx + SENTINEL_ERROR_START.length, errEndIdx).trim());
      userStdout = beforeErr;
    } else if (resStartIdx !== -1 && resEndIdx !== -1 && resEndIdx > resStartIdx) {
      const beforeRes = caseBody.slice(0, resStartIdx).trim();
      resultValue = caseBody.slice(resStartIdx + SENTINEL_START.length, resEndIdx).trim();
      userStdout = beforeRes;
    } else {
      userStdout = caseBody.trim();
    }

    results.set(caseNum, {
      caseNumber: caseNum,
      userStdout,
      resultValue,
      error,
    });
  }

  return results;
}

/**
 * Parses and canonicalizes a string representation into a JavaScript value if possible.
 */
export function parseCanonical(str: string | undefined): unknown {
  if (str === undefined || str === null) return '';
  const trimmed = str.replace(/\r\n/g, '\n').trim();

  // Boolean normalization
  if (trimmed === 'true' || trimmed === 'True') return true;
  if (trimmed === 'false' || trimmed === 'False') return false;
  if (trimmed === 'null' || trimmed === 'None') return null;

  // Number normalization
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    const num = Number(trimmed);
    if (!Number.isNaN(num)) return num;
  }

  // JSON normalization
  try {
    return JSON.parse(trimmed);
  } catch {
    // If not JSON, check if it's bracketed array without strict quotes e.g. [0, 1]
    return trimmed;
  }
}

/**
 * Recursively canonicalizes and sorts collections (arrays, objects) so that
 * order-invariant results can be compared deterministically.
 */
export function deepSortCanonical(val: unknown): unknown {
  if (val === null || val === undefined || typeof val !== 'object') {
    return val;
  }

  if (Array.isArray(val)) {
    // Recursively sort elements
    const mapped = val.map(deepSortCanonical);
    // Sort array elements
    return mapped.sort((a, b) => {
      const strA = typeof a === 'object' ? JSON.stringify(a) : String(a);
      const strB = typeof b === 'object' ? JSON.stringify(b) : String(b);
      return strA.localeCompare(strB);
    });
  }

  // Object
  const sortedObj: Record<string, unknown> = {};
  const keys = Object.keys(val as Record<string, unknown>).sort();
  for (const k of keys) {
    sortedObj[k] = deepSortCanonical((val as Record<string, unknown>)[k]);
  }
  return sortedObj;
}

/**
 * Normalizes string representation to standard JSON or trimmed string.
 */
export function normalizeOutput(str: string | undefined): string {
  if (!str) return '';
  const parsed = parseCanonical(str);
  if (typeof parsed === 'object' && parsed !== null) {
    try {
      return JSON.stringify(parsed);
    } catch {
      return String(str).trim();
    }
  }
  return String(parsed).trim();
}

/**
 * Compares expected vs actual output using standard competitive matching rules:
 * 1. Strict normalized equality
 * 2. Floating-point precision (epsilon 1e-5)
 * 3. Automatic sorted comparison (order invariance)
 */
export function compareOutputs(
  expected: string | undefined,
  actual: string | undefined,
  orderInvariant = false,
): boolean {
  if (expected === undefined || expected === null) return true;
  if (actual === undefined || actual === null) return false;

  const expNorm = normalizeOutput(expected);
  const actNorm = normalizeOutput(actual);

  // 1. Strict normalized equality
  if (expNorm === actNorm) return true;

  // 2. Parse values for semantic comparison
  const parsedExp = parseCanonical(expected);
  const parsedAct = parseCanonical(actual);

  // Floating point comparison
  if (typeof parsedExp === 'number' && typeof parsedAct === 'number') {
    return Math.abs(parsedExp - parsedAct) < 1e-5;
  }

  // 3. Array or collection comparison
  if (Array.isArray(parsedExp) && Array.isArray(parsedAct)) {
    if (parsedExp.length !== parsedAct.length) return false;

    // Try sorted canonical comparison (order-invariant)
    const sortedExp = deepSortCanonical(parsedExp);
    const sortedAct = deepSortCanonical(parsedAct);

    if (JSON.stringify(sortedExp) === JSON.stringify(sortedAct)) {
      return true;
    }
  }

  // 4. Object comparison with sorted keys
  if (
    typeof parsedExp === 'object' &&
    parsedExp !== null &&
    typeof parsedAct === 'object' &&
    parsedAct !== null
  ) {
    const sortedExp = deepSortCanonical(parsedExp);
    const sortedAct = deepSortCanonical(parsedAct);
    if (JSON.stringify(sortedExp) === JSON.stringify(sortedAct)) {
      return true;
    }
  }

  // 5. Line-by-line order-invariant comparison (e.g. for SQL query result sets)
  if (orderInvariant) {
    const expLines = expNorm.split('\n').map((l) => l.trim()).filter(Boolean).sort();
    const actLines = actNorm.split('\n').map((l) => l.trim()).filter(Boolean).sort();
    if (expLines.length === actLines.length && expLines.length > 0) {
      if (expLines.every((l, idx) => l === actLines[idx])) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Cleans internal harness frames from stack traces so user diagnostics
 * focus cleanly on the user's solution lines.
 */
export function cleanErrorMessage(stderr: string | undefined): string {
  if (!stderr) return '';

  const lines = stderr.replace(/\r\n/g, '\n').split('\n');
  const filtered = lines.filter((line) => {
    // Strip harness internal function frames
    if (line.includes('_run_driver') || line.includes('_parse_py_input')) return false;
    if (line.includes('CodeArenaHelper') || line.includes('CodeArenaJavaParser')) return false;
    if (line.includes('parseInput') && line.includes('eval at <anonymous>')) return false;
    if (line.includes('InvocationTargetException')) return false;
    if (line.includes('java.lang.reflect.Method.invoke')) return false;
    return true;
  });

  return filtered.join('\n').trim();
}
