import Link from 'next/link';
import { getAllPages } from '@/lib/actions/pageActions';
import { Edit, FileText, Plus } from 'lucide-react';
import DeletePageButton from '@/components/admin/pages/DeletePageButton';

export const metadata = { title: 'Page Manager | Admin' };

export default async function PagesManager() {
  const result = await getAllPages();
  const pages = result.success ? result.data : [];

  return (
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)] flex flex-col">

      {/* Sticky Header */}
      <div className="sticky top-0 z-[30] flex items-center justify-between h-[44px] w-full bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm" style={{ position: 'sticky', top: 0, marginTop: 0 }}>
        <div className="flex items-center h-full px-4 gap-3">
          <FileText size={14} className="text-[var(--text-muted)] hidden sm:block" strokeWidth={2.5} />
          <h1 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-wider">Page Manager</h1>
          <div className="hidden md:block w-[1px] h-4 bg-[var(--border-default)]"></div>
          <span className="hidden md:inline-block text-[12px] text-[var(--text-secondary)] font-bold tracking-wide">Dynamic page builder with content blocks</span>
        </div>
        <div className="flex items-center h-full px-4 gap-2">
          <Link
            href="/admin/pages/create"
            className="flex items-center justify-center h-[32px] px-3 sm:px-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-[var(--text-inverse)] transition-colors rounded-none shadow-sm uppercase tracking-widest text-[11px] font-bold gap-1.5"
          >
            <Plus size={13} strokeWidth={2.5} />
            <span className="hidden sm:block">Create New Page</span>
          </Link>
        </div>
      </div>

      <div className="w-[98%] lg:w-[95%] xl:w-[92%] mx-auto py-6">

        {result.error && (
          <div className="mb-5 p-4 bg-[var(--bg-surface)] border-l-4 border-[var(--color-danger)] text-[var(--color-danger)] text-sm font-semibold rounded-none">
            Failed to load pages: {result.error}
          </div>
        )}

        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-muted)] border-b border-[var(--border-default)]">
                <th className="px-4 py-3 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Page Title</th>
                <th className="px-4 py-3 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest hidden sm:table-cell">URL Slug</th>
                <th className="px-4 py-3 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(page => (
                <tr key={page._id} className="border-b border-[var(--border-light)] hover:bg-[var(--bg-muted)] transition-colors">
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)] text-sm">{page.title}</td>
                  <td className="px-4 py-3 text-xs text-[var(--text-muted)] font-mono hidden sm:table-cell">/{page.slug}</td>
                  <td className="px-4 py-3 flex gap-1.5 justify-end">
                    <Link
                      href={`/admin/pages/edit/${page._id}`}
                      title="Edit Page"
                      className="p-2 text-[var(--color-primary)] hover:bg-[var(--bg-body)] border border-transparent hover:border-[var(--border-default)] rounded-none transition-colors"
                    >
                      <Edit size={15} />
                    </Link>
                    <DeletePageButton id={page._id} title={page.title} />
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-4 py-12 text-center text-[var(--text-muted)] text-sm">
                    No pages found. Click <strong>Create New Page</strong> to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}


