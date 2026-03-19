import AccordionClient from './AccordionClient';
import * as LucideIcons from 'lucide-react';
import GalleryClient from './GalleryClient';

export default function BlockRenderer({ block }) {
  const { blockType } = block;

  // 1. Full Width Rich Text Container
  if (blockType === 'RichTextFull') {
    return (
      <div className="w-full py-12 px-6">
        <div className="max-w-[100%] mx-auto">
          <div 
            className="university-prose prose-max-w-none"
            dangerouslySetInnerHTML={{ __html: block.content }}
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

    return (
      <div className="w-full py-16 px-6 bg-white">
        <div className={`max-w-7xl mx-auto flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center`}>
          <div className={`w-full ${textCol}`}>
             <div 
                className="university-prose max-w-none"
                dangerouslySetInnerHTML={{ __html: block.content }}
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
      <div className="w-full py-16 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-[56rem] mx-auto">
          <AccordionClient items={block.accordionItems} />
        </div>
      </div>
    );
  }

  // 4. Profiles Directory Grid
  if (blockType === 'ProfileGrid') {
    return (
      <div className="w-full py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {block.profileItems.map((profile, idx) => (
              <div key={idx} className="bg-white border border-gray-200 shadow-sm overflow-hidden text-center group transition-shadow hover:shadow-xl">
                 <div className="aspect-square w-full overflow-hidden border-b border-gray-200 relative bg-gray-50">
                    <img 
                      src={profile.image} 
                      alt={profile.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[600ms] " 
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
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 5. Statistics / Emphasized Info Grid
  if (blockType === 'StatsGrid') {
    return (
      <div className="w-full py-16 px-6 bg-[#00588b] text-white">
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
      <div className="w-full py-12 px-6 bg-white overflow-hidden">
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
    return <GalleryClient items={block.galleryItems} heading={block.galleryHeading} />;
  }

  return null;
}
