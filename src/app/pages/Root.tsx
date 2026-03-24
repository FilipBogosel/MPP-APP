import { Outlet, Link, useLocation } from 'react-router';
import { Wrench, User, Menu, BarChart3, TrendingUp, Database } from 'lucide-react';
import { useState } from 'react';

export function Root() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col font-sans">
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="ml-2 text-xl font-bold text-[#0056d2] tracking-tight">
                  <span className="flex items-center">
                    Ma<Wrench className="h-5 w-5 inline mx-[1px]" />ntenanceRecord
                  </span>
                </span>
              </div>
              <div className="hidden sm:-my-px sm:ml-10 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    location.pathname === '/'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  Maintenance Records
                </Link>
                <Link
                  to="/analytics"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    location.pathname === '/analytics'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Link>
                <Link
                  to="/lifecycle-forecaster"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    location.pathname === '/lifecycle-forecaster'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Forecaster
                </Link>
                <Link
                  to="/import"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    location.pathname === '/import'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Database className="w-4 h-4 mr-2" />
                  Import Data
                </Link>
                <Link
                  to="/register"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    location.pathname === '/register'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 bg-white">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  location.pathname === '/'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <Wrench className="w-5 h-5 mr-3" />
                  Maintenance Records
                </div>
              </Link>
              <Link
                to="/analytics"
                onClick={() => setMobileMenuOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  location.pathname === '/analytics'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Analytics
                </div>
              </Link>
              <Link
                to="/lifecycle-forecaster"
                onClick={() => setMobileMenuOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  location.pathname === '/lifecycle-forecaster'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-3" />
                  Forecaster
                </div>
              </Link>
              <Link
                to="/import"
                onClick={() => setMobileMenuOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  location.pathname === '/import'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <Database className="w-5 h-5 mr-3" />
                  Import Data
                </div>
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  location.pathname === '/register'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-3" />
                  Settings
                </div>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main content area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
