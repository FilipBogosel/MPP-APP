import { useCallback, useEffect, useRef, useState } from "react";

import type { MaintenanceRecord } from "@/types";

import {
  AUTO_ADD_INTERVAL_MS,
  createAutoRecord,
} from "./overviewAutoRecordFactory";

type UseOverviewAutoRecordsResult = {
  generatedCount: number;
  intervalMs: number;
  isRunning: boolean;
  records: ReadonlyArray<MaintenanceRecord>;
  start: () => void;
  stop: () => void;
};

type UseOverviewAutoRecordsProps = {
  baseRecords: ReadonlyArray<MaintenanceRecord>;
  onAddRecord?: (record: MaintenanceRecord) => Promise<void>;
};

export function useOverviewAutoRecords({
  baseRecords,
  onAddRecord,
}: UseOverviewAutoRecordsProps): UseOverviewAutoRecordsResult {
  const [records, setRecords] =
    useState<ReadonlyArray<MaintenanceRecord>>(baseRecords);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const sequenceRef = useRef(0);

  useEffect(() => {
    setRecords(baseRecords);
    setGeneratedCount(0);
    sequenceRef.current = 0;
  }, [baseRecords]);

  const appendRecord = useCallback(async () => {
    sequenceRef.current += 1;
    const autoRecord = createAutoRecord(sequenceRef.current);

    // Add to local state immediately for UI feedback
    setRecords((previous) => [...previous, autoRecord]);
    setGeneratedCount((previous) => previous + 1);

    // If a callback is provided, also add to context/backend
    if (onAddRecord) {
      try {
        await onAddRecord(autoRecord);
      } catch (error) {
        console.error("Failed to add auto-generated record to context:", error);
        // Keep it in local state even if context add fails
      }
    }
  }, [onAddRecord]);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      void appendRecord();
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
