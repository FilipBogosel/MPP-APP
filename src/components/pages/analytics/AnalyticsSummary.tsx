import { Activity, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { formatServiceType } from '@/components/pages/maintenance/maintenanceUtils';
import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';

import { AnalyticsSummaryStatCard } from './AnalyticsSummaryStatCard';
import { getAnalyticsSummaryStats } from './analyticsSummaryStats';

export function AnalyticsSummary() {
  const { records } = useMaintenanceContext();

  const { avgCost, maxRecord, totalCost } = useMemo(() => getAnalyticsSummaryStats(records), [records]);

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, ease: 'easeOut' }}
      >
        <AnalyticsSummaryStatCard
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
        <AnalyticsSummaryStatCard
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
        <AnalyticsSummaryStatCard
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
