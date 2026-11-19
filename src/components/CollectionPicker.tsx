import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Check, FolderCheck, FolderPlus, Plus } from 'lucide-react';
import type { ProblemCollection } from '../types';

interface CollectionPickerProps {
  problemId: string;
  problemTitle: string;
  collections: ProblemCollection[];
  onToggleProblem: (collectionId: string, problemId: string) => void;
  onCreateCollection: (name: string, initialProblemId?: string) => ProblemCollection | null;
  compact?: boolean;
  align?: 'left' | 'right';
}

export default function CollectionPicker({
  problemId,
  problemTitle,
  collections,
  onToggleProblem,
  onCreateCollection,
  compact = false,
  align = 'right',
}: CollectionPickerProps) {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const memberCount = collections.filter((col) => col.problemIds.includes(problemId)).length;

  useEffect(() => {
    if (!open) return undefined;
    function handleOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  function handleCreate(event: FormEvent) {
    event.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;
    onCreateCollection(trimmed, problemId);
    setNewName('');
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Manage collections for ${problemTitle}`}
        title={memberCount ? `In ${memberCount} ${memberCount === 1 ? 'collection' : 'collections'}` : 'Add to collection'}
        className={`study-action-btn ${memberCount > 0 ? 'study-action-btn-active' : ''} ${compact ? 'h-8 px-2' : 'h-8 px-2.5'}`}
      >
        {memberCount > 0 ? <FolderCheck size={14}/> : <FolderPlus size={14}/>}
        {!compact && <span>Collections</span>}
        {memberCount > 0 && <span className="study-action-count tabular-nums">{memberCount}</span>}
      </button>

      {open && (
        <div
          className={`collection-popover ${align === 'left' ? 'left-0' : 'right-0'}`}
          role="dialog"
          aria-label={`Collections for ${problemTitle}`}
        >
          <div className="border-b pb-2" style={{ borderColor: 'var(--ca-border)' }}>
            <p className="text-xs font-bold text-primary">Add to collection</p>
            <p className="mt-0.5 truncate text-[10px] text-muted">{problemTitle}</p>
          </div>

          <div className="mt-2 max-h-44 space-y-1 overflow-y-auto">
            {collections.length ? collections.map((collection) => {
              const checked = collection.problemIds.includes(problemId);
              return (
                <button
                  key={collection.id}
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => onToggleProblem(collection.id, problemId)}
                  className={`collection-option ${checked ? 'collection-option-active' : ''}`}
                >
                  <span className={`collection-check ${checked ? 'collection-check-active' : ''}`}>
                    {checked && <Check size={11}/>}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-left text-xs font-semibold text-primary">
                    {collection.name}
                  </span>
                  <span className="text-[10px] text-muted tabular-nums">{collection.problemIds.length}</span>
                </button>
              );
            }) : (
              <p className="py-2 text-center text-[11px] text-muted">No collections yet. Create one below.</p>
            )}
          </div>

          <form onSubmit={handleCreate} className="mt-2.5 flex items-center gap-1.5 border-t pt-2.5" style={{ borderColor: 'var(--ca-border)' }}>
            <input
              type="text"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="New collection..."
              aria-label="New collection name"
              className="collection-create-input"
            />
            <button
              type="submit"
              disabled={!newName.trim()}
              className="btn-primary px-2.5 py-1.5 text-[10px] disabled:opacity-45"
            >
              <Plus size={12}/> Add
            </button>
          </form>

          <p className="mt-2 text-[9px] leading-4 text-muted">
            Stored locally in this browser until account sync is added.
          </p>
        </div>
      )}
    </div>
  );
}
