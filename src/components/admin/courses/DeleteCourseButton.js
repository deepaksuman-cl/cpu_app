'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteCourse } from '@/lib/actions/courseActions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ConfirmModal from '@/components/admin/ui/ConfirmModal';

export default function DeleteCourseButton({ id }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteCourse(id);
      if (result.success) {
        toast.success(result.message || 'Deleted successfully!');
        router.refresh();
      } else {
        toast.error(result.message || 'Failed to delete');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowConfirm(true)}
        className="p-1.5 bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors rounded-none"
        title="Delete"
        type="button"
      >
        <Trash2 size={16} />
      </button>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course? This cannot be undone."
        confirmText="Delete Permanently"
        loading={loading}
      />
    </>
  );
}
