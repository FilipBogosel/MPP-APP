import { ArrowRight, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router';
import { cls } from '@/styles/classes';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={`${cls.page} flex items-center`}>
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                <Wrench className="h-7 w-7" aria-hidden />
              </span>

              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">MaintenanceRecord</h1>
              <p className="mt-3 text-lg font-medium text-indigo-700">Vehicle care records and lifecycle forecasting in one workspace.</p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
                MaintenanceRecord helps drivers and fleet teams track every maintenance event, monitor service history,
                and forecast vehicle lifecycle milestones so repairs can be planned before failures happen.
              </p>

              <button
                type="button"
                onClick={() => navigate('/dashboard/records')}
                className={`${cls.btnPrimary} mt-8 gap-2 px-6 py-3 text-base`}
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <aside className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 sm:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-700">What this app covers</h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                <li className="rounded-lg bg-white px-4 py-3 shadow-sm">Log inspections, repairs, and scheduled services.</li>
                <li className="rounded-lg bg-white px-4 py-3 shadow-sm">View historical trends for cost and maintenance frequency.</li>
                <li className="rounded-lg bg-white px-4 py-3 shadow-sm">Forecast lifecycle stages for proactive maintenance planning.</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
