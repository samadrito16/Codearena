export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type CodeLanguage = 'javascript' | 'python' | 'java' | 'cpp';

export interface TestCaseInput {
  caseNumber: number;
  input: string;
  expected: string;
  isHidden?: boolean;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  topics: string[];
  acceptance: string;
  submissions: string;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode?: Partial<Record<CodeLanguage, string>>;
  testCases?: TestCaseInput[];
  orderInvariant?: boolean;
}

export type SubmissionOutcome = 'accepted' | 'wrong_answer' | 'tle' | 'runtime_error' | 'compilation_error';

export interface SubmissionRecord {
  id: string;
  problemId: string;
  title: string;
  difficulty: Difficulty;
  topics: string[];
  outcome: SubmissionOutcome;
  language: string;
  timestamp: string;
  durationSeconds?: number;
  runtimeMs?: number;
  memoryMb?: number;
  source?: 'local' | 'onlinecompiler' | 'judge';
}

export interface ActivityEvent {
  id: string;
  problemId: string;
  title: string;
  difficulty: Difficulty;
  topic: string;
  type: 'solved' | 'practice';
  timestamp: string;
  durationSeconds?: number;
}

export interface ProblemNote {
  content: string;
  updatedAt: string;
}

export interface ProblemCollection {
  id: string;
  name: string;
  problemIds: string[];
  createdAt: string;
}

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  email_verified: boolean;
}

/** Legacy alias for backwards compatibility */
export type DemoUser = User;

export type ProfileVisibility = 'public' | 'private';
export type AvatarMode = 'initials' | 'image';
export type AvatarColorId = 'indigo' | 'emerald' | 'amber' | 'rose' | 'cyan' | 'violet';

export interface LocalProfile {
  displayName: string;
  bio: string;
  avatarMode: AvatarMode;
  avatarColor: AvatarColorId;
  avatarImage: string;
  visibility: ProfileVisibility;
  updatedAt: string | null;
  // GitHub-style profile attributes
  pronouns?: string;
  company?: string;
  university?: string;
  location?: string;
  displayLocalTime?: boolean;
  publicEmail?: string;
  website?: string;
  socialLinks?: string[];
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  showEmail: boolean;
  showAffiliation: boolean;
  showLocation: boolean;
  showLocalTime: boolean;
  showSocials: boolean;
  showHeatmap: boolean;
  showSolvedProblems: boolean;
  showAchievements: boolean;
}

export type ThemeMode = 'dark' | 'light';
export type FontSize = 'compact' | 'standard' | 'large';

export type PaletteId = 'copper' | 'frost' | 'crimson' | 'onyx' | 'dune';

export type AuditAction =
  | 'create_problem'
  | 'update_problem'
  | 'delete_problem'
  | 'import_problems'
  | 'update_user_role';

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: AuditAction;
  targetId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  timestamp: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  verifiedUsers: number;
  totalProblems: number;
  totalSubmissions: number;
  totalAuditLogs: number;
  activeSessions: number;
}

export interface AdminImportResponse {
  success: boolean;
  fileName: string;
  totalSubmitted: number;
  acceptedCount: number;
  importedCount: number;
  updatedCount: number;
  rejectedCount: number;
  accepted: Problem[];
  rejected: { row: number; label: string; reasons: string[] }[];
}

