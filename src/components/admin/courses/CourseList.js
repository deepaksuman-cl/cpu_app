'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Edit, Eye, FolderOpen, Filter, ChevronDown } from 'lucide-react';
import DeleteCourseButton from '@/components/admin/courses/DeleteCourseButton';

export default function CourseList({ courses }) {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Extract unique school names ensuring unknown/null is handled safely
  const uniqueSchools = useMemo(() => {
    if (!courses) return [];
    const schools = new Set();
    courses.forEach(c => {
      if (c.school?.name) schools.add(c.school.name);
    });
    return Array.from(schools).sort();
  }, [courses]);

  // Filter courses based on selection
  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    if (!selectedSchool) return courses;
    if (selectedSchool === 'No School') return courses.filter(c => !c.school?.name);
    return courses.filter(c => c.school?.name === selectedSchool);
  }, [courses, selectedSchool]);

  return (
    <div className="space-y-4">
      {/* ── Filters Bar ── */}
      {(uniqueSchools.length > 0) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--bg-surface)] p-4 border border-[var(--border-default)] rounded-none shadow-sm">
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <Filter size={16} />
            <span className="text-[11px] font-bold uppercase tracking-widest">Filter by School</span>
          </div>
          <div className="relative w-full sm:w-72">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-between w-full px-4 py-2.5 bg-[var(--bg-body)] border border-[var(--border-default)] hover:bg-[var(--bg-muted)] text-[var(--text-primary)] text-[11px] font-bold uppercase tracking-widest transition-colors shadow-sm focus:border-[var(--color-primary)] outline-none"
            >
              <span className="truncate">
                {selectedSchool === '' ? `All Schools (${courses.length})` : selectedSchool === 'No School' ? 'No School (Unassigned)' : selectedSchool}
              </span>
              <ChevronDown size={14} className={`transition-transform duration-200 ml-2 flex-shrink-0 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showDropdown && (
              <>
                <div className="fixed inset-0 z-[40]" onClick={() => setShowDropdown(false)}></div>
                <div className="absolute left-0 top-full mt-1.5 z-[50] w-full bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-xl p-1 animate-in fade-in slide-in-from-top-2 duration-200 max-h-64 overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-1 gap-0.5">
                    <button
                      type="button"
                      onClick={() => { setSelectedSchool(''); setShowDropdown(false); }}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 text-left transition-colors border border-transparent ${selectedSchool === '' ? 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] border-[var(--color-primary)]' : 'hover:bg-[var(--bg-muted)] hover:border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider">All Schools ({courses.length})</span>
                    </button>
                    {uniqueSchools.map(sch => (
                      <button
                        key={sch}
                        type="button"
                        onClick={() => { setSelectedSchool(sch); setShowDropdown(false); }}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 text-left transition-colors border border-transparent ${selectedSchool === sch ? 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] border-[var(--color-primary)]' : 'hover:bg-[var(--bg-muted)] hover:border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                      >
                        <span className="text-[11px] font-bold uppercase tracking-wider">{sch}</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => { setSelectedSchool('No School'); setShowDropdown(false); }}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 text-left transition-colors border border-transparent ${selectedSchool === 'No School' ? 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] border-[var(--color-primary)]' : 'hover:bg-[var(--bg-muted)] hover:border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider">No School (Unassigned)</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Table Container ── */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none overflow-hidden shadow-sm">
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse text-left block md:table md:min-w-[700px]">
            {/* Table Header */}
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
              {filteredCourses.length === 0 ? (
                <tr className="block md:table-row">
                  <td colSpan="4" className="block md:table-cell py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FolderOpen size={24} className="text-[var(--text-muted)]" strokeWidth={1.5} />
                      <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">No courses found matching filter</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course) => (
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
    </div>
  );
}
