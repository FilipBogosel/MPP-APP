import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import type { AddServiceFormData } from '@/types';
import { carSelectOptions } from '@/api/mockData';
import { cls } from '@/styles/classes';
import { AddServiceForm } from './AddServiceForm';

export function AddServicePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AddServiceFormData>({
    carId: carSelectOptions[0]?.id ?? '',
    serviceName: '',
    date: new Date().toISOString().split('T')[0],
    kilometers: '',
    nextKilometers: '',
    shopName: '',
    location: '',
    cost: '',
    notes: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className={`${cls.page} py-10`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className={cls.backLink}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Maintenance
          </Link>
          <h1 className={cls.pageTitle}>Add Service Record</h1>
          <p className={cls.pageSubtitle}>Log a new maintenance or repair service for your vehicle.</p>
        </div>

        <AddServiceForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          carOptions={carSelectOptions}
        />
      </div>
    </div>
  );
}
