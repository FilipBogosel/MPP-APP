import { UploadCloud } from 'lucide-react';

export function AddServiceUploadSection() {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">Upload Receipt or Documents (PDF, Image)</label>
      <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 pb-6 pt-5 transition-colors hover:border-indigo-400">
        <div className="space-y-1 text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex justify-center text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white px-1 font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
            >
              <span>Upload a file</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf,image/*" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
        </div>
      </div>
    </div>
  );
}
