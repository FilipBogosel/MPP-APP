import { AnalyticsCharts } from './AnalyticsCharts';
import { AnalyticsSummary } from './AnalyticsSummary';

export function AnalyticsPage() {
  return (
    <div className="app-page pb-12">
      <div className="app-page-shell">
        <div className="mb-8 sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Statistics</h1>
            <p className="mt-2 text-sm text-gray-600">
              Insights and financial breakdown of your vehicle's maintenance history.
            </p>
          </div>
        </div>

        <AnalyticsSummary />
        <AnalyticsCharts />
      </div>
    </div>
  );
}
