import { Navigate, Route, Routes } from 'react-router-dom';
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

export default function App() {
  return (
    <>
      <NetworkErrorBanner />
      <ExpiredSessionModal />
      <Routes>
        {/* Public Authentication Pages */}
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
        <Route path="/login/*" element={<Auth mode="login" />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register/*" element={<Auth mode="register" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Public Legal Pages (Accessible without authentication) */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* Protected Routes (Requires active session) */}
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/daily-challenges" element={<DailyChallenges />} />
            <Route path="/learning-paths" element={<LearningPaths />} />
            <Route path="/learning-paths/:pathId" element={<LearningPaths />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/workspace/:problemId" element={<Workspace />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/settings" element={<Settings />} />

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
    </>
  );
}
