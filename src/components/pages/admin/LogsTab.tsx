import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cls } from '@/styles/classes';
import type { ActionLogEntry } from '@/api/services/adminApi';
import { LogsTable } from './LogsTable';

type Props = {
  loading: boolean;
  logs: ActionLogEntry[];
  logUserFilter: string;
  setLogUserFilter: (v: string) => void;
  logPage: number;
  hasNextPage: boolean;
  isFiltered: boolean;
  onFilter: (e: React.FormEvent) => void;
  onClear: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export function LogsTab({
  loading,
  logs,
  logUserFilter,
  setLogUserFilter,
  logPage,
  hasNextPage,
  isFiltered,
  onFilter,
  onClear,
  onPrevPage,
  onNextPage,
}: Props) {
  return (
    <div className="mt-6 space-y-4">
      <form onSubmit={onFilter} className="flex gap-2">
        <input
          type="text"
          value={logUserFilter}
          onChange={(e) => setLogUserFilter(e.target.value)}
          placeholder="Filter by User ID…"
          className="block w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button type="submit" className={cls.btnPrimary}>Search</button>
        {logUserFilter && (
          <button type="button" onClick={onClear} className={cls.btnOutline}>Clear</button>
        )}
      </form>

      <div className={`${cls.card} overflow-hidden`}>
        <LogsTable loading={loading} logs={logs} />
      </div>

      {!isFiltered && logs.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {logPage + 1} · showing {logs.length} entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={onPrevPage}
              disabled={logPage === 0 || loading}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button
              onClick={onNextPage}
              disabled={!hasNextPage || loading}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
