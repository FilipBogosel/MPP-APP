import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import {
  createRecord as createRecordApi,
  deleteRecord as deleteRecordApi,
  fetchMaintenanceRecords,
  getAuthHeaders,
  updateRecord as updateRecordApi,
} from '@/api/services/maintenanceApi';
import { clearOfflineQueue, getOfflineQueue } from '@/api/services/syncService';
import { mockCars } from '@/api/mock-data/mockCars';
import type { Car, MaintenanceRecord, SelectOption } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

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

    const syncOfflineData = async () => {
      const offlineQueue = getOfflineQueue();

      if (offlineQueue.length === 0) {
        return;
      }

      for (const action of offlineQueue) {
        const requestBody =
          action.method === 'DELETE'
            ? undefined
            : action.method === 'POST'
              ? (() => {
                  const { id, createdAt, updatedAt, ...payload } = action.payload as any;
                  return JSON.stringify(payload);
                })()
              : JSON.stringify(action.payload);

        const response = await fetch(`${API_URL}${action.endpoint}`, {
          method: action.method,
          headers: getAuthHeaders(),
          body: requestBody,
        });

        if (!response.ok) {
          throw new Error(`Failed to sync queued action ${action.method} ${action.endpoint}`);
        }
      }

      clearOfflineQueue();

      const refreshedRecords = await fetchMaintenanceRecords();

      if (!isMounted) return;
      setRecords(refreshedRecords);
    };

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
    window.addEventListener('online', syncOfflineData);

    return () => {
      isMounted = false;
      window.removeEventListener('online', syncOfflineData);
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
