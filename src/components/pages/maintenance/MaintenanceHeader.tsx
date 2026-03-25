import { LayoutGrid, List, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { cls } from '@/styles/classes';

type Props = {
  viewMode: 'table' | 'card';
  onModeChange: (mode: 'table' | 'card') => void;
};

export function MaintenanceHeader({ viewMode, onModeChange }: Props) {
  return (
    <div className="mb-8 sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 className={cls.pageTitle}>Maintenance Records</h1>
        <p className={cls.pageSubtitle}>
          A detailed history of services performed on your vehicle.
        </p>
      </div>

      <div className="mt-4 flex items-center gap-4 sm:mt-0">
        <div className="flex rounded-lg border border-gray-200 bg-gray-100 p-1">
          <button
            onClick={() => onModeChange('table')}
            className={`flex items-center justify-center rounded-md p-1.5 transition-colors ${
              viewMode === 'table' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-label="Table View"
          >
            <List className="h-5 w-5" />
          </button>
          <button
            onClick={() => onModeChange('card')}
            className={`flex items-center justify-center rounded-md p-1.5 transition-colors ${
              viewMode === 'card' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-label="Card View"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
        </div>

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
