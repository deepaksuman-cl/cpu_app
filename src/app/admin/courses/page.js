import Link from 'next/link';
import { getCourses } from '@/lib/actions/courseActions';
import { Plus, Edit } from 'lucide-react';
import DeleteCourseButton from '@/components/admin/courses/DeleteCourseButton';

export default async function CoursesPage() {
  const { data: courses, error } = await getCourses();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
        <Link 
          href="/admin/courses/create"
          className="bg-[#1c54a3] text-white px-4 py-2 flex items-center gap-2 rounded-none hover:bg-blue-800 transition-colors"
        >
          <Plus size={18} />
          Add New Course
        </Link>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-none">
          Failed to load courses: {error}
        </div>
      ) : (
        <div className="bg-white border text-sm border-gray-200 rounded-none overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs border-r border-gray-200">Course Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs border-r border-gray-200">Parent School</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs border-r border-gray-200">Slug</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!courses || courses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    No courses found. Create one to get started.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 border-r border-gray-200 font-medium text-gray-900">{course.name}</td>
                    <td className="py-3 px-4 border-r border-gray-200 text-gray-800">
                      {course.schoolId?.name || <span className="text-gray-400 italic">No School</span>}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-200 text-gray-600 font-mono text-xs">{course.slug}</td>
                    <td className="py-3 px-4 flex justify-center gap-2">
                      <Link 
                        href={`/admin/courses/edit/${course._id}`}
                        className="p-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-blue-600 transition-colors rounded-none"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteCourseButton id={course._id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
