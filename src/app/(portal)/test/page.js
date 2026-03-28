"use client";

import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Home,
  House,
  MapPin,
  Star,
  Users
} from "lucide-react";

// ── Breadcrumb Data ──────────────────────────────────────────────────────────

const breadcrumbs = [
  { label: "Home", href: "/", icon: House },
  { label: "About Us", href: "/about" },
  { label: "Our Roots", href: null },
];

// ── Data ────────────────────────────────────────────────────────────────────

const heroData = {
  badge: "Providing Quality Education Since 1993",
  title: "Our Roots",
  subtitle: "Career Point Ltd",
  description:
    "Founded in May 1993 by Mr. Pramod Maheshwari, an IIT-Delhi alumnus, Career Point embarked on its mission in Kota to provide quality education to students preparing for competitive examinations. Starting with just 50 students focused on IIT-JEE preparation, Career Point has grown into a leading educational organization in India.",
  description2:
    "Today, Career Point offers a comprehensive educational experience, helping thousands of students from various backgrounds achieve their academic goals. Our programs cater to students pursuing formal education as well as those preparing for various entrance exams, ensuring a holistic approach to learning. With over 30 years of dedication, our management and faculty have continuously addressed the evolving challenges in education.",
  description3:
    "Career Point takes pride in the trust and respect earned from countless students since its inception. As a publicly listed company on the NSE and BSE in India, Career Point Limited remains committed to transparency, excellence, and educational innovation.",
};

const bannerText =
  `The University is sponsored by the Gopi Bai Foundation and supported by Career Point Ltd, an educational group known for its strong commitment to providing quality education. Career Point has a legacy of over 30 years. Its journey began in May 1993 in Kota with a mission to provide "Excellent Education and Training to Students from KG to PhD." The group supports two universities, five schools (KG to 12th), three residential school campuses, and numerous skill development and coaching institutions across India.`;

const stats = [
  { icon: Calendar, value: "30+", label: "Years of Excellence", desc: "Since 1993", gradient: "from-[#ffb900]/30 to-[#ff8c00]/10" },
  { icon: Users, value: "50K+", label: "Students Enrolled", desc: "Across India", gradient: "from-cyan-400/30 to-sky-400/10" },
  { icon: Building2, value: "2", label: "Universities", desc: "Kota & Hamirpur", gradient: "from-emerald-400/30 to-teal-400/10" },
  { icon: Star, value: "5", label: "Schools KG-12th", desc: "Pan India", gradient: "from-purple-400/30 to-pink-400/10" },
];

const tableHeaders = [
  { key: "school", label: "School Education", icon: BookOpen },
  { key: "higher", label: "Higher Education", icon: GraduationCap },
  { key: "coaching", label: "Coaching Institute", icon: Award },
  { key: "hostel", label: "CP Hostels", icon: Home },
];

const badgeRow = {
  school: "KG To K12",
  higher: "Diploma To Ph.D",
  coaching: "IIT, AIEEE, AIPMT",
  hostel: "Within/Outside Campus",
};

const institutions = [
  {
    school: { label: "Global Public School, Kota", href: "http://www.globalpublicschool.com/" },
    higher: { label: "CP University, Kota (Rajasthan)", href: "http://cpur.in/" },
    coaching: { label: "CAREER POINT Coaching, Kota", href: "http://www.careerpoint.ac.in/" },
    hostel: { label: "Ashirwad Hostel within Campus, Kota", href: null },
  },
  {
    school: { label: "Career Point Gurukul School, Kota", href: "http://www.jbsschool.in/" },
    higher: { label: "CP University, Hamirpur (H.P.)", href: "http://cpuh.in/" },
    coaching: {
      label: "CP Gurukul, Kota (Rajasthan)",
      sub: "Residential School with Integrated Coaching",
      href: "http://www.cpgurukul.com/",
    },
    hostel: { label: "Matruchhaya Hostel, Kota", href: null },
  },
  {
    school: { label: "Global Kids School, Kota", href: "http://cpwsjodhpur.com/" },
    higher: null,
    coaching: {
      label: "CP Gurukul, Mohali (Punjab)",
      sub: "Residential School with Integrated Coaching",
      href: "http://cpmohali.in/",
    },
    hostel: { label: "Gurukul, Kota Hostel within Campus", href: "http://www.cpgurukul.com/" },
  },
  {
    school: { label: "Career Point World School, Jodhpur", href: "http://www.cpwsjodhpur.com/" },
    higher: null,
    coaching: {
      label: "CP Gurukul, Rajsamand (Rajasthan)",
      sub: "Residential School with Integrated Coaching",
      href: "http://cprajsamand.in/",
    },
    hostel: {
      label: "Associated Hostels List",
      href: "http://careerpoint.ac.in/academicinfo/associatedhostel.asp",
    },
  },
  {
    school: { label: "Career Point World School, Bilaspur", href: "http://www.cpwsbilaspur.com/" },
    higher: null,
    coaching: null,
    hostel: null,
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white border-b border-gray-100 px-4 md:px-8 py-3"
    >
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {breadcrumbs.map((crumb, i) => {
          const isLast = i === breadcrumbs.length - 1;
          const Icon = crumb.icon;
          return (
            <li key={i} className="flex items-center gap-1">
              {/* Separator */}
              {i > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
              )}

              {isLast ? (
                /* Active / current page */
                <span className="flex items-center gap-1.5 font-semibold text-[#00588b] bg-[#00588b]/8 px-2.5 py-1 rounded-md">
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {crumb.label}
                </span>
              ) : (
                /* Clickable link */
                <a
                  href={crumb.href}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-[#00588b] transition-colors duration-150 px-1.5 py-1 rounded-md hover:bg-[#00588b]/5"
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {crumb.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function InstitutionLink({ data }) {
  if (!data) return <span className="text-gray-300 text-sm">—</span>;
  const inner = (
    <>
      <span className="font-medium text-sm leading-snug">{data.label}</span>
      {data.sub && (
        <span className="block text-xs text-gray-500 mt-0.5 italic">{data.sub}</span>
      )}
    </>
  );
  if (data.href) {
    return (
      <a
        href={data.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-1.5 text-[#00588b] hover:text-[#ffb900] transition-colors duration-200"
      >
        <ExternalLink className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
        <span>{inner}</span>
      </a>
    );
  }
  return <span className="text-gray-700 text-sm">{inner}</span>;
}

function StatCard({ icon: Icon, value, label, desc, gradient }) {
  return (
    <div className="relative overflow-hidden rounded-2xl group cursor-default">
      {/* Gradient glow bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

      {/* Glass card body */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col gap-2 transition-all duration-300 group-hover:border-white/40 group-hover:-translate-y-1.5 group-hover:shadow-2xl">

        {/* Icon row */}
        <div className="flex items-start justify-between mb-1">
          <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center group-hover:bg-[#ffb900]/25 group-hover:border-[#ffb900]/40 transition-all duration-300 shadow-inner">
            <Icon className="w-5 h-5 text-white/80 group-hover:text-[#ffb900] transition-colors duration-300" />
          </div>
          {/* Animated pulse dot */}
          <span className="relative flex h-2.5 w-2.5 mt-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb900] opacity-50" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffb900]" />
          </span>
        </div>

        {/* Big number */}
        <p className="text-5xl font-black text-white leading-none tracking-tighter drop-shadow">
          {value}
        </p>

        {/* Yellow underline bar */}
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-10 rounded-full bg-[#ffb900]" />
          <div className="h-0.5 w-4 rounded-full bg-[#ffb900]/30" />
        </div>

        {/* Label */}
        <p className="text-xs font-bold text-white uppercase tracking-widest leading-snug">
          {label}
        </p>

        {/* Sub desc badge */}
        <span className="self-start mt-1 text-[10px] font-semibold text-[#ffb900]/80 bg-[#ffb900]/10 border border-[#ffb900]/20 px-2 py-0.5 rounded-full uppercase tracking-wide">
          {desc}
        </span>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function OurRoots() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Breadcrumb (full width) ── */}
      <Breadcrumb />

      {/* ── Page Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ── Announcement Banner ── */}
        <div className="bg-white border-2 border-dashed border-[#00588b] rounded-xl p-5">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-bold text-[#00588b]">
              The University is sponsored by the Gopi Bai Foundation
            </span>{" "}
            and supported by Career Point Ltd, an educational group known for its strong commitment to
            providing quality education. Career Point has a legacy of over 30 years. Its journey began
            in May 1993 in Kota with a mission to provide{" "}
            <span className="font-semibold text-[#00588b]">
              &ldquo;Excellent Education and Training to Students from KG to PhD.&rdquo;
            </span>{" "}
            The group supports two universities, five schools (KG to 12th), three residential school
            campuses, and numerous skill development and coaching institutions across India.
          </p>
        </div>

        {/* ── Hero Section ── */}
        <section className="relative bg-gradient-to-br from-[#00588b] via-[#006fa8] to-[#004d7a] overflow-hidden rounded-3xl">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-[#ffb900]/10" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-white/5" />

          <div className="relative px-6 py-12 md:px-12 md:py-16 lg:flex lg:items-center lg:gap-12">
            {/* Text */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#ffb900]/20 border border-[#ffb900]/40 rounded-full px-4 py-1.5 mb-5">
                <Star className="w-3.5 h-3.5 text-[#ffb900]" />
                <span className="text-[#ffb900] text-xs font-semibold uppercase tracking-widest">
                  {heroData.badge}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {heroData.title}
                <span className="block text-[#ffb900]">{heroData.subtitle}</span>
              </h1>

              <div className="mt-6 space-y-3 text-white/80 text-sm leading-relaxed max-w-xl">
                <p>{heroData.description}</p>
                <p>{heroData.description2}</p>
                <p>{heroData.description3}</p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[#ffb900] text-sm font-semibold">
                <MapPin className="w-4 h-4" />
                <span>Kota, Rajasthan — Established 1993</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="mt-10 lg:mt-0 lg:w-96 grid grid-cols-2 gap-4 shrink-0">
              {stats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Institutions Table Section ── */}
        <section className="pb-6">
          {/* Section heading */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full bg-[#ffb900]" />
            <h2 className="text-2xl font-black text-[#00588b]">
              Career Point Education Institutions
            </h2>
            <ChevronRight className="w-5 h-5 text-[#00588b]/40" />
          </div>

          {/* Cards grid (mobile) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {institutions.map((row, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
              >
                {tableHeaders.map(({ key, label, icon: Icon }) =>
                  row[key] ? (
                    <div key={key} className="flex gap-3 px-4 py-3 border-b border-gray-50 last:border-0">
                      <div className="w-8 h-8 rounded-lg bg-[#00588b]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#00588b]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5 font-semibold">
                          {label}
                        </p>
                        <InstitutionLink data={row[key]} />
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            ))}
          </div>

          {/* Table (desktop) */}
          <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#00588b]">
                  {tableHeaders.map(({ key, label, icon: Icon }) => (
                    <th
                      key={key}
                      className="w-1/4 px-5 py-4 text-left text-white text-sm font-bold tracking-wide"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#ffb900]" />
                        {label}
                      </div>
                    </th>
                  ))}
                </tr>

                {/* Badge row */}
                <tr className="border-b-2 border-[#ffb900] bg-[#00588b]/5">
                  {tableHeaders.map(({ key }) => (
                    <td key={key} className="px-5 py-3">
                      <span className="inline-block bg-[#ffb900] text-[#00588b] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                        {badgeRow[key]}
                      </span>
                    </td>
                  ))}
                </tr>
              </thead>

              <tbody>
                {institutions.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-[#00588b]/4 transition-colors duration-150"
                  >
                    {tableHeaders.map(({ key }) => (
                      <td key={key} className="px-5 py-4 align-top">
                        <InstitutionLink data={row[key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
    
        </section>

      </div>{/* end container */}
    </div>
  );
}