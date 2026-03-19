'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function AccordionClient({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border border-gray-300 bg-white rounded-none shadow-sm overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggle(i)}
              className="w-full text-left px-6 py-4 flex justify-between items-center transition-colors focus:outline-none hover:bg-gray-50 group"
              aria-expanded={isOpen}
            >
              <span className={`font-bold text-lg md:text-xl transition-colors ${isOpen ? 'text-[#00588b]' : 'text-gray-800'}`}>
                {item.title}
              </span>
              <div className={`p-1 rounded-sm transition-colors ${isOpen ? 'bg-[#ffb900] text-[#7a5800]' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
              <div className="px-6 py-5 border-t border-gray-200 bg-white">
                <div 
                  className="university-prose max-w-none text-base"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
