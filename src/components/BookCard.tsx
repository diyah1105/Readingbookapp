import type { Book, ReadingStatus } from '@/types';
import StatusBadge from './StatusBadge';
import { Trash2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export default function BookCard({ book, onStatusChange, onRemove }: BookCardProps) {
  const cycleStatus = () => {
    const next: ReadingStatus = book.status === 'want-to-read'
      ? 'reading'
      : book.status === 'reading'
        ? 'finished'
        : 'want-to-read';
    onStatusChange(book.id, next);
  };

  return (
    <div className="group relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <button
        onClick={() => onRemove(book.id)}
        title="Delete book"
        className="absolute right-3 top-3 rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500 active:scale-90"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-3 pr-8">
        <div className="mt-0.5 flex h-9 w-7 shrink-0 items-center justify-center rounded bg-gradient-to-b from-sky-100 to-sky-200 text-sky-700">
          <span className="text-[10px] font-bold">📖</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-sm font-semibold leading-snug text-slate-900">
            {book.title}
          </h3>
          <div className="mt-2">
            <StatusBadge status={book.status} onCycle={cycleStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}
