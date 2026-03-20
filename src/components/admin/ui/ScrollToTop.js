'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    
    const handleScroll = () => {
      const scrollY = Math.max(
        window.scrollY || 0,
        document.documentElement.scrollTop || 0,
        mainElement ? mainElement.scrollTop : 0
      );
      
      if (scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Bind to both window and mainElement to catch the scroll regardless of layout structure
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (mainElement) mainElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Scroll both window and mainElement to ensure we hit the top regardless of which container is actually scrolling
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed z-[100] bottom-8 left-1/2 -translate-x-1/2 p-2.5 bg-[var(--text-primary)] text-[var(--bg-surface)] hover:bg-[var(--color-primary)] transition-all duration-300 rounded-none shadow-[var(--shadow-lg)] border border-[var(--border-dark)] flex items-center gap-2 group cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
      title="Back to Top"
    >
      <ChevronUp size={20} strokeWidth={2.5} className="group-hover:-translate-y-1 transition-transform" />
      <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block pr-1">Top</span>
    </button>
  );
}
