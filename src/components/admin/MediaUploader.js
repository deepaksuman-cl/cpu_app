// File: src/components/admin/MediaUploader.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { getAllMedia, uploadLocalMedia, saveExternalMedia } from '@/lib/actions/mediaActions';
import { 
  FileUp, 
  Image as ImageIcon, 
  Link2, 
  Loader2, 
  UploadCloud, 
  X, 
  Search, 
  Plus, 
  Library, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function MediaUploader({ onUploadSuccess, category = 'general' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('library'); // 'library' or 'upload'
  const [uploadType, setUploadType] = useState('local'); // 'local' or 'external'
  const modalRef = useRef(null);
  
  // Library State
  const [mediaItems, setMediaItems] = useState([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Upload State
  const [uploadLoading, setUploadLoading] = useState(false);
  const [externalUrl, setExternalUrl] = useState('');

  const fetchLibrary = async () => {
    setLoadingLibrary(true);
    const res = await getAllMedia();
    if (res.success) setMediaItems(res.data);
    setLoadingLibrary(false);
  };

  useEffect(() => {
    if (isOpen && activeTab === 'library') {
      fetchLibrary();
    }
  }, [isOpen, activeTab]);

  const handleSelect = (url) => {
    if (onUploadSuccess) onUploadSuccess(url);
    setIsOpen(false);
  };

  const handleLocalUpload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadLoading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));
    
    const res = await uploadLocalMedia(formData);
    if (res.success) {
      toast.success(`Successfully uploaded ${res.count || files.length} files to library!`);
      setActiveTab('library');
      fetchLibrary();
    } else {
      toast.error('Upload failed: ' + res.error);
    }
    setUploadLoading(false);
  };

  const handleExternalSave = async () => {
    if (!externalUrl) return;
    setUploadLoading(true);
    const res = await saveExternalMedia(externalUrl);
    if (res.success) {
      toast.success('External link saved!');
      setActiveTab('library');
      setExternalUrl('');
      fetchLibrary();
    } else {
      toast.error('Failed to save link: ' + res.error);
    }
    setUploadLoading(false);
  };

  const filteredMedia = mediaItems.filter(item => 
    item.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.altText?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Trigger Button */}
      <button 
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--color-primary)] text-[var(--text-primary)] px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-all shadow-sm group"
      >
        <Library size={16} className="text-[var(--text-muted)] group-hover:text-[var(--color-primary)]" />
        <span>Select / Upload Media</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
              setIsOpen(false);
            }
          }}
        >
          <div 
            ref={modalRef}
            className="bg-[var(--bg-surface)] w-full max-w-5xl h-full max-h-[85vh] flex flex-col shadow-2xl border border-[var(--border-default)] relative"
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-default)] bg-[var(--bg-muted)]">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--color-primary)] text-white p-1.5"><ImageIcon size={18} /></div>
                <h2 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">Media Asset Selector</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white text-[var(--text-muted)] hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs Navigation */}
            <div className="flex bg-[var(--bg-muted)] border-b border-[var(--border-default)] px-6">
              <button 
                type="button"
                onClick={() => setActiveTab('library')}
                className={`px-6 py-3 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 border-b-2 transition-all ${activeTab === 'library' ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-white' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              >
                <Library size={14} /> Media Library
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`px-6 py-3 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 border-b-2 transition-all ${activeTab === 'upload' ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-white' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              >
                <Plus size={14} /> Upload New
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden flex flex-col p-6">
              
              {activeTab === 'library' && (
                <div className="h-full flex flex-col space-y-4">
                  {/* Search Bar */}
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search assets..." 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-[var(--bg-muted)] border border-[var(--border-default)] pl-10 pr-4 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                  {/* Media Grid */}
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {loadingLibrary ? (
                      <div className="h-full flex items-center justify-center">
                        <Loader2 className="animate-spin text-[var(--color-primary)]" size={32} />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {filteredMedia.map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => handleSelect(item.url)}
                            className="group relative aspect-square bg-[var(--bg-muted)] border border-[var(--border-default)] hover:border-[var(--color-primary)] transition-all cursor-pointer overflow-hidden shadow-sm"
                          >
                            <img src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.displayName} />
                            {item.isExternal && (
                                <div className="absolute top-1 right-1 bg-white p-0.5 border border-[var(--border-default)]"><ExternalLink size={8} className="text-[var(--color-primary)]" /></div>
                            )}
                            <div className="absolute inset-0 bg-[var(--color-primary)]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <div className="bg-white p-2 rounded-none shadow-lg text-[var(--color-primary)] scale-50 group-hover:scale-100 transition-transform font-bold text-[9px] uppercase tracking-widest">Select</div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-black/60 text-white text-[9px] font-bold uppercase tracking-tight truncate opacity-0 group-hover:opacity-100 transition-opacity">
                              {item.displayName}
                            </div>
                          </div>
                        ))}
                        {filteredMedia.length === 0 && (
                          <div className="col-span-full py-20 text-center border-2 border-dashed border-[var(--border-default)] text-[var(--text-muted)]">
                            <Library size={48} className="mx-auto mb-2 opacity-20" />
                            <p className="text-xs font-bold uppercase tracking-widest">Media library is empty or no matches found</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'upload' && (
                <div className="max-w-2xl mx-auto w-full space-y-10 py-10">
                   {/* Local Upload */}
                   <div className="space-y-4">
                      <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest border-l-4 border-[var(--color-primary)] pl-3">Upload from Computer</h3>
                      <div className="relative border-2 border-dashed border-[var(--border-default)] hover:border-[var(--color-primary)] bg-[var(--bg-muted)] p-12 text-center transition-all group cursor-pointer">
                        <input 
                          type="file" 
                          onChange={handleLocalUpload}
                          multiple
                          className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        />
                        {uploadLoading ? (
                          <Loader2 className="animate-spin text-[var(--color-primary)] mx-auto" size={32} />
                        ) : (
                          <>
                            <UploadCloud className="mx-auto mb-4 text-[var(--text-muted)] group-hover:text-[var(--color-primary)] group-hover:scale-110 transition-all" size={40} />
                            <p className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">Drag & drop or browse files</p>
                            <p className="text-[10px] text-[var(--text-muted)] mt-2">Maximum file size: 10MB. Formats: PNG, JPG, WEBP, SVG.</p>
                          </>
                        )}
                      </div>

                   </div>

                   {/* External Link */}
                   <div className="space-y-4">
                      <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest border-l-4 border-purple-500 pl-3">Paste External Link</h3>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Link2 className="absolute left-3 top-1/2 -track-y-1/2 text-[var(--text-muted)] mt-[-7px]" size={14} />
                          <input 
                            type="url" 
                            placeholder="https://images.unsplash.com/..." 
                            value={externalUrl}
                            onChange={e => setExternalUrl(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleExternalSave()}
                            className="w-full bg-[var(--bg-muted)] border border-[var(--border-default)] pl-10 pr-4 py-3 text-sm outline-none focus:border-purple-500"
                          />
                        </div>
                        <button 
                          type="button"
                          onClick={handleExternalSave}
                          disabled={uploadLoading || !externalUrl}
                          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                          {uploadLoading ? <Loader2 className="animate-spin" size={14} /> : <Check size={14} />}
                          Save Link
                        </button>
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)]">Perfect for using assets from Unsplash, Pexels, or Cloudinary without downloading.</p>
                   </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}