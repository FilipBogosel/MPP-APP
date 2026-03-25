import { Calendar, Gauge, Wrench } from 'lucide-react';
import { cls } from '@/styles/classes';
import { formatServiceDate } from './maintenanceUtils';

export function ServiceImpactBadge({ cost }: { cost: number }) {
  if (cost >= 1000) {
    return (
      <span className="inline-flex items-center rounded-full border border-red-200 bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-800">
        Major Overhaul
      </span>
    );
  }

  if (cost >= 200) {
    return (
      <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
        Significant Repair
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
      Routine Upkeep
    </span>
  );
}

export function ServiceIcon() {
  return (
    <div className={`${cls.iconBox} h-10 w-10`}>
      <Wrench className="h-5 w-5" />
    </div>
  );
}

export function DateLabel({ date }: { date: string }) {
  return (
    <div className="flex items-center text-sm text-gray-600">
      <Calendar className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
      {formatServiceDate(date)}
    </div>
  );
}

export function MileageLabel({ mileage }: { mileage: string }) {
  return (
    <div className="flex items-center text-sm font-medium text-gray-900">
      <Gauge className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
      {mileage} km
    </div>
  );
}
