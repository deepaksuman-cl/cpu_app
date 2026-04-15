'use client';

import { useState } from 'react';
import { Copy, Loader2 } from 'lucide-react';
import { duplicateCourse } from '@/lib/actions/courseActions';

export default function DuplicateCourseButton({ id }) {
  const [isDuplicating, setIsDuplicating] = useState(false);

  async function handleDuplicate() {
    if (!confirm('Are you sure you want to duplicate this course?')) return;

    setIsDuplicating(true);
    try {
      const result = await duplicateCourse(id);
      if (result.success) {
        alert(result.message || 'Course duplicated successfully!');
      } else {
        alert(result.error || 'Failed to duplicate course.');
      }
    } catch (err) {
      alert('An error occurred during duplication.');
    } finally {
      setIsDuplicating(false);
    }
  }

  return (
    <button
      onClick={handleDuplicate}
      disabled={isDuplicating}
      className={`p-2 md:p-1 bg-[var(--bg-body)] text-[var(--text-secondary)] hover:bg-[#00588b] hover:text-white border border-[var(--border-default)] transition-colors rounded-none flex items-center justify-center ${isDuplicating ? 'opacity-50 cursor-not-allowed' : ''}`}
      title="Duplicate Course"
    >
      {isDuplicating ? (
        <Loader2 className="w-4 h-4 md:w-3.5 md:h-3.5 animate-spin" />
      ) : (
        <Copy className="w-4 h-4 md:w-3.5 md:h-3.5" />
      )}
      <span className="md:hidden text-[10px] font-bold uppercase ml-2 tracking-widest">
        {isDuplicating ? 'Cloning...' : 'Duplicate'}
      </span>
    </button>
  );
}
