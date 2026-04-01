import { Calendar, Clock } from 'lucide-react';
import type { LifecycleTimelineItem } from '@/types';

function nodeTone(level: 'Routine' | 'Warning' | 'Critical') {
  if (level === 'Critical') {
    return {
      label: 'text-red-600',
      dot: 'bg-red-500',
      estimate: 'border-red-100 bg-red-50 text-red-700',
      pulse: true,
    };
  }

  if (level === 'Warning') {
    return {
      label: 'text-orange-600',
      dot: 'bg-orange-500',
      estimate: 'border-gray-100 bg-gray-50 text-gray-900',
      pulse: false,
    };
  }

  return {
    label: 'text-blue-600',
    dot: 'bg-blue-500',
    estimate: 'border-gray-100 bg-gray-50 text-gray-900',
    pulse: false,
  };
}

type Props = {
  timeline: ReadonlyArray<LifecycleTimelineItem>;
};

export function LifecycleTimeline({ timeline }: Props) {
  return (
    <div className="relative mb-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-10 flex items-center gap-2 border-b border-gray-100 pb-4">
        <Clock className="h-5 w-5 text-indigo-500" />
        <h2 className="text-lg font-bold text-gray-900">Risk & Budget Timeline</h2>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-6 sm:mx-0 sm:px-0">
        <div className="relative min-w-[900px] pb-12 pt-8">
          <div className="absolute left-12 right-12 top-[42px] z-0 h-1 bg-gray-200" />
          <div className="relative z-10 flex justify-between gap-4 px-4 sm:px-8">
            {timeline.map((item) => {
              const tone = nodeTone(item.level);
              return (
                <div key={item.title} className="relative w-48 shrink-0 text-center">
                  <span className={`mb-3 block text-xs font-bold uppercase tracking-wider ${tone.label}`}>
                    {item.level}
                  </span>
                  <div
                    className={`mx-auto mb-4 h-5 w-5 rounded-full border-4 border-white shadow-sm ${tone.dot} ${tone.pulse ? 'animate-pulse' : ''}`}
                  />
                  <h4 className="text-base font-semibold text-gray-900">{item.title}</h4>
                  <div className="mt-1 flex items-center justify-center gap-1.5 text-sm text-gray-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </div>
                  <div className={`mt-2 rounded-full border px-3 py-1 text-sm font-medium ${tone.estimate}`}>
                    Est: {item.estimate}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
