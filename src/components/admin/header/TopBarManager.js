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
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)] text-left flex flex-col gap-0 justify-start">
      
      {/* ── Fixed/Sticky Header (Exactly 44px Height) ── */}
      <div className="sticky top-0 z-[30] flex items-center justify-between h-[44px] w-full bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm" style={{ position: 'sticky', top: 0, marginTop: 0 }}>
        
        {/* Left: Title */}
        <div className="flex items-center h-full px-4 gap-3">
          <Phone size={14} className="text-[var(--text-muted)] hidden sm:block" strokeWidth={2.5} />
          <h1 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-wider">
            Top Bar Settings
          </h1>
          <div className="hidden md:block w-[1px] h-4 bg-[var(--border-default)]"></div>
          <span className="hidden md:inline-block text-[12px] text-[var(--text-secondary)] font-bold tracking-wide truncate max-w-[200px] lg:max-w-[500px]">
            Manage contact info, ticker, and quick links
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center h-full px-4 gap-2.5">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center h-[32px] px-3 sm:px-4 bg-[var(--color-success)] hover:bg-[var(--color-success-dark)] text-[var(--text-inverse)] transition-colors rounded-none shadow-sm uppercase tracking-widest text-[11px] font-bold disabled:opacity-50"
          >
            <Save size={14} strokeWidth={2.5} className="md:mr-1.5" /> 
            <span className="hidden sm:block">{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="w-[98%] lg:w-[95%] xl:w-[92%] mx-auto p-4 sm:p-6 space-y-6 lg:space-y-8 pb-20 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Main Contacts */}
            <div className="bg-[var(--bg-surface)] rounded-none shadow-sm border border-[var(--border-default)] overflow-hidden">
              <div className="px-6 py-4 bg-[var(--bg-muted)] border-b border-[var(--border-default)] uppercase tracking-widest text-[10px] font-bold text-[var(--text-muted)]">
                Primary Contacts
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Phone Number</label>
                  <input 
                    value={info.phone} 
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm font-bold focus:border-[var(--color-primary)] outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Toll-Free Number</label>
                  <input 
                    value={info.tollFree || ''} 
                    onChange={(e) => updateField('tollFree', e.target.value)}
                    className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm font-bold focus:border-[var(--color-primary)] outline-none" 
                    placeholder="1800-XXX-XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Support Email</label>
                  <input 
                    value={info.email} 
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm font-bold focus:border-[var(--color-primary)] outline-none" 
                  />
                </div>
              </div>
            </div>

            {/* Ticker */}
            <div className="bg-[var(--bg-surface)] rounded-none shadow-sm border border-[var(--border-default)] overflow-hidden">
              <div className="px-6 py-4 bg-[var(--bg-muted)] border-b border-[var(--border-default)] uppercase tracking-widest text-[10px] font-bold text-[var(--text-muted)] flex justify-between items-center">
                <span>Smart News Ticker (Scrolling)</span>
                <button onClick={addTickerItem} className="text-[var(--color-primary)] font-black hover:underline flex items-center gap-1"><Plus size={12}/> ADD FLASH NEWS</button>
              </div>
              <div className="p-6 space-y-3">
                {(Array.isArray(info.newsTicker) ? info.newsTicker : []).map((item, idx) => {
                  const isObj = typeof item === 'object' && item !== null;
                  const text = isObj ? item.text : item;
                  const link = isObj ? item.link : '';

                  return (
                    <div key={idx} className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 rounded-none border border-[var(--border-default)] bg-[var(--bg-body)] group items-start sm:items-center">
                      <div className="p-1 text-[var(--text-muted)] hidden sm:block"><GripVertical size={16} /></div>
                      <div className="flex-1 space-y-2 w-full">
                         <input 
                          value={text}
                          onChange={(e) => updateTickerItem(idx, 'text', e.target.value)}
                          placeholder="News Text (e.g. ⭐ Admissions Open...)"
                          className="w-full bg-transparent border-b border-[var(--border-light)] text-sm font-medium outline-none focus:border-[var(--color-primary)] py-1 text-[var(--text-primary)]"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">Link:</span>
                          <input 
                            value={link}
                            onChange={(e) => updateTickerItem(idx, 'link', e.target.value)}
                            placeholder="/admission (optional)"
                            className="flex-1 bg-transparent border-b border-[var(--border-light)] text-[12px] text-[var(--text-muted)] outline-none focus:border-[var(--color-primary)] py-1"
                          />
                        </div>
                      </div>
                      <button onClick={() => removeTickerItem(idx)} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors self-end sm:self-auto sm:opacity-0 group-hover:opacity-100 p-2 sm:p-0">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  );
                })}
                {(!info.newsTicker || info.newsTicker.length === 0) && (
                  <div className="text-center py-6 text-[var(--text-muted)] italic text-sm border border-dashed border-[var(--border-default)] rounded-none">
                    No news items added.
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links CRUD */}
            <div className="bg-[var(--bg-surface)] rounded-none shadow-sm border border-[var(--border-default)] overflow-hidden">
               <div className="px-6 py-4 bg-[var(--bg-muted)] border-b border-[var(--border-default)] flex items-center justify-between uppercase tracking-widest text-[10px] font-bold text-[var(--text-muted)]">
                 <span>Quick Links (Top Strip)</span>
                 <button onClick={addLink} className="text-[var(--color-primary)] font-black hover:underline flex items-center gap-1"><Plus size={12}/> ADD LINK</button>
               </div>
               <div className="p-6 space-y-3">
                 {info.topStripLinks.map((link, idx) => (
                   <div key={idx} className="flex gap-4 p-4 rounded-none border border-[var(--border-default)] bg-[var(--bg-body)] group items-center">
                      <div className="p-1 text-[var(--text-muted)] hidden sm:block group-hover:text-[var(--text-secondary)] transition-colors"><GripVertical size={16} /></div>
                      <input 
                        value={link.label}
                        onChange={(e) => updateLink(idx, 'label', e.target.value)}
                        placeholder="Label"
                        className="flex-1 bg-transparent border-b border-[var(--border-light)] text-sm font-bold outline-none focus:border-[var(--color-primary)] py-1 text-[var(--text-primary)]"
                      />
                      <input 
                        value={link.slug}
                        onChange={(e) => updateLink(idx, 'slug', e.target.value)}
                        placeholder="/slug"
                        className="flex-1 bg-transparent border-b border-[var(--border-light)] text-sm text-[var(--text-muted)] outline-none focus:border-[var(--color-primary)] py-1"
                      />
                      <button onClick={() => removeLink(idx)} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors opacity-0 group-hover:opacity-100 p-1">
                        <Trash2 size={16} />
                      </button>
                   </div>
                 ))}
                 {info.topStripLinks.length === 0 && (
                   <div className="text-center py-10 border border-dashed border-[var(--border-default)] rounded-none text-[var(--text-muted)] italic text-sm">
                     No quick links added yet.
                   </div>
                 )}
               </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="bg-[var(--bg-surface)] p-6 rounded-none shadow-sm border border-[var(--border-default)]">
               <h3 className="text-[11px] font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2 uppercase tracking-widest border-b border-[var(--border-light)] pb-2">
                 <Info size={14} className="text-[var(--color-primary)]" /> Data Integrity
               </h3>
               <ul className="text-[11px] text-[var(--text-secondary)] space-y-4 leading-relaxed font-medium">
                 <li>• <b className="text-[var(--text-primary)]">Live Sync:</b> All changes are flushed to DB immediately after save.</li>
                 <li>• <b className="text-[var(--text-primary)]">Accessibility:</b> Links should have descriptive labels.</li>
                 <li>• <b className="text-[var(--text-primary)]">UI Performance:</b> Keep news ticker short for smooth animations.</li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
