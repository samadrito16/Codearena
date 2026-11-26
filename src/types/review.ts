export type ReviewCategory =
  | 'async_concurrency'
  | 'ai_gen_audit'
  | 'multi_file_logic'
  | 'security_audit'
  | 'performance_regression';

export type ReviewDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export type BugSeverity = 'critical' | 'major' | 'minor';

export type ReviewExecutionMode = 'client_js' | 'backend_container';

export type ReviewRuntimeLanguage = 'javascript' | 'typescript' | 'python';

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

export interface ReviewTestCase {
  id: string;
  title: string;
  description: string;
  isRegressionCheck?: boolean;
}

export interface ReviewTestResult {
  testId: string;
  title: string;
  passed: boolean;
  error?: string;
  expected?: string;
  actual?: string;
  durationMs?: number;
}

export interface ReviewSolutionFile {
  filename: string;
  content: string;
}

export interface ReviewTestSuite {
  scenarioId: string;
  executionMode: ReviewExecutionMode;
  runtimeLanguage: ReviewRuntimeLanguage;
  testCases: ReviewTestCase[];
  harnessCode: string;
  solutionFiles: ReviewSolutionFile[];
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
  testSuite?: ReviewTestSuite;
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

export interface ScenarioAttempt {
  scenarioId: string;
  editedFiles: Record<string, string>;
  testResults?: ReviewTestResult[];
  testsPassedCount?: number;
  totalTestsCount?: number;
  verifiedFixed?: boolean;
  score?: number;
  maxScore?: number;
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
  fixedScenarios: number;
  totalTestsPassing: number;
  totalPointsEarned: number;
  totalMaxPoints: number;
  categoryStats: Record<ReviewCategory, { total: number; completed: number }>;
}
