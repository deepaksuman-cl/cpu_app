'use client';

import { useState } from 'react';
import { seedDatabase } from '@/lib/actions/seedActions';
import { Database, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SeedDatabaseButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const router = useRouter();

  const handleSeed = async () => {
    if (!confirm('WARNING: This will delete all existing Schools and Courses and re-seed from the local JSON file. Are you sure you want to proceed?')) {
      return;
    }

    setIsSeeding(true);
    try {
      const result = await seedDatabase();
      if (result.success) {
        alert('Database seeded successfully!');
        router.refresh();
      } else {
        alert(`Seed failed: ${result.error}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <button
      onClick={handleSeed}
      disabled={isSeeding}
      className={`h-[32px] px-3 flex items-center justify-center gap-1.5 rounded-sm transition-colors border text-[10px] font-bold shadow-sm uppercase tracking-widest shrink-0
        ${isSeeding 
          ? 'bg-[var(--bg-muted)] text-[var(--text-muted)] border-[var(--border-default)] cursor-not-allowed' 
          : 'bg-[var(--bg-surface)] text-[var(--color-warning-dark)] border-[var(--border-default)] hover:border-[var(--color-warning-dark)] hover:bg-[var(--color-warning-lighter)]'
        }`}
      title="Seed Data from JSON"
    >
      {isSeeding ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} strokeWidth={2} />}
      <span className="hidden sm:block">{isSeeding ? 'Seeding...' : 'Seed Database'}</span>
    </button>
  );
}
