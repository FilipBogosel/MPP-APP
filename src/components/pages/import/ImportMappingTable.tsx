import { ArrowRight, ChevronDown, FileText, XCircle } from 'lucide-react';
import { useImportMappingRows } from '@/hooks/useImportMappingRows';
import { cls } from '@/styles/classes';

export function ImportMappingTable() {
  const { isLoading, rows } = useImportMappingRows();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500 shadow-sm">
        Loading import mappings...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
        <FileText className="h-5 w-5 text-gray-500" />
        <h3 className="text-base font-semibold text-gray-900">File Summary & Matching</h3>
      </div>

      <div className="overflow-x-auto p-0">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className={`w-2/5 ${cls.th} py-3 font-medium`}>
                DATA POINT FOUND IN YOUR FILE
              </th>
              <th className={`w-1/5 ${cls.th} py-3 text-center font-medium`}>
                STATUS
              </th>
              <th className={`w-2/5 ${cls.th} py-3 font-medium`}>
                MATCHED APP DATA CATEGORY
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {rows.map((row) => {
              const isMissing = row.status === 'missing';
              return (
                <tr key={row.id} className={isMissing ? 'bg-red-50/30' : ''}>
                  <td className={`${cls.td} text-sm font-medium ${isMissing ? 'text-red-900' : 'text-gray-900'}`}>
                    {row.source}
                  </td>
                  <td className={`${cls.td} text-center text-sm text-gray-500`}>
                    {isMissing ? (
                      <XCircle className="mx-auto h-5 w-5 text-red-500" />
                    ) : (
                      <ArrowRight className="mx-auto h-5 w-5 text-emerald-500" />
                    )}
                  </td>
                  <td className={`${cls.td} text-sm text-gray-600`}>
                    {row.mappedLabel ? (
                      <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {row.mappedLabel}
                      </span>
                    ) : (
                      <div className="relative inline-block w-full max-w-[200px]">
                        <select className="w-full appearance-none rounded-md border border-red-300 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-700 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500">
                          <option value="">Select category...</option>
                          <option value="mileage">Mileage</option>
                          <option value="health">Vehicle Health</option>
                          <option value="performance">Performance</option>
                          <option value="timestamp">Timestamp</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
