import type { Car } from '@/types';

export const mockCars: ReadonlyArray<Car> = [
  {
    id: 'car-001',
    userId: 'user-001',
    make: 'Toyota',
    model: 'Camry',
    year: 2018,
    vin: '1HGCM82633A100001',
    mileageKm: 72000,
  },
  {
    id: 'car-002',
    userId: 'user-002',
    make: 'Honda',
    model: 'CR-V',
    year: 2021,
    vin: '2FTRX18W1XCA00002',
    mileageKm: 53400,
  },
  {
    id: 'car-003',
    userId: 'user-003',
    make: 'Ford',
    model: 'F-150',
    year: 2015,
    vin: '3FAHP0HA0AR000003',
    mileageKm: 61000,
  },
  {
    id: 'car-004',
    userId: 'user-002',
    make: 'Toyota',
    model: 'Corolla',
    year: 2018,
    vin: '4T1BE46K57U000004',
    mileageKm: 40200,
  },
];
