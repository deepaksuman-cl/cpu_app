"use client";
import Swiper from "../ui/Swiper";
import Image from "next/image";

export default function AlumniSection({ data }) {
  const alumni = data?.alumni || [];
  if (alumni.length === 0) return null;

  return (
    <section id="alumni" className="bg-[#00588b] py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-9">
          <p className="text-amber-400 font-bold text-xs uppercase tracking-[.18em] mb-2.5">
            {data?.tagline || "Success Stories"}
          </p>
          <h2 className="font-black text-[clamp(26px,3.5vw,44px)] text-white m-0">
            {data?.title || "Our"} <span className="text-amber-400">{data?.titleHighlight || "Alumni"}</span> Leading the World
          </h2>
          <div className="w-14 h-0.5 bg-amber-400 rounded mt-3.5" />
        </div>
        <Swiper
          items={alumni}
          perView={4}
          gap={18}
          autoInterval={4500}
          dark={true}
          breakpoints={{ 0: 1, 640: 2, 1024: 4 }}
          renderSlide={(alum) => (
            <div className="relative overflow-hidden rounded-2xl cursor-pointer h-[400px] bg-gray-900 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
              <div
                className="absolute bottom-14 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full opacity-90"
                style={{ backgroundColor: alum.circleBg || '#fbbf24' }}
              />
              <Image
                src={alum.img}
                alt={alum.name}
                fill
                className="object-cover object-top z-10"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div
                className="absolute  placement_bg_blur  top-0 right-0 bottom-0 w-11 flex items-center justify-center z-20"
                style={{ backgroundColor: alum.companyBg || '#00588b' }}
              >
                <span className="[writing-mode:vertical-rl] rotate-180 text-white font-black text-sm tracking-wide">
                  {alum.company}
                </span>
              </div>
              <div
                className="absolute top-3 left-5 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full z-30"
                style={{ backgroundColor: alum.companyBg || '#00588b' }}
              >
                {alum.badgeText || alum.company}
              </div>
              <div className="absolute placement_bg_blur  text-center bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-2 pb-4 px-3.5 z-40">
                <h5 className="text-center font-extrabold text-base font-extrabold text-[16px] text-white">{alum.name}</h5>
                <span className="text-white/70 text-xs mt-0.4">{alum.role}</span>
                {alum.package && (
                  <h5 className="text-center text-amber-400 font-black text-xs text-[20px] ">
                    {alum.package}
                  </h5>
                )}
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}
