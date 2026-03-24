import type {
  AnalyticsAnnualItem,
  AnalyticsBreakdownItem,
  AnalyticsImpactItem,
  Car,
  ImportMappingRow,
  LifecycleMetric,
  LifecycleTimelineItem,
  MaintenanceListItem,
  MaintenanceRecord,
  SelectOption,
  ServiceRecordFormData,
  User,
} from '../types';

export const mockUsers: ReadonlyArray<User> = [
  {
    id: 'user-001',
    username: 'driver01',
    fullName: 'Avery Stone',
    email: 'avery@example.com',
    dateOfBirth: '1991-03-17',
    createdAt: '2022-10-01',
  },
  {
    id: 'user-002',
    username: 'speedline',
    fullName: 'Maya Brooks',
    email: 'maya@example.com',
    dateOfBirth: '1994-11-02',
    createdAt: '2023-01-14',
  },
  {
    id: 'user-003',
    username: 'citycommuter',
    fullName: 'Liam Chen',
    email: 'liam@example.com',
    dateOfBirth: '1988-06-29',
    createdAt: '2024-03-18',
  },
];

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

export const maintenanceListData: ReadonlyArray<MaintenanceListItem> = [
  { id: '1', name: 'Oil Change', date: '2025-10-15', mileage: '72,000', nextMileage: '80,000', cost: 65 },
  { id: '2', name: 'Brake Inspection', date: '2025-08-22', mileage: '68,000', nextMileage: '84,000', cost: 45 },
  { id: '3', name: 'Tire Rotation', date: '2025-08-22', mileage: '68,000', nextMileage: '76,000', cost: 30 },
  { id: '4', name: 'Air Filter Replacement', date: '2025-05-10', mileage: '61,000', nextMileage: '85,000', cost: 25 },
  { id: '5', name: 'Spark Plug Replacement', date: '2024-11-05', mileage: '48,000', nextMileage: '96,000', cost: 120 },
  { id: '6', name: 'Coolant Flush', date: '2024-09-12', mileage: '45,000', nextMileage: '93,000', cost: 150 },
  { id: '7', name: 'Transmission Fluid Change', date: '2024-06-20', mileage: '40,000', nextMileage: '88,000', cost: 250 },
  { id: '8', name: 'Wiper Blade Replacement', date: '2024-04-15', mileage: '35,000', nextMileage: '51,000', cost: 40 },
  { id: '9', name: 'Battery Replacement', date: '2023-12-01', mileage: '29,000', nextMileage: '109,000', cost: 200 },
  { id: '10', name: 'Oil Change', date: '2023-10-10', mileage: '24,000', nextMileage: '32,000', cost: 60 },
  { id: '11', name: 'Tire Rotation', date: '2023-10-10', mileage: '24,000', nextMileage: '32,000', cost: 30 },
  { id: '12', name: 'Brake Pad Replacement', date: '2023-05-22', mileage: '16,000', nextMileage: '64,000', cost: 450 },
  { id: '13', name: 'Engine Overhaul', date: '2023-01-14', mileage: '8,000', nextMileage: '32,000', cost: 1200 },
  { id: '14', name: 'Initial Inspection', date: '2022-10-01', mileage: '800', nextMileage: '8,000', cost: 150 },
];

export const analyticsExpenditureData: ReadonlyArray<AnalyticsBreakdownItem> = [
  { name: 'Oil Changes', value: 450 },
  { name: 'Brake Inspections', value: 800 },
  { name: 'Tire Rotations', value: 300 },
  { name: 'Other Services', value: 600 },
];

export const analyticsImpactData: ReadonlyArray<AnalyticsImpactItem> = [
  { name: 'Routine', count: 15 },
  { name: 'Significant', count: 4 },
  { name: 'Overhaul', count: 1 },
];

export const analyticsAnnualData: ReadonlyArray<AnalyticsAnnualItem> = [
  { month: 'Jan', cost: 100 },
  { month: 'Feb', cost: 0 },
  { month: 'Mar', cost: 250 },
  { month: 'Apr', cost: 45 },
  { month: 'May', cost: 0 },
  { month: 'Jun', cost: 600 },
  { month: 'Jul', cost: 0 },
  { month: 'Aug', cost: 120 },
  { month: 'Sep', cost: 0 },
  { month: 'Oct', cost: 90 },
  { month: 'Nov', cost: 0 },
  { month: 'Dec', cost: 1500 },
];

export const lifecycleMetrics: ReadonlyArray<LifecycleMetric> = [
  {
    title: 'Calculated Driving Average',
    value: '42 km/day',
    subtitle: 'Based on 90-day Weighted Moving Average.',
    tone: 'indigo',
  },
  {
    title: 'Projected 12-Month Budget',
    value: '$1,835.00',
    subtitle: 'Estimated cost of upcoming lifecycle events.',
    tone: 'emerald',
  },
];

export const lifecycleTimeline: ReadonlyArray<LifecycleTimelineItem> = [
  { level: 'Routine', title: 'Oil Change', date: 'May 26, 2026', estimate: '$85.00' },
  { level: 'Warning', title: 'Timing Belt Limit', date: 'Aug 12, 2026', estimate: '$400.00' },
  { level: 'Critical', title: 'Clutch Assembly', date: 'Oct 05, 2026', estimate: '$1,200.00' },
  { level: 'Routine', title: 'Brake Pads', date: 'Dec 15, 2026', estimate: '$150.00' },
  { level: 'Warning', title: 'Spark Plugs', date: 'Apr 10, 2027', estimate: '$350.00' },
  { level: 'Critical', title: 'Suspension Overhaul', date: 'Jul 01, 2027', estimate: '$850.00' },
];

export const importMappingRows: ReadonlyArray<ImportMappingRow> = [
  { id: 'row-1', source: 'Odometer (km/miles)', status: 'mapped', mappedLabel: 'Mileage' },
  { id: 'row-2', source: 'Diagnostic Trouble Codes (DTCs) Found', status: 'mapped', mappedLabel: 'Vehicle Health: Fault Codes' },
  { id: 'row-3', source: 'Average Fuel Economy (L/100km)', status: 'mapped', mappedLabel: 'Performance: Fuel Economy' },
  { id: 'row-4', source: 'Engine Coolant Temperature (Average)', status: 'mapped', mappedLabel: 'Vehicle Health: Cooling' },
  { id: 'row-5', source: 'System Battery Voltage (Average)', status: 'mapped', mappedLabel: 'Vehicle Health: Electrical' },
  { id: 'row-6', source: 'Intake Air Temperature', status: 'missing' },
];

export const serviceDetailSeed: ServiceRecordFormData = {
  id: '1',
  carId: 'car-001',
  serviceName: 'Oil Change',
  date: '2025-10-15',
  kilometers: '72000',
  nextKilometers: '80000',
  shopName: "Joe's Auto Repair",
  location: '123 Main St, City',
  cost: '85.00',
  notes: 'Everything looks good. Brake pads have about 30% life left.',
};

export const carSelectOptions: ReadonlyArray<SelectOption> = [
  { id: 'car-001', name: '2018 Toyota Camry' },
  { id: 'car-002', name: '2021 Honda CR-V' },
  { id: 'car-003', name: '2015 Ford F-150' },
];
