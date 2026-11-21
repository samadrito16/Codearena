import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronsUpDown, LoaderCircle, LogOut, ShieldCheck, UserRound } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import ProfileAvatar from './ProfileAvatar';

export default function AccountMenu({
  onAction,
  collapsed = false,
}: {
  onAction?: () => void;
  collapsed?: boolean;
}) {
  const { profile } = useApp();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const displayName = profile.updatedAt ? profile.displayName : (user?.name ?? profile.displayName);

  async function handleSignOut() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      await signOut();
      setOpen(false);
      onAction?.();
      navigate('/login');
    } catch (err: unknown) {
      setLogoutError(err instanceof Error ? err.message : 'Sign out failed');
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="relative" ref={ref}>
      <div
        className={`account-popover absolute bottom-full left-0 z-50 mb-2 rounded-xl border p-1.5 shadow-xl ${
          collapsed ? 'w-56' : 'right-0'
        } ${open ? 'account-popover-open' : ''}`}
        aria-hidden={!open}
        style={{ background: 'var(--ca-surface)', borderColor: 'var(--ca-border)' }}
      >
        <div className="mb-1.5 border-b px-2.5 py-2" style={{ borderColor: 'var(--ca-border)' }}>
          <div className="flex items-center justify-between gap-1">
            <p className="truncate text-xs font-bold text-primary">{displayName}</p>
            {user?.role === 'admin' && (
              <span className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] font-bold bg-amber-500/10 text-amber-500">
                <ShieldCheck size={10} /> Admin
              </span>
            )}
          </div>
          <p className="truncate text-[10px] text-muted">{user?.email ?? 'Not signed in'}</p>
        </div>

        {logoutError && (
          <p className="px-2 py-1 text-[10px] text-rose-500 font-medium">
            {logoutError}
          </p>
        )}

        <Link
          to="/profile"
          onClick={() => { setOpen(false); onAction?.(); }}
          className="dropdown-item"
        >
          <UserRound size={15} /> Profile
        </Link>

        {user ? (
          <button
            type="button"
            disabled={isLoggingOut}
            onClick={handleSignOut}
            className="dropdown-item w-full text-left text-rose-500 hover:bg-rose-500/10 dark:text-rose-400 disabled:opacity-60"
          >
            {isLoggingOut ? (
              <>
                <LoaderCircle size={15} className="animate-spin" /> Signing out…
              </>
            ) : (
              <>
                <LogOut size={15} /> Sign out
              </>
            )}
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => { setOpen(false); onAction?.(); }}
            className="dropdown-item themed-link"
          >
            <UserRound size={15} /> Sign in / register
          </Link>
        )}
      </div>

      {collapsed ? (
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-haspopup="menu"
          title={displayName}
          className={`account-trigger flex h-10 w-10 items-center justify-center rounded-xl border mx-auto transition ${
            open ? 'account-trigger-active ring-1 ring-indigo-500/30' : ''
          }`}
        >
          <ProfileAvatar
            displayName={displayName}
            avatarMode={profile.avatarMode}
            avatarColor={profile.avatarColor}
            avatarImage={profile.avatarImage}
            size="sm"
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-haspopup="menu"
          className={`account-trigger flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition ${
            open ? 'account-trigger-active' : ''
          }`}
        >
          <ProfileAvatar
            displayName={displayName}
            avatarMode={profile.avatarMode}
            avatarColor={profile.avatarColor}
            avatarImage={profile.avatarImage}
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-primary">{displayName}</p>
            <p className="truncate text-[10px] text-muted">
              {user ? (user.role === 'admin' ? 'Administrator' : 'Member') : 'Guest'}
            </p>
          </div>
          <ChevronsUpDown size={14} className="shrink-0 text-muted" />
        </button>
      )}
    </div>
  );
}
