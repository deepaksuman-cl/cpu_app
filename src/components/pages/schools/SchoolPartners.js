"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SchoolPartners({ data }) {
  const [active, setActive] = useState(0);
  const [perPage, setPerPage] = useState(6);

  if (!data) return null;
  const { partners, title, label } = data;
  const pages = Math.ceil(partners.length / perPage);

  useEffect(() => {
    const calc = () => setPerPage(window.innerWidth < 640 ? 3 : window.innerWidth < 1024 ? 4 : 6);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const next = () => setActive(p => (p + 1) % pages);
  const prev = () => setActive(p => (p - 1 + pages) % pages);

  return (
    <section id="industry" className="py-20 bg-white border-t border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 text-[#00588b] border border-[#00588b]/20 bg-[#00588b]/8">
            {label}
          </span>
          <h2 className="font-black mt-1 text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            Industry <span className="text-[#00588b]">Tie Up's</span>
          </h2>
        </div>

        <div className="overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${active * 100}%)` }}>
            {Array.from({ length: pages }).map((_, pi) => (
              <div key={pi} className="min-w-full grid gap-4" style={{ gridTemplateColumns: `repeat(${perPage}, 1fr)` }}>
                {partners.slice(pi * perPage, pi * perPage + perPage).map((logo, j) => (
                  <div key={j} className="flex items-center justify-center rounded-2xl bg-white h-[84px] px-4 py-3 border-[1.5px] border-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <img src={logo.url} alt={logo.name} className="max-h-12 max-w-full object-contain" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
           <button onClick={prev} className="w-10 h-10 rounded-full flex items-center justify-center border border-[#00588b]/15 bg-[#00588b]/8 text-[#00588b] hover:scale-110 transition-transform">
             <ChevronLeft size={18} />
           </button>
           <div className="flex gap-2">
             {Array.from({ length: pages }).map((_, i) => (
               <button key={i} onClick={() => setActive(i)} className={`h-2.5 rounded-full transition-all border-none ${active === i ? "bg-[#00588b] w-7" : "bg-slate-300 w-2.5"}`} />
             ))}
           </div>
           <button onClick={next} className="w-10 h-10 rounded-full flex items-center justify-center bg-[#00588b] text-white border-none hover:scale-110 transition-transform">
             <ChevronRight size={18} />
           </button>
        </div>
      </div>
    </section>
  );
}
