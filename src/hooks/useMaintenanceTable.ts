import { useMemo, useState } from "react";

import { useMaintenanceContext } from "@/context/MaintenanceRecordsContext";
import type { MaintenanceListItem, MaintenanceRecord } from "@/types";

import {
  filterRecordsByCar,
  mapRecordsToMaintenanceRows,
  sortRecordsByDate,
} from "./maintenanceTableData";
import {
  getInitialDateOrder,
  getInitialViewMode,
  setCookieValue,
} from "./maintenanceTableStorage";

export type DateOrder = "desc" | "asc";
export type ViewMode = "table" | "card";

type UseMaintenanceTableArgs = {
  records?: ReadonlyArray<MaintenanceRecord>;
};

type UseMaintenanceTableResult = {
  currentData: ReadonlyArray<MaintenanceListItem>;
  dateOrder: DateOrder;
  selectedCarId: string;
  setDateOrder: (order: DateOrder) => void;
  setSelectedCarId: (carId: string) => void;
  setViewMode: (mode: ViewMode) => void;
  viewMode: ViewMode;
};

export function useMaintenanceTable({ records: externalRecords }: UseMaintenanceTableArgs = {}): UseMaintenanceTableResult {
  const { records: contextRecords } = useMaintenanceContext();
  const records = externalRecords ?? contextRecords;

  const [viewMode, setViewModeState] = useState<ViewMode>(getInitialViewMode);
  const [selectedCarId, setSelectedCarId] = useState("all");
  const [dateOrder, setDateOrderState] =
    useState<DateOrder>(getInitialDateOrder);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    setCookieValue("viewMode", mode);
  };

  const setDateOrder = (order: DateOrder) => {
    setDateOrderState(order);
    setCookieValue("dateOrder", order);
  };

  const filteredRecords = useMemo(
    () => filterRecordsByCar(records, selectedCarId),
    [records, selectedCarId],
  );

  const sortedRecords = useMemo(
    () => sortRecordsByDate(filteredRecords, dateOrder),
    [filteredRecords, dateOrder],
  );

  const currentData = useMemo(
    () => mapRecordsToMaintenanceRows(sortedRecords),
    [sortedRecords],
  );

  return {
    currentData,
    dateOrder,
    selectedCarId,
    setDateOrder,
    setSelectedCarId,
    setViewMode,
    viewMode,
  };
}
