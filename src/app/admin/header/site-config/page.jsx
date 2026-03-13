import { getNavigationData, updateNavigationData } from '@/lib/actions/navigation';
import { Globe, Save, Info } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function SiteConfigPage() {
  const data = await getNavigationData();
  const config = data.siteConfig;

  async function handleUpdate(formData) {
    'use server';
    
    // Update Logo
    await updateNavigationData('logoUrl', formData.get('logoUrl'));
    
    // Update Config
    await updateNavigationData('siteConfig', {
      searchPlaceholder: formData.get('searchPlaceholder'),
      topBar: {
        latestNewsLabel: formData.get('latestNewsLabel'),
        helpdeskLabel: formData.get('helpdeskLabel'),
      },
      sidebar: {
        closeLabel: formData.get('closeLabel'),
      }
    });

    revalidatePath('/admin/header/site-config');
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Globe className="text-[#fec53a]" size={24} />
          Site Configuration
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage global brand identity, logo, and core UI labels.</p>
      </div>

      <form action={handleUpdate} className="space-y-6">
        {/* Logo Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-1 px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Logo Settings</h2>
            <Info size={16} className="text-gray-400" />
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Logo Image URL</label>
              <input 
                name="logoUrl"
                type="text" 
                defaultValue={data.logoUrl}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#fec53a] focus:border-transparent outline-none transition-all"
                placeholder="https://example.com/logo.png"
              />
            </div>
            {data.logoUrl && (
              <div className="mt-4 p-4 bg-gray-900 rounded-xl border border-white/5 flex items-center justify-center">
                <img src={data.logoUrl} alt="Logo Preview" className="h-12 object-contain" />
              </div>
            )}
          </div>
        </div>

        {/* Global Labels Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-1 px-6 py-4 bg-gray-50 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Interface Labels</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Search Placeholder</label>
              <input 
                name="searchPlaceholder"
                type="text" 
                defaultValue={config.searchPlaceholder}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#fec53a] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Latest News Badge</label>
              <input 
                name="latestNewsLabel"
                type="text" 
                defaultValue={config.topBar.latestNewsLabel}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#fec53a] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Helpdesk Help Text</label>
              <input 
                name="helpdeskLabel"
                type="text" 
                defaultValue={config.topBar.helpdeskLabel}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#fec53a] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Sidebar Close Button</label>
              <input 
                name="closeLabel"
                type="text" 
                defaultValue={config.sidebar.closeLabel}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#fec53a] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="bg-[#09090b] text-white hover:bg-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Save size={18} className="text-[#fec53a]" />
            Save Site Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
