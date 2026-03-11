"use client";
import { useState, useRef, useEffect } from "react";
import {
  BookOpen, TrendingUp, Cpu, Globe, Star, ChevronRight, ChevronLeft,
  Play, ArrowRight, Target, Lightbulb, GraduationCap, Building2,
  FlaskConical, Presentation, BarChart3, Briefcase, CheckCircle,
  Quote, MapPin, Phone, Mail, ExternalLink, Trophy, Code2, Database,
  Network, Shield
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────────── */
const stats = [
  { value: "75L", label: "Highest Package",    icon: TrendingUp },
  { value: "3L",  label: "Avg Salary Package", icon: BarChart3 },
  { value: "20K", label: "OJT Stipend/month",  icon: Briefcase },
];

const research = [
  { value: "100+", label: "Research Papers Published", icon: BookOpen },
  { value: "30+",  label: "Conference Presentations",  icon: Presentation },
  { value: "5+",   label: "Books",                     icon: GraduationCap },
  { value: "5+",   label: "Patents Published",         icon: FlaskConical },
];

const programmes = [
  {
    degree: "UG · 3 Years", icon: Code2,
    name: "Bachelor of Computer Application (BCA)",
    desc: "A 3-year undergraduate programme covering programming, web development, databases, networking, and application development.",
    highlights: ["Programming Fundamentals", "Web Technologies", "Database Systems", "Software Engineering"],
  },
  {
    degree: "UG · 3 Years", icon: Network,
    name: "BBA Information Technology",
    desc: "Blend of business management and information technology preparing students for managerial roles in tech companies.",
    highlights: ["Business Management", "IT Infrastructure", "Project Management", "Digital Marketing"],
  },
  {
    degree: "PG · 2 Years", icon: Database,
    name: "Master of Computer Applications (MCA)",
    desc: "Advanced postgraduate programme preparing students for research, industry and academia in computer science.",
    highlights: ["Advanced Algorithms", "Cloud Computing", "AI & ML", "Research Methodology"],
  },
];

const placements = [
  { name: "Ravindra Singh",  company: "ATC",             img: "👨‍💼", pkg: "8 LPA" },
  { name: "Archana Kumari",  company: "Publicis Sapient", img: "👩‍💻", pkg: "12 LPA" },
  { name: "Harshit Sharma",  company: "Metafic",          img: "👨‍🔬", pkg: "10 LPA" },
  { name: "Kiran Daklani",   company: "Zalando",          img: "👩‍🏫", pkg: "75 LPA" },
  { name: "Saloni Shukla",   company: "Gartner",          img: "👩‍💼", pkg: "9 LPA" },
  { name: "Rahul Verma",     company: "Infosys",          img: "👨‍💻", pkg: "7 LPA" },
];

const alumni = [
  { name: "Aishwarya Thakur", role: "Software Engineer, Gartner",    img: "👩‍💻" },
  { name: "Akash Arya",        role: "Software Developer, IT Co.",     img: "👨‍💼" },
  { name: "Khyati Dharniya",   role: "Display Engineer, Tech Startup", img: "👩‍🔬" },
  { name: "Gaurav Awasthi",    role: "Support Engineer, LTI",          img: "👨‍💻" },
  { name: "Priya Sharma",      role: "Data Analyst, Accenture",        img: "👩‍🏫" },
  { name: "Amit Rajput",       role: "Cloud Architect, AWS Partner",   img: "👨‍🎓" },
];

const testimonials = [
  {
    name: "Archana Kumari", batch: "BCA 2019", company: "Publicis Sapient", img: "👩‍💻", rating: 5,
    text: "Career Point University transformed my career. The faculty's dedication and industry-focused curriculum gave me the confidence to crack top MNC interviews. The placement support is exceptional and the learning environment is world-class.",
  },
  {
    name: "Rahul Verma", batch: "MCA 2021", company: "Infosys", img: "👨‍💻", rating: 5,
    text: "The research opportunities and cutting-edge labs at CPU are unmatched. I published 2 research papers during my MCA, which opened doors I never imagined. The faculty mentorship program is truly transformative.",
  },
  {
    name: "Priya Sharma", batch: "BCA 2020", company: "Accenture", img: "👩‍🏫", rating: 5,
    text: "From day one, the university prepared us for real-world challenges. The industry tie-ups and live projects gave hands-on experience. I landed my dream job because of the skills I developed here.",
  },
];

const partners = ["Google", "Accenture", "Spiders", "Justdial", "Logictrix"];

const infraFeatures = [
  { icon: Building2, title: "Modern Labs",       desc: "State-of-the-art computer labs with latest hardware" },
  { icon: Cpu,       title: "High-End Hardware", desc: "Latest servers, workstations & GPU clusters" },
  { icon: Globe,     title: "Fast Internet",     desc: "Gigabit campus network with 99.9% uptime" },
  { icon: Shield,    title: "Secure Campus",     desc: "24/7 security surveillance & smart access" },
];

/* ─── AUTO-PLAY HOOK ────────────────────────────────────────── */
function useSlider(length, delay = 4000) {
  const [active, setActive] = useState(0);
  const timer = useRef(null);
  const restart = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setActive(p => (p + 1) % length), delay);
  };
  useEffect(() => { restart(); return () => clearInterval(timer.current); }, []);
  const go   = (i) => { setActive(i); restart(); };
  const prev = ()  => go((active - 1 + length) % length);
  const next = ()  => go((active + 1) % length);
  return { active, go, prev, next };
}

/* ─── SMALL COMPONENTS ──────────────────────────────────────── */
const P  = "#00588b";
const G  = "#ffb900";
const DK = "#0a1628";

function Label({ children }) {
  return (
    <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-4"
      style={{ background: "rgba(0,88,139,0.1)", color: P, border: `1px solid rgba(0,88,139,0.2)` }}>
      {children}
    </span>
  );
}

function Dots({ count, active, go }) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => go(i)}
          className="rounded-full transition-all duration-300"
          style={{ width: active === i ? 28 : 10, height: 10, background: active === i ? P : "#cbd5e1" }} />
      ))}
    </div>
  );
}

function NavBtn({ onClick, children, dark }) {
  return (
    <button onClick={onClick}
      className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
      style={{ background: dark ? "rgba(255,255,255,0.1)" : "rgba(0,88,139,0.08)", color: dark ? "#fff" : P, border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,88,139,0.15)"}` }}>
      {children}
    </button>
  );
}

function SliderControls({ slider, count, dark }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <NavBtn onClick={slider.prev} dark={dark}><ChevronLeft className="w-5 h-5" /></NavBtn>
      <Dots count={count} active={slider.active} go={slider.go} />
      <button onClick={slider.next}
        className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ background: P, color: "#fff" }}>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────── */
export default function SchoolPage() {
  const [activeProg, setActiveProg] = useState(0);
  const tSlider = useSlider(testimonials.length, 5000);
  const pSlider = useSlider(Math.ceil(placements.length / 3), 3500);
  const aSlider = useSlider(Math.ceil(alumni.length / 3), 4000);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
        .disp { font-family:'Playfair Display',serif; }
        .card { transition:transform .3s,box-shadow .3s; }
        .card:hover { transform:translateY(-6px); box-shadow:0 24px 48px rgba(0,88,139,0.14); }
        .slide { display:flex; transition:transform .6s cubic-bezier(.77,0,.175,1); }
        .dot-bg { background-image:radial-gradient(circle,rgba(0,88,139,0.12) 1px,transparent 1px); background-size:24px 24px; }
        .stripe { background:repeating-linear-gradient(135deg,transparent,transparent 20px,rgba(0,88,139,0.025) 20px,rgba(0,88,139,0.025) 40px); }
        @keyframes fl { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes sp { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        .fl { animation:fl 5s ease-in-out infinite; }
        .sp { animation:sp 22s linear infinite; }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, #001f33 0%, ${P} 55%, #007abf 100%)` }}>
        <div className="absolute inset-0 dot-bg opacity-25" />
        {/* Spinning rings */}
        <div className="sp absolute right-0 top-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ border: `2px solid rgba(255,185,0,0.2)`, transform: "translate(35%,-50%)" }} />
        <div className="sp absolute right-0 top-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ border: `2px dashed rgba(255,255,255,0.1)`, transform: "translate(25%,-50%)", animationDirection: "reverse" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold"
              style={{ background: "rgba(255,185,0,0.15)", color: G, border: "1px solid rgba(255,185,0,0.35)" }}>
              <Star className="w-4 h-4 fill-current" /> Best Computer Application College in Kota
            </div>
            <h1 className="disp text-5xl lg:text-[64px] font-black text-white leading-[1.05] mb-6">
              School of<br />
              <span style={{ color: G }}>Computer</span><br />
              Applications &<br />
              <span style={{ color: "#7dd3fc" }}>Technology</span>
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-10 max-w-lg opacity-90">
              Career Point University offers cutting-edge programs shaping future technologists, researchers, and industry-ready professionals in Kota.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
                style={{ background: G, color: DK, boxShadow: `0 8px 32px rgba(255,185,0,0.4)` }}
                onMouseEnter={e => e.currentTarget.style.background = "#e6a700"}
                onMouseLeave={e => e.currentTarget.style.background = G}>
                Apply Now <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-lg text-white transition-all hover:bg-white/10"
                style={{ border: "2px solid rgba(255,255,255,0.3)" }}>
                <Play className="w-5 h-5" style={{ color: G }} /> Explore Programs
              </button>
            </div>
            <div className="flex gap-10 mt-12">
              {[["500+","Students"],["50+","Faculty"],["20+","Partners"]].map(([v,l]) => (
                <div key={l}>
                  <div className="disp text-3xl font-black" style={{ color: G }}>{v}</div>
                  <div className="text-blue-200 text-sm mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="fl relative w-[320px] h-[320px]">
              <div className="absolute inset-0 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,185,0,0.08)", border: "2px solid rgba(255,185,0,0.25)" }}>
                <Cpu className="w-28 h-28 text-white opacity-90" />
              </div>
              {[BookOpen, Code2, Globe, Shield, GraduationCap, Trophy].map((Icon, i) => (
                <div key={i} className="absolute w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: i % 2 === 0 ? G : "#fff",
                    top:  `${50 - 52 * Math.cos((i * Math.PI * 2) / 6)}%`,
                    left: `${50 + 52 * Math.sin((i * Math.PI * 2) / 6)}%`,
                    transform: "translate(-50%,-50%)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.35)"
                  }}>
                  <Icon className="w-5 h-5" style={{ color: P }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════════════════════ */}
      <section className="py-12 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="card rounded-2xl p-7 flex items-center gap-5"
              style={{ background: i === 1 ? P : "#fff", border: `1px solid ${i === 1 ? P : "#e2e8f0"}`, boxShadow: "0 4px 24px rgba(0,88,139,0.08)" }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: i === 1 ? "rgba(255,185,0,0.18)" : "rgba(0,88,139,0.07)" }}>
                <s.icon className="w-7 h-7" style={{ color: i === 1 ? G : P }} />
              </div>
              <div>
                <div className="disp text-3xl font-black" style={{ color: i === 1 ? G : P }}>{s.value}</div>
                <div className="text-sm font-medium mt-1" style={{ color: i === 1 ? "#bfe0f5" : "#64748b" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ VISION & MISSION ══════════════════════════════════ */}
      <section className="py-24 stripe">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <Label>About Us</Label>
            <h2 className="disp text-4xl lg:text-5xl font-black" style={{ color: DK }}>
              Our <span style={{ color: P }}>Vision</span> & <span style={{ color: G }}>Mission</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              { title: "Vision", icon: Target, color: P, topBar: `linear-gradient(90deg,${P},#007abf)`, iconBg: "rgba(0,88,139,0.08)",
                content: <p className="leading-relaxed" style={{ color: "#475569" }}>To develop and deliver industry-relevant education to train students to be technically sound, research-driven innovators who can effectively meet the skills required by the industry both at national and global level — with challenges you need to perform in the competitive world.</p> },
              { title: "Mission", icon: Lightbulb, color: G, topBar: `linear-gradient(90deg,${G},#ff8c00)`, iconBg: "rgba(255,185,0,0.1)",
                content: <ul className="space-y-3">{["To improve academic practices that bridge theory and research through educational techniques.","To create a conducive research-led teaching environment combining classroom learning-by-doing.","To impart collaborative resources to build a diverse intellectual space.","To nurture researchers and critical thinkers in computer applications through emerging technologies.","To seek student solutions and critical thinking in a powerful, encouraging environment."].map((p,j) => (
                  <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#475569" }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: P }} />{p}
                  </li>))}</ul> }
            ].map((item, i) => (
              <div key={i} className="card rounded-3xl overflow-hidden bg-white" style={{ boxShadow: "0 8px 40px rgba(0,88,139,0.1)" }}>
                <div className="h-1.5" style={{ background: item.topBar }} />
                <div className="p-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: item.iconBg }}>
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <h3 className="disp text-2xl font-black mb-4" style={{ color: DK }}>{item.title}</h3>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROGRAMMES ════════════════════════════════════════ */}
      <section className="py-24" style={{ background: "#f0f6fb" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <Label>Academics</Label>
            <h2 className="disp text-4xl lg:text-5xl font-black" style={{ color: DK }}>
              Our <span style={{ color: P }}>Programmes</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {programmes.map((p, i) => (
              <button key={i} onClick={() => setActiveProg(i)}
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: activeProg === i ? P : "#fff",
                  color: activeProg === i ? "#fff" : P,
                  border: `2px solid ${activeProg === i ? P : "#d1e7f5"}`,
                  boxShadow: activeProg === i ? `0 8px 24px rgba(0,88,139,0.28)` : "none"
                }}>
                {p.name.split("(")[0].trim()}
              </button>
            ))}
          </div>
          <div className="rounded-3xl overflow-hidden grid lg:grid-cols-2"
            style={{ boxShadow: "0 16px 64px rgba(0,88,139,0.14)", background: "#fff" }}>
            <div className="p-10">
              <span className="text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,185,0,0.15)", color: "#b07d00" }}>
                {programmes[activeProg].degree}
              </span>
              <h3 className="disp text-2xl lg:text-3xl font-black mt-4 mb-4" style={{ color: DK }}>{programmes[activeProg].name}</h3>
              <p className="leading-relaxed mb-8" style={{ color: "#475569" }}>{programmes[activeProg].desc}</p>
              <div className="grid grid-cols-2 gap-3">
                {programmes[activeProg].highlights.map((h, j) => (
                  <div key={j} className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ background: "#f0f6fb", color: P }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: G }} />{h}
                  </div>
                ))}
              </div>
              <button className="mt-8 flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background: P }}>
                Apply for This Programme <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-center p-10"
              style={{ background: `linear-gradient(135deg, #001f33, ${P})` }}>
              <div className="text-center">
                <div className="w-28 h-28 rounded-3xl mx-auto mb-6 flex items-center justify-center"
                  style={{ background: "rgba(255,185,0,0.18)", border: "2px solid rgba(255,185,0,0.35)" }}>
                  {(() => { const I = programmes[activeProg].icon; return <I className="w-14 h-14 text-white" />; })()}
                </div>
                <div className="disp text-2xl font-black text-white mb-3">{programmes[activeProg].degree}</div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[["500+","Graduates"],["95%","Placement"],["30+","Recruiters"],["3L+","Avg Pkg"]].map(([v,l]) => (
                    <div key={l} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="disp text-2xl font-black" style={{ color: G }}>{v}</div>
                      <div className="text-blue-200 text-xs mt-1">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PLACEMENTS SWIPER ═════════════════════════════════ */}
      <section className="py-24 overflow-hidden" style={{ background: DK }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-[0.25em] uppercase px-4 py-1.5 rounded-full inline-block mb-4"
              style={{ background: "rgba(255,185,0,0.15)", color: G, border: "1px solid rgba(255,185,0,0.3)" }}>
              CPU Placement Records
            </span>
            <h2 className="disp text-4xl lg:text-5xl font-black text-white mt-2">
              Students Placed in <span style={{ color: G }}>Top Companies</span>
            </h2>
            <p className="mt-4" style={{ color: "#94a3b8" }}>Highest & best placement record in the region</p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            {stats.map((s, i) => (
              <div key={i} className="card rounded-2xl p-8 text-center"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="disp text-5xl font-black mb-2" style={{ color: G }}>{s.value}</div>
                <div style={{ color: "#94a3b8" }}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Swiper */}
          <div className="overflow-hidden">
            <div className="slide" style={{ transform: `translateX(-${pSlider.active * 100}%)` }}>
              {Array.from({ length: Math.ceil(placements.length / 3) }).map((_, si) => (
                <div key={si} className="min-w-full grid grid-cols-3 gap-6 px-1">
                  {placements.slice(si * 3, si * 3 + 3).map((p, j) => (
                    <div key={j} className="card rounded-2xl p-6 text-center"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="w-20 h-20 rounded-2xl mx-auto mb-4 text-4xl flex items-center justify-center"
                        style={{ background: "rgba(0,88,139,0.4)", border: "2px solid rgba(0,122,191,0.35)" }}>
                        {p.img}
                      </div>
                      <div className="font-bold text-white">{p.name}</div>
                      <div className="text-sm mt-1" style={{ color: G }}>{p.company}</div>
                      <div className="mt-3 inline-block text-xs font-bold px-3 py-1 rounded-full"
                        style={{ background: "rgba(0,88,139,0.35)", color: "#7dd3fc" }}>{p.pkg}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <SliderControls slider={pSlider} count={Math.ceil(placements.length / 3)} dark />
        </div>
      </section>

      {/* ══ ALUMNI SWIPER ═════════════════════════════════════ */}
      <section className="py-24 overflow-hidden" style={{ background: "#f0f6fb" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <Label>Our Alumni</Label>
            <h2 className="disp text-4xl lg:text-5xl font-black" style={{ color: DK }}>
              Making an <span style={{ color: P }}>Impact</span> Globally
            </h2>
          </div>
          <div className="overflow-hidden">
            <div className="slide" style={{ transform: `translateX(-${aSlider.active * 100}%)` }}>
              {Array.from({ length: Math.ceil(alumni.length / 3) }).map((_, si) => (
                <div key={si} className="min-w-full grid grid-cols-3 gap-6 px-1">
                  {alumni.slice(si * 3, si * 3 + 3).map((a, j) => (
                    <div key={j} className="card rounded-2xl bg-white p-8 text-center border border-[#e2e8f0]">
                      <div className="w-20 h-20 rounded-2xl mx-auto mb-4 text-4xl flex items-center justify-center"
                        style={{ background: "rgba(0,88,139,0.07)", border: "2px solid rgba(0,88,139,0.14)" }}>
                        {a.img}
                      </div>
                      <h4 className="font-bold text-lg" style={{ color: DK }}>{a.name}</h4>
                      <p className="text-sm mt-1" style={{ color: P }}>{a.role}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <SliderControls slider={aSlider} count={Math.ceil(alumni.length / 3)} />
        </div>
      </section>

      {/* ══ INDUSTRY TIE-UPS ══════════════════════════════════ */}
      <section className="py-20 bg-white border-y border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <Label>Collaborations</Label>
            <h2 className="disp text-4xl font-black" style={{ color: DK }}>
              Industry <span style={{ color: P }}>Tie Up's</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map((p, i) => (
              <div key={i} className="card px-10 py-5 rounded-2xl bg-white border-2 font-bold text-lg cursor-pointer"
                style={{ borderColor: "#e2e8f0", color: P }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = DK; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = P; }}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RESEARCH ══════════════════════════════════════════ */}
      <section className="py-24" style={{ background: `linear-gradient(135deg, #001f33, ${P})` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-[0.25em] uppercase px-4 py-1.5 rounded-full inline-block mb-4"
              style={{ background: "rgba(255,185,0,0.15)", color: G, border: "1px solid rgba(255,185,0,0.3)" }}>
              Eminence Research
            </span>
            <h2 className="disp text-4xl lg:text-5xl font-black text-white mt-2">
              Research <span style={{ color: G }}>Excellence</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {research.map((r, i) => (
              <div key={i} className="card rounded-2xl p-8 text-center"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center"
                  style={{ background: "rgba(255,185,0,0.18)" }}>
                  <r.icon className="w-7 h-7" style={{ color: G }} />
                </div>
                <div className="disp text-4xl font-black text-white mb-2">{r.value}</div>
                <div className="text-sm" style={{ color: "#bfe0f5" }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INFRASTRUCTURE ════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <Label>Campus</Label>
            <h2 className="disp text-4xl lg:text-5xl font-black" style={{ color: DK }}>
              World-Class <span style={{ color: P }}>Infrastructure</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {infraFeatures.map((item, i) => (
              <div key={i} className="card rounded-2xl p-7 border border-[#e2e8f0]">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: i % 2 === 0 ? "rgba(0,88,139,0.08)" : "rgba(255,185,0,0.1)" }}>
                  <item.icon className="w-6 h-6" style={{ color: i % 2 === 0 ? P : "#cc9200" }} />
                </div>
                <h4 className="font-bold mb-2" style={{ color: DK }}>{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS SWIPER ═══════════════════════════════ */}
      <section className="py-24 overflow-hidden" style={{ background: "#f0f6fb" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <Label>Testimonials</Label>
            <h2 className="disp text-4xl lg:text-5xl font-black" style={{ color: DK }}>
              Our Students <span style={{ color: P }}>Speak</span>
            </h2>
          </div>
          <div className="overflow-hidden">
            <div className="slide" style={{ transform: `translateX(-${tSlider.active * 100}%)` }}>
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full px-4">
                  <div className="max-w-3xl mx-auto rounded-3xl bg-white p-10 relative"
                    style={{ boxShadow: "0 16px 64px rgba(0,88,139,0.12)", border: "1px solid #e2e8f0" }}>
                    <div className="absolute top-0 left-10 right-10 h-1 rounded-b-full"
                      style={{ background: `linear-gradient(90deg,${G},#ff8c00)` }} />
                    <Quote className="w-10 h-10 mb-5" style={{ color: P, opacity: 0.2 }} />
                    <p className="text-lg leading-relaxed mb-8" style={{ color: "#475569" }}>"{t.text}"</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl text-3xl flex items-center justify-center"
                          style={{ background: "rgba(0,88,139,0.08)" }}>{t.img}</div>
                        <div>
                          <div className="font-bold" style={{ color: DK }}>{t.name}</div>
                          <div className="text-sm" style={{ color: P }}>{t.batch} · {t.company}</div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-5 h-5 fill-current" style={{ color: G }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <SliderControls slider={tSlider} count={testimonials.length} />
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: DK }}>
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute top-0 left-1/2 w-[600px] h-[280px] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-20"
          style={{ background: P }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="disp text-4xl lg:text-6xl font-black text-white mb-6">
            Ready to Start Your <span style={{ color: G }}>Journey?</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: "#94a3b8" }}>
            Join thousands of students who have transformed their careers with Career Point University's School of Computer Applications & Technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="flex items-center gap-2 font-bold px-10 py-5 rounded-xl text-lg transition-all hover:scale-105"
              style={{ background: G, color: DK, boxShadow: `0 8px 32px rgba(255,185,0,0.35)` }}>
              Apply Now <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 font-semibold px-10 py-5 rounded-xl text-lg text-white transition-all hover:bg-white/10"
              style={{ border: "2px solid rgba(255,255,255,0.2)" }}>
              <ExternalLink className="w-5 h-5" style={{ color: G }} /> Learn More
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm" style={{ color: "#64748b" }}>
            {[[MapPin,"Kota, Rajasthan"],[Phone,"+91-XXXXXXXXXX"],[Mail,"admissions@cpuniversity.ac.in"]].map(([Icon,text],i) => (
              <span key={i} className="flex items-center gap-2">
                <Icon className="w-4 h-4" style={{ color: G }} />{text}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}