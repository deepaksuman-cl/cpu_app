'use client';

import { useState } from 'react';
import { 
  Smartphone, Save, MessageSquare, Plus, Trash2, 
  GripVertical, Info, Layout, ListTree, Check, X
} from 'lucide-react';
import { saveFullNavigationData } from '@/lib/actions/navigation';
import IconPicker from '@/components/admin/ui/IconPicker';

export default function MobileConfigManager({ initialData, initialMobileConfig }) {
  const [config, setConfig] = useState(initialMobileConfig);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    setSaving(true);
    try {
      const payload = JSON.parse(JSON.stringify({ ...initialData, mobileConfig: config }));
      const result = await saveFullNavigationData(payload);
      if (result.success) alert('Mobile configuration updated successfully!');
      else alert('Error: ' + result.error);
    } catch (err) {
      alert('Serialization Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field, value) => {
    setConfig({ ...config, [field]: value });
  };

  // --- ENQUIRY FORM CRUD ---
  const addFormField = () => {
    const newField = {
      id: `field_${Date.now()}`,
      type: 'text',
      placeholder: 'New Field',
      required: false
    };
    setConfig({ 
      ...config, 
      enquiryForm: { 
        ...config.enquiryForm, 
        fields: [...config.enquiryForm.fields, newField] 
      } 
    });
  };

  const removeFormField = (idx) => {
    const updatedFields = [...config.enquiryForm.fields];
    updatedFields.splice(idx, 1);
    setConfig({ 
      ...config, 
      enquiryForm: { ...config.enquiryForm, fields: updatedFields } 
    });
  };

  const updateFormField = (idx, field, value) => {
    const updatedFields = [...config.enquiryForm.fields];
    updatedFields[idx] = { ...updatedFields[idx], [field]: value };
    setConfig({ 
      ...config, 
      enquiryForm: { ...config.enquiryForm, fields: updatedFields } 
    });
  };

  // --- BOTTOM TABS CRUD ---
  const addTab = () => {
    const newTab = {
      key: `tab_${Date.now()}`,
      label: 'New Tab',
      icon: 'Home',
      type: 'link',
      path: '/'
    };
    setConfig({ ...config, bottomTabs: [...config.bottomTabs, newTab] });
  };

  const removeTab = (idx) => {
    const updatedTabs = [...config.bottomTabs];
    updatedTabs.splice(idx, 1);
    setConfig({ ...config, bottomTabs: updatedTabs });
  };

  const updateTab = (idx, field, value) => {
    const updatedTabs = [...config.bottomTabs];
    updatedTabs[idx] = { ...updatedTabs[idx], [field]: value };
    setConfig({ ...config, bottomTabs: updatedTabs });
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)] text-left flex flex-col gap-0 justify-start">
      
      {/* ── Fixed/Sticky Header (Exactly 44px Height) ── */}
      <div className="sticky top-0 z-[30] flex items-center justify-between h-[44px] w-full bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm" style={{ position: 'sticky', top: 0, marginTop: 0 }}>
        
        {/* Left: Title */}
        <div className="flex items-center h-full px-4 gap-3">
          <Smartphone size={14} className="text-[var(--text-muted)] hidden sm:block" strokeWidth={2.5} />
          <h1 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-wider">
            Mobile App Experience
          </h1>
          <div className="hidden md:block w-[1px] h-4 bg-[var(--border-default)]"></div>
          <span className="hidden md:inline-block text-[12px] text-[var(--text-secondary)] font-bold tracking-wide truncate max-w-[200px] lg:max-w-[500px]">
            Configure bottom navigation, floating forms, and labels
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center h-full px-4 gap-2.5">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center h-[32px] px-3 sm:px-4 bg-[var(--color-success)] hover:bg-[var(--color-success-dark)] text-[var(--text-inverse)] transition-colors rounded-none shadow-sm uppercase tracking-widest text-[11px] font-bold disabled:opacity-50"
          >
            {saving ? <div className="w-3.5 h-3.5 border-2 border-[var(--bg-surface)] border-t-[var(--text-inverse)] rounded-full animate-spin md:mr-1.5" /> : <Save size={14} strokeWidth={2.5} className="md:mr-1.5" />}
            <span className="hidden sm:block">{saving ? 'Saving...' : 'Save Config'}</span>
          </button>
        </div>
      </div>

      <div className="w-[98%] lg:w-[95%] xl:w-[92%] mx-auto p-4 sm:p-6 space-y-6 lg:space-y-8 pb-20 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            
            {/* Bottom Navigation Tabs */}
            <div className="bg-[var(--bg-surface)] rounded-none shadow-sm border border-[var(--border-default)] overflow-hidden">
               <div className="p-4 bg-[var(--bg-muted)] border-b border-[var(--border-default)] flex items-center justify-between uppercase tracking-widest text-[10px] font-bold text-[var(--text-muted)]">
                 <span>Bottom Navbar Tabs</span>
                 <button onClick={addTab} className="text-[var(--color-primary)] font-black hover:underline flex items-center gap-1 tracking-widest uppercase"><Plus size={12}/> Add Tab</button>
               </div>
               <div className="p-6 space-y-4 bg-[var(--bg-surface)]">
                 {config.bottomTabs.map((tab, idx) => (
                   <div key={idx} className="bg-[var(--bg-body)] p-6 rounded-none border border-[var(--border-default)] shadow-sm space-y-4 relative group hover:border-[var(--color-primary)] transition-colors">
                      <button 
                        onClick={() => removeTab(idx)}
                        className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors opacity-0 group-hover:opacity-100 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Tab Label</label>
                          <input 
                            value={tab.label} 
                            onChange={(e) => updateTab(idx, 'label', e.target.value)}
                            className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm font-bold focus:border-[var(--color-primary)] outline-none transition-all text-[var(--text-primary)]" 
                          />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest text-sm">Icon Picker</label>
                           <IconPicker value={tab.icon} onChange={(val) => updateTab(idx, 'icon', val)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Type</label>
                          <select 
                            value={tab.type} 
                            onChange={(e) => updateTab(idx, 'type', e.target.value)}
                            className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm font-bold focus:border-[var(--color-primary)] outline-none transition-all appearance-none text-[var(--text-primary)]"
                          >
                            <option value="link">Page Link</option>
                            <option value="action">Dynamic Action</option>
                            <option value="drawer">Open Drawer</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Path / Action Key</label>
                          <input 
                            value={tab.path} 
                            onChange={(e) => {
                              let val = e.target.value;
                              if (val && !val.startsWith('/') && !val.startsWith('http') && !val.startsWith('mailto:') && !val.startsWith('tel:') && !val.startsWith('#')) {
                                val = '/' + val;
                              }
                              updateTab(idx, 'path', val);
                            }}
                            className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm font-bold focus:border-[var(--color-primary)] outline-none transition-all text-[var(--text-primary)]" 
                          />
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Enquiry Form Builder */}
            <div className="bg-[var(--bg-surface)] rounded-none shadow-sm border border-[var(--border-default)] overflow-hidden">
               <div className="p-4 bg-[var(--bg-muted)] border-b border-[var(--border-default)] flex items-center justify-between uppercase tracking-widest text-[10px] font-bold text-[var(--text-muted)]">
                 <span>Mobile Enquiry Form Builder</span>
                 <button onClick={addFormField} className="text-[var(--color-primary)] font-black hover:underline flex items-center gap-1 tracking-widest uppercase"><Plus size={12}/> Add Field</button>
               </div>
               <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Form Title</label>
                      <input 
                        value={config.enquiryForm.title} 
                        onChange={(e) => setConfig({ ...config, enquiryForm: { ...config.enquiryForm, title: e.target.value } })}
                        className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm font-bold focus:border-[var(--color-primary)] outline-none transition-all text-[var(--text-primary)]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Header Icon</label>
                      <div className="bg-[var(--bg-body)] rounded-none flex items-center">
                        <IconPicker 
                          value={config.enquiryForm.icon} 
                          onChange={(val) => setConfig({ ...config, enquiryForm: { ...config.enquiryForm, icon: val } })} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[var(--bg-body)] p-4 rounded-none border border-[var(--border-default)]">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border-light)]">
                      <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Form Fields</span>
                      <button onClick={addFormField} className="text-[var(--color-primary)] text-[10px] font-bold hover:underline flex items-center gap-1 uppercase tracking-widest"><Plus size={12}/> Add Field</button>
                    </div>
                  <div className="space-y-3">
                    {config.enquiryForm.fields.map((field, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-none border border-[var(--border-default)] bg-[var(--bg-surface)] group items-center">
                         <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input 
                              value={field.placeholder} 
                              onChange={(e) => updateFormField(idx, 'placeholder', e.target.value)}
                              placeholder="Placeholder Text"
                              className="bg-transparent border-b border-[var(--border-light)] py-1.5 text-[13px] font-bold focus:border-[var(--color-primary)] outline-none text-[var(--text-primary)]"
                            />
                            <select 
                              value={field.type} 
                              onChange={(e) => updateFormField(idx, 'type', e.target.value)}
                              className="bg-transparent border-b border-[var(--border-light)] py-1.5 text-[13px] font-bold focus:border-[var(--color-primary)] outline-none text-[var(--text-primary)]"
                            >
                               <option value="text">Text Input</option>
                               <option value="email">Email</option>
                               <option value="tel">Phone</option>
                               <option value="textarea">Message Area</option>
                            </select>
                            <label className="flex items-center gap-2 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest pl-2 md:border-l md:border-[var(--border-light)] hover:text-[var(--text-primary)] cursor-pointer">
                               <input 
                                  type="checkbox" 
                                  checked={field.required} 
                                  onChange={(e) => updateFormField(idx, 'required', e.target.checked)}
                                  className="accent-[var(--color-primary)] cursor-pointer"
                               /> Required Field?
                            </label>
                         </div>
                         <button onClick={() => removeFormField(idx)} className="text-[var(--text-muted)] hover:text-[var(--color-danger)] opacity-0 group-hover:opacity-100 transition-all p-2">
                           <Trash2 size={16} />
                         </button>
                      </div>
                    ))}
                  </div>
                </div>
               </div>
            </div>
          </div>

          {/* Labels & System */}
          <div className="space-y-6 lg:space-y-8">
             <div className="bg-[var(--bg-surface)] rounded-none shadow-sm border border-[var(--border-default)] overflow-hidden">
               <div className="p-4 bg-[var(--bg-muted)] border-b border-[var(--border-default)] uppercase tracking-widest text-[10px] font-bold text-[var(--text-muted)]">
                 Mobile Labels
               </div>
               <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Explore Categories Title</label>
                    <input 
                      value={config.exploreMoreHeading} 
                      onChange={(e) => updateField('exploreMoreHeading', e.target.value)}
                      className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm font-bold focus:border-[var(--color-primary)] outline-none transition-all text-[var(--text-primary)]" 
                    />
                  </div>
               </div>
             </div>

             <div className="bg-[var(--bg-surface)] p-6 rounded-none shadow-sm border border-[var(--border-default)]">
                <h3 className="text-[var(--color-primary)] font-bold text-[11px] uppercase tracking-widest mb-4 border-b border-[var(--border-light)] pb-2 flex items-center gap-2">
                  <Info size={14} /> Mobile UI Status
                </h3>
                <div className="space-y-3">
                   <div className="flex justify-between items-center text-[11px] font-bold text-[var(--text-secondary)]">
                     <span>Total Tabs</span>
                     <span className="text-[var(--text-primary)]">{config.bottomTabs.length}/5</span>
                   </div>
                   <div className="w-full bg-[var(--bg-muted)] h-1.5 rounded-none overflow-hidden border border-[var(--border-light)]">
                      <div className="bg-[var(--color-primary)] h-full transition-all duration-300" style={{ width: `${Math.min((config.bottomTabs.length / 5) * 100, 100)}%` }} />
                   </div>
                   <p className="text-[10px] text-[var(--text-muted)] italic mt-2 font-medium">Recommended: Max 5 tabs for best mobile reachability.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
