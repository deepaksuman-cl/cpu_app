'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
// Dynamic Icon Components with Fallbacks
const CircleHelp = LucideIcons.CircleHelp || LucideIcons.HelpCircle || LucideIcons.Info || (() => null);

export default function DarkHighlights({ data }) {
  const highlights = Array.isArray(data) ? data : [];

  return (
    <section className="w-full bg-[#0c4088] px-6 sm:px-8 py-10 border-b border-[#1a1a1a]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {highlights.map((item, index) => (
          <div 
            key={item.id || index} 
            className="bg-[#ffffff17] border border-transparent rounded-xl p-[30px_24px] flex flex-col transition-all duration-300 hover:-translate-y-[3px] hover:border-[#f1bd0e] hover:shadow-[0_10px_30px_rgba(34,172,209,0.1)] cursor-pointer"
          >
            <div className="mb-[20px]">
              {(() => {
                const IconComponent = LucideIcons[item.icon] || CircleHelp || (() => null);
                return <IconComponent className="w-[1.8rem] h-[1.8rem] text-[#f1bd0e]" strokeWidth={2.5} />;
              })()}
            </div>
            
            <h4 className="text-[#f1bd0e] text-[1.2rem] font-[800] mb-[12px] leading-tight">
              {item.title}
            </h4>
            
            <p className="text-white text-[0.95rem] font-normal leading-[1.5] m-0">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
