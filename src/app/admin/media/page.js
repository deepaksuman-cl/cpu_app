'use client';

import { useState, useEffect, useRef } from 'react';
import { getAllMedia, uploadLocalMedia, saveExternalMedia, deleteMedia, updateMedia } from '@/lib/actions/mediaActions';
import { Upload, Link as LinkIcon, Edit, Trash2, Copy, Check, X, File, Image as ImageIcon, Loader2, Plus, ExternalLink, Search } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null); // stores media object
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadType, setUploadType] = useState('local'); // 'local' or 'external'
  const uploadModalRef = useRef(null);
  const editModalRef = useRef(null);

  const fetchMedia = async () => {
    setLoading(true);
    const res = await getAllMedia();
    if (res.success) setMedia(res.data);
    else toast.error('Failed to load media');
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    const res = await deleteMedia(id);
    if (res.success) {
      toast.success('Deleted successfully');
      fetchMedia();
    } else {
      toast.error('Deletion failed: ' + res.error);
    }
  };

  const handleCopy = (url) => {
    const fullUrl = url.startsWith('http') ? url : window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Copied to clipboard!');
  };

  const formatSize = (bytes) => {
    if (!bytes) return '-';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const filteredMedia = media.filter(m => 
    m.displayName.toLowerCase().includes(search.toLowerCase()) || 
    m.altText?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)] flex flex-col p-6">
      <Toaster position="bottom-right" />
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Media Library</h1>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Manage images and external assets for the whole site.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
             <Search className="absolute left-3 top-1/2 -track-y-1/2 text-[var(--text-muted)] mt-[-7px]" size={14} />
             <input 
               type="text" value={search} onChange={e => setSearch(e.target.value)}
               placeholder="Search media..."
               className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] pl-9 pr-4 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--color-primary)] outline-none transition-colors"
             />
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-5 py-2 text-sm font-bold uppercase tracking-widest transition-all rounded-none shadow-sm"
          >
            <Plus size={16} strokeWidth={2.5} />
            Add Media
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[var(--color-primary)]" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredMedia.map(m => (
            <div key={m.id} className="group relative bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--color-primary)] transition-all overflow-hidden flex flex-col shadow-sm">
              <div className="aspect-square bg-[var(--bg-muted)] overflow-hidden flex items-center justify-center relative">
                {m.url.match(/\.(jpeg|jpg|gif|png|webp|svg)/i) || m.isExternal ? (
                  <img src={m.url} alt={m.altText} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <File className="text-[var(--text-muted)]" size={32} />
                )}
                {m.isExternal && (
                  <div className="absolute top-2 left-2 bg-[var(--bg-surface)] p-1 border border-[var(--border-default)] shadow-sm">
                    <ExternalLink size={10} className="text-[var(--color-primary)]" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => handleCopy(m.url)} className="p-2 bg-white text-black hover:bg-[var(--color-primary)] hover:text-white transition-colors"><Copy size={16} /></button>
                  <button onClick={() => setShowEditModal(m)} className="p-2 bg-white text-black hover:bg-[var(--color-primary)] hover:text-white transition-colors"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(m.id)} className="p-2 bg-white text-black hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-[11px] font-bold text-[var(--text-primary)] truncate uppercase tracking-wide leading-tight">{m.displayName}</p>
                <p className="text-[9px] text-[var(--text-muted)] font-mono mt-1">{formatSize(m.size)} • {m.isExternal ? 'LINK' : 'FILE'}</p>
              </div>
            </div>
          ))}
          {filteredMedia.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-[var(--border-default)] bg-[var(--bg-surface)]">
              <ImageIcon className="mx-auto mb-3 text-[var(--text-muted)] opacity-20" size={48} />
              <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">No assets found matching your criteria</p>
            </div>
          )}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (uploadModalRef.current && !uploadModalRef.current.contains(e.target)) {
              setShowUploadModal(false);
            }
          }}
        >
          <div 
            ref={uploadModalRef}
            className="bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-2xl w-full max-w-md p-6 relative rounded-none"
          >
             <button onClick={() => setShowUploadModal(false)} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-black"><X size={20} /></button>
             <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-4">Add New Media Asset</h2>
             
             <div className="flex gap-1 mb-6 bg-[var(--bg-muted)] p-1 underline-offset-4">
                <button onClick={() => setUploadType('local')} className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest ${uploadType === 'local' ? 'bg-[var(--bg-surface)] shadow-sm' : 'text-[var(--text-muted)]'}`}>Local Upload</button>
                <button onClick={() => setUploadType('external')} className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest ${uploadType === 'external' ? 'bg-[var(--bg-surface)] shadow-sm' : 'text-[var(--text-muted)]'}`}>External Link</button>
             </div>

             {uploadType === 'local' ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-[var(--border-default)] p-8 text-center bg-[var(--bg-muted)] hover:border-[var(--color-primary)] transition-colors cursor-pointer group relative">
                    <input 
                      type="file" 
                      multiple
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={async (e) => {
                        const files = Array.from(e.target.files);
                        if (files.length > 0) {
                          setUploadLoading(true);
                          const formData = new FormData();
                          files.forEach(file => formData.append('file', file));
                          const res = await uploadLocalMedia(formData);
                          if (res.success) {
                            toast.success(`Successfully uploaded ${res.count || files.length} files!`);
                            fetchMedia();
                          } else toast.error('Upload failed: ' + res.error);
                          setUploadLoading(false);
                        }
                      }}
                    />
                    {uploadLoading ? <Loader2 className="animate-spin mx-auto text-[var(--color-primary)]" /> : (
                      <>
                        <Upload className="mx-auto mb-2 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                        <p className="text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">Drag & drop or click to browse</p>
                        <p className="text-[9px] text-[var(--text-muted)] mt-1">Images, PDFs, and more supported.</p>
                      </>
                    )}
                  </div>
                </div>
             ) : (
                <div className="space-y-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Image / Asset URL</label>
                      <input 
                        type="url" placeholder="https://..." 
                        className="w-full bg-[var(--bg-muted)] border border-[var(--border-default)] p-3 text-sm outline-none focus:border-[var(--color-primary)] rounded-none"
                        onKeyDown={async (e) => {
                          if (e.key === 'Enter' && e.target.value) {
                             setUploadLoading(true);
                             const res = await saveExternalMedia(e.target.value);
                             if (res.success) {
                                toast.success('Link saved successfully!');
                                fetchMedia();
                             } else toast.error('Failed to save link: ' + res.error);
                             setUploadLoading(false);
                          }
                        }}
                      />
                   </div>
                   <p className="text-[9px] text-[var(--text-muted)] font-medium">Press Enter to save the external link to your library.</p>
                </div>
             )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (editModalRef.current && !editModalRef.current.contains(e.target)) {
              setShowEditModal(null);
            }
          }}
        >
           <div 
             ref={editModalRef}
             className="bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-2xl w-full max-w-md p-6 relative"
           >
              <button onClick={() => setShowEditModal(null)} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-black"><X size={20} /></button>
              <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-6">Edit Media Metadata</h2>
              
              <div className="flex gap-4 mb-6">
                 <div className="w-24 h-24 bg-[var(--bg-muted)] border border-[var(--border-default)]">
                    <img src={showEditModal.url} className="w-full h-full object-cover" alt="Preview" />
                 </div>
                 <div className="flex-1 space-y-3">
                    <div>
                       <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1.5">Display Name</label>
                       <input 
                         type="text" value={showEditModal.displayName} 
                         onChange={e => setShowEditModal({...showEditModal, displayName: e.target.value})}
                         className="w-full bg-[var(--bg-muted)] border border-[var(--border-default)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1.5">SEO Alt Text</label>
                       <input 
                         type="text" value={showEditModal.altText || ''} 
                         onChange={e => setShowEditModal({...showEditModal, altText: e.target.value})}
                         className="w-full bg-[var(--bg-muted)] border border-[var(--border-default)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
                       />
                    </div>
                 </div>
              </div>

              <div className="flex justify-end gap-2">
                 <button onClick={() => setShowEditModal(null)} className="px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-black transition-colors">Cancel</button>
                 <button 
                   onClick={async () => {
                      const res = await updateMedia(showEditModal.id, { 
                        displayName: showEditModal.displayName, 
                        altText: showEditModal.altText 
                      });
                      if (res.success) {
                        toast.success('Updated successfully');
                        setShowEditModal(null);
                        fetchMedia();
                      } else toast.error('Update failed: ' + res.error);
                   }}
                   className="bg-black text-white px-6 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-[var(--color-primary)] transition-all"
                 >Save Metadata</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
