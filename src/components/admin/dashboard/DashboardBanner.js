'use client';

import { Clock, Moon, Sun, Sunrise, Sunset, Sparkles, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardBanner() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return { text: 'Good Morning', icon: <Sunrise className="text-amber-400" /> };
    if (hour < 17) return { text: 'Good Afternoon', icon: <Sun className="text-amber-400" /> };
    if (hour < 21) return { text: 'Good Evening', icon: <Sunset className="text-orange-400" /> };
    return { text: 'Good Night', icon: <Moon className="text-blue-200" /> };
  };

  const greeting = getGreeting();
  const dateStr = time.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const timeStr = time.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#003a5c] via-[#00588b] to-[#0174ad] p-6 md:p-8 text-white shadow-2xl border border-white/10">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ffb900]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left: Greeting & Date */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg animate-fade-in-down">
            {greeting.icon}
            <span className="text-xs font-black uppercase tracking-widest text-blue-50">
              {greeting.text}, Content Management Team
            </span>
          </div>
          
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Welcome back to <span className="text-[#ffb900]">CP University</span> Dashboard
            </h1>
            <p className="text-blue-100/80 text-sm font-medium">
              Manage your university operations with precision and speed.
            </p>
          </div>
        </div>

        {/* Right: Clock & Weather Widget (Simulated) */}
        <div className="shrink-0 flex flex-col items-center md:items-end space-y-3">
          <div className="bg-white/10 backdrop-blur-[12px] p-6 rounded-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] flex flex-col items-center group transition-all hover:bg-white/15">
             <div className="flex items-center gap-2 text-[#ffb900] mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
               <Clock size={16} />
               <span className="text-[10px] font-black uppercase tracking-widest">Global University Time</span>
             </div>
             <div className="text-4xl md:text-5xl font-black tracking-tighter tabular-nums drop-shadow-md cursor-default">
               {timeStr}
             </div>
             <div className="text-[11px] font-bold text-blue-100/60 mt-2 uppercase tracking-wide">
               {dateStr}
             </div>
          </div>
          
          <div className="inline-flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
             <Sparkles size={12} className="text-[#ffb900]" />
             <span>Powered by CPU Core Systems</span>
          </div>
        </div>
      </div>
      
      {/* Visual Stripe */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffb900]/40 to-transparent" />
    </div>
  );
}
