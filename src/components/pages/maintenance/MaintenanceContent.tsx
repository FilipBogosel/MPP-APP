import { Link } from 'react-router';
import { Wrench } from 'lucide-react';
import type { MaintenanceListItem } from '../../../types';
import { DateLabel, MileageLabel, ServiceIcon, ServiceImpactBadge } from './maintenanceUtils';

type Props = {
  data: ReadonlyArray<MaintenanceListItem>;
  viewMode: 'table' | 'card';
};

export function MaintenanceContent({ data, viewMode }: Props) {
  if (viewMode === 'card') {
    return (
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((service) => (
          <Link
            to={`/service/${service.id}`}
            key={service.id}
            className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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
                <span className="font-medium text-gray-900">{new Date(service.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
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
    <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Service</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Mileage</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Next Recommended</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((service) => (
              <tr key={service.id} className="cursor-pointer transition-colors hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <Link to={`/service/${service.id}`} className="flex items-center">
                    <ServiceIcon />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    </div>
                  </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <DateLabel date={service.date} />
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <MileageLabel mileage={service.mileage} />
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                    {service.nextMileage} km
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
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
