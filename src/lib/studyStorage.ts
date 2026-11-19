import { readStorage, writeStorage } from './storage';
import type { ProblemCollection, ProblemNote } from '../types';

export type ProblemSortOption =
  | 'default'
  | 'title-asc'
  | 'difficulty-asc'
  | 'difficulty-desc'
  | 'acceptance-desc'
  | 'acceptance-asc';

export type ProblemQuickFilter = 'all' | 'bookmarked' | 'noted' | 'unsolved';
export type ProblemPageSize = 5 | 10 | 20 | 50;

export interface LibraryFilterPrefs {
  search: string;
  difficulty: string;
  topic: string;
  sort: ProblemSortOption;
  quickFilter: ProblemQuickFilter;
  collectionId: string;
  page: number;
  pageSize: ProblemPageSize;
}

export const STUDY_SYNC_EVENT = 'codearena-study-sync';

const NOTES_KEY = 'codearena-problem-notes';
const COLLECTIONS_KEY = 'codearena-collections';
const BOOKMARKS_KEY = 'codearena-bookmarks';
const FILTERS_KEY = 'codearena-library-filters';

const VALID_SORTS: readonly ProblemSortOption[] = [
  'default',
  'title-asc',
  'difficulty-asc',
  'difficulty-desc',
  'acceptance-desc',
  'acceptance-asc',
];

const VALID_QUICK_FILTERS: readonly ProblemQuickFilter[] = [
  'all',
  'bookmarked',
  'noted',
  'unsolved',
];

const VALID_PAGE_SIZES: readonly ProblemPageSize[] = [5, 10, 20, 50];

export const DEFAULT_LIBRARY_FILTERS: LibraryFilterPrefs = {
  search: '',
  difficulty: 'All',
  topic: 'All topics',
  sort: 'default',
  quickFilter: 'all',
  collectionId: 'all',
  page: 1,
  pageSize: 10,
};

function createStarterCollections(): ProblemCollection[] {
  const now = new Date().toISOString();
  return [
    { id: 'interview-prep', name: 'Interview Prep', problemIds: [], createdAt: now },
    { id: 'revision', name: 'Revision', problemIds: [], createdAt: now },
    { id: 'difficult-problems', name: 'Difficult Problems', problemIds: [], createdAt: now },
  ];
}

function notifyStudySync(): void {
  try {
    window.dispatchEvent(new CustomEvent(STUDY_SYNC_EVENT));
  } catch {
    // Ignore in non-browser environments.
  }
}

export function loadProblemNotes(): Record<string, ProblemNote> {
  const stored = readStorage<unknown>(NOTES_KEY, {});
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {};
  const valid: Record<string, ProblemNote> = {};
  for (const [problemId, entry] of Object.entries(stored)) {
    if (entry && typeof entry === 'object') {
      const candidate = entry as Partial<ProblemNote>;
      if (typeof candidate.content === 'string' && typeof candidate.updatedAt === 'string') {
        valid[problemId] = { content: candidate.content, updatedAt: candidate.updatedAt };
      }
    }
  }
  return valid;
}

export function saveProblemNotes(notes: Record<string, ProblemNote>): void {
  writeStorage(NOTES_KEY, notes);
  notifyStudySync();
}

function isProblemCollection(value: unknown): value is ProblemCollection {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<ProblemCollection>;
  return typeof item.id === 'string'
    && typeof item.name === 'string'
    && item.name.trim().length > 0
    && Array.isArray(item.problemIds)
    && item.problemIds.every((id) => typeof id === 'string')
    && typeof item.createdAt === 'string';
}

export function loadCollections(): ProblemCollection[] {
  try {
    const raw = localStorage.getItem(COLLECTIONS_KEY);
    if (raw === null) {
      const starters = createStarterCollections();
      writeStorage(COLLECTIONS_KEY, starters);
      return starters;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return createStarterCollections();
    return parsed.filter(isProblemCollection);
  } catch {
    return createStarterCollections();
  }
}

export function saveCollections(collections: ProblemCollection[]): void {
  writeStorage(COLLECTIONS_KEY, collections);
  notifyStudySync();
}

export function loadBookmarkedIds(): string[] {
  const stored = readStorage<unknown>(BOOKMARKS_KEY, []);
  if (!Array.isArray(stored)) return [];
  return Array.from(new Set(stored.filter((item): item is string => typeof item === 'string')));
}

export function saveBookmarkedIds(ids: string[]): void {
  writeStorage(BOOKMARKS_KEY, Array.from(new Set(ids)));
  notifyStudySync();
}

export function loadLibraryFilters(): LibraryFilterPrefs {
  const stored = readStorage<unknown>(FILTERS_KEY, DEFAULT_LIBRARY_FILTERS);
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return DEFAULT_LIBRARY_FILTERS;
  const candidate = stored as Partial<LibraryFilterPrefs>;
  return {
    search: typeof candidate.search === 'string' ? candidate.search : DEFAULT_LIBRARY_FILTERS.search,
    difficulty: typeof candidate.difficulty === 'string' ? candidate.difficulty : DEFAULT_LIBRARY_FILTERS.difficulty,
    topic: typeof candidate.topic === 'string' ? candidate.topic : DEFAULT_LIBRARY_FILTERS.topic,
    sort: typeof candidate.sort === 'string' && (VALID_SORTS as readonly string[]).includes(candidate.sort)
      ? candidate.sort as ProblemSortOption
      : DEFAULT_LIBRARY_FILTERS.sort,
    quickFilter: typeof candidate.quickFilter === 'string' && (VALID_QUICK_FILTERS as readonly string[]).includes(candidate.quickFilter)
      ? candidate.quickFilter as ProblemQuickFilter
      : DEFAULT_LIBRARY_FILTERS.quickFilter,
    collectionId: typeof candidate.collectionId === 'string' ? candidate.collectionId : DEFAULT_LIBRARY_FILTERS.collectionId,
    page: typeof candidate.page === 'number' && Number.isInteger(candidate.page) && candidate.page >= 1
      ? candidate.page
      : DEFAULT_LIBRARY_FILTERS.page,
    pageSize: typeof candidate.pageSize === 'number' && (VALID_PAGE_SIZES as readonly number[]).includes(candidate.pageSize)
      ? candidate.pageSize as ProblemPageSize
      : DEFAULT_LIBRARY_FILTERS.pageSize,
  };
}

export function saveLibraryFilters(filters: LibraryFilterPrefs): void {
  writeStorage(FILTERS_KEY, filters);
}
