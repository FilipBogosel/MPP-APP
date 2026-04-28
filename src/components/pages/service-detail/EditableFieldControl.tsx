import type { ChangeEvent } from 'react';

import type { SelectOption } from '@/types';

type EditableFieldControlProps = {
  fieldClasses: string;
  isEditing: boolean;
  multiline: boolean;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  options?: ReadonlyArray<SelectOption>;
  setIsEditing: (value: boolean) => void;
  type: string;
  value: string;
};

export function EditableFieldControl({
  fieldClasses,
  isEditing,
  multiline,
  name,
  onChange,
  options,
  setIsEditing,
  type,
  value,
}: EditableFieldControlProps) {
  if (options) {
    return (
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
    );
  }

  if (multiline) {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        readOnly={!isEditing}
        onBlur={() => setIsEditing(false)}
        rows={4}
        className={`${fieldClasses} resize-y pt-2.5`}
      />
    );
  }

  return (
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
  );
}
