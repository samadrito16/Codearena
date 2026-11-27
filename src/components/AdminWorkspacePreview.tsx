import { ThumbsUp } from 'lucide-react';
import { DifficultyBadge } from '../pages/Dashboard';
import ProblemExamples from './ProblemExamples';
import type { Problem } from '../types';

export default function AdminWorkspacePreview({ problem }: { problem: Problem }) {
  const hasTitle = Boolean(problem.title.trim());
  const hasDescription = Boolean(problem.description.trim());

  return (
    <div className="admin-workspace-preview">
      <div className="workspace-tabs">
        <div className="flex items-center gap-0.5">
          <span className="workspace-tab workspace-tab-active">Description</span>
          <span className="workspace-tab opacity-60">Notes</span>
          <span className="workspace-tab opacity-60">Submissions</span>
          <span className="workspace-tab opacity-60">Solutions</span>
        </div>
        <DifficultyBadge difficulty={problem.difficulty}/>
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {problem.topics.length ? (
            problem.topics.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)
          ) : (
            <span className="text-[10px] italic text-muted">No topic tags yet</span>
          )}
        </div>

        <p className="workspace-eyebrow">PROBLEM STATEMENT</p>
        <h3 className="problem-title mt-1 text-2xl font-bold">
          {hasTitle ? problem.title : <span className="opacity-45">Untitled problem</span>}
        </h3>
        <p className="mt-1 font-mono text-[10px] text-muted">ID: {problem.id || 'auto-generated'}</p>

        <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
          {hasDescription ? problem.description : 'Start typing the problem statement to see how it renders in the workspace.'}
        </p>

        {problem.examples.length > 0 ? (
          <ProblemExamples
            examples={problem.examples}
            className="mt-4"
            headingTag="h4"
            fallbackEmpty
          />
        ) : (
          <div className="mt-4 rounded-xl border border-dashed p-4 text-center text-xs text-muted" style={{ borderColor: 'var(--ca-border)' }}>
            Add examples in the form to preview sample input/output cards here.
          </div>
        )}

        <div className="mt-5">
          <h4 className="mb-2.5 text-xs font-bold text-primary">Constraints</h4>
          {problem.constraints.length > 0 ? (
            <ul className="list-disc space-y-1.5 pl-5 text-xs leading-6 text-muted">
              {problem.constraints.map((item, idx) => <li key={`${idx}-${item}`}>{item}</li>)}
            </ul>
          ) : (
            <p className="text-xs italic text-muted">No constraints added yet.</p>
          )}
        </div>

        <div className="workspace-description-footer mt-6">
          <div>
            <p className="text-[10px] text-muted">Acceptance rate</p>
            <p className="mt-0.5 text-xs font-bold text-primary tabular-nums">{problem.acceptance || '—'}</p>
          </div>
          <span className="workspace-solve-button pointer-events-none opacity-80">
            <ThumbsUp size={13}/> Mark as solved
          </span>
        </div>
      </div>
    </div>
  );
}
