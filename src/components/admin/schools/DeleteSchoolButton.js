'use client';

import { Trash2 } from 'lucide-react';
import { deleteSchool } from '@/lib/actions/schoolActions';
import { useRouter } from 'next/navigation';

export default function DeleteSchoolButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this school?')) {
      const result = await deleteSchool(id);
      if (result.success) {
        router.refresh();
      } else {
        alert('Failed to delete: ' + result.error);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="p-1.5 bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors rounded-none"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  );
}
