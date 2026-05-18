import { cls } from '@/styles/classes';
import type { ActionLogEntry } from '@/api/services/adminApi';

const LOG_HEADERS = ['Timestamp', 'User ID', 'Role', 'Action', 'Entity', 'Entity ID', 'Status'];

function actionColor(action: string) {
  if (action === 'DELETE') return 'text-red-600';
  if (action === 'CREATE') return 'text-emerald-600';
  if (action === 'UPDATE') return 'text-amber-600';
  return 'text-gray-600';
}

type Props = {
  loading: boolean;
  logs: ActionLogEntry[];
};

export function LogsTable({ loading, logs }: Props) {
  if (loading) return <p className="p-6 text-sm text-gray-500">Loading…</p>;
  if (logs.length === 0) return <p className="p-6 text-sm text-gray-500">No logs found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {LOG_HEADERS.map((h) => (
              <th key={h} className={cls.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50">
              <td className={`${cls.td} text-gray-500`}>
                {new Date(log.loggedAt).toLocaleString()}
              </td>
              <td className={`${cls.td} font-mono text-xs`}>{log.userId}</td>
              <td className={cls.td}>
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                  log.userRole === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {log.userRole}
                </span>
              </td>
              <td className={cls.td}>
                <span className={`font-semibold ${actionColor(log.action)}`}>{log.action}</span>
              </td>
              <td className={`${cls.td} text-gray-600`}>{log.entityType}</td>
              <td className={`${cls.td} font-mono text-xs text-gray-400`}>{log.entityId ?? '—'}</td>
              <td className={cls.td}>
                <span className={`font-semibold ${log.httpStatus >= 400 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {log.httpStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
