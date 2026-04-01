import { CalendarClock, Car as CarIcon, Gauge, Wrench } from 'lucide-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { AddServiceFormData, SelectOption } from '@/types';

type AddServiceBasicSectionProps = {
  carOptions: ReadonlyArray<SelectOption>;
  errors: FieldErrors<AddServiceFormData>;
  register: UseFormRegister<AddServiceFormData>;
};

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

      <label className="space-y-1 text-sm font-medium text-slate-700 md:col-span-2">
        <span className="inline-flex items-center gap-2">
          <Wrench className="h-4 w-4 text-cyan-700" />
          Service Name
        </span>
        <input className={inputClasses} placeholder="Oil change" {...register('serviceName')} />
        {errors.serviceName ? <p className={errorClasses}>{errors.serviceName.message}</p> : null}
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
