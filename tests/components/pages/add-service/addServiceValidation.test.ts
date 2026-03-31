import { describe, expect, it } from 'vitest';
import { ZodError } from 'zod';
import type { AddServiceFormData } from '@/types';
import { getAddServiceValidationSchema } from '@/components/pages/add-service/addServiceValidation';

const validPayload: AddServiceFormData = {
  carId: 'car-001',
  serviceName: 'Oil Change',
  date: '2026-03-30',
  kilometers: 50000,
  nextKilometers: 60000,
  shopName: 'City Auto Care',
  location: 'Seattle, WA',
  cost: 89.99,
  notes: 'Routine maintenance completed.',
};

describe('addServiceValidation schema', () => {
  it('passes parse() for valid payloads', () => {
    const schema = getAddServiceValidationSchema();

    expect(() => schema.parse(validPayload)).not.toThrow();
    expect(schema.parse(validPayload)).toEqual(validPayload);
  });

  it('throws a Zod validation error for negative costs', () => {
    const schema = getAddServiceValidationSchema();
    const invalidPayload: AddServiceFormData = {
      ...validPayload,
      cost: -10,
    };

    expect(() => schema.parse(invalidPayload)).toThrow(ZodError);
  });

  it('throws a Zod validation error when nextKilometers is less than or equal to kilometers', () => {
    const schema = getAddServiceValidationSchema();

    const equalPayload: AddServiceFormData = {
      ...validPayload,
      kilometers: 70000,
      nextKilometers: 70000,
    };

    const lowerPayload: AddServiceFormData = {
      ...validPayload,
      kilometers: 70000,
      nextKilometers: 65000,
    };

    expect(() => schema.parse(equalPayload)).toThrow(ZodError);
    expect(() => schema.parse(lowerPayload)).toThrow(ZodError);
  });
});