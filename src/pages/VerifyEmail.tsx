import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Loader2, Mail, ArrowRight, Code2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PrismMark } from '../components/PrismLogo';

interface VerifyEmailProps {
  isModal?: boolean;
  onClose?: () => void;
}

export default function VerifyEmail({ isModal = false, onClose }: VerifyEmailProps) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { user, verifyEmail, resendVerification } = useAuth();

  const [state, setState] = useState<'verifying' | 'success' | 'error' | 'idle'>(token ? 'verifying' : 'idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendEmail, setResendEmail] = useState(user?.email || '');
  const [isResending, setIsResending] = useState(false);
  const [resendNotice, setResendNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const activeToken = token;
    let cancelled = false;

    async function processToken() {
      try {
        await verifyEmail(activeToken);
        if (!cancelled) {
          setState('success');
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : 'The verification token is invalid or has expired.';
          setErrorMessage(msg);
          setState('error');
        }
      }
    }

    void processToken();

    return () => {
      cancelled = true;
    };
  }, [token, verifyEmail]);

  async function handleResend(e: FormEvent) {
    e.preventDefault();
    if (isResending || !resendEmail.trim()) return;

    setIsResending(true);
    setResendNotice(null);
    try {
      const res = await resendVerification(resendEmail.trim());
      setResendNotice(res.message || 'If that account exists, a new verification link has been dispatched.');
    } catch (err: unknown) {
      setResendNotice(err instanceof Error ? err.message : 'Unable to dispatch verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className={isModal ? 'relative w-full' : 'min-h-[85vh] flex items-center justify-center py-6 px-4'}>
      <div className="glass-auth-card relative z-10 mx-auto w-full max-w-[440px] overflow-hidden rounded-[32px] p-6 sm:p-8 text-center animate-in fade-in zoom-in-95 duration-200">
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
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/25 dark:bg-white/10 border border-white/40 dark:border-white/15 backdrop-blur-md shadow-lg shadow-black/5 mb-4">
          <PrismMark size={32} className="brand-mark-pulse" />
        </div>

        {state === 'verifying' && (
          <div className="py-4">
            <h2 className="text-xl font-bold font-display text-primary mb-2">
              Verifying Your Email
            </h2>
            <p className="text-sm text-muted mb-6">
              Please wait while we confirm your email address…
            </p>
            <div className="flex justify-center">
              <Loader2 className="animate-spin text-primary" size={28} />
            </div>
          </div>
        )}

        {state === 'success' && (
          <div className="py-4 animate-in zoom-in-95">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500 mb-4 border border-emerald-500/20">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold font-display text-primary mb-2">
              Email Verified!
            </h2>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              Your PrismCode account has been verified successfully. You have full access to problem tracking, real submissions, and discussion features.
            </p>
            <button
              type="button"
              onClick={() => navigate('/dashboard', { replace: true })}
              className="btn-primary w-full py-2.5 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {(state === 'error' || state === 'idle') && (
          <div className="py-2">
            <div className="inline-flex p-3 rounded-full bg-rose-500/10 text-rose-500 mb-4 border border-rose-500/20">
              <AlertTriangle size={30} />
            </div>
            <h2 className="text-xl font-bold font-display text-primary mb-2">
              {state === 'error' ? 'Verification Link Expired' : 'Email Verification'}
            </h2>
            <p className="text-xs text-muted mb-6 leading-relaxed">
              {errorMessage || 'Verification links expire after 24 hours for security. Enter your email address to receive a fresh verification link.'}
            </p>

            <form onSubmit={handleResend} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1.5" htmlFor="verify-email-input">
                  Your Account Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    id="verify-email-input"
                    type="email"
                    required
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="glass-auth-input w-full rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm transition focus:outline-none"
                  />
                </div>
              </div>

              {resendNotice && (
                <div className="rounded-xl border p-3 text-xs border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
                  {resendNotice}
                </div>
              )}

              <button
                type="submit"
                disabled={isResending || !resendEmail.trim()}
                className="glass-auth-submit-btn w-full py-2.5 rounded-full flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold disabled:opacity-50 active:scale-[0.99] transition"
              >
                {isResending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Sending Link…</span>
                  </>
                ) : (
                  <span>Send Verification Link</span>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-dashed" style={{ borderColor: 'var(--ca-border)' }}>
              <Link to="/login" className="text-xs text-muted hover:text-primary transition font-medium">
                Return to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
