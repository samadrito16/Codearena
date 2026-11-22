import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, KeyRound, LoaderCircle, CheckCircle2, X } from 'lucide-react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import ErrorAlert from '../components/ui/ErrorAlert';
import { authService } from '../services/authService';
import { ApiError } from '../lib/api';
import { PrismMark } from '../components/PrismLogo';

interface ResetPasswordProps {
  isModal?: boolean;
  onClose?: () => void;
}

export default function ResetPassword({ isModal = false, onClose }: ResetPasswordProps) {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ password?: string; confirm?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const rawToken = searchParams.get('token');
    if (rawToken) {
      setToken(rawToken);
      // Clean visible URL token from address bar for security
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [searchParams]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    if (!token) {
      setSubmitError('Missing password reset token. Please request a new link from the forgot password page.');
      return;
    }

    const errors: { password?: string; confirm?: string } = {};
    if (!password) {
      errors.password = 'Enter a new password.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (password !== confirmPassword) {
      errors.confirm = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await authService.resetPassword({ token, password });
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.code === 'INVALID_RESET_TOKEN' || err.status === 400) {
          setSubmitError('This password reset link is invalid or has expired. Please request a new link.');
        } else if (err.code === 'NETWORK_ERROR' || err.status === 0) {
          setSubmitError('Cannot connect to PrismCode server. Please check your network connection.');
        } else {
          setSubmitError(err.message || 'Unable to reset password.');
        }
      } else {
        const msg = err instanceof Error ? err.message : 'Unable to reset password.';
        setSubmitError(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={isModal ? 'relative w-full' : 'min-h-[85vh] flex items-center justify-center py-6 px-4'}>
      <div className="glass-auth-card relative z-10 mx-auto w-full max-w-[440px] overflow-hidden rounded-[32px] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-slate-500 hover:text-slate-800 dark:bg-white/10 dark:hover:bg-white/20 dark:text-slate-300 dark:hover:text-white transition backdrop-blur-md"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        )}

        {/* Top Centered Glowing Brand Icon Badge */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/25 dark:bg-white/10 border border-white/40 dark:border-white/15 backdrop-blur-md shadow-lg shadow-black/5">
          <PrismMark size={32} className="brand-mark-pulse" />
        </div>

        <div className="text-center mt-4 mb-6">
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Create New Password
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Enter your new password below to regain account access
          </p>
        </div>

        {success ? (
          <div className="text-center py-4">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">Password Updated!</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Your password has been changed successfully. All previous sessions have been safely invalidated.
            </p>
            <Link
              to="/login"
              state={location.state}
              className="glass-auth-submit-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm active:scale-[0.99] transition"
            >
              Sign in with new password <ArrowRight size={16} />
            </Link>
          </div>
        ) : !token ? (
          <div className="text-center py-4">
            <ErrorAlert
              title="Invalid or Missing Token"
              message="No valid reset token was provided in the URL. If you followed an email link, please make sure the entire link was copied."
            />
            <div className="mt-6">
              <Link
                to="/forgot-password"
                state={location.state}
                className="glass-auth-submit-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm active:scale-[0.99] transition"
              >
                Request a new reset link
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitError && (
              <ErrorAlert
                title="Reset Failed"
                message={submitError}
                onDismiss={() => setSubmitError(null)}
              />
            )}

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-2">
                New password (min 8 chars)
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`glass-auth-input w-full rounded-full px-4 py-2.5 pl-10 text-xs sm:text-sm transition focus:outline-none ${
                    fieldErrors.password ? 'border-rose-500' : ''
                  }`}
                  placeholder="••••••••"
                />
                <KeyRound
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
              {fieldErrors.password && (
                <p className="mt-1 ml-3 text-[11px] text-rose-500">{fieldErrors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-2">
                Confirm new password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (fieldErrors.confirm) setFieldErrors((prev) => ({ ...prev, confirm: undefined }));
                  }}
                  className={`glass-auth-input w-full rounded-full px-4 py-2.5 pl-10 text-xs sm:text-sm transition focus:outline-none ${
                    fieldErrors.confirm ? 'border-rose-500' : ''
                  }`}
                  placeholder="••••••••"
                />
                <KeyRound
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
              {fieldErrors.confirm && (
                <p className="mt-1 ml-3 text-[11px] text-rose-500">{fieldErrors.confirm}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="glass-auth-submit-btn w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs sm:text-sm font-semibold active:scale-[0.99] transition disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  Updating password…
                </>
              ) : (
                <>
                  Set New Password
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <Link
                to="/login"
                state={location.state}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition font-medium"
              >
                <ArrowLeft size={14} /> Back to sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
