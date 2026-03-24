import { Link } from 'react-router';
import type { ChangeEvent, ComponentType, FormEvent } from 'react';
import type { AddServiceFormData, SelectOption } from '../../../types';
import {
  Building2,
  Calendar,
  Car,
  DollarSign,
  FileText,
  Gauge,
  MapPin,
  UploadCloud,
  Wrench,
} from 'lucide-react';

type Props = {
  formData: AddServiceFormData;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent) => void;
  carOptions: ReadonlyArray<SelectOption>;
};

export function AddServiceForm({ formData, onChange, onSubmit, carOptions }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <form onSubmit={onSubmit} className="space-y-8 p-6 sm:p-8">
        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-medium leading-6 text-gray-900">Basic Details</h3>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div className="sm:col-span-2">
              <label htmlFor="carId" className="block text-sm font-medium text-gray-700">Vehicle</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Car className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="carId"
                  name="carId"
                  value={formData.carId}
                  onChange={onChange}
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 text-sm text-gray-700 outline-none transition-colors focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {carOptions.map((car) => (
                    <option key={car.id} value={car.id}>{car.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <LabeledInput id="serviceName" label="Service Name" icon={Wrench} value={formData.serviceName} onChange={onChange} placeholder="e.g. Oil Change, Brake Pad Replacement" required />
            <LabeledInput id="date" label="Date" icon={Calendar} value={formData.date} onChange={onChange} type="date" required />
            <LabeledInput id="kilometers" label="Current Odometer (km)" icon={Gauge} value={formData.kilometers} onChange={onChange} type="number" placeholder="e.g. 50000" required />
            <LabeledInput id="nextKilometers" label="Next Recommended Service (km)" icon={Gauge} value={formData.nextKilometers} onChange={onChange} type="number" placeholder="e.g. 60000" />
          </div>
        </div>

        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-medium leading-6 text-gray-900">Shop & Cost</h3>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <LabeledInput id="shopName" label="Service Shop Name" icon={Building2} value={formData.shopName} onChange={onChange} placeholder="e.g. Joe's Auto Repair" />
            <LabeledInput id="location" label="Location" icon={MapPin} value={formData.location} onChange={onChange} placeholder="e.g. 123 Main St, City" />
            <LabeledInput id="cost" label="Total Cost" icon={DollarSign} value={formData.cost} onChange={onChange} type="number" placeholder="0.00" />
          </div>
        </div>

        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-medium leading-6 text-gray-900">Notes & Documents</h3>
          <div className="space-y-6">
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Mechanic Notes / Description</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute left-3 top-3 flex items-start">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  name="notes"
                  id="notes"
                  rows={4}
                  placeholder="Any specific observations or future recommendations from the mechanic..."
                  value={formData.notes}
                  onChange={onChange}
                  className="block w-full resize-y rounded-lg border border-gray-300 py-2.5 pl-10 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Upload Receipt or Documents (PDF, Image)</label>
              <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 pb-6 pt-5 transition-colors hover:border-indigo-400">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex justify-center text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white px-1 font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf,image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <div className="flex justify-end gap-3">
            <Link to="/" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
              Cancel
            </Link>
            <button type="submit" className="inline-flex justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
              Save Record
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function LabeledInput({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
}: {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={id}
          id={id}
          required={required}
          min={type === 'number' ? '0' : undefined}
          step={id === 'cost' ? '0.01' : undefined}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
