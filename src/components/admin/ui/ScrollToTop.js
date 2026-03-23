'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    
    const handleScroll = () => {
      // 1. Calculate Scroll Visibility
      const scrollTop = window.scrollY || document.documentElement.scrollTop || (mainElement?.scrollTop || 0);
      setIsVisible(scrollTop > 200);

      // 2. Calculate Scroll Progress (0 to 100)
      const scrollHeight = (mainElement?.scrollHeight || document.documentElement.scrollHeight) - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (mainElement) mainElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed z-[100] bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-75 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group relative flex items-center justify-center h-12 rounded-full bg-[var(--bg-surface)]/80 backdrop-blur-xl border border-[var(--border-light)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_var(--color-primary-light)] overflow-hidden transition-all duration-500 ease-out hover:border-[var(--color-primary)]"
        aria-label="Scroll to top"
        title="Scroll to Top"
      >
        {/* ── Live Scroll Progress Background Fill ── */}
        <div 
          className="absolute left-0 top-0 bottom-0 bg-[var(--color-primary)]/10 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* ── Hover Gradient Overlay ── */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] transition-opacity duration-500" />

        {/* ── Inner Content (Icon + Expanding Text) ── */}
        <div className="relative z-10 flex items-center justify-center px-3">
          
          {/* Bouncing Arrow */}
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--bg-body)] group-hover:bg-[var(--color-primary)] transition-colors duration-500 shadow-sm border border-[var(--border-default)] group-hover:border-[var(--color-primary-dark)]">
            <ArrowUp 
              size={14} 
              strokeWidth={3} 
              className="text-[var(--text-secondary)] group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-300" 
            />
          </div>
          
          {/* Expanding Dynamic Text */}
          <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-3 font-black text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary-dark)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            Back to Top
          </span>
        </div>

        {/* ── Subtle Outer Ring Glow on Hover ── */}
        <div className="absolute inset-0 rounded-full ring-2 ring-[var(--color-primary)] ring-offset-4 ring-offset-transparent opacity-0 scale-95 group-hover:opacity-30 group-hover:scale-100 transition-all duration-500 pointer-events-none"></div>
        
      </button>
    </div>
  );
}