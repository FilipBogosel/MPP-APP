import type { MaintenanceRecord } from '@/types';

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
  },
  {
    id: 'mr-006', userId: 'user-001', carId: 'car-001', serviceType: 'ENGINE_SERVICE', serviceDate: '2024-09-12',
    odometerKm: 45000, nextServiceKm: 93000, costUsd: 150, providerName: 'Prime Mechanics',
    providerLocation: 'Seattle, WA', notes: 'Coolant flush and diagnostic sweep.',
    createdAt: '2024-09-12', updatedAt: '2024-09-12'
  },
  {
    id: 'mr-007', userId: 'user-001', carId: 'car-001', serviceType: 'ENGINE_SERVICE', serviceDate: '2024-06-20',
    odometerKm: 40000, nextServiceKm: 88000, costUsd: 250, providerName: 'North Garage',
    providerLocation: 'Seattle, WA', notes: 'Transmission fluid and tune check.',
    createdAt: '2024-06-20', updatedAt: '2024-06-20'
  },
  {
    id: 'mr-008', userId: 'user-002', carId: 'car-002', serviceType: 'OTHER', serviceDate: '2024-04-15',
    odometerKm: 35000, nextServiceKm: 51000, costUsd: 40, providerName: 'WheelWorks',
    providerLocation: 'Portland, OR', notes: 'Wiper blade replacement.',
    createdAt: '2024-04-15', updatedAt: '2024-04-15'
  },
  {
    id: 'mr-009', userId: 'user-002', carId: 'car-002', serviceType: 'OTHER', serviceDate: '2023-12-01',
    odometerKm: 29000, nextServiceKm: 109000, costUsd: 200, providerName: 'Downtown Auto Lab',
    providerLocation: 'Austin, TX', notes: 'Battery replacement and charging test.',
    createdAt: '2023-12-01', updatedAt: '2023-12-01'
  },
  {
    id: 'mr-010', userId: 'user-001', carId: 'car-001', serviceType: 'OIL_CHANGE', serviceDate: '2023-10-10',
    odometerKm: 24000, nextServiceKm: 32000, costUsd: 60, providerName: 'City Auto Care',
    providerLocation: 'Seattle, WA', notes: 'Oil and filter package.',
    createdAt: '2023-10-10', updatedAt: '2023-10-10'
  },
  {
    id: 'mr-011', userId: 'user-001', carId: 'car-001', serviceType: 'TIRE_SERVICE', serviceDate: '2023-10-10',
    odometerKm: 24000, nextServiceKm: 32000, costUsd: 30, providerName: 'WheelWorks',
    providerLocation: 'Seattle, WA', notes: 'Tire rotation and balancing.',
    createdAt: '2023-10-10', updatedAt: '2023-10-10'
  },
  {
    id: 'mr-012', userId: 'user-003', carId: 'car-003', serviceType: 'BRAKE_SERVICE', serviceDate: '2023-05-22',
    odometerKm: 16000, nextServiceKm: 64000, costUsd: 450, providerName: 'Prime Mechanics',
    providerLocation: 'San Jose, CA', notes: 'Brake pad and rotor replacement.',
    createdAt: '2023-05-22', updatedAt: '2023-05-22'
  },
  {
    id: 'mr-013', userId: 'user-003', carId: 'car-003', serviceType: 'ENGINE_SERVICE', serviceDate: '2023-01-14',
    odometerKm: 8000, nextServiceKm: 32000, costUsd: 1200, providerName: 'Prime Mechanics',
    providerLocation: 'San Jose, CA', notes: 'Engine overhaul and gasket kit.',
    createdAt: '2023-01-14', updatedAt: '2023-01-14'
  },
  {
    id: 'mr-014', userId: 'user-001', carId: 'car-001', serviceType: 'INSPECTION', serviceDate: '2022-10-01',
    odometerKm: 800, nextServiceKm: 8000, costUsd: 150, providerName: 'City Auto Care',
    providerLocation: 'Seattle, WA', notes: 'Initial inspection and onboarding check.',
    createdAt: '2022-10-01', updatedAt: '2022-10-01'
  }
];
