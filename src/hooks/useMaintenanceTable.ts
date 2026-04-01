import { useEffect, useMemo, useState } from 'react';
import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';
import type { MaintenanceListItem } from '@/types';
import {
  formatServiceType,
  getCurrentPageData,
  ITEMS_PER_PAGE,
} from '@/components/pages/maintenance/maintenanceUtils';

export type DateOrder = 'desc' | 'asc';
export type ViewMode = 'table' | 'card';

const COOKIE_MAX_AGE_SECONDS = 31536000;

function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookiePrefix = `${name}=`;
  const cookies = document.cookie ? document.cookie.split(';') : [];

  for (const cookie of cookies) {
    const normalizedCookie = cookie.trim();
    if (normalizedCookie.startsWith(cookiePrefix)) {
      return decodeURIComponent(normalizedCookie.slice(cookiePrefix.length));
    }
  }

  return null;
}

function setCookieValue(name: string, value: string) {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}`;
}

function getInitialViewMode(): ViewMode {
  return getCookieValue('viewMode') === 'card' ? 'card' : 'table';
}

function getInitialDateOrder(): DateOrder {
  return getCookieValue('dateOrder') === 'asc' ? 'asc' : 'desc';
}

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
    () =>
      selectedCarId === 'all'
        ? records
        : records.filter((record) => record.carId === selectedCarId),
    [records, selectedCarId],
  );

  const sortedRecords = useMemo(
    () =>
      [...filteredRecords].sort((a, b) => {
        const dateA = new Date(a.serviceDate).getTime();
        const dateB = new Date(b.serviceDate).getTime();

        return dateOrder === 'desc' ? dateB - dateA : dateA - dateB;
      }),
    [filteredRecords, dateOrder],
  );

  const maintenanceListData = useMemo(
    () =>
      sortedRecords.map((record) => ({
        id: record.id,
        name: formatServiceType(record.serviceType),
        date: record.serviceDate,
        mileage: record.odometerKm.toLocaleString('en-US'),
        nextMileage: record.nextServiceKm.toLocaleString('en-US'),
        cost: record.costUsd,
      })),
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
