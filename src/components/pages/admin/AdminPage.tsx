import { useEffect, useState } from 'react';
import { ShieldAlert, ScrollText } from 'lucide-react';
import {
  fetchObservationList,
  fetchLogs,
  resolveObservation,
  type ObservationEntry,
  type ActionLogEntry,
} from '@/api/services/adminApi';
import { cls } from '@/styles/classes';

type Tab = 'flagged' | 'logs';

export function AdminPage() {
  const [tab, setTab] = useState<Tab>('flagged');
  const [observations, setObservations] = useState<ObservationEntry[]>([]);
  const [logs, setLogs] = useState<ActionLogEntry[]>([]);
  const [logUserFilter, setLogUserFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tab === 'flagged') loadObservations();
    else loadLogs();
  }, [tab]);

  async function loadObservations() {
    setLoading(true);
    setError(null);
    try {
      setObservations(await fetchObservationList());
    } catch (e) {
      setError('Failed to load flagged users.');
    } finally {
      setLoading(false);
    }
  }

  async function loadLogs(userId?: string) {
    setLoading(true);
    setError(null);
    try {
      setLogs(await fetchLogs(userId));
    } catch (e) {
      setError('Failed to load action logs.');
    } finally {
      setLoading(false);
    }
  }

  async function handleResolve(userId: string) {
    try {
      await resolveObservation(userId);
      await loadObservations();
    } catch {
      setError('Failed to resolve observation.');
    }
  }

  function handleLogFilter(e: React.FormEvent) {
    e.preventDefault();
    loadLogs(logUserFilter.trim() || undefined);
  }

  return (
    <div className={cls.page}>
      <div className={cls.pageShell}>
        <h1 className={cls.pageTitle}>Admin Panel</h1>
        <p className={cls.pageSubtitle}>Monitor users and audit system activity.</p>

        {/* Tabs */}
        <div className="mt-6 flex space-x-1 border-b border-gray-200">
          {([
            { id: 'flagged' as Tab, label: 'Flagged Users', icon: ShieldAlert },
            { id: 'logs' as Tab, label: 'Action Log', icon: ScrollText },
          ] as const).map(({ id, label, icon: Icon }) => (
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

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}

        {/* Flagged Users tab */}
        {tab === 'flagged' && (
          <div className={`mt-6 ${cls.card} overflow-hidden`}>
            {loading ? (
              <p className="p-6 text-sm text-gray-500">Loading…</p>
            ) : observations.length === 0 ? (
              <p className="p-6 text-sm text-gray-500">No flagged users.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['User ID', 'Reason', 'Detected At', 'Status', ''].map((h) => (
                        <th key={h} className={cls.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {observations.map((obs) => (
                      <tr
                        key={obs.id}
                        className={obs.resolved ? '' : 'bg-red-50'}
                      >
                        <td className={`${cls.td} font-mono text-xs`}>{obs.userId}</td>
                        <td className={`${cls.td} max-w-xs text-sm text-gray-700`}>{obs.reason}</td>
                        <td className={`${cls.td} text-sm text-gray-500`}>
                          {new Date(obs.detectedAt).toLocaleString()}
                        </td>
                        <td className={cls.td}>
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                              obs.resolved
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {obs.resolved ? 'Resolved' : 'Active'}
                          </span>
                        </td>
                        <td className={cls.td}>
                          {!obs.resolved && (
                            <button
                              onClick={() => handleResolve(obs.userId)}
                              className={cls.btnOutline}
                            >
                              Resolve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Action Log tab */}
        {tab === 'logs' && (
          <div className="mt-6 space-y-4">
            <form onSubmit={handleLogFilter} className="flex gap-2">
              <input
                type="text"
                value={logUserFilter}
                onChange={(e) => setLogUserFilter(e.target.value)}
                placeholder="Filter by User ID…"
                className="block w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button type="submit" className={cls.btnPrimary}>
                Search
              </button>
              {logUserFilter && (
                <button
                  type="button"
                  onClick={() => { setLogUserFilter(''); loadLogs(); }}
                  className={cls.btnOutline}
                >
                  Clear
                </button>
              )}
            </form>

            <div className={`${cls.card} overflow-hidden`}>
              {loading ? (
                <p className="p-6 text-sm text-gray-500">Loading…</p>
              ) : logs.length === 0 ? (
                <p className="p-6 text-sm text-gray-500">No logs found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Timestamp', 'User ID', 'Role', 'Action', 'Entity', 'Entity ID', 'Status'].map((h) => (
                          <th key={h} className={cls.th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className={`${cls.td} text-gray-500`}>
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className={`${cls.td} font-mono text-xs`}>{log.userId}</td>
                          <td className={cls.td}>
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                              log.userRole === 'ADMIN'
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {log.userRole}
                            </span>
                          </td>
                          <td className={cls.td}>
                            <span className={`font-semibold ${
                              log.action === 'DELETE' ? 'text-red-600'
                                : log.action === 'CREATE' ? 'text-emerald-600'
                                : log.action === 'UPDATE' ? 'text-amber-600'
                                : 'text-gray-600'
                            }`}>
                              {log.action}
                            </span>
                          </td>
                          <td className={`${cls.td} text-gray-600`}>{log.entityType}</td>
                          <td className={`${cls.td} font-mono text-xs text-gray-400`}>
                            {log.entityId ?? '—'}
                          </td>
                          <td className={cls.td}>
                            <span className={`font-semibold ${
                              log.httpStatus >= 400 ? 'text-red-600' : 'text-emerald-600'
                            }`}>
                              {log.httpStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
