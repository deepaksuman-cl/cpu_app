import { Code, FileEdit, Github, Rocket } from 'lucide-react';

const placementPillars = [
  {
    id: 1,
    title: 'Semester Assessments',
    desc: 'Regular evaluations every semester to track your technical growth.',
    // Yellow icon with light cyan background box as per screenshot
    icon: <FileEdit className="w-7 h-7 text-[#f1bd0e]" strokeWidth={2.5} />,
  },
  {
    id: 2,
    title: 'Coding Profile Tracking',
    desc: 'We monitor your LeetCode & Codeforces to ensure consistent practice.',
    icon: <Code className="w-7 h-7 text-[#f1bd0e]" strokeWidth={2.5} />,
  },
  {
    id: 3,
    title: 'GitHub Project Tracking',
    desc: 'Your projects are tracked on GitHub to build a recruiter-ready profile.',
    icon: <Github className="w-7 h-7 text-[#f1bd0e]" strokeWidth={2.5} />,
  },
  {
    id: 4,
    title: 'MAANG Ready',
    desc: 'DSA bootcamps, mock interviews, and resume building workshops.',
    icon: <Rocket className="w-7 h-7 text-[#f1bd0e]" strokeWidth={2.5} />,
  }
];

// Company Logos from your provided HTML
const companies = [
  { name: 'Infosys', url: 'https://cpur.in/lp/admission-2023/assets/img/11-Infosys-BPM.webp' },
  { name: 'Bajaj Finserv', url: 'https://cpur.in/lp/admission-2023/assets/img/22-Bajaj-Fin.webp' },
  { name: 'Microsoft', url: 'https://cpur.in/lp/admission-2023/assets/img/5-Microsoft.webp' },
  { name: 'TCS', url: 'https://cpur.in/lp/admission-2023/assets/img/7-TCS.webp' },
  { name: 'Infosys 2', url: 'https://cpur.in/lp/admission-2023/assets/img/11-Infosys-BPM.webp' },
  { name: 'Bajaj Finserv 2', url: 'https://cpur.in/lp/admission-2023/assets/img/22-Bajaj-Fin.webp' },
];

// Array ko multiple times copy kiya hai taaki loop seamless rahe
const duplicatedCompanies = [...companies, ...companies, ...companies, ...companies];

export default function Placements() {
  return (
    <section className="py-24 px-6 sm:px-8 bg-white font-sans w-full overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center mb-[50px]">
        <h2 className="text-[2.2rem] md:text-[2.8rem] font-[800] text-[#0c4088] mb-3 leading-tight">
          Placement Ecosystem
        </h2>
        <p className="text-[1.1rem] text-[#333333] font-[300] max-w-3xl mx-auto tracking-wide">
          Your career journey starts from Day 1 — not in the final year
        </p>
      </div>

      {/* Placement Pillars Grid */}
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[60px]">
        {placementPillars.map((pillar) => (
          <div 
            key={pillar.id} 
            className="border border-[#eeeeee] p-[30px_24px] rounded-[16px] bg-[#fdfdfd] shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:border-[#f1bd0e] cursor-pointer"
          >
            {/* Icon Box */}
            <div className="w-[55px] h-[55px] bg-[#22acd1]/15 rounded-[12px] flex items-center justify-center mb-[20px]">
              {pillar.icon}
            </div>
            
            {/* Card Title */}
            <h4 className="text-[#0c4088] text-[1.2rem] font-[800] mb-[12px] leading-[1.3]">
              {pillar.title}
            </h4>
            
            {/* Card Description */}
            <p className="text-[#333333] text-[0.95rem] font-[400] leading-[1.6] m-0">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Companies Showcase (Logos with Infinite CSS Marquee) */}
      <div className="max-w-[1280px] mx-auto pt-[20px] overflow-hidden relative">
        
        {/* CSS Animation */}
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: flex;
              width: max-content;
              animation: marquee 25s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}
        </style>
        
        {/* Marquee Wrapper */}
        <div className="animate-marquee gap-8 md:gap-14 lg:gap-20 items-center">
          {duplicatedCompanies.map((company, index) => (
            <img 
              key={index}
              src={company.url} 
              alt={company.name} 
              className="h-[28px] md:h-[35px] w-auto object-contain grayscale-[100%] opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            />
          ))}
        </div>
      </div>

    </section>
  );
}