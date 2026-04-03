"use client";
import React from "react";
import * as LucideIcons from "lucide-react";
import { ChevronRight } from "lucide-react";
import StructuredTitle from "@/components/common/StructuredTitle";
import RichTextRenderer from "@/components/common/RichTextRenderer";

export default function SchoolAbout({ data }) {
  if (!data) return null;
  const { vision, mission } = data;

  const VisionIcon = (vision?.icon && LucideIcons[vision.icon]) ? LucideIcons[vision.icon] : LucideIcons.Target;
  const MissionIcon = (mission?.icon && LucideIcons[mission.icon]) ? LucideIcons[mission.icon] : LucideIcons.Lightbulb;

  return (
    <section id="about" className="py-0 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
        {/* Vision */}
        <div className="relative flex flex-col justify-center px-10 lg:px-16 py-16 bg-gradient-to-br from-[#0a1628] to-[#0d2545]">
          <div className="dot-bg absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle,rgba(0,88,139,.12) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10 pointer-events-none bg-[#00588b] blur-[60px]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#00588b]/40 border border-[#00588b]/60">
                <VisionIcon className="w-6 h-6 text-sky-300" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-[#ffb900]">{vision.label}</p>
                <h3 className="font-black text-white text-2xl" style={{ fontFamily: "Georgia,serif" }}>
                  <StructuredTitle title={vision.title} highlightClass="text-sky-300" />
                </h3>
              </div>
            </div>
            <div className="w-12 h-1 rounded-full mb-6 bg-gradient-to-r from-[#ffb900] to-orange-500" />
            <RichTextRenderer 
              content={vision.text} 
              useProse={vision.useProse !== false}
              className="text-base leading-relaxed text-white/75" 
            />
            <div className="flex flex-wrap gap-3 mt-8">
              {vision.highlights?.map((h, i) => (
                <div key={i} className="rounded-xl px-4 py-2 text-center bg-white/7 border border-white/12">
                  <div className="font-black text-lg text-[#ffb900]">{h.value}</div>
                  <div className="text-xs text-white/50">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="relative flex flex-col justify-center px-10 lg:px-16 py-16 bg-white">
          <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-5 pointer-events-none bg-[#00588b] blur-[60px] translate-x-[30%] -translate-y-[30%]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#ffb900]/12 border border-[#ffb900]/25">
                <MissionIcon className="w-6 h-6 text-[#ffb900]" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-[#00588b]">{mission.label}</p>
                <h3 className="font-black text-2xl text-[#0a1628]" style={{ fontFamily: "Georgia,serif" }}>
                  <StructuredTitle title={mission.title} highlightClass="text-[#00588b]" />
                </h3>
              </div>
            </div>
            <div className="w-12 h-1 rounded-full mb-6 bg-gradient-to-r from-[#00588b] to-[#007abf]" />
            <RichTextRenderer 
              content={mission.points?.join('')} 
              useProse={mission.useProse !== false}
              className="text-sm leading-relaxed text-slate-600" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
