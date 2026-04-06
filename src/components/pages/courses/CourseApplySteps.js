"use client";
import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import {
  UserCheck, FileText, ClipboardList, IndianRupee, BadgeCheck,
  CheckCircle, ChevronLeft, ChevronRight, ArrowRight,
} from "lucide-react";

import StructuredTitle from "@/components/common/StructuredTitle";


function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">
        <StructuredTitle title={children} highlightClass="text-[#ffb900]" />
      </h2>
      {subtitle && <p className="text-lg max-w-2xl mx-auto text-blue-200">{subtitle}</p>}
      <div className="flex gap-1 mt-3 justify-center">
        <div className="h-1 w-14 rounded-full bg-[#ffb900]" />
        <div className="h-1 w-5 rounded-full bg-[#00588b]" />
        <div className="h-1 w-2 rounded-full bg-[#ffb900]" />
      </div>
    </div>
  );
}

function ApplySlider({ steps }) {
  const [active, setActive] = useState(0);
  const len = steps.length;
  const prev = () => setActive(i => (i - 1 + len) % len);
  const next = () => setActive(i => (i + 1) % len);

  // Auto-play
  useEffect(() => {
    const t = setTimeout(next, 3500);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div>
      {/* ── Desktop Progress Steps ── */}
      <div className="hidden md:flex items-start relative mb-10">
        {/* Background line */}
        <div className="absolute top-8 left-8 right-8 h-px bg-white/15 z-0" />
        {steps.map((step, idx) => {
          const isActive = idx === active;
          const isDone = idx < active;
          const Icon = LucideIcons[step.icon] || FileText;
          return (
            <div
              key={step.step}
              onClick={() => setActive(idx)}
              className="flex-1 flex flex-col items-center relative z-10 cursor-pointer transition-all duration-400"
            >
              {/* Circle */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500 shadow-lg border-2 ${
                  isActive
                    ? "bg-[#ffb900] border-white scale-110 ring-4 ring-[#ffb900]/30"
                    : isDone
                    ? "bg-white/25 border-white/50"
                    : "bg-white/10 border-white/20"
                }`}
              >
                {isDone ? (
                  <CheckCircle size={26} className="text-white" />
                ) : (
                  <Icon size={26} className={isActive ? "text-[#00588b]" : "text-white/70"} />
                )}
              </div>
              <span className={`text-xs font-black tracking-widest mb-1 transition-colors ${isActive ? "text-[#ffb900]" : "text-white/40"}`}>
                STEP {step.step}
              </span>
              <span className={`text-xs font-bold text-center leading-tight px-1 transition-colors ${isActive ? "text-white" : "text-white/60"}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Active Card (Desktop) ── */}
      <div className="hidden md:block">
        {steps.map((step, idx) => {
          if (idx !== active) return null;
          const Icon = LucideIcons[step.icon] || FileText;
          return (
            <div
              key={step.step}
              className="max-w-xl mx-auto bg-white/10 backdrop-blur border border-white/25 rounded-2xl p-8 text-center shadow-2xl"
              style={{ animation: "fadeSlideUp 0.4s ease" }}
            >
              <div className="w-20 h-20 bg-[#ffb900] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Icon size={32} className="text-[#00588b]" />
              </div>
              <div className="text-[#ffb900] font-black text-xs tracking-widest mb-2">STEP {step.step} OF {len}</div>
              <h3 className="text-white font-extrabold text-xl mb-3">{step.label}</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">{step.desc}</p>
              {/* Mini progress bar */}
              <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#ffb900] h-full rounded-full transition-all duration-500"
                  style={{ width: `${((active + 1) / len) * 100}%` }}
                />
              </div>
              <p className="text-white/40 text-xs mt-2">{active + 1} of {len} steps</p>
            </div>
          );
        })}
      </div>

      {/* ── Mobile Slider ── */}
      <div className="md:hidden">
        {steps.map((step, idx) => {
          if (idx !== active) return null;
          const Icon = LucideIcons[step.icon] || FileText;
          return (
            <div key={step.step} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-[#ffb900] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Icon size={32} className="text-[#00588b]" />
              </div>
              <div className="text-[#ffb900] font-black text-xs tracking-widest mb-2">STEP {step.step}</div>
              <h3 className="text-white font-extrabold text-lg mb-3">{step.label}</h3>
              <p className="text-blue-100 text-sm leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-center gap-5 mt-8">
        <button
          onClick={prev}
          className="w-11 h-11 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-[#ffb900] hover:text-[#00588b] hover:border-[#ffb900] transition"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${i === active ? "w-8 h-3 bg-[#ffb900]" : "w-3 h-3 bg-white/25 hover:bg-white/50"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-11 h-11 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-[#ffb900] hover:text-[#00588b] hover:border-[#ffb900] transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
}

export default function CourseApplySteps({ data }) {
  if (!data) return null;
  const { sectionTitle, subtitle, bgImage, guideLabel, ctaLabel, ctaLink, steps } = data;

  return (
    <section
      id="apply"
      className="relative py-24 overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00588b]/97 via-[#004e7c]/96 to-[#002f4d]/95" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(#fff 1.5px,transparent 1.5px)", backgroundSize: "30px 30px" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <SectionTitle subtitle={subtitle}>{sectionTitle}</SectionTitle>
        {guideLabel && (
          <p className="text-blue-200 text-center text-sm -mt-6 mb-12">{guideLabel}</p>
        )}

        <ApplySlider steps={steps} />

        <div className="text-center mt-14">
          <a
            href={"https://admission.cpur.in/"}
            className="inline-flex items-center gap-2 bg-[#ffb900] text-[#00588b] font-extrabold text-base px-10 py-4 rounded-full shadow-2xl hover:bg-yellow-300 hover:scale-105 transition-all"
          >
            {ctaLabel || "Start Your Application"} <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
