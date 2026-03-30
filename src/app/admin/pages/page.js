import Link from 'next/link'; 
import { getAllPages } from '@/lib/actions/pageActions';
import { Edit, Eye, FileText, Plus } from 'lucide-react';
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

        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-muted)] border-b border-[var(--border-default)]">
                <th className="px-4 py-3 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Page Title</th>
                <th className="px-4 py-3 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest hidden lg:table-cell">Page ID</th>
                <th className="px-4 py-3 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest hidden sm:table-cell">URL Slug</th>
                <th className="px-4 py-3 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest text-center">Structure</th>
                <th className="px-4 py-3 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(page => (
                <tr key={page.id} className="border-b border-[var(--border-light)] hover:bg-[var(--bg-muted)] transition-colors">
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)] text-sm">{page.title}</td>
                  <td className="px-4 py-3 text-[11px] text-[var(--text-muted)] font-mono hidden lg:table-cell">{page.pageCssId || <span className="opacity-30">-</span>}</td>
                  <td className="px-4 py-3 text-xs text-[var(--text-muted)] font-mono hidden sm:table-cell">/{page.slug}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="relative group inline-block">
                      <span className="cursor-help bg-[var(--bg-muted)] hover:bg-[var(--bg-hover)] border border-[var(--border-default)] text-[var(--text-secondary)] text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors whitespace-nowrap">
                        {page.blocks?.length || 0} {page.blocks?.length === 1 ? 'Block' : 'Blocks'}
                      </span>
                      {/* Tooltip */}
                      {page.blocks && page.blocks.length > 0 && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block z-[100] w-64 p-3 bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-xl text-left pointer-events-none">
                          <div className="text-[10px] font-black text-[var(--text-primary)] border-b border-[var(--border-light)] pb-1.5 mb-2 uppercase tracking-widest">Page Structure</div>
                          <div className="space-y-1.5 max-h-60 overflow-y-auto">
                            {page.blocks.map((block, idx) => {
                              let color = 'text-blue-500';
                              if (block.blockType.toLowerCase().includes('hero')) color = 'text-green-500';
                              if (block.blockType.toLowerCase().includes('grid')) color = 'text-yellow-500';
                              if (block.blockType.toLowerCase().includes('footer') || block.blockType.toLowerCase().includes('cta')) color = 'text-purple-500';
                              
                              return (
                                <div key={idx} className="flex items-start gap-2 text-[11px] leading-tight">
                                  <span className={`${color} mt-0.5 text-[8px]`}>●</span>
                                  <div className="flex-1">
                                    <div className="font-bold text-[var(--text-primary)]">{block.blockType}</div>
                                    {block.cssId && <div className="text-[10px] text-[var(--text-muted)] font-mono">#{block.cssId}</div>}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-[var(--border-default)]"></div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[7px] border-transparent border-b-[var(--bg-surface)] mb-[-1px]"></div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 flex gap-1.5 justify-end">
                    <Link
                      href={`/${page.slug}`}
                      target="_blank"
                      title="Preview Page"
                      className="p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-body)] border border-transparent hover:border-[var(--border-default)] rounded-none transition-colors"
                    >
                      <Eye size={15} />
                    </Link>
                    <Link
                      href={`/admin/pages/edit/${page.id}`}
                      title="Edit Page"
                      className="p-2 text-[var(--color-primary)] hover:bg-[var(--bg-body)] border border-transparent hover:border-[var(--border-default)] rounded-none transition-colors"
                    >
                      <Edit size={15} />
                    </Link>
                    <DeletePageButton id={page.id} title={page.title} />
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center text-[var(--text-muted)] text-sm">
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


