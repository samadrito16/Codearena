import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Code2,
  Compass,
  Contrast,
  Flame,
  FolderGit2,
  Map,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Timer,
} from 'lucide-react';
import { useUi } from '../context/UiContext';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { getLenis } from '../lib/smoothScroll';
import AccountMenu from './AccountMenu';
import { PrismMark } from './PrismLogo';

interface TopNavbarProps {
  onOpenMobileMenu?: () => void;
}

export default function TopNavbar({ onOpenMobileMenu }: TopNavbarProps) {
  const location = useLocation();
  const { openCommandPalette } = useUi();
  const { user } = useAuth();
  const { theme, setTheme } = useApp();

  const [learnOpen, setLearnOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [overviewActive, setOverviewActive] = useState(false);

  const learnRef = useRef<HTMLDivElement>(null);
  const practiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollY > 2);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
    };
  }, []);

  // Close dropdowns on route changes, and reset overview active state if leaving dashboard
  useEffect(() => {
    setLearnOpen(false);
    setPracticeOpen(false);
    if (location.pathname !== '/dashboard' && location.pathname !== '/') {
      setOverviewActive(false);
    }
  }, [location.pathname]);

  // Handle outside clicks and escape key
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        setLearnOpen(false);
      }
      if (practiceRef.current && !practiceRef.current.contains(e.target as Node)) {
        setPracticeOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setLearnOpen(false);
        setPracticeOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isLearnActive =
    location.pathname.startsWith('/mastery') || location.pathname.startsWith('/learning-paths');

  const isPracticeActive =
    location.pathname.startsWith('/problems') ||
    location.pathname.startsWith('/daily-challenges') ||
    location.pathname.startsWith('/review') ||
    location.pathname.startsWith('/interview') ||
    location.pathname.startsWith('/workspace') ||
    location.pathname.startsWith('/projects') ||
    location.pathname.startsWith('/editor');

  const isYearPlanner = location.pathname.startsWith('/year');
  const isFullWidthNav = isYearPlanner || location.pathname.startsWith('/interview');

  return (
    <header className={`top-navbar-root ${isScrolled ? 'is-scrolled' : ''}`}>
      <div
        className={`mx-auto flex h-[52px] w-full ${
          isFullWidthNav ? 'max-w-none px-4 sm:px-6 lg:px-8' : 'max-w-[1560px] px-3 sm:px-5 lg:px-7'
        } items-center justify-between`}
      >
        {/* Left Side: Brand & Navigation */}
        <div className="flex items-center gap-2 sm:gap-6">
          {/* Website Name & Logo */}
          <NavLink
            to="/dashboard"
            onClick={() => setOverviewActive(true)}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0"
            aria-label="PrismCode home"
          >
            <PrismMark size={24} className="shrink-0" />
            <span className="font-display text-sm sm:text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">
              PrismCode
            </span>
          </NavLink>

          {/* Desktop Nav Items */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 text-xs"
          >
            {/* Overview */}
            <NavLink
              to="/dashboard"
              onClick={() => setOverviewActive(true)}
              className={() =>
                `top-nav-box ${
                  overviewActive && (location.pathname === '/dashboard' || location.pathname === '/')
                    ? 'top-nav-box-active'
                    : ''
                }`
              }
            >
              Overview
            </NavLink>

            {/* Learn Dropdown */}
            <div className="relative" ref={learnRef}>
              <button
                type="button"
                onClick={() => {
                  setLearnOpen((prev) => !prev);
                  setPracticeOpen(false);
                }}
                aria-expanded={learnOpen}
                aria-haspopup="menu"
                className={`top-nav-box ${isLearnActive || learnOpen ? 'top-nav-box-active' : ''}`}
              >
                <span>Learn</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-150 ${learnOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {learnOpen && (
                <div
                  className="glass-dropdown-menu absolute left-0 top-full mt-2 w-64 rounded-2xl p-1.5 shadow-2xl z-50"
                  role="menu"
                >
                  <NavLink
                    to="/mastery"
                    onClick={() => setLearnOpen(false)}
                    className={({ isActive }) =>
                      `top-dropdown-item ${isActive ? 'top-dropdown-item-active' : ''}`
                    }
                    role="menuitem"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 shadow-sm">
                      <Sparkles size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-900 dark:text-white">Pattern Mastery</div>
                      <div className="text-[10px] text-slate-500 dark:text-neutral-400">Algorithmic mental models</div>
                    </div>
                  </NavLink>

                  <NavLink
                    to="/learning-paths"
                    onClick={() => setLearnOpen(false)}
                    className={({ isActive }) =>
                      `top-dropdown-item ${isActive ? 'top-dropdown-item-active' : ''}`
                    }
                    role="menuitem"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20 shadow-sm">
                      <Map size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-900 dark:text-white">Learning Paths</div>
                      <div className="text-[10px] text-slate-500 dark:text-neutral-400">Step-by-step career tracks</div>
                    </div>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Practice Dropdown */}
            <div className="relative" ref={practiceRef}>
              <button
                type="button"
                onClick={() => {
                  setPracticeOpen((prev) => !prev);
                  setLearnOpen(false);
                }}
                aria-expanded={practiceOpen}
                aria-haspopup="menu"
                className={`top-nav-box ${isPracticeActive || practiceOpen ? 'top-nav-box-active' : ''}`}
              >
                <span>Practice</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-150 ${practiceOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {practiceOpen && (
                <div
                  className="glass-dropdown-menu absolute left-0 top-full mt-2 w-64 rounded-2xl p-1.5 shadow-2xl z-50"
                  role="menu"
                >
                  <NavLink
                    to="/problems"
                    onClick={() => setPracticeOpen(false)}
                    className={({ isActive }) =>
                      `top-dropdown-item ${isActive ? 'top-dropdown-item-active' : ''}`
                    }
                    role="menuitem"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 shadow-sm">
                      <Code2 size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-900 dark:text-white">Problems</div>
                      <div className="text-[10px] text-slate-500 dark:text-neutral-400">All practice problems</div>
                    </div>
                  </NavLink>

                  <NavLink
                    to="/daily-challenges"
                    onClick={() => setPracticeOpen(false)}
                    className={({ isActive }) =>
                      `top-dropdown-item ${isActive ? 'top-dropdown-item-active' : ''}`
                    }
                    role="menuitem"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20 shadow-sm">
                      <Flame size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-900 dark:text-white">Daily Challenges</div>
                      <div className="text-[10px] text-slate-500 dark:text-neutral-400">Daily curated exercises</div>
                    </div>
                  </NavLink>

                  <NavLink
                    to="/review"
                    onClick={() => setPracticeOpen(false)}
                    className={({ isActive }) =>
                      `top-dropdown-item ${isActive ? 'top-dropdown-item-active' : ''}`
                    }
                    role="menuitem"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/20 shadow-sm">
                      <Search size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-900 dark:text-white">Code Review</div>
                      <div className="text-[10px] text-slate-500 dark:text-neutral-400">Audit multi-file repos & AI PRs</div>
                    </div>
                  </NavLink>

                  <NavLink
                    to="/interview"
                    onClick={() => setPracticeOpen(false)}
                    className={({ isActive }) =>
                      `top-dropdown-item ${isActive ? 'top-dropdown-item-active' : ''}`
                    }
                    role="menuitem"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
                      <Timer size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-900 dark:text-white">Mock Interview</div>
                    </div>
                  </NavLink>

                  <NavLink
                    to="/editor"
                    onClick={() => setPracticeOpen(false)}
                    className={({ isActive }) =>
                      `top-dropdown-item ${isActive ? 'top-dropdown-item-active' : ''}`
                    }
                    role="menuitem"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
                      <Compass size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-900 dark:text-white">Code Editor</div>
                      <div className="text-[10px] text-slate-500 dark:text-neutral-400">Personal coding workspace</div>
                    </div>
                  </NavLink>

                  <NavLink
                    to="/projects"
                    onClick={() => setPracticeOpen(false)}
                    className={({ isActive }) =>
                      `top-dropdown-item ${isActive ? 'top-dropdown-item-active' : ''}`
                    }
                    role="menuitem"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20 shadow-sm">
                      <FolderGit2 size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-xs text-slate-900 dark:text-white">Projects</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                          Soon
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-neutral-400">Guided real-world builds</div>
                    </div>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Year Planner */}
            <NavLink
              to="/year"
              className={({ isActive }) =>
                `top-nav-box ${isActive ? 'top-nav-box-active' : ''}`
              }
            >
              Year
            </NavLink>

            {/* Leaderboard */}
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `top-nav-box ${isActive ? 'top-nav-box-active' : ''}`
              }
            >
              Leaderboard
            </NavLink>

            {/* Progress */}
            <NavLink
              to="/progress"
              className={({ isActive }) =>
                `top-nav-box ${isActive ? 'top-nav-box-active' : ''}`
              }
            >
              Progress
            </NavLink>

            {/* Admin (Only if Admin Role) */}
            {user?.role === 'admin' && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `top-nav-box ${isActive ? 'top-nav-box-active' : ''} text-amber-600 dark:text-amber-400/80`
                }
              >
                <ShieldCheck size={13} className="text-amber-500 dark:text-amber-400" />
                <span>Admin</span>
              </NavLink>
            )}
          </nav>
        </div>

        {/* Right Side: Search, Theme, Settings & Accounts */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search */}
          <button
            type="button"
            onClick={openCommandPalette}
            className="top-nav-icon-btn hidden sm:inline-flex"
            aria-label="Search problems and commands (Ctrl+K)"
            title="Search (Ctrl+K)"
          >
            <Search size={14} />
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="top-nav-icon-btn"
            aria-label="Toggle theme mode"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Contrast size={14} />
          </button>

          {/* Settings Button */}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `top-nav-icon-btn ${isActive ? 'top-nav-box-active' : ''}`
            }
            aria-label="Settings"
            title="Settings"
          >
            <Settings size={14} />
          </NavLink>

          {/* Account Pill Menu (when logged in) or Sign In button (when guest) */}
          {user ? (
            <AccountMenu variant="topbar" />
          ) : (
            <NavLink
              to="/login"
              state={{ backgroundLocation: location }}
              className="btn-primary h-7 px-3 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <span>Sign in</span>
            </NavLink>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="top-nav-icon-btn md:hidden"
            aria-label="Open mobile navigation menu"
          >
            <Menu size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
