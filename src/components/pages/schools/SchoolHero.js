"use client";
import React from "react";
import * as LucideIcons from "lucide-react";
import { Star, ArrowRight } from "lucide-react";
import StructuredTitle from "@/components/common/StructuredTitle";

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

            <h1 className="font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(2.4rem,4.5vw,3.8rem)" }}>
              {data.title?.line1 ? (
                <>
                  {data.title.line1}<br />
                  <span className="text-[#ffb900]">{data.title.line2}</span><br />
                  {data.title.line3}
                </>
              ) : (
                <StructuredTitle 
                  title={data.title} 
                  highlightClass="text-[#ffb900]"
                  skyHighlightClass="text-sky-300"
                />
              )}
            </h1>

            {data.subtitle && (
              <p className="text-[#ffb900] text-xl font-black uppercase tracking-widest mb-6 opacity-90 drop-shadow-md">
                {data.subtitle}
              </p>
            )}

            <p className="text-blue-100/90 text-lg leading-relaxed mb-6 max-w-xl">
              {data.description}
            </p>

            {/* Course Information Chip (Duration/Eligibility) */}
            {(data.duration || data.eligibility) && (
              <div className="flex flex-wrap gap-4 mb-10">
                {data.duration && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 rounded-xl">
                    <LucideIcons.Clock className="w-4 h-4 text-[#ffb900]" />
                    <span className="text-white text-sm font-bold uppercase tracking-wider">{data.duration}</span>
                  </div>
                )}
                {data.eligibility && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 rounded-xl">
                    <LucideIcons.GraduationCap className="w-4 h-4 text-[#ffb900]" />
                    <span className="text-white text-sm font-bold uppercase tracking-wider">Eligibility: {data.eligibility}</span>
                  </div>
                )}
              </div>
            )}

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
                {data.quickStats.map((s, i) => {
                  const Icon = LucideIcons[s.icon] || Star;
                  return (
                    <div key={i} className="flex items-center gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ffb900] group-hover:bg-[#ffb900]/20 transition-colors">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="text-[#ffb900] font-black text-2xl leading-none">{s.value}</div>
                        <div className="text-blue-200 text-[10px] uppercase font-bold tracking-wider mt-1">{s.label}</div>
                      </div>
                    </div>
                  );
                })}
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