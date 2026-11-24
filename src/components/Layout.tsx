import { useEffect, useState, useMemo } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { useUi } from '../context/UiContext';
import { useAuth } from '../context/AuthContext';
import TopNavbar from './TopNavbar';
import AccountMenu from './AccountMenu';
import CommandPalette from './CommandPalette';
import Footer from './Footer';
import { PrismMark } from './PrismLogo';
import SmoothScrollProvider from './SmoothScrollProvider';
import {
  getStoredActiveRound,
  saveStoredActiveRound,
  saveInterviewHistoryItem,
} from '../lib/interview/progress';
import { computeInterviewScorecard } from '../lib/interview/scoring';
import { ActiveInterviewRound } from '../types/interview';

const baseMobileItems = [
  ['/dashboard', 'Overview'],
  ['/mastery', 'Pattern Mastery'],
  ['/daily-challenges', 'Daily challenges'],
  ['/learning-paths', 'Learning paths'],
  ['/year', 'Year Planner'],
  ['/progress', 'Your progress'],
  ['/problems', 'Problems'],
  ['/review', 'Code Review'],
  ['/projects', 'Projects (Coming Soon)'],
  ['/editor', 'Code editor'],
  ['/leaderboard', 'Leaderboard'],
  ['/settings', 'Settings'],
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { announcement } = useUi();
  const { user } = useAuth();
  const isWorkspace = location.pathname.startsWith('/workspace');
  const isYearPlanner = location.pathname.startsWith('/year');
  const isEditor = location.pathname.startsWith('/editor');
  const isInterviewStudio = location.pathname.startsWith('/interview/') && location.pathname !== '/interview';
  const isInterviewHub = location.pathname === '/interview';
  const isFullWidthPage = isYearPlanner || isInterviewHub || isInterviewStudio;
  const isWorkspaceLike = isWorkspace || isEditor || isInterviewStudio;

  const isAuthRoute = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'].some(
    (p) => location.pathname === p || location.pathname.startsWith(p + '/')
  );

  const currentRouteKey = isAuthRoute
    ? (location.state as { backgroundLocation?: { pathname: string } })?.backgroundLocation?.pathname || '/dashboard'
    : location.pathname;

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

  useEffect(() => {
    if (!isWorkspace && !isEditor && !isAuthRoute) {
      gsap.fromTo(
        '.page-enter',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }, [location.pathname, isWorkspace, isEditor, isAuthRoute]);

  // Proctored mock interview lockdown: If candidate navigates anywhere away from the interview studio, auto-submit immediately
  useEffect(() => {
    if (!isInterviewStudio) {
      const active = getStoredActiveRound();
      if (active && !active.isCompleted) {
        const finished: ActiveInterviewRound = {
          ...active,
          isCompleted: true,
          submittedAt: Date.now(),
          autoSubmitReason: 'Auto-submitted: Exited proctored interview room',
        };
        const scorecard = computeInterviewScorecard(finished);
        saveInterviewHistoryItem(scorecard);
        saveStoredActiveRound(null);
      }
    }
  }, [isInterviewStudio, location.pathname]);

  return (
    <SmoothScrollProvider>
      <div className={`app-shell ${isWorkspaceLike ? 'app-shell-workspace' : ''} flex min-h-screen flex-col`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Minimal Top Navigation Bar (Hidden during proctored mock interview to prevent internal navigation) */}
        {!isInterviewStudio && <TopNavbar onOpenMobileMenu={() => setMenuOpen(true)} />}

        {/* Mobile Navigation Drawer */}
        {menuOpen && !isInterviewStudio && (
          <div
            className="fixed inset-0 z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation overlay"
            />
            <div className="mobile-drawer relative flex h-full w-[290px] flex-col justify-between shadow-2xl">
              <div className="overflow-y-auto px-5 py-6">
                <button
                  type="button"
                  className="absolute right-3 top-4 z-10 rounded-lg p-2 text-muted hover:bg-white/5"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
                <div className="mb-7 flex items-center gap-2.5 font-display text-lg font-bold text-primary">
                  <PrismMark size={28} />
                  <span>PrismCode</span>
                </div>
                <nav aria-label="Mobile primary navigation" className="space-y-1">
                  {mobileItems.map(([to, label]) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMenuOpen(false)}
                      className={() =>
                        `block rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                          location.pathname === to
                            ? 'nav-link-active'
                            : 'text-muted hover:bg-white/5 hover:text-white'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  ))}
                </nav>
              </div>
              <div className="border-t p-4" style={{ borderColor: 'var(--ca-border)' }}>
                <div className="mb-3 flex items-center justify-between text-[11px] text-muted px-1">
                  <NavLink
                    to="/terms"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-primary transition"
                  >
                    Terms
                  </NavLink>
                  <span>&middot;</span>
                  <NavLink
                    to="/privacy"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-primary transition"
                  >
                    Privacy
                  </NavLink>
                </div>
                <AccountMenu variant="mobile" onAction={() => setMenuOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className={`flex flex-1 flex-col ${isWorkspaceLike ? 'workspace-app-main' : ''}`}>
          <main
            id="main-content"
            tabIndex={-1}
            className={
              isWorkspaceLike
                ? `${isInterviewStudio ? 'h-screen' : 'h-[calc(100vh-52px)]'} workspace-route-main w-full overflow-hidden p-0 m-0`
                : isFullWidthPage
                ? 'w-full max-w-none flex-1 px-4 sm:px-6 lg:px-8 pb-12 pt-4'
                : 'mx-auto w-full max-w-[1560px] flex-1 px-4 pb-12 pt-5 sm:px-6 lg:px-8'
            }
          >
            {isWorkspaceLike ? (
              <Outlet />
            ) : (
              <div key={currentRouteKey} className="page-enter w-full">
                <Outlet />
              </div>
            )}
          </main>
          {!isWorkspaceLike && <Footer />}
        </div>

        {/* Command Palette (Disabled during proctored mock interview to prevent switching) */}
        {!isInterviewStudio && <CommandPalette />}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>
      </div>
    </SmoothScrollProvider>
  );
}
