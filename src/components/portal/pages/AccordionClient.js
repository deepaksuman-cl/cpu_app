'use client';
import RichTextRenderer from '@/components/common/RichTextRenderer';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function AccordionClient({ items, useProse = true }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div 
            key={i} 
            className={`relative bg-white rounded-xl transition-all duration-300 ease-out overflow-hidden ${
              isOpen 
                ? 'shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-[#00598c]/15' 
                : 'shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300'
            }`}
          >
            {/* Premium Left Accent Border for Active State */}
            <div 
              className={`absolute top-0 left-0 w-1.5 h-full transition-all duration-300 ${
                isOpen ? 'bg-[#00598c]' : 'bg-transparent'
              }`}
            />

            <button
              onClick={() => toggle(i)}
              className="w-full text-left px-6 py-5 flex justify-between items-center transition-colors focus:outline-none group"
              aria-expanded={isOpen}
            >
              <span className={`font-semibold text-lg md:text-xl transition-colors duration-300 pl-2 pr-4 ${
                isOpen ? 'text-[#00598c]' : 'text-gray-700 group-hover:text-[#00598c]'
              }`}>
                {item.title}
              </span>
              
              {/* Premium Icon Container with Yellow Tweak */}
              <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isOpen 
                  ? 'bg-[#00598c] text-[#FFC107] shadow-inner' 
                  : 'bg-gray-50 text-gray-400 group-hover:bg-[#00598c]/10 group-hover:text-[#00598c]'
              }`}>
                {isOpen ? <ChevronUp size={20} strokeWidth={2.5} /> : <ChevronDown size={20} />}
              </div>
            </button>
            
            {/* Smooth Grid-based Height Transition (Much better than max-h) */}
            <div 
              className={`transition-all duration-300 ease-in-out grid ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-8 pb-6 pt-1 text-gray-600">
                  <RichTextRenderer 
                    content={item.content} 
                    useProse={useProse}
                    className="max-w-none text-base leading-relaxed" 
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}