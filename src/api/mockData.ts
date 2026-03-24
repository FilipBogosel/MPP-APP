import type { MaintenanceRecord } from '../types';

export const mockMaintenanceRecords: ReadonlyArray<MaintenanceRecord> = [
  {
    id: 'mr-001', userId: 'user-001', carId: 'car-001', serviceType: 'OIL_CHANGE', serviceDate: '2025-10-15',
    odometerKm: 72000, nextServiceKm: 80000, costUsd: 65, providerName: 'City Auto Care',
    providerLocation: 'Seattle, WA', notes: 'Synthetic oil + filter replacement.',
    createdAt: '2025-10-15', updatedAt: '2025-10-15'
  },
  {
    id: 'mr-002', userId: 'user-001', carId: 'car-001', serviceType: 'BRAKE_SERVICE', serviceDate: '2025-08-22',
    odometerKm: 68000, nextServiceKm: 84000, costUsd: 45, providerName: 'North Garage',
    providerLocation: 'Seattle, WA', notes: 'Brake pad wear check and rotor inspection.',
    createdAt: '2025-08-22', updatedAt: '2025-08-22'
  },
  {
    id: 'mr-003', userId: 'user-002', carId: 'car-002', serviceType: 'TIRE_SERVICE', serviceDate: '2025-07-11',
    odometerKm: 53400, nextServiceKm: 61400, costUsd: 30, providerName: 'WheelWorks',
    providerLocation: 'Portland, OR', notes: 'Tire rotation and pressure rebalance.',
    createdAt: '2025-07-11', updatedAt: '2025-07-11'
  },
  {
    id: 'mr-004', userId: 'user-003', carId: 'car-003', serviceType: 'ENGINE_SERVICE', serviceDate: '2025-05-10',
    odometerKm: 61000, nextServiceKm: 85000, costUsd: 250, providerName: 'Prime Mechanics',
    providerLocation: 'San Jose, CA', notes: 'Spark plugs and coolant system service.',
    createdAt: '2025-05-10', updatedAt: '2025-05-10'
  },
  {
    id: 'mr-005', userId: 'user-002', carId: 'car-004', serviceType: 'INSPECTION', serviceDate: '2025-03-02',
    odometerKm: 40200, nextServiceKm: 48200, costUsd: 120, providerName: 'Downtown Auto Lab',
    providerLocation: 'Austin, TX', notes: 'Comprehensive annual vehicle inspection.',
    createdAt: '2025-03-02', updatedAt: '2025-03-02'
  }
];
