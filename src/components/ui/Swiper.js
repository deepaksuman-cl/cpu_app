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
}) {
  const [winW, setWinW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  
  useEffect(() => {
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
          className="flex"
          style={{
            gap,
            transform: `translateX(${translateX})`,
            transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
            willChange: "transform",
          }}
        >
          {items.map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: slideWidth, minWidth: slideWidth }}>
              {renderSlide(item, i)}
            </div>
          ))}
        </div>
      </div>
      {idx > 0 && (
        <button
          onClick={() => resetTimer(idx - 1)}
          className={`absolute -left-5 top-[42%] -translate-y-1/2 w-10 h-10 rounded-full border-none cursor-pointer flex items-center justify-center shadow-xl z-10 transition-transform hover:scale-110 ${
            dark ? "bg-amber-400" : "bg-[#00588b]"
          }`}
        >
          <ChevronLeft size={18} className="text-white" />
        </button>
      )}
      {idx < max && (
        <button
          onClick={() => resetTimer(idx + 1)}
          className={`absolute -right-5 top-[42%] -translate-y-1/2 w-10 h-10 rounded-full border-none cursor-pointer flex items-center justify-center shadow-xl z-10 transition-transform hover:scale-110 ${
            dark ? "bg-amber-400" : "bg-[#00588b]"
          }`}
        >
          <ChevronRight size={18} className="text-white" />
        </button>
      )}
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
    </div>
  );
}
