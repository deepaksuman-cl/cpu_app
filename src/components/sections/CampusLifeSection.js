"use client";
import { ArrowRight, ChevronRight } from "lucide-react";
import HOME_DATA from "../../data/home.json";

export default function CampusLifeSection() {
  return (
    <section id="campus" className="bg-blue-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-9 px-4">
        <div className="text-center mb-2.5">
          <p className="text-[#00588b] font-bold text-xs uppercase tracking-[.18em]">
            Engage, Connect and Experience
          </p>
        </div>
        <h2 className="text-center font-black text-3xl text-gray-900 mt-1.5">
          the vibrant <span className="bg-blue-100 rounded-lg px-3.5 py-0.5">Life at CPU</span>
        </h2>
        <div className="flex justify-center gap-12 flex-wrap mt-7">
          {[
            { v: "150+", l: "Acres Green Campus" },
            { v: "300+", l: "Labs" },
            { v: "250+", l: "Smart Classrooms" },
            { v: "30+", l: "Annual Events" },
            { v: "25+", l: "Student Clubs" },
          ].map(({ v, l }, i) => (
            <div key={i} className="text-center">
              <div className="font-black text-4xl text-[#00588b] leading-none">{v}</div>
              <div className="text-xs text-gray-500 mt-1.5 max-w-[90px] leading-snug">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="[@media(max-width:476px)]:block grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {HOME_DATA.campusCols.map((col, i) => (
          <div
            key={i}
            className="campus-col relative overflow-hidden cursor-pointer flex-1 group"
          >
            <img
              src={col.img}
              alt={col.bold}
              className="w-full h-[500px] object-cover block group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-[#002848]/85 group-hover:bg-gradient-to-b group-hover:from-black/20 group-hover:to-[#002848]/95 transition-all duration-300" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div className="mb-3.5">
                <p className="text-white/80 text-xs font-medium">{col.title}</p>
                <p className="text-white font-black text-xl leading-tight mb-1.5 inline-flex items-center gap-1">
                  {col.bold} <ArrowRight size={16} />
                </p>
              </div>
              <div className="flex flex-col gap-0.5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {col.links.map((link, li) => (
                  <a
                    key={li}
                    href="#campus"
                    className="flex items-center gap-1.5 text-white/88 text-[12.5px] no-underline py-0.5 hover:text-amber-400 transition-colors"
                  >
                    <ChevronRight size={10} className="flex-shrink-0" /> {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
