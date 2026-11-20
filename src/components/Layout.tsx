import { useEffect, useState, useMemo } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Code2, Menu, Search, X } from 'lucide-react';
import { useUi } from '../context/UiContext';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import AccountMenu from './AccountMenu';
import CommandPalette from './CommandPalette';
import Footer from './Footer';

const baseMobileItems = [
  ['/dashboard', 'Overview'],
  ['/daily-challenges', 'Daily challenges'],
  ['/learning-paths', 'Learning paths'],
  ['/progress', 'Your progress'],
  ['/profile', 'Profile'],
  ['/problems', 'Problems'],
  ['/workspace/two-sum', 'Code editor'],
  ['/leaderboard', 'Leaderboard'],
  ['/settings', 'Settings'],
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { openCommandPalette, announcement } = useUi();
  const { user } = useAuth();
  const isWorkspace = location.pathname.startsWith('/workspace');

  const mobileItems = useMemo(() => {
    if (user?.role === 'admin') {
      return [...baseMobileItems, ['/admin', 'Admin dashboard']];
    }
    return baseMobileItems;
  }, [user?.role]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return <div className={`app-shell ${isWorkspace ? 'app-shell-workspace' : ''}`}>
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <Sidebar/>
    {menuOpen && <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <button type="button" className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={() => setMenuOpen(false)} aria-label="Close navigation overlay"/>
      <div className="mobile-drawer relative flex h-full w-[285px] flex-col justify-between shadow-2xl">
        <div className="overflow-y-auto px-5 py-7">
          <button type="button" className="absolute right-3 top-4 z-10 rounded-lg p-2 text-muted hover:bg-black/5 dark:hover:bg-white/5" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={18}/></button>
          <div className="mb-8 flex items-center gap-3 font-display text-xl font-bold text-primary"><span className="brand-mark brand-mark-pulse"><Code2 size={18}/></span>CodeArena<span className="themed-link">.</span></div>
          <nav aria-label="Primary navigation" className="space-y-1.5">{mobileItems.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setMenuOpen(false)} className={() => `block rounded-xl px-4 py-3 text-sm font-semibold ${location.pathname === to ? 'nav-link-active' : 'text-muted hover:bg-black/5 dark:hover:bg-white/5'}`}>{label}</NavLink>)}</nav>
        </div>
        <div className="border-t p-4" style={{ borderColor: 'var(--ca-border)' }}>
          <div className="mb-3 flex items-center justify-between text-[11px] text-muted px-1">
            <NavLink to="/terms" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">Terms of Service</NavLink>
            <span>&middot;</span>
            <NavLink to="/privacy" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">Privacy Policy</NavLink>
          </div>
          <AccountMenu onAction={() => setMenuOpen(false)} />
        </div>
      </div>
    </div>}
    <div className={`min-h-screen lg:pl-[260px] ${isWorkspace ? 'workspace-app-main' : ''}`}>
      <header className="flex h-14 items-center justify-between border-b px-4 lg:hidden" style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface)' }}>
        <div className="flex items-center gap-2.5">
          <div className="brand-mark brand-mark-pulse h-8 w-8"><Code2 size={16}/></div>
          <span className="font-display text-base font-bold text-primary">CodeArena<span className="themed-link">.</span></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="icon-button h-9 px-2.5 gap-1.5 text-xs font-semibold"
            onClick={openCommandPalette}
            aria-label="Open command palette (Ctrl+K)"
            title="Quick search (Ctrl+K / Cmd+K)"
          >
            <Search size={15}/>
            <span className="hidden sm:inline">Search</span>
          </button>
          <button type="button" className="icon-button h-9 w-9" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={18}/></button>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className={isWorkspace ? 'workspace-route-main' : 'mx-auto max-w-[1480px] px-4 pb-10 pt-6 sm:px-6 lg:px-9 lg:pt-9'}>
        {isWorkspace ? <Outlet/> : <div key={location.pathname} className="page-enter"><Outlet/></div>}
      </main>
      {!isWorkspace && <Footer />}
    </div>
    <CommandPalette/>
    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {announcement}
    </div>
  </div>;
}
