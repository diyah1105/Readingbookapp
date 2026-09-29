import { useState, useEffect, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import type { Book, ReadingStatus } from '@/types';
import { STATUS_ORDER } from '@/types';
import { loadBooks, saveBooks } from '@/lib/storage';
import AddBookForm from '@/components/AddBookForm';
import FilterBar, { type FilterValue } from '@/components/FilterBar';
import BookCard from '@/components/BookCard';
import EmptyState from '@/components/EmptyState';
import Summary from '@/components/Summary';

export default function App() {
  const [books, setBooks] = useState<Book[]>(() => loadBooks());
  const [filter, setFilter] = useState<FilterValue>('all');

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  const counts = useMemo(() => {
    const c: Record<FilterValue, number> = {
      all: books.length,
      'want-to-read': 0,
      'reading': 0,
      'finished': 0,
    };
    for (const b of books) c[b.status]++;
    return c;
  }, [books]);

  const filtered = useMemo(() => {
    const list = filter === 'all' ? books : books.filter((b) => b.status === filter);
    return [...list].sort((a, b) => {
      const so = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
      if (so !== 0) return so;
      return b.createdAt - a.createdAt;
    });
  }, [books, filter]);

  const addBook = (title: string): string | null => {
    if (title.length > 60) {
      return 'Book title must be 60 characters or fewer.';
    }
    const normalized = title.trim().toLowerCase();
    const exists = books.some((b) => b.title.trim().toLowerCase() === normalized);
    if (exists) {
      return 'This book is already in your reading list.';
    }
    const book: Book = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title,
      status: 'want-to-read',
      createdAt: Date.now(),
    };
    setBooks((prev) => [book, ...prev]);
    return null;
  };

  const changeStatus = (id: string, status: ReadingStatus) => {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const removeBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <header className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-md shadow-sky-200">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Reading List</h1>
            <p className="text-sm text-slate-500">Track books you want to read, are reading, and have finished.</p>
          </div>
        </header>

        {/* Add form */}
        <div className="mb-5">
          <AddBookForm onAdd={addBook} />
        </div>

        {/* Summary — only when books exist */}
        {books.length > 0 && (
          <div className="mb-5">
            <Summary
              total={books.length}
              reading={counts['reading']}
              finished={counts['finished']}
            />
          </div>
        )}

        {/* Filter bar — only when books exist */}
        {books.length > 0 && (
          <div className="mb-5">
            <FilterBar active={filter} counts={counts} onChange={setFilter} />
          </div>
        )}

        {/* Book list / empty state */}
        {books.length === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">No books in this category.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onStatusChange={changeStatus}
                onRemove={removeBook}
              />
            ))}
          </div>
        )}

        {/* Footer hint */}
        {books.length > 0 && (
          <p className="mt-6 text-center text-xs text-slate-400">
            Tip: tap a book's status badge to cycle through statuses.
          </p>
        )}
      </div>
    </div>
  );
}
