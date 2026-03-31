import { describe, expect, it } from 'vitest';
import type { MaintenanceListItem } from '@/types';
import { formatServiceType, getCurrentPageData, ITEMS_PER_PAGE } from '@/components/pages/maintenance/maintenanceUtils';

function createItems(count: number): Array<MaintenanceListItem> {
  return Array.from({ length: count }, (_, index) => ({
    id: `id-${index + 1}`,
    name: `Service ${index + 1}`,
    date: `2026-01-${String((index % 28) + 1).padStart(2, '0')}`,
    mileage: String((index + 1) * 1000),
    nextMileage: String((index + 2) * 1000),
    cost: index + 10,
  }));
}

describe('getCurrentPageData', () => {
  it('returns the first page with ITEMS_PER_PAGE records', () => {
    const data = createItems(15);

    const pageData = getCurrentPageData(data, 1);

    expect(pageData).toHaveLength(ITEMS_PER_PAGE);
    expect(pageData[0]?.id).toBe('id-1');
    expect(pageData[ITEMS_PER_PAGE - 1]?.id).toBe(`id-${ITEMS_PER_PAGE}`);
  });

  it('returns the final partial page when records do not fill a full page', () => {
    const data = createItems(8);

    const pageData = getCurrentPageData(data, 2);

    expect(pageData).toHaveLength(2);
    expect(pageData.map((item) => item.id)).toEqual(['id-7', 'id-8']);
  });

  it('returns an empty array for empty input', () => {
    expect(getCurrentPageData([], 1)).toEqual([]);
  });

  it('returns an empty array when requested page is out of bounds', () => {
    const data = createItems(5);

    expect(getCurrentPageData(data, 3)).toEqual([]);
  });

  it('returns an empty array for negative page numbers', () => {
    const data = createItems(12);

    expect(getCurrentPageData(data, -1)).toEqual([]);
  });

  it('returns an empty array for zero and non-finite page values', () => {
    const data = createItems(12);

    expect(getCurrentPageData(data, 0)).toEqual([]);
    expect(getCurrentPageData(data, Number.NaN)).toEqual([]);
  });
});

describe('formatServiceType', () => {
  it('formats uppercase underscore values into title case', () => {
    expect(formatServiceType('OIL_CHANGE')).toBe('Oil Change');
    expect(formatServiceType('ENGINE_SERVICE')).toBe('Engine Service');
  });

  it('returns an empty string for empty input', () => {
    expect(formatServiceType('')).toBe('');
  });

  it('handles values that include negative numbers', () => {
    expect(formatServiceType('SERVICE_-1_CHECK')).toBe('Service -1 Check');
  });

  it('normalizes mixed casing and multiple words', () => {
    expect(formatServiceType('bRaKe_sErViCe')).toBe('Brake Service');
  });
});