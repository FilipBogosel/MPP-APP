/* @vitest-environment jsdom */

import { act, renderHook } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { describe, expect, it } from 'vitest';
import { mockMaintenanceRecords } from '@/api/mockData';
import { MaintenanceProvider } from '@/context/MaintenanceContext';
import { useMaintenanceTable } from '@/hooks/useMaintenanceTable';

function wrapper({ children }: PropsWithChildren) {
  return <MaintenanceProvider>{children}</MaintenanceProvider>;
}

function toTimestamp(date: string) {
  return new Date(date).getTime();
}

describe('useMaintenanceTable', () => {
  it('calculates totalItems and totalPages from initialized data', () => {
    const { result } = renderHook(() => useMaintenanceTable(), { wrapper });

    const expectedTotalPages = Math.max(
      1,
      Math.ceil(mockMaintenanceRecords.length / result.current.itemsPerPage),
    );

    expect(result.current.totalItems).toBe(mockMaintenanceRecords.length);
    expect(result.current.totalPages).toBe(expectedTotalPages);
  });

  it('filters currentData when selectedCarId changes', () => {
    const { result } = renderHook(() => useMaintenanceTable(), { wrapper });

    act(() => {
      result.current.setSelectedCarId('car-004');
    });

    const expectedFilteredIds = mockMaintenanceRecords
      .filter((record) => record.carId === 'car-004')
      .sort((a, b) => toTimestamp(b.serviceDate) - toTimestamp(a.serviceDate))
      .map((record) => record.id);

    expect(result.current.totalItems).toBe(expectedFilteredIds.length);
    expect(result.current.currentData.map((item) => item.id)).toEqual(
      expectedFilteredIds.slice(0, result.current.itemsPerPage),
    );
  });

  it('sorts currentData by date in descending and ascending order', () => {
    const { result } = renderHook(() => useMaintenanceTable(), { wrapper });

    const descTimestamps = result.current.currentData.map((item) => toTimestamp(item.date));
    expect(descTimestamps.every((value, index, arr) => index === 0 || arr[index - 1] >= value)).toBe(true);

    act(() => {
      result.current.setDateOrder('asc');
    });

    const ascTimestamps = result.current.currentData.map((item) => toTimestamp(item.date));
    expect(ascTimestamps.every((value, index, arr) => index === 0 || arr[index - 1] <= value)).toBe(true);
  });

  it('returns the expected page slice when setCurrentPage is called', () => {
    const { result } = renderHook(() => useMaintenanceTable(), { wrapper });

    const sortedIds = [...mockMaintenanceRecords]
      .sort((a, b) => toTimestamp(b.serviceDate) - toTimestamp(a.serviceDate))
      .map((record) => record.id);

    act(() => {
      result.current.setCurrentPage(2);
    });

    const start = result.current.itemsPerPage;
    const end = start + result.current.itemsPerPage;

    expect(result.current.currentData.map((item) => item.id)).toEqual(sortedIds.slice(start, end));
  });
});