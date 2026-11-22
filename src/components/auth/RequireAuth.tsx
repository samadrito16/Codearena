import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthStatusScreen from './AuthStatusScreen';

export default function RequireAuth() {
  const { user, status, authError, refreshUser } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return <AuthStatusScreen type="loading" />;
  }

  if (status === 'error') {
    return (
      <AuthStatusScreen
        type="error"
        message={authError || undefined}
        onRetry={refreshUser}
      />
    );
  }

  if (status === 'unauthenticated' || !user) {
    // Preserve requested location and provide backgroundLocation for modal overlay
    return <Navigate to="/login" state={{ from: location, backgroundLocation: { pathname: '/dashboard' } }} replace />;
  }

  return <Outlet />;
}
