import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { mockMaintenanceRecords } from '@/api/mockData';
import type { MaintenanceRecord } from '@/types';

export interface MaintenanceContextValue {
  records: ReadonlyArray<MaintenanceRecord>;
  addRecord: (record: MaintenanceRecord) => void;
  updateRecord: (id: string, record: Partial<MaintenanceRecord>) => void;
  deleteRecord: (id: string) => void;
}

const MaintenanceContext = createContext<MaintenanceContextValue | undefined>(undefined);

export function MaintenanceProvider({ children }: PropsWithChildren) {
  const [records, setRecords] = useState<Array<MaintenanceRecord>>(() => [...mockMaintenanceRecords]);

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

  const value = useMemo(
    () => ({ records, addRecord, updateRecord, deleteRecord }),
    [records],
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
