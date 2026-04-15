'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Loader2 } from 'lucide-react';
import { duplicatePage } from '@/lib/actions/pageActions';
import toast from 'react-hot-toast';

export default function DuplicatePageButton({ id, title }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDuplicate = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // We can skip confirm for duplication as it's non-destructive, 
    // but it's safer to have it if the user wants. 
    // For now, let's just do it directly for better UX.
    
    setLoading(true);
    try {
      const res = await duplicatePage(id);
      if (res.success) {
        toast.success(res.message || 'Page duplicated successfully!');
        router.refresh();
      } else {
        toast.error(res.message || 'Failed to duplicate page');
      }
    } catch (error) {
      toast.error('An error occurred during duplication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      title="Duplicate Page"
      onClick={handleDuplicate} 
      disabled={loading} 
      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-none transition-all disabled:opacity-50"
    >
      {loading ? <Loader2 size={16} className="animate-spin text-blue-600" /> : <Copy size={16} />}
    </button>
  );
}
