import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
import {
  analyticsAnnualData,
  analyticsExpenditureData,
  analyticsImpactData,
} from '@/api/mockUiData';
import { cls } from '@/styles/classes';

const CHART_COLORS = ['#1e3a8a', '#4f46e5', '#0284c7', '#818cf8'];

function PlainTooltip({ active, payload, prefix = '' }: { active?: boolean; payload?: Array<{ value: number; name: string }>; prefix?: string }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-gray-500">{payload[0].name}</p>
      <p className="text-sm font-semibold text-gray-900">{prefix}{payload[0].value}</p>
    </div>
  );
}

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className={`flex flex-col p-6 ${cls.card}`}>
        <h2 className="mb-6 text-lg font-bold text-gray-900">Cost by Service Type</h2>
        <div className="min-h-[300px] flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[...analyticsExpenditureData]}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                isAnimationActive={false}
                label={({ value }) => `$${value}`}
                labelLine
              >
                {analyticsExpenditureData.map((_, index) => (
                  <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<PlainTooltip prefix="$" />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`flex flex-col p-6 ${cls.card}`}>
        <h2 className="mb-6 text-lg font-bold text-gray-900">Service Frequency by Impact</h2>
        <div className="min-h-[300px] flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[...analyticsImpactData]} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#4b5563" fontSize={13} tickLine={false} axisLine={false} />
              <Tooltip content={<PlainTooltip />} cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="count" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={32} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`lg:col-span-2 flex flex-col p-6 ${cls.card}`}>
        <h2 className="mb-6 text-lg font-bold text-gray-900">Annual Maintenance Expenditure</h2>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[...analyticsAnnualData]} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
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
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
