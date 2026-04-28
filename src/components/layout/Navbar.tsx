import { useState } from 'react';
import { useLocation } from 'react-router';
import { Menu } from 'lucide-react';

import { NavbarBrand } from './NavbarBrand';
import { NavbarDesktopLinks } from './NavbarDesktopLinks';
import { NavbarMobileMenu } from './NavbarMobileMenu';

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to: string) => location.pathname === to;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <NavbarBrand />
            <NavbarDesktopLinks isActive={isActive} />
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
      <NavbarMobileMenu isActive={isActive} isOpen={mobileOpen} onNavigate={() => setMobileOpen(false)} />
    </nav>
  );
}