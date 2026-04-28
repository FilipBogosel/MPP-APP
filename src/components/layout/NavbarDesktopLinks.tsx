import { motion } from 'framer-motion';
import { Link } from 'react-router';

import { cls } from '@/styles/classes';

import { navItems } from './navbarData';

type NavbarDesktopLinksProps = {
  isActive: (path: string) => boolean;
};

export function NavbarDesktopLinks({ isActive }: NavbarDesktopLinksProps) {
  return (
    <div className="hidden sm:ml-10 sm:flex sm:h-full sm:items-center sm:space-x-8">
      {navItems.map(({ to, label, icon: Icon }) => (
        <motion.div key={to} whileHover={{ y: -2 }} transition={{ duration: 0.18, ease: 'easeOut' }}>
          <Link to={to} className={isActive(to) ? cls.navLinkActive : cls.navLinkInactive}>
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
