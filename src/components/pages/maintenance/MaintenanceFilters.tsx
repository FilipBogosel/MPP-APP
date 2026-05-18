import { cls } from '@/styles/classes';

type CarOption = { id: string; name: string };

type Props = {
  carOptions: CarOption[];
  selectedCarId: string;
  dateOrder: string;
  onCarChange: (carId: string) => void;
  onDateOrderChange: (order: 'asc' | 'desc') => void;
};

export function MaintenanceFilters({
  carOptions,
  selectedCarId,
  dateOrder,
  onCarChange,
  onDateOrderChange,
}: Props) {
  return (
    <div className="mb-6 grid gap-4 sm:max-w-xl sm:grid-cols-2">
      <div>
        <label htmlFor="carSelect" className={`mb-1 ${cls.label}`}>
          Select your current car
        </label>
        <select
          id="carSelect"
          className="interactive-lift-soft mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-base shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={selectedCarId}
          onChange={(e) => onCarChange(e.target.value)}
        >
          <option value="all">All</option>
          {carOptions.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="dateOrderSelect" className={`mb-1 ${cls.label}`}>
          Date order
        </label>
        <select
          id="dateOrderSelect"
          className="interactive-lift-soft mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-base shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={dateOrder}
          onChange={(e) => onDateOrderChange(e.target.value as 'asc' | 'desc')}
        >
          <option value="desc">Latest first</option>
          <option value="asc">Oldest first (ascending)</option>
        </select>
      </div>
    </div>
  );
}
