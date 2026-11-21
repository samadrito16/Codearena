import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowUpDown,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Folder,
  HardDrive,
  Plus,
  Search,
  SlidersHorizontal,
  StickyNote,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CollectionPicker from '../components/CollectionPicker';
import ProblemNotesPanel from '../components/ProblemNotesPanel';
import ProblemPreviewModal from '../components/ProblemPreviewModal';
import ErrorAlert from '../components/ui/ErrorAlert';
import { CardSkeleton } from '../components/ui/LoadingSkeleton';
import { useApp } from '../context/AppContext';
import { useProblems } from '../hooks/useDataServices';
import { useProblemStudyData } from '../hooks/useProblemStudyData';
import {
  DEFAULT_LIBRARY_FILTERS,
  loadLibraryFilters,
  saveLibraryFilters,
  type LibraryFilterPrefs,
  type ProblemPageSize,
  type ProblemQuickFilter,
  type ProblemSortOption,
} from '../lib/studyStorage';
import type { Difficulty, Problem } from '../types';
import { DifficultyBadge } from './Dashboard';

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

function parseAcceptance(value: string): number {
  const num = Number.parseFloat(value.replace('%', ''));
  return Number.isFinite(num) ? num : 0;
}

function getSearchMatchHint(problem: Problem, noteText: string, query: string): string | null {
  if (!query) return null;
  if (`${problem.title} ${problem.topics.join(' ')}`.toLowerCase().includes(query)) return null;
  if (problem.description.toLowerCase().includes(query)) return 'Matched in description';
  if (problem.constraints.join(' ').toLowerCase().includes(query)) return 'Matched in constraints';
  if (noteText.toLowerCase().includes(query)) return 'Matched in note';
  return null;
}

export default function Problems() {
  const { solvedIds, toggleSolved } = useApp();
  const { data: problems, status: problemsStatus, error: problemsError, retry: retryProblems } = useProblems();
  const {
    notes,
    collections,
    bookmarkedIds,
    saveNote,
    clearNote,
    toggleBookmark,
    createCollection,
    deleteCollection,
    toggleProblemInCollection,
  } = useProblemStudyData();

  const [filters, setFilters] = useState<LibraryFilterPrefs>(loadLibraryFilters);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [previewProblemId, setPreviewProblemId] = useState<string | null>(null);
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  useEffect(() => {
    saveLibraryFilters(filters);
  }, [filters]);

  const topics = useMemo(
    () => ['All topics', ...Array.from(new Set(problems.flatMap((problem) => problem.topics))).sort()],
    [problems],
  );

  // Keep filter state coherent if stored topic or collection is no longer valid.
  useEffect(() => {
    if (filters.topic !== 'All topics' && !topics.includes(filters.topic)) {
      setFilters((current) => ({ ...current, topic: 'All topics', page: 1 }));
    }
  }, [topics, filters.topic]);

  useEffect(() => {
    if (filters.collectionId !== 'all' && !collections.some((col) => col.id === filters.collectionId)) {
      setFilters((current) => ({ ...current, collectionId: 'all', page: 1 }));
    }
  }, [collections, filters.collectionId]);

  const activeCollection = useMemo(
    () => collections.find((col) => col.id === filters.collectionId) ?? null,
    [collections, filters.collectionId],
  );

  const bookmarkedCount = useMemo(
    () => problems.filter((problem) => bookmarkedIds.includes(problem.id)).length,
    [problems, bookmarkedIds],
  );
  const notedCount = useMemo(
    () => problems.filter((problem) => Boolean(notes[problem.id]?.content.trim())).length,
    [problems, notes],
  );
  const unsolvedCount = useMemo(
    () => problems.filter((problem) => !solvedIds.includes(problem.id)).length,
    [problems, solvedIds],
  );

  const normalizedQuery = filters.search.trim().toLowerCase();

  const filtered = useMemo(() => {
    const list = problems.filter((problem) => {
      const noteText = notes[problem.id]?.content ?? '';
      const searchable = [
        problem.title,
        problem.topics.join(' '),
        problem.description,
        problem.constraints.join(' '),
        noteText,
      ].join(' ').toLowerCase();
      const matchesSearch = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesDifficulty = filters.difficulty === 'All' || problem.difficulty === filters.difficulty;
      const matchesTopic = filters.topic === 'All topics' || problem.topics.includes(filters.topic);
      const matchesCollection = !activeCollection || activeCollection.problemIds.includes(problem.id);
      const matchesQuick = filters.quickFilter === 'all'
        || (filters.quickFilter === 'bookmarked' && bookmarkedIds.includes(problem.id))
        || (filters.quickFilter === 'noted' && Boolean(notes[problem.id]?.content.trim()))
        || (filters.quickFilter === 'unsolved' && !solvedIds.includes(problem.id));

      return matchesSearch && matchesDifficulty && matchesTopic && matchesCollection && matchesQuick;
    });

    if (filters.sort === 'default') return list;
    const sorted = [...list];
    sorted.sort((a, b) => {
      switch (filters.sort) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'difficulty-asc':
          return DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty] || a.title.localeCompare(b.title);
        case 'difficulty-desc':
          return DIFFICULTY_RANK[b.difficulty] - DIFFICULTY_RANK[a.difficulty] || a.title.localeCompare(b.title);
        case 'acceptance-desc':
          return parseAcceptance(b.acceptance) - parseAcceptance(a.acceptance);
        case 'acceptance-asc':
          return parseAcceptance(a.acceptance) - parseAcceptance(b.acceptance);
        default:
          return 0;
      }
    });
    return sorted;
  }, [problems, filters, normalizedQuery, notes, activeCollection, bookmarkedIds, solvedIds]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / filters.pageSize));
  const safePage = Math.min(filters.page, totalPages);

  // Keep page coherent when filtered count shrinks (e.g. solving a problem in Workspace and returning to Unsolved).
  useEffect(() => {
    if (filters.page !== safePage) {
      setFilters((current) => ({ ...current, page: safePage }));
    }
  }, [filters.page, safePage]);

  const startIndex = (safePage - 1) * filters.pageSize;
  const paginated = useMemo(
    () => filtered.slice(startIndex, startIndex + filters.pageSize),
    [filtered, startIndex, filters.pageSize],
  );

  const previewIndex = previewProblemId
    ? filtered.findIndex((problem) => problem.id === previewProblemId)
    : -1;
  const previewProblem = previewIndex >= 0 ? filtered[previewIndex] : null;

  useEffect(() => {
    if (previewProblemId && previewIndex === -1) {
      setPreviewProblemId(null);
    }
  }, [previewProblemId, previewIndex]);

  const hasActiveFilters = filters.search !== DEFAULT_LIBRARY_FILTERS.search
    || filters.difficulty !== DEFAULT_LIBRARY_FILTERS.difficulty
    || filters.topic !== DEFAULT_LIBRARY_FILTERS.topic
    || filters.sort !== DEFAULT_LIBRARY_FILTERS.sort
    || filters.quickFilter !== DEFAULT_LIBRARY_FILTERS.quickFilter
    || filters.collectionId !== DEFAULT_LIBRARY_FILTERS.collectionId;

  function updateFilter<K extends keyof LibraryFilterPrefs>(key: K, value: LibraryFilterPrefs[K]) {
    setFilters((current) => ({
      ...current,
      [key]: value,
      ...(key !== 'page' ? { page: 1 } : {}),
    }));
  }

  function resetAllFilters() {
    setFilters((current) => ({
      ...DEFAULT_LIBRARY_FILTERS,
      pageSize: current.pageSize,
    }));
    setExpandedNoteId(null);
    setPreviewProblemId(null);
  }

  function handleCreateCollection(event: FormEvent) {
    event.preventDefault();
    const created = createCollection(newCollectionName);
    if (created) {
      setNewCollectionName('');
      setCreatingCollection(false);
      updateFilter('collectionId', created.id);
    }
  }

  const rangeStart = filtered.length ? startIndex + 1 : 0;
  const rangeEnd = Math.min(filtered.length, startIndex + paginated.length);

  return <div className="space-y-5 page-content">
    <section className="page-heading-row">
      <div>
        <h2 className="page-title mt-0">Problem library</h2>
        <p className="page-subtitle">Find your next challenge, preview problem statements, and organize private notes and collections.</p>
      </div>
    </section>

    {problemsStatus === 'error' && problemsError && (
      <ErrorAlert
        title="Could not load problem library"
        message={problemsError}
        onRetry={retryProblems}
        retryLabel="Retry"
      />
    )}

    {problemsStatus === 'loading' && (
      <div className="space-y-3">
        <CardSkeleton rows={3}/>
        <CardSkeleton rows={3}/>
      </div>
    )}

    {/* Search, Filters, Sorting, and Collections */}
    <section className="panel-card space-y-4 p-4 sm:p-5">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_155px_170px_195px]">
        <div className="search-field">
          <Search size={17} className="text-slate-400"/>
          <input
            value={filters.search}
            onChange={(event) => updateFilter('search', event.target.value)}
            placeholder="Search title, topics, description, constraints, or notes..."
            aria-label="Search problems by title, topics, description, constraints, or notes"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => updateFilter('search', '')}
              className="rounded-md p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X size={13}/>
            </button>
          )}
        </div>
        <label className="select-field" aria-label="Filter by difficulty">
          <Filter size={15}/>
          <select value={filters.difficulty} onChange={(event) => updateFilter('difficulty', event.target.value)}>
            <option value="All">All difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <label className="select-field" aria-label="Filter by topic">
          <SlidersHorizontal size={15}/>
          <select value={filters.topic} onChange={(event) => updateFilter('topic', event.target.value)}>
            {topics.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="select-field" aria-label="Sort problems">
          <ArrowUpDown size={15}/>
          <select value={filters.sort} onChange={(event) => updateFilter('sort', event.target.value as ProblemSortOption)}>
            <option value="default">Sort: Default</option>
            <option value="title-asc">Title (A–Z)</option>
            <option value="difficulty-asc">Difficulty (Easy → Hard)</option>
            <option value="difficulty-desc">Difficulty (Hard → Easy)</option>
            <option value="acceptance-desc">Acceptance (High → Low)</option>
            <option value="acceptance-asc">Acceptance (Low → High)</option>
          </select>
        </label>
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3.5" style={{ borderColor: 'var(--ca-border)' }}>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Quick problem filters">
          {([
            ['all', `All (${problems.length})`],
            ['bookmarked', `Bookmarked (${bookmarkedCount})`],
            ['noted', `With notes (${notedCount})`],
            ['unsolved', `Unsolved (${unsolvedCount})`],
          ] as [ProblemQuickFilter, string][]).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => updateFilter('quickFilter', key)}
              aria-pressed={filters.quickFilter === key}
              className={`collection-tab ${filters.quickFilter === key ? 'collection-tab-active' : ''}`}
            >
              {key === 'bookmarked' && <Bookmark size={11}/>}
              {key === 'noted' && <StickyNote size={11}/>}
              <span>{label}</span>
            </button>
          ))}

          {/* Minimal Collections Folder Toggle */}
          <button
            type="button"
            onClick={() => setCollectionsOpen((prev) => !prev)}
            aria-expanded={collectionsOpen}
            className={`collection-tab flex items-center gap-1.5 ${
              filters.collectionId !== 'all' || collectionsOpen ? 'collection-tab-active font-semibold' : ''
            }`}
          >
            <Folder size={12} className={filters.collectionId !== 'all' ? 'text-indigo-500' : 'themed-link'} />
            <span>Collections</span>
            {activeCollection && (
              <span className="text-[10px] text-indigo-500 font-bold max-w-[120px] truncate">
                ({activeCollection.name})
              </span>
            )}
            <ChevronDown size={11} className={`transition-transform duration-150 ${collectionsOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-muted">
          <span className="tabular-nums">
            Showing <strong className="text-primary">{rangeStart}–{rangeEnd}</strong> of <strong className="text-primary">{filtered.length}</strong>
            {filtered.length !== problems.length ? ` (${problems.length} total)` : ''}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="font-bold themed-link"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Expandable Collections Drawer - Hidden by default */}
      {collectionsOpen && (
        <div className="flex flex-wrap items-center gap-2 border-t pt-3.5 animate-in fade-in" style={{ borderColor: 'var(--ca-border)' }}>
          <button
            type="button"
            onClick={() => updateFilter('collectionId', 'all')}
            aria-pressed={filters.collectionId === 'all'}
            className={`collection-tab ${filters.collectionId === 'all' ? 'collection-tab-active' : ''}`}
          >
            All problems
          </button>
          {collections.map((collection) => {
            const active = filters.collectionId === collection.id;
            return (
              <div key={collection.id} className={`collection-tab pr-1.5 ${active ? 'collection-tab-active' : ''}`}>
                <button
                  type="button"
                  onClick={() => updateFilter('collectionId', active ? 'all' : collection.id)}
                  aria-pressed={active}
                  className="inline-flex items-center gap-1.5"
                >
                  <span>{collection.name}</span>
                  <span className="collection-tab-count tabular-nums">{collection.problemIds.length}</span>
                </button>
                <button
                  type="button"
                  onClick={() => deleteCollection(collection.id)}
                  className="workspace-tc-pill-remove ml-0.5"
                  aria-label={`Delete collection ${collection.name}`}
                  title={`Delete "${collection.name}"`}
                >
                  <X size={11}/>
                </button>
              </div>
            );
          })}

          {creatingCollection ? (
            <form onSubmit={handleCreateCollection} className="flex items-center gap-1.5">
              <input
                type="text"
                autoFocus
                value={newCollectionName}
                onChange={(event) => setNewCollectionName(event.target.value)}
                placeholder="Collection name..."
                aria-label="New collection name"
                className="collection-create-input h-7 w-40"
              />
              <button type="submit" disabled={!newCollectionName.trim()} className="btn-primary px-2.5 py-1 text-[10px] disabled:opacity-45">
                Save
              </button>
              <button
                type="button"
                onClick={() => { setCreatingCollection(false); setNewCollectionName(''); }}
                className="btn-secondary px-2 py-1 text-[10px]"
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setCreatingCollection(true)}
              className="workspace-tc-add-button h-7"
            >
              <Plus size={12}/> New collection
            </button>
          )}
        </div>
      )}
    </section>

    {/* Problem List */}
    <section className="panel-card overflow-visible">
      <div className="hidden grid-cols-[minmax(0,1.5fr)_104px_92px_112px_162px] gap-4 rounded-t-2xl border-b border-slate-100 bg-slate-50/70 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:border-slate-800 dark:bg-slate-800/40 md:grid">
        <span>Problem</span>
        <span>Difficulty</span>
        <span>Acceptance</span>
        <span>Status</span>
        <span className="text-right">Preview & tools</span>
      </div>
      {paginated.length ? paginated.map((problem, pageIdx) => {
        const absoluteIdx = startIndex + pageIdx;
        const solved = solvedIds.includes(problem.id);
        const bookmarked = bookmarkedIds.includes(problem.id);
        const note = notes[problem.id];
        const hasNote = Boolean(note?.content.trim());
        const noteOpen = expandedNoteId === problem.id;
        const problemCollections = collections.filter((col) => col.problemIds.includes(problem.id));
        const matchHint = getSearchMatchHint(problem, note?.content ?? '', normalizedQuery);

        return (
          <div key={problem.id} className={pageIdx < paginated.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}>
            <div className="problem-row grid gap-3 px-4 py-4 transition hover:bg-slate-50/80 dark:hover:bg-slate-800/30 sm:px-6 md:grid-cols-[minmax(0,1.5fr)_104px_92px_112px_162px] md:items-center">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-slate-300 tabular-nums">{String(absoluteIdx + 1).padStart(2, '0')}</span>
                  <Link to={`/workspace/${problem.id}`} className="truncate text-sm font-bold text-slate-800 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-300">
                    {problem.title}
                  </Link>
                  {matchHint && (
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: 'color-mix(in srgb, var(--ca-accent-solid) 13%, var(--ca-surface))', color: 'var(--ca-accent-solid)' }}>
                      {matchHint}
                    </span>
                  )}
                </div>
                <div className="ml-6 mt-1.5 flex flex-wrap items-center gap-1.5">
                  {problem.topics.map((item) => <span key={item} className="tag-pill">{item}</span>)}
                  {problemCollections.map((col) => (
                    <span
                      key={col.id}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-bold"
                      style={{ background: 'color-mix(in srgb, var(--ca-accent-solid) 13%, var(--ca-surface))', color: 'var(--ca-accent-solid)' }}
                    >
                      <Folder size={9}/> {col.name}
                    </span>
                  ))}
                </div>
                {hasNote && !noteOpen && (
                  <button
                    type="button"
                    onClick={() => setExpandedNoteId(problem.id)}
                    className="ml-6 mt-1.5 flex max-w-full items-center gap-1.5 text-left text-[11px] text-muted hover:text-primary"
                    title="Click to edit your private note"
                  >
                    <StickyNote size={11} className="shrink-0 themed-link"/>
                    <span className="truncate">{note.content}</span>
                  </button>
                )}
              </div>

              <div>
                <span className="mb-1 block text-[10px] text-slate-400 md:hidden">Difficulty</span>
                <DifficultyBadge difficulty={problem.difficulty}/>
              </div>

              <div>
                <span className="mb-1 block text-[10px] text-slate-400 md:hidden">Acceptance</span>
                <span className="text-xs font-semibold text-slate-600 tabular-nums dark:text-slate-300">{problem.acceptance}</span>
              </div>

              <div>
                <span className="mb-1 block text-[10px] text-slate-400 md:hidden">Status</span>
                <button
                  type="button"
                  onClick={() => toggleSolved(problem.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${solved ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}
                >
                  {solved ? <><Check size={12}/> Solved</> : 'Mark solved'}
                </button>
              </div>

              <div className="flex items-center justify-start gap-1.5 md:justify-end">
                <button
                  type="button"
                  onClick={() => setPreviewProblemId(problem.id)}
                  aria-label={`Preview ${problem.title}`}
                  title="Quick preview"
                  className={`study-action-btn h-8 w-8 justify-center px-0 ${previewProblemId === problem.id ? 'study-action-btn-active' : ''}`}
                >
                  <Eye size={14}/>
                </button>
                <button
                  type="button"
                  onClick={() => toggleBookmark(problem.id)}
                  aria-pressed={bookmarked}
                  aria-label={bookmarked ? `Remove bookmark for ${problem.title}` : `Bookmark ${problem.title}`}
                  title={bookmarked ? 'Bookmarked' : 'Bookmark problem'}
                  className={`study-action-btn h-8 w-8 justify-center px-0 ${bookmarked ? 'study-action-btn-bookmark' : ''}`}
                >
                  <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'}/>
                </button>
                <CollectionPicker
                  problemId={problem.id}
                  problemTitle={problem.title}
                  collections={collections}
                  onToggleProblem={toggleProblemInCollection}
                  onCreateCollection={createCollection}
                  compact
                />
                <button
                  type="button"
                  onClick={() => setExpandedNoteId(noteOpen ? null : problem.id)}
                  aria-expanded={noteOpen}
                  aria-label={hasNote ? `Edit private note for ${problem.title}` : `Add private note for ${problem.title}`}
                  title={hasNote ? 'Edit private note' : 'Add private note'}
                  className={`study-action-btn h-8 w-8 justify-center px-0 ${hasNote || noteOpen ? 'study-action-btn-active' : ''}`}
                >
                  <StickyNote size={14}/>
                </button>
                <Link
                  to={`/workspace/${problem.id}`}
                  className="study-action-btn hidden h-8 w-8 items-center justify-center rounded-lg md:flex"
                  aria-label={`Open ${problem.title}`}
                >
                  <ArrowUpRight size={16}/>
                </Link>
              </div>
            </div>

            {noteOpen && (
              <div className="border-t px-4 py-3.5 sm:px-6" style={{ borderColor: 'var(--ca-border)', background: 'color-mix(in srgb, var(--ca-surface-muted) 45%, var(--ca-surface))' }}>
                <ProblemNotesPanel
                  problemId={problem.id}
                  problemTitle={problem.title}
                  savedNote={note}
                  onSaveNote={saveNote}
                  onClearNote={clearNote}
                  compact
                />
              </div>
            )}
          </div>
        );
      }) : (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800"><Search size={20}/></div>
          <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-200">No problems match your filters</p>
          <p className="mt-1 text-xs text-slate-400">
            {activeCollection
              ? `No matching problems in "${activeCollection.name}". Add problems to this collection or clear filters.`
              : 'Try another search term, collection, or filter.'}
          </p>
          {hasActiveFilters && (
            <button type="button" onClick={resetAllFilters} className="btn-secondary mt-4 py-1.5 text-xs">
              Reset filters
            </button>
          )}
        </div>
      )}

      {/* Pagination Bar */}
      {filtered.length > 0 && (
        <div className="problem-pagination-bar">
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted">
            <span className="tabular-nums">
              Page <strong className="text-primary">{safePage}</strong> of <strong className="text-primary">{totalPages}</strong>
            </span>
            <label className="inline-flex items-center gap-1.5">
              <span>Per page</span>
              <select
                value={filters.pageSize}
                onChange={(event) => updateFilter('pageSize', Number(event.target.value) as ProblemPageSize)}
                aria-label="Problems per page"
                className="problem-pagesize-select"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </label>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => updateFilter('page', Math.max(1, safePage - 1))}
              disabled={safePage <= 1}
              className="problem-page-btn"
              aria-label="Previous page"
            >
              <ChevronLeft size={14}/> Previous
            </button>
            <button
              type="button"
              onClick={() => updateFilter('page', Math.min(totalPages, safePage + 1))}
              disabled={safePage >= totalPages}
              className="problem-page-btn"
              aria-label="Next page"
            >
              Next <ChevronRight size={14}/>
            </button>
          </div>
        </div>
      )}
    </section>

    <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[11px] text-muted">
      <HardDrive size={13} className="themed-link"/>
      <span>Your search filters, sorting, pagination, bookmarks, private notes, and collections are stored locally in this browser until account sync is added.</span>
    </div>

    {previewProblem && (
      <ProblemPreviewModal
        problem={previewProblem}
        solved={solvedIds.includes(previewProblem.id)}
        bookmarked={bookmarkedIds.includes(previewProblem.id)}
        note={notes[previewProblem.id]}
        collections={collections.filter((col) => col.problemIds.includes(previewProblem.id))}
        currentIndex={previewIndex}
        totalCount={filtered.length}
        onPrev={previewIndex > 0 ? () => setPreviewProblemId(filtered[previewIndex - 1].id) : null}
        onNext={previewIndex < filtered.length - 1 ? () => setPreviewProblemId(filtered[previewIndex + 1].id) : null}
        onToggleSolved={() => toggleSolved(previewProblem.id)}
        onToggleBookmark={() => toggleBookmark(previewProblem.id)}
        onClose={() => setPreviewProblemId(null)}
      />
    )}
  </div>;
}
