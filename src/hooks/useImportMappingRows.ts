import { useEffect, useState } from 'react';
import { fetchImportMappingRows } from '@/api/services/importApi';
import type { ImportMappingRow } from '@/types';

type ImportMappingState = {
  isLoading: boolean;
  rows: ReadonlyArray<ImportMappingRow>;
};

export function useImportMappingRows(): ImportMappingState {
  const [rows, setRows] = useState<ReadonlyArray<ImportMappingRow>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const nextRows = await fetchImportMappingRows();
      if (!isMounted) return;
      setRows(nextRows);
      setIsLoading(false);
    };

    void load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { isLoading, rows };
}
