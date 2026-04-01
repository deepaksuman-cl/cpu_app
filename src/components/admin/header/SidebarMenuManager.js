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
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)] text-left flex flex-col gap-0 justify-start">
      
      {/* ── Fixed/Sticky Header (Exactly 44px Height) ── */}
      <div className="sticky top-0 z-[30] flex items-center justify-between h-[44px] w-full bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm" style={{ position: 'sticky', top: 0, marginTop: 0 }}>
        
        {/* Left: Title */}
        <div className="flex items-center h-full px-4 gap-3">
          <Layout size={14} className="text-[var(--text-muted)] hidden sm:block" strokeWidth={2.5} />
          <h1 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-wider">
            Sidebar & Quick Links
          </h1>
          <div className="hidden md:block w-[1px] h-4 bg-[var(--border-default)]"></div>
          <span className="hidden md:inline-block text-[12px] text-[var(--text-secondary)] font-bold tracking-wide truncate max-w-[200px] lg:max-w-[500px]">
             Manage the desktop sidebar and "Explore More" section
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center h-full px-4 gap-2.5">
          <button 
            onClick={saveAll}
            disabled={saving}
            className="flex items-center justify-center h-[32px] px-3 sm:px-4 bg-[var(--color-success)] hover:bg-[var(--color-success-dark)] text-[var(--text-inverse)] transition-colors rounded-none shadow-sm uppercase tracking-widest text-[11px] font-bold disabled:opacity-50"
          >
            {saving ? <div className="w-3.5 h-3.5 border-2 border-[var(--bg-surface)] border-t-[var(--text-inverse)] rounded-full animate-spin md:mr-1.5" /> : <Save size={14} strokeWidth={2.5} className="md:mr-1.5" />} 
            <span className="hidden sm:block">{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="w-[98%] lg:w-[95%] xl:w-[92%] mx-auto p-4 sm:p-6 space-y-6 lg:space-y-8 pb-20 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-10">
          
          {/* EXPLORE MORE - The Deep CRUD part */}
          <div className="xl:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-3">
              <h3 className="text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-2">
                <ListTree size={14} className="text-[var(--color-primary)]" /> Categories & Nested Menus
              </h3>
              <button onClick={addExploreCategory} className="bg-[var(--bg-muted)] text-[var(--color-primary)] font-bold px-3 py-1.5 rounded-none text-[10px] hover:bg-[var(--bg-hover)] border border-[var(--border-default)] transition-colors flex items-center gap-1 uppercase tracking-widest">
                <Plus size={12} /> Add Category
              </button>
            </div>

            <div className="space-y-4">
              {data.exploreMore.map((cat, catIdx) => (
                <div key={catIdx} className="bg-[var(--bg-surface)] rounded-none border border-[var(--border-default)] shadow-sm overflow-hidden">
                  {/* Cat Header */}
                  <div 
                    className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${expandedCat === catIdx ? 'bg-[var(--bg-muted)] border-b border-[var(--border-default)]' : 'hover:bg-[var(--bg-hover)]'}`}
                    onClick={() => setExpandedCat(expandedCat === catIdx ? null : catIdx)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none flex items-center justify-center text-[var(--text-secondary)] border border-[var(--border-light)] bg-[var(--bg-surface)]">
                        <Layout size={14} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)] text-sm">{cat.title}</h4>
                        <p className="text-[10px] text-[var(--text-secondary)] font-medium uppercase tracking-widest">{cat.type.replace('-', ' ')} • {cat.links.length} Links</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={(e) => { e.stopPropagation(); removeExploreCategory(catIdx); }} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--color-danger)] hover:bg-red-50/50 rounded-none transition-all">
                        <Trash2 size={16} />
                      </button>
                      <ChevronDown size={18} className={`text-[var(--text-muted)] transition-transform ${expandedCat === catIdx ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {expandedCat === catIdx && (
                    <div className="p-6 space-y-6 bg-[var(--bg-surface)] animate-in fade-in duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[var(--bg-body)] p-4 rounded-none border border-[var(--border-default)] items-end">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Category Title</label>
                          <input value={cat.title} onChange={(e) => updateCategoryField(catIdx, 'title', e.target.value)} className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none px-3 py-2 text-sm font-bold outline-none focus:border-[var(--color-primary)] text-[var(--text-primary)]" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Category Icon</label>
                          <IconPicker value={cat.icon || 'Layout'} onChange={(val) => updateCategoryField(catIdx, 'icon', val)} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Display Type</label>
                          <select value={cat.type} onChange={(e) => updateCategoryField(catIdx, 'type', e.target.value)} className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none px-3 py-2 text-sm font-bold outline-none text-[var(--text-primary)] focus:border-[var(--color-primary)]">
                            <option value="simple-dropdown">Simple List</option>
                            <option value="nested-dropdown">Nested Support</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Horizontal Columns</label>
                          <select value={cat.columns || 1} onChange={(e) => updateCategoryField(catIdx, 'columns', parseInt(e.target.value))} className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none px-3 py-2 text-sm font-bold outline-none text-[var(--text-primary)] focus:border-[var(--color-primary)]">
                            <option value={1}>1 Column (List)</option>
                            <option value={2}>2 Columns (Grid)</option>
                            <option value={3}>3 Columns (Horizontal)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-light)]">
                          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Links & Deep Data</span>
                          <button onClick={() => addLinkToCategory(catIdx)} className="text-[10px] font-bold text-[var(--color-primary)] flex items-center gap-1 hover:underline tracking-widest uppercase">
                            <Plus size={12} /> Add Main Link
                          </button>
                        </div>

                        <div className="space-y-3">
                          {cat.links.map((link, lIdx) => (
                            <div key={lIdx} className="bg-[var(--bg-body)] rounded-none border border-[var(--border-default)] p-4 space-y-4 relative group/link">
                              <button onClick={() => removeLinkFromCategory(catIdx, lIdx)} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--color-danger)] opacity-0 group-hover/link:opacity-100 transition-opacity">
                                <Trash2 size={14} />
                              </button>
                              
                              <div className="flex flex-col md:flex-row gap-3 pr-8">
                                <input placeholder="Link Label" value={link.label} onChange={(e) => updateLinkField(catIdx, lIdx, 'label', e.target.value)} className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none px-3 py-2 text-[13px] font-bold outline-none focus:border-[var(--color-primary)] text-[var(--text-primary)]" />
                                <input placeholder="/path" value={link.slug} 
                                  onChange={(e) => {
                                    let val = e.target.value;
                                    if (val && !val.startsWith('/') && !val.startsWith('http') && !val.startsWith('mailto:') && !val.startsWith('tel:') && !val.startsWith('#')) {
                                      val = '/' + val;
                                    }
                                    updateLinkField(catIdx, lIdx, 'slug', val);
                                  }} 
                                  className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none px-3 py-2 text-[12px] text-[var(--text-secondary)] outline-none focus:border-[var(--color-primary)]" />
                              </div>

                              {cat.type === 'nested-dropdown' && (
                                <div className="bg-[var(--bg-surface)] p-4 rounded-none border border-[var(--border-light)] space-y-3">
                                  <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-2">
                                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Sub-links (Level 3)</span>
                                    <button onClick={() => addSubLink(catIdx, lIdx)} className="text-[10px] font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1 tracking-widest uppercase">
                                      <Plus size={12} /> Add Sub-link
                                    </button>
                                  </div>
                                  <div className="space-y-3">
                                    {(link.subLinks || []).map((sub, sIdx) => (
                                      <div key={sIdx} className="flex gap-2 items-center">
                                        <div className="text-[var(--border-default)]"><ChevronRight size={14} strokeWidth={3} /></div>
                                        <input placeholder="Sub Label" value={sub.label} onChange={(e) => updateSubLinkField(catIdx, lIdx, sIdx, 'label', e.target.value)} className="flex-1 bg-transparent border-b border-[var(--border-light)] py-1 text-[12px] font-bold text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)]" />
                                        <input placeholder="/sub-path" value={sub.slug} 
                                          onChange={(e) => {
                                            let val = e.target.value;
                                            if (val && !val.startsWith('/') && !val.startsWith('http') && !val.startsWith('mailto:') && !val.startsWith('tel:') && !val.startsWith('#')) {
                                              val = '/' + val;
                                            }
                                            updateSubLinkField(catIdx, lIdx, sIdx, 'slug', val);
                                          }} 
                                          className="flex-1 bg-transparent border-b border-[var(--border-light)] py-1 text-[11px] text-[var(--text-secondary)] outline-none focus:border-[var(--color-primary)]" />
                                        <button onClick={() => removeSubLink(catIdx, lIdx, sIdx)} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors p-1">
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                    ))}
                                    {(!link.subLinks || link.subLinks.length === 0) && (
                                      <p className="text-[10px] text-[var(--text-muted)] text-center py-2 italic font-medium">No sub-links yet</p>
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
             <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-3">
                <h3 className="text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-2">
                  <MousePointerClick size={14} className="text-[var(--color-primary)]" /> Quick Direct Links
                </h3>
                <button onClick={addDirectLink} className="text-[10px] font-bold text-[var(--color-primary)] hover:bg-[var(--bg-hover)] border border-transparent hover:border-[var(--border-default)] px-2 py-1 rounded-none transition-colors uppercase tracking-widest">
                  + Add
                </button>
              </div>

              <div className="bg-[var(--bg-surface)] rounded-none border border-[var(--border-default)] shadow-sm overflow-hidden divide-y divide-[var(--border-light)]">
                {data.directLinks.map((link, idx) => (
                  <div key={idx} className="p-4 bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-1 px-1.5 bg-[var(--bg-muted)] border border-[var(--border-default)] rounded-none text-[var(--text-muted)]"><GripVertical size={12} /></div>
                      <div className="flex-1 flex justify-between items-center">
                         <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Link #{idx + 1}</span>
                         <button onClick={() => removeDirectLink(idx)} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] opacity-0 group-hover:opacity-100 transition-all p-1">
                          <Trash2 size={14} />
                         </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <input 
                        value={link.label}
                        placeholder="Display Label"
                        onChange={(e) => updateDirectLinkField(idx, 'label', e.target.value)}
                        className="w-full bg-transparent border-b border-[var(--border-default)] py-1 text-sm font-bold focus:border-[var(--color-primary)] outline-none text-[var(--text-primary)]"
                      />
                      <input 
                        value={link.slug}
                        placeholder="/destination-url"
                        onChange={(e) => {
                          let val = e.target.value;
                          if (val && !val.startsWith('/') && !val.startsWith('http') && !val.startsWith('mailto:') && !val.startsWith('tel:') && !val.startsWith('#')) {
                            val = '/' + val;
                          }
                          updateDirectLinkField(idx, 'slug', val);
                        }}
                        className="w-full bg-transparent border-b border-[var(--border-default)] py-1 text-[11px] text-[var(--text-secondary)] focus:border-[var(--color-primary)] outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}
