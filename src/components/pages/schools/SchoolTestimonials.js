"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import StructuredTitle from "@/components/common/StructuredTitle";
import RichTextRenderer from "@/components/common/RichTextRenderer";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';

export default function SchoolTestimonials({ data }) {
  const swiperRef = useRef(null);
  if (!data) return null;
  const list = Array.isArray(data) ? data : (data.list || []);
  if (!list || list.length === 0) return null;
  const title = data.title || "Student Testimonials";
  const label = data.label || "What They Say";

  return (
    <section className="py-24 overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0d3060] to-[#00588b]">
      <div className="max-w-6xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-4 text-[#ffb900] bg-[#ffb900]/12 border border-[#ffb900]/30">
            {label}
          </span>
          <h2 className="font-black text-white" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            <StructuredTitle title={title} highlightClass="text-[#ffb900]" />
          </h2>
        </div>

        <div 
          className="relative group/testimonial-slider"
          onMouseEnter={() => swiperRef.current?.autoplay.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay.start()}
        >
          <SwiperReact
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            navigation={{
              nextEl: '.testimonial-next',
              prevEl: '.testimonial-prev',
            }}
            pagination={{
              clickable: true,
              bulletClass: 'testimonial-dot',
              bulletActiveClass: 'testimonial-dot-active',
            }}
            loop={list.length > 1}
            grabCursor={true}
          >
            {list.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                  <div className="hidden lg:block lg:col-span-1" />
                  <div className="lg:col-span-3">
                    <div className="rounded-2xl overflow-hidden bg-white/7 border border-white/12">
                      <div className="h-1 bg-gradient-to-r from-[#ffb900] to-orange-500" />
                      <div className="p-8">
                        <Quote className="w-9 h-9 mb-5 text-[#ffb900] opacity-40" />
                        <div className="text-base lg:text-lg leading-relaxed mb-8 text-white/85 excerpt-rich-text">
                          <RichTextRenderer content={t.text || t.content} useProse={false} />
                        </div>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-[#ffb900]/35 flex-shrink-0">
                              <img src={t.photo || t.avatar || "https://cpur.in/wp-content/uploads/2023/07/student.png"} alt={t.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-white text-base">{t.name}</div>
                              <div className="text-sm mt-0.5 text-slate-400">
                                {t.course && <span>{t.course} · </span>}
                                {t.batch && <span>{t.batch} · </span>}
                                {t.company && <span>{t.company}</span>}
                                {t.package && <span className="text-[#ffb900] ml-2 font-bold tracking-tight">({t.package})</span>}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {Array.from({ length: t.rating || 5 }).map((_, j) => (
                              <Star key={j} className="w-5 h-5 fill-current text-[#ffb900]" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block lg:col-span-1" />
                </div>
              </SwiperSlide>
            ))}
          </SwiperReact>

          <button className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center border border-white/20 bg-white/10 text-white hover:scale-110 transition-all opacity-0 group-hover/testimonial-slider:opacity-100 hidden lg:flex">
            <ChevronLeft size={24} />
          </button>
          <button className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center bg-[#ffb900] text-[#0a1628] border-none hover:scale-110 transition-all opacity-0 group-hover/testimonial-slider:opacity-100 hidden lg:flex">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile Nav */}
        <div className="flex lg:hidden justify-center gap-4 mt-8">
           <button className="testimonial-prev w-11 h-11 rounded-full flex items-center justify-center border border-white/20 bg-white/10 text-white"><ChevronLeft size={20} /></button>
           <button className="testimonial-next w-11 h-11 rounded-full flex items-center justify-center bg-[#ffb900] text-[#0a1628] border-none"><ChevronRight size={20} /></button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullets.swiper-pagination-horizontal {
          bottom: -40px;
        }
        .testimonial-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.2);
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .testimonial-dot-active {
          width: 24px;
          background: #ffb900 !important;
        }
      `}} />
    </section>
  );
}
