import React from 'react';
import * as LucideIcons from 'lucide-react';

const FileEdit = LucideIcons.SquarePen || LucideIcons.FileEdit || LucideIcons.Edit;
const Code = LucideIcons.Code || LucideIcons.Code2;
const Github = LucideIcons.Github || LucideIcons.GitBranch;
const Rocket = LucideIcons.Rocket || LucideIcons.Zap;

const ICON_MAP = {
  FileEdit: <FileEdit className="w-7 h-7 text-[#f1bd0e]" strokeWidth={2.5} />,
  Code: <Code className="w-7 h-7 text-[#f1bd0e]" strokeWidth={2.5} />,
  Github: <Github className="w-7 h-7 text-[#f1bd0e]" strokeWidth={2.5} />,
  Rocket: <Rocket className="w-7 h-7 text-[#f1bd0e]" strokeWidth={2.5} />
};

export default function Placements({ data }) {
  if (!data) return null;
  const { title, subtitle, pillars = [], companies = [] } = data || {};
  const duplicatedCompanies = [...companies, ...companies, ...companies, ...companies];

  return (
    <section className="py-24 px-6 sm:px-8 bg-white font-sans w-full overflow-hidden">
      <div className="text-center mb-[50px]">
        <h2 className="text-[2.2rem] md:text-[2.8rem] font-[800] text-[#0c4088] mb-3 leading-tight">
          {title}
        </h2>
        <p className="text-[1.1rem] text-[#333333] font-[300] max-w-3xl mx-auto tracking-wide">
          {subtitle}
        </p>
      </div>

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[60px]">
        {(pillars || []).map((pillar) => (
          <div 
            key={pillar.id} 
            className="border border-[#eeeeee] p-[30px_24px] rounded-[16px] bg-[#fdfdfd] shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:border-[#f1bd0e] cursor-pointer"
          >
            <div className="w-[55px] h-[55px] bg-[#22acd1]/15 rounded-[12px] flex items-center justify-center mb-[20px]">
              {ICON_MAP[pillar.icon] || null}
            </div>
            
            <h4 className="text-[#0c4088] text-[1.2rem] font-[800] mb-[12px] leading-[1.3]">
              {pillar.title}
            </h4>
            
            <p className="text-[#333333] text-[0.95rem] font-[400] leading-[1.6] m-0">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto pt-[20px] overflow-hidden relative">
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
