"use client";
import React from "react";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Globe } from "lucide-react";
import StructuredTitle from "@/components/common/StructuredTitle";
import Link from "next/link";

export default function SchoolExploreDepartment({ data }) {
  if (!data || !data.items || data.items.length === 0) return null;

  const { sectionTitle, subtitle, items } = data;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -mr-48 -mt-48 opacity-60" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ffb900]/5 rounded-full blur-3xl -ml-48 -mb-48 opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#00588b] mb-4">
            <StructuredTitle title={sectionTitle} highlightClass="text-[#ffb900]" />
          </h2>
          {subtitle && (
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="flex justify-center gap-1 mt-6">
            <div className="h-1.5 w-16 rounded-full bg-[#ffb900]" />
            <div className="h-1.5 w-6 rounded-full bg-[#00588b]" />
            <div className="h-1.5 w-3 rounded-full bg-[#ffb900]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = LucideIcons[item.icon] || Globe;
            const targetLink = item.slug ? `/schools/${item.slug}` : item.link || "#";

            return (
              <div 
                key={idx} 
                className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Hover gradient border */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00588b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#00588b] mb-6 group-hover:bg-[#ffb900] group-hover:text-[#00588b] transition-colors duration-300">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-black text-[#0a1628] mb-3 group-hover:text-[#00588b] transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  {item.items && item.items.length > 0 && (
                    <ul className="mb-6 space-y-1.5">
                      {item.items.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-500 text-[13px] leading-snug">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#ffb900] mt-1.5 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link 
                    href={targetLink}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#00588b] group-hover:text-[#ffb900] transition-colors uppercase tracking-widest"
                  >
                    Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Decorative background watermark */}
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                  <Icon size={120} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
