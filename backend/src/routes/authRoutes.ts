import { Router, type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';
import { authService } from '../services/authService.js';
import { config } from '../config.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
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
  password: z.string().min(8, 'Password must be at least 8 characters'),
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

// POST /api/auth/verify-email (also supports /verify-email and /auth/verify-email)
router.post(['/verify-email', '/auth/verify-email'], async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Email verified successfully.',
  });
});

// POST /api/auth/resend-verification (also supports /resend-verification and /auth/resend-verification)
router.post(['/resend-verification', '/auth/resend-verification'], authLimiter, async (req: Request, res: Response) => {
  res.status(202).json({
    message: 'If your email is unverified, a verification link has been sent.',
  });
});

export default router;
