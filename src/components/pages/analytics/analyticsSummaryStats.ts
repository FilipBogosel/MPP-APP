import type { MaintenanceRecord } from '@/types';

type AnalyticsSummaryStats = {
  avgCost: number;
  maxRecord: MaintenanceRecord | null;
  totalCost: number;
};

export function getAnalyticsSummaryStats(records: ReadonlyArray<MaintenanceRecord>): AnalyticsSummaryStats {
  if (records.length === 0) {
    return {
      totalCost: 0,
      avgCost: 0,
      maxRecord: null,
    };
  }

  const totalCost = records.reduce((sum, record) => sum + record.costUsd, 0);
  const maxRecord = records.reduce((max, record) => (record.costUsd > max.costUsd ? record : max), records[0]);

  return {
    avgCost: totalCost / records.length,
    maxRecord,
    totalCost,
  };
}
