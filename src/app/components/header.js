"use client";
import { useEffect, useRef, useState } from "react";

import {
  Phone, Mail, MapPin, ChevronRight, ChevronLeft, ArrowRight,
  GraduationCap, BookOpen, FlaskConical, Menu, X,
  Star, Globe, Users, Award, TrendingUp, Briefcase,
  Building2, Microscope, Zap, Heart, Facebook, Instagram,
  Youtube, Twitter, Linkedin, MessageCircle, Download,
  Plus, Minus, Play, CheckCircle, Calendar, ChevronDown,
  Search, Layers, BadgeCheck, Sparkles
} from "lucide-react";


/* ─── NAV DATA ─── */
const NAV_DATA = [
  { label:"Home", href:"/", active:true },
  { label:"School", href:"/school" },
  { label:"About", href:"#about", submenu:[
    {label:"Vision & Mission",href:"#about"},{label:"Chancellor's Message",href:"#about"},
    {label:"Board of Governors",href:"#about"},{label:"Accreditations",href:"#about"},
    {label:"Rankings & Awards",href:"#about"},{label:"Campus Tour",href:"#about"},
  ]},
  { label:"Programs", href:"#programs", mega:true,
    byLevel:[
      {label:"Diploma",badge:null},{label:"Under Graduate (UG)",badge:"Popular"},
      {label:"Integrated",badge:null},{label:"Post Graduate (PG)",badge:null},
      {label:"Doctoral / PhD",badge:"New"},{label:"All Programs",badge:null},
    ],
    schools:[
      {label:"Engineering & Technology",active:true},{label:"Commerce & Management"},
      {label:"Computer Applications"},{label:"Legal Studies & Law"},
      {label:"Health & Allied Sciences"},{label:"Agricultural Sciences"},
      {label:"Basic & Applied Sciences"},{label:"Arts & Humanities"},
    ],
    topCourses:[
      {label:"B.Tech CSE / AI&ML",badge:"Hot"},{label:"MBA",badge:null},
      {label:"BCA / MCA",badge:null},{label:"BA LLB / LLM",badge:null},
      {label:"B.Pharm",badge:"New"},{label:"B.Sc Agriculture",badge:null},
      {label:"M.Sc Biotechnology",badge:null},{label:"50+ More Programs…",badge:null,more:true},
    ],
  },
  { label:"Admissions", href:"#admission", submenu:[
    {label:"Apply Online",href:"#admission"},{label:"Eligibility Criteria",href:"#admission"},
    {label:"Fee Structure",href:"#admission"},{label:"Scholarships",href:"#admission"},
    {label:"International Students",href:"#admission"},{label:"Downloads / Brochure",href:"#admission"},
  ]},
  { label:"Placement", href:"#placement", submenu:[
    {label:"Placement Cell",href:"#placement"},{label:"Top Recruiters",href:"#placement"},
    {label:"Placement Stats",href:"#placement"},{label:"Industry Connect",href:"#placement"},
    {label:"Internships",href:"#placement"},
  ]},
  { label:"Campus Life", href:"#campus", submenu:[
    {label:"Hostels & Housing",href:"#campus"},{label:"Sports & Fitness",href:"#campus"},
    {label:"Clubs & Societies",href:"#campus"},{label:"Cultural Events",href:"#campus"},
    {label:"Medical Facilities",href:"#campus"},
  ]},
  { label:"International", href:"#international" },
];

export default function Header() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-[#002f4e] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-1.5">
          <div className="flex gap-5 flex-wrap">
            <a href="mailto:admissions@cpuniverse.ac.in" className="text-slate-300 text-xs no-underline flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Mail size={12}/> admissions@cpuniverse.ac.in
            </a>
            <span className="hidden sm:flex text-slate-300 text-xs items-center gap-1.5">
              <Phone size={13}/> 1800-1800-345
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-slate-300 text-xs">Follow Us:</span>
            {[Facebook,Instagram,Youtube,Twitter].map((Icon,i)=>(
              <a key={i} href="#" className="text-gray-400 hover:text-amber-400 transition-colors"><Icon size={13}/></a>
            ))}
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="bg-[#00588b] overflow-hidden py-1.5">
        <span className="ticker-run text-white text-[13px] font-medium">
          🎓 Admissions Open 2026–27 &nbsp;|&nbsp; 42 LPA Highest Package &nbsp;|&nbsp; NAAC A Rated &nbsp;|&nbsp; 25+ Years of Excellence &nbsp;|&nbsp; 70+ Programs &nbsp;|&nbsp; Apply Now: 1800-1800-345 &nbsp;|&nbsp; 20+ International Collaborations &nbsp;|&nbsp; 90% Placement Record 🎓
        </span>
      </div>

      {/* NAVBAR */}
      <nav ref={navRef} className={`sticky top-0 z-[5000] bg-white/98 backdrop-blur-xl transition-shadow duration-300 ${scrolled?"shadow-lg":"shadow-[0_1px_0_#e8f0f7]"}`}>
        <div className="max-w-7xl mx-auto px-5 py-0 flex justify-between items-center gap-4">
          <a href="/" className="flex items-center no-underline flex-shrink-0">
            <img src="https://cpur.in/wp-content/uploads/2026/01/logo__cpu_naac.png" alt="Career Point University"
              className="h-[30px] w-auto object-contain block"
              onError={e=>{e.target.style.display="none";const fb=e.target.nextSibling;if(fb)fb.style.display="flex";}}/>
            <div className="hidden items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-black text-xs">CPU</div>
              <div>
                <div className="text-[#1a3a5c] font-black text-sm leading-tight">Career Point University</div>
                <div className="text-amber-500 text-[10px]">Kota, Rajasthan</div>
              </div>
            </div>
          </a>

          <div className="hidden xl:flex items-center flex-1 justify-center">
            {NAV_DATA.map((item,idx)=>{
              const hasDD=item.submenu&&!item.mega, hasMega=!!item.mega, isOpen=activeMenu===idx;
              return(
                <div key={idx} className="relative"
                  onMouseEnter={()=>(hasDD||hasMega)&&setActiveMenu(idx)}
                  onMouseLeave={()=>setActiveMenu(null)}>
                  {(hasDD||hasMega) ? (
                    <button className={`text-[#1a3a5c] text-[13.5px] font-semibold px-3 py-5.5 inline-flex items-center gap-1 cursor-pointer border-none bg-transparent font-sans whitespace-nowrap rounded-lg transition-all duration-200 hover:text-[#00588b] hover:bg-blue-50 ${item.active?"border border-[#1a3a5c]":""} ${isOpen?"text-[#00588b] bg-blue-50":""}`}>
                      {item.label}
                      <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen?"rotate-180":""}`}/>
                    </button>
                  ) : (
                    <a href={item.href} className={`text-[#1a3a5c] text-[13.5px] font-semibold px-3 py-5.5 inline-flex items-center gap-1 no-underline font-sans whitespace-nowrap rounded-lg transition-all duration-200 hover:text-[#00588b] hover:bg-blue-50 ${item.active?"border border-[#1a3a5c]":""}`}>
                      {item.label}
                    </a>
                  )}
                  {hasDD&&isOpen&&(
                    <div className="dd-anim absolute top-[calc(100%+0px)] left-0 min-w-[236px] bg-white rounded-2xl border border-blue-100 shadow-2xl z-[9000] overflow-hidden"
                      onMouseEnter={()=>setActiveMenu(idx)} onMouseLeave={()=>setActiveMenu(null)}>
                      {item.submenu.map((s,si)=>(
                        <a key={si} href={s.href} className="flex items-center gap-2 px-4 py-3 text-gray-700 text-[13.5px] font-medium no-underline border-b border-gray-50 last:border-none hover:bg-blue-50 hover:text-[#00588b] hover:pl-5 transition-all duration-150">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00588b] flex-shrink-0 inline-block"/>
                          {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button className="apply_now_btn pulse-anim bg-gradient-to-br from-amber-400 to-amber-600 text-white border-none rounded-full px-5 py-2 text-[13px] font-extrabold cursor-pointer flex items-center gap-1.5 hover:scale-105 transition-transform">
              Apply Now
            </button>
            <button className="xl:hidden bg-blue-50 border-none text-[#00588b] cursor-pointer p-2.5 rounded-lg flex items-center justify-center" onClick={()=>setMenuOpen(true)}>
              <Menu size={21}/>
            </button>
          </div>
        </div>

        {/* MEGA MENU */}
        {activeMenu!==null&&NAV_DATA[activeMenu]?.mega&&(
          <div className="dd-anim fixed left-0 right-0 bg-white shadow-2xl border-t-[3px] border-[#00588b] z-[8999]"
            onMouseEnter={()=>setActiveMenu(activeMenu)} onMouseLeave={()=>setActiveMenu(null)}>
            <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-0 px-7 pt-6">
              <div className="pr-6 border-r border-gray-100">
                <div className="flex items-center gap-2 text-[#00588b] text-[11px] font-black uppercase tracking-widest mb-3.5 pb-2 border-b-2 border-blue-100"><Layers size={14}/> By Level</div>
                {NAV_DATA[activeMenu].byLevel.map((row,i)=>(
                  <a key={i} href="#programs" className="flex items-center justify-between py-2 px-1.5 border-b border-gray-50 last:border-none no-underline rounded-lg hover:bg-blue-50 group transition-all hover:px-3">
                    <span className="flex items-center gap-2 text-[13.5px] text-gray-700 font-medium group-hover:text-[#00588b]">
                      <span className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center flex-shrink-0"><GraduationCap size={10} className="text-[#00588b]"/></span>{row.label}
                    </span>
                    {row.badge==="Popular"&&<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00588b] text-white">Popular</span>}
                    {row.badge==="New"&&<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#003a5c] text-white">New</span>}
                  </a>
                ))}
              </div>
              <div className="px-6 border-r border-gray-100">
                <div className="flex items-center gap-2 text-[#00588b] text-[11px] font-black uppercase tracking-widest mb-3.5 pb-2 border-b-2 border-blue-100"><Building2 size={14}/> Schools</div>
                {NAV_DATA[activeMenu].schools.map((row,i)=>(
                  <a key={i} href="#programs" className="flex items-center gap-2 py-2 px-1.5 border-b border-gray-50 last:border-none no-underline rounded-lg hover:bg-blue-50 group transition-all hover:px-3">
                    <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${row.active?"bg-blue-100":"bg-blue-50"}`}><BookOpen size={10} className="text-[#00588b]"/></span>
                    <span className={`text-[13.5px] font-medium group-hover:text-[#00588b] ${row.active?"text-[#00588b] font-bold":"text-gray-700"}`}>{row.label}</span>
                  </a>
                ))}
              </div>
              <div className="pl-6">
                <div className="flex items-center gap-2 text-[#00588b] text-[11px] font-black uppercase tracking-widest mb-3.5 pb-2 border-b-2 border-blue-100"><Star size={14}/> Top Courses</div>
                {NAV_DATA[activeMenu].topCourses.map((row,i)=>(
                  <a key={i} href="#programs" className="flex items-center justify-between py-2 px-1.5 border-b border-gray-50 last:border-none no-underline rounded-lg hover:bg-blue-50 group transition-all hover:px-3">
                    <span className={`flex items-center gap-2 text-[13.5px] font-medium group-hover:text-[#00588b] ${row.more?"text-[#00588b] font-semibold":"text-gray-700"}`}>
                      {row.more?<><Plus size={12} className="text-[#00588b]"/>{row.label}</>:<><span className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center flex-shrink-0"><Zap size={10} className="text-[#00588b]"/></span>{row.label}</>}
                    </span>
                    {row.badge==="Hot"&&<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">Hot</span>}
                    {row.badge==="New"&&<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#003a5c] text-white">New</span>}
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 border-t border-blue-100 px-7 py-3.5 mt-5">
              <div className="max-w-[1200px] mx-auto flex items-center gap-3 flex-wrap">
                <button className="bg-gradient-to-br from-[#00588b] to-[#003a5c] text-white border-none rounded-full px-5 py-2 text-[13px] font-bold cursor-pointer flex items-center gap-1.5 hover:scale-105 transition-transform"><Layers size={14}/> All Programs</button>
                <button className="bg-transparent text-[#1a3a5c] border-2 border-[#1a3a5c] rounded-full px-5 py-[7px] text-[13px] font-bold cursor-pointer flex items-center gap-1.5 hover:bg-[#1a3a5c] hover:text-white transition-all"><Download size={13}/> Download Brochure</button>
                <button className="bg-gradient-to-br from-amber-400 to-amber-600 text-white border-none rounded-full px-5 py-2 text-[13px] font-extrabold cursor-pointer flex items-center gap-1.5 hover:scale-105 transition-transform">Apply Now</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* MOBILE DRAWER */}
      {menuOpen&&(
        <>
          <div className="fixed inset-0 bg-black/60 z-[10000] backdrop-blur-sm" onClick={()=>setMenuOpen(false)}/>
          <div className="mob-anim fixed top-0 left-0 bottom-0 w-80 max-w-[88vw] bg-[#001f35] z-[10100] flex flex-col overflow-hidden">
            <div className="bg-[#001428] px-4 py-3.5 flex items-center justify-between border-b border-white/8 flex-shrink-0">
              <img src="https://cpur.in/wp-content/uploads/2026/01/logo__cpu_naac.png" alt="CPU" className="h-7 object-contain brightness-0 invert" onError={e=>{e.target.style.display="none";}}/>
              <button onClick={()=>setMenuOpen(false)} className="bg-white/10 border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"><X size={16} className="text-white"/></button>
            </div>
            <div className="px-3.5 py-2.5 bg-[#002540] flex-shrink-0">
              <div className="flex items-center gap-2 bg-white/7 rounded-lg px-3 py-2 border border-white/10">
                <Search size={13} className="text-blue-300"/>
                <input placeholder="Search programs, pages..." className="bg-transparent border-none text-white text-[13px] outline-none flex-1 font-sans placeholder-blue-300"/>
              </div>
            </div>
            <div className="px-3.5 py-2.5 bg-[#00588b] flex-shrink-0">
              <button className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-white border-none rounded-lg py-2.5 font-extrabold text-[13px] cursor-pointer flex items-center justify-center gap-1.5">
                <GraduationCap size={15}/> Apply Now — 2026–27
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {NAV_DATA.map((item,idx)=>{
                const hasDD=item.submenu&&!item.mega, hasMega=!!item.mega, isOpen=mobileOpen===idx;
                return(
                  <div key={idx} className="border-b border-white/6">
                    {(hasDD||hasMega) ? (
                      <button className={`w-full flex justify-between items-center px-4 py-3.5 text-[#e8f0f6] text-sm font-semibold bg-transparent border-none cursor-pointer text-left font-sans transition-colors ${isOpen?"bg-[#00588b]/35":""} hover:bg-[#00588b]/25`}
                        onClick={()=>{if(hasDD||hasMega){setMobileOpen(isOpen?null:idx);}else{setMenuOpen(false);}}}>
                        <span>{item.label}</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 flex-shrink-0 ${isOpen?"rotate-180 text-amber-400":"text-blue-300"}`}/>
                      </button>
                    ) : (
                      <a href={item.href} className="block px-4 py-3.5 text-[#e8f0f6] text-sm font-semibold no-underline hover:bg-[#00588b]/25 transition-colors"
                        onClick={()=>setMenuOpen(false)}>
                        {item.label}
                      </a>
                    )}
                    {hasDD&&isOpen&&(
                      <div className="bg-black/25">
                        {item.submenu.map((s,si)=>(
                          <a key={si} href={s.href} className="flex items-center gap-2 pl-8 pr-4 py-2.5 text-[#b8cedd] text-[13px] no-underline border-b border-white/4 last:border-none hover:text-amber-400 hover:bg-[#00588b]/20 hover:pl-10 transition-all" onClick={()=>setMenuOpen(false)}>
                            <ChevronRight size={10} className="text-amber-400 flex-shrink-0"/> {s.label}
                          </a>
                        ))}
                      </div>
                    )}
                    {hasMega&&isOpen&&(
                      <div className="bg-black/25">
                        <p className="px-4 pt-2 pb-1 text-amber-400 text-[11px] font-extrabold uppercase tracking-widest">By Level</p>
                        {item.byLevel.map((r,i)=><a key={i} href="#programs" className="flex items-center gap-2 pl-8 pr-4 py-2 text-[#b8cedd] text-[13px] no-underline border-b border-white/4 hover:text-amber-400 transition-colors" onClick={()=>setMenuOpen(false)}><ChevronRight size={10} className="text-amber-400 flex-shrink-0"/> {r.label}</a>)}
                        <p className="px-4 pt-2 pb-1 text-amber-400 text-[11px] font-extrabold uppercase tracking-widest">Schools</p>
                        {item.schools.map((r,i)=><a key={i} href="#programs" className="flex items-center gap-2 pl-8 pr-4 py-2 text-[#b8cedd] text-[13px] no-underline border-b border-white/4 hover:text-amber-400 transition-colors" onClick={()=>setMenuOpen(false)}><ChevronRight size={10} className="text-amber-400 flex-shrink-0"/> {r.label}</a>)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="bg-[#001428] px-4 py-3.5 flex-shrink-0 border-t border-white/6">
              <a href="tel:18001800345" className="flex items-center gap-2 text-amber-400 font-bold text-[13px] no-underline mb-2"><Phone size={14}/> 1800-1800-345</a>
              <a href="mailto:admissions@cpuniverse.ac.in" className="flex items-center gap-2 text-blue-300 text-xs no-underline mb-3"><Mail size={13}/> admissions@cpuniverse.ac.in</a>
              <div className="flex gap-2.5">
                {[{Ic:Facebook},{Ic:Instagram},{Ic:Youtube},{Ic:Twitter},{Ic:Linkedin}].map(({Ic},i)=>(
                  <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center no-underline border border-white/10 hover:opacity-80 transition-opacity"><Ic size={13} className="text-gray-400"/></a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
