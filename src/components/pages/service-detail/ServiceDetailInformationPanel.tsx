import { Building2, FileText, Gauge, LayoutTemplate, MapPin } from 'lucide-react';
import type { ChangeEvent } from 'react';

import { cls } from '@/styles/classes';
import type { AddServiceFormData, ServiceRecordFormData } from '@/types';

import { EditableField } from './EditableField';

type ServiceDetailInformationPanelProps = {
  formData: ServiceRecordFormData;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  validationErrors?: Partial<Record<keyof AddServiceFormData, string>>;
};

export function ServiceDetailInformationPanel({ formData, onChange, validationErrors }: ServiceDetailInformationPanelProps) {
  return (
    <div className="flex w-full flex-col overflow-y-auto bg-[#fcfcfc] p-6 sm:w-[65%] sm:p-8">
      <div className="mb-8 flex items-center gap-2 border-b border-gray-200/80 pb-4">
        <LayoutTemplate className="h-6 w-6 text-indigo-500" />
        <h3 className="text-xl font-semibold text-gray-800">Detailed Information</h3>
      </div>

      <div className="space-y-8">
        <section>
          <h4 className={cls.sectionTitle}>Provider & Location</h4>
          <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <EditableField label="Shop Name" icon={Building2} name="shopName" value={formData.shopName} onChange={onChange} errorMessage={validationErrors?.shopName} />
              <EditableField label="Location" icon={MapPin} name="location" value={formData.location} onChange={onChange} errorMessage={validationErrors?.location} />
            </div>
          </div>
        </section>

        <section>
          <h4 className={cls.sectionTitle}>Future Planning</h4>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <EditableField
              label="Next Recommended Service (km)"
              icon={Gauge}
              name="nextKilometers"
              type="number"
              value={formData.nextKilometers}
              onChange={onChange}
              errorMessage={validationErrors?.nextKilometers}
            />
          </div>
        </section>

        <section>
          <h4 className={cls.sectionTitle}>Materials, Notes & Documents</h4>
          <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <EditableField
              label="Mechanic Notes / Description"
              icon={FileText}
              name="notes"
              value={formData.notes}
              multiline
              onChange={onChange}
              errorMessage={validationErrors?.notes}
            />

            <div className="border-t border-gray-100 pt-4">
              <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-gray-500">Attached Documents</label>
              <div className="flex max-w-md cursor-pointer items-center rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                <FileText className="mr-3 h-6 w-6 text-indigo-500" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">receipt_oil_change.pdf</p>
                  <p className="text-xs text-gray-500">245 KB</p>
                </div>
                <span className="ml-2 border-l border-gray-200 px-3 text-sm font-medium text-indigo-600 hover:text-indigo-900">View</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
