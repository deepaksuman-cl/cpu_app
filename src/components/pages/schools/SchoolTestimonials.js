"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export default function SchoolTestimonials({ data }) {
  const [active, setActive] = useState(0);
  if (!data) return null;
  const { list, title, label } = data;

  const next = () => setActive(p => (p + 1) % list.length);
  const prev = () => setActive(p => (p - 1 + list.length) % list.length);

  return (
    <section className="py-24 overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0d3060] to-[#00588b]">
      <div className="max-w-6xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-4 text-[#ffb900] bg-[#ffb900]/12 border border-[#ffb900]/30">
            {label}
          </span>
          <h2 className="font-black text-white" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            {title.main.split(title.highlight)[0]}
            <span className="text-[#ffb900]">{title.highlight}</span>
            {title.main.split(title.highlight)[1]}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Nav buttons hidden on mobile, shown on desktop sides */}
          <div className="hidden lg:flex flex-col items-center gap-6">
            <button onClick={prev} className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 bg-white/10 text-white hover:scale-110 transition-transform">
              <ChevronLeft size={24} />
            </button>
          </div>

          <div className="lg:col-span-3 overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${active * 100}%)` }}>
              {list.map((t, i) => (
                <div key={i} className="min-w-full">
                  <div className="rounded-2xl overflow-hidden bg-white/7 border border-white/12">
                    <div className="h-1 bg-gradient-to-r from-[#ffb900] to-orange-500" />
                    <div className="p-8">
                      <Quote className="w-9 h-9 mb-5 text-[#ffb900] opacity-40" />
                      <p className="text-base lg:text-lg leading-relaxed mb-8 text-white/85">"{t.text}"</p>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-[#ffb900]/35 flex-shrink-0">
                            <img src={t.photo} alt={t.name} className="w-full h-full object-cover object-top" />
                          </div>
                          <div>
                            <div className="font-bold text-white text-base">{t.name}</div>
                            <div className="text-sm mt-0.5 text-slate-400">{t.batch} · {t.company}</div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <Star key={j} className="w-5 h-5 fill-current text-[#ffb900]" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center gap-6">
            <button onClick={next} className="w-12 h-12 rounded-full flex items-center justify-center bg-[#ffb900] text-[#0a1628] border-none hover:scale-110 transition-transform">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex lg:hidden justify-center gap-4 mt-8">
           <button onClick={prev} className="w-11 h-11 rounded-full flex items-center justify-center border border-white/20 bg-white/10 text-white"><ChevronLeft size={20} /></button>
           <button onClick={next} className="w-11 h-11 rounded-full flex items-center justify-center bg-[#ffb900] text-[#0a1628] border-none"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  );
}
