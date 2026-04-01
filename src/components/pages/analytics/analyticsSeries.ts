import { formatServiceType } from '@/components/pages/maintenance/maintenanceUtils';
import type { AnalyticsAnnualItem, AnalyticsBreakdownItem, AnalyticsImpactItem, MaintenanceRecord } from '@/types';

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getExpenditureData(records: ReadonlyArray<MaintenanceRecord>): ReadonlyArray<AnalyticsBreakdownItem> {
  const totals = new Map<string, number>();

  records.forEach((record) => {
    const label = formatServiceType(record.serviceType);
    totals.set(label, (totals.get(label) ?? 0) + record.costUsd);
  });

  return Array.from(totals.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getImpactData(records: ReadonlyArray<MaintenanceRecord>): ReadonlyArray<AnalyticsImpactItem> {
  const counters = {
    Routine: 0,
    Significant: 0,
    Overhaul: 0,
  };

  records.forEach((record) => {
    if (record.costUsd >= 1000) {
      counters.Overhaul += 1;
    } else if (record.costUsd >= 200) {
      counters.Significant += 1;
    } else {
      counters.Routine += 1;
    }
  });

  return [
    { name: 'Routine', count: counters.Routine },
    { name: 'Significant', count: counters.Significant },
    { name: 'Overhaul', count: counters.Overhaul },
  ];
}

export function getAnnualData(records: ReadonlyArray<MaintenanceRecord>): ReadonlyArray<AnalyticsAnnualItem> {
  const monthTotals = Array.from({ length: 12 }, () => 0);

  records.forEach((record) => {
    const date = new Date(record.serviceDate);
    if (!Number.isNaN(date.getTime())) {
      monthTotals[date.getMonth()] += record.costUsd;
    }
  });

  return MONTH_LABELS.map((month, index) => ({
    month,
    cost: Number(monthTotals[index].toFixed(2)),
  }));
}

export function getMaxImpactCount(impactData: ReadonlyArray<AnalyticsImpactItem>): number {
  return impactData.reduce((max, item) => Math.max(max, item.count), 0);
}
