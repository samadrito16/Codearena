import type { CodeLanguage } from '../types';

export interface CodeLanguageMeta {
  id: CodeLanguage;
  label: string;
  extension: string;
  monacoLanguage: string;
  dotClass: string;
  compilerId: string;
}

export const CODE_LANGUAGES: readonly CodeLanguageMeta[] = [
  {
    id: 'javascript',
    label: 'JavaScript',
    extension: 'js',
    monacoLanguage: 'javascript',
    dotClass: 'bg-amber-400',
    compilerId: 'nodejs-24',
  },
  {
    id: 'python',
    label: 'Python 3',
    extension: 'py',
    monacoLanguage: 'python',
    dotClass: 'bg-sky-400',
    compilerId: 'python-3.14',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    extension: 'ts',
    monacoLanguage: 'typescript',
    dotClass: 'bg-blue-400',
    compilerId: 'typescript-deno',
  },
  {
    id: 'java',
    label: 'Java',
    extension: 'java',
    monacoLanguage: 'java',
    dotClass: 'bg-orange-400',
    compilerId: 'openjdk-25',
  },
  {
    id: 'cpp',
    label: 'C++',
    extension: 'cpp',
    monacoLanguage: 'cpp',
    dotClass: 'bg-violet-400',
    compilerId: 'g++-15',
  },
  {
    id: 'c',
    label: 'C',
    extension: 'c',
    monacoLanguage: 'c',
    dotClass: 'bg-teal-400',
    compilerId: 'gcc-15',
  },
  {
    id: 'go',
    label: 'Go',
    extension: 'go',
    monacoLanguage: 'go',
    dotClass: 'bg-cyan-400',
    compilerId: 'go-1.26',
  },
  {
    id: 'rust',
    label: 'Rust',
    extension: 'rs',
    monacoLanguage: 'rust',
    dotClass: 'bg-orange-500',
    compilerId: 'rust-1.93',
  },
];

export const CODE_LANGUAGE_META: Record<CodeLanguage, CodeLanguageMeta> = CODE_LANGUAGES.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<CodeLanguage, CodeLanguageMeta>,
);

const VALID_CODE_LANGUAGE_IDS = new Set<string>(CODE_LANGUAGES.map((lang) => lang.id));

export function isCodeLanguage(value: unknown): value is CodeLanguage {
  return typeof value === 'string' && VALID_CODE_LANGUAGE_IDS.has(value);
}
