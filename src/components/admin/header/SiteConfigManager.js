'use client';

import { useState } from 'react';
import { 
  Globe, Save, Info, Search, Megaphone, 
  HelpCircle, XCircle, MousePointer2, Image as ImageIcon
} from 'lucide-react';
import { saveFullNavigationData } from '@/lib/actions/navigation';
import MediaUploader from '@/components/admin/MediaUploader';

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
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-[var(--bg-body)] text-left flex flex-col gap-0 justify-start">
      
      {/* ── Fixed/Sticky Header (Exactly 44px Height) ── */}
      <div className="sticky top-0 z-[30] flex items-center justify-between h-[44px] w-full bg-[var(--bg-surface)] border-b border-[var(--border-default)] shadow-sm" style={{ position: 'sticky', top: 0, marginTop: 0 }}>
        
        {/* Left: Title */}
        <div className="flex items-center h-full px-4 gap-3">
          <Globe size={14} className="text-[var(--text-muted)] hidden sm:block" strokeWidth={2.5} />
          <h1 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-wider">
            Site Configuration
          </h1>
          <div className="hidden md:block w-[1px] h-4 bg-[var(--border-default)]"></div>
          <span className="hidden md:inline-block text-[12px] text-[var(--text-secondary)] font-bold tracking-wide truncate max-w-[200px] lg:max-w-[500px]">
            Manage branding, labels, and global actions
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
            <span className="hidden sm:block">{saving ? 'Saving...' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>

      <div className="w-[98%] lg:w-[95%] xl:w-[92%] mx-auto p-4 sm:p-6 space-y-8 pb-20 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            
            {/* Branding Section */}
            <div className="bg-[var(--bg-surface)] rounded-none shadow-sm border border-[var(--border-default)] overflow-hidden">
              <div className="px-6 py-4 bg-[var(--bg-muted)] border-b border-[var(--border-default)] flex items-center gap-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                <ImageIcon size={14} /> Brand Identity
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Site Logo URL</label>
                  <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row">
                    <input 
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className="flex-1 bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm focus:border-[var(--color-primary)] outline-none"
                      placeholder="https://..."
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-full sm:w-auto shrink-0 flex items-center justify-center">
                        <MediaUploader category="site" onUploadSuccess={url => setLogoUrl(url)} />
                      </div>
                      {logoUrl && (
                        <div className="w-16 h-12 shrink-0 bg-[#09090b] rounded-none flex items-center justify-center p-1 border border-[var(--border-light)]">
                          <img src={logoUrl} alt="Preview" className="max-h-full object-contain" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Labels */}
            <div className="bg-[var(--bg-surface)] rounded-none shadow-sm border border-[var(--border-default)] overflow-hidden">
               <div className="px-6 py-4 bg-[var(--bg-muted)] border-b border-[var(--border-default)] text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                Interface Labels & Placeholders
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-1">
                    <Search size={12} className="text-[var(--text-muted)]" /> Search Placeholder
                  </label>
                  <input 
                    value={config.searchPlaceholder}
                    onChange={(e) => updateNested('searchPlaceholder', e.target.value)}
                    className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-1">
                    <Megaphone size={12} className="text-[var(--text-muted)]" /> News Badge Label
                  </label>
                  <input 
                    value={config.topBar.latestNewsLabel}
                    onChange={(e) => updateNested('topBar.latestNewsLabel', e.target.value)}
                    className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-1">
                    <HelpCircle size={12} className="text-[var(--text-muted)]" /> Helpdesk Prompt
                  </label>
                  <input 
                    value={config.topBar.helpdeskLabel}
                    onChange={(e) => updateNested('topBar.helpdeskLabel', e.target.value)}
                    className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-1">
                    <XCircle size={12} className="text-[var(--text-muted)]" /> Sidebar Close Label
                  </label>
                  <input 
                    value={config.sidebar.closeLabel}
                    onChange={(e) => updateNested('sidebar.closeLabel', e.target.value)}
                    className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="bg-[var(--bg-surface)] rounded-none shadow-sm border border-[var(--border-default)] overflow-hidden">
               <div className="px-6 py-4 bg-[var(--bg-muted)] border-b border-[var(--border-default)] text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                Header Action Button
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">
                    Button Text
                  </label>
                  <input 
                    value={config.headerActionButton?.text || ''}
                    onChange={(e) => updateNested('headerActionButton.text', e.target.value)}
                    placeholder="APPLY NOW"
                    className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm font-bold focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">
                    Button Link
                  </label>
                  <input 
                    value={config.headerActionButton?.link || ''}
                    onChange={(e) => updateNested('headerActionButton.link', e.target.value)}
                    placeholder="/admission"
                    className="w-full bg-[var(--bg-body)] border border-[var(--border-default)] rounded-none px-4 py-3 text-sm focus:border-[var(--color-primary)] outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-6">
            <div className="bg-[var(--bg-surface)] p-6 rounded-none shadow-sm border border-[var(--border-default)]">
              <h3 className="text-[11px] font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2 uppercase tracking-widest border-b border-[var(--border-light)] pb-2">
                <Info size={14} className="text-[var(--color-primary)]" /> Technical Info
              </h3>
              <ul className="text-[11px] text-[var(--text-secondary)] space-y-4 leading-relaxed font-medium">
                <li>• <b className="text-[var(--text-primary)]">Live Update:</b> Changes reflect immediately across the entire site after saving.</li>
                <li>• <b className="text-[var(--text-primary)]">Logo:</b> Use high-quality transparent PNG or SVG for best results.</li>
                <li>• <b className="text-[var(--text-primary)]">Hierarchy:</b> Config overrides any hardcoded local defaults.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
