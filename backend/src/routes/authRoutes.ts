import { Router, type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';
import { authService } from '../services/authService.js';
import { emailService } from '../services/emailService.js';
import { config } from '../config.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Password must contain at least one number or special character'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Password must contain at least one number or special character'),
});

function setSessionCookie(res: Response, sessionId: string) {
  res.cookie(config.cookieName, sessionId, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? 'strict' : 'lax',
    maxAge: config.sessionExpiryDays * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

function clearSessionCookie(res: Response) {
  res.clearCookie(config.cookieName, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? 'strict' : 'lax',
    path: '/',
  });
}

// POST /api/auth/register (also supports /register and /auth/register)
router.post(['/register', '/auth/register'], authLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = registerSchema.parse(req.body);
    const { user, session } = await authService.register(input);
    setSessionCookie(res, session.id);
    res.status(201).json({
      ...user,
      user,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login (also supports /login and /auth/login)
router.post(['/login', '/auth/login'], authLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = loginSchema.parse(req.body);
    const { user, session } = await authService.login(input);
    setSessionCookie(res, session.id);
    res.status(200).json({
      ...user,
      user,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me (also supports /me and /auth/me)
router.get(['/me', '/auth/me'], async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      error: {
        code: 'SESSION_EXPIRED',
        message: 'No active session found. Please sign in.',
      },
    });
    return;
  }

  res.status(200).json({
    ...req.user,
    user: req.user,
  });
});

// POST /api/auth/logout (also supports /logout and /auth/logout)
router.post(['/logout', '/auth/logout'], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionId = req.cookies?.[config.cookieName] || req.sessionRecord?.id;
    if (sessionId) {
      await authService.logout(sessionId);
    }
    clearSessionCookie(res);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/forgot-password (also supports /forgot-password and /auth/forgot-password)
router.post(['/forgot-password', '/auth/forgot-password'], authLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = forgotPasswordSchema.parse(req.body);
    await authService.forgotPassword(email);
    res.status(202).json({
      message: 'If an account exists for that email, a password reset link has been sent.',
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/reset-password (also supports /reset-password and /auth/reset-password)
router.post(['/reset-password', '/auth/reset-password'], authLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = resetPasswordSchema.parse(req.body);
    await authService.resetPassword(token, password);
    clearSessionCookie(res);
    res.status(200).json({
      message: 'Password has been reset successfully. Please sign in with your new password.',
    });
  } catch (err) {
    next(err);
  }
});

// POST & GET /api/auth/verify-email
router.all(['/verify-email', '/auth/verify-email'], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawToken = req.body?.token || req.query?.token;
    if (!rawToken || typeof rawToken !== 'string') {
      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Verification token is required.',
        },
      });
      return;
    }

    const user = await authService.verifyEmail(rawToken);
    res.status(200).json({
      message: 'Email verified successfully.',
      user,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/resend-verification
router.post(['/resend-verification', '/auth/resend-verification'], authLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body?.email || req.user?.email;
    if (!email || typeof email !== 'string') {
      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'An email address is required to resend verification.',
        },
      });
      return;
    }

    await authService.requestEmailVerification(email);
    res.status(202).json({
      message: 'If your email is unverified, a verification link has been sent.',
    });
  } catch (err) {
    next(err);
  }
});

// Development-only token inspection for automated testing and local debugging (strictly disabled by default)
if (!config.isProduction && config.enableDevTokens) {
  router.get('/dev/tokens', (req: Request, res: Response) => {
    const email = String(req.query.email || '').trim().toLowerCase();
    const sent = emailService.getRecentEmails().find((e) => e.to.toLowerCase() === email);
    res.json({
      email,
      token: sent?.token || null,
      subject: sent?.subject || null,
      url: sent?.resetUrl || null,
    });
  });
}

export default router;
