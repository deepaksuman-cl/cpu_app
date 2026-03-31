"use client";
import { ArrowRight, Calendar, Star, Zap, Microscope, Plus, Minus, Facebook, Instagram, Youtube, Twitter, Linkedin, Phone, Mail, GraduationCap, Download, ChevronRight } from "lucide-react";
import { useState } from "react";
import RichTextRenderer from "../common/RichTextRenderer";

function Lightbox({ src, title, onClose }) {
  if (!src) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/92 z-[99999] flex items-center justify-center p-5">
      <button onClick={onClose} className="absolute top-5 right-6 bg-white/10 border-none rounded-full w-11 h-11 flex items-center justify-center cursor-pointer">
        <span className="text-white font-bold text-xl">✕</span>
      </button>
      <img src={src} alt={title || "Image"} className="max-w-[90vw] max-h-[84vh] rounded-2xl object-contain"/>
    </div>
  );
}
export function ResearchSection({ data }) {
  const [lightbox, setLightbox] = useState(null);
  const items = data?.items || [];
  const { title, highlight } = data || {};
  
  return (
    <>
      <section id="research" className="bg-white py-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-black text-3xl md:text-5xl text-gray-900">
              <span dangerouslySetInnerHTML={{ __html: title || "Pioneering" }} /> <span className="text-[#00588b]" dangerouslySetInnerHTML={{ __html: highlight || "Research at CPU" }} />
            </h2>
            <div className="w-14 h-1 bg-amber-400 rounded mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item, i) => (
              <div 
                key={i} 
                className="rounded-2xl overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
                onClick={() => setLightbox({ src: item.img, title: item.title })}
              >
                <div className="h-52 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover block hover:scale-105 transition-transform duration-400"/>
                </div>
                <div className="p-5">
                  <span className="bg-blue-50 text-[#00588b] text-[11px] font-bold px-2.5 py-0.5 rounded-full">{item.tag}</span>
                  <h3 className="font-extrabold text-gray-900 text-base my-2.5">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-[1.65] m-0">{item.desc}</p>
                  <a href="#" className="text-[#00588b] font-bold text-[13px] flex items-center gap-1 mt-3 no-underline hover:gap-2 transition-all">
                    Learn More <ArrowRight size={13}/>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Lightbox src={lightbox?.src} title={lightbox?.title} onClose={() => setLightbox(null)} />
    </>
  );
}

const iconMapping = { Zap, Microscope, Briefcase: Zap, Star }; 

export function HappeningsSection({ data }) {
  const happenings = data?.items || [];
  const { title, highlight } = data || {};

  return (
    <section className="bg-white py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-black text-3xl md:text-5xl text-gray-900">
            <span dangerouslySetInnerHTML={{ __html: title || "Happenings" }} /> <span className="text-[#00588b]" dangerouslySetInnerHTML={{ __html: highlight || "@CPU" }} />
          </h2>
          <div className="w-14 h-1 bg-amber-400 rounded mx-auto mt-4"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {happenings.map((h, i) => {
            const Ic = iconMapping[h.icon] || Zap;
            const CardWrapper = h.link ? 'a' : 'div';
            const linkProps = h.link ? {
              href: h.link.startsWith('http') ? h.link : h.link.startsWith('/') ? h.link : `/${h.link}`,
              target: h.link.startsWith('http') ? '_blank' : undefined,
              rel: h.link.startsWith('http') ? 'noopener noreferrer' : undefined
            } : {};
            
            return (
              <CardWrapper 
                key={i} 
                {...linkProps}
                className={`group block rounded-2xl overflow-hidden border border-blue-100 cursor-pointer bg-white hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 no-underline text-inherit`}
              >
                <div className={`h-40 bg-gradient-to-br ${h.colorClass} flex items-center justify-center relative overflow-hidden group/hap`}>
                  {h.image ? (
                    <img src={h.image} alt={h.title || 'Event'} className="w-full h-full object-cover group-hover/hap:scale-110 transition-transform duration-700" />
                  ) : (
                    <Ic size={52} className="text-white/20 group-hover/hap:scale-110 transition-transform duration-700"/>
                  )}
                  <div className="absolute top-2.5 right-2.5 bg-amber-400 text-black text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm z-10">{h.tag}</div>
                </div>
                <div className="p-4 relative">
                  <div className="flex justify-between items-start gap-2">
                    <RichTextRenderer 
                      content={h.title} 
                      className="font-bold text-gray-900 text-sm mb-2 flex-1" 
                    />
                    <ChevronRight 
                      size={16} 
                      className="text-[#00588b] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-1" 
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1"><Calendar size={12}/> {h.date}</div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <button className="bg-gradient-to-br from-[#00588b] to-[#003a5c] text-white border-none rounded-full px-7 py-3 font-bold text-sm cursor-pointer inline-flex items-center gap-1.5 hover:scale-105 transition-transform">
            View All Events <ArrowRight size={14}/>
           </button>
        </div>
      </div>
    </section>
  );
}

export function FAQSection({ data }) {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Prefer relational data over legacy JSON items
  const relationalFaqs = data?.faqsRel?.map(f => ({
    q: f.question,
    a: f.answer
  })) || [];

  const items = relationalFaqs.length > 0 ? relationalFaqs : (data?.faqs || []);
  const { title, highlight } = data || {};
  
  return (
    <section className="bg-blue-50 py-16 px-4 overflow-hidden">
      <div className="max-w-[860px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-black text-3xl md:text-5xl text-gray-900">
            <span dangerouslySetInnerHTML={{ __html: title || "Frequently Asked" }} /> <span className="text-[#00588b]" dangerouslySetInnerHTML={{ __html: highlight || "Questions" }} />
          </h2>
          <div className="w-14 h-1 bg-amber-400 rounded mx-auto mt-4"/>
        </div>
        <div className="flex flex-col gap-2.5">
          {items.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-blue-100 overflow-hidden bg-white shadow-sm">
              <button 
                className="w-full flex justify-between items-center px-[22px] py-[18px] bg-transparent border-none cursor-pointer text-left font-sans" 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-bold text-gray-900 text-sm pr-3.5 leading-relaxed">{faq.q}</span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${openFaq === i ? "bg-[#00588b]" : "bg-gray-100"}`}>
                  {openFaq === i ? <Minus size={13} className="text-white"/> : <Plus size={13} className="text-gray-600"/>}
                </div>
              </button>
              {openFaq === i && (
                <div className="px-[22px] pb-[18px]">
                  <RichTextRenderer 
                    content={faq.a} 
                    className="text-gray-500 text-sm leading-[1.75] m-0" 
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SocialWallSection({ data }) {
  const [lightbox, setLightbox] = useState(null);
  const images = data?.images || [];
  const { title, highlight } = data || {};

  return (
    <>
      <section className="bg-white py-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-black text-3xl md:text-5xl text-gray-900">
              <span dangerouslySetInnerHTML={{ __html: title || "CPU" }} /> <span className="text-[#00588b]" dangerouslySetInnerHTML={{ __html: highlight || "Social Wall" }} />
            </h2>
            <div className="w-14 h-1 bg-amber-400 rounded mx-auto mt-4"/>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((src, i) => (
              <div 
                key={i} 
                className="rounded-2xl overflow-hidden aspect-square cursor-pointer hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group relative"
                onClick={() => setLightbox({ src, title: "CPU Campus Life" })}
              >
                <img src={src} alt={`Social ${i+1}`} loading="lazy" className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-400"/>
                <div className="absolute inset-0 bg-[#00588b]/0 group-hover:bg-[#00588b]/25 transition-all duration-300 flex items-center justify-center">
                  <Instagram size={28} className="text-white/0 group-hover:text-white/80 transition-all duration-300"/>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-5 mt-5 flex-wrap">
            {[
              { Ic: Facebook, label: "Facebook", c: "text-[#1877F2]" },
              { Ic: Instagram, label: "Instagram", c: "text-[#E4405F]" },
              { Ic: Youtube, label: "YouTube", c: "text-red-600" },
              { Ic: Twitter, label: "Twitter", c: "text-sky-500" }
            ].map(({ Ic, label, c }, i) => (
              <a key={i} href="#" className={`flex items-center gap-1.5 ${c} font-bold text-sm no-underline hover:opacity-80 transition-opacity`}>
                <Ic size={16}/> {label}
              </a>
            ))}
          </div>
        </div>
      </section>
      <Lightbox src={lightbox?.src} title={lightbox?.title} onClose={() => setLightbox(null)} />
    </>
  );
}


export function CTASection({ data }) {
  if (!data) return null;
  const { title, description, applyLabel, phone, brochureLabel } = data;

  return (
    <section className="bg-gradient-to-br from-[#00588b] to-[#003a5c] py-20 px-4 overflow-hidden">
      <div className="max-w-[860px] mx-auto text-center">
        <RichTextRenderer 
          content={title} 
          className="text-white font-black text-3xl mb-3" 
        />
        <RichTextRenderer 
          content={description} 
          className="text-white/80 text-base max-w-xl mx-auto mb-8 leading-[1.75]" 
        />
        <div className="flex justify-center gap-3.5 flex-wrap">
          <button className="bg-gradient-to-br from-amber-400 to-amber-600 text-white border-none rounded-full px-8 py-3.5 font-extrabold text-[15px] cursor-pointer flex items-center gap-1.5 hover:scale-105 transition-transform">
            <GraduationCap size={16}/> {applyLabel}
          </button>
          <a href={`tel:${phone}`} className="bg-transparent text-white border-2 border-white/60 rounded-full px-7 py-3.5 font-bold text-[15px] flex items-center gap-2 no-underline hover:bg-white/15 hover:border-white transition-all">
            <Phone size={15}/> {phone}
          </a>
          <button className="bg-transparent text-white border-2 border-white/60 rounded-full px-7 py-3.5 font-bold text-[15px] cursor-pointer flex items-center gap-2 hover:bg-white/15 hover:border-white transition-all">
            <Download size={15}/> {brochureLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
