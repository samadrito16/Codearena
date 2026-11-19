import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { db } from '../db/database.js';
import { config } from '../config.js';
import { emailService } from './emailService.js';
import { AppError } from '../middleware/errorHandler.js';
import type { PublicUser, Session, User } from '../types/index.js';

export class AuthService {
  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  public async register(input: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ user: PublicUser; session: Session }> {
    const trimmedName = input.name.trim();
    const normalizedEmail = input.email.trim().toLowerCase();

    if (!trimmedName || trimmedName.length < 2) {
      throw new AppError('Display name must be at least 2 characters long.', 400, 'VALIDATION_ERROR');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      throw new AppError('Please provide a valid email address.', 400, 'VALIDATION_ERROR');
    }

    if (!input.password || input.password.length < 8) {
      throw new AppError('Password must be at least 8 characters long.', 400, 'VALIDATION_ERROR');
    }

    const existingUser = db.findUserByEmail(normalizedEmail);
    if (existingUser) {
      throw new AppError('An account with this email address is already registered.', 409, 'EMAIL_ALREADY_REGISTERED');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const userId = `usr_${crypto.randomUUID()}`;
    const timestamp = new Date().toISOString();

    const newUser: User = {
      id: userId,
      name: trimmedName,
      email: normalizedEmail,
      passwordHash,
      role: 'user', // Always user for public registration
      emailVerified: true, // Set to true for immediate friction-free access
      isActive: true,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await db.createUser(newUser);

    const session = await this.createSession(userId);
    return {
      user: db.toPublicUser(newUser),
      session,
    };
  }

  public async login(input: {
    email: string;
    password: string;
  }): Promise<{ user: PublicUser; session: Session }> {
    const normalizedEmail = input.email.trim().toLowerCase();
    const user = db.findUserByEmail(normalizedEmail);

    if (!user || !user.isActive) {
      throw new AppError('Email or password is incorrect.', 401, 'INVALID_CREDENTIALS');
    }

    const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);
    if (!passwordMatches) {
      throw new AppError('Email or password is incorrect.', 401, 'INVALID_CREDENTIALS');
    }

    const session = await this.createSession(user.id);
    return {
      user: db.toPublicUser(user),
      session,
    };
  }

  public async getSessionUser(sessionId: string): Promise<PublicUser | null> {
    const session = db.findSessionById(sessionId);
    if (!session) return null;

    const user = db.findUserById(session.userId);
    if (!user || !user.isActive) return null;

    return db.toPublicUser(user);
  }

  public async logout(sessionId: string): Promise<void> {
    if (sessionId) {
      await db.deleteSession(sessionId);
    }
  }

  public async createSession(userId: string): Promise<Session> {
    const sessionId = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + config.sessionExpiryDays * 24 * 60 * 60 * 1000).toISOString();
    const createdAt = new Date().toISOString();

    const session: Session = {
      id: sessionId,
      userId,
      expiresAt,
      createdAt,
    };

    await db.createSession(session);
    return session;
  }

  public async forgotPassword(email: string): Promise<void> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = db.findUserByEmail(normalizedEmail);

    if (user && user.isActive) {
      const rawToken = crypto.randomBytes(32).toString('hex');
      const tokenHash = this.hashToken(rawToken);
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

      await db.createPasswordResetToken({
        id: `prt_${crypto.randomUUID()}`,
        userId: user.id,
        tokenHash,
        expiresAt,
        used: false,
        createdAt: new Date().toISOString(),
      });

      await emailService.sendPasswordResetEmail(user.email, rawToken);
    }
  }

  public async resetPassword(token: string, newPassword: string): Promise<void> {
    if (!token || typeof token !== 'string') {
      throw new AppError('A valid password reset token is required.', 400, 'VALIDATION_ERROR');
    }

    if (!newPassword || newPassword.length < 8) {
      throw new AppError('New password must be at least 8 characters long.', 400, 'VALIDATION_ERROR');
    }

    const tokenHash = this.hashToken(token.trim());
    const resetRecord = db.findPasswordResetToken(tokenHash);

    if (!resetRecord) {
      throw new AppError('The password reset link is invalid or has expired. Please request a new one.', 400, 'INVALID_RESET_TOKEN');
    }

    const user = db.findUserById(resetRecord.userId);
    if (!user) {
      throw new AppError('Account associated with this token could not be found.', 404, 'NOT_FOUND');
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db.updateUser(user.id, { passwordHash });
    await db.markPasswordResetTokenUsed(resetRecord.id);

    // Invalidate all existing sessions for security
    await db.deleteSessionsByUserId(user.id);
  }
}

export const authService = new AuthService();
