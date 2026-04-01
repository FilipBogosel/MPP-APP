import { useCallback, useEffect, useRef, useState } from 'react';

import type { MaintenanceRecord } from '@/types';

import { AUTO_ADD_INTERVAL_MS, createAutoRecord } from './overviewAutoRecordFactory';

type UseOverviewAutoRecordsResult = {
  generatedCount: number;
  intervalMs: number;
  isRunning: boolean;
  records: ReadonlyArray<MaintenanceRecord>;
  start: () => void;
  stop: () => void;
};

export function useOverviewAutoRecords(baseRecords: ReadonlyArray<MaintenanceRecord>): UseOverviewAutoRecordsResult {
  const [records, setRecords] = useState<ReadonlyArray<MaintenanceRecord>>(baseRecords);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const sequenceRef = useRef(0);

  useEffect(() => {
    setRecords(baseRecords);
    setGeneratedCount(0);
    sequenceRef.current = 0;
  }, [baseRecords]);

  const appendRecord = useCallback(() => {
    sequenceRef.current += 1;
    const autoRecord = createAutoRecord(sequenceRef.current);

    setRecords((previous) => [...previous, autoRecord]);
    setGeneratedCount((previous) => previous + 1);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      appendRecord();
    }, AUTO_ADD_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [appendRecord, isRunning]);

  return {
    generatedCount,
    intervalMs: AUTO_ADD_INTERVAL_MS,
    isRunning,
    records,
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
  };
}
