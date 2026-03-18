"use client";
import React from "react";
import StructuredTitle from "@/components/common/StructuredTitle";

export default function SchoolInfrastructure({ data }) {
  if (!data) return null;
  const { list, title, label } = data;

  return (
    <section id="infra" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 text-[#00588b] border border-[#00588b]/20 bg-[#00588b]/8">
            {label}
          </span>
          <h2 className="font-black mt-1 text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            <StructuredTitle title={title} highlightClass="text-[#00588b]" />
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((item, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden bg-white transition-transform hover:-translate-y-1.5 border border-slate-200 shadow-[0_4px_16px_rgba(0,88,139,0.07)]">
              <div className="overflow-hidden aspect-[16/9]">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-sm mb-1.5 text-[#0a1628]">{item.title}</h4>
                <p className="text-xs leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
