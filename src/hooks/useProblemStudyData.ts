import { useCallback, useEffect, useState } from 'react';
import {
  loadBookmarkedIds,
  loadCollections,
  loadProblemNotes,
  saveBookmarkedIds,
  saveCollections,
  saveProblemNotes,
  STUDY_SYNC_EVENT,
} from '../lib/studyStorage';
import type { ProblemCollection, ProblemNote } from '../types';

export function useProblemStudyData() {
  const [notes, setNotes] = useState<Record<string, ProblemNote>>(loadProblemNotes);
  const [collections, setCollections] = useState<ProblemCollection[]>(loadCollections);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(loadBookmarkedIds);

  useEffect(() => {
    const syncAll = () => {
      setNotes(loadProblemNotes());
      setCollections(loadCollections());
      setBookmarkedIds(loadBookmarkedIds());
    };
    window.addEventListener(STUDY_SYNC_EVENT, syncAll);
    window.addEventListener('storage', syncAll);
    return () => {
      window.removeEventListener(STUDY_SYNC_EVENT, syncAll);
      window.removeEventListener('storage', syncAll);
    };
  }, []);

  const saveNote = useCallback((problemId: string, content: string) => {
    const trimmed = content.trim();
    const current = loadProblemNotes();
    const next = { ...current };
    if (!trimmed) {
      delete next[problemId];
    } else {
      next[problemId] = {
        content,
        updatedAt: new Date().toISOString(),
      };
    }
    setNotes(next);
    saveProblemNotes(next);
  }, []);

  const clearNote = useCallback((problemId: string) => {
    const current = loadProblemNotes();
    if (!(problemId in current)) return;
    const next = { ...current };
    delete next[problemId];
    setNotes(next);
    saveProblemNotes(next);
  }, []);

  const toggleBookmark = useCallback((problemId: string) => {
    const current = loadBookmarkedIds();
    const next = current.includes(problemId)
      ? current.filter((id) => id !== problemId)
      : [problemId, ...current];
    setBookmarkedIds(next);
    saveBookmarkedIds(next);
  }, []);

  const createCollection = useCallback((rawName: string, initialProblemId?: string): ProblemCollection | null => {
    const name = rawName.trim();
    if (!name) return null;

    const current = loadCollections();
    const duplicate = current.find((col) => col.name.toLowerCase() === name.toLowerCase());
    if (duplicate) {
      if (initialProblemId && !duplicate.problemIds.includes(initialProblemId)) {
        const updated = current.map((col) => (
          col.id === duplicate.id
            ? { ...col, problemIds: [...col.problemIds, initialProblemId] }
            : col
        ));
        setCollections(updated);
        saveCollections(updated);
      }
      return duplicate;
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const created: ProblemCollection = {
      id: `${slug || 'collection'}-${Date.now().toString(36)}`,
      name,
      problemIds: initialProblemId ? [initialProblemId] : [],
      createdAt: new Date().toISOString(),
    };
    const next = [...current, created];
    setCollections(next);
    saveCollections(next);
    return created;
  }, []);

  const deleteCollection = useCallback((collectionId: string) => {
    const current = loadCollections();
    const next = current.filter((col) => col.id !== collectionId);
    setCollections(next);
    saveCollections(next);
  }, []);

  const toggleProblemInCollection = useCallback((collectionId: string, problemId: string) => {
    const current = loadCollections();
    const next = current.map((col) => {
      if (col.id !== collectionId) return col;
      const exists = col.problemIds.includes(problemId);
      return {
        ...col,
        problemIds: exists
          ? col.problemIds.filter((id) => id !== problemId)
          : [...col.problemIds, problemId],
      };
    });
    setCollections(next);
    saveCollections(next);
  }, []);

  return {
    notes,
    collections,
    bookmarkedIds,
    saveNote,
    clearNote,
    toggleBookmark,
    createCollection,
    deleteCollection,
    toggleProblemInCollection,
  };
}
