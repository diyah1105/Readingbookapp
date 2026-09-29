import { BookOpen, Bookmark, Check } from 'lucide-react';

interface SummaryProps {
  total: number;
  reading: number;
  finished: number;
}

export default function Summary({ total, reading, finished }: SummaryProps) {
  const stats = [
    {
      label: 'Total Books',
      value: total,
      icon: Bookmark,
      bg: 'bg-slate-100',
      text: 'text-slate-700',
    },
    {
      label: 'Currently Reading',
      value: reading,
      icon: BookOpen,
      bg: 'bg-sky-100',
      text: 'text-sky-700',
    },
    {
      label: 'Finished',
      value: finished,
      icon: Check,
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.bg}`}>
              <Icon className={`h-4 w-4 ${s.text}`} />
            </div>
            <span className="text-xl font-bold text-slate-900 sm:text-2xl">{s.value}</span>
            <span className="text-center text-[10px] font-medium leading-tight text-slate-500 sm:text-xs">
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
