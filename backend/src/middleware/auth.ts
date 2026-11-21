import type { Request, Response, NextFunction } from 'express';
import { createClerkClient, verifyToken } from '@clerk/express';
import { db } from '../db/database.js';
import { config } from '../config.js';
import type { PublicUser, Session, User, UserRole } from '../types/index.js';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: PublicUser;
      sessionRecord?: Session;
      clerkAuth?: {
        userId?: string;
        sessionId?: string;
      };
    }
  }
}

let clerkClientInstance: ReturnType<typeof createClerkClient> | null = null;
if (config.clerkSecretKey) {
  clerkClientInstance = createClerkClient({
    secretKey: config.clerkSecretKey,
    publishableKey: config.clerkPublishableKey || undefined,
  });
}

export async function attachUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : undefined;

  // 1. Check if token is a Clerk JWT token
  if (bearerToken && config.clerkSecretKey) {
    try {
      const verified = await verifyToken(bearerToken, {
        secretKey: config.clerkSecretKey,
      });

      if (verified && verified.sub) {
        const clerkUserId = verified.sub;
        req.clerkAuth = { userId: clerkUserId };

        let user = db.findUserById(clerkUserId);
        if (!user) {
          // Sync Clerk user details into local DB
          let displayName = 'PrismCode Developer';
          let email = `${clerkUserId}@clerk.user`;
          let role: UserRole = 'user';

          if (clerkClientInstance) {
            try {
              const clerkUser = await clerkClientInstance.users.getUser(clerkUserId);
              displayName = clerkUser.fullName || clerkUser.firstName || displayName;
              const primaryEmail = clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId);
              if (primaryEmail) email = primaryEmail.emailAddress;
              if (clerkUser.publicMetadata?.role === 'admin' || email === 'admin@prismcode.com' || email === 'admin@codearena.com') {
                role = 'admin';
              }
            } catch (clerkErr) {
              console.warn('[Clerk] Could not fetch profile for user:', clerkUserId, clerkErr);
            }
          }

          user = {
            id: clerkUserId,
            name: displayName,
            email,
            passwordHash: 'clerk_managed',
            role,
            emailVerified: true,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await db.createUser(user);
        }

        req.user = db.toPublicUser(user);
        next();
        return;
      }
    } catch {
      // Not a valid Clerk token, fallback to local session check
    }
  }

  // 2. Check local cookie or bearer session token
  const sessionId = req.cookies?.[config.cookieName] || req.cookies?.['codearena_session'] || bearerToken;
  if (sessionId) {
    const session = db.findSessionById(sessionId);
    if (session) {
      const user = db.findUserById(session.userId);
      if (user && user.isActive) {
        req.user = db.toPublicUser(user);
        req.sessionRecord = session;
      }
    }
  }

  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({
      error: {
        code: 'SESSION_EXPIRED',
        message: 'Your session has expired or you are not signed in. Please sign in to continue.',
      },
    });
    return;
  }
  next();
}

export function requireRole(requiredRole: UserRole | UserRole[]) {
  const allowed = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        error: {
          code: 'SESSION_EXPIRED',
          message: 'Please sign in to access this resource.',
        },
      });
      return;
    }

    const hasRole = req.user.role === 'admin' || allowed.includes(req.user.role);

    if (!hasRole) {
      res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have permission to perform this action.',
        },
      });
      return;
    }

    next();
  };
}
