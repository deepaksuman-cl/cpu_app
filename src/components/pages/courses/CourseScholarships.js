"use client";
import React from "react";
import { Award, Info } from "lucide-react";
import StructuredTitle from "@/components/common/StructuredTitle";

function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">
        <StructuredTitle title={children} highlightClass="text-[#ffb900]" />
      </h2>
      {subtitle && <p className="text-lg max-w-2xl mx-auto text-blue-200">{subtitle}</p>}
      <div className="flex gap-1 mt-3 justify-center">
        <div className="h-1 w-14 rounded-full bg-[#ffb900]" />
        <div className="h-1 w-5 rounded-full bg-[#00588b]" />
        <div className="h-1 w-2 rounded-full bg-[#ffb900]" />
      </div>
    </div>
  );
}

export default function CourseScholarships({ data }) {
  if (!data) return null;
  const { sectionTitle, subtitle, bgImage, dateHeaders, rows, earlyBird, notes } = data;

  return (
    <section
      className="relative py-20"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-[#00588b]/93" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <SectionTitle subtitle={subtitle}>{sectionTitle}</SectionTitle>

        {/* Scholarship Table */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl mb-12">
          <div className="bg-[#ffb900] px-5 py-4 font-extrabold text-[#00588b] flex items-center gap-2 border-b border-[#00588b]/10">
            <Award size={20} className="text-[#00588b]" /> Scholarship on Tuition Fees
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-[#00588b]/5">
                  <th className="px-6 py-4 text-left text-[#00588b] font-black uppercase tracking-wider">Scholarship Slab</th>
                  {dateHeaders?.map((d, i) => (
                    <th key={i} className="px-4 py-4 text-center text-[#00588b] font-black text-xs uppercase tracking-wider">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows?.map((row, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800 border-r border-gray-100">{row.range}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="px-4 py-4 text-center font-black text-[#00588b] text-base">{v}</td>
                    ))}
                  </tr>
                ))}
                {earlyBird && earlyBird.label && (
                  <tr className="bg-[#ffb900]/10 border-t-2 border-[#ffb900]/30 shadow-inner">
                    <td className="px-6 py-4 font-black text-[#00588b] uppercase tracking-tighter italic">{earlyBird.label}</td>
                    {earlyBird.values.map((v, j) => (
                      <td key={j} className="px-4 py-4 text-center font-black text-[#00588b] text-base">{v}</td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes */}
        {notes && notes.length > 0 && (
          <div className="bg-[#001f33]/40 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-2xl">
            <h4 className="font-black text-[#ffb900] mb-8 flex items-center gap-3 text-lg uppercase tracking-widest">
              <div className="w-8 h-8 rounded-lg bg-[#ffb900]/20 flex items-center justify-center">
                <Info size={18} />
              </div>
              Important Notes:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {notes.map((note, i) => {
                const isString = typeof note === 'string';
                const Icon = !isString && LucideIcons[note.icon] ? LucideIcons[note.icon] : Info;
                return (
                  <div key={i} className="flex items-start gap-4 group p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#ffb900]/15 flex items-center justify-center flex-shrink-0 text-[#ffb900] group-hover:scale-110 transition-transform">
                      {isString ? <span className="font-black text-xs">{i + 1}</span> : <Icon size={20} />}
                    </div>
                    <div className="text-blue-100/90 text-[20px] leading-relaxed font-medium">
                      {isString ? note : note.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

import * as LucideIcons from "lucide-react";
