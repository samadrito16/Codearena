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
    // Preserve requested location so user can be redirected back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
