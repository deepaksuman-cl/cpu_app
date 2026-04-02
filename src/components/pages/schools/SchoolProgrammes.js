"use client";
import RichTextRenderer from "@/components/common/RichTextRenderer";
import StructuredTitle from "@/components/common/StructuredTitle";
import * as Icons from "lucide-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

// Safer icon component for dynamic names
const DynamicIcon = ({ name, className, fallback = Icons.GraduationCap }) => {
  const IconComponent = Icons[name] || fallback;
  return <IconComponent className={className} />;
};

export default function SchoolProgrammes({ data, schoolSlug }) {
  const [activeTab, setActiveTab] = useState(0);
  
  if (!data || !data.levels || data.levels.length === 0) return null;

  const currentLevel = data.levels[activeTab];

  return (
    <section id="programs" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={data.bgImage || "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg"} alt="Campus" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#001e46]/93 to-[#003c78]/88" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-12">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-4 text-[#ffb900] bg-[#ffb900]/12 border border-[#ffb900]/30">
            {data.subtitle}
          </span>
          <h2 className="font-black text-white" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            <StructuredTitle title={data.title} highlightClass="text-[#ffb900]" />
          </h2>
          <RichTextRenderer 
            content={data.description} 
            useProse={data.useProse !== false}
            className="mt-3 max-w-2xl mx-auto text-sm lg:text-base leading-relaxed text-white" 
          />
        </div>

        <div className="rounded-3xl overflow-hidden bg-white/97 shadow-[0_32px_80px_rgba(0,0,0,0.45)]">
          <div className="h-1 bg-gradient-to-r from-[#00588b] via-[#ffb900] to-[#00588b]" />
          <div className="flex flex-col lg:flex-row min-h-[280px]">
            {/* Qualification tabs */}
            <div className="lg:w-80 flex-shrink-0 flex flex-col border-r border-[#f0f4f8]">
              <div className="px-6 pt-6 pb-3">
                <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Select Level</p>
              </div>
              {data.levels.map((level, i) => {
                const active = activeTab === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`w-full text-left px-6 py-5 cursor-pointer transition-all bg-transparent border-none flex items-center gap-4 ${
                      active ? "bg-gradient-to-r from-[#00588b]/7 to-[#00588b]/2 border-l-4 border-l-[#00588b]" : "border-l-4 border-l-transparent text-gray-600"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? "bg-[#00588b]/10" : "bg-[#00588b]/4"}`}>
                      <DynamicIcon name={level.icon} className={`w-5 h-5 ${active ? "text-[#00588b]" : "text-slate-400"}`} />
                    </div>
                    <span className={`text-sm font-semibold leading-snug ${active ? "text-[#00588b]" : ""}`}>
                      {level.label}
                    </span>
                    {active && <ChevronRight className="w-4 h-4 ml-auto text-[#00588b]" />}
                  </button>
                );
              })}
            </div>

            {/* Content per tab */}
            <div className="flex-1 px-8 py-8 overflow-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentLevel.courses?.map((course, ci) => {
                  // Determine the correct URL for the course
                  const hasRedirect = course.redirectUrl && course.redirectUrl.trim() !== "";
                  const isExternal = hasRedirect && course.redirectUrl.startsWith("http");
                  
                  const courseUrl = hasRedirect
                    ? (isExternal ? course.redirectUrl : (course.redirectUrl.startsWith("/") ? course.redirectUrl : `/${course.redirectUrl}`))
                    : `/schools/${schoolSlug}/${course.slug}`;

                  return (
                    <div key={ci} className="p-4 rounded-2xl bg-[#00588b]/4 border border-[#00588b]/10 group hover:border-[#00588b]/30 transition-colors">
                      <Link 
                        href={courseUrl} 
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-0.5 no-underline"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-[#00588b] transition-transform group-hover:translate-x-1" />
                        <ChevronRight className="w-3.5 h-3.5 text-[#00588b] -ml-2 transition-transform group-hover:translate-x-1" />
                        <span className="ml-1 font-semibold text-sm text-[#0a1628] group-hover:text-[#00588b] transition-colors">
                          {course.name}
                        </span>
                      </Link>

                      {course.duration && (
                        <div className="mt-1 flex items-center gap-1.5 px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-500 w-fit">
                          <DynamicIcon name="Clock" className="w-3 h-3" fallback={Icons.Clock} />
                          {course.duration}
                        </div>
                      )}
                      
                      {course.specializations?.length > 0 && Array.isArray(course.specializations) && (
                        <div className="mt-3 flex flex-wrap items-center gap-x-0.5 gap-y-1">
                          <span className="text-xs font-bold text-slate-700 mr-1 uppercase tracking-widest text-[10px]">Specializations:</span>
                          {course.specializations.map((sp, si) => {
                            if (!sp || typeof sp !== 'object') return null;
                            const specUrl = sp.slug ? `/schools/${schoolSlug}/${sp.slug}` : "#";
                            return (
                              <React.Fragment key={si}>
                                <Link href={specUrl} className="text-xs font-semibold text-[#00588b] hover:text-[#ffb900] transition-colors no-underline">
                                  {sp.name}
                                </Link>
                                {si < course.specializations.length - 1 && <span className="text-slate-400 text-xs mx-0.5">,</span>}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      )}
                      
                      {course.description && (
                        <p className="text-xs mt-2 text-slate-500 font-medium">{course.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}