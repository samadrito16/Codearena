import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { config } from '../config.js';
import { initialProblems } from './seeds.js';
import type {
  ActivityEvent,
  AuditLog,
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

    // Seed admin user if not present
    const existingAdmin = this.findUserByEmail('admin@prismcode.com') || this.findUserByEmail('admin@codearena.com');
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('Admin123!', 10);
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
      await fs.promises.rename(tempPath, this.filePath);
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
      email_verified: user.emailVerified,
    };
  }

  // --- Sessions ---
  public async createSession(session: Session): Promise<Session> {
    this.data.sessions.push(session);
    await this.save();
    return session;
  }

  public findSessionById(id: string): Session | undefined {
    const session = this.data.sessions.find((s) => s.id === id);
    if (!session) return undefined;
    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      return undefined;
    }
    return session;
  }

  public async deleteSession(id: string): Promise<void> {
    this.data.sessions = this.data.sessions.filter((s) => s.id !== id);
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

  public calculatePercentile(problemId: string, runtimeMs: number): number {
    const all = this.data.submissions.filter(
      (s) => s.problemId === problemId && s.outcome === 'accepted' && (s.runtimeMs || 0) > 0,
    );
    if (all.length < 3) {
      // Calibrated baseline: fast runs (<= 30ms) beat 88-97%, moderate (<= 100ms) beat 70-87%
      if (runtimeMs <= 30) return Math.round(Math.min(99.2, 92.0 + (30 - runtimeMs) * 0.24) * 10) / 10;
      if (runtimeMs <= 100) return Math.round(Math.max(68.0, 92.0 - ((runtimeMs - 30) / 70) * 24) * 10) / 10;
      return Math.round(Math.max(30.0, 68.0 - Math.min(35, (runtimeMs - 100) / 15)) * 10) / 10;
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
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
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
        email: user.email,
        avatarColor: progress.profile?.avatarColor || 'indigo',
        solvedCount: solvedIds.length,
        easySolved,
        mediumSolved,
        hardSolved,
        points,
        streak: Object.keys(progress.dailyCompletions || {}).length,
      });
    }

    entries.sort((a, b) => b.points - a.points || b.solvedCount - a.solvedCount);
    entries.forEach((entry, idx) => {
      entry.rank = idx + 1;
    });

    return entries;
  }
}

export const db = new Database();
