"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import HOME_DATA from "../../data/home.json";

export default function HeroSection() {
  const [idx, setIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);
  const slides = HOME_DATA.heroSlides;

  const go = useCallback((n) => {
    clearInterval(timerRef.current);
    setIdx(n % slides.length);
    setAnimKey((k) => k + 1);
    timerRef.current = setInterval(() => {
      setIdx((p) => (p + 1) % slides.length);
      setAnimKey((k) => k + 1);
    }, 5500);
  }, [slides.length]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIdx((p) => (p + 1) % slides.length);
      setAnimKey((k) => k + 1);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  const hs = slides[idx];

  return (
    <>
      <style jsx global>{`
        @keyframes heroUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-heroUp {
          animation: heroUp 0.75s cubic-bezier(0.2, 0, 0.2, 1) both;
        }
      `}</style>

      <section className="relative overflow-hidden min-h-[680px]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-top transition-opacity duration-[900ms]"
            style={{
              backgroundImage: `url(${slide.bg})`,
              opacity: i === idx ? 1 : 0,
              zIndex: 0,
            }}
          />
        ))}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#00121f]/90 via-[#002848]/72 to-[#00121f]/28"
          style={{ zIndex: 1 }}
        />
        <div
          className="relative max-w-7xl mx-auto px-5 py-24 flex items-center"
          style={{ zIndex: 2 }}
        >
          <div key={animKey} className="max-w-[660px] animate-heroUp">
            <span className="inline-flex items-center gap-1.5 bg-amber-400 text-black text-xs font-extrabold px-4 py-1.5 rounded-full mb-5">
              {hs.badge}
            </span>
            <p className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em] mb-2.5">
              {hs.tagline}
            </p>
            <h1 className="text-white font-black text-5xl md:text-6xl lg:text-[66px] leading-[1.02] m-0">
              {hs.title}
            </h1>
            <h1 className="text-amber-400 font-black text-5xl md:text-6xl lg:text-[66px] leading-[1.02] mt-0 mb-6">
              {hs.subtitle}
            </h1>
            <p className="text-white/80 text-base leading-[1.75] max-w-[520px] mb-8">
              {hs.desc}
            </p>
            <div className="flex gap-3.5 flex-wrap">
              <button className="bg-gradient-to-br from-amber-400 to-amber-600 text-white border-none rounded-full px-8 py-3 text-[15px] font-extrabold cursor-pointer flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
                Apply Now <ArrowRight size={15} />
              </button>
              <button className="bg-transparent text-white border-2 border-white/60 rounded-full px-6 py-3 text-[15px] font-bold cursor-pointer flex items-center gap-2 hover:bg-white/15 hover:border-white transition-all">
                Explore Programs
              </button>
              <button className="bg-transparent text-white border-2 border-white/60 rounded-full px-6 py-3 text-[15px] font-bold cursor-pointer flex items-center gap-2 hover:bg-white/15 hover:border-white transition-all">
                <Play size={15} /> Watch Video
              </button>
            </div>
          </div>
          {hs.heroimg && (
            <div className="hero_img animate-heroUp">
              <img
                src={hs.heroimg}
                alt="img"
                className="ml-30 w-[80%] block m-auto rounded-2xl transition-transform duration-400"
              />
            </div>
          )}
        </div>
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 mb-5"
          style={{ zIndex: 3 }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full border-none cursor-pointer transition-all duration-400 ${
                i === idx ? "bg-amber-400 w-8" : "bg-white/45 w-2.5"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go((idx - 1 + slides.length) % slides.length)}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 border border-white/35 cursor-pointer flex items-center justify-center backdrop-blur hover:bg-white/28 transition-colors"
          style={{ zIndex: 3 }}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <button
          onClick={() => go((idx + 1) % slides.length)}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 border border-white/35 cursor-pointer flex items-center justify-center backdrop-blur hover:bg-white/28 transition-colors"
          style={{ zIndex: 3 }}
        >
          <ChevronRight size={20} className="text-white" />
        </button>
        <div className="absolute -bottom-0.5 left-0 right-0" style={{ zIndex: 2 }}>
          <svg viewBox="0 0 1440 60" fill="none">
            <path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" fill="white" />
          </svg>
        </div>
      </section>
    </>
  );
}
