import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMemo } from 'react';
import { formatServiceType } from '@/components/pages/maintenance/maintenanceUtils';
import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';
import { cls } from '@/styles/classes';
import type { MaintenanceRecord } from '@/types';
import type { AnalyticsAnnualItem, AnalyticsBreakdownItem, AnalyticsImpactItem } from '@/types';

const CHART_COLORS = ['#1e3a8a', '#4f46e5', '#0284c7', '#818cf8'];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type Props = {
  recordsOverride?: ReadonlyArray<MaintenanceRecord>;
};

type LegendEntry = {
  color?: string;
  value?: string;
  payload?: {
    value?: number;
  };
};

function PlainTooltip({ active, payload, prefix = '' }: { active?: boolean; payload?: Array<{ value: number; name: string }>; prefix?: string }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-gray-500">{payload[0].name}</p>
      <p className="text-sm font-semibold text-gray-900">{prefix}{payload[0].value}</p>
    </div>
  );
}

function ExpenditureLegend({ payload }: { payload?: ReadonlyArray<LegendEntry> }) {
  if (!payload?.length) return null;

  return (
    <ul className="grid grid-cols-1 gap-x-3 gap-y-2 px-2 text-xs text-gray-700 sm:grid-cols-2">
      {payload.map((entry) => (
        <li key={entry.value} className="flex min-w-0 items-center gap-2">
          <span
            className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="min-w-0 flex-1 truncate" title={entry.value}>{entry.value}</span>
          <span className="flex-shrink-0 font-semibold text-gray-900">
            ${Math.round(entry.payload?.value ?? 0)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function AnalyticsCharts({ recordsOverride }: Props) {
  const { records: contextRecords } = useMaintenanceContext();
  const records = recordsOverride ?? contextRecords;

  const expenditureData = useMemo<ReadonlyArray<AnalyticsBreakdownItem>>(
    () => {
      const totals = new Map<string, number>();

      records.forEach((record) => {
        const label = formatServiceType(record.serviceType);
        totals.set(label, (totals.get(label) ?? 0) + record.costUsd);
      });

      return Array.from(totals.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
    },
    [records],
  );

  const impactData = useMemo<ReadonlyArray<AnalyticsImpactItem>>(
    () => {
      const counters = {
        Routine: 0,
        Significant: 0,
        Overhaul: 0,
      };

      records.forEach((record) => {
        if (record.costUsd >= 1000) {
          counters.Overhaul += 1;
        } else if (record.costUsd >= 200) {
          counters.Significant += 1;
        } else {
          counters.Routine += 1;
        }
      });

      return [
        { name: 'Routine', count: counters.Routine },
        { name: 'Significant', count: counters.Significant },
        { name: 'Overhaul', count: counters.Overhaul },
      ];
    },
    [records],
  );

  const annualData = useMemo<ReadonlyArray<AnalyticsAnnualItem>>(
    () => {
      const monthTotals = Array.from({ length: 12 }, () => 0);

      records.forEach((record) => {
        const date = new Date(record.serviceDate);
        if (!Number.isNaN(date.getTime())) {
          monthTotals[date.getMonth()] += record.costUsd;
        }
      });

      return MONTH_LABELS.map((month, index) => ({
        month,
        cost: Number(monthTotals[index].toFixed(2)),
      }));
    },
    [records],
  );

  const maxImpactCount = useMemo(
    () => impactData.reduce((max, item) => Math.max(max, item.count), 0),
    [impactData],
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className={`interactive-lift panel-enter min-w-0 overflow-hidden p-6 ${cls.card}`}>
        <h2 className="mb-6 text-lg font-bold text-gray-900">Cost by Service Type</h2>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 8, right: 8, left: 8, bottom: 72 }}>
              <Pie
                data={expenditureData}
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
                {expenditureData.map((_, index) => (
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

      <div className={`interactive-lift panel-enter min-w-0 overflow-hidden p-6 ${cls.card}`}>
        <h2 className="mb-6 text-lg font-bold text-gray-900">Service Frequency by Impact</h2>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={impactData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
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

      <div className={`interactive-lift panel-enter min-w-0 overflow-hidden p-6 lg:col-span-2 ${cls.card}`}>
        <h2 className="mb-6 text-lg font-bold text-gray-900">Annual Maintenance Expenditure</h2>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={annualData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
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
    </div>
  );
}
