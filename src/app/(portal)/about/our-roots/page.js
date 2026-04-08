import {
  BookOpen,
  GraduationCap,
  Building2,
  Home,
  MapPin,
  Calendar,
  Users,
  Award,
  ExternalLink,
  ChevronRight,
  Star,
  Globe,
  House,
} from "lucide-react";
import { parseEditorContent } from "@/lib/utils/editorParser";
import db from "@/models";

// ── Static Fallback Data ────────────────────────────────────────────────────
const staticHeroData = {
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

const staticBannerText =
  `The University is sponsored by the Gopi Bai Foundation and supported by Career Point Ltd, an educational group known for its strong commitment to providing quality education. Career Point has a legacy of over 30 years. Its journey began in May 1993 in Kota with a mission to provide "Excellent Education and Training to Students from KG to PhD." The group supports two universities, five schools (KG to 12th), three residential school campuses, and numerous skill development and coaching institutions across India.`;

const staticStats = [
  { icon: "Calendar", value: "30+", label: "Years of Excellence", desc: "Since 1993", gradient: "from-[#ffb900]/30 to-[#ff8c00]/10" },
  { icon: "Users", value: "50K+", label: "Students Enrolled", desc: "Across India", gradient: "from-cyan-400/30 to-sky-400/10" },
  { icon: "Building2", value: "2", label: "Universities", desc: "Kota & Hamirpur", gradient: "from-emerald-400/30 to-teal-400/10" },
  { icon: "Star", value: "5", label: "Schools KG-12th", desc: "Pan India", gradient: "from-purple-400/30 to-pink-400/10" },
];

const IconMap = { Calendar, Users, Building2, Star };

// ── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ icon: IconKey, value, label, desc, gradient }) {
  const Icon = IconMap[IconKey] || Star;
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

export default async function OurRoots() {
  // Fetch dynamic content from DB
  let heroData = staticHeroData;
  let bannerText = staticBannerText;
  let stats = staticStats;
  let institutions_html = "";
  let useProse = true; // Default to true since that's our goal

  try {
    const record = await db.AboutPageContent.findOne({ where: { section_key: 'our_roots' } });
    if (record && record.content) {
      heroData = record.content.hero || staticHeroData;
      bannerText = record.content.bannerText || staticBannerText;
      stats = record.content.stats || staticStats;
      institutions_html = parseEditorContent(record.content.institutions_html) || "";
      useProse = record.content.useProse !== undefined ? record.content.useProse : true;
    }
  } catch (error) {
    console.error("Failed to fetch Our Roots content:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Page Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ── Announcement Banner ── */}
        <div className="bg-white border-2 border-dashed border-[#00588b] rounded-xl p-5">
          <p className="text-sm text-gray-700 leading-relaxed">
            {bannerText.includes("sponsored by the Gopi Bai Foundation") ? (
              <>
                <span className="font-bold text-[#00588b]">The University is sponsored by the Gopi Bai Foundation</span>{" "}
                and supported by Career Point Ltd, an educational group known for its strong commitment to providing quality education. Career Point has a legacy of over 30 years. Its journey began in May 1993 in Kota with a mission to provide{" "}
                <span className="font-semibold text-[#00588b]">&ldquo;Excellent Education and Training to Students from KG to PhD.&rdquo;</span>{" "}
                The group supports two universities, five schools (KG to 12th), three residential school campuses, and numerous skill development and coaching institutions across India.
              </>
            ) : bannerText}
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

          {/* Dynamic Rich Text Content */}
          {institutions_html ? (
            <div className="">
              <div 
                className={`${useProse ? 'university-prose' : 'prose max-w-none prose-sm md:prose-base'} 
                  prose-headings:text-[#00588b] prose-headings:font-black
                  prose-a:text-[#00588b] prose-a:no-underline hover:prose-a:text-[#ffb900]
                  prose-strong:text-gray-900`}
                dangerouslySetInnerHTML={{ __html: institutions_html }} 
              />
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border-2 border-dashed border-gray-100 italic">
               Institution data will be updated soon.
            </div>
          )}
    
        </section>

      </div>{/* end container */}
    </div>
  );
}