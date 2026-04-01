import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { cls } from '@/styles/classes';
import type { AnalyticsAnnualItem } from '@/types';

import { PlainTooltip } from './analyticsChartShared';

type AnnualExpenditureChartProps = {
  data: ReadonlyArray<AnalyticsAnnualItem>;
};

export function AnnualExpenditureChart({ data }: AnnualExpenditureChartProps) {
  return (
    <div className={`interactive-lift panel-enter min-w-0 overflow-hidden p-6 lg:col-span-2 ${cls.card}`}>
      <h2 className="mb-6 text-lg font-bold text-gray-900">Annual Maintenance Expenditure</h2>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<PlainTooltip prefix="$" />} />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#4f46e5' }}
              activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
              isAnimationActive
              animationDuration={700}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
