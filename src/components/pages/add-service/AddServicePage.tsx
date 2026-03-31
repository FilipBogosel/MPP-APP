import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { carSelectOptions } from '@/api/mockData';
import { cls } from '@/styles/classes';
import { AddServiceForm } from './AddServiceForm';

export function AddServicePage() {
  return (
    <div className={`${cls.page} py-10`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/dashboard/records" className={cls.backLink}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Maintenance
          </Link>
          <h1 className={cls.pageTitle}>Add Service Record</h1>
          <p className={cls.pageSubtitle}>Log a new maintenance or repair service for your vehicle.</p>
        </div>

        <AddServiceForm carOptions={carSelectOptions} />
      </div>
    </div>
  );
}
