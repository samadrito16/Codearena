const resetKey = 'prismcode-catalog-reset-v1';
const progressKeys = [
  'solved', 'activity', 'submissions', 'daily-challenges', 'daily-completions',
  'spaced-repetition', 'adaptive-mastery-plan', 'code-drafts', 'problem-languages',
  'problem-notes', 'collections', 'bookmarks', 'problems-v6',
  'mock-interview-active-v1', 'mock-interview-history-v1',
  'placement-session-v1', 'placement-history-v1',
];

export function resetLegacyCatalogProgress() {
  try {
    if (localStorage.getItem(resetKey)) return;
    for (const key of progressKeys) {
      localStorage.removeItem('prismcode-' + key);
      localStorage.removeItem('codearena-' + key);
    }
    for (const key of ['prism_mastery_progress_v1', 'prism_review_progress_v2']) localStorage.removeItem(key);
    for (const storage of [localStorage, sessionStorage]) {
      for (const key of Object.keys(storage)) {
        if (key.startsWith('prismcode_contest_') || key.startsWith('prismcode_peer_solution')) storage.removeItem(key);
      }
    }
    localStorage.setItem(resetKey, '1');
  } catch {
    // Storage access can be disabled by the browser.
  }
}
