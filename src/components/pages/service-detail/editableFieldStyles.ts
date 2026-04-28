import { cls } from '@/styles/classes';

type EditableFieldStyleOptions = {
  dark: boolean;
  errorMessage?: string;
  isEditing: boolean;
};

export function getEditableFieldStyles({ dark, errorMessage, isEditing }: EditableFieldStyleOptions) {
  const inputClasses = isEditing
    ? (dark ? cls.inputEditingDark : cls.inputEditingLight)
    : (dark ? cls.inputDark : cls.inputLightReadOnly);

  const errorClasses = errorMessage
    ? (dark ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-red-500 focus:border-red-500 focus:ring-red-500')
    : '';

  return {
    fieldClasses: `${inputClasses} ${errorClasses}`,
    iconClasses: dark ? 'text-slate-400' : 'text-gray-400',
    labelClasses: dark ? cls.labelSmallCapsDark : cls.labelSmallCaps,
  };
}
