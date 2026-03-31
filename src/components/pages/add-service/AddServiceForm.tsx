import { zodResolver } from '@hookform/resolvers/zod';
import {
  Building2,
  Calendar,
  Car,
  DollarSign,
  FileText,
  Gauge,
  MapPin,
  UploadCloud,
  Wrench,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { mockCars } from '@/api/mockData';
import { useMaintenanceContext } from '@/context/MaintenanceContext';
import { cls } from '@/styles/classes';
import type { AddServiceFormData, MaintenanceRecord, MaintenanceServiceType, SelectOption } from '@/types';
import { getAddServiceValidationSchema } from './addServiceValidation';

type Props = {
  carOptions: ReadonlyArray<SelectOption>;
};

const SERVICE_TYPES: ReadonlyArray<MaintenanceServiceType> = [
  'OIL_CHANGE',
  'BRAKE_SERVICE',
  'TIRE_SERVICE',
  'ENGINE_SERVICE',
  'INSPECTION',
  'OTHER',
];

function inferServiceType(serviceName: string): MaintenanceServiceType {
  const normalizedInput = serviceName.trim().toUpperCase().replace(/\s+/g, '_');
  if (SERVICE_TYPES.includes(normalizedInput as MaintenanceServiceType)) {
    return normalizedInput as MaintenanceServiceType;
  }

  const lowerValue = serviceName.trim().toLowerCase();
  if (lowerValue.includes('oil')) return 'OIL_CHANGE';
  if (lowerValue.includes('brake')) return 'BRAKE_SERVICE';
  if (lowerValue.includes('tire') || lowerValue.includes('tyre') || lowerValue.includes('wheel')) return 'TIRE_SERVICE';
  if (lowerValue.includes('engine') || lowerValue.includes('transmission') || lowerValue.includes('coolant') || lowerValue.includes('spark')) return 'ENGINE_SERVICE';
  if (lowerValue.includes('inspect')) return 'INSPECTION';

  return 'OTHER';
}

function createRecordId() {
  return crypto.randomUUID();
}

const addServiceSchema = getAddServiceValidationSchema();

export function AddServiceForm({ carOptions }: Props) {
  const navigate = useNavigate();
  const { addRecord } = useMaintenanceContext();
  const localToday = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000))
    .toISOString()
    .split('T')[0];

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

  const onSubmit = (formData: AddServiceFormData) => {
    const selectedCar = mockCars.find((car) => car.id === formData.carId);
    const today = localToday;

    const serviceRecord: MaintenanceRecord = {
      id: createRecordId(),
      userId: selectedCar?.userId ?? mockCars[0]?.userId ?? 'user-001',
      carId: formData.carId,
      serviceType: inferServiceType(formData.serviceName),
      serviceDate: formData.date || today,
      odometerKm: formData.kilometers,
      nextServiceKm: formData.nextKilometers,
      costUsd: formData.cost,
      providerName: formData.shopName.trim(),
      providerLocation: formData.location.trim(),
      notes: formData.notes.trim(),
      createdAt: today,
      updatedAt: today,
    };

    addRecord(serviceRecord);
    navigate('/dashboard/records');
  };

  return (
    <div className={`overflow-hidden ${cls.card}`}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8 p-6 sm:p-8">
        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-medium leading-6 text-gray-900">Basic Details</h3>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div className="sm:col-span-2">
              <label htmlFor="carId" className={cls.label}>Vehicle</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Car className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="carId"
                  className={`${cls.input} ${errors.carId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  {...register('carId')}
                >
                  {carOptions.map((car) => (
                    <option key={car.id} value={car.id}>{car.name}</option>
                  ))}
                </select>
              </div>
              {errors.carId ? <p className="mt-1 text-sm text-red-600">{errors.carId.message}</p> : null}
            </div>

            <div>
              <label htmlFor="serviceName" className={cls.label}>Service Name</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Wrench className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="serviceName"
                  type="text"
                  placeholder="e.g. Oil Change, Brake Pad Replacement"
                  className={`${cls.input} ${errors.serviceName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  {...register('serviceName')}
                />
              </div>
              {errors.serviceName ? <p className="mt-1 text-sm text-red-600">{errors.serviceName.message}</p> : null}
            </div>

            <div>
              <label htmlFor="date" className={cls.label}>Date</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="date"
                  type="date"
                  className={`${cls.input} ${errors.date ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  {...register('date')}
                />
              </div>
              {errors.date ? <p className="mt-1 text-sm text-red-600">{errors.date.message}</p> : null}
            </div>

            <div>
              <label htmlFor="kilometers" className={cls.label}>Current Odometer (km)</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Gauge className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="kilometers"
                  type="number"
                  placeholder="e.g. 50000"
                  className={`${cls.input} ${errors.kilometers ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  {...register('kilometers', { valueAsNumber: true })}
                />
              </div>
              {errors.kilometers ? <p className="mt-1 text-sm text-red-600">{errors.kilometers.message}</p> : null}
            </div>

            <div>
              <label htmlFor="nextKilometers" className={cls.label}>Next Recommended Service (km)</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Gauge className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="nextKilometers"
                  type="number"
                  placeholder="e.g. 60000"
                  className={`${cls.input} ${errors.nextKilometers ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  {...register('nextKilometers', { valueAsNumber: true })}
                />
              </div>
              {errors.nextKilometers ? <p className="mt-1 text-sm text-red-600">{errors.nextKilometers.message}</p> : null}
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-medium leading-6 text-gray-900">Shop & Cost</h3>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div>
              <label htmlFor="shopName" className={cls.label}>Service Shop Name</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="shopName"
                  type="text"
                  placeholder="e.g. Joe's Auto Repair"
                  className={`${cls.input} ${errors.shopName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  {...register('shopName')}
                />
              </div>
              {errors.shopName ? <p className="mt-1 text-sm text-red-600">{errors.shopName.message}</p> : null}
            </div>

            <div>
              <label htmlFor="location" className={cls.label}>Location</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="location"
                  type="text"
                  placeholder="e.g. 123 Main St, City"
                  className={`${cls.input} ${errors.location ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  {...register('location')}
                />
              </div>
              {errors.location ? <p className="mt-1 text-sm text-red-600">{errors.location.message}</p> : null}
            </div>

            <div>
              <label htmlFor="cost" className={cls.label}>Total Cost</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="cost"
                  type="number"
                  placeholder="0.00"
                  className={`${cls.input} ${errors.cost ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  {...register('cost', { valueAsNumber: true })}
                />
              </div>
              {errors.cost ? <p className="mt-1 text-sm text-red-600">{errors.cost.message}</p> : null}
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-medium leading-6 text-gray-900">Notes & Documents</h3>
          <div className="space-y-6">
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Mechanic Notes / Description</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute left-3 top-3 flex items-start">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="notes"
                  rows={4}
                  placeholder="Any specific observations or future recommendations from the mechanic..."
                  className={`${cls.textarea} ${errors.notes ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  {...register('notes')}
                />
              </div>
              {errors.notes ? <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p> : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Upload Receipt or Documents (PDF, Image)</label>
              <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 pb-6 pt-5 transition-colors hover:border-indigo-400">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex justify-center text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white px-1 font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf,image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
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
