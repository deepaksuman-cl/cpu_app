import CourseBuilderForm from '@/components/admin/courses/CourseBuilderForm';
import { getCourseById } from '@/lib/actions/courseActions';
import { getSchools } from '@/lib/actions/schoolActions';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditCoursePage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const [courseResult, schoolsResult] = await Promise.all([
    getCourseById(id),
    getSchools()
  ]);

  if (!courseResult.success || !courseResult.data) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-[var(--bg-body)] relative">
      
      {/* ── Fixed/Sticky Page Header (Exactly 42px Height) ── */}
      {/* top-[72px] ensures it sits perfectly under your main 72px TopBar */}
      <div className="fixed top-[72px] z-30 flex items-center h-[42px] bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm w-full">
        
        {/* Back Button (Edge-to-edge height) */}
        <Link 
          href="/admin/courses"
          className="flex items-center justify-center h-full px-4 border-r border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors group rounded-none"
          title="Back to Courses"
        >
          <ChevronLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:block text-[12px] font-bold uppercase tracking-widest ml-1">Back</span>
        </Link>
        
        {/* Title & Course Name */}
        <div className="flex items-center h-full px-4 gap-3">
          <h1 className="text-[15px] sm:text-[16px] font-black text-[var(--text-primary)] uppercase tracking-wide">
            Edit Course
          </h1>
          
          <div className="hidden md:block w-[1px] h-4 bg-[var(--border-default)]"></div>
          
          {/* Shows the course name so admin knows what they are editing */}
          <span className="hidden md:inline-block text-[13px] text-[var(--text-muted)] font-medium truncate max-w-[250px] lg:max-w-[500px]">
            {courseResult.data.name}
          </span>
        </div>

      </div>
      
      {/* ── Course Builder Form Container ── */}
      {/* pt-[42px] offsets the fixed header height so the form doesn't hide behind it */}
      <div className="pt-[42px] w-full">
        <div className="pt-2 sm:pt-4">
          <CourseBuilderForm 
            schools={schoolsResult.success ? schoolsResult.data : []} 
            initialData={courseResult.data} 
          />
        </div>
      </div>

    </div>
  );
}