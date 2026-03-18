import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import CourseBuilderForm from '@/components/admin/courses/CourseBuilderForm';
import { getSchools } from '@/lib/actions/schoolActions';

export default async function CreateCoursePage() {
  const { data: schools, success } = await getSchools();

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
        <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
      </div>
      
      <CourseBuilderForm schools={success ? schools : []} />
    </div>
  );
}
