import { DollarSign, MapPin, Store } from 'lucide-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { AddServiceFormData } from '@/types';

type AddServiceShopCostSectionProps = {
  errors: FieldErrors<AddServiceFormData>;
  register: UseFormRegister<AddServiceFormData>;
};

const inputClasses =
  'mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20';
const errorClasses = 'text-sm text-rose-600';

export function AddServiceShopCostSection({ errors, register }: AddServiceShopCostSectionProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <label className="space-y-1 text-sm font-medium text-slate-700">
        <span className="inline-flex items-center gap-2">
          <Store className="h-4 w-4 text-cyan-700" />
          Service Shop
        </span>
        <input className={inputClasses} placeholder="AutoFix Workshop" {...register('shopName')} />
        {errors.shopName ? <p className={errorClasses}>{errors.shopName.message}</p> : null}
      </label>

      <label className="space-y-1 text-sm font-medium text-slate-700">
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4 text-cyan-700" />
          Location
        </span>
        <input className={inputClasses} placeholder="Berlin, Germany" {...register('location')} />
        {errors.location ? <p className={errorClasses}>{errors.location.message}</p> : null}
      </label>

      <label className="space-y-1 text-sm font-medium text-slate-700 md:col-span-2">
        <span className="inline-flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-cyan-700" />
          Cost (USD)
        </span>
        <input
          className={inputClasses}
          type="number"
          step="0.01"
          inputMode="decimal"
          placeholder="120.50"
          {...register('cost', { valueAsNumber: true })}
        />
        {errors.cost ? <p className={errorClasses}>{errors.cost.message}</p> : null}
      </label>
    </section>
  );
}
