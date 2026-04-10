"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StructuredTitle from "@/components/common/StructuredTitle";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';

export default function SchoolAlumni({ data }) {
  const swiperRef = useRef(null);

  if (!data || !data.list || data.list.length === 0) return null;
  const { list, title, label } = data;

  return (
    <section id="alumni" className="py-24 overflow-hidden bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 text-[#00588b] border border-[#00588b]/20 bg-[#00588b]/8">
            {label}
          </span>
          <h2 className="font-black mt-1 text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            <StructuredTitle title={title} highlightClass="text-[#00588b]" />
          </h2>
        </div>

        <div
          className="relative group/alumni-slider"
          onMouseEnter={() => swiperRef.current?.autoplay.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay.start()}
        >
          <SwiperReact
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={4}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false
            }}
            navigation={{
              nextEl: '.alumni-next',
              prevEl: '.alumni-prev',
            }}
            pagination={{
              clickable: true,
              el: '.alumni-pagination',
              bulletClass: 'alumni-bullet',
              bulletActiveClass: 'alumni-bullet-active',
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
            {list.map((a, j) => (
              <SwiperSlide key={j} className="py-5">
                <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-[0_4px_16px_rgba(0,88,139,0.07)] transition-all hover:-translate-y-2 hover:shadow-xl h-full">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={a.image || a.img} alt={a.name} className="w-full transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="p-4 text-center border-t-[3px] border-[#00588b]">
                    <h4 className="font-bold text-sm text-[#0a1628]">{a.name}</h4>
                    <p className="text-xs mt-1 font-medium text-[#00588b]">{a.role}</p>
                    <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold bg-[#00588b]/8 text-[#00588b]">
                      {a.company}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperReact>

          <button className="alumni-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white text-[#00588b] border border-slate-200 shadow-lg hover:scale-110 transition-all opacity-0 group-hover/alumni-slider:opacity-100 group-hover/alumni-slider:-translate-x-2">
            <ChevronLeft size={20} />
          </button>
          <button className="alumni-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-[#00588b] text-white border-none shadow-lg hover:scale-110 transition-all opacity-0 group-hover/alumni-slider:opacity-100 group-hover/alumni-slider:translate-x-2">
            <ChevronRight size={20} />
          </button>

          <div className="alumni-pagination flex justify-center gap-2 mt-8"></div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          .alumni-bullet {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 9999px;
            background: #cbd5e1;
            cursor: pointer;
            transition: all 0.3s;
          }
          .alumni-bullet-active {
            width: 28px;
            background: #00588b;
          }
        `}} />
      </div>
    </section>
  );
}
