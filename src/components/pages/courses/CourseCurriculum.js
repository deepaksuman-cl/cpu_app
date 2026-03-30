"use client";
import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { Star, CheckCircle, Plus, Minus, ChevronDown, ChevronLeft, ChevronRight, Building2, FlaskConical } from "lucide-react";
import StructuredTitle from "@/components/common/StructuredTitle";
import RichTextRenderer from "@/components/common/RichTextRenderer";

/* ── Shared Section Title ── */
function SectionTitle({ children, subtitle, center = true }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#00588b]">
        <StructuredTitle title={children} />
      </h2>
      {subtitle && (
        <p className={`text-sm max-w-2xl ${center ? "mx-auto" : ""} text-gray-500`}>{subtitle}</p>
      )}
      <div className={`flex gap-1 mt-3 ${center ? "justify-center" : ""}`}>
        <div className="h-1 w-14 rounded-full bg-[#ffb900]" />
        <div className="h-1 w-5 rounded-full bg-[#00588b]" />
        <div className="h-1 w-2 rounded-full bg-[#ffb900]" />
      </div>
    </div>
  );
}

/* ── Full-Width Accordion (matches test/page.js exactly) ── */
function CourseAccordion({ sections, courseStructure }) {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <div className="w-full border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
      {sections.map((section, idx) => {
        const sectionKey = section.id || `sem-${idx}`;
        const isOpen = openId === sectionKey;
        return (
          <div key={sectionKey} className={idx !== 0 ? "border-t border-gray-200" : ""}>
            {/* Header */}
            <button
              onClick={() => toggle(sectionKey)}
              className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-200 ${
                isOpen ? "bg-[#00588b] text-white" : "bg-white hover:bg-blue-50 text-gray-800"
              }`}
            >
              <span className="flex items-center gap-3 font-semibold text-sm md:text-base">
                <span className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                  isOpen ? "bg-white/20" : "bg-[#00588b]/10"
                }`}>
                  {isOpen
                    ? <Minus size={15} className="text-white" />
                    : <Plus  size={15} className="text-[#00588b]" />
                  }
                </span>
                {section.title}
              </span>
              <ChevronDown
                size={18}
                className={`flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-white" : "text-gray-400"
                }`}
              />
            </button>

            {/* Body */}
            {isOpen && (
              <div className="bg-white border-t border-gray-100 px-6 py-6">
                <RichTextRenderer 
                  content={section.content} 
                  useProse={section.useProse !== false}
                  className="text-gray-700 text-sm leading-relaxed" 
                />

                {/* Embedded table for Course Structure row */}
                {section.hasTable && courseStructure && (
                  <div className="overflow-x-auto rounded-xl shadow border border-gray-100 mt-2">
                    <table className="w-full text-sm min-w-[520px]">
                      <thead>
                        <tr className="bg-[#00588b] text-white">
                          <th className="px-5 py-3 text-left font-bold">Category</th>
                          <th className="px-5 py-3 text-left font-bold">Short Name</th>
                          <th className="px-5 py-3 text-left font-bold">Description</th>
                          <th className="px-5 py-3 text-center font-bold w-24">Credits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseStructure.map((row, i) => (
                          <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-blue-50/50"} hover:bg-[#ffb900]/5 transition-colors`}>
                            <td className="px-5 py-3 font-semibold text-[#00588b] text-xs">{row.category}</td>
                            <td className="px-5 py-3 text-gray-500 text-xs font-semibold">{row.shortName}</td>
                            <td className="px-5 py-3 text-gray-700">{row.description}</td>
                            <td className="px-5 py-3 text-center font-extrabold text-[#ffb900] text-base">{row.credits ?? "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Upgraded Department Slider (matches test/page.js exactly) ── */
function DeptSlider({ slides }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const len = slides.length;
  const BG2 = "https://cpur.in/wp-content/uploads/2024/01/bg_12-1.jpg";

  // Auto-rotate
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % len), 4000);
    return () => clearInterval(t);
  }, [len]);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-7">
        {slides.map((slide, idx) => {
          const isActive = idx === active;
          const isHov    = hovered === idx;
          const highlight = isActive || isHov;
          const Icon = LucideIcons[slide.icon] || Building2;
          return (
            <div
              key={slide.title}
              onClick={() => setActive(idx)}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                boxShadow: highlight
                  ? "0 0 0 3px #ffb900, 0 24px 48px rgba(0,88,139,0.35)"
                  : "0 8px 32px rgba(0,88,139,0.18)",
                transform: highlight ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              {/* Background */}
              <div className="absolute inset-0" style={{ backgroundImage: `url(${BG2})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              {/* Teal gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: highlight
                    ? "linear-gradient(160deg, rgba(0,70,110,0.93) 0%, rgba(0,50,80,0.97) 100%)"
                    : "linear-gradient(160deg, rgba(0,70,110,0.87) 0%, rgba(0,50,80,0.93) 100%)",
                  transition: "background 0.4s ease",
                }}
              />
              {/* Watermark icon */}
              <div className="absolute right-4 bottom-20 opacity-[0.06] pointer-events-none">
                <Icon size={120} className="text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Header row */}
                <div className="flex items-center gap-3 px-6 pt-6 pb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                    style={{ background: highlight ? "#ffb900" : "rgba(255,185,0,0.85)", transition: "background 0.3s" }}
                  >
                    <Icon size={24} className="text-[#00588b]" />
                  </div>
                  <h3 className="font-extrabold text-white text-base leading-tight">{slide.title}</h3>
                </div>

                {/* Gold divider */}
                <div className="mx-6 mb-5 h-px" style={{ background: "rgba(255,185,0,0.25)" }} />

                {/* List + CTA */}
                <div className="px-6 pb-6 flex-1">
                  <ul className="space-y-3 mb-6">
                    {slide.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full border border-[#ffb900]/60 flex items-center justify-center">
                          <CheckCircle size={12} className="text-[#ffb900]" />
                        </span>
                        <span
                          className="text-sm font-medium leading-tight"
                          style={{ color: highlight ? "#ffffff" : "rgba(255,255,255,0.85)", transition: "color 0.3s" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-3 rounded-xl font-extrabold text-sm tracking-widest uppercase transition-all duration-300"
                    style={{
                      background: highlight ? "#ffb900" : "rgba(255,185,0,0.75)",
                      color: "#00588b",
                      letterSpacing: "0.12em",
                      boxShadow: highlight ? "0 4px 20px rgba(255,185,0,0.4)" : "none",
                    }}
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot navigation */}
      <div className="flex items-center justify-center gap-3 mt-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-400 rounded-full"
            style={{ width: i === active ? "32px" : "10px", height: "10px", background: i === active ? "#00588b" : "#d1d5db" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════ EXPORTS ══════════ */

export function CourseCurriculum({ data }) {
  if (!data) return null;

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <SectionTitle subtitle={data.subtitle}>{data.sectionTitle}</SectionTitle>
        {data.introNote && (
          <RichTextRenderer 
            content={data.introNote} 
            useProse={data.useProse !== false}
            className="mt-6 text-gray-600 leading-relaxed text-sm" 
          />
        )}
      </div>

      {/* Full-width accordion */}
      <div className="px-4 md:px-8 lg:px-16">
        <CourseAccordion
          sections={data.accordionSections || []}
          courseStructure={data.courseStructure}
        />
      </div>

      {/* Value Added Courses and Outro Note */}
      <div className="max-w-7xl mx-auto px-4 mt-12 space-y-10">
        {data.outroNote && (
          <RichTextRenderer 
            content={data.outroNote} 
            useProse={data.useProse !== false}
            className="text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-8" 
          />
        )}
        {data.valueAddedCourses && data.valueAddedCourses.length > 0 && (
          <div className="bg-gradient-to-br from-[#00588b]/5 via-white to-[#ffb900]/5 border border-[#00588b]/10 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffb900]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#ffb900]/20 transition-colors" />
            <h3 className="text-[#00588b] font-black text-xl mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffb900] flex items-center justify-center shadow-lg shadow-[#ffb900]/20">
                <Star size={20} className="text-[#00588b]" />
              </div>
              Value Added Courses for all UG (VAC) — Non Mandatory
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#00588b] text-white">
                    <th className="px-6 py-4 text-left font-black uppercase tracking-wider">Course Name</th>
                    <th className="px-6 py-4 text-left font-black uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-center w-24 font-black uppercase tracking-wider">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {data.valueAddedCourses.map((c, i) => (
                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{c.name}</div>
                        {c.description && <div className="text-[11px] text-gray-500 mt-0.5 italic">{c.description}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-[#00588b] text-[10px] font-black rounded-full uppercase tracking-widest">{c.category || 'VAC'}</span>
                      </td>
                      <td className="px-6 py-4 text-center font-black text-[#ffb900] text-lg">{c.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function CourseDeptSlider({ data, slides }) {
  const slideData = slides || data?.slides || [];
  const sectionTitle = data?.sectionTitle || "Explore Our Department";
  const subtitle = data?.subtitle || "Discover what makes our department exceptional";
  const BG1 = "https://cpur.in/wp-content/uploads/2023/07/banner-005.webp";

  if (!slideData.length) return null;

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#f4f2ed" }}>
      {/* Subtle bg watermark */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: `url(${BG1})`, backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(60%)" }}
      />
      {/* Decorative watermark icons */}
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <Building2 size={320} className="text-[#00588b]" />
      </div>
      <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <Star size={260} className="text-[#ffb900]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00588b] mb-3">
            <StructuredTitle title={sectionTitle} />
          </h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
          <div className="flex justify-center gap-1 mt-4">
            <div className="h-1 w-14 rounded-full bg-[#ffb900]" />
            <div className="h-1 w-5 rounded-full bg-[#00588b]" />
            <div className="h-1 w-2 rounded-full bg-[#ffb900]" />
          </div>
        </div>
        <DeptSlider slides={slideData} />
      </div>
    </section>
  );
}
