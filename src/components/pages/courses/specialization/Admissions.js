"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
const ArrowRight = LucideIcons.ArrowRight || LucideIcons.ChevronRight;
const CheckCircle2 = LucideIcons.CircleCheckBig || LucideIcons.CheckCircle2 || LucideIcons.CheckCircle || LucideIcons.CircleCheck;

export default function Admissions({ data }) {
  if (!data) return null;
  const { title: sectionTitle, leftSide = {}, timelineSteps = [] } = data || {};
  const eligibility = leftSide?.eligibility || {};

  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !lineRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startPoint = windowHeight * 0.7;
      const totalHeight = rect.height;
      const scrolled = Math.max(0, startPoint - rect.top);
      const progress = Math.min(100, (scrolled / totalHeight) * 100);
      lineRef.current.style.height = `${progress}%`;
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = stepRefs.current.indexOf(entry.target);
          if (index !== -1) setActiveStep(index);
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((el) => el && observer.observe(el));
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-20 px-6 sm:px-8 bg-[#fdfdfd] font-sans" id="admissions">
      <div className="text-center mb-[60px]">
        <h2 className="text-[2.2rem] md:text-[2.8rem] font-[800] text-[#0c4088] leading-tight">
          {sectionTitle}
        </h2>
      </div>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-[50px] items-start">
        <div className="md:sticky md:top-[120px]">
          <h2 className="text-[2rem] font-[700] text-[#0c4088] mb-6">
            {leftSide?.title}
          </h2>

          <div className="bg-[#0c4088] rounded-[16px] p-[25px] border border-white/10 shadow-[0_15px_40px_rgba(12,64,136,0.2)] mb-6 transition-transform duration-300 hover:-translate-y-1">
            <h5 className="flex items-center text-[#f1bd0e] font-[600] text-[1.15rem] mb-4 gap-2">
              <CheckCircle2 className="w-[1.2rem] h-[1.2rem]" strokeWidth={2.5} /> 
              {eligibility?.title}
            </h5>
            <p className="text-white text-[0.95rem] leading-[1.6]">
              {eligibility?.description}
            </p>
          </div>

          <button className="bg-[#0c4088] text-white px-[28px] py-[12px] rounded-[8px] font-[600] text-[1rem] flex items-center gap-2 hover:bg-[#0a3570] transition-colors shadow-md">
            {leftSide?.ctaText} 
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div ref={containerRef} className="relative pl-[45px] mt-4 md:mt-0">
          <div className="absolute left-[16px] top-[20px] bottom-0 w-[2px] bg-[#e5e7eb] z-0"></div>
          <div 
            ref={lineRef}
            className="absolute left-[16px] top-[20px] w-[2px] bg-[#f1bd0e] z-10 transition-all duration-300 ease-out"
            style={{ height: '0%' }}
          ></div>

          {timelineSteps.map((step, index) => {
            const isActive = index <= activeStep;
            return (
              <div key={step.id} ref={(el) => (stepRefs.current[index] = el)} className="relative pb-[40px]">
                <div className={`absolute left-[-46px] top-[15px] w-[34px] h-[34px] rounded-full flex items-center justify-center font-[800] text-[0.9rem] z-20 border-[3px] border-white transition-all duration-500 ${isActive ? 'bg-[#f1bd0e] text-white shadow-[0_0_0_2px_#f1bd0e]' : 'bg-white text-[#888] shadow-[0_0_0_2px_#e5e7eb]'}`}>
                  {step.number}
                </div>

                <div className={`relative ml-[20px] p-[25px_30px] rounded-[12px] bg-white transition-all duration-500 ${isActive ? 'border border-[#f1bd0e] shadow-[0_8px_25px_rgba(241,189,14,0.12)]' : 'border border-transparent hover:border-[#f3f4f6]'}`}>
                  {isActive && <div className="absolute left-[-21px] top-[31px] w-[21px] h-[2px] bg-[#f1bd0e] z-0"></div>}
                  <h4 className={`text-[1.25rem] font-[800] mb-2 transition-colors duration-500 ${isActive ? 'text-[#0c4088]' : 'text-[#888]'}`}>
                    {step.title}
                  </h4>
                  <p className="text-[#333333] text-[0.95rem] leading-[1.6] mb-2">{step.desc}</p>
                  {step.label && (
                    <label className={`text-[0.9rem] font-medium block mt-2 transition-colors duration-500 ${isActive ? 'text-[#3b82f6]' : 'text-slate-400'}`}>
                      {step.label}
                    </label>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
