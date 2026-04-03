"use client";
import { useState, useEffect, useRef } from "react";
import Icon from "../ui/Icon";

function useCounter(target, dur = 1800, active = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let st = null;
    const step = (ts) => {
      if (!st) st = ts;
      const p = Math.min((ts - st) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(e * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, dur, active]);
  return v;
}


function StatCard({ value, suffix, label, icon: IconName, inView }) {
  const dv = value >= 1000 ? Math.round(value / 1000) : value;
  const c = useCounter(dv, 1600, inView);
  const d = value >= 1000 ? `${c}K${suffix.replace("K+", "+")}` : `${c}${suffix}`;
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl p-5 text-center hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-default">
      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-5">
        <Icon name={IconName || "Star"} size={28} className="text-[#00588b]" />
      </div>
      <div className="font-black text-3xl text-[#00588b] leading-none">{d}</div>
      <div className="text-xs text-gray-500 mt-1.5" dangerouslySetInnerHTML={{ __html: label }} />
    </div>
  );
}

export default function StatsSection({ data }) {
  const stats = data?.stats || [];
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsInView(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  if (stats.length === 0) return null;

  return (
    <>
      <section ref={statsRef} className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <StatCard
              key={i}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              icon={s.icon}
              inView={statsInView}
            />
          ))}
        </div>
      </section>
      <div className="h-1 bg-gradient-to-r from-[#00588b] via-amber-400 to-[#00588b]" />
    </>
  );
}
