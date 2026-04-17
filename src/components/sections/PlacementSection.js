"use client";
import { ArrowRight, Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import CustomSwiper from "../ui/Swiper";

const PlacementSlideCard = ({ slide, onWatchVideo }) => {
  const extractVideoId = (url) => {
    if (!url || typeof url !== 'string') return null;
    const t = url.trim();
    if (t.length === 11 && !t.includes('/') && !t.includes('?')) return t;
    if (t.includes('youtu.be/')) {
      const id = t.split('youtu.be/')[1]?.split(/[?#&]/)[0];
      if (id?.length === 11) return id;
    }
    if (t.includes('/shorts/')) {
      const id = t.split('/shorts/')[1]?.split(/[?#&]/)[0];
      if (id?.length === 11) return id;
    }
    const regex = /(?:v=|v\/|embed\/|watch\?v=|&v=)([a-zA-Z0-9_-]{11})/;
    const match = t.match(regex);
    if (match && match[1]) return match[1];
    const fallbackMatch = t.match(/[a-zA-Z0-9_-]{11}/);
    return fallbackMatch ? fallbackMatch[0] : null;
  };
  const videoId = extractVideoId(slide.youtubeLink);

  const hasContent = !!slide.name?.trim();

  return (
    <div className="rounded-3xl overflow-hidden relative h-[420px] sm:h-[460px] shadow-2xl group bg-gradient-to-br from-[#1a0b45] to-[#25155c] flex flex-col justify-between border border-white/10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      {/* Background Decorations (Confetti/Shapes) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0">
        <div className="absolute top-[25%] left-[10%] w-1.5 h-6 bg-[#ff4a3b] transform rotate-45 rounded-full"></div>
        <div className="absolute top-[45%] right-[15%] w-1.5 h-4 bg-[#ff4a3b] transform -rotate-12 rounded-full"></div>
        <div className="absolute top-[50%] left-[8%] w-5 h-5 border-2 border-amber-400 rounded-full border-t-transparent border-r-transparent transform -rotate-45"></div>
        <div className="absolute bottom-[40%] left-[5%] w-2 h-2 rounded-full bg-amber-400 opacity-50"></div>
        <div className="absolute top-[15%] right-[25%] w-2.5 h-2.5 bg-blue-400 rounded-full opacity-30 transform rotate-12"></div>
        <div className="absolute bottom-[30%] right-[10%] w-1.5 h-5 bg-[#ff4a3b] transform rotate-12 rounded-full"></div>
      </div>

      {hasContent && (
        <>
          {/* Quote Icon */}
          <div className="absolute top-8 left-8 z-20">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-400 opacity-80">
              <path d="M10 11L8 17H5L7 11V7H11V11H10Z" fill="currentColor"/>
              <path d="M19 11L17 17H14L16 11V7H20V11H19Z" fill="currentColor"/>
            </svg>
          </div>

          {/* Text Content */}
          <div className="relative z-20 pt-20 px-8 w-[95%]">
            <h4 className="text-white font-black text-[24px] sm:text-[30px] leading-tight mb-1 drop-shadow-xl tracking-tight">
               {slide.name}
            </h4>
            {slide.designation && (
              <p className="text-amber-400 text-[15px] sm:text-[17px] font-extrabold tracking-wide drop-shadow-md mb-0.5">
                {slide.designation}
              </p>
            )}
            {slide.classOf && (
              <p className="text-white/70 text-[13px] font-black uppercase tracking-[0.2em] drop-shadow-sm flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                 Class of {slide.classOf}
              </p>
            )}
            {slide.package && (
              <p className="text-amber-400 text-[18px] font-black mt-2 drop-shadow-md">
                 {slide.package} {slide.package.toLowerCase().includes('lpa') ? '' : 'LPA'}
              </p>
            )}
            {slide.course && !slide.designation && (
               <p className="text-white/60 text-[14px] font-bold uppercase tracking-widest drop-shadow-md mt-2">
                 {slide.course}
              </p>
            )}
          </div>
        </>
      )}

      {/* Image - Student Photo */}
      {slide.img && (
        <div className={`absolute inset-x-0 bottom-0 ${hasContent ? 'top-[35%]' : 'top-0'} z-10 w-full pointer-events-none select-none`}>
          <Image
            src={slide.img}
            alt={slide.name || 'Placement'}
            fill
            className="object-contain object-bottom block group-hover:scale-[1.03] transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#1a0b45] to-transparent z-[15] pointer-events-none opacity-60"></div>

      {/* Professional Video Button */}
      {slide.youtubeLink && (
        <div className="absolute bottom-8 right-8 z-30">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (videoId) {
                onWatchVideo(videoId, slide.name);
              } else {
                window.open(slide.youtubeLink, '_blank');
              }
            }}
            className="flex items-center bg-[#5e48ff] hover:bg-[#4d3ce6] rounded-full pl-6 pr-2 py-2 shadow-[0_10px_25px_rgba(94,72,255,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95 group/btn"
          >
            <span className="text-white font-black text-[13px] sm:text-[14px] mr-4 tracking-wide">Watch Video</span>
            <div className="bg-[#fcb323] group-hover/btn:bg-amber-400 rounded-full w-9 h-9 flex items-center justify-center transition-colors shadow-inner">
              <Play size={14} className="text-[#362208] ml-0.5 fill-current" strokeWidth={0} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};


export default function PlacementSection({ data }) {
  const [activeVideo, setActiveVideo] = useState(null); // { id, name }

  if (!data) return null;
  const { 
    stats = [], 
    tagline = "Empower Your Future through Exceptional",
    title = "Placement",
    highlight = "Opportunities at CPU"
  } = data;

  const relationalSides = data?.placementPartnersRel?.filter(p => !!p.studentName || !!p.logoUrl).map(p => ({
    name: p.studentName,
    course: p.courseName,
    company: p.companyName,
    img: p.logoUrl,
    youtubeLink: p.youtubeLink,
    designation: p.designation,
    classOf: p.classOf,
    package: p.packageOffered || p.package
  })) || [];

  const relationalRecruiters = data?.placementPartnersRel?.map(p => ({
    img: p.logoUrl
  })) || [];

  const rawSlides = relationalSides.length > 0 ? relationalSides : (data?.list || data?.slides || []);
  const slides = rawSlides.map(s => {
    // If it's already mapped via relationalSides, it will have 'name' etc.
    // If it's raw JSON, it might use 'studentName' or 'logoUrl'
    return {
      name: s.name || s.studentName,
      course: s.course || s.courseName,
      company: s.company || s.companyName,
      img: s.img || s.logoUrl,
      youtubeLink: s.youtubeLink,
      designation: s.designation,
      classOf: s.classOf,
      package: s.package
    };
  });

  const recruiters = relationalRecruiters.length > 0 ? relationalRecruiters : (data?.recruiters || []);

  const handleWatchVideo = (id, name) => {
    setActiveVideo({ id, name });
  };

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
              <PlacementSlideCard 
                slide={slide} 
                onWatchVideo={handleWatchVideo} 
              />
            )}
          />
        </div>

        {/* --- Recruiter Logos --- */}
        {recruiters.length > 0 && (
      
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-20 pt-10 border-t border-white/10">
            <div className="right_col text-center">
                <p className="text-white/50 text-[20px] font-bold uppercase tracking-[0.3em] text-center mb">Learn with Top Tech Partners</p>
              {/* <p className="text-white">Certification programs with Red Hat, Amazon Web Services (AWS), and Oracle Corporation for real-world skills and career growth.</p> */}
           <div className="tech_partners text-center grid grid-cols-1 lg:grid-cols-3 gap-10 mt-7">
              <img src="https://cpur.in/api/media/media/1776428734789-93zhg-RedHat.png" alt="Red Hat" className="h-18 w-full home_logo_slider object-contain transition-all duration-300" />
              <img src="https://cpur.in/api/media/media/1776428734780-lvkro-AWS.png" alt="AWS" className="h-18 w-full home_logo_slider object-contain transition-all duration-300" />
              <img src="https://cpur.in/api/media/media/1776428734786-xeea4-oracle.png" alt="Oracle" className="h-18 w-full home_logo_slider object-contain transition-all duration-300"/>
          </div>

            </div>
            <div className="right_col">
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
                  slidesPerView={5}
                  loop={true}
                  speed={3000}
                  autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
                  breakpoints={{
                    0: { slidesPerView: 3, spaceBetween: 20 },
                    480: { slidesPerView: 4, spaceBetween: 30 },
                    768: { slidesPerView: 5, spaceBetween: 40 },
                    1024: { slidesPerView: 5, spaceBetween: 50 },
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
          </div>
        )}
      </div>

      {/* --- GLOBAL SMART MODAL --- */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-10 transition-all duration-500 ease-out animate-in fade-in"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.92)', backdropFilter: 'blur(20px)' }}
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(94,72,255,0.25)] border border-white/10 animate-in zoom-in-95 duration-500 ease-out"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button UI */}
            <button 
              onClick={() => setActiveVideo(null)} 
              className="absolute top-5 right-5 z-[60] bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-300 hover:rotate-90 border border-white/10 group"
              title="Close Player"
            >
              <X size={24} className="opacity-70 group-hover:opacity-100" />
            </button>

            {/* Video Player */}
            <iframe 
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`} 
              title={`${activeVideo.name} Success Story`}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            
            {/* Bottom Info Bar (Premium Touch) */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-center px-8">
               <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.2em]">Now Playing: {activeVideo.name} Story</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
