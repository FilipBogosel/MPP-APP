import { Pencil } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, ComponentType } from 'react';
import type { SelectOption } from '../../../types';

type Props = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type?: string;
  options?: ReadonlyArray<SelectOption>;
  multiline?: boolean;
  dark?: boolean;
};

export function EditableField({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  type = 'text',
  options,
  multiline = false,
  dark = false,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const inputClasses = isEditing
    ? `block w-full rounded-lg border-2 py-2.5 pl-10 pr-10 text-sm outline-none transition-colors ${
        dark ? 'border-indigo-400 bg-slate-700 text-white' : 'border-indigo-500 bg-white text-gray-900'
      }`
    : `block w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm outline-none transition-colors ${
        dark ? 'border-slate-600 bg-slate-800/50 text-white' : 'border-gray-200 bg-gray-50 text-gray-900'
      }`;

  const labelClasses = dark
    ? 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400'
    : 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500';

  const iconClasses = dark ? 'text-slate-400' : 'text-gray-400';

  return (
    <div className={multiline ? 'w-full sm:col-span-2' : 'w-full'}>
      <label className={labelClasses}>{label}</label>
      <div className="group relative rounded-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 top-0 flex h-10 items-center pl-3">
          <Icon className={`h-5 w-5 ${iconClasses}`} />
        </div>

        {options ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={!isEditing}
            onBlur={() => setIsEditing(false)}
            className={`${inputClasses} appearance-none`}
          >
            {options.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-white text-gray-900">
                {opt.name}
              </option>
            ))}
          </select>
        ) : multiline ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            readOnly={!isEditing}
            onBlur={() => setIsEditing(false)}
            rows={4}
            className={`${inputClasses} resize-y pt-2.5`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            readOnly={!isEditing}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') setIsEditing(false);
            }}
            className={inputClasses}
          />
        )}

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className={`absolute right-3 top-2.5 cursor-pointer border-none bg-transparent p-0 transition-colors ${
              dark ? 'text-slate-500 hover:text-indigo-300' : 'text-gray-400 hover:text-indigo-600'
            }`}
            title="Edit field"
          >
            <Pencil className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
