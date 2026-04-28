import { BarChart3, Columns2, Database, TrendingUp, User, Wrench } from 'lucide-react';

export const brandCharacters = 'MaintenanceRecord'.split('');

export const navItems = [
  { to: '/dashboard/records', label: 'Maintenance Records', icon: Wrench },
  { to: '/dashboard/overview', label: 'Overview', icon: Columns2 },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/lifecycle-forecaster', label: 'Forecaster', icon: TrendingUp },
  { to: '/import', label: 'Import Data', icon: Database },
  { to: '/register', label: 'Settings', icon: User },
];
