import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { fetchCars, fetchMaintenanceRecords } from '@/api/services/maintenanceApi';
import type { Car, MaintenanceRecord, SelectOption } from '@/types';

export interface MaintenanceContextValue {
  cars: ReadonlyArray<Car>;
  carOptions: ReadonlyArray<SelectOption>;
  isLoading: boolean;
  records: ReadonlyArray<MaintenanceRecord>;
  addRecord: (record: MaintenanceRecord) => void;
  updateRecord: (id: string, record: Partial<MaintenanceRecord>) => void;
  deleteRecord: (id: string) => void;
}

const MaintenanceContext = createContext<MaintenanceContextValue | undefined>(undefined);

export function MaintenanceProvider({ children }: PropsWithChildren) {
  const [records, setRecords] = useState<Array<MaintenanceRecord>>([]);
  const [cars, setCars] = useState<Array<Car>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const [nextRecords, nextCars] = await Promise.all([
        fetchMaintenanceRecords(),
        fetchCars(),
      ]);

      if (!isMounted) return;
      setRecords(nextRecords);
      setCars(nextCars);
      setIsLoading(false);
    };

    void load();
    return () => {
      isMounted = false;
    };
  }, []);

  const addRecord = (record: MaintenanceRecord) => {
    setRecords((previous) => [...previous, record]);
  };

  const updateRecord = (id: string, record: Partial<MaintenanceRecord>) => {
    setRecords((previous) =>
      previous.map((existingRecord) =>
        existingRecord.id === id
          ? { ...existingRecord, ...record, id: existingRecord.id }
          : existingRecord,
      ),
    );
  };

  const deleteRecord = (id: string) => {
    setRecords((previous) => previous.filter((record) => record.id !== id));
  };

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
      addRecord,
      updateRecord,
      deleteRecord,
    }),
    [cars, carOptions, isLoading, records],
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
