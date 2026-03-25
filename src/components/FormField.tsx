import type { ChangeEvent, ComponentType } from 'react';
import { cls } from '@/styles/classes';

type Props = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  colSpan2?: boolean;
};

export function FormField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  colSpan2 = false,
}: Props) {
  return (
    <div className={colSpan2 ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className={cls.label}>{label}</label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={id}
          id={id}
          required={required}
          className={cls.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
