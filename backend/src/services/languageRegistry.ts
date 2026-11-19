export interface BackendLanguageInfo {
  id: string;
  name: string;
  compilerId: string;
}

export const BACKEND_LANGUAGES: Record<string, BackendLanguageInfo> = {
  python: { id: 'python', name: 'Python 3', compilerId: 'python-3.14' },
  python_pandas: { id: 'python_pandas', name: 'Python (Pandas & NumPy)', compilerId: 'python-pandas' },
  javascript: { id: 'javascript', name: 'JavaScript (Node.js)', compilerId: 'nodejs-24' },
  typescript: { id: 'typescript', name: 'TypeScript (Deno)', compilerId: 'typescript-deno' },
  cpp: { id: 'cpp', name: 'C++ (G++ 15)', compilerId: 'g++-15' },
  c: { id: 'c', name: 'C (GCC 15)', compilerId: 'gcc-15' },
  java: { id: 'java', name: 'Java (OpenJDK 25)', compilerId: 'openjdk-25' },
  csharp: { id: 'csharp', name: 'C# (.NET 10)', compilerId: 'dotnet-csharp-10' },
  fsharp: { id: 'fsharp', name: 'F# (.NET 10)', compilerId: 'dotnet-fsharp-10' },
  go: { id: 'go', name: 'Go 1.26', compilerId: 'go-1.26' },
  rust: { id: 'rust', name: 'Rust 1.93', compilerId: 'rust-1.93' },
  php: { id: 'php', name: 'PHP 8.5', compilerId: 'php-8.5' },
  ruby: { id: 'ruby', name: 'Ruby 4.0', compilerId: 'ruby-4.0' },
  swift: { id: 'swift', name: 'Swift 6.4', compilerId: 'swift-6.4' },
  kotlin: { id: 'kotlin', name: 'Kotlin 2.4', compilerId: 'kotlin-2.4' },
  dart: { id: 'dart', name: 'Dart 3.7', compilerId: 'dart-3.7' },
  scala: { id: 'scala', name: 'Scala 3.6', compilerId: 'scala-3.6' },
  r: { id: 'r', name: 'R 4.6', compilerId: 'r-4.6' },
  bash: { id: 'bash', name: 'Bash Shell 5.2', compilerId: 'bash-5.2' },
  sql: { id: 'sql', name: 'SQL (SQLite 3)', compilerId: 'sqlite-3' },
  duckdb: { id: 'duckdb', name: 'DuckDB 1.4', compilerId: 'duckdb-1.4' },
  perl: { id: 'perl', name: 'Perl 5.44', compilerId: 'perl-5.44' },
  lua: { id: 'lua', name: 'Lua 5.5', compilerId: 'lua-5.5' },
  haskell: { id: 'haskell', name: 'Haskell (GHC 9.12)', compilerId: 'haskell-9.12' },
  zig: { id: 'zig', name: 'Zig 0.14', compilerId: 'zig-0.14' },
  elixir: { id: 'elixir', name: 'Elixir 1.18', compilerId: 'elixir-1.18' },
  clojure: { id: 'clojure', name: 'Clojure 1.12', compilerId: 'clojure-1.12' },
  julia: { id: 'julia', name: 'Julia 1.13', compilerId: 'julia-1.13' },
  fortran: { id: 'fortran', name: 'Fortran (GFortran 15)', compilerId: 'gfortran-15' },
  vb: { id: 'vb', name: 'Visual Basic (.NET 10)', compilerId: 'dotnet-vb-10' },
  cobol: { id: 'cobol', name: 'COBOL (GnuCOBOL 3.2)', compilerId: 'gnucobol-3.2' },
  pascal: { id: 'pascal', name: 'Pascal (Free Pascal 3.2)', compilerId: 'fpc-3.2' },
  octave: { id: 'octave', name: 'GNU Octave 10.3', compilerId: 'octave-10.3' },
  assembly: { id: 'assembly', name: 'Assembly (NASM 2.16)', compilerId: 'nasm-2.16' },
  ocaml: { id: 'ocaml', name: 'OCaml 5.4', compilerId: 'ocaml-5.4' },
  lisp: { id: 'lisp', name: 'Common Lisp (SBCL 2.5)', compilerId: 'sbcl-2.5' },
  erlang: { id: 'erlang', name: 'Erlang (OTP 28)', compilerId: 'erlang-28' },
  prolog: { id: 'prolog', name: 'Prolog (SWI-Prolog 9.2)', compilerId: 'swi-prolog-9.2' },
  d: { id: 'd', name: 'D (DMD 2.111)', compilerId: 'dmd-2.111' },
  freebasic: { id: 'freebasic', name: 'FreeBASIC 1.10', compilerId: 'freebasic-1.10' },
  groovy: { id: 'groovy', name: 'Groovy 4.0', compilerId: 'groovy-4.0' },
  nim: { id: 'nim', name: 'Nim 2.2', compilerId: 'nim-2.2' },
  crystal: { id: 'crystal', name: 'Crystal 1.19', compilerId: 'crystal-1.19' },
  ada: { id: 'ada', name: 'Ada (GNAT 15)', compilerId: 'gnat-15' },
  powershell: { id: 'powershell', name: 'PowerShell 7.5', compilerId: 'powershell-7.5' },
  racket: { id: 'racket', name: 'Racket 8.16', compilerId: 'racket-8.16' },
  objc: { id: 'objc', name: 'Objective-C (Clang 19)', compilerId: 'clang-objc-19' },
};

export function getCompilerId(languageId: string): string {
  const info = BACKEND_LANGUAGES[languageId];
  return info ? info.compilerId : 'nodejs-24';
}
