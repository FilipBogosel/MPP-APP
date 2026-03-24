import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  LabelList
} from 'recharts';
import { DollarSign, Activity, TrendingUp } from 'lucide-react';

const expenditureData = [
  { name: 'Oil Changes', value: 450 },
  { name: 'Brake Inspections', value: 800 },
  { name: 'Tire Rotations', value: 300 },
  { name: 'Other Services', value: 600 },
];
// Pleasing and distinguishable blue/indigo palette
const CHART_COLORS = ['#1e3a8a', '#4f46e5', '#0284c7', '#818cf8'];

const impactData = [
  { name: 'Routine', count: 15 },
  { name: 'Significant', count: 4 },
  { name: 'Overhaul', count: 1 },
];

const annualData = [
  { month: 'Jan', cost: 100 },
  { month: 'Feb', cost: 0 },
  { month: 'Mar', cost: 250 },
  { month: 'Apr', cost: 45 },
  { month: 'May', cost: 0 },
  { month: 'Jun', cost: 600 },
  { month: 'Jul', cost: 0 },
  { month: 'Aug', cost: 120 },
  { month: 'Sep', cost: 0 },
  { month: 'Oct', cost: 90 },
  { month: 'Nov', cost: 0 },
  { month: 'Dec', cost: 1500 },
];

export function Analytics() {
  return (
    <div className="flex-1 bg-[#f4f6f8] pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Section */}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Statistics</h1>
            <p className="mt-2 text-sm text-gray-600">
              Insights and financial breakdown of your vehicle's maintenance history.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mr-4">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Lifetime Cost</p>
              <p className="text-2xl font-bold text-gray-900">$2,705.00</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mr-4">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Average Cost Per Service</p>
              <p className="text-2xl font-bold text-gray-900">$135.25</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-red-50 text-red-600 mr-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Most Expensive Service</p>
              <p className="text-2xl font-bold text-gray-900">$1,200.00</p>
              <p className="text-xs text-gray-400 mt-0.5">Engine Overhaul</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1 - Expenditure Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Cost by Service Type</h2>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenditureData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={false}
                    label={({ value }) => `$${value}`}
                    labelLine={true}
                  >
                    {expenditureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Cost']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2 - Price Impact Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Service Frequency by Impact</h2>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={impactData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#4b5563" 
                    fontSize={13} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                    cursor={{fill: '#f3f4f6'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={32} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3 - Cost Over Time */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Annual Maintenance Expenditure</h2>
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={annualData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Expenditure']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
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
      </div>
    </div>
  );
}