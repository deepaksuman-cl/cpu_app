'use client';

import { useState } from 'react';
import { 
  Plus, Trash2, ChevronDown, ChevronRight, Monitor, 
  Image as ImageIcon, Link as LinkIcon, Save, GripVertical,
  Type, Move
} from 'lucide-react';
import { saveFullNavigationData } from '@/lib/actions/navigation';

export default function DesktopMenuManager({ initialData, initialTopMenu }) {
  const [menu, setMenu] = useState(initialTopMenu);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [saving, setSaving] = useState(false);

  // --- ACTIONS ---

  const saveAll = async () => {
    setSaving(true);
    const result = await saveFullNavigationData({ ...initialData, topMenu: menu });
    if (result.success) {
      alert('Navigation menus updated successfully!');
    } else {
      alert('Error: ' + result.error);
    }
    setSaving(false);
  };

  const addMenu = () => {
    const newMenu = {
      title: 'New Menu',
      type: 'mega-columns',
      columns: [
        { heading: 'New Column', links: [{ label: 'New Link', slug: '/' }] }
      ]
    };
    setMenu([...menu, newMenu]);
    setExpandedIndex(menu.length);
  };

  const removeMenu = (idx) => {
    if (confirm('Delete this entire menu section?')) {
      const updated = [...menu];
      updated.splice(idx, 1);
      setMenu(updated);
      setExpandedIndex(null);
    }
  };

  const updateMenuField = (idx, field, value) => {
    const updated = [...menu];
    updated[idx] = { ...updated[idx], [field]: value };
    setMenu(updated);
  };

  const addColumn = (mIdx) => {
    const updated = [...menu];
    updated[mIdx].columns = [...(updated[mIdx].columns || []), { heading: 'New Column', links: [] }];
    setMenu(updated);
  };

  const removeColumn = (mIdx, cIdx) => {
    const updated = [...menu];
    updated[mIdx].columns.splice(cIdx, 1);
    setMenu(updated);
  };

  const addLink = (mIdx, cIdx) => {
    const updated = [...menu];
    updated[mIdx].columns[cIdx].links = [...updated[mIdx].columns[cIdx].links, { label: 'New Link', slug: '/' }];
    setMenu(updated);
  };

  const removeLink = (mIdx, cIdx, lIdx) => {
    const updated = [...menu];
    updated[mIdx].columns[cIdx].links.splice(lIdx, 1);
    setMenu(updated);
  };

  const updateLink = (mIdx, cIdx, lIdx, field, value) => {
    const updated = [...menu];
    updated[mIdx].columns[cIdx].links[lIdx] = { ...updated[mIdx].columns[cIdx].links[lIdx], [field]: value };
    setMenu(updated);
  };

  const updateColumnHeading = (mIdx, cIdx, value) => {
    const updated = [...menu];
    updated[mIdx].columns[cIdx].heading = value;
    setMenu(updated);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Controls */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Desktop Mega Menus</h2>
          <p className="text-sm text-gray-500">Manage nested columns and links for the desktop navigation.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={addMenu}
            className="flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-3 rounded-xl font-bold hover:bg-blue-100 transition-colors"
          >
            <Plus size={18} /> Add Main Menu
          </button>
          <button 
            onClick={saveAll}
            disabled={saving}
            className="flex items-center gap-2 bg-[#fec53a] text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-[#d1a52b] transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {saving ? <Plus size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {/* Menu Sections List */}
      <div className="space-y-4">
        {menu.map((m, mIdx) => (
          <div key={mIdx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
            {/* Menu Header */}
            <div 
              className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${expandedIndex === mIdx ? 'bg-gray-50 border-b border-gray-100' : 'hover:bg-gray-50/50'}`}
              onClick={() => setExpandedIndex(expandedIndex === mIdx ? null : mIdx)}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-400 group-hover:text-gray-600">
                  <GripVertical size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    {m.title}
                    <span className="text-[10px] uppercase tracking-widest bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">
                      {m.type}
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-400">{(m.columns || m.links || []).length} items total</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); removeMenu(mIdx); }}
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
                <div className={`p-1 rounded-full transition-all duration-300 ${expandedIndex === mIdx ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-gray-400'}`}>
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* Menu Content (Expanded) */}
            {expandedIndex === mIdx && (
              <div className="p-6 bg-white animate-in slide-in-from-top-2 duration-300">
                {/* Basic Meta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-inner">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Section Title</label>
                    <input 
                      value={m.title}
                      onChange={(e) => updateMenuField(mIdx, 'title', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#fec53a] outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Panel Type</label>
                    <select 
                      value={m.type}
                      onChange={(e) => updateMenuField(mIdx, 'type', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#fec53a] outline-none appearance-none"
                    >
                      <option value="mega-columns">Mega Columns (Standard)</option>
                      <option value="mega-columns-with-image">Mega Columns + Promo Image</option>
                      <option value="mega-columns-with-images">Mega Columns + Icons/Images</option>
                      <option value="split-action-menu">Split Action Menu (Admissions Style)</option>
                    </select>
                  </div>
                  {/* Conditional Promo fields */}
                  {(m.type === 'mega-columns-with-image' || m.type === 'split-action-menu') && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Promo Image URL</label>
                        <input value={m.promoImage || ''} onChange={(e) => updateMenuField(mIdx, 'promoImage', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fec53a] outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Promo Description</label>
                        <textarea value={m.promoDescription || ''} onChange={(e) => updateMenuField(mIdx, 'promoDescription', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fec53a] outline-none" rows={1} />
                      </div>
                    </>
                  )}
                </div>

                {/* Columns CRUD */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Columns Configuration</h4>
                    <button 
                      onClick={() => addColumn(mIdx)}
                      className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Plus size={14} /> Add Column
                    </button>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {m.columns?.map((col, cIdx) => (
                      <div key={cIdx} className="bg-gray-50/50 rounded-2xl border border-gray-100 p-6 space-y-4 group/col relative">
                        <button 
                          onClick={() => removeColumn(mIdx, cIdx)}
                          className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover/col:opacity-100 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                        
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Column Heading</label>
                          <input 
                            value={col.heading}
                            onChange={(e) => updateColumnHeading(mIdx, cIdx, e.target.value)}
                            className="bg-transparent border-b border-gray-200 w-full py-1 font-bold text-blue-900 focus:border-[#fec53a] outline-none text-[15px]" 
                          />
                        </div>

                        {/* Links within Column */}
                        <div className="space-y-3 pt-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Links ({col.links.length})</span>
                            <button onClick={() => addLink(mIdx, cIdx)} className="p-1 px-2 bg-white rounded border border-gray-200 text-[10px] font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                              + Add Link
                            </button>
                          </div>
                          
                          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scroll">
                            {col.links.map((link, lIdx) => (
                              <div key={lIdx} className="flex gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm transition-all hover:border-[#fec53a]/30 group/link">
                                <div className="flex-1 space-y-2">
                                  <input 
                                    value={link.label}
                                    placeholder="Label"
                                    onChange={(e) => updateLink(mIdx, cIdx, lIdx, 'label', e.target.value)}
                                    className="w-full text-[13px] font-bold outline-none border-b border-gray-50 bg-transparent focus:border-[#fec53a]" 
                                  />
                                  <input 
                                    value={link.slug}
                                    placeholder="/path"
                                    onChange={(e) => updateLink(mIdx, cIdx, lIdx, 'slug', e.target.value)}
                                    className="w-full text-[11px] text-gray-400 outline-none border-b border-gray-50 bg-transparent focus:border-[#fec53a]" 
                                  />
                                </div>
                                <button 
                                  onClick={() => removeLink(mIdx, cIdx, lIdx)}
                                  className="text-gray-200 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
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
  );
}
