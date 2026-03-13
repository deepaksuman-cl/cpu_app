"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Calendar, ArrowRight, Newspaper, Play,
  ChevronRight, PauseCircle, Tag, Sparkles,
  GraduationCap, Trophy, BookOpen, Dumbbell,
  BadgeCheck, MapPin, ExternalLink,
} from "lucide-react";

// ╔══════════════════════════════════════════════════════════╗
// ║                     JSON DATA                            ║
// ╚══════════════════════════════════════════════════════════╝
const DATA = {
  video: {
    label: "Virtual Campus Tour",
    title: "Career Point",
    subtitle: "University Kota",
  },
  news: {
    label: "Stay Updated",
    title: "Latest",
    titleAccent: "News",
    items: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=80",
        title: "Technovation 2026 at CPU",
        description: "Career Point University, Kota recently hosted Technovation 2026, a prestigious event that showcased ",
        link: "#",
  
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&q=80",
        title: "Notice for 7th Convocation Ceremony at Career Point University Kota",
        description: "Career Point University, Kota recently hosted Technovation 2026, a prestigious event that showcased ",
        link: "#",

      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&q=80",
        title: "Register for ICWA National Essay Writing Competition 2026",
        description: "Career Point University, Kota recently hosted Technovation 2026, a prestigious event that showcased ",
        link: "#",
   
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80",
        title: "CPU Kota Students Win National Level Robotics Championship 2026",
      description: "Career Point University, Kota recently hosted Technovation 2026, a prestigious event that showcased ",
        link: "#",
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1562774053-701939374585?w=700&q=80",
        title: "New Scholarship Programme Announced for Meritorious Students 2026",
    description: "Career Point University, Kota recently hosted Technovation 2026, a prestigious event that showcased ",
        link: "#",

      },
      {
        id: 6,
        image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=700&q=80",
 
        title: "Annual Sports Meet 2026 Concludes with Record Student Participation",
    description: "Career Point University, Kota recently hosted Technovation 2026, a prestigious event that showcased ",
        link: "#",
   
      },
    ],
  },
};


// ╔══════════════════════════════════════════════════════════╗
// ║               SLIDER CONSTANTS                           ║
// ╚══════════════════════════════════════════════════════════╝
const CARD_H   = 108;
const GAP      = 12;
const SLOT     = CARD_H + GAP;
const VISIBLE  = 3;
const WINDOW_H = VISIBLE * CARD_H + (VISIBLE - 1) * GAP; // 348px
const INTERVAL = 2600;

// ╔══════════════════════════════════════════════════════════╗
// ║                   MAIN COMPONENT                         ║
// ╚══════════════════════════════════════════════════════════╝
export default function NewsVideoSection() {
  const { video, news } = DATA;
  const items     = news.items;
  const loopItems = [...items, ...items, ...items];

  const [offset,  setOffset]  = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused,  setPaused]  = useState(false);
  const [active,  setActive]  = useState(0);

  const indexRef  = useRef(0);
  const pausedRef = useRef(false);

  const tick = useCallback(() => {
    if (pausedRef.current) return;
    indexRef.current += 1;
    setAnimate(true);
    setOffset(indexRef.current * SLOT);
    setActive(indexRef.current % items.length);

    if (indexRef.current >= items.length) {
      setTimeout(() => {
        setAnimate(false);
        setOffset(0);
        indexRef.current = 0;
        setActive(0);
      }, 560);
    }
  }, [items.length]);

  useEffect(() => {
    const id = setInterval(tick, INTERVAL);
    return () => clearInterval(id);
  }, [tick]);

  const onEnter = () => { pausedRef.current = true;  setPaused(true);  };
  const onLeave = () => { pausedRef.current = false; setPaused(false); };

  return (
    <>
      {/* ── Global Styles ───────────────────────────────────── */}
      <style>{`
 
}
      `}</style>

      {/* ── Section ─────────────────────────────────────────── */}
      <section className="nvs-wrap relative overflow-hidden bg-gradient-to-br from-[#deeef8] via-[#edf5fb] to-[#e2eff8] py-20 px-5 md:px-10">

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#00588b]/6 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-28 -right-28 h-[420px] w-[420px] rounded-full bg-[#0093d0]/8 blur-[80px]" />
        <div className="pointer-events-none absolute top-1/2 right-1/3 h-64 w-64 rounded-full bg-white/30 blur-[60px]" />

        {/* Grid */}
        <div className="relative z-10 mx-auto max-w-6xl grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start">

          {/* ══════════════════════════════════════
              LEFT — Virtual Campus Video
          ══════════════════════════════════════ */}
          <div className="flex flex-col gap-6">

            {/* Label chip */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 rounded-full border border-[#00588b]/25 bg-[#00588b]/10 px-3.5 py-1.5">
                <span className="nvs-pulse-dot h-2 w-2 rounded-full bg-[#00588b]" />
                <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#00588b]">
                  {video.label}
                </span>
              </div>
            
            </div>

            {/* Heading */}
            <div className="-mt-1 leading-none">
              <h2 className="nvs-serif nvs-shimmer text-[clamp(34px,4.5vw,52px)] font-bold leading-none">
                {video.title}
              </h2>
              <h2 className="nvs-serif text-[clamp(34px,4.5vw,52px)] font-bold leading-none text-[#00588b]">
                {video.subtitle}
              </h2>
            </div>

            {/* Video card */}
            <div className="nvs-float relative overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(0,88,139,0.22)]">
              {/* Glow ring */}
              <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl ring-1 ring-[#00588b]/20" />

              <div className="aspect-video bg-black">
                <iframe 
            src="https://www.google.com/maps/embed?pb=!4v1772717049780!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ3NrcnFUWEE.!2m2!1d25.01089210285466!2d75.91354173593469!3f71.5101163864775!4f27.311898217757573!5f0.7820865974627469" 
    
               allowFullScreen
                  className="h-full w-full border-0"
            referrerPolicy="no-referrer-when-downgrade">
        </iframe>
              </div>      
            </div>

            {/* Description */}
            <p className="border-l-2 border-[#00588b]/30 pl-4 text-[13.5px] leading-relaxed text-[#4a6d84]">
              {video.description}
            </p>

           
          </div>

          {/* ══════════════════════════════════════
              RIGHT — Latest News Auto Slider
          ══════════════════════════════════════ */}
          <div className="flex flex-col gap-5">

            {/* Header */}
            <div className="flex items-end justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-full border border-[#00588b]/25 bg-[#00588b]/10 px-3.5 py-1.5">
                    <Newspaper size={11} className="text-[#00588b]" />
                    <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#00588b]">
                      {news.label}
                    </span>
                  </div>
                </div>
                <h2 className="nvs-serif text-[clamp(24px,3.2vw,36px)] font-bold leading-tight text-[#0b1e2d]">
                  {news.title}{" "}
                  <span className="text-[#00588b]">{news.titleAccent}</span>
                </h2>
              </div>

              {/* Story counter */}
              <div className="flex flex-col items-end">
                <span className="nvs-serif text-4xl font-bold leading-none text-[#00588b]">
                  {String(items.length).padStart(2, "0")}
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-[2px] text-[#8fb3c8]">
                  Stories
                </span>
              </div>
            </div>

            {/* ── Sliding window ── */}
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ height: `${WINDOW_H}px` }}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              {/* Fade masks */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-[#edf5fb] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[#deeef8] to-transparent" />

              {/* Pause overlay */}
              <div
                className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 ${
                  paused ? "opacity-100" : "opacity-0"
                }`}
              >
               
              </div>

              {/* Slide track */}
              <div
                className="flex flex-col"
                style={{
                  gap: `${GAP}px`,
                  transform: `translateY(-${offset}px)`,
                  transition: animate
                    ? "transform 0.55s cubic-bezier(0.4,0,0.2,1)"
                    : "none",
                  willChange: "transform",
                }}
              >
                {loopItems.map((item, i) => {
            
                  return (
                    <a
                      key={`${item.id}-loop-${i}`}
                      href={item.link}
                      className="nvs-card group flex overflow-hidden rounded-2xl border border-white/80 bg-white/88 text-inherit no-underline shadow-[0_2px_18px_rgba(0,88,139,0.07)] backdrop-blur-sm transition-all duration-250 hover:-translate-y-px hover:shadow-[0_10px_36px_rgba(0,88,139,0.15)] flex-shrink-0"
                      style={{ height: `${CARD_H}px`, minHeight: `${CARD_H}px` }}
                    >
                      {/* Left accent gradient bar */}
                      <span className="w-1 min-w-[4px] flex-shrink-0 bg-gradient-to-b from-[#00588b] via-[#0070b0] to-[#0093d0] rounded-l-2xl" />

                      {/* Thumbnail */}
                      <div className="relative h-full w-24 min-w-[96px] overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="nvs-card-img h-full w-full object-cover"
                        />
                        {/* subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col justify-center gap-1.5 overflow-hidden px-3.5 py-2.5">

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center p-3 gap-1.5">
                 {/* Title */}
                        <h5 className="nvs-clamp2 nvs-clamp-title  text-[15px] font-semibold l text-[#0b1e2d]">
                          {item.title}
                        </h5>
                        
                          <p className="nvs-clamp2 nvs-clamp-dec m-0 text-[12.5px] font-semibold leading-snug text-[#0b1e2d]">
                          {item.description}
                        </p>

                        {/* Read more */}
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#00588b] transition-all duration-200 group-hover:gap-2">
                          Read More
                          <ArrowRight
                            size={11}
                            strokeWidth={2.5}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </span>
                  
          
                        </div>

                       
                      </div>

                      {/* Right external icon */}
                      <div className="flex items-center pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ExternalLink size={13} className="text-[#b8d5e8]" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-1.5">
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`block rounded-full transition-all duration-350 ${
                    i === active
                      ? "h-2 w-6 bg-[#00588b]"
                      : "h-2 w-2 bg-[#b8d5e8]"
                  }`}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="-mt-1 h-[3px] overflow-hidden rounded-full bg-[#c8e0ef]">
              <div
                className={`nvs-prog h-full rounded-full bg-gradient-to-r from-[#00588b] to-[#0093d0] ${
                  paused ? "stopped" : ""
                }`}
              />
            </div>

        
          </div>
        </div>
      </section>
    </>
  );
}
