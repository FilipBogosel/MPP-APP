import { ArrowRight, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

import { cls } from '@/styles/classes';

export function LandingHeroContent() {
  const navigate = useNavigate();

  return (
    <div>
      <motion.span
        className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700"
        whileHover={{ rotate: -8, scale: 1.08 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <Wrench className="h-7 w-7" aria-hidden />
      </motion.span>

      <motion.h1
        className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
      >
        MaintenanceRecord
      </motion.h1>
      <motion.p
        className="mt-3 text-lg font-medium text-indigo-700"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.14, ease: 'easeOut' }}
      >
        Vehicle care records and lifecycle forecasting in one workspace.
      </motion.p>
      <motion.p
        className="mt-5 max-w-2xl text-base leading-7 text-gray-600"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.2, ease: 'easeOut' }}
      >
        MaintenanceRecord helps drivers and fleet teams track every maintenance event, monitor service history,
        and forecast vehicle lifecycle milestones so repairs can be planned before failures happen.
      </motion.p>

      <motion.button
        type="button"
        onClick={() => navigate('/dashboard/records')}
        className={`${cls.btnPrimary} interactive-press mt-8 gap-2 px-6 py-3 text-base`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.24, delay: 0.28, ease: 'easeOut' }}
      >
        Go to Dashboard
        <motion.span initial={{ x: 0 }} whileHover={{ x: 3 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </motion.span>
      </motion.button>
    </div>
  );
}
