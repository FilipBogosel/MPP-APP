import { createBrowserRouter, Navigate } from 'react-router';
import { AddService } from './pages/AddService';
import { Analytics } from './pages/Analytics';
import { DataImport } from './pages/DataImport';
import { LifecycleForecaster } from './pages/LifecycleForecaster';
import { Login } from './pages/Login';
import { Maintenance } from './pages/Maintenance';
import { Register } from './pages/Register';
import { Root } from './pages/Root';
import { ServiceDetail } from './pages/ServiceDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Maintenance },
      { path: 'analytics', Component: Analytics },
      { path: 'lifecycle-forecaster', Component: LifecycleForecaster },
      { path: 'import', Component: DataImport },
      { path: 'register', Component: Register },
      { path: 'login', Component: Login },
      { path: 'add-service', Component: AddService },
      { path: 'service/:id', Component: ServiceDetail },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
