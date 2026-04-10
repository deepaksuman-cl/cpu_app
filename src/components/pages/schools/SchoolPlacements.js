"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StructuredTitle from "@/components/common/StructuredTitle";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';

export default function SchoolPlacements({ data }) {
  const swiperRef = useRef(null);

  if (!data || !data.list || !Array.isArray(data.list) || data.list.length === 0) return null;
  const { list, title, label, subtitle } = data;

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

        <div 
          className="relative group/placement-slider"
          onMouseEnter={() => swiperRef.current?.autoplay.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay.start()}
        >
          <SwiperReact
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false
            }}
            navigation={{
              nextEl: '.placement-next',
              prevEl: '.placement-prev',
            }}
            pagination={{
              clickable: true,
              el: '.placement-pagination',
              bulletClass: 'placement-bullet',
              bulletActiveClass: 'placement-bullet-active',
              renderBullet: (index, className) => `<span class="${className}"></span>`
            }}
            breakpoints={{ 
              0: { slidesPerView: 1 }, 
              640: { slidesPerView: 2 }, 
              1024: { slidesPerView: 4 } 
            }}
            loop={list.length > 4}
            grabCursor={true}
          >
            {list.map((p, j) => (
              <SwiperSlide key={j} className="py-5">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#f8fbff] to-[#dbeafe] border border-[#dde8f5] shadow-[0_4px_16px_rgba(0,88,139,0.08)] transition-all hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative aspect-[3/4]">
                    <img src={p.img || p.image} alt={p.name} className="w-full h-full object-cover object-top" />
                    {(p.name || p.company || p.package || p.pkg || p.classOf || p.designation) && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end">
                        {p.name && <p className="text-white font-black text-sm">{p.name}</p>}
                        
                        {(p.designation || p.courseName || p.course) && (
                          <p className="text-white/80 text-[10px] font-bold leading-tight line-clamp-1">
                            {p.designation}{ (p.designation && (p.courseName || p.course)) ? ' | ' : ''}{p.courseName || p.course}
                          </p>
                        )}

                        {p.company && <p className="text-[#ffb900] text-xs font-black leading-tight mt-0.5">{p.company}</p>}
                        
                        <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/10">
                          {(p.package || p.pkg) && (
                            <p className="text-sky-300 text-[10px] font-black uppercase tracking-widest">{(p.package || p.pkg)} LPA</p>
                          )}
                          {p.classOf && (
                            <p className="text-white/60 text-[9px] font-bold uppercase tracking-tighter">Class of {p.classOf}</p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#ffb900] rounded-tl" />
                    <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#00588b] rounded-br" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperReact>

          <button className="placement-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white text-[#00588b] border border-[#dde8f5] shadow-lg hover:scale-110 transition-all opacity-0 group-hover/placement-slider:opacity-100 group-hover/placement-slider:-translate-x-2">
            <ChevronLeft size={20} />
          </button>
          <button className="placement-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-[#00588b] text-white border-none shadow-lg hover:scale-110 transition-all opacity-0 group-hover/placement-slider:opacity-100 group-hover/placement-slider:translate-x-2">
            <ChevronRight size={20} />
          </button>

          <div className="placement-pagination flex justify-center gap-2 mt-8"></div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .placement-bullet {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 9999px;
            background: #cbd5e1;
            cursor: pointer;
            transition: all 0.3s;
          }
          .placement-bullet-active {
            width: 28px;
            background: #00588b;
          }
        `}} />
      </div>
    </section>
  );
}