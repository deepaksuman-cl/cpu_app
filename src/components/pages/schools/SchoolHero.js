"use client";
import React from "react";
import { Star, ArrowRight } from "lucide-react";

export default function SchoolHero({ data, children }) {
  if (!data) return null;

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Background & Overlays */}
      <div className="absolute inset-0">
        <img
          src={data.bgImage || "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg"}
          alt="Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#001f33]/94 via-[#00588b]/88 to-[#007abf]/84" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle,rgba(0,88,139,.12) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      {/* Decorative Rings */}
      <div className="ring-cw absolute right-0 top-1/2 -translate-y-1/2 translate-x-[35%] w-[600px] h-[600px] rounded-full pointer-events-none border-2 border-[#ffb900]/18" />
      <div className="ring-ccw absolute right-0 top-1/2 -translate-y-1/2 translate-x-[25%] w-[430px] h-[430px] rounded-full pointer-events-none border-2 border-dashed border-white/10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-16 py-20 w-full">
        <div className={`flex flex-col ${children ? "lg:flex-row items-center gap-14" : ""}`}>
          {/* Left — always rendered */}
          <div className={children ? "flex-1" : "max-w-[80%]"}>
            {data.badge && (
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold bg-[#ffb900]/15 text-[#ffb900] border border-[#ffb900]/35">
                <Star className="w-4 h-4 fill-current" /> {data.badge}
              </div>
            )}

            <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.4rem,4.5vw,3.8rem)" }}>
              {data.title.line1 ? (
                <>
                  {data.title.line1}<br />
                  <span className="text-[#ffb900]">{data.title.line2}</span><br />
                  {data.title.line3}
                </>
              ) : (
                <>
                  {data.title.main.split(data.title.highlight)[0]}
                  <span className="text-[#ffb900]">{data.title.highlight}</span>
                  {data.title.main.split(data.title.highlight)[1]?.split(data.title.skyHighlight)[0]}
                  {data.title.skyHighlight && (
                    <span className="text-sky-300">{data.title.skyHighlight}</span>
                  )}
                  {data.title.skyHighlight && data.title.main.split(data.title.skyHighlight)[1]}
                  {!data.title.skyHighlight && data.title.main.split(data.title.highlight)[1]}
                </>
              )}
            </h1>

            <p className="text-blue-100/90 text-lg leading-relaxed mb-10 max-w-xl">
              {data.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {data.cta?.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (btn.link.startsWith('#')) {
                      document.getElementById(btn.link.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = btn.link;
                    }
                  }}
                  className={`flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-transform hover:scale-105 border-none cursor-pointer ${
                    btn.primary
                    ? "bg-[#ffb900] text-[#0a1628] shadow-[0_8px_32px_rgba(255,185,0,0.4)]"
                    : "text-white bg-white/10 hover:bg-white/20 border-2 border-white/30"
                  }`}
                >
                  {btn.label} {btn.primary && <ArrowRight className="w-5 h-5" />}
                </button>
              ))}
            </div>

            {/* Optional quick stats row (course pages) */}
            {data.quickStats && (
              <div className="flex flex-wrap gap-8 mt-12 pt-6 border-t border-white/20">
                {data.quickStats.map((s, i) => (
                  <div key={i}>
                    <div className="text-[#ffb900] font-black text-2xl">{s.value}</div>
                    <div className="text-blue-200 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — injected from course page (Accomplishments card, etc.) */}
          {children && (
            <div className="flex-1 max-w-sm w-full">
              {children}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 55" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,35 C360,70 1080,0 1440,35 L1440,55 L0,55 Z" />
        </svg>
      </div>
    </section>
  );
}