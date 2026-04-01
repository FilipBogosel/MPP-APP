import { LayoutGrid, List, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { cls } from '@/styles/classes';

type Props = {
  viewMode: 'table' | 'card';
  onModeChange: (mode: 'table' | 'card') => void;
  showViewToggle?: boolean;
};

export function MaintenanceHeader({ viewMode, onModeChange, showViewToggle = true }: Props) {
  return (
    <div className="mb-8 sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 className={cls.pageTitle}>Maintenance Records</h1>
        <p className={cls.pageSubtitle}>
          A detailed history of services performed on your vehicle.
        </p>
      </div>

      <div className="mt-4 flex items-center gap-4 sm:mt-0">
        {showViewToggle ? (
          <div className="flex rounded-lg border border-gray-200 bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => onModeChange('table')}
              className={`flex transform-gpu items-center justify-center rounded-md p-1.5 transition-all duration-200 ease-out ${
                viewMode === 'table'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:-translate-y-0.5 hover:bg-white hover:text-gray-700 hover:shadow-sm'
              }`}
              aria-label="Table View"
            >
              <List className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => onModeChange('card')}
              className={`flex transform-gpu items-center justify-center rounded-md p-1.5 transition-all duration-200 ease-out ${
                viewMode === 'card'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:-translate-y-0.5 hover:bg-white hover:text-gray-700 hover:shadow-sm'
              }`}
              aria-label="Card View"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
          </div>
        ) : null}

        <Link
          to="/add-service"
          className={cls.btnPrimary}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Link>
      </div>
    </div>
  );
}
