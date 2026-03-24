import { AlertCircle } from 'lucide-react';

export function ImportReviewPanel() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Review & Apply Your Update</h3>

        <p className="mb-4 text-sm leading-relaxed text-gray-600 md:text-base">
          We have successfully reviewed your trip data. It contains 3 months of logs (1,452 data points) and key
          metrics like <span className="font-semibold">Fault Codes, Fuel Economy, and Battery Status</span> that will
          help refine your predictions.
        </p>

        <p className="mb-8 text-sm font-medium text-red-600">
          Please fix the missing data mapping for <span className="font-bold">'Intake Air Temperature'</span> in the
          matching table on the left.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-8 py-3 text-base font-medium text-gray-400 transition-colors md:w-auto"
          >
            Confirm and Process Trip Data
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-4 rounded-lg border border-blue-200 bg-[#EFF6FF] p-5 shadow-sm">
        <AlertCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-700" />
        <p className="text-sm font-medium leading-relaxed text-blue-900 md:text-base">
          Based on this new data, including your detailed driving patterns, we have adjusted your driving habit
          profile. You are driving more intensely (avg. 55 km/day with higher average speed), which means your next
          major scheduled service is now forecast to happen 14 days sooner than originally predicted.
        </p>
      </div>
    </div>
  );
}
