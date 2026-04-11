'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function Hero() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <section 
      // MAIN FIX: 'overflow-hidden' ko 'overflow-x-hidden' kar diya hai
      // Aur py-12 (padding top & bottom) add kiya hai taaki content top/bottom se chipke na
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-x-hidden py-12"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #1a49a0 0%, #0d2966 50%, #071536 100%)'
      }}
    >
      
      {/* Particles Engine */}
      {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 z-0 pointer-events-none"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              color: { value: "#ffffff" },
              links: {
                color: "#ffffff",
                distance: 180,
                enable: true,
                opacity: 0.15,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: true,
                speed: 0.5,
                straight: false,
              },
              number: {
                density: { enable: true, area: 1200 },
                value: 60,
              },
              opacity: { value: 0.3 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 2.5 } },
            },
            detectRetina: true,
          }}
        />
      )}

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center justify-center">
        
        {/* Headings - Margins further compressed for smaller laptop screens */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-1 text-white leading-tight">
          AI-First
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-4 text-[#ffcc00] leading-tight">
          B.Tech in CS
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl font-normal mb-6 text-white tracking-wide max-w-3xl px-4">
          Learn AI. Build AI. Become AI-Ready.
        </p>

        {/* Stats Row - Tighter spacing */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 xl:gap-10 mb-6 w-full px-2">
          <div className="flex flex-col items-center min-w-0">
            <span className="text-[10px] sm:text-xs text-white/80 uppercase tracking-widest font-medium mb-0.5">Duration</span>
            <span className="text-sm sm:text-base md:text-lg font-bold text-white text-center break-words">4 Years</span>
          </div>
          
          <div className="w-12 h-px sm:w-px sm:h-6 lg:h-8 bg-white/30 flex-shrink-0"></div>
          
          <div className="flex flex-col items-center min-w-0">
            <span className="text-[10px] sm:text-xs text-white/80 uppercase tracking-widest font-medium mb-0.5">Degree</span>
            <span className="text-sm sm:text-base md:text-lg font-bold text-white text-center break-words">B.Tech • UGC Recognised</span>
          </div>
          
          <div className="w-12 h-px sm:w-px sm:h-6 lg:h-8 bg-white/30 flex-shrink-0"></div>
          
          <div className="flex flex-col items-center min-w-0">
            <span className="text-[10px] sm:text-xs text-white/80 uppercase tracking-widest font-medium mb-0.5">Campus</span>
            <span className="text-sm sm:text-base md:text-lg font-bold text-white text-center break-words">Kota, Rajasthan</span>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-8 flex flex-col items-center px-2 w-full">
          <p className="text-white/90 mb-2.5 text-sm sm:text-base font-normal">Specialization:</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full max-w-4xl">
            <span className="px-3 md:px-4 py-1.5 border border-[#ffcc00] rounded-full text-[11px] md:text-[12px] font-medium text-[#ffcc00] flex items-center bg-[#ffcc00]/5">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 1 1 12 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM8 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
              AI & ML
            </span>
            <span className="px-3 md:px-4 py-1.5 border border-[#ffcc00] rounded-full text-[11px] md:text-[12px] font-medium text-[#ffcc00] flex items-center bg-[#ffcc00]/5">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              Full Stack Dev. & Cloud Computing
            </span>
            <span className="px-3 md:px-4 py-1.5 border border-[#ffcc00] rounded-full text-[11px] md:text-[12px] font-medium text-[#ffcc00] flex items-center bg-[#ffcc00]/5">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
              Cyber Security & Cloud Computing
            </span>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 px-2 w-full">
          <button className="bg-[#ffcc00] hover:bg-[#e6b800] text-[#0a1936] px-6 md:px-8 py-2.5 rounded-md font-semibold text-sm md:text-base transition-colors duration-300 w-full sm:w-auto">
            Apply Now
          </button>
          <button className="bg-transparent border border-white text-white px-6 md:px-8 py-2.5 rounded-md font-semibold text-sm md:text-base hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto">
            Download Brochure
          </button>
        </div>

      </div>
    </section>
  );
}