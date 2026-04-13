'use client';

import React, { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import RichTextRenderer from '@/components/ui/RichTextRenderer';
const GraduationCap = LucideIcons.GraduationCap || LucideIcons.School;
const BookOpen = LucideIcons.BookOpen || LucideIcons.Book;
const ICON_MAP = {
  Briefcase: LucideIcons.Briefcase,
  Bot: LucideIcons.Bot,
  TrendingUp: LucideIcons.TrendingUp,
  FolderOpen: LucideIcons.FolderOpen,
  Presentation: LucideIcons.Presentation,
  Book: LucideIcons.Book,
  Lightbulb: LucideIcons.Lightbulb,
  Globe: LucideIcons.Globe,
  ThumbsDown: LucideIcons.ThumbsDown,
  ThumbsUp: LucideIcons.ThumbsUp,
  HelpCircle: LucideIcons.CircleHelp || LucideIcons.HelpCircle,
  CheckCircle2: LucideIcons.CircleCheckBig || LucideIcons.CheckCircle2 || LucideIcons.CheckCircle,
  XCircle: LucideIcons.CircleX || LucideIcons.XCircle
};
const Briefcase = LucideIcons.Briefcase || LucideIcons.Suitcase;
const ChevronDown = LucideIcons.ChevronDown || LucideIcons.ArrowDown;
const Info = LucideIcons.Info || LucideIcons.CircleHelp;
const Zap = LucideIcons.Zap || LucideIcons.Bolt;
const Trophy = LucideIcons.Trophy || LucideIcons.Award;
const Building2 = LucideIcons.Building2 || LucideIcons.Building || LucideIcons.Landmark;

const IndianRupee = LucideIcons.IndianRupee || LucideIcons.Rupee || LucideIcons.CircleDollarSign;

// Pill component for highlighted text
const HighlightPill = ({ children }) => (
  <span className="inline-block bg-[#f1bd0e]/15 border border-[#f1bd0e]/45 text-[#8a6300] font-[600] text-[0.77rem] px-[9px] py-[2px] rounded-[5px] mx-[2px]">
    {children}
  </span>
);

const BulletItem = ({ children }) => (
  <li className="flex items-start gap-[10px] text-[#555555]">
    <div className="w-[7px] h-[7px] rounded-full bg-[#f1bd0e] shrink-0 mt-[8px]"></div>
    <span>{children}</span>
  </li>
);

const InfoBox = ({ icon: Icon, children }) => (
  <div className="bg-[#0c4088]/5 border-l-[3px] border-[#0c4088] rounded-r-[8px] p-[10px_15px] mt-[12px] text-[0.95rem] text-[#2a4080] flex items-start gap-[10px]">
    <Icon className="w-5 h-5 text-[#0c4088] shrink-0 mt-[2px]" />
    <div>{children}</div>
  </div>
);

// Icon mapping for tabs
const TAB_ICONS = {
  admission: GraduationCap,
  curriculum: BookOpen,
  placements: Briefcase,
  fees: IndianRupee,
  campus: Building2
};

// Hardcoded data content for FAQ answers (since JSON doesn't support JSX)
const FAQ_ANSWERS = {
  a1: (
    <>
      You must have completed <strong>Class 10+2 with Physics, Chemistry & Mathematics (PCM)</strong> and secured a minimum of <HighlightPill>50% marks</HighlightPill>. Admission is competitive — only the <strong>top 20–25% of applicants</strong> are selected via CPUEST and a Personal Interview.
    </>
  ),
  a2: (
    <>
      CPUEST stands for <strong>Career Point Scholastic Aptitude Test</strong>. It covers three areas:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem>Mathematics (Class 11–12 level)</BulletItem>
        <BulletItem>Physics (Class 11–12 level)</BulletItem>
        <BulletItem>Chemistry (Class 11–12 level)</BulletItem>
      </ul>
      The test can be taken <strong>online or at the Kota campus</strong>. It is scheduled for <HighlightPill>28 March 2026</HighlightPill>. Brush up on your Class 12 Maths, Physics, Chemistry and practice aptitude questions to prepare.
    </>
  ),
  a3: (
    <>
      <ul className="mt-[6px] flex flex-col gap-[6px]">
        <BulletItem><strong>Applications Open:</strong> March 2026</BulletItem>
        <BulletItem><strong>Application Deadline:</strong> 27 March 2026</BulletItem>
        <BulletItem><strong>CPUEST Date:</strong> 28 March 2026</BulletItem>
        <BulletItem><strong>Personal Interviews:</strong> Shortly after CPUEST results</BulletItem>
        <BulletItem><strong>Batch Begins:</strong> July 2026</BulletItem>
      </ul>
      <InfoBox icon={Zap}>Seats are limited and selection is competitive. Apply early to secure your spot.</InfoBox>
    </>
  ),
  a4: (
    <>
      <ul className="mt-[6px] flex flex-col gap-[6px]">
        <BulletItem><strong>Step 1 — Register & Apply Online:</strong> Submit your application with 10+2 marksheet and PCM details.</BulletItem>
        <BulletItem><strong>Step 2 — Appear for CPUEST:</strong> Take the aptitude test online or at campus (Maths, Chemistry, Physics).</BulletItem>
        <BulletItem><strong>Step 3 — Personal Interview:</strong> Faculty panel interview testing problem-solving ability and passion for technology.</BulletItem>
        <BulletItem><strong>Step 4 — Counselling & Seat Confirmation:</strong> One-on-one session to submit documents and confirm your seat.</BulletItem>
      </ul>
    </>
  ),
  a5: (
    <>
      Yes, absolutely. The B.Tech degree from Career Point University is fully recognised:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem><HighlightPill>UGC Recognised</HighlightPill> — valid for all government and private sector roles</BulletItem>
        <BulletItem><HighlightPill>AICTE Approved</HighlightPill> — the national regulator for technical education</BulletItem>
        <BulletItem><HighlightPill>NAAC Accredited</HighlightPill> — quality-accredited university</BulletItem>
      </ul>
      It carries the same weight as any other UGC-recognised B.Tech for jobs, higher studies, GATE, and more.
    </>
  ),
  c1: (
    <>
      AI begins from <strong>Semester 1, Day 1</strong> — not Year 4. You'll use <HighlightPill>12+ AI tools</HighlightPill> across the programme, including:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem>Year 1: ChatGPT, Notion AI</BulletItem>
        <BulletItem>Year 2: OpenAI API, Google Gemini API, Hugging Face, LangChain</BulletItem>
        <BulletItem>Year 3: TensorFlow, PyTorch, Stable Diffusion</BulletItem>
        <BulletItem>Year 4: Claude AI, Cursor, Vercel AI SDK</BulletItem>
      </ul>
      Every tool is used inside <strong>real shipped projects</strong> — not just mentioned in a lecture.
    </>
  ),
  c2: (
    <>
      You will ship <HighlightPill>15 portfolio-grade projects</HighlightPill> — all deployed and recruiter-ready. Highlights include:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem>Personal Portfolio Website, E-Commerce Page, AI Quiz App (Year 1)</BulletItem>
        <BulletItem>Social Media Platform, AI Chatbot, GenAI-Powered CRM (Year 2)</BulletItem>
        <BulletItem>AI Image Generator, Video Streaming Platform, ML Deploy Pipeline (Year 3)</BulletItem>
        <BulletItem>AI Code Assistant, Job Portal with AI Resume Match, Industry Capstone (Year 4)</BulletItem>
      </ul>
      <InfoBox icon={BookOpen}>You graduate with an active GitHub portfolio of 15 live, deployed applications.</InfoBox>
    </>
  ),
  c3: (
    <>
      The curriculum is built and taught by <strong>industry practitioners</strong> from companies like <HighlightPill>Google</HighlightPill>, <HighlightPill>Amazon</HighlightPill>, and <HighlightPill>Microsoft</HighlightPill> — not just academics with textbooks. You'll also have <strong>weekly sessions from MAANG engineers</strong>, CTOs, VCs, and startup founders throughout the programme.
    </>
  ),
  c4: (
    <>
      Each year has a clear theme with <strong>29 subjects across 8 semesters</strong>:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem><strong>Year 1 — Build:</strong> C++, HTML/CSS/JS, React, DSA, Discrete Maths</BulletItem>
        <BulletItem><strong>Year 2 — Develop:</strong> Node.js, MongoDB, Java, AI Engineering with LLMs, APIs</BulletItem>
        <BulletItem><strong>Year 3 — Specialize:</strong> ML, NLP, Computer Vision, AWS, System Design + 6-month Internship</BulletItem>
        <BulletItem><strong>Year 4 — Launch:</strong> AI Product Development, Placement Bootcamp, Industry Capstone</BulletItem>
      </ul>
    </>
  ),
  p1: (
    <>
      <ul className="mt-[6px] flex flex-col gap-[6px]">
        <BulletItem><HighlightPill>93%</HighlightPill> of 2nd year students secured paid internships</BulletItem>
        <BulletItem>Average internship stipend: <HighlightPill>₹25,000/month</HighlightPill></BulletItem>
        <BulletItem>6-month formal internship in Year 3 with a partner company</BulletItem>
        <BulletItem><HighlightPill>1000+</HighlightPill> hiring partner companies in the network</BulletItem>
      </ul>
      <InfoBox icon={Trophy}>Compare this to Tier 1 colleges where fewer than 50% of students receive an internship by their 3rd year.</InfoBox>
    </>
  ),
  p2: (
    <>
      Career prep starts from <strong>Week 1</strong> — not Year 4:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem>LeetCode & GitHub profiles set up at orientation</BulletItem>
        <BulletItem>Weekly coding sessions via AlgoSphere club from Semester 1</BulletItem>
        <BulletItem>MAANG engineers deliver weekly sessions in Year 2</BulletItem>
        <BulletItem>Intensive DSA bootcamp + 6-month internship in Year 3</BulletItem>
        <BulletItem>Mock drives, system design prep, company-specific coaching in Year 4</BulletItem>
      </ul>
    </>
  ),
  p3: (
    <>
      Yes. CPU has a strong entrepreneurship ecosystem:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem><HighlightPill>₹1 Crore StartX Fund</HighlightPill> for student startups</BulletItem>
        <BulletItem>Expert mentors, VCs, and startup founders on campus regularly</BulletItem>
        <BulletItem>Participation supported in GSOC, ICPC, SIH hackathons</BulletItem>
        <BulletItem>The AI Foundry — innovation arena for demo days and ideation</BulletItem>
        <BulletItem>Idea Lab entrepreneurship club for like-minded builders</BulletItem>
      </ul>
    </>
  ),
  p4: (
    <>
      Students are guided to earn globally recognised certifications during Year 3–4, including:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem>AWS / Google Cloud certifications</BulletItem>
        <BulletItem>DeepLearning.AI specialisations</BulletItem>
        <BulletItem>MLOps and DevOps credentials</BulletItem>
      </ul>
      These complement the B.Tech degree and significantly strengthen your resume for MAANG-level roles.
    </>
  ),
  f1: (
    <>
      CPU offers merit-based scholarships to make quality education accessible:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem><strong>Merit Excellence Scholarship</strong> — Up to <HighlightPill>100% tuition</HighlightPill> (based on CPUEST score & interview)</BulletItem>
        <BulletItem><strong>Bright Minds Scholarship</strong> — Up to <HighlightPill>50% tuition</HighlightPill> (based on Class 12 marks or JEE Mains score)</BulletItem>
        <BulletItem><strong>Women in Tech Scholarship</strong> — Up to <HighlightPill>30% tuition</HighlightPill> (high-potential female students)</BulletItem>
        <BulletItem><strong>CP Alumni Benefit</strong> — Special <HighlightPill>fee waiver</HighlightPill> for wards & siblings of CP alumni</BulletItem>
      </ul>
      <InfoBox icon={Info}>Perform well in CPUEST to maximise your scholarship eligibility. The better you score, the higher the scholarship.</InfoBox>
    </>
  ),
  f2: (
    <>
      Yes. CPU has official finance partnerships with leading institutions:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem><strong>Axis Bank</strong> — up to 100% loan coverage</BulletItem>
        <BulletItem><strong>IDFC First Bank</strong> — flexible repayment options</BulletItem>
        <BulletItem><strong>Propelld</strong> — education-focused fintech loans</BulletItem>
      </ul>
      Our admission counsellors can guide you through the loan process during the counselling session.
    </>
  ),
  f3: (
    <>
      Yes. Fees are structured semester-wise, so you pay in instalments over 8 semesters rather than the full amount upfront. Speak to our admission counsellor for the exact fee schedule and instalment plan — contact us at <strong>info@cpuniverse.in</strong> or call <strong>+91-9079134713</strong>.
    </>
  ),
  ca1: (
    <>
      Yes. Campus accommodation at CP Tower, Kota includes:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem>AC rooms with high-speed Wi-Fi</BulletItem>
        <BulletItem>Quality food (mess facility)</BulletItem>
        <BulletItem>24/7 power backup</BulletItem>
        <BulletItem>CCTV security throughout</BulletItem>
        <BulletItem>On-campus medical facility</BulletItem>
      </ul>
    </>
  ),
  ca2: (
    <>
      CPU is built for builders:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem><strong>24/7 AI Coding Hub</strong> — open round the clock at CP Tower to build, debug and ship at any hour</BulletItem>
        <BulletItem><strong>AI Smart Classrooms</strong> — high-speed Wi-Fi, digital screens, state-of-the-art AV systems</BulletItem>
        <BulletItem><strong>The AI Foundry</strong> — innovation arena for hackathons, demo days and collaboration</BulletItem>
      </ul>
    </>
  ),
  ca3: (
    <>
      Campus life is vibrant with 5 active student clubs:
      <ul className="mt-[10px] flex flex-col gap-[6px]">
        <BulletItem><strong>AlgoSphere</strong> — Weekly coding sessions & competitive programming</BulletItem>
        <BulletItem><strong>HackTheWeb</strong> — AI & Web Dev hackathons</BulletItem>
        <BulletItem><strong>Idea Lab</strong> — Entrepreneurship, startup ideation</BulletItem>
        <BulletItem><strong>StageLab</strong> — Cultural events & performing arts</BulletItem>
        <BulletItem><strong>StriveX</strong> — Sports & fitness</BulletItem>
      </ul>
    </>
  ),
  ca4: (
    <>
      The campus is at <strong>CP Tower, Kota, Rajasthan 324005</strong>. Kota is India's education capital — known for producing top engineers and IITians for over 30 years. Career Point has been at the heart of Kota's education ecosystem since 1993, giving you access to a deeply competitive, high-performance academic environment.
    </>
  )
};

// Raw question data (same as original, but keyed for dynamic lookup)
const RAW_FAQ_DATA = {
  admission: [
    { id: 'a1', q: 'What are the eligibility criteria for admission?' },
    { id: 'a2', q: 'What is the CPUEST and how do I prepare for it?' },
    { id: 'a3', q: 'What are the key dates for Batch 2026–27?' },
    { id: 'a4', q: 'What is the step-by-step admission process?' },
    { id: 'a5', q: 'Is the B.Tech degree recognised? Will employers accept it?' }
  ],
  curriculum: [
    { id: 'c1', q: 'When does AI learning begin — and what tools will I use?' },
    { id: 'c2', q: 'What real projects will I build during the 4 years?' },
    { id: 'c3', q: 'Who teaches the courses? Are they working professionals?' },
    { id: 'c4', q: 'What is the structure of the 4-year programme?' }
  ],
  placements: [
    { id: 'p1', q: 'What is the internship and placement track record?' },
    { id: 'p2', q: 'When does career preparation actually start?' },
    { id: 'p3', q: 'Is there support for entrepreneurship and startups?' },
    { id: 'p4', q: 'What certifications can I earn alongside the degree?' }
  ],
  fees: [
    { id: 'f1', q: 'What scholarships are available and how do I get them?' },
    { id: 'f2', q: 'Are education loans available? Which banks support CPU?' },
    { id: 'f3', q: 'Can I pay fees in instalments?' }
  ],
  campus: [
    { id: 'ca1', q: 'Is hostel accommodation available on campus?' },
    { id: 'ca2', q: 'What tech infrastructure is available for students?' },
    { id: 'ca3', q: 'Are there student clubs and extracurricular activities?' },
    { id: 'ca4', q: 'Where is the campus located and why Kota?' }
  ]
};

const TABS_CONFIG = [
  { id: 'admission', label: 'Admission' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'placements', label: 'Placements' },
  { id: 'fees', label: 'Fees & Scholarships' },
  { id: 'campus', label: 'Campus & Life' },
];

export default function FAQ({ data }) {
  if (!data) return null;
  const { title, subtitle, data: dynamicFaqData = {} } = data || {};

  // Check if we have dynamic data. If not, we might be using old visibility toggles.
  const hasDynamicData = dynamicFaqData && Object.keys(dynamicFaqData).length > 0;
  
  // Prepare Categories/Tabs
  const categories = useMemo(() => {
    if (hasDynamicData) {
      return Object.keys(dynamicFaqData).map(cat => ({ id: cat, label: cat }));
    }
    // Fallback to filtering hardcoded TABS_CONFIG based on 'categories' visibility array
    const visibleCats = data.categories || [];
    return TABS_CONFIG.filter(t => visibleCats.includes(t.id));
  }, [hasDynamicData, dynamicFaqData, data.categories]);

  // Handle Initial State
  const [activeTab, setActiveTab] = useState(() => {
    if (categories.length > 0) return categories[0].id;
    return 'curriculum';
  });

  const [openQuestionId, setOpenQuestionId] = useState(() => {
    const firstCatId = categories.length > 0 ? categories[0].id : 'curriculum';
    const sourceData = hasDynamicData ? dynamicFaqData : RAW_FAQ_DATA;
    if (sourceData[firstCatId] && sourceData[firstCatId].length > 0) {
      return sourceData[firstCatId][0].id;
    }
    return null;
  });

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const sourceData = hasDynamicData ? dynamicFaqData : RAW_FAQ_DATA;
    if (sourceData[tabId] && sourceData[tabId].length > 0) {
      setOpenQuestionId(sourceData[tabId][0].id);
    } else {
      setOpenQuestionId(null);
    }
  };

  const toggleQuestion = (qId) => {
    setOpenQuestionId(openQuestionId === qId ? null : qId);
  };

  return (
    <section className="py-[60px] bg-[#f8f9fa] font-sans w-full" id="faq">
      <div className="max-w-[800px] mx-auto px-[20px]">
        <div className="text-center mb-[40px]">
          <h2 className="text-[2.2rem] md:text-[2.6rem] font-[800] text-[#0c4088] mb-[12px] leading-tight">
            {title}
          </h2>
          <p className="text-[1.05rem] text-[#333333] font-[300]">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-[8px] mb-[35px]">
          {categories.map((tab) => {
            const Icon = TAB_ICONS[tab.id] || LucideIcons.CircleHelp || LucideIcons.HelpCircle || LucideIcons.Info;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`inline-flex items-center gap-[6px] px-[18px] py-[8px] rounded-[30px] font-[600] text-[0.85rem] transition-all duration-200 border-[1.5px] whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#0c4088] border-[#0c4088] text-white shadow-[0_5px_16px_rgba(12,64,136,0.28)]' 
                    : 'bg-white border-[#e5e7eb] text-[#6b7280] hover:border-[#0c4088] hover:text-[#0c4088]'
                }`}
              >
                {Icon && <Icon className="w-[14px] h-[14px]" strokeWidth={2.5} />}
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-[12px]">
          {((hasDynamicData ? dynamicFaqData[activeTab] : RAW_FAQ_DATA[activeTab]) || []).map((faq) => {
            const isOpen = openQuestionId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`bg-white rounded-[14px] border-[1.5px] overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-[#0c4088] shadow-[0_6px_24px_rgba(12,64,136,0.13)]' 
                    : 'border-[#e5e7eb] shadow-[0_2px_14px_rgba(12,64,136,0.05)] hover:border-[#cbd5e1]'
                }`}
              >
                <div 
                  className="flex items-center justify-between gap-[16px] p-[18px_20px] cursor-pointer select-none"
                  onClick={() => toggleQuestion(faq.id)}
                >
                  <div className="font-[700] text-[0.95rem] text-[#1a2e5a] leading-[1.35]">
                    {faq.q}
                  </div>
                  <div 
                    className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen 
                        ? 'bg-[#f1bd0e] text-[#0c4088] rotate-180' 
                        : 'bg-white text-[#0c4088]'
                    }`}
                  >
                    <ChevronDown className="w-[16px] h-[16px]" strokeWidth={3} />
                  </div>
                </div>

                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-[20px] pb-[20px] text-[0.875rem] text-[#182232] leading-[1.75]">
                    {hasDynamicData ? (
                      <RichTextRenderer content={faq.a} />
                    ) : (
                      FAQ_ANSWERS[faq.id]
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
