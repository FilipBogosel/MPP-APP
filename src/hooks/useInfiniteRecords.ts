import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchRecordsPage } from '@/api/services/maintenanceRecordsApi';
import type { MaintenanceRecord } from '@/types';

const PAGE_SIZE = 20;

export default function useInfiniteRecords() {
  const [records, setRecords] = useState<Array<MaintenanceRecord>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const pageRef = useRef(1);
  const isFetchingRef = useRef(false);

  const hasMore = records.length < totalElements;

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const page1 = await fetchRecordsPage(1, PAGE_SIZE);
        if (!isMounted) return;
        setRecords(page1.records);
        setTotalElements(page1.totalElements);
        setIsLoading(false);
        pageRef.current = 1;

        if (page1.totalPages > 1) {
          isFetchingRef.current = true;
          try {
            const page2 = await fetchRecordsPage(2, PAGE_SIZE);
            if (!isMounted) return;
            setRecords((prev) => [...prev, ...page2.records]);
            pageRef.current = 2;
          } finally {
            isFetchingRef.current = false;
          }
        }
      } catch {
        if (isMounted) setIsLoading(false);
      }
    };

    void init();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const record = (e as CustomEvent<MaintenanceRecord>).detail;
      if (!record || !record.id) return;
      setRecords((prev) => {
        if (prev.some((r) => r.id === record.id)) return prev;
        return [...prev, record];
      });
      setTotalElements((prev) => prev + 1);
    };
    window.addEventListener('ws:newRecord', handler);
    return () => window.removeEventListener('ws:newRecord', handler);
  }, []);

  const loadMore = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsFetchingMore(true);
    const nextPage = pageRef.current + 1;
    try {
      const result = await fetchRecordsPage(nextPage, PAGE_SIZE);
      setRecords((prev) => [...prev, ...result.records]);
      setTotalElements(result.totalElements);
      pageRef.current = nextPage;
    } finally {
      isFetchingRef.current = false;
      setIsFetchingMore(false);
    }
  }, []);

  return { records, isLoading, isFetchingMore, hasMore, loadMore };
}
