export type PatternId =
  | 'two_pointers'
  | 'sliding_window'
  | 'hash_maps'
  | 'dynamic_programming'
  | 'breadth_first_search';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface StatementExample {
  input: string;
  output: string;
  explanation: string;
}

export interface ProblemStatement {
  description: string;
  input_format: string;
  output_format: string;
  examples: StatementExample[];
  constraints: string[];
}

export interface BruteForceSolution {
  approach: string;
  why_it_is_too_slow: string;
  time_complexity: string;
  space_complexity: string;
  language: string;
  code: string;
}

export interface Subgoal {
  title: string;
  explanation: string;
  line_range: [number, number];
}

export interface CodeLine {
  line_number: number;
  code: string;
  why_this_line: string;
  is_high_risk: boolean;
  risk_note: string | null;
}

export interface OptimalSolution {
  language: string;
  approach: string;
  subgoals: Subgoal[];
  code: string;
  code_lines: CodeLine[];
  time_complexity: string;
  space_complexity: string;
  why_this_works: string;
}

export interface HardestLine {
  line_number: number;
  code: string;
  why_it_is_tricky: string;
  recommended_tests: string[];
}

export interface MasteryProblem {
  id: string;
  slug: string;
  title: string;
  pattern: PatternId;
  difficulty: Difficulty;
  estimated_minutes: number;
  statement: ProblemStatement;
  pattern_clues: string[];
  brute_force: BruteForceSolution;
  optimal_solution: OptimalSolution;
  hardest_lines_to_test: HardestLine[];
  hints: string[];
  trigger_words: string[];
  pattern_diagnosis_options: PatternId[];
  ai_avoid_keywords: string[];
  starter_code: string;
}

export interface MasteryCatalog {
  schema_version: string;
  catalog_id: string;
  platform: string;
  title: string;
  description: string;
  reference_language: string;
  supported_pattern_order: PatternId[];
  problems: MasteryProblem[];
}

export type RecallResult = 'got_it' | 'missed';

export interface ProblemProgress {
  diagnosed: boolean;
  selectedPattern: string | null;
  hintsUnlocked: number;
  recallResults: Record<number, RecallResult>;
  typedRecallDrafts?: Record<number, string>;
  mistakeNote: string;
  completed: boolean;
  codeAccepted?: boolean;
  codeDrafts?: Record<string, string>;
  bestDrillScore?: { recalled: number; total: number; timeSeconds: number };
  lastStudiedAt: string | null;
}

export interface MasteryProgressStore {
  version: string;
  problems: Record<string, ProblemProgress>;
}

export interface OverallMasteryStats {
  totalBlueprints: number;
  completedBlueprints: number;
  verifiedCodes: number;
  totalHighRiskLines: number;
  testedHighRiskLines: number;
  masteredHighRiskLines: number;
  patternCompletion: Record<PatternId, { total: number; completed: number; verified: number }>;
}
