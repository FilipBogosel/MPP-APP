import { z } from 'zod';
import type { AddServiceFormData } from '@/types';

const addServiceValidationSchema = z
  .object({
    carId: z.string().trim().min(1, 'Vehicle is required.'),
    serviceName: z.string().trim().min(2, 'Service name is required.'),
    date: z
      .string()
      .trim()
      .min(1, 'Date is required.')
      .refine((value) => !Number.isNaN(Date.parse(value)), 'Date is invalid.'),
    kilometers: z.number({
      required_error: 'Current odometer is required.',
      invalid_type_error: 'Current odometer must be a positive number.',
    }).positive('Current odometer must be a positive number.'),
    nextKilometers: z.number({
      required_error: 'Next recommended service is required.',
      invalid_type_error: 'Next recommended service must be a positive number.',
    }).positive('Next recommended service must be a positive number.'),
    shopName: z.string().trim().min(2, 'Service shop name is required.'),
    location: z.string().trim().min(2, 'Location is required.'),
    cost: z.number({
      required_error: 'Total cost is required.',
      invalid_type_error: 'Cost must be a positive number.',
    }).positive('Cost must be a positive number.'),
    notes: z.string().trim().min(5, 'Notes must be at least 5 characters.'),
  })
  .strict()
  .refine(
    (values) => values.nextKilometers > values.kilometers,
    {
      path: ['nextKilometers'],
      message: 'Next recommended service must be greater than current odometer.',
    },
  );

export function getAddServiceValidationSchema() {
  return addServiceValidationSchema;
}

export function validateAddServiceFormData(values: AddServiceFormData) {
  return getAddServiceValidationSchema().safeParse(values);
}