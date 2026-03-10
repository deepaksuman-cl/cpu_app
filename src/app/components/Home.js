"use client";
import { useState, useEffect, useRef, useCallback } from "react";

import {
  Phone, Mail, MapPin, ChevronRight, ChevronLeft, ArrowRight,
  GraduationCap, BookOpen, FlaskConical, Menu, X,
  Star, Globe, Users, Award, TrendingUp, Briefcase,
  Building2, Microscope, Zap, Heart, Facebook, Instagram,
  Youtube, Twitter, Linkedin, MessageCircle, Download,
  Plus, Minus, Play, CheckCircle, Calendar, ChevronDown,
  Search, Layers
} from "lucide-react";


/* ─── NAV DATA ─── */
const NAV_DATA = [
  { label:"Home", href:"#", active:true },
  { label:"About", href:"#about", submenu:[
    {label:"Vision & Mission",href:"#about"},{label:"Chancellor's Message",href:"#about"},
    {label:"Board of Governors",href:"#about"},{label:"Accreditations",href:"#about"},
    {label:"Rankings & Awards",href:"#about"},{label:"Campus Tour",href:"#about"},
  ]},
  { label:"Programs", href:"#programs", mega:true,
    byLevel:[
      {label:"Diploma",badge:null},{label:"Under Graduate (UG)",badge:"Popular"},
      {label:"Integrated",badge:null},{label:"Post Graduate (PG)",badge:null},
      {label:"Doctoral / PhD",badge:"New"},{label:"All Programs",badge:null},
    ],
    schools:[
      {label:"Engineering & Technology",active:true},{label:"Commerce & Management"},
      {label:"Computer Applications"},{label:"Legal Studies & Law"},
      {label:"Health & Allied Sciences"},{label:"Agricultural Sciences"},
      {label:"Basic & Applied Sciences"},{label:"Arts & Humanities"},
    ],
    topCourses:[
      {label:"B.Tech CSE / AI&ML",badge:"Hot"},{label:"MBA",badge:null},
      {label:"BCA / MCA",badge:null},{label:"BA LLB / LLM",badge:null},
      {label:"B.Pharm",badge:"New"},{label:"B.Sc Agriculture",badge:null},
      {label:"M.Sc Biotechnology",badge:null},{label:"50+ More Programs…",badge:null,more:true},
    ],
  },
  { label:"Admissions", href:"#admission", submenu:[
    {label:"Apply Online",href:"#admission"},{label:"Eligibility Criteria",href:"#admission"},
    {label:"Fee Structure",href:"#admission"},{label:"Scholarships",href:"#admission"},
    {label:"International Students",href:"#admission"},{label:"Downloads / Brochure",href:"#admission"},
  ]},
  { label:"Placement", href:"#placement", submenu:[
    {label:"Placement Cell",href:"#placement"},{label:"Top Recruiters",href:"#placement"},
    {label:"Placement Stats",href:"#placement"},{label:"Industry Connect",href:"#placement"},
    {label:"Internships",href:"#placement"},
  ]},
  { label:"Campus Life", href:"#campus", submenu:[
    {label:"Hostels & Housing",href:"#campus"},{label:"Sports & Fitness",href:"#campus"},
    {label:"Clubs & Societies",href:"#campus"},{label:"Cultural Events",href:"#campus"},
    {label:"Medical Facilities",href:"#campus"},
  ]},
  { label:"International", href:"#international" },
];

/* ─── PAGE DATA ─── */
const STATS = [
  {value:25000,suffix:"K+",label:"Students Enrolled",   icon:Users},
  {value:20,   suffix:"+", label:"Countries",            icon:Globe},
  {value:500,  suffix:"+", label:"Expert Faculty",       icon:GraduationCap},
  {value:400,  suffix:"+", label:"Placement Companies",  icon:Briefcase},
  {value:90,   suffix:"%", label:"Placement Record",     icon:TrendingUp},
  {value:70,   suffix:"+", label:"Programs Offered",     icon:BookOpen},
];

const HERO_SLIDES = [
  {
    bg: "https://cpur.in/wp-content/uploads/2023/07/banner-005.webp",
    tagline: "World-Class Infrastructure",
    title: "State-of-the-Art",
    subtitle: "Campus Life",
    desc: "Sprawling green campus with 300+ labs, smart classrooms, hostels, sports complex and innovation centers.",
    badge: "🏛️ 150+ Acres Green Campus",
  },
  {
    bg: "https://cpur.in/wp-content/uploads/2024/01/bg_12-1.jpg",
    tagline: "Rajasthan's Premier University",
    title: "100+ Programs",
    subtitle: "For Your Future",
    desc: "Build a future-ready career with industry-aligned programs across Engineering, Management, Law, Pharmacy & more.",
    badge: "🎓 NAAC A | 25+ Years of Excellence",
  },
  {
    bg: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80",
    tagline: "Career Excellence",
    title: "42 LPA",
    subtitle: "Highest Package",
    heroimg: "https://cpur.in/wp-content/uploads/2023/12/aryan-mathuria.png",
    desc: "Our placement cell connects you with 400+ top recruiters including Amazon, Microsoft, TCS, Infosys & more.",
    badge: "💼 90% Placement Record",
  },
];

const PROGRAM_CARDS = [
  {id:1,label:"Under Graduate", image:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",count:"30+ Programs"},
  {id:2,label:"Post Graduate",  image:"https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80",count:"20+ Programs"},
  {id:3,label:"Doctoral",       image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",count:"10+ Programs"},
  {id:4,label:"Diploma",        image:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",count:"15+ Programs"},
];

const COURSE_LIST = [
  {title:"B.Tech / BE",  dept:"Engineering & Technology",  icon:Zap,         count:"10 Specializations"},
  {title:"BBA / MBA",    dept:"Management & Commerce",     icon:Briefcase,   count:"7 Specializations"},
  {title:"B.Sc Medical", dept:"Medical & Health Sciences", icon:Heart,       count:"5 Programs"},
  {title:"LLB / LLM",   dept:"Law & Legal Studies",       icon:Award,       count:"3 Programs"},
  {title:"B.Arch",       dept:"Architecture & Design",     icon:Building2,   count:"2 Programs"},
  {title:"B.Pharm",      dept:"Pharmacy & Life Sciences",  icon:FlaskConical,count:"4 Programs"},
  {title:"B.Ed / M.Ed",  dept:"Education & Training",      icon:BookOpen,    count:"3 Programs"},
  {title:"BCA / MCA",   dept:"Computer Applications",     icon:Microscope,  count:"5 Programs"},
];

const COLLABORATIONS = ["IIT Bombay","IIM Udaipur","AIIMS","WHO","UNESCO","NIT Hamirpur","Oxford","ISRO","DRDO","NASSCOM","CII","FICCI","AICTE","UGC"];
const RECRUITERS     = [
{img:"https://cpur.in/wp-content/uploads/2023/12/40-Just-Dial.webp"},
{img:"https://cpur.in/wp-content/uploads/2023/12/1-Amazon.png"},
{img:"https://cpur.in/wp-content/uploads/2023/12/2-Linkdin.png"},
{img:"https://cpur.in/wp-content/uploads/2023/12/5-Microsoft.webp"},
{img:"https://cpur.in/wp-content/uploads/2023/12/7-TCS.webp"},
{img:"https://cpur.in/wp-content/uploads/2023/12/22-Bajaj-Fin.webp"},

];
const Personalities     = [
{img:"https://cpur.in/wp-content/uploads/2023/12/1-min.png"},
{img:"https://cpur.in/wp-content/uploads/2023/12/2-min.png"},
{img:"https://cpur.in/wp-content/uploads/2023/12/3-min.png"},
{img:"https://cpur.in/wp-content/uploads/2023/12/4-min.png"},
{img:"https://cpur.in/wp-content/uploads/2023/12/5-min.png"},
{img:"https://cpur.in/wp-content/uploads/2023/12/6-min.png"},

];

const PLACEMENT_SLIDES = [
  {name:"Abhinav Singh",course:"B.Sc HBHA",      company:"Hyatt Regency",img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"},
  {name:"Avneet Bagga",  course:"B.Tech Food Tech",company:"ITC Limited",  img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"},
  {name:"Manan Sethi",   course:"B.Tech Food Tech",company:"GRG Health",   img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"},
  {name:"Priya Sharma",  course:"MBA 2022",        company:"Amazon",        img:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80"},
  {name:"Rahul Mehta",   course:"B.Tech CSE",      company:"Microsoft",     img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"},
];

const PLACEMENT_STATS = [
  {val:"6500+",  label:"Placements"},    {val:"27 LPA", label:"Highest Offer"},
  {val:"5.5 LPA",label:"Average Offer"},{val:"250+",   label:"Companies Hired"},
  {val:"150+",   label:"Companies Visited"},{val:"95%",label:"Students Placed"},
];

const CAMPUS_COLS = [
  {title:"Enriching the",bold:"Intellect",       img:"https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",links:["Classrooms","Laboratories","Libraries","Auditoriums","Learning Facilities","Innovation & Incubation"]},
  {title:"Inspire Your", bold:"Essence",          img:"https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80", links:["Accommodations","Cafeteria","Student Clubs & Societies","Transportation","Beyond Academics"]},
  {title:"Elevate Your", bold:"Physical Fitness", img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",links:["Sports Facilities","Gymnasium"]},
  {title:"Adapt to",     bold:"Physical Wellness",img:"https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80", links:["Covid Readiness","Medical Help","Health and Safety"]},
];

const ALUMNI = [
  {name:"Aryan Mathuria",role:" BCA Class of 2018",  company:" evertz",    companyBg:"bg-green-600",     circleBg:"bg-teal-400",  img:"https://cpur.in/wp-content/uploads/2023/12/alumni_01.png"},
  {name:"Kiran Bablani", role:"BCA Class of 2018 ", company:"zalando ",companyBg:"bg-pink-600",     circleBg:"bg-yellow-400",img:"https://cpur.in/wp-content/uploads/2023/12/alumni_02.png"},
  {name:" Priya Lakhotiya", role:"MBA Class of 2021 ",   company:"upGrad",    companyBg:"bg-blue-900",     circleBg:"bg-red-500",   img:"https://cpur.in/wp-content/uploads/2023/12/alumni_03.png"},
  {name:"Naman Nandwana ",  role:"MBA | Class of 2020",   company:"Quick Heal",   companyBg:"bg-amber-500",    circleBg:"bg-purple-400",img:"https://cpur.in/wp-content/uploads/2023/12/alumni_04.png"},
];

const RESEARCH_ITEMS = [
  {title:"AI & Data Science Lab",         img:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",desc:"Cutting-edge research in artificial intelligence and machine learning.",tag:"Technology"},
  {title:"Biotechnology Research Center", img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",desc:"Breakthrough research in genomics and pharmaceutical sciences.",       tag:"Life Sciences"},
  {title:"Sustainable Energy Lab",        img:"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",desc:"Innovation in renewable energy and sustainable technologies.",            tag:"Engineering"},
];

const HAPPENINGS = [
  {title:"Annual Tech Fest Koshish 2026",  date:"Mar 18, 2026",tag:"Event",    icon:Zap,       colorClass:"from-[#00588b] to-[#003a5c]"},
  {title:"International Research Seminar", date:"Mar 22, 2026",tag:"Research", icon:Microscope,colorClass:"from-[#003a5c] to-[#002040]"},
  {title:"Campus Placement Drive – MNCs",  date:"Mar 28, 2026",tag:"Placement",icon:Briefcase, colorClass:"from-[#005070] to-[#003a5c]"},
  {title:"Cultural Fest 'Utsav'",          date:"Apr 5, 2026", tag:"Cultural", icon:Star,      colorClass:"from-[#004a7a] to-[#002f4e]"},
];

const FAQS = [
  {q:"What programs does Career Point University offer?",   a:"CPU offers 70+ programs across UG, PG, Doctoral and Diploma levels in Engineering, Management, Law, Pharmacy, Medical Sciences, and more."},
  {q:"What is the admission process at CPU?",               a:"Admissions are based on merit/entrance test scores (JEE, NEET, CAT, etc.). Apply online at cpuniverse.ac.in or call 1800-1800-345 for assistance."},
  {q:"What are the placement opportunities?",               a:"CPU has a dedicated placement cell with 400+ recruiters. Highest package 42 LPA with 90% placement rate."},
  {q:"Does CPU offer scholarships?",                        a:"Yes, CPU offers merit-based, need-based scholarships and Rajasthan government scholarships to eligible students."},
  {q:"What is the campus infrastructure like?",             a:"Sprawling campus in Kota with smart classrooms, labs, hostels, sports facilities, medical center, and more than 25 years of educational excellence."},
  {q:"Is there international exposure for students?",       a:"Yes, CPU has collaborations with 20+ countries and offers student exchange programs, international internships, and global certifications."},
];

const SOCIAL_IMGS = [
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80",
  "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=600&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
];



/* ─── COUNTER HOOK ─── */
function useCounter(target, dur=1800, active=false) {
  const [v,setV]=useState(0);
  useEffect(()=>{
    if(!active) return;
    let st=null;
    const step=ts=>{if(!st)st=ts;const p=Math.min((ts-st)/dur,1);const e=1-Math.pow(1-p,3);setV(Math.floor(e*target));if(p<1)requestAnimationFrame(step);};
    requestAnimationFrame(step);
  },[target,dur,active]);
  return v;
}

/* ─── STAT CARD ─── */
function StatCard({value,suffix,label,icon:Icon,inView}){
  const dv=value>=1000?Math.round(value/1000):value;
  const c=useCounter(dv,1600,inView);
  const d=value>=1000?`${c}K${suffix.replace("K+","+")}` :`${c}${suffix}`;
  return(
    <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl p-5 text-center hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-default">
      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-5">
        <Icon size={40} className="text-[#00588b]"/>
      </div>
      <div className="font-black text-3xl text-[#00588b] leading-none">{d}</div>
      <div className="text-xs text-gray-500 mt-1.5">{label}</div>
    </div>
  );
}

/* ─── SWIPER ─── */
/* ─────────────────────────────────────────────────────────
   ✅ FIXED SWIPER — correct transform calculation
   Formula: translateX(calc(-idx * (100/perView)% - idx * gap/perView * px))
   This correctly accounts for flex gap spacing between items.
───────────────────────────────────────────────────────── */
function Swiper({ items, renderSlide, perView = 3, gap = 16, autoInterval = 4000, dark = false }) {
  const [idx, setIdx] = useState(0);
  const max = Math.max(0, items.length - perView);
  const timerRef = useRef(null);

  const go = useCallback((n) => { setIdx(Math.max(0, Math.min(n, max))); }, [max]);

  const resetTimer = useCallback((n) => {
    clearInterval(timerRef.current);
    go(n);
    timerRef.current = setInterval(() => setIdx(p => p >= max ? 0 : p + 1), autoInterval);
  }, [go, max, autoInterval]);

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx(p => p >= max ? 0 : p + 1), autoInterval);
    return () => clearInterval(timerRef.current);
  }, [max, autoInterval]);

  // ✅ FIXED: correct width and transform
  // Each slide width = (100% - gap*(perView-1)) / perView
  // Step size (one slide + one gap) = slideWidth + gap = 100%/perView + gap/perView
  const slideWidth = `calc(${100 / perView}% - ${gap * (perView - 1) / perView}px)`;
  const translateX = `calc(-${idx * (100 / perView)}% - ${idx * gap / perView}px)`;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex"
          style={{
            gap: gap,
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

      {/* Prev button */}
      {idx > 0 && (
        <button
          onClick={() => resetTimer(idx - 1)}
          className={`absolute -left-5 top-[42%] -translate-y-1/2 w-10 h-10 rounded-full border-none cursor-pointer flex items-center justify-center shadow-xl z-10 transition-transform hover:scale-110 ${dark ? "bg-amber-400" : "bg-[#00588b]"}`}
        >
          <ChevronLeft size={18} className="text-white" />
        </button>
      )}

      {/* Next button */}
      {idx < max && (
        <button
          onClick={() => resetTimer(idx + 1)}
          className={`absolute -right-5 top-[42%] -translate-y-1/2 w-10 h-10 rounded-full border-none cursor-pointer flex items-center justify-center shadow-xl z-10 transition-transform hover:scale-110 ${dark ? "bg-amber-400" : "bg-[#00588b]"}`}
        >
          <ChevronRight size={18} className="text-white" />
        </button>
      )}

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-5">
        {Array.from({ length: max + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => resetTimer(i)}
            className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${i === idx
              ? dark ? "bg-amber-400 w-6" : "bg-[#00588b] w-6"
              : dark ? "bg-black/30 w-2" : "bg-gray-300 w-2"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── HERO SWIPER ─── */
function HeroSwiper(){
  const [idx,setIdx]=useState(0);
  const [animKey,setAnimKey]=useState(0);
  const timerRef=useRef(null);

  const go=useCallback((n)=>{
    clearInterval(timerRef.current);
    setIdx(n%HERO_SLIDES.length);
    setAnimKey(k=>k+1);
    timerRef.current=setInterval(()=>{setIdx(p=>(p+1)%HERO_SLIDES.length);setAnimKey(k=>k+1);},5500);
  },[]);

  useEffect(()=>{
    timerRef.current=setInterval(()=>{setIdx(p=>(p+1)%HERO_SLIDES.length);setAnimKey(k=>k+1);},5500);
    return()=>clearInterval(timerRef.current);
  },[]);

  const hs=HERO_SLIDES[idx];

  return(
    <section className="relative overflow-hidden min-h-[680px]">
      {/* BG crossfade */}
      {HERO_SLIDES.map((slide,i)=>(
        <div key={i} className="absolute inset-0 bg-cover bg-top transition-opacity duration-[900ms]"
          style={{backgroundImage:`url(${slide.bg})`,opacity:i===idx?1:0,zIndex:0}}/>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00121f]/90 via-[#002848]/72 to-[#00121f]/28" style={{zIndex:1}}/>

      {/* Content */}
   <div className="relative max-w-7xl mx-auto px-5 py-24 flex items-center" style={{zIndex:2}}>
  <div key={animKey} className="max-w-[660px] animate-heroUp">
    <span className="inline-flex items-center gap-1.5 bg-amber-400 text-black text-xs font-extrabold px-4 py-1.5 rounded-full mb-5">{hs.badge}</span>
    <p className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em] mb-2.5">{hs.tagline}</p>
    <h1 className="text-white font-black text-5xl md:text-6xl lg:text-[66px] leading-[1.02] m-0">{hs.title}</h1>
    <h1 className="text-amber-400 font-black text-5xl md:text-6xl lg:text-[66px] leading-[1.02] mt-0 mb-6">{hs.subtitle}</h1>
    <p className="text-white/80 text-base leading-[1.75] max-w-[520px] mb-8">{hs.desc}</p>
    <div className="flex gap-3.5 flex-wrap">
      <button className="bg-gradient-to-br from-amber-400 to-amber-600 text-white border-none rounded-full px-8 py-3 text-[15px] font-extrabold cursor-pointer flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
        Apply Now <ArrowRight size={15}/>
      </button>
      <button className="bg-transparent text-white border-2 border-white/60 rounded-full px-6 py-3 text-[15px] font-bold cursor-pointer flex items-center gap-2 hover:bg-white/15 hover:border-white transition-all">
        Explore Programs
      </button>
      <button className="bg-transparent text-white border-2 border-white/60 rounded-full px-6 py-3 text-[15px] font-bold cursor-pointer flex items-center gap-2 hover:bg-white/15 hover:border-white transition-all">
        <Play size={15}/> Watch Video
      </button>
    </div>
  </div>

  {/* ✅ Only shows on slides where heroimg is defined */}
  {hs.heroimg && (
    <div className="hero_img animate-heroUp">
      <img src={hs.heroimg} alt="img" className="ml-30 w-[80%] block m-auto rounded-2xl group-hover:scale-105 transition-transform duration-400"/>
    </div>
  )}
</div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 mb-5" style={{zIndex:3}}>
        {HERO_SLIDES.map((_,i)=>(
          <button key={i} onClick={()=>go(i)}
            className={`h-2.5 rounded-full border-none cursor-pointer transition-all duration-400 ${i===idx?"bg-amber-400 w-8":"bg-white/45 w-2.5"}`}/>
        ))}
      </div>

      {/* Arrows */}
      <button onClick={()=>go((idx-1+HERO_SLIDES.length)%HERO_SLIDES.length)}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 border border-white/35 cursor-pointer flex items-center justify-center backdrop-blur hover:bg-white/28 transition-colors"
        style={{zIndex:3}}>
        <ChevronLeft size={20} className="text-white"/>
      </button>
      <button onClick={()=>go((idx+1)%HERO_SLIDES.length)}
        className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 border border-white/35 cursor-pointer flex items-center justify-center backdrop-blur hover:bg-white/28 transition-colors"
        style={{zIndex:3}}>
        <ChevronRight size={20} className="text-white"/>
      </button>

      {/* Wave */}
      <div className="absolute -bottom-0.5 left-0 right-0" style={{zIndex:2}}>
        <svg viewBox="0 0 1440 60" fill="none"><path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" fill="white"/></svg>
      </div>
    </section>
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */
export default function CPUHomepage(){
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [openFaq,    setOpenFaq]    = useState(null);
  const [scrolled,   setScrolled]   = useState(false);
  const [lightbox,   setLightbox]   = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(null);
  const [statsInView,setStatsInView]= useState(false);
  const statsRef=useRef(null);
  const navRef=useRef(null);

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setStatsInView(true);},{threshold:.3});
    if(statsRef.current)obs.observe(statsRef.current);
    return()=>obs.disconnect();
  },[]);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>70);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);
  useEffect(()=>{
    const fn=e=>{if(e.key==="Escape"){setLightbox(null);setMenuOpen(false);setActiveMenu(null);}};
    window.addEventListener("keydown",fn);
    return()=>window.removeEventListener("keydown",fn);
  },[]);
  useEffect(()=>{
    const fn=e=>{if(navRef.current&&!navRef.current.contains(e.target))setActiveMenu(null);};
    document.addEventListener("mousedown",fn);
    return()=>document.removeEventListener("mousedown",fn);
  },[]);
  useEffect(()=>{document.body.style.overflow=menuOpen?"hidden":"";return()=>{document.body.style.overflow="";};},[menuOpen]);

  return(
    <div className="font-sans bg-white overflow-x-hidden">
      {/* ── Global keyframes ── */}
      <style>{`
        html{scroll-behavior:smooth}
        @keyframes ticker{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}
        @keyframes heroUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dropDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideInLeft{from{transform:translateX(-100%)}to{transform:translateX(0)}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(0,88,139,.45)}50%{box-shadow:0 0 0 14px rgba(0,88,139,0)}}
        .ticker-run{animation:ticker 30s linear infinite;white-space:nowrap;display:inline-block}
        .animate-heroUp{animation:heroUp .75s cubic-bezier(.2,0,.2,1) both}
        .dd-anim{animation:dropDown .18s ease}
        .mob-anim{animation:slideInLeft .26s ease}
        .pulse-anim{animation:pulseGlow 2.2s infinite}
        /* campus col hover links */
        .campus-col .c-links{opacity:0;transform:translateY(14px);transition:all .32s}
        .campus-col:hover .c-links{opacity:1;transform:translateY(0)}
        .campus-col img{transition:transform .5s}
        .campus-col:hover img{transform:scale(1.07)}
        .campus-col .c-overlay{transition:background .3s}
        .campus-col:hover .c-overlay{background:linear-gradient(to bottom,rgba(0,40,70,.28) 0%,rgba(0,40,70,.96) 100%)}
      `}</style>

      {/* ── LIGHTBOX ── */}
      {lightbox&&(
        <div onClick={()=>setLightbox(null)} className="fixed inset-0 bg-black/92 z-[99999] flex items-center justify-center p-5">
          <button onClick={()=>setLightbox(null)} className="absolute top-5 right-6 bg-white/10 border-none rounded-full w-11 h-11 flex items-center justify-center cursor-pointer">
            <X size={22} className="text-white"/>
          </button>
          <img src={lightbox.src} alt={lightbox.title} className="max-w-[90vw] max-h-[84vh] rounded-2xl object-contain"/>
        </div>
      )}

      {/* ── TOP BAR ── */}
      <div className="bg-[#002f4e] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-1.5">
          <div className="flex gap-5 flex-wrap">
            <a href="mailto:admissions@cpuniverse.ac.in" className="text-slate-300 text-xs no-underline flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Mail size={12}/> admissions@cpuniverse.ac.in
            </a>
            <span className="hidden sm:flex text-slate-300 text-xs items-center gap-1.5">
             <Phone size={13}/> 1800-1800-345
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-slate-300 text-xs">Follow Us:</span>
            {[Facebook,Instagram,Youtube,Twitter].map((Icon,i)=>(
              <a key={i} href="#" className="text-gray-400 hover:text-amber-400 transition-colors"><Icon size={13}/></a>
            ))}
          </div>
        </div>
      </div>

      {/* ── TICKER ── */}
      <div className="bg-[#00588b] overflow-hidden py-1.5">
        <span className="ticker-run text-white text-[13px] font-medium">
          🎓 Admissions Open 2026–27 &nbsp;|&nbsp; 42 LPA Highest Package &nbsp;|&nbsp; NAAC A Rated &nbsp;|&nbsp; 25+ Years of Excellence &nbsp;|&nbsp; 70+ Programs &nbsp;|&nbsp; Apply Now: 1800-1800-345 &nbsp;|&nbsp; 20+ International Collaborations &nbsp;|&nbsp; 90% Placement Record 🎓
        </span>
      </div>

      {/* ════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════ */}
      <nav ref={navRef} className={`sticky top-0 z-[5000] bg-white/98 backdrop-blur-xl transition-shadow duration-300 ${scrolled?"shadow-lg":"shadow-[0_1px_0_#e8f0f7]"}`}>
      {/* <nav className="sticky top-0 z-[5000] transition-all duration-300 bg-white shadow-2xl"></nav> */}
        <div className="max-w-7xl mx-auto px-5 py-0 flex justify-between items-center gap-4">

          {/* LOGO */}
          <a href="#" className="flex items-center no-underline flex-shrink-0">
            <img
              src="https://cpur.in/wp-content/uploads/2026/01/logo__cpu_naac.png"
              alt="Career Point University"
              className="h-[30px] w-auto object-contain block"
              onError={e=>{
                e.target.style.display="none";
                const fb=e.target.nextSibling;
                if(fb)fb.style.display="flex";
              }}
            />
            {/* Fallback */}
            <div className="hidden items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-black text-xs">CPU</div>
              <div>
                <div className="text-[#1a3a5c] font-black text-sm leading-tight">Career Point University</div>
                <div className="text-amber-500 text-[10px]">Kota, Rajasthan</div>
              </div>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden xl:flex items-center flex-1 justify-center">
            {NAV_DATA.map((item,idx)=>{
              const hasDD=item.submenu&&!item.mega, hasMega=!!item.mega, isOpen=activeMenu===idx;
              return(
                <div key={idx} className="relative"
                  onMouseEnter={()=>(hasDD||hasMega)&&setActiveMenu(idx)}
                  onMouseLeave={()=>setActiveMenu(null)}>
                  <button
                    className={`text-[#1a3a5c] text-[13.5px] font-semibold px-3 py-5.5 inline-flex items-center gap-1 cursor-pointer border-none bg-transparent font-sans whitespace-nowrap rounded-lg transition-all duration-200 hover:text-[#00588b] hover:bg-blue-50
                      ${item.active?"border border-[#1a3a5c]":""}
                      ${isOpen?"text-[#00588b] bg-blue-50":""}`}>
                    {item.label}
                    {(hasDD||hasMega)&&<ChevronDown size={12} className={`transition-transform duration-200 ${isOpen?"rotate-180":""}`}/>}
                  </button>

                  {/* Dropdown */}
                  {hasDD&&isOpen&&(
                    <div className="dd-anim absolute top-[calc(100%+0px)] left-0 min-w-[236px] bg-white rounded-2xl border border-blue-100 shadow-2xl z-[9000] overflow-hidden"
                      onMouseEnter={()=>setActiveMenu(idx)} onMouseLeave={()=>setActiveMenu(null)}>
                      {item.submenu.map((s,si)=>(
                        <a key={si} href={s.href} className="flex items-center gap-2 px-4 py-3 text-gray-700 text-[13.5px] font-medium no-underline border-b border-gray-50 last:border-none hover:bg-blue-50 hover:text-[#00588b] hover:pl-5 transition-all duration-150">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00588b] flex-shrink-0 inline-block"/>
                          {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* <a href="tel:18001800345" className="hidden sm:flex text-[#00588b] font-bold text-xs no-underline items-center gap-1 hover:text-amber-500 transition-colors">
              <Phone size={13}/> 1800-1800-345
            </a> */}
            <button className="pulse-anim apply_now_btn bg-gradient-to-br from-amber-400 to-amber-600 text-white border-none rounded-full px-5 py-2 text-[13px] font-extrabold cursor-pointer flex items-center gap-1.5 hover:scale-105 transition-transform">
               Apply Now
            </button>
            <button className="xl:hidden bg-blue-50 border-none text-[#00588b] cursor-pointer p-2.5 rounded-lg flex items-center justify-center" onClick={()=>setMenuOpen(true)}>
              <Menu size={21}/>
            </button>
          </div>
        </div>

        {/* MEGA MENU */}
        {activeMenu!==null&&NAV_DATA[activeMenu]?.mega&&(
          <div className="dd-anim fixed left-0 right-0 bg-white shadow-2xl border-t-[3px] border-[#00588b] z-[8999]"
            onMouseEnter={()=>setActiveMenu(activeMenu)} onMouseLeave={()=>setActiveMenu(null)}>
            <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-0 px-7 pt-6">
              {/* Col 1: By Level */}
              <div className="pr-6 border-r border-gray-100">
                <div className="flex items-center gap-2 text-[#00588b] text-[11px] font-black uppercase tracking-widest mb-3.5 pb-2 border-b-2 border-blue-100">
                  <Layers size={14}/> By Level
                </div>
                {NAV_DATA[activeMenu].byLevel.map((row,i)=>(
                  <a key={i} href="#programs" className="flex items-center justify-between py-2 px-1.5 border-b border-gray-50 last:border-none no-underline rounded-lg hover:bg-blue-50 group transition-all hover:px-3">
                    <span className="flex items-center gap-2 text-[13.5px] text-gray-700 font-medium group-hover:text-[#00588b]">
                      <span className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center flex-shrink-0"><GraduationCap size={10} className="text-[#00588b]"/></span>
                      {row.label}
                    </span>
                    {row.badge==="Popular"&&<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00588b] text-white">Popular</span>}
                    {row.badge==="New"&&<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#003a5c] text-white">New</span>}
                  </a>
                ))}
              </div>
              {/* Col 2: Schools */}
              <div className="px-6 border-r border-gray-100">
                <div className="flex items-center gap-2 text-[#00588b] text-[11px] font-black uppercase tracking-widest mb-3.5 pb-2 border-b-2 border-blue-100">
                  <Building2 size={14}/> Schools
                </div>
                {NAV_DATA[activeMenu].schools.map((row,i)=>(
                  <a key={i} href="#programs" className="flex items-center gap-2 py-2 px-1.5 border-b border-gray-50 last:border-none no-underline rounded-lg hover:bg-blue-50 group transition-all hover:px-3">
                    <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${row.active?"bg-blue-100":"bg-blue-50"}`}><BookOpen size={10} className="text-[#00588b]"/></span>
                    <span className={`text-[13.5px] font-medium group-hover:text-[#00588b] ${row.active?"text-[#00588b] font-bold":"text-gray-700"}`}>{row.label}</span>
                  </a>
                ))}
              </div>
              {/* Col 3: Top Courses */}
              <div className="pl-6">
                <div className="flex items-center gap-2 text-[#00588b] text-[11px] font-black uppercase tracking-widest mb-3.5 pb-2 border-b-2 border-blue-100">
                  <Star size={14}/> Top Courses
                </div>
                {NAV_DATA[activeMenu].topCourses.map((row,i)=>(
                  <a key={i} href="#programs" className="flex items-center justify-between py-2 px-1.5 border-b border-gray-50 last:border-none no-underline rounded-lg hover:bg-blue-50 group transition-all hover:px-3">
                    <span className={`flex items-center gap-2 text-[13.5px] font-medium group-hover:text-[#00588b] ${row.more?"text-[#00588b] font-semibold":"text-gray-700"}`}>
                      {row.more
                        ?<><Plus size={12} className="text-[#00588b]"/>{row.label}</>
                        :<><span className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center flex-shrink-0"><Zap size={10} className="text-[#00588b]"/></span>{row.label}</>}
                    </span>
                    {row.badge==="Hot"&&<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">Hot</span>}
                    {row.badge==="New"&&<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#003a5c] text-white">New</span>}
                  </a>
                ))}
              </div>
            </div>
            {/* Mega Footer */}
            <div className="bg-blue-50 border-t border-blue-100 px-7 py-3.5 mt-5">
              <div className="max-w-[1200px] mx-auto flex items-center gap-3 flex-wrap">
                <button className="bg-gradient-to-br from-[#00588b] to-[#003a5c] text-white border-none rounded-full px-5 py-2 text-[13px] font-bold cursor-pointer flex items-center gap-1.5 hover:scale-105 transition-transform">
                  <Layers size={14}/> All Programs
                </button>
                <button className="bg-transparent text-[#1a3a5c] border-2 border-[#1a3a5c] rounded-full px-5 py-[7px] text-[13px] font-bold cursor-pointer flex items-center gap-1.5 hover:bg-[#1a3a5c] hover:text-white transition-all">
                  <Download size={13}/> Download Brochure
                </button>
                <button className="bg-gradient-to-br from-amber-400 to-amber-600 text-white border-none rounded-full px-5 py-2 text-[13px] font-extrabold cursor-pointer flex items-center gap-1.5 hover:scale-105 transition-transform">
                   Apply Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {menuOpen&&(
        <>
          <div className="fixed inset-0 bg-black/60 z-[10000] backdrop-blur-sm" onClick={()=>setMenuOpen(false)}/>
          <div className="mob-anim fixed top-0 left-0 bottom-0 w-80 max-w-[88vw] bg-[#001f35] z-[10100] flex flex-col overflow-hidden">
            <div className="bg-[#001428] px-4 py-3.5 flex items-center justify-between border-b border-white/8 flex-shrink-0">
              <img src="https://cpur.in/wp-content/uploads/2026/01/logo__cpu_naac.png" alt="CPU" className="h-7 object-contain brightness-0 invert" onError={e=>{e.target.style.display="none";}}/>
              <button onClick={()=>setMenuOpen(false)} className="bg-white/10 border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                <X size={16} className="text-white"/>
              </button>
            </div>
            <div className="px-3.5 py-2.5 bg-[#002540] flex-shrink-0">
              <div className="flex items-center gap-2 bg-white/7 rounded-lg px-3 py-2 border border-white/10">
                <Search size={13} className="text-blue-300"/>
                <input placeholder="Search programs, pages..." className="bg-transparent border-none text-white text-[13px] outline-none flex-1 font-sans placeholder-blue-300"/>
              </div>
            </div>
            <div className="px-3.5 py-2.5 bg-[#00588b] flex-shrink-0">
              <button className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-white border-none rounded-lg py-2.5 font-extrabold text-[13px] cursor-pointer flex items-center justify-center gap-1.5">
                <GraduationCap size={15}/> Apply Now — 2026–27
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {NAV_DATA.map((item,idx)=>{
                const hasDD=item.submenu&&!item.mega, hasMega=!!item.mega, isOpen=mobileOpen===idx;
                return(
                  <div key={idx} className="border-b border-white/6">
                    <button className={`w-full flex justify-between items-center px-4 py-3.5 text-[#e8f0f6] text-sm font-semibold bg-transparent border-none cursor-pointer text-left font-sans transition-colors ${isOpen?"bg-[#00588b]/35":""} hover:bg-[#00588b]/25`}
                      onClick={()=>{if(hasDD||hasMega){setMobileOpen(isOpen?null:idx);}else{setMenuOpen(false);}}}>
                      <span>{item.label}</span>
                      {(hasDD||hasMega)&&<ChevronDown size={14} className={`transition-transform duration-200 flex-shrink-0 ${isOpen?"rotate-180 text-amber-400":"text-blue-300"}`}/>}
                    </button>
                    {hasDD&&isOpen&&(
                      <div className="bg-black/25">
                        {item.submenu.map((s,si)=>(
                          <a key={si} href={s.href} className="flex items-center gap-2 pl-8 pr-4 py-2.5 text-[#b8cedd] text-[13px] no-underline border-b border-white/4 last:border-none hover:text-amber-400 hover:bg-[#00588b]/20 hover:pl-10 transition-all" onClick={()=>setMenuOpen(false)}>
                            <ChevronRight size={10} className="text-amber-400 flex-shrink-0"/> {s.label}
                          </a>
                        ))}
                      </div>
                    )}
                    {hasMega&&isOpen&&(
                      <div className="bg-black/25">
                        <p className="px-4 pt-2 pb-1 text-amber-400 text-[11px] font-extrabold uppercase tracking-widest">By Level</p>
                        {item.byLevel.map((r,i)=><a key={i} href="#programs" className="flex items-center gap-2 pl-8 pr-4 py-2 text-[#b8cedd] text-[13px] no-underline border-b border-white/4 hover:text-amber-400 transition-colors" onClick={()=>setMenuOpen(false)}><ChevronRight size={10} className="text-amber-400 flex-shrink-0"/> {r.label}</a>)}
                        <p className="px-4 pt-2 pb-1 text-amber-400 text-[11px] font-extrabold uppercase tracking-widest">Schools</p>
                        {item.schools.map((r,i)=><a key={i} href="#programs" className="flex items-center gap-2 pl-8 pr-4 py-2 text-[#b8cedd] text-[13px] no-underline border-b border-white/4 hover:text-amber-400 transition-colors" onClick={()=>setMenuOpen(false)}><ChevronRight size={10} className="text-amber-400 flex-shrink-0"/> {r.label}</a>)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="bg-[#001428] px-4 py-3.5 flex-shrink-0 border-t border-white/6">
              <a href="tel:18001800345" className="flex items-center gap-2 text-amber-400 font-bold text-[13px] no-underline mb-2"><Phone size={14}/> 1800-1800-345</a>
              <a href="mailto:admissions@cpuniverse.ac.in" className="flex items-center gap-2 text-blue-300 text-xs no-underline mb-3"><Mail size={13}/> admissions@cpuniverse.ac.in</a>
              <div className="flex gap-2.5">
                {[{Ic:Facebook,c:"#1877F2"},{Ic:Instagram,c:"#E4405F"},{Ic:Youtube,c:"#FF0000"},{Ic:Twitter,c:"#1DA1F2"},{Ic:Linkedin,c:"#0A66C2"}].map(({Ic,c},i)=>(
                  <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center no-underline border border-white/10 hover:opacity-80 transition-opacity"><Ic size={13} className="text-gray-400"/></a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ════ HERO ════ */}
      <HeroSwiper/>

      {/* ════ STATS ════ */}
      <section ref={statsRef} className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((s,i)=><StatCard key={i} value={s.value} suffix={s.suffix} label={s.label} icon={s.icon} inView={statsInView}/>)}
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-[#00588b] via-amber-400 to-[#00588b]"/>

      {/* ════ ABOUT ════ */}
      <section id="about" className="bg-blue-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#00588b] font-bold text-xs uppercase tracking-[.18em] mb-2">ONE OF THE</p>
            <h2 className="font-black text-4xl text-gray-900 m-0">Top <span className="text-[#00588b]">Private Universities</span> in Rajasthan</h2>
            <div className="w-16 h-1 bg-amber-400 rounded mx-auto mt-4"/>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden h-[420px] shadow-2xl">
                <img src="https://cpur.in/wp-content/uploads/2024/01/bg_12-1.jpg" alt="CPU Campus" className="w-full h-full object-cover"/>
              </div>
              <div className="absolute -bottom-4 -right-4 lg:-right-5 bg-[#00588b] text-white rounded-2xl px-5 py-4 shadow-xl min-w-[140px]">
                <div className="font-black text-3xl text-amber-400">25+</div>
                <div className="text-xs opacity-90 mt-0.5">Years of Excellence</div>
              </div>
              <div className="absolute top-6 -left-4 bg-white rounded-2xl px-5 py-3.5 shadow-xl border-2 border-blue-100">
                <div className="font-black text-xl text-[#00588b]">NAAC A</div>
                <div className="text-[11px] text-gray-400 mt-0.5">Accredited</div>
              </div>
            </div>
            <div>
              <p className="text-gray-800 leading-[1.9] mb-8 text-[15.5px]">Career Point University (CPU), Kota is a premier institution built on 25+ years of academic legacy. CPU offers world-class education with state-of-the-art infrastructure, distinguished faculty, and an industry-aligned curriculum across 70+ programs.</p>
              <div className="grid grid-cols-2 gap-3.5 mb-8">
                {[{icon:Award,t:"NAAC A Rated",s:"Premier Accreditation"},{icon:Globe,t:"20+ Countries",s:"Global Representation"},{icon:Users,t:"500+ Faculty",s:"Expert Professors"},{icon:TrendingUp,t:"90% Placement",s:"Industry Connect"}].map(({icon:Ic,t,s},i)=>(
                  <div key={i} className="flex items-start gap-3.5 bg-white rounded-2xl p-4 shadow-sm border border-blue-50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0"><Ic size={18} className="text-[#00588b]"/></div>
                    <div>
                      <div className="font-bold text-md text-gray-900">{t}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <button className="bg-gradient-to-br from-[#00588b] to-[#003a5c] text-white border-none rounded-full px-7 py-3 font-bold text-sm cursor-pointer flex items-center gap-1.5 hover:scale-105 transition-transform">
                  Explore More <ArrowRight size={14}/>
                </button>
                <button className="bg-transparent border-2 border-[#00588b] text-[#00588b] rounded-full px-6 py-[11px] font-bold text-sm cursor-pointer flex items-center gap-1.5 hover:bg-[#00588b] hover:text-white transition-all">
                  Download Brochure <Download size={14}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ PROGRAMS ════ */}
      <section id="programs" className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-black text-3xl text-gray-900 mb-8">Explore Our <span className="text-[#00588b]">70+ Programs</span> — Start Your Future-ready Career</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PROGRAM_CARDS.map((card) => (
                <div key={card.label} className="relative overflow-hidden rounded-xl cursor-pointer group">
                  <img
                    src={card.image}
                    alt={card.label}
                    className="block w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#00588b] text-white px-4 py-3.5 flex items-center justify-between">
                    <span className="font-bold text-md">{card.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm opacity-85">{card.count}</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-8">
            {COURSE_LIST.map(({title,dept,icon:Ic,count},i)=>(
              <div key={i} className={`bg-white border border-gray-100 rounded-2xl p-4.5 cursor-pointer hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 border-t-[3px] ${i%2===0?"border-t-[#00588b]":"border-t-[#003a5c]"}`}>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-2.5"><Ic size={18} className="text-[#00588b]"/></div>
                <div className="font-extrabold text-[15px] text-gray-900 mb-0.5">{title}</div>
                <div className="text-xs text-gray-400 mb-2.5">{dept}</div>
                <span className="bg-blue-50 text-[#00588b] text-[11px] font-bold px-2.5 py-0.5 rounded-full">{count}</span>
              </div>
            ))}
          </div> */}
          <div className="text-center mt-6">
            <button className="bg-gradient-to-br from-[#00588b] to-[#003a5c] text-white border-none rounded-full px-7 py-3 font-bold text-sm cursor-pointer inline-flex items-center gap-1.5 hover:scale-105 transition-transform">
              View All Programs <ArrowRight size={14}/>
            </button>
          </div>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-[#00588b] via-amber-400 to-[#00588b]"/>


      {/* ════ PLACEMENT ════ */}
      <section id="placement" className="bg-gradient-to-br from-[#00588b] to-[#003a5c] py-24 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(80px,14vw,200px)] font-black text-white/5 whitespace-nowrap pointer-events-none select-none">placements</div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <h2 className="font-bold text-3xl text-white/85 m-0 mb-1 leading-snug">Empower Your Future through Exceptional</h2>
            <div className="flex items-center gap-3.5 flex-wrap">
              <span className="bg-white/15 backdrop-blur border border-white/20 rounded-xl px-4 py-1 font-black text-4xl text-amber-400">Placement</span>
              <span className="font-bold text-4xl text-white">Opportunities at CPU</span>
              <ArrowRight size={28} className="text-amber-400"/>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Stats grid */}
         
              <div className="grid grid-cols-3 gap-0.5 rounded-2xl h-[100%]  overflow-hidden shadow-2xl">
                {PLACEMENT_STATS.map(({val,label},i)=>(
                  <div key={i} className={`px-4 py-8 flex justify-center items-center text-center ${i<3?"bg-[#003252]":"bg-[#002340]"} border-r border-white/6`}>
                     <div className="h-auto">
                      <div className="text-amber-400 font-black text-2xl xl:text-3xl leading-none">{val}</div>
                      <div className="text-white/75 text-xs mt-2">{label}</div>
                  </div>
                  </div>
                ))}
             
          
            </div>
            {/* Placement swiper */}
            <Swiper items={PLACEMENT_SLIDES} perView={2} gap={20} autoInterval={4000} dark={true}
              renderSlide={(slide)=>(
                <div className="rounded-2xl overflow-hidden relative h-[400px] shadow-2xl group">
                  <img src={slide.img} alt={slide.name} className="w-full h-full object-cover object-top block group-hover:scale-105 transition-transform duration-400"/>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/85"/>
                  <div className="absolute bottom-0 left-0 right-0 p-3.5">
                    <div className="font-extrabold text-[13px] text-white">{slide.name}</div>
                    <div className="text-[11px] text-white/70 mt-0.5 mb-2">{slide.course}</div>
                    <span className="bg-amber-400 text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded">{slide.company}</span>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* ════ COLLABORATIONS ════ */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-black text-3xl text-gray-900">Our Top <span className="text-[#00588b]"> Recruiters </span></h2>
            <div className="w-14 h-1 bg-amber-400 rounded mx-auto mt-3"/>
          </div>
      
           <div className="mb-10">  
         <Swiper items={RECRUITERS} perView={6} gap={14} autoInterval={4000} dark={true}
              renderSlide={(slide)=>(
                <div className="rounded-1xl overflow-hidden relative  shadow-2xl group">
                  <img src={slide.img} alt={slide.name} className=" h-[40px] object-cover object-top block group-hover:scale-105 transition-transform duration-400"/>
                </div>
              )}
            />
                </div>


    
        </div>
      </section>



      
      {/* ════ CAMPUS LIFE ════ */}
      <section id="campus" className="bg-blue-50">
        <div className="max-w-7xl mx-auto mb-9">
          <div className="text-center mb-2.5">
            <p className="text-[#00588b] font-bold text-xs uppercase tracking-[.18em]">Engage, Connect and Experience</p>
          </div>
          <h2 className="text-center font-black text-3xl text-gray-900 mt-1.5">the vibrant <span className="bg-blue-100 rounded-lg px-3.5 py-0.5">Life at CPU</span></h2>
          <div className="flex justify-center gap-12 flex-wrap mt-7">
            {[{v:"150+",l:"Acres Green Campus"},{v:"300+",l:"Labs"},{v:"250+",l:"Smart Classrooms"},{v:"30+",l:"Annual Events"},{v:"25+",l:"Student Clubs"}].map(({v,l},i)=>(
              <div key={i} className="text-center">
                <div className="font-black text-4xl text-[#00588b] leading-none">{v}</div>
                <div className="text-xs text-gray-500 mt-1.5 max-w-[90px] leading-snug">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex">
          {CAMPUS_COLS.map((col,i)=>(
            <div key={i} className="campus-col relative overflow-hidden cursor-pointer flex-1">
              <img src={col.img} alt={col.bold} className="w-full h-[500px] object-cover block"/>
              <div className="c-overlay absolute inset-0 bg-gradient-to-b from-black/10 to-[#002848]/85"/>
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="mb-3.5">
                  <p className="text-white/80 text-xs font-medium">{col.title}</p>
                  <p className="text-white font-black text-xl leading-tight mb-1.5">{col.bold} <ArrowRight size={16} className="inline align-middle"/></p>
                </div>
                <div className="c-links">
                  {col.links.map((link,li)=>(
                    <a key={li} href="#campus" className="flex items-center gap-1.5 text-white/88 text-[12.5px] no-underline py-0.5 hover:text-amber-400 transition-colors">
                      <ChevronRight size={10} className="flex-shrink-0"/> {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════ ALUMNI ════ */}
      <section id="alumni" className="bg-[#00588b] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-9">
            <p className="text-amber-400 font-bold text-xs uppercase tracking-[.18em] mb-2.5">Success Stories</p>
            <h2 className="font-black text-[clamp(26px,3.5vw,44px)] text-white m-0">Our <span className="text-amber-400">Alumni</span> Leading the World</h2>
            <div className="w-14 h-0.5 bg-amber-400 rounded mt-3.5"/>
          </div>
          <Swiper items={ALUMNI} perView={4} gap={18} autoInterval={4500} dark={true}
            renderSlide={(alum)=>(
              <div className="relative overflow-hidden rounded-2xl cursor-pointer h-[400px] bg-gray-900 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
                <div className={`absolute bottom-14 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full ${alum.circleBg} opacity-90`}/>
                <img src={alum.img} alt={alum.name} className="absolute inset-0 w-full h-full object-cover object-top z-10"/>
                <div className={`absolute top-0 right-0 bottom-0 w-11 ${alum.companyBg} flex items-center justify-center z-20`}>
                  <span className="[writing-mode:vertical-rl] rotate-180 text-white font-black text-sm tracking-wide">{alum.company}</span>
                </div>
                <div className={`absolute top-3 left-12 ${alum.companyBg} text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full z-30`}>{alum.company}</div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-4 px-3.5 z-40">
                  <div className="text-white font-extrabold text-base">{alum.name}</div>
                  <div className="text-white/70 text-xs mt-0.5">{alum.role}</div>
                </div>
              </div>
            )}
          />
        </div>
      </section>
         <section id="Personalities_section" className="bg-blue-50 py-16 px-4">  
           <div className="max-w-7xl mx-auto"> 
          <div className="text-center mb-8">
            <h2 className="font-black text-3xl text-gray-900">Eminent 
 <span className="text-[#00588b]"> Personalities @ CPU</span></h2>
            <div className="w-14 h-1 bg-amber-400 rounded mx-auto mt-3"/>
          </div>
 <div className="mb-">  
         <Swiper items={Personalities} perView={4} gap={14} autoInterval={4000} dark={true}
              renderSlide={(slide)=>(
                <div className="rounded-1xl overflow-hidden relative  shadow-2xl group">
                  <img src={slide.img} alt={slide.name} className=" w-[100%]  block group-hover:scale-105 transition-transform duration-400"/>
                </div>
              )}
            />
        </div>
        </div>
      </section>
      {/* ════ RESEARCH ════ */}
      <section id="research" className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-black text-3xl text-gray-900">Pioneering <span className="text-[#00588b]">Research</span> at CPU</h2>
            <div className="w-14 h-1 bg-amber-400 rounded mx-auto mt-3"/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESEARCH_ITEMS.map((item,i)=>(
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300" onClick={()=>setLightbox({src:item.img,title:item.title})}>
                <div className="h-52 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover block hover:scale-105 transition-transform duration-400"/>
                </div>
                <div className="p-5">
                  <span className="bg-blue-50 text-[#00588b] text-[11px] font-bold px-2.5 py-0.5 rounded-full">{item.tag}</span>
                  <h3 className="font-extrabold text-gray-900 text-base my-2.5">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-[1.65] m-0">{item.desc}</p>
                  <a href="#" className="text-[#00588b] font-bold text-[13px] flex items-center gap-1 mt-3 no-underline hover:gap-2 transition-all">Learn More <ArrowRight size={13}/></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ HAPPENINGS ════ */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-black text-3xl text-gray-900">Happenings <span className="text-[#00588b]">@CPU</span></h2>
            <div className="w-14 h-1 bg-amber-400 rounded mx-auto mt-3"/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {HAPPENINGS.map(({title,date,tag,icon:Ic,colorClass},i)=>(
              <div key={i} className="rounded-2xl overflow-hidden border border-blue-100 cursor-pointer bg-white hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300">
                <div className={`h-36 bg-gradient-to-br ${colorClass} flex items-center justify-center relative`}>
                  <Ic size={52} className="text-white/20"/>
                  <div className="absolute top-2.5 right-2.5 bg-amber-400 text-black text-[11px] font-bold px-2.5 py-0.5 rounded-full">{tag}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{title}</h3>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs"><Calendar size={12}/> {date}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="bg-gradient-to-br from-[#00588b] to-[#003a5c] text-white border-none rounded-full px-7 py-3 font-bold text-sm cursor-pointer inline-flex items-center gap-1.5 hover:scale-105 transition-transform">
              View All Events <ArrowRight size={14}/>
            </button>
          </div>
        </div>
      </section>

      {/* ════ SOCIAL WALL — 4 columns ════ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-7">
            <h2 className="font-black text-3xl text-gray-900">CPU <span className="text-[#00588b]">Social Wall</span></h2>
            <div className="w-14 h-1 bg-amber-400 rounded mx-auto mt-3"/>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {SOCIAL_IMGS.map((src,i)=>(
              <div key={i} className="rounded-2xl overflow-hidden aspect-square cursor-pointer hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group relative"
                onClick={()=>setLightbox({src,title:"CPU Campus Life"})}>
                <img src={src} alt={`Social ${i+1}`} loading="lazy" className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-400"/>
                <div className="absolute inset-0 bg-[#00588b]/0 group-hover:bg-[#00588b]/25 transition-all duration-300 flex items-center justify-center">
                  <Instagram size={28} className="text-white/0 group-hover:text-white/80 transition-all duration-300"/>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-5 mt-5 flex-wrap">
            {[{Ic:Facebook,label:"Facebook",c:"text-[#1877F2]"},{Ic:Instagram,label:"Instagram",c:"text-[#E4405F]"},{Ic:Youtube,label:"YouTube",c:"text-red-600"},{Ic:Twitter,label:"Twitter",c:"text-sky-500"}].map(({Ic,label,c},i)=>(
              <a key={i} href="#" className={`flex items-center gap-1.5 ${c} font-bold text-sm no-underline hover:opacity-80 transition-opacity`}><Ic size={16}/> {label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-black text-3xl text-gray-900">Frequently Asked <span className="text-[#00588b]">Questions</span></h2>
            <div className="w-14 h-1 bg-amber-400 rounded mx-auto mt-3"/>
          </div>
          <div className="flex flex-col gap-2.5">
            {FAQS.map((faq,i)=>(
              <div key={i} className="rounded-2xl border border-blue-100 overflow-hidden bg-white shadow-sm">
                <button className="w-full flex justify-between items-center px-[22px] py-[18px] bg-transparent border-none cursor-pointer text-left font-sans" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                  <span className="font-bold text-gray-900 text-sm pr-3.5 leading-relaxed">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${openFaq===i?"bg-[#00588b]":"bg-gray-100"}`}>
                    {openFaq===i?<Minus size={13} className="text-white"/>:<Plus size={13} className="text-gray-600"/>}
                  </div>
                </button>
                {openFaq===i&&(
                  <div className="px-[22px] pb-[18px]">
                    <p className="text-gray-500 text-sm leading-[1.75] m-0">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="bg-gradient-to-br from-[#00588b] to-[#003a5c] py-20 px-4">
        <div className="max-w-[860px] mx-auto text-center">
          {/* <GraduationCap size={56} className="text-white/22 mx-auto mb-4"/> */}
          <h2 className="text-white font-black text-3xl mb-3">Begin Your Journey at Career Point University</h2>
          <p className="text-white/80 text-base max-w-xl mx-auto mb-8 leading-[1.75]">Join 25,000+ students and experience world-class education, unmatched campus life, and extraordinary career opportunities in Kota.</p>
          <div className="flex justify-center gap-3.5 flex-wrap">
            <button className="bg-gradient-to-br from-amber-400 to-amber-600 text-white border-none rounded-full px-8 py-3.5 font-extrabold text-[15px] cursor-pointer flex items-center gap-1.5 hover:scale-105 transition-transform">
              <GraduationCap size={16}/> Apply for Admission
            </button>
            <a href="tel:18001800345" className="bg-transparent text-white border-2 border-white/60 rounded-full px-7 py-3.5 font-bold text-[15px] flex items-center gap-2 no-underline hover:bg-white/15 hover:border-white transition-all">
              <Phone size={15}/> 1800-1800-345
            </a>
            <button className="bg-transparent text-white border-2 border-white/60 rounded-full px-7 py-3.5 font-bold text-[15px] cursor-pointer flex items-center gap-2 hover:bg-white/15 hover:border-white transition-all">
              <Download size={15}/> Download Brochure
            </button>
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer id="contact" className="bg-[#002f4e] pt-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 pb-10">
            <div>
              <div className="mb-3.5">
                <img src="https://cpur.in/wp-content/uploads/2026/01/logo__cpu_naac.png" alt="CPU" className="h-9 object-contain brightness-0 invert" onError={e=>{e.target.style.display="none";}}/>
              </div>
              <p className="text-gray-400 text-[13px] leading-[1.75] mb-3.5">A premier university with 25+ years of academic excellence, committed to innovation, research, and holistic development.</p>
              <div className="flex flex-col gap-1.5">
                <a href="tel:18001800345" className="text-amber-400 font-bold text-[13px] no-underline flex items-center gap-1.5 hover:text-amber-300 transition-colors"><Phone size={13}/> 1800-1800-345</a>
                <a href="mailto:admissions@cpuniverse.ac.in" className="text-gray-400 text-xs no-underline flex items-center gap-1.5 hover:text-gray-300 transition-colors"><Mail size={12}/> admissions@cpuniverse.ac.in</a>
                <span className="text-gray-400 text-xs flex items-center gap-1.5"><MapPin size={12}/> Kota, Rajasthan, India</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {["About CPU","Academics","Admissions","Placements","Alumni","Research","Contact Us"].map((l,i)=>(
                  <a key={i} href="#" className="text-gray-400 text-[13px] no-underline flex items-center gap-1.5 hover:text-amber-400 transition-colors"><ChevronRight size={11} className="text-[#00588b]"/>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Programs</h4>
              <div className="flex flex-col gap-2">
                {["Engineering","Management","Medical Sciences","Law","Architecture","Pharmacy","Education"].map((l,i)=>(
                  <a key={i} href="#" className="text-gray-400 text-[13px] no-underline flex items-center gap-1.5 hover:text-amber-400 transition-colors"><ChevronRight size={11} className="text-[#00588b]"/>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Get In Touch</h4>
              <div className="flex flex-col gap-2 mb-4">
                {["Kota, Rajasthan, India","Toll Free: 1800-1800-345","Mon–Sat: 9am–6pm"].map((l,i)=>(
                  <span key={i} className="text-gray-400 text-[13px]">{l}</span>
                ))}
              </div>
              <div className="flex gap-2.5">
                {[{Ic:Facebook,c:"#1877F2"},{Ic:Instagram,c:"#E4405F"},{Ic:Youtube,c:"#FF0000"},{Ic:Linkedin,c:"#0A66C2"}].map(({Ic,c},i)=>(
                  <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center no-underline border border-white/10 hover:opacity-80 transition-opacity"><Ic size={14} className="text-white"/></a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/8 py-4 flex justify-between items-center flex-wrap gap-2.5">
            <div className="text-gray-500 text-xs">© 2026 Career Point University, Kota. All Rights Reserved.</div>
            <div className="flex gap-4 flex-wrap">
              {["Privacy Policy","Terms of Use","Sitemap","Disclaimer"].map(l=>(
                <a key={l} href="#" className="text-gray-500 text-xs no-underline hover:text-amber-400 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ════ FLOATING BUTTONS ════ */}
      <div className="fixed bottom-6 right-6 z-[6000] flex flex-col gap-3">
        <button className="pulse-anim w-12 h-12 rounded-full bg-gradient-to-br from-[#00588b] to-[#003a5c] border-none cursor-pointer flex items-center justify-center shadow-xl">
          <MessageCircle size={21} className="text-white"/>
        </button>
        <a href="tel:18001800345" className="w-12 h-12 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-xl no-underline hover:scale-110 transition-transform">
          <Phone size={21} className="text-white"/>
        </a>
      </div>
    </div>
  );
}