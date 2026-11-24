export interface BackendLanguageInfo {
  id: string;
  name: string;
  compilerId: string;
}

/**
 * Curated core interview runtimes and data languages supported deeply by PrismCode:
 * Python 3, JavaScript (Node.js), TypeScript, C++ (G++), Java (OpenJDK), and SQL (SQLite 3).
 */
export const BACKEND_LANGUAGES: Record<string, BackendLanguageInfo> = {
  python: { id: 'python', name: 'Python 3', compilerId: 'python-3.14' },
  python_pandas: { id: 'python_pandas', name: 'Python (Pandas & NumPy)', compilerId: 'python-pandas' },
  javascript: { id: 'javascript', name: 'JavaScript (Node.js)', compilerId: 'nodejs-24' },
  typescript: { id: 'typescript', name: 'TypeScript (Deno)', compilerId: 'typescript-deno' },
  cpp: { id: 'cpp', name: 'C++ (G++ 15)', compilerId: 'g++-15' },
  c: { id: 'c', name: 'C (GCC 15)', compilerId: 'gcc-15' },
  java: { id: 'java', name: 'Java (OpenJDK 25)', compilerId: 'openjdk-25' },
  sql: { id: 'sql', name: 'SQL (SQLite 3)', compilerId: 'sqlite-3' },
  duckdb: { id: 'duckdb', name: 'DuckDB 1.4', compilerId: 'duckdb-1.4' },
  go: { id: 'go', name: 'Go 1.26', compilerId: 'go-1.26' },
  rust: { id: 'rust', name: 'Rust 1.93', compilerId: 'rust-1.93' },
};

const LANGUAGE_ALIASES: Record<string, string> = {
  py: 'python',
  python3: 'python',
  js: 'javascript',
  node: 'javascript',
  'node.js': 'javascript',
  ts: 'typescript',
  'c++': 'cpp',
  'g++': 'cpp',
  gcc: 'c',
  sqlite: 'sql',
  sqlite3: 'sql',
  golang: 'go',
  rs: 'rust',
};

export function getCompilerId(languageId: string): string {
  if (!languageId) return 'python-3.14';
  const norm = languageId.toLowerCase().trim();
  const canonicalId = LANGUAGE_ALIASES[norm] || norm;
  const info = BACKEND_LANGUAGES[canonicalId];
  return info ? info.compilerId : (BACKEND_LANGUAGES[norm]?.compilerId || 'python-3.14');
}

export function isSupportedLanguage(languageId: string): boolean {
  if (!languageId) return false;
  const norm = languageId.toLowerCase().trim();
  const canonicalId = LANGUAGE_ALIASES[norm] || norm;
  return Boolean(BACKEND_LANGUAGES[canonicalId]);
}
