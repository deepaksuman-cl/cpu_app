"use client";
import { ArrowRight } from "lucide-react";
import Swiper from "../ui/Swiper";
import HOME_DATA from "../../data/home.json";

export default function PlacementSection() {
  return (
    <section
      id="placement"
      className="bg-gradient-to-br from-[#00588b] to-[#003a5c] py-24 px-4 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(80px,14vw,200px)] font-black text-white/5 whitespace-nowrap pointer-events-none select-none">
        placements
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="font-bold text-3xl text-white/85 m-0 mb-1 leading-snug">
            Empower Your Future through Exceptional
          </h2>
          <div className="flex items-center gap-3.5 flex-wrap">
            <span className="bg-white/15 backdrop-blur border border-white/20 rounded-xl px-4 py-1 font-black text-4xl text-amber-400">
              Placement
            </span>
            <span className="font-bold text-4xl text-white">Opportunities at CPU</span>
            <ArrowRight size={28} className="text-amber-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="grid grid-cols-3 gap-0.5 rounded-2xl h-[100%] overflow-hidden shadow-2xl">
            {HOME_DATA.placementStats.map(({ val, label }, i) => (
              <div
                key={i}
                className={`px-4 py-8 flex justify-center items-center text-center ${
                  i < 3 ? "bg-[#003252]" : "bg-[#002340]"
                } border-r border-white/6`}
              >
                <div className="h-auto">
                  <div className="text-amber-400 font-black text-2xl xl:text-3xl leading-none">
                    {val}
                  </div>
                  <div className="text-white/75 text-xs mt-2">{label}</div>
                </div>
              </div>
            ))}
          </div>
          <Swiper
            items={HOME_DATA.placementSlides}
            perView={2}
            gap={20}
            autoInterval={4000}
            dark={true}
            breakpoints={{ 0: 1, 768: 2 }}
            renderSlide={(slide) => (
              <div className="rounded-2xl overflow-hidden relative h-[360px] sm:h-[400px] shadow-2xl group">
                <img
                  src={slide.img}
                  alt={slide.name}
                  className="w-full h-full object-cover object-top block group-hover:scale-105 transition-transform duration-400"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/85" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <div className="font-extrabold text-[13px] text-white">
                    {slide.name}
                  </div>
                  <div className="text-[11px] text-white/70 mt-0.5 mb-2">
                    {slide.course}
                  </div>
                  <span className="bg-amber-400 text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded">
                    {slide.company}
                  </span>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
