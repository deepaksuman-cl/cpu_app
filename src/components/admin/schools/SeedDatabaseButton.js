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
      className={`px-4 py-2 flex items-center gap-2 rounded-none transition-colors border shadow-sm text-sm font-semibold
        ${isSeeding 
          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
          : 'bg-white text-emerald-700 border-emerald-600 hover:bg-emerald-50'
        }`}
      title="Seed Data from JSON"
    >
      {isSeeding ? <Loader2 size={16} className="animate-spin" /> : <Database size={16} />}
      {isSeeding ? 'Seeding...' : 'Seed Data from JSON'}
    </button>
  );
}
