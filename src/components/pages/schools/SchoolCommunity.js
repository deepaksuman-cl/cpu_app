"use client";
import React, { useState } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import StructuredTitle from "@/components/common/StructuredTitle";

export default function SchoolCommunity({ data }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  if (!data) return null;
  const { gallery, description, title, label } = data;

  return (
    <section id="community" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 text-[#00588b] border border-[#00588b]/20 bg-[#00588b]/8">
            {label}
          </span>
          <h2 className="font-black mt-1 text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            <StructuredTitle title={title} highlightClass="text-[#00588b]" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-4">
            {description?.map((p, i) => (
              <div 
                key={i} 
                className="text-base leading-relaxed text-slate-500 prose prose-slate prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {gallery?.map((img, i) => (
              <div key={i} className="relative group rounded-2xl overflow-hidden cursor-pointer border border-slate-200 aspect-[4/3]" onClick={() => setLightboxIdx(i)}>
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-[#00588b]/55 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={32} className="text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs font-semibold text-white bg-gradient-to-t from-black/60 to-transparent">
                  {img.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4" onClick={() => setLightboxIdx(null)}>
          <button className="absolute top-8 right-8 text-white p-2" onClick={() => setLightboxIdx(null)}><X size={32} /></button>
          <img src={gallery[lightboxIdx].src} className="max-w-full max-h-[80vh] rounded-xl" />
        </div>
      )}
    </section>
  );
}
