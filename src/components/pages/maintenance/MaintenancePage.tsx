import { Pagination } from '@/components/Pagination';
import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';
import { useMaintenanceTable } from '@/hooks/useMaintenanceTable';
import { cls } from '@/styles/classes';
import { MaintenanceContent } from './MaintenanceContent';
import { MaintenanceHeader } from './MaintenanceHeader';

type Props = {
  forceTableView?: boolean;
};

export function MaintenancePage({ forceTableView = false }: Props) {
  const { carOptions, deleteRecord } = useMaintenanceContext();
  const {
    currentData,
    currentPage,
    dateOrder,
    itemsPerPage,
    selectedCarId,
    setCurrentPage,
    setDateOrder,
    setSelectedCarId,
    setViewMode,
    totalItems,
    totalPages,
    viewMode,
  } = useMaintenanceTable();

  const handleDeleteRecord = (id: string) => {
    if (window.confirm('Delete this maintenance record?')) {
      deleteRecord(id);
    }
  };

  const activeViewMode = forceTableView ? 'table' : viewMode;

  return (
    <div className={cls.page}>
      <div className={cls.pageShell}>
        <MaintenanceHeader
          viewMode={activeViewMode}
          onModeChange={setViewMode}
          showViewToggle={!forceTableView}
        />

        <div className="mb-6 grid gap-4 sm:max-w-xl sm:grid-cols-2">
          <div>
            <label htmlFor="carSelect" className={`mb-1 ${cls.label}`}>
              Select your current car
            </label>
            <select
              id="carSelect"
              className="interactive-lift-soft mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-base shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={selectedCarId}
              onChange={(event) => setSelectedCarId(event.target.value)}
            >
              <option value="all">All</option>
              {carOptions.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dateOrderSelect" className={`mb-1 ${cls.label}`}>
              Date order
            </label>
            <select
              id="dateOrderSelect"
              className="interactive-lift-soft mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-base shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={dateOrder}
              onChange={(event) => setDateOrder(event.target.value as 'desc' | 'asc')}
            >
              <option value="desc">Latest first</option>
              <option value="asc">Oldest first (ascending)</option>
            </select>
          </div>
        </div>

        <MaintenanceContent
          data={currentData}
          viewMode={activeViewMode}
          onDelete={handleDeleteRecord}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
