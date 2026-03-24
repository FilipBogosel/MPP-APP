import { UploadCloud } from 'lucide-react';

export function ImportUploadPanel() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
      <div className="flex w-full max-w-lg cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-gray-300 p-12 transition-colors hover:bg-gray-50">
        <UploadCloud className="mb-4 h-12 w-12 text-indigo-500" />
        <h3 className="mb-1 text-base font-medium text-gray-900">
          Drop your Torque Pro or CarScanner export file here
        </h3>
        <p className="text-sm text-gray-500">Compatible with CSV and JSON file formats (under 5MB).</p>
        <button className="mt-6 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100">
          Browse Files
        </button>
      </div>
    </div>
  );
}
