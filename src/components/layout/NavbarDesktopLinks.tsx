import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router';

import { getStoredUser } from '@/api/services/authApi';
import { cls } from '@/styles/classes';

import { navItems } from './navbarData';

type NavbarDesktopLinksProps = {
  isActive: (path: string) => boolean;
};

export function NavbarDesktopLinks({ isActive }: NavbarDesktopLinksProps) {
  const user = getStoredUser();
  const isAdmin = user?.role === 'ADMIN';

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
      {isAdmin && (
        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.18, ease: 'easeOut' }}>
          <Link to="/admin" className={isActive('/admin') ? cls.navLinkActive : cls.navLinkInactive}>
            <ShieldAlert className="w-4 h-4 mr-2" />
            Admin
          </Link>
        </motion.div>
      )}
    </div>
  );
}
