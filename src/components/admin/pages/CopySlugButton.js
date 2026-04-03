'use client';

import { Copy, MousePointer2 } from 'lucide-react';
import { useState } from 'react';

export default function CopySlugButton({ slug, fullUrl = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const textToCopy = fullUrl 
      ? `${window.location.origin}/${slug.replace(/^\/+/, '')}`
      : slug.replace(/^\/+/, '');
      
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-[9px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-[0.15em] transition-all group"
    >
      {copied ? (
        <span className="text-emerald-600 flex items-center gap-1 animate-in fade-in duration-300">
           <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
           Success
        </span>
      ) : (
        <>
          <MousePointer2 size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          Copy {fullUrl ? 'Public URL' : 'Slug'}
        </>
      )}
    </button>
  );
}
