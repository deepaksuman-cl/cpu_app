"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StructuredTitle from "@/components/common/StructuredTitle";

export default function SchoolPlacements({ data }) {
  const [active, setActive] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const timer = useRef(null);

  if (!data || !data.list || !Array.isArray(data.list) || data.list.length === 0) return null;
  const { list, title, label, subtitle } = data;
  const pages = Math.ceil(list.length / perPage);

  useEffect(() => {
    const calc = () => setPerPage(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const startAuto = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setActive(p => (p + 1) % pages);
    }, 3000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(timer.current);
  }, [pages]);

  const go = (i) => { setActive(i); startAuto(); };
  const prev = () => go((active - 1 + pages) % pages);
  const next = () => go((active + 1) % pages);

  const cardW = 100 / perPage;

  return (
    <section id="placement" className="py-20 overflow-hidden bg-[#f0f6fb]">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 text-[#00588b] border border-[#00588b]/20 bg-[#00588b]/8">
            {label}
          </span>
          <h2 className="font-black mt-1 text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            <StructuredTitle title={title} highlightClass="text-[#00588b]" />
          </h2>
          <p className="text-slate-500 text-sm mt-3">{subtitle}</p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${active * 100}%)` }}>
              {list.map((p, j) => (
                <div key={j} className="flex-shrink-0 px-2.5" style={{ width: `${cardW}%` }}>
                  <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#f8fbff] to-[#dbeafe] border border-[#dde8f5] shadow-[0_4px_16px_rgba(0,88,139,0.08)] transition-all hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative aspect-[3/4]">
                      <img src={p.img || p.image} alt={p.name} className="w-full" />
                      {/* Only show overlay and text if at least one field exists */}
                      {(p.name || p.company || p.pkg) && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                          {p.name && <p className="text-white font-black text-sm">{p.name}</p>}
                          {p.company && <p className="text-[#ffb900] text-xs font-bold leading-tight">{p.company}</p>}
                          {p.pkg && <p className="text-sky-300 text-[10px] font-black uppercase mt-1 tracking-widest">{p.pkg} LPA</p>}
                        </div>
                      )}
                      <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#ffb900] rounded-tl" />
                      <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#00588b] rounded-br" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white text-[#00588b] border border-[#dde8f5] shadow-lg hover:scale-110 transition-transform">
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
