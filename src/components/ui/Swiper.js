"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Swiper({
  items,
  renderSlide,
  perView = 3,
  gap = 16,
  autoInterval = 4000,
  dark = false,
  breakpoints = null,
  hideControls = false,
}) {
  const [winW, setWinW] = useState(1200);
  
  useEffect(() => {
    // Client-side only update after mount
    setWinW(window.innerWidth);
    
    const fn = () => setWinW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const resolvedPerView = breakpoints
    ? Object.entries(breakpoints)
        .filter(([bp]) => winW >= Number(bp))
        .reduce((_, [, v]) => v, perView)
    : perView;

  const [idx, setIdx] = useState(0);
  const max = Math.max(0, items.length - resolvedPerView);
  const timerRef = useRef(null);

  const go = useCallback(
    (n) => {
      setIdx(Math.max(0, Math.min(n, max)));
    },
    [max]
  );
  
  const resetTimer = useCallback(
    (n) => {
      clearInterval(timerRef.current);
      go(n);
      timerRef.current = setInterval(
        () => setIdx((p) => (p >= max ? 0 : p + 1)),
        autoInterval
      );
    },
    [go, max, autoInterval]
  );

  useEffect(() => {
    timerRef.current = setInterval(
      () => setIdx((p) => (p >= max ? 0 : p + 1)),
      autoInterval
    );
    return () => clearInterval(timerRef.current);
  }, [max, autoInterval]);

  useEffect(() => {
    setIdx((p) => Math.min(p, max));
  }, [max]);

  const slideWidth = `calc(${100 / resolvedPerView}% - ${
    (gap * (resolvedPerView - 1)) / resolvedPerView
  }px)`;
  const translateX = `calc(-${idx * (100 / resolvedPerView)}% - ${
    (idx * gap) / resolvedPerView
  }px)`;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-550 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            gap,
            transform: `translateX(${translateX})`,
          }}
        >
          {items.map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: slideWidth, minWidth: slideWidth }}>
              {renderSlide(item, i)}
            </div>
          ))}
        </div>
      </div>
      {!hideControls && (
        <>
          <button
            onClick={() => idx > 0 && resetTimer(idx - 1)}
            disabled={idx === 0}
            className={`absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-none flex items-center justify-center shadow-xl z-20 transition-all ${
               idx === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:scale-110 active:scale-95"
            } ${
              dark ? "bg-amber-400" : "bg-[#00588b]"
            }`}
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          
          <button
            onClick={() => idx < max && resetTimer(idx + 1)}
            disabled={idx === max}
            className={`absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-none flex items-center justify-center shadow-xl z-20 transition-all ${
               idx === max ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:scale-110 active:scale-95"
            } ${
               dark ? "bg-amber-400" : "bg-[#00588b]"
            }`}
          >
            <ChevronRight size={18} className="text-white" />
          </button>
        </>
      )}
      {!hideControls && (
        <div className="flex justify-center gap-1.5 mt-5">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => resetTimer(i)}
              className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
                i === idx
                  ? dark
                    ? "bg-amber-400 w-6"
                    : "bg-[#00588b] w-6"
                  : dark
                  ? "bg-black/30 w-2"
                  : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
