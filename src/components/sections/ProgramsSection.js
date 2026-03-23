"use client";
import { ArrowRight } from "lucide-react";
import HOME_DATA from "../../data/home.json";

export default function ProgramsSection() {
  return (
    <>
      <section id="programs" className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-black text-3xl text-gray-900 mb-8">
            Explore Our <span className="text-[#00588b]">70+ Programs</span> — Start Your
            Future-ready Career
          </h2>
          <div className="grid grid-cols-2 [@media(max-width:476px)]:grid-cols-1 md:grid-cols-4 gap-4">
            {HOME_DATA.programCards.map((card) => (
              <div key={card.label} className="relative overflow-hidden rounded-xl cursor-pointer group">
                <img
                  src={card.image}
                  alt={card.label}
                  className="block w-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
                <div className="bg-[#00588b] text-white px-4 py-3.5 flex items-center justify-between">
                  <span className="font-bold text-md">{card.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm opacity-85">{card.count}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="bg-gradient-to-br from-[#00588b] to-[#003a5c] text-white border-none rounded-full px-7 py-3 font-bold text-sm cursor-pointer inline-flex items-center gap-1.5 hover:scale-105 transition-transform">
              View All Programs <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
      <div className="h-1 bg-gradient-to-r from-[#00588b] via-amber-400 to-[#00588b]" />
    </>
  );
}
