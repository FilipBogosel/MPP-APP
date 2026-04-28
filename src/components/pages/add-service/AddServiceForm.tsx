import { zodResolver } from '@hookform/resolvers/zod';
import confetti from 'canvas-confetti';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';
import { cls } from '@/styles/classes';

import type { AddServiceFormData, SelectOption } from '@/types';
import { AddServiceBasicSection } from './AddServiceBasicSection';
import { AddServiceNotesSection } from './AddServiceNotesSection';
import { AddServiceShopCostSection } from './AddServiceShopCostSection';
import { AddServiceUploadSection } from './AddServiceUploadSection';
import { buildMaintenanceRecord } from './addServiceRecordFactory';
import { getAddServiceValidationSchema } from './addServiceValidation';

type Props = {
  carOptions: ReadonlyArray<SelectOption>;
};

function getLocalDateIso() {
  const now = new Date();
  const local = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
  return local.toISOString().split('T')[0];
}

const addServiceSchema = getAddServiceValidationSchema();

export function AddServiceForm({ carOptions }: Props) {
  const navigate = useNavigate();
  const { addRecord, cars } = useMaintenanceContext();
  const localToday = getLocalDateIso();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<AddServiceFormData>({
    resolver: zodResolver(addServiceSchema),
    mode: 'onBlur',
    defaultValues: {
      carId: carOptions[0]?.id ?? '',
      serviceName: '',
      date: localToday,
      shopName: '',
      location: '',
      notes: '',
    },
  });

  const onSubmit = async (formData: AddServiceFormData) => {
    const serviceRecord = buildMaintenanceRecord({ cars, formData, today: localToday });
    await addRecord(serviceRecord);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#10B981', '#F59E0B'],
    });

    setTimeout(() => {
      navigate('/dashboard/records');
    }, 800);
  };

  return (
    <div className={`overflow-hidden ${cls.card}`}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8 p-6 sm:p-8">
        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-medium leading-6 text-gray-900">Basic Details</h3>
          <AddServiceBasicSection carOptions={carOptions} errors={errors} register={register} />
        </div>

        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-medium leading-6 text-gray-900">Shop & Cost</h3>
          <AddServiceShopCostSection errors={errors} register={register} />
        </div>

        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-medium leading-6 text-gray-900">Notes & Documents</h3>
          <div className="space-y-6">
            <AddServiceNotesSection errors={errors} register={register} />
            <AddServiceUploadSection />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <div className="flex justify-end gap-3">
            <Link to="/dashboard/records" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
              Cancel
            </Link>
            <button type="submit" disabled={isSubmitting} className={isSubmitting ? cls.btnDisabled : cls.btnPrimary}>
              Save Record
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
