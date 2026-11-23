import React, { useMemo } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  FileCode2,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import {
  LineAnnotation,
  PlantedBug,
  ReviewRubric,
  ReviewScenario,
  ScenarioAttempt,
} from '../../types/review';

interface RubricGraderProps {
  scenario: ReviewScenario;
  annotations: LineAnnotation[];
  attempt?: ScenarioAttempt;
  onGrade: (score: number, maxScore: number, matchedBugIds: string[]) => void;
  onRevealReference: () => void;
}

export function evaluateReview(
  scenario: ReviewScenario,
  annotations: LineAnnotation[]
): {
  score: number;
  maxScore: number;
  matchedBugs: { bug: PlantedBug; pointsEarned: number; matchedAnnotation?: LineAnnotation }[];
  missedBugs: PlantedBug[];
} {
  const rubric = scenario.review_rubric;
  let totalScore = 0;
  const matchedBugs: { bug: PlantedBug; pointsEarned: number; matchedAnnotation?: LineAnnotation }[] = [];
  const missedBugs: PlantedBug[] = [];

  for (const bug of scenario.planted_bugs) {
    const rubricItem = rubric.items.find((item) => item.bug_id === bug.bug_id);
    const maxBugPoints = rubricItem ? rubricItem.points : Math.round(rubric.max_score / scenario.planted_bugs.length);

    // Filter annotations targeting this file
    const fileAnnotations = annotations.filter((a) => a.filename === bug.file);

    // 1. Line range proximity check (+/- 3 lines leeway)
    const [startLine, endLine] = bug.line_range;
    const nearbyAnnotations = fileAnnotations.filter(
      (a) => a.lineNumber >= Math.max(1, startLine - 3) && a.lineNumber <= endLine + 3
    );

    // 2. Keyword relevance extraction
    const rawKeywords = [
      ...bug.title.toLowerCase().split(/\W+/),
      ...bug.expected_comment.toLowerCase().split(/\W+/),
      ...bug.type.toLowerCase().split(/\W+/),
    ].filter((w) => w.length >= 4);
    const distinctKeywords = Array.from(new Set(rawKeywords));

    let bestMatchScore = 0;
    let bestAnnotation: LineAnnotation | undefined;

    // Check all annotations for keyword matches
    for (const ann of fileAnnotations) {
      const annText = ann.comment.toLowerCase();
      const matchedCount = distinctKeywords.filter((kw) => annText.includes(kw)).length;
      const isNearby = nearbyAnnotations.includes(ann);

      let points = 0;
      if (isNearby && matchedCount >= 2) {
        // High confidence match: right location and mentions core bug concepts
        points = maxBugPoints;
      } else if (isNearby && (matchedCount === 1 || ann.category === 'bug' || ann.category === 'security')) {
        // Location match with some contextual intent
        points = Math.round(maxBugPoints * 0.75);
      } else if (matchedCount >= 3) {
        // Correct diagnosis even if line number is slightly off
        points = Math.round(maxBugPoints * 0.6);
      }

      if (points > bestMatchScore) {
        bestMatchScore = points;
        bestAnnotation = ann;
      }
    }

    if (bestMatchScore > 0) {
      totalScore += bestMatchScore;
      matchedBugs.push({
        bug,
        pointsEarned: bestMatchScore,
        matchedAnnotation: bestAnnotation,
      });
    } else {
      missedBugs.push(bug);
    }
  }

  return {
    score: Math.min(totalScore, rubric.max_score),
    maxScore: rubric.max_score,
    matchedBugs,
    missedBugs,
  };
}

export default function RubricGrader({
  scenario,
  annotations,
  attempt,
  onGrade,
  onRevealReference,
}: RubricGraderProps) {
  const isGraded = attempt?.score !== undefined;
  const isReferenceRevealed = Boolean(attempt?.referenceRevealed);

  const evaluation = useMemo(() => {
    return evaluateReview(scenario, annotations);
  }, [scenario, annotations]);

  function handleGradeClick() {
    const matchedIds = evaluation.matchedBugs.map((m) => m.bug.bug_id);
    onGrade(evaluation.score, evaluation.maxScore, matchedIds);
  }

  const scorePercentage = Math.round((evaluation.score / evaluation.maxScore) * 100);

  return (
    <div
      className="panel-card p-5 border space-y-5 rounded-2xl"
      style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}
    >
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--ca-border)' }}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Trophy size={16} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-primary">Senior Rubric Evaluation</h4>
            <p className="text-xs text-muted">
              Benchmark your review against the expected defect catch list.
            </p>
          </div>
        </div>

        {!isGraded ? (
          <button
            type="button"
            onClick={handleGradeClick}
            disabled={annotations.length === 0}
            className="btn-primary h-9 px-4 text-xs font-semibold gap-1.5 shadow-md disabled:opacity-50"
          >
            <Sparkles size={13} />
            <span>Grade My Review</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleGradeClick}
            className="btn-secondary h-8 px-3 text-xs font-semibold gap-1"
          >
            <RotateCcw size={12} />
            <span>Re-Grade</span>
          </button>
        )}
      </div>

      {/* When Not Graded Yet */}
      {!isGraded ? (
        <div className="text-xs text-muted space-y-2 py-1">
          <p>
            You have drafted{' '}
            <span className="font-bold text-primary font-mono">{annotations.length}</span> review{' '}
            {annotations.length === 1 ? 'comment' : 'comments'}.
          </p>
          <p className="text-[11px] leading-relaxed">
            When you have identified all critical flaws, click &ldquo;Grade My Review&rdquo; to assess your defect detection coverage and points earned.
          </p>
        </div>
      ) : (
        /* Graded Scorecard */
        <div className="space-y-4 animate-in fade-in">
          {/* Top Score Banner */}
          <div
            className="rounded-2xl border p-4 flex flex-wrap items-center justify-between gap-4"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl font-mono text-base font-bold border ${
                  scorePercentage >= 75
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                    : scorePercentage >= 50
                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                }`}
              >
                {scorePercentage}%
              </div>
              <div>
                <div className="text-xs font-bold text-primary">
                  {scorePercentage >= 75
                    ? 'Exemplary Audit — Pass'
                    : scorePercentage >= 50
                    ? 'Competent Review — Partial'
                    : 'Missed Critical Invariants'}
                </div>
                <div className="text-[11px] font-mono text-muted">
                  Earned {evaluation.score} of {evaluation.maxScore} possible points
                </div>
              </div>
            </div>

            {/* Counts */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                <CheckCircle2 size={13} />
                {evaluation.matchedBugs.length} Caught
              </span>
              <span className="inline-flex items-center gap-1 text-rose-500 font-bold bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                <XCircle size={13} />
                {evaluation.missedBugs.length} Missed
              </span>
            </div>
          </div>

          {/* User Decision: Show Reference Review Button */}
          {!isReferenceRevealed ? (
            <div className="p-4 rounded-xl border border-dashed border-indigo-500/30 bg-indigo-500/5 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-primary">Reveal Staff Engineer Reference Review</div>
                <div className="text-[11px] text-muted">
                  Inspect the exact root causes, code solutions, and model review comments.
                </div>
              </div>
              <button
                type="button"
                onClick={onRevealReference}
                className="btn-primary h-8 px-3 text-xs font-semibold gap-1.5"
              >
                <Eye size={13} />
                <span>Show Reference Review</span>
              </button>
            </div>
          ) : (
            /* Reference Review Expanded View */
            <div className="space-y-4 pt-2 border-t animate-in fade-in" style={{ borderColor: 'var(--ca-border)' }}>
              <div className="flex items-center gap-2">
                <Award size={15} className="text-indigo-500" />
                <h5 className="text-xs font-bold uppercase tracking-wider text-primary">
                  Staff Engineer Reference Solution
                </h5>
              </div>

              <div
                className="p-4 rounded-xl border font-sans text-xs text-primary leading-relaxed whitespace-pre-wrap"
                style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
              >
                {scenario.reference_review}
              </div>

              {/* Breakdown of each planted flaw */}
              <div className="space-y-2">
                <h6 className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  Planted Flaws Breakdown
                </h6>
                <div className="space-y-2">
                  {scenario.planted_bugs.map((bug) => {
                    const isMatched = evaluation.matchedBugs.some((m) => m.bug.bug_id === bug.bug_id);
                    return (
                      <div
                        key={bug.bug_id}
                        className="rounded-xl border p-3 text-xs space-y-1.5"
                        style={{
                          borderColor: isMatched ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)',
                          background: isMatched ? 'rgba(16, 185, 129, 0.04)' : 'rgba(244, 63, 94, 0.04)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">
                            {bug.title}
                          </span>
                          <span
                            className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                              isMatched
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                            }`}
                          >
                            {isMatched ? '✓ Caught' : '✗ Missed'}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted leading-relaxed">
                          {bug.explanation}
                        </p>
                        <div className="pt-1 text-[11px] font-mono text-muted/80">
                          Expected Location: <span className="text-primary">{bug.file}:L{bug.line_range[0]}-L{bug.line_range[1]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
