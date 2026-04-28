import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';

import { cls } from '@/styles/classes';

import { ServiceDetailHeader } from './ServiceDetailHeader';
import { ServiceDetailPanels } from './ServiceDetailPanels';
import { useServiceDetailController } from './useServiceDetailController';

export function ServiceDetailPage() {
  const { id } = useParams();
  const {
    carOptions,
    formData,
    hasChanges,
    isMissingRecord,
    onDelete,
    onFieldChange,
    onUpdate,
    validationErrors,
  } = useServiceDetailController(id);

  if (isMissingRecord || !formData) {
    return (
      <div className={`${cls.page} py-10`}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link to="/dashboard/records" className={cls.backLink}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Maintenance
          </Link>
          <h1 className={cls.pageTitle}>Service Record Not Found</h1>
          <p className={cls.pageSubtitle}>The requested record may have been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${cls.page} py-10`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ServiceDetailHeader hasChanges={hasChanges} onDelete={onDelete} onUpdate={onUpdate} />

        <ServiceDetailPanels
          formData={formData}
          carOptions={carOptions}
          onChange={onFieldChange}
          validationErrors={validationErrors}
        />

        <p className="mt-4 text-xs text-gray-400">Record: {formData.id}</p>
      </div>
    </div>
  );
}
