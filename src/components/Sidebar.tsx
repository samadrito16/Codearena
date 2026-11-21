import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  ChevronsLeft,
  ChevronsRight,
  Code2,
  Compass,
  Flame,
  LayoutDashboard,
  Map,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useUi } from '../context/UiContext';
import { useAuth } from '../context/AuthContext';
import AccountMenu from './AccountMenu';
import { PrismMark } from './PrismLogo';

const mainItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/mastery', label: 'Pattern Mastery', icon: Sparkles },
  { to: '/problems', label: 'Problems', icon: Code2 },
  { to: '/workspace/two-sum', label: 'Code editor', icon: Compass },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
];

const practiceItems = [
  { to: '/daily-challenges', label: 'Daily challenges', icon: Flame },
  { to: '/learning-paths', label: 'Learning paths', icon: Map },
  { to: '/progress', label: 'Your progress', icon: BarChart3 },
];

export default function Sidebar() {
  const { openCommandPalette, sidebarCollapsed, toggleSidebar } = useUi();
  const { user } = useAuth();
  const isMac = typeof navigator !== 'undefined' && /mac/i.test(navigator.platform);

  return (
    <aside
      className={`sidebar-shell hidden lg:flex flex-col transition-[width] duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-[70px]' : 'w-[260px]'
      }`}
      aria-label="Sidebar navigation"
    >
      {/* Sidebar Header */}
      {sidebarCollapsed ? (
        <div
          className="flex flex-col items-center py-4 gap-2.5 border-b"
          style={{ borderColor: 'var(--ca-border)' }}
        >
          <PrismMark size={30} className="brand-mark-pulse shrink-0" />
          <button
            type="button"
            onClick={toggleSidebar}
            className="icon-button h-8 w-8 rounded-lg text-muted hover:text-primary transition"
            aria-label="Expand sidebar (Ctrl+B)"
            title="Expand sidebar (Ctrl+B)"
          >
            <ChevronsRight size={15} />
          </button>
        </div>
      ) : (
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: 'var(--ca-border)' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <PrismMark size={32} className="brand-mark-pulse shrink-0" />
            <div className="min-w-0">
              <span className="font-display text-[17px] font-bold tracking-tight text-primary">
                PrismCode
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleSidebar}
            className="icon-button h-8 w-8 rounded-lg shrink-0 text-muted hover:text-primary transition"
            aria-label="Collapse sidebar (Ctrl+B)"
            title="Collapse sidebar (Ctrl+B)"
          >
            <ChevronsLeft size={15} />
          </button>
        </div>
      )}

      {/* Quick Search */}
      <div className={sidebarCollapsed ? 'px-3 py-3 flex justify-center' : 'px-4 py-3'}>
        {sidebarCollapsed ? (
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Quick search (Ctrl+K)"
            title="Quick search (Ctrl+K)"
            className="sidebar-quick-search flex h-10 w-10 items-center justify-center rounded-xl border text-muted transition"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
          >
            <Search size={15} aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open quick search and command palette (Ctrl+K)"
            className="sidebar-quick-search flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-xs text-muted transition"
            style={{ borderColor: 'var(--ca-border)', background: 'var(--ca-surface-muted)' }}
          >
            <Search size={14} className="shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-left font-medium">Quick search…</span>
            <kbd className="ca-kbd">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 space-y-4">
        {/* Workspace Section */}
        <div>
          {!sidebarCollapsed && <p className="sidebar-label px-2 mb-2">Workspace</p>}
          <nav aria-label="Workspace links" className="space-y-1">
            {mainItems.map(({ to, label, icon: Icon }) =>
              sidebarCollapsed ? (
                <NavLink
                  key={to}
                  to={to}
                  title={label}
                  className={({ isActive }) =>
                    `relative flex h-10 w-10 items-center justify-center rounded-xl transition mx-auto ${
                      isActive
                        ? 'nav-link-active font-bold shadow-sm'
                        : 'text-slate-500 hover:bg-slate-500/10 hover:text-primary'
                    }`
                  }
                >
                  <Icon size={18} />
                </NavLink>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `nav-link relative ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              )
            )}
          </nav>
        </div>

        {sidebarCollapsed ? (
          <div className="border-t mx-2" style={{ borderColor: 'var(--ca-border)' }} />
        ) : null}

        {/* Practice Section */}
        <div>
          {!sidebarCollapsed && <p className="sidebar-label px-2 mb-2">Your practice</p>}
          <nav aria-label="Practice links" className="space-y-1">
            {practiceItems.map(({ to, label, icon: Icon }) =>
              sidebarCollapsed ? (
                <NavLink
                  key={to}
                  to={to}
                  end
                  title={label}
                  className={({ isActive }) =>
                    `relative flex h-10 w-10 items-center justify-center rounded-xl transition mx-auto ${
                      isActive
                        ? 'nav-link-active font-bold shadow-sm'
                        : 'text-slate-500 hover:bg-slate-500/10 hover:text-primary'
                    }`
                  }
                >
                  <Icon size={18} />
                </NavLink>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) =>
                    `nav-link relative ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Footer Area */}
      <div className={`mt-auto pb-4 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
        <div className="mb-2 space-y-1">
          {sidebarCollapsed ? (
            <NavLink
              to="/settings"
              title="Settings"
              className={({ isActive }) =>
                `relative flex h-10 w-10 items-center justify-center rounded-xl transition mx-auto ${
                  isActive
                    ? 'nav-link-active font-bold shadow-sm'
                    : 'text-slate-500 hover:bg-slate-500/10 hover:text-primary'
                }`
              }
            >
              <Settings size={18} />
            </NavLink>
          ) : (
            <NavLink
              to="/settings"
              className={({ isActive }) => `nav-link relative ${isActive ? 'nav-link-active' : ''}`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>
          )}

          {user?.role === 'admin' &&
            (sidebarCollapsed ? (
              <NavLink
                to="/admin"
                title="Admin dashboard"
                className={({ isActive }) =>
                  `relative flex h-10 w-10 items-center justify-center rounded-xl transition mx-auto ${
                    isActive
                      ? 'nav-link-active font-bold shadow-sm'
                      : 'text-slate-500 hover:bg-slate-500/10 hover:text-primary'
                  }`
                }
              >
                <ShieldCheck size={18} />
              </NavLink>
            ) : (
              <NavLink
                to="/admin"
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                <ShieldCheck size={18} />
                <span>Admin dashboard</span>
              </NavLink>
            ))}
        </div>

        <div className="pt-2 border-t" style={{ borderColor: 'var(--ca-border)' }}>
          <AccountMenu collapsed={sidebarCollapsed} />
        </div>
      </div>
    </aside>
  );
}
