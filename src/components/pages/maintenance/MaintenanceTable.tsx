import { AnimatePresence, motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { cls } from '@/styles/classes';
import type { MaintenanceListItem } from '@/types';
import { DateLabel, MileageLabel, ServiceIcon, ServiceImpactBadge } from './MaintenanceBadges';

type MaintenanceTableProps = {
  data: ReadonlyArray<MaintenanceListItem>;
  onDelete?: (id: string) => void;
};

export function MaintenanceTable({ data, onDelete }: MaintenanceTableProps) {
  const navigate = useNavigate();

  return (
    <div className={`mb-6 overflow-hidden ${cls.card}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className={cls.th}>Service</th>
              <th className={cls.th}>Date</th>
              <th className={cls.th}>Mileage</th>
              <th className={cls.th}>Next Recommended</th>
              <th className={cls.th}>Impact</th>
              <th className={`${cls.th} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <AnimatePresence initial={false}>
              {data.map((service) => (
                <motion.tr
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                  onClick={() => navigate(`/service/${service.id}`)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      navigate(`/service/${service.id}`);
                    }
                  }}
                  tabIndex={0}
                  role="link"
                >
                  <td className={cls.td}>
                    <div className="flex items-center">
                      <ServiceIcon />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className={cls.td}>
                    <DateLabel date={service.date} />
                  </td>
                  <td className={cls.td}>
                    <MileageLabel mileage={service.mileage} />
                  </td>
                  <td className={cls.td}>
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                      {service.nextMileage} km
                    </div>
                  </td>
                  <td className={cls.td}>
                    <ServiceImpactBadge cost={service.cost} />
                  </td>
                  <td className={`${cls.td} text-right`}>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete?.(service.id);
                      }}
                      onKeyDown={(event) => {
                        event.stopPropagation();
                      }}
                      className="interactive-lift-soft inline-flex items-center gap-1.5 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-50"
                      aria-label={`Delete ${service.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
