import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Car } from '@/types';
import { cls } from '@/styles/classes';
import { formFields, initialFormState, type CarFormState } from './garageFormConfig';

type Props = {
  onAddCar: (car: Omit<Car, 'id' | 'userId'>) => Promise<void>;
};

export function GarageForm({ onAddCar }: Props) {
  const [formValues, setFormValues] = useState<CarFormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await onAddCar({
        make: formValues.make.trim(),
        model: formValues.model.trim(),
        year: Number(formValues.year),
        vin: formValues.vin.trim(),
        mileageKm: Number(formValues.mileageKm),
      });
      setFormValues(initialFormState);
    } catch {
      setError('Failed to add car. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${cls.cardPadded} mb-10 space-y-6`}>
      <div className="grid gap-4 md:grid-cols-2">
        {formFields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className={cls.label}>
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type ?? 'text'}
              value={formValues[field.id]}
              onChange={handleChange}
              className={cls.input}
              placeholder={field.placeholder}
              min={field.min}
              required
            />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="vin" className={cls.label}>
          VIN
        </label>
        <input
          id="vin"
          name="vin"
          value={formValues.vin}
          onChange={handleChange}
          className={cls.input}
          placeholder="1HGCM82633A004352"
          required
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className={cls.btnPrimary}>
          Add Car
        </button>
      </div>
      {error !== null && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
    </form>
  );
}
