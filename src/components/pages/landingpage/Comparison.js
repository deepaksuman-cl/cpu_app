'use client';

import {
  Book,
  Bot,
  Briefcase,
  FolderOpen,
  Globe,
  Lightbulb,
  Presentation,
  Shield,
  ThumbsDown,
  ThumbsUp,
  TrendingUp
} from 'lucide-react';

const comparisonData = [
  {
    id: 1,
    label: 'Internships & Jobs',
    labelIcon: Briefcase,
    cpu: 'Programme designed to make you internship-ready by Year 2 - backed by 250+ hiring partners.',
    other: '<25% students receive an internship by their 3rd year'
  },
  {
    id: 2,
    label: 'AI Tools & Learning',
    labelIcon: Bot,
    cpu: '12+ AI tools used in real projects from Semester 1 - ChatGPT, OpenAI API, LangChain, TensorFlow & more',
    other: 'AI introduced only in Year 3–4 as a late elective, rarely applied to real projects'
  },
  {
    id: 3,
    label: 'Career Prep Start',
    labelIcon: TrendingUp,
    cpu: 'LeetCode, GitHub tracking, DSA bootcamps & mock interviews from Week 1, Year 1',
    other: 'Placements and interview prep typically begin only in Year 3–4'
  },
  {
    id: 4,
    label: 'Projects & Portfolio',
    labelIcon: FolderOpen,
    cpu: '15 portfolio-grade, deployed projects shipped across 4 years - recruiter-ready GitHub',
    other: '1–2 final-year projects, rarely deployed or production-grade'
  },
  {
    id: 5,
    label: 'Faculties & Curriculum',
    labelIcon: Presentation,
    cpu: 'Industry-relevant curriculum built and taught by experts from Google & Amazon',
    other: 'Rarely updated curriculum, mostly academic-only faculty'
  },
  {
    id: 6,
    label: 'Curriculum',
    labelIcon: Book,
    cpu: 'Start coding and build real projects from Day 1',
    other: 'Build real world projects only by the end of 3rd–4th year'
  },
  {
    id: 7,
    label: 'Entrepreneurship',
    labelIcon: Lightbulb,
    cpu: '₹1 Cr StartX fund, expert mentors, coding events, GSOC, ICPC',
    other: 'Good startup culture but mostly without funding support'
  },
  {
    id: 8,
    label: 'Industry Exposure',
    labelIcon: Globe,
    cpu: 'Frequent sessions with tech leaders, CTOs, VCs and startup founders',
    other: 'Industry exposure limited to top students only'
  }
];

export default function Comparison() {
  return (
    <section 
      className="py-[80px] px-[20px] md:px-[32px] bg-[#0c4088] w-full text-white font-sans"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      
      {/* Section Header */}
      <div className="text-center mb-[50px]">
        <h2 className="text-[2rem] md:text-[2.8rem] font-[800] text-white mb-[8px] leading-tight">
          CPU Curated vs Traditional College Experience
        </h2>
        <p className="text-[1.1rem] text-[#cccccc] font-[300]">
          Why is CPU Curated experience better than traditional colleges?
        </p>
      </div>

      {/* Comparison Table Container */}
      <div className="max-w-[1100px] mx-auto bg-[#ffffff0d] rounded-[16px] backdrop-blur-[5px] flex flex-col md:grid md:grid-cols-[240px_1.5fr_1fr] md:overflow-hidden pb-4 md:pb-0">
        
        {/* Table Header (Hidden on Mobile, Visible on Desktop) */}
        <div className="hidden md:contents">
          <div className="p-[25px_20px]"></div>
          <div className="p-[25px_20px] bg-[#f1bd0e] text-[#1a2a60] flex items-center justify-center gap-[10px] font-[800] text-[1.15rem] relative z-10 shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
            <Shield className="w-5 h-5 fill-[#1a2a60] text-[#f1bd0e]" strokeWidth={2} />
            Career Point University
          </div>
          <div className="p-[25px_20px] text-[#f1bd0e] flex items-center justify-center font-[800] text-[1.15rem]">
            Other Colleges
          </div>
        </div>

        {/* Table Rows */}
        {comparisonData.map((row, index) => {
          const isLast = index === comparisonData.length - 1;
          
          return (
            // Flex column on mobile, contents (grid layout) on desktop
            <div key={row.id} className="flex flex-col md:contents group mb-[25px] md:mb-0 rounded-[12px] md:rounded-none overflow-hidden bg-[#ffffff0d] md:bg-transparent mx-4 md:mx-0">
              
              {/* Row Label (Left Column) */}
              <div className={`p-[25px_25px] flex items-center md:items-start gap-[15px] text-white font-[600] text-[0.95rem] border-b-0 md:border-b ${!isLast ? 'md:border-[#f1bd0e]' : 'md:border-transparent'}`}>
                <row.labelIcon className="w-[1.3rem] h-[1.3rem] text-[#f1bd0e] shrink-0" strokeWidth={2.5} />
                {row.label}
              </div>
              
              {/* Career Point University (Middle Column - Highlighted) */}
              <div className={`p-[25px_25px] flex items-start gap-[15px] bg-[#f1bd0e] text-[#000000] font-[600] text-[0.95rem] relative z-10 border-b ${!isLast ? 'border-[#19282f]' : 'border-transparent'}`}>
                <ThumbsUp className="w-[1.2rem] h-[1.2rem] text-[#0c4088] shrink-0 mt-[2px]" strokeWidth={2.5} />
                {row.cpu}
              </div>
              
              {/* Other Colleges (Right Column) */}
              <div className={`p-[25px_25px] flex items-start gap-[15px] text-white text-[0.95rem] border-b-0 md:border-b ${!isLast ? 'md:border-[#f1bd0e]' : 'md:border-transparent'}`}>
                <ThumbsDown className="w-[1.2rem] h-[1.2rem] text-[#f1bd0e] shrink-0 mt-[2px]" strokeWidth={2.5} />
                {row.other}
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}