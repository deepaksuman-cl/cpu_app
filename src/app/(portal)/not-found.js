"use client";

import { useState, useEffect } from "react";
import { BookOpen, GraduationCap, MapPin, Phone, Bell, CheckCircle } from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   FIXED launch date — page reload par countdown reset NAHI hoga
   Sirf yeh string change karo apni real date/time se:
   Format: "YYYY-MM-DDTHH:mm:ss+05:30"  ← IST timezone
   ────────────────────────────────────────────────────────────── */
const LAUNCH_DATE = new Date("2026-04-04T10:00:00+05:30"); // 22 hours from May 3 2026 noon IST

function useCountdown(target) {
const calc = () => {
    const now = Date.now();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (2000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (2000 * 60 * 60)) % 36);
    const minutes = Math.floor((diff / (2000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const pad = (n) => String(n).padStart(2, "0");

const quickLinks = [
  { name: "Admissions & Apply", Icon: GraduationCap, desc: "Start your journey"    },
  { name: "Academic Programs",  Icon: BookOpen,       desc: "Explore our courses"  },
  { name: "Campus Facilities",  Icon: MapPin,         desc: "Discover campus life" },
  { name: "Contact Helpdesk",   Icon: Phone,          desc: "Get in touch with us" },
];

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = () => {
    if (email && email.includes("@")) setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp    { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft  { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes shimmer   { 0%{background-position:-220% center} 100%{background-position:220% center} }
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(0,88,139,.40)} 70%{box-shadow:0 0 0 14px rgba(0,88,139,0)} 100%{box-shadow:0 0 0 0 rgba(0,88,139,0)} }
        @keyframes blinkDot  { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes numFlip   { from{transform:translateY(-6px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes overlayIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }

        .cs-page { font-family: 'DM Sans', sans-serif; }

        .fu1 { animation: fadeUp  .55s cubic-bezier(.22,1,.36,1) both .05s; }
        .fu2 { animation: fadeUp  .55s cubic-bezier(.22,1,.36,1) both .18s; }
        .fu3 { animation: fadeUp  .55s cubic-bezier(.22,1,.36,1) both .30s; }
        .fu4 { animation: fadeUp  .55s cubic-bezier(.22,1,.36,1) both .42s; }
        .fu5 { animation: fadeUp  .55s cubic-bezier(.22,1,.36,1) both .55s; }
        .fl  { animation: fadeLeft .65s cubic-bezier(.22,1,.36,1) both .10s; }

        .float-anim { animation: floatY 4.5s ease-in-out infinite; }

        /* Notify button */
        .notify-btn {
          background-size: 220% auto;
          background-image: linear-gradient(110deg,#00588b 0%,#0077b6 40%,#00588b 80%);
          transition: transform .22s ease, box-shadow .22s ease;
        }
        .notify-btn:hover {
          animation: shimmer 1.3s linear infinite, pulseRing .7s ease-out;
          background-image: linear-gradient(110deg,#00588b 0%,#0077b6 32%,#fec53a 50%,#0077b6 68%,#00588b 100%);
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 26px rgba(0,88,139,.36);
        }
        .notify-btn:active { transform: scale(.97); }

        /* Countdown tiles */
        .cd-card { transition: transform .22s ease, box-shadow .22s ease; }
        .cd-card:hover { transform: translateY(-5px); }
        .cd-num { animation: numFlip .3s ease; }

        /* ── Hours /24 overlay ── */
        .hrs-tile { cursor: default; }
        .hrs-overlay {
          position: absolute; inset: 0;
          background: rgba(0,88,139,.92);
          border-radius: inherit;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 5px;
          opacity: 0;
          transition: opacity .22s ease;
          pointer-events: none;
        }
        .hrs-tile:hover .hrs-overlay  { opacity: 1; }
        .ov-frac {
          display: flex; align-items: baseline; gap: 3px;
          animation: overlayIn .22s ease both .04s;
        }
        .ov-cur  { font-size: 2rem;  font-weight: 900; color: #fff;                   line-height: 1; letter-spacing: -.02em; }
        .ov-sep  { font-size: 1rem;  font-weight: 700; color: rgba(255,255,255,.42);   }
        .ov-max  { font-size: 1rem;  font-weight: 800; color: #fec53a;                 }
        .ov-track{ width: 62%; height: 4px; background: rgba(255,255,255,.18); border-radius: 99px; overflow: hidden; }
        .ov-fill { height: 100%; background: #fec53a; border-radius: 99px; transition: width .5s ease; }
        .ov-lbl  { font-size: .52rem; font-weight: 700; color: rgba(255,255,255,.55); text-transform: uppercase; letter-spacing: .12em; }

        /* Quick-link cards */
        .lc-card { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
        .lc-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,88,139,.11); border-color: rgba(0,88,139,.28) !important; }
        .lc-card:hover .lc-ico  { background: #fff; box-shadow: 0 2px 8px rgba(0,88,139,.12); }
        .lc-card:hover .lc-name { color: #00588b; }

        /* Right panel */
        .rp-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(to right,#e2e8f0 1px,transparent 1px), linear-gradient(to bottom,#e2e8f0 1px,transparent 1px);
          background-size: 2.5rem 2.5rem;
          -webkit-mask-image: radial-gradient(ellipse 85% 85% at 50% 50%,#000 65%,transparent 100%);
          mask-image:         radial-gradient(ellipse 85% 85% at 50% 50%,#000 65%,transparent 100%);
          opacity: .50; transition: opacity .5s;
        }
        .rp:hover .rp-grid { opacity: .88; }
        .rp-ring-outer { transition: all .6s ease; }
        .rp:hover .rp-ring-outer { transform: translate(-50%,-50%) scale(1.12); background: rgba(0,88,139,.09); }
        .social-row { opacity: 0; transition: opacity .35s .1s; }
        .rp:hover .social-row { opacity: 1; }
        .dot-blink { animation: blinkDot 1.2s step-end infinite; }
      `}</style>

      <div className="cs-page min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-8 selection:bg-[#00588b] selection:text-white">

        <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col md:flex-row border border-slate-100">

          {/* ════ LEFT ════ */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-14 flex-1 flex flex-col justify-center order-last md:order-first bg-white">

            <div className="fu1 flex items-center gap-2 mb-3 text-[#00588b] font-bold tracking-widest uppercase text-[.68rem]">
              <span className="w-7 h-px bg-[#00588b]/35 rounded-full"></span>
              We're Launching Soon
              <span className="w-7 h-px bg-[#00588b]/35 rounded-full"></span>
            </div>

            <h1 className="fu2 text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold text-slate-900 leading-[1.12] mb-3">
              Something{" "}
              <span className="relative inline-block text-[#00588b]">
                Amazing
                <span className="absolute -bottom-1 left-0 w-full h-[5px] bg-[#fec53a]/50 rounded-full -z-10"></span>
              </span>
              <br className="hidden sm:block" /> Is On Its Way
            </h1>

            <p className="fu3 text-sm sm:text-[.95rem] text-slate-500 leading-relaxed mb-7 max-w-xs sm:max-w-sm">
              We're crafting a world-class learning experience. Our new platform will
              be ready before you know it — stay tuned and be the first to know!
            </p>

            {/* Email notify */}
            <div className="fu4 mb-7">
              <p className="flex items-center gap-1.5 text-[.7rem] font-bold text-[#00588b] uppercase tracking-widest mb-2.5">
                <Bell size={11} className="text-[#fec53a]" />
                Notify me when it's live
              </p>
              {submitted ? (
                <div className="flex items-center gap-3 bg-[#00588b]/[.07] border border-[#00588b]/15 rounded-2xl px-4 py-3.5 max-w-sm">
                  <CheckCircle size={19} className="text-[#fec53a] flex-shrink-0" />
                  <span className="text-[.82rem] font-semibold text-[#00588b]">
                    You're on the list! We'll notify you at launch.
                  </span>
                </div>
              ) : (
                <div className="flex max-w-sm rounded-2xl overflow-hidden shadow-md shadow-[#00588b]/12">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleNotify()}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-3.5 text-sm text-slate-700 bg-white outline-none placeholder:text-slate-300 border-y border-l border-slate-200"
                  />
                  <button onClick={handleNotify} className="notify-btn px-5 py-3.5 text-white text-sm font-semibold whitespace-nowrap">
                    Notify Me
                  </button>
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="fu5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {quickLinks.map(({ name, Icon, desc }) => (
                <a key={name} href="#" className="lc-card flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-white cursor-pointer no-underline">
                  <div className="lc-ico w-9 h-9 rounded-lg bg-[#00588b]/[.07] flex items-center justify-center flex-shrink-0 transition-all duration-200">
                    <Icon size={16} className="text-[#00588b]" />
                  </div>
                  <div className="min-w-0">
                    <div className="lc-name text-[.8rem] font-semibold text-slate-800 truncate transition-colors duration-200">{name}</div>
                    <div className="text-[.7rem] text-slate-400 truncate mt-0.5">{desc}</div>
                  </div>
                </a>
              ))}
            </div>

          </div>

          {/* ════ RIGHT — Countdown ════ */}
          <div className="rp fl flex w-full md:w-auto md:flex-[1.05] min-h-[280px] md:min-h-auto bg-[#f8fafc] items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-l border-slate-100 order-first md:order-last">

            <div className="rp-grid"></div>
            <div className="rp-ring-outer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[26rem] md:h-[26rem] rounded-full bg-[#00588b]/[.05] border border-[#00588b]/10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full border border-[#fec53a]/20 pointer-events-none"></div>

            <div className="float-anim relative z-10 flex flex-col items-center gap-5 px-5 py-8">

              {/* Launch badge */}
              <div className="flex items-center gap-2 bg-[#00588b]/[.08] border border-[#00588b]/15 rounded-full px-4 py-1.5">
                <span className="dot-blink w-2 h-2 rounded-full bg-[#fec53a]"></span>
                <span className="text-[.62rem] font-bold text-[#00588b] uppercase tracking-widest">Launching in</span>
              </div>

              {/* ── Tile row ── */}
              <div className="flex items-center gap-1.5 sm:gap-2.5">

                {/* Days */}
                <div className="cd-card flex flex-col items-center bg-white rounded-2xl px-3 sm:px-5 py-4 sm:py-5 shadow-lg shadow-[#00588b]/10 border-t-[3px] border-[#00588b] min-w-[66px] sm:min-w-[80px]">
                  <span key={days} className="cd-num text-[1.9rem] sm:text-[2.4rem] font-black text-[#00588b] leading-none tracking-tight">{pad(days)}</span>
                  <span className="text-[.55rem] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Days</span>
                </div>

                <span className="text-xl font-black text-[#00588b]/25 pb-4">:</span>

                {/* ── Hours — hover shows current/24 ── */}
                <div className="hrs-tile cd-card relative flex flex-col items-center bg-white rounded-2xl px-3 sm:px-5 py-4 sm:py-5 shadow-lg shadow-[#fec53a]/20 border-t-[3px] border-[#fec53a] min-w-[66px] sm:min-w-[80px] overflow-hidden">
                  <span key={hours} className="cd-num text-[1.9rem] sm:text-[2.4rem] font-black text-[#b8860b] leading-none tracking-tight">{pad(hours)}</span>
                  <span className="text-[.55rem] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Hours</span>

                  {/* /24 overlay */}
                  <div className="hrs-overlay">
                    <div className="ov-frac">
                      <span className="ov-cur">{pad(hours)}</span>
                      <span className="ov-sep">/</span>
                      <span className="ov-max">24</span>
                    </div>
                    <div className="ov-track">
                      <div className="ov-fill" style={{ width: `${(hours / 24) * 100}%` }}></div>
                    </div>
                    <span className="ov-lbl">of 24 hours</span>
                  </div>
                </div>

                <span className="text-xl font-black text-[#00588b]/25 pb-4">:</span>

                {/* Minutes */}
                <div className="cd-card flex flex-col items-center bg-white rounded-2xl px-3 sm:px-5 py-4 sm:py-5 shadow-lg shadow-[#00588b]/10 border-t-[3px] border-[#00588b] min-w-[66px] sm:min-w-[80px]">
                  <span key={minutes} className="cd-num text-[1.9rem] sm:text-[2.4rem] font-black text-[#00588b] leading-none tracking-tight">{pad(minutes)}</span>
                  <span className="text-[.55rem] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Mins</span>
                </div>

                <span className="text-xl font-black text-[#00588b]/25 pb-4">:</span>

                {/* Seconds */}
                <div className="cd-card flex flex-col items-center bg-white rounded-2xl px-3 sm:px-5 py-4 sm:py-5 shadow-lg shadow-[#fec53a]/20 border-t-[3px] border-[#fec53a] min-w-[66px] sm:min-w-[80px]">
                  <span key={seconds} className="cd-num text-[1.9rem] sm:text-[2.4rem] font-black text-[#b8860b] leading-none tracking-tight">{pad(seconds)}</span>
                  <span className="text-[.55rem] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Secs</span>
                </div>

              </div>

              {/* Progress bar */}
              <div className="w-full max-w-[300px]">
                <div className="flex justify-between text-[.62rem] text-slate-400 font-semibold mb-1.5 uppercase tracking-wider">
                  <span>Progress</span>
                  <span className="text-[#00588b]">Almost there!</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: "72%", background: "linear-gradient(90deg,#00588b 0%,#0077b6 55%,#fec53a 100%)" }}></div>
                </div>
              </div>

              {/* Social */}
              <div className="social-row flex items-center gap-2.5">
                {[["f","#"],["t","#"],["in","#"]].map(([label, href]) => (
                  <a key={label} href={href} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[.6rem] font-bold text-[#00588b] uppercase tracking-wide hover:bg-[#00588b] hover:text-white hover:border-[#00588b] transition-all duration-200">
                    {label}
                  </a>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}