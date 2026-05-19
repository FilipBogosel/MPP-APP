import { Navigate, Outlet } from 'react-router';
import { getStoredUser } from '@/api/services/authApi';
import { MaintenanceProvider } from '@/context/MaintenanceRecordsContext';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { useIdleTimer } from '@/hooks/useIdleTimer';

export function ProtectedRoute() {
  const user = getStoredUser();
  useIdleTimer();

  if (!user) return <Navigate to="/login" replace />;

  // Mount MaintenanceProvider HERE (not in App.tsx) so it is fresh on every
  // login.  If it lived in App.tsx it would mount once on page load (before the
  // token exists), run useMaintenanceData's effect with no token, exit early,
  // and never re-run — React Router navigation does not remount App providers.
  return (
    <MaintenanceProvider>
      <Outlet />
      <ChatPanel />
    </MaintenanceProvider>
  );
}
