"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SchoolAlumni({ data }) {
  const [active, setActive] = useState(0);
  const [perPage, setPerPage] = useState(4);

  if (!data) return null;
  const { list, title, label } = data;
  const pages = Math.ceil(list.length / perPage);

  useEffect(() => {
    const calc = () => setPerPage(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const go = (i) => setActive(i);
  const prev = () => go((active - 1 + pages) % pages);
  const next = () => go((active + 1) % pages);

  const cardW = 100 / perPage;

  return (
    <section id="alumni" className="py-24 overflow-hidden bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 text-[#00588b] border border-[#00588b]/20 bg-[#00588b]/8">
            {label}
          </span>
          <h2 className="font-black mt-1 text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            {title.split('Impact')[0]} <span className="text-[#00588b]">Impact</span> Globally
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${active * 100}%)` }}>
              {list.map((a, j) => (
                <div key={j} className="flex-shrink-0 px-3" style={{ width: `${cardW}%` }}>
                  <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-[0_4px_16px_rgba(0,88,139,0.07)] transition-all hover:-translate-y-2 hover:shadow-xl">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img src={a.img} alt={a.name} className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105" />
                    </div>
                    <div className="p-4 text-center border-t-[3px] border-[#00588b]">
                      <h4 className="font-bold text-sm text-[#0a1628]">{a.name}</h4>
                      <p className="text-xs mt-1 font-medium text-[#00588b]">{a.role}</p>
                      <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold bg-[#00588b]/8 text-[#00588b]">
                        {a.company}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white text-[#00588b] border border-slate-200 shadow-lg hover:scale-110 transition-transform">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-[#00588b] text-white border-none shadow-lg hover:scale-110 transition-transform">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => go(i)} className={`h-2.5 rounded-full transition-all border-none cursor-pointer ${active === i ? "bg-[#00588b] w-7" : "bg-slate-300 w-2.5"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
