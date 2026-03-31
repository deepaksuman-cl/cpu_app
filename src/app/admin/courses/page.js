import Link from 'next/link';
import { getCourses } from '@/lib/actions/courseActions';
import { Plus, Edit, Eye, FolderOpen, AlertCircle } from 'lucide-react';
import CourseList from '@/components/admin/courses/CourseList';

export default async function CoursesPage() {
  const { data: courses, error } = await getCourses();

  return (
    /* ── Parent Relative Container ── */
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)]">
      
      {/* ── Fixed/Sticky Header (Exactly 44px Height) ── */}
      {/* Note: Used 'sticky' instead of 'fixed' so it stays glued to the top but DOES NOT overflow to the right side behind the scrollbar. */}
      <div className="sticky top-[0px] z-30 flex items-center justify-between h-[44px] w-full bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm">
        
        {/* Left: Title */}
        <div className="flex items-center h-full px-4 gap-3">
          <h1 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-wider">
            Course Management
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center h-full px-4">
          <Link 
            href="/admin/courses/create"
            className="flex items-center justify-center h-[32px] px-3 sm:px-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-[var(--text-inverse)] transition-colors rounded-sm shadow-sm"
          >
            <Plus size={14} strokeWidth={2.5} />
            <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest ml-1.5">
              Add New Course
            </span>
          </Link>
        </div>
      </div>

      {/* ── Main Content Area (Compact Padding) ── */}
      <div className="w-full p-4 sm:p-5">
        
        {/* Error State */}
        {error ? (
          <div className="bg-[var(--color-danger-light)] border-l-4 border-[var(--color-danger)] text-[var(--color-danger-dark)] p-3 mb-4 rounded-none shadow-sm flex items-center gap-2 text-xs font-bold">
            <AlertCircle size={16} />
            Failed to load courses: {error}
          </div>
        ) : (
          
          /* Data Table / Cards with Client-Side Filtering */
          <div className="mt-4">
             <CourseList courses={courses} />
          </div>
        )}
      </div>
    </div>
  );
}