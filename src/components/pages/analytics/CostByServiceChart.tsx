import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { cls } from '@/styles/classes';
import type { AnalyticsBreakdownItem } from '@/types';

import { CHART_COLORS, ExpenditureLegend, PlainTooltip } from './analyticsChartShared';

type CostByServiceChartProps = {
  data: ReadonlyArray<AnalyticsBreakdownItem>;
};

export function CostByServiceChart({ data }: CostByServiceChartProps) {
  return (
    <div className={`interactive-lift panel-enter min-w-0 overflow-hidden p-6 ${cls.card}`}>
      <h2 className="mb-6 text-lg font-bold text-gray-900">Cost by Service Type</h2>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 8, right: 8, left: 8, bottom: 72 }}>
            <Pie
              data={data}
              cx="50%"
              cy="44%"
              innerRadius={56}
              outerRadius={82}
              paddingAngle={5}
              dataKey="value"
              isAnimationActive
              animationDuration={700}
              label={false}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<PlainTooltip prefix="$" />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              height={68}
              content={<ExpenditureLegend />}
              wrapperStyle={{ left: 0, width: '100%', bottom: 0 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
