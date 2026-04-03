'use client';

import { Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function BlocksPopover({ blocks }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const updatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Position it below the button
      setTooltipPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  return (
    <div 
      className="relative inline-block" 
      ref={containerRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="cursor-help flex items-center gap-2 bg-[var(--bg-surface)] hover:bg-[var(--bg-muted)] border border-[var(--border-default)] hover:border-[#1c54a3] text-[var(--text-primary)] text-[10px] font-bold px-3 py-1.5 transition-all shadow-sm rounded-full border-slate-300">
        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
        {blocks?.length || 0} {blocks?.length === 1 ? 'Block' : 'Blocks'}
      </div>

      {isOpen && blocks && blocks.length > 0 && (
        <div 
          className="fixed z-[99999] w-[420px] p-0 bg-white shadow-2xl border border-[var(--border-default)] ring-1 ring-black/5 overflow-hidden pointer-events-none origin-top animate-in zoom-in-95 fade-in duration-200 rounded-none mt-2"
          style={{ 
            top: `${tooltipPos.top + 10 - window.scrollY}px`, 
            left: `${tooltipPos.left - window.scrollX}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="bg-[var(--bg-muted)] px-4 py-3 border-b border-[var(--border-default)] flex items-center justify-between">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1c54a3]">Structural Architecture</div>
            <div className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest bg-white px-2 py-0.5 border border-[var(--border-default)] shadow-sm">{blocks.length} Units</div>
          </div>
          <div className="p-3 grid grid-cols-2 gap-2 max-h-96 overflow-y-auto custom-scrollbar bg-slate-50/50">
            {blocks.map((block, idx) => {
              let blockIconColor = 'bg-blue-50 text-blue-600 border-blue-100';
              if (block.blockType.toLowerCase().includes('hero')) blockIconColor = 'bg-emerald-50 text-emerald-600 border-emerald-100';
              if (block.blockType.toLowerCase().includes('grid')) blockIconColor = 'bg-amber-50 text-amber-600 border-amber-100';
              if (block.blockType.toLowerCase().includes('footer') || block.blockType.toLowerCase().includes('cta') || block.blockType.toLowerCase().includes('banner')) blockIconColor = 'bg-rose-50 text-rose-600 border-rose-100';
              
              return (
                <div key={idx} className="flex items-center gap-2.5 p-2 bg-white border border-[var(--border-light)] hover:border-[#1c54a3] transition-all group shadow-[2px_2px_0px_rgba(0,0,0,0.02)]">
                  <div className={`w-6 h-6 flex items-center justify-center text-[10px] font-black border ${blockIconColor} shrink-0`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[10px] text-[var(--text-primary)] uppercase tracking-tight truncate group-hover:text-[#1c54a3] duration-150">{block.blockType}</div>
                    {block.cssId && (
                      <div className="flex items-center gap-1 mt-0.5 opacity-50">
                         <div className="text-[8px] text-[var(--text-muted)] font-mono truncate tracking-tighter">#{block.cssId}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Triangle Arrow */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-b-white drop-shadow-sm"></div>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[7px] border-transparent border-b-[var(--border-default)] -z-10"></div>
        </div>
      )}
    </div>
  );
}
