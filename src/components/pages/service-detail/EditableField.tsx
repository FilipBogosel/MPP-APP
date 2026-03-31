import { Pencil } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, ComponentType } from 'react';
import { cls } from '@/styles/classes';
import type { SelectOption } from '@/types';

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
  errorMessage?: string;
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
  errorMessage,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const inputClasses = isEditing
    ? (dark ? cls.inputEditingDark : cls.inputEditingLight)
    : (dark ? cls.inputDark : cls.inputLightReadOnly);

  const labelClasses = dark
    ? cls.labelSmallCapsDark
    : cls.labelSmallCaps;

  const errorClasses = errorMessage
    ? (dark ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-red-500 focus:border-red-500 focus:ring-red-500')
    : '';

  const fieldClasses = `${inputClasses} ${errorClasses}`;

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
            className={`${fieldClasses} appearance-none`}
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
            className={`${fieldClasses} resize-y pt-2.5`}
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
            className={fieldClasses}
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
      {errorMessage ? (
        <p className={`mt-1 text-xs ${dark ? 'text-red-300' : 'text-red-600'}`}>{errorMessage}</p>
      ) : null}
    </div>
  );
}
