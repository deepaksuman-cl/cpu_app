'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
const ChevronLeft = LucideIcons.ChevronLeft || LucideIcons.ArrowLeft;
const ChevronRight = LucideIcons.ChevronRight || LucideIcons.ArrowRight;
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function TeamSlider({ data }) {
  if (!data) return null;
  const { title, subtitle, members = [] } = data || {};

  return (
    <section className="py-[60px] bg-[#f8f9fa] font-sans w-full overflow-hidden">
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          
          .team-swiper-wrapper {
            padding: 10px 0 40px 0 !important;
          }
          .team-pagination .swiper-pagination-bullet {
            background-color: #d1d5db;
            opacity: 1;
            width: 8px;
            height: 8px;
            transition: all 0.3s;
            margin: 0 4px !important;
          }
          .team-pagination .swiper-pagination-bullet-active {
            background-color: #f1bd0e;
            transform: scale(1.3);
          }
        `}
      </style>

      <div className="text-center max-w-[1000px] mx-auto px-6 mb-[40px]">
        <h2 className="text-[2.2rem] md:text-[2.6rem] font-[800] text-[#0c4088] mb-3 leading-tight">
          {title}
        </h2>
        <p className="text-[1.05rem] text-[#555555] font-[400] leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="relative max-w-[1300px] mx-auto px-[20px] md:px-[40px]">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: '.team-next-btn',
            prevEl: '.team-prev-btn',
          }}
          pagination={{
            clickable: true,
            el: '.team-pagination',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="team-swiper-wrapper"
        >
          {(members || []).map((member) => (
            <SwiperSlide key={member.id}>
              <div className="group bg-white rounded-[16px] relative flex flex-col h-full shadow-[0_4px_15px_rgba(0,0,0,0.06)] hover:-translate-y-[8px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.12)] transition-all duration-[400ms] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[155px] bg-[#0c4088] z-0"></div>

                <div className="relative z-10 pt-[25px] px-[25px] pb-[30px] flex flex-col h-full">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-[220px] object-cover object-top rounded-[12px] shadow-sm bg-gray-100"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=f1bd0e&color=0c4088&size=200&bold=true`;
                    }}
                  />

                  <div className="mt-[20px] text-left flex flex-col flex-1">
                    <h4 className="text-[#0c4088] text-[1.25rem] font-[700] tracking-tight mb-[8px]">
                      {member.name}
                    </h4>
                    <p className="text-[#444444] text-[0.85rem] leading-[1.6] font-[500] mb-[20px] flex-1">
                      {member.desc}
                    </p>

                    <div className="flex justify-start items-center gap-[10px] flex-wrap mt-auto">
                      {(member.logos || []).map((logoUrl, i) => (
                        <img 
                          key={i} 
                          src={logoUrl} 
                          alt="Logo" 
                          className="h-[32px] w-auto object-contain border border-[#eaeaea] rounded-[6px] p-[4px]"
                          onError={(e) => e.target.style.display = 'none'} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button 
          className="team-prev-btn absolute left-[0px] md:left-[-10px] top-[135px] -translate-y-1/2 w-[36px] h-[36px] bg-[#0c4088] text-white flex justify-center items-center rounded shadow-md z-30 hover:bg-[#f1bd0e] transition-all duration-300"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>

        <button 
          className="team-next-btn absolute right-[0px] md:right-[-10px] top-[135px] -translate-y-1/2 w-[36px] h-[36px] bg-[#0c4088] text-white flex justify-center items-center rounded shadow-md z-30 hover:bg-[#f1bd0e] transition-all duration-300"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>

      <div className="team-pagination flex justify-center mt-2"></div>
    </section>
  );
}
