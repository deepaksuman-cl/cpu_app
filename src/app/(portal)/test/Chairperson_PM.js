"use client";

import {
  Quote,
  GraduationCap,
  Building2,
  Globe,
  Star,
  Mail,
  Award,
  BookOpen,
  Users,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const chairpersonData = {
  greeting: "Dear Student,",
  welcome: "Welcome to Career Point University!",
  message:
    "In our efforts to deliver quality & career education, we put more emphasis on determining one-to-one contact and also be very much attentive to the vital needs of each student. Our faculty team relentlessly monitors the progress of every student and guides them accordingly on the way to achieve all success in their life and career ahead.",
  name: "Pramod Maheshwari",
  role: "Chairperson",
  organization: "Career Point University",
  image: "https://cpur.in/wp-content/uploads/2024/05/pm-sir_008-768x803.jpeg",
  qualifications: [
    { icon: "GraduationCap", degree: "B.Tech.", institute: "IIT Delhi" },
    { icon: "Building2", degree: "OPM", institute: "Harvard Business School" },
    { icon: "Globe", degree: "Harvard University", institute: "USA" },
  ],
  highlights: [
    { icon: "Users", label: "Students Mentored", value: "1M+" },
    { icon: "Award", label: "Years of Leadership", value: "30+" },
    { icon: "BookOpen", label: "Institutions Led", value: "10+" },
    { icon: "Star", label: "Industry Recognition", value: "50+" },
  ],
  vision:
    "Education is not just about degrees — it is about building character, capability, and the confidence to face the world.",
};

// ─── ICON MAP ─────────────────────────────────────────────────────────────────
const IconMap = { GraduationCap, Building2, Globe, Users, Award, BookOpen, Star };

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ChairpersonPage() {
  return (
    <main className="min-h-screen bg-[#f0f7fc] font-sans overflow-x-hidden">

      {/* ── PAGE HEADER ── */}
      <section className="relative bg-[#00588b] overflow-hidden py-20 px-6">
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#ffb900]/10" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full border-2 border-[#ffb900]/20 -translate-y-1/2" />
        {/* Grid dots */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#ffb900]/20 border border-[#ffb900]/40 text-[#ffb900] text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Leadership &amp; Vision
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-3 tracking-tight">
            Message from the{" "}
            <span className="text-[#ffb900]">Chairperson</span>
          </h1>
          <p className="text-white/60 text-base lg:text-lg max-w-xl mx-auto">
            Guiding Career Point University with three decades of passion for education
          </p>
          {/* Divider line */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-[#ffb900]/40" />
            <div className="w-2 h-2 rounded-full bg-[#ffb900]" />
            <div className="h-px w-16 bg-[#ffb900]/40" />
          </div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <section className="max-w-5xl mx-auto px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {chairpersonData.highlights.map((item, i) => {
            const Icon = IconMap[item.icon];
            return (
              <div key={i} className="bg-white rounded-2xl shadow-md border border-[#00588b]/10 p-5 flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#00588b]/10 flex items-center justify-center mb-2 group-hover:bg-[#ffb900]/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[#00588b] group-hover:text-[#ffb900] transition-colors duration-300" />
                </div>
                <p className="text-2xl font-black text-[#00588b]">{item.value}</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5 leading-tight">{item.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── MAIN MESSAGE CARD ── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl border border-[#00588b]/10 overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* ── LEFT: Photo Column ── */}
            <div className="relative lg:w-80 shrink-0 bg-gradient-to-b from-[#00588b] to-[#003d63] flex flex-col items-center pt-12 pb-8 px-6">
              {/* Decorative top ring */}
              <div className="absolute top-6 left-6 w-12 h-12 rounded-full border-2 border-[#ffb900]/30" />
              <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-[#ffb900]/40" />

              {/* Photo */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-2xl bg-[#ffb900] translate-x-2 translate-y-2" />
                <img
                  src={chairpersonData.image}
                  alt={chairpersonData.name}
                  className="relative w-52 h-60 object-cover object-top rounded-2xl shadow-2xl border-4 border-white"
                />
              </div>

              {/* Name & Role */}
              <h2 className="text-xl font-black text-white text-center leading-tight">
                {chairpersonData.name}
              </h2>
              <p className="text-[#ffb900] font-semibold text-sm mt-1">{chairpersonData.role}</p>
              <p className="text-white/60 text-xs mt-0.5 italic text-center">{chairpersonData.organization}</p>

              {/* Divider */}
              <div className="my-5 w-full h-px bg-white/15" />

              {/* Qualifications */}
              <div className="w-full space-y-3">
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest text-center mb-2">Qualifications</p>
                {chairpersonData.qualifications.map((q, i) => {
                  const Icon = IconMap[q.icon];
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#ffb900]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-[#ffb900]" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold leading-tight">{q.degree}</p>
                        <p className="text-white/55 text-xs leading-tight">{q.institute}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT: Message Column ── */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">

              {/* Giant decorative quote */}
              <div className="flex justify-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#00588b]/10 flex items-center justify-center">
                  <Quote className="w-7 h-7 text-[#00588b]" />
                </div>
              </div>

              {/* Greeting */}
              <p className="text-[#00588b] text-lg font-semibold mb-1 italic">
                {chairpersonData.greeting}
              </p>

              {/* Welcome headline */}
              <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-5 leading-tight">
                {chairpersonData.welcome}
              </h3>

              {/* Divider accent */}
              <div className="w-14 h-1 rounded-full bg-[#ffb900] mb-6" />

              {/* Message body */}
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
                {chairpersonData.message}
              </p>

              {/* Vision quote box */}
              <div className="relative bg-gradient-to-br from-[#00588b]/5 to-[#ffb900]/5 border-l-4 border-[#ffb900] rounded-r-2xl px-6 py-5 mb-8">
                <p className="text-[#00588b] font-semibold text-sm lg:text-base leading-relaxed italic">
                  &ldquo;{chairpersonData.vision}&rdquo;
                </p>
              </div>

              {/* Signature area */}
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[#00588b] text-lg font-black">{chairpersonData.name}</p>
                  <p className="text-gray-500 text-sm">
                    {chairpersonData.role} &mdash;{" "}
                    <span className="italic">{chairpersonData.organization}</span>
                  </p>
                  <p className="text-gray-400 text-xs mt-1 font-medium">
                    B.Tech., IIT Delhi &bull; OPM, Harvard Business School
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="relative bg-[#00588b] rounded-3xl px-8 py-10 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#ffb900]/10 rounded-full -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
          <div className="relative">
            <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-2">Join Us Today</p>
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
              Begin Your Journey at{" "}
              <span className="text-[#ffb900]">Career Point University</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <a
                href="https://www.cpur.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#ffb900] hover:bg-yellow-500 text-white font-bold px-7 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              >
                Explore University <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@cpur.in"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-xl border border-white/25 transition-all duration-300 text-sm"
              >
                <Mail className="w-4 h-4" /> Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

  
    </main>
  );
}