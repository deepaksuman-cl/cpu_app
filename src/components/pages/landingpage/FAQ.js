"use client";

import { useState } from "react";
import heroData from "@/data/courses.json";
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  IndianRupee, 
  Building2, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";

const categoryIconMap = {
  admission: GraduationCap,
  curriculum: BookOpen,
  placements: Briefcase,
  fees: IndianRupee,
  campus: Building2,
};

function FAQ() {
  const [activeTab, setActiveTab] = useState("admission");
  const [openItems, setOpenItems] = useState({});

  const faq = heroData.faq;

  const switchTab = (tab) => {
    setActiveTab(tab);
    setOpenItems({});
  };

  const toggleFaq = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="bg-[#f8fafc] py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[#0f347c] mb-5 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about CPU's AI-First B.Tech before you take the next step.
          </p>
        </div>

        {/* TABS - Updated to match screenshot pill style */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {faq.categories.map((cat) => {
            const Icon = categoryIconMap[cat.id] || GraduationCap;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => switchTab(cat.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm border ${
                  isActive
                    ? "bg-[#0f4296] text-white border-[#0f4296] shadow-blue-900/20 shadow-lg"
                    : "bg-white text-[#0f347c] border-slate-100 hover:border-blue-400/50 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} strokeWidth={2.5} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* FAQ CONTENT */}
        <div className="max-w-4xl mx-auto space-y-5">
          {faq.categories.map((category, categoryIndex) => (
            <div
              key={category.id}
              className={activeTab === category.id ? "space-y-5" : "hidden"}
            >
              {category.questions.map((item, itemIndex) => {
                const key = `${categoryIndex}-${itemIndex}`;
                const isOpen = openItems[key];

                return (
                  <div
                    key={itemIndex}
                    className={`group rounded-[20px] bg-white transition-all duration-500 border ${
                      isOpen
                        ? "shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] border-blue-100"
                        : "border-slate-100 shadow-sm hover:border-slate-200"
                    }`}
                  >
                    {/* QUESTION */}
                    <button
                      onClick={() => toggleFaq(categoryIndex, itemIndex)}
                      className="w-full flex items-center justify-between p-7 text-left outline-none"
                    >
                      <h4 className="font-bold text-[#0f347c] text-lg pr-8 leading-snug">
                        {item.question}
                      </h4>

                      <div
                        className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ${
                          isOpen 
                            ? "bg-[#fac815] text-[#0f347c] rotate-0" 
                            : "bg-slate-50 text-blue-900 rotate-0"
                        }`}
                      >
                        {isOpen ? (
                          <ChevronUp size={20} strokeWidth={3} />
                        ) : (
                          <ChevronDown size={20} strokeWidth={3} className="text-[#0f347c]/50" />
                        )}
                      </div>
                    </button>

                    {/* ANSWER - with specific text highlighting */}
                    <div
                      className={`grid transition-all duration-500 ease-in-out px-7 overflow-hidden ${
                        isOpen ? "grid-rows-[1fr] pb-8 opacity-100" : "grid-rows-[0fr] pb-0 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden min-h-0">
                        <div 
                          className="text-slate-500 text-[15px] font-medium leading-[1.8] tracking-wide pr-4"
                          dangerouslySetInnerHTML={{
                            __html: item.answer
                              .replace(
                                /(Class 10\+2|PCM|top 20–25%)/g,
                                '<strong class="text-slate-600 font-bold">$1</strong>'
                              )
                              .replace(
                                /(50%\+ marks|50% marks)/g,
                                '<span class="inline-flex items-center px-2.5 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md text-xs font-bold font-mono ml-1">$1</span>'
                              ),
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;