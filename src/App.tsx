import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AuthenticateWithRedirectCallback } from '@clerk/react';
import Layout from './components/Layout';
import RequireAuth from './components/auth/RequireAuth';
import RequireRole from './components/auth/RequireRole';
import ExpiredSessionModal from './components/auth/ExpiredSessionModal';
import NetworkErrorBanner from './components/NetworkErrorBanner';
import Dashboard from './pages/Dashboard';
import Problems from './pages/Problems';
import Workspace from './pages/Workspace';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import Settings from './pages/Settings';
import DailyChallenges from './pages/DailyChallenges';
import Progress from './pages/Progress';
import LearningPaths from './pages/LearningPaths';
import Profile from './pages/Profile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import MasteryHub from './pages/MasteryHub';
import MasteryStudio from './pages/MasteryStudio';
import YearPlanner from './pages/YearPlanner';
import Projects from './pages/Projects';
import StandaloneEditor from './pages/StandaloneEditor';

const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'];

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));
}

function AuthModalOverlay({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  const isRegister = pathname.startsWith('/register');
  const isForgotPassword = pathname === '/forgot-password';
  const isResetPassword = pathname === '/reset-password';
  const isVerifyEmail = pathname === '/verify-email';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={isRegister ? 'Register Account' : 'Sign in'}
    >
      {/* Softening backdrop overlay that diffuses the background */}
      <div
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Centered Authentic Frosted Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-[440px] my-auto">
        {isForgotPassword ? (
          <ForgotPassword isModal onClose={onClose} />
        ) : isResetPassword ? (
          <ResetPassword isModal onClose={onClose} />
        ) : isVerifyEmail ? (
          <VerifyEmail isModal onClose={onClose} />
        ) : (
          <Auth mode={isRegister ? 'register' : 'login'} isModal onClose={onClose} />
        )}
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    backgroundLocation?: { pathname: string; search?: string; hash?: string };
    from?: { pathname: string; search?: string };
  } | null;

  const isAuth = isAuthRoute(location.pathname);

  // Background location preserves the underlying page (overview, leaderboard, settings, etc.)
  // When visiting /login directly, defaults to /dashboard so the Overview page is rendered behind the modal
  const backgroundLocation = isAuth
    ? state?.backgroundLocation || { pathname: '/dashboard', search: '', hash: '' }
    : undefined;

  const routesLocation = backgroundLocation || location;

  const handleCloseAuth = () => {
    const returnTarget = state?.backgroundLocation
      ? `${state.backgroundLocation.pathname}${state.backgroundLocation.search || ''}`
      : '/dashboard';
    navigate(returnTarget, { replace: true });
  };

  useEffect(() => {
    const cleanInjected = () => {
      const selectors = [
        '[id*="scroll-to-top" i]',
        '[id*="scrollToTop" i]',
        '[class*="scroll-to-top" i]',
        '[class*="scrollToTop" i]',
        '[id*="sttb" i]',
        '[class*="sttb" i]',
        '[id*="prsttb" i]',
        '[class*="prsttb" i]',
        '#scrollUp',
        '.scrollUp',
        '#back-to-top',
        '.back-to-top',
        '#top-and-bottom-scroll-buttons',
        '.top-and-bottom-scroll-buttons',
      ];
      try {
        const found = document.querySelectorAll(selectors.join(','));
        found.forEach((el) => {
          (el as HTMLElement).style.setProperty('display', 'none', 'important');
        });
      } catch (_) {}
    };

    cleanInjected();
    const observer = new MutationObserver(cleanInjected);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <NetworkErrorBanner />
      <ExpiredSessionModal />
      <Routes location={routesLocation}>
        {/* Public Authentication Callbacks */}
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInForceRedirectUrl="/dashboard"
              signUpForceRedirectUrl="/dashboard"
              signInUrl="/login"
              signUpUrl="/register"
            />
          }
        />
        <Route
          path="/login/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInForceRedirectUrl="/dashboard"
              signUpForceRedirectUrl="/dashboard"
              signInUrl="/login"
              signUpUrl="/register"
            />
          }
        />
        {/* Public Legal Pages (Accessible without authentication) */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* Main Application Shell */}
        <Route element={<Layout />}>
          {/* Public Overview & Navigation Routes (Accessible without login) */}
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<Settings />} />

          {/* Protected Application Routes (Requires login; intercepts and redirects to login) */}
          <Route element={<RequireAuth />}>
            <Route path="/mastery" element={<MasteryHub />} />
            <Route path="/mastery/:slug" element={<MasteryStudio />} />
            <Route path="/daily-challenges" element={<DailyChallenges />} />
            <Route path="/learning-paths" element={<LearningPaths />} />
            <Route path="/learning-paths/:pathId" element={<LearningPaths />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/editor" element={<StandaloneEditor />} />
            <Route path="/year" element={<YearPlanner />} />
            <Route path="/workspace/:problemId" element={<Workspace />} />

            {/* Role-Protected Admin Route */}
            <Route element={<RequireRole role="admin" />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback navigation */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {/* Floating Centered Glassmorphism Auth Modal Overlay */}
      {isAuth && (
        <AuthModalOverlay
          pathname={location.pathname}
          onClose={handleCloseAuth}
        />
      )}
    </>
  );
}
