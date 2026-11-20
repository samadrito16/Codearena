export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  email_verified: boolean;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
  userAgent?: string;
  ip?: string;
}

export interface PasswordResetToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  used: boolean;
  createdAt: string;
}

export interface EmailVerificationToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  used: boolean;
  createdAt: string;
}

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
  userId: string;
  problemId: string;
  title: string;
  difficulty: Difficulty;
  topics: string[];
  outcome: SubmissionOutcome;
  language: string;
  code?: string;
  timestamp: string;
  durationSeconds?: number;
  runtimeMs?: number;
  memoryMb?: number;
  source?: 'local' | 'onlinecompiler' | 'judge';
}

export interface ActivityEvent {
  id: string;
  userId: string;
  problemId: string;
  title: string;
  difficulty: Difficulty;
  topic: string;
  type: 'solved' | 'practice';
  timestamp: string;
  durationSeconds?: number;
}

export interface UserProfileData {
  displayName: string;
  bio: string;
  avatarMode: 'initials' | 'image';
  avatarColor: string;
  avatarImage: string;
  visibility: 'public' | 'private';
  updatedAt: string | null;
}

export interface UserProgressData {
  userId: string;
  solvedIds: string[];
  activityLog: ActivityEvent[];
  submissions: SubmissionRecord[];
  dailyCompletions: Record<string, string>;
  profile: UserProfileData;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  email: string;
  avatarColor: string;
  solvedCount: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  points: number;
  streak: number;
}

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

