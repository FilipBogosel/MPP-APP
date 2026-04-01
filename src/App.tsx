import { RouterProvider } from 'react-router';
import { MaintenanceProvider } from '@/context/MaintenanceRecordsContext';
import { router } from './routes';

export default function App() {
  return (
    <MaintenanceProvider>
      <RouterProvider router={router} />
    </MaintenanceProvider>
  );
}
