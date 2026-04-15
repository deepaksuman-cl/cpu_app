'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';
import { deletePage } from '@/lib/actions/pageActions';
import toast from 'react-hot-toast';
import ConfirmModal from '@/components/admin/ui/ConfirmModal';

export default function DeletePageButton({ id, title }) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const res = await deletePage(id);
      if (res.success) {
        toast.success(res.message || 'Deleted successfully!');
        router.refresh();
      } else {
        toast.error(res.message || 'Failed to delete');
        setLoading(false);
        setShowConfirm(false);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button 
        type="button"
        title="Delete Page"
        onClick={() => setShowConfirm(true)} 
        disabled={loading} 
        className="p-2 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-none transition-colors disabled:opacity-50"
      >
        <Trash2 size={16} />
      </button>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Page"
        message={`Are you sure you want to delete "${title}"? This page and all its content blocks will be permanently removed.`}
        confirmText="Delete Permanently"
        loading={loading}
      />
    </>
  );
}
