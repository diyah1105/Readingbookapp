import type { ReadingStatus } from '@/types';
import { STATUS_LABELS } from '@/types';

type FilterValue = ReadingStatus | 'all';

interface FilterBarProps {
  active: FilterValue;
  counts: Record<FilterValue, number>;
  onChange: (filter: FilterValue) => void;
}

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'want-to-read', label: STATUS_LABELS['want-to-read'] },
  { value: 'reading', label: STATUS_LABELS['reading'] },
  { value: 'finished', label: STATUS_LABELS['finished'] },
];

export type { FilterValue };

export default function FilterBar({ active, counts, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 sm:flex-wrap">
      {FILTERS.map(({ value, label }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
              isActive
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {label}
            <span
              className={`rounded-full px-1.5 text-[10px] font-bold ${
                isActive ? 'bg-white/20' : 'bg-white text-slate-500'
              }`}
            >
              {counts[value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
