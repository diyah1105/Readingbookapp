import { useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';

interface AddBookFormProps {
  onAdd: (title: string) => string | null;
}

export default function AddBookForm({ onAdd }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    const err = onAdd(trimmed);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={title}
          maxLength={120}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Enter a book title..."
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Book</span>
          <span className="sm:hidden">Add</span>
        </button>
      </form>
      {error && (
        <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
