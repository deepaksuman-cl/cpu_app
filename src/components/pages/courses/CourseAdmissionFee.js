"use client";
import React from "react";
import { UserCheck, CreditCard, CheckCircle, Play, IndianRupee } from "lucide-react";

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

export default function CourseAdmissionFee({ data }) {
  if (!data) return null;
  const { sectionTitle, subtitle, bgImage, admissionCriteria, feeDetails } = data;

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <SectionTitle subtitle={subtitle}>{sectionTitle}</SectionTitle>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Admission Criteria */}
        <div>
          <h3 className="text-lg font-extrabold text-[#00588b] mb-5 flex items-center gap-2">
            <UserCheck size={20} className="text-[#ffb900]" /> Admission Criteria
          </h3>
          <div className="space-y-4 mb-8">
            {admissionCriteria?.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-blue-50 rounded-xl p-4 border-l-4 shadow-sm"
                style={{ borderColor: item.color }}
              >
                <CheckCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                <p className="text-gray-700 text-sm">
                  {item.text}
                  <a href="#" className="font-bold underline hover:opacity-80" style={{ color: item.color }}>
                    {item.link}
                  </a>
                </p>
              </div>
            ))}
          </div>

          {/* Video Placeholder */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-video shadow-xl cursor-pointer group"
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-[#00588b]/70 group-hover:bg-[#00588b]/60 transition" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-16 h-16 bg-[#ffb900] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <Play size={28} className="text-[#00588b] ml-1" />
              </div>
              <p className="text-blue-100 text-sm">Watch Admission Process Video</p>
            </div>
          </div>
        </div>

        {/* Fee Structure */}
        <div>
          <h3 className="text-lg font-extrabold text-[#00588b] mb-5 flex items-center gap-2">
            <CreditCard size={20} className="text-[#ffb900]" /> Course Fee Structure
          </h3>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
            <div className="bg-[#00588b] text-white px-5 py-3 font-bold text-sm flex items-center gap-2">
              <IndianRupee size={16} className="text-[#ffb900]" /> Fee Details
            </div>
            <div className="divide-y divide-gray-100">
              {feeDetails?.map((fee, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center px-5 py-3.5 hover:bg-blue-50 transition ${i % 2 === 0 ? "bg-white" : "bg-blue-50/30"}`}
                >
                  <span className="text-gray-700 text-sm">{fee.label}</span>
                  <span className="text-[#00588b] font-extrabold text-sm">₹{fee.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
