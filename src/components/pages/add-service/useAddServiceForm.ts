import { zodResolver } from '@hookform/resolvers/zod';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';
import type { AddServiceFormData, SelectOption } from '@/types';
import { buildMaintenanceRecord } from './addServiceRecordFactory';
import { getAddServiceValidationSchema } from './addServiceValidation';

function getLocalDateIso() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().split('T')[0];
}

const addServiceSchema = getAddServiceValidationSchema();

export function useAddServiceForm(carOptions: ReadonlyArray<SelectOption>) {
  const navigate = useNavigate();
  const { addRecord, cars } = useMaintenanceContext();
  const localToday = getLocalDateIso();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<AddServiceFormData>({
    resolver: zodResolver(addServiceSchema),
    mode: 'onBlur',
    defaultValues: {
      carId: carOptions[0]?.id ?? '',
      serviceType: '' as any,
      date: localToday,
      shopName: '',
      location: '',
      notes: '',
    },
  });

  const onSubmit = async (formData: AddServiceFormData) => {
    setSubmitError(null);
    const serviceRecord = buildMaintenanceRecord({ cars, formData, today: localToday });

    try {
      await addRecord(serviceRecord);
    } catch {
      setSubmitError('Failed to save the record. Please check your vehicle selection and try again.');
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#10B981', '#F59E0B'],
    });

    setTimeout(() => navigate('/dashboard/records'), 800);
  };

  return { form, onSubmit, submitError };
}
