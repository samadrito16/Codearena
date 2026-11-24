import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useAuth as useClerkAuth, useUser as useClerkUser, useClerk } from '@clerk/react';
import { authService } from '../services/authService';
import { ApiError, setApiAuthTokenGetter } from '../lib/api';
import type { User, UserRole } from '../types';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface AuthContextValue {
  user: User | null;
  status: AuthStatus;
  authError: string | null;
  isClerk: boolean;
  sessionExpired: boolean;
  dismissSessionExpired: () => void;
  signIn?: (input: { email: string; password: string }) => Promise<void>;
  register?: (input: { name: string; email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  verifyEmail: (token: string) => Promise<{ message: string; user?: User }>;
  resendVerification: (email?: string) => Promise<{ message: string }>;
  getToken?: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Clerk-powered Auth implementation with seamless backend session fallback
function ClerkAuthProviderImpl({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn, getToken } = useClerkAuth();
  const { user: clerkUser } = useClerkUser();
  const clerk = useClerk();

  const [localUser, setLocalUser] = useState<User | null>(null);
  const [localChecking, setLocalChecking] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  // Listen for global session expiration events triggered by API responses
  useEffect(() => {
    const handleExpired = () => {
      // If user is actively authenticated with Clerk, do NOT falsely expire
      if (isSignedIn) return;
      setLocalUser(null);
      setSessionExpired(true);
    };
    window.addEventListener('prismcode:session-expired', handleExpired);
    window.addEventListener('codearena:session-expired', handleExpired);
    return () => {
      window.removeEventListener('prismcode:session-expired', handleExpired);
      window.removeEventListener('codearena:session-expired', handleExpired);
    };
  }, [isSignedIn]);

  const dismissSessionExpired = useCallback(() => {
    setSessionExpired(false);
  }, []);

  // Attach token getter for backend api requests when Clerk is signed in
  useEffect(() => {
    if (isSignedIn) {
      setApiAuthTokenGetter(getToken);
    } else {
      setApiAuthTokenGetter(null);
    }
  }, [isSignedIn, getToken]);

  // Check for existing backend session if Clerk is loaded and not signed in
  useEffect(() => {
    let cancelled = false;

    async function checkLocalSession() {
      if (!isLoaded) return;

      if (isSignedIn) {
        setLocalChecking(false);
        setLocalUser(null);
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();
        if (!cancelled) {
          setLocalUser(currentUser);
        }
      } catch {
        if (!cancelled) {
          setLocalUser(null);
        }
      } finally {
        if (!cancelled) {
          setLocalChecking(false);
        }
      }
    }

    void checkLocalSession();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn]);

  const user = useMemo<User | null>(() => {
    if (isSignedIn && clerkUser) {
      const email = clerkUser.primaryEmailAddress?.emailAddress || '';
      const metadataRole = clerkUser.publicMetadata?.role as UserRole | undefined;
      const role: UserRole = metadataRole === 'admin' || email === 'admin@prismcode.com' || email === 'admin@codearena.com' ? 'admin' : 'user';

      return {
        id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.firstName || 'Developer',
        email,
        role,
        email_verified: clerkUser.primaryEmailAddress?.verification?.status === 'verified',
      };
    }

    return localUser;
  }, [isSignedIn, clerkUser, localUser]);

  const status: AuthStatus = useMemo(() => {
    if (!isLoaded || (localChecking && !isSignedIn)) return 'loading';
    if (isSignedIn || localUser) return 'authenticated';
    return 'unauthenticated';
  }, [isLoaded, localChecking, isSignedIn, localUser]);

  const signIn = useCallback(async (input: { email: string; password: string }) => {
    setAuthError(null);
    let clerkSuccess = false;

    // 1. Try Clerk authentication first if client is available
    if (clerk && clerk.loaded && clerk.client) {
      try {
        const res = await clerk.client.signIn.create({
          identifier: input.email,
          password: input.password,
        });

        if (res.status === 'complete' && res.createdSessionId) {
          await clerk.setActive({ session: res.createdSessionId });
          setLocalUser(null);
          setLocalChecking(false);
          clerkSuccess = true;
          return;
        }
      } catch {
        // Clerk authentication failed (user may only exist in backend database or password policy mismatch)
      }
    }

    // 2. Fall back to backend session authentication
    if (!clerkSuccess) {
      const verifiedUser = await authService.signIn(input);
      setLocalUser(verifiedUser);
      setLocalChecking(false);
      setAuthError(null);
    }
  }, [clerk]);

  const register = useCallback(async (input: { name: string; email: string; password: string }) => {
    setAuthError(null);
    let clerkSuccess = false;

    if (clerk && clerk.loaded && clerk.client) {
      try {
        const nameParts = input.name.trim().split(' ');
        const res = await clerk.client.signUp.create({
          emailAddress: input.email.trim(),
          password: input.password,
          firstName: nameParts[0] || input.name,
          lastName: nameParts.slice(1).join(' ') || undefined,
        });

        if (res.status === 'complete' && res.createdSessionId) {
          await clerk.setActive({ session: res.createdSessionId });
          clerkSuccess = true;
          setLocalChecking(false);
          // Optionally register in backend as well
          try {
            await authService.register(input);
          } catch {
            // Ignore if backend user already created
          }
          setLocalUser(null);
          return;
        }
      } catch {
        // Clerk registration failed, fallback to backend
      }
    }

    // Fall back to backend registration
    if (!clerkSuccess) {
      const newUser = await authService.register(input);
      setLocalUser(newUser);
      setLocalChecking(false);
      setAuthError(null);
    }
  }, [clerk]);

  const signOut = useCallback(async () => {
    try {
      if (isSignedIn) {
        await clerk.signOut();
      }
    } finally {
      try {
        await authService.signOut();
      } catch {
        // Ignore backend logout error
      }
      setLocalUser(null);
      setAuthError(null);
    }
  }, [clerk, isSignedIn]);

  const refreshUser = useCallback(async () => {
    if (isSignedIn && clerkUser) {
      await clerkUser.reload();
    } else {
      try {
        const currentUser = await authService.getCurrentUser();
        setLocalUser(currentUser);
        setAuthError(null);
      } catch {
        setLocalUser(null);
      }
    }
  }, [isSignedIn, clerkUser]);

  const verifyEmail = useCallback(async (token: string) => {
    const res = await authService.verifyEmail(token);
    if (res.user) {
      setLocalUser(res.user);
    }
    return res;
  }, []);

  const resendVerification = useCallback(async (email?: string) => {
    return await authService.resendVerification(email || user?.email);
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      authError,
      isClerk: true,
      sessionExpired,
      dismissSessionExpired,
      signIn,
      register,
      signOut,
      refreshUser,
      verifyEmail,
      resendVerification,
      getToken,
    }),
    [user, status, authError, sessionExpired, dismissSessionExpired, signIn, register, signOut, refreshUser, verifyEmail, resendVerification, getToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Fallback Local Auth implementation when Clerk key is not provided
function LocalAuthProviderImpl({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [authError, setAuthError] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  // Listen for global session expiration events
  useEffect(() => {
    const handleExpired = () => {
      setUser((prev) => {
        // Only expire if user was actually authenticated
        if (!prev) return null;
        setStatus('unauthenticated');
        setSessionExpired(true);
        return null;
      });
    };
    window.addEventListener('prismcode:session-expired', handleExpired);
    window.addEventListener('codearena:session-expired', handleExpired);
    return () => {
      window.removeEventListener('prismcode:session-expired', handleExpired);
      window.removeEventListener('codearena:session-expired', handleExpired);
    };
  }, []);

  const dismissSessionExpired = useCallback(() => {
    setSessionExpired(false);
  }, []);

  const initAuth = useCallback(async () => {
    setStatus('loading');
    setAuthError(null);

    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setStatus('authenticated');
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 401) {
        setUser(null);
        setStatus('unauthenticated');
      } else {
        const message = err instanceof Error ? err.message : 'Failed to connect to authentication server.';
        setUser(null);
        setStatus('error');
        setAuthError(message);
      }
    }
  }, []);

  useEffect(() => {
    void initAuth();
  }, [initAuth]);

  const signIn = useCallback(async (input: { email: string; password: string }) => {
    const verifiedUser = await authService.signIn(input);
    setUser(verifiedUser);
    setStatus('authenticated');
    setAuthError(null);
  }, []);

  const register = useCallback(async (input: { name: string; email: string; password: string }) => {
    const newUser = await authService.register(input);
    setUser(newUser);
    setStatus('authenticated');
    setAuthError(null);
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authService.signOut();
    } finally {
      setUser(null);
      setStatus('unauthenticated');
      setAuthError(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setStatus('authenticated');
      setAuthError(null);
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 401) {
        setUser(null);
        setStatus('unauthenticated');
      } else {
        const message = err instanceof Error ? err.message : 'Unable to refresh session.';
        setAuthError(message);
      }
    }
  }, []);

  const verifyEmail = useCallback(async (token: string) => {
    const res = await authService.verifyEmail(token);
    if (res.user) {
      setUser(res.user);
    }
    return res;
  }, []);

  const resendVerification = useCallback(async (email?: string) => {
    return await authService.resendVerification(email || user?.email);
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      authError,
      isClerk: false,
      sessionExpired,
      dismissSessionExpired,
      signIn,
      register,
      signOut,
      refreshUser,
      verifyEmail,
      resendVerification,
    }),
    [user, status, authError, sessionExpired, dismissSessionExpired, signIn, register, signOut, refreshUser, verifyEmail, resendVerification]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  if (CLERK_PUBLISHABLE_KEY) {
    return <ClerkAuthProviderImpl>{children}</ClerkAuthProviderImpl>;
  }
  return <LocalAuthProviderImpl>{children}</LocalAuthProviderImpl>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
