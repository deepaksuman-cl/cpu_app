import Link from 'next/link';
import { getCourses } from '@/lib/actions/courseActions';
import { Plus, Edit, Eye, FolderOpen, AlertCircle } from 'lucide-react';
import DeleteCourseButton from '@/components/admin/courses/DeleteCourseButton';

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
          
          /* Data Table / Cards */
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none overflow-hidden shadow-sm">
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse text-left block md:table md:min-w-[700px]">
                
                {/* Compact Table Header (Hidden on Mobile) */}
                <thead className="hidden md:table-header-group bg-[var(--bg-muted)] border-b border-[var(--border-default)]">
                  <tr>
                    <th className="py-2.5 px-4 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-[10px] border-r border-[var(--border-light)] w-[35%]">Course Name</th>
                    <th className="py-2.5 px-4 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-[10px] border-r border-[var(--border-light)] w-[30%]">Parent School</th>
                    <th className="py-2.5 px-4 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-[10px] border-r border-[var(--border-light)] w-[20%]">Slug</th>
                    <th className="py-2.5 px-4 text-center font-bold text-[var(--text-secondary)] uppercase tracking-widest text-[10px] w-[15%]">Actions</th>
                  </tr>
                </thead>
                
                {/* Table Body */}
                <tbody className="block md:table-row-group divide-y divide-[var(--border-light)]">
                  {!courses || courses.length === 0 ? (
                    <tr className="block md:table-row">
                      <td colSpan="4" className="block md:table-cell py-10 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <FolderOpen size={24} className="text-[var(--text-muted)]" strokeWidth={1.5} />
                          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">No courses found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    courses.map((course) => (
                      <tr key={course.id} className="block md:table-row hover:bg-[var(--bg-muted)] transition-colors group p-4 md:p-0">
                        
                        {/* Course Name */}
                        <td className="block md:table-cell py-1 md:py-2 px-0 md:px-4 border-none md:border-r border-[var(--border-light)] mb-2 md:mb-0">
                          <span className="md:hidden text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Course Name</span>
                          <span className="font-semibold text-[var(--text-primary)] text-[14px] md:text-[12px]">{course.name}</span>
                        </td>
                        
                        {/* Parent School */}
                        <td className="block md:table-cell py-1 md:py-2 px-0 md:px-4 border-none md:border-r border-[var(--border-light)] mb-2 md:mb-0">
                          <span className="md:hidden text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Parent School</span>
                          {course.school?.name ? (
                            <span className="text-[var(--text-secondary)] font-medium text-[13px] md:text-[12px]">{course.school.name}</span>
                          ) : (
                            <span className="text-[var(--text-muted)] italic text-[10px] bg-[var(--bg-body)] border border-[var(--border-default)] px-1.5 py-0.5">No School</span>
                          )}
                        </td>
                        
                        {/* Slug */}
                        <td className="block md:table-cell py-1 md:py-2 px-0 md:px-4 border-none md:border-r border-[var(--border-light)] mb-4 md:mb-0">
                          <span className="md:hidden text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Slug</span>
                          <span className="font-mono text-[11px] md:text-[10px] bg-[var(--bg-body)] px-1.5 py-0.5 border border-[var(--border-default)] text-[var(--text-muted)] inline-block">
                            /{course.slug}
                          </span>
                        </td>
                        
                        {/* Actions */}
                        <td className="block md:table-cell py-2 md:py-2 px-0 md:px-4 border-t border-[var(--border-light)] pt-3 md:border-none md:pt-0">
                          <div className="flex justify-start md:justify-center items-center gap-3 md:gap-2">
                            <Link 
                              href={`/schools/${course.school?.slug || 'unknown'}/${course.slug}`}
                              target="_blank"
                              className="p-2 md:p-1 bg-[var(--bg-body)] text-[var(--text-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--text-inverse)] border border-[var(--border-default)] transition-colors rounded-none flex items-center justify-center"
                              title="Preview"
                            >
                              <Eye className="w-4 h-4 md:w-3.5 md:h-3.5" />
                              <span className="md:hidden text-[10px] font-bold uppercase ml-2 tracking-widest">Preview</span>
                            </Link>
                            <Link 
                              href={`/admin/courses/edit/${course.id}`}
                              className="p-2 md:p-1 bg-[var(--bg-body)] text-[var(--text-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--text-inverse)] border border-[var(--border-default)] transition-colors rounded-none flex items-center justify-center"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 md:w-3.5 md:h-3.5" />
                              <span className="md:hidden text-[10px] font-bold uppercase ml-2 tracking-widest">Edit</span>
                            </Link>
                            
                            {/* Backend Delete functionality intact */}
                            <div className="flex items-center justify-center">
                              <DeleteCourseButton id={course.id} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}