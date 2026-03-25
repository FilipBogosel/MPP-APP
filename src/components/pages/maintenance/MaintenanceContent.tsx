import { Link, useNavigate } from 'react-router';
import { Wrench } from 'lucide-react';
import type { MaintenanceListItem } from '@/types';
import { cls } from '@/styles/classes';
import { DateLabel, MileageLabel, ServiceIcon, ServiceImpactBadge } from './MaintenanceBadges';
import { formatServiceDate } from './maintenanceUtils';

type Props = {
  data: ReadonlyArray<MaintenanceListItem>;
  viewMode: 'table' | 'card';
};

export function MaintenanceContent({ data, viewMode }: Props) {
  const navigate = useNavigate();

  if (viewMode === 'card') {
    return (
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((service) => (
          <Link
            to={`/service/${service.id}`}
            key={service.id}
            className={`${cls.cardPadded} flex h-full flex-col transition-shadow hover:shadow-md`}
          >
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
        ))}
      </div>
    );
  }

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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((service) => (
              <tr
                key={service.id}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
