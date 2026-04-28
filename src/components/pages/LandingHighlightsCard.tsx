import { motion } from 'framer-motion';

const landingHighlights = [
  'Log inspections, repairs, and scheduled services.',
  'View historical trends for cost and maintenance frequency.',
  'Forecast lifecycle stages for proactive maintenance planning.',
];

export function LandingHighlightsCard() {
  return (
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
  );
}
