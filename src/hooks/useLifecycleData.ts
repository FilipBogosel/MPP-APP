import { useEffect, useState } from 'react';
import { fetchLifecycleMetrics, fetchLifecycleTimeline } from '@/api/services/lifecycleApi';
import type { LifecycleMetric, LifecycleTimelineItem } from '@/types';

type LifecycleState = {
  isLoading: boolean;
  metrics: ReadonlyArray<LifecycleMetric>;
  timeline: ReadonlyArray<LifecycleTimelineItem>;
};

export function useLifecycleData(): LifecycleState {
  const [metrics, setMetrics] = useState<ReadonlyArray<LifecycleMetric>>([]);
  const [timeline, setTimeline] = useState<ReadonlyArray<LifecycleTimelineItem>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const [nextMetrics, nextTimeline] = await Promise.all([
        fetchLifecycleMetrics(),
        fetchLifecycleTimeline(),
      ]);

      if (!isMounted) return;
      setMetrics(nextMetrics);
      setTimeline(nextTimeline);
      setIsLoading(false);
    };

    void load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { isLoading, metrics, timeline };
}
