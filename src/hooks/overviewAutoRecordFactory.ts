import { faker } from '@faker-js/faker';

import type { MaintenanceRecord, MaintenanceServiceType } from '@/types';

export const AUTO_ADD_INTERVAL_MS = 5000;

const AUTO_SERVICE_TYPES: ReadonlyArray<MaintenanceServiceType> = [
  'OIL_CHANGE',
  'BRAKE_SERVICE',
  'TIRE_SERVICE',
  'ENGINE_SERVICE',
  'INSPECTION',
  'OTHER',
];

const SERVICE_BASE_COST: Record<MaintenanceServiceType, number> = {
  OIL_CHANGE: 72,
  BRAKE_SERVICE: 180,
  TIRE_SERVICE: 95,
  ENGINE_SERVICE: 420,
  INSPECTION: 125,
  OTHER: 80,
};

function toIsoDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function createAutoRecord(sequence: number): MaintenanceRecord {
  const carId = `auto-car-${sequence}-${faker.string.alphanumeric(6).toLowerCase()}`;
  const userId = `auto-user-${faker.string.alphanumeric(8).toLowerCase()}`;
  const serviceType = faker.helpers.arrayElement(AUTO_SERVICE_TYPES);
  const serviceDate = toIsoDateOnly(faker.date.recent({ days: 45 }));
  const odometerKm = faker.number.int({ min: 18000, max: 220000 });
  const vehicleTitle = `${faker.number.int({ min: 2008, max: 2026 })} ${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`;
  const costUsd = Number((SERVICE_BASE_COST[serviceType] + faker.number.int({ min: 5, max: 90 })).toFixed(2));

  return {
    id: `auto-${faker.string.uuid()}`,
    userId,
    carId,
    serviceType,
    serviceDate,
    odometerKm,
    nextServiceKm: odometerKm + faker.number.int({ min: 4000, max: 9000 }),
    costUsd,
    providerName: faker.company.name(),
    providerLocation: faker.location.city(),
    notes: `Generated for ${vehicleTitle} every ${AUTO_ADD_INTERVAL_MS / 1000} seconds for analytics simulation.`,
    createdAt: serviceDate,
    updatedAt: serviceDate,
  };
}
