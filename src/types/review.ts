export type ReviewCategory =
  | 'async_concurrency'
  | 'ai_gen_audit'
  | 'multi_file_logic'
  | 'security_audit'
  | 'performance_regression';

export type ReviewDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export type BugSeverity = 'critical' | 'major' | 'minor';

export type AnnotationCategory = 'bug' | 'performance' | 'security' | 'style' | 'question';

export interface ReviewFile {
  filename: string;
  language: string;
  content: string;
  is_primary: boolean;
}

export interface PlantedBug {
  bug_id: string;
  type: string;
  file: string;
  line_range: [number, number];
  title: string;
  explanation: string;
  severity: BugSeverity;
  expected_comment: string;
  hint_level_1: string;
  hint_level_2: string;
  hint_level_3: string;
}

export interface RubricItem {
  bug_id: string;
  points: number;
  required: boolean;
}

export interface ReviewRubric {
  max_score: number;
  catch_all_bonus?: number;
  items: RubricItem[];
}

export interface ReviewScenario {
  id: string;
  slug: string;
  title: string;
  category: ReviewCategory;
  difficulty: ReviewDifficulty;
  company_tags: string[];
  estimated_minutes: number;
  context: string;
  files: ReviewFile[];
  planted_bugs: PlantedBug[];
  review_rubric: ReviewRubric;
  reference_review: string;
  ai_generation_context?: string;
  learning_tags: string[];
}

export interface ReviewCatalog {
  schema_version: string;
  catalog_id: string;
  platform: string;
  title: string;
  description: string;
  categories: ReviewCategory[];
  scenarios: ReviewScenario[];
}

export interface LineAnnotation {
  id: string;
  filename: string;
  lineNumber: number;
  comment: string;
  category: AnnotationCategory;
  timestamp: string;
}

export interface ScenarioAttempt {
  scenarioId: string;
  annotations: LineAnnotation[];
  score?: number;
  maxScore?: number;
  matchedBugIds?: string[];
  rubricRevealed?: boolean;
  referenceRevealed?: boolean;
  hintsUsed: Record<string, number>; // bug_id -> hint level (1, 2, or 3)
  startedAt: string;
  completedAt?: string;
  bestScore?: number;
}

export interface ReviewProgressStore {
  version: string;
  attempts: Record<string, ScenarioAttempt>; // scenarioId -> attempt
}

export interface OverallReviewStats {
  totalScenarios: number;
  attemptedScenarios: number;
  reviewedScenarios: number;
  totalBugsCaught: number;
  totalPointsEarned: number;
  totalMaxPoints: number;
  categoryStats: Record<ReviewCategory, { total: number; completed: number }>;
}
