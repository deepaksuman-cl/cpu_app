'use client';

import { useState } from 'react';
import { 
  Plus, Trash2, ChevronDown, ChevronRight, Layout, 
  Link as LinkIcon, Save, GripVertical, FileText,
  MousePointerClick, ListTree, Settings2, Grid, List
} from 'lucide-react';
import { saveFullNavigationData } from '@/lib/actions/navigation';
import IconPicker from '../ui/IconPicker';

export default function SidebarMenuManager({ initialData, initialSideMenu }) {
  const [data, setData] = useState(initialSideMenu);
  const [saving, setSaving] = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);

  const saveAll = async (e) => {
    setSaving(true);
    try {
      const payload = JSON.parse(JSON.stringify({ ...initialData, sideMenu: data }));
      const result = await saveFullNavigationData(payload);
      if (result.success) alert('Sidebar menus updated successfully!');
      else alert('Error: ' + result.error);
    } catch (err) {
      alert('Serialization Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };
   

  // --- EXPLORE MORE ACTIONS ---

  const addExploreCategory = () => {
    const newCat = {
      title: 'New Category',
      icon: 'Layout',
      hasDropdown: true,
      type: 'simple-dropdown',
      columns: 1, // 1 for list, 2-3 for grid/horizontal
      links: []
    };
    setData({ ...data, exploreMore: [...data.exploreMore, newCat] });
    setExpandedCat(data.exploreMore.length);
  };

  const removeExploreCategory = (idx) => {
    if (confirm('Delete this category and all its links?')) {
      const updated = { ...data };
      updated.exploreMore.splice(idx, 1);
      setData(updated);
      setExpandedCat(null);
    }
  };

  const updateCategoryField = (idx, field, value) => {
    const updated = { ...data };
    updated.exploreMore[idx] = { ...updated.exploreMore[idx], [field]: value };
    setData(updated);
  };

  const addLinkToCategory = (catIdx) => {
    const updated = { ...data };
    updated.exploreMore[catIdx].links.push({ label: 'New Link', slug: '/' });
    setData(updated);
  };

  const removeLinkFromCategory = (catIdx, lIdx) => {
    const updated = { ...data };
    updated.exploreMore[catIdx].links.splice(lIdx, 1);
    setData(updated);
  };

  const updateLinkField = (catIdx, lIdx, field, value) => {
    const updated = { ...data };
    updated.exploreMore[catIdx].links[lIdx][field] = value;
    setData(updated);
  };

  const addSubLink = (catIdx, lIdx) => {
    const updated = { ...data };
    const link = updated.exploreMore[catIdx].links[lIdx];
    if (!link.subLinks) link.subLinks = [];
    link.subLinks.push({ label: 'New Sub-link', slug: '/' });
    setData(updated);
  };

  const removeSubLink = (catIdx, lIdx, sIdx) => {
    const updated = { ...data };
    updated.exploreMore[catIdx].links[lIdx].subLinks.splice(sIdx, 1);
    setData(updated);
  };

  const updateSubLinkField = (catIdx, lIdx, sIdx, field, value) => {
    const updated = { ...data };
    updated.exploreMore[catIdx].links[lIdx].subLinks[sIdx][field] = value;
    setData(updated);
  };

  // --- DIRECT LINKS ACTIONS ---

  const addDirectLink = () => {
    setData({ ...data, directLinks: [...data.directLinks, { label: 'New Link', slug: '/' }] });
  };

  const removeDirectLink = (idx) => {
    const updated = { ...data };
    updated.directLinks.splice(idx, 1);
    setData(updated);
  };

  const updateDirectLinkField = (idx, field, value) => {
    const updated = { ...data };
    updated.directLinks[idx][field] = value;
    setData(updated);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Sidebar & Quick Links</h2>
          <p className="text-sm text-gray-500">Manage the desktop sidebar and mobile "Explore More" section.</p>
        </div>
        <button 
          onClick={saveAll}
          disabled={saving}
          className="bg-[#fec53a] text-[#00588b] px-8 py-3 rounded-xl font-bold hover:bg-[#d1a52b] transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 active:scale-95"
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* EXPLORE MORE - The Deep CRUD part */}
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
              <ListTree size={16} className="text-[#fec53a]" /> Categories & Nested Menus
            </h3>
            <button onClick={addExploreCategory} className="bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-blue-100 transition-colors flex items-center gap-1">
              <Plus size={14} /> Add Category
            </button>
          </div>

          <div className="space-y-4">
            {data.exploreMore.map((cat, catIdx) => (
              <div key={catIdx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Cat Header */}
                <div 
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${expandedCat === catIdx ? 'bg-gray-50 border-b' : 'hover:bg-gray-50/50'}`}
                  onClick={() => setExpandedCat(expandedCat === catIdx ? null : catIdx)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#fec53a]/10 rounded-lg flex items-center justify-center text-[#fec53a]">
                      <Layout size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{cat.title}</h4>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{cat.type.replace('-', ' ')} • {cat.links.length} Links</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={(e) => { e.stopPropagation(); removeExploreCategory(catIdx); }} className="p-1.5 text-gray-300 hover:text-red-500 rounded-md hover:bg-red-50 transition-all">
                      <Trash2 size={16} />
                    </button>
                    <ChevronDown size={20} className={`text-gray-400 transition-transform ${expandedCat === catIdx ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {expandedCat === catIdx && (
                  <div className="p-6 space-y-6 bg-white animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl items-end">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Category Title</label>
                        <input value={cat.title} onChange={(e) => updateCategoryField(catIdx, 'title', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-[#fec53a]/20" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Category Icon</label>
                        <IconPicker value={cat.icon || 'Layout'} onChange={(val) => updateCategoryField(catIdx, 'icon', val)} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Display Type</label>
                        <select value={cat.type} onChange={(e) => updateCategoryField(catIdx, 'type', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold outline-none">
                          <option value="simple-dropdown">Simple List</option>
                          <option value="nested-dropdown">Nested Support</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Horizontal Columns</label>
                        <select value={cat.columns || 1} onChange={(e) => updateCategoryField(catIdx, 'columns', parseInt(e.target.value))} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold outline-none">
                          <option value={1}>1 Column (List)</option>
                          <option value={2}>2 Columns (Grid)</option>
                          <option value={3}>3 Columns (Horizontal)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-gray-50">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Links & Deep Data</span>
                        <button onClick={() => addLinkToCategory(catIdx)} className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline">
                          <Plus size={12} /> Add Main Link
                        </button>
                      </div>

                      <div className="space-y-3">
                        {cat.links.map((link, lIdx) => (
                          <div key={lIdx} className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4 relative group/link">
                            <button onClick={() => removeLinkFromCategory(catIdx, lIdx)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover/link:opacity-100 transition-opacity">
                              <Trash2 size={14} />
                            </button>
                            
                            <div className="flex flex-col md:flex-row gap-3">
                              <input placeholder="Link Label" value={link.label} onChange={(e) => updateLinkField(catIdx, lIdx, 'label', e.target.value)} className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-bold outline-none focus:border-[#fec53a]" />
                              <input placeholder="/path" value={link.slug} onChange={(e) => updateLinkField(catIdx, lIdx, 'slug', e.target.value)} className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-[12px] text-gray-500 outline-none focus:border-[#fec53a]" />
                            </div>

                            {cat.type === 'nested-dropdown' && (
                              <div className="bg-white/50 p-4 rounded-lg border border-gray-100 space-y-3">
                                <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                                  <span className="text-[10px] font-bold text-gray-400 uppercase">Sub-links (Level 3)</span>
                                  <button onClick={() => addSubLink(catIdx, lIdx)} className="text-[10px] font-bold text-[#00588b] hover:underline flex items-center gap-1">
                                    <Plus size={12} /> Add Sub-link
                                  </button>
                                </div>
                                <div className="space-y-2">
                                  {(link.subLinks || []).map((sub, sIdx) => (
                                    <div key={sIdx} className="flex gap-2 items-center">
                                      <div className="text-gray-300"><ChevronRight size={14} /></div>
                                      <input placeholder="Sub Label" value={sub.label} onChange={(e) => updateSubLinkField(catIdx, lIdx, sIdx, 'label', e.target.value)} className="flex-1 bg-transparent border-b border-gray-100 py-1 text-[12px] font-medium outline-none focus:border-[#fec53a]" />
                                      <input placeholder="/sub-path" value={sub.slug} onChange={(e) => updateSubLinkField(catIdx, lIdx, sIdx, 'slug', e.target.value)} className="flex-1 bg-transparent border-b border-gray-100 py-1 text-[11px] text-gray-400 outline-none focus:border-[#fec53a]" />
                                      <button onClick={() => removeSubLink(catIdx, lIdx, sIdx)} className="text-gray-200 hover:text-red-400 transition-colors">
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  ))}
                                  {(!link.subLinks || link.subLinks.length === 0) && (
                                    <p className="text-[10px] text-gray-400 text-center py-2 italic font-medium">No sub-links yet</p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* QUICK DIRECT LINKS - Level 1 Links */}
        <div className="xl:col-span-4 space-y-6">
           <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                <MousePointerClick size={16} className="text-[#fec53a]" /> Quick Direct Links
              </h3>
              <button onClick={addDirectLink} className="text-[10px] font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors">
                + Add
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              {data.directLinks.map((link, idx) => (
                <div key={idx} className="p-4 bg-white hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-gray-100 rounded text-gray-400"><GripVertical size={14} /></div>
                    <div className="flex-1 flex justify-between items-center">
                       <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Link #{idx + 1}</span>
                       <button onClick={() => removeDirectLink(idx)} className="text-gray-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 size={14} />
                       </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <input 
                      value={link.label}
                      placeholder="Display Label"
                      onChange={(e) => updateDirectLinkField(idx, 'label', e.target.value)}
                      className="w-full bg-transparent border-b border-gray-100 py-1 text-sm font-bold focus:border-[#fec53a] outline-none"
                    />
                    <input 
                      value={link.slug}
                      placeholder="/destination-url"
                      onChange={(e) => updateDirectLinkField(idx, 'slug', e.target.value)}
                      className="w-full bg-transparent border-b border-gray-100 py-1 text-[11px] text-gray-400 focus:border-[#fec53a] outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
        </div>

      </div>
    </div>
  );
}
