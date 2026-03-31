/* @vitest-environment jsdom */

import { act, renderHook } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { describe, expect, it } from 'vitest';
import { mockMaintenanceRecords } from '@/api/mockData';
import type { MaintenanceRecord } from '@/types';
import { MaintenanceProvider, useMaintenanceContext } from '@/context/MaintenanceContext';

function wrapper({ children }: PropsWithChildren) {
  return <MaintenanceProvider>{children}</MaintenanceProvider>;
}

function createNewRecord(): MaintenanceRecord {
  return {
    id: 'mr-test-900',
    userId: 'user-001',
    carId: 'car-001',
    serviceType: 'OIL_CHANGE',
    serviceDate: '2026-03-01',
    odometerKm: 91000,
    nextServiceKm: 99000,
    costUsd: 89,
    providerName: 'Test Garage',
    providerLocation: 'Test City',
    notes: 'Created from context unit test.',
    createdAt: '2026-03-01',
    updatedAt: '2026-03-01',
  };
}

describe('MaintenanceContext', () => {
  it('initializes with the mock records count', () => {
    const { result } = renderHook(() => useMaintenanceContext(), { wrapper });

    expect(result.current.records).toHaveLength(mockMaintenanceRecords.length);
  });

  it('addRecord appends a new record without mutating previous array reference', () => {
    const { result } = renderHook(() => useMaintenanceContext(), { wrapper });
    const newRecord = createNewRecord();
    const previousRecordsRef = result.current.records;

    act(() => {
      result.current.addRecord(newRecord);
    });

    expect(previousRecordsRef).toHaveLength(mockMaintenanceRecords.length);
    expect(result.current.records).toHaveLength(mockMaintenanceRecords.length + 1);
    expect(result.current.records).not.toBe(previousRecordsRef);

    const lastRecord = result.current.records[result.current.records.length - 1];
    expect(lastRecord).toEqual(newRecord);
  });

  it('updateRecord modifies only provided fields on target record', () => {
    const { result } = renderHook(() => useMaintenanceContext(), { wrapper });
    const targetId = mockMaintenanceRecords[0].id;
    const previousRecord = result.current.records.find((record) => record.id === targetId);

    act(() => {
      result.current.updateRecord(targetId, {
        providerName: 'Updated Provider Name',
        costUsd: 777,
      });
    });

    const updatedRecord = result.current.records.find((record) => record.id === targetId);

    expect(updatedRecord).toBeDefined();
    expect(updatedRecord?.providerName).toBe('Updated Provider Name');
    expect(updatedRecord?.costUsd).toBe(777);
    expect(updatedRecord?.serviceType).toBe(previousRecord?.serviceType);
    expect(updatedRecord?.carId).toBe(previousRecord?.carId);
  });

  it('deleteRecord removes the record from memory', () => {
    const { result } = renderHook(() => useMaintenanceContext(), { wrapper });
    const recordIdToDelete = mockMaintenanceRecords[1].id;
    const previousLength = result.current.records.length;

    act(() => {
      result.current.deleteRecord(recordIdToDelete);
    });

    expect(result.current.records).toHaveLength(previousLength - 1);
    expect(result.current.records.some((record) => record.id === recordIdToDelete)).toBe(false);
  });
});