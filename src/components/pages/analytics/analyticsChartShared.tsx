type LegendEntry = {
  color?: string;
  payload?: {
    value?: number;
  };
  value?: string;
};

type TooltipPayloadItem = {
  name: string;
  value: number;
};

type PlainTooltipProps = {
  active?: boolean;
  payload?: Array<TooltipPayloadItem>;
  prefix?: string;
};

export const CHART_COLORS = ['#1e3a8a', '#4f46e5', '#0284c7', '#818cf8'];

export function PlainTooltip({ active, payload, prefix = '' }: PlainTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-gray-500">{payload[0].name}</p>
      <p className="text-sm font-semibold text-gray-900">{prefix}{payload[0].value}</p>
    </div>
  );
}

export function ExpenditureLegend({ payload }: { payload?: ReadonlyArray<LegendEntry> }) {
  if (!payload?.length) return null;

  return (
    <ul className="grid grid-cols-1 gap-x-3 gap-y-2 px-2 text-xs text-gray-700 sm:grid-cols-2">
      {payload.map((entry) => (
        <li key={entry.value} className="flex min-w-0 items-center gap-2">
          <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="min-w-0 flex-1 truncate" title={entry.value}>{entry.value}</span>
          <span className="flex-shrink-0 font-semibold text-gray-900">${Math.round(entry.payload?.value ?? 0)}</span>
        </li>
      ))}
    </ul>
  );
}
