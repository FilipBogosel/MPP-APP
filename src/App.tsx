import { RouterProvider } from 'react-router';
import { MaintenanceProvider } from '@/context/MaintenanceContext';
import { router } from './routes';

export default function App() {
  return (
    <MaintenanceProvider>
      <RouterProvider router={router} />
    </MaintenanceProvider>
  );
}
