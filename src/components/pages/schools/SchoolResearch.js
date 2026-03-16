"use client";
import React from "react";
import * as LucideIcons from "lucide-react";

export default function SchoolResearch({ data }) {
  if (!data) return null;
  const { gallery, stats, title, label } = data;

  return (
    <section id="research" className="py-24 bg-gradient-to-br from-[#001f33] to-[#00588b]">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 text-[#ffb900] border border-[#ffb900]/30 bg-[#ffb900]/10">
            {label}
          </span>
          <h2 className="font-black text-white mt-1" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            {title.main.split(title.highlight)[0]}
            <span className="text-[#ffb900]">{title.highlight}</span>
            {title.main.split(title.highlight)[1]}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {gallery?.map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 border-2 border-white/10 aspect-[16/10]">
              <img src={src} alt="Research" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats?.map((r, i) => {
            const Icon = LucideIcons[r.icon] || LucideIcons.Award;
            return (
              <div key={i} className="rounded-2xl p-8 text-center transition-transform hover:-translate-y-1 bg-white/7 border border-white/12">
                <div className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center bg-[#ffb900]/18">
                  <Icon className="w-7 h-7 text-[#ffb900]" />
                </div>
                <div className="font-black text-white text-[2.4rem] leading-none" style={{ fontFamily: "Georgia,serif" }}>{r.value}</div>
                <div className="text-sm mt-2 text-blue-200">{r.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
