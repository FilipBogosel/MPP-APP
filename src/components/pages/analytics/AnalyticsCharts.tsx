import { useMemo } from 'react';

import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';
import type { MaintenanceRecord } from '@/types';

import { AnnualExpenditureChart } from './AnnualExpenditureChart';
import { CostByServiceChart } from './CostByServiceChart';
import { ImpactFrequencyChart } from './ImpactFrequencyChart';
import { getAnnualData, getExpenditureData, getImpactData, getMaxImpactCount } from './analyticsSeries';

type Props = {
  recordsOverride?: ReadonlyArray<MaintenanceRecord>;
};

export function AnalyticsCharts({ recordsOverride }: Props) {
  const { records: contextRecords } = useMaintenanceContext();
  const records = recordsOverride ?? contextRecords;

  const expenditureData = useMemo(() => getExpenditureData(records), [records]);
  const impactData = useMemo(() => getImpactData(records), [records]);
  const annualData = useMemo(() => getAnnualData(records), [records]);
  const maxImpactCount = useMemo(() => getMaxImpactCount(impactData), [impactData]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <CostByServiceChart data={expenditureData} />
      <ImpactFrequencyChart data={impactData} maxImpactCount={maxImpactCount} />
      <AnnualExpenditureChart data={annualData} />
    </div>
  );
}
