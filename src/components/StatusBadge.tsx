import type { ReadingStatus } from '@/types';
import { STATUS_LABELS } from '@/types';
import { Check, BookOpen, Bookmark } from 'lucide-react';

interface StatusBadgeProps {
  status: ReadingStatus;
  onCycle: () => void;
}

const STATUS_STYLES: Record<ReadingStatus, string> = {
  'want-to-read': 'bg-amber-100 text-amber-800 hover:bg-amber-200 ring-amber-200',
  'reading': 'bg-sky-100 text-sky-800 hover:bg-sky-200 ring-sky-200',
  'finished': 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 ring-emerald-200',
};

const STATUS_ICONS: Record<ReadingStatus, typeof Bookmark> = {
  'want-to-read': Bookmark,
  'reading': BookOpen,
  'finished': Check,
};

const NEXT_STATUS: Record<ReadingStatus, ReadingStatus> = {
  'want-to-read': 'reading',
  'reading': 'finished',
  'finished': 'want-to-read',
};

export default function StatusBadge({ status, onCycle }: StatusBadgeProps) {
  const Icon = STATUS_ICONS[status];

  return (
    <button
      onClick={onCycle}
      title={`Click to change to "${STATUS_LABELS[NEXT_STATUS[status]]}"`}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 transition active:scale-95 ${STATUS_STYLES[status]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {STATUS_LABELS[status]}
    </button>
  );
}


