import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import CourseBuilderForm from '@/components/admin/courses/CourseBuilderForm';
import { getCourseById } from '@/lib/actions/courseActions';
import { getSchools } from '@/lib/actions/schoolActions';
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
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <Link 
          href="/admin/courses"
          className="p-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors rounded-none"
          title="Back to Courses"
        >
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
      </div>
      
      <CourseBuilderForm 
        schools={schoolsResult.success ? schoolsResult.data : []} 
        initialData={courseResult.data} 
      />
    </div>
  );
}
