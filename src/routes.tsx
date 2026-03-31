import { createBrowserRouter, Navigate } from 'react-router';
import { AddServicePage } from './components/pages/add-service/AddServicePage';
import { AnalyticsPage } from './components/pages/analytics/AnalyticsPage';
import { DataImportPage } from './components/pages/import/DataImportPage';
import { LandingPage } from './components/pages/LandingPage';
import { LifecyclePage } from './components/pages/lifecycle/LifecyclePage';
import { LoginPage } from './components/pages/auth/LoginPage';
import { MaintenancePage } from './components/pages/maintenance/MaintenancePage';
import { RegisterPage } from './components/pages/auth/RegisterPage';
import { Root } from './components/pages/Root';
import { ServiceDetailPage } from './components/pages/service-detail/ServiceDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: 'dashboard/records', Component: MaintenancePage },
      { path: 'analytics', Component: AnalyticsPage },
      { path: 'lifecycle-forecaster', Component: LifecyclePage },
      { path: 'import', Component: DataImportPage },
      { path: 'register', Component: RegisterPage },
      { path: 'login', Component: LoginPage },
      { path: 'add-service', Component: AddServicePage },
      { path: 'service/:id', Component: ServiceDetailPage },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
