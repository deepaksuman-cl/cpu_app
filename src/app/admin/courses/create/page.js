import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import CourseBuilderForm from '@/components/admin/courses/CourseBuilderForm';
import { getSchools } from '@/lib/actions/schoolActions';

export default async function CreateCoursePage() {
  const { data: schools, success } = await getSchools();

  return (
    /* ── Main Relative Container ── */
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)]">
      
      {/* ── Fixed Top Header (Exactly 42px Height) ── */}
      {/* fixed ensures it stays on screen, top-[72px] positions it below your main topbar */}
      <div className="fixed top-[72px] z-30 flex items-center h-[42px] bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm w-full">
        
        {/* Back Button (Edge-to-edge height) */}
        <Link 
          href="/admin/courses"
          className="flex items-center justify-center h-full px-4 border-r border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors group rounded-none"
          title="Back to Courses"
        >
          <ChevronLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:block text-[12px] font-bold uppercase tracking-widest ml-1">
            Back
          </span>
        </Link>
        
        {/* Title & Subtitle */}
        <div className="flex items-center h-full px-4 gap-3">
          <h1 className="text-[14px] sm:text-[15px] font-black text-[var(--text-primary)] uppercase tracking-wide">
            Create New Course
          </h1>
          
          {/* Vertical Divider (Hidden on small screens) */}
          <div className="hidden md:block w-[1px] h-4 bg-[var(--border-default)]"></div>
          
          {/* Subtitle description */}
          <span className="hidden md:inline-block text-[12px] text-[var(--text-muted)] font-medium tracking-wide">
            Setup a new academic program
          </span>
        </div>

      </div>
      
      {/* ── Form Container ── */}
      {/* pt-[42px] offsets the fixed header height so the form doesn't hide behind it */}
      <div className="pt-[42px] w-full">
        <div className="pt-2 sm:pt-4">
          <CourseBuilderForm schools={success ? schools : []} />
        </div>
      </div>

    </div>
  );
}