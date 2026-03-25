import { Activity, DollarSign } from 'lucide-react';
import { lifecycleMetrics } from '@/api/mockUiData';
import { cls } from '@/styles/classes';

export function LifecycleMetrics() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      {lifecycleMetrics.map((metric) => (
        <div key={metric.title} className="flex flex-col justify-center rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className={`${cls.iconBox} rounded-full p-3 ${metric.tone === 'indigo' ? 'bg-indigo-50' : 'bg-emerald-50'}`}>
              {metric.tone === 'indigo' ? (
                <Activity className="h-6 w-6 text-indigo-600" />
              ) : (
                <DollarSign className="h-6 w-6 text-emerald-600" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">{metric.title}</h3>
              <div className="mt-1 text-3xl font-bold text-gray-900">{metric.value}</div>
            </div>
          </div>
          <p className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-500">{metric.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
