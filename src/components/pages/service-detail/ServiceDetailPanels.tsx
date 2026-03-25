import {
  Building2,
  Calendar,
  Car,
  DollarSign,
  FileText,
  Gauge,
  LayoutTemplate,
  MapPin,
  Wrench,
} from 'lucide-react';
import type { ChangeEvent } from 'react';
import { cls } from '@/styles/classes';
import type { SelectOption, ServiceRecordFormData } from '@/types';
import { EditableField } from './EditableField';

type Props = {
  formData: ServiceRecordFormData;
  carOptions: ReadonlyArray<SelectOption>;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

export function ServiceDetailPanels({ formData, carOptions, onChange }: Props) {
  return (
    <div className="flex min-h-[600px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:flex-row">
      <div className="relative flex w-full flex-col overflow-hidden bg-slate-800 p-6 sm:w-[35%] sm:p-8">
        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-slate-700 opacity-50" />

        <h3 className="relative z-10 mb-8 flex items-center gap-2 text-xl font-bold tracking-tight text-white">
          <Wrench className="h-6 w-6 text-indigo-400" />
          Service Overview
        </h3>

        <div className="relative z-10 flex-1 space-y-6">
          <EditableField label="Select Vehicle" icon={Car} name="carId" value={formData.carId} options={carOptions} dark onChange={onChange} />
          <EditableField label="Service Type" icon={Wrench} name="serviceName" value={formData.serviceName} dark onChange={onChange} />
          <EditableField label="Current Odometer" icon={Gauge} name="kilometers" type="number" value={formData.kilometers} dark onChange={onChange} />
          <EditableField label="Date" icon={Calendar} name="date" type="date" value={formData.date} dark onChange={onChange} />
        </div>

        <div className="relative z-10 mt-8 border-t border-slate-700 pt-6">
          <EditableField label="Total Cost" icon={DollarSign} name="cost" type="number" value={formData.cost} dark onChange={onChange} />
        </div>
      </div>

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
                <EditableField label="Shop Name" icon={Building2} name="shopName" value={formData.shopName} onChange={onChange} />
                <EditableField label="Location" icon={MapPin} name="location" value={formData.location} onChange={onChange} />
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
    </div>
  );
}
