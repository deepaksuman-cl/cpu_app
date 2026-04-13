'use client';

import React from 'react';
import { Star, PhoneCall } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-[60px] md:py-[80px] px-[20px] md:px-[32px] bg-[#fdfdfd] font-sans w-full flex justify-center">
      {/* Wrapper */}
      <div className="w-full max-w-[1220px] bg-[#0c4088] rounded-[16px] flex flex-col md:flex-row relative overflow-hidden text-white shadow-[0_15px_40px_rgba(6,64,168,0.15)]">
        
        {/* Left Content Side - Reduced vertical padding to match screenshot */}
        <div className="flex-[1.2] p-[35px_25px] md:p-[45px_50px] relative z-10 order-2 md:order-1 flex flex-col justify-center">
          
          <h2 className="text-[1.8rem] md:text-[2rem] font-[800] text-white mb-[10px] leading-[1.2] tracking-tight">
            Plan your next step with confidence
          </h2>
          
          <p className="text-[1rem] md:text-[1.05rem] font-[400] mb-[20px] text-[#e0e7ff]">
            Connect with our Admission Counsellor to:
          </p>
          
          {/* Bullet Points - Tightened gaps */}
          <ul className="list-none p-0 mb-[35px] flex flex-col gap-[10px]">
            <li className="flex items-center gap-[10px] text-[0.95rem] md:text-[1rem] font-[300]">
              <Star className="w-[1rem] h-[1rem] text-white shrink-0" strokeWidth={2.5} />
              <span>Understand the <strong className="font-[700] ml-1">admission process</strong> step by step</span>
            </li>
            <li className="flex items-center gap-[10px] text-[0.95rem] md:text-[1rem] font-[300]">
              <Star className="w-[1rem] h-[1rem] text-white shrink-0" strokeWidth={2.5} />
              <span>Explore <strong className="font-[700] ml-1">scholarships — up to 100% tuition waiver</strong></span>
            </li>
            <li className="flex items-center gap-[10px] text-[0.95rem] md:text-[1rem] font-[300]">
              <Star className="w-[1rem] h-[1rem] text-white shrink-0" strokeWidth={2.5} />
              <span>Discover if CPU is the <strong className="font-[700] ml-1">right fit for your goals</strong></span>
            </li>
            <li className="flex items-center gap-[10px] text-[0.95rem] md:text-[1rem] font-[300]">
              <Star className="w-[1rem] h-[1rem] text-white shrink-0" strokeWidth={2.5} />
              <span>Learn about <strong className="font-[700] ml-1">AI-First B.Tech</strong> curriculum & career outcomes</span>
            </li>
          </ul>

          {/* Action Button - Compact padding */}
          <button className="bg-white text-[#0640a8] font-[800] px-[24px] py-[12px] rounded-[6px] inline-flex items-center justify-center gap-[8px] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_15px_rgba(0,0,0,0.15)] text-[0.9rem] w-fit">
            <PhoneCall className="w-[1rem] h-[1rem]" strokeWidth={3} />
            REQUEST CALLBACK
          </button>

        </div>

        {/* Right Visual Side */}
        <div className="w-full md:w-[45%] h-[260px] md:h-auto relative z-[2] flex items-end justify-center md:justify-end order-1 md:order-2 pt-[20px] md:pt-0">
          
          {/* Yellow Swirl Background Shape - Exact CSS representation */}
          <div className="absolute top-[-10%] right-0 w-[100%] md:w-[102%] h-[120%] bg-[#f1bd0e] rounded-t-[50%] md:rounded-t-none md:rounded-l-[50%] z-[1] transform scale-110 overflow-hidden">
             {/* Decorative subtle curve */}
             <div className="absolute inset-0 opacity-[0.15]" style={{ background: 'radial-gradient(circle at 80% 50%, #e6a800 0%, transparent 70%)' }}></div>
          </div>
          
          {/* Counsellor Image - Reduced max-height to strictly control banner height */}
          <img 
            src="https://cpur.in/lp/b-tech/assets/img/cta.avif" 
            alt="Admission Counsellor" 
            className="relative z-[2] object-cover h-full md:h-auto md:max-h-[380px] transform translate-x-0 md:translate-x-[3%] top-[10px] md:top-auto md:mb-[-11px]"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://cpur.in/lp/b-tech/assets/img/cta.png"; 
            }}
          />

        </div>

      </div>
    </section>
  );
}