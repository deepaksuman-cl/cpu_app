// File: src/app/admin/header-settings/page.js
'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, AlertCircle, ChevronDown, ChevronRight, Image as ImageIcon, Link as LinkIcon, FileJson } from 'lucide-react';

export default function HeaderSettingsAdmin() {
  const [navData, setNavData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('site');
  const [expandedMenu, setExpandedMenu] = useState(null);

  // Raw JSON state for the Advanced Tab
  const [rawJson, setRawJson] = useState("");
  const [jsonError, setJsonError] = useState("");

  // 1. Fetch Data
  useEffect(() => {
    fetch('/api/navigation')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setNavData(data.data);
          setRawJson(JSON.stringify(data.data, null, 2));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 2. Save Data
  const handleSave = async (dataToSave = navData) => {
    setSaving(true);
    try {
      const res = await fetch('/api/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });
      const result = await res.json();
      if (result.success) {
        alert('✅ Header Data Saved Successfully!');
        setRawJson(JSON.stringify(dataToSave, null, 2));
      } else {
        alert('❌ Failed to save data');
      }
    } catch (err) {
      alert('❌ Error saving data');
    }
    setSaving(false);
  };

  // --- STATE UPDATE HANDLERS ---
  
  const handleNestedChange = (pathArray, value) => {
    setNavData(prev => {
      const newData = JSON.parse(JSON.stringify(prev)); // Deep copy
      let current = newData;
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      current[pathArray[pathArray.length - 1]] = value;
      return newData;
    });
  };

  const handleJsonEditorChange = (e) => {
    const val = e.target.value;
    setRawJson(val);
    try {
      const parsed = JSON.parse(val);
      setNavData(parsed);
      setJsonError("");
    } catch (error) {
      setJsonError("Invalid JSON format. Please fix errors before saving.");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-[80vh]"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
  if (!navData) return <div className="p-10 text-red-500 font-bold text-xl">No Data Found. Please check your Database connection.</div>;

  return (
    <div className="max-w-7xl mx-auto p-2">
      {/* Header Area */}
      <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Header & Navigation Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage everything from logo to complex mega-menus dynamically.</p>
        </div>
        <button 
          onClick={() => handleSave(navData)}
          disabled={saving || jsonError !== ""}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50 shadow-md"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {saving ? 'Saving to Database...' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 bg-white rounded-t-xl px-4 pt-2 overflow-x-auto hide-scrollbar">
        {[
          { id: 'site', label: 'Site Config & Logo' },
          { id: 'topbar', label: 'Top Bar Info' },
          { id: 'desktop', label: 'Desktop Mega Menus' },
          { id: 'advanced', label: 'Advanced (JSON Editor)', icon: FileJson },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-4 font-bold text-sm border-b-[3px] transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.icon && <tab.icon size={16} />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 p-6 lg:p-8 min-h-[600px]">
        
        {/* --- TAB: SITE CONFIG & LOGO --- */}
        {activeTab === 'site' && (
          <div className="space-y-8 max-w-3xl">
            <div>
              <h3 className="text-lg font-bold border-b pb-2 mb-4">Logo Settings</h3>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Logo URL</label>
              <input 
                type="text" 
                value={navData.logoUrl}
                onChange={(e) => handleNestedChange(['logoUrl'], e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
              />
              {navData.logoUrl && <img src={navData.logoUrl} alt="Logo Preview" className="h-16 mt-4 p-2 bg-gray-900 rounded" />}
            </div>

            <div>
              <h3 className="text-lg font-bold border-b pb-2 mb-4">Global Labels (Site Config)</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Search Placeholder</label>
                  <input type="text" value={navData.siteConfig.searchPlaceholder} onChange={(e) => handleNestedChange(['siteConfig', 'searchPlaceholder'], e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Latest News Label</label>
                  <input type="text" value={navData.siteConfig.topBar.latestNewsLabel} onChange={(e) => handleNestedChange(['siteConfig', 'topBar', 'latestNewsLabel'], e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Helpdesk Label</label>
                  <input type="text" value={navData.siteConfig.topBar.helpdeskLabel} onChange={(e) => handleNestedChange(['siteConfig', 'topBar', 'helpdeskLabel'], e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: TOP BAR INFO --- */}
        {activeTab === 'topbar' && (
          <div className="space-y-8 max-w-3xl">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                <input type="text" value={navData.topBarInfo.phone} onChange={(e) => handleNestedChange(['topBarInfo', 'phone'], e.target.value)} className="w-full border border-gray-300 rounded-md p-3" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input type="email" value={navData.topBarInfo.email} onChange={(e) => handleNestedChange(['topBarInfo', 'email'], e.target.value)} className="w-full border border-gray-300 rounded-md p-3" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">News Ticker Text</label>
              <textarea 
                value={navData.topBarInfo.newsTicker[0]}
                onChange={(e) => handleNestedChange(['topBarInfo', 'newsTicker', 0], e.target.value)}
                rows={3} className="w-full border border-gray-300 rounded-md p-3"
              />
            </div>
          </div>
        )}

        {/* --- TAB: DESKTOP MEGA MENUS --- */}
        {activeTab === 'desktop' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-md flex gap-3 text-blue-800 text-sm mb-6">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p>Click on a menu item below to edit its columns, links, and images. Changes will instantly reflect in the final database once saved.</p>
            </div>

            {navData.topMenu.map((menu, mIndex) => (
              <div key={mIndex} className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setExpandedMenu(expandedMenu === mIndex ? null : mIndex)}
                  className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors font-bold text-gray-800"
                >
                  <span className="flex items-center gap-2 text-lg">
                    {expandedMenu === mIndex ? <ChevronDown size={20} className="text-blue-600"/> : <ChevronRight size={20} className="text-gray-400"/>}
                    {menu.title} <span className="text-xs font-normal bg-gray-200 text-gray-600 px-2 py-1 rounded ml-2">{menu.type}</span>
                  </span>
                </button>

                {expandedMenu === mIndex && (
                  <div className="p-6 border-t border-gray-200 space-y-6">
                    {/* Basic Menu Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Menu Title</label>
                        <input type="text" value={menu.title} onChange={(e) => handleNestedChange(['topMenu', mIndex, 'title'], e.target.value)} className="w-full border border-gray-300 rounded p-2" />
                      </div>
                      
                      {menu.promoImage !== undefined && (
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><ImageIcon size={14}/> Promo Image URL</label>
                          <input type="text" value={menu.promoImage} onChange={(e) => handleNestedChange(['topMenu', mIndex, 'promoImage'], e.target.value)} className="w-full border border-gray-300 rounded p-2" />
                        </div>
                      )}
                    </div>

                    {/* Menu Columns & Links */}
                    {menu.columns ? (
                      <div className="mt-6">
                        <h4 className="font-bold text-gray-700 mb-3 border-b pb-2">Menu Columns ({menu.columns.length})</h4>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                          {menu.columns.map((col, cIndex) => (
                            <div key={cIndex} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                              <input 
                                type="text" 
                                value={col.heading} 
                                onChange={(e) => handleNestedChange(['topMenu', mIndex, 'columns', cIndex, 'heading'], e.target.value)}
                                className="w-full border-b border-gray-300 pb-1 font-bold text-blue-800 outline-none focus:border-blue-500 mb-3"
                              />
                              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {col.links.map((link, lIndex) => (
                                  <div key={lIndex} className="flex gap-2 items-center bg-gray-50 p-2 rounded border border-gray-100">
                                    <LinkIcon size={14} className="text-gray-400" />
                                    <input type="text" value={link.label} onChange={(e) => handleNestedChange(['topMenu', mIndex, 'columns', cIndex, 'links', lIndex, 'label'], e.target.value)} className="flex-1 bg-transparent text-sm outline-none border-b border-dashed border-gray-300 focus:border-blue-500" placeholder="Label"/>
                                    <input type="text" value={link.slug} onChange={(e) => handleNestedChange(['topMenu', mIndex, 'columns', cIndex, 'links', lIndex, 'slug'], e.target.value)} className="flex-1 bg-transparent text-sm outline-none border-b border-dashed border-gray-300 focus:border-blue-500 text-gray-500" placeholder="/slug"/>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // Handle Admission style direct links
                      <div className="mt-6">
                        <h4 className="font-bold text-gray-700 mb-3 border-b pb-2">Direct Links</h4>
                        <div className="space-y-2">
                          {menu.links?.map((link, lIndex) => (
                            <div key={lIndex} className="flex gap-2 items-center bg-white p-2 rounded border border-gray-200 shadow-sm w-1/2">
                              <LinkIcon size={14} className="text-gray-400" />
                              <input type="text" value={link.label} onChange={(e) => handleNestedChange(['topMenu', mIndex, 'links', lIndex, 'label'], e.target.value)} className="flex-1 bg-transparent text-sm outline-none border-b border-dashed border-gray-300" placeholder="Label"/>
                              <input type="text" value={link.slug} onChange={(e) => handleNestedChange(['topMenu', mIndex, 'links', lIndex, 'slug'], e.target.value)} className="flex-1 bg-transparent text-sm outline-none border-b border-dashed border-gray-300 text-gray-500" placeholder="/slug"/>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* --- TAB: ADVANCED JSON EDITOR --- */}
        {activeTab === 'advanced' && (
          <div className="flex flex-col h-[600px]">
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md flex gap-3 text-yellow-800 text-sm mb-4">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Pro Feature: Direct JSON Editor</p>
                <p>Want to add a new link, a new column, or change the Mobile Config? You can do it directly here. Ensure the JSON is valid before saving.</p>
              </div>
            </div>
            
            {jsonError && <p className="text-red-600 font-bold mb-2 bg-red-50 p-2 rounded">{jsonError}</p>}
            
            <textarea 
              value={rawJson}
              onChange={handleJsonEditorChange}
              className={`flex-1 w-full bg-gray-900 text-green-400 font-mono text-[13px] p-6 rounded-lg outline-none focus:ring-2 ${jsonError ? 'ring-red-500' : 'ring-blue-500'}`}
              spellCheck={false}
            />
          </div>
        )}

      </div>
    </div>
  );
}