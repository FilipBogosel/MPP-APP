import { Navigate, Outlet } from 'react-router';
import { getStoredUser } from '@/api/services/authApi';
import { MaintenanceProvider } from '@/context/MaintenanceRecordsContext';
import { ChatPanel } from '@/components/chat/ChatPanel';

export function AdminRoute() {
  const user = getStoredUser();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'ADMIN') return <Navigate to="/" replace />;

  return (
    <MaintenanceProvider>
      <Outlet />
      <ChatPanel />
    </MaintenanceProvider>
  );
}
