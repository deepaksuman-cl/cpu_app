'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  IndianRupee, 
  Building2, 
  ChevronDown,
  Info,
  Zap,
  Trophy
} from 'lucide-react';

// Pill component for highlighted text like "12+ AI tools" or "50% marks"
const HighlightPill = ({ children }) => (
  <span className="inline-block bg-[#f1bd0e]/15 border border-[#f1bd0e]/45 text-[#8a6300] font-[600] text-[0.77rem] px-[9px] py-[2px] rounded-[5px] mx-[2px]">
    {children}
  </span>
);

// Custom Bullet List Item
const BulletItem = ({ children }) => (
  <li className="flex items-start gap-[10px] text-[#555555]">
    <div className="w-[7px] h-[7px] rounded-full bg-[#f1bd0e] shrink-0 mt-[8px]"></div>
    <span>{children}</span>
  </li>
);

// Info Box Component
const InfoBox = ({ icon: Icon, children }) => (
  <div className="bg-[#0c4088]/5 border-l-[3px] border-[#0c4088] rounded-r-[8px] p-[10px_15px] mt-[12px] text-[0.95rem] text-[#2a4080] flex items-start gap-[10px]">
    <Icon className="w-5 h-5 text-[#0c4088] shrink-0 mt-[2px]" />
    <div>{children}</div>
  </div>
);

const faqData = {
  admission: [
    {
      id: 'a1',
      q: 'What are the eligibility criteria for admission?',
      a: (
        <>
          You must have completed <strong>Class 10+2 with Physics, Chemistry & Mathematics (PCM)</strong> and secured a minimum of <HighlightPill>50% marks</HighlightPill>. Admission is competitive — only the <strong>top 20–25% of applicants</strong> are selected via CPUEST and a Personal Interview.
        </>
      )
    },
    {
      id: 'a2',
      q: 'What is the CPUEST and how do I prepare for it?',
      a: (
        <>
          CPUEST stands for <strong>Career Point Scholastic Aptitude Test</strong>. It covers three areas:
          <ul className="mt-[10px] flex flex-col gap-[6px]">
            <BulletItem>Mathematics (Class 11–12 level)</BulletItem>
            <BulletItem>Physics (Class 11–12 level)</BulletItem>
            <BulletItem>Chemistry (Class 11–12 level)</BulletItem>
          </ul>
          The test can be taken <strong>online or at the Kota campus</strong>. It is scheduled for <HighlightPill>28 March 2026</HighlightPill>. Brush up on your Class 12 Maths, Physics, Chemistry and practice aptitude questions to prepare.
        </>
      )
    },
    {
      id: 'a3',
      q: 'What are the key dates for Batch 2026–27?',
      a: (
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
      )
    },
    {
      id: 'a4',
      q: 'What is the step-by-step admission process?',
      a: (
        <>
          <ul className="mt-[6px] flex flex-col gap-[6px]">
            <BulletItem><strong>Step 1 — Register & Apply Online:</strong> Submit your application with 10+2 marksheet and PCM details.</BulletItem>
            <BulletItem><strong>Step 2 — Appear for CPUEST:</strong> Take the aptitude test online or at campus (Maths, Chemistry, Physics).</BulletItem>
            <BulletItem><strong>Step 3 — Personal Interview:</strong> Faculty panel interview testing problem-solving ability and passion for technology.</BulletItem>
            <BulletItem><strong>Step 4 — Counselling & Seat Confirmation:</strong> One-on-one session to submit documents and confirm your seat.</BulletItem>
          </ul>
        </>
      )
    },
    {
      id: 'a5',
      q: 'Is the B.Tech degree recognised? Will employers accept it?',
      a: (
        <>
          Yes, absolutely. The B.Tech degree from Career Point University is fully recognised:
          <ul className="mt-[10px] flex flex-col gap-[6px]">
            <BulletItem><HighlightPill>UGC Recognised</HighlightPill> — valid for all government and private sector roles</BulletItem>
            <BulletItem><HighlightPill>AICTE Approved</HighlightPill> — the national regulator for technical education</BulletItem>
            <BulletItem><HighlightPill>NAAC Accredited</HighlightPill> — quality-accredited university</BulletItem>
          </ul>
          It carries the same weight as any other UGC-recognised B.Tech for jobs, higher studies, GATE, and more.
        </>
      )
    }
  ],
  curriculum: [
    {
      id: 'c1',
      q: 'When does AI learning begin — and what tools will I use?',
      a: (
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
      )
    },
    {
      id: 'c2',
      q: 'What real projects will I build during the 4 years?',
      a: (
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
      )
    },
    {
      id: 'c3',
      q: 'Who teaches the courses? Are they working professionals?',
      a: (
        <>
          The curriculum is built and taught by <strong>industry practitioners</strong> from companies like <HighlightPill>Google</HighlightPill>, <HighlightPill>Amazon</HighlightPill>, and <HighlightPill>Microsoft</HighlightPill> — not just academics with textbooks. You'll also have <strong>weekly sessions from MAANG engineers</strong>, CTOs, VCs, and startup founders throughout the programme.
        </>
      )
    },
    {
      id: 'c4',
      q: 'What is the structure of the 4-year programme?',
      a: (
        <>
          Each year has a clear theme with <strong>29 subjects across 8 semesters</strong>:
          <ul className="mt-[10px] flex flex-col gap-[6px]">
            <BulletItem><strong>Year 1 — Build:</strong> C++, HTML/CSS/JS, React, DSA, Discrete Maths</BulletItem>
            <BulletItem><strong>Year 2 — Develop:</strong> Node.js, MongoDB, Java, AI Engineering with LLMs, APIs</BulletItem>
            <BulletItem><strong>Year 3 — Specialize:</strong> ML, NLP, Computer Vision, AWS, System Design + 6-month Internship</BulletItem>
            <BulletItem><strong>Year 4 — Launch:</strong> AI Product Development, Placement Bootcamp, Industry Capstone</BulletItem>
          </ul>
        </>
      )
    }
  ],
  placements: [
    {
      id: 'p1',
      q: 'What is the internship and placement track record?',
      a: (
        <>
          <ul className="mt-[6px] flex flex-col gap-[6px]">
            <BulletItem><HighlightPill>93%</HighlightPill> of 2nd year students secured paid internships</BulletItem>
            <BulletItem>Average internship stipend: <HighlightPill>₹25,000/month</HighlightPill></BulletItem>
            <BulletItem>6-month formal internship in Year 3 with a partner company</BulletItem>
            <BulletItem><HighlightPill>1000+</HighlightPill> hiring partner companies in the network</BulletItem>
          </ul>
          <InfoBox icon={Trophy}>Compare this to Tier 1 colleges where fewer than 50% of students receive an internship by their 3rd year.</InfoBox>
        </>
      )
    },
    {
      id: 'p2',
      q: 'When does career preparation actually start?',
      a: (
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
      )
    },
    {
      id: 'p3',
      q: 'Is there support for entrepreneurship and startups?',
      a: (
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
      )
    },
    {
      id: 'p4',
      q: 'What certifications can I earn alongside the degree?',
      a: (
        <>
          Students are guided to earn globally recognised certifications during Year 3–4, including:
          <ul className="mt-[10px] flex flex-col gap-[6px]">
            <BulletItem>AWS / Google Cloud certifications</BulletItem>
            <BulletItem>DeepLearning.AI specialisations</BulletItem>
            <BulletItem>MLOps and DevOps credentials</BulletItem>
          </ul>
          These complement the B.Tech degree and significantly strengthen your resume for MAANG-level roles.
        </>
      )
    }
  ],
  fees: [
    {
      id: 'f1',
      q: 'What scholarships are available and how do I get them?',
      a: (
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
      )
    },
    {
      id: 'f2',
      q: 'Are education loans available? Which banks support CPU?',
      a: (
        <>
          Yes. CPU has official finance partnerships with leading institutions:
          <ul className="mt-[10px] flex flex-col gap-[6px]">
            <BulletItem><strong>Axis Bank</strong> — up to 100% loan coverage</BulletItem>
            <BulletItem><strong>IDFC First Bank</strong> — flexible repayment options</BulletItem>
            <BulletItem><strong>Propelld</strong> — education-focused fintech loans</BulletItem>
          </ul>
          Our admission counsellors can guide you through the loan process during the counselling session.
        </>
      )
    },
    {
      id: 'f3',
      q: 'Can I pay fees in instalments?',
      a: (
        <>
          Yes. Fees are structured semester-wise, so you pay in instalments over 8 semesters rather than the full amount upfront. Speak to our admission counsellor for the exact fee schedule and instalment plan — contact us at <strong>info@cpuniverse.in</strong> or call <strong>+91-9079134713</strong>.
        </>
      )
    }
  ],
  campus: [
    {
      id: 'ca1',
      q: 'Is hostel accommodation available on campus?',
      a: (
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
      )
    },
    {
      id: 'ca2',
      q: 'What tech infrastructure is available for students?',
      a: (
        <>
          CPU is built for builders:
          <ul className="mt-[10px] flex flex-col gap-[6px]">
            <BulletItem><strong>24/7 AI Coding Hub</strong> — open round the clock at CP Tower to build, debug and ship at any hour</BulletItem>
            <BulletItem><strong>AI Smart Classrooms</strong> — high-speed Wi-Fi, digital screens, state-of-the-art AV systems</BulletItem>
            <BulletItem><strong>The AI Foundry</strong> — innovation arena for hackathons, demo days and collaboration</BulletItem>
          </ul>
        </>
      )
    },
    {
      id: 'ca3',
      q: 'Are there student clubs and extracurricular activities?',
      a: (
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
      )
    },
    {
      id: 'ca4',
      q: 'Where is the campus located and why Kota?',
      a: (
        <>
          The campus is at <strong>CP Tower, Kota, Rajasthan 324005</strong>. Kota is India's education capital — known for producing top engineers and IITians for over 30 years. Career Point has been at the heart of Kota's education ecosystem since 1993, giving you access to a deeply competitive, high-performance academic environment.
        </>
      )
    }
  ]
};

// Tab configuration with Icons
const tabs = [
  { id: 'admission', label: 'Admission', icon: GraduationCap },
  { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
  { id: 'placements', label: 'Placements', icon: Briefcase },
  { id: 'fees', label: 'Fees & Scholarships', icon: IndianRupee },
  { id: 'campus', label: 'Campus & Life', icon: Building2 },
];

export default function FAQ() {
  // Default to curriculum tab & first question open as per screenshot
  const [activeTab, setActiveTab] = useState('curriculum');
  const [openQuestionId, setOpenQuestionId] = useState('c1');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // Automatically open the first question of the new tab
    setOpenQuestionId(faqData[tabId][0].id);
  };

  const toggleQuestion = (qId) => {
    setOpenQuestionId(openQuestionId === qId ? null : qId);
  };

  return (
    <section className="py-[60px] bg-[#f8f9fa] font-sans w-full" id="faq">
      <div className="max-w-[800px] mx-auto px-[20px]">
        
        {/* Header */}
        <div className="text-center mb-[40px]">
          <h2 className="text-[2.2rem] md:text-[2.6rem] font-[800] text-[#0c4088] mb-[12px] leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[1.05rem] text-[#333333] font-[300]">
            Everything you need to know about CPU's AI-First B.Tech before you take the next step.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-[8px] mb-[35px]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
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
                <Icon className="w-[14px] h-[14px]" strokeWidth={2.5} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-[12px]">
          {faqData[activeTab].map((faq) => {
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
                {/* Question Row */}
                <div 
                  className="flex items-center justify-between gap-[16px] p-[18px_20px] cursor-pointer select-none"
                  onClick={() => toggleQuestion(faq.id)}
                >
                  <div className="font-[700] text-[0.95rem] text-[#1a2e5a] leading-[1.35]">
                    {faq.q}
                  </div>
                  {/* Chevron Icon */}
                  <div 
                    className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen 
                        ? 'bg-[#f1bd0e] text-[#0c4088] rotate-180' 
                        : 'bg-[#f0f4f8] text-[#0c4088]'
                    }`}
                  >
                    <ChevronDown className="w-[16px] h-[16px]" strokeWidth={3} />
                  </div>
                </div>

                {/* Answer Row */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-[20px] pb-[20px] text-[0.875rem] text-[#182232] leading-[1.75]">
                    {faq.a}
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