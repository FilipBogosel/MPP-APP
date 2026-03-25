import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { ServiceRecordFormData } from '@/types';
import { carSelectOptions } from '@/api/mockData';
import { serviceDetailSeed } from '@/api/mockUiData';
import { cls } from '@/styles/classes';
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
    <div className={`${cls.page} py-10`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className={cls.backLink}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Maintenance
            </Link>
            <h1 className={cls.pageTitle}>Service Record Details</h1>
            <p className={cls.pageSubtitle}>View and edit details. Click the pencil icon to make changes.</p>
          </div>
          <div className="mt-4 flex gap-3 sm:mt-0">
            <button
              onClick={handleDelete}
              className={cls.btnDanger}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Record
            </button>
            <button
              onClick={handleUpdate}
              disabled={!hasChanges}
              className={hasChanges ? cls.btnSuccess : cls.btnDisabled}
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
