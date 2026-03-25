import { Activity, DollarSign, TrendingUp } from 'lucide-react';
import type { ComponentType } from 'react';
import { mockMaintenanceRecords } from '@/api/mockData';
import { formatServiceType } from '@/components/pages/maintenance/maintenanceUtils';
import { cls } from '@/styles/classes';

type StatCardProps = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
  accent?: 'indigo' | 'red';
};

function StatCard({ icon: Icon, label, value, sub, accent = 'indigo' }: StatCardProps) {
  const iconBox = accent === 'red'
    ? 'mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600'
    : `mr-4 ${cls.iconBox}`;
  return (
    <div className="flex items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className={iconBox}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="mb-1 text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}

export function AnalyticsSummary() {
  const totalCost = mockMaintenanceRecords.reduce(
    (sum, r) => sum + r.costUsd, 0,
  );
  const avgCost = totalCost / mockMaintenanceRecords.length;
  const maxRecord = mockMaintenanceRecords.reduce(
    (max, r) => r.costUsd > max.costUsd ? r : max,
  );

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatCard
        icon={DollarSign}
        label="Total Lifetime Cost"
        value={`$${totalCost.toFixed(2)}`}
      />
      <StatCard
        icon={Activity}
        label="Average Cost Per Service"
        value={`$${avgCost.toFixed(2)}`}
      />
      <StatCard
        icon={TrendingUp}
        label="Most Expensive Service"
        value={`$${maxRecord.costUsd.toFixed(2)}`}
        sub={formatServiceType(maxRecord.serviceType)}
        accent="red"
      />
    </div>
  );
}
