import AccordionClient from './AccordionClient';
import * as LucideIcons from 'lucide-react';
import GalleryClient from './GalleryClient';
import RichTextRenderer from '@/components/common/RichTextRenderer';
import Link from 'next/link';

export default function BlockRenderer({ block }) {
  const { blockType } = block;

  // 1. Full Width Rich Text Container
  if (blockType === 'RichTextFull') {
    const useProse = block.useProse !== false;
    return (
      <div id={block.cssId || undefined} className={`w-full ${block.cssClass || ''}`}>
        <div className="max-w-[80%] mx-auto">
          <RichTextRenderer 
            content={block.content} 
            useProse={useProse}
          />
        </div>
      </div>
    );
  }

  // 2. Split Context Text + Media Image
  if (blockType === 'SplitLayout') {
    const isReversed = block.isReversed;
    const splitConfig = block.splitConfig; // '50-50', '30-70', '70-30'
    
    let textCol = 'lg:w-[50%]';
    let imgCol = 'lg:w-[50%]';
    
    if (splitConfig === '30-70') {
      textCol = 'lg:w-[35%]'; imgCol = 'lg:w-[65%]'; 
    } else if (splitConfig === '70-30') {
      textCol = 'lg:w-[65%]'; imgCol = 'lg:w-[35%]';
    }

    const useProse = block.useProse !== false;

    return (
      <div id={block.cssId || undefined} className={`w-full py-4 px-3 bg-white ${block.cssClass || ''}`}>
        <div className={`max-w-7xl mx-auto flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center`}>
          <div className={`w-full ${textCol}`}>
             <RichTextRenderer 
                content={block.content} 
                useProse={useProse}
              />
          </div>
          <div className={`w-full ${imgCol}`}>
             <div className="relative group">
                {/* Decorative background framing */}
                <div className="absolute -inset-2 lg:-inset-4 bg-gray-100 transform rotate-2 -z-10 border border-gray-200" />
                <img 
                  src={block.image} 
                  alt="Feature Media" 
                  loading="lazy"
                  style={{ width: block.imageWidth || '100%', height: block.imageHeight || 'auto', objectFit: 'cover' }}
                  className="border border-gray-300 shadow-xl rounded-none relative z-10 transition-transform duration-700 group-hover:scale-[1.02]" 
                />
             </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Accordion / FAQ Layout
  if (blockType === 'Accordion') {
    return (
      <div id={block.cssId || undefined} className={`w-full py-16 px-6 bg-gray-50 border-y border-gray-200 ${block.cssClass || ''}`}>
        <div className="max-w-[56rem] mx-auto">
          <AccordionClient items={block.accordionItems} useProse={block.useProse !== false} />
        </div>
      </div>
    );
  }

  // 4. Profiles Directory Grid
  if (blockType === 'ProfileGrid') {
    return (
      <div id={block.cssId || undefined} className={`w-full py-16 px-6 bg-white ${block.cssClass || ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {block.profileItems.map((profile, idx) => {
              const cardContent = (
                <>
                  <div className="aspect-square w-full overflow-hidden border-b border-gray-200 relative bg-gray-50">
                    <img 
                      src={profile.image} 
                      alt={profile.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[600ms]" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5 relative bg-white">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#ffb900] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="font-extrabold text-[#00588b] text-lg mb-0.5 leading-tight">{profile.name}</h3>
                    <p className="text-sm font-bold text-gray-600 mb-2">{profile.designation}</p>
                    {profile.company && (
                      <p className="inline-block px-2 py-0.5 bg-gray-100 border border-gray-200 text-[10px] text-gray-500 uppercase tracking-widest font-semibold font-mono">
                        {profile.company}
                      </p>
                    )}
                  </div>
                </>
              );

              if (profile.slug) {
                return (
                  <Link 
                    key={idx} 
                    href={`/${profile.slug}`}
                    className="bg-white border border-gray-200 shadow-sm overflow-hidden text-center group transition-shadow hover:shadow-xl block hover:border-[var(--color-primary)] transition-colors"
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div key={idx} className="bg-white border border-gray-200 shadow-sm overflow-hidden text-center group transition-shadow hover:shadow-xl">
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 5. Statistics / Emphasized Info Grid
  if (blockType === 'StatsGrid') {
    return (
      <div id={block.cssId || undefined} className={`w-full py-16 px-6 bg-[#00588b] text-white ${block.cssClass || ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#004570]">
            {block.statsItems.map((stat, idx) => {
              const Icon = stat.icon ? LucideIcons[stat.icon] : null;
              return (
                <div key={idx} className="p-6 text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center justify-center border border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-5 border border-white/20">
                    {Icon ? <Icon size={28} className="text-[#ffb900]" /> : <div className="text-[#ffb900] font-black text-xl">#</div>}
                  </div>
                  <div className="text-5xl font-extrabold font-mono mb-2 tracking-tight drop-shadow-md">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-black tracking-[0.15em] uppercase text-[#e2ecf4] leading-snug">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 6. Single Image
  if (blockType === 'SingleImage' && block.singleImage && block.singleImage.path) {
    const { path, height, width, align } = block.singleImage;
    const alignClass = align === 'left' ? 'mr-auto' : (align === 'right' ? 'ml-auto' : 'mx-auto');
    
    return (
      <div id={block.cssId || undefined} className={`w-full bg-white overflow-hidden ${block.cssClass || ''}`}>
        <div className="w-full">
          <img 
            src={path} 
            alt="Single Media" 
            loading="lazy"
            style={{ width: width || '100%', height: height || 'auto', objectFit: 'cover' }}
            className={`${alignClass} block border border-gray-300 shadow-sm rounded-none`} 
          />
        </div>
      </div>
    );
  }
  // 7. Interactive Gallery Block
  if (blockType === 'GalleryBlock') {
    return <GalleryClient items={block.galleryItems} heading={block.galleryHeading} id={block.cssId} className={block.cssClass} />;
  }

  // 8. Hero with Stats
  if (blockType === 'HeroWithStats' && block.heroStats) {
    const { badgeText, titleMain, titleHighlight, subtitle, stats } = block.heroStats;
    return (
      <div id={block.cssId || undefined} className={`w-full ${block.cssClass || ''}`}>
        <section className="relative bg-[#00588b] overflow-hidden py-20 px-6">
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#ffb900]/10" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full border-2 border-[#ffb900]/20 -translate-y-1/2" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative max-w-5xl mx-auto text-center">
            {badgeText && (
              <div className="inline-flex items-center gap-2 bg-[#ffb900]/20 border border-[#ffb900]/40 text-[#ffb900] text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
                <LucideIcons.Sparkles className="w-3.5 h-3.5" />
                {badgeText}
              </div>
            )}
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-3 tracking-tight">
              {titleMain} <span className="text-[#ffb900]">{titleHighlight}</span>
            </h1>
            <p className="text-white/60 text-base lg:text-lg max-w-xl mx-auto">{subtitle}</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-[#ffb900]/40" />
              <div className="w-2 h-2 rounded-full bg-[#ffb900]" />
              <div className="h-px w-16 bg-[#ffb900]/40" />
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 -mt-6 relative z-10 mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats && stats.map((item, i) => {
              const Icon = LucideIcons[item.icon] || LucideIcons.Check;
              return (
                <div key={i} className="bg-white rounded-2xl shadow-md border border-[#00588b]/10 p-5 flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#00588b]/10 flex items-center justify-center mb-2 group-hover:bg-[#ffb900]/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#00588b] group-hover:text-[#ffb900] transition-colors duration-300" />
                  </div>
                  <p className="text-2xl font-black text-[#00588b]">{item.value}</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5 leading-tight">{item.label}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // 9. Leader Profile & Message
  if (blockType === 'LeaderProfile' && block.leaderProfile) {
    const { image, name, role, organization, qualifications, greeting, welcomeHeadline, messageHTML, visionQuote, signatureQuals } = block.leaderProfile;
    return (
      <section id={block.cssId || undefined} className={`max-w-5xl mx-auto px-6 py-12 ${block.cssClass || ''}`}>
        <div className="bg-white rounded-3xl shadow-xl border border-[#00588b]/10 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="relative lg:w-80 shrink-0 bg-gradient-to-b from-[#00588b] to-[#003d63] flex flex-col items-center pt-12 pb-8 px-6">
              <div className="absolute top-6 left-6 w-12 h-12 rounded-full border-2 border-[#ffb900]/30" />
              <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-[#ffb900]/40" />
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-2xl bg-[#ffb900] translate-x-2 translate-y-2" />
                <img src={image} alt={name} className="relative w-52 h-60 object-cover object-top rounded-2xl shadow-2xl border-4 border-white" />
              </div>
              <h2 className="text-xl font-black text-white text-center leading-tight">{name}</h2>
              <p className="text-[#ffb900] font-semibold text-sm mt-1">{role}</p>
              <p className="text-white/60 text-xs mt-0.5 italic text-center">{organization}</p>
              <div className="my-5 w-full h-px bg-white/15" />
              <div className="w-full space-y-3">
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest text-center mb-2">Qualifications</p>
                {qualifications && qualifications.map((q, i) => {
                  const Icon = LucideIcons[q.icon] || LucideIcons.GraduationCap;
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#ffb900]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-[#ffb900]" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold leading-tight">{q.degree}</p>
                        <p className="text-white/55 text-xs leading-tight">{q.institute}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex justify-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#00588b]/10 flex items-center justify-center">
                  <LucideIcons.Quote className="w-7 h-7 text-[#00588b]" />
                </div>
              </div>
              <p className="text-[#00588b] text-lg font-semibold mb-1 italic">{greeting}</p>
              <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-5 leading-tight">{welcomeHeadline}</h3>
              <div className="w-14 h-1 rounded-full bg-[#ffb900] mb-6" />
              <RichTextRenderer 
                content={messageHTML} 
                useProse={block.useProse !== false}
                className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8" 
              />
              {visionQuote && (
                <div className="relative bg-gradient-to-br from-[#00588b]/5 to-[#ffb900]/5 border-l-4 border-[#ffb900] rounded-r-2xl px-6 py-5 mb-8">
                  <p className="text-[#00588b] font-semibold text-sm lg:text-base leading-relaxed italic">&ldquo;{visionQuote}&rdquo;</p>
                </div>
              )}
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[#00588b] text-lg font-black">{name}</p>
                  <p className="text-gray-500 text-sm">{role} &mdash; <span className="italic">{organization}</span></p>
                  {signatureQuals && (
                    <p className="text-gray-400 text-xs mt-1 font-medium italic">
                      {signatureQuals}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 10. Call to Action Banner
  if (blockType === 'CTABanner' && block.ctaBanner) {
    const { badgeText, titleMain, titleHighlight, primaryBtnText, primaryBtnUrl, primaryBtnIcon, secondaryBtnText, secondaryBtnUrl, secondaryBtnIcon } = block.ctaBanner;
    return (
      <section id={block.cssId || undefined} className={`max-w-5xl mx-auto px-6 py-12 ${block.cssClass || ''}`}>
        <div className="relative bg-[#00588b] rounded-3xl px-8 py-10 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#ffb900]/10 rounded-full -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
          <div className="relative">
            {badgeText && <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-2">{badgeText}</p>}
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
              {titleMain} <span className="text-[#ffb900]">{titleHighlight}</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              {primaryBtnText && (
                <a href={primaryBtnUrl} className="inline-flex items-center justify-center gap-2 bg-[#ffb900] hover:bg-yellow-500 text-white font-bold px-7 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm">
                  {primaryBtnText} 
                  {primaryBtnIcon ? (
                    (() => {
                      const Icon = LucideIcons[primaryBtnIcon] || LucideIcons.ChevronRight;
                      return <Icon className="w-4 h-4" />;
                    })()
                  ) : <LucideIcons.ChevronRight className="w-4 h-4" />}
                </a>
              )}
              {secondaryBtnText && (
                <a href={secondaryBtnUrl} className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-xl border border-white/25 transition-all duration-300 text-sm">
                  {secondaryBtnIcon ? (
                    (() => {
                      const Icon = LucideIcons[secondaryBtnIcon] || LucideIcons.Mail;
                      return <Icon className="w-4 h-4" />;
                    })()
                  ) : <LucideIcons.Mail className="w-4 h-4" />}
                  {secondaryBtnText}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
