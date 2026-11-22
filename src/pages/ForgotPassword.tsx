import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, LoaderCircle, Mail, CheckCircle2, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ErrorAlert from '../components/ui/ErrorAlert';
import { authService } from '../services/authService';
import { PrismMark } from '../components/PrismLogo';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ForgotPasswordProps {
  isModal?: boolean;
  onClose?: () => void;
}

export default function ForgotPassword({ isModal = false, onClose }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmed = email.trim();
    if (!trimmed) {
      setFieldError('Enter your account email address.');
      return;
    }
    if (!EMAIL_PATTERN.test(trimmed)) {
      setFieldError('Enter a valid email address.');
      return;
    }

    setFieldError(null);
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await authService.requestPasswordReset(trimmed);
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to request password reset.';
      setSubmitError(msg);
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
            Reset Password
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Enter your email to receive a secure recovery link
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-4">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">Check your email</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              If an account exists for <span className="font-semibold text-slate-900 dark:text-white">{email}</span>, a password reset link has been dispatched. The link expires in 1 hour.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-6 bg-black/5 dark:bg-white/5 p-3 rounded-2xl border border-black/5 dark:border-white/10">
              💡 <strong>Development Notice:</strong> If running locally without an external email provider, the reset link and token have been logged directly to the backend terminal console.
            </p>
            <Link
              to="/login"
              state={location.state}
              className="glass-auth-submit-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm active:scale-[0.99] transition"
            >
              <ArrowLeft size={16} /> Return to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitError && (
              <ErrorAlert
                title="Reset Request Issue"
                message={submitError}
                onDismiss={() => setSubmitError(null)}
              />
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-2">
                Account email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldError) setFieldError(null);
                  }}
                  placeholder="you@example.com"
                  className={`glass-auth-input w-full rounded-full px-4 py-2.5 pl-10 text-xs sm:text-sm transition focus:outline-none ${
                    fieldError ? 'border-rose-500' : ''
                  }`}
                />
              </div>
              {fieldError && (
                <p className="mt-1 ml-3 text-[11px] text-rose-500">{fieldError}</p>
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
                  Sending instructions…
                </>
              ) : (
                <>
                  Send Reset Link
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
