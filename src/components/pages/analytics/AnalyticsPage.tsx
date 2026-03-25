import { AnalyticsCharts } from './AnalyticsCharts';
import { AnalyticsSummary } from './AnalyticsSummary';
import { cls } from '@/styles/classes';

export function AnalyticsPage() {
  return (
    <div className={`${cls.page} pb-12`}>
      <div className={cls.pageShell}>
        <div className="mb-8 sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className={cls.pageTitle}>Analytics & Statistics</h1>
            <p className={cls.pageSubtitle}>
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
