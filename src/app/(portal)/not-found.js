"use client";
import { ArrowLeft, BookOpen, GraduationCap, Home, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function PortalNotFound() {
  // University navigation quick links for the portal
  const quickLinks = [
    { name: 'Admissions & Apply', icon: <GraduationCap size={20} className="text-[#00588b]" />, desc: 'Start your journey', href: '/admission' },
    { name: 'Academic Programs', icon: <BookOpen size={20} className="text-[#00588b]" />, desc: 'Explore our courses', href: '/programmes' },
    { name: 'Campus Facilities', icon: <MapPin size={20} className="text-[#00588b]" />, desc: 'Discover campus life', href: '/about' },
    { name: 'Contact Helpdesk', icon: <Phone size={20} className="text-[#00588b]" />, desc: 'Get in touch with us', href: '/contact-us' },
  ];

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-200px)] flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans selection:bg-[#00588b] selection:text-white">
      
      {/* Main Professional Card Layout - Mobile Responsive */}
      <div className="max-w-6xl w-full bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* Left Content Area (Details aur buttons) - Mobile pe niche, Desktop pe left */}
        <div className="p-6 sm:p-8 md:p-12 lg:p-16 flex-1 flex flex-col justify-center order-last md:order-first z-10 bg-white">
          
          <div className="flex items-center gap-2 mb-3 text-[#00588b] font-bold tracking-widest uppercase text-xs">
            <span className="w-8 h-px bg-[#00588b]/40"></span>
         Comming Soon
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 mb-4 leading-tight">
            Page Not Found
          </h1>
          
          <p className="text-base sm:text-lg text-slate-500 mb-8 md:mb-10 max-w-md leading-relaxed">
            We're sorry, but the page you are looking for doesn't exist, has been removed, or the URL was typed incorrectly. Please use the links below to navigate back.
          </p>

          {/* Primary Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 md:mb-12">
            <Link 
              href="/" 
              className="w-full sm:w-auto bg-[#00588b] text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-[#1c54a3] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Home size={18} /> Go to Homepage
            </Link>
            
            <button 
              onClick={() => window.history.back()} 
              className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 hover:text-[#00588b] hover:border-[#00588b]/30 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Go Back
            </button>
          </div>

          {/* Clean Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {quickLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.href} 
                className="group flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-[#00588b]/20 hover:bg-slate-50 transition-all shadow-sm shadow-slate-100/50 hover:shadow-md"
              >
                <div className="p-2.5 bg-blue-50/50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all flex-shrink-0">
                  {link.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-800 text-sm group-hover:text-[#00588b] transition-colors truncate">
                    {link.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {link.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
        </div>

        {/* Right/Top Visual Area - Mobile pe badi 404 header, Desktop pe right side */}
        <div className="flex w-full md:w-auto md:flex-1 h-48 sm:h-60 md:h-auto bg-[#f8fafc] items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-l border-slate-100 group order-first md:order-last">
          
          {/* Subtle Blueprint Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] md:bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_75%,transparent_100%)] opacity-60 transition-opacity duration-700 group-hover:opacity-80"></div>
          
          {/* Elegant 404 Typography watermark */}
          <div className="relative z-10 text-center select-none transform transition-transform duration-700 group-hover:scale-105">
            <span className="text-[9rem] sm:text-[12rem] lg:text-[16rem] font-black text-slate-200 leading-none drop-shadow-sm tracking-tighter">
              404
            </span>
            {/* Minimal accent line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] md:w-[120%]">
               <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00588b]/30 to-transparent"></div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
