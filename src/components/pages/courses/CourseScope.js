"use client";
import React from "react";

import StructuredTitle from "@/components/common/StructuredTitle";

function SectionTitle({ children, subtitle, light = false }) {
  return (
    <div className="mb-10 text-center">
      <h2 className={`text-3xl md:text-4xl font-extrabold mb-2 ${light ? "text-white" : "text-[#00588b]"}`}>
        <StructuredTitle title={children} highlightClass={light ? "text-[#ffb900]" : "text-[#00588b]"} />
      </h2>
      {subtitle && (
        <p className={`text-sm max-w-2xl mx-auto ${light ? "text-blue-200" : "text-gray-500"}`}>{subtitle}</p>
      )}
      <div className="flex gap-1 mt-3 justify-center">
        <div className="h-1 w-14 rounded-full bg-[#ffb900]" />
        <div className="h-1 w-5 rounded-full bg-[#00588b]" />
        <div className="h-1 w-2 rounded-full bg-[#ffb900]" />
      </div>
    </div>
  );
}

export default function CourseScope({ data }) {
  if (!data) return null;

  return (
    <section
      className="relative py-20"
      style={{
        backgroundImage: `url(${data.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#00588b]/92" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <SectionTitle light subtitle={data.subtitle}>
          {data.sectionTitle}
        </SectionTitle>
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
          <div 
            className="text-blue-100 text-sm leading-relaxed prose prose-invert prose-sm max-w-none" 
            dangerouslySetInnerHTML={{ __html: data.body }} 
          />
        </div>
      </div>
    </section>
  );
}
