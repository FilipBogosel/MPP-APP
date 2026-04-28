import type { MaintenanceListItem, MaintenanceRecord } from '@/types';

import { formatServiceType } from '@/components/pages/maintenance/maintenanceUtils';

export function filterRecordsByCar(records: ReadonlyArray<MaintenanceRecord>, selectedCarId: string) {
  return selectedCarId === 'all'
    ? records
    : records.filter((record) => record.carId === selectedCarId);
}

export function sortRecordsByDate(records: ReadonlyArray<MaintenanceRecord>, dateOrder: 'desc' | 'asc') {
  return [...records].sort((a, b) => {
    const dateA = new Date(a.serviceDate).getTime();
    const dateB = new Date(b.serviceDate).getTime();

    return dateOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

export function mapRecordsToMaintenanceRows(records: ReadonlyArray<MaintenanceRecord>): ReadonlyArray<MaintenanceListItem> {
  return records.map((record) => ({
    id: record.id,
    name: formatServiceType(record.serviceType),
    date: record.serviceDate,
    mileage: record.odometerKm.toLocaleString('en-US'),
    nextMileage: record.nextServiceKm.toLocaleString('en-US'),
    cost: record.costUsd,
  }));
}
