import { formatServiceType } from '@/components/pages/maintenance/maintenanceUtils';
import type { AddServiceFormData, Car, MaintenanceRecord, ServiceRecordFormData } from '@/types';

import { inferServiceType } from '../add-service/serviceTypeInference';

export type ServiceFormErrors = Partial<Record<keyof AddServiceFormData, string>>;

function toSafeNumber(value: string, fallback = 0) {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

export function mapRecordToFormData(record: MaintenanceRecord): ServiceRecordFormData {
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

export function mapFormToValidationInput(formData: ServiceRecordFormData): AddServiceFormData {
  return {
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
}

export function mapValidationErrors(fieldErrors: Record<string, Array<string> | undefined>): ServiceFormErrors {
  const nextValidationErrors: ServiceFormErrors = {};

  (Object.keys(fieldErrors) as Array<keyof AddServiceFormData>).forEach((fieldName) => {
    const fieldMessage = fieldErrors[fieldName]?.[0];
    if (fieldMessage) {
      nextValidationErrors[fieldName] = fieldMessage;
    }
  });

  return nextValidationErrors;
}

type BuildUpdatedRecordInput = {
  cars: ReadonlyArray<Car>;
  formData: ServiceRecordFormData;
  selectedRecord: MaintenanceRecord;
};

export function buildUpdatedRecord({ cars, formData, selectedRecord }: BuildUpdatedRecordInput): Partial<MaintenanceRecord> {
  const selectedCar = cars.find((car) => car.id === formData.carId);

  return {
    userId: selectedCar?.userId ?? selectedRecord.userId ?? cars[0]?.userId ?? 'user-001',
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
  };
}
