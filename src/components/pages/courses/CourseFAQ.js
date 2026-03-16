"use client";
import React, { useState } from "react";
import { Plus, Minus, ChevronDown, HelpCircle } from "lucide-react";

function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#00588b]">{children}</h2>
      {subtitle && <p className="text-sm max-w-2xl mx-auto text-gray-500">{subtitle}</p>}
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
  const { sectionTitle, subtitle, items } = data;

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
                className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isOpen
                    ? "border-[#00588b]/30 shadow-lg shadow-[#00588b]/8"
                    : "border-gray-200 shadow-sm"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(idx)}
                  className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-200 ${
                    isOpen ? "bg-[#00588b] text-white" : "bg-white hover:bg-blue-50 text-gray-800"
                  }`}
                >
                  <span className="flex items-center gap-3 font-semibold text-sm md:text-base pr-4">
                    <span className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? "bg-white/20" : "bg-[#00588b]/10"
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
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-white" : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="bg-white border-t border-gray-100 px-6 py-5">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={18} className="text-[#ffb900] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-[#00588b]/8 to-blue-50 rounded-2xl p-8 border border-[#00588b]/15">
          <HelpCircle size={32} className="text-[#ffb900] mx-auto mb-3" />
          <h3 className="text-[#00588b] font-extrabold text-lg mb-2">Still have questions?</h3>
          <p className="text-gray-500 text-sm mb-5">Our admissions team is happy to help you with any queries.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+911234567890"
              className="inline-flex items-center gap-2 bg-[#00588b] text-white font-bold px-6 py-3 rounded-full hover:bg-[#004570] transition text-sm"
            >
              📞 Call Us
            </a>
            <a
              href="mailto:admissions@cpur.in"
              className="inline-flex items-center gap-2 bg-[#ffb900] text-[#00588b] font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition text-sm"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
