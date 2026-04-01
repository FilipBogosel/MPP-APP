import { motion } from 'framer-motion';
import { DashboardOverviewAnalyticsPanel } from './DashboardOverviewAnalyticsPanel';
import { MaintenancePage } from './maintenance/MaintenancePage';

export function DashboardSplitPage() {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-[#f4f6f8]">
      <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-2">
        <motion.section
          className="panel-enter min-h-0 overflow-y-auto border-b border-gray-200 lg:border-b-0 lg:border-r"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.34, ease: 'easeOut' }}
        >
          <MaintenancePage forceTableView />
        </motion.section>

        <motion.section
          className="panel-enter min-h-0 overflow-y-auto px-4 py-10 sm:px-6 lg:px-8"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.36, delay: 0.06, ease: 'easeOut' }}
        >
          <DashboardOverviewAnalyticsPanel />
        </motion.section>
      </div>
    </div>
  );
}