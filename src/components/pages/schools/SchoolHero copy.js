"use client";
import { useState, useRef, useEffect } from "react";
import {
  BookOpen, TrendingUp, Star, ChevronRight, ChevronLeft,
  ArrowRight, Target, Lightbulb, GraduationCap, Building2,
  FlaskConical, Presentation, BarChart3, Briefcase,
  Quote, Code2, Database, Network, Home, Users,
  Award, Layers, Microscope, X, ZoomIn,
} from "lucide-react";

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const stats = [
  { value: "75L", label: "Highest Package",    icon: TrendingUp },
  { value: "3L",  label: "Avg Salary Package", icon: BarChart3  },
  { value: "20K", label: "OJT Stipend/month",  icon: Briefcase  },
];
const researchStats = [
  { value: "100+", label: "Research Papers Published", icon: BookOpen      },
  { value: "30+",  label: "Conference Presentations",  icon: Presentation  },
  { value: "5+",   label: "Books",                     icon: GraduationCap },
  { value: "5+",   label: "Patents Published",         icon: FlaskConical  },
];
const qualTabs = [
  {
    label: 'After 12th Pass/ "A" Level',
    programmes: [
      {
        name: "Bachelor of Computer Application (BCA)",
        icon: Code2,
        link: "#",
        specializations: [
          { name: "Core",             link: "#" },
          { name: "Data Science",     link: "#" },
          { name: "Cloud Computing",  link: "#" },
          { name: "AI & ML",          link: "#" },
        ],
      },
    ],
  },
  {
    label: "After Graduation / Equivalent",
    programmes: [
      {
        name: "Master of Computer Application (MCA)",
        icon: Database,
        link: "#",
        specializations: [
          { name: "Core",         link: "#" },
          { name: "Data Science", link: "#" },
        ],
      },
      {
        name: "PG Diploma In Computer Application (PGDCA)",
        icon: Network,
        link: "#",
        specializations: [
          { name: "Core", link: "#" },
        ],
      },
    ],
  },
  {
    label: "After Post Graduation / Equivalent",
    programmes: [
      {
        name: "Ph.D. (All Subjects)",
        icon: Microscope,
        link: "#",
        specializations: [],
      },
    ],
  },
];
const placements = [
  { name: "Siraj Ali",      company: "Course5 Intelligence", pkg: "8 LPA",  img: "https://cpur.in/wp-content/uploads/2023/08/Siraj-Ali.png"      },
  { name: "Tarun Jain",     company: "Appcino",              pkg: "10 LPA", img: "https://cpur.in/wp-content/uploads/2023/08/Tarun-Jain.png"     },
  { name: "Prateek Dhaman", company: "TCS",                  pkg: "9 LPA",  img: "https://cpur.in/wp-content/uploads/2023/08/Prateek-Dhaman.png" },
  { name: "Archana Kumari", company: "Tech Mahindra",        pkg: "12 LPA", img: "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari.png" },
  { name: "Kiran Daklani",  company: "Zalando",              pkg: "75 LPA", img: "https://cpur.in/wp-content/uploads/2023/07/1-d.jpg"            },
  { name: "Ravindra Singh", company: "ATC",                  pkg: "8 LPA",  img: "https://cpur.in/wp-content/uploads/2023/08/Siraj-Ali.png"      },
  { name: "Priya Sharma",   company: "Infosys",              pkg: "7 LPA",  img: "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari.png" },
  { name: "Rahul Verma",    company: "Wipro",                pkg: "9 LPA",  img: "https://cpur.in/wp-content/uploads/2023/08/Tarun-Jain.png"     },
];
const alumni = [
  { name: "Hemant Sharma",  role: "Software Engineer", company: "Leading Tech Co.",     img: "https://cpur.in/wp-content/uploads/2023/08/hemant.jpg" },
  { name: "Kiran Daklani",  role: "Senior Developer",  company: "Zalando – 75 LPA",     img: "https://cpur.in/wp-content/uploads/2023/08/kiran.jpg"  },
  { name: "Aryan Mathuria", role: "Software Engineer", company: "Evertz, Canada",       img: "https://cpur.in/wp-content/uploads/2023/08/aryan.jpg"  },
  { name: "Saloni Shukla",  role: "Business Analyst",  company: "Collabra",             img: "https://cpur.in/wp-content/uploads/2023/08/Saloni.jpg" },
  { name: "Harsh Bahir",    role: "Fintech Developer", company: "InvestaX – Singapore", img: "https://cpur.in/wp-content/uploads/2023/08/harsh.jpg"  },
  { name: "Aryan Mathuria", role: "Software Engineer", company: "Evertz, Canada",       img: "https://cpur.in/wp-content/uploads/2023/08/aryan.jpg"  },
];
const testimonials = [
  { name: "Archana Kumari", batch: "BCA 2019", company: "Tech Mahindra", emoji: "👩‍💻", rating: 5,
    photo: "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari-Tech-Mahindra.png",
    text: "Career Point University transformed my career. The faculty's dedication and industry-focused curriculum gave me the confidence to crack top MNC interviews." },
  { name: "Rahul Verma",    batch: "MCA 2021", company: "Infosys",       emoji: "👨‍💻", rating: 5,
    photo: "https://cpur.in/wp-content/uploads/2023/08/student.png",
    text: "The research opportunities and cutting-edge labs at CPU are unmatched. I published 2 research papers during my MCA, which opened doors I never imagined." },
  { name: "Priya Sharma",   batch: "BCA 2020", company: "Accenture",     emoji: "👩‍🏫", rating: 5,
    photo: "https://cpur.in/wp-content/uploads/2023/08/student.png",
    text: "From day one, the university prepared us for real-world challenges. The industry tie-ups and live projects gave hands-on experience. I landed my dream job." },
];
const partnerLogos = [
  { name: "Tech Mahindra", url: "https://cpur.in/wp-content/uploads/2023/08/tech-mahindra-as-Smart-Object-1.jpg" },
  { name: "TCS",           url: "https://cpur.in/wp-content/uploads/2023/08/tcs-logo-as-Smart-Object-1.jpg"     },
  { name: "Infosys",       url: "https://cpur.in/wp-content/uploads/2023/08/infosys-as-Smart-Object-1.jpg"      },
  { name: "Wipro",         url: "https://cpur.in/wp-content/uploads/2023/08/wipro-as-Smart-Object-1.jpg"        },
  { name: "Vodafone",      url: "https://cpur.in/wp-content/uploads/2023/08/vodafone-as-Smart-Object-1.jpg"     },
  { name: "Google",        url: "https://cpur.in/wp-content/uploads/2023/08/google-as-Smart-Object-1.jpg"       },
  { name: "J-Spiders",     url: "https://cpur.in/wp-content/uploads/2023/08/j-spiders-logo-as-Smart-Object-1.jpg" },
  { name: "JustDial",      url: "https://cpur.in/wp-content/uploads/2023/08/justdial-logo-as-Smart-Object-1.jpg"  },
];
const researchImages = [
  "https://cpur.in/wp-content/uploads/2023/07/gallery-7.jpg",
  "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg",
  "https://cpur.in/wp-content/uploads/2023/07/gallery-12.jpg",
  "https://cpur.in/wp-content/uploads/2023/07/gallery-4.jpg",
];
const communityImages = [
  { src: "https://cpur.in/wp-content/uploads/2023/07/gallery-7-1.jpg",  caption: "Students in Computer Lab Session" },
  { src: "https://cpur.in/wp-content/uploads/2023/07/gallery-12-1.jpg", caption: "Tech Seminar & Workshop"          },
];
const infraItems = [
  { title: "Modern Computer Labs",      desc: "State-of-the-art labs with latest hardware & software", img: "https://img.freepik.com/free-photo/modern-computer-lab_1170-1.jpg"                  },
  { title: "High-Speed Internet",       desc: "Gigabit campus-wide Wi-Fi & LAN",                       img: "https://img.freepik.com/free-photo/network-server-room_1048-2200.jpg"               },
  { title: "Research & Innovation Hub", desc: "Dedicated space for R&D and innovation",                img: "https://img.freepik.com/free-photo/scientists-working-laboratory_23-2149041483.jpg" },
  { title: "Smart Classrooms",          desc: "Interactive smart boards & AV systems",                 img: "https://img.freepik.com/free-photo/modern-classroom-projector_1048-12346.jpg"       },
];
const secondaryNavItems = [
  { id: "about",     label: "About Us",       icon: Home      },
  { id: "programs",  label: "Programmes",     icon: BookOpen  },
  { id: "placement", label: "Placements",     icon: Briefcase },
  { id: "alumni",    label: "Alumni",         icon: Users     },
  { id: "industry",  label: "Industry",       icon: Layers    },
  { id: "research",  label: "Research",       icon: Award     },
  { id: "community", label: "Community",      icon: Users     },
  { id: "infra",     label: "Infrastructure", icon: Building2 },
];

/* ══════════════════════════════════════
   HOOKS
══════════════════════════════════════ */
function usePerPage(smVal = 2, lgVal = 4) {
  const [pp, setPp] = useState(lgVal);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPp(w < 640 ? 1 : w < 1024 ? smVal : lgVal);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [smVal, lgVal]);
  return pp;
}

function useSlider(length, perPage = 1, delay = 3500) {
  const pages = Math.ceil(length / perPage);
  const [active, setActive] = useState(0);
  const timer = useRef(null);

  const restart = () => {
    clearInterval(timer.current);
    if (pages > 1)
      timer.current = setInterval(() => setActive(p => (p + 1) % pages), delay);
  };

  useEffect(() => {
    setActive(a => Math.min(a, Math.max(0, pages - 1)));
    restart();
    return () => clearInterval(timer.current);
  }, [pages]);

  const go   = i => { setActive(i); restart(); };
  const prev = () => go((active - 1 + pages) % pages);
  const next = () => go((active + 1) % pages);
  return { active, go, prev, next, pages };
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ══════════════════════════════════════
   SMALL COMPONENTS
══════════════════════════════════════ */
function SLabel({ children, dark }) {
  return dark ? (
    <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 text-[#ffb900] border border-[#ffb900]/30 bg-[#ffb900]/10">
      {children}
    </span>
  ) : (
    <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 text-[#00588b] border border-[#00588b]/20 bg-[#00588b]/8">
      {children}
    </span>
  );
}

function SwiperNav({ slider, dark }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={slider.prev}
        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border transition-transform hover:scale-110 ${
          dark ? "bg-white/10 text-white border-white/15" : "bg-[#00588b]/8 text-[#00588b] border-[#00588b]/15"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex gap-2 items-center">
        {Array.from({ length: slider.pages }).map((_, i) => (
          <button
            key={i}
            onClick={() => slider.go(i)}
            className={`rounded-full border-none cursor-pointer transition-all duration-300 h-2.5 ${
              slider.active === i
                ? dark ? "bg-[#ffb900] w-7" : "bg-[#00588b] w-7"
                : dark ? "bg-white/30 w-2.5" : "bg-slate-300 w-2.5"
            }`}
          />
        ))}
      </div>
      <button
        onClick={slider.next}
        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-none transition-transform hover:scale-110 ${
          dark ? "bg-[#ffb900] text-[#0a1628]" : "bg-[#00588b] text-white"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  useEffect(() => {
    const fn = e => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight")  setIdx(i => (i + 1) % images.length);
      if (e.key === "ArrowLeft")   setIdx(i => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [images.length, onClose]);

  return (
    <div onClick={onClose} className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90">
      <div onClick={e => e.stopPropagation()} className="relative max-w-3xl w-full">
        <button onClick={onClose} className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center cursor-pointer border-none">
          <X className="w-5 h-5" />
        </button>
        <img src={images[idx].src} alt={images[idx].caption} className="w-full rounded-2xl object-contain max-h-[75vh]" />
        <p className="text-center text-white/70 mt-3 text-sm">{images[idx].caption}</p>
        {images.length > 1 && (
          <div className="flex justify-center gap-4 mt-4 items-center">
            <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)}
              className="w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center cursor-pointer border-none">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-white text-sm">{idx + 1} / {images.length}</span>
            <button onClick={() => setIdx(i => (i + 1) % images.length)}
              className="w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center cursor-pointer border-none">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function SchoolPage() {
  const [activeQual, setActiveQual] = useState(0);
  const [secNavFixed, setSecNavFixed] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const heroRef   = useRef(null);
  const secNavRef = useRef(null);

  const cardPP = usePerPage(2, 4);
  const logoPP = usePerPage(3, 6);

  const pSlider = useSlider(placements.length,  cardPP, 2800);
  const aSlider = useSlider(alumni.length,       cardPP, 3500);
  const iSlider = useSlider(partnerLogos.length, logoPP, 2800);
  const tSlider = useSlider(testimonials.length, 1,      5000);

  const activeSection = useActiveSection(secondaryNavItems.map(n => n.id));

  useEffect(() => {
    const fn = () => setSecNavFixed(heroRef.current?.getBoundingClientRect().bottom <= 0);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = id => {
    const el = document.getElementById(id);
    if (!el) return;
    const nh = secNavRef.current?.offsetHeight || 48;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - (secNavFixed ? nh + 4 : 4),
      behavior: "smooth",
    });
  };

  const currentProgs = qualTabs[activeQual].programmes;
  const cardW = 100 / cardPP;
  const logoW = 100 / logoPP;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{`
        .dot-bg{background-image:radial-gradient(circle,rgba(0,88,139,.12) 1px,transparent 1px);background-size:24px 24px}
        @keyframes spinCW  {from{transform:rotate(0deg)}  to{transform:rotate(360deg)}}
        @keyframes spinCCW {from{transform:rotate(0deg)}  to{transform:rotate(-360deg)}}
        .ring-cw  {animation:spinCW  22s linear infinite;transform-origin:center center}
        .ring-ccw {animation:spinCCW 22s linear infinite;transform-origin:center center}
        .infra-img{transition:transform .4s}
        .infra-wrap:hover .infra-img{transform:scale(1.07)}
        .lb-ov{opacity:0;transition:opacity .25s}
        .lb-item:hover .lb-ov{opacity:1}
      `}</style>

      {/* ── BREADCRUMB ─────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-16 py-2.5 flex items-center gap-2 flex-wrap text-sm">
          <a href="#" className="flex items-center gap-1 font-medium no-underline text-[#00588b] hover:opacity-70">
            <Home className="w-3.5 h-3.5" /> Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Schools & Departments</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">School of Computer Applications & Technology</span>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg" alt="Campus"
            className="w-full h-full object-cover" onError={e => { e.target.style.display = "none"; }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#001f33]/94 via-[#00588b]/88 to-[#007abf]/84" />
          <div className="dot-bg absolute inset-0 opacity-20" />
        </div>
        <div className="ring-cw  absolute right-0 top-1/2 -translate-y-1/2 translate-x-[35%] w-[600px] h-[600px] rounded-full pointer-events-none border-2 border-[#ffb900]/18" />
        <div className="ring-ccw absolute right-0 top-1/2 -translate-y-1/2 translate-x-[25%] w-[430px] h-[430px] rounded-full pointer-events-none border-2 border-dashed border-white/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-16 py-20 w-full">
          <div className="max-w-[80%]">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold bg-[#ffb900]/15 text-[#ffb900] border border-[#ffb900]/35">
              <Star className="w-4 h-4 fill-current" /> Best Computer Application College in Kota
            </div>
            <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.4rem,4.5vw,3.8rem)" }}>
              School of <span className="text-[#ffb900]">Computer</span> Applications &{" "}
              <span className="text-sky-300">Technology</span>
            </h1>
            <p className="text-blue-100/90 text-lg leading-relaxed mb-10 max-w-xl">
              Career Point University offers cutting-edge programs shaping future technologists, researchers, and industry-ready professionals in Kota.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-transform hover:scale-105 border-none cursor-pointer bg-[#ffb900] text-[#0a1628] shadow-[0_8px_32px_rgba(255,185,0,0.4)]">
                Apply Now <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => scrollTo("programs")} className="flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-lg text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-2 border-white/30">
                Explore Programs
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 55" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,35 C360,70 1080,0 1440,35 L1440,55 L0,55 Z" />
          </svg>
        </div>
      </section>

      {/* ══ SECONDARY STICKY NAV ══ */}
      <div
        ref={secNavRef}
        className={`z-40 transition-all duration-300 ${secNavFixed ? "fixed top-15 left-0 right-0 shadow-xl" : "relative"} ${
          secNavFixed ? "bg-[#00588b] border-b-2 border-[#ffb900]/25" : "bg-white border-b-2 border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 lg:px-16 flex items-center overflow-x-auto">
          {secondaryNavItems.map(item => {
            const on = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-1.5 px-3 lg:px-5 py-3.5 text-xs lg:text-sm font-semibold whitespace-nowrap flex-shrink-0 cursor-pointer bg-transparent border-none transition-colors duration-200 border-b-2 ${
                  on
                    ? secNavFixed ? "text-[#ffb900] border-b-[#ffb900]" : "text-[#00588b] border-b-[#00588b]"
                    : secNavFixed ? "text-white/78 border-b-transparent"  : "text-slate-500 border-b-transparent"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      {secNavFixed && <div className="h-12" />}

      {/* ── STATS ──────────────────────────────────────── */}
      <section className="py-12 max-w-7xl mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <div key={i} className={`rounded-2xl p-7 flex items-center gap-5 transition-transform hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(0,88,139,0.08)] ${
              i === 1 ? "bg-[#00588b] border border-[#00588b]" : "bg-white border border-slate-200"
            }`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${i === 1 ? "bg-[#ffb900]/18" : "bg-[#00588b]/7"}`}>
                <s.icon className={`w-7 h-7 ${i === 1 ? "text-[#ffb900]" : "text-[#00588b]"}`} />
              </div>
              <div>
                <div className={`font-black text-[2rem] leading-none ${i === 1 ? "text-[#ffb900]" : "text-[#00588b]"}`} style={{ fontFamily: "Georgia,serif" }}>
                  {s.value}
                </div>
                <div className={`text-sm font-medium mt-1 ${i === 1 ? "text-[#bfe0f5]" : "text-slate-500"}`}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT — VISION & MISSION ───────────────────── */}
      <section id="about" className="py-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
          {/* Vision */}
          <div className="relative flex flex-col justify-center px-10 lg:px-16 py-16 bg-gradient-to-br from-[#0a1628] to-[#0d2545]">
            <div className="dot-bg absolute inset-0 opacity-20" />
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10 pointer-events-none bg-[#00588b] blur-[60px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#00588b]/40 border border-[#00588b]/60">
                  <Target className="w-6 h-6 text-sky-300" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[#ffb900]">Our Purpose</p>
                  <h3 className="font-black text-white text-2xl" style={{ fontFamily: "Georgia,serif" }}>Vision</h3>
                </div>
              </div>
              <div className="w-12 h-1 rounded-full mb-6 bg-gradient-to-r from-[#ffb900] to-orange-500" />
              <p className="text-base leading-relaxed text-white/75">
                To develop and deliver industry-relevant education to train students to be technically sound, research-driven innovators who can effectively meet the skills required by the industry both at national and global level.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                {[["500+","Students"],["95%","Placement"],["20+","Partners"]].map(([v,l]) => (
                  <div key={l} className="rounded-xl px-4 py-2 text-center bg-white/7 border border-white/12">
                    <div className="font-black text-lg text-[#ffb900]">{v}</div>
                    <div className="text-xs text-white/50">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="relative flex flex-col justify-center px-10 lg:px-16 py-16 bg-white">
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-5 pointer-events-none bg-[#00588b] blur-[60px] translate-x-[30%] -translate-y-[30%]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#ffb900]/12 border border-[#ffb900]/25">
                  <Lightbulb className="w-6 h-6 text-[#ffb900]" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[#00588b]">Our Goal</p>
                  <h3 className="font-black text-2xl text-[#0a1628]" style={{ fontFamily: "Georgia,serif" }}>Mission</h3>
                </div>
              </div>
              <div className="w-12 h-1 rounded-full mb-6 bg-gradient-to-r from-[#00588b] to-[#007abf]" />
              <ul className="space-y-3">
                {[
                  "Improve academic practices that bridge theory and research.",
                  "Create a research-led teaching environment combining classroom learning-by-doing.",
                  "Impart collaborative resources to build a diverse intellectual space.",
                  "Nurture researchers and critical thinkers through emerging technologies.",
                  "Seek student solutions and critical thinking in a powerful environment.",
                ].map((pt, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#00588b]/10">
                      <ChevronRight className="w-3 h-3 text-[#00588b]" />
                    </div>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROGRAMMES ═══════════════════════════════════ */}
      <section id="programs" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg" alt="Campus" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#001e46]/93 to-[#003c78]/88" />
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00588b]/18 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#ffb900]/8  blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-12">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-4 text-[#ffb900] bg-[#ffb900]/12 border border-[#ffb900]/30">
              Academic Programmes
            </span>
            <h2 className="font-black text-white" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              Our <span className="text-[#ffb900]">Programme</span>
            </h2>
            <p className="mt-3 max-w-2xl text-white mx-auto text-sm lg:text-base leading-relaxed ">
              Over the years, Career Point University has earned several accolades for playing a dynamic role in elevating research and the learning process of the institution.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl overflow-hidden bg-white/97 shadow-[0_32px_80px_rgba(0,0,0,0.45)]">
            <div className="h-1 bg-gradient-to-r from-[#00588b] via-[#ffb900] to-[#00588b]" />

            <div className="flex flex-col lg:flex-row min-h-[280px]">

              {/* ── Qualification tabs (left sidebar) ── */}
              <div className="lg:w-80 flex-shrink-0 flex flex-col border-r border-[#f0f4f8]">
                <div className="px-6 pt-6 pb-3">
                  <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Select Level</p>
                </div>
                {qualTabs.map((qt, i) => {
                  const icons = [GraduationCap, BookOpen, Microscope];
                  const Icon  = icons[i];
                  const on    = activeQual === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveQual(i)}
                      className={`w-full text-left px-6 py-5 cursor-pointer transition-all bg-transparent border-none flex items-center gap-4 ${
                        i < qualTabs.length - 1 ? "border-b border-slate-50" : ""
                      } ${on ? "bg-gradient-to-r from-[#00588b]/7 to-[#00588b]/2 border-l-4 border-l-[#00588b]" : "border-l-4 border-l-transparent"}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${on ? "bg-[#00588b]/10" : "bg-[#00588b]/4"}`}>
                        <Icon className={`w-5 h-5 ${on ? "text-[#00588b]" : "text-slate-400"}`} />
                      </div>
                      <span className={`text-sm font-semibold leading-snug ${on ? "text-[#00588b]" : "text-gray-600"}`}>
                        {qt.label}
                      </span>
                      {on && <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0 text-[#00588b]" />}
                    </button>
                  );
                })}
              </div>

              {/* ── Programmes panel (right content) ── */}
              <div className="flex-1 px-8 py-8 overflow-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentProgs.map((prog, pi) => (
                    <div key={pi} className="p-4 rounded-2xl bg-[#00588b]/4 border border-[#00588b]/10">

                      {/* Programme name — clickable with >> prefix */}
                      <a
                        href={prog.link}
                        className="flex items-center gap-0.5 group no-underline"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-[#00588b] flex-shrink-0" />
                        <ChevronRight className="w-3.5 h-3.5 text-[#00588b] flex-shrink-0 -ml-2" />
                        <span className="ml-1 font-semibold text-sm text-[#0a1628] group-hover:text-[#00588b] transition-colors">
                          {prog.name}
                        </span>
                      </a>

                      {/* Specializations — comma-separated clickable links */}
                      {prog.specializations.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-x-0.5 gap-y-1">
                          <span className="text-xs font-bold text-slate-700 mr-1">
                            Specialization:
                          </span>
                          {prog.specializations.map((sp, j) => (
                            <span key={j} className="flex items-center">
                              <a
                                href={sp.link}
                                className="text-xs font-semibold text-[#00588b] hover:underline"
                                style={{ textDecoration: "none" }}
                                onMouseEnter={e => e.target.style.textDecoration = "underline"}
                                onMouseLeave={e => e.target.style.textDecoration = "none"}
                              >
                                {sp.name}
                              </a>
                              {j < prog.specializations.length - 1 && (
                                <span className="text-slate-400 text-xs mx-0.5">,</span>
                              )}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* PhD — no specializations */}
                      {prog.specializations.length === 0 && (
                        <p className="text-xs mt-2 text-slate-500 font-medium">
                          Research-focused doctoral programme
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══ PLACEMENTS ═══════════════════════════════════ */}
      <section id="placement" className="py-20 overflow-hidden bg-[#f0f6fb]">
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div className="text-center mb-12">
            <SLabel>CPU Placement Records</SLabel>
            <h2 className="font-black mt-1 text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
              Students Placed in <span className="text-[#00588b]">Top Companies</span>
            </h2>
            <p className="text-slate-500 text-sm mt-3">Highest & best placement record in the region</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${pSlider.active * cardW}%)` }}
              >
                {[...placements, ...placements].map((p, j) => (
                  <div key={j} className="flex-shrink-0 py-5 px-2.5" style={{ width: `${cardW}%` }}>
                    <div className="rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-gradient-to-br from-[#f8fbff] to-[#dbeafe] border border-[#dde8f5] shadow-[0_4px_16px_rgba(0,88,139,0.08)]">
                      <div className="relative" style={{ aspectRatio: "3/4" }}>
                        <img src={p.img} alt={p.name} className="w-full"
                          onError={e => { e.target.parentElement.innerHTML = `<div class="w-full h-full bg-blue-100 flex items-center justify-center text-5xl">👨‍💻</div>`; }} />
                        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#00588b] rounded-tl" />
                        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#00588b] rounded-br" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={pSlider.prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border border-[#dde8f5] bg-white text-[#00588b] shadow-lg transition-transform hover:scale-110">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={pSlider.next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border-none bg-[#00588b] text-white shadow-lg transition-transform hover:scale-110">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: pSlider.pages }).map((_, i) => (
              <button key={i} onClick={() => pSlider.go(i)}
                className={`rounded-full border-none cursor-pointer transition-all duration-300 h-2.5 ${pSlider.active === i ? "bg-[#00588b] w-7" : "bg-slate-300 w-2.5"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ ALUMNI ═══════════════════════════════════════ */}
      <section id="alumni" className="py-24 overflow-hidden bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div className="text-center mb-14">
            <SLabel>Our Alumni</SLabel>
            <h2 className="font-black mt-1 text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
              Making an <span className="text-[#00588b]">Impact</span> Globally
            </h2>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${aSlider.active * cardW}%)` }}
              >
                {[...alumni, ...alumni].map((a, j) => (
                  <div key={j} className="flex-shrink-0 px-3" style={{ width: `${cardW}%` }}>
                    <div className="rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default border border-slate-200 shadow-[0_4px_16px_rgba(0,88,139,0.07)]">
                      <div className="overflow-hidden" style={{ aspectRatio: "4/5" }}>
                        <img src={a.img} alt={a.name} className="w-full transition-transform duration-500 hover:scale-105"
                          onError={e => { e.target.parentElement.innerHTML = `<div class="w-full h-full bg-slate-100 flex items-center justify-center text-6xl">👤</div>`; }} />
                      </div>
                      <div className="p-4 text-center border-t-[3px] border-[#00588b]">
                        <h4 className="font-bold text-sm text-[#0a1628]">{a.name}</h4>
                        <p className="text-xs mt-1 font-medium text-[#00588b]">{a.role}</p>
                        <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold bg-[#00588b]/8 text-[#00588b]">
                          {a.company}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={aSlider.prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border border-slate-200 bg-white text-[#00588b] shadow-lg transition-transform hover:scale-110">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={aSlider.next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border-none bg-[#00588b] text-white shadow-lg transition-transform hover:scale-110">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: aSlider.pages }).map((_, i) => (
              <button key={i} onClick={() => aSlider.go(i)}
                className={`rounded-full border-none cursor-pointer transition-all duration-300 h-2.5 ${aSlider.active === i ? "bg-[#00588b] w-7" : "bg-slate-300 w-2.5"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRY ═════════════════════════════════════ */}
      <section id="industry" className="py-20 bg-white border-t border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div className="text-center mb-12">
            <SLabel>Collaborations</SLabel>
            <h2 className="font-black mt-1 text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
              Industry <span className="text-[#00588b]">Tie Up's</span>
            </h2>
          </div>

          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${iSlider.active * 100}%)` }}>
              {Array.from({ length: iSlider.pages }).map((_, si) => (
                <div key={si} className="min-w-full" style={{ display: "grid", gridTemplateColumns: `repeat(${logoPP}, 1fr)`, gap: "1rem" }}>
                  {partnerLogos.slice(si * logoPP, si * logoPP + logoPP).map((logo, j) => (
                    <div key={j} className="flex items-center justify-center rounded-2xl bg-white h-[84px] px-4 py-3 border-[1.5px] border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                      <img src={logo.url} alt={logo.name} className="max-h-12 max-w-full object-contain"
                        onError={e => { e.target.replaceWith(Object.assign(document.createElement("span"), { textContent: logo.name, className: "font-bold text-xs text-[#00588b]" })); }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <SwiperNav slider={iSlider} dark={false} />
        </div>
      </section>

      {/* ── RESEARCH ───────────────────────────────────── */}
      <section id="research" className="py-24 bg-gradient-to-br from-[#001f33] to-[#00588b]">
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div className="text-center mb-14">
            <SLabel dark>Eminence Research</SLabel>
            <h2 className="font-black text-white mt-1" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
              Research <span className="text-[#ffb900]">Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {researchImages.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 border-2 border-white/10" style={{ aspectRatio: "16/10" }}>
                <img src={src} alt="Research" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {researchStats.map((r, i) => (
              <div key={i} className="rounded-2xl p-8 text-center transition-transform hover:-translate-y-1 bg-white/7 border border-white/12">
                <div className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center bg-[#ffb900]/18">
                  <r.icon className="w-7 h-7 text-[#ffb900]" />
                </div>
                <div className="font-black text-white text-[2.4rem] leading-none" style={{ fontFamily: "Georgia,serif" }}>{r.value}</div>
                <div className="text-sm mt-2 text-blue-200">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ──────────────────────────────────── */}
      <section id="community" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div className="text-center mb-14">
            <SLabel>Community</SLabel>
            <h2 className="font-black mt-1 text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
              Our <span className="text-[#00588b]">Diverse</span> Community
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-base leading-relaxed text-slate-500 text-justify">
                The computer application community thrives on diversity, encompassing a dynamic range of individuals with varying backgrounds, perspectives, and expertise. This rich tapestry includes students, researchers, educators, and professionals, all contributing to a vibrant ecosystem of innovation and learning. The diverse community fosters cross-disciplinary collaboration, encouraging the exchange of ideas that lead to groundbreaking solutions and advancements in technology.
              </p>
              <p className="text-base leading-relaxed text-slate-500 text-justify mt-4">
                We are producing professionals with strong social ethics and moral values — involving integrating ethics education into the curriculum, fostering open discussions on ethical dilemmas, encouraging service-learning projects for community benefit, introducing established codes of ethics, and providing opportunities for interdisciplinary collaboration.
              </p>
            </div>

            <div>
              {lightboxIdx !== null && (
                <Lightbox images={communityImages} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
              )}
              <div className="grid grid-cols-2 gap-4">
                {communityImages.map((img, i) => (
                  <div key={i} className="lb-item relative rounded-2xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-1.5 border border-slate-200"
                    onClick={() => setLightboxIdx(i)}>
                    <img src={img.src} alt={img.caption} className="w-full object-cover" style={{ aspectRatio: "4/3" }}
                      onError={e => { e.target.parentElement.classList.add("bg-[#f0f6fb]"); e.target.style.display = "none"; }} />
                    <div className="lb-ov absolute inset-0 flex items-center justify-center bg-[#00588b]/55">
                      <ZoomIn className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs font-semibold text-white bg-gradient-to-t from-black/60 to-transparent">
                      {img.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INFRASTRUCTURE ─────────────────────────────── */}
      <section id="infra" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div className="text-center mb-14">
            <SLabel>Campus</SLabel>
            <h2 className="font-black mt-1 text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
              World-Class <span className="text-[#00588b]">Infrastructure</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infraItems.map((item, i) => (
              <div key={i} className="infra-wrap rounded-2xl overflow-hidden bg-white transition-transform hover:-translate-y-1.5 border border-slate-200 shadow-[0_4px_16px_rgba(0,88,139,0.07)]">
                <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <img src={item.img} alt={item.title} className="infra-img w-full h-full object-cover"
                    onError={e => { e.target.parentElement.classList.add("bg-[#00588b]/6"); e.target.style.display = "none"; }} />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-sm mb-1.5 text-[#0a1628]">{item.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════ */}
      <section className="py-24 overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0d3060] to-[#00588b]">
        <div className="max-w-6xl mx-auto px-4 lg:px-16">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-4 text-[#ffb900] bg-[#ffb900]/12 border border-[#ffb900]/30">
              Testimonials
            </span>
            <h2 className="font-black text-white" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              Our Students <span className="text-[#ffb900]">Speak</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left preview + nav */}
            <div className="hidden lg:flex flex-col items-center gap-6">
              <button onClick={tSlider.prev} className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border border-white/20 bg-white/10 text-white transition-all hover:scale-110">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="rounded-2xl p-4 w-full opacity-40 pointer-events-none bg-white/5 border border-white/8">
                <div className="w-8 h-8 rounded-lg overflow-hidden mb-3">
                  <img src={testimonials[(tSlider.active - 1 + testimonials.length) % testimonials.length].photo}
                    alt="" className="w-full" />
                </div>
                <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
                  {testimonials[(tSlider.active - 1 + testimonials.length) % testimonials.length].text.slice(0, 80)}...
                </p>
              </div>
            </div>

            {/* Centre card */}
            <div className="lg:col-span-3 overflow-hidden">
              <div className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${tSlider.active * 100}%)` }}>
                {testimonials.map((t, i) => (
                  <div key={i} className="min-w-full">
                    <div className="rounded-2xl overflow-hidden bg-white/7 border border-white/12">
                      <div className="h-1 bg-gradient-to-r from-[#ffb900] to-orange-500" />
                      <div className="p-8">
                        <Quote className="w-9 h-9 mb-5 text-[#ffb900] opacity-40" />
                        <p className="text-base lg:text-lg leading-relaxed mb-8 text-white/85">"{t.text}"</p>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-[#ffb900]/35">
                              <img src={t.photo} alt={t.name} className="w-full"
                                onError={e => { e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-2xl bg-[#ffb900]/10">${t.emoji}</div>`; }} />
                            </div>
                            <div>
                              <div className="font-bold text-white text-base">{t.name}</div>
                              <div className="text-sm mt-0.5 text-slate-400">{t.batch} · {t.company}</div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {Array.from({ length: t.rating }).map((_, j) => (
                              <Star key={j} className="w-5 h-5 fill-current text-[#ffb900]" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => tSlider.go(i)}
                    className={`rounded-full border-none cursor-pointer transition-all duration-300 h-2.5 ${tSlider.active === i ? "bg-[#ffb900] w-7" : "bg-white/30 w-2.5"}`}
                  />
                ))}
              </div>
            </div>

            {/* Right preview + nav */}
            <div className="hidden lg:flex flex-col items-center gap-6">
              <button onClick={tSlider.next} className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-none bg-[#ffb900] text-[#0a1628] transition-all hover:scale-110">
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="rounded-2xl p-4 w-full opacity-40 pointer-events-none bg-white/5 border border-white/8">
                <div className="w-8 h-8 rounded-lg overflow-hidden mb-3">
                  <img src={testimonials[(tSlider.active + 1) % testimonials.length].photo}
                    alt="" className="w-full " />
                </div>
                <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
                  {testimonials[(tSlider.active + 1) % testimonials.length].text.slice(0, 80)}...
                </p>
              </div>
            </div>
          </div>

          {/* Mobile nav */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
            <button onClick={tSlider.prev} className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border border-white/20 bg-white/10 text-white">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={tSlider.next} className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer border-none bg-[#ffb900] text-[#0a1628]">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}