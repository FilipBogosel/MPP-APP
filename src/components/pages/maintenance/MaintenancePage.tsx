import { useEffect, useRef } from 'react';
import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';
import useInfiniteRecords from '@/hooks/useInfiniteRecords';
import { useMaintenanceTable } from '@/hooks/useMaintenanceTable';
import { cls } from '@/styles/classes';
import { MaintenanceContent } from './MaintenanceContent';
import { MaintenanceFilters } from './MaintenanceFilters';
import { MaintenanceHeader } from './MaintenanceHeader';

type Props = {
  forceTableView?: boolean;
};

export function MaintenancePage({ forceTableView = false }: Props) {
  const { carOptions, deleteRecord } = useMaintenanceContext();
  const { records, isFetchingMore, hasMore, loadMore, removeRecord } = useInfiniteRecords();
  const {
    currentData,
    dateOrder,
    selectedCarId,
    setDateOrder,
    setSelectedCarId,
    setViewMode,
    viewMode,
  } = useMaintenanceTable({ records });

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting && hasMore && !isFetchingMore) {
        loadMore();
      }
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isFetchingMore, loadMore]);

  const handleDeleteRecord = async (id: string) => {
    if (window.confirm('Delete this maintenance record?')) {
      await deleteRecord(id);
      removeRecord(id);
    }
  };

  const activeViewMode = forceTableView ? 'table' : viewMode;

  return (
    <div className={cls.page}>
      <div className={cls.pageShell}>
        <MaintenanceHeader
          viewMode={activeViewMode}
          onModeChange={setViewMode}
          showViewToggle={!forceTableView}
        />

        <MaintenanceFilters
          carOptions={carOptions}
          selectedCarId={selectedCarId}
          dateOrder={dateOrder}
          onCarChange={setSelectedCarId}
          onDateOrderChange={setDateOrder}
        />

        <MaintenanceContent
          data={currentData}
          viewMode={activeViewMode}
          onDelete={handleDeleteRecord}
        />

        {isFetchingMore && (
          <p className="mt-6 text-center text-sm text-slate-500">Loading more...</p>
        )}
        {!hasMore && records.length > 0 && (
          <p className="mt-6 text-center text-sm text-slate-500">All records loaded</p>
        )}

        <div ref={sentinelRef} className="h-1 w-full" />
      </div>
    </div>
  );
}
