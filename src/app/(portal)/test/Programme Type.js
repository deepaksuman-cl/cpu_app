"use client";
import { useState } from "react";
import {
  Monitor, HeartPulse, Leaf, Briefcase, FlaskConical, Palette,
  GraduationCap, CheckCircle2, MessageSquareQuote, Phone, Images,
  ChevronRight, Search, Bell, Home, Layers, BookMarked, Microscope,
  TrendingUp, Cpu, Wrench, Stethoscope, Landmark, BookText, Brain,
  Building2, Globe, AtomIcon, BarChart3, HeartHandshake, Sprout,
  Dna, Telescope, Calculator, Code2, Library,
} from "lucide-react";

// ─────────────────────────────────────────────
// DATA  (JSON format)
// ─────────────────────────────────────────────

const PROGRAMME_TYPES = [
  { label: "Diploma",        count: 6 },
  { label: "Under Graduate", count: 7 },
  { label: "Integrated",     count: 5 },
  { label: "Post Graduate",  count: 6 },
  { label: "Doctoral",       count: 6 },
];

const SIDEBAR_LINKS = [
  { icon: MessageSquareQuote, label: "Testimonials",  colorClass: "text-[#00588b] bg-[#00588b]/10" },
  { icon: Phone,              label: "Contact",       colorClass: "text-red-500 bg-red-50"          },
  { icon: Images,             label: "Image Gallery", colorClass: "text-green-600 bg-green-50"      },
];

const COURSES = {
  Diploma: [
    {
      id: "d1", title: "Engineering Technology",
      school: "School of Engineering & Technology",
      icon: Wrench, colorHex: "#e53e3e",
      iconBg: "bg-red-50", textColor: "text-red-600",
      borderHover: "hover:border-red-300",
      programs: ["Diploma in Civil Engg.", "Diploma in Mechanical Engg.", "Diploma in Electrical Engg."],
      badge: { label: "Popular", cls: "bg-red-50 text-red-600" },
    },
    {
      id: "d2", title: "Medical & Paramedical",
      school: "School of Health & Allied Sciences",
      icon: Stethoscope, colorHex: "#3182ce",
      iconBg: "bg-blue-50", textColor: "text-blue-600",
      borderHover: "hover:border-blue-300",
      programs: ["Diploma in Nursing", "Diploma in X-Ray Technician", "Diploma in OT Technician"],
      badge: null,
    },
    {
      id: "d3", title: "Computer Science",
      school: "School of Computer Applications",
      icon: Code2, colorHex: "#00588b",
      iconBg: "bg-sky-50", textColor: "text-[#00588b]",
      borderHover: "hover:border-sky-300",
      programs: ["Diploma in CS", "Diploma in Web Development", "Diploma in Cyber Security"],
      badge: { label: "Trending", cls: "bg-blue-50 text-blue-700" },
    },
    {
      id: "d4", title: "Business & Commerce",
      school: "School of Commerce and Management",
      icon: Briefcase, colorHex: "#805ad5",
      iconBg: "bg-purple-50", textColor: "text-purple-600",
      borderHover: "hover:border-purple-300",
      programs: ["Diploma in Business Mgmt.", "Diploma in Retail Management", "Diploma in Finance"],
      badge: null,
    },
    {
      id: "d5", title: "Agriculture & Horticulture",
      school: "School of Agricultural Sciences",
      icon: Sprout, colorHex: "#38a169",
      iconBg: "bg-green-50", textColor: "text-green-600",
      borderHover: "hover:border-green-300",
      programs: ["Diploma in Agriculture", "Diploma in Horticulture"],
      badge: null,
    },
    {
      id: "d6", title: "Creative Arts & Design",
      school: "School of Arts and Humanities",
      icon: Palette, colorHex: "#dd6b20",
      iconBg: "bg-orange-50", textColor: "text-orange-600",
      borderHover: "hover:border-orange-300",
      programs: ["Diploma in Fine Arts", "Diploma in Graphic Design", "Diploma in Photography"],
      badge: { label: "New", cls: "bg-teal-50 text-teal-600" },
    },
  ],

  "Under Graduate": [
    {
      id: "ug1", title: "Engineering",
      school: "School of Engineering & Technology",
      icon: Monitor, colorHex: "#e53e3e",
      iconBg: "bg-red-50", textColor: "text-red-600",
      borderHover: "hover:border-red-300",
      programs: ["B.Tech in CSE", "AI & Machine Learning", "Software Product Engineering"],
      badge: { label: "Popular", cls: "bg-red-50 text-red-600" },
    },
    {
      id: "ug2", title: "Health & Allied Sciences",
      school: "School of Health & Allied Sciences",
      icon: HeartPulse, colorHex: "#3182ce",
      iconBg: "bg-blue-50", textColor: "text-blue-600",
      borderHover: "hover:border-blue-300",
      programs: ["B.Pharma", "BPT", "B.Sc Nutrition and Dietetics"],
      badge: { label: "New", cls: "bg-teal-50 text-teal-600" },
    },
    {
      id: "ug3", title: "Agricultural",
      school: "School of Agricultural Sciences",
      icon: Leaf, colorHex: "#38a169",
      iconBg: "bg-green-50", textColor: "text-green-600",
      borderHover: "hover:border-green-300",
      programs: ["B.Sc. (Hons.) Agriculture"],
      badge: null,
    },
    {
      id: "ug4", title: "Computer Applications",
      school: "School of Computer Applications & Technology",
      icon: Cpu, colorHex: "#00588b",
      iconBg: "bg-sky-50", textColor: "text-[#00588b]",
      borderHover: "hover:border-sky-300",
      programs: ["BCA", "BCA In Data Science", "BCA In AI & ML", "BCA In Cloud Computing"],
      badge: { label: "Trending", cls: "bg-blue-50 text-blue-700" },
    },
    {
      id: "ug5", title: "Management",
      school: "School of Commerce and Management",
      icon: Briefcase, colorHex: "#805ad5",
      iconBg: "bg-purple-50", textColor: "text-purple-600",
      borderHover: "hover:border-purple-300",
      programs: ["BBA", "B.Com", "BHA"],
      badge: null,
    },
    {
      id: "ug6", title: "Basic Sciences",
      school: "School of Basic & Applied Science",
      icon: FlaskConical, colorHex: "#d4a000",
      iconBg: "bg-yellow-50", textColor: "text-yellow-700",
      borderHover: "hover:border-yellow-300",
      programs: ["B.Sc – Maths / Biology", "B.Sc. Bio Technology"],
      badge: null,
    },
    {
      id: "ug7", title: "Arts",
      school: "School of Arts and Humanities",
      icon: Palette, colorHex: "#dd6b20",
      iconBg: "bg-orange-50", textColor: "text-orange-600",
      borderHover: "hover:border-orange-300",
      programs: ["B.A.", "B.Lib."],
      badge: null,
    },
  ],

  Integrated: [
    {
      id: "int1", title: "Integrated Engineering",
      school: "School of Engineering & Technology",
      icon: Monitor, colorHex: "#e53e3e",
      iconBg: "bg-red-50", textColor: "text-red-600",
      borderHover: "hover:border-red-300",
      programs: ["B.Tech + M.Tech (CSE)", "B.Tech + MBA", "B.Tech + M.Tech (AI/ML)"],
      badge: { label: "Popular", cls: "bg-red-50 text-red-600" },
    },
    {
      id: "int2", title: "Integrated Science",
      school: "School of Basic & Applied Science",
      icon: AtomIcon, colorHex: "#00588b",
      iconBg: "bg-sky-50", textColor: "text-[#00588b]",
      borderHover: "hover:border-sky-300",
      programs: ["B.Sc + M.Sc (Physics)", "B.Sc + M.Sc (Chemistry)", "B.Sc + M.Sc (Maths)"],
      badge: null,
    },
    {
      id: "int3", title: "Integrated Law",
      school: "School of Law",
      icon: Landmark, colorHex: "#805ad5",
      iconBg: "bg-purple-50", textColor: "text-purple-600",
      borderHover: "hover:border-purple-300",
      programs: ["B.A. LL.B. (Hons.)", "BBA LL.B. (Hons.)"],
      badge: { label: "Trending", cls: "bg-blue-50 text-blue-700" },
    },
    {
      id: "int4", title: "Integrated Management",
      school: "School of Commerce and Management",
      icon: BarChart3, colorHex: "#38a169",
      iconBg: "bg-green-50", textColor: "text-green-600",
      borderHover: "hover:border-green-300",
      programs: ["BBA + MBA", "B.Com + MBA (Finance)", "BBA + MBA (Marketing)"],
      badge: null,
    },
    {
      id: "int5", title: "Integrated Arts",
      school: "School of Arts and Humanities",
      icon: Globe, colorHex: "#dd6b20",
      iconBg: "bg-orange-50", textColor: "text-orange-600",
      borderHover: "hover:border-orange-300",
      programs: ["B.A. + M.A. (English)", "B.A. + M.A. (History)", "B.A. + M.A. (Psychology)"],
      badge: null,
    },
  ],

  "Post Graduate": [
    {
      id: "pg1", title: "M.Tech Programmes",
      school: "School of Engineering & Technology",
      icon: Brain, colorHex: "#e53e3e",
      iconBg: "bg-red-50", textColor: "text-red-600",
      borderHover: "hover:border-red-300",
      programs: ["M.Tech – CSE", "M.Tech – AI & Data Science", "M.Tech – VLSI Design", "M.Tech – Robotics"],
      badge: { label: "Popular", cls: "bg-red-50 text-red-600" },
    },
    {
      id: "pg2", title: "MBA Programmes",
      school: "School of Commerce and Management",
      icon: Building2, colorHex: "#805ad5",
      iconBg: "bg-purple-50", textColor: "text-purple-600",
      borderHover: "hover:border-purple-300",
      programs: ["MBA – Marketing", "MBA – Finance", "MBA – HR", "MBA – Operations"],
      badge: { label: "Trending", cls: "bg-blue-50 text-blue-700" },
    },
    {
      id: "pg3", title: "M.Sc Programmes",
      school: "School of Basic & Applied Science",
      icon: FlaskConical, colorHex: "#d4a000",
      iconBg: "bg-yellow-50", textColor: "text-yellow-700",
      borderHover: "hover:border-yellow-300",
      programs: ["M.Sc – Biotechnology", "M.Sc – Data Science", "M.Sc – Physics", "M.Sc – Chemistry"],
      badge: null,
    },
    {
      id: "pg4", title: "M.Pharma & Health Sci.",
      school: "School of Health & Allied Sciences",
      icon: HeartHandshake, colorHex: "#3182ce",
      iconBg: "bg-blue-50", textColor: "text-blue-600",
      borderHover: "hover:border-blue-300",
      programs: ["M.Pharma – Pharmacology", "M.Sc – Nutrition", "MPT – Orthopaedics"],
      badge: { label: "New", cls: "bg-teal-50 text-teal-600" },
    },
    {
      id: "pg5", title: "M.A. & Humanities",
      school: "School of Arts and Humanities",
      icon: BookText, colorHex: "#dd6b20",
      iconBg: "bg-orange-50", textColor: "text-orange-600",
      borderHover: "hover:border-orange-300",
      programs: ["M.A. – English", "M.A. – History", "M.A. – Journalism", "M.A. – Psychology"],
      badge: null,
    },
    {
      id: "pg6", title: "M.Sc Agriculture",
      school: "School of Agricultural Sciences",
      icon: Leaf, colorHex: "#38a169",
      iconBg: "bg-green-50", textColor: "text-green-600",
      borderHover: "hover:border-green-300",
      programs: ["M.Sc – Agronomy", "M.Sc – Plant Pathology", "M.Sc – Soil Science"],
      badge: null,
    },
  ],

  Doctoral: [
    {
      id: "dr1", title: "Ph.D – Engineering",
      school: "School of Engineering & Technology",
      icon: Telescope, colorHex: "#e53e3e",
      iconBg: "bg-red-50", textColor: "text-red-600",
      borderHover: "hover:border-red-300",
      programs: ["Ph.D in CSE", "Ph.D in Electronics", "Ph.D in Mechanical Engg.", "Ph.D in Civil Engg."],
      badge: { label: "Research", cls: "bg-purple-50 text-purple-700" },
    },
    {
      id: "dr2", title: "Ph.D – Sciences",
      school: "School of Basic & Applied Science",
      icon: Dna, colorHex: "#00588b",
      iconBg: "bg-sky-50", textColor: "text-[#00588b]",
      borderHover: "hover:border-sky-300",
      programs: ["Ph.D in Physics", "Ph.D in Chemistry", "Ph.D in Biotechnology", "Ph.D in Mathematics"],
      badge: null,
    },
    {
      id: "dr3", title: "Ph.D – Management",
      school: "School of Commerce and Management",
      icon: Calculator, colorHex: "#805ad5",
      iconBg: "bg-purple-50", textColor: "text-purple-600",
      borderHover: "hover:border-purple-300",
      programs: ["Ph.D in Business Mgmt.", "Ph.D in Finance", "Ph.D in Marketing"],
      badge: null,
    },
    {
      id: "dr4", title: "Ph.D – Health Sciences",
      school: "School of Health & Allied Sciences",
      icon: Microscope, colorHex: "#3182ce",
      iconBg: "bg-blue-50", textColor: "text-blue-600",
      borderHover: "hover:border-blue-300",
      programs: ["Ph.D in Pharmacy", "Ph.D in Nutrition", "Ph.D in Public Health"],
      badge: { label: "New", cls: "bg-teal-50 text-teal-600" },
    },
    {
      id: "dr5", title: "Ph.D – Agriculture",
      school: "School of Agricultural Sciences",
      icon: Sprout, colorHex: "#38a169",
      iconBg: "bg-green-50", textColor: "text-green-600",
      borderHover: "hover:border-green-300",
      programs: ["Ph.D in Agronomy", "Ph.D in Genetics & Plant Breeding", "Ph.D in Horticulture"],
      badge: null,
    },
    {
      id: "dr6", title: "Ph.D – Arts & Humanities",
      school: "School of Arts and Humanities",
      icon: Library, colorHex: "#dd6b20",
      iconBg: "bg-orange-50", textColor: "text-orange-600",
      borderHover: "hover:border-orange-300",
      programs: ["Ph.D in English", "Ph.D in History", "Ph.D in Linguistics"],
      badge: null,
    },
  ],
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function CoursePage() {
  const [activeType, setActiveType]   = useState("Under Graduate");
  const [searchTerm, setSearchTerm]   = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  const courses    = COURSES[activeType] || [];
  const totalSpecs = courses.reduce((acc, c) => acc + c.programs.length, 0);
  const filtered   = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.programs.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="font-[Poppins,sans-serif] bg-[#f0f6fb] min-h-screen">

     

      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-[#00588b] to-[#003d63] text-white px-12 pt-10 pb-8 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-14 -right-14 w-64 h-64 rounded-full bg-[#ffb900]/10 pointer-events-none" />
        <div className="absolute -bottom-20 left-[42%] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative max-w-2xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
            <Home size={13} className="text-[#ffb900]" />
            <span>Home</span>
            <ChevronRight size={11} className="text-white/40" />
            <span className="text-[#ffb900] font-semibold">Programmes</span>
          </div>

          <h1 className="text-3xl font-black leading-tight mb-2">
            Explore Our{" "}
            <span className="text-[#ffb900]">Programmes</span>
          </h1>
          <p className="text-white/75 text-base leading-relaxed max-w-lg">
            Discover world-class programmes crafted for future leaders.
            Choose from 54+ specialisations across 7 schools.
          </p>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="flex gap-6 px-8 py-7 max-w-[1400px] mx-auto">

        {/* ── Sidebar ── */}
        <aside className="w-56 shrink-0 flex flex-col gap-5">

          {/* Programme Type */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e2ecf4]">
            <h3 className="flex items-center gap-2 text-[#00588b] font-extrabold text-sm mb-4">
              <BookMarked size={15} className="text-[#00588b]" />
              Programme Type
            </h3>
            <div className="flex flex-col gap-1">
              {PROGRAMME_TYPES.map(({ label, count }) => (
                <button
                  key={label}
                  onClick={() => { setActiveType(label); setSearchTerm(""); }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left border-l-[3px] transition-all
                    ${activeType === label
                      ? "bg-[#00588b]/8 border-[#00588b]"
                      : "bg-transparent border-transparent hover:bg-[#f0f6fb]"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className={activeType === label ? "text-[#00588b]" : "text-slate-400"}
                    />
                    <span
                      className={`text-sm ${activeType === label
                        ? "text-[#00588b] font-bold"
                        : "text-slate-600 font-normal"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold rounded-md px-2 py-0.5 min-w-[22px] text-center
                      ${activeType === label
                        ? "bg-[#00588b] text-white"
                        : "bg-slate-100 text-slate-400"
                      }`}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e2ecf4]">
            <h3 className="flex items-center gap-2 text-[#00588b] font-extrabold text-sm mb-4">
              <Layers size={15} className="text-[#00588b]" />
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              {SIDEBAR_LINKS.map(({ icon: Icon, label, colorClass }) => (
                <button
                  key={label}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-[#f0f6fb] transition w-full text-left"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
                    <Icon size={15} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{label}</span>
                  <ChevronRight size={13} className="text-slate-400 ml-auto" />
                </button>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-gradient-to-br from-[#00588b] to-[#003d63] rounded-2xl p-5 text-white shadow-lg">
            <GraduationCap size={26} className="text-[#ffb900] mb-2.5" />
            <h4 className="font-bold text-[0.92rem] mb-1.5">Need Guidance?</h4>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              Talk to our admissions counsellor for personalised guidance.
            </p>
            <button className="w-full py-2.5 bg-[#ffb900] text-[#7a5800] font-bold text-sm rounded-lg hover:brightness-105 transition">
              Book Free Counselling
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800">
                {activeType} Programmes
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {filtered.length} departments &middot; {totalSpecs} specialisations
              </p>
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search programmes…"
                className="pl-8 pr-4 h-10 border border-[#e2ecf4] rounded-xl text-sm text-slate-700 bg-white outline-none focus:border-[#00588b] w-52 transition"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((course) => {
              const Icon   = course.icon;
              const isHov  = hoveredCard === course.id;
              return (
                <div
                  key={course.id}
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`bg-white rounded-[18px] border-[1.5px] p-5 cursor-pointer relative overflow-hidden
                    transition-all duration-200
                    ${isHov ? "border-slate-300 shadow-xl -translate-y-1" : "border-[#e8f0f7] shadow-sm"}
                    ${course.borderHover}`}
                >
                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[18px] transition-opacity duration-200"
                    style={{
                      background: `linear-gradient(90deg, ${course.colorHex}, ${course.colorHex}55)`,
                      opacity: isHov ? 1 : 0.4,
                    }}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-[13px] flex items-center justify-center shrink-0 transition-transform duration-200
                          ${course.iconBg} ${isHov ? "scale-110" : "scale-100"}`}
                      >
                        <Icon size={23} style={{ color: course.colorHex }} />
                      </div>
                      <div>
                        <h3 className="text-[0.95rem] font-extrabold text-slate-800 leading-tight">
                          {course.title}
                        </h3>
                        <p className="text-[0.67rem] text-slate-400 mt-0.5 leading-snug">
                          {course.school}
                        </p>
                      </div>
                    </div>
                    {course.badge && (
                      <span className={`text-[0.63rem] font-bold px-2.5 py-0.5 rounded-md shrink-0 ${course.badge.cls}`}>
                        {course.badge.label}
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-100 mb-3" />

                  {/* Programme list */}
                  <div className="flex flex-col gap-1.5">
                    {course.programs.map((prog) => (
                      <div
                        key={prog}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-slate-700 font-medium transition-colors
                          ${isHov ? "bg-slate-50" : "bg-[#f8fafc]"}`}
                      >
                        <CheckCircle2 size={13} className={`shrink-0 ${course.textColor}`} />
                        <span>{prog}</span>
                        <ChevronRight
                          size={12}
                          className={`ml-auto transition-opacity duration-200 ${course.textColor}
                            ${isHov ? "opacity-100" : "opacity-0"}`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[0.68rem] text-slate-400 font-semibold">
                      {course.programs.length} Specialisation{course.programs.length > 1 ? "s" : ""}
                    </span>
                    <button
                      className={`text-xs font-bold px-3.5 py-1.5 rounded-lg border-[1.5px] transition-all duration-200
                        ${isHov
                          ? "text-white border-transparent"
                          : `${course.textColor} border-current bg-transparent`
                        }`}
                      style={isHov ? { background: course.colorHex, borderColor: course.colorHex } : {}}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Microscope size={44} className="mx-auto mb-3 text-slate-300" />
              <h3 className="text-base font-bold text-slate-500">No programmes found</h3>
              <p className="text-sm mt-1">Try a different keyword.</p>
            </div>
          )}

          {/* CTA Banner */}
          <div className="mt-8 bg-gradient-to-br from-[#00588b] to-[#003d63] rounded-2xl px-8 py-6 flex items-center justify-between shadow-xl overflow-hidden relative gap-4 flex-wrap">
            <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-[#ffb900]/10 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={14} className="text-[#ffb900]" />
                <span className="text-[0.72rem] font-extrabold text-[#ffb900] uppercase tracking-widest">
                  Admissions 2025–26 Open
                </span>
              </div>
              <h3 className="text-white font-extrabold text-lg">
                Start Your Academic Journey Today
              </h3>
              <p className="text-white/65 text-sm mt-1">
                Limited seats available. Apply before 30th June 2025.
              </p>
            </div>
            <div className="flex gap-3 relative flex-wrap">
              <button className="bg-[#ffb900] text-[#7a5800] font-extrabold text-sm px-6 py-3 rounded-xl hover:brightness-105 transition">
                Apply Now
              </button>
              <button className="bg-white/10 text-white font-bold text-sm px-6 py-3 rounded-xl border border-white/30 hover:bg-white/20 transition">
                Download Brochure
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}