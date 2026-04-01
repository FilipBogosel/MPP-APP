import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { cls } from '@/styles/classes';
import type { AnalyticsImpactItem } from '@/types';

import { PlainTooltip } from './analyticsChartShared';

type ImpactFrequencyChartProps = {
  data: ReadonlyArray<AnalyticsImpactItem>;
  maxImpactCount: number;
};

export function ImpactFrequencyChart({ data, maxImpactCount }: ImpactFrequencyChartProps) {
  return (
    <div className={`interactive-lift panel-enter min-w-0 overflow-hidden p-6 ${cls.card}`}>
      <h2 className="mb-6 text-lg font-bold text-gray-900">Service Frequency by Impact</h2>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
            <XAxis
              type="number"
              domain={[0, Math.max(1, maxImpactCount)]}
              allowDecimals={false}
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={95}
              stroke="#4b5563"
              fontSize={13}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<PlainTooltip />} cursor={{ fill: '#f3f4f6' }} />
            <Bar dataKey="count" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={32} minPointSize={3} isAnimationActive animationDuration={650}>
              <LabelList dataKey="count" position="right" fill="#374151" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
