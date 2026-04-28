import type { MaintenanceListItem } from '@/types';

import { MaintenanceCards } from './MaintenanceCards';
import { MaintenanceTable } from './MaintenanceTable';

type Props = {
  data: ReadonlyArray<MaintenanceListItem>;
  viewMode: 'table' | 'card';
  onDelete?: (id: string) => void;
};

export function MaintenanceContent({ data, viewMode, onDelete }: Props) {
  if (viewMode === 'card') {
    return <MaintenanceCards data={data} />;
  }

  return <MaintenanceTable data={data} onDelete={onDelete} />;
}
