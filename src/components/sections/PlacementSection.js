"use client";
import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import Image from "next/image";
import CustomSwiper from "../ui/Swiper";
import Icon from "../ui/Icon";
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const PlacementSlideCard = ({ slide }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const extractVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/);
    return match ? match[1] : null;
  };
  const videoId = extractVideoId(slide.youtubeLink);

  return (
    <>
      <div className="rounded-2xl overflow-hidden relative h-[360px] sm:h-[400px] shadow-2xl group bg-[#25155c] flex flex-col justify-between border border-white/5">
        {/* Background Decorations (Confetti) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-80 z-0">
          <div className="absolute top-[25%] left-[10%] w-1.5 h-6 bg-[#ff4a3b] transform rotate-45 rounded-sm"></div>
          <div className="absolute top-[45%] right-[15%] w-1.5 h-4 bg-[#ff4a3b] transform -rotate-12 rounded-sm"></div>
          <div className="absolute top-[50%] left-[8%] w-4 h-4 border-2 border-amber-400 rounded-full border-t-transparent border-r-transparent transform -rotate-45"></div>
          <div className="absolute bottom-[20%] left-[5%] w-2 h-2 rounded-full bg-amber-400"></div>
          <div className="absolute bottom-[30%] right-[10%] w-1.5 h-5 bg-[#ff4a3b] transform rotate-12 rounded-sm"></div>
        </div>

        {/* Text Content */}
        <div className="relative z-20 pt-8 px-6 w-[90%]">
          <div className="text-amber-400 font-serif text-5xl leading-[0] mb-6">“</div>
          <h4 className="text-white font-extrabold text-[15px] sm:text-[17px] leading-snug mb-3 drop-shadow-md">
            "Hear Why {slide.name} Loves Studying at CPU!"
          </h4>
          <p className="text-white/80 text-[13px] drop-shadow-md">
             {slide.name}
          </p>
        </div>

        {/* Image */}
        {slide.img && (
          <div className="absolute inset-x-0 bottom-0 top-[30%] z-10 w-full pointer-events-none">
            <Image
              src={slide.img}
              alt={slide.name || 'Placement'}
              fill
              className="object-cover sm:object-contain object-bottom block group-hover:scale-105 transition-transform duration-400"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        {/* Video Button */}
        {slide.youtubeLink && (
          <div className="absolute bottom-5 right-5 z-20">
            <button 
              onClick={() => setIsVideoOpen(true)} 
              className="flex items-center bg-[#5642ea] hover:bg-[#4a3bc6] rounded-full pl-5 pr-1.5 py-1.5 shadow-[0_4px_12px_rgba(86,66,234,0.4)] transform transition-transform hover:scale-105"
            >
              <span className="text-white font-bold text-[12px] sm:text-[13px] mr-3 ml-1">Watch Video</span>
              <div className="bg-[#fcb323] hover:bg-amber-400 rounded-full w-8 h-8 flex items-center justify-center">
                <Play size={14} className="text-[#362208] ml-0.5" fill="currentColor" strokeWidth={1} />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {isVideoOpen && videoId && (
        <div className="fixed inset-0 z-[99999] p-4 sm:p-10 flex items-center justify-center bg-black/90 backdrop-blur-sm"
             onClick={() => setIsVideoOpen(false)}>
           <div className="bg-transparent w-full max-w-5xl aspect-video relative" onClick={e => e.stopPropagation()}>
             <button 
               onClick={() => setIsVideoOpen(false)} 
               className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
             >
               <X size={24} />
             </button>
             <iframe 
               src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
               title="YouTube video player" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
               className="w-full h-full rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
             ></iframe>
           </div>
        </div>
      )}
    </>
  );
};


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
    img: p.logoUrl, // Assuming logoUrl was used for student photo in migration if no other img
    youtubeLink: p.youtubeLink
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
            renderSlide={(slide) => <PlacementSlideCard slide={slide} />}
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
