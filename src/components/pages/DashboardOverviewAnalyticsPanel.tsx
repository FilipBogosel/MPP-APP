import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';
import { useOverviewAutoRecords } from '@/hooks/useOverviewAutoRecords';
import { cls } from '@/styles/classes';
import { AnalyticsCharts } from './analytics/AnalyticsCharts';

export function DashboardOverviewAnalyticsPanel() {
  const { records: contextRecords, addRecord } = useMaintenanceContext();
  const { generatedCount, intervalMs, isRunning, records, start, stop } = useOverviewAutoRecords({
    baseRecords: contextRecords,
    onAddRecord: addRecord,
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-gray-600">
          Compare maintenance records and analytics side by side.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={start}
            disabled={isRunning}
            className={isRunning ? cls.btnDisabled : cls.btnPrimary}
          >
            Start Auto Add ({intervalMs / 1000}s)
          </button>

          <button
            type="button"
            onClick={stop}
            disabled={!isRunning}
            className={isRunning ? cls.btnDanger : cls.btnDisabled}
          >
            Stop
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-600 sm:mt-0">
          Status: <span className={isRunning ? 'font-semibold text-emerald-600' : 'font-semibold text-gray-700'}>{isRunning ? 'Running' : 'Stopped'}</span>
          {' '}• Added records: <span className="font-semibold text-gray-900">{generatedCount}</span>
        </p>
      </div>

      <AnalyticsCharts recordsOverride={records} />
    </div>
  );
}