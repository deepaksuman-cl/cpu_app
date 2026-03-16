"use client";
import React, { useState } from "react";
import { Star, ChevronRight, ChevronDown, ChevronLeft, CheckCircle } from "lucide-react";
import {
  Building2, FlaskConical,
} from "lucide-react";

// Map icon strings from JSON → Lucide components
const ICON_MAP = { Building2, FlaskConical, Star };

const BG2 = "https://cpur.in/wp-content/uploads/2024/01/bg_12-1.jpg";

/* ── Shared Section Title ── */
function SectionTitle({ children, subtitle, center = true }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#00588b]">{children}</h2>
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

/* ── Accordion Item ── */
function AccordionItem({ title }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl mb-2 overflow-hidden shadow-sm">
      <button
        className="w-full flex items-center justify-between px-5 py-3 bg-white hover:bg-blue-50 transition-all text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-[#00588b] flex items-center gap-2 text-sm">
          <span className="w-6 h-6 rounded-full bg-[#ffb900]/20 flex items-center justify-center flex-shrink-0">
            <ChevronRight size={13} className={`transition-transform text-[#ffb900] ${open ? "rotate-90" : ""}`} />
          </span>
          {title}
        </span>
        <ChevronDown size={15} className={`transition-transform text-gray-400 flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 py-4 text-gray-600 text-sm bg-blue-50/50 border-t border-gray-100">
          Curriculum details for <strong className="text-[#00588b]">{title}</strong> — contact the department for the full syllabus and timetable.
        </div>
      )}
    </div>
  );
}

/* ── Dept Slider ── */
function DeptSlider({ slides }) {
  const [active, setActive] = useState(0);
  const len = slides.length;

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6">
        {slides.map((slide, idx) => {
          const isActive = idx === active;
          const Icon = ICON_MAP[slide.icon] || Building2;
          return (
            <div
              key={slide.title}
              onClick={() => setActive(idx)}
              className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                isActive ? "ring-4 ring-[#ffb900] shadow-2xl scale-[1.03]" : "opacity-70 hover:opacity-90 shadow-md"
              }`}
              style={{ background: "linear-gradient(145deg,#00588b,#003d61)" }}
            >
              <div
                className="relative p-6 pb-4"
                style={{ backgroundImage: `url(${BG2})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-[#00588b]/80" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="bg-[#ffb900] rounded-xl p-2 shadow-lg flex-shrink-0">
                    <Icon size={22} className="text-[#00588b]" />
                  </div>
                  <h3 className="font-extrabold text-white text-sm leading-tight">{slide.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <ul className="space-y-2 mb-5">
                  {slide.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-blue-100">
                      <CheckCircle size={13} className="text-[#ffb900] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-[#ffb900] text-[#00588b] font-extrabold text-xs py-2.5 rounded-full hover:bg-yellow-300 transition">
                  {slide.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Nav */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => setActive((active - 1 + len) % len)}
          className="w-10 h-10 rounded-full border-2 border-[#00588b] flex items-center justify-center hover:bg-[#00588b] hover:text-white transition text-[#00588b]"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${i === active ? "w-7 h-3 bg-[#00588b]" : "w-3 h-3 bg-gray-300 hover:bg-gray-400"}`}
            />
          ))}
        </div>
        <button
          onClick={() => setActive((active + 1) % len)}
          className="w-10 h-10 rounded-full border-2 border-[#00588b] flex items-center justify-center hover:bg-[#00588b] hover:text-white transition text-[#00588b]"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ══════════ EXPORTS ══════════ */

export function CourseCurriculum({ data }) {
  if (!data) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <SectionTitle subtitle={data.subtitle}>{data.sectionTitle}</SectionTitle>

      {/* Intro note */}
      <div className="bg-gradient-to-r from-[#00588b]/8 to-blue-50 border-l-4 border-[#00588b] rounded-r-2xl p-6 mb-10 text-sm text-gray-700 leading-relaxed">
        <strong className="text-[#00588b]">Course Structure:</strong> {data.introNote}
      </div>

      {/* Course Structure Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100 mb-10">
        <table className="w-full text-sm min-w-[580px]">
          <thead>
            <tr className="bg-[#00588b] text-white">
              <th className="px-5 py-3.5 text-left font-bold">Category</th>
              <th className="px-5 py-3.5 text-left font-bold">Short Name</th>
              <th className="px-5 py-3.5 text-left font-bold">Description</th>
              <th className="px-5 py-3.5 text-center font-bold w-24">Credits</th>
            </tr>
          </thead>
          <tbody>
            {data.courseStructure?.map((row, i) => (
              <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-blue-50/40"} hover:bg-[#ffb900]/5 transition-colors`}>
                <td className="px-5 py-3 font-semibold text-[#00588b] text-xs">{row.category}</td>
                <td className="px-5 py-3 text-gray-500 text-xs">{row.shortName}</td>
                <td className="px-5 py-3 text-gray-700">{row.description}</td>
                <td className="px-5 py-3 text-center font-extrabold text-[#ffb900] text-base">{row.credits ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Value Added Courses */}
      <div className="bg-gradient-to-r from-[#ffb900]/15 to-yellow-50 border border-[#ffb900]/50 rounded-2xl p-6 mb-10">
        <h3 className="text-[#00588b] font-extrabold text-base mb-5 flex items-center gap-2">
          <Star size={18} className="text-[#ffb900]" /> Value Added Courses for all UG (VAC) — Non Mandatory
        </h3>
        <div className="overflow-x-auto rounded-xl overflow-hidden shadow">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#00588b] text-white">
                <th className="px-4 py-2.5 text-left">Course Name</th>
                <th className="px-4 py-2.5 text-center w-24">Credits</th>
              </tr>
            </thead>
            <tbody>
              {data.valueAddedCourses?.map((c, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-yellow-50"}>
                  <td className="px-4 py-2.5 text-gray-700">{c.name}</td>
                  <td className="px-4 py-2.5 text-center font-extrabold text-[#00588b]">{c.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-8 italic">{data.outroNote}</p>

      {/* Semester Accordions */}
      <div className="grid md:grid-cols-2 gap-3">
        {data.semesters?.map(sem => <AccordionItem key={sem} title={sem} />)}
      </div>
    </section>
  );
}

export function CourseDeptSlider({ data, slides }) {
  // Accept either `data` (full section obj with title/subtitle + slides key) or raw `slides` array
  const slideData = slides || data?.slides || data;
  const sectionTitle = data?.sectionTitle || "Explore Our Department";
  const subtitle = data?.subtitle || "Discover what makes our department exceptional";
  const bgImage = data?.bgImage || BG2;

  if (!slideData) return null;

  return (
    <section
      className="relative py-20"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-white/93" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <SectionTitle subtitle={subtitle}>{sectionTitle}</SectionTitle>
        <DeptSlider slides={slideData} />
      </div>
    </section>
  );
}
