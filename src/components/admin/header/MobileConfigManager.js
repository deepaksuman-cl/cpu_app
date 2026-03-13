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

  const handleSave = async () => {
    setSaving(true);
    const result = await saveFullNavigationData({ ...initialData, mobileConfig: config });
    if (result.success) alert('Mobile configuration updated!');
    else alert('Error: ' + result.error);
    setSaving(false);
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
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Smartphone className="text-[#fec53a]" size={24} />
            Mobile App Experience
          </h1>
          <p className="text-sm text-gray-500 mt-1">Configure bottom navigation, floating forms, and mobile unique labels.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#fec53a] text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-[#d1a52b] transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Bottom Navigation Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-1 px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between uppercase tracking-widest text-[10px] font-bold text-gray-400">
               Bottom Navbar Tabs
               <button onClick={addTab} className="text-[#fec53a] hover:underline">+ Add Tab</button>
             </div>
             <div className="p-6 space-y-4">
               {config.bottomTabs.map((tab, idx) => (
                 <div key={idx} className="bg-white p-6 rounded-2x border border-gray-100 shadow-sm space-y-4 relative group">
                    <button 
                      onClick={() => removeTab(idx)}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tab Label</label>
                        <input 
                          value={tab.label} 
                          onChange={(e) => updateTab(idx, 'label', e.target.value)}
                          className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:border-[#fec53a] outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-sm">Icon Picker</label>
                         <IconPicker value={tab.icon} onChange={(val) => updateTab(idx, 'icon', val)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</label>
                        <select 
                          value={tab.type} 
                          onChange={(e) => updateTab(idx, 'type', e.target.value)}
                          className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:border-[#fec53a] outline-none transition-all appearance-none"
                        >
                          <option value="link">Page Link</option>
                          <option value="action">Dynamic Action</option>
                          <option value="drawer">Open Drawer</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Path / Action Key</label>
                        <input 
                          value={tab.path} 
                          onChange={(e) => updateTab(idx, 'path', e.target.value)}
                          className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:border-[#fec53a] outline-none transition-all" 
                        />
                      </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Enquiry Form Builder */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-1 px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between uppercase tracking-widest text-[10px] font-bold text-gray-400">
               Mobile Enquiry Form Builder
               <button onClick={addFormField} className="text-[#fec53a] hover:underline">+ Add Field</button>
             </div>
             <div className="p-6">
                <div className="space-y-3">
                  {config.enquiryForm.fields.map((field, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 group items-center">
                       <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input 
                            value={field.placeholder} 
                            onChange={(e) => updateFormField(idx, 'placeholder', e.target.value)}
                            placeholder="Placeholder Text"
                            className="bg-transparent border-b border-gray-200 py-1 text-sm font-bold focus:border-[#fec53a] outline-none"
                          />
                          <select 
                            value={field.type} 
                            onChange={(e) => updateFormField(idx, 'type', e.target.value)}
                            className="bg-transparent border-b border-gray-200 py-1 text-sm font-bold focus:border-[#fec53a] outline-none"
                          >
                             <option value="text">Text Input</option>
                             <option value="email">Email</option>
                             <option value="tel">Phone</option>
                             <option value="textarea">Message Area</option>
                          </select>
                          <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                             <input 
                                type="checkbox" 
                                checked={field.required} 
                                onChange={(e) => updateFormField(idx, 'required', e.target.checked)}
                             /> Required Field?
                          </label>
                       </div>
                       <button onClick={() => removeFormField(idx)} className="text-gray-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2">
                         <Trash2 size={16} />
                       </button>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* Labels & System */}
        <div className="space-y-8">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-1 px-6 py-4 bg-gray-50 border-b border-gray-100 uppercase tracking-widest text-[10px] font-bold text-gray-400">
               Mobile Labels
             </div>
             <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Explore Categories Title</label>
                  <input 
                    value={config.exploreMoreHeading} 
                    onChange={(e) => updateField('exploreMoreHeading', e.target.value)}
                    className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:border-[#fec53a] outline-none transition-all" 
                  />
                </div>
             </div>
           </div>

           <div className="bg-[#09090b] text-white p-6 rounded-2xl shadow-xl shadow-black/10">
              <h3 className="text-[#fec53a] font-bold text-sm mb-4">Mobile UI Status</h3>
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-[11px]">
                   <span className="text-gray-400">Total Tabs</span>
                   <span className="font-bold">{config.bottomTabs.length}/5</span>
                 </div>
                 <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#fec53a] h-full" style={{ width: `${(config.bottomTabs.length / 5) * 100}%` }} />
                 </div>
                 <p className="text-[10px] text-gray-500 italic mt-2">Recommended: Max 5 tabs for best mobile reachability.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
