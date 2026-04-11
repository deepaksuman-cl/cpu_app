"use client";

import React, { useState, useEffect, useRef } from "react";

const CURRICULUM_DATA = [
  {
    id: 1,
    title: "AI Foundations",
    subtitle:
      "Building future AI experts from first principles. Exploring the math, code, and thinking behind an AI-first world.",
    colorTheme: "blue",
    stats: [
      { value: "1*", label: "Paid Internship", border: "border-yellow-400", text: "text-yellow-400", bg: "bg-yellow-400/10" },
      { value: "1", label: "Externship", border: "border-blue-400", text: "text-blue-400", bg: "bg-blue-400/10" },
      { value: "8", label: "Projects", border: "border-cyan-400", text: "text-cyan-400", bg: "bg-cyan-400/10" },
    ],
    semesters: [
      {
        num: 1,
        badges: [{ text: "Semester 1", bg: "bg-blue-900/60", textCol: "text-blue-300" }],
        subjects: [
          { name: "Mathematical Thinking for AI & Computer Science", dot: "bg-blue-400" },
          { name: "Programming Foundations for AI Builders | Python", dot: "bg-cyan-400" },
          { name: "Internet, Cloud & DevOps Foundations for AI Products", dot: "bg-yellow-400" },
          { name: "Linear Algebra for AI", dot: "bg-blue-400" },
          { name: "Product Thinking for AI Startups I: Design Thinking", dot: "bg-yellow-400" },
        ],
      },
      {
        num: 2,
        badges: [
          { text: "Semester 2", bg: "bg-cyan-900/60", textCol: "text-cyan-300" },
          { text: "+Externship", bg: "bg-yellow-900/40", textCol: "text-yellow-400" },
        ],
        subjects: [
          { name: "Components of a Full Stack AI Product", dot: "bg-yellow-400" },
          { name: "Data Structures & Algorithms in Competitive Mode", dot: "bg-cyan-400" },
          { name: "Probability, Stats & Calculus for AI", dot: "bg-blue-400" },
          { name: "OOPS & Clean Coding", dot: "bg-cyan-400" },
          { name: "C Programming for Systems Engineering", dot: "bg-cyan-400" },
          { name: "Mini-MBA 2 | Product, Market & GTM", dot: "bg-yellow-400" },
          { name: "Externship 1", dot: "bg-blue-400" },
        ],
      },
    ],
    categories: ["AI Engineering", "AI Core", "Industry Experience", "Mini-MBA", "CS Fundamentals", "Mathematics"],
    outcomes: [
      { title: "Python mini projects", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-1/python-mini-project.png" },
      { title: "Personal static website", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-1/personal-static-website.png" },
      { title: "ML project with EDA & baseline models", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-1/ml-project-with-eda-and-baseline-models.png" },
      { title: "Product go-to-market brief", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-1/product%20go-to-market%20brief.png" },
      { title: "GitHub profile with structured commits", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-1/github-profile.png" },
      { title: "OOP-based software application", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-1/OOP-based%20software.png" },
      { title: "React-based AI product frontend", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-1/React.png" },
    ],
  },
  {
    id: 2,
    title: "Building AI Products",
    subtitle: "Turn ideas into real AI-powered products. Learn to build what the AI industry actually ships.",
    colorTheme: "cyan",
    stats: [
      { value: "1*", label: "Paid Internship", border: "border-yellow-400", text: "text-yellow-400", bg: "bg-yellow-400/10" },
      { value: "2", label: "Externship", border: "border-blue-400", text: "text-blue-400", bg: "bg-blue-400/10" },
      { value: "8", label: "Projects", border: "border-cyan-400", text: "text-cyan-400", bg: "bg-cyan-400/10" },
    ],
    semesters: [
      {
        num: 3,
        badges: [
          { text: "Semester 3", bg: "bg-blue-900/60", textCol: "text-blue-300" },
          { text: "+Externship", bg: "bg-yellow-900/40", textCol: "text-yellow-400" },
        ],
        subjects: [
          { name: "Operating Systems: AI & HPC Perspective", dot: "bg-yellow-400" },
          { name: "Storage, Indexing & DB Transactions for AI", dot: "bg-cyan-400" },
          { name: "Classical Machine Learning", dot: "bg-blue-400" },
          { name: "DSA – Advanced", dot: "bg-cyan-400" },
          { name: "Mini-MBA 3 | Finance & Unit Economics", dot: "bg-yellow-400" },
          { name: "Externship 2", dot: "bg-blue-500" },
        ],
      },
      {
        num: 4,
        badges: [
          { text: "Semester 4", bg: "bg-cyan-900/60", textCol: "text-cyan-300" },
          { text: "+Externship", bg: "bg-yellow-900/40", textCol: "text-yellow-400" },
        ],
        subjects: [
          { name: "Computer Networks: Communication Across Scalable AI", dot: "bg-cyan-400" },
          { name: "AI Engineering: LLM-Based Systems", dot: "bg-yellow-400" },
          { name: "Building Scalable AI Products: Full Stack Design", dot: "bg-blue-400" },
          { name: "Systems Programming for Low Latency Systems", dot: "bg-yellow-400" },
          { name: "Product Management for AI I: Zero-to-One", dot: "bg-yellow-400" },
          { name: "Externship 3", dot: "bg-blue-500" },
        ],
      },
    ],
    categories: ["AI Engineering", "AI Core", "Industry Experience", "Mini-MBA", "CS Fundamentals", "Mathematics"],
    outcomes: [
      { title: "Backend service with REST APIs", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-2/backend-services.png" },
      { title: "Database-driven application", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-2/database.png" },
      { title: "Vector search prototype", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-2/vecotr-search.png" },
      { title: "Advanced ML project", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-2/advanced-ml-projects.png" },
      { title: "Data pipeline & ETL project", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-2/data-pipeline.png" },
      { title: "RAG system", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-2/rag-system.png" },
      { title: "Deep learning model training", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-2/deep-learning.png" },
    ],
  },
  {
    id: 3,
    title: "Scaling AI Systems",
    subtitle: "Designing robust AI systems for millions of users and massive data.",
    colorTheme: "yellow",
    stats: [
      { value: "1", label: "Paid Internship", border: "border-yellow-400", text: "text-yellow-400", bg: "bg-yellow-400/10" },
      { value: "1", label: "Externship", border: "border-blue-400", text: "text-blue-400", bg: "bg-blue-400/10" },
      { value: "6", label: "Projects", border: "border-cyan-400", text: "text-cyan-400", bg: "bg-cyan-400/10" },
    ],
    semesters: [
      {
        num: 5,
        badges: [
          { text: "Semester 5", bg: "bg-yellow-900/40", textCol: "text-yellow-400" },
          { text: "+Internship", bg: "bg-blue-900/60", textCol: "text-blue-300" },
        ],
        isSpecial: true,
        specialTitle: "Industry Internship / Research Project",
        specialDesc: "Full semester dedicated to real-world experience at partner companies or research institutions.",
      },
      {
        num: 6,
        badges: [
          { text: "Semester 6", bg: "bg-cyan-900/60", textCol: "text-cyan-300" },
          { text: "+Externship", bg: "bg-yellow-900/40", textCol: "text-yellow-400" },
        ],
        subjects: [
          { name: "Machine Learning Engineering", dot: "bg-blue-400" },
          { name: "Data Engineering for Robust AI Systems", dot: "bg-cyan-400" },
          { name: "Deep Learning Systems", dot: "bg-blue-400" },
          { name: "Product Management for AI II: Metrics", dot: "bg-yellow-400" },
          { name: "Mini-MBA 4: Operations & Org-Design", dot: "bg-yellow-400" },
          { name: "Externship 4", dot: "bg-blue-500" },
        ],
      },
    ],
    categories: ["AI Engineering", "AI Core", "Industry Experience", "Mini-MBA", "CS Fundamentals", "Mathematics"],
    outcomes: [
      { title: "Distributed systems", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-3/distributed-systems.png" },
      { title: "System design case studies", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-3/system-design.png" },
      { title: "CI/CD pipeline for ML system", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-3/ci-cd-pipeline.png" },
      { title: "GenAI application (LLM / RAG)", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-3/gen-ai-application.png" },
      { title: "Technical design documents", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-3/technical-design.png" },
      { title: "Architecture documents", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-3/architecture-documents.png" },
    ],
  },
  {
    id: 4,
    title: "Autonomous AI & Future Systems",
    subtitle: "From intelligence to autonomy. Where AI learns to think, act, and adapt.",
    colorTheme: "blue",
    stats: [
      { value: "1", label: "Paid Internship", border: "border-yellow-400", text: "text-yellow-400", bg: "bg-yellow-400/10" },
      { value: "1", label: "Capstone", border: "border-blue-400", text: "text-blue-400", bg: "bg-blue-400/10" },
      { value: "4", label: "Projects", border: "border-cyan-400", text: "text-cyan-400", bg: "bg-cyan-400/10" },
    ],
    semesters: [
      {
        num: 7,
        badges: [
          { text: "Semester 7", bg: "bg-blue-900/60", textCol: "text-blue-300" },
          { text: "Capstone", bg: "bg-yellow-900/40", textCol: "text-yellow-400" },
        ],
        subjects: [
          { name: "Computer Architecture for AI & Robotics", dot: "bg-blue-400" },
          { name: "Building an LLM from Scratch", dot: "bg-yellow-400" },
          { name: "Mini-MBA 5: AI Law, Ethics, Venture Deals", dot: "bg-cyan-400" },
          { name: "Elective E1: RL & Agents OR Robotics Engineering", dot: "bg-blue-400" },
        ],
      },
      {
        num: 8,
        badges: [
          { text: "Semester 8", bg: "bg-cyan-900/60", textCol: "text-cyan-300" },
          { text: "Capstone", bg: "bg-yellow-900/40", textCol: "text-yellow-400" },
          { text: "+Internship", bg: "bg-blue-900/60", textCol: "text-blue-300" },
        ],
        subjects: [
          { name: "Elective E2: Advanced Gen AI OR Optimization", dot: "bg-yellow-400" },
          { name: "Self-Driven Capstone | AI Product Build & Demo", dot: "bg-cyan-400" },
        ],
      },
    ],
    categories: ["AI Engineering", "AI Core", "Industry Experience", "Mini-MBA", "CS Fundamentals", "Mathematics"],
    outcomes: [
      { title: "AI capstone project", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-4/ai-capstone.png" },
      { title: "Applied RL agent project", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-4/applied-rl-agent.png" },
      { title: "Robotics or CUDA project", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-4/robotics-or-cuda.png" },
      { title: "Entrepreneurship Project", img: "https://d2q3690hqmnct4.cloudfront.net/images/curriculum-outcomes/year-4/entrepreneurship.png" },
    ],
  },
];

const THEMES = {
  blue: { bg: "bg-blue-600", text: "text-blue-400", border: "border-blue-700", cardGrad: "from-[#071328] to-[#040A15]", outcomeBorder: "border-blue-900/50" },
  cyan: { bg: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-700", cardGrad: "from-[#051A26] to-[#040A15]", outcomeBorder: "border-cyan-900/50" },
  yellow: { bg: "bg-yellow-500", text: "text-yellow-800", border: "border-yellow-600", cardGrad: "from-[#2A2208] to-[#040A15]", outcomeBorder: "border-yellow-900/40" },
};

export default function Curriculum() {
  const [activeYear, setActiveYear] = useState(1);
  const [cardTransforms, setCardTransforms] = useState(
    CURRICULUM_DATA.map(() => ({ scale: 1, opacity: 1 }))
  );
  
  const anchorRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = 1;

      const newTransforms = CURRICULUM_DATA.map((_, i) => {
        const anchor = anchorRefs.current[i];
        const card = cardRefs.current[i];
        const nextAnchor = anchorRefs.current[i + 1];
        
        if (anchor) {
          const rect = anchor.getBoundingClientRect();
          if (rect.top <= 200) currentActive = i + 1;
        }

        let scale = 1;
        let opacity = 1;

        if (nextAnchor && card) {
          const nextRect = nextAnchor.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const stickyTopPoint = 120;
          
          if (nextRect.top < windowHeight && nextRect.top > stickyTopPoint) {
             const scrollDistance = windowHeight - stickyTopPoint;
             const nextCardProgress = (windowHeight - nextRect.top) / scrollDistance;
             
             scale = 1 - (nextCardProgress * 0.045);
             opacity = 1 - (nextCardProgress * 1.8);
             if (opacity < 0) opacity = 0;
             if (opacity > 1) opacity = 1;
          } else if (nextRect.top <= stickyTopPoint) {
             scale = 0.955;
             opacity = 0;
          }
        }
        return { scale, opacity };
      });

      setCardTransforms(newTransforms);
      setActiveYear(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToYear = (index) => {
    const anchor = anchorRefs.current[index];
    if (anchor) {
      const top = anchor.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-[#020617] px-4 py-10 sm:p-15 md:p-20 font-sans text-slate-100">
      <div className="relative max-w-7xl mx-auto flex flex-col gap-10">
        
        <div className="items-center flex flex-col gap-2 text-center z-20">
          <p className="tracking-widest text-blue-400 uppercase font-bold text-xs md:text-sm">
            4-Year Journey
          </p>
          <h2 className="tracking-wider text-slate-50 text-3xl md:text-5xl font-extrabold leading-tight">
            The Curriculum
          </h2>
          <p className="text-slate-400 max-w-3xl text-sm md:text-base mt-2">
            8 semesters of hands-on learning. Designed by AI researchers. Updated annually.
          </p>
        </div>

        <div className="md:hidden sticky top-16 z-40 bg-[#020617]/90 backdrop-blur-md py-3 -mx-4 px-4 border-b border-slate-800">
          <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {CURRICULUM_DATA.map((year, i) => (
              <button
                key={year.id}
                onClick={() => scrollToYear(i)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeYear === year.id
                    ? `bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]` 
                    : "text-slate-400 bg-slate-800/50 hover:bg-slate-700/80"
                }`}
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] bg-white/20 text-white">
                  {year.id}
                </span>
                {year.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-12 xl:gap-16 relative">
          
          <div className="hidden md:block w-48 xl:w-64 shrink-0">
            <div className="sticky top-32 pt-8 z-20">
              <nav className="flex flex-col gap-8 relative border-l border-slate-800 ml-3 pl-6">
                {CURRICULUM_DATA.map((year, i) => {
                  const isActive = activeYear === year.id;
                  return (
                    <button
                      key={year.id}
                      onClick={() => scrollToYear(i)}
                      className="text-left group outline-none relative"
                    >
                      <span className={`absolute -left-[30px] top-2 w-3 h-3 rounded-full border-2 border-[#020617] transition-all duration-500 ${isActive ? 'bg-yellow-400 scale-125 shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 'bg-slate-700'}`}></span>
                      
                      <span
                        className={`block transition-all duration-500 group-hover:opacity-100 font-bold ${
                          isActive
                            ? `text-2xl text-slate-100 translate-x-2` 
                            : "text-lg text-slate-500 translate-x-0"
                        }`}
                      >
                        <span className={`block text-xs uppercase tracking-widest mb-1 ${isActive ? 'text-blue-400' : 'text-slate-600'}`}>Year {year.id}</span>
                        {year.title}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="flex-1 min-w-0 pb-[20vh] relative">
            
            {/* Invisible Absolute Anchors Overlay (for stable navigation targeting) */}
            <div className="absolute inset-0 pointer-events-none">
              {CURRICULUM_DATA.map((_, i) => (
                <div 
                  key={`anchor-${i}`}
                  ref={el => anchorRefs.current[i] = el}
                  className="h-screen w-full"
                />
              ))}
            </div>

            {/* Direct Siblings Stacking Cards Area (Restores the "behtrin" animation) */}
            {CURRICULUM_DATA.map((year, index) => {
              const theme = THEMES[year.colorTheme];
              const transformState = cardTransforms[index];

              return (
                <div 
                  key={year.id}
                  ref={el => cardRefs.current[index] = el}
                  className="h-screen sticky flex items-start w-full"
                  style={{
                    top: `calc(5.5rem + ${index * 12}px)`,
                    zIndex: index + 10,
                  }}
                >
                  <div
                     className="relative w-full pt-2"
                     style={{
                        transformOrigin: "top center",
                        transform: `scale(${transformState.scale})`,
                        transition: "transform 0.1s linear"
                     }}
                  >
                    <div className={`tracking-wide flex flex-col rounded-2xl md:rounded-[36px] p-4 md:p-6 lg:p-8 gap-4 bg-gradient-to-br border ${theme.cardGrad} ${theme.border} shadow-2xl shadow-black`}>
                      
                      <div className="flex flex-col xl:flex-row xl:justify-between gap-5 xl:gap-0 shrink-0">
                        <div className="flex flex-col flex-1 gap-2 md:gap-3 pr-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-slate-900 text-lg md:text-2xl font-black shadow-lg ${theme.bg}`}>
                              {year.id}
                            </div>
                            <h3 className="text-slate-100 tracking-wider text-2xl md:text-3xl lg:text-[36px] font-bold leading-tight">
                              {year.title}
                            </h3>
                          </div>
                          <p className="text-slate-300/80 text-sm md:text-base leading-relaxed max-w-2xl">
                            {year.subtitle}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 md:gap-3 shrink-0 self-start">
                          {year.stats.map((stat, i) => (
                            <div
                              key={i}
                              className={`px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl border flex flex-col gap-0 items-center justify-center ${stat.border} ${stat.bg}`}
                            >
                              <div className={`${stat.text} font-bold text-lg md:text-[22px] leading-none`}>
                                {stat.value}
                              </div>
                              <div className={`${stat.text} text-[9px] md:text-xs text-center font-medium uppercase tracking-widest mt-1`}>
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row gap-4 mt-2 shrink-0">
                        {year.semesters.map((sem, i) => (
                          <div
                            key={i}
                            className="flex-1 flex flex-col gap-3 p-4 md:p-5 rounded-2xl bg-black/40 border border-slate-800 hover:border-slate-600 transition-colors"
                          >
                            <div className="flex gap-2 items-center flex-wrap">
                              {sem.badges.map((badge, bIndex) => (
                                <span
                                  key={bIndex}
                                  className={`px-3 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-semibold tracking-wide whitespace-nowrap border border-white/5 ${badge.bg} ${badge.textCol}`}
                                >
                                  {badge.text}
                                </span>
                              ))}
                            </div>

                            {sem.isSpecial ? (
                              <div className="flex mt-4 flex-col justify-center items-center gap-3 py-6">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                </div>
                                <p className="text-center leading-5 text-slate-100 font-bold text-base md:text-lg">
                                  {sem.specialTitle}
                                </p>
                                <p className="text-center font-medium text-slate-400 text-xs md:text-sm leading-relaxed px-4">
                                  {sem.specialDesc}
                                </p>
                              </div>
                            ) : (
                              <ul className="flex flex-col gap-2 md:gap-2.5 mt-1">
                                {sem.subjects.map((sub, sIndex) => (
                                  <li key={sIndex} className="flex items-start gap-2.5 group">
                                    <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_currentColor] transition-all group-hover:scale-150 ${sub.dot}`}></span>
                                    <span className="text-slate-300 text-xs md:text-sm leading-snug group-hover:text-white transition-colors">
                                      {sub.name}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="w-full flex mt-2 rounded-xl bg-black/30 gap-4 md:gap-6 py-3 px-4 md:px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shrink-0 border border-white/5 shadow-inner">
                        {year.categories.map((cat, i) => {
                           const dotColors = ["bg-yellow-400", "bg-blue-400", "bg-cyan-400"];
                           return (
                             <span key={i} className="rounded-full text-xs font-semibold tracking-wide inline-flex items-center text-slate-400 whitespace-nowrap shrink-0">
                               <span className={`w-1.5 h-1.5 rounded-full inline-block mr-2 ${dotColors[i % dotColors.length]}`}></span>
                               {cat}
                             </span>
                           );
                        })}
                      </div>
                    </div>
                  </div>

                  <div 
                     className="absolute bottom-16 md:bottom-24 left-0 right-0 pointer-events-auto"
                     style={{
                        opacity: transformState.opacity,
                        transition: "opacity 0.1s linear",
                        pointerEvents: transformState.opacity === 0 ? "none" : "auto"
                     }}
                  >
                    <div className={`flex flex-col gap-2 md:gap-3 rounded-2xl md:rounded-[32px] px-4 py-4 md:px-6 md:py-5 border bg-slate-900/90 backdrop-blur-md shadow-[0_-10px_40px_rgba(0,0,0,0.5)] ${theme.outcomeBorder}`}>
                      <h3 className="text-slate-200 text-xs md:text-[13px] font-bold tracking-widest uppercase">
                        Year {year.id} Outcomes
                      </h3>
                      
                      <div className="w-full overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="flex gap-4 md:gap-6 justify-start pb-1">
                          {year.outcomes.map((outcome, i) => (
                            <div
                              key={i}
                              className="w-fit shrink-0 rounded-2xl flex flex-col gap-2 md:gap-3 transition-transform hover:-translate-y-1 hover:scale-105 cursor-pointer duration-300 group"
                            >
                              <div className="relative w-28 h-20 md:w-36 md:h-24 rounded-xl overflow-hidden bg-black/50 border border-slate-700/50 group-hover:border-slate-500 transition-colors">
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent"></div>
                                <img
                                  src={outcome.img}
                                  alt={outcome.title}
                                  loading="lazy"
                                  className="absolute inset-0 w-full h-full object-contain p-2 mix-blend-screen group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                />
                              </div>
                              <h4 className="text-center max-w-28 md:max-w-36 text-slate-400 group-hover:text-yellow-400 transition-colors text-[10px] md:text-xs font-semibold leading-tight">
                                {outcome.title}
                              </h4>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
