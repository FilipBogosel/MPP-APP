import { lifecycleMetrics, lifecycleTimeline } from '@/api/mockUiData';
import type { LifecycleMetric, LifecycleTimelineItem } from '@/types';

function cloneRows<T extends object>(rows: ReadonlyArray<T>): Array<T> {
  return rows.map((row) => ({ ...row }));
}

export async function fetchLifecycleMetrics(): Promise<Array<LifecycleMetric>> {
  return cloneRows(lifecycleMetrics);
}

export async function fetchLifecycleTimeline(): Promise<Array<LifecycleTimelineItem>> {
  return cloneRows(lifecycleTimeline);
}
