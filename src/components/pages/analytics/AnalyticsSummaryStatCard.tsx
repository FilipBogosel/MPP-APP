import type { ComponentType } from 'react';

import { cls } from '@/styles/classes';

type AnalyticsSummaryStatCardProps = {
  accent?: 'indigo' | 'red';
  icon: ComponentType<{ className?: string }>;
  label: string;
  sub?: string;
  value: string;
};

export function AnalyticsSummaryStatCard({ accent = 'indigo', icon: Icon, label, sub, value }: AnalyticsSummaryStatCardProps) {
  const iconBox = accent === 'red'
    ? 'mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600'
    : `mr-4 ${cls.iconBox}`;

  return (
    <div className="interactive-lift flex items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className={iconBox}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="mb-1 text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {sub ? <p className="mt-0.5 text-xs text-gray-400">{sub}</p> : null}
      </div>
    </div>
  );
}
