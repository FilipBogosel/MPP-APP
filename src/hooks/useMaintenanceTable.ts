import { useEffect, useMemo, useState } from 'react';

import {
  getCurrentPageData,
  ITEMS_PER_PAGE,
} from '@/components/pages/maintenance/maintenanceUtils';
import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';
import type { MaintenanceListItem } from '@/types';

import {
  filterRecordsByCar,
  mapRecordsToMaintenanceRows,
  sortRecordsByDate,
} from './maintenanceTableData';
import { getInitialDateOrder, getInitialViewMode, setCookieValue } from './maintenanceTableStorage';

export type DateOrder = 'desc' | 'asc';
export type ViewMode = 'table' | 'card';

type UseMaintenanceTableResult = {
  currentData: ReadonlyArray<MaintenanceListItem>;
  currentPage: number;
  dateOrder: DateOrder;
  itemsPerPage: number;
  selectedCarId: string;
  setCurrentPage: (page: number) => void;
  setDateOrder: (order: DateOrder) => void;
  setSelectedCarId: (carId: string) => void;
  setViewMode: (mode: ViewMode) => void;
  totalItems: number;
  totalPages: number;
  viewMode: ViewMode;
};

export function useMaintenanceTable(): UseMaintenanceTableResult {
  const { records } = useMaintenanceContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewModeState] = useState<ViewMode>(getInitialViewMode);
  const [selectedCarId, setSelectedCarId] = useState('all');
  const [dateOrder, setDateOrderState] = useState<DateOrder>(getInitialDateOrder);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    setCookieValue('viewMode', mode);
  };

  const setDateOrder = (order: DateOrder) => {
    setDateOrderState(order);
    setCookieValue('dateOrder', order);
  };

  const filteredRecords = useMemo(
    () => filterRecordsByCar(records, selectedCarId),
    [records, selectedCarId],
  );

  const sortedRecords = useMemo(
    () => sortRecordsByDate(filteredRecords, dateOrder),
    [filteredRecords, dateOrder],
  );

  const maintenanceListData = useMemo(
    () => mapRecordsToMaintenanceRows(sortedRecords),
    [sortedRecords],
  );

  const totalPages = Math.max(1, Math.ceil(maintenanceListData.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCarId, dateOrder]);

  const currentData = useMemo(
    () => getCurrentPageData(maintenanceListData, currentPage),
    [currentPage, maintenanceListData],
  );

  return {
    currentData,
    currentPage,
    dateOrder,
    itemsPerPage: ITEMS_PER_PAGE,
    selectedCarId,
    setCurrentPage,
    setDateOrder,
    setSelectedCarId,
    setViewMode,
    totalItems: maintenanceListData.length,
    totalPages,
    viewMode,
  };
}
