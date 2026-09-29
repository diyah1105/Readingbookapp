import { BookMarked } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/50 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
        <BookMarked className="h-7 w-7 text-slate-400" />
      </div>
      <p className="text-sm font-medium text-slate-600">
        Your reading list is empty. Add your first book.
      </p>
    </div>
  );
}
