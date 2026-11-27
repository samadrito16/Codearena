import type { Problem } from '../types';

interface ProblemExamplesProps {
  examples: Problem['examples'];
  className?: string;
  headingTag?: 'h3' | 'h4' | 'p';
  showSampleLabel?: boolean;
  fallbackEmpty?: boolean;
}

/**
 * Renders compact problem example cards with monospace input/output snippets
 * and visually distinct titles and explanations.
 */
export default function ProblemExamples({
  examples,
  className = '',
  headingTag = 'h3',
  showSampleLabel = true,
  fallbackEmpty = false,
}: ProblemExamplesProps) {
  if (examples.length === 0) return null;

  const TitleTag = headingTag;

  return (
    <div className={`space-y-2.5 ${className}`.trim()}>
      {examples.map((item, index) => (
        <div key={index} className="workspace-example-card">
          <div className="workspace-example-header">
            <TitleTag className="workspace-example-title">Example {index + 1}</TitleTag>
            {showSampleLabel && <span className="workspace-example-label">SAMPLE CASE</span>}
          </div>
          <div className="workspace-example-io">
            <div className="workspace-example-io-row">
              <span className="workspace-example-io-label">Input</span>
              <code className="workspace-code-block">{fallbackEmpty ? item.input || '—' : item.input}</code>
            </div>
            <div className="workspace-example-io-row">
              <span className="workspace-example-io-label">Output</span>
              <code className="workspace-code-block">{fallbackEmpty ? item.output || '—' : item.output}</code>
            </div>
          </div>
          {item.explanation && (
            <p className="workspace-example-explanation">
              <strong>Explanation: </strong>
              {item.explanation}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
