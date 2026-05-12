import { useState } from 'react';
import { API_URL, getAuthHeaders } from '@/api/services/apiClient';
import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';
import { cls } from '@/styles/classes';
import { AnalyticsCharts } from './analytics/AnalyticsCharts';

export function DashboardOverviewAnalyticsPanel() {
  const { records } = useMaintenanceContext();
  const [isRunning, setIsRunning] = useState(false);

  const start = async () => {
    await fetch(`${API_URL}/records/faker/start`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    setIsRunning(true);
  };

  const stop = async () => {
    await fetch(`${API_URL}/records/faker/stop`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    setIsRunning(false);
  };

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
            Start Auto Add
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
          Status:{' '}
          <span className={isRunning ? 'font-semibold text-emerald-600' : 'font-semibold text-gray-700'}>
            {isRunning ? 'Running' : 'Stopped'}
          </span>
        </p>
      </div>

      <AnalyticsCharts recordsOverride={records} />
    </div>
  );
}
