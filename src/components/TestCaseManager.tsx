import { Bookmark, Copy, Plus, Sparkles, Trash2, X } from 'lucide-react';
import type { WorkspaceTestCase } from '../hooks/useProblemTestCases';

interface TestCaseManagerProps {
  sampleCases: WorkspaceTestCase[];
  customCases: WorkspaceTestCase[];
  selectedCase: WorkspaceTestCase | null;
  onSelectCase: (id: string) => void;
  onAddCustomCase: () => void;
  onUpdateCustomCase: (id: string, patch: { name?: string; input?: string; expectedOutput?: string }) => void;
  onDeleteCustomCase: (id: string) => void;
  onCloneSample: (sample: WorkspaceTestCase) => void;
}

export default function TestCaseManager({
  sampleCases,
  customCases,
  selectedCase,
  onSelectCase,
  onAddCustomCase,
  onUpdateCustomCase,
  onDeleteCustomCase,
  onCloneSample,
}: TestCaseManagerProps) {
  return (
    <div className="workspace-tc-manager">
      {/* Visually separated Sample vs Custom case selector strip */}
      <div className="workspace-tc-strip">
        {sampleCases.length > 0 && (
          <div className="workspace-tc-group" role="group" aria-label="Sample test cases">
            <span className="workspace-tc-group-label">
              <Bookmark size={10}/> Samples
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {sampleCases.map((item) => {
                const active = selectedCase?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectCase(item.id)}
                    aria-pressed={active}
                    className={`workspace-tc-pill workspace-tc-pill-sample ${active ? 'workspace-tc-pill-active' : ''}`}
                  >
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {sampleCases.length > 0 && <span className="workspace-tc-strip-divider" aria-hidden="true"/>}

        <div className="workspace-tc-group" role="group" aria-label="Personal custom test cases">
          <span className="workspace-tc-group-label workspace-tc-group-label-custom">
            <Sparkles size={10}/> Custom
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {customCases.map((item) => {
              const active = selectedCase?.id === item.id;
              return (
                <div
                  key={item.id}
                  className={`workspace-tc-pill workspace-tc-pill-custom ${active ? 'workspace-tc-pill-active' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectCase(item.id)}
                    aria-pressed={active}
                    className="max-w-[130px] truncate text-left"
                  >
                    {item.name.trim() || 'Untitled'}
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeleteCustomCase(item.id);
                    }}
                    className="workspace-tc-pill-remove"
                    aria-label={`Delete ${item.name || 'custom case'}`}
                    title="Delete custom case"
                  >
                    <X size={11}/>
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              onClick={onAddCustomCase}
              className="workspace-tc-add-button"
              title="Add a personal test case"
            >
              <Plus size={12}/>
              <span>Add case</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selected case detail / editor */}
      {selectedCase ? (
        selectedCase.source === 'sample' ? (
          <div className="workspace-tc-detail">
            <div className="workspace-tc-detail-header">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary">{selectedCase.name}</span>
                <span className="workspace-tc-badge workspace-tc-badge-sample">Built-in sample</span>
              </div>
              <button
                type="button"
                onClick={() => onCloneSample(selectedCase)}
                className="workspace-tc-action-btn"
                title="Create an editable personal copy of this sample"
              >
                <Copy size={11}/>
                <span>Edit as custom</span>
              </button>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <div>
                <p className="workspace-tc-field-label">Input</p>
                <pre className="workspace-tc-readonly">{selectedCase.input}</pre>
              </div>
              <div>
                <p className="workspace-tc-field-label">Expected output</p>
                <pre className="workspace-tc-readonly">{selectedCase.expectedOutput}</pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="workspace-tc-detail">
            <div className="workspace-tc-detail-header">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <input
                  type="text"
                  value={selectedCase.name}
                  onChange={(event) => onUpdateCustomCase(selectedCase.id, { name: event.target.value })}
                  placeholder="Case name"
                  aria-label="Custom test case name"
                  className="workspace-tc-name-input"
                />
                <span className="workspace-tc-badge workspace-tc-badge-custom">Personal · Saved locally</span>
              </div>
              <button
                type="button"
                onClick={() => onDeleteCustomCase(selectedCase.id)}
                className="workspace-tc-delete-btn"
                aria-label={`Delete ${selectedCase.name || 'custom case'}`}
                title="Delete this custom case"
              >
                <Trash2 size={12}/>
                <span>Delete</span>
              </button>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <label className="block">
                <span className="workspace-tc-field-label">Input</span>
                <textarea
                  rows={2}
                  value={selectedCase.input}
                  onChange={(event) => onUpdateCustomCase(selectedCase.id, { input: event.target.value })}
                  placeholder="Enter test input (e.g. nums = [2, 7, 11], target = 9)"
                  className="workspace-tc-textarea"
                />
              </label>
              <label className="block">
                <span className="workspace-tc-field-label">Expected output (optional)</span>
                <textarea
                  rows={2}
                  value={selectedCase.expectedOutput}
                  onChange={(event) => onUpdateCustomCase(selectedCase.id, { expectedOutput: event.target.value })}
                  placeholder="Optional expected output"
                  className="workspace-tc-textarea"
                />
              </label>
            </div>
          </div>
        )
      ) : (
        <div className="workspace-tc-empty">
          <p className="text-xs font-semibold text-primary">No test cases yet</p>
          <p className="mt-1 text-[11px] text-muted">Create a personal test case to draft and store custom inputs for this problem.</p>
          <button type="button" onClick={onAddCustomCase} className="btn-secondary mt-3 py-1.5 text-[11px]">
            <Plus size={12}/> Add custom test case
          </button>
        </div>
      )}
    </div>
  );
}
