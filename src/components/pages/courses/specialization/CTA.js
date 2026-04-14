'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
const CheckCircle = LucideIcons.CircleCheck || LucideIcons.CheckCircle || LucideIcons.ShieldCheck;
const PhoneVolume = LucideIcons.PhoneForwarded || LucideIcons.PhoneCall || LucideIcons.Phone || LucideIcons.Contact;

export default function CTA({ data }) {
  if (!data) return null;
  const { title, subtitle, points = [], buttonText } = data || {};

  return (
    <section className="py-24 px-6 sm:px-8 bg-[#0c4088] font-sans w-full relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      ></div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-white">
          <h2 className="text-[2.2rem] md:text-[2.8rem] font-[800] mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-[1.1rem] text-blue-100 mb-8 font-[300]">
            {subtitle}
          </p>

          <div className="flex flex-col gap-4 mb-10">
            {points.map((point, index) => (
              <div key={index} className="flex items-start gap-3 group">
                <CheckCircle className="w-6 h-6 text-[#f1bd0e] shrink-0 mt-0.5" />
                <span className="text-[1.05rem] text-white/90">{point}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-5 items-center">
            <button className="bg-[#f1bd0e] text-[#0c4088] px-[32px] py-[14px] rounded-[8px] font-[800] text-[1.1rem] flex items-center gap-3 hover:translate-y-[-3px] transition-all duration-300 shadow-xl">
              <PhoneVolume className="w-5 h-5" />
              {buttonText}
            </button>
            <div className="text-white/80">
              <p className="text-sm">Or call us directly at:</p>
              <p className="text-lg font-bold text-[#f1bd0e]">+91-9079134713</p>
            </div>
          </div>
        </div>

        <div className="relative justify-self-center lg:justify-self-end">
          <div className="absolute -inset-4 bg-[#f1bd0e]/20 blur-3xl rounded-full"></div>
          <img 
            src="https://cpur.in/lp/admission-2023/assets/img/cta.avif" 
            alt="Counselling Session" 
            className="relative w-full max-w-[500px] h-auto rounded-[24px] shadow-2xl border-4 border-white/10"
          />
        </div>
      </div>
    </section>
  );
}
