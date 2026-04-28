import { Calendar, Car, DollarSign, Gauge, Wrench } from 'lucide-react';
import type { ChangeEvent } from 'react';

import { SERVICE_TYPES } from '@/types';
import type { AddServiceFormData, SelectOption, ServiceRecordFormData } from '@/types';

import { EditableField } from './EditableField';

type ServiceDetailOverviewPanelProps = {
  carOptions: ReadonlyArray<SelectOption>;
  formData: ServiceRecordFormData;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  validationErrors?: Partial<Record<keyof AddServiceFormData, string>>;
};

function formatServiceType(type: string): string {
  return type
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function ServiceDetailOverviewPanel({ carOptions, formData, onChange, validationErrors }: ServiceDetailOverviewPanelProps) {
  const serviceTypeOptions: ReadonlyArray<SelectOption> = SERVICE_TYPES.map((type) => ({
    id: type,
    name: formatServiceType(type),
  }));

  return (
    <div className="relative flex w-full flex-col overflow-hidden bg-slate-800 p-6 sm:w-[35%] sm:p-8">
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-slate-700 opacity-50" />

      <h3 className="relative z-10 mb-8 flex items-center gap-2 text-xl font-bold tracking-tight text-white">
        <Wrench className="h-6 w-6 text-indigo-400" />
        Service Overview
      </h3>

      <div className="relative z-10 flex-1 space-y-6">
        <EditableField label="Select Vehicle" icon={Car} name="carId" value={formData.carId} options={carOptions} dark onChange={onChange} errorMessage={validationErrors?.carId} />
        <EditableField label="Service Type" icon={Wrench} name="serviceType" value={formData.serviceType} options={serviceTypeOptions} dark onChange={onChange} errorMessage={validationErrors?.serviceType} />
        <EditableField label="Current Odometer" icon={Gauge} name="kilometers" type="number" value={formData.kilometers} dark onChange={onChange} errorMessage={validationErrors?.kilometers} />
        <EditableField label="Date" icon={Calendar} name="date" type="date" value={formData.date} dark onChange={onChange} errorMessage={validationErrors?.date} />
      </div>

      <div className="relative z-10 mt-8 border-t border-slate-700 pt-6">
        <EditableField label="Total Cost" icon={DollarSign} name="cost" type="number" value={formData.cost} dark onChange={onChange} errorMessage={validationErrors?.cost} />
      </div>
    </div>
  );
}
