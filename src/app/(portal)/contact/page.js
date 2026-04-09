"use client";

import React from "react";
import Script from "next/script";
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  Briefcase, 
  UserX, 
  FileCheck,
  Building2,
  Clock
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8fafd] font-sans">
      
      {/* ── 1. HERO SECTION (Split Layout with Form on Right) ── */}
      <section className="relative bg-[#00598c] overflow-hidden pt-20 pb-28 lg:pt-24 lg:pb-32">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#fec53a] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text & Primary Contact */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-[#fec53a]/20 border border-[#fec53a]/40 text-[#fec53a] text-sm font-bold px-4 py-1.5 rounded-full self-start uppercase tracking-widest">
                Get In Touch
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                We're Here To <br />
                <span className="text-[#fec53a]">Help You Succeed.</span>
              </h1>
              <p className="text-white/80 text-lg max-w-xl leading-relaxed">
                Whether you have a question about admissions, academic records, or career opportunities, our team is ready to answer all your questions.
              </p>

              {/* Quick Contact Chips */}
              <div className="flex flex-wrap gap-4 mt-4">
                <a href="tel:+919079134713" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors text-white px-5 py-3 rounded-xl backdrop-blur-sm">
                  <PhoneCall className="w-5 h-5 text-[#fec53a]" />
                  <span className="font-semibold text-lg">+91-9079134713</span>
                </a>
                <a href="mailto:info@cpuniverse.in" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors text-white px-5 py-3 rounded-xl backdrop-blur-sm">
                  <Mail className="w-5 h-5 text-[#fec53a]" />
                  <span className="font-semibold text-lg">info@cpuniverse.in</span>
                </a>
              </div>
            </div>

            {/* Right Column: Embedded Enquiry Form */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden relative z-20">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-[#00598c] to-[#00436b] p-6 text-center border-b-4 border-[#fec53a]">
                  <h3 className="text-2xl font-bold text-white mb-1">Admission Enquiry</h3>
                  <p className="text-white/70 text-sm">Fill out the form and we'll get back to you.</p>
                </div>
                
                {/* ⚠️ DO NOT CHANGE THIS FORM CODE ⚠️ */}
                <div className="bg-gray-50">
                  <div className="npf_wgts" data-height="450px" data-w="f0dace2ba1b9cc96517a3a6aa12f701c"></div>
                  <Script 
                    src="https://widgets.in8.nopaperforms.com/emwgts.js" 
                    strategy="lazyOnload" 
                  />
                </div>
              </div>
              
              {/* Form Decorative Dots */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#fec53a] rounded-full opacity-50 blur-xl z-0" />
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. DEPARTMENTAL EMAILS (Grid Section) ── */}
      <section className="container mx-auto px-6 -mt-16 relative z-20 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Grievance */}
          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-[#00598c]/5 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 bg-[#00598c]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#fec53a] transition-colors">
              <UserX className="w-7 h-7 text-[#00598c] group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#00598c] mb-2">Student Grievance</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Facing any issues? Reach out to our dedicated helpdesk for quick resolutions.
            </p>
            <a href="mailto:studenthelpdesk@cpur.edu.in" className="text-[#00598c] font-semibold hover:text-[#fec53a] flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" /> studenthelpdesk@cpur.edu.in
            </a>
          </div>

          {/* Card 2: Jobs */}
          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-[#00598c]/5 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 bg-[#00598c]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#fec53a] transition-colors">
              <Briefcase className="w-7 h-7 text-[#00598c] group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#00598c] mb-2">For Jobs / Careers</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Want to join our academic or administrative team? Send us your resume.
            </p>
            <a href="mailto:jobs@cpur.edu.in" className="text-[#00598c] font-semibold hover:text-[#fec53a] flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" /> jobs@cpur.edu.in
            </a>
          </div>

          {/* Card 3: Verification */}
          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-[#00598c]/5 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 bg-[#00598c]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#fec53a] transition-colors">
              <FileCheck className="w-7 h-7 text-[#00598c] group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#00598c] mb-2">Academic Records (WES)</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              For electronic/digital verification of academic records and WES.
            </p>
            <a href="mailto:ar.admin@cpur.edu.in" className="text-[#00598c] font-semibold hover:text-[#fec53a] flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" /> ar.admin@cpur.edu.in
            </a>
          </div>

        </div>
      </section>

      {/* ── 3. DUAL MAPS SECTION (Side by Side Locations) ── */}
      <section className="container mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#00598c] mb-4">
            Visit Our <span className="text-[#fec53a]">Locations</span>
          </h2>
          <div className="w-20 h-1 bg-[#fec53a] mx-auto rounded-full" />
        </div>

        {/* 2 Column Grid for Maps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Map 1: Admission Office */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-200 flex-1">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#00598c] rounded-full shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#00598c] mb-2">Admission Office</h3>
                  <p className="text-gray-600 flex items-start gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-[#fec53a] shrink-0 mt-0.5" />
                    CP Tower 1, Road No.1, IPIA, Kota – 324005, Rajasthan
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#fec53a] shrink-0" />
                    Mon - Sat: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
            {/* Google Maps iFrame */}
            <div className="h-[350px] w-full">
              <iframe 
                src="https://maps.google.com/maps?q=CP+Tower+1+Road+No.1+IPIA+Kota&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

          {/* Map 2: Campus Address */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-200 flex-1">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#fec53a] rounded-full shrink-0">
                  <Building2 className="w-6 h-6 text-[#00598c]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#00598c] mb-2">Campus Address</h3>
                  <p className="text-gray-600 flex items-start gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-[#00598c] shrink-0 mt-0.5" />
                    National Highway 52, Opp Alaniya Mata Ji Mandir, Alaniya, Kota, Rajasthan 325003
                  </p>
                </div>
              </div>
            </div>
            {/* Google Maps iFrame */}
            <div className="h-[350px] w-full">
              <iframe 
                src="https://maps.google.com/maps?q=Career+Point+University+Alaniya+Kota&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}