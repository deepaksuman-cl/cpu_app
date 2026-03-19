"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { BookMarked, Layers, Search, CheckCircle2, ChevronRight, Microscope, HelpCircle } from "lucide-react";

const getDynamicIcon = (lucideName, size, className, style) => {
  const IconCmp = LucideIcons[lucideName] || HelpCircle;
  return <IconCmp size={size} className={className} style={style} />;
};

export default function ProgrammesClient({ categories = [], courses = [], links = [], settings = {} }) {
  const searchParams = useSearchParams();
  
  // Sort categories by order if exists
  const sortedCategories = [...categories].sort((a, b) => (a.order || 0) - (b.order || 0));
  const defaultType = searchParams.get("type") || (sortedCategories.length > 0 ? sortedCategories[0].label : "");
  
  const [activeType, setActiveType] = useState(defaultType);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    if (typeFromUrl) setActiveType(typeFromUrl);
  }, [searchParams]);

  const activeCategory = sortedCategories.find(c => c.label === activeType);
  
  const activeCourses = activeCategory 
    ? courses.filter(c => c.categoryId === activeCategory._id)
    : [];
    
  // Calculate specialisations (Raw HTML string fallback check)
  const filtered = activeCourses.filter(
    (c) =>
      c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.programs?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sidebarCta = settings?.sidebarCta || { icon: 'GraduationCap', title: 'Need Guidance?', description: 'Talk to our admissions counsellor for personalised guidance.', buttonText: 'Book Free Counselling', buttonLink: '/contact' };
  const mainCta = settings?.mainCta || { icon: 'TrendingUp', badgeText: 'Admissions 2025–26 Open', title: 'Start Your Academic Journey Today', description: 'Limited seats available. Apply before 30th June 2025.', primaryBtnText: 'Apply Now', primaryBtnLink: '/apply', secondaryBtnText: 'Download Brochure', secondaryBtnLink: '/brochure' };

  return (
    <div className="font-[Poppins,sans-serif] bg-[#f0f6fb] min-h-screen py-7">
      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-8 max-w-[1400px] mx-auto">
        
        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-5">
          {/* Programme Type */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e2ecf4]">
            <h3 className="flex items-center gap-2 text-[#00588b] font-extrabold text-sm mb-4">
              <BookMarked size={15} className="text-[#00588b]" />
              Programme Type
            </h3>
            <div className="flex flex-col gap-1">
              {sortedCategories.map((cat) => {
                const count = courses.filter(c => c.categoryId === cat._id).length;
                return (
                  <button
                    key={cat._id}
                    onClick={() => { setActiveType(cat.label); setSearchTerm(""); }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left border-l-[3px] transition-all
                      ${activeType === cat.label ? "bg-[#00588b]/8 border-[#00588b]" : "bg-transparent border-transparent hover:bg-[#f0f6fb]"}`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className={activeType === cat.label ? "text-[#00588b]" : "text-slate-400"} />
                      <span className={`text-sm ${activeType === cat.label ? "text-[#00588b] font-bold" : "text-slate-600 font-normal"}`}>
                        {cat.label}
                      </span>
                    </div>
                    <span className={`text-xs font-bold rounded-md px-2 py-0.5 min-w-[22px] text-center ${activeType === cat.label ? "bg-[#00588b] text-white" : "bg-slate-100 text-slate-400"}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          {links && links.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e2ecf4]">
              <h3 className="flex items-center gap-2 text-[#00588b] font-extrabold text-sm mb-4">
                <Layers size={15} className="text-[#00588b]" />
                Quick Links
              </h3>
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link key={link._id} href={link.slug} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-[#f0f6fb] transition w-full text-left group border border-transparent hover:border-gray-200 ${link.colorClass}`}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm group-hover:scale-110 transition-transform">
                      {getDynamicIcon(link.icon, 15)}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{link.label}</span>
                    <ChevronRight size={13} className="text-slate-400 ml-auto opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sidebar CTA Card */}
          <div className="bg-gradient-to-br from-[#00588b] to-[#003d63] rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
             <div className="relative z-10">
              <div className="mx-auto mb-3 flex justify-center text-orange-400 bg-white/10 w-12 h-12 rounded-full items-center">
                {getDynamicIcon(sidebarCta.icon, 24)}
              </div>
              <h4 className="font-bold text-lg mb-2">{sidebarCta.title}</h4>
              <p className="text-xs text-blue-100 leading-relaxed mb-6 mx-auto max-w-[200px]">{sidebarCta.description}</p>
              <Link href={sidebarCta.buttonLink} className="block text-center w-full py-3 bg-orange-500 text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 hover:-translate-y-0.5">
                {sidebarCta.buttonText}
              </Link>
             </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800">{activeType} Programmes</h2>
              <p className="text-xs text-slate-500 mt-0.5">{filtered.length} matching programmes listed</p>
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search programmes…" className="pl-8 pr-4 h-10 border border-[#e2ecf4] rounded-xl text-sm text-slate-700 bg-white outline-none focus:border-[#00588b] w-52 transition shadow-sm focus:shadow-md" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((course) => {
              const isHov = hoveredCard === course._id;
              
              // Helper to inject our checkmarks securely into raw HTML
              const finalHtml = (course.programs || '').replace(/<li>/g, '<li class="flex items-start gap-2 mb-2 text-sm text-slate-600 font-medium"><svg class="w-4 h-4 mt-0.5 shrink-0 text-[#00588b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg><span class="leading-snug">');
              
              return (
                <div key={course._id} onMouseEnter={() => setHoveredCard(course._id)} onMouseLeave={() => setHoveredCard(null)} className={`group bg-white rounded-2xl border-[1.5px] cursor-pointer flex flex-col overflow-hidden transition-all duration-300 transform relative shadow-sm hover:shadow-xl hover:shadow-[#00588b]/5 hover:border-slate-300 hover:-translate-y-1`}>
                  
                  {/* Top colored strip */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 transition-opacity duration-300 opacity-80 group-hover:opacity-100" style={{ backgroundColor: course.colorHex }} />
                  
                  <div className="p-6 md:p-7 flex-grow flex flex-col">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 border border-slate-100 bg-slate-50">
                        {getDynamicIcon(course.icon, 24, "", { color: course.colorHex })}
                      </div>
                      {course.badge && <span className="text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-black/5" style={{ backgroundColor: course.badge.bgHex, color: course.badge.textHex }}>{course.badge.label}</span>}
                    </div>
                    
                    <h3 className="text-lg font-extrabold text-slate-800 mb-1.5 leading-tight group-hover:text-[#00588b] transition-colors" style={{ color: isHov ? course.colorHex : undefined }}>{course.title}</h3>
                    <p className="text-xs font-semibold text-slate-400 mb-5">{course.school}</p>
                    
                    <div className="h-px w-full bg-slate-100 mb-4" />
                    
                    <h4 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">Specialisations</h4>
                    
                    {/* Rich text injection */}
                    <div 
                      className="prose prose-sm text-slate-600 prose-ul:pl-0 prose-ul:list-none max-h-[160px] overflow-y-auto custom-scroll pr-2 pb-2 flex-grow" 
                      dangerouslySetInnerHTML={{ __html: finalHtml }} 
                    />
                  </div>
                  
                  <div className="px-6 md:px-7 pb-6 mt-auto">
                    <Link href={course.detailsSlug || '#'} className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm border-2 border-transparent transition-all duration-300 ${isHov ? 'text-white shadow-md' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`} style={isHov ? { backgroundColor: course.colorHex, borderColor: course.colorHex } : {}}>
                      View Details
                      <ChevronRight size={16} className={`transition-transform duration-300 ${isHov ? "translate-x-1" : ""}`} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 mt-5">
              <Microscope size={44} className="mx-auto mb-3 text-slate-300" />
              <h3 className="text-base font-bold text-slate-500">No programmes match your search</h3>
              <p className="text-xs text-slate-400 mt-1">Try a different keyword or category.</p>
            </div>
          )}

          {/* Main CTA Banner */}
          <div className="mt-8 bg-gradient-to-tr from-[#003050] via-[#004b77] to-[#00588b] rounded-2xl px-8 py-8 md:py-10 flex items-center justify-between shadow-xl shadow-[#00588b]/20 overflow-hidden relative flex-wrap md:flex-nowrap gap-8 border border-white/10">
            <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-3xl" />
            <div className="absolute right-0 bottom-0 w-44 h-44 rounded-full bg-orange-400/10 pointer-events-none blur-2xl" />
            
            <div className="relative z-10 w-full md:w-auto flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-3 bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                {getDynamicIcon(mainCta.icon, 14, "text-orange-400")}
                {mainCta.badgeText}
              </div>
              <h3 className="text-white font-black text-2xl md:text-3xl lg:text-4xl leading-tight mb-2 drop-shadow-sm max-w-xl">{mainCta.title}</h3>
              <p className="text-blue-100 text-sm md:text-base font-medium max-w-lg">{mainCta.description}</p>
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 w-full md:w-auto justify-center">
              <Link href={mainCta.primaryBtnLink || '#'} className="flex items-center justify-center gap-2 bg-orange-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 w-full sm:w-auto text-center border border-orange-400">
                {mainCta.primaryBtnText}
              </Link>
              <Link href={mainCta.secondaryBtnLink || '#'} className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 transition w-full sm:w-auto text-center hover:-translate-y-0.5">
                {mainCta.secondaryBtnText}
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}