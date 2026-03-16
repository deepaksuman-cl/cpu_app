"use client";
import { useState, useEffect } from "react";
import {
  GraduationCap, BookOpen, Users, Award, ChevronDown, ChevronRight,
  CheckCircle, Star, FlaskConical, Building2, Globe,
  Phone, Mail, MapPin, ArrowRight, Play, Briefcase,
  Code2, Database, Network, Brain, Target, TrendingUp,
  FileText, CreditCard, Info, ChevronLeft, X,
  UserCheck, ClipboardList, IndianRupee, BadgeCheck, Plus, Minus,
} from "lucide-react";

// ── IMAGES ────────────────────────────────────────────────────────────────────
const BG1 = "https://cpur.in/wp-content/uploads/2023/07/banner-005.webp";
const BG2 = "https://cpur.in/wp-content/uploads/2024/01/bg_12-1.jpg";
const CAMPUS_IMG = "https://cpur.in/wp-content/uploads/2023/07/banner-005.webp";

// ── DATA ──────────────────────────────────────────────────────────────────────
const stats = [
  { icon: Users,    value: "3800+", label: "Placements So Far"  },
  { icon: BookOpen, value: "60 L",  label: "Highest Package"    },
  { icon: Award,    value: "18",    label: "Startups"           },
  { icon: FileText, value: "130",   label: "Papers Published"   },
  { icon: Globe,    value: "1250+", label: "Google Fellowships" },
  { icon: Star,     value: "905",   label: "Alumni Achieved"    },
];

// ── Correct data from screenshot ──────────────────────────────────────────────
const courseStructure = [
  { category:"Departmental Core",    shortName:"DC", description:"Discipline Specific Core Courses (DSC)",    credits:62 },
  { category:"Departmental Core",    shortName:"DC", description:"Project / Dissertation / Field Study / Survey", credits:6 },
  { category:"Departmental Core",    shortName:"DC", description:"Seminar",                                   credits:2  },
  { category:"Departmental Core",    shortName:"DC", description:"Internship / on Job Experience",            credits:4  },
  { category:"Departmental Core",    shortName:"DC", description:"Research Credit Course",                    credits:0  },
  { category:"Departmental Elective",shortName:"DE", description:"Discipline Specific Elective Courses (DSE)", credits:32 },
];

const valueAddedCourses = [
  { name:"Additional Languages",                  credits:2 },
  { name:"Professional and Business Ethics",       credits:2 },
  { name:"National and Professional Issues (NPI)", credits:2 },
];

const accordionSections = [
  {
    id:"cs",
    title:"Course Structure",
    content: `The Bachelor of Computer Applications (BCA) program at Career Point University is a comprehensive three-year undergraduate course designed to provide students with a solid foundation in computer science and its applications. The curriculum encompasses a wide range of subjects, including programming languages such as C, C++, and Java, data structures, database management systems, software engineering, web development, and computer networks. In addition to these core topics, the program offers specialized modules in emerging fields like data science, machine learning, statistical analysis, and big data technologies, ensuring that students are well-versed in current industry trends.\n\nThe following table outlines the comprehensive course structure of the BCA program. It is organized into core, elective, interdisciplinary, and skill enhancement components. Each category specifies the type of courses, their descriptions, and the corresponding credits, ensuring a well-rounded academic experience with a balance of foundational knowledge, research exposure, and professional ethics:`,
    hasTable: true,
  },
  { id:"s1",  title:"Semester-1", content:"Subjects covered in Semester 1 include: Programming Fundamentals (C Language), Mathematics I, Digital Electronics, Introduction to IT, and Communication Skills. Total Credits: 22" },
  { id:"s2",  title:"Semester-2", content:"Subjects covered in Semester 2 include: Data Structures, Mathematics II, Object Oriented Programming (C++), Web Technology Basics, and Environmental Studies. Total Credits: 22" },
  { id:"s3",  title:"Semester-3", content:"Subjects covered in Semester 3 include: Database Management Systems, Java Programming, Operating Systems, Computer Networks, and Elective I. Total Credits: 22" },
  { id:"s4",  title:"Semester-4", content:"Subjects covered in Semester 4 include: Advanced Java, Software Engineering, Computer Architecture, Elective II, and Minor Project. Total Credits: 22" },
  { id:"s5",  title:"Semester-5", content:"Subjects covered in Semester 5 include: Machine Learning, Data Science, Mobile Application Development, Elective III, and Internship. Total Credits: 22" },
  { id:"s6",  title:"Semester-6", content:"Subjects covered in Semester 6 include: Artificial Intelligence, Cyber Security, Cloud Computing, Major Project, and Professional Ethics. Total Credits: 22" },
  { id:"uc",  title:"University Core", content:"University Core courses include: Environmental Science, Human Values & Professional Ethics, Indian Constitution & Traditional Knowledge, and Sports/NSS/NCC activities." },
  { id:"de",  title:"Departmental Elective", content:"Departmental Elective options include: Advanced Database Systems, Internet of Things (IoT), Blockchain Technology, AR/VR Development, Big Data Analytics, and Natural Language Processing." },
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

const dateHeaders   = ["Till 31st June","Till 13th July","Till 31st July","After 31st July"];
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
  { icon:TrendingUp, title:"Gateway to the IT Industry",         desc:"BCA serves as a gateway to the vast IT industry. The program equips students with foundational knowledge and practical skills in software development, web design, database administration, networking, and other IT areas." },
  { icon:Briefcase,  title:"Diverse Career Opportunities",       desc:"BCA graduates have opportunities across IT companies, software firms, government agencies, finance, healthcare, and educational institutions. The versatile degree allows exploring diverse career paths." },
  { icon:BookOpen,   title:"In-demand Skills",                   desc:"The curriculum covers programming languages, database management, software engineering, and computer applications — highly demanded across multiple industries." },
  { icon:Target,     title:"Practical Training & Hands-On Exp.", desc:"BCA programs emphasize practical training through projects, internships, and industry collaborations. Students apply theoretical knowledge to real-world problems." },
  { icon:Brain,      title:"Opportunities for Specialization",   desc:"Many BCA programs offer specialization in data science, machine learning, cybersecurity, AI, and mobile application development." },
];

const uniqueFeatures = [
  { num:"06", icon:Users,    title:"Support Services",          desc:"BCA departments provide entrepreneurship and career support services, merit reviews, internship opportunities, and mentoring for student entrepreneurs." },
  { num:"07", icon:Globe,    title:"Interdisciplinary Approach", desc:"BCA departments collaborate with academic and industry partners to promote interdisciplinary research, joint projects, and knowledge exchange." },
  { num:"08", icon:Brain,    title:"Research & Development",    desc:"The department focuses on holistic development offering professional skills, skill training, career readiness programs, and competitive preparation." },
  { num:"09", icon:Building2,title:"Community Engagement",      desc:"BCA departments engage with the local community, industry stakeholders through community programs and promote social responsibility among students." },
];

const applySteps = [
  { icon:UserCheck,    step:"01", label:"Register Yourself",       desc:"Create your account on the portal with your basic personal details and email address." },
  { icon:FileText,     step:"02", label:"Verify Details",          desc:"Confirm your identity, educational background, and upload the necessary documents." },
  { icon:ClipboardList,step:"03", label:"Fill Application Online", desc:"Complete the online application form with all required academic and personal information." },
  { icon:IndianRupee,  step:"04", label:"Pay Application Fee",     desc:"Securely pay the application processing fee online via net banking, UPI, or card." },
  { icon:BadgeCheck,   step:"05", label:"Submit Application",      desc:"Review your complete application and submit it for processing and review." },
];

// ── YOUTUBE LIGHTBOX ─────────────────────────────────────────────────────────
function YouTubeLightbox({ videoId, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-[#ffb900] hover:text-[#00588b] hover:border-[#ffb900] transition-all z-10"
      >
        <X size={22} />
      </button>

      {/* Video container */}
      <div
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ aspectRatio:"16/9" }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="Admission Process Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <style>{`
        @keyframes lightboxIn {
          from { opacity:0; transform:scale(0.92); }
          to   { opacity:1; transform:scale(1); }
        }
      `}</style>
    </div>
  );
}

// ── PLAY BUTTON WITH INFINITE RIPPLE WAVES ────────────────────────────────────
function PlayButtonRipple({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center focus:outline-none group"
      aria-label="Watch video"
    >
      {/* Wave rings */}
      <span className="absolute w-24 h-24 rounded-full bg-[#ffb900]/25 animate-[ripple1_2s_ease-out_infinite]" />
      <span className="absolute w-32 h-32 rounded-full bg-[#ffb900]/15 animate-[ripple2_2s_ease-out_infinite_0.4s]" />
      <span className="absolute w-40 h-40 rounded-full bg-[#ffb900]/08 animate-[ripple3_2s_ease-out_infinite_0.8s]" />

      {/* Main circle */}
      <span className="relative z-10 w-20 h-20 rounded-full bg-[#ffb900] flex items-center justify-center shadow-2xl group-hover:bg-yellow-300 group-hover:scale-110 transition-all duration-300">
        <Play size={30} className="text-[#00588b] ml-1.5" fill="#00588b" />
      </span>

      <style>{`
        @keyframes ripple1 {
          0%   { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
        @keyframes ripple2 {
          0%   { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(2.6); opacity: 0;   }
        }
        @keyframes ripple3 {
          0%   { transform: scale(0.8); opacity: 0.4; }
          100% { transform: scale(3.0); opacity: 0;   }
        }
      `}</style>
    </button>
  );
}

// ── FULL-WIDTH ACCORDION ──────────────────────────────────────────────────────
function CourseAccordion() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <div className="w-full border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
      {accordionSections.map((section, idx) => {
        const isOpen = openId === section.id;
        return (
          <div key={section.id} className={`${idx !== 0 ? "border-t border-gray-200" : ""}`}>
            {/* Header */}
            <button
              onClick={() => toggle(section.id)}
              className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-200 ${
                isOpen
                  ? "bg-[#00588b] text-white"
                  : "bg-white hover:bg-blue-50 text-gray-800"
              }`}
            >
              <span className="flex items-center gap-3 font-semibold text-sm md:text-base">
                <span className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                  isOpen ? "bg-white/20" : "bg-[#00588b]/10"
                }`}>
                  {isOpen
                    ? <Minus size={15} className="text-white" />
                    : <Plus  size={15} className="text-[#00588b]" />
                  }
                </span>
                {section.title}
              </span>
              <ChevronDown
                size={18}
                className={`flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-white" : "text-gray-400"
                }`}
              />
            </button>

            {/* Body */}
            {isOpen && (
              <div className="bg-white border-t border-gray-100 px-6 py-6">
                {section.content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-700 text-sm leading-relaxed mb-4">{para}</p>
                ))}

                {/* Table for Course Structure */}
                {section.hasTable && (
                  <div className="overflow-x-auto rounded-xl shadow border border-gray-100 mt-2">
                    <table className="w-full text-sm min-w-[520px]">
                      <thead>
                        <tr className="bg-[#00588b] text-white">
                          <th className="px-5 py-3 text-left font-bold">Category</th>
                          <th className="px-5 py-3 text-left font-bold">Short Name</th>
                          <th className="px-5 py-3 text-left font-bold">Description</th>
                          <th className="px-5 py-3 text-center font-bold w-24">Credits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseStructure.map((row, i) => (
                          <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-blue-50/50"} hover:bg-[#ffb900]/5 transition-colors`}>
                            <td className="px-5 py-3 font-semibold text-[#00588b] text-xs">{row.category}</td>
                            <td className="px-5 py-3 text-gray-500 text-xs font-semibold">{row.shortName}</td>
                            <td className="px-5 py-3 text-gray-700">{row.description}</td>
                            <td className="px-5 py-3 text-center font-extrabold text-[#ffb900] text-base">{row.credits}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

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
        <div className="h-1 w-5  rounded-full bg-[#00588b]" />
        <div className="h-1 w-2  rounded-full bg-[#ffb900]" />
      </div>
    </div>
  );
}

// ── DEPARTMENT SLIDER ─────────────────────────────────────────────────────────
function DeptSlider() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const len = deptSlides.length;

  // Auto-rotate
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % len), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-7">
        {deptSlides.map((slide, idx) => {
          const isActive = idx === active;
          const isHov    = hovered === idx;
          const highlight = isActive || isHov;
          return (
            <div
              key={slide.title}
              onClick={() => setActive(idx)}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                boxShadow: highlight
                  ? "0 0 0 3px #ffb900, 0 24px 48px rgba(0,88,139,0.35)"
                  : "0 8px 32px rgba(0,88,139,0.18)",
                transform: highlight ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              {/* Background: BG2 image + dark teal overlay — exactly like screenshot */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:`url(${BG2})`,
                  backgroundSize:"cover",
                  backgroundPosition:"center",
                }}
              />
              {/* Teal gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: highlight
                    ? "linear-gradient(160deg, rgba(0,70,110,0.93) 0%, rgba(0,50,80,0.97) 100%)"
                    : "linear-gradient(160deg, rgba(0,70,110,0.87) 0%, rgba(0,50,80,0.93) 100%)",
                  transition:"background 0.4s ease",
                }}
              />

              {/* Decorative watermark icon */}
              <div className="absolute right-4 bottom-20 opacity-[0.06] pointer-events-none">
                <slide.icon size={120} className="text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Header row */}
                <div className="flex items-center gap-3 px-6 pt-6 pb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                    style={{
                      background: highlight ? "#ffb900" : "rgba(255,185,0,0.85)",
                      transition:"background 0.3s",
                    }}
                  >
                    <slide.icon size={24} className="text-[#00588b]" />
                  </div>
                  <h3 className="font-extrabold text-white text-base leading-tight">{slide.title}</h3>
                </div>

                {/* Divider */}
                <div
                  className="mx-6 mb-5 h-px"
                  style={{ background:"rgba(255,185,0,0.25)" }}
                />

                {/* List */}
                <div className="px-6 pb-6 flex-1">
                  <ul className="space-y-3 mb-6">
                    {slide.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 group/item">
                        {/* Custom check icon matching screenshot */}
                        <span className="flex-shrink-0 w-5 h-5 rounded-full border border-[#ffb900]/60 flex items-center justify-center">
                          <CheckCircle size={12} className="text-[#ffb900]" />
                        </span>
                        <span
                          className="text-sm font-medium leading-tight"
                          style={{
                            color: highlight ? "#ffffff" : "rgba(255,255,255,0.85)",
                            transition:"color 0.3s",
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className="w-full py-3 rounded-xl font-extrabold text-sm tracking-widest uppercase transition-all duration-300"
                    style={{
                      background: highlight ? "#ffb900" : "rgba(255,185,0,0.75)",
                      color: "#00588b",
                      letterSpacing:"0.12em",
                      boxShadow: highlight ? "0 4px 20px rgba(255,185,0,0.4)" : "none",
                    }}
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot Navigation */}
      <div className="flex items-center justify-center gap-3 mt-10">
        {deptSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-400 rounded-full"
            style={{
              width:  i === active ? "32px" : "10px",
              height: "10px",
              background: i === active ? "#00588b" : "#d1d5db",
            }}
          />
        ))}
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
  useEffect(() => {
    const t = setTimeout(next, 3500);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div>
      <div className="hidden md:flex items-start relative mb-10">
        <div className="absolute top-8 left-8 right-8 h-px bg-white/15 z-0" />
        {applySteps.map((step, idx) => {
          const isActive = idx === active;
          const isDone   = idx < active;
          return (
            <div key={step.step}
              onClick={() => setActive(idx)}
              className="flex-1 flex flex-col items-center relative z-10 cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500 shadow-lg border-2 ${
                isActive ? "bg-[#ffb900] border-white scale-110 ring-4 ring-[#ffb900]/30"
                : isDone  ? "bg-white/25 border-white/50"
                           : "bg-white/10 border-white/20"
              }`}>
                {isDone
                  ? <CheckCircle size={26} className="text-white" />
                  : <step.icon size={26} className={isActive ? "text-[#00588b]" : "text-white/70"} />
                }
              </div>
              <span className={`text-xs font-black tracking-widest mb-1 ${isActive ? "text-[#ffb900]" : "text-white/40"}`}>
                STEP {step.step}
              </span>
              <span className={`text-xs font-bold text-center leading-tight px-1 ${isActive ? "text-white" : "text-white/60"}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
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
            <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#ffb900] h-full rounded-full transition-all duration-500"
                style={{ width:`${((active + 1) / len) * 100}%` }} />
            </div>
            <p className="text-white/40 text-xs mt-2">{active + 1} of {len} steps</p>
          </div>
        ) : null)}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        {applySteps.map((step, idx) => idx === active ? (
          <div key={step.step} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-[#ffb900] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <step.icon size={32} className="text-[#00588b]" />
            </div>
            <div className="text-[#ffb900] font-black text-xs tracking-widest mb-2">STEP {step.step}</div>
            <h3 className="text-white font-extrabold text-lg mb-3">{step.label}</h3>
            <p className="text-blue-100 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ) : null)}
      </div>

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  // Replace with your actual YouTube video ID
  const YT_VIDEO_ID = "dQw4w9WgXcQ";

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
              <div className="flex flex-wrap gap-8 mt-12 pt-6 border-t border-white/20">
                {[{ v:"3800+", l:"Placements" }, { v:"60L+", l:"Highest Pkg" }, { v:"10,000+", l:"Students Trust" }].map((s, i) => (
                  <div key={i}>
                    <div className="text-[#ffb900] font-black text-2xl">{s.v}</div>
                    <div className="text-blue-200 text-xs mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
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

      {/* ══════════════ COURSE STRUCTURE — FULL WIDTH ══════════════ */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <SectionTitle subtitle="A well-structured curriculum designed for excellence">
            Course Structure BCA
          </SectionTitle>
        </div>

        {/* Full-width accordion — no max-width container */}
        <div className="px-4 md:px-8 lg:px-16">
          <CourseAccordion />
        </div>

        {/* Value Added Courses */}
        <div className="max-w-7xl mx-auto px-4 mt-10">
          <div className="bg-gradient-to-r from-[#ffb900]/15 to-yellow-50 border border-[#ffb900]/50 rounded-2xl p-6">
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
        </div>
      </section>

      {/* ══════════════ DEPT SLIDER — BG2 ══════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ background:"#f4f2ed" }}>
        {/* Subtle bg watermark */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage:`url(${BG1})`, backgroundSize:"cover", backgroundPosition:"center", filter:"grayscale(60%)" }} />
        {/* Decorative watermark icons */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
          <Building2 size={320} className="text-[#00588b]" />
        </div>
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
          <Star size={260} className="text-[#ffb900]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#00588b] mb-3">
              Explore Our Department
            </h2>
            <p className="text-gray-500 text-sm">Discover what makes our department exceptional</p>
            <div className="flex justify-center gap-1 mt-4">
              <div className="h-1 w-14 rounded-full bg-[#ffb900]" />
              <div className="h-1 w-5 rounded-full bg-[#00588b]" />
              <div className="h-1 w-2 rounded-full bg-[#ffb900]" />
            </div>
          </div>
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

            {/* ── VIDEO THUMBNAIL WITH RIPPLE PLAY BUTTON ── */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
              style={{
                backgroundImage:`url(${CAMPUS_IMG})`,
                backgroundSize:"cover",
                backgroundPosition:"center",
                aspectRatio:"16/9"
              }}
              onClick={() => setLightboxOpen(true)}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#00588b]/65 group-hover:bg-[#00588b]/55 transition-all duration-300" />

              {/* Ripple play button centered */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <PlayButtonRipple onClick={() => setLightboxOpen(true)} />
             
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


      {/* ══════════════ YOUTUBE LIGHTBOX ══════════════ */}
      {lightboxOpen && (
        <YouTubeLightbox
          videoId={YT_VIDEO_ID}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}