'use client';

import { useState } from 'react';
import { 
  Globe, Save, Info, Search, Megaphone, 
  HelpCircle, XCircle, MousePointer2, Image as ImageIcon
} from 'lucide-react';
import { saveFullNavigationData } from '@/lib/actions/navigation';

export default function SiteConfigManager({ initialData }) {
  const [config, setConfig] = useState(initialData.siteConfig);
  const [logoUrl, setLogoUrl] = useState(initialData.logoUrl);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const payload = JSON.parse(JSON.stringify({ 
      ...initialData, 
      siteConfig: config,
      logoUrl: logoUrl
    }));
    
    const result = await saveFullNavigationData(payload);
    if (result.success) {
      alert('Site configuration updated successfully!');
    } else {
      alert('Error: ' + result.error);
    }
    setSaving(false);
  };

  const updateNested = (path, value) => {
    const keys = path.split('.');
    const nextConfig = { ...config };
    let current = nextConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setConfig(nextConfig);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Globe className="text-[#fec53a]" size={24} />
            Site Configuration
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage branding, core labels, and global action buttons.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#09090b] text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 active:scale-95"
        >
          <Save size={18} className="text-[#fec53a]" /> 
          {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Branding Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <ImageIcon size={14} /> Brand Identity
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Site Logo URL</label>
                <div className="flex gap-4">
                  <input 
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fec53a]/20 outline-none"
                    placeholder="https://..."
                  />
                  {logoUrl && (
                    <div className="w-16 h-12 bg-gray-900 rounded-lg flex items-center justify-center p-2 border border-white/5">
                      <img src={logoUrl} alt="Preview" className="max-h-full object-contain" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Core Labels */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Interface Labels & Placeholders
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                  <Search size={10} /> Search Placeholder
                </label>
                <input 
                  value={config.searchPlaceholder}
                  onChange={(e) => updateNested('searchPlaceholder', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fec53a]/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                  <Megaphone size={10} /> News Badge Label
                </label>
                <input 
                  value={config.topBar.latestNewsLabel}
                  onChange={(e) => updateNested('topBar.latestNewsLabel', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fec53a]/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                  <HelpCircle size={10} /> Helpdesk Prompt
                </label>
                <input 
                  value={config.topBar.helpdeskLabel}
                  onChange={(e) => updateNested('topBar.helpdeskLabel', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fec53a]/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                  <XCircle size={10} /> Sidebar Close Label
                </label>
                <input 
                  value={config.sidebar.closeLabel}
                  onChange={(e) => updateNested('sidebar.closeLabel', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fec53a]/20 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Header Action Button
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                  Button Text
                </label>
                <input 
                  value={config.headerActionButton?.text || ''}
                  onChange={(e) => updateNested('headerActionButton.text', e.target.value)}
                  placeholder="APPLY NOW"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#fec53a]/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                  Button Link
                </label>
                <input 
                  value={config.headerActionButton?.link || ''}
                  onChange={(e) => updateNested('headerActionButton.link', e.target.value)}
                  placeholder="/admission"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fec53a]/20 outline-none"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-[#09090b] text-white p-6 rounded-2xl shadow-xl border border-white/5">
            <h3 className="text-sm font-bold text-[#fec53a] mb-4 flex items-center gap-2 underline underline-offset-4 decoration-[#fec53a]">
              <Info size={16} /> Technical Info
            </h3>
            <ul className="text-xs text-gray-400 space-y-4">
              <li>• <b>Live Update:</b> Changes reflect immediately across the entire site after saving.</li>
              <li>• <b>Logo:</b> Use high-quality transparent PNG or SVG for best results.</li>
              <li>• <b>Hierarchy:</b> Config overrides any hardcoded local defaults.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
