import { Activity, DollarSign, TrendingUp } from 'lucide-react';

export function AnalyticsSummary() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="flex items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <DollarSign className="h-6 w-6" />
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-500">Total Lifetime Cost</p>
          <p className="text-2xl font-bold text-gray-900">$2,705.00</p>
        </div>
      </div>

      <div className="flex items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Activity className="h-6 w-6" />
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-500">Average Cost Per Service</p>
          <p className="text-2xl font-bold text-gray-900">$135.25</p>
        </div>
      </div>

      <div className="flex items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-gray-500">Most Expensive Service</p>
          <p className="text-2xl font-bold text-gray-900">$1,200.00</p>
          <p className="mt-0.5 text-xs text-gray-400">Engine Overhaul</p>
        </div>
      </div>
    </div>
  );
}
