'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

// Use dynamic lookup instead of hardcoded map
const HelpCircle = LucideIcons.CircleHelp || LucideIcons.HelpCircle || LucideIcons.Info;

export default function Comparison({ data }) {
  if (!data) return null;
  const { title, subtitle, data: comparisonData = [] } = data || {};

  const Shield = LucideIcons.Shield || LucideIcons.ShieldCheck || LucideIcons.Lock;
  const ThumbsUp = LucideIcons.ThumbsUp || LucideIcons.CheckCircle;
  const ThumbsDown = LucideIcons.ThumbsDown || LucideIcons.XCircle;

  return (
    <section 
      className="py-[80px] px-[20px] md:px-[32px] bg-[#0c4088] w-full text-white font-sans"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      <div className="text-center mb-[50px]">
        <h2 className="text-[2rem] md:text-[2.8rem] font-[800] text-white mb-[8px] leading-tight">
          {title}
        </h2>
        <p className="text-[1.1rem] text-[#cccccc] font-[300]">
          {subtitle}
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto bg-[#ffffff0d] rounded-[16px] backdrop-blur-[5px] flex flex-col md:grid md:grid-cols-[240px_1.5fr_1fr] md:overflow-hidden pb-4 md:pb-0">
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

        {comparisonData.map((row, index) => {
          const isLast = index === comparisonData.length - 1;
          const LabelIcon = LucideIcons[row.labelIcon] || HelpCircle || (() => null);
          
          return (
            <div key={row.id} className="flex flex-col md:contents group mb-[25px] md:mb-0 rounded-[12px] md:rounded-none overflow-hidden bg-[#ffffff0d] md:bg-transparent mx-4 md:mx-0">
              <div className={`p-[25px_25px] flex items-center md:items-start gap-[15px] text-white font-[600] text-[0.95rem] border-b-0 md:border-b ${!isLast ? 'md:border-[#f1bd0e]' : 'md:border-transparent'}`}>
                {LabelIcon && <LabelIcon className="w-[1.3rem] h-[1.3rem] text-[#f1bd0e] shrink-0" strokeWidth={2.5} />}
                {row.label}
              </div>
              
              <div className={`p-[25px_25px] flex items-start gap-[15px] bg-[#f1bd0e] text-[#000000] font-[600] text-[0.95rem] relative z-10 border-b ${!isLast ? 'border-[#19282f]' : 'border-transparent'}`}>
                <ThumbsUp className="w-[1.2rem] h-[1.2rem] text-[#0c4088] shrink-0 mt-[2px]" strokeWidth={2.5} />
                {row.cpu}
              </div>
              
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
