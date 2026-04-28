import type { MaintenanceServiceType } from '@/types';

const SERVICE_TYPES: ReadonlyArray<MaintenanceServiceType> = [
  'OIL_CHANGE',
  'BRAKE_SERVICE',
  'TIRE_SERVICE',
  'ENGINE_SERVICE',
  'INSPECTION',
  'OTHER',
];

export function inferServiceType(serviceName: string): MaintenanceServiceType {
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
