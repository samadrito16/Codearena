import { useState, type FormEvent } from 'react';
import { Code2, Key, ExternalLink, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { PrismMark } from '../PrismLogo';

export default function ClerkSetupScreen() {
  const [publishableKey, setPublishableKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleSaveKey(e: FormEvent) {
    e.preventDefault();
    const trimmed = publishableKey.trim();

    if (!trimmed) {
      setError('Please paste your Clerk Publishable Key.');
      return;
    }

    if (!trimmed.startsWith('pk_test_') && !trimmed.startsWith('pk_live_')) {
      setError('A valid Clerk Publishable Key typically starts with "pk_test_" or "pk_live_".');
      return;
    }

    try {
      localStorage.setItem('clerk_publishable_key', trimmed);
      setSaved(true);
      setError(null);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch {
      setError('Failed to save key in browser storage.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div
        className="max-w-xl w-full rounded-3xl border p-8 shadow-2xl backdrop-blur-xl animate-in fade-in"
        style={{
          background: 'var(--ca-surface)',
          borderColor: 'var(--ca-border)',
        }}
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <PrismMark size={56} className="brand-mark-pulse" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-primary">
            Clerk Authentication Ready
          </h1>
          <p className="mt-2 text-xs text-muted">
            The PrismCode frontend & Express backend are wired for Clerk.
          </p>
        </div>

        {/* Quick Connect Key Input */}
        <div className="rounded-2xl border p-5 mb-6" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}>
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0">
              <Key size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-primary mb-0.5">
                Quick Connect Publishable Key
              </h2>
              <p className="text-xs text-muted leading-relaxed">
                Paste your Clerk Publishable Key below to immediately activate authentication:
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveKey} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={publishableKey}
                onChange={(e) => {
                  setPublishableKey(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="pk_test_..."
                className="w-full rounded-xl border px-3.5 py-2.5 font-mono text-xs text-primary transition focus:outline-none"
                style={{
                  background: 'var(--ca-surface)',
                  borderColor: error ? '#f43f5e' : 'var(--ca-border)',
                }}
              />
            </div>

            {error && (
              <p className="text-[11px] text-rose-500 flex items-center gap-1.5 font-medium">
                <AlertCircle size={13} /> {error}
              </p>
            )}

            {saved && (
              <p className="text-[11px] text-emerald-500 flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={13} /> Key saved! Reloading application…
              </p>
            )}

            <button
              type="submit"
              className="button-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold shadow-md transition"
            >
              <span>Activate Clerk</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>

        {/* Instructions */}
        <div className="rounded-2xl border p-4 mb-6 space-y-2.5 text-xs text-muted" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
          <p className="font-semibold text-primary">Required API Keys:</p>
          <div className="space-y-1.5 font-mono text-[11px]">
            <p className="text-indigo-400">1. Frontend: VITE_CLERK_PUBLISHABLE_KEY=pk_test_...</p>
            <p className="text-emerald-400">2. Backend: CLERK_SECRET_KEY=sk_test_...</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-muted">
            <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
            <span>Google & GitHub SSO</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
            <span>Passkeys & 2FA Ready</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
            <span>Pre-built Clerk Sign In</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
            <span>Express JWT Verification</span>
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://dashboard.clerk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition"
          >
            <span>Open Clerk Dashboard</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
