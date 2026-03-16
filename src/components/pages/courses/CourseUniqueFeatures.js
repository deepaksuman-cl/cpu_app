"use client";
import React from "react";
import { Users, Globe, Brain, Building2 } from "lucide-react";

const ICON_MAP = { Users, Globe, Brain, Building2 };

function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#00588b]">{children}</h2>
      {subtitle && <p className="text-sm max-w-2xl mx-auto text-gray-500">{subtitle}</p>}
      <div className="flex gap-1 mt-3 justify-center">
        <div className="h-1 w-14 rounded-full bg-[#ffb900]" />
        <div className="h-1 w-5 rounded-full bg-[#00588b]" />
        <div className="h-1 w-2 rounded-full bg-[#ffb900]" />
      </div>
    </div>
  );
}

export default function CourseUniqueFeatures({ data }) {
  if (!data) return null;
  const { sectionTitle, subtitle, bgImage, features } = data;

  return (
    <section
      className="relative py-20"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center 30%" }}
    >
      <div className="absolute inset-0 bg-white/94" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <SectionTitle subtitle={subtitle}>{sectionTitle}</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features?.map((feat, i) => {
            const Icon = ICON_MAP[feat.icon] || Users;
            return (
              <div
                key={i}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all overflow-hidden"
              >
                <div className="absolute top-3 right-4 text-6xl font-black text-[#00588b]/5 group-hover:text-[#ffb900]/15 transition-colors select-none">
                  {feat.num}
                </div>
                <div className="w-12 h-12 bg-[#00588b]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#00588b] transition-colors">
                  <Icon size={22} className="text-[#00588b] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[#00588b] font-extrabold mb-2 text-sm">{feat.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
