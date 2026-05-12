import { Navigate, Outlet } from 'react-router';
import { getStoredUser } from '@/api/services/authApi';
import { ChatPanel } from '@/components/chat/ChatPanel';

export function ProtectedRoute() {
  const user = getStoredUser();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <Outlet />
      <ChatPanel />
    </>
  );
}
