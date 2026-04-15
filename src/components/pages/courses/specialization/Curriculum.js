"use client";

import React, { useState, useEffect, useRef } from "react";

const THEMES = {
  blue: { bg: "bg-[#0c4088]", text: "text-[#0c4088]", border: "border-gray-200", cardGrad: "from-white to-gray-50", outcomeBorder: "border-blue-300/30" },
  cyan: { bg: "bg-[#0c4088]", text: "text-[#0c4088]", border: "border-gray-200", cardGrad: "from-white to-gray-50", outcomeBorder: "border-blue-300/30" },
  yellow: { bg: "bg-[#0c4088]", text: "text-[#0c4088]", border: "border-gray-200", cardGrad: "from-white to-gray-50", outcomeBorder: "border-blue-300/30" },
};

export default function Curriculum({ data }) {
  if (!data) return null;
  const { title: sectionTitle = "", description, data: curriculumData = [] } = data || {};

  const [activeYear, setActiveYear] = useState(1);
  const [cardTransforms, setCardTransforms] = useState(
    (Array.isArray(curriculumData) ? curriculumData : []).map(() => ({ scale: 1, opacity: 1 }))
  );

  const anchorRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = 1;

      const newTransforms = curriculumData.map((_, i) => {
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
  }, [curriculumData]);

  const scrollToYear = (index) => {
    const anchor = anchorRefs.current[index];
    if (anchor) {
      const top = anchor.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gray-50 px-4 py-10 sm:p-15 md:p-20 font-sans text-[#0c4088]">
      <div className="relative max-w-7xl mx-auto flex flex-col gap-10">

        <div className="items-center lg:items-start flex flex-col gap-2 text-center lg:text-left z-20 md:ml-[240px] xl:ml-[320px]">
          <p className="tracking-widest text-gray-500 uppercase font-bold text-xs md:text-sm">
            4-Year Journey
          </p>
          <h2 className="tracking-wider text-[#0c4088] text-3xl md:text-5xl font-extrabold leading-tight">
            {(sectionTitle || '').split(' ').map((word, i) => (
              <span key={i} className={word === 'Curriculum' ? 'text-[#f1bd0e]' : ''}>{word} </span>
            ))}
          </h2>
          <p className="text-gray-600 max-w-3xl text-sm md:text-base mt-2">
            {description}
          </p>
        </div>

        <div className="md:hidden sticky top-16 z-40 bg-gray-50/90 backdrop-blur-md py-3 -mx-4 px-4 border-b border-gray-200">
          <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {(Array.isArray(curriculumData) ? curriculumData : []).map((year, i) => (
              <button
                key={year.id}
                onClick={() => scrollToYear(i)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${activeYear === year.id ? `bg-[#0c4088] text-white` : "text-gray-500 bg-white border border-gray-100 hover:bg-gray-50"
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
              <nav className="flex flex-col gap-8 relative border-l-2 border-gray-200 ml-3 pl-6">
                {(Array.isArray(curriculumData) ? curriculumData : []).map((year, i) => {
                  const isActive = activeYear === year.id;
                  return (
                    <button
                      key={year.id}
                      onClick={() => scrollToYear(i)}
                      className="text-left group outline-none relative no-underline border-none bg-transparent"
                    >
                      <span className={`absolute -left-[32px] top-2 w-[3px] rounded-r-full transition-all duration-500 ${isActive ? 'bg-[#f1bd0e] h-full shadow-[0_0_10px_rgba(241,189,14,0.5)]' : 'bg-transparent h-0'}`}></span>
                      <span className={`block transition-all duration-500 font-bold ${isActive ? `text-2xl text-[#0c4088] translate-x-1` : "text-lg text-gray-400 translate-x-0 group-hover:text-gray-600"}`}>
                        <span className={`block text-xs uppercase tracking-widest mb-1 ${isActive ? 'text-[#f1bd0e]' : 'text-gray-400'}`}>Year {year.id}</span>
                        {year.title}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="flex-1 min-w-0 pb-[20vh] relative">
            <div className="absolute inset-0 pointer-events-none">
              {(Array.isArray(curriculumData) ? curriculumData : []).map((_, i) => (
                <div key={`anchor-${i}`} ref={el => anchorRefs.current[i] = el} className="h-screen w-full" />
              ))}
            </div>

            {(Array.isArray(curriculumData) ? curriculumData : []).map((year, index) => {
              const transformState = cardTransforms[index] || { scale: 1, opacity: 1 };
              return (
                <div
                  key={year.id}
                  ref={el => cardRefs.current[index] = el}
                  className="h-screen sticky items-start w-full"
                  style={{ top: `calc(7rem + ${index * 12}px)`, zIndex: index + 10 }}
                >
                  <div className="relative w-full pt-2" style={{ transformOrigin: "top center", transform: `scale(${transformState.scale})`, transition: "transform 0.1s linear" }}>
                    <div className="tracking-wide flex flex-col rounded-2xl md:rounded-[36px] p-4 md:p-6 lg:p-8 gap-4 bg-white border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
                      <div className="flex flex-col xl:flex-row xl:justify-between gap-5 xl:gap-0 shrink-0">
                        <div className="flex flex-col flex-1 gap-2 md:gap-3 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-[#0c4088] text-white text-lg md:text-2xl font-black shadow-inner">
                              {year.id}
                            </div>
                            <h3 className="text-[#0c4088] tracking-wider text-2xl md:text-3xl lg:text-[34px] font-extrabold leading-tight">
                              {year.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">{year.subtitle}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 md:gap-3 shrink-0 self-start">
                          {(year.stats || []).map((stat, i) => (
                            <div key={i} className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl border flex flex-col gap-0 items-center justify-center border-gray-100 bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-default">
                              <div className="text-[#0c4088] font-black text-lg md:text-[22px] leading-none">{stat.value}</div>
                              <div className="text-gray-500 text-[9px] md:text-xs text-center font-bold uppercase tracking-widest mt-1">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col lg:flex-row gap-4 mt-2 shrink-0">
                        {(year.semesters || []).map((sem, i) => (
                          <div key={i} className="flex-1 flex flex-col gap-3 p-4 md:p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-blue-100 transition-all duration-300">
                            <div className="flex gap-2 items-center flex-wrap">
                              {(sem.badges || []).map((badge, bIndex) => (
                                <span key={bIndex} className="px-3 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-bold tracking-wide whitespace-nowrap border border-gray-200 bg-white text-[#0c4088]">
                                  {badge.text}
                                </span>
                              ))}
                            </div>
                            {sem.isSpecial ? (
                              <div className="flex mt-4 flex-col justify-center items-center gap-3 py-6">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-[#0c4088]">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                </div>
                                <p className="text-center leading-5 text-[#0c4088] font-black text-base md:text-lg">{sem.specialTitle}</p>
                                <p className="text-center font-medium text-gray-500 text-xs md:text-sm leading-relaxed px-4">{sem.specialDesc}</p>
                              </div>
                            ) : (
                              <ul className="flex flex-col gap-2 md:gap-2.5 mt-1 list-none p-0 m-0">
                                {(sem.subjects || []).map((sub, sIndex) => (
                                  <li key={sIndex} className="flex items-start gap-2.5 group cursor-default">
                                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-all group-hover:scale-150 bg-gray-300 group-hover:bg-[#f1bd0e]"></span>
                                    <span className="text-gray-600 text-xs md:text-sm font-medium leading-snug group-hover:text-[#0c4088] transition-colors">{sub.name}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="w-full flex mt-2 rounded-xl bg-gray-50/50 gap-4 md:gap-6 py-3 px-4 md:px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden shrink-0 border border-gray-100">
                        {(year.categories || []).map((cat, i) => (
                          <span key={i} className="rounded-full text-xs font-bold tracking-wide inline-flex items-center text-gray-500 whitespace-nowrap shrink-0">
                            <span className={`w-1.5 h-1.5 rounded-full inline-block mr-2 ${["bg-[#f1bd0e]", "bg-[#0c4088]", "bg-gray-400"][i % 3]}`}></span>
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="  left-0 right-0 pointer-events-auto px-4 md:px-0" style={{ opacity: transformState.opacity, transition: "opacity 0.1s linear", pointerEvents: transformState.opacity === 0 ? "none" : "auto" }}>
                    <div className="flex flex-col gap-2 md:gap-3 rounded-2xl md:rounded-[32px] px-5 py-4 md:px-7 md:py-6 bg-white border-t-[3px] border-[#0c4088] shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                      <h3 className="text-[#0c4088] text-xs md:text-[13px] font-black tracking-widest uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#f1bd0e]"></span>
                        Year {year.id} Outcomes
                      </h3>
                      <div className="w-full overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden">
                        <div className="flex gap-4 md:gap-7 justify-start pb-1">
                          {(year.outcomes || []).map((outcome, i) => (
                            <div key={i} className="w-fit shrink-0 rounded-2xl flex flex-col gap-2 transition-transform hover:-translate-y-1 hover:scale-105 cursor-pointer duration-300 group">
                              <div className="relative w-24 h-18 md:w-36 md:h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-[#0c4088]/30 transition-colors">
                                <img src={outcome.img} alt={outcome.title} loading="lazy" className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <h4 className="text-center max-w-24 md:max-w-36 text-gray-500 group-hover:text-[#0c4088] transition-colors text-[10px] md:text-[11px] font-bold leading-tight">{outcome.title}</h4>
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
