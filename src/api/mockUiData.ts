import type {
  AnalyticsAnnualItem,
  AnalyticsBreakdownItem,
  AnalyticsImpactItem,
  ImportMappingRow,
  LifecycleMetric,
  LifecycleTimelineItem,
  ServiceRecordFormData,
} from '@/types';

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
