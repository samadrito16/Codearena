export type PracticalTrack = 'frontend_ui' | 'backend_api' | 'sql_pipeline';
export type PracticalDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type PracticalRoleTarget =
  | 'Frontend Engineer'
  | 'Backend Engineer'
  | 'Full Stack Engineer'
  | 'Data Engineer / Analyst';

export interface PracticalFile {
  name: string;
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'sql';
  content: string;
  readOnly?: boolean;
}

export interface PracticalTestCase {
  id: string;
  title: string;
  description: string;
  assertionType: 'dom_element' | 'dom_event' | 'http_status' | 'sql_output' | 'js_return';
}

export interface TestAssertionResult {
  testId: string;
  title: string;
  passed: boolean;
  error?: string;
  durationMs?: number;
  expected?: string;
  actual?: string;
}

export interface PracticalChallenge {
  id: string;
  slug: string;
  title: string;
  track: PracticalTrack;
  difficulty: PracticalDifficulty;
  roleTarget: PracticalRoleTarget;
  estimatedMinutes: number;
  description: string;
  requirements: string[];
  designSpecs?: string[];
  tags: string[];
  files: PracticalFile[];
  testCases: PracticalTestCase[];
  testRunnerScript: string;
  solutionFiles: PracticalFile[];
  editorialMarkdown: string;
}
