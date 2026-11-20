import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, LogIn, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ExpiredSessionModal() {
  const { sessionExpired, dismissSessionExpired } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (sessionExpired) {
      setIsOpen(true);
    }
  }, [sessionExpired]);

  if (!isOpen) return null;

  function handleReLogin() {
    setIsOpen(false);
    dismissSessionExpired();
    navigate('/login', {
      state: { from: location },
      replace: true,
    });
  }

  function handleDismiss() {
    setIsOpen(false);
    dismissSessionExpired();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-expired-title"
    >
      <div
        className="relative w-full max-w-md rounded-2xl border p-6 text-center shadow-2xl animate-in zoom-in-95"
        style={{
          background: 'var(--ca-surface)',
          borderColor: 'var(--ca-border)',
        }}
      >
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-muted hover:text-primary transition"
          aria-label="Dismiss session expired alert"
        >
          <X size={18} />
        </button>

        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Clock size={28} />
          </div>
        </div>

        <h3 id="session-expired-title" className="text-lg font-bold font-display text-primary mb-2">
          Session Expired
        </h3>

        <p className="text-xs text-muted leading-relaxed mb-6">
          Your authenticated session has ended. To ensure your submissions, workspace drafts, and account data remain secure, please sign in again.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button
            type="button"
            onClick={handleReLogin}
            className="btn-primary flex items-center justify-center gap-2 py-2 px-5 text-xs font-semibold"
          >
            <LogIn size={14} />
            <span>Sign In Again</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="btn-secondary py-2 px-4 text-xs font-medium"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
