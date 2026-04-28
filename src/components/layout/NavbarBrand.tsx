import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router';
import { Wrench } from 'lucide-react';

import { brandCharacters } from './navbarData';

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

export function NavbarBrand() {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/dashboard/records" className="interactive-lift-soft flex items-center rounded-md px-1 py-1">
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
            <motion.span key={`${character}-${index}`} variants={brandCharacterVariants}>
              {character}
            </motion.span>
          ))}
        </motion.div>
      </Link>
    </div>
  );
}
