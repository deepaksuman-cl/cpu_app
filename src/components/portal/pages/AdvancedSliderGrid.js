"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

export default function AdvancedSliderGrid({ block }) {
  if (!block) return null;

  const {
    showHeader,
    headerTitle,
    headerSubtitle,
    bgImage,
    bgOverlay,
    bgParallax,
    displayMode,
    gridColumns,
    sliderAutoplay,
    sliderLoop,
    sliderArrows,
    sliderDots,
    aspectRatio,
    imageFit,
    cardStyle,
    items = []
  } = block;

  // Aspect Ratio Mapping
  const getAspectClass = (ratio) => {
    switch (ratio) {
      case '1:1': return 'aspect-square';
      case '4:5': return 'aspect-[4/5]';
      case '16:9':
      default: return 'aspect-video';
    }
  };

  // Grid Columns Mapping
  const getGridCols = (cols) => {
    switch (cols) {
      case '2': return 'grid-cols-1 md:grid-cols-2';
      case '4': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case '3':
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  // Card Style Mapping
  const getCardClasses = (style) => {
    const base = "overflow-hidden transition-all duration-300 group h-full flex flex-col";
    if (style === 'elevated') {
      return `${base} bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1`;
    }
    return `${base} bg-white border border-gray-200 hover:border-gray-400`;
  };

  const renderCard = (item, idx) => {
    const CardWrapper = item.link ? 'a' : 'div';
    const wrapperProps = item.link ? {
      href: item.link,
      target: item.newTab ? '_blank' : '_self',
      rel: item.newTab ? 'noopener noreferrer' : '',
      className: "block h-full no-underline"
    } : { className: "h-full" };

    return (
      <CardWrapper {...wrapperProps} key={item._id || idx}>
        <div className={getCardClasses(cardStyle)}>
          {/* Card Image */}
          <div className={`relative ${getAspectClass(aspectRatio)} overflow-hidden bg-gray-100`}>
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.title} 
                className={`w-full h-full ${imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'} transition-transform duration-700 group-hover:scale-110`}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <LucideIcons.Image size={40} strokeWidth={1} />
              </div>
            )}
            
            {/* Hover Indicator for linked cards */}
            {item.link && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#00588b] shadow-xl">
                    <LucideIcons.ArrowRight size={20} />
                </div>
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="p-6 flex flex-col flex-1">
            <h4 className="text-xl font-extrabold text-[#00588b] mb-2 leading-tight group-hover:text-amber-500 transition-colors">
              {item.title}
            </h4>
            {item.subtitle && (
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {item.subtitle}
              </p>
            )}
            
            {/* Footer with link if applicable */}
            {item.link && (
               <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-[#00588b] uppercase tracking-widest">
                  View Details <LucideIcons.ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </div>
            )}
          </div>
        </div>
      </CardWrapper>
    );
  };

  return (
    <div 
      id={block.cssId}
      className={`relative w-full py-20 px-6 overflow-hidden ${block.cssClass || ''}`}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: bgParallax ? 'fixed' : 'scroll'
      }}
    >
      {/* Background Overlay */}
      {bgOverlay && <div className="absolute inset-0 bg-black/50 z-0" />}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        {showHeader && (
          <div className={`mb-16 text-center ${bgOverlay ? 'text-white' : 'text-gray-900'}`}>
            <h2 className="text-3xl lg:text-5xl font-black mb-4 tracking-tight drop-shadow-sm">
              {headerTitle}
            </h2>
            {headerSubtitle && (
              <p className={`text-lg max-w-2xl mx-auto ${bgOverlay ? 'text-white/80' : 'text-gray-600'}`}>
                {headerSubtitle}
              </p>
            )}
            <div className="mt-6 flex items-center justify-center gap-4">
               <div className="h-1 w-12 bg-amber-400 rounded-full" />
               <div className="h-1 w-24 bg-[#00588b] rounded-full" />
               <div className="h-1 w-12 bg-amber-400 rounded-full" />
            </div>
          </div>
        )}

        {/* Content Section */}
        {displayMode === 'grid' ? (
          <div className={`grid gap-8 ${getGridCols(gridColumns)}`}>
            {items.map((item, idx) => renderCard(item, idx))}
          </div>
        ) : (
          <div className="relative swiper-custom-container">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              loop={sliderLoop}
              autoplay={sliderAutoplay ? { delay: 4000, disableOnInteraction: false } : false}
              navigation={sliderArrows ? {
                nextEl: '.swiper-next-custom',
                prevEl: '.swiper-prev-custom',
              } : false}
              pagination={sliderDots ? { clickable: true } : false}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: parseInt(gridColumns) || 3 }
              }}
              className="pb-12"
            >
              {items.map((item, idx) => (
                <SwiperSlide key={item._id || idx}>
                  {renderCard(item, idx)}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            {sliderArrows && (
              <>
                <button className="swiper-prev-custom absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gray-200 bg-white/90 flex items-center justify-center text-[#00588b] shadow-xl hover:bg-[#00588b] hover:text-white transition-all duration-300 hidden lg:flex">
                  <LucideIcons.ChevronLeft size={24} />
                </button>
                <button className="swiper-next-custom absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gray-200 bg-white/90 flex items-center justify-center text-[#00588b] shadow-xl hover:bg-[#00588b] hover:text-white transition-all duration-300 hidden lg:flex">
                  <LucideIcons.ChevronRight size={24} />
                </button>
              </>
            )}
            
            <style jsx global>{`
              .swiper-custom-container .swiper-pagination-bullet-active {
                background: #00588b !important;
                width: 24px;
                border-radius: 4px;
              }
              .swiper-custom-container .swiper-pagination {
                bottom: 0px !important;
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}
