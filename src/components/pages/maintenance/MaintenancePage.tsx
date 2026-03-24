import { useMemo, useState } from 'react';
import { carSelectOptions, maintenanceListData } from '../../../api/mockData';
import { MaintenanceContent } from './MaintenanceContent';
import { MaintenanceHeader } from './MaintenanceHeader';
import { MaintenancePagination } from './MaintenancePagination';
import { getCurrentPageData, ITEMS_PER_PAGE } from './maintenanceUtils';

export function MaintenancePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  const totalPages = Math.ceil(maintenanceListData.length / ITEMS_PER_PAGE);
  const currentData = useMemo(
    () => getCurrentPageData(maintenanceListData, currentPage),
    [currentPage],
  );

  return (
    <div className="app-page">
      <div className="app-page-shell">
        <MaintenanceHeader viewMode={viewMode} onModeChange={setViewMode} />

        <div className="mb-6 max-w-xs">
          <label htmlFor="carSelect" className="mb-1 block text-sm font-medium text-gray-700">
            Select your current car
          </label>
          <select
            id="carSelect"
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-base shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue="all"
          >
            <option value="all">All</option>
            {carSelectOptions.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name}
              </option>
            ))}
          </select>
        </div>

        <MaintenanceContent data={currentData} viewMode={viewMode} />

        <MaintenancePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={maintenanceListData.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
