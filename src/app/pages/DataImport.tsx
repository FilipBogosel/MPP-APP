import React from 'react';
import { UploadCloud, ArrowRight, XCircle, AlertCircle, Database, FileText, ChevronDown, HelpCircle } from 'lucide-react';

export function DataImport() {
  return (
    <div className="flex-1 bg-[#F4F6F8] p-6 lg:p-8 overflow-y-auto relative min-h-screen">
      <div className="max-w-7xl mx-auto pb-16">
        
        {/* 1. Top Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Database className="w-6 h-6 text-indigo-600" />
            Import Diagnostic Data
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload trip logs from apps like Torque Pro or CarScanner to update your personal service timeline and budget forecasts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 2. Left Column (Upload & Transform) */}
          <div className="space-y-6">
            
            {/* Upload Zone */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-full max-w-lg border-2 border-dashed border-gray-300 rounded-lg p-12 transition-colors hover:bg-gray-50 cursor-pointer flex flex-col items-center">
                <UploadCloud className="w-12 h-12 text-indigo-500 mb-4" />
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  Drop your Torque Pro or CarScanner export file here
                </h3>
                <p className="text-sm text-gray-500">
                  Compatible with CSV and JSON file formats (under 5MB).
                </p>
                <button className="mt-6 px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg text-sm hover:bg-indigo-100 transition-colors">
                  Browse Files
                </button>
              </div>
            </div>

            {/* File Parsing Preview Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-500" />
                <h3 className="text-base font-semibold text-gray-900">File Summary & Matching</h3>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                        DATA POINT FOUND IN YOUR FILE
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                        STATUS
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                        MATCHED APP DATA CATEGORY
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {/* Row 1 */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Odometer (km/miles)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        <ArrowRight className="w-5 h-5 text-emerald-500 mx-auto" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <span className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full font-medium text-xs text-gray-700">
                          Mileage
                        </span>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Diagnostic Trouble Codes (DTCs) Found
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        <ArrowRight className="w-5 h-5 text-emerald-500 mx-auto" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <span className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full font-medium text-xs text-gray-700">
                          Vehicle Health: Fault Codes
                        </span>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Average Fuel Economy (L/100km)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        <ArrowRight className="w-5 h-5 text-emerald-500 mx-auto" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <span className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full font-medium text-xs text-gray-700">
                          Performance: Fuel Economy
                        </span>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Engine Coolant Temperature (Average)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        <ArrowRight className="w-5 h-5 text-emerald-500 mx-auto" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <span className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full font-medium text-xs text-gray-700">
                          Vehicle Health: Cooling
                        </span>
                      </td>
                    </tr>
                    {/* Row 5 */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        System Battery Voltage (Average)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        <ArrowRight className="w-5 h-5 text-emerald-500 mx-auto" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <span className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full font-medium text-xs text-gray-700">
                          Vehicle Health: Electrical
                        </span>
                      </td>
                    </tr>
                    {/* Row 6 (Failure) */}
                    <tr className="bg-red-50/30">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-900">
                        Intake Air Temperature
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="relative inline-block w-full max-w-[200px]">
                          <select className="appearance-none w-full bg-white border border-red-300 text-gray-700 py-1.5 pl-3 pr-8 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500">
                            <option value="">Select category...</option>
                            <option value="mileage">Mileage</option>
                            <option value="health">Vehicle Health</option>
                            <option value="performance">Performance</option>
                            <option value="timestamp">Timestamp</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* 3. Right Column (The Load & Insights Impact) */}
          <div className="space-y-6 flex flex-col justify-start pt-0 lg:pt-0">
            
            {/* Review Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Review & Apply Your Update</h3>
              
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                We have successfully reviewed your trip data. It contains 3 months of logs (1,452 data points) and key metrics like <span className="font-semibold">Fault Codes, Fuel Economy, and Battery Status</span> that will help refine your predictions.
              </p>
              
              <p className="text-red-600 font-medium text-sm mb-8">
                Please fix the missing data mapping for <span className="font-bold">'Intake Air Temperature'</span> in the matching table on the left.
              </p>

              <div className="flex justify-center mt-8">
                <button 
                  disabled 
                  className="bg-gray-100 text-gray-400 font-medium py-3 px-8 rounded-lg cursor-not-allowed w-full md:w-auto text-base transition-colors border border-gray-200"
                >
                  Confirm and Process Trip Data
                </button>
              </div>
            </div>

            {/* Expected Impact Alert */}
            <div className="bg-[#EFF6FF] rounded-lg p-5 flex items-start gap-4 shadow-sm border border-blue-200 mt-6">
              <AlertCircle className="w-6 h-6 text-blue-700 flex-shrink-0 mt-0.5" />
              <p className="text-blue-900 text-sm md:text-base font-medium leading-relaxed">
                Based on this new data, including your detailed driving patterns, we have adjusted your driving habit profile. You are driving more intensely (avg. 55 km/day with higher average speed), which means your next major scheduled service is now forecast to happen 14 days sooner than originally predicted.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* 4. Footer Help Button */}
      <button 
        className="fixed bottom-6 right-6 bg-white text-gray-500 hover:text-indigo-600 p-3.5 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all z-50 flex items-center justify-center"
        aria-label="Help and Support"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

    </div>
  );
}
