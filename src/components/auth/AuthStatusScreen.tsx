import { Code2, Loader2, RefreshCw, AlertTriangle } from 'lucide-react';
import { PrismMark } from '../PrismLogo';

interface AuthStatusScreenProps {
  type: 'loading' | 'error';
  message?: string;
  onRetry?: () => void;
}

export default function AuthStatusScreen({
  type,
  message,
  onRetry,
}: AuthStatusScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div
        className="max-w-md w-full rounded-2xl border p-8 text-center shadow-xl backdrop-blur-xl animate-in fade-in"
        style={{
          background: 'var(--ca-surface)',
          borderColor: 'var(--ca-border)',
        }}
      >
        <div className="flex justify-center mb-6">
          <PrismMark size={56} className="brand-mark-pulse" />
        </div>

        {type === 'loading' ? (
          <>
            <h2 className="text-xl font-bold font-display text-primary mb-2">
              Connecting to PrismCode
            </h2>
            <p className="text-sm text-muted mb-6">
              Restoring your authenticated developer session…
            </p>
            <div className="flex justify-center">
              <Loader2 className="animate-spin text-primary" size={26} />
            </div>
          </>
        ) : (
          <>
            <div className="inline-flex p-3 rounded-full bg-rose-500/10 text-rose-500 mb-4">
              <AlertTriangle size={24} />
            </div>
            <h2 className="text-xl font-bold font-display text-primary mb-2">
              Connection Notice
            </h2>
            <p className="text-sm text-muted mb-6">
              {message || 'Unable to connect to the PrismCode server. Please ensure the backend is running.'}
            </p>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
