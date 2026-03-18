import Link from 'next/link';
import { getSchools } from '@/lib/actions/schoolActions';
import { Plus, Edit } from 'lucide-react';
import DeleteSchoolButton from '@/components/admin/schools/DeleteSchoolButton';
import SeedDatabaseButton from '@/components/admin/schools/SeedDatabaseButton';

export default async function SchoolsPage() {
  const { data: schools, error } = await getSchools();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">School Management</h1>
        <div className="flex items-center gap-3">
          <SeedDatabaseButton />
          <Link 
            href="/admin/schools/create"
            className="bg-[#1c54a3] text-white px-4 py-2 flex items-center gap-2 rounded-none hover:bg-blue-800 transition-colors"
          >
            <Plus size={18} />
            Add New School
          </Link>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-none">
          Failed to load schools: {error}
        </div>
      ) : (
        <div className="bg-white border text-sm border-gray-200 rounded-none overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs border-r border-gray-200">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs border-r border-gray-200">Slug</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs border-r border-gray-200">Created Date</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider text-xs w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!schools || schools.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    No schools found. Create one to get started.
                  </td>
                </tr>
              ) : (
                schools.map((school) => (
                  <tr key={school._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 border-r border-gray-200 font-medium text-gray-900">{school.name}</td>
                    <td className="py-3 px-4 border-r border-gray-200 text-gray-600 font-mono text-xs">{school.slug}</td>
                    <td className="py-3 px-4 border-r border-gray-200 text-gray-600">
                      {new Date(school.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 flex justify-center gap-2">
                      <Link 
                        href={`/admin/schools/edit/${school._id}`}
                        className="p-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-blue-600 transition-colors rounded-none"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteSchoolButton id={school._id} />
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
