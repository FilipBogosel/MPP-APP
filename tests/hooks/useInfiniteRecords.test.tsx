/* @vitest-environment jsdom */

import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { MaintenanceRecord } from '@/types';

const fetchRecordsPageMock = vi.hoisted(() => vi.fn());

vi.mock('@/api/services/maintenanceRecordsApi', () => ({
  fetchRecordsPage: fetchRecordsPageMock,
}));

import useInfiniteRecords from '@/hooks/useInfiniteRecords';

function createRecord(id: string): MaintenanceRecord {
  return {
    id,
    userId: 'user-001',
    carId: 'car-001',
    serviceType: 'OIL_CHANGE',
    serviceDate: '2026-03-01',
    odometerKm: 91000,
    nextServiceKm: 99000,
    costUsd: 89,
    providerName: 'Test Garage',
    providerLocation: 'Test City',
    notes: 'Created from hook unit test.',
    createdAt: '2026-03-01',
    updatedAt: '2026-03-01',
  };
}

describe('useInfiniteRecords', () => {
  beforeEach(() => {
    fetchRecordsPageMock.mockReset();
  });

  it('removes deleted records from the local table state', async () => {
    const firstRecord = createRecord('record-1');
    const secondRecord = createRecord('record-2');

    fetchRecordsPageMock.mockResolvedValueOnce({
      records: [firstRecord, secondRecord],
      totalElements: 2,
      totalPages: 1,
    });

    const { result } = renderHook(() => useInfiniteRecords());

    await waitFor(() => {
      expect(result.current.records).toHaveLength(2);
    });

    act(() => {
      result.current.removeRecord(firstRecord.id);
    });

    expect(result.current.records).toHaveLength(1);
    expect(result.current.records[0]?.id).toBe(secondRecord.id);
    expect(result.current.hasMore).toBe(false);
  });
});