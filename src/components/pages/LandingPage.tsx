import { motion } from 'framer-motion';

import { cls } from '@/styles/classes';

import { LandingHeroContent } from './LandingHeroContent';
import { LandingHighlightsCard } from './LandingHighlightsCard';

export function LandingPage() {
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
            <LandingHeroContent />
            <LandingHighlightsCard />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
