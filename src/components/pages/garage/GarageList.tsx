import type { Car } from '@/types';
import { cls } from '@/styles/classes';

type Props = {
  cars: ReadonlyArray<Car>;
  onRemove: (id: string) => void;
};

export function GarageList({ cars, onRemove }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cars.map((car) => (
        <div key={car.id} className={cls.cardPadded}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {car.year} {car.make} {car.model}
              </h2>
              <p className="text-sm text-gray-600">VIN: {car.vin}</p>
              <p className="text-sm text-gray-600">Mileage: {car.mileageKm} km</p>
            </div>
            <button type="button" className={cls.btnDanger} onClick={() => onRemove(car.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
