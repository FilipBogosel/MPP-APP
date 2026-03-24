import { LayoutGrid, List, Plus } from 'lucide-react';
import { Link } from 'react-router';

type Props = {
  viewMode: 'table' | 'card';
  onModeChange: (mode: 'table' | 'card') => void;
};

export function MaintenanceHeader({ viewMode, onModeChange }: Props) {
  return (
    <div className="mb-8 sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Maintenance Records</h1>
        <p className="mt-2 text-sm text-gray-600">
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
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Link>
      </div>
    </div>
  );
}
