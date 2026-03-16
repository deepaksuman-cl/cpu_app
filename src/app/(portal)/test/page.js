"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Star, ArrowRight, ChevronLeft, ChevronRight,
  TrendingUp, BarChart3, Briefcase, Target, Lightbulb,
  GraduationCap, BookOpen, Microscope, FlaskConical,
  Users, Globe, Award, CheckCircle, ExternalLink,
  MapPin, Phone, Mail, Building2, Presentation,
  Monitor, Wifi, Beaker, Tv2, Scale, FileText
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────
const DATA = {
  slug: "computer-applications-technology",
  breadcrumb: [
    { label: "Home", link: "/" },
    { label: "Schools & Departments", link: "/schools" },
    { label: "School of Computer Applications & Technology", link: "/schools/computer-applications-technology" }
  ],
  hero: {
    bgImage: "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg",
    badge: "Best Computer Application College in Kota",
    title: {
      main: "School of Computer Applications & Technology",
      highlight: "Computer",
      sky: "Technology"
    },
    description: "Career Point University offers cutting-edge programs shaping future technologists, researchers, and industry-ready professionals in Kota.",
    cta: [
      { label: "Apply Now", link: "#", primary: true },
      { label: "Explore Programs", link: "#programs", primary: false }
    ]
  },
  stats: [
    { value: "75L", label: "Highest Package", icon: "TrendingUp" },
    { value: "3L", label: "Avg Salary Package", icon: "BarChart3" },
    { value: "20K", label: "OJT Stipend/month", icon: "Briefcase" }
  ],
  about: {
    vision: {
      title: "Vision",
      label: "Our Purpose",
      icon: "Target",
      text: "To develop and deliver industry-relevant education to train students to be technically sound, research-driven innovators who can effectively meet the skills required by the industry both at national and global level.",
      highlights: [
        { value: "500+", label: "Students" },
        { value: "95%", label: "Placement" },
        { value: "20+", label: "Partners" }
      ]
    },
    mission: {
      title: "Mission",
      label: "Our Goal",
      icon: "Lightbulb",
      points: [
        "Improve academic practices that bridge theory and research.",
        "Create a research-led teaching environment combining classroom learning-by-doing.",
        "Impart collaborative resources to build a diverse intellectual space.",
        "Nurture researchers and critical thinkers through emerging technologies.",
        "Seek student solutions and critical thinking in a powerful environment."
      ]
    }
  },
  programmes: {
    title: "Our Programme",
    subtitle: "Academic Programmes",
    description: "Over the years, Career Point University has earned several accolades for playing a dynamic role in elevating research and the learning process of the institution.",
    levels: [
      {
        label: "After 12th Pass / \"A\" Level",
        icon: "GraduationCap",
        courses: [
          {
            name: "Bachelor of Computer Application (BCA)",
            link: "#",
            specializations: [
              { name: "Core", link: "#" },
              { name: "Data Science", link: "#" },
              { name: "Cloud Computing", link: "#" },
              { name: "AI & ML", link: "#" }
            ]
          }
        ]
      },
      {
        label: "After Graduation / Equivalent",
        icon: "BookOpen",
        courses: [
          {
            name: "Master of Computer Application (MCA)",
            link: "#",
            specializations: [
              { name: "Core", link: "#" },
              { name: "Data Science", link: "#" }
            ]
          },
          {
            name: "PG Diploma In Computer Application (PGDCA)",
            link: "#",
            specializations: [{ name: "Core", link: "#" }]
          }
        ]
      },
      {
        label: "After Post Graduation / Equivalent",
        icon: "Microscope",
        courses: [
          { name: "Ph.D. (All Subjects)", link: "#", description: "Research-focused doctoral programme" }
        ]
      }
    ]
  },
  placements: {
    title: "Students Placed in Top Companies",
    label: "CPU Placement Records",
    subtitle: "Highest & best placement record in the region",
    list: [
      { name: "Siraj Ali", company: "Course5 Intelligence", pkg: "8 LPA", img: "https://cpur.in/wp-content/uploads/2023/08/Siraj-Ali.png" },
      { name: "Tarun Jain", company: "Appcino", pkg: "10 LPA", img: "https://cpur.in/wp-content/uploads/2023/08/Tarun-Jain.png" },
      { name: "Prateek Dhaman", company: "TCS", pkg: "9 LPA", img: "https://cpur.in/wp-content/uploads/2023/08/Prateek-Dhaman.png" },
      { name: "Archana Kumari", company: "Tech Mahindra", pkg: "12 LPA", img: "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari.png" },
      { name: "Kiran Daklani", company: "Zalando", pkg: "75 LPA", img: "https://cpur.in/wp-content/uploads/2023/07/1-d.jpg" },
      { name: "Ravindra Singh", company: "ATC", pkg: "8 LPA", img: "https://cpur.in/wp-content/uploads/2023/08/Siraj-Ali.png" },
      { name: "Priya Sharma", company: "Infosys", pkg: "7 LPA", img: "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari.png" },
      { name: "Rahul Verma", company: "Wipro", pkg: "9 LPA", img: "https://cpur.in/wp-content/uploads/2023/08/Tarun-Jain.png" }
    ]
  },
  alumni: {
    title: "Making an Impact Globally",
    label: "Our Alumni",
    list: [
      { name: "Hemant Sharma", role: "Software Engineer", company: "Leading Tech Co.", img: "https://cpur.in/wp-content/uploads/2023/08/hemant.jpg" },
      { name: "Kiran Daklani", role: "Senior Developer", company: "Zalando – 75 LPA", img: "https://cpur.in/wp-content/uploads/2023/08/kiran.jpg" },
      { name: "Aryan Mathuria", role: "Software Engineer", company: "Evertz, Canada", img: "https://cpur.in/wp-content/uploads/2023/08/aryan.jpg" },
      { name: "Saloni Shukla", role: "Business Analyst", company: "Collabra", img: "https://cpur.in/wp-content/uploads/2023/08/Saloni.jpg" },
      { name: "Harsh Bahir", role: "Fintech Developer", company: "InvestaX – Singapore", img: "https://cpur.in/wp-content/uploads/2023/08/harsh.jpg" }
    ]
  },
  industry: {
    title: "Industry Tie Up's",
    label: "Collaborations",
    partners: [
      { name: "Tech Mahindra", url: "https://cpur.in/wp-content/uploads/2023/08/tech-mahindra-as-Smart-Object-1.jpg" },
      { name: "TCS", url: "https://cpur.in/wp-content/uploads/2023/08/tcs-logo-as-Smart-Object-1.jpg" },
      { name: "Infosys", url: "https://cpur.in/wp-content/uploads/2023/08/infosys-as-Smart-Object-1.jpg" },
      { name: "Wipro", url: "https://cpur.in/wp-content/uploads/2023/08/wipro-as-Smart-Object-1.jpg" },
      { name: "Vodafone", url: "https://cpur.in/wp-content/uploads/2023/08/vodafone-as-Smart-Object-1.jpg" },
      { name: "Google", url: "https://cpur.in/wp-content/uploads/2023/08/google-as-Smart-Object-1.jpg" },
      { name: "J-Spiders", url: "https://cpur.in/wp-content/uploads/2023/08/j-spiders-logo-as-Smart-Object-1.jpg" },
      { name: "JustDial", url: "https://cpur.in/wp-content/uploads/2023/08/justdial-logo-as-Smart-Object-1.jpg" }
    ]
  },
  research: {
    title: "Research Excellence",
    label: "Eminence Research",
    gallery: [
      "https://cpur.in/wp-content/uploads/2023/07/gallery-7.jpg",
      "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg",
      "https://cpur.in/wp-content/uploads/2023/07/gallery-12.jpg",
      "https://cpur.in/wp-content/uploads/2023/07/gallery-4.jpg"
    ],
    stats: [
      { value: "100+", label: "Research Papers Published", icon: "BookOpen" },
      { value: "30+", label: "Conference Presentations", icon: "Presentation" },
      { value: "5+", label: "Books", icon: "GraduationCap" },
      { value: "5+", label: "Patents Published", icon: "FlaskConical" }
    ]
  },
  community: {
    title: "Our Diverse Community",
    label: "Community",
    description: [
      "The computer application community thrives on diversity, encompassing a dynamic range of individuals with varying backgrounds, perspectives, and expertise.",
      "We are producing professionals with strong social ethics and moral values — integrating ethics education into the curriculum, fostering open discussions on ethical dilemmas, and encouraging service-learning projects."
    ],
    gallery: [
      { src: "https://cpur.in/wp-content/uploads/2023/07/gallery-7-1.jpg", caption: "Students in Computer Lab Session" },
      { src: "https://cpur.in/wp-content/uploads/2023/07/gallery-12-1.jpg", caption: "Tech Seminar & Workshop" }
    ]
  },
  infrastructure: {
    title: "World-Class Infrastructure",
    label: "Campus",
    list: [
      { title: "Modern Computer Labs", desc: "State-of-the-art labs with latest hardware & software", img: "https://cpur.in/wp-content/uploads/2023/07/gallery-7.jpg" },
      { title: "High-Speed Internet", desc: "Gigabit campus-wide Wi-Fi & LAN", img: "https://cpur.in/wp-content/uploads/2023/07/gallery-12.jpg" },
      { title: "Research & Innovation Hub", desc: "Dedicated space for R&D and innovation", img: "https://cpur.in/wp-content/uploads/2023/07/gallery-4.jpg" },
      { title: "Smart Classrooms", desc: "Interactive smart boards & AV systems", img: "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg" }
    ]
  }
};

// ─── ICON MAP ───────────────────────────────────────────────────────────────
const IconMap = {
  TrendingUp, BarChart3, Briefcase, Target, Lightbulb,
  GraduationCap, BookOpen, Microscope, FlaskConical,
  Users, Globe, Award, Presentation, Monitor, Wifi,
  Beaker, Tv2, Scale, FileText, Building2
};
const Icon = ({ name, ...p }) => { const C = IconMap[name]; return C ? <C {...p} /> : null; };

// ─── HELPERS ────────────────────────────────────────────────────────────────
function SectionLabel({ text }) {
  return (
    <span className="inline-block text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-4 text-[#00588b] border border-[#00588b]/20 bg-[#00588b]/8">
      {text}
    </span>
  );
}

function useSlider(total, auto = false, autoMs = 3200) {
  const [active, setActive] = useState(0);
  const timer = useRef(null);
  const pages = total;
  const go = (i) => setActive(((i % pages) + pages) % pages);
  const prev = () => go(active - 1);
  const next = () => go(active + 1);
  useEffect(() => {
    if (!auto) return;
    timer.current = setInterval(() => setActive(p => (p + 1) % pages), autoMs);
    return () => clearInterval(timer.current);
  }, [pages, auto]);
  return { active, go, prev, next };
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function SchoolHero({ data }) {
  if (!data) return null;
  const { bgImage, badge, title, description, cta } = data;
  const parts = title.main.split(title.highlight);
  const rightParts = parts[1]?.split(title.sky) ?? ["", ""];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgImage} alt="Campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#001f33]/95 via-[#00588b]/90 to-[#007abf]/85" />
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,.12) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
      </div>
      {/* Decorative rings */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[38%] w-[640px] h-[640px] rounded-full border-2 border-[#ffb900]/18 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[28%] w-[460px] h-[460px] rounded-full border-2 border-dashed border-white/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-16 py-24 w-full">
        <div className="max-w-[78%] sm:max-w-[65%]">
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-semibold bg-[#ffb900]/15 text-[#ffb900] border border-[#ffb900]/35">
              <Star className="w-4 h-4 fill-current" /> {badge}
            </div>
          )}
          <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2rem,4.2vw,3.6rem)" }}>
            {parts[0]}
            <span className="text-[#ffb900]">{title.highlight}</span>
            {rightParts[0]}
            <span className="text-sky-300">{title.sky}</span>
            {rightParts[1]}
          </h1>
          <p className="text-blue-100/85 text-lg leading-relaxed mb-10 max-w-xl">{description}</p>
          <div className="flex flex-wrap gap-4">
            {cta?.map((btn, i) => (
              <a key={i} href={btn.link}
                className={`inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-105 no-underline ${
                  btn.primary
                    ? "bg-[#ffb900] text-[#0a1628] shadow-[0_8px_32px_rgba(255,185,0,0.38)]"
                    : "text-white bg-white/10 hover:bg-white/20 border-2 border-white/30"
                }`}>
                {btn.label} {btn.primary && <ArrowRight className="w-5 h-5" />}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 56" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,36 C360,72 1080,0 1440,36 L1440,56 L0,56 Z" />
        </svg>
      </div>
    </section>
  );
}

// ─── STATS ───────────────────────────────────────────────────────────────────
function SchoolStats({ data }) {
  return (
    <section className="bg-white py-6 relative z-10 -mt-1">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {data.map((s, i) => (
            <div key={i} className="text-center py-6 px-4 rounded-2xl bg-gradient-to-br from-[#f0f6fb] to-white border border-[#dde8f5] shadow-sm">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#00588b]/10 flex items-center justify-center">
                <Icon name={s.icon} size={22} className="text-[#00588b]" />
              </div>
              <div className="font-black text-[#0a1628] leading-none" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)" }}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function SchoolAbout({ data }) {
  const { vision, mission } = data;
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-14">
          <SectionLabel text="About Us" />
          <h2 className="font-black text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            Vision & <span className="text-[#00588b]">Mission</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#00588b] p-8 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#ffb900]/20 text-[#ffb900] border border-[#ffb900]/30 mb-5">
              <Target size={13} /> {vision.label}
            </div>
            <h3 className="text-2xl font-black mb-4">{vision.title}</h3>
            <p className="text-blue-100/85 leading-relaxed mb-8">{vision.text}</p>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15">
              {vision.highlights.map((h, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-black text-[#ffb900]">{h.value}</div>
                  <div className="text-xs text-blue-200 mt-1">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Mission */}
          <div className="rounded-2xl bg-[#f8fafc] border border-slate-200 p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#00588b]/10 text-[#00588b] border border-[#00588b]/20 mb-5">
              <Lightbulb size={13} /> {mission.label}
            </div>
            <h3 className="text-2xl font-black text-[#0a1628] mb-6">{mission.title}</h3>
            <ul className="space-y-3">
              {mission.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#00588b] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-sm leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROGRAMMES ──────────────────────────────────────────────────────────────
function SchoolProgrammes({ data }) {
  const [openLevel, setOpenLevel] = useState(0);
  const iconMap = { GraduationCap, BookOpen, Microscope };
  return (
    <section id="programs" className="py-24 bg-gradient-to-br from-[#f0f6fb] to-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-14">
          <SectionLabel text={data.subtitle} />
          <h2 className="font-black text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            Our <span className="text-[#00588b]">Programmes</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mt-3 text-sm leading-relaxed">{data.description}</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {data.levels.map((lv, i) => {
            const LIcon = iconMap[lv.icon] || GraduationCap;
            const isOpen = openLevel === i;
            return (
              <div key={i} onClick={() => setOpenLevel(i)}
                className={`rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${isOpen ? "border-[#00588b] shadow-[0_8px_32px_rgba(0,88,139,0.15)]" : "border-slate-200 hover:border-[#00588b]/40"}`}>
                <div className={`p-6 ${isOpen ? "bg-gradient-to-br from-[#0a1628] to-[#00588b]" : "bg-white"}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isOpen ? "bg-[#ffb900]/20" : "bg-[#00588b]/10"}`}>
                    <LIcon size={24} className={isOpen ? "text-[#ffb900]" : "text-[#00588b]"} />
                  </div>
                  <h3 className={`font-bold text-sm leading-snug ${isOpen ? "text-white" : "text-[#0a1628]"}`}>{lv.label}</h3>
                </div>
                {isOpen && (
                  <div className="p-6 bg-white space-y-5">
                    {lv.courses.map((c, j) => (
                      <div key={j}>
                        <a href={c.link} className="font-bold text-[#0a1628] text-sm hover:text-[#00588b] transition-colors no-underline block mb-2">{c.name}</a>
                        {c.specializations && (
                          <div className="flex flex-wrap gap-2">
                            {c.specializations.map((sp, k) => (
                              <a key={k} href={sp.link} className="text-xs px-3 py-1 rounded-full bg-[#00588b]/8 text-[#00588b] border border-[#00588b]/20 hover:bg-[#00588b] hover:text-white transition-colors no-underline">
                                {sp.name}
                              </a>
                            ))}
                          </div>
                        )}
                        {c.description && <p className="text-xs text-slate-500 mt-2">{c.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── PLACEMENTS ──────────────────────────────────────────────────────────────
function SchoolPlacements({ data }) {
  const [perPage, setPerPage] = useState(4);
  const pages = Math.ceil(data.list.length / perPage);
  const { active, go, prev, next } = useSlider(pages, true);
  const timer = useRef(null);

  useEffect(() => {
    const calc = () => setPerPage(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const cardW = 100 / perPage;
  return (
    <section id="placement" className="py-24 bg-[#f0f6fb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-12">
          <SectionLabel text={data.label} />
          <h2 className="font-black text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            Students Placed in <span className="text-[#00588b]">Top Companies</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3">{data.subtitle}</p>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${active * 100}%)` }}>
              {data.list.map((p, j) => (
                <div key={j} className="flex-shrink-0 px-2.5" style={{ width: `${cardW}%` }}>
                  <div className="rounded-2xl overflow-hidden bg-white border border-[#dde8f5] shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative aspect-[3/4]">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover object-top" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="font-bold text-white text-sm">{p.name}</div>
                        <div className="text-xs text-blue-200 mt-0.5">{p.company}</div>
                        <div className="inline-block mt-2 text-xs px-2.5 py-1 rounded-full font-bold bg-[#ffb900] text-[#0a1628]">{p.pkg}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white text-[#00588b] border border-[#dde8f5] shadow-lg hover:scale-110 transition-transform">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-[#00588b] text-white border-none shadow-lg hover:scale-110 transition-transform">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => go(i)} className={`h-2.5 rounded-full transition-all border-none cursor-pointer ${active === i ? "bg-[#00588b] w-7" : "bg-slate-300 w-2.5"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ALUMNI ───────────────────────────────────────────────────────────────────
function SchoolAlumni({ data }) {
  const [perPage, setPerPage] = useState(4);
  const pages = Math.ceil(data.list.length / perPage);
  const { active, go, prev, next } = useSlider(pages);

  useEffect(() => {
    const calc = () => setPerPage(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const cardW = 100 / perPage;
  return (
    <section id="alumni" className="py-24 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-14">
          <SectionLabel text={data.label} />
          <h2 className="font-black text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            Making an <span className="text-[#00588b]">Impact</span> Globally
          </h2>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${active * 100}%)` }}>
              {data.list.map((a, j) => (
                <div key={j} className="flex-shrink-0 px-3" style={{ width: `${cardW}%` }}>
                  <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img src={a.img} alt={a.name} className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105" />
                    </div>
                    <div className="p-4 text-center border-t-[3px] border-[#00588b]">
                      <h4 className="font-bold text-sm text-[#0a1628]">{a.name}</h4>
                      <p className="text-xs mt-1 font-medium text-[#00588b]">{a.role}</p>
                      <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold bg-[#00588b]/8 text-[#00588b]">{a.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white text-[#00588b] border border-slate-200 shadow-lg hover:scale-110 transition-transform">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-[#00588b] text-white border-none shadow-lg hover:scale-110 transition-transform">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => go(i)} className={`h-2.5 rounded-full transition-all border-none cursor-pointer ${active === i ? "bg-[#00588b] w-7" : "bg-slate-300 w-2.5"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INDUSTRY PARTNERS ────────────────────────────────────────────────────────
function SchoolPartners({ data }) {
  const [perPage, setPerPage] = useState(6);
  useEffect(() => {
    const calc = () => setPerPage(window.innerWidth < 640 ? 3 : window.innerWidth < 1024 ? 4 : 6);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  const pages = Math.ceil(data.partners.length / perPage);
  const { active, go, prev, next } = useSlider(pages);
  return (
    <section id="industry" className="py-20 bg-white border-t border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-12">
          <SectionLabel text={data.label} />
          <h2 className="font-black text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            Industry <span className="text-[#00588b]">Tie Up's</span>
          </h2>
        </div>
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${active * 100}%)` }}>
            {Array.from({ length: pages }).map((_, pi) => (
              <div key={pi} className="min-w-full grid gap-4" style={{ gridTemplateColumns: `repeat(${perPage}, 1fr)` }}>
                {data.partners.slice(pi * perPage, pi * perPage + perPage).map((logo, j) => (
                  <div key={j} className="flex items-center justify-center rounded-2xl bg-white h-[88px] px-4 py-3 border-[1.5px] border-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <img src={logo.url} alt={logo.name} className="max-h-12 max-w-full object-contain" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full flex items-center justify-center border border-[#00588b]/20 bg-[#00588b]/8 text-[#00588b] hover:scale-110 transition-transform">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} onClick={() => go(i)} className={`h-2.5 rounded-full transition-all border-none cursor-pointer ${active === i ? "bg-[#00588b] w-7" : "bg-slate-300 w-2.5"}`} />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full flex items-center justify-center bg-[#00588b] text-white border-none hover:scale-110 transition-transform">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── RESEARCH ────────────────────────────────────────────────────────────────
function SchoolResearch({ data }) {
  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveImg(p => (p + 1) % data.gallery.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="research" className="py-24 bg-gradient-to-br from-[#0a1628] via-[#0d3060] to-[#00588b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-4 text-[#ffb900] bg-[#ffb900]/12 border border-[#ffb900]/30">
            {data.label}
          </span>
          <h2 className="font-black text-white" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            Research <span className="text-[#ffb900]">Excellence</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            {data.gallery.map((img, i) => (
              <img key={i} src={img} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeImg === i ? "opacity-100" : "opacity-0"}`} />
            ))}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {data.gallery.map((_, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`h-2 rounded-full transition-all border-none cursor-pointer ${activeImg === i ? "bg-[#ffb900] w-6" : "bg-white/40 w-2"}`} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {data.stats.map((st, i) => (
              <div key={i} className="rounded-2xl p-6 bg-white/8 border border-white/12 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-[#ffb900]/15 flex items-center justify-center mb-4">
                  <Icon name={st.icon} size={20} className="text-[#ffb900]" />
                </div>
                <div className="text-3xl font-black text-[#ffb900]">{st.value}</div>
                <div className="text-sm text-blue-100/80 mt-1">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMMUNITY ───────────────────────────────────────────────────────────────
function SchoolCommunity({ data }) {
  return (
    <section id="community" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel text={data.label} />
            <h2 className="font-black text-[#0a1628] mb-6" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)" }}>
              Our Diverse <span className="text-[#00588b]">Community</span>
            </h2>
            {data.description.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-4 text-sm">{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {data.gallery.map((g, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={g.src} alt={g.caption} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="bg-[#f0f6fb] px-3 py-2">
                  <p className="text-xs text-slate-500 font-medium">{g.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── INFRASTRUCTURE ──────────────────────────────────────────────────────────
function SchoolInfrastructure({ data }) {
  const infIcons = ["Monitor", "Wifi", "Beaker", "Tv2"];
  return (
    <section id="infrastructure" className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center mb-14">
          <SectionLabel text={data.label} />
          <h2 className="font-black text-[#0a1628]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            World-Class <span className="text-[#00588b]">Infrastructure</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.list.map((item, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 to-transparent" />
                <div className="absolute bottom-3 left-3 w-9 h-9 rounded-lg bg-[#ffb900] flex items-center justify-center">
                  <Icon name={infIcons[i]} size={18} className="text-[#0a1628]" />
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-sm text-[#0a1628]">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BREADCRUMB NAV ──────────────────────────────────────────────────────────
function Breadcrumb({ items }) {
  return (
    <nav className="bg-[#0a1628] py-3 px-4 lg:px-16">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-blue-300/70 flex-wrap">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-blue-500/40">/</span>}
            {i < items.length - 1
              ? <a href={item.link} className="hover:text-[#ffb900] transition-colors no-underline">{item.label}</a>
              : <span className="text-blue-200">{item.label}</span>
            }
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}

// ─── STICKY NAV ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "programs", label: "Programmes" },
  { id: "placement", label: "Placements" },
  { id: "alumni", label: "Alumni" },
  { id: "industry", label: "Industry" },
  { id: "research", label: "Research" },
  { id: "infrastructure", label: "Campus" },
];

function StickyNav() {
  const [active, setActive] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 600);
      for (const item of NAV_ITEMS.slice().reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 120) { setActive(item.id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-md border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 lg:px-16 flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
        {NAV_ITEMS.map(item => (
          <button key={item.id}
            onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
            className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-lg transition-all border-none cursor-pointer ${active === item.id ? "bg-[#ffb900] text-[#0a1628]" : "text-blue-200 hover:bg-white/10"}`}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function BCAPage() {
  const d = DATA;
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: #fff; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>
      <StickyNav />
      <Breadcrumb items={d.breadcrumb} />
      <SchoolHero data={d.hero} />
      <SchoolStats data={d.stats} />
      <SchoolAbout data={d.about} />
      <SchoolProgrammes data={d.programmes} />
      <SchoolPlacements data={d.placements} />
      <SchoolAlumni data={d.alumni} />
      <SchoolPartners data={d.industry} />
      <SchoolResearch data={d.research} />
      <SchoolCommunity data={d.community} />
      <SchoolInfrastructure data={d.infrastructure} />
    </>
  );
}