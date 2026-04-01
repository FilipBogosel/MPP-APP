import { mockCars, mockMaintenanceRecords } from '@/api/mockData';
import type { Car, MaintenanceRecord } from '@/types';

function cloneRows<T extends object>(rows: ReadonlyArray<T>): Array<T> {
  return rows.map((row) => ({ ...row }));
}

export async function fetchCars(): Promise<Array<Car>> {
  return cloneRows(mockCars);
}

export async function fetchMaintenanceRecords(): Promise<Array<MaintenanceRecord>> {
  return cloneRows(mockMaintenanceRecords);
}
