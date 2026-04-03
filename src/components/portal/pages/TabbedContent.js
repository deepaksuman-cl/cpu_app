"use client";

import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import RichTextRenderer from '@/components/common/RichTextRenderer';

export default function TabbedContent({ data }) {
  // CMS se data aayega: data.layout (sidebar/top) aur data.tabs (array of objects)
  const layout = data?.layout || 'sidebar'; 
  const tabs = data?.tabs || [];

  const [activeTab, setActiveTab] = useState(null);

  // Default first tab ko active karne ke liye
  useEffect(() => {
    if (tabs.length > 0 && activeTab === null) {
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
        
        {/* Tab Triggers Container */}
        <div className={`transition-all duration-300 ${
          layout === 'sidebar' 
            ? 'flex flex-col w-1/3 shrink-0 gap-2 border-r border-gray-100 pr-6' 
            : 'flex flex-row flex-wrap items-center gap-2 w-full border-b border-gray-100 pb-4'
        }`}>
          {tabs.map((tab, index) => {
            const tabId = tab._id || index;
            const isActive = activeTab === tabId;
            
            return (
              <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={`group flex items-center gap-4 rounded-lg font-semibold transition-all duration-300 ${
                  layout === 'sidebar' ? 'px-5 py-4 w-full text-left' : 'px-6 py-3 w-auto'
                } ${
                  isActive
                    ? 'bg-[#00588b] text-white shadow-md ' + (layout === 'sidebar' ? 'translate-x-1' : '')
                    : 'bg-transparent text-[#00588b] hover:bg-gray-50 hover:text-[#00588b]'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  {tab.icon && (
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-white/20' : 'bg-[#00588b]/10'
                    }`}>
                      {(() => {
                        const Icon = LucideIcons[tab.icon] || LucideIcons.SquareStack;
                        return <Icon size={18} className={isActive ? 'text-[#fec53a]' : 'text-[#00588b]'} />;
                      })()}
                    </div>
                  )}
                  <span className={layout === 'top' ? 'text-sm tracking-wide' : 'text-base'}>
                    {tab.title}
                  </span>
                </div>
                
                {/* 🔥 Sleek Hover Arrow (Only for Sidebar Layout) */}
                {layout === 'sidebar' && (
                  <ArrowRight 
                    size={18} 
                    className={`transition-all duration-300 ${
                      isActive 
                        ? 'text-[#fec53a] translate-x-0 opacity-100' 
                        : 'text-[#00588b] -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                    }`} 
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Container */}
        <div className={`${layout === 'sidebar' ? 'w-2/3 flex-grow pl-2' : 'w-full pt-2'}`}>
          {tabs.map((tab, index) => {
            const tabId = tab._id || index;
            return activeTab === tabId && (
              <div key={tabId} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#fec53a]">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#00588b]">
                    {tab.title}
                  </h2>
                </div>
                {/* 🔥 Yahan tumhara RichTextRenderer render karega CMS ka data */}
                <div className="prose max-w-none">
                  <RichTextRenderer content={tab.content} useProse={true} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* --- MOBILE VIEW: Accordion --- */}
      <div className="md:hidden flex flex-col gap-3">
        {tabs.map((tab, index) => {
          const tabId = tab._id || index;
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
                  {tab.icon && (
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-white/20' : 'bg-[#00588b]/10'
                    }`}>
                      {(() => {
                        const Icon = LucideIcons[tab.icon] || LucideIcons.SquareStack;
                        return <Icon size={18} className={isActive ? 'text-[#fec53a]' : 'text-[#00588b]'} />;
                      })()}
                    </div>
                  )}
                  <span className="text-left pr-4">{tab.title}</span>
                </div>
                {isActive ? (
                  <ChevronUp size={20} className="text-[#fec53a] shrink-0" />
                ) : (
                  <ChevronDown size={20} className="shrink-0" />
                )}
              </button>

              {isActive && (
                <div className="p-4 bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <RichTextRenderer content={tab.content} useProse={true} />
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}