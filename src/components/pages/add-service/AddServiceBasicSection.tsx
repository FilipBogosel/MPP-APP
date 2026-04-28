import { CalendarClock, Car as CarIcon, Gauge, Wrench } from 'lucide-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { AddServiceFormData, SelectOption } from '@/types';

type AddServiceBasicSectionProps = {
  carOptions: ReadonlyArray<SelectOption>;
  errors: FieldErrors<AddServiceFormData>;
  register: UseFormRegister<AddServiceFormData>;
};

const SERVICE_TYPES = [
  { value: 'OIL_CHANGE', label: 'Oil Change' },
  { value: 'BRAKE_SERVICE', label: 'Brake Service' },
  { value: 'TIRE_SERVICE', label: 'Tire Service' },
  { value: 'ENGINE_SERVICE', label: 'Engine Service' },
  { value: 'INSPECTION', label: 'Inspection' },
  { value: 'OTHER', label: 'Other' }
];

const inputClasses =
  'mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20';
const errorClasses = 'text-sm text-rose-600';

export function AddServiceBasicSection({ carOptions, errors, register }: AddServiceBasicSectionProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <label className="space-y-1 text-sm font-medium text-slate-700 md:col-span-2">
        <span className="inline-flex items-center gap-2">
          <CarIcon className="h-4 w-4 text-cyan-700" />
          Vehicle
        </span>
        <select className={inputClasses} {...register('carId')}>
          <option value="">Select a vehicle</option>
          {carOptions.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
        {errors.carId ? <p className={errorClasses}>{errors.carId.message}</p> : null}
      </label>

      {/* REPLACED: serviceName text input is now serviceType select dropdown */}
      <label className="space-y-1 text-sm font-medium text-slate-700 md:col-span-2">
        <span className="inline-flex items-center gap-2">
          <Wrench className="h-4 w-4 text-cyan-700" />
          Service Type
        </span>
        <select className={inputClasses} {...register('serviceType')}>
          <option value="">Select a service type</option>
          {SERVICE_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.serviceType ? <p className={errorClasses}>{errors.serviceType.message}</p> : null}
      </label>

      <label className="space-y-1 text-sm font-medium text-slate-700">
        <span className="inline-flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-cyan-700" />
          Service Date
        </span>
        <input className={inputClasses} type="date" {...register('date')} />
        {errors.date ? <p className={errorClasses}>{errors.date.message}</p> : null}
      </label>

      <label className="space-y-1 text-sm font-medium text-slate-700">
        <span className="inline-flex items-center gap-2">
          <Gauge className="h-4 w-4 text-cyan-700" />
          Current Odometer (km)
        </span>
        <input className={inputClasses} type="number" inputMode="numeric" {...register('kilometers', { valueAsNumber: true })} />
        {errors.kilometers ? <p className={errorClasses}>{errors.kilometers.message}</p> : null}
      </label>

      <label className="space-y-1 text-sm font-medium text-slate-700">
        <span className="inline-flex items-center gap-2">
          <Gauge className="h-4 w-4 text-cyan-700" />
          Next Service Odometer (km)
        </span>
        <input className={inputClasses} type="number" inputMode="numeric" {...register('nextKilometers', { valueAsNumber: true })} />
        {errors.nextKilometers ? <p className={errorClasses}>{errors.nextKilometers.message}</p> : null}
      </label>
    </section>
  );
}