import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, Code2, KeyRound, LoaderCircle, Mail, UserRound } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/react';
import ErrorAlert from '../components/ui/ErrorAlert';
import { useAuth } from '../context/AuthContext';
import { useUi } from '../context/UiContext';
import { authService } from '../services/authService';
import { ApiError } from '../lib/api';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function GithubIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function GoogleIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

interface AuthFieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface AuthProps {
  mode?: 'login' | 'register';
}

export default function Auth({ mode: initialMode = 'login' }: AuthProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, status, isClerk, signIn, register } = useAuth();
  const { announce } = useUi();
  const navigate = useNavigate();
  const location = useLocation();

  let clerk: ReturnType<typeof useClerk> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    clerk = useClerk();
  } catch {
    clerk = null;
  }

  const [isOAuthSubmitting, setIsOAuthSubmitting] = useState<'oauth_google' | 'oauth_github' | null>(null);

  const fromLocation = (location.state as { from?: { pathname: string; search?: string } } | null)?.from;
  const destination = fromLocation ? `${fromLocation.pathname}${fromLocation.search || ''}` : '/dashboard';

  // Automatically redirect away from auth pages if user is already authenticated
  useEffect(() => {
    if (status === 'authenticated' && user) {
      navigate(destination, { replace: true });
    }
  }, [status, user, navigate, destination]);

  async function handleOAuth(strategy: 'oauth_google' | 'oauth_github') {
    if (isSubmitting || isOAuthSubmitting !== null) return;

    if (!isClerk || !clerk?.client) {
      setSubmitError('Clerk authentication is not configured. Please sign in with email and password.');
      return;
    }

    try {
      setIsOAuthSubmitting(strategy);
      setSubmitError(null);

      const redirectUrl = '/sso-callback';
      const redirectUrlComplete = destination;

      if (mode === 'register') {
        await clerk.client.signUp.authenticateWithRedirect({
          strategy,
          redirectUrl,
          redirectUrlComplete,
          continueSignIn: true,
        });
      } else {
        await clerk.client.signIn.authenticateWithRedirect({
          strategy,
          redirectUrl,
          redirectUrlComplete,
          continueSignUp: true,
        });
      }
    } catch (err: unknown) {
      setIsOAuthSubmitting(null);
      const msg = err instanceof Error ? err.message : 'Social sign-in failed. Please try again.';
      setSubmitError(msg);
    }
  }

  function switchMode(nextMode: 'login' | 'register') {
    if (isSubmitting) return;
    setMode(nextMode);
    setFieldErrors({});
    setSubmitError(null);
  }

  function validateForm(): AuthFieldErrors {
    const errors: AuthFieldErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (mode === 'register') {
      if (!trimmedName) {
        errors.name = 'Enter your display name or handle.';
      } else if (trimmedName.length < 2) {
        errors.name = 'Name should be at least 2 characters.';
      } else if (trimmedName.length > 50) {
        errors.name = 'Name must be 50 characters or fewer.';
      }
    }

    if (!trimmedEmail) {
      errors.email = 'Enter an email address.';
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      errors.email = 'Enter a valid email address (for example, you@example.com).';
    }

    if (!password) {
      errors.password = 'Enter your password.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (mode === 'register') {
      if (!confirmPassword) {
        errors.confirmPassword = 'Confirm your password.';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
      }
    }

    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setSubmitError('Please fix the highlighted fields before continuing.');
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    try {
      if (mode === 'login') {
        if (signIn) {
          await signIn({
            email: trimmedEmail,
            password,
          });
        } else {
          await authService.signIn({
            email: trimmedEmail,
            password,
          });
        }

        announce(`Signed in successfully as ${trimmedEmail}`);
        navigate(destination, { replace: true });
      } else {
        // Register mode
        if (register) {
          await register({
            name: trimmedName,
            email: trimmedEmail,
            password,
          });
        } else {
          await authService.register({
            name: trimmedName,
            email: trimmedEmail,
            password,
          });
        }

        announce(`Account registered successfully for ${trimmedName}`);
        navigate(destination, { replace: true });
      }
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.status === 401 || err.code === 'INVALID_CREDENTIALS') {
          setSubmitError('Invalid email or password. Please verify your credentials and try again.');
        } else if (err.status === 409 || err.code === 'EMAIL_ALREADY_REGISTERED') {
          setSubmitError('An account with this email address already exists. Please sign in or reset your password.');
        } else if (err.status === 429 || err.code === 'RATE_LIMITED') {
          setSubmitError('Too many attempts. For your security, please wait a few minutes before trying again.');
        } else if (err.code === 'NETWORK_ERROR' || err.status === 0) {
          setSubmitError('Cannot connect to PrismCode server. Please check your network and verify the backend is running.');
        } else {
          setSubmitError(err.message || 'Authentication failed. Please verify your credentials.');
        }
      } else {
        const msg = err instanceof Error ? err.message : 'Authentication failed. Please verify your credentials.';
        setSubmitError(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-6 px-4">
      <div className="mx-auto grid w-full max-w-4xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/20 md:grid-cols-[0.95fr_1.05fr]">
        {/* Left Branding / Atmosphere Banner */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#102b38] via-[#0d6970] to-[#286c5b] p-8 text-white md:flex md:flex-col md:justify-between">
          <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full border-[50px] border-white/5" />
          <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full border-[50px] border-white/5" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <Code2 size={20} />
              </div>
              <span className="font-display text-lg font-bold">Prismcode</span>
            </div>
            <div className="mt-24">
              <h2 className="font-display text-4xl font-bold leading-tight">
                Make every<br />line of code<br /><span className="text-teal-200">count.</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="p-6 sm:p-9">
          <div className="mb-7 flex items-center gap-2 md:hidden">
            <div className="brand-mark"><Code2 size={19} /></div>
            <span className="font-display text-lg font-bold text-slate-900 dark:text-white">Prismcode</span>
          </div>
          <p className="section-kicker">AUTHENTICATION</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
            {mode === 'register' ? 'Create your account' : 'Welcome back'}
          </h2>

          <div className="mt-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              disabled={isSubmitting}
              onClick={() => switchMode('login')}
              className={`rounded-lg py-2 text-xs font-bold transition ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'register'}
              disabled={isSubmitting || isOAuthSubmitting !== null}
              onClick={() => switchMode('register')}
              className={`rounded-lg py-2 text-xs font-bold transition ${
                mode === 'register'
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Create account
            </button>
          </div>

          {/* Social Sign-In (Google & GitHub) */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isSubmitting || isOAuthSubmitting !== null}
              onClick={() => handleOAuth('oauth_google')}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.99] disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/80"
              aria-label={mode === 'register' ? 'Sign up with Google' : 'Sign in with Google'}
            >
              {isOAuthSubmitting === 'oauth_google' ? (
                <LoaderCircle size={15} className="animate-spin text-slate-500" />
              ) : (
                <GoogleIcon className="h-4 w-4 shrink-0" />
              )}
              <span>Google</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting || isOAuthSubmitting !== null}
              onClick={() => handleOAuth('oauth_github')}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.99] disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/80"
              aria-label={mode === 'register' ? 'Sign up with GitHub' : 'Sign in with GitHub'}
            >
              {isOAuthSubmitting === 'oauth_github' ? (
                <LoaderCircle size={15} className="animate-spin text-slate-500" />
              ) : (
                <GithubIcon className="h-4 w-4 shrink-0" />
              )}
              <span>GitHub</span>
            </button>
          </div>

          {/* Clean Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
              <span className="bg-white px-2.5 font-semibold text-slate-400 dark:bg-slate-950 dark:text-slate-500">
                or continue with email
              </span>
            </div>
          </div>

          {submitError && (
            <div className="mt-4" role="alert" aria-live="polite">
              <ErrorAlert
                title={mode === 'register' ? 'Registration Issue' : 'Sign-in Issue'}
                message={submitError}
                onDismiss={() => setSubmitError(null)}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting} className="mt-5 space-y-4">
            {mode === 'register' && (
              <label className="form-label block">
                Your display name
                <div className="relative mt-1">
                  <UserRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    type="text"
                    value={name}
                    autoComplete="name"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.name)}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                      if (submitError) setSubmitError(null);
                    }}
                    className={`form-input pl-10 ${fieldErrors.name ? 'border-rose-500 focus:border-rose-500' : ''}`}
                    placeholder="Alex Morgan"
                  />
                </div>
                {fieldErrors.name && (
                  <span className="mt-1 block text-[11px] font-medium text-rose-600 dark:text-rose-400">
                    {fieldErrors.name}
                  </span>
                )}
              </label>
            )}

            <label className="form-label block">
              Email address
              <div className="relative mt-1">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="email"
                  value={email}
                  autoComplete="email"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(fieldErrors.email)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    if (submitError) setSubmitError(null);
                  }}
                  className={`form-input pl-10 ${fieldErrors.email ? 'border-rose-500 focus:border-rose-500' : ''}`}
                  placeholder="you@example.com"
                />
              </div>
              {fieldErrors.email && (
                <span className="mt-1 block text-[11px] font-medium text-rose-600 dark:text-rose-400">
                  {fieldErrors.email}
                </span>
              )}
            </label>

            <label className="form-label block">
              <div className="flex items-center justify-between">
                <span>Password</span>
                {mode === 'login' && (
                  <Link
                    to="/forgot-password"
                    className="text-[11px] font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative mt-1">
                <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="password"
                  value={password}
                  autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(fieldErrors.password)}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
                    if (submitError) setSubmitError(null);
                  }}
                  className={`form-input pl-10 ${fieldErrors.password ? 'border-rose-500 focus:border-rose-500' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {fieldErrors.password && (
                <span className="mt-1 block text-[11px] font-medium text-rose-600 dark:text-rose-400">
                  {fieldErrors.password}
                </span>
              )}
            </label>

            {mode === 'register' && (
              <label className="form-label block">
                Confirm password
                <div className="relative mt-1">
                  <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    type="password"
                    value={confirmPassword}
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.confirmPassword)}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (fieldErrors.confirmPassword) setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                      if (submitError) setSubmitError(null);
                    }}
                    className={`form-input pl-10 ${fieldErrors.confirmPassword ? 'border-rose-500 focus:border-rose-500' : ''}`}
                    placeholder="••••••••"
                  />
                </div>
                {fieldErrors.confirmPassword && (
                  <span className="mt-1 block text-[11px] font-medium text-rose-600 dark:text-rose-400">
                    {fieldErrors.confirmPassword}
                  </span>
                )}
              </label>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isOAuthSubmitting !== null}
              className="btn-primary mt-2 w-full disabled:opacity-65"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={15} className="animate-spin" />
                  <span>{mode === 'register' ? 'Creating account…' : 'Authenticating…'}</span>
                </>
              ) : (
                <>
                  <span>{mode === 'register' ? 'Register Account' : 'Sign in to PrismCode'}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
              By {mode === 'register' ? 'creating an account' : 'signing in'}, you agree to PrismCode&rsquo;s{' '}
              <Link to="/terms" className="themed-link underline font-medium">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="themed-link underline font-medium">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
