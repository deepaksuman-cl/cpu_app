import Icon from "../ui/Icon";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import RichTextRenderer from "../common/RichTextRenderer";

export default function AboutSection({ data }) {
  if (!data) return null;
  const { 
    tagline, 
    title, 
    highlight,
    mainImage, 
    yearsValue, 
    yearsLabel, 
    naacBadge, 
    naacSub, 
    description, 
    features, 
    btnText,
    btnIcon,
    btnLink,
    brochureLabel 
  } = data;

  return (
    <section id="about" className="bg-blue-50 py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#00588b] font-bold text-xs uppercase tracking-[.18em] mb-2">
            {tagline}
          </p>
          <h2 className="font-black text-4xl text-gray-900 m-0">
            <span dangerouslySetInnerHTML={{ __html: title }} /> <span className="text-[#00588b]" dangerouslySetInnerHTML={{ __html: highlight }} />
          </h2>
          <div className="w-16 h-1 bg-amber-400 rounded mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden h-[420px] shadow-2xl">
              <Image
                src={mainImage}
                alt="CPU Campus"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 lg:-right-5 bg-[#00588b] text-white rounded-2xl px-5 py-4 shadow-xl min-w-[140px]">
              <div className="font-black text-3xl text-amber-400">{yearsValue}</div>
              <div className="text-xs opacity-90 mt-0.5">{yearsLabel}</div>
            </div>
            <div className="absolute top-6 -left-4 bg-white rounded-2xl px-5 py-3.5 shadow-xl border-2 border-blue-100">
              <div className="font-black text-xl text-[#00588b]">{naacBadge}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{naacSub}</div>
            </div>
          </div>
          <div>
            <RichTextRenderer 
              content={description} 
              useProse={data.useProse !== false}
              className="rdx_text text-gray-800 leading-[1.9] mb-8 text-[15.5px]" 
            />
            <div className="grid grid-cols-2 gap-3.5 mb-8">
              {features?.map((f, i) => {
                return (
                  <div
                    key={i}
                    className="[@media(max-width:476px)]:block  flex items-start gap-3.5 bg-white rounded-2xl p-4 shadow-sm border border-blue-50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Icon name={f.icon || "Award"} size={18} className="text-[#00588b]" />
                    </div>
                    <div>
                      <div className="font-bold text-md text-gray-900">{f.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{f.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* <div className="flex gap-3 flex-wrap">
              <a 
                href={btnLink || "#"}
                className="bg-gradient-to-br from-[#00588b] to-[#003a5c] text-white border-none rounded-full px-7 py-3 font-bold text-sm cursor-pointer flex items-center gap-1.5 hover:scale-105 transition-transform no-underline"
              >
                {btnText} {btnIcon && <Icon name={btnIcon} size={14} />}
              </a>
              <button className="bg-transparent border-2 border-[#00588b] text-[#00588b] rounded-full px-6 py-[11px] font-bold text-sm cursor-pointer flex items-center gap-1.5 hover:bg-[#00588b] hover:text-white transition-all">
                {brochureLabel} <Download size={14} />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
