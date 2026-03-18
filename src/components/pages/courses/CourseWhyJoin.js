"use client";
import React from "react";
import * as LucideIcons from "lucide-react";
import {
  TrendingUp, Briefcase, BookOpen, Target, Brain,
  Users, Globe, Building2,
} from "lucide-react";

import StructuredTitle from "@/components/common/StructuredTitle";


function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#00588b]">
        <StructuredTitle title={children} />
      </h2>
      {subtitle && <p className="text-sm max-w-2xl mx-auto text-gray-500">{subtitle}</p>}
      <div className="flex gap-1 mt-3 justify-center">
        <div className="h-1 w-14 rounded-full bg-[#ffb900]" />
        <div className="h-1 w-5 rounded-full bg-[#00588b]" />
        <div className="h-1 w-2 rounded-full bg-[#ffb900]" />
      </div>
    </div>
  );
}

export default function CourseWhyJoin({ data }) {
  if (!data) return null;
  const { sectionTitle, subtitle, reasons } = data;

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <SectionTitle subtitle={subtitle}>{sectionTitle}</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons?.map((reason, i) => {
          const Icon = LucideIcons[reason.icon] || Brain;
          return (
            <div
              key={i}
              className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00588b] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 bg-[#00588b]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#00588b] transition-colors">
                <Icon size={22} className="text-[#00588b] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[#00588b] font-extrabold text-sm mb-2">{reason.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{reason.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
