import BlocksPopover from '@/components/admin/pages/BlocksPopover';
import CompactCopyButton from '@/components/admin/pages/CompactCopyButton';
import CopySlugButton from '@/components/admin/pages/CopySlugButton';
import DeletePageButton from '@/components/admin/pages/DeletePageButton';
import PageSearch from '@/components/admin/pages/PageSearch';
import { getAllPages } from '@/lib/actions/pageActions';
import { Edit, Eye, FileText, Plus } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export const metadata = { title: 'Page Manager | Admin' };

export default async function PagesManager({ searchParams }) {
  const search = searchParams?.search || '';
  const result = await getAllPages(search);
  const pages = result.success ? result.data : [];

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)] flex flex-col">
      <Toaster position="bottom-right" />

      {/* Sticky Header */}
      <div className="sticky top-0 z-[40] flex items-center justify-between h-[44px] w-full bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm">
        <div className="flex items-center h-full px-4 gap-3">
          <FileText size={16} className="text-[#1c54a3]" strokeWidth={2.5} />
          <h1 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-wider">Page Manager</h1>
          <div className="hidden md:block w-[1px] h-4 bg-[var(--border-default)]"></div>
          <span className="hidden md:inline-block text-[12px] text-[var(--text-secondary)] font-bold tracking-wide">Dynamic page builder with content blocks</span>
        </div>
        <div className="flex items-center h-full px-4 gap-4">
          <PageSearch />
          <div className="w-[1px] h-4 bg-[var(--border-default)] hidden sm:block"></div>
          <Link
            href="/admin/pages/create"
            className="flex items-center justify-center h-[32px] px-3 sm:px-4 bg-[#1c54a3] hover:bg-[#153e7a] text-white transition-colors rounded-none shadow-sm uppercase tracking-widest text-[11px] font-bold gap-1.5"
          >
            <Plus size={13} strokeWidth={2.5} />
            <span className="hidden sm:block">Create New Page</span>
          </Link>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">

        {result.error && (
          <div className="mb-5 p-4 bg-[var(--bg-surface)] border-l-4 border-[var(--color-danger)] text-[var(--color-danger)] text-sm font-semibold rounded-none">
            Failed to load pages: {result.error}
          </div>
        )}

        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none shadow-sm overflow-visible">
          <div className="w-full max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
            <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="sticky top-0 z-[30]">
              <tr className="bg-[var(--bg-muted)] border-b border-[var(--border-default)]">
                <th className="px-6 py-4 text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] bg-[var(--bg-muted)] w-[20%]">Page Title</th>
                <th className="px-6 py-4 text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] bg-[var(--bg-muted)] w-[12%] text-center">CSS Meta ID</th>
                <th className="px-6 py-4 text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] bg-[var(--bg-muted)] w-[12%] text-center">CSS Class</th>
                <th className="px-6 py-4 text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] bg-[var(--bg-muted)] w-[24%] text-center">URL Slug</th>
                <th className="px-6 py-4 text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] bg-[var(--bg-muted)] w-[12%] text-center">Structure</th>
                <th className="px-6 py-4 text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] bg-[var(--bg-muted)] w-[10%] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-light)] overflow-visible">
              {pages.map(page => (
                <tr key={page.id} className="hover:bg-slate-50 transition-colors group relative hover:z-[50]">
                  <td className="px-4 py-3 font-black text-[#1c54a3] text-[13px] uppercase tracking-wide">
                    {page.title}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {page.pageCssId ? (
                      <div className="inline-flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-400">/{page.pageCssId}</span>
                        <CompactCopyButton text={page.pageCssId} label="CSS ID" />
                      </div>
                    ) : (
                      <span className="text-slate-200 text-[11px]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {page.pageCssClass ? (
                      <div className="inline-flex items-center gap-2">
                        <span className="text-[11px] font-mono text-emerald-600/60">.{page.pageCssClass}</span>
                        <CompactCopyButton text={page.pageCssClass} label="CSS Class" />
                      </div>
                    ) : (
                      <span className="text-slate-200 text-[11px]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-4">
                       <code className="text-[12px] text-slate-500 font-mono">
                        /{page.slug}
                       </code>
                       <CopySlugButton slug={page.slug} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                       <BlocksPopover blocks={page.blocks} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                        title="Live Preview"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`/admin/pages/edit/${page.id}`}
                        className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                        title="Edit Architecture"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeletePageButton id={page.id} title={page.title} />
                    </div>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-[var(--bg-muted)] flex items-center justify-center border border-[var(--border-default)]">
                         <FileText size={20} className="text-[var(--text-muted)]" />
                      </div>
                      <div className="text-xs font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">No Pages Found</div>
                      <Link href="/admin/pages/create" className="text-[10px] font-bold text-[var(--color-primary)] hover:underline uppercase tracking-widest">Initialize First Page</Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>

      </div>
    </div>
  );
}


