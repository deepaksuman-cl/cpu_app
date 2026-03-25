"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, MapPin, Sparkles, Star, BadgeCheck } from "lucide-react";

function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className={
            i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default function TestimonialSection({ data }) {
  const testimonials = data?.testimonials || [];
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);
  const total = testimonials.length;

  const go = useCallback(
    (n) => {
      if (total === 0) return;
      clearInterval(timerRef.current);
      setActive((n + total) % total);
      setAnimKey((k) => k + 1);
      timerRef.current = setInterval(() => {
        setActive((p) => (p + 1) % total);
        setAnimKey((k) => k + 1);
      }, 5000);
    },
    [total]
  );

  useEffect(() => {
    if (total === 0) return;
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % total);
      setAnimKey((k) => k + 1);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  if (total === 0) return null;

  const t = testimonials[active];

  return (
    <>
      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateX(-20px) rotate(-3deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(-3deg);
          }
        }
      `}</style>
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/40 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 border border-blue-200 bg-white text-[#00588b] text-xs font-bold px-4 py-1.5 rounded-full mb-5 shadow-sm">
              <Sparkles size={13} className="text-amber-400" /> {data?.tagline || "STUDENT STORIES"}
            </span>
            <h2 className="font-black text-4xl md:text-5xl text-slate-900 leading-tight m-0" dangerouslySetInnerHTML={{ __html: data?.title || "Our Students Speak" }} />
            <p className="text-slate-500 text-sm mt-3 flex items-center justify-center gap-1.5">
              <MapPin size={13} className="text-[#00588b]" />
              {data?.location || "Career Point University, Kota, Rajasthan"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex flex-col items-center">
              <div
                key={`card-${animKey}`}
                className="relative w-72 md:w-80"
                style={{ animation: "cardIn 0.55s cubic-bezier(.2,0,.2,1) both" }}
              >
                <div className="absolute inset-0 bg-white rounded-3xl shadow-lg rotate-6 scale-95 translate-y-2 opacity-30" />
                <div className="absolute inset-0 bg-white rounded-3xl shadow-lg rotate-3 translate-y-1 opacity-55" />
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden -rotate-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-80 md:h-96 object-cover object-top"
                  />
                  {/* <div
                    className={`absolute top-3.5 left-3.5 ${t.tagColor} text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wide`}
                  >
                    {t.tag}
                  </div>
                  <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur rounded-xl px-2.5 py-1.5 shadow flex items-center gap-1">
                    <StarRating rating={t.rating} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pb-4 pt-10">
                    <p className="text-white font-extrabold text-lg leading-tight">
                      {t.name}
                    </p>
                    <p className="text-amber-400 text-xs font-bold mt-0.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                      {t.company}
                    </p>
                    <p className="text-white/55 text-[11px] mt-0.5">{t.batch}</p>
                  </div> */}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={() => go(active - 1)}
                  className="w-9 h-9 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center hover:bg-[#00588b] hover:border-[#00588b] transition-all group shadow-sm"
                >
                  <ChevronLeft
                    size={16}
                    className="text-slate-500 group-hover:text-white transition-colors"
                  />
                </button>
                <div className="flex items-center gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
                        i === active
                          ? "w-6 bg-[#00588b]"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => go(active + 1)}
                  className="w-9 h-9 rounded-full bg-[#00588b] border-2 border-[#00588b] flex items-center justify-center hover:bg-[#003a5c] transition-all shadow"
                >
                  <ChevronRight size={16} className="text-white" />
                </button>
              </div>
            </div>

            <div
              key={`quote-${animKey}`}
              style={{ animation: "fadeSlideUp 0.5s cubic-bezier(.2,0,.2,1) both" }}
            >
              <div className="flex justify-end gap-2 mb-6">
                {[
                  { Icon: ChevronLeft, fn: () => go(active - 1) },
                  { Icon: ChevronRight, fn: () => go(active + 1) },
                ].map(({ Icon, fn }, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100 transition-colors shadow-sm"
                  >
                    <Icon size={15} className="text-slate-500" />
                  </button>
                ))}
              </div>

              <div className="flex gap-5">
                <div className="w-1 rounded-full bg-gradient-to-b from-[#00588b] to-blue-200 flex-shrink-0 self-stretch min-h-[180px]" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <StarRating rating={t.rating} />
                    <span className="flex items-center gap-1 text-[#00588b] text-[11px] font-extrabold uppercase tracking-widest">
                      <BadgeCheck size={13} /> Verified Student
                    </span>
                  </div>
                  <blockquote className="text-slate-700 text-lg md:text-xl font-semibold italic leading-relaxed mb-8 m-0">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                   
                      <div>
                        <p className="font-extrabold text-slate-900 text-md leading-tight">
                          {t.name}
                        </p>
                        <p className="text-slate-400 text-xs mt-1.5 mb-1.5">
                          {t.course}&nbsp;&nbsp;
                          <span className="text-[#000] font-bold">{t.company}</span>
                        </p>
                        <p className="text-slate-800 text-[11px]">
                          {t.batch} · CPU Kota
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 text-center min-w-[88px] shadow-sm">
                      <p className="text-[10px] font-extrabold  text-slate-400 uppercase tracking-widest">
                        Package
                      </p>
                      <p className="text-[#00588b] font-black text-base leading-tight mt-0.5">
                        {t.package}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2.5 mt-1 flex-wrap">
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                  i === active
                    ? "border-[#00588b] scale-110 shadow-lg"
                    : "border-transparent opacity-55 hover:opacity-90 hover:scale-105"
                }`}
                style={{ width: 56, height: 56 }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover object-top"
                />
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
