import rateLimit from 'express-rate-limit';
import type { Request, Response, NextFunction } from 'express';
import { db } from '../db/database.js';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many authentication attempts. Please wait a few minutes before trying again.',
      },
    });
  },
});

export const executionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // Limit each IP to 15 runs/submits per minute to prevent container abuse & resource exhaustion
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: {
        code: 'EXECUTION_RATE_LIMITED',
        message: 'Code execution rate limit exceeded. Please wait a minute before running or submitting more code.',
      },
    });
  },
});

/**
 * Free-tier daily execution quota limiter:
 * Enforces per-user / per-IP daily caps (N runs per day) matching the single API call per run architecture.
 */
export function dailyExecutionQuotaLimiter(req: Request, res: Response, next: NextFunction) {
  const userId = req.user ? req.user.id : null;
  const role = req.user ? req.user.role : undefined;
  const plan = req.user ? req.user.plan : undefined;
  const clientIp = (req.ip || req.socket.remoteAddress || '127.0.0.1').replace(/^::ffff:/, '');

  const quota = db.checkExecutionQuota(userId, clientIp, role, plan);

  res.setHeader('X-RateLimit-Daily-Limit', String(quota.limit));
  res.setHeader('X-RateLimit-Daily-Remaining', String(quota.remaining));
  res.setHeader('X-RateLimit-Daily-Reset', quota.resetAt);

  if (!quota.allowed) {
    res.status(429).json({
      error: {
        code: 'DAILY_QUOTA_EXCEEDED',
        message: `Daily code execution limit reached (${quota.limit} executions/day for ${plan || (userId ? 'free' : 'guest')} tier). Your quota resets at midnight UTC.`,
        limit: quota.limit,
        remaining: 0,
        resetAt: quota.resetAt,
      },
    });
    return;
  }

  next();
}

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many requests. Please slow down and try again later.',
      },
    });
  },
});
