'use client';

import { Search, X } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CourseSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('search') || '');

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set('search', query);
      } else {
        params.delete('search');
      }
      // Reset page if applicable or just update query
      router.push(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, pathname, router, searchParams]);

  return (
    <div className="relative flex items-center h-[32px] w-[200px] sm:w-[260px]">
      <div className="absolute left-2.5 text-[var(--text-muted)] pointer-events-none">
        <Search size={14} strokeWidth={2.5} />
      </div>
      <input
        type="text"
        placeholder="Search courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-full w-full pl-8 pr-8 bg-[var(--bg-body)] border border-[var(--border-default)] focus:border-[var(--color-primary)] outline-none text-[11px] font-bold uppercase tracking-wider rounded-none transition-all placeholder:text-[var(--text-muted)]/50"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-2 text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
