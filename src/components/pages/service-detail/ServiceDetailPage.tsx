import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { ServiceRecordFormData } from '../../../types';
import { carSelectOptions, serviceDetailSeed } from '../../../api/mockData';
import { ServiceDetailPanels } from './ServiceDetailPanels';

export function ServiceDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData] = useState<ServiceRecordFormData>(serviceDetailSeed);
  const [formData, setFormData] = useState<ServiceRecordFormData>(initialData);

  const hasChanges = useMemo(
    () => JSON.stringify(formData) !== JSON.stringify(initialData),
    [formData, initialData],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleUpdate = () => {
    if (!hasChanges) return;
    navigate('/');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this service record?')) {
      navigate('/');
    }
  };

  return (
    <div className="app-page py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="mb-4 inline-flex items-center text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Maintenance
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Service Record Details</h1>
            <p className="mt-2 text-sm text-gray-600">View and edit details. Click the pencil icon to make changes.</p>
          </div>
          <div className="mt-4 flex gap-3 sm:mt-0">
            <button
              onClick={handleDelete}
              className="inline-flex items-center justify-center rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Record
            </button>
            <button
              onClick={handleUpdate}
              disabled={!hasChanges}
              className={`inline-flex items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                hasChanges
                  ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                  : 'cursor-not-allowed bg-gray-300'
              }`}
            >
              <Save className="mr-2 h-4 w-4" />
              {hasChanges ? 'Update Changes' : 'Up to date'}
            </button>
          </div>
        </div>

        <ServiceDetailPanels formData={formData} carOptions={carSelectOptions} onChange={handleChange} />

        <p className="mt-4 text-xs text-gray-400">Record: {id ?? formData.id}</p>
      </div>
    </div>
  );
}
