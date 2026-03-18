// File: src/components/ui/Breadcrumb.js
import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function Breadcrumb({ paths }) {
  // Agar data pass nahi hua, toh kuch render mat karo
  if (!paths || paths.length === 0) return null;

  return (
    <div className="bg-slate-50 border-b border-slate-200 w-full">
      <div className="max-w-7xl mx-auto px-4 lg:px-16 py-2.5 flex items-center gap-2 flex-wrap text-[13px] md:text-sm">
        {paths.map((item, index) => {
          const isLast = index === paths.length - 1;
          
          return (
            <React.Fragment key={index}>
              {isLast ? (
                // Last item is plain text (not a link) because we are already on this page
                <span className="flex items-center gap-1.5 font-bold text-slate-800">
                  {index === 0 && <Home className="w-3.5 h-3.5" />}
                  {typeof item.label === 'object' ? item.label.main : item.label}
                </span>
              ) : (
                // Previous items are clickable links
                <Link 
                  href={item.link} 
                  className="flex items-center gap-1.5 font-medium no-underline hover:text-blue-800 text-[#00588b] transition-colors"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5" />}
                  {typeof item.label === 'object' ? item.label.main : item.label}
                </Link>
              )}
              
              {/* Divider Chevron (except for the last item) */}
              {!isLast && <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}