import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { BarChart3, Database, Menu, TrendingUp, User, Wrench } from 'lucide-react';
import { cls } from '@/styles/classes';

const navItems = [
  { to: '/dashboard/records', label: 'Maintenance Records', icon: Wrench },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/lifecycle-forecaster', label: 'Forecaster', icon: TrendingUp },
  { to: '/import', label: 'Import Data', icon: Database },
  { to: '/register', label: 'Settings', icon: User },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to: string) => location.pathname === to;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="ml-2 text-xl font-bold text-indigo-700 tracking-tight">
                <span className="flex items-center">
                  Ma<Wrench className="h-5 w-5 inline mx-[1px]" />ntenanceRecord
                </span>
              </span>
            </div>
            <div className="hidden sm:-my-px sm:ml-10 sm:flex sm:space-x-8">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={isActive(to) ? cls.navLinkActive : cls.navLinkInactive}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <div className="pt-2 pb-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={isActive(to) ? cls.mobileNavLinkActive : cls.mobileNavLinkInactive}
            >
              <div className="flex items-center">
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </div>
            </Link>
          ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}