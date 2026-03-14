'use client';

import { useState } from 'react';
import { Phone, Save, Mail, Plus, Trash2, GripVertical, Info } from 'lucide-react';
import { saveFullNavigationData } from '@/lib/actions/navigation';

export default function TopBarManager({ initialData, initialTopBar }) {
  const [info, setInfo] = useState(initialTopBar);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    // If e is an event, ignore it to avoid circular serialization
    const isEvent = e && e.nativeEvent;
    
    setSaving(true);
    // Deep clean payload for React 19 / Next 16 boundary
    const payload = JSON.parse(JSON.stringify({ ...initialData, topBarInfo: info }));
    const result = await saveFullNavigationData(payload);
    
    if (result.success) {
      alert('Top Bar settings updated successfully!');
    } else {
      alert('Error: ' + result.error);
    }
    setSaving(false);
  };

  const updateField = (field, value) => {
    setInfo({ ...info, [field]: value });
  };

  const addLink = () => {
    setInfo({ ...info, topStripLinks: [...info.topStripLinks, { label: 'New Link', slug: '/' }] });
  };

  const removeLink = (idx) => {
    const updated = [...info.topStripLinks];
    updated.splice(idx, 1);
    setInfo({ ...info, topStripLinks: updated });
  };

  const updateLink = (idx, field, value) => {
    const updated = [...info.topStripLinks];
    updated[idx] = { ...updated[idx], [field]: value };
    setInfo({ ...info, topStripLinks: updated });
  };

  const addTickerItem = () => {
    // Convert old string ticker to object array if necessary
    const currentTicker = Array.isArray(info.newsTicker) && typeof info.newsTicker[0] === 'string' 
      ? [{ text: info.newsTicker[0], link: '' }]
      : info.newsTicker || [];
    
    setInfo({ ...info, newsTicker: [...currentTicker, { text: 'New Flash News', link: '' }] });
  };

  const removeTickerItem = (idx) => {
    const updated = [...info.newsTicker];
    updated.splice(idx, 1);
    setInfo({ ...info, newsTicker: updated });
  };

  const updateTickerItem = (idx, field, value) => {
    const updated = [...info.newsTicker];
    // Ensure it's an object
    if (typeof updated[idx] === 'string') {
      updated[idx] = { text: updated[idx], link: '' };
    }
    updated[idx] = { ...updated[idx], [field]: value };
    setInfo({ ...info, newsTicker: updated });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Phone className="text-[#fec53a]" size={24} />
            Top Bar Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage contact info, scrolling ticker, and top-right quick links.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#fec53a] text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-[#d1a52b] transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Contacts */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-1 px-6 py-4 bg-gray-50 border-b border-gray-100 uppercase tracking-widest text-[10px] font-bold text-gray-400">
              Primary Contacts
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                <input 
                  value={info.phone} 
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#fec53a] outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Toll-Free Number</label>
                <input 
                  value={info.tollFree || ''} 
                  onChange={(e) => updateField('tollFree', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#fec53a] outline-none" 
                  placeholder="1800-XXX-XXXX"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Support Email</label>
                <input 
                  value={info.email} 
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#fec53a] outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Ticker */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-1 px-6 py-4 bg-gray-50 border-b border-gray-100 uppercase tracking-widest text-[10px] font-bold text-gray-400 flex justify-between items-center">
              <span>Smart News Ticker (Scrolling)</span>
              <button onClick={addTickerItem} className="text-[#fec53a] hover:underline">+ Add Flash News</button>
            </div>
            <div className="p-6 space-y-3">
              {(Array.isArray(info.newsTicker) ? info.newsTicker : []).map((item, idx) => {
                const isObj = typeof item === 'object' && item !== null;
                const text = isObj ? item.text : item;
                const link = isObj ? item.link : '';

                return (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-50 bg-gray-50/30 group items-center">
                    <div className="p-1 text-gray-200"><GripVertical size={16} /></div>
                    <div className="flex-1 space-y-2">
                       <input 
                        value={text}
                        onChange={(e) => updateTickerItem(idx, 'text', e.target.value)}
                        placeholder="News Text (e.g. ⭐ Admissions Open...)"
                        className="w-full bg-transparent border-b border-gray-200 text-sm font-medium outline-none focus:border-[#fec53a] py-1"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Link:</span>
                        <input 
                          value={link}
                          onChange={(e) => updateTickerItem(idx, 'link', e.target.value)}
                          placeholder="/admission (optional)"
                          className="flex-1 bg-transparent border-b border-gray-100 text-[12px] text-gray-500 outline-none focus:border-[#fec53a]"
                        />
                      </div>
                    </div>
                    <button onClick={() => removeTickerItem(idx)} className="text-gray-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={20} />
                    </button>
                  </div>
                );
              })}
              {(!info.newsTicker || info.newsTicker.length === 0) && (
                <div className="text-center py-6 text-gray-300 italic text-sm border-2 border-dashed border-gray-50 rounded-xl">
                  No news items added.
                </div>
              )}
            </div>
          </div>

          {/* Quick Links CRUD */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-1 px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between uppercase tracking-widest text-[10px] font-bold text-gray-400">
               Quick Links (Top Strip)
               <button onClick={addLink} className="text-[#fec53a] hover:underline">+ Add Link</button>
             </div>
             <div className="p-6 space-y-3">
               {info.topStripLinks.map((link, idx) => (
                 <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-50 bg-gray-50/30 group">
                    <div className="p-1 text-gray-200 group-hover:text-gray-400 transition-colors"><GripVertical size={16} /></div>
                    <input 
                      value={link.label}
                      onChange={(e) => updateLink(idx, 'label', e.target.value)}
                      placeholder="Label"
                      className="flex-1 bg-transparent border-b border-gray-200 text-sm font-bold outline-none focus:border-[#fec53a]"
                    />
                    <input 
                      value={link.slug}
                      onChange={(e) => updateLink(idx, 'slug', e.target.value)}
                      placeholder="/slug"
                      className="flex-1 bg-transparent border-b border-gray-200 text-sm text-gray-500 outline-none focus:border-[#fec53a]"
                    />
                    <button onClick={() => removeLink(idx)} className="text-gray-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={16} />
                    </button>
                 </div>
               ))}
               {info.topStripLinks.length === 0 && (
                 <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-2xl text-gray-300 italic text-sm">
                   No quick links added yet.
                 </div>
               )}
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-[#09090b] text-white p-6 rounded-2xl shadow-xl shadow-black/10 border border-white/5">
             <h3 className="text-sm font-bold text-[#fec53a] mb-4 flex items-center gap-2 underline underline-offset-4 decoration-[#fec53a]">
               <Info size={16} /> Data Integrity
             </h3>
             <ul className="text-xs text-gray-400 space-y-4">
               <li>• <b>Live Sync:</b> All changes are flushed to MongoDB immediately after save.</li>
               <li>• <b>Accessibility:</b> Links should have descriptive labels for screen readers.</li>
               <li>• <b>UI Performance:</b> Keep news ticker short for smooth animations.</li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
