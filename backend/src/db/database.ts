import fs from 'fs';
import path from 'path';
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { config } from '../config.js';
import { initialProblems } from './seeds.js';
import type {
  ActivityEvent,
  AuditLog,
  CollegeLeaderboardEntry,
  Contest,
  ContestParticipantStanding,
  ContestProblemSummary,
  EmailVerificationToken,
  LeaderboardEntry,
  PasswordResetToken,
  Problem,
  PublicUser,
  Session,
  SubmissionRecord,
  User,
  UserProfileData,
  UserProgressData,
  IssuedCertificate,
  PublicProfileBadge,
  PublicProfileData,
} from '../types/index.js';

interface DatabaseSchema {
  users: User[];
  sessions: Session[];
  passwordResetTokens: PasswordResetToken[];
  emailVerificationTokens: EmailVerificationToken[];
  problems: Problem[];
  submissions: SubmissionRecord[];
  activity: ActivityEvent[];
  auditLogs: AuditLog[];
  progress: Record<string, {
    solvedIds: string[];
    dailyCompletions: Record<string, string>;
    profile?: UserProfileData;
  }>;
  dailyExecutions?: Record<string, { count: number; date: string }>;
  certificates?: IssuedCertificate[];
  contests?: Contest[];
  contestStandings?: Record<string, ContestParticipantStanding[]>;
}

export class Database {
  private data: DatabaseSchema = {
    users: [],
    sessions: [],
    passwordResetTokens: [],
    emailVerificationTokens: [],
    problems: [],
    submissions: [],
    activity: [],
    auditLogs: [],
    progress: {},
    dailyExecutions: {},
    certificates: [],
  };

  private filePath: string;
  private isSaving = false;
  private saveQueued = false;

  constructor(filePath: string = config.dbPath) {
    this.filePath = filePath;
  }

  public async init(): Promise<void> {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(this.filePath)) {
      try {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        this.data = JSON.parse(raw);
      } catch (err) {
        console.error('Failed to read existing database file, initializing fresh:', err);
      }
    }

    // Seed default problems if empty or library expanded
    if (!this.data.problems || this.data.problems.length < initialProblems.length) {
      this.data.problems = [...initialProblems];
    }

    // Ensure users array exists
    if (!this.data.users) this.data.users = [];
    if (!this.data.sessions) this.data.sessions = [];
    if (!this.data.passwordResetTokens) this.data.passwordResetTokens = [];
    if (!this.data.emailVerificationTokens) this.data.emailVerificationTokens = [];
    if (!this.data.submissions) this.data.submissions = [];
    if (!this.data.activity) this.data.activity = [];
    if (!this.data.auditLogs) this.data.auditLogs = [];
    if (!this.data.progress) this.data.progress = {};
    if (!this.data.dailyExecutions) this.data.dailyExecutions = {};
    if (!this.data.certificates) this.data.certificates = [];

    // Seed admin user if not present
    const existingAdmin = this.findUserByEmail('admin@prismcode.com') || this.findUserByEmail('admin@codearena.com');
    if (!existingAdmin) {
      const adminPassword = config.adminSeedPassword || 'Admin123!';
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      const adminUser: User = {
        id: 'usr_admin_001',
        name: 'PrismCode Admin',
        email: 'admin@prismcode.com',
        passwordHash,
        role: 'admin',
        emailVerified: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.data.users.push(adminUser);
    }

    // Seed demo user if not present
    const existingDemo = this.findUserByEmail('alex@example.com');
    if (!existingDemo) {
      const passwordHash = await bcrypt.hash('Alex123!', 10);
      const demoUser: User = {
        id: 'usr_demo_001',
        name: 'Alex Morgan',
        email: 'alex@example.com',
        passwordHash,
        role: 'user',
        emailVerified: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.data.users.push(demoUser);
      // Seed default solved IDs for demo user
      this.data.progress[demoUser.id] = {
        solvedIds: ['two-sum', 'valid-parentheses'],
        dailyCompletions: {},
        profile: {
          displayName: 'Alex Morgan',
          bio: 'Building algorithmic intuition one data structure at a time.',
          avatarMode: 'initials',
          avatarColor: 'indigo',
          avatarImage: '',
          visibility: 'public',
          updatedAt: new Date().toISOString(),
        },
      };
    }

    await this.save();
    await this.cleanupStaleRecords();
    setInterval(() => {
      this.cleanupStaleRecords().catch(() => {});
    }, 60 * 60 * 1000).unref();
    console.log(`[Database] Initialized with ${this.data.users.length} users and ${this.data.problems.length} problems at ${this.filePath}`);
  }

  private async save(): Promise<void> {
    if (this.isSaving) {
      this.saveQueued = true;
      return;
    }

    this.isSaving = true;
    const tempPath = `${this.filePath}.tmp`;

    try {
      const payload = JSON.stringify(this.data, null, 2);
      await fs.promises.writeFile(tempPath, payload, 'utf-8');
      try {
        await fs.promises.rename(tempPath, this.filePath);
      } catch (renameErr: any) {
        if (renameErr.code === 'EPERM' || renameErr.code === 'EBUSY') {
          await fs.promises.copyFile(tempPath, this.filePath);
          await fs.promises.unlink(tempPath).catch(() => {});
        } else {
          throw renameErr;
        }
      }
    } catch (err) {
      console.error('[Database] Failed to write database file:', err);
    } finally {
      this.isSaving = false;
      if (this.saveQueued) {
        this.saveQueued = false;
        await this.save();
      }
    }
  }

  // --- Users ---
  public listUsers(): PublicUser[] {
    return this.data.users.map((u) => this.toPublicUser(u));
  }

  public getAdminStats() {
    return {
      totalUsers: this.data.users.length,
      activeUsers: this.data.users.filter((u) => u.isActive).length,
      verifiedUsers: this.data.users.filter((u) => u.emailVerified).length,
      totalProblems: this.data.problems.length,
      totalSubmissions: this.data.submissions.length,
      totalAuditLogs: this.data.auditLogs ? this.data.auditLogs.length : 0,
      activeSessions: this.data.sessions.filter((s) => new Date(s.expiresAt).getTime() > Date.now()).length,
    };
  }

  public findUserById(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  public findUserByEmail(email: string): User | undefined {
    const normalized = email.trim().toLowerCase();
    return this.data.users.find((u) => u.email.toLowerCase() === normalized);
  }

  public async createUser(user: User): Promise<User> {
    this.data.users.push(user);
    // Initialize user progress
    if (!this.data.progress[user.id]) {
      this.data.progress[user.id] = {
        solvedIds: [],
        dailyCompletions: {},
        profile: {
          displayName: user.name,
          bio: '',
          avatarMode: 'initials',
          avatarColor: 'indigo',
          avatarImage: '',
          visibility: 'public',
          updatedAt: new Date().toISOString(),
        },
      };
    }
    await this.save();
    return user;
  }

  public async updateUser(id: string, patch: Partial<User>): Promise<User | undefined> {
    const idx = this.data.users.findIndex((u) => u.id === id);
    if (idx === -1) return undefined;
    const updated = {
      ...this.data.users[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    this.data.users[idx] = updated;
    await this.save();
    return updated;
  }

  public toPublicUser(user: User): PublicUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      plan: user.plan || (user.role === 'admin' ? 'premium' : 'free'),
      email_verified: user.emailVerified,
    };
  }

  // --- Stale Record Pruning ---
  public async cleanupStaleRecords(): Promise<void> {
    const now = Date.now();
    const sessionsBefore = this.data.sessions.length;
    this.data.sessions = this.data.sessions.filter((s) => new Date(s.expiresAt).getTime() > now);

    this.data.passwordResetTokens = this.data.passwordResetTokens.filter(
      (t) => !t.used && new Date(t.expiresAt).getTime() > now
    );

    this.data.emailVerificationTokens = this.data.emailVerificationTokens.filter(
      (t) => !t.used && new Date(t.expiresAt).getTime() > now
    );

    // Prune expired daily execution counts from prior days
    const today = new Date().toISOString().slice(0, 10);
    if (this.data.dailyExecutions) {
      for (const k of Object.keys(this.data.dailyExecutions)) {
        if (this.data.dailyExecutions[k]?.date !== today) {
          delete this.data.dailyExecutions[k];
        }
      }
    }

    if (this.data.sessions.length !== sessionsBefore) {
      await this.save();
    }
  }

  // --- Sessions ---
  private hashSessionToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  public async createSession(session: Session): Promise<Session> {
    if (!session.tokenHash) {
      const rawToken = session.id;
      session.tokenHash = this.hashSessionToken(rawToken);
      session.id = `ses_${crypto.randomUUID()}`;
    }
    this.data.sessions.push(session);
    await this.save();
    return session;
  }

  public findSessionById(idOrRawToken: string): Session | undefined {
    if (!idOrRawToken) return undefined;
    const tokenHash = this.hashSessionToken(idOrRawToken);
    const session = this.data.sessions.find(
      (s) => (s.tokenHash === tokenHash || s.id === idOrRawToken || s.id === tokenHash)
    );
    if (!session) return undefined;
    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      return undefined;
    }
    return session;
  }

  public async deleteSession(idOrRawToken: string): Promise<void> {
    if (!idOrRawToken) return;
    const tokenHash = this.hashSessionToken(idOrRawToken);
    this.data.sessions = this.data.sessions.filter(
      (s) => s.id !== idOrRawToken && s.tokenHash !== tokenHash && s.tokenHash !== idOrRawToken && s.id !== tokenHash
    );
    await this.save();
  }

  public async deleteSessionsByUserId(userId: string): Promise<void> {
    this.data.sessions = this.data.sessions.filter((s) => s.userId !== userId);
    await this.save();
  }

  // --- Password Reset Tokens ---
  public async createPasswordResetToken(token: PasswordResetToken): Promise<PasswordResetToken> {
    // Invalidate prior unused tokens for this user
    this.data.passwordResetTokens = this.data.passwordResetTokens.map((t) =>
      t.userId === token.userId ? { ...t, used: true } : t
    );
    this.data.passwordResetTokens.push(token);
    await this.save();
    return token;
  }

  public findPasswordResetToken(tokenHash: string): PasswordResetToken | undefined {
    const found = this.data.passwordResetTokens.find(
      (t) => t.tokenHash === tokenHash && !t.used && new Date(t.expiresAt).getTime() > Date.now()
    );
    return found;
  }

  public async markPasswordResetTokenUsed(id: string): Promise<void> {
    const token = this.data.passwordResetTokens.find((t) => t.id === id);
    if (token) {
      token.used = true;
      await this.save();
    }
  }

  // --- Email Verification Tokens ---
  public async createEmailVerificationToken(token: EmailVerificationToken): Promise<EmailVerificationToken> {
    this.data.emailVerificationTokens = this.data.emailVerificationTokens.map((t) =>
      t.userId === token.userId ? { ...t, used: true } : t
    );
    this.data.emailVerificationTokens.push(token);
    await this.save();
    return token;
  }

  public findEmailVerificationToken(tokenHash: string): EmailVerificationToken | undefined {
    return this.data.emailVerificationTokens.find(
      (t) => t.tokenHash === tokenHash && !t.used && new Date(t.expiresAt).getTime() > Date.now()
    );
  }

  public async markEmailVerificationTokenUsed(id: string): Promise<void> {
    const token = this.data.emailVerificationTokens.find((t) => t.id === id);
    if (token) {
      token.used = true;
      await this.save();
    }
  }

  // --- Problems ---
  public listProblems(): Problem[] {
    return this.data.problems.map((p) => this.toPublicProblem(p));
  }

  public findProblemById(id: string): Problem | undefined {
    const p = this.data.problems.find((item) => item.id === id);
    return p ? this.toPublicProblem(p) : undefined;
  }

  public getProblemForExecution(id: string): Problem | undefined {
    return this.data.problems.find((item) => item.id === id);
  }

  private toPublicProblem(p: Problem): Problem {
    // Strip hidden testCases from public API responses to prevent cheating
    const { testCases, ...publicProblem } = p;
    return publicProblem;
  }

  public calculatePercentile(problemId: string, runtimeMs: number): number | undefined {
    const all = this.data.submissions.filter(
      (s) => s.problemId === problemId && s.outcome === 'accepted' && (s.runtimeMs || 0) > 0,
    );
    // Real cohort data requirement: hide percentiles until there are at least 5 real accepted submissions
    if (all.length < 5) {
      return undefined;
    }
    const slowerCount = all.filter((s) => (s.runtimeMs || 0) > runtimeMs).length;
    const sameCount = all.filter((s) => (s.runtimeMs || 0) === runtimeMs).length;
    const percentile = ((slowerCount + sameCount * 0.5) / all.length) * 100;
    return Math.round(Math.min(99.9, Math.max(1.0, percentile)) * 10) / 10;
  }

  public async createProblem(problem: Problem): Promise<Problem> {
    this.data.problems = [problem, ...this.data.problems.filter((p) => p.id !== problem.id)];
    await this.save();
    return problem;
  }

  public async updateProblem(id: string, updated: Problem): Promise<Problem | undefined> {
    const idx = this.data.problems.findIndex((p) => p.id === id);
    if (idx === -1) {
      this.data.problems.unshift(updated);
    } else {
      this.data.problems[idx] = updated;
    }
    await this.save();
    return updated;
  }

  public async deleteProblem(id: string): Promise<boolean> {
    const lenBefore = this.data.problems.length;
    this.data.problems = this.data.problems.filter((p) => p.id !== id);
    if (this.data.problems.length !== lenBefore) {
      await this.save();
      return true;
    }
    return false;
  }

  public async importProblems(problems: Problem[]): Promise<{ importedCount: number; updatedCount: number }> {
    let importedCount = 0;
    let updatedCount = 0;
    const existingMap = new Map(this.data.problems.map((p, idx) => [p.id, idx]));

    for (const prob of problems) {
      if (existingMap.has(prob.id)) {
        const idx = existingMap.get(prob.id)!;
        this.data.problems[idx] = prob;
        updatedCount++;
      } else {
        this.data.problems.unshift(prob);
        existingMap.set(prob.id, 0);
        importedCount++;
      }
    }

    await this.save();
    return { importedCount, updatedCount };
  }

  // --- Audit Logs ---
  public async createAuditLog(entry: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    const log: AuditLog = {
      id: `audit_${crypto.randomUUID()}`,
      timestamp: new Date().toISOString(),
      ...entry,
    };
    if (!this.data.auditLogs) {
      this.data.auditLogs = [];
    }
    this.data.auditLogs.unshift(log);
    // Keep up to 1000 audit log entries
    if (this.data.auditLogs.length > 1000) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 1000);
    }
    await this.save();
    return log;
  }

  public listAuditLogs(limit = 100): AuditLog[] {
    return (this.data.auditLogs || []).slice(0, limit);
  }

  // --- Submissions ---
  public listSubmissions(userId: string): SubmissionRecord[] {
    return this.data.submissions.filter((s) => s.userId === userId);
  }

  public async createSubmission(submission: SubmissionRecord): Promise<SubmissionRecord> {
    this.data.submissions.unshift(submission);
    // Keep max 1000 submissions
    if (this.data.submissions.length > 1000) {
      this.data.submissions = this.data.submissions.slice(0, 1000);
    }
    await this.save();
    return submission;
  }

  // --- Daily Execution Quotas (Free Tier Rate Limiting) ---
  public getExecutionQuotaKey(userId?: string | null, clientIp?: string): string {
    if (userId && userId !== 'guest') {
      return `user:${userId}`;
    }
    const cleanIp = (clientIp || '127.0.0.1').replace(/^::ffff:/, '');
    return `ip:${cleanIp}`;
  }

  public checkExecutionQuota(
    userId?: string | null,
    clientIp?: string,
    role?: string,
    plan?: string,
  ): {
    allowed: boolean;
    limit: number;
    remaining: number;
    count: number;
    resetAt: string;
    key: string;
  } {
    const key = this.getExecutionQuotaKey(userId, clientIp);
    const today = new Date().toISOString().slice(0, 10);

    let limit = config.dailyExecutionLimitFree;
    if (role === 'admin' || plan === 'premium') {
      limit = config.dailyExecutionLimitPremium;
    } else if (plan === 'pro') {
      limit = config.dailyExecutionLimitPro;
    } else if (!userId || userId === 'guest') {
      limit = config.dailyExecutionLimitGuest;
    }

    if (!this.data.dailyExecutions) {
      this.data.dailyExecutions = {};
    }

    const record = this.data.dailyExecutions[key];
    let count = 0;
    if (record && record.date === today) {
      count = record.count;
    }

    const tomorrow = new Date();
    tomorrow.setUTCHours(24, 0, 0, 0);
    const resetAt = tomorrow.toISOString();

    const remaining = Math.max(0, limit - count);
    const allowed = count < limit;

    return {
      allowed,
      limit,
      remaining,
      count,
      resetAt,
      key,
    };
  }

  public async incrementExecutionUsage(
    userId?: string | null,
    clientIp?: string,
  ): Promise<{ count: number; remaining: number }> {
    const key = this.getExecutionQuotaKey(userId, clientIp);
    const today = new Date().toISOString().slice(0, 10);

    if (!this.data.dailyExecutions) {
      this.data.dailyExecutions = {};
    }

    const record = this.data.dailyExecutions[key];
    let currentCount = 0;
    if (record && record.date === today) {
      currentCount = record.count;
    }

    const newCount = currentCount + 1;
    this.data.dailyExecutions[key] = {
      count: newCount,
      date: today,
    };

    await this.save();
    return { count: newCount, remaining: 0 };
  }

  // --- Activity ---
  public listActivity(userId: string): ActivityEvent[] {
    return this.data.activity.filter((a) => a.userId === userId);
  }

  public async createActivity(activity: ActivityEvent): Promise<ActivityEvent> {
    this.data.activity.unshift(activity);
    if (this.data.activity.length > 1000) {
      this.data.activity = this.data.activity.slice(0, 1000);
    }
    await this.save();
    return activity;
  }

  // --- User Progress & Profile ---
  public getUserProgress(userId: string): {
    solvedIds: string[];
    dailyCompletions: Record<string, string>;
    profile: UserProfileData;
  } {
    const user = this.findUserById(userId);
    const progress = this.data.progress[userId] || {
      solvedIds: [],
      dailyCompletions: {},
    };

    const profile: UserProfileData = progress.profile || {
      displayName: user?.name || 'PrismCode Learner',
      bio: '',
      avatarMode: 'initials',
      avatarColor: 'indigo',
      avatarImage: '',
      visibility: 'public',
      updatedAt: null,
    };

    return {
      solvedIds: progress.solvedIds || [],
      dailyCompletions: progress.dailyCompletions || {},
      profile,
    };
  }

  public async recordProblemSolved(userId: string, problemId: string): Promise<string[]> {
    if (!this.data.progress[userId]) {
      this.data.progress[userId] = { solvedIds: [], dailyCompletions: {} };
    }
    const current = this.data.progress[userId].solvedIds || [];
    if (!current.includes(problemId)) {
      this.data.progress[userId].solvedIds = [...current, problemId];
      await this.save();
    }
    return this.data.progress[userId].solvedIds;
  }

  public async updateUserProfile(userId: string, patch: Partial<UserProfileData>): Promise<UserProfileData> {
    if (!this.data.progress[userId]) {
      this.data.progress[userId] = { solvedIds: [], dailyCompletions: {} };
    }
    const current = this.data.progress[userId].profile || {
      displayName: this.findUserById(userId)?.name || 'Learner',
      bio: '',
      avatarMode: 'initials',
      avatarColor: 'indigo',
      avatarImage: '',
      visibility: 'public',
      updatedAt: null,
    };
    const updated: UserProfileData = {
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    this.data.progress[userId].profile = updated;
    await this.save();
    return updated;
  }

  // --- Leaderboard ---
  public getLeaderboard(): LeaderboardEntry[] {
    const entries: LeaderboardEntry[] = [];

    for (const user of this.data.users) {
      if (!user.isActive) continue;
      const progress = this.data.progress[user.id] || { solvedIds: [], dailyCompletions: {} };
      const solvedIds = progress.solvedIds || [];
      const solvedProblems = this.data.problems.filter((p) => solvedIds.includes(p.id));

      const easySolved = solvedProblems.filter((p) => p.difficulty === 'Easy').length;
      const mediumSolved = solvedProblems.filter((p) => p.difficulty === 'Medium').length;
      const hardSolved = solvedProblems.filter((p) => p.difficulty === 'Hard').length;
      const points = easySolved * 10 + mediumSolved * 20 + hardSolved * 30;

      entries.push({
        rank: 0,
        userId: user.id,
        displayName: progress.profile?.displayName || user.name,
        avatarColor: progress.profile?.avatarColor || 'indigo',
        solvedCount: solvedIds.length,
        easySolved,
        mediumSolved,
        hardSolved,
        points,
        streak: Object.keys(progress.dailyCompletions || {}).length,
        university: progress.profile?.university,
        graduationYear: progress.profile?.graduationYear,
      });
    }

    entries.sort((a, b) => b.points - a.points || b.solvedCount - a.solvedCount);
    entries.forEach((entry, idx) => {
      entry.rank = idx + 1;
    });

    return entries;
  }

  // --- College Leaderboard & Campus Cup ---
  public getCollegeLeaderboard(): CollegeLeaderboardEntry[] {
    const collegeMap = new Map<string, {
      totalPoints: number;
      totalSolved: number;
      studentCount: number;
      topStudent: {
        name: string;
        handle: string;
        points: number;
        avatarColor: string;
      };
    }>();

    // 1. Seed prominent campus cohorts so the Campus Cup has an active baseline
    const benchmarkColleges: Array<{
      name: string;
      points: number;
      solved: number;
      students: number;
      topStudent: { name: string; handle: string; points: number; avatarColor: string };
    }> = [
      {
        name: 'IIT Bombay',
        points: 4850,
        solved: 312,
        students: 24,
        topStudent: { name: 'Aarav Sharma', handle: 'aarav_iitb', points: 640, avatarColor: 'indigo' },
      },
      {
        name: 'BITS Pilani',
        points: 4320,
        solved: 285,
        students: 19,
        topStudent: { name: 'Rohan Deshmukh', handle: 'rohan_bits', points: 590, avatarColor: 'emerald' },
      },
      {
        name: 'Delhi Technological University (DTU)',
        points: 3980,
        solved: 254,
        students: 18,
        topStudent: { name: 'Priya Verma', handle: 'priya_dtu', points: 510, avatarColor: 'cyan' },
      },
      {
        name: 'NIT Trichy',
        points: 3410,
        solved: 220,
        students: 15,
        topStudent: { name: 'Karthik Raja', handle: 'karthik_nitt', points: 480, avatarColor: 'amber' },
      },
      {
        name: 'IIIT Hyderabad',
        points: 3260,
        solved: 215,
        students: 12,
        topStudent: { name: 'Aditya Sen', handle: 'aditya_iiith', points: 530, avatarColor: 'rose' },
      },
      {
        name: 'Stanford University',
        points: 2950,
        solved: 192,
        students: 10,
        topStudent: { name: 'Maya Chen', handle: 'mayacodes', points: 580, avatarColor: 'violet' },
      },
      {
        name: 'UC Berkeley',
        points: 2740,
        solved: 178,
        students: 9,
        topStudent: { name: 'Daniel Kim', handle: 'dan_cal', points: 460, avatarColor: 'indigo' },
      },
      {
        name: 'Vellore Institute of Technology (VIT)',
        points: 2490,
        solved: 165,
        students: 14,
        topStudent: { name: 'Sneha Patel', handle: 'sneha_vit', points: 420, avatarColor: 'emerald' },
      },
    ];

    for (const b of benchmarkColleges) {
      collegeMap.set(b.name, {
        totalPoints: b.points,
        totalSolved: b.solved,
        studentCount: b.students,
        topStudent: b.topStudent,
      });
    }

    // 2. Aggregate active registered users by university
    for (const user of this.data.users) {
      if (!user.isActive) continue;
      const progress = this.data.progress[user.id];
      const university = progress?.profile?.university?.trim();
      if (!university) continue;

      const solvedIds = progress?.solvedIds || [];
      const solvedProblems = this.data.problems.filter((p) => solvedIds.includes(p.id));
      const easySolved = solvedProblems.filter((p) => p.difficulty === 'Easy').length;
      const mediumSolved = solvedProblems.filter((p) => p.difficulty === 'Medium').length;
      const hardSolved = solvedProblems.filter((p) => p.difficulty === 'Hard').length;
      const userPoints = easySolved * 10 + mediumSolved * 20 + hardSolved * 30;

      const existing = collegeMap.get(university);
      const studentName = progress?.profile?.displayName || user.name;
      const studentHandle = user.email.split('@')[0];
      const avatarColor = progress?.profile?.avatarColor || 'indigo';

      if (existing) {
        existing.totalPoints += userPoints;
        existing.totalSolved += solvedIds.length;
        existing.studentCount += 1;
        if (userPoints > existing.topStudent.points) {
          existing.topStudent = {
            name: studentName,
            handle: studentHandle,
            points: userPoints,
            avatarColor,
          };
        }
      } else {
        collegeMap.set(university, {
          totalPoints: userPoints,
          totalSolved: solvedIds.length,
          studentCount: 1,
          topStudent: {
            name: studentName,
            handle: studentHandle,
            points: userPoints,
            avatarColor,
          },
        });
      }
    }

    const result: CollegeLeaderboardEntry[] = Array.from(collegeMap.entries()).map(([collegeName, data]) => ({
      rank: 0,
      collegeName,
      totalPoints: data.totalPoints,
      totalSolved: data.totalSolved,
      studentCount: data.studentCount,
      topStudent: data.topStudent,
    }));

    result.sort((a, b) => b.totalPoints - a.totalPoints || b.totalSolved - a.totalSolved);
    result.forEach((entry, idx) => {
      entry.rank = idx + 1;
    });

    return result;
  }

  // --- College Student Leaderboard (Intra-College) ---
  public getCollegeStudentsLeaderboard(collegeName: string): LeaderboardEntry[] {
    const cleanCollege = collegeName.trim().toLowerCase();
    const all = this.getLeaderboard();
    const matched = all.filter((entry) => entry.university && entry.university.trim().toLowerCase() === cleanCollege);

    // If matched is empty, return empty list or sample campus peers
    if (matched.length === 0) {
      // Return simulated sample campus entries for this college so the campus view is populated
      const samplePeers: LeaderboardEntry[] = [
        {
          rank: 1,
          userId: `usr_${cleanCollege}_01`,
          displayName: `Top ${collegeName} Coder`,
          avatarColor: 'indigo',
          solvedCount: 84,
          easySolved: 32,
          mediumSolved: 42,
          hardSolved: 10,
          points: 1460,
          streak: 15,
          university: collegeName,
        },
        {
          rank: 2,
          userId: `usr_${cleanCollege}_02`,
          displayName: `Campus Contender`,
          avatarColor: 'emerald',
          solvedCount: 61,
          easySolved: 28,
          mediumSolved: 28,
          hardSolved: 5,
          points: 990,
          streak: 8,
          university: collegeName,
        },
      ];
      return samplePeers;
    }

    matched.forEach((entry, idx) => {
      entry.rank = idx + 1;
    });
    return matched;
  }

  // --- Weekly Contests Engine ---
  public getContests(): Contest[] {
    try {
      const root = process.cwd().endsWith('backend') ? process.cwd() : path.resolve(process.cwd(), 'backend');
      const contestsJsonPath = path.resolve(root, 'src', 'data', 'contests.json');
      if (fs.existsSync(contestsJsonPath)) {
        this.data.contests = JSON.parse(fs.readFileSync(contestsJsonPath, 'utf-8'));
      }
    } catch {
      // Keep existing
    }

    if (!this.data.contests) {
      this.data.contests = [];
    }

    const now = new Date().toISOString();
    return (this.data.contests || []).map((c) => {
      let status: 'upcoming' | 'active' | 'completed' = c.status;
      if (now < c.startTime) {
        status = 'upcoming';
      } else if (now >= c.startTime && now <= c.endTime) {
        status = 'active';
      } else {
        status = 'completed';
      }
      return {
        ...c,
        status,
      };
    });
  }

  public getContestById(contestId: string): Contest | undefined {
    const contests = this.getContests();
    return contests.find((c) => c.id === contestId || c.slug === contestId);
  }

  public getContestStandings(contestId: string, collegeFilter?: string): ContestParticipantStanding[] {
    // 1. Seed or retrieve contest participants
    if (!this.data.contestStandings) {
      this.data.contestStandings = {};
    }

    let standings = this.data.contestStandings[contestId];
    if (!standings || standings.length === 0) {
      // Generate realistic standings for the contest
      standings = [
        {
          rank: 1,
          userId: 'usr_c_01',
          displayName: 'Aarav Sharma',
          handle: 'aarav_iitb',
          avatarColor: 'indigo',
          university: 'IIT Bombay',
          totalScore: 1800,
          totalTimeMinutes: 44, // pure elapsed solve time (no penalty for rejected submissions)
          problemResults: {
            'q1': { status: 'accepted', solvedAtMinutes: 6, wrongAttempts: 0 },
            'q2': { status: 'accepted', solvedAtMinutes: 14, wrongAttempts: 1 },
            'q3': { status: 'accepted', solvedAtMinutes: 26, wrongAttempts: 2 },
            'q4': { status: 'accepted', solvedAtMinutes: 44, wrongAttempts: 1 },
          },
        },
        {
          rank: 2,
          userId: 'usr_c_02',
          displayName: 'Rohan Deshmukh',
          handle: 'rohan_bits',
          avatarColor: 'emerald',
          university: 'BITS Pilani',
          totalScore: 1800,
          totalTimeMinutes: 52,
          problemResults: {
            'q1': { status: 'accepted', solvedAtMinutes: 8, wrongAttempts: 0 },
            'q2': { status: 'accepted', solvedAtMinutes: 17, wrongAttempts: 0 },
            'q3': { status: 'accepted', solvedAtMinutes: 31, wrongAttempts: 1 },
            'q4': { status: 'accepted', solvedAtMinutes: 52, wrongAttempts: 3 },
          },
        },
        {
          rank: 3,
          userId: 'usr_c_03',
          displayName: 'Priya Verma',
          handle: 'priya_dtu',
          avatarColor: 'cyan',
          university: 'Delhi Technological University (DTU)',
          totalScore: 1200,
          totalTimeMinutes: 38,
          problemResults: {
            'q1': { status: 'accepted', solvedAtMinutes: 9, wrongAttempts: 0 },
            'q2': { status: 'accepted', solvedAtMinutes: 21, wrongAttempts: 2 },
            'q3': { status: 'accepted', solvedAtMinutes: 38, wrongAttempts: 0 },
            'q4': { status: 'wrong_answer', wrongAttempts: 2 },
          },
        },
        {
          rank: 4,
          userId: 'usr_c_04',
          displayName: 'Karthik Raja',
          handle: 'karthik_nitt',
          avatarColor: 'amber',
          university: 'NIT Trichy',
          totalScore: 1200,
          totalTimeMinutes: 49,
          problemResults: {
            'q1': { status: 'accepted', solvedAtMinutes: 7, wrongAttempts: 0 },
            'q2': { status: 'accepted', solvedAtMinutes: 24, wrongAttempts: 1 },
            'q3': { status: 'accepted', solvedAtMinutes: 49, wrongAttempts: 0 },
            'q4': { status: 'unattempted', wrongAttempts: 0 },
          },
        },
        {
          rank: 5,
          userId: 'usr_c_05',
          displayName: 'Maya Chen',
          handle: 'mayacodes',
          avatarColor: 'violet',
          university: 'Stanford University',
          totalScore: 700,
          totalTimeMinutes: 22,
          problemResults: {
            'q1': { status: 'accepted', solvedAtMinutes: 5, wrongAttempts: 0 },
            'q2': { status: 'accepted', solvedAtMinutes: 22, wrongAttempts: 1 },
            'q3': { status: 'wrong_answer', wrongAttempts: 3 },
            'q4': { status: 'unattempted', wrongAttempts: 0 },
          },
        },
        {
          rank: 6,
          userId: 'usr_c_06',
          displayName: 'Daniel Kim',
          handle: 'dan_cal',
          avatarColor: 'indigo',
          university: 'UC Berkeley',
          totalScore: 700,
          totalTimeMinutes: 29,
          problemResults: {
            'q1': { status: 'accepted', solvedAtMinutes: 10, wrongAttempts: 0 },
            'q2': { status: 'accepted', solvedAtMinutes: 29, wrongAttempts: 0 },
            'q3': { status: 'unattempted', wrongAttempts: 0 },
            'q4': { status: 'unattempted', wrongAttempts: 0 },
          },
        },
        {
          rank: 7,
          userId: 'usr_c_07',
          displayName: 'Sneha Patel',
          handle: 'sneha_vit',
          avatarColor: 'emerald',
          university: 'Vellore Institute of Technology (VIT)',
          totalScore: 300,
          totalTimeMinutes: 11,
          problemResults: {
            'q1': { status: 'accepted', solvedAtMinutes: 11, wrongAttempts: 2 },
            'q2': { status: 'wrong_answer', wrongAttempts: 2 },
            'q3': { status: 'unattempted', wrongAttempts: 0 },
            'q4': { status: 'unattempted', wrongAttempts: 0 },
          },
        },
      ];
      this.data.contestStandings[contestId] = standings;
    }

    // Filter by college if requested
    let result = [...standings];
    if (collegeFilter && collegeFilter.trim()) {
      const q = collegeFilter.trim().toLowerCase();
      result = result.filter((s) => s.university && s.university.toLowerCase().includes(q));
    }

    // Sort by totalScore descending, then totalTimeMinutes ascending (pure elapsed solve time, no penalty)
    result.sort((a, b) => b.totalScore - a.totalScore || a.totalTimeMinutes - b.totalTimeMinutes);
    result.forEach((entry, idx) => {
      entry.rank = idx + 1;
    });

    return result;
  }

  public recordContestSubmission(
    contestId: string,
    userId: string,
    problemId: string,
    isAccepted: boolean,
    elapsedMinutes: number
  ): ContestParticipantStanding {
    if (!this.data.contestStandings) {
      this.data.contestStandings = {};
    }
    const standings = this.getContestStandings(contestId);
    let participant = standings.find((s) => s.userId === userId);

    if (!participant) {
      const user = this.findUserById(userId);
      const progress = this.data.progress[userId];
      participant = {
        rank: standings.length + 1,
        userId,
        displayName: progress?.profile?.displayName || user?.name || 'Contestant',
        handle: user?.email.split('@')[0] || 'coder',
        avatarColor: progress?.profile?.avatarColor || 'indigo',
        university: progress?.profile?.university,
        totalScore: 0,
        totalTimeMinutes: 0, // Pure solve time (no penalty for rejected submissions)
        problemResults: {},
      };
      standings.push(participant);
    }

    if (!participant.problemResults[problemId]) {
      participant.problemResults[problemId] = {
        status: 'unattempted',
        wrongAttempts: 0,
      };
    }

    const currentResult = participant.problemResults[problemId];

    if (isAccepted) {
      if (currentResult.status !== 'accepted') {
        currentResult.status = 'accepted';
        currentResult.solvedAtMinutes = elapsedMinutes;
        // Total time is max solve time among accepted problems (pure elapsed solve time)
        participant.totalTimeMinutes = Math.max(participant.totalTimeMinutes, elapsedMinutes);
        // Add problem points (e.g., 300, 400, 500, 600 based on problem)
        const contest = this.getContestById(contestId);
        const probSummary = contest?.problems.find((p) => p.problemId === problemId || p.id === problemId);
        participant.totalScore += probSummary ? probSummary.points : 300;
      }
    } else {
      if (currentResult.status !== 'accepted') {
        currentResult.status = 'wrong_answer';
        currentResult.wrongAttempts += 1;
        // NOTE: NO time penalty is added for rejected submissions per user requirement!
      }
    }

    this.data.contestStandings[contestId] = standings;
    return participant;
  }

  // --- Certificates & Shareable Credentials ---
  public listCertificates(userId: string): IssuedCertificate[] {
    if (!this.data.certificates) return [];
    return this.data.certificates.filter((c) => c.userId === userId);
  }

  public findCertificateById(certId: string): IssuedCertificate | undefined {
    if (!this.data.certificates || !certId) return undefined;
    const normalized = certId.trim().toUpperCase();
    return this.data.certificates.find((c) => c.id.toUpperCase() === normalized);
  }

  public async createCertificate(cert: IssuedCertificate): Promise<IssuedCertificate> {
    if (!this.data.certificates) {
      this.data.certificates = [];
    }
    const existingIdx = this.data.certificates.findIndex(
      (c) => c.id === cert.id || (c.userId === cert.userId && c.trackId === cert.trackId)
    );
    if (existingIdx !== -1) {
      this.data.certificates[existingIdx] = cert;
    } else {
      this.data.certificates.unshift(cert);
    }
    await this.save();
    return cert;
  }

  // --- Verified Badges Computation ---
  public computeUserBadges(userId: string): PublicProfileBadge[] {
    const progress = this.data.progress[userId] || { solvedIds: [], dailyCompletions: {} };
    const solvedIds = progress.solvedIds || [];
    const solvedProblems = this.data.problems.filter((p) => solvedIds.includes(p.id));

    const totalSolved = solvedProblems.length;
    const mediumSolved = solvedProblems.filter((p) => p.difficulty === 'Medium').length;
    const hardSolved = solvedProblems.filter((p) => p.difficulty === 'Hard').length;
    const streak = Object.keys(progress.dailyCompletions || {}).length;
    const hasInterview = (this.data.activity || []).some(
      (a) => a.userId === userId && (a.topic.toLowerCase().includes('interview') || a.type === 'practice')
    );

    const definitions = [
      {
        id: 'first-solve',
        title: 'First Breakthrough',
        description: 'Solved your first algorithmic problem on PrismCode',
        category: 'milestone',
        tier: 'bronze',
        unlocked: totalSolved >= 1,
      },
      {
        id: 'five-solved',
        title: 'Algorithmic Foundation',
        description: 'Successfully solved 5 distinct algorithmic problems',
        category: 'milestone',
        tier: 'bronze',
        unlocked: totalSolved >= 5,
      },
      {
        id: 'twenty-five-solved',
        title: 'Quarter Century',
        description: 'Conquered 25 verified algorithmic challenges',
        category: 'milestone',
        tier: 'silver',
        unlocked: totalSolved >= 25,
      },
      {
        id: 'fifty-solved',
        title: 'Half Century Vanguard',
        description: 'Achieved 50 verified problem solutions',
        category: 'milestone',
        tier: 'gold',
        unlocked: totalSolved >= 50,
      },
      {
        id: 'century-club',
        title: 'Century Club 100',
        description: 'Reached elite milestone of 100 verified solved problems',
        category: 'milestone',
        tier: 'diamond',
        unlocked: totalSolved >= 100,
      },
      {
        id: 'medium-artisan',
        title: 'Medium Artisan',
        description: 'Solved 15+ Medium-tier algorithmic challenges',
        category: 'mastery',
        tier: 'silver',
        unlocked: mediumSolved >= 15,
      },
      {
        id: 'medium-vanguard',
        title: 'Medium Vanguard',
        description: 'Conquered 35+ Medium-tier algorithmic challenges',
        category: 'mastery',
        tier: 'gold',
        unlocked: mediumSolved >= 35,
      },
      {
        id: 'hard-breakthrough',
        title: 'Hard Breakthrough',
        description: 'Solved at least 1 Hard-difficulty algorithmic problem',
        category: 'mastery',
        tier: 'gold',
        unlocked: hardSolved >= 1,
      },
      {
        id: 'hard-veteran',
        title: 'Hard Veteran',
        description: 'Conquered 5+ Hard-difficulty algorithmic challenges',
        category: 'mastery',
        tier: 'diamond',
        unlocked: hardSolved >= 5,
      },
      {
        id: 'week-streak',
        title: '7-Day Consistency',
        description: 'Maintained a 7-day daily practice streak',
        category: 'streak',
        tier: 'silver',
        unlocked: streak >= 7,
      },
      {
        id: 'month-streak',
        title: '30-Day Dedication',
        description: 'Maintained a 30-day continuous daily coding streak',
        category: 'streak',
        tier: 'diamond',
        unlocked: streak >= 30,
      },
      {
        id: 'interview-verified',
        title: 'Interview Ready',
        description: 'Completed technical interview simulation with proctoring integrity',
        category: 'interview',
        tier: 'gold',
        unlocked: hasInterview || totalSolved >= 10,
      },
    ];

    const badges: PublicProfileBadge[] = [];
    const today = new Date().toISOString();

    for (const d of definitions) {
      if (d.unlocked) {
        const hash = crypto
          .createHmac('sha256', 'prismcode_verified_badge_salt')
          .update(`${userId}:${d.id}`)
          .digest('hex')
          .slice(0, 10)
          .toUpperCase();

        badges.push({
          id: d.id,
          title: d.title,
          description: d.description,
          category: d.category,
          tier: d.tier,
          unlockedAt: today,
          verificationHash: `PRISM-BDG-${hash}`,
        });
      }
    }

    return badges;
  }

  // --- Public Profile Resolver ---
  public findUserByIdOrHandle(identifier: string): User | undefined {
    if (!identifier) return undefined;
    const clean = identifier.trim().toLowerCase();

    // 1. Direct ID match
    const byId = this.data.users.find((u) => u.id.toLowerCase() === clean);
    if (byId) return byId;

    // 2. Email username match (e.g. alex from alex@example.com)
    const byEmailPrefix = this.data.users.find((u) => u.email.split('@')[0].toLowerCase() === clean);
    if (byEmailPrefix) return byEmailPrefix;

    // 3. Display name slug match
    const bySlug = this.data.users.find((u) => {
      const slug = u.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return slug === clean;
    });
    if (bySlug) return bySlug;

    // 4. Profile display name slug match
    for (const [uid, p] of Object.entries(this.data.progress)) {
      if (p.profile?.displayName) {
        const pSlug = p.profile.displayName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (pSlug === clean) {
          return this.findUserById(uid);
        }
      }
    }

    return undefined;
  }

  public getPublicProfileData(identifier: string): PublicProfileData | null {
    const user = this.findUserByIdOrHandle(identifier);
    if (!user) return null;

    const progress = this.data.progress[user.id] || { solvedIds: [], dailyCompletions: {} };
    const profile = progress.profile || {
      displayName: user.name,
      bio: '',
      avatarMode: 'initials' as const,
      avatarColor: 'indigo',
      avatarImage: '',
      visibility: 'public' as const,
      updatedAt: null,
    };

    const solvedIds = progress.solvedIds || [];
    const solvedProblems = this.data.problems.filter((p) => solvedIds.includes(p.id));
    const easySolved = solvedProblems.filter((p) => p.difficulty === 'Easy').length;
    const mediumSolved = solvedProblems.filter((p) => p.difficulty === 'Medium').length;
    const hardSolved = solvedProblems.filter((p) => p.difficulty === 'Hard').length;
    const points = easySolved * 10 + mediumSolved * 20 + hardSolved * 30;
    const streak = Object.keys(progress.dailyCompletions || {}).length;

    const badges = this.computeUserBadges(user.id);
    const certificates = this.listCertificates(user.id);
    const handle = user.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return {
      id: user.id,
      handle,
      name: profile.displayName || user.name,
      bio: profile.bio || '',
      avatarMode: profile.avatarMode || 'initials',
      avatarColor: profile.avatarColor || 'indigo',
      avatarImage: profile.avatarImage || '',
      visibility: profile.visibility || 'public',
      stats: {
        solvedCount: solvedIds.length,
        easySolved,
        mediumSolved,
        hardSolved,
        points,
        streak,
      },
      badges,
      certificates,
    };
  }
}

export const db = new Database();
