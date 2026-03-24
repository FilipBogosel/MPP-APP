import { mockMaintenanceRecords } from '../api/mockData';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

const getImpactLabel = (costUsd: number): 'Routine' | 'Significant' | 'Major' => {
  if (costUsd >= 1000) return 'Major';
  if (costUsd >= 200) return 'Significant';
  return 'Routine';
};

const getImpactVariant = (costUsd: number): 'default' | 'secondary' | 'destructive' => {
  if (costUsd >= 1000) return 'destructive';
  if (costUsd >= 200) return 'default';
  return 'secondary';
};

export function Maintenance() {
  return (
    <section className="flex-1 bg-[#f4f6f8] p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Maintenance Records</h1>
            <p className="text-sm text-gray-600">Track service history with typed mock data.</p>
          </div>
          <Button>Add Service</Button>
        </div>

        <div className="rounded-xl border bg-white p-2 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Odometer (km)</TableHead>
                <TableHead>Next Service (km)</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Cost (USD)</TableHead>
                <TableHead>Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMaintenanceRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.serviceType}</TableCell>
                  <TableCell>{record.serviceDate}</TableCell>
                  <TableCell>{record.odometerKm.toLocaleString()}</TableCell>
                  <TableCell>{record.nextServiceKm.toLocaleString()}</TableCell>
                  <TableCell>{record.providerName}</TableCell>
                  <TableCell>{record.providerLocation}</TableCell>
                  <TableCell className="text-right">${record.costUsd.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getImpactVariant(record.costUsd)}>
                      {getImpactLabel(record.costUsd)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
