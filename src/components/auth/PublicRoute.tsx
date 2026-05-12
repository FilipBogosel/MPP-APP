import { Navigate, Outlet } from 'react-router';
import { getStoredUser } from '@/api/services/authApi';

export function PublicRoute() {
  const user = getStoredUser();

  return user ? <Navigate to="/dashboard/overview" replace /> : <Outlet />;
}
