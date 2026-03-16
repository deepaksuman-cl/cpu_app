"use client";
import { useState, useEffect } from "react";
import {
  GraduationCap, BookOpen, Users, Award, ChevronDown, ChevronRight,
  CheckCircle, Star, FlaskConical, Building2, Globe,
  Phone, Mail, MapPin, ArrowRight, Play, Briefcase,
  Code2, Database, Network, Brain, Target, TrendingUp,
  FileText, CreditCard, Info, ChevronLeft,
  UserCheck, ClipboardList, IndianRupee, BadgeCheck,
} from "lucide-react";

// ── IMAGES ────────────────────────────────────────────────────────────────────
const BG1 = "https://cpur.in/wp-content/uploads/2023/07/banner-005.webp";
const BG2 = "https://cpur.in/wp-content/uploads/2024/01/bg_12-1.jpg";

// ── DATA ──────────────────────────────────────────────────────────────────────
const stats = [
  { icon: Users,    value: "3800+", label: "Placements So Far" },
  { icon: BookOpen, value: "60 L",  label: "Highest Package"   },
  { icon: Award,    value: "18",    label: "Startups"          },
  { icon: FileText, value: "130",   label: "Papers Published"  },
  { icon: Globe,    value: "1250+", label: "Google Fellowships"},
  { icon: Star,     value: "905",   label: "Alumni Achieved"   },
];

const courseStructure = [
  { category:"Department Core",     shortName:"BC",             description:"Academic Qualifying Data Science (BCS)",            credits:4   },
  { category:"Department Core",     shortName:"BC",             description:"Project / Dissertation / Field Study / Internship", credits:6   },
  { category:"Department Core",     shortName:"BC",             description:"Research & Skill Courses",                          credits:6   },
  { category:"Department Core",     shortName:"BC",             description:"Discipline Specific Electives (DSE/DC)",            credits:12  },
  { category:"Programme Elective",  shortName:"PE",             description:"Open Course Electives (Generic/OE CM)",             credits:4   },
  { category:"Generic Elective",    shortName:"GE",             description:"Generic Electives (Minor Courses)",                 credits:3   },
  { category:"Ability Enhancement", shortName:"AEC",            description:"English / MIL Courses",                             credits:null},
  { category:"Value Added Courses", shortName:"VAC (Non-Mand.)",description:"Non Mandatory",                                     credits:null},
  { category:"University Core",     shortName:"—",              description:"As per university norms",                           credits:null},
];

const valueAddedCourses = [
  { name:"Additional Languages",                 credits:2 },
  { name:"Professional and Business Ethics",      credits:2 },
  { name:"National and Professional Issues (NPI)",credits:2 },
];

const semesters = [
  "Semester 1","Semester 2","Semester 3","Semester 4",
  "Semester 5","Semester 6","University Core","Departmental Elective",
];

const deptSlides = [
  {
    title:"Department at a Glance", icon:Building2,
    items:["3 Guest Experts/year","IEEE Collaboration","Modern Lab Facilities","Specializations & Electives","Industry Collaborations","Student Programs","Placement Assistance","Exclusive Lab Activities"],
    cta:"VIEW MORE",
  },
  {
    title:"Exclusive Labs", icon:FlaskConical,
    items:["Microsoft Innovation Centre","Microsoft MTAC","Oracle Innovation Lab","Oracle Industry Lab","Artificial Intelligence Lab"],
    cta:"VIEW MORE",
  },
  {
    title:"Your Department in a Nutshell", icon:Star,
    items:["Achievements","Pharmacy","Research","Latest Updates","Activities","Links"],
    cta:"START NOW",
  },
];

const feeDetails = [
  { label:"Admission Fee (one-time)", amount:"8,900/- (at time of admission)" },
  { label:"Tuition Fee",              amount:"21,000/- per Semester"          },
  { label:"Examination Fee",          amount:"2,500/- per Semester"           },
  { label:"Development Fee",          amount:"2,500/- per Semester"           },
  { label:"Caution Money (one-time)", amount:"3,000/- (Refundable)"           },
];

const dateHeaders  = ["Till 31st June","Till 13th July","Till 31st July","After 31st July"];
const scholarshipRows = [
  { range:"Above 90%", values:["100% with term","Till 16th paid","Till 3rd paid","No Offer"] },
  { range:"75% – 89%", values:["90%","50%","35%","No Use"] },
  { range:"71% – 74%", values:["85%","50%","35%","No Use"] },
];
const earlyBird = { label:"Early Admission Benefit (One-Time) INR", values:["3000","2000","1500","No Use"] };

const scholarshipNotes = [
  "Merit scholarship is offered to students based on previous class.",
  "Tuition and fees may be net once your scholarship criteria is evaluated (A+ or equivalent year).",
  "A 50% scholarship is given to students in the merit scholarship.",
  "If a valid scholarship / subject scholarship fees are 50% off and student fails to continue, they may be eligible for cancellation scholarship.",
  "To avail merit scholarship, student has to submit supporting documents in original along with 1 set of photocopies.",
];

const whyJoinReasons = [
  { icon:TrendingUp, title:"Gateway to the IT Industry",        desc:"BCA serves as a gateway to the vast IT industry. The program equips students with foundational knowledge and practical skills in software development, web design, database administration, networking, and other IT areas." },
  { icon:Briefcase,  title:"Diverse Career Opportunities",      desc:"BCA graduates have opportunities across IT companies, software firms, government agencies, finance, healthcare, and educational institutions. The versatile degree allows exploring diverse career paths." },
  { icon:BookOpen,   title:"In-demand Skills",                  desc:"The curriculum covers programming languages, database management, software engineering, and computer applications — highly demanded across multiple industries." },
  { icon:Target,     title:"Practical Training & Hands-On Exp.",desc:"BCA programs emphasize practical training through projects, internships, and industry collaborations. Students apply theoretical knowledge to real-world problems." },
  { icon:Brain,      title:"Opportunities for Specialization",  desc:"Many BCA programs offer specialization in data science, machine learning, cybersecurity, AI, and mobile application development." },
];

const uniqueFeatures = [
  { num:"06", icon:Users,    title:"Support Services",         desc:"BCA departments provide entrepreneurship and career support services, merit reviews, internship opportunities, and mentoring for student entrepreneurs." },
  { num:"07", icon:Globe,    title:"Interdisciplinary Approach",desc:"BCA departments collaborate with academic and industry partners to promote interdisciplinary research, joint projects, and knowledge exchange." },
  { num:"08", icon:Brain,    title:"Research & Development",   desc:"The department focuses on holistic development offering professional skills, skill training, career readiness programs, and competitive preparation." },
  { num:"09", icon:Building2,title:"Community Engagement",     desc:"BCA departments engage with the local community, industry stakeholders through community programs and promote social responsibility among students." },
];

const applySteps = [
  { icon:UserCheck,    step:"01", label:"Register Yourself",       desc:"Create your account on the portal with your basic personal details and email address." },
  { icon:FileText,     step:"02", label:"Verify Details",          desc:"Confirm your identity, educational background, and upload the necessary documents." },
  { icon:ClipboardList,step:"03", label:"Fill Application Online", desc:"Complete the online application form with all required academic and personal information." },
  { icon:IndianRupee,  step:"04", label:"Pay Application Fee",     desc:"Securely pay the application processing fee online via net banking, UPI, or card." },
  { icon:BadgeCheck,   step:"05", label:"Submit Application",      desc:"Review your complete application and submit it for processing and review." },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
function SectionTitle({ children, subtitle, light = false, center = true }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <h2 className={`text-3xl md:text-4xl font-extrabold mb-2 ${light ? "text-white" : "text-[#00588b]"}`}>
        {children}
      </h2>
      {subtitle && (
        <p className={`text-sm max-w-2xl ${center ? "mx-auto" : ""} ${light ? "text-blue-200" : "text-gray-500"}`}>
          {subtitle}
        </p>
      )}
      <div className={`flex gap-1 mt-3 ${center ? "justify-center" : ""}`}>
        <div className="h-1 w-14 rounded-full bg-[#ffb900]" />
        <div className="h-1 w-5 rounded-full bg-[#00588b]" />
        <div className="h-1 w-2 rounded-full bg-[#ffb900]" />
      </div>
    </div>
  );
}

function AccordionItem({ title }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl mb-2 overflow-hidden shadow-sm">
      <button
        className="w-full flex items-center justify-between px-5 py-3 bg-white hover:bg-blue-50 transition-all text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-[#00588b] flex items-center gap-2 text-sm">
          <span className="w-6 h-6 rounded-full bg-[#ffb900]/20 flex items-center justify-center flex-shrink-0">
            <ChevronRight size={13} className={`transition-transform text-[#ffb900] ${open ? "rotate-90" : ""}`} />
          </span>
          {title}
        </span>
        <ChevronDown size={15} className={`transition-transform text-gray-400 flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 py-4 text-gray-600 text-sm bg-blue-50/50 border-t border-gray-100">
          Curriculum details for <strong className="text-[#00588b]">{title}</strong> — contact the department for the full syllabus and timetable.
        </div>
      )}
    </div>
  );
}

// ── DEPARTMENT SLIDER ─────────────────────────────────────────────────────────
function DeptSlider() {
  const [active, setActive] = useState(0);
  const len = deptSlides.length;
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6">
        {deptSlides.map((slide, idx) => {
          const isActive = idx === active;
          return (
            <div
              key={slide.title}
              onClick={() => setActive(idx)}
              className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                isActive ? "ring-4 ring-[#ffb900] shadow-2xl scale-[1.03]" : "opacity-70 hover:opacity-90 shadow-md"
              }`}
              style={{ background:"linear-gradient(145deg,#00588b,#003d61)" }}
            >
              <div className="relative p-6 pb-4"
                style={{ backgroundImage:`url(${BG2})`, backgroundSize:"cover", backgroundPosition:"center" }}
              >
                <div className="absolute inset-0 bg-[#00588b]/80" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="bg-[#ffb900] rounded-xl p-2 shadow-lg flex-shrink-0">
                    <slide.icon size={22} className="text-[#00588b]" />
                  </div>
                  <h3 className="font-extrabold text-white text-sm leading-tight">{slide.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <ul className="space-y-2 mb-5">
                  {slide.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-blue-100">
                      <CheckCircle size={13} className="text-[#ffb900] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-[#ffb900] text-[#00588b] font-extrabold text-xs py-2.5 rounded-full hover:bg-yellow-300 transition">
                  {slide.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Nav */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={() => setActive((active - 1 + len) % len)}
          className="w-10 h-10 rounded-full border-2 border-[#00588b] flex items-center justify-center hover:bg-[#00588b] hover:text-white transition text-[#00588b]">
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {deptSlides.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${i === active ? "w-7 h-3 bg-[#00588b]" : "w-3 h-3 bg-gray-300 hover:bg-gray-400"}`} />
          ))}
        </div>
        <button onClick={() => setActive((active + 1) % len)}
          className="w-10 h-10 rounded-full border-2 border-[#00588b] flex items-center justify-center hover:bg-[#00588b] hover:text-white transition text-[#00588b]">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ── HOW TO APPLY SLIDER ───────────────────────────────────────────────────────
function ApplySlider() {
  const [active, setActive] = useState(0);
  const len = applySteps.length;
  const prev = () => setActive(i => (i - 1 + len) % len);
  const next = () => setActive(i => (i + 1) % len);

  // Auto-play
  useEffect(() => {
    const t = setTimeout(next, 3500);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div>
      {/* ── Desktop Progress Steps ── */}
      <div className="hidden md:flex items-start relative mb-10">
        {/* Background line */}
        <div className="absolute top-8 left-8 right-8 h-px bg-white/15 z-0" />
        {applySteps.map((step, idx) => {
          const isActive = idx === active;
          const isDone   = idx < active;
          return (
            <div key={step.step}
              onClick={() => setActive(idx)}
              className={`flex-1 flex flex-col items-center relative z-10 cursor-pointer transition-all duration-400`}
            >
              {/* Circle */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500 shadow-lg border-2 ${
                isActive ? "bg-[#ffb900] border-white scale-115 ring-4 ring-[#ffb900]/30"
                : isDone  ? "bg-white/25 border-white/50"
                           : "bg-white/10 border-white/20"
              }`}>
                {isDone
                  ? <CheckCircle size={26} className="text-white" />
                  : <step.icon size={26} className={isActive ? "text-[#00588b]" : "text-white/70"} />
                }
              </div>
              {/* Step # */}
              <span className={`text-xs font-black tracking-widest mb-1 transition-colors ${isActive ? "text-[#ffb900]" : "text-white/40"}`}>
                STEP {step.step}
              </span>
              {/* Label */}
              <span className={`text-xs font-bold text-center leading-tight px-1 transition-colors ${isActive ? "text-white" : "text-white/60"}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Active Card (Desktop) ── */}
      <div className="hidden md:block">
        {applySteps.map((step, idx) => idx === active ? (
          <div key={step.step}
            className="max-w-xl mx-auto bg-white/10 backdrop-blur border border-white/25 rounded-2xl p-8 text-center shadow-2xl"
            style={{ animation:"fadeSlideUp 0.4s ease" }}
          >
            <div className="w-20 h-20 bg-[#ffb900] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <step.icon size={32} className="text-[#00588b]" />
            </div>
            <div className="text-[#ffb900] font-black text-xs tracking-widest mb-2">STEP {step.step} OF {len}</div>
            <h3 className="text-white font-extrabold text-xl mb-3">{step.label}</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">{step.desc}</p>
            {/* Mini progress bar */}
            <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#ffb900] h-full rounded-full transition-all duration-500"
                style={{ width:`${((active + 1) / len) * 100}%` }} />
            </div>
            <p className="text-white/40 text-xs mt-2">{active + 1} of {len} steps</p>
          </div>
        ) : null)}
      </div>

      {/* ── Mobile Slider ── */}
      <div className="md:hidden">
        {applySteps.map((step, idx) => idx === active ? (
          <div key={step.step}
            className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-[#ffb900] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <step.icon size={32} className="text-[#00588b]" />
            </div>
            <div className="text-[#ffb900] font-black text-xs tracking-widest mb-2">STEP {step.step}</div>
            <h3 className="text-white font-extrabold text-lg mb-3">{step.label}</h3>
            <p className="text-blue-100 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ) : null)}
      </div>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-center gap-5 mt-8">
        <button onClick={prev}
          className="w-11 h-11 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-[#ffb900] hover:text-[#00588b] hover:border-[#ffb900] transition">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {applySteps.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${i === active ? "w-8 h-3 bg-[#ffb900]" : "w-3 h-3 bg-white/25 hover:bg-white/50"}`} />
          ))}
        </div>
        <button onClick={next}
          className="w-11 h-11 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-[#ffb900] hover:text-[#00588b] hover:border-[#ffb900] transition">
          <ChevronRight size={20} />
        </button>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0);    }
        }
      `}</style>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function BCACoursePage() {
  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden">

      {/* ══════════════ HERO ══════════════ */}
      <section
        className="relative min-h-[95vh] flex items-center"
        style={{ backgroundImage:`url(${BG1})`, backgroundSize:"cover", backgroundPosition:"center top" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00588b]/96 via-[#00588b]/88 to-[#004570]/75" />
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage:"radial-gradient(#fff 1px,transparent 1px)", backgroundSize:"28px 28px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            {/* Left */}
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 bg-[#ffb900] text-[#00588b] text-xs font-extrabold uppercase px-4 py-1.5 rounded-full mb-6 tracking-widest shadow-lg">
                <GraduationCap size={14} /> 3-Year Undergraduate Programme
              </span>
              <h1 className="text-5xl md:text-[5.5rem] font-black leading-[1.0] mb-6 text-white">
                Bachelor of<br />
                <span className="text-[#ffb900]">Computer</span><br />
                Application
              </h1>
              <p className="text-blue-100 text-lg mb-9 max-w-lg leading-relaxed">
                Comprehensive foundation in computer science with hands-on training in programming, AI, data science, cybersecurity &amp; emerging technologies.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#apply" className="bg-[#ffb900] text-[#00588b] font-extrabold px-9 py-4 rounded-full hover:bg-yellow-300 transition flex items-center gap-2 shadow-xl text-base">
                  Apply Now <ArrowRight size={18} />
                </a>
                <a href="#overview" className="border-2 border-white/60 text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-[#00588b] transition flex items-center gap-2 text-base">
                  <Play size={18} /> Explore Programme
                </a>
              </div>
              {/* Quick stats */}
              <div className="flex flex-wrap gap-8 mt-12 pt-6 border-t border-white/20">
                {[{ v:"3800+", l:"Placements" }, { v:"60L+", l:"Highest Pkg" }, { v:"10,000+", l:"Students Trust" }].map((s, i) => (
                  <div key={i}>
                    <div className="text-[#ffb900] font-black text-2xl">{s.v}</div>
                    <div className="text-blue-200 text-xs mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats card */}
            <div className="flex-1 max-w-sm w-full">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/20 shadow-2xl">
                <h3 className="text-[#ffb900] font-extrabold text-sm mb-5 text-center flex items-center justify-center gap-2">
                  <Award size={16} /> University's Accomplishments & Impact
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {stats.map((s, i) => (
                    <div key={i} className="bg-white/10 rounded-2xl p-3 text-center hover:bg-white/20 transition cursor-default">
                      <s.icon size={18} className="mx-auto mb-1.5 text-[#ffb900]" />
                      <div className="text-white font-black text-sm leading-tight">{s.value}</div>
                      <div className="text-blue-200 text-[10px] mt-0.5 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 bg-[#ffb900] text-[#00588b] text-center rounded-2xl py-2.5 text-xs font-extrabold">
                  ✓ Trusted by 10,000+ Students
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ══════════════ OVERVIEW ══════════════ */}
      <section id="overview" className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <SectionTitle center={false} subtitle="What is the BCA Programme?">Overview</SectionTitle>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
              BCA Programme is a three-year, six-semester program that offers holistic knowledge of fundamentals in computational applications technology enabling efficient solutions for industries and business problems — fostering creativity and resolution-thinking by addressing AI-enhanced tools with IoT industry for providing real-time solutions efficiently.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              Overall, BCA programme enables students with a comprehensive understanding of computer science principles, practical skills in computer programming, and opportunities for career growth in the dynamic and evolving field of information technology.
            </p>
            <div className="flex flex-wrap gap-3">
              {["3 Years Duration","6 Semesters","Industry Aligned","Placement Support"].map((tag, i) => (
                <span key={i} className="bg-[#00588b]/10 text-[#00588b] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#00588b]/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon:Code2,    label:"Programming",  sub:"C, C++, Java, Python" },
              { icon:Database, label:"Database",     sub:"MySQL, Oracle, NoSQL" },
              { icon:Network,  label:"Networking",   sub:"CN, Cybersecurity"    },
              { icon:Brain,    label:"AI & Data",    sub:"ML, Data Analytics"   },
            ].map((item, i) => (
              <div key={i} className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-[#00588b]/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#00588b] transition-colors">
                  <item.icon size={22} className="text-[#00588b] group-hover:text-white transition-colors" />
                </div>
                <div className="font-bold text-[#00588b] text-sm">{item.label}</div>
                <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SCOPE — BG2 ══════════════ */}
      <section
        className="relative py-20"
        style={{ backgroundImage:`url(${BG2})`, backgroundSize:"cover", backgroundPosition:"center" }}
      >
        <div className="absolute inset-0 bg-[#00588b]/92" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <SectionTitle light subtitle="Expanding opportunities in the world of technology">
            Scope of Bachelor of Computer Application (BCA)
          </SectionTitle>
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 text-center">
            <p className="text-blue-100 text-sm leading-relaxed">
              The BCA program is a comprehensive three-year undertaking that produces students with a solid foundation in computer science and its applications. The curriculum encompasses a wide range of subjects, spanning programming languages such as C, C++, Java, data structures, database management systems, software engineering, web development, and computer networks. Additionally, students learn to leverage data, machine learning, AI research, writing skills, and skill development. Graduates can pursue roles as software developers, database administrators, system analysts, IT consultants, and cybersecurity professionals.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════ COURSE STRUCTURE ══════════════ */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <SectionTitle subtitle="A well-structured curriculum designed for excellence">
          Course Structure BCA
        </SectionTitle>

        <div className="bg-gradient-to-r from-[#00588b]/8 to-blue-50 border-l-4 border-[#00588b] rounded-r-2xl p-6 mb-10 text-sm text-gray-700 leading-relaxed">
          <strong className="text-[#00588b]">Course Structure:</strong> The BCA programme is a comprehensive curriculum providing students with a solid foundation in computer science, spanning programming languages (C, C++, Java), data structures, database management, software engineering, web development, and computer networks.
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100 mb-10">
          <table className="w-full text-sm min-w-[580px]">
            <thead>
              <tr className="bg-[#00588b] text-white">
                <th className="px-5 py-3.5 text-left font-bold">Category</th>
                <th className="px-5 py-3.5 text-left font-bold">Short Name</th>
                <th className="px-5 py-3.5 text-left font-bold">Description</th>
                <th className="px-5 py-3.5 text-center font-bold w-24">Credits</th>
              </tr>
            </thead>
            <tbody>
              {courseStructure.map((row, i) => (
                <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-blue-50/40"} hover:bg-[#ffb900]/5 transition-colors`}>
                  <td className="px-5 py-3 font-semibold text-[#00588b] text-xs">{row.category}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{row.shortName}</td>
                  <td className="px-5 py-3 text-gray-700">{row.description}</td>
                  <td className="px-5 py-3 text-center font-extrabold text-[#ffb900] text-base">{row.credits ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Value Added */}
        <div className="bg-gradient-to-r from-[#ffb900]/15 to-yellow-50 border border-[#ffb900]/50 rounded-2xl p-6 mb-10">
          <h3 className="text-[#00588b] font-extrabold text-base mb-5 flex items-center gap-2">
            <Star size={18} className="text-[#ffb900]" /> Value Added Courses for all UG (VAC) — Non Mandatory
          </h3>
          <div className="overflow-x-auto rounded-xl overflow-hidden shadow">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#00588b] text-white">
                  <th className="px-4 py-2.5 text-left">Course Name</th>
                  <th className="px-4 py-2.5 text-center w-24">Credits</th>
                </tr>
              </thead>
              <tbody>
                {valueAddedCourses.map((c, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-yellow-50"}>
                    <td className="px-4 py-2.5 text-gray-700">{c.name}</td>
                    <td className="px-4 py-2.5 text-center font-extrabold text-[#00588b]">{c.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-8 italic">
          Graduates of BCA are well prepared for diverse career specialization in the IT industry, including roles such as software developers, system analysts, IT consultants, database administrators, and cybersecurity professionals.
        </p>

        <div className="grid md:grid-cols-2 gap-3">
          {semesters.map(sem => <AccordionItem key={sem} title={sem} />)}
        </div>
      </section>

      {/* ══════════════ DEPT SLIDER — BG2 ══════════════ */}
      <section
        className="relative py-20"
        style={{ backgroundImage:`url(${BG2})`, backgroundSize:"cover", backgroundPosition:"center" }}
      >
        <div className="absolute inset-0 bg-white/93" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <SectionTitle subtitle="Discover what makes our department exceptional">
            Explore Our Department
          </SectionTitle>
          <DeptSlider />
        </div>
      </section>

      {/* ══════════════ ADMISSION + FEE ══════════════ */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <SectionTitle subtitle="Simple admission process and transparent fee structure">
          Admission & Fee Details
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Admission */}
          <div>
            <h3 className="text-lg font-extrabold text-[#00588b] mb-5 flex items-center gap-2">
              <UserCheck size={20} className="text-[#ffb900]" /> Admission Criteria
            </h3>
            <div className="space-y-4 mb-8">
              {[
                { clr:"#00588b", text:"Through Majority & Scholarship Test (DPM-SAT). For details, ", link:"Click here" },
                { clr:"#ffb900", text:"Admission procedure: For follow-up admissions process. To apply, ", link:"Click Here" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-blue-50 rounded-xl p-4 border-l-4 shadow-sm" style={{ borderColor:item.clr }}>
                  <CheckCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color:item.clr }} />
                  <p className="text-gray-700 text-sm">
                    {item.text}
                    <a href="#" className="font-bold underline hover:opacity-80" style={{ color:item.clr }}>{item.link}</a>
                  </p>
                </div>
              ))}
            </div>
            {/* Video */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-video shadow-xl cursor-pointer group"
              style={{ backgroundImage:`url(${BG1})`, backgroundSize:"cover", backgroundPosition:"center" }}
            >
              <div className="absolute inset-0 bg-[#00588b]/70 group-hover:bg-[#00588b]/60 transition" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-16 h-16 bg-[#ffb900] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Play size={28} className="text-[#00588b] ml-1" />
                </div>
                <p className="text-blue-100 text-sm">Watch Admission Process Video</p>
              </div>
            </div>
          </div>

          {/* Fee */}
          <div>
            <h3 className="text-lg font-extrabold text-[#00588b] mb-5 flex items-center gap-2">
              <CreditCard size={20} className="text-[#ffb900]" /> Course Fee Structure
            </h3>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
              <div className="bg-[#00588b] text-white px-5 py-3 font-bold text-sm flex items-center gap-2">
                <IndianRupee size={16} className="text-[#ffb900]" /> Fee Details
              </div>
              <div className="divide-y divide-gray-100">
                {feeDetails.map((fee, i) => (
                  <div key={i} className={`flex justify-between items-center px-5 py-3.5 hover:bg-blue-50 transition ${i % 2 === 0 ? "bg-white" : "bg-blue-50/30"}`}>
                    <span className="text-gray-700 text-sm">{fee.label}</span>
                    <span className="text-[#00588b] font-extrabold text-sm">₹{fee.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SCHOLARSHIP — BG2 ══════════════ */}
      <section
        className="relative py-20"
        style={{ backgroundImage:`url(${BG2})`, backgroundSize:"cover", backgroundPosition:"center" }}
      >
        <div className="absolute inset-0 bg-[#00588b]/93" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <SectionTitle light subtitle="Scholarship for Session 2026-27">Scholarship Criteria</SectionTitle>

          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl mb-8">
            <div className="bg-[#ffb900] px-5 py-3 font-extrabold text-[#00588b] flex items-center gap-2">
              <Award size={18} /> Scholarship on Tuition Fees
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[540px]">
                <thead>
                  <tr className="bg-[#00588b]/8">
                    <th className="px-4 py-3 text-left text-[#00588b] font-extrabold">% in Graduation</th>
                    {dateHeaders.map((d, i) => (
                      <th key={i} className="px-3 py-3 text-center text-[#00588b] font-extrabold text-xs">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scholarshipRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-blue-50/50"}>
                      <td className="px-4 py-3 font-bold text-gray-700">{row.range}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className="px-3 py-3 text-center font-extrabold text-[#ffb900]">{v}</td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-[#ffb900]/15 border-t-2 border-[#ffb900]">
                    <td className="px-4 py-3 font-bold text-[#00588b] text-xs">{earlyBird.label}</td>
                    {earlyBird.values.map((v, j) => (
                      <td key={j} className="px-3 py-3 text-center font-extrabold text-[#00588b]">{v}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6">
            <h4 className="font-extrabold text-[#ffb900] mb-4 flex items-center gap-2">
              <Info size={18} /> Notes:
            </h4>
            <ul className="space-y-2">
              {scholarshipNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-blue-100 text-sm">
                  <span className="text-[#ffb900] font-black flex-shrink-0 mt-0.5">{i+1}.</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY JOIN BCA ══════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <SectionTitle subtitle="Unlock your potential with a BCA degree">
          Why Join Bachelor of Computer Application (BCA)?
        </SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyJoinReasons.map((reason, i) => (
            <div key={i} className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00588b] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 bg-[#00588b]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#00588b] transition-colors">
                <reason.icon size={22} className="text-[#00588b] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[#00588b] font-extrabold text-sm mb-2">{reason.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ UNIQUE FEATURES — BG1 ══════════════ */}
      <section
        className="relative py-20"
        style={{ backgroundImage:`url(${BG1})`, backgroundSize:"cover", backgroundPosition:"center 30%" }}
      >
        <div className="absolute inset-0 bg-white/94" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <SectionTitle subtitle="Setting us apart from the rest">
            What makes Department of BCA unique?
          </SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {uniqueFeatures.map((feat, i) => (
              <div key={i} className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all overflow-hidden">
                <div className="absolute top-3 right-4 text-6xl font-black text-[#00588b]/5 group-hover:text-[#ffb900]/15 transition-colors select-none">
                  {feat.num}
                </div>
                <div className="w-12 h-12 bg-[#00588b]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#00588b] transition-colors">
                  <feat.icon size={22} className="text-[#00588b] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[#00588b] font-extrabold mb-2 text-sm">{feat.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ HOW TO APPLY — BG2 + SLIDER ══════════════ */}
      <section
        id="apply"
        className="relative py-24 overflow-hidden"
        style={{ backgroundImage:`url(${BG2})`, backgroundSize:"cover", backgroundPosition:"center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00588b]/97 via-[#004e7c]/96 to-[#002f4d]/95" />
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage:"radial-gradient(#fff 1.5px,transparent 1.5px)", backgroundSize:"30px 30px" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <SectionTitle light subtitle="Simple 5-step process to join the BCA programme">
            How to Apply
          </SectionTitle>
          <p className="text-blue-200 text-center text-sm -mt-6 mb-12">Guide to Register Online</p>

          <ApplySlider />

          <div className="text-center mt-14">
            <a href="#" className="inline-flex items-center gap-2 bg-[#ffb900] text-[#00588b] font-extrabold text-base px-10 py-4 rounded-full shadow-2xl hover:bg-yellow-300 hover:scale-105 transition-all">
              Start Your Application <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
