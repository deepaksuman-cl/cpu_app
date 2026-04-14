import React from 'react';
import * as LucideIcons from 'lucide-react';

// Dynamic lookup with fallbacks
const CircleHelp = LucideIcons.CircleHelp || LucideIcons.HelpCircle || LucideIcons.Info;

export default function FeaturesFlipCards({ data }) {
  if (!data) return null;
  const { title, subtitle, features = [] } = data || {};

  return (
    <section className="py-24 px-8 bg-[#fdfdfd] font-sans">
      <div className="text-center mb-[50px]">
        <h2 className="text-[2.2rem] md:text-[2.8rem] font-[800] text-[#0c4088] mb-3 leading-tight">
          {title}
        </h2>
        <p className="text-[1.1rem] text-[#333333] font-[300] max-w-3xl mx-auto tracking-wide">
          {subtitle}
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px] mt-[30px] [perspective:1000px]">
        {features.map((item) => {
          const IconComponent = LucideIcons[item.icon] || CircleHelp || (() => null);
          return (
            <div key={item.id} className="group relative h-[180px] cursor-pointer [perspective:1000px]">
              <div className="relative w-full h-full transition-transform duration-[600ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-[16px] shadow-[0_5px_20px_rgba(0,0,0,0.04)]">
                {/* FRONT FACE */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-white border border-[#e5e7eb] flex items-center px-[30px] py-[35px] rounded-[16px]">
                  <div className="absolute -top-[12px] right-[30px] w-[42px] h-[50px] bg-[#f1bd0e] text-white flex justify-center items-center font-[800] text-[1.1rem] rounded-t-[4px] z-10 pb-[5px]">
                    {item.number}
                    <div className="absolute -bottom-[14px] left-0 w-0 h-0 border-l-[21px] border-r-[21px] border-b-[15px] border-l-[#f1bd0e] border-r-[#f1bd0e] border-b-transparent"></div>
                  </div>
                  <div className="w-[60px] text-center shrink-0 flex justify-center items-center">
                    {IconComponent && <IconComponent className="w-11 h-11 text-[#0c4088]" strokeWidth={2.5} />}
                  </div>
                  <div className="flex-1 pl-[25px] ml-[15px] border-l border-[#e0e0e0] font-[600] text-[1.15rem] text-[#111111] leading-[1.4]">
                    {item.title}
                  </div>
                </div>
                {/* BACK FACE */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-[#0c4088] text-white [transform:rotateY(180deg)] flex flex-col justify-center items-center p-[30px] text-center rounded-[16px]">
                  <h4 className="text-[#f1bd0e] text-[1.15rem] font-[800] mb-[10px]">{item.title}</h4>
                  <p className="text-[0.95rem] text-[#ffffffd9] leading-[1.6] m-0 font-[300]">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
