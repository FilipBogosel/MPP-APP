import type { MaintenanceListItem } from '@/types';

export const ITEMS_PER_PAGE = 6;

export function formatServiceDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getCurrentPageData(data: ReadonlyArray<MaintenanceListItem>, page: number) {
  return data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
}

export function formatServiceType(serviceType: string): string {
  return serviceType
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
