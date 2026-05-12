import { createBrowserRouter, Navigate } from 'react-router';
import { AdminRoute } from './components/auth/AdminRoute';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PublicRoute } from './components/auth/PublicRoute';
import { AdminPage } from './components/pages/admin/AdminPage';
import { AddServicePage } from './components/pages/add-service/AddServicePage';
import { DashboardSplitPage } from './components/pages/DashboardSplitPage';
import { AnalyticsPage } from './components/pages/analytics/AnalyticsPage';
import { LoginPage } from './components/pages/auth/LoginPage';
import { RegisterPage } from './components/pages/auth/RegisterPage';
import { GaragePage } from './components/pages/garage/GaragePage';
import { DataImportPage } from './components/pages/import/DataImportPage';
import { LandingPage } from './components/pages/LandingPage';
import { LifecyclePage } from './components/pages/lifecycle/LifecyclePage';
import { MaintenancePage } from './components/pages/maintenance/MaintenancePage';
import { Root } from './components/pages/Root';
import { ServiceDetailPage } from './components/pages/service-detail/ServiceDetailPage';
import { SettingsPage } from './components/pages/settings/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      {
        element: <PublicRoute />,
        children: [
          { path: 'login', Component: LoginPage },
          { path: 'register', Component: RegisterPage },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard/records', Component: MaintenancePage },
          { path: 'dashboard/records/new', Component: AddServicePage },
          { path: 'dashboard/overview', Component: DashboardSplitPage },
          { path: 'dashboard/garage', Component: GaragePage },
          { path: 'dashboard/settings', Component: SettingsPage },
          { path: 'analytics', Component: AnalyticsPage },
          { path: 'lifecycle-forecaster', Component: LifecyclePage },
          { path: 'import', Component: DataImportPage },
          { path: 'add-service', Component: AddServicePage },
          { path: 'service/:id', Component: ServiceDetailPage },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          { path: 'admin', Component: AdminPage },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
