import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronsUpDown, LoaderCircle, LogOut, Settings, ShieldCheck, UserRound } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { getProfileInitials } from '../lib/profileStorage';
import ProfileAvatar from './ProfileAvatar';

export default function AccountMenu({
  onAction,
  variant = 'topbar',
  collapsed = false,
}: {
  onAction?: () => void;
  variant?: 'topbar' | 'mobile' | 'sidebar';
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
  const initials = getProfileInitials(displayName).slice(0, 1) || 'U';

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

  // Topbar variant (matches screenshot rectangular pill, fully adapts to light and dark mode)
  if (variant === 'topbar') {
    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-haspopup="menu"
          className="group flex items-center gap-2 rounded-lg border border-slate-300/90 bg-slate-100/90 hover:bg-slate-200/90 hover:border-slate-400 text-slate-800 hover:text-slate-900 dark:border-neutral-700/80 dark:bg-neutral-900/70 dark:text-neutral-300 dark:hover:bg-neutral-800/90 dark:hover:border-neutral-500/80 dark:hover:text-white px-2.5 py-1 text-xs transition-all shadow-sm select-none"
        >
          {/* Avatar square */}
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-amber-100 text-[10px] font-bold text-amber-800 border border-amber-300/60 dark:bg-[#38332b] dark:text-amber-200/90 dark:border-transparent shadow-sm">
            {initials}
          </div>
          <span className="font-medium text-xs text-slate-800 group-hover:text-slate-900 dark:text-neutral-200 dark:group-hover:text-white max-w-[120px] sm:max-w-[150px] truncate">
            {displayName}
          </span>
          <ChevronDown
            size={12}
            className={`text-slate-400 group-hover:text-slate-700 dark:text-neutral-400 dark:group-hover:text-white transition-transform duration-150 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {open && (
          <div
            className="absolute right-0 top-full mt-1.5 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-neutral-800 dark:bg-[#10131c] dark:shadow-2xl dark:shadow-black/80 animate-in fade-in zoom-in-95 duration-100 z-50 text-left"
            role="menu"
          >
            {/* Header / User Info */}
            <div className="mb-1 border-b border-slate-100 dark:border-neutral-800/80 px-2.5 py-2">
              <div className="flex items-center justify-between gap-1">
                <p className="truncate text-xs font-bold text-slate-900 dark:text-white">{displayName}</p>
                {user?.role === 'admin' && (
                  <span className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <ShieldCheck size={10} /> Admin
                  </span>
                )}
              </div>
              <p className="truncate text-[10px] text-slate-500 dark:text-neutral-400">{user?.email ?? 'Guest user'}</p>
            </div>

            {logoutError && (
              <p className="px-2 py-1 text-[10px] text-rose-500 dark:text-rose-400 font-medium">{logoutError}</p>
            )}

            {/* Links */}
            <Link
              to="/profile"
              onClick={() => {
                setOpen(false);
                onAction?.();
              }}
              className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-neutral-300 dark:hover:bg-white/[0.08] dark:hover:text-white transition-colors"
              role="menuitem"
            >
              <UserRound size={14} className="text-slate-500 dark:text-neutral-400" />
              <span>Profile</span>
            </Link>

            <Link
              to="/settings"
              onClick={() => {
                setOpen(false);
                onAction?.();
              }}
              className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-neutral-300 dark:hover:bg-white/[0.08] dark:hover:text-white transition-colors"
              role="menuitem"
            >
              <Settings size={14} className="text-slate-500 dark:text-neutral-400" />
              <span>Settings</span>
            </Link>

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => {
                  setOpen(false);
                  onAction?.();
                }}
                className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10 transition-colors"
                role="menuitem"
              >
                <ShieldCheck size={14} className="text-amber-500 dark:text-amber-400" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            <div className="my-1 border-t border-slate-100 dark:border-neutral-800/80" />

            {user ? (
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 transition-colors disabled:opacity-60"
                role="menuitem"
              >
                {isLoggingOut ? (
                  <>
                    <LoaderCircle size={14} className="animate-spin" /> Signing out…
                  </>
                ) : (
                  <>
                    <LogOut size={14} /> Sign out
                  </>
                )}
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => {
                  setOpen(false);
                  onAction?.();
                }}
                className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10 transition-colors"
                role="menuitem"
              >
                <UserRound size={14} /> Sign in / register
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }

  // Mobile / drawer fallback variant
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

        <Link
          to="/settings"
          onClick={() => { setOpen(false); onAction?.(); }}
          className="dropdown-item"
        >
          <Settings size={15} /> Settings
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
    </div>
  );
}
