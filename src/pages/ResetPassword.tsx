import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Code2, KeyRound, LoaderCircle, CheckCircle2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorAlert from '../components/ui/ErrorAlert';
import { authService } from '../services/authService';
import { ApiError } from '../lib/api';
import { PrismMark } from '../components/PrismLogo';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ password?: string; confirm?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div
        className="max-w-md w-full rounded-2xl border p-8 shadow-2xl backdrop-blur-xl animate-in fade-in"
        style={{
          background: 'var(--ca-surface)',
          borderColor: 'var(--ca-border)',
        }}
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <PrismMark size={52} className="brand-mark-pulse" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-primary">
            Create New Password
          </h1>
          <p className="mt-2 text-xs text-muted">
            Enter your new password below to regain account access
          </p>
        </div>

        {success ? (
          <div className="text-center py-4">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-base font-bold text-primary mb-2">Password Updated!</h2>
            <p className="text-xs text-muted mb-6 leading-relaxed">
              Your password has been changed successfully. All previous sessions have been safely invalidated.
            </p>
            <Link
              to="/login"
              className="button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition"
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
                className="button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition"
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
              <label htmlFor="password" className="block text-xs font-semibold text-primary mb-1.5">
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
                  className={`w-full rounded-xl border px-3.5 py-2.5 pl-10 text-sm text-primary transition focus:outline-none ${
                    fieldErrors.password ? 'border-rose-500' : 'border-border focus:border-primary'
                  }`}
                  style={{
                    background: 'var(--ca-surface-muted)',
                    borderColor: fieldErrors.password ? '#f43f5e' : 'var(--ca-border)',
                  }}
                />
                <KeyRound
                  size={16}
                  className="absolute left-3.5 top-3 text-muted pointer-events-none"
                />
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-[11px] text-rose-500">{fieldErrors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-primary mb-1.5">
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
                  className={`w-full rounded-xl border px-3.5 py-2.5 pl-10 text-sm text-primary transition focus:outline-none ${
                    fieldErrors.confirm ? 'border-rose-500' : 'border-border focus:border-primary'
                  }`}
                  style={{
                    background: 'var(--ca-surface-muted)',
                    borderColor: fieldErrors.confirm ? '#f43f5e' : 'var(--ca-border)',
                  }}
                />
                <KeyRound
                  size={16}
                  className="absolute left-3.5 top-3 text-muted pointer-events-none"
                />
              </div>
              {fieldErrors.confirm && (
                <p className="mt-1 text-[11px] text-rose-500">{fieldErrors.confirm}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="button-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold shadow-md transition disabled:opacity-60"
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
                className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-primary transition"
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
