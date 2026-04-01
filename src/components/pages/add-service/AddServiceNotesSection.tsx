import { StickyNote } from 'lucide-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { AddServiceFormData } from '@/types';

type AddServiceNotesSectionProps = {
  errors: FieldErrors<AddServiceFormData>;
  register: UseFormRegister<AddServiceFormData>;
};

const inputClasses =
  'mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20';
const errorClasses = 'text-sm text-rose-600';

export function AddServiceNotesSection({ errors, register }: AddServiceNotesSectionProps) {
  return (
    <section>
      <label className="space-y-1 text-sm font-medium text-slate-700">
        <span className="inline-flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-cyan-700" />
          Notes
        </span>
        <textarea className={inputClasses} rows={4} placeholder="Optional details about the service..." {...register('notes')} />
        {errors.notes ? <p className={errorClasses}>{errors.notes.message}</p> : null}
      </label>
      <p className="text-xs text-slate-500">
        Tip: include part replacements, warranty info, or anything that can help with future diagnostics.
      </p>
    </section>
  );
}
