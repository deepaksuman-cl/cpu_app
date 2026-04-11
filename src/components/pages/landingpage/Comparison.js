"use client";
import React from "react";

const data = [
  {
    title: "Internships & Jobs",
    cpu: "Programme designed to make you internship-ready by Year 2 - backed by 250+ hiring partners.",
    other: "<25% students receive an internship by their 3rd year",
  },
  {
    title: "AI Tools & Learning",
    cpu: "12+ AI tools used in real projects from Semester 1 - ChatGPT, OpenAI API, LangChain, TensorFlow & more",
    other: "AI introduced only in Year 3–4 as a late elective, rarely applied to real projects",
  },
  {
    title: "Career Prep Start",
    cpu: "LeetCode, GitHub tracking, DSA bootcamps & mock interviews from Week 1, Year 1",
    other: "Placements and interview prep typically begin only in Year 3–4",
  },
  {
    title: "Projects & Portfolio",
    cpu: "15 portfolio-grade, deployed projects shipped across 4 years - recruiter-ready GitHub",
    other: "1–2 final-year projects, rarely deployed or production-grade",
  },
  {
    title: "Faculties & Curriculum",
    cpu: "Industry-relevant curriculum built and taught by experts from Google & Amazon",
    other: "Rarely updated curriculum, mostly academic-only faculty",
  },
  {
    title: "Curriculum",
    cpu: "Start coding and build real projects from Day 1",
    other: "Build real world projects only by the end of 3rd–4th year",
  },
  {
    title: "Entrepreneurship",
    cpu: "₹1 Cr StartX fund, expert mentors, coding events, GSOC, ICPC",
    other: "Good startup culture but mostly without funding support",
  },
  {
    title: "Industry Exposure",
    cpu: "Frequent sessions with tech leaders, CTOs, VCs and startup founders",
    other: "Industry exposure limited to top students only",
  },
];

export default function Comparison() {
  return (
    <section className="relative py-16 overflow-hidden">

      {/* 🔥 Background (Grid + Gradient) */}
      <div className="absolute inset-0 bg-[#0f347c]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-white text-2xl md:text-4xl font-extrabold mb-2">
            CPU Curated vs Traditional College Experience
          </h2>
          <p className="text-blue-100 text-sm md:text-base">
            Why is CPU Curated experience better than traditional colleges?
          </p>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10">

          {/* Header Row */}
          <div className="grid grid-cols-3 text-center text-sm md:text-base font-semibold">
            <div className="p-4"></div>

            <div className="p-4 bg-yellow-400 text-black font-bold">
              Career Point University
            </div>

            <div className="p-4 text-white">
              Other Colleges
            </div>
          </div>

          {/* Rows */}
          {data.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-3 text-xs md:text-sm border-t border-white/10"
            >
              {/* Label */}
              <div className="p-4 text-white font-semibold bg-white/5">
                {item.title}
              </div>

              {/* CPU */}
              <div className="p-4 bg-yellow-400 text-black flex gap-2">
                👍 <span>{item.cpu}</span>
              </div>

              {/* Other */}
              <div className="p-4 text-blue-100 flex gap-2">
                👎 <span>{item.other}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}