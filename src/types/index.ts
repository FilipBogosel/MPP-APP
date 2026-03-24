export type ISODate = string;

export type MaintenanceServiceType =
  | 'OIL_CHANGE'
  | 'BRAKE_SERVICE'
  | 'TIRE_SERVICE'
  | 'ENGINE_SERVICE'
  | 'INSPECTION'
  | 'OTHER';

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  dateOfBirth: ISODate;
  createdAt: ISODate;
}

export interface Car {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  mileageKm: number;
}

export interface MaintenanceRecord {
  id: string;
  userId: string;
  carId: string;
  serviceType: MaintenanceServiceType;
  serviceDate: ISODate;
  odometerKm: number;
  nextServiceKm: number;
  costUsd: number;
  providerName: string;
  providerLocation: string;
  notes: string;
  createdAt: ISODate;
  updatedAt: ISODate;
}

export type {
  AddServiceFormData,
  AnalyticsAnnualItem,
  AnalyticsBreakdownItem,
  AnalyticsImpactItem,
  ImportMappingRow,
  LifecycleMetric,
  LifecycleTimelineItem,
  MaintenanceListItem,
  SelectOption,
  ServiceRecordFields,
  ServiceRecordFormData,
} from './viewModels';
