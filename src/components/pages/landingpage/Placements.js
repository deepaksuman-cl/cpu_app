'use client';

import React from 'react';

const placementCards = [
  {
    title: "Semester Assessments",
    desc: "Regular evaluations every semester to track your technical growth.",
    icon: (
      <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    accent: "from-yellow-400/10 to-transparent",
    border: "group-hover:border-yellow-400"
  },
  {
    title: "Coding Profiles",
    desc: "Monitoring LeetCode & Codeforces profiles for consistent practice.",
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    accent: "from-blue-400/10 to-transparent",
    border: "group-hover:border-blue-400"
  },
  {
    title: "GitHub Tracking",
    desc: "Building a solid recruiter-ready technical profile on GitHub.",
    icon: (
      <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
    accent: "from-orange-400/10 to-transparent",
    border: "group-hover:border-orange-400"
  },
  {
    title: "MAANG Ready",
    desc: "DSA bootcamps, mock interviews, and resume workshops.",
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    accent: "from-green-400/10 to-transparent",
    border: "group-hover:border-green-400"
  }
];

const recruiters = [
  { src: "https://cdn.simpleicons.org/microsoft" },
  { src: "https://cdn.simpleicons.org/google" },
  { src: "https://cdn.simpleicons.org/amazon" },
  { src: "https://cdn.simpleicons.org/meta" },
  { src: "https://cdn.simpleicons.org/tata" },
  { src: "https://cdn.simpleicons.org/infosys" },
  { src: "https://cdn.simpleicons.org/accenture" },
  { src: "https://cdn.simpleicons.org/adobe" },
  { src: "https://cdn.simpleicons.org/wipro" },
  { src: "https://cdn.simpleicons.org/hcl" },
  { src: "https://cdn.simpleicons.org/capgemini" },
  { src: "https://cdn.simpleicons.org/oracle" },
  { src: "https://cdn.simpleicons.org/ibm" },
  { src: "https://cdn.simpleicons.org/deloitte" },
  { src: "https://cdn.simpleicons.org/pwc" },
  { src: "https://cdn.simpleicons.org/kpmg" },
  { src: "https://cdn.simpleicons.org/paypal" },
  { src: "https://cdn.simpleicons.org/flipkart" },
  { src: "https://cdn.simpleicons.org/zoho" },
  { src: "https://cdn.simpleicons.org/byjus" }
];
export default function Placements() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-[#0f347c] mb-4">
            Placement <span className="text-blue-600 font-extrabold">Ecosystem</span>
          </h2>
          <p className="text-gray-500 font-medium">
            Your career journey starts from <span className="text-blue-600 font-bold">Day 1</span>.
          </p>
        </div>

        {/* Cards Grid - Smarter & Cleaner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {placementCards.map((card, index) => (
            <div 
              key={index} 
              className={`group relative p-6 bg-slate-50 border border-slate-200 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl ${card.border}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              <div className="relative z-10">
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-lg font-bold text-[#0f347c] mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-snug">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Marquee */}
      <div className="relative group mt-16">

  <div className="text-center mb-6">
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
      Our Students Work At
    </span>
  </div>

  <div className="relative overflow-hidden">
    
    {/* Fade effect */}
    <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
    <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10"></div>

    {/* Row 1 (Left → Right) */}
    <div className="flex gap-10 py-4 animate-marquee-left group-hover:pause">
      {[...recruiters, ...recruiters].map((logo, i) => (
        <img
          key={i}
          src={logo.src}
          alt="company"
          className="h-10 md:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
        />
      ))}
    </div>

    {/* Row 2 (Right → Left) */}
    <div className="flex gap-10 py-4 animate-marquee-right group-hover:pause">
      {[...recruiters, ...recruiters].map((logo, i) => (
        <img
          key={i}
          src={logo.src}
          alt="company"
          className="h-10 md:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
        />
      ))}
    </div>

  </div>
</div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
       @keyframes marqueeLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marqueeRight {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.animate-marquee-left {
  animation: marqueeLeft 40s linear infinite;
}

.animate-marquee-right {
  animation: marqueeRight 40s linear infinite;
}

.group:hover .pause {
  animation-play-state: paused;
}
      `}} />
    </section>
  );
}