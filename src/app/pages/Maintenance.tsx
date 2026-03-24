import React, { useState } from 'react';
import { Link } from 'react-router';
import { Wrench, Calendar, Gauge, ChevronLeft, ChevronRight, Plus, LayoutGrid, List } from 'lucide-react';

const mockServices = [
  { id: 1, name: 'Oil Change', date: '2025-10-15', mileage: '72,000', nextMileage: '80,000', cost: 65 },
  { id: 2, name: 'Brake Inspection', date: '2025-08-22', mileage: '68,000', nextMileage: '84,000', cost: 45 },
  { id: 3, name: 'Tire Rotation', date: '2025-08-22', mileage: '68,000', nextMileage: '76,000', cost: 30 },
  { id: 4, name: 'Air Filter Replacement', date: '2025-05-10', mileage: '61,000', nextMileage: '85,000', cost: 25 },
  { id: 5, name: 'Spark Plug Replacement', date: '2024-11-05', mileage: '48,000', nextMileage: '96,000', cost: 120 },
  { id: 6, name: 'Coolant Flush', date: '2024-09-12', mileage: '45,000', nextMileage: '93,000', cost: 150 },
  { id: 7, name: 'Transmission Fluid Change', date: '2024-06-20', mileage: '40,000', nextMileage: '88,000', cost: 250 },
  { id: 8, name: 'Wiper Blade Replacement', date: '2024-04-15', mileage: '35,000', nextMileage: '51,000', cost: 40 },
  { id: 9, name: 'Battery Replacement', date: '2023-12-01', mileage: '29,000', nextMileage: '109,000', cost: 200 },
  { id: 10, name: 'Oil Change', date: '2023-10-10', mileage: '24,000', nextMileage: '32,000', cost: 60 },
  { id: 11, name: 'Tire Rotation', date: '2023-10-10', mileage: '24,000', nextMileage: '32,000', cost: 30 },
  { id: 12, name: 'Brake Pad Replacement', date: '2023-05-22', mileage: '16,000', nextMileage: '64,000', cost: 450 },
  { id: 13, name: 'Engine Overhaul', date: '2023-01-14', mileage: '8,000', nextMileage: '32,000', cost: 1200 },
  { id: 14, name: 'Initial Inspection', date: '2022-10-01', mileage: '800', nextMileage: '8,000', cost: 150 },
];

const getImpactBadge = (cost: number) => {
  if (cost >= 1000) {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">Major Overhaul</span>;
  }
  if (cost >= 200) {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">Significant Repair</span>;
  }
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Routine Upkeep</span>;
};

export function Maintenance() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockServices.length / itemsPerPage);

  const currentData = mockServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 bg-[#f4f6f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Section */}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Maintenance Records</h1>
            <p className="mt-2 text-sm text-gray-600">
              A detailed history of services performed on your vehicle.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-4">
            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${
                  viewMode === 'table' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label="Table View"
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${
                  viewMode === 'card' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label="Card View"
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
            </div>
            <Link to="/add-service" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Link>
          </div>
        </div>

        {/* Car Selection */}
        <div className="mb-6 max-w-xs">
          <label htmlFor="carSelect" className="block text-sm font-medium text-gray-700 mb-1">
            Select your current car
          </label>
          <select
            id="carSelect"
            className="mt-1 block w-full rounded-lg border border-gray-300 py-2.5 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white shadow-sm transition-colors"
            defaultValue="all"
          >
            <option value="all">All</option>
            <option value="car1">Toyota Corolla (2018)</option>
            <option value="car2">Honda Civic (2020)</option>
            <option value="car3">Ford Mustang (2022)</option>
          </select>
        </div>

        {/* Content Container */}
        {viewMode === 'table' ? (
          <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Mileage
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Next Recommended
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Impact
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((service) => (
                    <tr 
                      key={service.id} 
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => window.location.href = `/service/${service.id}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <Wrench className="h-5 w-5" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{service.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                          {new Date(service.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900 font-medium">
                          <Gauge className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                          {service.mileage} km
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {service.nextMileage} km
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getImpactBadge(service.cost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {currentData.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
                onClick={() => window.location.href = `/service/${service.id}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Wrench className="h-6 w-6" />
                    </div>
                  </div>
                  {getImpactBadge(service.cost)}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                
                <div className="space-y-3 mt-auto pt-4 border-t border-gray-100 flex-grow">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="flex-shrink-0 mr-2 h-4 w-4" />
                      Date
                    </div>
                    <span className="font-medium text-gray-900">
                      {new Date(service.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Gauge className="flex-shrink-0 mr-2 h-4 w-4" />
                      Mileage
                    </div>
                    <span className="font-medium text-gray-900">{service.mileage} km</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm pt-2">
                    <span className="text-gray-500 font-medium">Total Cost</span>
                    <span className="font-bold text-gray-900 text-base">${service.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="bg-white rounded-xl shadow-sm px-4 py-3 border border-gray-200 sm:px-6 flex items-center justify-between">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, mockServices.length)}</span> of <span className="font-medium">{mockServices.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Mobile pagination */}
            <div className="flex items-center justify-between sm:hidden w-full">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

      </div>
    </div>
  );
}
