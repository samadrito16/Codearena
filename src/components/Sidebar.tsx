import { NavLink } from 'react-router-dom';
import { BarChart3, Code2, Compass, Flame, LayoutDashboard, Map, Search, Settings, ShieldCheck, Trophy, UserRound } from 'lucide-react';
import { useUi } from '../context/UiContext';
import { useAuth } from '../context/AuthContext';
import AccountMenu from './AccountMenu';
import { PrismMark } from './PrismLogo';

const mainItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/problems', label: 'Problems', icon: Code2 },
  { to: '/workspace/two-sum', label: 'Code editor', icon: Compass },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
];

export default function Sidebar() {
  const { openCommandPalette } = useUi();
  const { user } = useAuth();
  const isMac = typeof navigator !== 'undefined' && /mac/i.test(navigator.platform);

  return <aside className="sidebar-shell hidden lg:flex" aria-label="Sidebar navigation">
    <div className="flex items-center gap-3 px-6 py-6">
      <PrismMark size={36} className="brand-mark-pulse shrink-0" />
      <div><div className="font-display text-[19px] font-bold tracking-tight text-primary flex items-center">Prism Code<span className="themed-link">.</span></div><div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Level up your logic</div></div>
    </div>
    <div className="px-4 pb-3">
      <button
        type="button"
        onClick={openCommandPalette}
        aria-label="Open quick search and command palette (Ctrl+K)"
        className="sidebar-quick-search flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-xs text-muted transition"
        style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
      >
        <Search size={14} className="shrink-0" aria-hidden="true"/>
        <span className="min-w-0 flex-1 truncate text-left font-medium">Quick search…</span>
        <kbd className="ca-kbd">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
      </button>
    </div>
    <div className="px-4 pt-1">
      <p className="sidebar-label">Workspace</p>
      <nav aria-label="Workspace links" className="mt-3 space-y-1">
        {mainItems.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => `nav-link relative ${isActive ? 'nav-link-active' : ''}`}><Icon size={18}/><span>{label}</span>{label === 'Problems' && <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold nav-count">NEW</span>}</NavLink>)}
      </nav>
    </div>
    <div className="px-4 pt-7">
      <p className="sidebar-label">Your practice</p>
      <nav aria-label="Practice links" className="mt-3 space-y-1">
        <NavLink to="/daily-challenges" end className={({ isActive }) => `nav-link relative ${isActive ? 'nav-link-active' : ''}`}><Flame size={18}/><span>Daily challenges</span></NavLink>
        <NavLink to="/learning-paths" className={({ isActive }) => `nav-link relative ${isActive ? 'nav-link-active' : ''}`}><Map size={18}/><span>Learning paths</span></NavLink>
        <NavLink to="/progress" end className={({ isActive }) => `nav-link relative ${isActive ? 'nav-link-active' : ''}`}><BarChart3 size={18}/><span>Your progress</span></NavLink>
        <NavLink to="/profile" end className={({ isActive }) => `nav-link relative ${isActive ? 'nav-link-active' : ''}`}><UserRound size={18}/><span>Profile</span></NavLink>
      </nav>
    </div>
    <div className="mt-auto px-4 pb-4">
      <div className="mb-2 space-y-1">
        <NavLink to="/settings" className={({ isActive }) => `nav-link relative ${isActive ? 'nav-link-active' : ''}`}><Settings size={18}/><span>Settings</span></NavLink>
        {user?.role === 'admin' && (
          <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}><ShieldCheck size={18}/><span>Admin dashboard</span></NavLink>
        )}
      </div>
      <div className="mb-2 flex items-center justify-between px-2 text-[10px] text-muted">
        <NavLink to="/terms" className="hover:text-primary transition">Terms</NavLink>
        <span>&middot;</span>
        <NavLink to="/privacy" className="hover:text-primary transition">Privacy</NavLink>
        <span>&middot;</span>
        <span className="font-mono text-[9px]">v1.2</span>
      </div>
      <div className="pt-2 border-t" style={{ borderColor: 'var(--ca-border)' }}>
        <AccountMenu />
      </div>
    </div>
  </aside>;
}
