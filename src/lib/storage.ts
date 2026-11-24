export type StorageWriteResult =
  | { ok: true }
  | { ok: false; error: string };

export function readStorage<T>(key: string, fallback: T): T {
  try {
    let raw = localStorage.getItem(key);
    if (raw === null && key.startsWith('prismcode-')) {
      const legacyKey = key.replace(/^prismcode-/, 'codearena-');
      raw = localStorage.getItem(legacyKey);
    }
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function classifyStorageError(error: unknown): string {
  if (error instanceof DOMException) {
    if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
      return 'Browser storage is full. Clear unused drafts or data and try again.';
    }
    if (error.name === 'SecurityError') {
      return 'Browser storage is blocked by privacy settings in this window.';
    }
  }
  return 'Could not save to browser storage. Please try again.';
}

export function writeStorageSafe<T>(key: string, value: T): StorageWriteResult {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return { ok: true };
  } catch (error) {
    return { ok: false, error: classifyStorageError(error) };
  }
}

export function writeStorage<T>(key: string, value: T): void {
  writeStorageSafe(key, value);
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Storage can be unavailable in private browsing or locked-down environments.
  }
}
