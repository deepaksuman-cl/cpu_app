"use client";
import React from "react";
import * as LucideIcons from "lucide-react";

export default function SchoolStats({ data }) {
  if (!data || !data.length) return null;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {data.map((s, i) => {
          const Icon = (s.icon && LucideIcons[s.icon]) ? LucideIcons[s.icon] : LucideIcons.BarChart3;
          return (
            <div key={i} className={`rounded-2xl p-7 flex items-center gap-5 transition-transform hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(0,88,139,0.08)] ${
              i === 1 ? "bg-[#00588b] border border-[#00588b]" : "bg-white border border-slate-200"
            }`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${i === 1 ? "bg-[#ffb900]/18" : "bg-[#00588b]/7"}`}>
                <Icon className={`w-7 h-7 ${i === 1 ? "text-[#ffb900]" : "text-[#00588b]"}`} />
              </div>
              <div>
                <div className={`font-black text-[2rem] leading-none ${i === 1 ? "text-[#ffb900]" : "text-[#00588b]"}`} style={{ fontFamily: "Georgia,serif" }}>
                  {s.value}
                </div>
                <div className={`text-sm font-medium mt-1 ${i === 1 ? "text-[#bfe0f5]" : "text-slate-500"}`}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
