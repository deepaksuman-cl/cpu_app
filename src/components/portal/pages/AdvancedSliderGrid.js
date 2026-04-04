"use client";
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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
    isFullWidth,
    itemHeight,
    itemWidth,
    slidesPerViewMobile,
    slidesPerViewTablet,
    navStyle,
    sliderGap,
    overlayOpacity,
    imageWidth,
    imageHeight,
    useItemOverlay,
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
      case 'original': return '';
      case '16:9':
      default: return 'aspect-video';
    }
  };

  // Grid Columns Mapping
  const getGridCols = (cols) => {
    switch (cols) {
      case '1': return 'grid-cols-1';
      case '2': return 'grid-cols-1 md:grid-cols-2';
      case '4': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case '3':
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  // Premium Card Style Mapping
  const getCardClasses = (style) => {
    const base = "overflow-hidden transition-all duration-500 group h-full flex flex-col rounded-2xl bg-white";
    if (style === 'elevated') {
      return `${base} border border-gray-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-2`;
    }
    return `${base} border border-gray-200 hover:border-[#00588b]/40 shadow-sm hover:shadow-xl hover:-translate-y-1`;
  };

  const renderCard = (item, idx) => {
    // ==========================================
    // FULL WIDTH BANNER MODE (Premium Cinematic)
    // ==========================================
    if (isFullWidth) {
      return (
        <div key={item._id || idx} className="relative w-full group overflow-hidden mx-auto" style={{ height: itemHeight || '600px', maxWidth: itemWidth || '100%' }}>
          {/* Background Image with Slow Zoom Effect */}
          <div className="absolute inset-0 z-0 bg-black">
            {item.image ? (
              <img 
                src={item.image} 
                className={`w-full h-full ${imageFit === 'contain' ? 'object-contain' : 'object-cover'} transition-transform duration-[10000ms] group-hover:scale-110 opacity-90`} 
                alt={item.title} 
              />
            ) : (
              <div className="w-full h-full bg-slate-800" />
            )}
            {/* Smooth Cinematic Gradient Overlay */}
            {useItemOverlay !== false && (
              <div 
                className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/10" 
                style={{ opacity: (parseInt(overlayOpacity) || 80) / 100 }} 
              />
            )}
          </div>

          {/* Content Overlay */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl transform transition-all duration-700 translate-y-8 opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 group-hover:scale-[1.02]">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl drop-shadow-lg transform transition-all duration-700 delay-150 translate-y-8 opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 font-light">
                {item.subtitle}
              </p>
            )}
            {item.link && (
               <Link 
                href={item.link} 
                target={item.newTab ? '_blank' : '_self'}
                className="inline-flex items-center gap-3 bg-[#ffb900] hover:bg-white hover:text-[#00588b] text-gray-900 font-bold px-8 py-4 rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(255,185,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] uppercase tracking-widest text-sm transform delay-300 translate-y-8 opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 overflow-hidden relative"
               >
                <span className="relative z-10 flex items-center gap-2">{item.buttonText || 'Explore More'} <LucideIcons.ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
               </Link>
            )}
          </div>
        </div>
      );
    }

    // ==========================================
    // STANDARD CARD MODE (Modern Clean UI)
    // ==========================================
    const CardWrapper = item.link ? 'a' : 'div';
    const wrapperProps = item.link ? {
      href: item.link,
      target: item.newTab ? '_blank' : '_self',
      rel: item.newTab ? 'noopener noreferrer' : '',
      className: "block h-full no-underline"
    } : { className: "h-full block" };

    const hasContent = item.title || item.subtitle || item.link;

    return (
      <CardWrapper {...wrapperProps} key={item._id || idx}>
        <div className={getCardClasses(cardStyle)} style={{ maxWidth: itemWidth || '100%', margin: '0 auto' }}>
          
          {/* Image Section with Modern Hover */}
          <div className={`relative ${hasContent ? getAspectClass(aspectRatio) : 'flex-1 h-full'} overflow-hidden bg-gray-50`} style={aspectRatio === 'original' && hasContent ? { height: itemHeight || 'auto' } : (hasContent ? {} : { height: itemHeight || 'auto' })}>
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.title} 
                className={`w-full ${imageFit === 'contain' ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-110 mx-auto`}
                style={{ width: imageWidth || '100%', height: imageHeight || '100%', minHeight: !hasContent ? itemHeight : 'auto' }}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full min-h-[240px] flex items-center justify-center text-gray-300">
                <LucideIcons.Image size={48} strokeWidth={1} className="opacity-50" />
              </div>
            )}
            
            {/* Elegant Hover Overlay */}
            {item.link && hasContent && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#00588b]/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-start p-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#00588b] shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <LucideIcons.ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          {hasContent && (
            <div className="p-8 flex flex-col flex-1 relative z-10">
              {item.title && (
                <h4 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#00588b] transition-colors line-clamp-2">
                  {item.title}
                </h4>
              )}
              {item.subtitle && (
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.subtitle}
                </p>
              )}
              
              {/* Card Footer Line */}
              <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-[#00588b] uppercase tracking-wide group-hover:text-amber-500 transition-colors">
                  <span>{item.buttonText || 'Discover'}</span> 
                  <LucideIcons.MoveRight size={18} className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </div>
          )}
        </div>
      </CardWrapper>
    );
  };

  return (
    <div 
      id={block.cssId}
      className={`relative w-full py-16 overflow-hidden ${block.cssClass || ''}`}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: bgParallax ? 'fixed' : 'scroll',
        paddingLeft: isFullWidth ? '0' : '1.5rem',
        paddingRight: isFullWidth ? '0' : '1.5rem'
      }}
    >
      {/* Background Overlay */}
      {bgOverlay && <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-[2px] z-0" />}

      <div className={`relative z-10 ${isFullWidth ? 'w-full max-w-full' : 'max-w-7xl mx-auto'}`}>
        
        {/* Modern Header Section */}
        {showHeader && (
          <div className={`mb-16 text-center ${bgOverlay ? 'text-white' : 'text-gray-900'} ${isFullWidth ? 'px-6' : ''}`}>
            <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
              {headerTitle}
            </h2>
            {headerSubtitle && (
              <p className={`text-lg max-w-3xl mx-auto font-light leading-relaxed ${bgOverlay ? 'text-gray-300' : 'text-gray-600'}`}>
                {headerSubtitle}
              </p>
            )}
            <div className="mt-8 flex items-center justify-center gap-2">
               <div className="h-1.5 w-8 bg-[#ffb900] rounded-full" />
               <div className="h-1.5 w-16 bg-[#00588b] rounded-full" />
               <div className="h-1.5 w-8 bg-[#ffb900] rounded-full" />
            </div>
          </div>
        )}

        {/* Content Render */}
        {displayMode === 'grid' ? (
          <div className={`grid gap-8 ${getGridCols(gridColumns)}`}>
            {items.map((item, idx) => renderCard(item, idx))}
          </div>
        ) : (
          <div className={`relative swiper-custom-container group ${isFullWidth ? 'full-width-swiper' : 'px-4'}`}>
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              direction="horizontal" // Enforced horizontal slide to fix vertical issue
              spaceBetween={isFullWidth ? 0 : (parseInt(sliderGap) || 32)}
              slidesPerView={parseInt(gridColumns) || 1}
              loop={sliderLoop}
              autoplay={sliderAutoplay ? { delay: 4000, disableOnInteraction: false } : false}
              navigation={sliderArrows ? {
                nextEl: '.swiper-next-custom',
                prevEl: '.swiper-prev-custom',
              } : false}
              pagination={sliderDots ? { clickable: true, dynamicBullets: true } : false}
              breakpoints={{
                0: { slidesPerView: parseInt(slidesPerViewMobile) || 1 },
                640: { slidesPerView: parseInt(slidesPerViewTablet) || 2 },
                1024: { slidesPerView: parseInt(gridColumns) || 3 }
              }}
              className={isFullWidth ? "h-full w-full" : "pb-16 w-full"}
            >
              {items.map((item, idx) => (
                // Added h-auto to ensure SwiperSlide takes proper height constraints
                <SwiperSlide key={item._id || idx} className="h-auto">
                  {renderCard(item, idx)}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Glassmorphism Navigation Arrows */}
            {sliderArrows && (
              <>
                <button className={`swiper-prev-custom absolute ${isFullWidth || navStyle === 'inside' ? 'left-4 md:left-8' : 'left-[-24px]'} top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-white/20 bg-white/70 backdrop-blur-md flex items-center justify-center text-[#00588b] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#00588b] hover:text-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex`}>
                  <LucideIcons.ChevronLeft size={28} strokeWidth={2.5} />
                </button>
                <button className={`swiper-next-custom absolute ${isFullWidth || navStyle === 'inside' ? 'right-4 md:right-8' : 'right-[-24px]'} top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-white/20 bg-white/70 backdrop-blur-md flex items-center justify-center text-[#00588b] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#00588b] hover:text-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex`}>
                  <LucideIcons.ChevronRight size={28} strokeWidth={2.5} />
                </button>
              </>
            )}
            
            {/* Custom Modern Pagination Styles */}
            <style jsx global>{`
              .swiper-custom-container .swiper-pagination-bullet {
                background: #cbd5e1;
                opacity: 1;
                width: 10px;
                height: 10px;
                transition: all 0.4s ease;
              }
              .swiper-custom-container .swiper-pagination-bullet-active {
                background: ${isFullWidth ? '#ffb900' : '#00588b'} !important;
                width: 32px;
                border-radius: 8px;
              }
              .swiper-custom-container .swiper-pagination {
                bottom: ${isFullWidth ? '40px' : '0px'} !important;
              }
              .full-width-swiper {
                margin: 0;
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}