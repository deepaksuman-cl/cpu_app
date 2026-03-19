import Link from 'next/link';
import { getAllPages } from '@/lib/actions/pageActions';
import { Edit, Plus } from 'lucide-react';
import DeletePageButton from '@/components/admin/pages/DeletePageButton';

export const metadata = { title: 'Page Manager | Admin' };

export default async function PagesManager() {
  const result = await getAllPages();
  const pages = result.success ? result.data : [];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00588b]">Page Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Manage dynamically constructed pages for the portal.</p>
        </div>
        <Link 
          href="/admin/pages/create" 
          className="bg-[#00588b] text-white px-4 py-2 text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#004570] transition-colors rounded-none shadow-sm"
        >
          <Plus size={16} /> Create New Page
        </Link>
      </div>
      
      {result.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-700 text-sm font-semibold rounded-none">
          Failed to load pages: {result.error}
        </div>
      )}
      
      <div className="bg-white border border-gray-300 rounded-none shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="p-4 text-sm font-bold text-gray-700">Page Title</th>
              <th className="p-4 text-sm font-bold text-gray-700">URL Slug</th>
              <th className="p-4 text-sm font-bold text-gray-700 w-32 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map(page => (
              <tr key={page._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-800">{page.title}</td>
                <td className="p-4 text-sm text-gray-500 font-mono">/{page.slug}</td>
                <td className="p-4 flex gap-2 justify-end">
                  <Link 
                    href={`/admin/pages/edit/${page._id}`} 
                    title="Edit Page"
                    className="p-2 text-[#00588b] hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-none transition-colors"
                  >
                    <Edit size={16} />
                  </Link>
                  <DeletePageButton id={page._id} title={page.title} />
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-500 text-sm">
                  No pages found. Click "Create New Page" to deploy one to the web engine.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
