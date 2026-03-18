"use client";
import React, { useState, useEffect } from "react";
import { UserCheck, CreditCard, CheckCircle, Play, IndianRupee, X } from "lucide-react";

import StructuredTitle from "@/components/common/StructuredTitle";

/* ── YouTube Lightbox ── */
function YouTubeLightbox({ videoId, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-[#ffb900] hover:text-[#00588b] hover:border-[#ffb900] transition-all z-10"
      >
        <X size={22} />
      </button>
      <div
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: "16/9" }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="Admission Process Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <style>{`
        @keyframes lightboxIn {
          from { opacity:0; transform:scale(0.92); }
          to   { opacity:1; transform:scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ── Play Button with Infinite Ripple Waves ── */
function PlayButtonRipple({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center focus:outline-none group"
      aria-label="Watch video"
    >
      {/* Wave rings */}
      <span className="absolute w-24 h-24 rounded-full bg-[#ffb900]/25 animate-[ripple1_2s_ease-out_infinite]" />
      <span className="absolute w-32 h-32 rounded-full bg-[#ffb900]/15 animate-[ripple2_2s_ease-out_infinite_0.4s]" />
      <span className="absolute w-40 h-40 rounded-full bg-[#ffb900]/08 animate-[ripple3_2s_ease-out_infinite_0.8s]" />
      {/* Main circle */}
      <span className="relative z-10 w-20 h-20 rounded-full bg-[#ffb900] flex items-center justify-center shadow-2xl group-hover:bg-yellow-300 group-hover:scale-110 transition-all duration-300">
        <Play size={30} className="text-[#00588b] ml-1.5" fill="#00588b" />
      </span>
      <style>{`
        @keyframes ripple1 { 0% { transform:scale(0.8); opacity:0.8; } 100% { transform:scale(2.2); opacity:0; } }
        @keyframes ripple2 { 0% { transform:scale(0.8); opacity:0.6; } 100% { transform:scale(2.6); opacity:0; } }
        @keyframes ripple3 { 0% { transform:scale(0.8); opacity:0.4; } 100% { transform:scale(3.0); opacity:0; } }
      `}</style>
    </button>
  );
}

/* ── Section Title ── */
function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#00588b]">
        <StructuredTitle title={children} />
      </h2>
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  if (!data) return null;
  const { sectionTitle, subtitle, bgImage, youtubeVideoId, admissionCriteria, feeDetails } = data;

  return (
    <>
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

            {/* Video thumbnail with ripple play button */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
              style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", aspectRatio: "16/9" }}
              onClick={() => setLightboxOpen(true)}
            >
              <div className="absolute inset-0 bg-[#00588b]/65 group-hover:bg-[#00588b]/55 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <PlayButtonRipple onClick={() => setLightboxOpen(true)} />
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

      {/* YouTube Lightbox Portal */}
      {lightboxOpen && youtubeVideoId && (
        <YouTubeLightbox
          videoId={youtubeVideoId}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
