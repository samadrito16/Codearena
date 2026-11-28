export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type CodeLanguage = 'javascript' | 'python' | 'java' | 'cpp';

export interface TestCaseInput {
  caseNumber: number;
  input: string;
  expected: string;
  isHidden?: boolean;
}

export interface ProblemEditorial {
  problemId: string;
  isStaticDemo?: boolean;
  isVerified?: boolean;
  summary: string;
  hints: string[];
  approachTitle: string;
  approachSteps: string[];
  timeComplexity: string;
  spaceComplexity: string;
  pitfalls: string[];
  referenceCode?: {
    language: string;
    code: string;
  };
}

export interface Problem {
  owner?: 'practice' | 'daily' | 'interview' | 'placement' | 'contest';
  version?: number;
  testCount?: number;
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
  editorial?: ProblemEditorial;
  companyTags?: string[];
  campusTags?: string[];
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
export type UserPlan = 'free' | 'pro' | 'premium';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan?: UserPlan;
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

export interface CertificateMetrics {
  solvedCount: number;
  mediumCount: number;
  hardCount: number;
  rankPercentile?: number;
}

export interface IssuedCertificate {
  id: string;
  userId: string;
  recipientName: string;
  trackId: string;
  title: string;
  description: string;
  issueDate: string;
  expiryDate?: string;
  credentialHash: string;
  skills: string[];
  metrics: CertificateMetrics;
}

export interface CertificateTrack {
  id: string;
  title: string;
  description: string;
  requiredSolved: number;
  requiredMedium: number;
  requiredHard: number;
  skills: string[];
  isEligible: boolean;
  progressPct: number;
  currentSolved: number;
  currentMedium: number;
  currentHard: number;
}

export interface VerifiedBadge {
  id: string;
  title: string;
  description: string;
  category: 'milestone' | 'mastery' | 'streak' | 'interview';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  unlocked: boolean;
  unlockedAt?: string;
  verificationHash?: string;
  progress: number;
  target: number;
  progressLabel: string;
}

export interface PublicProfileBadge {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: string;
  unlockedAt: string;
  verificationHash: string;
}

export interface PublicProfileData {
  id: string;
  handle: string;
  name: string;
  bio: string;
  avatarMode: 'initials' | 'image';
  avatarColor: string;
  avatarImage: string;
  visibility: 'public' | 'private';
  company?: string;
  university?: string;
  location?: string;
  publicEmail?: string;
  website?: string;
  socialLinks?: string[];
  stats: {
    solvedCount: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    points: number;
    streak: number;
  };
  badges: PublicProfileBadge[];
  certificates: IssuedCertificate[];
  isPrivate?: boolean;
}

export interface AdaptiveMasteryPlan {
  enabled: boolean;
  targetGoal: string;
  targetDays: number;
  targetDate: string;
  dailyPace: number;
  prioritizeWeakPatterns: boolean;
  selectedPatternOrder: string[];
  startDate: string;
}

export interface PeerSolution {
  id: string;
  problemId: string;
  authorName: string;
  authorHandle: string;
  authorCollege?: string;
  authorAvatarColor?: string;
  title: string;
  intuitionNote: string; // The mandatory "Explain it in your own words" note
  timeComplexity: string;
  spaceComplexity: string;
  language: string;
  code: string;
  upvotes: number;
  hasUpvoted?: boolean;
  createdAt: string;
  tags?: string[];
}




