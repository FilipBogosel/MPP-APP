import React from 'react';
import { Activity, DollarSign, AlertTriangle, TrendingUp, Calendar, Clock } from 'lucide-react';

export function LifecycleForecaster() {
  return (
    <div className="flex-1 bg-[#F4F6F8] p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            Lifecycle Forecaster
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Predictive maintenance modeling and budget forecasting based on your vehicle's telematics and service history.
          </p>
        </div>

        {/* 1. Top Section (User Velocity Metrics) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-50 p-3 rounded-full">
                <Activity className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Calculated Driving Average</h3>
                <div className="text-3xl font-bold text-gray-900 mt-1">42 km/day</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500 border-t border-gray-100 pt-3">
              Based on 90-day Weighted Moving Average.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Projected 12-Month Budget</h3>
                <div className="text-3xl font-bold text-gray-900 mt-1">$1,835.00</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500 border-t border-gray-100 pt-3">
              Estimated cost of upcoming lifecycle events.
            </p>
          </div>

        </div>

        {/* 2. Middle Section (The Forecast Timeline) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8 mb-6 relative">
          <div className="flex items-center gap-2 mb-10 border-b border-gray-100 pb-4">
            <Clock className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-gray-900">Risk & Budget Timeline</h2>
          </div>

          {/* Timeline Container */}
          <div className="overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="relative pt-8 pb-12 min-w-[900px]">
              {/* The horizontal connecting line */}
              <div className="absolute top-[42px] left-12 right-12 h-1 bg-gray-200 z-0"></div>

              {/* Timeline Nodes */}
              <div className="relative z-10 flex justify-between gap-4 px-4 sm:px-8">
                
                {/* Node 1 (Routine) */}
                <div className="flex flex-col items-center text-center relative w-48 shrink-0">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Routine</span>
                  <div className="w-5 h-5 bg-blue-500 rounded-full border-4 border-white shadow-sm mb-4"></div>
                  <h4 className="font-semibold text-gray-900 text-base">Oil Change</h4>
                  <div className="flex items-center text-gray-500 text-sm mt-1 justify-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    May 26, 2026
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-900 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    Est: $85.00
                  </div>
                </div>

                {/* Node 2 (Warning) */}
                <div className="flex flex-col items-center text-center relative w-48 shrink-0">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-3">Warning</span>
                  <div className="w-5 h-5 bg-orange-500 rounded-full border-4 border-white shadow-sm mb-4"></div>
                  <h4 className="font-semibold text-gray-900 text-base">Timing Belt Limit</h4>
                  <div className="flex items-center text-gray-500 text-sm mt-1 justify-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Aug 12, 2026
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-900 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    Est: $400.00
                  </div>
                </div>

                {/* Node 3 (Critical) */}
                <div className="flex flex-col items-center text-center relative w-48 shrink-0">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">Critical</span>
                  <div className="w-5 h-5 bg-red-500 rounded-full border-4 border-white shadow-sm mb-4 animate-pulse"></div>
                  <h4 className="font-semibold text-gray-900 text-base">Clutch Assembly</h4>
                  <div className="flex items-center text-gray-500 text-sm mt-1 justify-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Oct 05, 2026
                  </div>
                  <div className="mt-2 text-sm font-medium text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    Est: $1,200.00
                  </div>
                </div>

                {/* Node 4 (Routine) */}
                <div className="flex flex-col items-center text-center relative w-48 shrink-0">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Routine</span>
                  <div className="w-5 h-5 bg-blue-500 rounded-full border-4 border-white shadow-sm mb-4"></div>
                  <h4 className="font-semibold text-gray-900 text-base">Brake Pads</h4>
                  <div className="flex items-center text-gray-500 text-sm mt-1 justify-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Dec 15, 2026
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-900 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    Est: $150.00
                  </div>
                </div>

                {/* Node 5 (Warning) */}
                <div className="flex flex-col items-center text-center relative w-48 shrink-0">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-3">Warning</span>
                  <div className="w-5 h-5 bg-orange-500 rounded-full border-4 border-white shadow-sm mb-4"></div>
                  <h4 className="font-semibold text-gray-900 text-base">Spark Plugs</h4>
                  <div className="flex items-center text-gray-500 text-sm mt-1 justify-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Apr 10, 2027
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-900 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    Est: $350.00
                  </div>
                </div>

                {/* Node 6 (Critical) */}
                <div className="flex flex-col items-center text-center relative w-48 shrink-0">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">Critical</span>
                  <div className="w-5 h-5 bg-red-500 rounded-full border-4 border-white shadow-sm mb-4"></div>
                  <h4 className="font-semibold text-gray-900 text-base">Suspension Overhaul</h4>
                  <div className="flex items-center text-gray-500 text-sm mt-1 justify-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Jul 01, 2027
                  </div>
                  <div className="mt-2 text-sm font-medium text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    Est: $850.00
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Section (The Heuristic Warning) */}
        <div className="bg-[#FEF3C7] rounded-lg p-5 flex items-start gap-4 shadow-sm border border-amber-200">
          <AlertTriangle className="w-6 h-6 text-[#D97706] flex-shrink-0 mt-0.5" />
          <p className="text-[#D97706] text-sm md:text-base font-medium leading-relaxed">
            Heads-up: Based on your recent driving habits, you will hit the 150,000 km lifespan limit for your Dual-Mass Flywheel and Clutch Assembly in approximately 300 days. We recommend budgeting $1,200 for this major overhaul.
          </p>
        </div>

      </div>
    </div>
  );
}
