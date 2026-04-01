'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility when scrolling
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top with a smooth effect
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <button
        type="button"
        onClick={scrollToTop}
        className={`
          group relative flex h-11 w-11 items-center justify-center 
          rounded-xl bg-white text-[#1c54a3] shadow-lg transition-all duration-300 
          hover:scale-110 hover:-translate-y-1 active:scale-95 cursor-pointer
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}
        `}
        aria-label="Scroll to top"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-[#1c54a3] to-[#3d73c0] opacity-0 transition-opacity duration-300 group-hover:opacity-100 overflow-hidden">
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
        </div>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 -z-20 rounded-xl bg-[#1c54a3]/20 blur-xl transition-all duration-300 group-hover:bg-[#1c54a3]/40 group-hover:blur-2xl"></div>

        <ChevronUp 
          className="h-6 w-6 transition-colors duration-300 group-hover:text-white" 
          strokeWidth={2.5}
        />
        
        {/* Micro-sparkle effect */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1c54a3] opacity-75 group-hover:bg-blue-400"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1c54a3] group-hover:bg-blue-400"></span>
        </span>
      </button>
    </div>
  );
}
