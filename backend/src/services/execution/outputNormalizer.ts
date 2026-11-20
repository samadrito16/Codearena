import { SENTINEL_START, SENTINEL_END } from './types.js';

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
 * Compares expected vs actual output using LeetCode matching rules:
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
