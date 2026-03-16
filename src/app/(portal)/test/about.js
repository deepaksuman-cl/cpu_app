"use client";

import { MapPin, Calendar, Award, BookOpen, Users, GraduationCap, CheckCircle2, ExternalLink, Building2, Star, ChevronRight } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const aboutData = {
  group: {
    tagline: "Three Decades of Excellence",
    heading: "Shaping Futures,\nBuilding Excellence",
    description:
      "Career Point Group has been developing great minds for more than three decades. Continuing the tradition of excellence in delivering quality education and to push forward the boundaries of knowledge to positively impact people's lives, we started universities at Kota and Hamirpur.",
    highlight:
      "Our Universities are having state-of-the-art infrastructure, best academic facilities and experienced faculty to help you to realise your full potential. We follow time-tested internationally acclaimed credit based system. All our courses are designed to provide you excellent learning, requisite expertise, rewarding qualification, practical exposure, hands-on learning and desired skills for a successful career.",
  },
  stats: [
    { icon: "GraduationCap", label: "Years of Excellence", value: "30+" },
    { icon: "Users", label: "Students Enrolled", value: "50K+" },
    { icon: "BookOpen", label: "Programmes Offered", value: "200+" },
    { icon: "Award", label: "Industry Partners", value: "500+" },
  ],
  universities: [
    {
      id: "kota",
      name: "Career Point University",
      location: "Kota (Rajasthan)",
      established: "2012",
      campus: "50 Acres",
      image: "https://cpur.in/wp-content/uploads/2022/04/CPU-Kota-1024x533.png",
      website: "www.cpur.in",
      websiteUrl: "https://www.cpur.in",
      description:
        "Campus is spread over 50 acres and situated in the education city of Kota in the state of Rajasthan. It was established in 2012 by the Rajasthan State Legislature Council 'Career Point University Act'. It is the government-recognized university with the right to confer degrees as per sec 2 (f) and 22(f) of the UGC Act, 1956.",
      highlights: [
        "Government Recognized University",
        "UGC Act Sec 2(f) & 22(f) Approved",
        "State-of-the-art Infrastructure",
        "Situated in Education Hub of India",
      ],
      color: "kota",
    },
    {
      id: "hamirpur",
      name: "Career Point University",
      location: "Hamirpur (Himachal Pradesh)",
      established: "2012",
      campus: "30 Acres",
      image: "https://cpur.in/wp-content/uploads/2022/04/cpu-hamirpur.jpg",
      website: "www.cpuh.in",
      websiteUrl: "https://www.cpuh.in",
      description:
        "Campus is spread over 30 acres, surrounded by the lower Himalayas at Hamirpur district in the state of Himachal Pradesh, India. It was established in 2012 by the Himachal Pradesh State Legislature under 'Career Point University Act'. It is the government-recognized university with the right to confer a degree as per sections 2(f) and 22(f) of the UGC Act, 1956.",
      highlights: [
        "Government Recognized University",
        "UGC Act Sec 2(f) & 22(f) Approved",
        "Surrounded by Lower Himalayas",
        "Scenic & Peaceful Learning Environment",
      ],
      color: "hamirpur",
    },
  ],
  accreditation:
    "Both universities are included in the list of Indian Universities maintained by the University Grant Commission (UGC) and the Association of Indian Universities (AIU)",
};

// ─── ICON MAP ─────────────────────────────────────────────────────────────────
const IconMap = { GraduationCap, Users, BookOpen, Award };

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f9fc] font-sans overflow-x-hidden">

      {/* ── HERO SECTION ── */}
      <section className="relative bg-[#00588b] overflow-hidden">
        {/* Decorative geometric shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffb900]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-[#ffb900]/20 rounded-full -translate-y-1/2" />
        <div className="absolute top-8 left-8 w-4 h-4 bg-[#ffb900] rounded-full opacity-60" />
        <div className="absolute bottom-12 right-1/4 w-3 h-3 bg-[#ffb900] rounded-full opacity-40" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#ffb900]/20 border border-[#ffb900]/40 text-[#ffb900] text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
              <Star className="w-3.5 h-3.5 fill-current" />
              {aboutData.group.tagline}
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
              {aboutData.group.heading.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="text-[#ffb900]">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p className="text-white/75 text-lg leading-relaxed max-w-2xl">
              {aboutData.group.description}
            </p>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f5f9fc]"
          style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative -mt-1 py-0">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-8">
            {aboutData.stats.map((stat, i) => {
              const Icon = IconMap[stat.icon];
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border border-[#00588b]/10 p-6 flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#00588b]/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#ffb900]/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#00588b] group-hover:text-[#ffb900] transition-colors duration-300" />
                  </div>
                  <p className="text-3xl font-black text-[#00588b]">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium mt-1 leading-tight">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHT STRIP ── */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="relative bg-gradient-to-br from-[#00588b] to-[#003d63] rounded-3xl p-8 lg:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffb900]/10 rounded-full -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
          <div className="relative flex gap-4 items-start">
            <div className="shrink-0 w-1 self-stretch bg-[#ffb900] rounded-full" />
            <p className="text-white/90 text-lg lg:text-xl leading-relaxed font-light italic">
              "{aboutData.group.highlight}"
            </p>
          </div>
        </div>
      </section>

      {/* ── UNIVERSITIES SECTION ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20 space-y-16">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-[#00588b] mb-3">
            Our <span className="text-[#ffb900]">Universities</span>
          </h2>
          <p className="text-gray-500 text-lg">Two campuses. One mission. Infinite possibilities.</p>
          <div className="mt-4 mx-auto w-24 h-1 rounded-full bg-[#ffb900]" />
        </div>

        {aboutData.universities.map((uni, idx) => (
          <UniversityCard key={uni.id} uni={uni} reverse={idx % 2 !== 0} />
        ))}
      </section>

      {/* ── ACCREDITATION BANNER ── */}
      <section className="bg-[#00588b] py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 bg-[#ffb900] rounded-2xl rotate-12 flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8 text-white -rotate-12" />
            </div>
          </div>
          <p className="text-white text-lg lg:text-xl font-semibold leading-relaxed">
            {aboutData.accreditation}
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <span className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20">
              <CheckCircle2 className="w-4 h-4 text-[#ffb900]" /> UGC Recognized
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20">
              <CheckCircle2 className="w-4 h-4 text-[#ffb900]" /> AIU Listed
            </span>
          </div>
        </div>
      </section>

  
    </main>
  );
}

// ─── UNIVERSITY CARD ─────────────────────────────────────────────────────────
function UniversityCard({ uni, reverse }) {
  return (
    <div className={`flex flex-col lg:flex-row ${reverse ? "lg:flex-row-reverse" : ""} gap-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-[#00588b]/10 group`}>

      {/* Image Side */}
      <div className="relative lg:w-1/2 h-64 lg:h-auto overflow-hidden">
        <img
          src={uni.image}
          alt={`${uni.name}, ${uni.location}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Overlay gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-[#00588b]/80 via-transparent to-transparent`} />

        {/* Campus badge on image */}
        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-[#ffb900] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
            <MapPin className="w-3 h-3" />
            {uni.location}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
            <Building2 className="w-3 h-3" />
            {uni.campus} Campus
          </span>
        </div>
      </div>

      {/* Content Side */}
      <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
        {/* Est. year tag */}
        <div className="inline-flex items-center gap-2 text-[#ffb900] text-xs font-bold uppercase tracking-widest mb-3">
          <Calendar className="w-3.5 h-3.5" />
          Est. {uni.established}
        </div>

        {/* Name */}
        <h3 className="text-3xl lg:text-4xl font-black text-[#00588b] leading-tight mb-1">
          {uni.name}
        </h3>
        <p className="text-xl font-semibold text-[#ffb900] mb-4">{uni.location}</p>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-[#ffb900] rounded-full mb-5" />

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {uni.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-7">
          {uni.highlights.map((point, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-[#00588b] shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={uni.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start bg-[#00588b] hover:bg-[#ffb900] text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group/btn"
        >
          <ExternalLink className="w-4 h-4" />
          Visit {uni.website}
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}