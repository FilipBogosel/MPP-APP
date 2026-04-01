import { importMappingRows } from '@/api/mockUiData';
import type { ImportMappingRow } from '@/types';

function cloneRows<T extends object>(rows: ReadonlyArray<T>): Array<T> {
  return rows.map((row) => ({ ...row }));
}

export async function fetchImportMappingRows(): Promise<Array<ImportMappingRow>> {
  return cloneRows(importMappingRows);
}
