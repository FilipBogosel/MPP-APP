export type SelectOption = {
  id: string;
  name: string;
};

export type MaintenanceListItem = {
  id: string;
  name: string;
  date: string;
  mileage: string;
  nextMileage: string;
  cost: number;
};

export type AnalyticsBreakdownItem = { name: string; value: number };
export type AnalyticsImpactItem = { name: string; count: number };
export type AnalyticsAnnualItem = { month: string; cost: number };

export type LifecycleMetric = {
  title: string;
  value: string;
  subtitle: string;
  tone: "indigo" | "emerald";
};

export type LifecycleTimelineItem = {
  level: "Routine" | "Warning" | "Critical";
  title: string;
  date: string;
  estimate: string;
};

export type ImportMappingRow = {
  id: string;
  source: string;
  status: "mapped" | "missing";
  mappedLabel?: string;
};

export type ServiceRecordFields = {
  carId: string;
  serviceType:
    | "OIL_CHANGE"
    | "BRAKE_SERVICE"
    | "TIRE_SERVICE"
    | "ENGINE_SERVICE"
    | "INSPECTION"
    | "OTHER";
  date: string;
  kilometers: string;
  nextKilometers: string;
  shopName: string;
  location: string;
  cost: string;
  notes: string;
};

export type AddServiceFormData = Omit<
  ServiceRecordFields,
  "kilometers" | "nextKilometers" | "cost"
> & {
  kilometers: number;
  nextKilometers: number;
  cost: number;
};

export type ServiceRecordFormData = ServiceRecordFields & {
  id: string;
};
