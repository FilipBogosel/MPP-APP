import { Database, HelpCircle } from 'lucide-react';
import { ImportMappingTable } from './ImportMappingTable';
import { ImportReviewPanel } from './ImportReviewPanel';
import { ImportUploadPanel } from './ImportUploadPanel';

export function DataImportPage() {
  return (
    <div className="relative min-h-screen flex-1 overflow-y-auto bg-[#F4F6F8] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl pb-16">
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <Database className="h-6 w-6 text-indigo-600" />
            Import Diagnostic Data
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload trip logs from apps like Torque Pro or CarScanner to update your personal service timeline and
            budget forecasts.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <ImportUploadPanel />
            <ImportMappingTable />
          </div>
          <div className="space-y-6">
            <ImportReviewPanel />
          </div>
        </div>
      </div>

      <button
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full border border-gray-200 bg-white p-3.5 text-gray-500 shadow-lg transition-all hover:text-indigo-600 hover:shadow-xl"
        aria-label="Help and Support"
      >
        <HelpCircle className="h-6 w-6" />
      </button>
    </div>
  );
}
