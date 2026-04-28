import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import {
  createRecord as createRecordApi,
  deleteRecord as deleteRecordApi,
  fetchMaintenanceRecords,
  updateRecord as updateRecordApi,
} from '@/api/services/maintenanceApi';
import { mockCars } from '@/api/mock-data/mockCars';
import type { Car, MaintenanceRecord, SelectOption } from '@/types';

export interface MaintenanceContextValue {
  cars: ReadonlyArray<Car>;
  carOptions: ReadonlyArray<SelectOption>;
  isLoading: boolean;
  records: ReadonlyArray<MaintenanceRecord>;
  addRecord: (record: MaintenanceRecord) => Promise<void>;
  updateRecord: (id: string, record: Partial<MaintenanceRecord>) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
}

const MaintenanceContext = createContext<MaintenanceContextValue | undefined>(undefined);

export function MaintenanceProvider({ children }: PropsWithChildren) {
  const [records, setRecords] = useState<Array<MaintenanceRecord>>([]);
  const [cars, setCars] = useState<Array<Car>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      let nextRecords: Array<MaintenanceRecord> = [];

      try {
        nextRecords = await fetchMaintenanceRecords();
      } catch (error) {
        console.error('Failed to load maintenance records', error);
      }

      if (!isMounted) return;
      setRecords(nextRecords);
      setCars(mockCars);
      setIsLoading(false);
    };

    void load();
    return () => {
      isMounted = false;
    };
  }, []);

  const addRecord = async (record: MaintenanceRecord) => {
    try {
      const savedRecord = await createRecordApi(record);
      setRecords((previous) => [...previous, savedRecord]);
    } catch (error) {
      console.error('Failed to create maintenance record', error);
    }
  };

  const updateRecord = async (id: string, record: Partial<MaintenanceRecord>) => {
    try {
      const savedRecord = await updateRecordApi(id, record);
      setRecords((previous) =>
        previous.map((existingRecord) =>
          existingRecord.id === id
            ? { ...existingRecord, ...savedRecord }
            : existingRecord,
        ),
      );
    } catch (error) {
      console.error('Failed to update maintenance record', error);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      await deleteRecordApi(id);
      setRecords((previous) => previous.filter((record) => record.id !== id));
    } catch (error) {
      console.error('Failed to delete maintenance record', error);
    }
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
