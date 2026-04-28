import { Pencil } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, ComponentType } from 'react';

import type { SelectOption } from '@/types';

import { EditableFieldControl } from './EditableFieldControl';
import { getEditableFieldStyles } from './editableFieldStyles';

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

  const { fieldClasses, iconClasses, labelClasses } = getEditableFieldStyles({ dark, errorMessage, isEditing });

  return (
    <div className={multiline ? 'w-full sm:col-span-2' : 'w-full'}>
      <label className={labelClasses}>{label}</label>
      <div className="group relative rounded-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 top-0 flex h-10 items-center pl-3">
          <Icon className={`h-5 w-5 ${iconClasses}`} />
        </div>

        <EditableFieldControl
          fieldClasses={fieldClasses}
          isEditing={isEditing}
          multiline={multiline}
          name={name}
          onChange={onChange}
          options={options}
          setIsEditing={setIsEditing}
          type={type}
          value={value}
        />

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
