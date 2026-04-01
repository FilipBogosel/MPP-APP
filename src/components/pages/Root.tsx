import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router';
import { Navbar } from '../layout/Navbar';

export function Root() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f8] font-sans">
      <Navbar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            className="flex flex-1 flex-col"
            initial={{ opacity: 0, y: 18, scale: 0.992 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.996 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
