"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const timelineSteps = [
  {
    id: 1,
    number: '01',
    title: 'Register & Apply Online',
    desc: 'Submit application with 10+2 marksheet and PCM details.',
    label: 'Opens March 2025',
  },
  {
    id: 2,
    number: '02',
    title: 'Appear for CPUEST',
    desc: 'Career Point Scholastic Aptitude Test — Maths, English & Aptitude. Online and on-campus at Kota.',
    label: 'March 28, 2026',
  },
  {
    id: 3,
    number: '03',
    title: 'Personal Interview',
    desc: 'Faculty panel interview — tests problem-solving ability and passion for building with technology.',
    label: '',
  },
  {
    id: 4,
    number: '04',
    title: 'Counselling & Seat Confirmation',
    desc: 'One-on-one counselling session. Submit documents and confirm your seat with the confirmation fee.',
    label: 'Batch begins July 2026',
  }
];

export default function Admissions() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    // 1. Scroll-based Line Fill Logic
    const handleScroll = () => {
      if (!containerRef.current || !lineRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the timeline has been scrolled past the center of the screen
      const startPoint = windowHeight * 0.7; // Start filling when card is at 70% of screen height
      const totalHeight = rect.height;
      const scrolled = Math.max(0, startPoint - rect.top);
      const progress = Math.min(100, (scrolled / totalHeight) * 100);
      
      lineRef.current.style.height = `${progress}%`;
    };

    // 2. Intersection Observer for Active Step Highlighting
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px', // Trigger when step is in the middle-top area
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
      
      {/* Section Header */}
      <div className="text-center mb-[60px]">
        <h2 className="text-[2.2rem] md:text-[2.8rem] font-[800] text-[#0c4088] leading-tight">
          Admission Process
        </h2>
      </div>

      {/* Main Container: 2 Columns */}
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-[50px] items-start">
        
        {/* Left Side: Info Box */}
        <div className="md:sticky md:top-[120px]">
          <h2 className="text-[2rem] font-[700] text-[#0c4088] mb-6">
            How to join
          </h2>

          {/* Dark Blue Card */}
          <div className="bg-[#0c4088] rounded-[16px] p-[25px] border border-white/10 shadow-[0_15px_40px_rgba(12,64,136,0.2)] mb-6 transition-transform duration-300 hover:-translate-y-1">
            <h5 className="flex items-center text-[#f1bd0e] font-[600] text-[1.15rem] mb-4 gap-2">
              <CheckCircle2 className="w-[1.2rem] h-[1.2rem]" strokeWidth={2.5} /> 
              Eligibility
            </h5>
            <p className="text-white text-[0.95rem] leading-[1.6]">
              Class 10+2 with PCM and 50%+ marks. Admission via CPUEST and personal interview. Top 20–25% of applicants are selected.
            </p>
          </div>

          {/* Action Button */}
          <button className="bg-[#0c4088] text-white px-[28px] py-[12px] rounded-[8px] font-[600] text-[1rem] flex items-center gap-2 hover:bg-[#0a3570] transition-colors shadow-md">
            Apply Now 
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Right Side: Timeline */}
        <div ref={containerRef} className="relative pl-[45px] mt-4 md:mt-0">
          
          {/* Vertical Track (Grey Line) */}
          <div className="absolute left-[16px] top-[20px] bottom-0 w-[2px] bg-[#e5e7eb] z-0"></div>
          
          {/* Vertical Track (Active Yellow Line - Animated) */}
          <div 
            ref={lineRef}
            className="absolute left-[16px] top-[20px] w-[2px] bg-[#f1bd0e] z-10 transition-all duration-300 ease-out"
            style={{ height: '0%' }}
          ></div>

          {/* Timeline Steps */}
          {timelineSteps.map((step, index) => {
            const isActive = index <= activeStep;
            return (
              <div 
                key={step.id} 
                ref={(el) => (stepRefs.current[index] = el)}
                className="relative pb-[40px]"
              >
                
                {/* Step Number Circle */}
                <div 
                  className={`absolute left-[-46px] top-[15px] w-[34px] h-[34px] rounded-full flex items-center justify-center font-[800] text-[0.9rem] z-20 border-[3px] border-white transition-all duration-500
                  ${isActive 
                    ? 'bg-[#f1bd0e] text-white shadow-[0_0_0_2px_#f1bd0e]' 
                    : 'bg-white text-[#888] shadow-[0_0_0_2px_#e5e7eb]'
                  }`}
                >
                  {step.number}
                </div>

                {/* Step Content Card */}
                <div 
                  className={`relative ml-[20px] p-[25px_30px] rounded-[12px] bg-white transition-all duration-500
                  ${isActive 
                    ? 'border border-[#f1bd0e] shadow-[0_8px_25px_rgba(241,189,14,0.12)]' 
                    : 'border border-transparent hover:border-[#f3f4f6]'
                  }`}
                >
                  {/* Horizontal Connecting Line (Only for Active Steps) */}
                  {isActive && (
                    <div className="absolute left-[-21px] top-[31px] w-[21px] h-[2px] bg-[#f1bd0e] z-0"></div>
                  )}

                  <h4 className={`text-[1.25rem] font-[800] mb-2 transition-colors duration-500 ${isActive ? 'text-[#0c4088]' : 'text-[#888]'}`}>
                    {step.title}
                  </h4>
                  <p className="text-[#333333] text-[0.95rem] leading-[1.6] mb-2">
                    {step.desc}
                  </p>
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