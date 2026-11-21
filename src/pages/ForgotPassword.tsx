import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Code2, LoaderCircle, Mail, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ErrorAlert from '../components/ui/ErrorAlert';
import { authService } from '../services/authService';
import { PrismMark } from '../components/PrismLogo';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
            Reset Password
          </h1>
          <p className="mt-2 text-xs text-muted">
            Enter your email to receive a secure recovery link
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-4">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-base font-bold text-primary mb-2">Check your email</h2>
            <p className="text-xs text-muted mb-6 leading-relaxed">
              If an account exists for <span className="font-semibold text-primary">{email}</span>, a password reset link has been dispatched. The link expires in 1 hour.
            </p>
            <p className="text-[11px] text-muted mb-6 bg-muted/10 p-3 rounded-xl border border-muted/20">
              💡 <strong>Development Notice:</strong> If running locally without an external email provider, the reset link and token have been logged directly to the backend terminal console.
            </p>
            <Link
              to="/login"
              className="button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition"
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
              <label htmlFor="email" className="block text-xs font-semibold text-primary mb-1.5">
                Account email
              </label>
              <div className="relative">
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
                  className={`w-full rounded-xl border px-3.5 py-2.5 pl-10 text-sm text-primary transition focus:outline-none ${
                    fieldError ? 'border-rose-500' : 'border-border focus:border-primary'
                  }`}
                  style={{
                    background: 'var(--ca-surface-muted)',
                    borderColor: fieldError ? '#f43f5e' : 'var(--ca-border)',
                  }}
                />
                <Mail
                  size={16}
                  className="absolute left-3.5 top-3 text-muted pointer-events-none"
                />
              </div>
              {fieldError && (
                <p className="mt-1 text-[11px] text-rose-500">{fieldError}</p>
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
