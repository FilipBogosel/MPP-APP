import { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import { BarChart3, Columns2, Database, Menu, TrendingUp, User, Wrench } from 'lucide-react';
import { cls } from '@/styles/classes';

const brandCharacters = 'MaintenanceRecord'.split('');

const brandTextContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const brandCharacterVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
};

const navItems = [
  { to: '/dashboard/records', label: 'Maintenance Records', icon: Wrench },
  { to: '/dashboard/overview', label: 'Overview', icon: Columns2 },
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
              <Link
                to="/dashboard/records"
                className="interactive-lift-soft flex items-center rounded-md px-1 py-1"
              >
                <motion.div
                  className="flex items-center justify-center rounded-full bg-indigo-50 p-1.5 text-indigo-700"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <Wrench className="h-5 w-5" />
                </motion.div>

                <motion.div
                  className="ml-2 flex text-xl font-bold tracking-tight text-indigo-700"
                  variants={brandTextContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {brandCharacters.map((character, index) => (
                    <motion.span
                      key={`${character}-${index}`}
                      variants={brandCharacterVariants}
                    >
                      {character}
                    </motion.span>
                  ))}
                </motion.div>
              </Link>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:h-full sm:items-center sm:space-x-8">
              {navItems.map(({ to, label, icon: Icon }) => (
                <motion.div
                  key={to}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Link
                    to={to}
                    className={isActive(to) ? cls.navLinkActive : cls.navLinkInactive}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="interactive-lift-soft inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            className="sm:hidden border-t border-gray-200 bg-white overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                >
                  <Link
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={isActive(to) ? cls.mobileNavLinkActive : cls.mobileNavLinkInactive}
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 mr-3" />
                      {label}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}