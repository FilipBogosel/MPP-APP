import type { ChangeEvent } from 'react';

import type { AddServiceFormData, SelectOption, ServiceRecordFormData } from '@/types';

import { ServiceDetailInformationPanel } from './ServiceDetailInformationPanel';
import { ServiceDetailOverviewPanel } from './ServiceDetailOverviewPanel';

type Props = {
  formData: ServiceRecordFormData;
  carOptions: ReadonlyArray<SelectOption>;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  validationErrors?: Partial<Record<keyof AddServiceFormData, string>>;
};

export function ServiceDetailPanels({ formData, carOptions, onChange, validationErrors }: Props) {
  return (
    <div className="flex min-h-[600px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:flex-row">
      <ServiceDetailOverviewPanel
        carOptions={carOptions}
        formData={formData}
        onChange={onChange}
        validationErrors={validationErrors}
      />
      <ServiceDetailInformationPanel
        formData={formData}
        onChange={onChange}
        validationErrors={validationErrors}
      />
    </div>
  );
}
