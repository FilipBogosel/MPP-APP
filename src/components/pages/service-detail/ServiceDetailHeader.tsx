import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

import { cls } from '@/styles/classes';

type ServiceDetailHeaderProps = {
  hasChanges: boolean;
  onDelete: () => void;
  onUpdate: () => void;
};

export function ServiceDetailHeader({ hasChanges, onDelete, onUpdate }: ServiceDetailHeaderProps) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link to="/dashboard/records" className={cls.backLink}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Maintenance
        </Link>
        <h1 className={cls.pageTitle}>Service Record Details</h1>
        <p className={cls.pageSubtitle}>View and edit details. Click the pencil icon to make changes.</p>
      </div>
      <div className="mt-4 flex gap-3 sm:mt-0">
        <button onClick={onDelete} className={cls.btnDanger}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Record
        </button>
        <button onClick={onUpdate} disabled={!hasChanges} className={hasChanges ? cls.btnSuccess : cls.btnDisabled}>
          <Save className="mr-2 h-4 w-4" />
          {hasChanges ? 'Update Changes' : 'Up to date'}
        </button>
      </div>
    </div>
  );
}
