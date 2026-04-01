import { ArrowRight, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { cls } from '@/styles/classes';

const landingHighlights = [
  'Log inspections, repairs, and scheduled services.',
  'View historical trends for cost and maintenance frequency.',
  'Forecast lifecycle stages for proactive maintenance planning.',
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={`${cls.page} flex items-center`}>
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          className="panel-enter overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg"
          initial={{ opacity: 0, y: 22, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </motion.span>
              </motion.button>
            </div>

            <motion.aside
              className="interactive-lift rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 sm:p-8"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.36, delay: 0.18, ease: 'easeOut' }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-700">What this app covers</h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                {landingHighlights.map((highlight, index) => (
                  <motion.li
                    key={highlight}
                    className="interactive-lift-soft rounded-lg bg-white px-4 py-3 shadow-sm"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.24, delay: 0.24 + index * 0.07, ease: 'easeOut' }}
                  >
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
