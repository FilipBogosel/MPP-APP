import { createContext, useContext, useMemo, type PropsWithChildren } from 'react';
import type { Car, MaintenanceRecord, SelectOption } from '@/types';
import { useMaintenanceActions } from './maintenance/useMaintenanceActions';
import { useMaintenanceData } from './maintenance/useMaintenanceData';
import { useMaintenanceSocket } from './maintenance/useMaintenanceSocket';

export interface MaintenanceContextValue {
  cars: ReadonlyArray<Car>;
  carOptions: ReadonlyArray<SelectOption>;
  isLoading: boolean;
  records: ReadonlyArray<MaintenanceRecord>;
  addCar: (car: Omit<Car, 'id' | 'userId'>) => Promise<void>;
  removeCar: (id: string) => Promise<void>;
  addRecord: (record: MaintenanceRecord) => Promise<void>;
  updateRecord: (id: string, record: Partial<MaintenanceRecord>) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
}

const MaintenanceContext = createContext<MaintenanceContextValue | undefined>(undefined);

export function MaintenanceProvider({ children }: PropsWithChildren) {
  const { cars, records, isLoading, setCars, setRecords } = useMaintenanceData();
  useMaintenanceSocket(setRecords);
  const { addCar, removeCar, addRecord, updateRecord, deleteRecord } =
    useMaintenanceActions({ setCars, setRecords });

  const carOptions = useMemo<ReadonlyArray<SelectOption>>(
    () => cars.map((car) => ({ id: car.id, name: `${car.year} ${car.make} ${car.model}` })),
    [cars],
  );

  const value = useMemo(
    () => ({
      cars,
      carOptions,
      isLoading,
      records,
      addCar,
      removeCar,
      addRecord,
      updateRecord,
      deleteRecord,
    }),
    [
      cars,
      carOptions,
      isLoading,
      records,
      addCar,
      removeCar,
      addRecord,
      updateRecord,
      deleteRecord,
    ],
  );

  return (
    <MaintenanceContext.Provider value={value}>
      {children}
    </MaintenanceContext.Provider>
  );
}

export function useMaintenanceContext() {
  const context = useContext(MaintenanceContext);

  if (!context) {
    throw new Error('useMaintenanceContext must be used within MaintenanceProvider.');
  }

  return context;
}
