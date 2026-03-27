'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';
import { deletePage } from '@/lib/actions/pageActions';
import toast from 'react-hot-toast';

export default function DeletePageButton({ id, title }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
    setLoading(true);
    const res = await deletePage(id);
    if (res.success) {
      toast.success(res.message || 'Deleted successfully!');
      router.refresh();
    } else {
      toast.error(res.message || 'Failed to delete');
      setLoading(false);
    }
  };

  return (
    <button 
      title="Delete Page"
      onClick={handleDelete} 
      disabled={loading} 
      className="p-2 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-none transition-colors disabled:opacity-50"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}
