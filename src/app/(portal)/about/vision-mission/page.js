import {
  Target, Compass, Lightbulb, Heart, Star,
  BookOpen, Globe, Link2, Brain, Shuffle,
  TrendingUp, Award, Shield, Quote, CheckCircle2, Infinity,
} from "lucide-react";
import db from "@/models";

// ─── STATIC FALLBACK DATA ───────────────────────────────────────────────────
const staticPageData = {
  quote: {
    text: "We have embarked upon a mission that envisions a new dimension in learning.",
  },
  vision: {
    tag: "Vision",
    heading: "Where We Are Going",
    icon: "Compass",
    description:
      "To be a premier educational institution for graduate, and post-graduate studies and research activities by educating leaders of the future.",
  },
  mission: {
    tag: "Mission",
    heading: "Why We Are Here",
    icon: "Target",
    items: [
      {
        id: 1,
        icon: "Globe",
        text: "To promote global competitiveness by providing multiple opportunities for excellent education, applied research, academic innovation, and service to humanity.",
      },
      {
        id: 2,
        icon: "Link2",
        text: "To establish value-creating networks and linkages with corporations, industries, educational institutes, and universities of National and international importance.",
      },
      {
        id: 3,
        icon: "Brain",
        text: "To leverage the intellectual capital through research activities and creating knowledge integration platforms in India and abroad.",
      },
      {
        id: 4,
        icon: "Shuffle",
        text: "To synergize activities and institutes through infrastructure sharing, industry interface, faculty, and student exchange programs.",
      },
    ],
  },
  approach: {
    tag: "Approach",
    heading: "How We Achieve It",
    icon: "Lightbulb",
    description:
      "Pursue excellence and all else shall follow. We aspire to instill the right attitude, values, and vision that will prepare the students for a lifetime of continued learning and leadership in their chosen careers.",
  },
  values: {
    tag: "Values",
    heading: "We Believe In",
    icon: "Heart",
    items: [
      { id: 1, icon: "Star",       label: "Student Success" },
      { id: 2, icon: "BookOpen",   label: "Lifelong Learning" },
      { id: 3, icon: "Shield",     label: "Respect, Integrity, Trust, Honesty and Ethical Behaviour" },
      { id: 4, icon: "TrendingUp", label: "Continuous Quality Improvement" },
      { id: 5, icon: "Award",      label: "Excellence" },
    ],
  },
  heroChips: [
    { icon: "Globe",  label: "Global Reach" },
    { icon: "Award",  label: "Excellence Driven" },
    { icon: "Brain",  label: "Research Focused" },
  ],
};

// ─── ICON MAP ────────────────────────────────────────────────────────────────
const IconMap = {
  Compass, Target, Globe, Link2, Brain, Shuffle,
  Lightbulb, Heart, Star, BookOpen, Shield,
  TrendingUp, Award, CheckCircle2, Infinity,
};

const DynIcon = ({ name, size = 16, className = "" }) => {
  const Comp = IconMap[name];
  return Comp ? <Comp size={size} className={className} /> : null;
};

// ─── SECTION LABEL ───────────────────────────────────────────────────────────
function SectionLabel({ tag, icon }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#ffb900]/10 text-[#ffb900] border border-[#ffb900]/30">
      <DynIcon name={icon} size={12} />
      {tag}
    </span>
  );
}

// ─── QUOTE BANNER ────────────────────────────────────────────────────────────
function QuoteBanner({ quote }) {
  return (
    <div className="relative overflow-hidden rounded-3xl px-10 py-10 flex items-center gap-6 bg-gradient-to-br from-[#00588b] to-[#003f66]">
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#ffb900] opacity-10" />
      <div className="absolute bottom-0 left-1/3 w-24 h-24 rounded-full bg-white opacity-10" />
      <Quote size={52} className="text-[#ffb900] shrink-0 opacity-90" />
      <p className="text-white text-xl md:text-2xl font-semibold leading-snug ">
        {quote.text}
      </p>
    </div>
  );
}

// ─── VISION CARD ─────────────────────────────────────────────────────────────
function VisionCard({ data }) {
  return (
    <div className="relative rounded-3xl p-8 md:p-10 flex flex-col gap-5 overflow-hidden bg-[#f0f7ff] border-2 border-[#d0e8f7]">
      <DynIcon
        name={data.icon}
        size={120}
        className="absolute -bottom-5 -right-5 text-[#00588b] opacity-[0.06]"
      />
      <SectionLabel tag={data.tag} icon={data.icon} />
      <h2 className="text-3xl md:text-4xl font-black leading-tight text-[#00588b] ">
        {data.heading}
      </h2>
      <div className="w-16 h-1 rounded-full bg-[#ffb900]" />
      <p className="text-gray-600 text-lg leading-relaxed">{data.description}</p>
    </div>
  );
}

// ─── MISSION SECTION ─────────────────────────────────────────────────────────
function MissionSection({ data }) {
  return (
    <div className="rounded-3xl p-8 md:p-10 flex flex-col gap-7 bg-[#00588b]">
      <SectionLabel tag={data.tag} icon={data.icon} />
      <h2 className="text-3xl md:text-4xl font-black text-white ">
        {data.heading}
      </h2>
      <div className="w-16 h-1 rounded-full bg-[#ffb900]" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {data.items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-start rounded-2xl p-5 transition-transform hover:-translate-y-1 bg-white/[0.08] border border-white/[0.15]"
          >
            <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-[#ffb900]">
              <DynIcon name={item.icon} size={18} className="text-[#00588b]" />
            </div>
            <p className="text-white/90 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APPROACH CARD ───────────────────────────────────────────────────────────
function ApproachCard({ data }) {
  return (
    <div className="relative rounded-3xl p-8 md:p-10 overflow-hidden bg-gradient-to-br from-[#ffb900] to-[#e0a000]">
      <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-[#00588b] opacity-20" />
      <div className="absolute -top-4 right-10 w-20 h-20 rounded-full bg-[#00588b] opacity-20" />
      <div className="relative flex flex-col gap-5">
        <SectionLabel tag={data.tag} icon={data.icon} />
        <h2 className="text-3xl md:text-4xl font-black text-[#00588b] ">
          {data.heading}
        </h2>
        <div className="w-16 h-1 rounded-full bg-white/60" />
        <p className="text-gray-800 text-lg leading-relaxed font-medium">
          {data.description}
        </p>
      </div>
    </div>
  );
}

// ─── VALUES SECTION ──────────────────────────────────────────────────────────
function ValuesSection({ data }) {
  return (
    <div className="rounded-3xl p-8 md:p-10 flex flex-col gap-7 bg-[#f8fafd] border-2 border-[#d0e8f7]">
      <SectionLabel tag={data.tag} icon={data.icon} />
      <h2 className="text-3xl md:text-4xl font-black text-[#00588b] ">
        {data.heading}
      </h2>
      <div className="w-16 h-1 rounded-full bg-[#ffb900]" />

      <div className="flex flex-wrap gap-4">
        {data.items.map((item, i) =>
          i % 2 === 0 ? (
            <div
              key={item.id}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold transition-all hover:scale-105 cursor-default bg-[#00588b] text-white shadow-[0_4px_16px_rgba(0,88,139,0.25)]"
            >
              <DynIcon name={item.icon} size={18} className="text-[#ffb900]" />
              <span className="text-sm">{item.label}</span>
            </div>
          ) : (
            <div
              key={item.id}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold transition-all hover:scale-105 cursor-default bg-[#fff8e1] text-[#00588b] border-2 border-[#ffb900] shadow-[0_4px_16px_rgba(255,185,0,0.2)]"
            >
              <DynIcon name={item.icon} size={18} className="text-[#00588b]" />
              <span className="text-sm">{item.label}</span>
            </div>
          )
        )}
      </div>

      {/* Decorative accent bar */}
      <div className="flex gap-2 mt-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full flex-1 ${
              i % 2 === 0
                ? "bg-[#00588b] opacity-40"
                : "bg-[#ffb900] opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default async function VisionMissionPage() {
  // Fetch dynamic content from DB
  let pageData = staticPageData;
  try {
    const record = await db.AboutPageContent.findOne({ where: { section_key: 'vision_mission' } });
    if (record && record.content) {
      pageData = record.content;
    }
  } catch (error) {
    console.error("Failed to fetch Vision & Mission content:", error);
  }

  const { quote, vision, mission, approach, values, heroChips } = pageData;

  return (
    <div className="min-h-screen bg-[#e8f4fb] font-sans">

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#00588b] via-[#003f66] to-[#002a44]">

        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/3 bg-[#ffb900]/[0.12]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full translate-y-1/2 -translate-x-1/4 bg-white/[0.05]" />
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Hero content */}
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-[#ffb900]">
            <div className="w-8 h-0.5 bg-[#ffb900]" />
            Our Foundation
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-none ">
            Vision &amp; Mission
          </h1>

          <p className="text-white/60 text-lg max-w-xl mt-2">
            The pillars that guide our pursuit of educational excellence and global impact.
          </p>

          {/* Stat chips */}
          <div className="flex flex-wrap gap-3 mt-6">
            {heroChips.map((chip, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/[0.15]"
              >
                <DynIcon name={chip.icon} size={14} className="text-[#ffb900]" />
                {chip.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col gap-8">

        <QuoteBanner quote={quote} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <VisionCard data={vision} />
          <ApproachCard data={approach} />
        </div>

        <MissionSection data={mission} />

        <ValuesSection data={values} />

        {/* Footer accent */}
        <div className="flex items-center justify-center gap-3 py-4 opacity-50">
          <div className="h-px flex-1 bg-[#00588b]" />
          <DynIcon name="Star" size={16} className="text-[#ffb900]" />
          <div className="h-px flex-1 bg-[#00588b]" />
        </div>

      </div>
    </div>
  );
}