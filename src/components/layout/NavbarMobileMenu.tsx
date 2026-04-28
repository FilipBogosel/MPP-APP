import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router';

import { cls } from '@/styles/classes';

import { navItems } from './navbarData';

type NavbarMobileMenuProps = {
  isActive: (path: string) => boolean;
  isOpen: boolean;
  onNavigate: () => void;
};

export function NavbarMobileMenu({ isActive, isOpen, onNavigate }: NavbarMobileMenuProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
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
                  onClick={onNavigate}
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
  );
}
