'use client';

import React, { useEffect, useRef, useState } from 'react';

const stepsData = [
  {
    num: "01",
    title: "Register & Apply Online",
    desc: "Submit application with 10+2 marksheet and PCM details.",
    date: "Opens March 2025"
  },
  {
    num: "02",
    title: "Appear for CPUEST",
    desc: "Career Point Scholastic Aptitude Test — Maths, English & Aptitude. Online and on-campus at Kota.",
    date: "March 28, 2026"
  },
  {
    num: "03",
    title: "Personal Interview",
    desc: "Faculty panel interview — tests problem-solving ability and passion for building with technology.",
    date: ""
  },
  {
    num: "04",
    title: "Counselling & Seat Confirmation",
    desc: "One-on-one counselling session. Submit documents and confirm your seat with the confirmation fee.",
    date: "Batch begins July 2026"
  }
];

export default function Admissions() {
  const timelineRef = useRef(null);
  const stepRefs = useRef([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  // Scroll effect logic for the yellow timeline progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const containerRect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Trigger timeline fill when it hits 60% from the top of the viewport
      const offset = windowHeight * 0.6; 
      let scrollPosition = offset - containerRect.top;
      let maxScroll = containerRect.height;
      
      // Ensure the progress stays within 0 and max scroll height
      let progressHeight = Math.max(0, Math.min(maxScroll, scrollPosition));
      let percentage = (progressHeight / maxScroll) * 100;
      
      setLineHeight(percentage);

      // Determine active step
      let currentStep = 1;
      stepRefs.current.forEach((stepEl, index) => {
        if (stepEl && timelineRef.current) {
          const stepRect = stepEl.getBoundingClientRect();
          // Relative top position of the step inside the container
          const relativeTop = stepRect.top - containerRect.top;
          
          // If the progress line has crossed this step's relative top
          if (progressHeight >= relativeTop - 20) { // -20 for slight visual buffer
            currentStep = index + 1;
          }
        }
      });
      
      setActiveStep(currentStep);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check on load
    setTimeout(handleScroll, 100); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white" id="admissions">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-[#123e84]">
            Admission Process
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative">
          
          {/* Left Side (Sticky Info Box) */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-32 z-10">
            <h2 className="text-3xl font-bold text-[#123e84] mb-6">How to join</h2>
            
            <div className="bg-[#123e84] rounded-2xl p-8 mb-6 shadow-xl">
              <h5 className="flex items-center text-xl font-bold text-[#ffcc00] mb-4">
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Eligibility
              </h5>
              <p className="text-white text-[15px] leading-relaxed opacity-90">
                Class 10+2 with PCM and 50%+ marks. Admission via CPUEST and personal interview. Top 20–25% of applicants are selected.
              </p>
            </div>

            <button className="bg-[#123e84] hover:bg-[#0d2966] text-white px-8 py-3.5 rounded-lg font-semibold flex items-center transition-colors shadow-md">
              Apply Now 
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Right Side (Scrolling Timeline) */}
          <div className="w-full lg:w-[60%] relative" ref={timelineRef}>
            
            {/* The vertical track & yellow progress line */}
            <div className="absolute left-[23px] top-[24px] bottom-[24px] w-[2px] bg-gray-200 z-0">
              <div 
                className="w-full bg-[#ffcc00] transition-all duration-300 ease-out" 
                style={{ height: `${lineHeight}%` }}
              ></div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-12 relative z-10">
              {stepsData.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = activeStep >= stepNumber;

                return (
                  <div 
                    key={index} 
                    className="relative pl-16 md:pl-20"
                    ref={(el) => (stepRefs.current[index] = el)}
                  >
                    
                    {/* Circle Indicator */}
                    <div className={`absolute left-0 top-0 w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all duration-500 ease-in-out ${
                      isActive 
                        ? 'bg-[#ffcc00] border-[#ffcc00] text-black shadow-[0_0_15px_rgba(255,204,0,0.4)]' 
                        : 'bg-white border-gray-200 text-gray-400'
                    }`}>
                      {step.num}
                    </div>

                    {/* Step Card Content */}
                    <div className={`bg-white p-6 md:p-8 rounded-xl border-2 transition-all duration-500 ease-in-out ${
                      isActive 
                        ? 'border-[#ffcc00] shadow-[0_10px_30px_rgba(255,204,0,0.1)] transform scale-[1.02]' 
                        : 'border-gray-100 shadow-sm opacity-70'
                    }`}>
                      <h4 className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                        isActive ? 'text-[#123e84]' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-1">
                        {step.desc}
                      </p>
                      {step.date && (
                        <label className="text-sm font-semibold text-gray-500 block mt-3">
                          {step.date}
                        </label>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}