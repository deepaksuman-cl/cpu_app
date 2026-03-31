'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  BookOpen, 
  Link as LinkIcon, 
  Save, 
  X, 
  Loader2, 
  Check, 
  ToggleLeft,
  ToggleRight,
  Eye,
  Image as ImageIcon,
  MousePointer2
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import MediaUploader from '@/components/admin/MediaUploader';
import Modal from '@/components/admin/ui/Modal';

export default function FlipbookManager() {
  const router = useRouter();
  const [flipbooks, setFlipbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    pdf_url: '',
    cover_image: '',
    backdrop_image: '',
    meta_title: '',
    meta_description: '',
    isActive: true
  });

  const fetchFlipbooks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/flipbooks');
      const data = await res.json();
      if (data.success) {
        setFlipbooks(data.data);
      } else {
        toast.error(data.message || 'Failed to fetch flipbooks');
      }
    } catch (error) {
      toast.error('Error connecting to API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlipbooks();
  }, []);

  const handleEdit = (flipbook) => {
    setEditingId(flipbook.id);
    setFormData({
      title: flipbook.title,
      slug: flipbook.slug,
      pdf_url: flipbook.pdf_url,
      cover_image: flipbook.cover_image || '',
      backdrop_image: flipbook.backdrop_image || '',
      meta_title: flipbook.meta_title || '',
      meta_description: flipbook.meta_description || '',
      isActive: flipbook.isActive
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this flipbook?')) return;
    try {
      const res = await fetch(`/api/admin/flipbooks/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Deleted successfully');
        fetchFlipbooks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleToggleStatus = async (flipbook) => {
    try {
      const res = await fetch(`/api/admin/flipbooks/${flipbook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !flipbook.isActive })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Status updated to ${!flipbook.isActive ? 'Active' : 'Inactive'}`);
        fetchFlipbooks();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/admin/flipbooks/${editingId}` : '/api/admin/flipbooks';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success(editingId ? 'Updated successfully' : 'Created successfully');
        setIsModalOpen(false);
        resetForm();
        fetchFlipbooks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to save flipbook');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      pdf_url: '',
      cover_image: '',
      backdrop_image: '',
      meta_title: '',
      meta_description: '',
      isActive: true
    });
  };

  const copyToClipboard = (slug) => {
    const url = `${window.location.origin}/flipbook/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success('Public URL copied!');
  };

  const copySlugToClipboard = (slug) => {
    navigator.clipboard.writeText(slug);
    toast.success('Slug copied!');
  };

  const handlePreview = (slug) => {
    window.open(`/flipbook/${slug}`, '_blank');
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)]">
      <Toaster position="bottom-right" />
      
      {/* ── Header ── */}
      <div className="sticky top-0 z-40 flex items-center justify-between h-[44px] w-full bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm">
        <div className="flex items-center h-full px-4 gap-3">
          <BookOpen size={16} className="text-[#1c54a3]" />
          <h1 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-wider">
            Premium Flipbook Manager
          </h1>
        </div>
        <div className="px-4">
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="flex items-center justify-center h-[32px] px-4 bg-[#1c54a3] hover:bg-[#153e7a] text-white transition-colors rounded-none shadow-sm"
          >
            <Plus size={14} strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-widest ml-1.5">
              Provision Asset
            </span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left block md:table md:min-w-[800px]">
              <thead className="hidden md:table-header-group bg-[var(--bg-muted)] border-b border-[var(--border-default)]">
                <tr>
                  <th className="py-3 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-[10px] border-r border-[var(--border-light)] w-[30%]">Brochure Metadata</th>
                  <th className="py-3 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-[10px] border-r border-[var(--border-light)] w-[20%]">Dynamic Slug</th>
                  <th className="py-3 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-[10px] border-r border-[var(--border-light)] w-[25%] text-center">PDF Asset</th>
                  <th className="py-3 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-[10px] border-r border-[var(--border-light)] w-[10%] text-center">Status</th>
                  <th className="py-3 px-6 font-bold text-[var(--text-secondary)] uppercase tracking-widest text-[10px] text-center w-[15%]">Engine Actions</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group divide-y divide-[var(--border-light)]">
                {loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <tr key={i} className="block md:table-row animate-pulse">
                      <td colSpan="5" className="block md:table-cell py-4 px-6 border-b border-[var(--border-light)]">
                        <div className="h-4 bg-[var(--bg-muted)] w-full rounded"></div>
                      </td>
                    </tr>
                  ))
                ) : flipbooks.length === 0 ? (
                  <tr className="block md:table-row">
                    <td colSpan="5" className="block md:table-cell py-12 text-center text-[var(--text-muted)] text-[11px] font-bold uppercase tracking-widest">
                      Zero brochures active. Initiate provision to begin.
                    </td>
                  </tr>
                ) : (
                  flipbooks.map((fb) => (
                    <tr key={fb.id} className="block md:table-row hover:bg-[var(--bg-muted)] transition-colors group">
                      <td className="block md:table-cell py-4 px-6 border-r border-[var(--border-light)] font-bold text-[var(--text-primary)] text-[12px]">
                        <span className="md:hidden text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-1.5">Brochure Metadata</span>
                        <div className="flex items-center gap-4">
                          <div className="relative group/cover">
                            {fb.cover_image ? (
                              <img src={fb.cover_image} alt="" className="w-12 h-16 object-cover border border-[var(--border-default)] shadow-sm bg-[var(--bg-muted)] transition-transform group-hover/cover:scale-110" />
                            ) : (
                              <div className="w-12 h-16 bg-gray-100 flex items-center justify-center border border-gray-200"><ImageIcon size={14} className="opacity-20" /></div>
                            )}
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[#1c54a3] font-black">{fb.title}</span>
                             <span className="text-[10px] text-gray-400 font-medium mt-1">ID: {fb.id.slice(0, 8)}...</span>
                          </div>
                        </div>
                      </td>
                      <td className="block md:table-cell py-4 px-6 border-r border-[var(--border-light)]">
                        <span className="md:hidden text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-1.5">Dynamic Slug</span>
                        <div className="flex flex-col gap-2">
                           <code className="bg-[var(--bg-body)] px-2 py-1 border border-dashed border-[var(--border-default)] text-[10px] text-gray-500 font-mono">/{fb.slug}</code>
                           <button onClick={() => copySlugToClipboard(fb.slug)} className="flex items-center gap-1.5 text-[9px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest">
                              <MousePointer2 size={10} /> Copy Slug
                           </button>
                        </div>
                      </td>
                      <td className="block md:table-cell py-4 px-6 border-r border-[var(--border-light)] text-center">
                        <span className="md:hidden text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-1.5 text-center">PDF Asset</span>
                        <div className="flex justify-center flex-col items-center gap-2">
                           <a href={fb.pdf_url} target="_blank" className="flex items-center gap-1.5 text-[10px] font-black text-[#1c54a3] hover:underline uppercase tracking-wide">
                             <LinkIcon size={12} /> View Source
                           </a>
                           {fb.backdrop_image && (
                             <span className="text-[8px] bg-amber-100 text-amber-700 px-1.5 py-0.5 font-black uppercase tracking-widest">Backdrop Active</span>
                           )}
                        </div>
                      </td>
                      <td className="block md:table-cell py-4 px-6 border-r border-[var(--border-light)] text-center">
                        <span className="md:hidden text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-1.5 text-center">Status</span>
                        <button 
                          onClick={() => handleToggleStatus(fb)}
                          className={`transition-colors ${fb.isActive ? 'text-[#1c54a3]' : 'text-gray-400'}`}
                        >
                          {fb.isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                        </button>
                      </td>
                      <td className="block md:table-cell py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handlePreview(fb.slug)} className="p-2.5 bg-white text-gray-500 border border-gray-200 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm" title="Live Preview"><Eye size={14} /></button>
                          <button onClick={() => copyToClipboard(fb.slug)} className="p-2.5 bg-white text-gray-500 border border-gray-200 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm" title="Copy Public URL"><Copy size={14} /></button>
                          <button onClick={() => handleEdit(fb)} className="p-2.5 bg-white text-gray-500 border border-gray-200 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm" title="Edit Brochure"><Edit size={14} /></button>
                          <button onClick={() => handleDelete(fb.id)} className="p-2.5 bg-white text-gray-500 border border-gray-200 hover:text-red-500 hover:border-red-500 transition-all shadow-sm" title="Eject Asset"><Trash2 size={14} /></button>
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

      {/* Admin Central Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Brochure Modification' : 'System Provisioning'}
        subtitle={editingId ? `Tuning asset: ${formData.title}` : 'Initializing a new high-fidelity brochures for the public portal.'}
        size="lg"
        footer={
          <div className="flex justify-end items-center gap-4 w-full">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="px-8 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
            >
              Abort
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.title || !formData.pdf_url}
              className="flex items-center gap-2.5 bg-[#1c54a3] hover:bg-[#153e7a] disabled:bg-gray-200 text-white px-10 py-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-lg"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
              {editingId ? 'Commit Updates' : 'Authorize Provision'}
            </button>
          </div>
        }
      >
        <div className="space-y-8 py-4 px-2">
          {/* Identity Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#1C2D38] uppercase tracking-[0.2em] flex items-center gap-2">
                <div className="w-1.5 h-3 bg-[#1c54a3]"></div> Global Identity
              </label>
              <input 
                type="text" required
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#f8fafc] border border-slate-200 px-5 py-4 text-sm outline-none focus:border-[#1c54a3] placeholder:text-slate-300 font-black text-[#1c54a3]"
                placeholder="PROSPECTUS 2026..."
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#1C2D38] uppercase tracking-[0.2em] flex items-center gap-2">
                 <MousePointer2 size={12} className="text-blue-500" /> Route Address
              </label>
              <input 
                type="text" 
                value={formData.slug} 
                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-[#f8fafc] border border-slate-200 px-5 py-4 text-[13px] outline-none focus:border-[#1c54a3] font-mono text-slate-400"
                placeholder="admission-prospectus"
              />
            </div>
          </div>

          {/* Visual Excellence Section */}
          <div className="bg-[#f8fafc] border border-slate-200 p-8 space-y-10">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] border-b border-slate-100 pb-4">Visual Immersive Engine</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Front Cover */}
                <div className="space-y-6">
                  <label className="flex items-center gap-2 text-[10px] font-black text-[#1C2D38] uppercase tracking-[0.1em]">
                    <ImageIcon size={14} className="text-amber-500" /> Brochure Front Cover
                  </label>
                  <div className="flex gap-6">
                    <div className="w-28 h-36 bg-slate-100 border border-slate-200 flex flex-col items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                      {formData.cover_image ? (
                        <img src={formData.cover_image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={24} className="opacity-10 text-[#1c54a3]" />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-end gap-3">
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-loose">Primary 3D Front Face (Closed Book Only)</p>
                       <MediaUploader 
                          onUploadSuccess={(url) => setFormData({ ...formData, cover_image: url })}
                          category="flipbooks"
                        />
                    </div>
                  </div>
                </div>

                {/* Immersive Backdrop */}
                <div className="space-y-6 border-l border-slate-200 pl-8">
                  <label className="flex items-center gap-2 text-[10px] font-black text-[#1C2D38] uppercase tracking-[0.1em]">
                    <ImageIcon size={14} className="text-blue-500" /> Viewer Backdrop Image
                  </label>
                  <div className="flex gap-6">
                    <div className="w-28 h-36 bg-slate-100 border border-slate-200 flex flex-col items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                      {formData.backdrop_image ? (
                        <img src={formData.backdrop_image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={24} className="opacity-10 text-blue-300" />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-end gap-3">
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-loose">Full-Screen Immersive Environment Background</p>
                       <MediaUploader 
                          onUploadSuccess={(url) => setFormData({ ...formData, backdrop_image: url })}
                          category="flipbooks"
                        />
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* Core Asset Section */}
          <div className="space-y-4">
             <label className="text-[10px] font-black text-[#1C2D38] uppercase tracking-[0.2em] flex items-center gap-2">
                <div className="w-1.5 h-3 bg-red-500"></div> PDF Source Module
             </label>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <input 
                  type="text" readOnly value={formData.pdf_url}
                  className="md:col-span-2 w-full bg-[#f8fafc] border border-slate-100 px-5 py-4 text-[11px] font-mono outline-none text-[#1c54a3] opacity-60"
                  placeholder="Awaiting asset deployment..."
                />
                <MediaUploader 
                  onUploadSuccess={(url) => setFormData({ ...formData, pdf_url: url })}
                  category="flipbooks"
                />
             </div>
          </div>

          {/* Discovery Logic */}
          <div className="border-t border-slate-100 pt-8 mt-10">
             <div className="flex gap-8">
                <div className="flex-1 space-y-4">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Metadata Precision</label>
                  <input 
                    type="text" 
                    value={formData.meta_title} 
                    onChange={e => setFormData({ ...formData, meta_title: e.target.value })}
                    className="w-full border-b border-slate-200 py-3 text-[13px] outline-none focus:border-[#1c54a3] placeholder:italic"
                    placeholder="Search query optimization title..."
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Description Logic</label>
                  <input 
                    type="text" 
                    value={formData.meta_description} 
                    onChange={e => setFormData({ ...formData, meta_description: e.target.value })}
                    className="w-full border-b border-slate-200 py-3 text-[13px] outline-none focus:border-[#1c54a3] placeholder:italic"
                    placeholder="Brief semantic overview..."
                  />
                </div>
             </div>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: var(--bg-body); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-default); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--color-primary); }
      `}</style>
    </div>
  );
}
