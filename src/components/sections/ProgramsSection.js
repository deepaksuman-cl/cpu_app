"use client";
import { ArrowRight } from "lucide-react";

export default function ProgramsSection({ data }) {
  const cards = data?.cards || [];
  if (cards.length === 0) return null;

  return (
    <>
      <section id="programs" className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#00588b] font-bold text-xs uppercase tracking-[.18em] mb-2">
            {data?.tagline || "ONE OF THE"}
          </p>
          <h2 className="font-black text-3xl md:text-5xl text-gray-900 mb-8">
            {data?.title || "Explore Our"} <span className="text-[#00588b]">{data?.highlight || "70+ Programs"}</span>
          </h2>
          <div className="grid grid-cols-2 [@media(max-width:376px)]:grid-cols-1 md:grid-cols-5 gap-4">
            {cards.map((card) => (
              <a 
                key={card.label} 
                href={card.link || "#"}
                className="bg-[#eff6ff] relative overflow-hidden rounded-xl cursor-pointer group no-underline block"
              >
                <img
                  src={card.image}
                  alt={card.label}
                  className="block w-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
                <div className="bg-[#00588b] text-white px-4 py-3.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-md block">{card.label}</span>
                     <span className="text-sm opacity-85 block">{card.count}</span>
                  </div>
              
                  <div className="flex items-center gap-2">
                   
                    <ArrowRight size={14} />
                  </div>
                </div>
              </a>
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
