import type { SelectOption } from '@/types';

import { mockCars } from './mock-data/mockCars';
import { mockMaintenanceRecords } from './mock-data/mockMaintenanceRecords';
import { mockUsers } from './mock-data/mockUsers';

export { mockCars, mockMaintenanceRecords, mockUsers };

export const carSelectOptions: ReadonlyArray<SelectOption> = mockCars.map((car) => ({
  id: car.id,
  name: `${car.year} ${car.make} ${car.model}`,
}));
