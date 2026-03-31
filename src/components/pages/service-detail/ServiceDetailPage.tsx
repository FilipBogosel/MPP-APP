import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { validateAddServiceFormData } from '@/components/pages/add-service/addServiceValidation';
import type { AddServiceFormData, MaintenanceRecord, MaintenanceServiceType, ServiceRecordFormData } from '@/types';
import { carSelectOptions, mockCars } from '@/api/mockData';
import { useMaintenanceContext } from '@/context/MaintenanceContext';
import { cls } from '@/styles/classes';
import { formatServiceType } from '../maintenance/maintenanceUtils';
import { ServiceDetailPanels } from './ServiceDetailPanels';

const SERVICE_TYPES: ReadonlyArray<MaintenanceServiceType> = [
  'OIL_CHANGE',
  'BRAKE_SERVICE',
  'TIRE_SERVICE',
  'ENGINE_SERVICE',
  'INSPECTION',
  'OTHER',
];

function toSafeNumber(value: string, fallback = 0) {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

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

function mapRecordToFormData(record: MaintenanceRecord): ServiceRecordFormData {
  return {
    id: record.id,
    carId: record.carId,
    serviceName: formatServiceType(record.serviceType),
    date: record.serviceDate,
    kilometers: String(record.odometerKm),
    nextKilometers: String(record.nextServiceKm),
    shopName: record.providerName,
    location: record.providerLocation,
    cost: String(record.costUsd),
    notes: record.notes,
  };
}

export function ServiceDetailPage() {
  const navigate = useNavigate();
  const { records, updateRecord, deleteRecord } = useMaintenanceContext();
  const { id } = useParams();

  const selectedRecord = useMemo(
    () => records.find((record) => record.id === id),
    [records, id],
  );

  const initialData = useMemo<ServiceRecordFormData | null>(
    () => (selectedRecord ? mapRecordToFormData(selectedRecord) : null),
    [selectedRecord],
  );

  const [formData, setFormData] = useState<ServiceRecordFormData | null>(initialData);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof AddServiceFormData, string>>>({});

  useEffect(() => {
    setFormData(initialData);
    setValidationErrors({});
  }, [initialData]);

  const hasChanges = useMemo(
    () => initialData !== null && formData !== null && JSON.stringify(formData) !== JSON.stringify(initialData),
    [formData, initialData],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const fieldName = event.target.name as keyof AddServiceFormData;

    setFormData((previous) => {
      if (!previous) return previous;
      return { ...previous, [event.target.name]: event.target.value };
    });

    setValidationErrors((previous) => {
      if (!previous[fieldName]) return previous;
      const { [fieldName]: _ignored, ...rest } = previous;
      return rest;
    });
  };

  const handleUpdate = () => {
    if (!hasChanges || !id || !formData) return;

    const validationInput: AddServiceFormData = {
      carId: formData.carId,
      serviceName: formData.serviceName,
      date: formData.date,
      kilometers: Number(formData.kilometers),
      nextKilometers: Number(formData.nextKilometers),
      shopName: formData.shopName,
      location: formData.location,
      cost: Number(formData.cost),
      notes: formData.notes,
    };

    const validationResult = validateAddServiceFormData(validationInput);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const nextValidationErrors: Partial<Record<keyof AddServiceFormData, string>> = {};

      (Object.keys(fieldErrors) as Array<keyof AddServiceFormData>).forEach((fieldName) => {
        const fieldMessage = fieldErrors[fieldName]?.[0];
        if (fieldMessage) {
          nextValidationErrors[fieldName] = fieldMessage;
        }
      });

      setValidationErrors(nextValidationErrors);
      return;
    }

    setValidationErrors({});

    const selectedCar = mockCars.find((car) => car.id === formData.carId);
    updateRecord(id, {
      userId: selectedCar?.userId ?? selectedRecord?.userId ?? 'user-001',
      carId: formData.carId,
      serviceType: inferServiceType(formData.serviceName),
      serviceDate: formData.date,
      odometerKm: toSafeNumber(formData.kilometers),
      nextServiceKm: toSafeNumber(formData.nextKilometers),
      providerName: formData.shopName.trim() || 'Unknown Provider',
      providerLocation: formData.location.trim() || 'Unknown Location',
      costUsd: toSafeNumber(formData.cost),
      notes: formData.notes.trim(),
      updatedAt: new Date().toISOString().split('T')[0],
    });

    navigate('/dashboard/records');
  };

  const handleDelete = () => {
    if (!id) return;

    if (window.confirm('Are you sure you want to delete this service record?')) {
      deleteRecord(id);
      navigate('/dashboard/records');
    }
  };

  if (!selectedRecord || !formData) {
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

        <ServiceDetailPanels
          formData={formData}
          carOptions={carSelectOptions}
          onChange={handleChange}
          validationErrors={validationErrors}
        />

        <p className="mt-4 text-xs text-gray-400">Record: {formData.id}</p>
      </div>
    </div>
  );
}
