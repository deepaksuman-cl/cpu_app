"use client";
import React, { useState } from "react";
import { Plus, Minus, ChevronDown, HelpCircle } from "lucide-react";
import StructuredTitle from "@/components/common/StructuredTitle";
import RichTextRenderer from "@/components/common/RichTextRenderer";

function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#00588b]">
        <StructuredTitle title={children} />
      </h2>
      {subtitle && <p className="text-lg max-w-2xl mx-auto text-gray-500">{subtitle}</p>}
      <div className="flex gap-1 mt-3 justify-center">
        <div className="h-1 w-14 rounded-full bg-[#ffb900]" />
        <div className="h-1 w-5 rounded-full bg-[#00588b]" />
        <div className="h-1 w-2 rounded-full bg-[#ffb900]" />
      </div>
    </div>
  );
}

export default function CourseFAQ({ data }) {
  const [openId, setOpenId] = useState(null);
  if (!data) return null;
  const { sectionTitle, subtitle, items, useProse = true } = data;

  const toggle = (idx) => setOpenId(prev => prev === idx ? null : idx);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/40">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle subtitle={subtitle}>{sectionTitle}</SectionTitle>

        <div className="space-y-3">
          {items?.map((item, idx) => {
            const isOpen = openId === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 ${isOpen
                  ? "border-[#00588b]/30 shadow-lg shadow-[#00588b]/8"
                  : "border-gray-200 shadow-sm"
                  }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(idx)}
                  className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-200 ${isOpen ? "bg-[#00588b] text-white" : "bg-white hover:bg-blue-50 text-gray-800"
                    }`}
                >
                  <span className="flex items-center gap-3 font-semibold text-sm md:text-base pr-4">
                    <span className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? "bg-white/20" : "bg-[#00588b]/10"
                      }`}>
                      {isOpen
                        ? <Minus size={15} className="text-white" />
                        : <Plus size={15} className="text-[#00588b]" />
                      }
                    </span>
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : "text-gray-400"
                      }`}
                  />
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="bg-white border-t border-gray-100 px-6 py-5">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={18} className="text-[#ffb900] flex-shrink-0 mt-0.5" />
                      <RichTextRenderer 
                        content={item.a} 
                        useProse={item.useProse !== undefined ? item.useProse : useProse}
                        className="text-gray-700 text-sm leading-relaxed" 
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
