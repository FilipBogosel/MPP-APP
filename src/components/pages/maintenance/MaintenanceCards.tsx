import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router';
import { Wrench } from 'lucide-react';

import { cls } from '@/styles/classes';
import type { MaintenanceListItem } from '@/types';

import { ServiceImpactBadge } from './MaintenanceBadges';
import { formatServiceDate } from './maintenanceUtils';

type MaintenanceCardsProps = {
  data: ReadonlyArray<MaintenanceListItem>;
};

export function MaintenanceCards({ data }: MaintenanceCardsProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence initial={false}>
        {data.map((service) => (
          <motion.div
            key={service.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            whileHover={{ y: -6, scale: 1.01, boxShadow: '0 22px 34px -24px rgba(15, 23, 42, 0.6)' }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="h-full"
          >
            <Link to={`/service/${service.id}`} className={`${cls.cardPadded} flex h-full flex-col transition-shadow`}>
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Wrench className="h-6 w-6" />
                </div>
                <ServiceImpactBadge cost={service.cost} />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900">{service.name}</h3>

              <div className="mt-auto flex-grow space-y-3 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">{formatServiceDate(service.date)}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Mileage</span>
                  <span className="font-medium text-gray-900">{service.mileage} km</span>
                </div>

                <div className="flex items-center justify-between pt-2 text-sm">
                  <span className="font-medium text-gray-500">Total Cost</span>
                  <span className="text-base font-bold text-gray-900">${service.cost}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
