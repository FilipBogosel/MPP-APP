import { Activity, DollarSign, TrendingUp } from 'lucide-react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { formatServiceType } from '@/components/pages/maintenance/maintenanceUtils';
import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';
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
    <div className="interactive-lift flex items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
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
  const { records } = useMaintenanceContext();

  const { avgCost, maxRecord, totalCost } = useMemo(() => {
    if (records.length === 0) {
      return {
        totalCost: 0,
        avgCost: 0,
        maxRecord: null,
      };
    }

    const calculatedTotalCost = records.reduce(
      (sum, record) => sum + record.costUsd,
      0,
    );

    const calculatedMaxRecord = records.reduce(
      (max, record) => (record.costUsd > max.costUsd ? record : max),
      records[0],
    );

    return {
      totalCost: calculatedTotalCost,
      avgCost: calculatedTotalCost / records.length,
      maxRecord: calculatedMaxRecord,
    };
  }, [records]);

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, ease: 'easeOut' }}
      >
        <StatCard
          icon={DollarSign}
          label="Total Lifetime Cost"
          value={`$${totalCost.toFixed(2)}`}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, delay: 0.06, ease: 'easeOut' }}
      >
        <StatCard
          icon={Activity}
          label="Average Cost Per Service"
          value={`$${avgCost.toFixed(2)}`}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, delay: 0.12, ease: 'easeOut' }}
      >
        <StatCard
          icon={TrendingUp}
          label="Most Expensive Service"
          value={`$${maxRecord ? maxRecord.costUsd.toFixed(2) : '0.00'}`}
          sub={maxRecord ? formatServiceType(maxRecord.serviceType) : 'No services yet'}
          accent="red"
        />
      </motion.div>
    </div>
  );
}
