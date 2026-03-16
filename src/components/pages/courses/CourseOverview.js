"use client";
import React from "react";
import { Code2, Database, Network, Brain } from "lucide-react";

// Map icon name strings from JSON → lucide components
const ICON_MAP = { Code2, Database, Network, Brain };

function SectionTitle({ children, subtitle, center = true }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <h2 className={`text-3xl md:text-4xl font-extrabold mb-2 text-[#00588b]`}>{children}</h2>
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

export default function CourseOverview({ data }) {
  if (!data) return null;

  return (
    <section id="overview" className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        {/* Left — text */}
        <div>
          <SectionTitle center={false} subtitle={data.subtitle}>
            {data.sectionTitle}
          </SectionTitle>
          {data.paragraphs?.map((p, i) => (
            <p key={i} className="text-gray-600 leading-relaxed mb-4 text-sm">{p}</p>
          ))}
          <div className="flex flex-wrap gap-3 mt-2">
            {data.tags?.map((tag, i) => (
              <span key={i} className="bg-[#00588b]/10 text-[#00588b] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#00588b]/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right — 2×2 icon grid */}
        <div className="grid grid-cols-2 gap-4">
          {data.gridCards?.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Code2;
            return (
              <div key={i} className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-[#00588b]/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#00588b] transition-colors">
                  <Icon size={22} className="text-[#00588b] group-hover:text-white transition-colors" />
                </div>
                <div className="font-bold text-[#00588b] text-sm">{item.label}</div>
                <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
