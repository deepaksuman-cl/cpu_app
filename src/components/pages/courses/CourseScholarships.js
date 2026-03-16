"use client";
import React from "react";
import { Award, Info } from "lucide-react";

function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">{children}</h2>
      {subtitle && <p className="text-sm max-w-2xl mx-auto text-blue-200">{subtitle}</p>}
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
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl mb-8">
          <div className="bg-[#ffb900] px-5 py-3 font-extrabold text-[#00588b] flex items-center gap-2">
            <Award size={18} /> Scholarship on Tuition Fees
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[540px]">
              <thead>
                <tr className="bg-[#00588b]/8">
                  <th className="px-4 py-3 text-left text-[#00588b] font-extrabold">% in Graduation</th>
                  {dateHeaders?.map((d, i) => (
                    <th key={i} className="px-3 py-3 text-center text-[#00588b] font-extrabold text-xs">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows?.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-blue-50/50"}>
                    <td className="px-4 py-3 font-bold text-gray-700">{row.range}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="px-3 py-3 text-center font-extrabold text-[#ffb900]">{v}</td>
                    ))}
                  </tr>
                ))}
                {earlyBird && (
                  <tr className="bg-[#ffb900]/15 border-t-2 border-[#ffb900]">
                    <td className="px-4 py-3 font-bold text-[#00588b] text-xs">{earlyBird.label}</td>
                    {earlyBird.values.map((v, j) => (
                      <td key={j} className="px-3 py-3 text-center font-extrabold text-[#00588b]">{v}</td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6">
            <h4 className="font-extrabold text-[#ffb900] mb-4 flex items-center gap-2">
              <Info size={18} /> Notes:
            </h4>
            <ul className="space-y-2">
              {notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-blue-100 text-sm">
                  <span className="text-[#ffb900] font-black flex-shrink-0 mt-0.5">{i + 1}.</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
