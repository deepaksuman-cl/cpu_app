"use client";

import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import RichTextRenderer from '@/components/common/RichTextRenderer';

export default function TabbedContent({ data }) {
  // CMS se data aayega: data.layout (sidebar/top) aur data.tabs (array of objects)
  const layout = data?.layout || 'sidebar'; 
  
  // 🔥 FIX: Filter out null/undefined tabs to prevent crashes
  const tabs = (data?.tabs || []).filter(t => t && typeof t === 'object');

  const [activeTab, setActiveTab] = useState(null);

  // Default first tab ko active karne ke liye
  useEffect(() => {
    // 🔥 FIX: Added safety check for tabs[0]
    if (tabs.length > 0 && activeTab === null && tabs[0]) {
      setActiveTab(tabs[0]._id || 0);
    }
  }, [tabs, activeTab]);

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 font-sans my-8">
      
      {/* --- DESKTOP VIEW --- */}
      <div className={`hidden md:flex bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all duration-500 ${
        layout === 'sidebar' ? 'flex-row gap-8' : 'flex-col gap-6'
      }`}>
        
        {/* Navigation Area */}
        <div className={`flex shrink-0 ${
          layout === 'sidebar' ? 'flex-col w-72' : 'flex-row w-full overflow-x-auto scrollbar-hide border-b border-gray-100'
        }`}>
          {tabs.map((tab, index) => {
            // 🔥 FIX: Fallback to index if _id is missing
            const tabId = tab?._id || index;
            const isActive = activeTab === tabId;

            return (
              <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={`flex items-center gap-4 px-5 py-4 text-left transition-all duration-300 relative group
                  ${layout === 'sidebar' ? 'border-l-4 mb-2' : 'border-b-4 min-w-[200px] justify-center'}
                  ${isActive 
                    ? 'border-[#00588b] bg-[#00588b]/5 text-[#00588b]' 
                    : 'border-transparent text-gray-500 hover:bg-gray-50'
                  }`}
              >
                {tab?.icon && (
                  <div className={`p-2 rounded-lg transition-colors ${
                    isActive ? 'bg-[#00588b] text-white' : 'bg-gray-100 text-gray-400 group-hover:text-[#00588b]'
                  }`}>
                    {(() => {
                      // 🔥 FIX: Safe icon lookup
                      const Icon = LucideIcons[tab.icon] || LucideIcons.SquareStack;
                      return <Icon size={18} />;
                    })()}
                  </div>
                )}
                <span className={`font-bold text-sm tracking-wide ${isActive ? 'text-[#00588b]' : 'text-gray-600'}`}>
                  {tab?.title || `Tab ${index + 1}`}
                </span>
                
                {/* Active Indicator for Sidebar */}
                {isActive && layout === 'sidebar' && (
                  <ArrowRight size={16} className="ml-auto text-[#fec53a] animate-pulse" />
                )}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {tabs.map((tab, index) => {
            const tabId = tab?._id || index;
            if (activeTab !== tabId) return null;

            return (
              <div key={tabId} className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-1.5 h-8 bg-[#fec53a] rounded-full" />
                   <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                    {tab?.title || 'Section Content'}
                  </h2>
                </div>
                {/* 🔥 Yahan tumhara RichTextRenderer render karega CMS ka data */}
                <div className={data?.useProse !== false ? "prose max-w-none" : ""}>
                  <RichTextRenderer content={tab?.content} useProse={data?.useProse !== false} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* --- MOBILE VIEW: Accordion --- */}
      <div className="md:hidden flex flex-col gap-3">
        {tabs.map((tab, index) => {
          const tabId = tab?._id || index;
          const isActive = activeTab === tabId;

          return (
            <div 
              key={tabId} 
              className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                isActive ? 'border-[#00588b] shadow-md' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => setActiveTab(isActive ? null : tabId)}
                className={`flex items-center justify-between w-full px-4 py-4 font-semibold transition-colors ${
                  isActive 
                    ? 'bg-[#00588b] text-white' 
                    : 'bg-white text-[#00588b] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {tab?.icon && (
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-white/20' : 'bg-[#00588b]/10'
                    }`}>
                      {(() => {
                        const Icon = LucideIcons[tab.icon] || LucideIcons.SquareStack;
                        return <Icon size={18} className={isActive ? 'text-[#fec53a]' : 'text-[#00588b]'} />;
                      })()}
                    </div>
                  )}
                  <span className="text-left pr-4">{tab?.title || `Tab ${index + 1}`}</span>
                </div>
                {isActive ? (
                  <ChevronUp size={20} className="text-[#fec53a] shrink-0" />
                ) : (
                  <ChevronDown size={20} className="shrink-0" />
                )}
              </button>

              {isActive && (
                <div className="p-4 bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className={data?.useProse !== false ? "prose max-w-none" : ""}>
                    <RichTextRenderer content={tab?.content} useProse={data?.useProse !== false} />
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}