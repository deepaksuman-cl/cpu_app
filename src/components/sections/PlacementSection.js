"use client";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import CustomSwiper from "../ui/Swiper";
import Icon from "../ui/Icon";
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function PlacementSection({ data }) {
  if (!data) return null;
  const { 
    stats = [], 
    tagline = "Empower Your Future through Exceptional",
    title = "Placement",
    highlight = "Opportunities at CPU"
  } = data;

  // Prefer relational data over legacy JSON
  const relationalSides = data?.placementPartnersRel?.filter(p => p.studentName).map(p => ({
    name: p.studentName,
    course: p.courseName,
    company: p.companyName,
    img: p.logoUrl // Assuming logoUrl was used for student photo in migration if no other img
  })) || [];

  const relationalRecruiters = data?.placementPartnersRel?.map(p => ({
    img: p.logoUrl
  })) || [];

  const slides = relationalSides.length > 0 ? relationalSides : (data?.slides || []);
  const recruiters = relationalRecruiters.length > 0 ? relationalRecruiters : (data?.recruiters || []);

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
          <h2 className="font-bold text-3xl text-white/85 m-0 mb-1 leading-snug" dangerouslySetInnerHTML={{ __html: tagline }} />
          <div className="flex items-center gap-3.5 flex-wrap">
            <span className="bg-white/15 backdrop-blur border border-white/20 rounded-xl px-4 py-1 font-black text-4xl text-amber-400" dangerouslySetInnerHTML={{ __html: title }} />
            <span className="font-bold text-4xl text-white" dangerouslySetInnerHTML={{ __html: highlight }} />
            <ArrowRight size={28} className="text-amber-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="grid grid-cols-3 gap-0.5 rounded-2xl h-[100%] overflow-hidden shadow-2xl">
            {stats.map(({ val, label }, i) => (
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
          <CustomSwiper
            items={slides}
            perView={2}
            gap={20}
            autoInterval={4000}
            dark={true}
            breakpoints={{ 0: 1, 768: 2 }}
            renderSlide={(slide) => (
              <div className="rounded-2xl overflow-hidden relative h-[360px] sm:h-[400px] shadow-2xl group">
                <Image
                  src={slide.img}
                  alt={slide.name}
                  fill
                  className="object-cover object-top block group-hover:scale-105 transition-transform duration-400"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Only show overlay and text if at least one field exists */}
                {(slide.name || slide.course || slide.company) && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/85" />
                    <div className="placement_bg_blur absolute bottom-0 left-0 right-0 p-3.5">
                      {slide.name && (
                        <h6 className="font-extrabold text-[13px] text-white">
                          {slide.name}
                        </h6>
                      )}
                      {slide.course && (
                        <small className="text-[11px] text-white/70 mt-0.5 mb-2">
                          {slide.course}
                        </small>
                      )}
                      {/* {slide.company && (
                        <span className="bg-amber-400 text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded">
                          {slide.company}
                        </span>
                      )} */}
                    </div>
                  </>
                )}
              </div>
            )}
          />
        </div>

        {/* --- Recruiter Logos --- */}
        {recruiters.length > 0 && (
          <div className="mt-20 pt-10 border-t border-white/10">
            <p className="text-white/50 text-[20px] font-bold uppercase tracking-[0.3em] text-center mb-8">Trusted by Global Industry Leaders</p>
            <div className="w-full relative swraper overflow-hidden pointer-events-none">
              <style dangerouslySetInnerHTML={{__html: `
                .swraper .swiper-wrapper {
                  transition-timing-function: linear !important;
                }
              `}} />
              <SwiperReact
                modules={[Autoplay]}
                spaceBetween={40}
                slidesPerView={6}
                loop={true}
                speed={3000}
                autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
                breakpoints={{
                  0: { slidesPerView: 3, spaceBetween: 20 },
                  480: { slidesPerView: 4, spaceBetween: 30 },
                  768: { slidesPerView: 5, spaceBetween: 40 },
                  1024: { slidesPerView: 6, spaceBetween: 50 },
                }}
                className="w-full h-16"
              >
                {[...recruiters, ...recruiters, ...recruiters].map((logo, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="flex items-center justify-center h-full w-full">
                      <img 
                        src={logo.img} 
                        alt={`Recruiter ${idx + 1}`} 
                        className="h-18 w-full home_logo_slider object-contain transition-all duration-300" 
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </SwiperReact>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
