import { ShieldAlert, ScrollText } from 'lucide-react';
import { cls } from '@/styles/classes';
import { useAdminPage, type Tab } from './useAdminPage';
import { ObservationsTab } from './ObservationsTab';
import { LogsTab } from './LogsTab';

const TABS: { id: Tab; label: string; icon: typeof ShieldAlert }[] = [
  { id: 'flagged', label: 'Flagged Users', icon: ShieldAlert },
  { id: 'logs', label: 'Action Log', icon: ScrollText },
];

export function AdminPage() {
  const {
    tab,
    setTab,
    observations,
    logs,
    logUserFilter,
    setLogUserFilter,
    logPage,
    hasNextPage,
    loading,
    error,
    loadLogs,
    handleResolve,
    handleLogFilter,
    isFiltered,
  } = useAdminPage();

  return (
    <div className={cls.page}>
      <div className={cls.pageShell}>
        <h1 className={cls.pageTitle}>Admin Panel</h1>
        <p className={cls.pageSubtitle}>Monitor users and audit system activity.</p>

        <div className="mt-6 flex space-x-1 border-b border-gray-200">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === id
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-indigo-600 hover:border-indigo-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {tab === 'flagged' && (
          <ObservationsTab
            loading={loading}
            observations={observations}
            onResolve={handleResolve}
          />
        )}

        {tab === 'logs' && (
          <LogsTab
            loading={loading}
            logs={logs}
            logUserFilter={logUserFilter}
            setLogUserFilter={setLogUserFilter}
            logPage={logPage}
            hasNextPage={hasNextPage}
            isFiltered={isFiltered}
            onFilter={handleLogFilter}
            onClear={() => { setLogUserFilter(''); loadLogs(); }}
            onPrevPage={() => loadLogs(undefined, logPage - 1)}
            onNextPage={() => loadLogs(undefined, logPage + 1)}
          />
        )}
      </div>
    </div>
  );
}
