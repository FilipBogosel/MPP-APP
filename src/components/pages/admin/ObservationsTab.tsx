import { cls } from '@/styles/classes';
import type { ObservationEntry } from '@/api/services/adminApi';

type Props = {
  loading: boolean;
  observations: ObservationEntry[];
  onResolve: (userId: string) => Promise<void>;
};

export function ObservationsTab({ loading, observations, onResolve }: Props) {
  return (
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
                <tr key={obs.id} className={obs.resolved ? '' : 'bg-red-50'}>
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
                      <button onClick={() => onResolve(obs.userId)} className={cls.btnOutline}>
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
  );
}
