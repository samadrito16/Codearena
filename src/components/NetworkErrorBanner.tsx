import { useEffect, useState, useCallback } from 'react';
import { WifiOff, RefreshCw, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function NetworkErrorBanner() {
  const { user } = useAuth();
  const [hasError, setHasError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const checkConnection = useCallback(async () => {
    setIsRetrying(true);
    try {
      const res = await fetch('/api/health', { method: 'GET' });
      if (res.ok) {
        setHasError(false);
        setIsDismissed(false);
      } else {
        setHasError(true);
      }
    } catch {
      setHasError(true);
    } finally {
      setIsRetrying(false);
    }
  }, []);

  useEffect(() => {
    const handleNetworkError = () => {
      setHasError(true);
      setIsDismissed(false);
    };

    const handleNetworkRecovered = () => {
      setHasError(false);
      setIsDismissed(false);
    };

    const handleOffline = () => {
      setHasError(true);
      setIsDismissed(false);
    };

    const handleOnline = () => {
      void checkConnection();
    };

    window.addEventListener('prismcode:network-error', handleNetworkError);
    window.addEventListener('codearena:network-error', handleNetworkError);
    window.addEventListener('prismcode:network-recovered', handleNetworkRecovered);
    window.addEventListener('codearena:network-recovered', handleNetworkRecovered);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('prismcode:network-error', handleNetworkError);
      window.removeEventListener('codearena:network-error', handleNetworkError);
      window.removeEventListener('prismcode:network-recovered', handleNetworkRecovered);
      window.removeEventListener('codearena:network-recovered', handleNetworkRecovered);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [checkConnection]);

  // Only display the banner to authenticated users who actively have ongoing sync / cloud save sessions,
  // preventing false-alarm network warnings for unauthenticated visitors browsing public pages.
  if (!user || !hasError || isDismissed) return null;

  return (
    <div
      role="alert"
      className="sticky top-0 z-40 flex items-center justify-between gap-3 px-4 py-2.5 text-xs border-b transition-all duration-300"
      style={{
        background: 'rgba(239, 68, 68, 0.12)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        color: 'var(--ca-text)',
      }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <WifiOff size={15} className="text-rose-500 shrink-0 animate-pulse" />
        <span className="truncate">
          <strong className="font-semibold text-rose-600 dark:text-rose-400">Connection Interrupted:</strong> Unable to reach the PrismCode server. Real-time submissions and cloud saves are paused.
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={checkConnection}
          disabled={isRetrying}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-medium transition disabled:opacity-50"
        >
          <RefreshCw size={12} className={isRetrying ? 'animate-spin' : ''} />
          <span>{isRetrying ? 'Checking…' : 'Retry'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="p-1 rounded-md text-muted hover:text-primary transition"
          aria-label="Dismiss connection warning"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
