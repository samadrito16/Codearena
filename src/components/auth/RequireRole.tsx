import { Navigate, Outlet } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface RequireRoleProps {
  role: UserRole;
}

export default function RequireRole({ role }: RequireRoleProps) {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return (
      <div className="mx-auto max-w-xl py-16 px-4 text-center">
        <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 text-amber-500 mb-5">
          <ShieldAlert size={36} />
        </div>
        <h2 className="text-2xl font-bold font-display text-primary mb-2">
          Administrator Access Required
        </h2>
        <p className="text-sm text-muted mb-6 leading-relaxed">
          The requested administrative view is restricted to accounts with the <code className="px-1.5 py-0.5 rounded bg-muted/20 font-mono text-xs">{role}</code> role.
          Your current account is signed in as <span className="font-semibold text-primary">{user?.email}</span> ({user?.role}).
        </p>
        <a
          href="/dashboard"
          className="button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition"
        >
          Return to Dashboard
        </a>
      </div>
    );
  }

  return <Outlet />;
}
