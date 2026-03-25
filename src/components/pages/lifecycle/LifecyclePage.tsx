import { AlertTriangle, TrendingUp } from 'lucide-react';
import { cls } from '@/styles/classes';
import { LifecycleMetrics } from './LifecycleMetrics';
import { LifecycleTimeline } from './LifecycleTimeline';

export function LifecyclePage() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F6F8] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className={`flex items-center gap-3 ${cls.pageTitle}`}>
            <TrendingUp className="h-6 w-6 text-indigo-600" />
            Lifecycle Forecaster
          </h1>
          <p className={cls.pageSubtitle}>
            Predictive maintenance modeling and budget forecasting based on your vehicle's telematics and service history.
          </p>
        </div>

        <LifecycleMetrics />
        <LifecycleTimeline />

        <div className="flex items-start gap-4 rounded-lg border border-amber-200 bg-[#FEF3C7] p-5 shadow-sm">
          <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#D97706]" />
          <p className="text-sm font-medium leading-relaxed text-[#D97706] md:text-base">
            Heads-up: Based on your recent driving habits, you will hit the 150,000 km lifespan limit for your
            Dual-Mass Flywheel and Clutch Assembly in approximately 300 days. We recommend budgeting $1,200 for this
            major overhaul.
          </p>
        </div>
      </div>
    </div>
  );
}
