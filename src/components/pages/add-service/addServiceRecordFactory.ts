import type { AddServiceFormData, Car, MaintenanceRecord, MaintenanceServiceType } from '@/types';

const SERVICE_TYPES: ReadonlyArray<MaintenanceServiceType> = [
  'OIL_CHANGE',
  'BRAKE_SERVICE',
  'TIRE_SERVICE',
  'ENGINE_SERVICE',
  'INSPECTION',
  'OTHER',
];

function createRecordId() {
  return crypto.randomUUID();
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

type BuildRecordInput = {
  cars: ReadonlyArray<Car>;
  formData: AddServiceFormData;
  today: string;
};

export function buildMaintenanceRecord({ cars, formData, today }: BuildRecordInput): MaintenanceRecord {
  const selectedCar = cars.find((car) => car.id === formData.carId);

  return {
    id: createRecordId(),
    userId: selectedCar?.userId ?? cars[0]?.userId ?? 'user-001',
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
}
